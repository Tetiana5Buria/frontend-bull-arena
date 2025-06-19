import React, { Component } from "react";
import MatadorBody from "./MatadorBody";

interface MatadorProps {
  applause?: number;
  matadorPosition?: number;
  setMatarodPosition?: (position: number) => void;
}

interface MatadorState {
  matadorPosition: number;
  lastApplause: number |null| undefined;
}

class Matador extends Component<MatadorProps, MatadorState> {
  constructor(props: MatadorProps) {
    super(props);
    this.state = {
      matadorPosition: 4,
      lastApplause: null,
    };
  }

  componentDidMount() {
    document.addEventListener("bullRun", this.handleBullRun as EventListener);
  }

  componentWillUnmount() {
    document.removeEventListener("bullRun", this.handleBullRun as EventListener);
  }

  componentDidUpdate(prevProps: MatadorProps) {
    const { applause } = this.props;
    const { lastApplause } = this.state;

    if (applause !== lastApplause) {
      this.setState({ lastApplause: applause });

      if (applause === 3) {
        this.playApplauseSound(applause);
      }
    }
  }

  handleBullRun = (event: CustomEvent) => {
    const bullPosition = event.detail.position;
    const { matadorPosition } = this.state;

    if (bullPosition === matadorPosition) {
      let newPosition = Math.floor(Math.random() * 9);
      while (newPosition === matadorPosition) {
        newPosition = Math.floor(Math.random() * 9);
      }

      console.log(`Matador is moving from ${matadorPosition} to ${newPosition}`);
      this.setState({ matadorPosition: newPosition });

      const { setMatarodPosition } = this.props;
      if (setMatarodPosition) {
        setMatarodPosition(newPosition); // Синхронізуємо з ArenaWithBull
      }
    }
  };

  playApplauseSound(applauseType: number) {
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
  }

  render() {
    return (
      <div className="box-canvas">
        <MatadorBody />
      </div>
    );
  }
}

export default Matador;
