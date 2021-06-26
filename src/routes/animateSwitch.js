import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import 'animate.css'

const AnimatedSwitch = props => {
    const { children } = props
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames={{
                enter: 'animated',
                enterActive: 'fadeInDown',
                exit: 'animated',
                exitActive: 'fadeOutDown'
              }}
              timeout={1000}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <Switch location={location}>{children}</Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    )
  }
   
  export default AnimatedSwitch