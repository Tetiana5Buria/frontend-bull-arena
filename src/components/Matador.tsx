import React, { useEffect, useState } from "react";
/* import "./matador.css"; */
import MatadorBodyy from "./MatadorBody";

interface MatadorProps {
  applause?: number;
  matadorPosition?: number;
  setMatarodPosition?: (position: number) => void;// nothing to return
}

export const Matador = ({ applause = 0, setMatarodPosition }: MatadorProps) => {
  const [matadorPosition, setPosition] = useState(4);//hook
  const [lastApplause, setLastApplause] = useState<number | null>(null);



//hook
  useEffect(() => {
    const handleBullRun = (event: CustomEvent) => {
      const bullPosition = event.detail.position;
      if (bullPosition === matadorPosition) {
        let newPosition= Math.floor(Math.random() * 9);
         while (newPosition === matadorPosition);
        console.log (`Matador is moving from ${matadorPosition} to ${newPosition}`);
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
  }, [matadorPosition, setMatarodPosition]); // Додаємо залежності

  useEffect(() => {
    if (applause !== lastApplause) {
      setLastApplause(applause);
      playApplauseSound(applause); // Відтворюємо звук для всіх applause
    }
  }, [applause, lastApplause]);

  const playApplauseSound = (applauseType: number) => {
    const sounds = [
      "/sounds/applause0.wav",
      "/sounds/applause1.wav",
      "/sounds/applause2.wav",
      "/sounds/applause3.wav",
    ];
    if (applauseType >= 0 && applauseType < sounds.length) {
      const audio = new Audio(sounds[applauseType]);
      audio.play();
    }
  };

  return (
    <div className="box-canvas">
    <MatadorBodyy/>
    </div>
  );
};

export default Matador;