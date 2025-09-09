// Registration Page JavaScript Logic
// Handles Firebase authentication and registration API calls

// Global variables
let isSubmitting = false;
let referralCode = null;

// API Configuration
const REFERRAL_API_BASE = 'https://ref-api.ploutoslabs.io/api/v1';

// Initialize registration page
function initializeRegistrationPage() {
  console.log('Initializing registration page...');
  
  // Initialize Firebase
  if (!window.FirebaseConfig.initializeFirebase()) {
    showMessage('error', 'Unable to load registration system. Please refresh the page.');
    return;
  }

  // Parse referral code from URL
  parseReferralCode();
  
  // Set up form event listeners
  setupFormEventListeners();
  
  // Set up validation
  setupFormValidation();
  
  console.log('Registration page initialized successfully');
}

// Parse referral code from URL parameters
function parseReferralCode() {
  const urlParams = new URLSearchParams(window.location.search);
  referralCode = urlParams.get('ref');
  
  if (referralCode) {
    // Show referral notice
    document.getElementById('referral-notice').style.display = 'block';
    document.getElementById('referral-code-value').textContent = referralCode;
    
    // Hide manual referral input section
    document.getElementById('referral-input-section').style.display = 'none';
    
    // Set referral code in hidden input
    const referralInput = document.querySelector('input[name="referralCode"]');
    referralInput.value = referralCode;
    referralInput.readOnly = true;
    
    console.log('Referral code detected:', referralCode);
  } else {
    // Show manual referral input section
    document.getElementById('referral-input-section').style.display = 'block';
    console.log('No referral code in URL');
  }
}

// Set up form event listeners
function setupFormEventListeners() {
  const form = document.getElementById('registration-form');
  const inputs = form.querySelectorAll('input');
  
  // Form submission
  form.addEventListener('submit', handleFormSubmit);
  
  // Input validation on blur
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
  
  // Terms checkbox
  const termsCheckbox = document.getElementById('terms-checkbox');
  termsCheckbox.addEventListener('change', validateTermsCheckbox);
}

// Set up real-time form validation
function setupFormValidation() {
  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  
  // Name validation
  nameInput.addEventListener('input', function() {
    if (this.value.length >= 2) {
      setFieldValid(this);
    }
  });
  
  // Email validation
  emailInput.addEventListener('input', function() {
    if (isValidEmail(this.value)) {
      setFieldValid(this);
    }
  });
  
  // Password validation
  passwordInput.addEventListener('input', function() {
    if (this.value.length >= 8) {
      setFieldValid(this);
    }
  });
}

// Handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  
  if (isSubmitting) {
    return;
  }
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Validate form
  if (!validateForm(form)) {
    showMessage('error', 'Please correct the errors in the form.');
    return;
  }
  
  // Prepare registration data
  const registrationData = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim().toLowerCase(),
    password: formData.get('password'),
    referralCode: formData.get('referralCode') || referralCode || undefined
  };
  
  try {
    setSubmittingState(true);
    showMessage('info', 'Creating your account...');
    
    // Step 1: Create Firebase account
    console.log('Creating Firebase account...');
    const userCredential = await createFirebaseAccount(registrationData.email, registrationData.password);
    
    // Step 2: Register with referral system
    console.log('Registering with referral system...');
    await registerWithReferralSystem({
      email: registrationData.email,
      display_name: registrationData.name,
      firebase_uid: userCredential.user.uid,
      referral_code: registrationData.referralCode
    });
    
    // Step 3: Success - redirect to mobile app section
    console.log('Registration successful!');
    showMessage('success', 'Account created successfully! Redirecting to download the app...');
    
    // Store registration success data in sessionStorage for the app section
    sessionStorage.setItem('registrationSuccess', JSON.stringify({
      email: registrationData.email,
      name: registrationData.name,
      referralCode: registrationData.referralCode,
      timestamp: new Date().toISOString()
    }));
    
    setTimeout(() => {
      // Redirect to index.html mobile-app section
      window.location.href = '/#mobile-app';
    }, 2000);
    
  } catch (error) {
    console.error('Registration error:', error);
    handleRegistrationError(error);
    setSubmittingState(false);
  }
}

// Create Firebase account
async function createFirebaseAccount(email, password) {
  try {
    const auth = window.FirebaseConfig.getAuth();
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    
    // Update user profile with display name
    if (userCredential.user) {
      await userCredential.user.updateProfile({
        displayName: document.querySelector('input[name="name"]').value.trim()
      });
    }
    
    return userCredential;
  } catch (error) {
    console.error('Firebase account creation error:', error);
    throw error;
  }
}

// Register with referral system
async function registerWithReferralSystem(userData) {
  try {
    const response = await fetch(`${REFERRAL_API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: Registration failed`);
    }
    
    const result = await response.json();
    console.log('Referral system registration successful:', result);
    return result;
  } catch (error) {
    console.error('Referral system registration error:', error);
    throw error;
  }
}

