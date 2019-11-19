<template>
  <div class="login-div">
    <!-- <div v-if="loading" class="spinner-border"> -->
      <!-- 눈이 안보이는 사람을 위한 배려 귀를 통해 사용하기 때문에 소리로 알려주는 클래스 in bootstrap -->
      <div v-if="loading" class="justify-content-between" role="status">
        <b-button variant="success" disabled>
    <b-spinner small type="grow"></b-spinner>
    Loading...
  </b-button>
    </div>

    <!-- </div> -->
    <div v-else class="login-form">

      <div class="alert alert-danger" v-if="errors.length" >
        <h4>다음 오류를 해결해주세요</h4>
        <hr>
        <div v-for="(error, idx) in errors" v-bind:key="idx"> {{ error }} </div>
      </div>

      <div class="form-group">
      <label for="id">ID</label>  
      <!-- 이 라벨은 인풋의 id를 가리키는 라벨이다. -->
      <input type="text" id="id" class="form-control" placeholder="아이디를 입력해주세요." v-model="credentials.username" />
    </div>
    <div class="form-group">
      <label for="password">password</label>  
      <!-- 이 라벨은 인풋의 password를 가리키는 라벨이다. -->
      <input type="password" id="password" class="form-control" placeholder="비밀번호를 입력해주세요." v-model="credentials.password" @keydown.enter="login" />
    </div>
    <button class="btn btn-success" @click="login" >로그인</button>  
    </div>   
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router' // 로그인 한 후 홈페이지로 사용자를 보내기 위해 사용


export default {
  name: 'LoginForm',
  data() {
    return {
      credentials: {
        username:'',
        password:'',
      },
      loading: false,
      errors: [],
    }
  },
  methods: {
    login() {
      // 사용자가 입력한값이 문제[가 없다면]
      if (this.checkForm()) {
        this.loading = true // 로그인 요청 시작
        const SERVER_IP = process.env.VUE_APP_SERVER_IP
        console.log(SERVER_IP)
        // 포스트로만 받을 수 있기 때문에 포스트로 바꾸고
        axios.post(SERVER_IP+'/api-token-auth/', this.credentials)
          .then(response => {

            // vue-session 사용하기
            this.$session.start() // 세션을 초기화 하겠다.
            this.$session.set('jwt', response.data.token) // 응답 결과를 세션에 저장하겠다. (key, value)

            this.loading = false // 로그인 요청 완료

            router.push('/') // vue-router로 특정 페이지로 이동 즉 세션이 끝난 뒤에는 홈으로 보내겠다.
          }) 
          .catch(error => {
            console.error(error)
            this.loading = false
          })
      } 
    },
    checkForm() {
      this.errors = []
      if (!this.credentials.username) {
        this.errors.push('아이디를 입력해주세요.')
      }
      if (this.credentials.password.length < 8) {
        this.errors.push('비밀번호는 8글자 이상 입력해주세요.')
      }
      if (this.errors.length === 0) {
        return true
      }
     
    },
  },
}
</script>

<style>

</style>