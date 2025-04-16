import React from 'react';
import styled from 'styled-components';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import ErrorMessage from './ErrorMessage';

const FieldContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  
  .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  
  .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

const FormField = ({
  type = 'text',
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  options = [],
  prefix,
  helperText,
  ...props
}) => {
  const renderField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <StyledTextField
            id={id}
            name={name || id}
            type={type}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={!!error}
            required={required}
            variant="outlined"
            fullWidth
            InputProps={
              prefix
                ? {
                    startAdornment: (
                      <InputAdornment position="start">{prefix}</InputAdornment>
                    ),
                  }
                : undefined
            }
            {...props}
          />
        );

      case 'select':
        return (
          <StyledFormControl variant="outlined" error={!!error} required={required}>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
              labelId={`${id}-label`}
              id={id}
              value={value}
              onChange={onChange}
              label={label}
              {...props}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </StyledFormControl>
        );

      case 'multi-select':
        return (
          <StyledFormControl variant="outlined" error={!!error} required={required}>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
              labelId={`${id}-label`}
              id={id}
              multiple
              value={Array.isArray(value) ? value : []}
              onChange={onChange}
              label={label}
              {...props}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </StyledFormControl>
        );

      case 'checkbox':
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id={id}
                  name={name || id}
                  checked={!!value}
                  onChange={onChange}
                  {...props}
                />
              }
              label={label}
            />
            {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
          </FormGroup>
        );

      case 'radio':
        return (
          <StyledFormControl error={!!error} required={required}>
            {label && <InputLabel shrink>{label}</InputLabel>}
            <RadioGroup
              id={id}
              name={name || id}
              value={value || ''}
              onChange={onChange}
              {...props}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </StyledFormControl>
        );

      default:
        return (
          <StyledTextField
            id={id}
            name={name || id}
            type="text"
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={!!error}
            required={required}
            {...props}
          />
        );
    }
  };

  return (
    <FieldContainer>
      {renderField()}
      <ErrorMessage show={!!error}>{error}</ErrorMessage>
    </FieldContainer>
  );
};

export default FormField;