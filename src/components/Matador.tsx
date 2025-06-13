
 import "./matador.css";
/*import React, { useEffect, useState } from 'react'; */
export const Matador = () => (
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



/* export const Matador = () => <div className="matador">i am matador</div> */
