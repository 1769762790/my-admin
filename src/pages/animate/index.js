import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group'
import './index.less'

function Animate({ match }) {
    const [istoggle, setToggle] = useState(true)
  
    return (
      <div className="about">
        {istoggle.toString()}
        <button onClick={() => setToggle(!istoggle)}>click</button>
        <CSSTransition
          in={istoggle}
          classNames={{
            enter: 'animated',
            enterActive: 'bounceIn',
            exit: 'animated',
            exitActive: 'bounceOut',
          }}
          timeout={500}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className="box"></div>
        </CSSTransition>
      </div>
    )
  }
export default Animate;
