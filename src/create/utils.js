export function createAction (action) {
  switch (typeof action) {
    case 'string':
      return (...args) => {
        return this[action].apply(this, args);
      };
    case 'object':
      return (model) => {
        const { url, method = 'post', params = (a) => { return a; }, successTip, success, error } = action;
        return this.$http[method](url, params(model))
          .then((result) => {
            if (successTip) this.$message.success(successTip);
            if (success) success.call(this, result);
          })
          .catch((reason) => {
            if (error) error.call(this, reason);
            return Promise.reject(reason);
          });
      };
    case 'function':
      return (...args) => action.apply(this, args);
  }
  return () => { };
}
