/*
 * @Author: Joeshu 
 * @Date: 2018-04-01 21:30:56 
 * @Last Modified by: Joeshu
 * @Last Modified time: 2018-04-17 22:47:58
 */ 

var vm = new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		totalPrice:0,
		totalGoods:0,
		totalCheckedGoods:0,
		isChecked:false,
		curProduct:'',
		productList:[]
	},
	filters:{
		formatMoney:function(value){
			return value + "元"
		}
	},
	created:function(){

	},
	mounted:function (){
		// 商品图片网络地址忽略//i1.mifile.cn/a1/
		this.cartView();
	},
	methods:{ 
		cartView: function(){
			var that = this;
			axios.get('data/cartData.json',{"id":123})
				.then(function (res) {
					that.productList = res.data.data.items;
					that.totalMoney = res.data.data.totalMoney;
					that.totalGoods = res.data.data.items.length; 
				})
				.catch(function (error) {
					console.log(error);
				});  
		},
		changeMoney:function(product,way){
			if(way>0){
				product.num ++;
				if (product.num > 5){
					product.num = 5
					layer.msg("一个ID限购五件")
				}
			}else{
				product.num --;
				if (product.num < 1){
					product.num = 1
				}
			}
			this.calcTotalPrice()
			this.calcTotalGoods()
			this.calctotalCheckedGoods()
		},
		selectedProducted: function (item){
			if (typeof item.checked == 'undefined') {
				//局部注册变量
				this.$set(item, "checked", true);
			}else{
				item.checked = !item.checked;
			}
			this.calcTotalPrice()
			this.calctotalCheckedGoods()
		},
		checkAll:function(){
			this.isChecked = !this.isChecked
			var that = this 
			this.productList.forEach(function(item,index){
				if (typeof item.checked == 'undefined') {
					//局部注册变量
					that.$set(item, "checked", that.isChecked);
				} else {
					item.checked = that.isChecked;
				}
			}) 
			this.calcTotalPrice()
			this.calctotalCheckedGoods()
		},
		calcTotalPrice:function(){
			var that = this;
			this.totalPrice = 0;
			this.productList.forEach(function (item, index){
				if(item.checked){
					that.totalPrice += item.product_price * item.num
				}
			})
		},
		calcTotalGoods:function(){
			var that = this;
			this.totalGoods = 0;
			this.productList.forEach(function (item, index) {	
					that.totalGoods += item.num
			})
		},
		calctotalCheckedGoods:function(){
			var that = this;
			this.totalCheckedGoods = 0;
			this.productList.forEach(function (item, index) {
				if (item.checked) {
					that.totalCheckedGoods += item.num
				}
			})
		},
		delProduct:function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1); 
			this.calcTotalPrice()
			this.calcTotalGoods()
			this.calctotalCheckedGoods()
		},
		delConfirm:function(item){
			this.curProduct = item;
			var that = this;
			layer.confirm('确定删除吗？', { 
				btn: ['确认', '取消'] //按钮
			}, function () { 
				that.delProduct();
				layer.close(layer.index) 
			}, function () { 
			});
		},
		goCheckout:function(){
			layer.alert('顺手给个start!')
		}

	}
});
// 全局定义过滤器
Vue.filter('money',function(value,type){
	return "￥" + value + type
});
//全局注册变量，监听变量的值得变化
// Vue.set(item, "checked", true);