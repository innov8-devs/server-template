import Base from '../../base';
import axiosBase from '../../helper/axiosBase';
import { AuthenticationError } from 'apollo-server-express';
import { IFullUser } from '../../types';

class AuthDatasource extends Base {
  async accountLogin(user: { email: string; password: string }) {
    return new Promise((resolve, reject) => {
      axiosBase
        .post('/login', user)
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }

  async createNewAccount(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axiosBase
        .post('/', data)
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }

  async getCurrentUser(): Promise<IFullUser> {
    return new Promise((resolve, reject) => {
      axiosBase
        .get('/profile')
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e.response);
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }

  async updateUserAccount(data: any) {
    return new Promise((resolve, reject) => {
      axiosBase
        .post('/update-account', data)
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }

  async updateUserPassword(data: any) {
    return new Promise((resolve, reject) => {
      axiosBase
        .post('/update-password', data)
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }

  async getUserInformationUsingUsername(username: string) {
    return new Promise((resolve, reject) => {
      axiosBase
        .get(`/get-user-information-using-username`, {
          params: {
            username,
          },
        })
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e.response);
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }

  async resetUserPassword(data: any) {
    return new Promise((resolve, reject) => {
      axiosBase
        .post('/reset-password', data)
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }

  async disableUserAccount(data: any) {
    return new Promise((resolve, reject) => {
      axiosBase
        .post('/disable-account', data)
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }

  async userForgotPassword(data: any) {
    return new Promise((resolve, reject) => {
      axiosBase
        .post(`/forgot-password?email=${data}`)
        .then((data) => {
          resolve(data.data);
        })
        .catch((e) => {
          reject(new AuthenticationError(e?.response?.data?.message));
        });
    });
  }
}

export default AuthDatasource;
