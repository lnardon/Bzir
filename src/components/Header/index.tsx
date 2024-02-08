import AnimatedText from "animated-text-letters";
import "animated-text-letters/dist/index.css";
import styles from "./styles.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <AnimatedText
        text="Bezier"
        animation="slide-down"
        animateOnlyDifferentLetters={true}
        delay={39}
      />
      <button
        className={styles.sourceBtn}
        onClick={() => {
          window.open("https://github.com/lnardon/Bzir", "_blank");
        }}
      >
        View Source Code
      </button>
    </header>
  );
};

export default Header;
