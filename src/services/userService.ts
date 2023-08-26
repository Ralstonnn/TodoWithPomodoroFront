import { $http } from "../api/http";

export default class userService {
  static user = {
    isLoggedIn: false,
  };

  static initUserData() {
    const localUserString = localStorage.getItem("user");
    if (!localUserString) return;
    this.user = JSON.parse(localUserString);
  }

  static saveUserData() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  static async authenticateUser() {
    return this.user.isLoggedIn;
  }

  static isAuthorized() {
    return this.user.isLoggedIn;
  }
}
