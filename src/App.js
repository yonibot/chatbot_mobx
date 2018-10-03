import React, {Component} from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import {GRAY, CHAT_LIST_HEIGHT} from './constants/fontSettings';
import {InputModule} from './components/InputModule';
import {chatSession} from './models/stores/ChatSession';
import {MessagesView} from './components/MessagesView';
import {viewSettings} from './models/stores/ViewSettings';

const OuterFlex = styled.div`
  display: flex;
  justify-content: center;
`;

const InnerFlex = styled.div`
  height: ${CHAT_LIST_HEIGHT}px;
  width: 400px;
  box-shadow: 3px 3px 3px 3px ${GRAY};
  display: flex;
  flex-direction: column;
`;

const StyledMessagesView = styled.div`
  overflow: scroll;
  padding-bottom: 10px;
`;

const StyledInputView = styled.div`
  flex: 0.1;
`;

@observer class App extends Component {
  scrollRef = React.createRef ();

  componentDidMount = () => {
    chatSession.initializeSession ();
  };

  onSubmitUserInput = message => {
    chatSession.addUserInput (message);
  };

  render () {
    const {chatListHeight} = viewSettings;
    return (
      <OuterFlex>
        <InnerFlex>
          <StyledMessagesView>
            <MessagesView
              {...{
                messages: chatSession.messages,
                containerHeight: chatListHeight,
                scrollRef: this.scrollRef,
                addHeight: this.addHeight,
              }}
            />
          </StyledMessagesView>
          <StyledInputView>
            <InputModule {...{onSubmitUserInput: this.onSubmitUserInput}} />
          </StyledInputView>
        </InnerFlex>
      </OuterFlex>
    );
  }
}

export default App;
