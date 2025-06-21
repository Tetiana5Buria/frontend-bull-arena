import React from "react";
import Matador from "./Matador";
import "./matador.css"
import "./OldMatador"

export const MatadorBody =() =>{
    return(
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
    )
}
export default MatadorBody;