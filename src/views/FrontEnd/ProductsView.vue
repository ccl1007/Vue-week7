<template>
  <h2>產品列表</h2>
  <!-- 定義容器 -->
  <div class="container">
    <!-- row 決定內層的數量 -->
    <!-- 列 -->
    <!-- Gutters 是介於欄位之間的間隙 -->
    <div class="row row-cols-1 row-cols-lg-4 g-3">
      <!-- 內層不定義寬度 -->
      <!-- 欄 -->
      <!-- v-for在col裡運行 -->
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.imageUrl" class="card-img-top cover" :alt="product.title"  />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">
              {{ product.description }}
            </p>
            <!-- path: 'products/:id' -->
            <router-link :to="`/product/${product.id}`" class="btn btn-primary stretched-link ">
              更多商品細節
            </router-link>
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
      products: []
    }
  },
  methods: {
    //   取得產品列表
    getProducts () {
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`).then(
        (res) => {
          this.products = res.data.products
        }
      )
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style >
  .cover {
  object-fit: cover;
}
</style>
