"use client";
import GameColor from "@/components/GameColor";
import { useEffect, useRef, useState } from "react";

const colors = ["red", "green", "blue", "yellow"];

export default function Home() {
  const [seq, setSeq] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndix, setPlayingIndix] = useState(0);
  const [strict, setStrict] = useState(false);
  const [restart, setRestart] = useState(false);
 // const [reset, setReset] = useState(false);
  const [notifications, setNotifications] = useState();
  const [stop, setStop] = useState(false);
  const redRef = useRef(null);
  const greenRef = useRef(null);
  const blueRef = useRef(null);
  const yellowRef = useRef(null);

  const handleStrictMood = () => {
    setStrict(!strict);
  };

  const resetGame = () => {
    setSeq([]);
    setIsPlaying(false);
    setPlayingIndix(0);
    setNotifications("X");
    setTimeout(() => {
      setNotifications(null);
    }, 1000);
  };

  const restartRound = () => {
    setNotifications("X");
    setStop(true);
    setTimeout(() => {
      setNotifications(null);
      setRestart(!restart);
      setPlayingIndix(0);
    }, 1000);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSeq = [...seq, color];
    setSeq(newSeq);
  };

  const handleStartGame = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      addNewColor();
    } else {
      //resetGame();
      // setSeq([]);
      // setPlayingIndix(0);
      // setReset(true);
      // setStop(true);
      // setStrict(false);
      // setTimeout(() => {
      //   const color = colors[Math.floor(Math.random() * 4)];
      //   setSeq([color]);
      // }, 1000);
    }
  };

  const handleColorClick = (e) => {
    if (isPlaying) {
      e.target.classList.add("opacity-50");
      e.target.querySelector("audio").currentTime = 0;
      e.target.querySelector("audio").play();
      setTimeout(() => {
        e.target.classList.remove("opacity-50");

        const clickedColor = e.target.id;
        if (seq[playingIndix] === clickedColor) {
          if (playingIndix === seq.length - 1) {
            //clicked last color of the seq
            setTimeout(() => {
              setPlayingIndix(0);
              addNewColor();
            }, 300);
          } else {
            // didnt click the full seq yet

            setPlayingIndix(playingIndix + 1);
          }
        } else {
          if (strict) {
            resetGame();
          } else {
            restartRound();
          }
        }
      }, 300);
    }
  };

  useEffect(() => {
    setStop(true);
    if (seq.length > 0) {
      const showSeq = (idx = 0) => {
        let ref = null;
        if (seq[idx] === "red") {
          ref = redRef;
        }
        if (seq[idx] === "green") {
          ref = greenRef;
        }
        if (seq[idx] === "blue") {
          ref = blueRef;
        }
        if (seq[idx] === "yellow") {
          ref = yellowRef;
        }

        // show color
        setTimeout(() => {
          ref.current.classList.add("brightness-[2.5]");
          ref.current.querySelector("audio").currentTime = 0;
          ref.current.querySelector("audio").play();

          setTimeout(() => {
            ref.current.classList.remove("brightness-[2.5]");
            if (idx < seq.length - 1) {
              showSeq(idx + 1);
            }
            if (idx === seq.length - 1) {
              setStop(false);
            }
          }, 300);
        }, 300);
      };
      showSeq();
    }
  }, [seq, restart]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-32">
      <div className="flex flex-row">
        <div className="mr-24 flex flex-col items-center">
          {/* title */}
          <div className="text-6xl font-sans font-extrabold text-[#FF6000]">
            Simon Says
          </div>
          {/* game status */}
          <div className="flex flex-row justify-between w-full mt-16">
            <div className="flex flex-col items-center">
              <div
                className="border-2 border-[#FFA559] bg-[#FFA559] w-8 h-8 rounded-full cursor-pointer mt-12 mb-2 p-2"
                onClick={handleStartGame}
              ></div>
              <div className="text-xl font-sans font-semibold text-[#FFE6C7]">
                START
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`border-2 border-[#FFA559] w-8 h-8 rounded-full cursor-pointer mt-12 mb-2 mr-16
              ${strict ? "bg-[#FFA559]" : ""}
              `}
                onClick={handleStrictMood}
              ></div>
              <div className="text-xl font-sans font-semibold text-[#FFE6C7] mr-16">
                STRICT
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="border-2 border-[#FFA559] w-20 h-12 rounded mt-8 mb-2 grid place-items-center text-xl text-[#FFA559]">
                {notifications
                  ? notifications
                  : seq.length === 0
                  ? "--"
                  : seq.length}
              </div>
              <div className="text-xl font-sans font-semibold text-[#FFE6C7]">
                COUNT
              </div>
            </div>
          </div>
        </div>
        {/* game */}
        <div className="grid grid-cols-2 gap-4 p-12">
          <GameColor
            name="yellow"
            color="bg-[#FFA90D]"
            ref={yellowRef}
            onClick={handleColorClick}
            audio="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
            stop={stop}
          />
          <GameColor
            name="red"
            color="bg-[#FF230D]"
            ref={redRef}
            onClick={handleColorClick}
            audio="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
            stop={stop}
          />
          <GameColor
            name="blue"
            color="bg-[#1980FF]"
            ref={blueRef}
            onClick={handleColorClick}
            audio="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
            stop={stop}
          />
          <GameColor
            name="green"
            color="bg-[#19FF83]"
            ref={greenRef}
            onClick={handleColorClick}
            audio="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
            stop={stop}
          />
        </div>
      </div>
    </main>
  );
}
