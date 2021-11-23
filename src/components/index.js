import opendplayer from '@/components/video/openDPlayer.vue';

const components = [
  opendplayer
]
const UI = {
  install: function(Vue) {
    components.map(v => {
      Vue.component(v.name, v)
    })
  }
};
export default UI
