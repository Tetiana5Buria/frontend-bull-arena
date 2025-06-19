  import React, { useEffect, useState } from "react";

import MatadorBody from "./MatadorBody";

interface MatadorProps {
  applause?: number;
  matadorPosition?: number;
  setMatarodPosition?: (position: number) => void;// nothing to return
}

export const Matador:React.FC = ({ applause = 0, setMatarodPosition }: MatadorProps) => {
  const [matadorPosition, setPosition] = useState(4);//hook
  const [lastApplause, setLastApplause] = useState<number | null>(null); //nothing to return




//hook
 useEffect(() => {
  const handleBullRun = (event: CustomEvent) => {
    const bullPosition = event.detail.position;
    if (bullPosition === matadorPosition) {
      let newPosition = Math.floor(Math.random() * 8);
      while (newPosition === matadorPosition) {
        newPosition = Math.floor(Math.random() * 8);


      }
 console.log(`Matador is moving from ${matadorPosition} to ${newPosition}`);
      setPosition(newPosition);


      if (setMatarodPosition) {
        setMatarodPosition(newPosition); // Синхронізуємо з ArenaWithBull
      }
    }
  };

  document.addEventListener("bullRun", handleBullRun as EventListener);
  return () => {
    document.removeEventListener("bullRun", handleBullRun as EventListener);
  };
}, [matadorPosition, setMatarodPosition]);

 useEffect(() => {
  if (applause !== lastApplause) {
    setLastApplause(applause);

    if (applause === 3) {
      playApplauseSound(applause);
    }
  }
}, [applause, lastApplause]);

const playApplauseSound = (applauseType: number) => {
  let audioSrc = "";

    switch (applauseType) {
      case 0:
        audioSrc = "/sounds/applause0.wav";
        break;
      case 1:
        audioSrc = "/sounds/applause1.wav";
        break;
      case 2:
        audioSrc = "/sounds/applause2.wav";
        break;
      case 3:
        audioSrc = "/sounds/applause3.wav";
        break;
      default:
        console.log("Sound not found");

        return;
    }

    const audio = new Audio(audioSrc);
    audio
      .play()
      .catch(() => console.error("Audio playback failed. Please interact with the page first."));
  };

  return (
    <>
    <div className="box-canvas">
    <MatadorBody/>
    </div>
    </>

  );
};

export default Matador;
