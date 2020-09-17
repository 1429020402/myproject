<template>
  <div class="product">
    <div class="left">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            @click="onChange(index)"
            v-for="(item,index) in goodlist_x"
            :key="index"
            :title="item.name"
          />
        </van-sidebar>
      </div>
    </div>
    <div class="right">
      <div>
        <div class="Item" v-for="(data,INdex) in goodlist_x" :key="data.name" :id="INdex">
          <div class="title">{{data.name}}</div>
          <div class="card" v-for="Item in data.foods" :key="Item.id">
            <figure class="img_box" @click="showMask(Item)">
              <img :src="Item.imgUrl" style="width:100%;height:100%"/>
            </figure>
            <div class="card_right">
              <h4>{{Item.name}}</h4>
              <small>{{Item.category}}</small>
              <p>
                <span>月销{{Item.sellCount}}份</span>
                <span>好评度{{Item.rating}}%</span>
              </p>
              <div>
                <p>
                  <span class="new">&yen;{{Item.price}}</span>
                  <span class="old">&yen;{{(Item.price+10).toFixed(2)}}</span>
                </p>

                <p>
                  <button v-show="Item.num>0" @click="clickAdd(-1,Item.id)">-</button>
                  <input v-show="Item.num>0" type="text" :value="Item.num" />
                  <button @click="clickAdd(1,Item.id)" style="background: #ffc500;">+</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <div class="Mask" v-show="shoW">
      <span
        style="position:fixed;top:0;left:0;display:inline-block;background:#fff;padding:6px 8px;border-radius: 50%; margin:5px"
        @click="shoW=false"
      >
        <van-icon name="arrow-left" />
      </span>

      <div class="Mask_content">
        <div class="heard">
          <figure>
            <img :src="mask.imgUrl" style="width:100%;" />
          </figure>
          
          <div class="heard_title">
            <h4>{{mask.name}}</h4>
            <p>
              <span>月销{{mask.sellCount}}份</span>
              <span>好评度{{mask.rating}}%</span>
            </p>
            <div class="heard_price">
              <span>
                &yen;{{mask.price}}
                <small
                  style="text-decoration: line-through;"
                >&yen;{{(mask.price+10).toFixed(2)}}</small>
              </span>
              <button>
                <van-icon name="cart-o" size="18" />
                <b @click="click_add_cart(1,mask.id)">加入购物车</b>
              </button>
              
            </div>
          </div>
        </div>
        <div class="introduce">
          <h4>商品介绍</h4>
          <p>{{mask.goodsDesc}}</p>
        </div>
        <div class="Comment">
          <van-tabs type="card" color="#ffc500" class="All">
            <van-tab title="全部">
              <div class="card" v-for="I in mask.ratings" :key="I.username">
                <div class="msg">
                  <p class="msg_one">
                    <span>{{I.rateTime}}</span>
                    <span>{{I.username}}</span>
                  </p>
                  <p class="msg_two">{{I.text}}</p>
                </div>
                <figure class="Icon">
                  <img :src="I.avatar" style="width: 50px;border-radius: 50%;" />
                </figure>
              </div>
            </van-tab>
            <van-tab title="推荐">内容 2</van-tab>
            <van-tab title="吐槽">内容 3</van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goods_list } from "@/api/apis";
