import React, { useRef, useEffect } from "react";

const PaintCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas background to white
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Example: Draw a rectangle
    ctx.strokeStyle = "black";
    ctx.strokeRect(20, 20, 150, 100);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={636}
      height={471}
      style={{ border: "1px solid #000" }}
    />
  );
};

export default PaintCanvas;

