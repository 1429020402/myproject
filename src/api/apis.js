import axios from 'axios'
axios.defaults.baseURL='http://192.168.31.42:5000'

export var shop_seller=()=>axios.get('/shop/seller');

export var goods_list=()=>axios.get('/goods/goods_list');

export var shop_ratings=()=>axios.get('/shop/ratings')