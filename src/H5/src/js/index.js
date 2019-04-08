require.config({
	paths: {
		"mui": "mui.min"
	}
})

require(["mui"], function(mui) {
	var uls = document.querySelector("ul");
	init();

	function init() {
		getData();
		newData();
	}
	
	function newData(){
		var newAdd = document.querySelector(".newAddress");
		newAdd.addEventListener("tap",function(){
			location.href="../newData.html"
		})
	}

	function getData() {
		mui.ajax('/api/getData', {
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				var str = "";
				data.data.forEach(item => {
					str +=
						`<li>
								<div class="name">
									<span>${item.name}</span>
									<span class="phone">${item.phone}</span>
								</div>
								<div class="address">
									${item.address}，${item.moreAdd}
								</div>
								<hr>
								<div class="mui-input-row mui-radio mui-left">
									<label>设为默认</label>
									<input name="radio1" type="radio">
								</div>
								<div class="btns">
									<button type="button" class="mui-btn mui-btn-red mui-btn-outlined remove" data-id="${item._id}">删除</button>
									<button type="button" class="mui-btn mui-btn-blue mui-btn-outlined updates" data-id="${item._id}">修改</button>
								</div>
							</li>`
				})
				uls.innerHTML = str;

				var lis = document.querySelectorAll("li");
				var removes = document.querySelectorAll(".remove");
				removes.forEach(item => {
					item.addEventListener("tap", function() {
						var btnArray = ["是", "否"];
						var _this = this;
						mui.confirm('确认要删除该地址么？', '警告', btnArray, function(e) {
							if (e.index == 0) {
								mui.ajax('/api/removeData', {
									data: {
										_id: _this.getAttribute("data-id")
									},
									dataType: 'json', //服务器返回json格式数据
									type: 'post', //HTTP请求类型
									timeout: 10000, //超时时间设置为10秒；
									success: function(data) {
										if (data.code === 1) {
											uls.removeChild(item.parentNode.parentNode);
										}
									}
								});
							}
						}, 'div')

					})
				})
				var updates = document.querySelectorAll(".updates");
				updates.forEach(item=>{
					item.addEventListener("tap",function(){
						var newid = this.getAttribute("data-id");
						localStorage.setItem("userid",newid);
						location.href="../updateData.html";
					})
				})
			}
		});
	}
})
