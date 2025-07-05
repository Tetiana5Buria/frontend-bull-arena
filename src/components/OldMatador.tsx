import React, { Component } from "react";
import styled from "styled-components";

const BoxCanvas = styled.div`
margin: auto;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
 width: calc(500px / 2);
  height: calc(400px / 2);
position: relative;
`;

const MoveMessage = styled.div`
position: absolute;
top: 80px;
left: 50%;
transform: translateX(-50%);
background-color: rgba(148, 115, 91, 0.7);
color: #fff;
padding: 8px 16px;
border-radius: 5px;
text-align: center;
font-size: 14px;
font-family: "Georgia", serif;
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
z-index:10;
`;

const BodyMatador = styled.div`
position: relative;
width: 60px;
height: 100px;
background: linear-gradient(
  to bottom,
  #2f2f2f 40%,
  #4a3728 100%
);
border-radius: 12px;
z-index: 10;
border: 3px solid #b8860b;
box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
`;

const MatadorHead = styled.div`
position: relative;
top:-50px;
left: 50%;
transform: translateX(-50%);
width: 50px;
height: 50px;
background: #e6c8a0;
border-radius: 50%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
padding-top: 8px;
box-shadow: inset 0 -2px 5px rgba(0, 0, 0, 0.2);
`;

const MatadorHair = styled.div`
position: absolute;
top: -8px;
left: -8px;
width: 66px;
height: 25px;
background: #a9a9a9;
clip-path: polygon(0% 0%, 100% 0%, 90% 60%, 80% 80%, 20% 80%, 10% 60%);
border: 2px solid #b8860b;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
`;

const MatadorEyes = styled.div`
display: flex;
justify-content: space-between;
width: 36px;
margin-top: 8px;
`;

const MatadorEye = styled.div`
width: 10px;
height: 10px;
background: #f5f5f5;
border: 1px solid #333;
border-radius: 50%;
position: relative;

&::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background: #2e5d34;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`;

const MatadorMustache = styled.div`
display: flex;
justify-content: space-between;
width: 40px;
margin-top: 6px;
`;

const Mustache = styled.div`
width: 16px;
height: 6px;
background: linear-gradient(to right, #a9a9a9, #808080);
border-radius: 3px;

&.left {
  transform: rotate(-45deg);
}

&.right {
  transform: rotate(45deg);
}
`;

const MatadorMouth = styled.div`
position: relative;
margin-top: 4px;
width: 24px;
height: 6px;
background: #8b0000;
border-radius: 0 0 50% 50%;
box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.3);
`;

const MatadorArms = styled.div`
position: absolute;
top: 15px;
left: 0;
right: 0;
width: 100%;
height: 25px;
`;

const MatadorArm = styled.div`
position: absolute;
top: 0;
width: 18px;
height: 50px;
border-radius: 12px;
background: linear-gradient(to bottom, #2f2f2f, #3c3c3c);
border: 2px solid #b8860b;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);

&.left {
  left: -18px;
  transform: rotate(10deg);
}

&.right {
  right: -18px;
  transform: rotate(-10deg);
}
`;

const RedFlag = styled.div`
z-index: 5;
position: absolute;
top: 40px;
left: 50%;
transform: translateX(-50%);
width: 120px;
height: 60px;
background: #8b0000;
border-radius: 5px;
overflow: hidden;
border: 2px solid #b8860b;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

&::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(139, 0, 0, 0.5) 20%,
    rgba(178, 34, 34, 0.8) 50%,
    rgba(139, 0, 0, 0.5) 80%
  );
  animation: wave 3s infinite ease-in-out;
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
width: 100%;
height: 100px;
gap:2px;
z-index: 1;
`;

const MatadorLeg = styled.div`
position: absolute;
bottom: 0;
width: 25px;
height: 80px;
gap:2px;
background: linear-gradient(to bottom, #4a3728, #3b2c1f);
border: 2px solid #b8860b;
border-radius: 12px;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);

&.left {
  left: 10px;
  transform: rotate(10deg);
}

&.right {
  right: 10px;
  transform: rotate(-10deg);
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

const App = () => (
<BoxCanvas className="mt-10">
  <MoveMessage>Seasoned Matador</MoveMessage>
  <MatadorBody />
</BoxCanvas>
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