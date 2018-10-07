import config from '@common/config';

export default {
  beforeEach (to, from, next) {
    const { title } = to.meta || {};
    document.title = title || config.title;
    next();
  }
};
