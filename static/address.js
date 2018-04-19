var vm = new Vue({
    el:'#container',
    data:{
        addressList:[],
        currentIndex:false,
        
    },
    created:function(){
        
    },
    mounted:function(){
        this.addressView()
    },
    methods:{
        addressView:function(){
            var that = this;
            axios.get('data/addressData.json', { "id": 123 })
                .then(function (res) {
                    console.log(res)
                    that.addressList = res.data.data.items;
                    // that.totalMoney = res.data.data.totalMoney;
                    // that.totalGoods = res.data.data.items.length;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        editAddress:function(){
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shadeClose: true,
                skin: 'yourclass',
                content: "sdsa"
            });
        },
        delAddress:function(currentIndex){
            this.addressList.splice(currentIndex, 1)
        },
        setDefault: function (currentIndex){ 
            this.addressList.forEach(function (currentValue,index){ 
                if (currentIndex == index) { 
                    currentValue.addressDefault = true
                } else {
                    currentValue.addressDefault = false
                }
            });
        }
        
    }
})