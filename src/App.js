import Header from '@common/components/header';
import Aside from '@common/components/aside';
import Breadcrumb from '@common/components/breadcrumb';

export default {
  render (h) {
    const name = this.$route.name;
    return name === 'signin' ? h('router-view') : h('div', {
      staticClass: 'app-wrapper'
    }, [
      h(Header),
      h(Aside),
      h('div', {
        staticClass: 'app-content-wrapper'
      }, [
        h('el-main', {
          staticClass: 'app-main'
        }, [
          h(Breadcrumb),
          h('router-view', {
            staticClass: 'app-content'
          })
        ])
      ])
    ]);
  }
};
