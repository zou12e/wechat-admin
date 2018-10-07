import User from '@common/models/user';

export default function (router) {
  return {
    beforeEach (to, from, next) {
      const { path } = to.meta;
      if (['signin', 'error'].indexOf(to.name) !== -1) return next();
      if (!User.state.token) return router.replace('/signin');
      if (!User.hasMenu(to.path) && !User.hasMenu(path)) return router.replace('/');
      next();
    }
  };
};
