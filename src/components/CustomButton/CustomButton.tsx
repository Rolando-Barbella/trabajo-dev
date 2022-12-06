import Button from "@mui/material/Button";
import styles from './CustomButton.module.css'
import './CustomButton.module.css'

type CustomButtonProps = {
  disabled?: boolean;
  text: string;
  type?: "button" | "reset" | "submit" | undefined,
}

export function CustomButton({disabled, text, type = "submit"}: CustomButtonProps) {
  return (
    <Button disabled={disabled} type={type} className={styles.container} classes={{root: 'green'}}>
      {text}
    </Button>
  );
}
