# vue_django

1. todo-back으로 백앤드 단을 관리할것이다.
2. venv로 관리하자.. 이거 다시 한번 알아봐야겠어
   - `venv` 로 `3.7.4`버전인지 확인.

### cors 오류

- 발생하는 이유 : 한 도메인에서 다른 도메인으로 요청을 보낼 수 없다. 해결하기 위해서 화이트리스팅이라는 작업을 한 뒤 요청을 보내야 한다. 즉 장고측에서 뷰의 접근을 허락해주는 작업이 필요하다.

  ```bash
  #설치파일
  $ python manage.py startapp todos
  $ pip install djangorestframework
  $ pip install djangorestframework-jwt
  $ pip install django-cors-headers
  ```

- settings.py 설정

  ```
  #1 서드파티 등록
      'rest-framework',
      'corsgeaders',
  
  #2 미들웨어 위에 등록
  REST_FRAMEWORK = {
      # 로그인 여부를 확인해주는 클래스
      'DEFAULT_PERMISSION_CLASSES': (
          'rest_framework.permissions.IsAuthenticated',
      ),
  
      # 인증여부를 확인하는 클래스
      'DEFAULT_AUTHENTICATION_CLASSES': (
          'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
          'rest_framework.authentication.SessionAuthentication',
          'rest_framework.authentication.BasicAuthentication',
      ),
  }
  
  # 3
  JWT_AUTH = {
      # token 을 서명할 시크릿 키를 등록(절대 외부 노출 금지)
      'JWT_SECRET_KEY': SECRET_KEY, # default가 settings.SECRET_KEY임 하지만 명시적으로 사용합시다.
      'JWT_ALGORITHM': 'HS256', # 기본
      'JWT_ALLOW_REFRESH': True, # 토큰을 새로 발급해주는 옵션?
      'JWT_EXPIRATION_DELTA': datetime.timedelta(days=10),  # 유효기간, import datetime 필요
      'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28), # 28일 마다 토큰이 갱신(유효기간 연장 시)
  
      # 로그인할때는 두개의 토큰이 발행
      #1 access token -> 어떤 요청을 보낼때마다 필요한 토큰
      #2 refresh token -> access token을 보낼때마다 필요한 토큰... 사용자 편의를 위한것?
  
  
  
  }
  
  MIDDLEWARE = [
      # 4
      # https://github.com/adamchainz/django-cors-headers  setup
      'corsheaders.middleware.CorsMiddleware',
  
      'django.middleware.security.SecurityMiddleware',
      'django.contrib.sessions.middleware.SessionMiddleware',
      'django.middleware.common.CommonMiddleware',
      'django.middleware.csrf.CsrfViewMiddleware',
      'django.contrib.auth.middleware.AuthenticationMiddleware',
      'django.contrib.messages.middleware.MessageMiddleware',
      'django.middleware.clickjacking.XFrameOptionsMiddleware',
  ]
  
  # 5 5~6 둘중 하나만 사용하라
  # https://github.com/adamchainz/django-cors-headers whitelist
  CORS_ORIGIN_WHITELIST = [
      "https://example.com",
      "https://sub.example.com",
      "http://localhost:8080",    
      "http://127.0.0.1:9000"
  ]
  #6
  CORS_ORIGIN_ALLOW_ALL = True # If True, the whitelist will not be used and all origins will be accepted. Defaults to False.
  
  
  ```

- urls.py

  ```
  # http://jpadilla.github.io/django-rest-framework-jwt/#usage
  from rest_framework.views import obtain_jwt_token  # 제공되는 뷰함수
  urlpatterns = [
      path('admin/', admin.site.urls),
      path('api-token-auth/', obtain_jwt_token),
  ]
  
  ```

- models.py

  ```
  
  ```

  

- front

  ```
  # 뷰세션 다운받기 
  npm i vue-session
  
  ```

- main.js

  ```
  import VueSession from 'vue-session'
  import App from './App.vue'
  import router from './router'
  
  Vue.use(VueSession) // 이제부터 세션 스토리지를 사용할 수 있게 되었다.
  
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  
  ```

  ```
  원본
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import VueSession from 'vue-session'
  import App from './App.vue'
  import router from './router'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  
  Vue.use(BootstrapVue)
  Vue.use(VueSession) // 이제부터 세션 스토리지를 사용할 수 있게 되었다.
  Vue.config.productionTip = false
  
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  
  ```

  