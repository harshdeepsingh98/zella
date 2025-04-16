import { useState, useCallback } from 'react';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { updateFormField, setValidationError } from '@features/form/formSlice';
import { selectFormField, selectFieldValidationError } from '@features/form/selectors';
import { selectPersonalInfoFields } from '@features/app/selectors';

// Custom hook for form field validation
const useFormValidation = (fieldId) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => selectFormField(state, fieldId));
  const error = useAppSelector((state) => selectFieldValidationError(state, fieldId));
  const formFields = useAppSelector(selectPersonalInfoFields);
  
  // Find field config from app state
  const fieldConfig = formFields.find(field => field.id === fieldId);
  
  // Handle change
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    dispatch(updateFormField({ field: fieldId, value: newValue }));
  }, [dispatch, fieldId]);
  
  // Validate field
  const validateField = useCallback(() => {
    if (!fieldConfig) return true;
    
    // If field is required but empty
    if (fieldConfig.required && (!value || value.trim() === '')) {
      dispatch(setValidationError({ 
        field: fieldId, 
        error: 'This field is required' 
      }));
      return false;
    }
    
    // If field has validations
    if (fieldConfig.validations && value) {
      for (const validation of fieldConfig.validations) {
        switch (validation.type) {
          case 'greaterThanLength':
            if (value.length <= validation.value) {
              dispatch(setValidationError({ 
                field: fieldId, 
                error: `Must be more than ${validation.value} characters` 
              }));
              return false;
            }
            break;
            
          case 'lessThanLength':
            if (value.length >= validation.value) {
              dispatch(setValidationError({ 
                field: fieldId, 
                error: `Must be less than ${validation.value} characters` 
              }));
              return false;
            }
            break;
            
          case 'regex':
            try {
              const regex = new RegExp(validation.value);
              if (!regex.test(value)) {
                dispatch(setValidationError({ 
                  field: fieldId, 
                  error: 'Invalid format' 
                }));
                return false;
              }
            } catch (e) {
              console.error('Invalid regex:', validation.value);
            }
            break;
            
          default:
            break;
        }
      }
    }
    
    // Clear any errors if validation passes
    if (error) {
      dispatch(setValidationError({ field: fieldId, error: null }));
    }
    
    return true;
  }, [value, fieldConfig, dispatch, fieldId, error]);
  
  return {
    value: value || '',
    error,
    handleChange,
    validateField,
    required: fieldConfig?.required || false,
  };
};

export default useFormValidation;