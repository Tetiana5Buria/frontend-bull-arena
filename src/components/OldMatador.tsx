import React, { Component } from "react";
import styled from "styled-components";
import MatadorBody from "./MatadorBody";
import ArenaWithBull from "./ArenaWithBull";

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

const BoxCanvas = styled.div`

position: relative;
  margin: auto;
  display: block;
  /* margin-top: 100px; */
  /* margin-bottom: 100px; */
  width: calc(500px / 2);
  height: calc(400px / 2);

}
`;

const MoveMessage = styled.div`
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(206, 178, 178, 0.7);
  color: red;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
`;

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

/*   shouldComponentUpdate(nextProps: MatadorProps, nextState: MatadorState) {
    return (
      nextProps.applause !== this.props.applause ||
      nextState.matadorPosition !== this.state.matadorPosition ||
      nextState.moveMessage !== this.state.moveMessage ||
      nextState.lastApplause !== this.state.lastApplause
    );
  } */

  handleBullRun = (event: CustomEvent<{ position: number }>) => {
    const bullPosition = Number(event.detail.position);
    const { matadorPosition } = this.state;

    if (bullPosition === matadorPosition) {
      let newPosition = Math.floor(Math.random() * 8);
      while (newPosition === matadorPosition) {
        newPosition = Math.floor(Math.random() * 8);
      }

      const message = `Matador is moving from ${matadorPosition} to ${newPosition}`;
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