// Registration Page JavaScript Logic
// Handles Firebase authentication and registration API calls

// Global variables
let isSubmitting = false;
let isVerifying = false;
let isSendingCode = false;
let referralCode = null;
let verificationTimer = null;
let resendCooldown = null;
let verifiedEmail = null; // Store verified email for registration step
let currentStep = 1; // Track current step (1: email, 2: verification, 3: registration)

// API Configuration
const REFERRAL_API_BASE = 'https://ref-api.ploutoslabs.io/api';
const MINING_API_BASE = 'https://mining-api-123lfk.ploutoslabs.io';

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
  
  // Restore session state if exists
  restoreSessionState();
  
  // Set up event listeners for all steps
  setupEmailFormEventListeners();
  setupVerificationEventListeners();
  setupRegistrationEventListeners();
  
  console.log('Registration page initialized successfully');
}

// Restore session state from sessionStorage
function restoreSessionState() {
  const savedEmail = sessionStorage.getItem('verifiedEmail');
  
  if (savedEmail) {
    verifiedEmail = savedEmail;
    console.log('Restored verified email from session:', savedEmail);
    
    // If we have a verified email, show the registration step
    setTimeout(() => {
      showRegistrationStep();
    }, 500);
  } else {
    // Show email step by default
    showEmailStep();
  }
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

// STEP 1: Set up email form event listeners
function setupEmailFormEventListeners() {
  const emailForm = document.getElementById('email-form');
  const emailInput = emailForm.querySelector('input[name="email"]');
  
  // Email form submission
  emailForm.addEventListener('submit', handleEmailSubmit);
  
  // Email input validation
  emailInput.addEventListener('input', function() {
    clearEmailError();
    if (isValidEmail(this.value)) {
      setEmailFieldValid(this);
    }
  });
  
  emailInput.addEventListener('blur', function() {
    validateEmailField(this);
  });
}

// STEP 3: Set up registration form event listeners  
function setupRegistrationEventListeners() {
  const registrationForm = document.getElementById('registration-form');
  if (!registrationForm) return;
  
  // Registration form submission
  registrationForm.addEventListener('submit', handleRegistrationSubmit);
  
  // Input validation
  const inputs = registrationForm.querySelectorAll('input:not([readonly])');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
  
  // Terms checkbox
  const termsCheckbox = document.getElementById('terms-checkbox');
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', validateTermsCheckbox);
  }
  
  // Real-time validation for registration fields
  const nameInput = registrationForm.querySelector('input[name="name"]');
  const passwordInput = registrationForm.querySelector('input[name="password"]');
  
  if (nameInput) {
    nameInput.addEventListener('input', function() {
      if (this.value.length >= 2) {
        setFieldValid(this);
      }
    });
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      if (this.value.length >= 8) {
        setFieldValid(this);
      }
    });
  }
}


// Register with email and password on mining API (Firebase)
async function registerWithEmailAndPassword(email, password) {
  try {
    const auth = window.FirebaseConfig.getAuth();
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    
    return userCredential.user;
  } catch (error) {
    console.error('Firebase account creation error:', error);
    throw error;
  }
}

// Authenticate with mining app using Firebase ID token
async function authenticateWithMiningApp() {
  try {
    // Get the current user's ID token
    const user = firebase.auth().currentUser;
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    const idToken = await user.getIdToken();
    
    const response = await fetch(`${MINING_API_BASE}/auth/firebase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: Mining app authentication failed`);
    }
    
    const result = await response.json();
    console.log('Mining app authentication successful:', result);
    
    // Store the mining JWT token for future requests (in sessionStorage for web)
    if (result.token) {
      sessionStorage.setItem('mining_jwt_token', result.token);
    }
    
    return result;
  } catch (error) {
    console.error('Mining app authentication error:', error);
    throw error;
  }
}

