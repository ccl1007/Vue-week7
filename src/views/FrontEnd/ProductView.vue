<template>
  <h2>單一產品</h2>
  <div class="container">
    <div class="card mb-12" style="max-width: 1320px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="product.imageUrl" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">{{ product.content }}</p>
        <p class="card-text"><small class="text-muted">{{ product.description }}</small></p>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      // $router->方法
      // $route->參數取值
      // 取得商品ID
      const { id } = this.$route.params
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`).then(
        (res) => {
          this.product = res.data.product
        }
      )
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
