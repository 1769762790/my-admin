import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route } from "react-router-dom";
import "./index.less";

const TransitionMain = ({ children }) => {
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            appear={true}
            classNames="transition_main"
            key={location.pathname}
            timeout={300}
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    ></Route>
  );
};

export default TransitionMain;