// Register user on referral dashboard
async function registerUserOnReferralDashboard(userData) {
  try {
    const response = await fetch(`${REFERRAL_API_BASE}/v1/auth/register`, {
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
    console.log('Referral dashboard registration successful:', result);
    return result;
  } catch (error) {
    console.error('Referral dashboard registration error:', error);
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

// EMAIL STEP-SPECIFIC VALIDATION FUNCTIONS

// Clear email error (for step 1)
function clearEmailError() {
  const emailInput = document.querySelector('#email-form input[name="email"]');
  if (emailInput) {
    emailInput.classList.remove('is-invalid');
    const feedback = emailInput.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.style.display = 'none';
    }
  }
}

// Set email field as valid (for step 1)
function setEmailFieldValid(field) {
  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  const feedback = field.parentNode.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.style.display = 'none';
  }
}

// Validate email field (for step 1)
function validateEmailField(field) {
  const value = field.value.trim();
  
  if (!isValidEmail(value)) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = 'Please enter a valid email address';
      feedback.style.display = 'block';
    }
    return false;
  }
  
  setEmailFieldValid(field);
  return true;
}

// STEP 1: Handle email submission
async function handleEmailSubmit(event) {
  event.preventDefault();
  
  if (isSendingCode) {
    return;
  }
  
  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get('email').trim().toLowerCase();
  
  // Validate email
  const emailInput = form.querySelector('input[name="email"]');
  if (!validateEmailField(emailInput)) {
    return;
  }
  
  try {
    setSendingCodeState(true);
    showEmailMessage('info', 'Sending verification code to your email...');
    
    // Send email verification
    await sendEmailVerification(email);
    
    // Store the verified email for next steps
    verifiedEmail = email;
    sessionStorage.setItem('verifiedEmail', email);
    
    showEmailMessage('success', 'Verification code sent! Check your email.');
    
    // Transition to verification step
    setTimeout(() => {
      showVerificationStep(email);
    }, 1500);
    
  } catch (error) {
    console.error('Send email error:', error);
    handleEmailError(error);
  } finally {
    setSendingCodeState(false);
  }
}

// Helper functions for step transitions and messaging

// Show email message (for step 1)
function showEmailMessage(type, message) {
  const container = document.getElementById('email-message-container') || document.getElementById('message-container');
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

// Show verification step (transition from email to verification)
function showVerificationStep(email) {
  // Hide email card
  const emailCard = document.getElementById('email-card');
  const verificationCard = document.getElementById('verification-card');
  
  emailCard.classList.add('fadeOut');
  
  setTimeout(() => {
    emailCard.style.display = 'none';
    
    // Set email in verification form
    document.getElementById('verification-email').textContent = email;
    
    // Show verification card
    verificationCard.style.display = 'block';
    verificationCard.classList.add('fadeIn');
    
    // Focus on verification input
    const codeInput = document.querySelector('input[name="verificationCode"]');
    setTimeout(() => {
      codeInput.focus();
    }, 600);
    
    // Start countdown timer
    startVerificationTimer();
    
    // Set current step
    currentStep = 2;
    
  }, 500);
}

// Show registration step (transition from verification to registration)
function showRegistrationStep() {
  // Hide verification card
  const verificationCard = document.getElementById('verification-card');
  const registrationCard = document.getElementById('registration-card');
  
  verificationCard.classList.add('fadeOut');
  
  setTimeout(() => {
    verificationCard.style.display = 'none';
    
    // Set verified email in registration form
    const emailInput = registrationCard.querySelector('input[name="email"]');
    if (emailInput && verifiedEmail) {
      emailInput.value = verifiedEmail;
      emailInput.classList.add('verified-email');
      emailInput.readOnly = true;
    }
    
    // Show registration card
    registrationCard.style.display = 'block';
    registrationCard.classList.add('fadeIn');
    
    // Focus on name input
    const nameInput = registrationCard.querySelector('input[name="name"]');
    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 600);
    
    // Set current step
    currentStep = 3;
    
  }, 500);
}

