import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {MessageLine} from './MessageLine';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const MessagesContainer = styled.div`
  height: ${({dynamicHeight}) => dynamicHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

@observer
export class MessagesView extends Component {
  static propTypes = {
    messages: PropTypes.array,
    containerHeight: PropTypes.number,
    scrollRef: PropTypes.object,
  };

  componentDidUpdate (prevProps) {
    if (prevProps.containerHeight !== this.props.containerHeight) {
      const node = ReactDOM.findDOMNode (this.props.scrollRef.current);
      node.scrollIntoView (false);
    }
  }

  render () {
    const {messages, containerHeight, scrollRef} = this.props;
    return (
      <MessagesContainer dynamicHeight={containerHeight}>
        {messages.slice ().map ((message, index) => {
          let hasIcon = true;
          if (
            messages.length > index + 1 &&
            messages[index + 1].isBot === message.isBot
          ) {
            hasIcon = false;
          }
          const isLastMessage = message === messages.slice ().reverse ()[0];
          return (
            <MessageLine
              {...{
                iconLeft: message.isBot,
                iconRight: !message.isBot,
                hasWaitEnabled: message.isBot,
                key: index,
                ...(hasIcon && {icon: message.icon}),
                ...(isLastMessage && {aRef: scrollRef}),
              }}
            >
              {message.text}
            </MessageLine>
          );
        })}
      </MessagesContainer>
    );
  }
}
