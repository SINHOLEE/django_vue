<template>
  <div id="app">
    <div id="nav">
      <div v-if="isLogedIn">
        <router-link to="/">Home</router-link> |
        <a @click.prevent="logout" href="/logout" >Logout</a>
        
      </div>
      <div v-else>
        <router-link to="/login"  >Login</router-link> 
      </div>
      <!-- a태그를 사용하는 이유. 해당 컴포넌트가 존재하지도 않고 랜더링할 필요가 없기 때문에 -->
      <!-- prevent를 사용하는 이유. href로 redirect하지 못하게 강제하기 위해 -->
    </div>
    <div class="container col-6">
      <router-view/>
    </div>
  </div>
</template>
<script>
import router from '@/router' // 로그인 한 후 홈페이지로 사용자를 보내기 위해 사용
export default {
  name:'App',
  data() {
    return {
      isLogedIn : this.$session.has('jwt'),
    }
  },
  methods:{
    logout() {
      this.$session.destroy()
      router.push('/login')
    }
  },
  // data의 변화가 일어나는 시점에 실행하는 함수
  updated() {
    this.isLogedIn = this.$session.has('jwt')
  }
}
</script>


<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
