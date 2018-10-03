import {observable, reaction} from 'mobx';
import {Message} from '../Message';
import {BOT_SCRIPT} from '../../constants/BotScript';
import {BOT_RESPOND_DELAY_MS} from '../../constants/botSettings';
import {User} from '../User';

class ChatSession {
  @observable messages = [];
  @observable currentUser = User.findSaved ();
  @observable submittedUserInput;

  initializeSession () {
    if (this.currentUser) {
      this.returnUserSequence ();
    } else {
      this.newUserSequence ();
    }
  }

  returnUserSequence () {
    this.addBotMessages ([
      BOT_SCRIPT.greetOnReturn (this.currentUser.firstName),
      BOT_SCRIPT.listAnyMathExpression,
    ]);
    this.mathSequence ();
  }

  newUserSequence () {
    this.addBotMessages ([BOT_SCRIPT.hiImMaya, BOT_SCRIPT.tellMeName]);
    this.respondWith (() => {
      this.currentUser = new User (this.submittedUserInput);
      this.addBotMessages ([
        BOT_SCRIPT.greetNiceToMeet (this.currentUser.firstName),
        BOT_SCRIPT.howItsGoingToWork,
        BOT_SCRIPT.listAnyMathExpression,
      ]);
      this.mathSequence ();
    });
  }

  mathSequence () {
    this.respondWith (() => {
      this.addBotMessages ([
        eval (this.submittedUserInput),
        BOT_SCRIPT.thisWasEasy,
      ]);
      this.mathSequence ();
    });
  }

  addUserInput (message) {
    this.submittedUserInput = message;
    this.messages.push (new Message (message, false));
  }

  addBotMessages (messages) {
    let waitingMs = BOT_RESPOND_DELAY_MS;
    messages.forEach (message => {
      setTimeout (() => {
        this.messages.push (new Message (message, true));
      }, waitingMs);
      waitingMs += waitingMs;
    });
  }

  respondWith (callback) {
    reaction (
      () => this.submittedUserInput,
      (userInput, reaction) => {
        callback ();
        reaction.dispose ();
      }
    );
  }
}

const chatSession = new ChatSession ();

export {chatSession};
