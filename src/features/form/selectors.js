// Basic selectors
export const selectFormData = (state) => state.form.formData;
export const selectCurrentStep = (state) => state.form.currentStep;
export const selectTotalSteps = (state) => state.form.totalSteps;
export const selectIsFormCompleted = (state) => state.form.isCompleted;
export const selectFormLoading = (state) => state.form.loading;
export const selectFormError = (state) => state.form.error;
export const selectValidationErrors = (state) => state.form.validationErrors;

// Field-specific selectors
export const selectFormField = (state, field) => selectFormData(state)[field];
export const selectFieldValidationError = (state, field) => selectValidationErrors(state)[field];

// Progress calculation
export const selectFormProgress = (state) => {
  const currentStep = selectCurrentStep(state);
  const totalSteps = selectTotalSteps(state);
  return (currentStep / totalSteps) * 100;
};

// Form completion status
export const selectIsFormStepValid = (state, requiredFields = []) => {
  const formData = selectFormData(state);
  const validationErrors = selectValidationErrors(state);
  
  // Check if all required fields are filled
  for (const field of requiredFields) {
    if (!formData[field] || validationErrors[field]) {
      return false;
    }
  }
  
  return true;
};