// Show email step (go back to step 1)
function showEmailStep() {
  // Hide current cards
  const verificationCard = document.getElementById('verification-card');
  const registrationCard = document.getElementById('registration-card');
  const emailCard = document.getElementById('email-card');
  
  [verificationCard, registrationCard].forEach(card => {
    if (card.style.display !== 'none') {
      card.classList.add('fadeOut');
      setTimeout(() => {
        card.style.display = 'none';
      }, 500);
    }
  });
  
  // Show email card
  setTimeout(() => {
    emailCard.style.display = 'block';
    emailCard.classList.remove('fadeOut');
    emailCard.classList.add('fadeIn');
    
    // Focus on email input
    const emailInput = emailCard.querySelector('input[name="email"]');
    setTimeout(() => {
      if (emailInput) emailInput.focus();
    }, 600);
    
    // Reset data
    verifiedEmail = null;
    sessionStorage.removeItem('verifiedEmail');
    currentStep = 1;
    
    // Stop timers
    if (verificationTimer) {
      clearInterval(verificationTimer);
    }
    
  }, 500);
}

// Handle email error
function handleEmailError(error) {
  console.error('Email error details:', error);
  
  let message = 'Failed to send verification email. Please try again.';
  
  if (error.message) {
    if (error.message.includes('rate limit') || error.message.includes('too many')) {
      message = 'Too many requests. You can send a maximum of 3 emails per hour. Please wait and try again.';
    } else if (error.message.includes('invalid email')) {
      message = 'Invalid email address. Please check and try again.';
    } else {
      message = error.message;
    }
  }
  
  showEmailMessage('error', message);
}

// Set sending code state (for step 1 button)
function setSendingCodeState(isSending) {
  window.isSendingCode = isSending;
  
  const form = document.getElementById('email-form');
  const sendBtn = document.getElementById('get-code-btn');
  
  if (!form || !sendBtn) {
    console.warn('Email form or button not found');
    return;
  }
  
  const btnText = sendBtn.querySelector('.btn-text');
  const btnLoading = sendBtn.querySelector('.btn-loading');
  
  if (isSending) {
    form.classList.add('loading');
    sendBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline-flex';
  } else {
    form.classList.remove('loading');
    sendBtn.disabled = false;
    if (btnText) btnText.style.display = 'inline-flex';
    if (btnLoading) btnLoading.style.display = 'none';
  }
}

