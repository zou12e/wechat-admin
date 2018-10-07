import http from '@common/http';
import md5 from 'js-md5';

export function signin (username, password, validateCode) {
  return http.post('/admin/login', {
    username,
    password: md5(password),
    validateCode
  });
}

export function logout () {
  return http.post('/v1/manage/logout');
}

export function sendCode (username) {
  return http.post('/v1/manage/message/sms/sendCode/admin', {
    username
  });
}

export function getUserInfo (token) {
  return http.get('/v1/manage/info', { token });
}
