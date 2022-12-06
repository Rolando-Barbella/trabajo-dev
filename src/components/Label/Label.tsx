import InputLabel from "@mui/material/InputLabel";

function Label({text, required} : {text: string, required?: boolean}) {
  return (
    <InputLabel style={{ color: "#3b3b3b", paddingBottom: 10, fontWeight: 600, fontSize: 16 }}>
      {text}
      {required && <span style={{ color: "red"}}>*</span>}
    </InputLabel>
  );
}

export default Label;
