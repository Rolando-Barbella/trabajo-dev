import { Theme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useStyles } from './styles';

const BootstrapSelect = withStyles((theme) => ({
  select: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '&:hover': {
      background: theme.palette.grey[50],
    },
  },
  icon: {
    color: '#B8B8B8',
    marginRight: theme.spacing(3),
  },
}))(Select);

interface SelectProps {
  optionId?: number;
  setOption: (option: number) => void;
  options: Array<any>;
  inputLabel?: string;
  loading?: boolean;

  /**
   * Determines whether the label is displayed inline with the
   * select options. If false, label is displayed above the select.
   * We have a slight variation in the select elements defined in the
   * mockups, so this helps to cater for both variants.
   */
  inlineLabel?: boolean;

  /**
   * Allows you to set styles on the BaseInput, which takes precedent
   * over any internal styles. This is useful where you want to set
   * specific width for the select based on screen size or content.
   */
  inputClass?: string;
  placeholder?: string;
  disableSelect?: boolean;
}

const usePlaceholderStyles = makeStyles<Theme, { disabled: boolean }>((theme) => ({
  placeholder: {
    color: ({ disabled }) => (disabled ? theme.palette.text.disabled : theme.palette.text.primary),
  },
}));

const Placeholder = ({ children, disabled }: { children: string; disabled: boolean }) => {
  const classes = usePlaceholderStyles({ disabled });
  return <div className={classes.placeholder}>{children}</div>;
};

export default function CustomizedSelects({
  options,
  inputLabel = '',
  // Prevents mui error that says this component
  // is chainging from uncontrolled to controlled
  optionId = -1,
  setOption,
  inlineLabel = false,
  inputClass = '',
  placeholder = '',
  disableSelect = false,
}: SelectProps): JSX.Element {
  const disabled = !options.length;
  const classes = useStyles({ disabled });
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOption(event.target.value as number);
  };
  return (
    <FormControl className={classes.container}>
      <BootstrapSelect
        disabled={disableSelect || disabled}
        value={optionId}
        onChange={handleChange}
        MenuProps={{
          style: {
            maxHeight: 300,
          },
        }}
        renderValue={() => <Placeholder disabled={disabled}>{placeholder}</Placeholder>}
        input={
          <InputBase
            classes={{
              formControl: classes.inputBaseFormControl,
              input: `${inputClass ?? inputClass} ${classes.inputBaseInput} `,
            }}
          />
        }
      >
        {options.map(({ value, label }) => (
          <MenuItem
            key={value}
            value={value}
            classes={{ root: classes.menuItemRoot, selected: classes.muiItemSelected }}
          >
            {inlineLabel && `${inputLabel}:`} {label}
          </MenuItem>
        ))}
      </BootstrapSelect>
    </FormControl>
  );
}
