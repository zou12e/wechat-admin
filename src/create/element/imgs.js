import { createListeners } from './utils';

export default function (h, item, model) {
  const imgs = model[item.prop].split(',');
  const options = item.options;
  let images = [];

  imgs.map((res) => {
    let iconUrl = '';
    options.imgUrl.map((item) => {
      if (res === item.typeId) { iconUrl = item.icon; };
    });

    images.push(h('img', {
      class: options.class,
      attrs: {
        style: 'margin: auto 5px',
        src: iconUrl,
        width: options.width,
        height: options.height
      },
      on: {
        ...createListeners(item.listeners, this)
      }
    }));
  });
  return images;
}
