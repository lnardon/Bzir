import AnimatedText from "animated-text-letters";
import "./App.css";
import Header from "./components/Header";
import CurveDraw from "./components/CurveDraw";
import { useRef, useState } from "react";

function App() {
  const [bezierValue, setBezierValue] = useState("0.185, 0.356, 0.78, 0.99");

  const slideRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  function updateValue(value: string) {
    setBezierValue(value);
    if (slideRef.current) {
      slideRef.current.style.animationTimingFunction = bezierValue;
    }
    if (scaleRef.current) {
      scaleRef.current.style.animationTimingFunction = bezierValue;
    }
    if (fadeRef.current) {
      fadeRef.current.style.animationTimingFunction = bezierValue;
    }
  }

  return (
    <div className="container">
      <Header />
      <div className="main">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
            }}
          >
            Shape the curve
          </h2>
          <CurveDraw setBezierValue={updateValue} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100%",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
            }}
          >
            Settings
          </h2>
          <div className="demo-container">
            <div ref={slideRef} className="square slide">
              slide-left
            </div>
            <div className="in-place-anim">
              <div className="square scale" ref={scaleRef}>
                scale-up
              </div>
              <div className="square fade" ref={fadeRef}>
                fade-in
              </div>
            </div>
          </div>
          <button className="playBtn">
            <AnimatedText
              text="Play Animation"
              animation="pop-up"
              animateOnlyDifferentLetters={true}
              delay={32}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
