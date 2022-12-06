type SelectProps = {
  value?: string | number | undefined;
  defaultValue?: string | number | undefined;
  options: Array<any>;
  onChange: (e: { target: { value: string } }) => void;
  extraStyles?: Record<string, unknown>;
  required?: boolean;
  error?: string | boolean | undefined;
};

export default function Select({ options, onChange, error }: SelectProps): JSX.Element {
  const disabled = !options.length;
  return (
    <>
      <select
        id="countries"
        disabled={disabled}
        onChange={onChange}
        style={{ border: `1px solid ${error ? 'red': '#e5e7eb'}`}}
        className={`bg-gray-50 transition ease-in-out border border-gray-300  text-gray-900 text-sm rounded-sm  focus:ring-blue-500   focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-350 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      >
        {options.map((option, i) => {
          return (
            <option key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
}
