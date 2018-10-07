// import { createAction } from './utils';
export default function (options) {
  const actions = options.actions;
  if (!actions) return;
  // console.log(this);
  // Object.keys(actions).forEach(key => {
  //   actions[key] = createAction.call(this, actions[key]);
  // });

  return {
    methods: {
      ...actions
    }
  };
}
