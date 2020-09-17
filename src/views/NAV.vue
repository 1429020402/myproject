<template>
  <div class="nav_box">
    <div class="header">
      <figure class="img">
        <img :src="dataObj.avatar" style="width:100%;height:100%"/>
      </figure>

      <div class="title">
        <h3>
          <span>品牌</span>
          {{dataObj.name}}
        </h3>
        <p>
          {{dataObj.description}}
          <b>/</b>
          {{dataObj.deliveryTime}}分钟送达
        </p>
        <p style="display:flex;align-items: center;">
          <span class="I">减</span>
          <span
            style="display:inline-block;width:70%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;"
          >{{list}}</span>
          <button @click="showPopup">{{listlength}}个></button>
        </p>
        <div class="Popup" v-show="show" @click="show=false">
          <div class="Popup_title">
            <h3>{{dataObj.name}}</h3>
            <van-rate
              v-model="value"
              allow-half
              void-icon="star"
              color="#ffd21e"
              void-color="#eee"
              :size="20"
            />
          </div>
          <div class="Popup_msg">
            <van-divider :style="{ color: '#fff', borderColor: '#717677', padding: '0 16px' }">优惠信息</van-divider>
            <p v-for="(ITem,INdex) in dataObj.supports" :key="INdex">
              <span>减</span>
              {{ITem}}
            </p>
          </div>
          <div class="Popup_notice">
            <van-divider :style="{ color: '#fff', borderColor: '#717677', padding: '0 16px' }">商家公告</van-divider>
            <p>{{dataObj.bulletin}}</p>
          </div>
        </div>
      </div>
    </div>
    <van-notice-bar
      left-icon="volume-o"
      :text="dataObj.bulletin"
      style="background:rgba(0,0,0,0.4) ;color:#fff"
    />
    <ul class="nav">
      <li @click="clickli('商品')" :class="{Add:Str=='商品'}">
        <router-link to="/">商品</router-link>
      </li>
      <li @click="clickli('评价')" :class="{Add:Str=='评价'}">
        <router-link to="/comment">评价</router-link>
      </li>
      <li @click="clickli('商家')" :class="{Add:Str=='商家'}">
        <router-link to="/shop">商家</router-link>
      </li>
    </ul>
    <transition name="slid-fade">
    <router-view></router-view>
    </transition>
    <!-- 过度动画 -->
    <transition name="slide-fade">
      <div v-show="isshow" class="Cart">
        <ShoppingCart></ShoppingCart>
      </div>
    </transition>
    <!-- 购物车 -->
    <div class="shop_car" @click="clickShow">
      <div class="service">
        <van-icon name="smile-o" />
        <span>联系客服</span>
      </div>
      <div class="Shopping">
        <div style="font-size:30px;margin-right:10px;padding:5px 5px 0px 5px;border-radius:50%" :class="{cartcolor:(newlist.length>0)}">
          <van-icon name="shopping-cart" color="#fff" />
          <span class="Icon_num" v-show="newlist.length>0">{{newlist.length}}</span>
        </div>
        <div class="Pic">
          <p style="color:#fff;font-size:20px">&yen;{{(total).toFixed(2)}}</p>
          <p style="font-size:14px">
            <span>另需配送费&yen;4元</span>
            <span>支持自取</span>
          </p>
        </div>
      </div>
      <small v-show="newlist.length<1" style="color:#aaa;margin-right:10px">&yen;20元起送</small>
      <small class="small_two" v-show="newlist.length>0">{{(total-20>0)?'结算':(total-20)}}</small>
    </div>
  </div>
</template>

<script>
import { shop_seller } from "@/api/apis";
import ShoppingCart from "@/views/ShoppingCart";
export default {
  data() {
    return {
      dataObj: {},
      show: false,
      value: 5,
      jump: false,
      list: "",
      listlength: 0,
      Str: "",
      isshow: false,
    };
  },
  components: {
    ShoppingCart,
  },
  created() {
    shop_seller().then((res) => {
      this.dataObj = res.data.data;
      this.list = this.dataObj.supports.join("");
      this.listlength = this.dataObj.supports.length;
    });
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    clickli(str) {
      this.Str = str;
    },
    clickShow() {
      if(this.newlist.length>0){
        this.isshow = !this.isshow;
      }
    },
  },
  //监听函数
  watch:{
    newlist(now){
      if(now.length==0){
        this.isshow=false
      }
    }
  },
  computed:{
    //获取vuex里的newlist
    newlist(){
      return this.$store.getters.newlist
    },
    total(){
      let total=0
      for (let obj of this.newlist) {
        total+=obj.num*obj.price
      }
      return total
    }
  }
};
</script>

<style lang="less" scoped>

.cartcolor{
  background: #ffc500;
}
.Add {
  background: #f3f6f6;
  border-bottom: 1px solid #999;
}
.small_two{
  color:#fff;
  font-size:20px;
  display: inline-block;
  background: #FFC500;
  height:100%;
  width:20%;
  text-align: center;
  line-height: 60px;
  border-left:2px solid #fff ;
}
.nav_box {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  .header {
    width: 100%;
    height: 150px;
    background: #5e0e14;
    display: flex;
    align-items: center;
    .img {
      flex: 3;
      margin: 10px;
      border-radius: 10px;
      overflow: hidden;
      // img {
      //   width: 100%;
      // }
    }
    .title {
      flex: 7;
      color: #fff;
      h3 {
        span {
          display: inline-block;
          padding: 2px 3px;
          background: red;
        }
      }
      p {
        font-size: 14px;
        margin: 12px 0;
        .I {
          background: #fff;
          display: inline-block;
          padding: 2px;
          color: salmon;
          font-size: 14px;
          margin-right: 5px;
        }
        button {
          background: rgba(0, 0, 0, 0.4);
          border: none;
          padding: 5px 10px;
          border-radius: 20px;
        }
      }
    }
  }
  .nav {
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 10px;
    li {
      width: 100%;
      height: 100%;
      text-align: center;
      a {
        text-decoration: none;
        color: #000;
      }
    }
  }
  .Cart {
    width: 100%;
    position: fixed;
    bottom: 0px;
    background: #fff;
  }
  .shop_car {
    width: 100%;
    height: 60px;
    background: #222;
    position: fixed;
    bottom: 10px;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #aaaaaa;
      padding: 0 10px;
      border-right: 2px solid #fff;
      span {
        font-size: 14px;
        margin-top: 5px;
      }
    }
    .Shopping {
      flex: 1;
      color: #aaa;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 10px;
      position: relative;
      .Icon_num{
        color: #fff;
        font-size: 14px;
        display: inline-block;
        background: red;
        padding: 1px 4px;
        border-radius: 50%;
        position: absolute;
        top: 0px;
        left:35px;
      }
      .Pic {
        span {
          display: inline-block;
          padding-right: 5px;
        }
      }
    }
  }
  .Popup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 999;
    .Popup_title {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      margin-top: 20px;
      h3 {
        margin-bottom: 15px;
      }
    }
    .Popup_msg {
      p {
        margin-left: 20px;
        font-size: 14px;
        span {
          display: inline-block;
          padding: 0px 2px;
          background: #fff;
          color: #f57270;
          margin-right: 5px;
        }
      }
    }
    .Popup_notice {
      p {
        font-size: 14px;
        margin-left: 20px;
        margin-right: 20px;
        line-height: 30px;
      }
    }
  }
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(100px);
    opacity: 0;
  }
  .slid-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slid-fade-leave-active {
    transition: all 0 ease;
  }
  .slid-fade-enter, .slid-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
}
</style>