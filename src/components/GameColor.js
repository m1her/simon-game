"use client";
import { forwardRef } from "react";

const GameColor = forwardRef((props, ref) => (
  <div
    className={`w-32 h-32 rounded-md ${props.color} cursor-pointer transition-all delay-250
    ${props.stop ? "pointer-events-none" : "pointer-events-auto"}
    `}
    ref={ref}
    onClick={props.onClick}
    id={props.name}
  >
    <audio>
      <source src={props.audio} type="audio/mpeg"></source>
    </audio>
  </div>
));

export default GameColor;
