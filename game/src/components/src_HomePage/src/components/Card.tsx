import { CardInterface } from "../types";
import Button from "./Button";
import styles from "./Card.module.css";

const Card = ({ body, btn, indicator, title }: CardInterface) => {
  return (
    <article className={`stack-lg ${styles.card}`}>
      {indicator && <small className={styles.indicator}>{indicator}</small>}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.body}>{body}</p>

      {btn && (
        <Button
          filled={btn.filled}
          type={btn.type}
          text={btn.text}
          icon={btn.icon}
          onClick={() => {
            console.log("Card Button Clicked:", btn.text); // Debugging log
            if (btn.onClick) btn.onClick();
          }}
        />
      )}
    </article>
  );
};

export default Card;
