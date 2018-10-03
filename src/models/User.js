import {computed, observable} from 'mobx';

export class User {
  @observable fullName;

  constructor (fullName) {
    this.fullName = fullName;
    this.save ();
  }

  static findSaved () {
    const user = localStorage.getItem ('currentUser');
    if (user) {
      const parsedUser = JSON.parse (user);
      return new User (parsedUser.fullName);
    }
  }

  save = () => {
    localStorage.setItem ('currentUser', JSON.stringify (this));
  };

  @computed get firstName () {
    return this.fullName.split (' ')[0];
  }
}
