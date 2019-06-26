import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css';

/* 导入product示例数据 */
import product_data from './product.js'


Vue.use(VueRouter);
Vue.use(Vuex);

//路由配置
const RouterConfig = {
    //使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

const store = new Vuex.Store({
    state: {
        //商品列表数据
        productList: [],
        //购物车数据
        cartList: [],
    },
    getters: {
        //过滤品牌并去重
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return getFilterArray(brands);
        },
        //过滤颜色并去重
        colors: state => {
            const colors = state.productList.map(item => item.color);
            return getFilterArray(colors);
        }
    },
    mutations: {
        //添加商品列表
        setProductList(state, data) {
            state.productList = data;
        },
        //添加到购物车
        addCart(state, id) {
            //判断购物车是否已经有
            const isAdded = state.cartList.find(item => item.id === id);
            if (isAdded)
                isAdded.count++;
            else state.cartList.push({
                id: id,
                count: 1,
            })
        },
        //修改商品数量
        editCartCount(state, payload) {
            //ES6 语法 返回第一个满足条件的元素 
            const product = state.cartList.find(item => item.id === payload.id);
            product.count += payload.count;
        },
        //删除商品
        deleteCart(state, id) {
            //ES6 语法 返回第一个满足条件的元素索引 
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1);
        },
        //清空购物车
        emptyCart(state) {
            state.cartList = [];
        }
    },
    actions: {
        //请求商品列表
        getProductList(context) {
            //模拟异步获取数据
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 500);
        },
        //购买
        buy(context) {
            //模拟异步请求提交购买信息
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500)
            })
        }
    },
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => {
        return h(App);
    }
});

/**
 * 数组去重
 * @param {} array 
 */
function getFilterArray(array) {
    const res = [];
    const json = {};
    for (let i = 0; i < array.length; i++) {
        const _self = array[i];
        if (!json[_self]) {
            res.push(_self);
            json[_self] = 1;
        }
    }
    return res;
}