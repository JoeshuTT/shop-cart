new Vue({
    el:'#container',
    data:{
        addressList:[]
    },
    mounted:function(){
        
    },
    methods:{
        axios.get('data/cartData.json', { "id": 123 })
            .then(function (res) {
                that.productList = res.data.data.items;
                that.totalMoney = res.data.data.totalMoney;
                that.totalGoods = res.data.data.items.length;
            })
            .catch(function (error) {
                console.log(error);
            }); 
    }
})