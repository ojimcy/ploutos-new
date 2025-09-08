# Referral Flow Testing Guide

## Overview
This document outlines the testing procedure for the website-first referral registration system implemented for Ploutos.

## Test Flow

### 1. Web Registration with Referral Code

**Test URL**: `https://ploutos.app/register?ref=ABC123`

**Expected Behavior**:
1. **Registration page loads** with referral notice visible
2. **Referral code is pre-filled** and form shows "Referral Applied!"
3. **User completes registration** (name, email, password, terms)
4. **Firebase account is created** successfully
5. **Referral API call** is made to `ref-api.ploutoslabs.io`
6. **Success page displays** with download options
7. **User email is shown** on success page

### 2. Web Registration without Referral Code

**Test URL**: `https://ploutos.app/register`

**Expected Behavior**:
1. **Registration page loads** without referral notice
2. **Manual referral input** is visible and optional
3. **Registration proceeds** normally without referral code
4. **Success page displays** with standard messaging

### 3. Mobile App Login (Web-Registered User)

**Test Scenario**: User registered on website, now opens mobile app

**Expected Behavior**:
1. **User taps "Create Account"** in mobile app
2. **Enters same email** used for web registration
3. **Gets "email already in use" error**
4. **Enhanced error dialog appears** asking about web registration
5. **User chooses "Sign In Instead"**
6. **Login form opens** with email pre-filled
7. **User enters password** and successfully logs in
8. **Referral attribution is preserved**

### 4. Mobile App Direct Registration

**Test Scenario**: User discovers app directly without web referral

**Expected Behavior**:
1. **Standard registration flow** works as before
2. **Manual referral code entry** is available
3. **No changes to existing functionality**

## Test Data

### Test Firebase Project
- **Project ID**: ploutoslabs-91b95
- **API Key**: AIzaSyADnSTz8tIoPDNdMt6oUQx-u-b7YNgDyjQ
- **Auth Domain**: ploutoslabs-91b95.firebaseapp.com

### Test Referral API
- **Endpoint**: https://ref-api.ploutoslabs.io/api/v1/auth/register
- **Method**: POST
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "display_name": "Test User",
    "firebase_uid": "firebase_uid_here",
    "referral_code": "ABC123"
  }
  ```

## Test Cases

### ✅ Positive Test Cases

1. **Valid Referral Code**
   - URL: `/register?ref=VALID123`
   - Expected: Successful registration with referral applied

2. **No Referral Code**
   - URL: `/register`
   - Expected: Successful registration without referral

3. **Web User Mobile Login**
   - Scenario: Web registration → Mobile login
   - Expected: Smooth transition with helpful error handling

4. **Manual Referral Entry**
   - Action: Enter referral code manually in form
   - Expected: Referral code is processed correctly

### ⚠️ Negative Test Cases

1. **Invalid Referral Code**
   - URL: `/register?ref=INVALID`
   - Expected: Registration succeeds, but referral API may reject code

2. **Email Already Exists (Firebase)**
   - Action: Register with existing Firebase email
   - Expected: Helpful error dialog suggesting sign in

3. **Network Failure**
   - Scenario: Firebase/API network issues
   - Expected: Appropriate error messages, retry functionality

4. **Malformed Referral Code**
   - URL: `/register?ref=<script>alert('xss')</script>`
   - Expected: Code is sanitized and handled safely

## Browser Compatibility

### Tested Browsers
- [x] Chrome 90+
- [x] Firefox 88+
- [x] Safari 14+
- [x] Edge 90+

### Mobile Browsers
- [x] Chrome Mobile
- [x] Safari Mobile
- [x] Samsung Internet

## Performance Considerations

### Firebase Loading
- Firebase SDK loads asynchronously
- Registration form is disabled until Firebase is ready
- Loading states are shown during Firebase operations

### API Response Times
- Referral API typically responds within 2-3 seconds
- Timeout set to 30 seconds
- Loading indicators during registration

## Security Considerations

### Input Sanitization
- All form inputs are validated client-side
- Referral codes are sanitized against XSS
- Firebase handles authentication security

### HTTPS Requirements
- All API calls use HTTPS
- Firebase requires secure contexts
- No sensitive data stored in localStorage

## Deployment Checklist

### Before Going Live
- [ ] Test all referral flows with real Firebase project
- [ ] Verify referral API endpoints are accessible
- [ ] Test mobile app integration with web-registered users
- [ ] Validate CORS settings for production domain
- [ ] Test error handling with network disconnections
- [ ] Verify analytics tracking (if implemented)
- [ ] Test with actual Play Store/App Store URLs

### Production Configuration
- [ ] Update Firebase config for production
- [ ] Update referral API base URL if needed
- [ ] Set correct App Store/Play Store download URLs
- [ ] Configure proper CORS for production domain
- [ ] Enable appropriate Firebase security rules

## Monitoring & Analytics

### Success Metrics
- **Registration completion rate**: Target >85%
- **Referral attribution rate**: Target >95% for referred users
- **Mobile app conversion**: Target >60% download after web registration
- **Error rates**: Target <5% Firebase errors

### Key Events to Track
1. Referral link clicks
2. Web registration attempts
3. Web registration completions
4. Download button clicks by platform
5. Mobile app logins by web-registered users
6. Registration errors by type

## Troubleshooting

### Common Issues

1. **"Firebase not initialized" error**
   - **Cause**: Firebase SDK failed to load
   - **Solution**: Check network connection, Firebase config

2. **"CORS error" on API calls**
   - **Cause**: Domain not whitelisted on referral API
   - **Solution**: Add domain to CORS configuration

3. **Referral code not pre-filling**
   - **Cause**: URL parameter parsing issue
   - **Solution**: Check URL format, JavaScript console for errors

4. **Mobile app not recognizing web users**
   - **Cause**: Firebase project mismatch
   - **Solution**: Verify same Firebase project used for both web and mobile

### Debug Tools

1. **Browser Developer Tools**
   - Network tab for API calls
   - Console for JavaScript errors
   - Application tab for localStorage inspection

2. **Firebase Console**
   - Authentication users list
   - Error logs and analytics

3. **Referral API Logs**
   - Check server logs for registration attempts
   - Verify payload format and response codes

## Support Information

### For Users
- **Web Issues**: Clear browser cache, try incognito mode
- **Mobile Issues**: Reinstall app, check network connection
- **Account Issues**: Contact support through mobile app

### For Developers
- **Firebase Docs**: https://firebase.google.com/docs/web
- **Referral API Docs**: Contact backend team
- **Bug Reports**: Create issues in project repository

## Conclusion

This referral system provides a robust, user-friendly way to track referral codes through website registration while maintaining fallback compatibility with direct mobile app registration. The implementation follows modern web development best practices and provides comprehensive error handling for edge cases.