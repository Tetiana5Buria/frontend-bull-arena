import React, { useEffect, useState } from "react";
 import "./matador.css";
/*import React, { useEffect, useState } from 'react'; */


export const Matador = ({ applause }: { applause: number }) => {
  const [position, setPosition] = useState(4); // Початкова позиція
  const [lastApplause, setLastApplause] = useState<number | null>(null); // Останні оплески

  // Обробка події bullRun
  useEffect(() => {
    const handleBullRun = (event: CustomEvent) => {
      const bullPosition = event.detail.position;
      if (bullPosition === position) {
        const newPosition = Math.floor(Math.random() * 9); // Отримуємо нову випадкову позицію
        console.log(`Matador is moving from ${position} to ${newPosition}`);
        setPosition(newPosition);
      }
    };

    document.addEventListener("bullRun", handleBullRun as EventListener);

    return () => {
      document.removeEventListener("bullRun", handleBullRun as EventListener);
    };
  }, [position]);

  // Реакція на зміну applause
  useEffect(() => {
    if (applause === 3 && lastApplause !== 3) {
      setLastApplause(3); // Оновлюємо останні оплески
      playApplauseSound(3); // Відтворюємо звук для типу 3
    } else if (applause !== lastApplause) {
      setLastApplause(applause); // Оновлюємо стан для інших типів овацій
      playApplauseSound(applause); // Відтворюємо відповідний звук
    }
  }, [applause, lastApplause]);

  // Програвання звуку овацій
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

export default React.memo(Matador);