import {observable, reaction} from 'mobx';
import {CHAT_LIST_HEIGHT} from '../../constants/fontSettings';
import {chatSession} from './ChatSession';

class ViewSettings {
  @observable chatListHeight = CHAT_LIST_HEIGHT;

  constructor () {
    reaction (
      () => chatSession.messages.length,
      () => {
        this.increaseChatMenuHeight ();
      }
    );
  }

  increaseChatMenuHeight () {
    this.chatListHeight += 30;
  }
}

export const viewSettings = new ViewSettings ();
