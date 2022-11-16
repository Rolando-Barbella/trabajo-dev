import { InputLabel } from "@material-ui/core";

function Label({text, required} : {text: string, required?: boolean}) {
  return (
    <InputLabel style={{ color: "#3f3f3f", paddingBottom: 10 }}>
      {required && "*"}
      {text}
    </InputLabel>
  );
}

export default Label;
