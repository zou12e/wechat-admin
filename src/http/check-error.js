import User from '@common/models/user';
import { Message } from 'element-ui';

const checkError = res => {
  let errorMsg = '网络异常，请稍后重试';
  const { msg, code } = (res.data || {});
  errorMsg = msg || errorMsg;
  if (res.status === 200 && code === 1) return res.data.data;
  if ([300005, 300006, 300007, 300008].indexOf(code) !== -1) {
    User.logout();
    setTimeout(() => {
      location.replace('/signin');
    }, 1000);
  }

  Message.error({
    showClose: true,
    message: errorMsg,
    time: 1500
  });
  const httpError = new Error(errorMsg);
  httpError.code = code || res.status;
  httpError.message = errorMsg;
  throw httpError;
};

export default {
  response: checkError
};
