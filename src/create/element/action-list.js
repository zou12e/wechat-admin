import createButton from './button';

export default function (h, item, model) {
  if (!item.actionList) return;
  return item.actionList.map((action) => createButton.call(this, h, { options: action }, model));
};
