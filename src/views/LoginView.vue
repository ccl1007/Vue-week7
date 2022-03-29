<template>
    <div class="container">
            <div class="row justify-content-center">
                <h1 class="h3 mb-3 font-weight-normal">
                    請先登入
                </h1>
                <div class="col-8">
                    <!-- 加入@submit.prevent="login" 調用login函式 -->
                    <form id="form" class="form-signin" @submit.prevent="this.signin">
                        <div class="form-floating mb-3">
                            <!-- v-model加入資料雙向綁定user.username -->
                            <input type="email" class="form-control" id="username" placeholder="name@example.com"
                                required autofocus v-model="user.username">
                            <label for="username">Email address</label>
                        </div>
                        <div class="form-floating">
                            <!-- v-model加入資料雙向綁定user.password -->
                            <input type="password" class="form-control" id="password" placeholder="Password" required
                                v-model="user.password">
                            <label for="password">Password</label>
                        </div>
                        <!-- button 使用submit提交整個表單  -->
                        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
                            登入
                        </button>
                    </form>
                </div>
            </div>
            <p class="mt-5 mb-3 text-muted">
                &copy; 2021~∞ - Lian Chen
            </p>
        </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user).then((response) => {
        // 定義response中的token, expired timestamp
        const { token, expired } = response.data
        // console.log(token, expired)
        // 寫入 cookie token
        // expires 設置有效時間
        // 在登入後台時需要先把 response 回來的 token 存到 Cookie
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`
        // 頁面跳轉至AdminProducts
        this.$router.push('/admin/products')
      }).catch((error) => {
        alert(error.data.message)
      })
    }
  }
}
</script>
<style>
        .form-signin {
            width: 100%;
            max-width: 330px;
            padding: 15px;
            margin: auto;
        }
</style>