import BScroll from "better-scroll";
import { mytime } from "@/utils/utils";
export default {
  data() {
    return {
      activeKey: 0,

      shoW: false,
      mask: {},
    };
  },
  methods: {
    showMask(Item) {
      for (let obj of Item.ratings) {
        obj.rateTime = mytime(obj.rateTime);
      }
      this.mask = Item;
      this.shoW = !this.shoW;
    },
    onChange(index) {
      //scrollToElement方法滚动到目标元素
      this.rightscroll.scrollToElement(document.getElementById(index), 600);
    },
    //点击改变vuex中的数据
    clickAdd(num, id) {
      this.$store.commit("changenum", { num, id });
    },
    //模态框加入购物车
    click_add_cart(num, id) {
      this.$store.commit("changenum", { num, id });
    },
  },
  async created() {
    var res = await goods_list();
    res.data.goodsList;
    //添加字段num
    for (let obj of res.data.goodsList) {
      for (let item of obj.foods) {
        item.num = 0;
      }
    }
    //改变vuex的数据
    this.$store.commit("initgoodlist", res.data.goodsList);
  },
  mounted() {
    let leftscroll = new BScroll(".left", { click: true });
    leftscroll;
    this.rightscroll = new BScroll(document.querySelector(".right"), {
      click: true,
      probeType: 3,
    });
    //事件监听 绑定scroll事件
    this.rightscroll.on("scroll", (object) => {
      // console.log(Math.abs(obj.y))
      for (let obj of this.get) {
        if (Math.abs(object.y) >= obj.start && Math.abs(object.y) < obj.end) {
          this.activeKey = obj.index;
          break;
        }
      }
    });
  },
  //计算属性
  computed: {
    get() {
      let arr = [];
      let total = 0;
      for (let i = 0; i < this.goodlist_x.length; i++) {
        //获取当前盒子高度
        let curHeight = document.getElementById(i).offsetHeight;
        //得到{starty:total,endy:(total+curHeight),index:i} 放入数组
        arr.push({ start: total, end: total + curHeight, index: i });
        //total当前盒子y轴的起始值 (total+curHeight)当前盒子y轴的结束值
        total += curHeight;
      }
      return arr;
    },
    //获取vuex数据
    goodlist_x() {
      return this.$store.state.goodlist;
    },
    newlist() {
      return this.$store.getters.newlist;
    },
  },
};
</script>

<style lang="less" scoped>
.product {
  flex: 1;
  display: flex;
  overflow: hidden;

  .left {
    width: 80px;
    overflow: scroll;
  }
  .right {
    flex: 1;
    overflow: scroll;
    .Item {
      .title {
        color: #555;
        font-size: 14px;
        background: #f4f4f4;
        padding: 5px;
        border-left: 2px solid #555;
      }
      .card {
        display: flex;
        padding: 10px;
        .img_box {
          flex: 3;
          margin-right: 10px;
          // img {
          //   width: 100%;
          // }
        }
        .card_right {
          flex: 7;
          h4 {
            font-size: 14px;
            margin-bottom: 5px;
          }
          small {
            display: inline-block;
            padding: 5px;
            background: #eeeeee;
            color: #000;
            font-weight: bold;
            margin-bottom: 5px;
          }
          p {
            margin-bottom: 5px;
            span {
              font-size: 14px;
              color: #999;
              margin-right: 10px;
            }
          }
          div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;
            p {
              .new {
                font-size: 18px;
                color: #f73603;
              }
              .old {
                font-size: 14px;
                color: #999;
                text-decoration: line-through;
              }
            }

            p {
              display: flex;
              button {
                padding: 2px 8px;
                border: 1px solid #999;
                font-size: 14px;
                border-radius: 50%;
                background: #fff;
              }
              input {
                border: none;
                width: 10px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  .Mask {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    left: 0;
    .Mask_content {
      background: #f3f6f6;
      display: flex;
      flex-direction: column;
      .heard {
        display: flex;
        flex-direction: column;
        background: #fff;
        padding-bottom: 20px;
        margin-bottom: 20px;
        .heard_title {
          margin-top: 20px;
          padding: 0 20px;
          h4 {
            margin-bottom: 10px;
          }
          p {
            color: #999;
            font-size: 14px;
            span {
              margin-right: 5px;
            }
          }
        }
        .heard_price {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            color: #f73603;
            font-size: 20px;
            small {
              color: #999;
            }
          }
          button {
            font-size: 14px;
            border: none;
            background: #ffc500;
            padding: 12px 10px;
            border-radius: 25px;
            display: flex;
          }
        }
      }
      .introduce {
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;
        h4 {
          font-weight: normal;
          font-size: 18px;
          margin-bottom: 20px;
        }
        p {
          font-size: 14px;
          line-height: 25px;
        }
      }
      .Comment {
        flex: 1;
        overflow: scroll;
        background: #fff;
        padding-top: 10px;
        .All {
          width: 100%;
          .card {
            width: 100%;
            display: flex;
            align-items: center;
            .msg {
              flex: 8;
              width: 100%;
              padding: 0 10px;
              .msg_one {
                width: 100%;
                display: flex;
                justify-content: space-between;
                color: #999;
                font-size: 14px;
              }
              .msg_two {
                padding: 20px 0;
              }
            }
            .Icon {
              flex: 2;
              // img {
              //   width: 50px;
              //   border-radius: 50%;
              // }
            }
          }
        }
      }
    }
  }
}
</style>