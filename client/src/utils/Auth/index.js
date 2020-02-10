import moment from 'moment';
import Storage from '../Storage';

export default class Auth {
  /**
   * Authenticate an user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    Storage.setItem('token', token);
    Storage.setItem(
      'tokenExpiration',
      moment()
        .add(24, 'hours')
        .toDate()
    );
  }

  /**
   * Check if there is a token in the Local Storage and if is expired
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    const expired = moment(Storage.getItem('tokenExpiration')).isBefore(moment());
    return Storage.getItem('token') !== null && !expired;
  }

  /**
   * Deauthenticate an user. Clear the Local Storage.
   */
  static deauthenticateUser() {
    Storage.clear();
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken() {
    return Storage.getItem('token');
  }
}