import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

export default {
  beforeEach (to, from, next) {
    NProgress.start();
    next();
  },
  afterEach () {
    NProgress.done();
  }
};
