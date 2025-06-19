import React, { Component } from "react";
import MatadorBody from "./MatadorBody";

interface MatadorProps {
  applause?: number;
  matadorPosition?: number;
  setMatarodPosition?: (position: number) => void; // Виправлено опечатку
}

interface MatadorState {
  matadorPosition: number;
  lastApplause: number | null|undefined; // Прибрано undefined
  moveMessage: string | null; // Додано для сповіщення
}

class Matador extends Component<MatadorProps, MatadorState> {
  // Ініціалізація стану
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

    if (applause !== prevProps.applause && applause !== lastApplause) {
      this.setState({ lastApplause: applause }, () => {
        if (applause === 3) {
          this.playApplauseSound(applause);
        }
      });
    }
  }

  handleBullRun = (event: CustomEvent<{ position: number }>) => {
    const bullPosition = event.detail.position;
    const { matadorPosition } = this.state;

    if (bullPosition === matadorPosition) {
      let newPosition = Math.floor(Math.random() * 9);
      while (newPosition === matadorPosition) {
        newPosition = Math.floor(Math.random() * 9);
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

          setTimeout(() => {
            this.setState({ moveMessage: null });
          }, 2000);
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
      .catch(() => console.error("Audio playback failed. Please interact with the page first."));
  }

  render() {
    const { moveMessage } = this.state;
    return (
      <>
       <div className="box-canvas">
        <MatadorBody />
        {moveMessage && (
          <div
            style={{
              position: "relative",

              top: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(206, 178, 178, 0.7)",
              color: "red",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {moveMessage}
          </div>
        )}
      </div>
      </>

    );
  }
}

export default Matador;