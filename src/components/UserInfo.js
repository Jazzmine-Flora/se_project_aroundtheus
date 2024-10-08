export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._userAvatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._userAvatarElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._jobElement.textContent = about;
    if (avatar) this._userAvatarElement.src = avatar;
  }
}
