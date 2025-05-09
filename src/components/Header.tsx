import AnimatedText from "animated-text-letters";
import "animated-text-letters/index.css";

const Header: React.FC = () => {
  return (
    <header
      style={{
        animation: "popUp 1s ease forwards",
      }}
      className="flex items-center justify-between mb-6 bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-black text-green-600">
          <AnimatedText
            text="Bzir"
            animation="slide-down"
            transitionOnlyDifferentLetters={true}
            delay={42}
          />
        </h1>
        <p className="font-normal text-sm text-gray-500">
          <AnimatedText
            text="Create custom cubic-bezier curves to add them to your animations."
            animation="slide-left"
            transitionOnlyDifferentLetters={true}
            delay={25}
            animationDuration={500}
            easing="cubic-bezier(0.42, 0.00, 0.58, 1.00)"
          />
        </p>
      </div>
      <button
        className="px-4 py-2 bg-green-600 rounded-md font-medium text-sm text-white hover:scale-105 hover:bg-green-700 transition-all ease duration-300"
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
