import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { disabled: boolean }>((theme) => ({
  container: {
    width: 'fit-content',
  },

  menuItemRoot: {
    '&:hover': {
      backgroundColor: '#B8B8B8',
    },
  },

  muiItemSelected: {
    backgroundColor: `#F8F8F9 !important`,
  },

  inputBaseFormControl: {
    border: 'none',
    padding: `${theme.spacing(1.25)} 0`,
  },

  inputBaseInput: {
    borderRadius: 35,
    position: 'relative',
    width: 'auto',
    height: theme.spacing(6),
    paddingTop: theme.spacing(1.25),
    paddingBottom: theme.spacing(1.25),
    paddingRight: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    border: ({ disabled }) =>
      disabled ? `2px solid ${theme.palette.text.disabled}` : `2px solid #B8B8B8`,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
    lineHeight: theme.typography.body1.lineHeight,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 35,
    },
  },
  inputLabel: { fontSize: theme.typography.body2.fontSize, zIndex: 1, left: theme.spacing(3) },
}));
