import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import BaseTextField, { TextFieldProps } from '@mui/material/TextField';
import TypographyBase from '@mui/material/Typography';
import Warning from '@mui/icons-material/Warning';

export interface ZellarTextFieldProps {
  BaseTextFieldProps: TextFieldProps;
  className?: string;
}

export default function TextField({ helperText, className, style, error, ...rest }: TextFieldProps): JSX.Element {
  return (
    <div className={className} style={style}>
      <BaseTextField
        type="text"
        fullWidth
        error={error}
        {...rest}
        InputProps={{
          endAdornment: error ? (
            <InputAdornment position="end">
              <Warning/>
            </InputAdornment>
          ) : undefined,
        }}
      />
      {helperText && (
        <TypographyBase>
          {helperText}
        </TypographyBase>
      )}
    </div>
  );
}
