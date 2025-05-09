import { useState, useEffect, useRef } from "react";
import BezierCanvas from "./components/BezierCanvas";
import ControlPanel from "./components/ControlPanel";
import AnimationPreview from "./components/AnimationPreview";
import Header from "./components/Header";
import { DEFAULT_BEZIER_POINTS } from "./utils/constants";
import { Point } from "./types";

function App() {
  const [bezierPoints, setBezierPoints] = useState<Point[]>(
    DEFAULT_BEZIER_POINTS
  );
  const [duration, setDuration] = useState(1.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canvasSize, setCanavasSize] = useState(400);

  const editorRef = useRef<HTMLDivElement>(null);

  const updateBezierPoints = (points: Point[]) => {
    setBezierPoints(points);
  };

  const toggleAnimation = () => {
    setIsPlaying((prev) => !prev);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 10);
  };

  useEffect(() => {
    const size = editorRef?.current?.getBoundingClientRect().width || 400;
    setCanavasSize(size - 48);
  }, [editorRef]);

  useEffect(() => {
    document.addEventListener("resize", () => {
      const size = editorRef?.current?.getBoundingClientRect().width || 400;
      setCanavasSize(size - 48);
    });
  }, []);

  return (
    <div className="flex items-center min-h-screen bg-gray-200 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div
            style={{
              animation: "popUp 0.8s 0.2s ease-in-out forwards",
            }}
            className="flex items-center justify-center lg:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden opacity-0"
          >
            <div className="w-full p-6" ref={editorRef}>
              <h2 className="text-xl font-semibold text-gray-800">Editor</h2>
              <p className="mb-4 font-normal text-sm text-gray-500">
                Drag the green control points to adjust the curve
              </p>
              <div className="flex justify-center">
                <BezierCanvas
                  points={bezierPoints}
                  onChange={updateBezierPoints}
                  size={canvasSize}
                />
              </div>
            </div>
          </div>

          <div className="flex col-span-2 flex-col gap-6">
            <div
              style={{
                animation: "popUp 0.6s 0.6s ease forwards",
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden opacity-0"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Preview
                </h2>
                <AnimationPreview
                  bezierPoints={bezierPoints}
                  duration={duration}
                  setDuration={setDuration}
                  isPlaying={isPlaying}
                  toggleAnimation={toggleAnimation}
                />
              </div>
            </div>

            <div
              style={{
                animation: "popUp 0.6s 0.8s ease forwards",
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden opacity-0"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Controls
                </h2>
                <ControlPanel
                  bezierPoints={bezierPoints}
                  updateBezierPoints={updateBezierPoints}
                  resetAnimation={resetAnimation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
