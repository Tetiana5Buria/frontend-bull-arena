import React, { Component } from "react";
import styled from "styled-components";

const BoxCanvas = styled.div`
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
  background-color: rgba(206, 178, 178, 0.7);
  color: red;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  font-family: "Courier New", monospace;
`;

const BodyMatador = styled.div`
  position: relative;
  width: 50px;
  height: 100px;
  background: linear-gradient(to bottom,rgb(209, 206, 193),rgb(224, 218, 211)); /* Dark jacket with ornate brown pants */
  margin: auto;
  top: 50px;
  border-radius: 10px;
  z-index: 10;
  border: 2px solid gold;
`;

const MatadorHead = styled.div`
  position: relative;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: #ffe0bd;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5px;
`;

const MatadorHair = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 50px;
  height: 20px;
  background: #d3d3d3;
  clip-path: polygon(0% 0%, 100% 0%, 90% 50%, 80% 70%, 20% 70%, 10% 50%);
  border: 2px solid gold;
`;

const MatadorEyes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30px;
  margin-top: 5px;
`;

const MatadorEye = styled.div`
  width: 8px;
  height: 8px;
  background: white;
  border: 1px solid black;
  border-radius: 30%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgb(9, 128, 70);
    border-radius: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;


const MatadorMustache = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30px;
  margin-top: 5px;
`;

const Mustache = styled.div`
  width: 12px;
  height: 4px;
  background: #d3d3d3;
  border-radius: 2px;

  &.left {
    transform: rotate(-50deg);
  }

  &.right {
    transform: rotate(50deg);
  }
`;

const MatadorMouth = styled.div`
  position: relative;
  margin-top: 2px;
  width: 20px;
  height: 5px;
  background: red;
  border-radius: 0 0 50% 50%;
`;

const MatadorArms = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  width: 100%;
  height: 20px;
`;

const MatadorArm = styled.div`
  position: absolute;
  top: 0;
  width: 15px;
  height: 40px;
  border-radius: 10px;
  background:rgb(149, 145, 141); /* Matching dark jacket */
  border: 2px solid gold;

  &.left {
    left: -15px;
  }

  &.right {
    right: -15px;
  }
`;

const RedFlag = styled.div`
  z-index: 5;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  background-color: red;
  border-radius: 5px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(238, 222, 222, 0.5) 20%,
      rgba(255, 0, 0, 1) 50%,
      rgba(224, 198, 198, 0.5) 80%
    );
    animation: wave 2s infinite linear;
    transform: translateX(-100%);
  }

  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;

const MatadorLegs = styled.div`
  position: absolute;
  bottom: -30px;
  width: 100%;
  height: 60px;
  z-index: 1;
`;

const MatadorLeg = styled.div`
  position: absolute;
  bottom: 0;
  width: 15px;
  height: 60px;
  background:rgb(223, 215, 206); /* Matching ornate pants */
  border: 2px solid gold;
  border-radius: 10px;

  &.left {
    left: 5px;
  }

  &.right {
    right: 5px;
  }
`;

const MatadorBody = () => (
  <BodyMatador>
    <MatadorHead>
      <MatadorHair />
      <MatadorEyes>
        <MatadorEye />
        <MatadorEye />
      </MatadorEyes>
      <MatadorMustache>
        <Mustache className="left" />
        <Mustache className="right" />
      </MatadorMustache>
      <MatadorMouth />
    </MatadorHead>
    <MatadorArms>
      <MatadorArm className="left" />
      <MatadorArm className="right" />
    </MatadorArms>
    <RedFlag />
    <MatadorLegs>
      <MatadorLeg className="left" />
      <MatadorLeg className="right" />
    </MatadorLegs>
  </BodyMatador>
);


interface MatadorProps {
  applause?: number;
  matadorPosition?: number;
  setMatarodPosition?: (position: number) => void;
}

interface MatadorState {
  matadorPosition: number;
  lastApplause: number | null | undefined;
  moveMessage: string | null;
}




class OldMatador extends React.Component<MatadorProps, MatadorState> {
  state: MatadorState = {
    matadorPosition: 4,
    lastApplause: null,
    moveMessage: null,
  };

  componentDidMount() {
    document.addEventListener("bullRun", this.handleBullRun as EventListener);
  }

  componentWillUnmount() {
    document.removeEventListener("bullRun", this.handleBullRun as EventListener);
  }

  componentDidUpdate(prevProps: MatadorProps) {
    const { applause } = this.props;
    const { lastApplause } = this.state;

    if (applause !== prevProps.applause && applause !== lastApplause && applause !== undefined) {
      if (applause === 3) {
        this.setState({ lastApplause: applause }, () => {
          this.playApplauseSound(applause);
        });
      } else {
        this.playApplauseSound(applause);
      }
    }
  }

  shouldComponentUpdate(nextProps: MatadorProps, nextState: MatadorState) {
    return (
      nextProps.applause !== this.props.applause ||
      nextState.matadorPosition !== this.state.matadorPosition ||
      nextState.moveMessage !== this.state.moveMessage ||
      nextState.lastApplause !== this.state.lastApplause
    );
  }

  handleBullRun = (event: CustomEvent<{ position: number }>) => {
    const bullPosition = Number(event.detail.position);
    const { matadorPosition } = this.state;

    if (bullPosition === matadorPosition) {
      let newPosition = Math.floor(Math.random() * 9);
      while (newPosition === matadorPosition) {
        newPosition = Math.floor(Math.random() * 9);
      }

      const message = `OldMatador is moving from ${matadorPosition} to ${newPosition}`;
      console.log(message);

      this.setState(
        { matadorPosition: newPosition, moveMessage: message },
        () => {
          const { setMatarodPosition } = this.props;
          if (setMatarodPosition) {
            setMatarodPosition(newPosition);
          }
        }
      );
    }
  };

  playApplauseSound(applauseType: number) {
    const audioSrcMap: Record<number, string> = {
      0: "/sounds/applause0.wav",
      1: "/sounds/applause1.wav",
      2: "/sounds/applause2.wav",
      3: "/sounds/applause3.wav",
    };

    const audioSrc = audioSrcMap[applauseType];
    if (!audioSrc) {
      console.log("Sound not found");
      return;
    }

    const audio = new Audio(audioSrc);
    audio
      .play()
      .catch(() =>
        console.error(
          "Audio playback failed. Please interact with the page first."
        )
      );
  }

  render() {
    const { moveMessage } = this.state;

    return (
  <>

  <BoxCanvas>
    <MatadorBody />
    {moveMessage && <MoveMessage>{moveMessage}</MoveMessage>}
  </BoxCanvas>


  </>

    );
  }
}

export default OldMatador;