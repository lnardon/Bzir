import AnimatedText from "animated-text-letters";
import "animated-text-letters/index.css";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-6 bg-white p-6 rounded-lg shadow">
      <h1 className="text-4xl font-black text-green-600">
        <AnimatedText
          text="Bezier"
          animation="slide-down"
          transitionOnlyDifferentLetters={true}
          delay={42}
          />
        </h1>
      <button
        className="px-4 py-2 bg-gray-900 rounded-md font-medium text-sm text-white"
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