// Validate entire form
function validateForm(form) {
  let isValid = true;
  
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const termsCheckbox = form.querySelector('#terms-checkbox');
  
  // Validate name
  if (!validateField(nameInput)) {
    isValid = false;
  }
  
  // Validate email
  if (!validateField(emailInput)) {
    isValid = false;
  }
  
  // Validate password
  if (!validateField(passwordInput)) {
    isValid = false;
  }
  
  // Validate terms checkbox
  if (!validateTermsCheckbox()) {
    isValid = false;
  }
  
  return isValid;
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  
  switch (fieldName) {
    case 'name':
      if (value.length < 2) {
        setFieldError(field, 'Name must be at least 2 characters long');
        return false;
      }
      break;
      
    case 'email':
      if (!isValidEmail(value)) {
        setFieldError(field, 'Please enter a valid email address');
        return false;
      }
      break;
      
    case 'password':
      if (value.length < 8) {
        setFieldError(field, 'Password must be at least 8 characters long');
        return false;
      }
      break;
      
    case 'referralCode':
      // Referral code is optional, but if provided should be valid format
      if (value && !/^[A-Z0-9]{6,10}$/i.test(value)) {
        setFieldError(field, 'Invalid referral code format');
        return false;
      }
      break;
  }
  
  setFieldValid(field);
  return true;
}

// Validate terms checkbox
function validateTermsCheckbox() {
  const checkbox = document.getElementById('terms-checkbox');
  
  if (!checkbox.checked) {
    setCheckboxError(checkbox, 'You must agree to the terms and conditions');
    return false;
  }
  
  setCheckboxValid(checkbox);
  return true;
}

// Set field as valid
function setFieldValid(field) {
  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  clearFieldError(field);
}

// Set field as invalid
function setFieldError(field, message) {
  field.classList.remove('is-valid');
  field.classList.add('is-invalid');
  
  const feedback = field.parentNode.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.textContent = message;
    feedback.style.display = 'block';
  }
}

// Clear field error
function clearFieldError(field) {
  field.classList.remove('is-invalid');
  
  const feedback = field.parentNode.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.style.display = 'none';
  }
}

// Set checkbox as valid
function setCheckboxValid(checkbox) {
  checkbox.classList.remove('is-invalid');
  clearCheckboxError(checkbox);
}

// Set checkbox error
function setCheckboxError(checkbox, message) {
  checkbox.classList.add('is-invalid');
  
  const feedback = checkbox.closest('.form-group').querySelector('.invalid-feedback');
  if (feedback) {
    feedback.textContent = message;
    feedback.style.display = 'block';
  }
}

// Clear checkbox error
function clearCheckboxError(checkbox) {
  checkbox.classList.remove('is-invalid');
  
  const feedback = checkbox.closest('.form-group').querySelector('.invalid-feedback');
  if (feedback) {
    feedback.style.display = 'none';
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Set submitting state
function setSubmittingState(isSubmitting) {
  window.isSubmitting = isSubmitting;
  
  const form = document.getElementById('registration-form');
  const submitBtn = document.getElementById('register-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  if (isSubmitting) {
    form.classList.add('loading');
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
  } else {
    form.classList.remove('loading');
    submitBtn.disabled = false;
    btnText.style.display = 'inline-flex';
    btnLoading.style.display = 'none';
  }
}

// Show message to user
function showMessage(type, message) {
  const container = document.getElementById('message-container');
  const alertClass = type === 'error' ? 'alert-danger' : 
                    type === 'success' ? 'alert-success' : 'alert-info';
  
  container.innerHTML = `
    <div class="alert ${alertClass} fade-in" role="alert">
      <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 
                     type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      ${message}
    </div>
  `;
  
  container.style.display = 'block';
  
  // Auto-hide info messages after 5 seconds
  if (type === 'info') {
    setTimeout(() => {
      container.style.display = 'none';
    }, 5000);
  }
}

// Handle registration errors
function handleRegistrationError(error) {
  console.error('Registration error details:', error);
  
  let message = 'Registration failed. Please try again.';
  
  if (error.code) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists. <a href="#" onclick="showLoginInfo()">Try signing in instead</a>.';
        break;
      case 'auth/weak-password':
        message = 'Password is too weak. Please choose a stronger password.';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address. Please check and try again.';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection and try again.';
        break;
      default:
        message = error.message || 'An unexpected error occurred. Please try again.';
    }
  } else if (error.message) {
    message = error.message;
  }
  
  showMessage('error', message);
}

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.querySelector('input[name="password"]');
  const toggleBtn = document.querySelector('.password-toggle i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.classList.remove('fa-eye');
    toggleBtn.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleBtn.classList.remove('fa-eye-slash');
    toggleBtn.classList.add('fa-eye');
  }
}

// Show login info modal
function showLoginInfo() {
  // If Bootstrap modal is available
  if (typeof $('#loginInfoModal').modal === 'function') {
    $('#loginInfoModal').modal('show');
  } else {
    // Fallback alert
    alert('To sign in to your existing account, download the Ploutos mobile app from Google Play Store or Apple App Store and use your login credentials.');
  }
}

// Handle page load errors gracefully
window.addEventListener('error', function(event) {
  console.error('Page error:', event.error);
  showMessage('error', 'An error occurred loading the page. Please refresh and try again.');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default handling
});