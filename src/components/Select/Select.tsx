import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type SelectProps = {
  value?: string;
  defaultValue?: string | number | undefined;
  options: Array<string>;
  onChange: (e: { target: { value: string } }) => void;
  extraStyles?: Record<string, unknown>;
  required?: boolean;
  error?: string | boolean | undefined;
  minWidth?: number
};

export default function UISelect({ options, onChange, error, value, minWidth = 100 }: SelectProps): JSX.Element {
  const disabled = !options.length;
  return (
      <Select
        autoWidth
        id="countries"
        disabled={disabled}
        onChange={onChange}
        displayEmpty
        value={value}
        inputProps={{ 'aria-label': 'Without label' }}
        style={{ border: `1px solid ${error ? "red" : "#e5e7eb"}`, minWidth }}
      >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {options.map((option, i) => {
            return (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
  );
}
