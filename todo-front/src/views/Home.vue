<template>
  <div class="home">
    <h1>This is homepage</h1>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'home',
  methods:{
    // 사용자 로그인 유무를 확인하여 로그인되어있지 않을 시 로그인 페이지로 보내겠다.
    checklogedin() {
      // 1. 세션을 시작해서 
      this.$session.start()
      // 2. jwt가 있는지 확인하겠다.
      if (!this.$session.has('jwt')) { // jwt가 없다면, 로그인 페이지로 보내겠다.
        router.push('/login')

      }
    }
  },
  // vue가  화면에 그려지면 실행하는 함수
  mounted() {
    // 화면이 켜져있을 때 이 함수를 실행하겠다.
    this.checklogedin()
  }
}
</script>

<style>

</style>
