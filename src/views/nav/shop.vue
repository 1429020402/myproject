<template>
  <div class="shop">
    <div class="top">
      <div class="top_left">
        <h4>{{datalist.name}}</h4>
        <p>
          <van-rate
            v-model="value"
            allow-half
            void-icon="star"
            color="#ffd21e"
            void-color="#eee"
            :size="20"
          />
          <span>({{datalist.sellCount}})</span>
          <span>月销售{{datalist.sellCount}}单</span>
        </p>
      </div>
      <div class="top_right">
        <van-icon name="like" :color="Color" size="25" @click="isCollection" />
        <span style="font-size:14px;font-weight: bold;">{{iscolor?'已收藏':'收藏'}}</span>
      </div>
    </div>
    <div class="bottom">
      <p>
        <span style="color:#999;font-size:14px">起送价</span>
        <span style="font-size:18px">
          {{datalist.minPrice}}
          <small>元</small>
        </span>
      </p>
      <p>
        <span style="color:#999;font-size:14px">商家配送</span>
        <span style="font-size:18px">
          {{datalist.deliveryPrice}}
          <small>元</small>
        </span>
      </p>
      <p>
        <span style="color:#999;font-size:14px">平均配送时间</span>
        <span style="font-size:18px">
          {{datalist.deliveryTime}}
          <small>分钟</small>
        </span>
      </p>
    </div>
    <div class="activity">
      <div>
        <div class="activity_top">
          <h3>活动与公告</h3>
          <p>{{datalist.bulletin}}</p>
        </div>
        <div class="activity_bottom">
          <p v-for="(item,index) in datalist.supports" :key="index">
            <span>减</span>
            {{item}}
          </p>
        </div>
      </div>
    </div>
    <div style="width:100%;height:70px"></div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { shop_seller } from "@/api/apis";
export default {
  data() {
    return {
      value: 0,
      datalist: {},
      iscolor: false,
      Color: "#999",
    };
  },
  created() {
    shop_seller().then((res) => {
      this.datalist = res.data.data;
      this.value = res.data.data.score;
    });
  },
  mounted() {
    //better-scroll
    let activityscroll = new BScroll(".activity", { click: true });
    activityscroll;
  },
  methods: {
    isCollection() {
      this.iscolor = !this.iscolor;
      this.Color = this.iscolor ? "red" : "#999";
    },
  },
};
</script>

<style lang="less" scoped>
.shop {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f3f6f6;
  .top {
    background: #fff;
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    border-bottom: 1px solid #eaefee;
    .top_left {
      h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        span {
          margin: 0 5px;
        }
      }
    }
    .top_right {
      width: 42px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .bottom {
    background: #fff;
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    margin-bottom: 20px;
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-bottom: 10px;
        small {
          color: #999;
        }
      }
    }
  }
  .activity {
    flex: 1;
    overflow: scroll;
    background: #fff;

    .activity_top {
      padding: 20px;
      h3 {
        font-weight: normal;
        margin-bottom: 20px;
      }
      p {
        color: #fe3400;
        font-size: 14px;
        border-bottom: solid 1px #eaefee;
        padding-bottom: 20px;
      }
    }
    .activity_bottom {
      padding: 0px 20px;
      p {
        margin-bottom: 20px;
        span {
          display: inline-block;
          padding: 1px 4px;
          background: #f51312;
          color: #fff;
          font-size: 14px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>