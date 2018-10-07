import { createListeners } from './utils';
import imageView from '@common/components/image-view';
export default function (h, item, model) {
  const src = model[item.prop];
  const options = item.options || {};
  return h('img', {
    class: options.class,
    style: {
      'cursor': 'pointer'
    },
    attrs: {
      src,
      width: options.width,
      height: options.height
    },
    on: {
      ...createListeners(item.listeners, this),
      click: () => {
        imageView(src);
        if (item.listeners && item.listeners.click) item.listeners.click.call(this, src);
      }
    }
  });
}
