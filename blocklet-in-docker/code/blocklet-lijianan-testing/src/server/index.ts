import api from '../libs/api';

export interface User {
  name: string;
  phone: number;
  email: string;
}

class UserServer {
  // private static prefix = '/api';

  static getInfo() {
    // return api.get(`${this.prefix}/data`);
    return api.get('/api/data');
  }

  static modifyInfo(user: Partial<User>) {
    // return api.patch(`${this.prefix}/data`, user);
    return api.patch('/api/modify', user);
  }
}

export default UserServer;
