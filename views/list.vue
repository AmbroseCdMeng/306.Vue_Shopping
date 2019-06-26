<template>
  <!-- 商品列表信息 -->
  <div v-show="list.length">
    <!-- 控制层 -->
    <div class="list-control">
      <!-- 过滤按钮 -->
      <div class="list-control-filter">
        <span>品牌：</span>
        <span
          class="list-control-filter-item"
          :class="{on:item === filterBrand}"
          v-for="item in brands"
          :key="item.key"
          @click="handleFilterBrand(item)"
        >{{item}}</span>
      </div>
      <div>
        <span>颜色：</span>
        <span
          class="list-control-filter-item"
          :class="{on :item === filterColor}"
          v-for="item in colors"
          :key="item.key"
          @click="handleFilterColor(item)"
        >{{item}}</span>
      </div>
      <!-- 排序按钮 -->
      <div class="list-control-order">
        <span>排序：</span>
        <span
          class="list-control-order-item"
          :class="{on:order===''}"
          @click="handleOrderDefault"
        >默认</span>
        <span
          class="list-control-order-item"
          :class="{on:order==='sales'}"
          @click="handleOrderSales"
        >
          销量
          <template v-if="order === 'sales' ">↓</template>
        </span>
        <span
          class="list-control-order-item"
          :class="{on:order.indexOf('cost') > -1}"
          @click="handleOrderCost"
        >
          价格
          <template v-if="order === 'cost-asc'">↑</template>
          <template v-if="order === 'cost-desc'">↓</template>
        </span>
      </div>
    </div>
    <Product v-for="item in filteredAndOrderedList" :key="item.key" :info="item">
      <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关信息</div>
    </Product>
  </div>
</template>

<script>
/* 导入商品简介组件 */
import Product from "../components/product.vue";
export default {
  components: { Product },
  data() {
    return {
      //过滤
      filterBrand: "",
      filterColor: "",
      //排序
      order: "sales" //sale(销量);   cost-desc(价格降序);    cost-asc(价格升序)
    };
  },
  computed: {
    //源数据
    list() {
      return this.$store.state.productList;
    },
    //品牌
    brands() {
      return this.$store.getters.brands;
    },
    //颜色
    colors() {
      return this.$store.getters.colors;
    },
    /**
     * 过滤并排序
     */
    filteredAndOrderedList() {
      //复制原始数据    ES6语法 展开运算 相当于克隆数据
      let list = [...this.list];
      //按照品牌过滤
      if (this.filterBrand !== "") {
        list = list.filter(item => item.brand === this.filterBrand);
      }
      //按照颜色过滤
      if (this.filterColor !== "") {
        list = list.filter(item => item.color === this.filterColor);
      }
      //排序
      if (this.order != "") {
        switch (this.order) {
          case "sales":
            list = list.sort((a, b) => b.sales - a.sales);
            break;
          case "cost-desc":
            list = list.sort((a, b) => b.cose - a.cost);
            break;
          case "cost-asc":
            list = list.sort((a, b) => a.cose - b.cost);
            break;
          default:
            break;
        }
      }
      return list;
    }
  },
  mounted() {
    //初始化时通过 VueX 的 action 请求数据
    this.$store.dispatch("getProductList");
  },
  methods: {
    /**
     * 排序相关方法
     */
    handleOrderDefault() {
      this.order = "";
    },
    handleOrderSales() {
      this.order = "sales";
    },
    handleOrderCost() {
      if (this.order === "cost-desc") this.order = "cost-asc";
      else this.order = "cost-desc";
    },
    /**
     * 筛选相关方法
     */
    handleFilterBrand(brand) {
      //点击切换选中状态
      if (this.filterBrand === brand) this.filterBrand = "";
      else this.filterBrand = brand;
    },
    handleFilterColor(color) {
      if (this.filterColor === color) this.filterColor = "";
      else this.filterColor = color;
    }
  }
};
</script>


<style scoped>
.product-not-found {
  text-align: center;
  padding: 32px;
}

.list-control {
  background: #fff;
  border-radius: 6px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 1px, 1px, rgba(0, 0, 0, 0.2);
}

.list-control-filter {
  margin-bottom: 16px;
}

.list-control-filter-item,
.list-control-order-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  margin-right: 6px;
  padding: 2px 6px;
}

.list-control-filter-item.on,
.list-control-order-item.on {
  background: #f2352e;
  border: 1px solid #f2352e;
  color: #fff;
}
</style>

