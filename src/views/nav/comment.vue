<template>
  <div class="comment">
    <div class="top">
      <div class="top_left">
        <h4>5.0</h4>
        <p style="color:#000;font-size:16px;">综合评分</p>
        <p>高于周边商品96%</p>
      </div>
      <div class="top_right">
        <p>
          <span>服务态度</span>
          <van-rate
            v-model="value"
            allow-half
            void-icon="star"
            color="#ffd21e"
            void-color="#eee"
            :size="22"
          />
          <span style="color:#ffd21e;">{{value}}</span>
        </p>
        <p>
          <span>菜品质量</span>
          <van-rate
            v-model="value1"
            allow-half
            void-icon="star"
            color="#ffd21e"
            void-color="#eee"
            :size="22"
          />
          <span style="color:#ffd21e;">{{value1}}</span>
        </p>
        <p>
          <span>送达时间</span>
          <span style="font-size:14px;color:#999">20分钟</span>
        </p>
      </div>
    </div>
    <div class="content">
      <div>
        <van-tabs type="card" color="#ffc500" style="background: #fff;" class="Tab">
          <van-tab title="全部">
            <div class="Item" v-for="(item,index) in datalist" :key="index">
              <figure class="Img">
                <img :src="item.avatar" style="width: 100%;border-radius: 50%;"/>
              </figure>
              <div class="card">
                <p class="c_one">
                  <span style="color:#000;font-weight: bold;">{{item.username}}</span>
                  <span>{{item.rateTime}}</span>
                </p>
                <p class="c_two">
                  <van-rate
                    v-model="value2"
                    allow-half
                    void-icon="star"
                    color="#ffd21e"
                    void-color="#eee"
                    :size="20"
                  />
                  <span style="font-size:14px;color:#999;margin-left:20px">{{item.deliveryTime}}分钟送达</span>
                </p>
                <p class="c_three">{{item.text}}</p>
                <div>
                  <van-icon name="good-job" color="#ffc401" style="font-size: 20px;" />
                  <span v-for="(data,index) in item.recommend" :key="index">{{data}}</span>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="满意">
            <div class="Item" v-for="(item,index) in goodarr" :key="index">
              <figure class="Img">
                <img :src="item.avatar" style="width: 100%;border-radius: 50%;"/>
              </figure>
              <div class="card">
                <p class="c_one">
                  <span style="color:#000;font-weight: bold;">{{item.username}}</span>
                  <span>{{item.rateTime}}</span>
                </p>
                <p class="c_two">
                  <van-rate
                    v-model="value2"
                    allow-half
                    void-icon="star"
                    color="#ffd21e"
                    void-color="#eee"
                    :size="20"
                  />
                  <span style="font-size:14px;color:#999;margin-left:20px">{{item.deliveryTime}}分钟送达</span>
                </p>
                <p class="c_three">{{item.text}}</p>
                <div>
                  <van-icon name="good-job" color="#ffc401" style="font-size: 20px;" />
                  <span v-for="(data,index) in item.recommend" :key="index">{{data}}</span>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="不满意">
            <div class="Item" v-for="(item,index) in oldarr" :key="index">
              <figure class="Img">
                <img :src="item.avatar" style="width: 100%;border-radius: 50%;"/>
              </figure>
              <div class="card">
                <p class="c_one">
                  <span style="color:#000;font-weight: bold;">{{item.username}}</span>
                  <span>{{item.rateTime}}</span>
                </p>
                <p class="c_two">
                  <van-rate
                    v-model="value2"
                    allow-half
                    void-icon="star"
                    color="#ffd21e"
                    void-color="#eee"
                    :size="20"
                  />
                  <span style="font-size:14px;color:#999;margin-left:20px">{{item.deliveryTime}}分钟送达</span>
                </p>
                <p class="c_three">{{item.text}}</p>
                <div>
                  <van-icon name="good-job" color="#ffc401" style="font-size: 20px;" />
                  <span v-for="(data,index) in item.recommend" :key="index">{{data}}</span>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { shop_ratings } from "@/api/apis";
import { mytime } from "@/utils/utils";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      value: 2.5,
      value1: 3,
      value2: 5,
      datalist: [],
      goodarr:[],
      oldarr:[]
    };
  },
  created() {
    shop_ratings().then((res) => {
      for (let obj of res.data.data) {
        obj.rateTime = mytime(obj.rateTime);
      }

      this.datalist = res.data.data;

      this.goodarr = this.datalist.filter((item) => {
        return item.score >= 4;
      });

      this.oldarr = this.datalist.filter((item) => {
        return item.score < 4;
      });
    });
  },
  mounted() {
    let contentscroll = new BScroll(document.querySelector(".content"),{click:true});
    contentscroll
  },
};
</script>

<style lang="less" scoped>
.comment {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f3f6f6;
  .top {
    background: #fff;
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    .top_left {
      padding: 5px;
      flex: 3;
      border-right: 1px solid #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      color: #999;
      h4 {
        color: #ffc400;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p {
        margin-bottom: 10px;
      }
    }
    .top_right {
      flex: 7;
      padding: 10px;
      font-size: 16px;
      p {
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          margin-right: 5px;
        }
      }
    }
  }
  .content {
    flex: 1;
    overflow: scroll;
    .Tab {
      .Item {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #eee;
        .Img {
          flex: 2;
          // img {
          //   width: 100%;
          //   border-radius: 50%;
          // }
        }
        .card {
          flex: 8;
          overflow: scroll;
          padding: 5px;
          .c_one {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #999;
            margin-bottom: 5px;
          }
          .c_two {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
          }
          .c_three {
            font-size: 16px;
            margin-bottom: 5px;
          }
          div {
            font-size: 14px;
            color: #999;
            span {
              display: inline-block;
              padding: 2px 5px;
              border: 1px solid #bbb;
              margin: 2px 2px;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
}
</style>