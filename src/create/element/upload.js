import config from '@common/config';
import User from '@common/models/user';

export default function (h, item, model) {
  const { options } = item;
  return h('el-upload', {
    staticClass: 'img-uploader',
    props: {
      showFileList: false,
      action: config.baseURL + options.action,
      headers: {
        Authorization: User.state.token
      },
      accept: 'image/bmp, image/jpeg, image/png',
      beforeUpload: ({ type, size }) => {
        if (['image/bmp', 'image/jpeg', 'image/png'].indexOf(type) === -1) {
          this.$message.error('只能上传 image/bmp, image/jpeg, image/png 格式的图片');
          return false;
        }

        if (size / 1024 / 1024 > 10) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
          return false;
        }

        return true;
      },
      onSuccess: (res, file) => {
        // model[item.prop] = URL.createObjectURL(file.raw);
        model[item.prop] = res.data;
      }
    }
  }, [
    model[item.prop] ? h('img', {
      staticClass: 'uploader-image',
      attrs: {
        src: model[item.prop]
      }
    }) : h('i', {
      staticClass: 'el-icon-plus uploader-icon'
    })
  ]);
};
