import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import BaseTextField, { TextFieldProps } from '@material-ui/core/TextField';
import TypographyBase, { TypographyProps as PropsBase } from '@material-ui/core/Typography';
import Warning from '@mui/icons-material/Warning';

export interface ZellarTextFieldProps {
  BaseTextFieldProps: TextFieldProps;
  className?: string;
}

export default function TextField({ helperText, className, style, error, ...rest }: TextFieldProps): JSX.Element {
  return (
    <div className={className} style={style}>
      <BaseTextField
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
