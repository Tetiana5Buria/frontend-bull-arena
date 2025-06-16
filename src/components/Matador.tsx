import React, { useEffect, useState } from "react";
 import "./matador.css";



export const Matador = ({ applause = 0 }: { applause?: number }) => {
  const [matadorPosition, setPosition] = useState(4);
  const [lastApplause, setLastApplause] = useState<number | null>(null); // Останні оплески


  useEffect(() => {
    const handleBullRun = (event: CustomEvent) => {
      const bullPosition = event.detail.matadorPosition;
      if (bullPosition === matadorPosition) {
        const setNewPosition = Math.floor(Math.random() * 9); // Отримуємо нову випадкову позицію
        console.log(`Matador is moving from ${matadorPosition} to ${setNewPosition}`);
        setPosition(setNewPosition);
      }
    };

    document.addEventListener('bullRun', handleBullRun as EventListener);

    return () => {
      document.removeEventListener('bullRun', handleBullRun as EventListener);
    };
  }, [matadorPosition]);


  useEffect(() => {
    if (applause === 3 && lastApplause !== 3) {
      setLastApplause(3);
      playApplauseSound(3);
    } else if (applause !== lastApplause) {
      setLastApplause(applause);
      playApplauseSound(applause);
    }
  }, [applause, lastApplause]);


  const playApplauseSound = (applauseType: number) => {
    const sounds = [
      "/sounds/applause0.wav", // Звук для типу 0
      "/sounds/applause1.wav", // Звук для типу 1
      "/sounds/applause2.wav", // Звук для типу 2
      "/sounds/applause3.wav", // Звук для типу 3
    ];
    const audio = new Audio(sounds[applauseType]);
    audio.play();
  };

  return (
    <div className="canvas">
      <div className="bodyMatador">
        <div className="matador-head">
          <div className="matador-hair"></div>
          <div className="matador-eyes">
            <div className="matador-eye left"></div>
            <div className="matador-eye right"></div>
          </div>
          <div className="matador-mustache">
            <div className="mustache left"></div>
            <div className="mustache right"></div>
          </div>
          <div className="matador-mouth"></div>
        </div>
        <div className="matador-arms">
          <div className="matador-arm left"></div>
          <div className="matador-arm right"></div>
        </div>
        <div className="red-flag"></div>
        <div className="matador-legs">
          <div className="matador-leg left"></div>
          <div className="matador-leg right"></div>
        </div>
      </div>
    </div>
  );
};

export default (Matador);