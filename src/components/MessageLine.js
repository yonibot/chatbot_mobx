import React, {Component} from 'react';
import styled from 'styled-components';
import {LIGHT_GRAY} from '../constants/fontSettings';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {WaitFor} from './WaitFor';

const MessageContainer = styled.div`
  flex: 0.6;
  display: flex;
  justify-content: ${({iconLeft}) => (iconLeft ? 'flex-start' : 'flex-end')}
`;

const StyledMessage = styled.div`
  border-radius: 15px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${LIGHT_GRAY};
`;

const MessageWithOptionalIcon = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`;

const Icon = styled.div`
  flex: 0.2;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

@observer
export class MessageLine extends Component {
  @observable showWaitingAnimation = false;

  static propTypes = {
    iconLeft: PropTypes.bool,
    iconRight: PropTypes.bool,
    icon: PropTypes.element,
    hasWaitEnabled: PropTypes.bool,
    aRef: PropTypes.object,
  };

  static defaultProps = {
    iconLeft: false,
    iconRight: false,
    isWaiting: false,
  };

  render () {
    const {
      children,
      iconLeft,
      iconRight,
      icon,
      aRef,
      hasWaitEnabled,
    } = this.props;
    return (
      <MessageWithOptionalIcon ref={aRef}>
        <Icon>
          {iconLeft && icon}
        </Icon>
        <MessageContainer {...{iconLeft}}>
          <StyledMessage>
            {hasWaitEnabled ? <WaitFor render={children} /> : children}
          </StyledMessage>
        </MessageContainer>
        <Icon>
          {iconRight && icon}
        </Icon>
      </MessageWithOptionalIcon>
    );
  }
}
