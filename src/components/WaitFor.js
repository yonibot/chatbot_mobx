import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {BOT_TYPING_DELAY_MS} from '../constants/botSettings';
import styled, {keyframes} from 'styled-components';

const fadeInOutKeyframes = keyframes`
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.2;
  }
`;

const FadeInOutText = styled.div`
  display: inline-block;
  animation: ${fadeInOutKeyframes} 1s infinite;
  font-size: 2rem;
  padding-bottom: 1rem;
`;

const AnimationContainer = () => (
  <FadeInOutText>
    ...
  </FadeInOutText>
);

@observer
export class WaitFor extends Component {
  static propTypes = {
    render: PropTypes.node,
  };
  @observable isWaiting = true;
  componentDidMount = () => {
    setTimeout (() => {
      this.isWaiting = false;
    }, BOT_TYPING_DELAY_MS);
  };

  waitingComponent () {
    return <AnimationContainer />;
  }

  render () {
    return this.isWaiting ? this.waitingComponent () : this.props.render;
  }
}
