  import React, { useEffect, useState, memo } from "react";
import styled from "styled-components";
import MatadorBody from "./MatadorBody";

const BoxCanvass = styled.div`
  position: relative;
  margin: auto;
  display: block;
  width: calc(500px / 2);
  height: calc(400px / 2);
`;

const MoveMessage = styled.div`
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  color: darkred;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  font-family: "Arial", sans-serif;
  z-index: 10;
`;

const Mustache = styled.div `
width: 10px;
  height: 3px;
  background: black;
  border-radius: 2px;
`


interface MatadorProps {
  applause?: number;
  matadorPosition?: number;
  setMatarodPosition?: (position: number) => void;// nothing to return
}
export const Matador: React.FC<MatadorProps> = ({ applause=0, setMatarodPosition }) => {
  const [matadorPosition, setPosition] = useState(4);//hook
  const [lastApplause, setLastApplause] = useState<number | null>(null); //nothing to return
  const [moveMessage, setMoveMessage] = useState<string | null>(null);



//hook
useEffect(() => {
  const handleBullRun = (event: CustomEvent<{ position: number }>) => {
    const bullPosition = event.detail.position;
    if (bullPosition === matadorPosition) {
      let newPosition = Math.floor(Math.random() * 9);
      while (newPosition === matadorPosition) {
        newPosition = Math.floor(Math.random() * 9);
      }
      const moveMessage = `Matador is moving from ${matadorPosition} to ${newPosition}`;
      console.log(moveMessage);
      console.log("Move message:", moveMessage);
      setPosition(newPosition);
      setMoveMessage(moveMessage);
      if (setMatarodPosition) {
        setMatarodPosition(newPosition);
      }
    }
  };

  document.addEventListener("bullRun", handleBullRun as EventListener);
  return () => {
    document.removeEventListener("bullRun", handleBullRun as EventListener);
  };
}, [matadorPosition, setMatarodPosition]);


useEffect(() => {
  if (moveMessage) {
    const timer = setTimeout(() => {
      setMoveMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [moveMessage]);

useEffect(() => {
  if (applause !== lastApplause && applause === 3) {
    setLastApplause(applause);
    playApplauseSound(applause);
  } else if (applause !== lastApplause) {
    playApplauseSound(applause);
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


    <BoxCanvass>
     <MatadorBody/>
    {moveMessage && <MoveMessage>{moveMessage}</MoveMessage>}
    </BoxCanvass>
  );
};


export default memo(Matador) ;
