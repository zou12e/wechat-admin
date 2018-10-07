import './image-view.less';
import Vue from 'vue';
import ImageViewOpt from './image-view';

const ImageView = Vue.extend(ImageViewOpt);
let imageView;

function newImageView() {
  imageView = new ImageView({
    el: document.createElement('div')
  });
  return imageView;
}
export default function (image) {
  if (typeof window === 'undefined') return;
  if (!imageView) newImageView();
  document.body.appendChild(imageView.$el);
  imageView.open([image]);
}
