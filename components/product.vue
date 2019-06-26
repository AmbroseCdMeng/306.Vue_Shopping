<template>
  <!-- 商品信息组件 -->
  <div class="product">
    <router-link :to="'/product/' + info.id" tag="a" class="product-main">
      <img :src="info.image" alt>
      <h4>{{info.name}}</h4>
      <div class="product-color" :style="{background:colors[info.color]}"></div>
      <div class="product-cose">￥{{info.cost}}</div>
      <!-- 阻止事件冒泡，否则会在点击按钮同时触发 routerlink 进入详情页的 a 标签 -->
      <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div>
    </router-link>
  </div>
</template>

<script>
/**
 * info 数据结构
 *  {
 *      id:1,
 *      name:'AirPods',
 *      brand:'Apple',
 *      image:'http://ordfm6aah.bkt.clouddn.com/shop/1.jpeg',
 *      sales:10000,
 *      cost:1288,
 *      color:'White'
 *  }
 */

export default {
  props: {
    info: {
      type: Object
    }
  },

  data() {
    return {
      colors: {
        白色: "#FFFFFF",
        金色: "#DAC272",
        蓝色: "#233472",
        红色: "#F2352E"
      }
    };
  },

  methods: {
    handleCart() {
      this.$store.commit("addCart", this.info.id);
    }
  }
};
</script>


<style scoped>
.product {
  width: 25%;
  float: left;
}
.product-main {
  display: block;
  margin: 16px;
  padding: 16px;
  border: 1px solid #dddee1;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  text-align: center;
  position: relative;
}

.product-main img {
  width: 100%;
}

h4 {
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-main:hover h4 {
  color: #0070c9;
}

.product-color {
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #dddee1;
  border-radius: 50%;
  margin: 6px auto;
}

.product-cost {
  color: #de4037;
  margin-top: 6px;
}

.product-add-cart {
  display: none;
  padding: 4px 8px;
  background: #2d8cf0;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
}

.product-main:hover .product-add-cart {
  display: inline-block;
}
</style>

