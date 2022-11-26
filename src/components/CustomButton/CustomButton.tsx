import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";


type CustomButtonProps = {
  disabled?: boolean;
  text: string;
  type?: "button" | "reset" | "submit" | undefined,
}

const useStyles = makeStyles(() => ({
  container: {
    background: "#ff461f",
    width: 100,
    height: 50,
    color: '#fff',
   '&:hover': {
     background: "#ff6a4b",
    }
  },
}))

export function CustomButton({disabled, text, type = "submit"}: CustomButtonProps) {
  const styles = useStyles();

  return (
    <Button disabled={disabled} type={type} className={styles.container}>
      {text}
    </Button>
  );
}
