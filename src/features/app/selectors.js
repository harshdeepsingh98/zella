// Basic selectors
export const selectAppData = state => state.app.data;
export const selectAppLoading = state => state.app.loading;
export const selectAppError = state => state.app.error;
export const selectCurrentLanguage = state => state.app.currentLanguage;

export const selectAppMetadata = state => state.app.data?.app?.metadata || {};

// Derived selectors
export const selectAppName = state => state.app.data?.app?.metadata?.name || 'Zella';
export const selectAppDescription = state => state.app.data?.app?.metadata?.description || '';
export const selectAppLogo = state => state.app.data?.app?.metadata?.logo || null;

// Page configuration selectors
export const selectPages = state => state.app.data?.app?.config?.pages || [];

export const selectPageByCode = (state, code) => {
  const pages = selectPages(state);
  return pages.find(page => page.metadata.code === code);
};

// Language-specific selectors
export const selectPageText = (state, code) => {
  const page = selectPageByCode(state, code);
  const language = selectCurrentLanguage(state);
  return page?.attributes?.text?.[language] || {};
};

export const selectErrorMessage = (state, code, errorType) => {
  const pageText = selectPageText(state, code);
  return pageText?.error?.[errorType] || 'An error occurred';
};

// Mobile Auth Screen Selectors (auth-1)
export const selectMobileAuthConfig = state => selectPageByCode(state, 'auth-1');
export const selectMobileAuthText = state => selectPageText(state, 'auth-1');

// OTP Verification Screen Selectors (auth-2)
export const selectOtpVerifyConfig = state => selectPageByCode(state, 'auth-2');
export const selectOtpVerifyText = state => selectPageText(state, 'auth-2');
export const selectOtpFieldSize = state =>
  selectOtpVerifyConfig(state)?.attributes?.functional?.otpFieldSize || 6;
export const selectOtpResendTimer = state =>
  selectOtpVerifyConfig(state)?.attributes?.functional?.otpResendTimer || 'PT60S';

// Personal Info Screen Selectors (form-1)
export const selectPersonalInfoConfig = state => selectPageByCode(state, 'form-1');
export const selectPersonalInfoText = state => selectPageText(state, 'form-1');
export const selectPersonalInfoFields = state =>
  selectPersonalInfoConfig(state)?.attributes?.functional?.form?.fields || [];
