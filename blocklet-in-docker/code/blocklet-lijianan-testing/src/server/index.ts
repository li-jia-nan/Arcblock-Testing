import api from '../libs/api';

export interface User {
  name: string;
  phone: number;
  email: string;
}

class UserServer {
  private static prefix = '/api';

  static getInfo() {
    return api.request({
      method: 'GET',
      url: `${this.prefix}/data`,
    });
  }

  static modifyInfo(user: Partial<User>) {
    return api.request({
      method: 'POST',
      url: `${this.prefix}/data`,
      data: user,
    });
  }
}

export default UserServer;
