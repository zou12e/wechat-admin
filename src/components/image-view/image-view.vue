<template>
<transition name="image-fade">
  <div class="image-view" @click.self="close" v-show="visible">
    <img v-if="images.length > 0" @dblclick="restore" title="点击可旋转图片" @click="rotate" :src="images[0]" alt="">
  </div>
</transition>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      images: []
    };
  },
  methods: {
    open (images = []) {
      this.images = images;
      this.visible = true;
    },
    close () {
      this.visible = false;
    },
    rotate (e) {
      const el = e.target;
      const clientX = e.clientX;
      let rotate = 0;
      const transform = el.style.transform || el.style.webkitTransform;
      if (transform) {
        const prefix = 'rotate(';
        const after = 'deg';
        rotate = Number(transform.substring(transform.indexOf(prefix) + prefix.length, transform.indexOf(after))) || 0;
      }
      rotate = `rotate(${clientX > window.innerWidth / 2 ? rotate + 90 : rotate - 90}deg)`;
      el.style.transform = rotate;
      el.style.webkitTransform = rotate;
    },
    restore (e) {
      const el = e.target;
      el.style.transform = '';
      el.style.webkitTransform = '';
    }
  }
};
</script>
<style>

</style>
