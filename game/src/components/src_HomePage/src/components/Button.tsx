import { ButtonInterface } from "../types";
import styles from "./Button.module.css";

const Button = ({ text, filled, type, icon, onClick }: ButtonInterface) => {
  return (
    <button
      className={`${styles.btn} ${styles[type.toLowerCase()]} ${
        filled ? styles.filled : ""
      }`}
      onClick={() => {
        console.log("Button Clicked:", text); // Debugging log
        if (onClick) onClick();
      }}
    >
      <span>{text}</span>
      {icon}
    </button>
  );
};

export default Button;
