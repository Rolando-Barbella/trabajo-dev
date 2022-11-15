import { InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

type SimpleSelectProps = {
  value?: string | number | undefined,
  defaultValue?: string | number | undefined,
  label: string,
  options: Array<any>,
  onChange: (e: React.ChangeEvent<Record<string, unknown>>) => void
  extraStyles?: Record<string, unknown>
  required?: boolean
}

const useStyles = makeStyles(() => ({
  select: {
    border: 'solid 1px #e5e7eb',
    padding: 4,
    borderRadius: 2,
  },
}));

function SimpleSelect({value, label, options, onChange, defaultValue, extraStyles, required} : SimpleSelectProps) {
  const styles = useStyles();

  return (
    <>
      <InputLabel id="demo-simple-select-label">{required && '*'}{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={defaultValue}
        value={value}
        label={label}
        className={styles.select}
        style={extraStyles}
        onChange={onChange}
        disableUnderline
      >
        {
          options.map(option => {
            return(
              <MenuItem key={option} value={option}>{option}</MenuItem>
            )
          })
        }
      </Select>
    </>
  );
}

export default SimpleSelect;