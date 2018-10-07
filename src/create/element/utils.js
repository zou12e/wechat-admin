export function createListeners (listeners = {}, context) {
  const map = {};
  Object.keys(listeners).forEach(key => {
    map[key] = function () {
      listeners[key].apply(context, arguments);
    };
  });
  return map;
}
