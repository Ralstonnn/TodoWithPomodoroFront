export type UserProfile = {
  id: number;
  username: string;
  password: string;
};

type User = {
  profile: UserProfile | null;
  token: string | null;
};

export default class userService {
  static user: User = {
    profile: null,
    token: null,
  };

  static initUserData() {
    const localUserString = localStorage.getItem("user");
    if (!localUserString) return;
    this.user = JSON.parse(localUserString);
  }

  static saveUserData() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  static getToken() {
    return this.user.token;
  }

  static reset() {
    this.user = {
      profile: null,
      token: null,
    };
    localStorage.removeItem("user");
  }
}
