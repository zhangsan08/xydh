<template>
  <div id='particles-js'></div>
</template>
 
<script>
import p1 from '@/assets/p1.json'
import p2 from '@/assets/p2.json'
import p3 from '@/assets/p3.json'
import p4 from '@/assets/p4.json'

export default {
  props: ['bglizi'],
  name: 'ParticlesJS',
  mounted () {
    require('particles.js')
    this.$nextTick(() => {
      this.initParticlesJS()
    })
  },
  methods: {
    initParticlesJS () {
      /* eslint-disable */
      switch (this.bglizi) {
        case 1:
          particlesJS('particles-js', p1)
          break;
        case 2:
          particlesJS('particles-js', p2)
          break;
        case 3:
          particlesJS('particles-js', p3)
          document.getElementsByTagName("body")[0].setAttribute("style","background-color: rgb(21, 67, 151);background-size: 60%;background-position: 0 50%;background-image: url(https://cdn.xydh.fun/cat.gif)");
          break;
        case 4:
          particlesJS('particles-js', p4)
          break;
        default:
          break;
      }
    }
  }
}
</script>
 
<style>
#particles-js{
  width: 100%;
  height: 100%;
  /* background-color: #e76392; */
  /* background-image: url('./img/5.jpg'); */
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  position:fixed;
  /* z-index:-1; */
}
</style>