// STEP 3: Handle registration submission  
async function handleRegistrationSubmit(event) {
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
  
  // Ensure we have a verified email
  if (!verifiedEmail) {
    showMessage('error', 'Email verification required. Please start over.');
    setTimeout(() => {
      showEmailStep();
    }, 2000);
    return;
  }
  
  // Prepare registration data with verified email
  const registrationData = {
    name: formData.get('name').trim(),
    email: verifiedEmail, // Use the verified email
    password: formData.get('password'),
    referralCode: formData.get('referralCode') || referralCode || undefined
  };
  
  try {
    setSubmittingState(true);
    showMessage('info', 'Creating your account...');
    
    // Step 1: Create user with email and password on Firebase
    console.log('Creating Firebase account...');
    const userCredential = await registerWithEmailAndPassword(registrationData.email, registrationData.password);
    
    // Step 2: Update profile with name
    console.log('Updating user profile...');
    if (userCredential) {
      await userCredential.updateProfile({
        displayName: registrationData.name
      });
      
      // Step 3: Register user in mining database
      console.log('Registering user in mining database...');
      await authenticateWithMiningApp();
      
      // Step 4: Register user on referral dashboard if referral code is provided
      if (registrationData.referralCode) {
        console.log('Registering with referral system...');
        await registerUserOnReferralDashboard({
          email: registrationData.email,
          display_name: registrationData.name,
          firebase_uid: userCredential.uid,
          referral_code: registrationData.referralCode
        });
      }
    }
    
    // Success! Store success data and redirect
    sessionStorage.setItem('registrationSuccess', JSON.stringify({
      email: registrationData.email,
      name: registrationData.name,
      referralCode: registrationData.referralCode,
      timestamp: new Date().toISOString(),
      verified: true
    }));
    
    showMessage('success', 'Account created successfully! Redirecting to download the app...');
    
    setTimeout(() => {
      // Redirect to index.html mobile-app section
      window.location.href = '/#mobile-app';
    }, 2000);
    
  } catch (error) {
    console.error('Registration error:', error);
    handleRegistrationError(error);
  } finally {
    setSubmittingState(false);
  }
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

// Show message to user (automatically detects which container to use)
function showMessage(type, message) {
  // Determine which message container to use based on current step
  let container;
  
  switch(currentStep) {
    case 1:
      container = document.getElementById('email-message-container');
      break;
    case 2:
      container = document.getElementById('verification-message-container');
      break;
    case 3:
      container = document.getElementById('registration-message-container');
      break;
    default:
      // Fallback to any available container
      container = document.getElementById('registration-message-container') || 
                 document.getElementById('verification-message-container') || 
                 document.getElementById('email-message-container');
  }
  
  if (!container) {
    console.error('No message container found for step', currentStep);
    return;
  }
  
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
  const toggleBtn = document.querySelector('.password-show-toggle');
  
  if (!passwordInput || !toggleBtn) {
    console.warn('Password input or toggle button not found');
    return;
  }
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    toggleBtn.textContent = 'Show';
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

// EMAIL VERIFICATION FUNCTIONS

// Set up verification event listeners
function setupVerificationEventListeners() {
  // Verification form submission
  const verificationForm = document.getElementById('verification-form');
  if (verificationForm) {
    verificationForm.addEventListener('submit', handleVerificationSubmit);
  }
  
  // Format verification code input (only numbers)
  const codeInput = document.querySelector('input[name="verificationCode"]');
  if (codeInput) {
    codeInput.addEventListener('input', function(e) {
      // Only allow numbers
      this.value = this.value.replace(/[^0-9]/g, '');
      
      // Clear error state when typing
      this.classList.remove('is-invalid');
      
      // Auto-submit when 6 digits are entered
      if (this.value.length === 6) {
        setTimeout(() => {
          if (document.getElementById('verification-form').checkValidity()) {
            handleVerificationSubmit({ preventDefault: () => {}, target: document.getElementById('verification-form') });
          }
        }, 500);
      }
    });
  }
}

// Send email verification
async function sendEmailVerification(email) {
  try {
    const response = await fetch(`${MINING_API_BASE}/auth/send-email-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to send verification email`);
    }
    
    const result = await response.json();
    console.log('Verification email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Send verification email error:', error);
    throw error;
  }
}

// Verify email with code
async function verifyEmailCode(email, code) {
  try {
    const response = await fetch(`${MINING_API_BASE}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: Email verification failed`);
    }
    
    const result = await response.json();
    console.log('Email verification successful:', result);
    return result;
  } catch (error) {
    console.error('Email verification error:', error);
    throw error;
  }
}

// Handle verification form submission
async function handleVerificationSubmit(event) {
  event.preventDefault();
  
  if (isVerifying) {
    return;
  }
  
  const form = event.target;
  const formData = new FormData(form);
  const verificationCode = formData.get('verificationCode').trim();
  
  // Validate code
  if (!/^[0-9]{6}$/.test(verificationCode)) {
    showVerificationMessage('error', 'Please enter a valid 6-digit code');
    return;
  }
  
  if (!verifiedEmail) {
    showVerificationMessage('error', 'Session expired. Please start registration again.');
    setTimeout(() => {
      showEmailStep();
    }, 2000);
    return;
  }
  
  try {
    setVerifyingState(true);
    showVerificationMessage('info', 'Verifying your code...');
    
    // Verify email with code
    await verifyEmailCode(verifiedEmail, verificationCode);
    
    // Success! Mark input as success and show success message
    const codeInput = document.querySelector('input[name="verificationCode"]');
    codeInput.classList.add('success');
    
    showVerificationMessage('success', 'Email verified successfully! Complete your registration...');
    
    // Stop the timer
    if (verificationTimer) {
      clearInterval(verificationTimer);
    }
    
    // Email is already stored in verifiedEmail from the email step
    sessionStorage.setItem('verifiedEmail', verifiedEmail);
    
    setTimeout(() => {
      // Transition to registration step
      showRegistrationStep();
    }, 2000);
    
  } catch (error) {
    console.error('Verification error:', error);
    handleVerificationError(error);
    setVerifyingState(false);
  }
}


