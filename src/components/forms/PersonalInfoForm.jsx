import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useFormValidation from '@hooks/useFormValidation';
import { submitFormData } from '@features/form/formSlice';
import { 
  selectFormLoading, 
  selectFormError,
  selectIsFormStepValid
} from '@features/form/selectors';
import { 
  selectPersonalInfoText,
  selectPersonalInfoFields
} from '@features/app/selectors';
import { Button, FormField, ErrorMessage } from '@components/common';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const FieldsContainer = styled(Box)`
  margin-bottom: 24px;
`;

const PersonalInfoForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get data from Redux store
  const pageText = useAppSelector(selectPersonalInfoText);
  const formFields = useAppSelector(selectPersonalInfoFields);
  const loading = useAppSelector(selectFormLoading);
  const error = useAppSelector(selectFormError);
  
  // Set up form validations
  const fullNameValidation = useFormValidation('random-id-1');
  const mobileNumberValidation = useFormValidation('random-id-2');
  
  // Check if form is valid
  const isFormValid = useAppSelector(state => 
    selectIsFormStepValid(state, ['random-id-1', 'random-id-2'])
  );
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isFullNameValid = fullNameValidation.validateField();
    const isMobileValid = mobileNumberValidation.validateField();
    
    if (!isFullNameValid || !isMobileValid) {
      return;
    }
    
    // Create form data object
    const formData = {
      fullName: fullNameValidation.value,
      mobileNumber: mobileNumberValidation.value,
    };
    
    try {
      // Dispatch action to submit form data
      const resultAction = await dispatch(submitFormData(formData));
      
      // If submission is successful, navigate to success page or dashboard
      if (submitFormData.fulfilled.match(resultAction)) {
        // For now, navigate back to home
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to submit form:', err);
    }
  };
  
  // Get form field configuration for a specific field
  const getFieldConfig = (fieldId) => {
    return formFields.find(field => field.id === fieldId) || {};
  };
  
  // Get field text for a specific field
  const getFieldText = (fieldId) => {
    return pageText?.form?.[fieldId] || {};
  };
  
  // Render form field based on its type
  const renderField = (fieldId, validation) => {
    const fieldConfig = getFieldConfig(fieldId);
    const fieldText = getFieldText(fieldId);
    
    return (
      <FormField
        key={fieldId}
        id={fieldId}
        type={fieldConfig.type || 'text'}
        label={fieldText.title || ''}
        placeholder={fieldText.placeholder || ''}
        prefix={fieldConfig.prefix}
        value={validation.value}
        onChange={validation.handleChange}
        error={validation.error}
        required={fieldConfig.required}
        options={fieldConfig.options || []}
      />
    );
  };
  
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FieldsContainer>
          {renderField('random-id-1', fullNameValidation)}
          {renderField('random-id-2', mobileNumberValidation)}
        </FieldsContainer>
        
        <ErrorMessage show={!!error}>{error}</ErrorMessage>
        
        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={loading || !isFormValid}
        >
          {pageText?.primaryButton || 'Next'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default PersonalInfoForm;