import User from '@common/models/user';
import { createAction } from '../utils';

export default function (h, item, model) {
  const options = item.options || {};
  const authorities = (User.state.authorities || []).map(item => (item.authority || ''));
  const authId = item.authId || options.authId;
  if (authId && authorities.indexOf(authId) === -1) return;
  return h('el-button', {
    props: {
      ...options
    },
    on: {
      click: () => {
        if (!options.action) return;
        const action = createAction.call(this, options.action);
        action.call(this, model);
      }
    }
  }, [
    options.label
  ]);
};
