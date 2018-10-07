import User from '@common/models/user';

function checkAuth (config) {
  return {
    ...config,
    headers: {
      Authorization: User.state.token,
      ...config.headers
    }
  };
}

export default {
  request: checkAuth
};
