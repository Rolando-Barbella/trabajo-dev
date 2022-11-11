import { Button, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
type SimpleSelectProps = {
  value: string | number,
  label: string,
  target: string,
}

const useStyles = makeStyles((theme) => ({
  select: {
    border: 'solid 1px #e5e7eb',
    padding: 4,
    borderRadius: 2,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'red',
    },
  },
}));

function SimpleSelect({value, label, target} : SimpleSelectProps) {
  const styles = useStyles();

  return (
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={2}
        value={value}
        label="Steps"
        className={styles.select}
        onChange={(e) => formik.setFieldValue('hiringSteps', e.target.value)}
        disableUnderline
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </>
  );
}

export default SimpleSelect;