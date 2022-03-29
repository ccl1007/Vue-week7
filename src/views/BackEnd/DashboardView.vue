<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand active" to="/admin">後台</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupon">優惠劵</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">回到前台</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="this.signout">登出</a>
        </li>

      </ul>
    </div>
  </div>
</nav>
<!-- DashboardView集中管理進入admin頁面的權限所以在DashboardView 登入一次即可 -->
<!-- 搭配 <router-view> 可以不用每個頁面都做一次 check api 的驗證 -->
<!-- 初始值為false所以不會出現 -->
<router-view v-if="checkSuccess"></router-view>
</template>

<script>
// 登入驗證
export default {
  name: 'DashBoard',
  data () {
    return {
      checkSuccess: false
    }
  },
  mounted () {
    // 進入DashboardView立刻執行checkLogin
    this.checkLogin()
  },
  methods: {
    // methods 串接 check api 做 token 驗證
    checkLogin () {
      // 先存token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // 如果有token的話進行以下判斷
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`

        const api = `${process.env.VUE_APP_API}api/user/check`
        this.$http
          .post(api, { api_token: this.token })// 檢查token有沒有過期
          .then(() => {
            // 通過 check api 驗證後改為 true
            this.checkSuccess = true
          })
          .catch((err) => {
            alert(err.data.message)
            alert('請登入後台。')
            // 將畫面push回login
            this.$router.push('/login')
          })
      } else {
        alert('請登入後台。')
        // 將畫面push回login
        this.$router.push('/login')
      }
    },
    signout () {
      document.cookie = 'hexToken=;expires=;'
      alert('已登出後台(token 已清除)')
      // 回到前台
      this.$router.push('/')
    }
  }

}
</script>
