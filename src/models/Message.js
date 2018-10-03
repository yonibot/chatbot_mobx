import React from 'react';
import botIcon from '../assets/mayas_avatar.png';
import userIcon from '../assets/user_avatar.png';

export class Message {
  isBot;
  text;

  constructor (text, isBot = false, isWritingAnimation = false) {
    this.text = text;
    this.isBot = isBot;
    this.isWritingAnimation = isWritingAnimation;
  }

  withIcon () {
    return true;
  }

  get icon () {
    return this.isBot
      ? <img {...{src: botIcon, alt: 'Bot icon', height: '40px'}} />
      : <img {...{src: userIcon, alt: 'User icon', height: '40px'}} />;
  }
}
