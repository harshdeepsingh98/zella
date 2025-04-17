/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
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
  selectIsFormStepValid,
} from '@features/form/selectors';
import { selectPersonalInfoText, selectPersonalInfoFields } from '@features/app/selectors';
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

  // Create an object to store all field validations
  const fieldValidations = {};

  // Filter fields that exist in both functional config and text config
  const validFields = formFields.filter(field => {
    const fieldId = field.id;
    return pageText?.form?.[fieldId] !== undefined;
  });

  // Get required field IDs from valid fields
  const requiredFieldIds = validFields.filter(field => field.required).map(field => field.id);

  // Initialize validation for each valid field
  validFields.forEach(field => {
    const fieldId = field.id;
    fieldValidations[fieldId] = useFormValidation(fieldId);
  });

  // Check if form is valid
  const isFormValid = useAppSelector(state => selectIsFormStepValid(state, requiredFieldIds));

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate all fields
    const validationResults = Object.values(fieldValidations).map(validation =>
      validation.validateField()
    );

    // If any field validation fails, return early
    if (validationResults.includes(false)) {
      return;
    }

    // Create form data object from all field values
    const formData = Object.entries(fieldValidations).reduce((data, [fieldId, validation]) => {
      data[fieldId] = validation.value;
      return data;
    }, {});

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

  // Get field text for a specific field
  const getFieldText = fieldId => {
    return pageText?.form?.[fieldId] || {};
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FieldsContainer>
          {validFields.map(fieldConfig => {
            const fieldId = fieldConfig.id;
            const validation = fieldValidations[fieldId] || {}; // Get validation or empty object if not required
            const fieldText = getFieldText(fieldId);

            return (
              <FormField
                key={fieldId}
                id={fieldId}
                type={fieldConfig.type || 'text'}
                label={fieldText.title || ''}
                placeholder={fieldText.placeholder || ''}
                prefix={fieldConfig.prefix}
                value={validation.value || ''}
                onChange={validation.handleChange || (() => {})}
                error={validation.error}
                required={fieldConfig.required}
                options={fieldConfig.options || []}
              />
            );
          })}
        </FieldsContainer>

        <ErrorMessage show={!!error}>{error}</ErrorMessage>

        <Button type="submit" fullWidth loading={loading} disabled={loading || !isFormValid}>
          {pageText?.primaryButton || 'Next'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default PersonalInfoForm;
