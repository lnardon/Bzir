import { useState, useCallback, useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
}

const BezierComponent = ({ setBezierValue }: { setBezierValue: any }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgSize, setSvgSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const [point1, setPoint1] = useState<Point>({ x: 20, y: 80 });
  const [point2, setPoint2] = useState<Point>({ x: 80, y: 20 });
  const [draggingPoint, setDraggingPoint] = useState<
    "point1" | "point2" | null
  >(null);

  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current) {
        setSvgSize({
          width: svgRef.current.clientWidth,
          height: svgRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseDown = useCallback((point: "point1" | "point2") => {
    setDraggingPoint(point);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!draggingPoint || !svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const newPosition = {
      x: ((e.clientX - svgRect.left) / svgRect.width) * 100,
      y: ((e.clientY - svgRect.top) / svgRect.height) * 100,
    };

    if (draggingPoint === "point1") {
      setPoint1(newPosition);
    } else if (draggingPoint === "point2") {
      setPoint2(newPosition);
    }
    setBezierValue(
      `cubic-bezier(${(point1.x / 100).toFixed(2)}, ${(
        Math.abs(point1.y - 100) / 100
      ).toFixed(2)}, ${(point2.x / 100).toFixed(2)}, ${(
        Math.abs(point2.y - 100) / 100
      ).toFixed(2)})`
    );
  };

  const handleMouseUp = useCallback(() => {
    setDraggingPoint(null);
    setBezierValue(
      `cubic-bezier(${(point1.x / 100).toFixed(2)}, ${(
        Math.abs(point1.y - 100) / 100
      ).toFixed(2)}, ${(point2.x / 100).toFixed(2)}, ${(
        Math.abs(point2.y - 100) / 100
      ).toFixed(2)})`
    );
  }, [point1, point2]);

  const cubicBezierValue = `cubic-bezier(${(point1.x / 100).toFixed(2)}, ${(
    Math.abs(point1.y - 100) / 100
  ).toFixed(2)}, ${(point2.x / 100).toFixed(2)}, ${(
    Math.abs(point2.y - 100) / 100
  ).toFixed(2)})`;

  const size = 512;

  return (
    <div style={{ width: size, height: size }}>
      <svg
        ref={svgRef}
        style={{ width: size, height: size }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        <rect width="100%" height="100%" fill="none" stroke="black" />
        <path
          d={`M0,${svgSize.height} C${(point1.x / 100) * svgSize.width},${
            (point1.y / 100) * svgSize.height
          } ${(point2.x / 100) * svgSize.width},${
            (point2.y / 100) * svgSize.height
          } ${svgSize.width},0`}
          stroke="white"
          strokeWidth={2}
          fill="none"
        />
        <circle
          cx={(point1.x / 100) * svgSize.width}
          cy={(point1.y / 100) * svgSize.height}
          r="16"
          fill="#ffba08"
          onMouseDown={() => handleMouseDown("point1")}
        />
        <circle
          cx={(point2.x / 100) * svgSize.width}
          cy={(point2.y / 100) * svgSize.height}
          r="16"
          fill="#48cae4"
          onMouseDown={() => handleMouseDown("point2")}
        />
      </svg>
      <div>CSS cubic-bezier: {cubicBezierValue}</div>
    </div>
  );
};

export default BezierComponent;
