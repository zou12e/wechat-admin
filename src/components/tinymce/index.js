import Tinymce from './tinymce';

Tinymce.install = function (Vue) {
  Vue.component(Tinymce.name, Tinymce);
};

export default Tinymce;
