import Button from "@mui/material/Button";
import styles from './CustomButton.module.css'

type CustomButtonProps = {
  disabled?: boolean;
  text: string;
  type?: "button" | "reset" | "submit" | undefined,
  width?: number,
  height?: number,
}

export function CustomButton({disabled, text, type = "submit", width, height}: CustomButtonProps) {
  return (
    <Button disabled={disabled} type={type} className={styles.container} style={{width, height}}>
      {text}
    </Button>
  );
}
