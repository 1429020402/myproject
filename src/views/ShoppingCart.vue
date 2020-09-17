<template>
  <div class="ShoppingCart">
    <div class="heard">新用户下单立减5元</div>
    <div class="clear"><span>购物车</span><span style="color:#999;display:flex"><van-icon size="20px" name="delete" @click="clearCart" />清空购物车</span></div>
    <table>
      <tbody>
        <tr v-for="item in newlist" :key="item.id">
          <td class="one">{{item.name}}</td>
          <td class="two">&yen;{{(item.price).toFixed(2)}}</td>
          <td class="three">
            <button style="background: #fff;border:1px solid #999;color:#999" @click="clickAdd(-1,item.id)">-</button>
            <label>{{item.num}}</label>
            <button @click="clickAdd(1,item.id)">+</button>
          </td>
        </tr>
        <tr style="height:70px">
            <td></td>
            <td></td>
            <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed:{
    newlist(){
      return this.$store.getters.newlist
    }
  },
  methods:{
    clickAdd(num,id){
      this.$store.commit('changenum',{num,id})
    },
    clearCart(){
      this.$store.commit('clearcart',0)
    }
  }
};
</script>

<style lang="less" scoped>
.ShoppingCart {
  width: 100%;
  .heard {
    color: #f13808;
    font-size: 14px;
    padding: 10px;
    background: #fde8c8;
    text-align: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .clear{
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      padding: 5px 10px;
  }
  table {
    width: 100%;
    tbody{
        tr{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .one{
                font-size: 20px;
                padding: 10px;
                width: 50%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space:nowrap;
            }
            .two{
                color:#fb3501 ;
                font-weight: bold;
            }
            .three{
                button{
                    border: none;
                    padding: 5px 10px;
                    border-radius: 20px;
                    background: #ffc500;
                }
                label{
                    margin: 0 5px;
                }
            }
        }
    }
  }
}
</style>