// Start verification countdown timer (15 minutes)
function startVerificationTimer() {
  let timeLeft = 15 * 60; // 15 minutes in seconds
  const countdownElement = document.getElementById('countdown');
  
  verificationTimer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 60) {
      countdownElement.classList.add('expired');
    }
    
    if (timeLeft <= 0) {
      clearInterval(verificationTimer);
      countdownElement.textContent = 'EXPIRED';
      showVerificationMessage('error', 'Verification code has expired. Please request a new one.');
      
      // Enable resend button
      const resendBtn = document.getElementById('resend-btn');
      resendBtn.disabled = false;
    }
    
    timeLeft--;
  }, 1000);
}

// Resend verification code
async function resendVerificationCode() {
  if (!verifiedEmail) {
    showVerificationMessage('error', 'Session expired. Please start registration again.');
    return;
  }
  
  const resendBtn = document.getElementById('resend-btn');
  resendBtn.disabled = true;
  
  try {
    showVerificationMessage('info', 'Sending new verification code...');
    
    await sendEmailVerification(verifiedEmail);
    
    showVerificationMessage('success', 'New verification code sent to your email!');
    
    // Reset timer
    if (verificationTimer) {
      clearInterval(verificationTimer);
    }
    
    // Reset countdown display
    const countdownElement = document.getElementById('countdown');
    countdownElement.classList.remove('expired');
    
    startVerificationTimer();
    
    // Clear and focus input
    const codeInput = document.querySelector('input[name="verificationCode"]');
    codeInput.value = '';
    codeInput.classList.remove('success', 'is-invalid');
    codeInput.focus();
    
    // Set cooldown for resend button (60 seconds)
    let cooldownTime = 60;
    const originalText = resendBtn.innerHTML;
    
    const cooldownInterval = setInterval(() => {
      resendBtn.innerHTML = `<i class="fas fa-clock"></i> Wait ${cooldownTime}s`;
      cooldownTime--;
      
      if (cooldownTime < 0) {
        clearInterval(cooldownInterval);
        resendBtn.innerHTML = originalText;
        resendBtn.disabled = false;
      }
    }, 1000);
    
  } catch (error) {
    console.error('Resend verification error:', error);
    showVerificationMessage('error', error.message || 'Failed to resend verification code. Please try again.');
    resendBtn.disabled = false;
  }
}

// Go back to email step (called from Change Email button)
function goBackToEmail() {
  showEmailStep();
}

// Set verifying state
function setVerifyingState(isVerifyingNow) {
  window.isVerifying = isVerifyingNow;
  
  const form = document.getElementById('verification-form');
  const verifyBtn = document.getElementById('verify-btn');
  const btnText = verifyBtn.querySelector('.btn-text');
  const btnLoading = verifyBtn.querySelector('.btn-loading');
  const codeInput = document.querySelector('input[name="verificationCode"]');
  
  if (isVerifyingNow) {
    form.classList.add('loading');
    verifyBtn.disabled = true;
    codeInput.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
  } else {
    form.classList.remove('loading');
    verifyBtn.disabled = false;
    codeInput.disabled = false;
    btnText.style.display = 'inline-flex';
    btnLoading.style.display = 'none';
  }
}

// Show verification message
function showVerificationMessage(type, message) {
  const container = document.getElementById('verification-message-container');
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

// Handle verification errors
function handleVerificationError(error) {
  console.error('Verification error details:', error);
  
  let message = 'Verification failed. Please try again.';
  
  if (error.message) {
    if (error.message.includes('invalid') || error.message.includes('expired')) {
      message = 'Invalid or expired verification code. Please check the code or request a new one.';
    } else if (error.message.includes('rate limit')) {
      message = 'Too many attempts. Please wait before trying again.';
    } else {
      message = error.message;
    }
  }
  
  showVerificationMessage('error', message);
  
  // Clear the input and remove success state
  const codeInput = document.querySelector('input[name="verificationCode"]');
  codeInput.value = '';
  codeInput.classList.remove('success');
  codeInput.focus();
}