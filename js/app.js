(function() {
	var environment;
	var minCenter = 1200;
	var catalogue = [];//菜单目录
	var deviceWidth, asideWidth;
	var admin = true;
	//判断是移动端还是pc端
	function isPC () {
		if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		    return false;//移动端
		} else {
		    return true;//pc端  
		}
	}
	//初始化
	function initialize () {				
		if (environment) {//pc端
			asideWidth = $("#aside").addClass("aside-pc").width();
			deviceWidth = asideWidth + 20 + 1;
			$("#content").addClass("content-pc");
			$("#keyboard").addClass("keyboard-pc");
			$(".scroll").addClass("scroll-pc");
		} else {//移动端
			asideWidth = $("#aside").addClass("aside-mobie").width();
			deviceWidth = asideWidth + 20;
			$("#aside").width(asideWidth);
			$("#content").addClass("content-mobie").width(asideWidth).css("left", deviceWidth);
			$("#keyboard").addClass("keyboard-mobie");
			$(".scroll").addClass("scroll-mobie");
			$("#full").text("文章");
			$("#center").hide();
			$("#prev, #next").hide();
		}
	}
	//渲染目录
	function asideInit() {
		var hash = getHash();
		$.get("./aside.md", function(data){
			$("#aside").html(marked(data));	
			$("#aside code").map(function() {//代码高亮
		    	Prism.highlightElement(this);
		   	});
		   	$("#aside li a").map(function() {//获得目录数组
		   		var hash = $(this).attr("href");
				if (hash && hash.substr(1)) {
					catalogue.push(hash.substr(1));
				}
		   	});
		   	if (hash) {
		   		if (hash === "mosby") {
		   			window.location.hash = "#" + catalogue[0];
		   		} else {
		   			conent(hash);
		   		}
		   	} else {
		   		window.location.hash = "#" + catalogue[0];
		   	}
		   	asideEvent();//目录事件
		}, "text").fail(function(){
			alert("目录获取失败，请刷新后重试！");
		})
	}
	//获得哈希值
	function getHash() {
		return window.location.hash.substr(1);
	}
	//获得内容
	function conent(init) {
		$("#content").html("<div>加载中。。。</div>");
		$.get("./" + (init || getHash()) + ".md", function(data){
			$("#content").html(marked(data));	
			//代码高亮
			$('#content code').map(function() {
		    	Prism.highlightElement(this);
		   	});
		   	articleInit();	
		}, "text").fail(function(){
			alert("文章内容获取失败！请刷新后重试");
		})
	}
	//判断是否该跳转
	function linkData() {
		if (getHash()) {
			conent();
		}
	}
	//目录初始化
	function asideEvent () {
		//影藏所有二级目录
		$("#aside ol ol").hide();
		//二级目录切换隐藏事件
		$("#aside ol>li>a").click(function(){
			$(this).next().toggle(300);
		});
		//初始化目录点击事件,影藏所有二级目录
		$("#aside h2").dblclick(function(){
			$("#aside ol ol").hide();
		});
		//展开所有二级目录
		$("#aside h2").click(function(){
			$("#aside ol ol").show();
		});
		if (!environment) {
			$("#aside li a").click(function(){
				var hash = $(this).attr("href");
				if (hash && hash.substr(1)) {
					$("#full").trigger("click");
				}
			});
		}
	}
	//文章内容事件初始化
	function articleInit() {
		//创建目录
		if ($("#content h2").length) {
			var ul_tag = $("<ol id='content-top' class='content-top'></ol>").insertAfter("#content h1");
			$("#content h2").map(function(index) {
				var self = this;
				var ul_li = $("<li class='li-link'>"+ $(this).text() +"</li>");
				ul_tag.append(ul_li);
				$(this).text((index + 1 + ".") + $(this).text());
				ul_li.click(function() {
					$("#content").animate({
						scrollTop : self.offsetTop
					}, 300);
				});
			});
		}
		//标题置顶
		$("#content h2, #content h3, #content h4").map(function(index) {
			$(this).html("<span class='h-link'>"+ $(this).text() + "</span>")
			$(this).attr("id", "h" + index);//替换id
			//点击标题置顶
			$(this).on("click","span",function () {
				$("#content").animate({
					scrollTop : this.offsetTop
				}, 300);
			})
		})
	}
	//全屏/正常切换
	function fullScreen() {
		$("#full").click(function() {	
			if ($(this).hasClass("show")) {//全屏/显示文章内容
				if (!environment) {//移动端显示文章内容及上下翻页按钮
					$("#prev, #next").show();
				}
				$(this).addClass("hide").removeClass("show").text("目录");
				$("#aside").animate({left: -deviceWidth, right: 0}, 500);
				$("#content").animate({left: 0}, 500);
			} else {
				$(this).addClass("show").removeClass("hide").text("全屏");
				$("#aside").animate({left: 0, right: deviceWidth}, 500);
				$("#content").animate({left: deviceWidth}, 500);
				if (!environment) {
					$("#full").text("文章");
					$("#prev, #next").hide();
				}
			}
		
		})
	}
	//回到页面顶部
	function topScreen() {
		$("#top").click(function() {
			if ($("#full").hasClass("show") && !environment) {
				$("#aside").animate({scrollTop: 0}, 300);
			} else {
				$("#content").animate({scrollTop: 0}, 300);
			}
		})
	}
	//初始化上一篇
	function prev() {
		$("#prev").click(function() {
			var hash = getHash();
			for(var i = 0, len = catalogue.length; i < len; i++) {
				if (catalogue[i] === hash) {
					if (i) {
						window.location.hash="#" + catalogue[i-1];
						return;
					}				
				}
			}
			alert("已经是第一章");
		})
	}
	//初始化下一篇
	function next() {
		$("#next").click(function() {
			var hash = getHash();
			for(var i = 0, len = catalogue.length; i < len; i++) {
				if (catalogue[i] == hash) {
					if (i < len-1) {
						window.location.hash="#" + catalogue[i+1];
						return;
					}				
				}
			}
			alert("已经是最后一章");
		})
	}
	function center() {
		$("#center").click(function() {
			var contentWidth = $("#wrap").width();
			if (contentWidth < minCenter) {
				$("#wrap").css("max-width", "").removeClass("wrap-pc");
				alert("为了更好的阅读体验，请最大化浏览器窗口！")
			} else if (contentWidth == minCenter) {
				$("#wrap").css("max-width", "").removeClass("wrap-pc");
				$("#center").text("小屏");
			} else if (contentWidth > minCenter) {
				$("#wrap").css("max-width", minCenter).addClass("wrap-pc");
				$("#center").text("大屏");
			}
		})
	}
	//执行
	function render() {
		environment = isPC();//是否是pc端
		initialize();//初始化
		asideInit();//目录初始化
		prev();//上
		next();//下
		center();//居中
		topScreen();//回到顶部
		fullScreen();//目录/全屏切换
		winsize();
		$(window).on("hashchange", linkData);
	}
	//权限验证
	function instantiation() {
		if (admin) {
			if (getHash() === "mosby") {
				render();
			} else {
				$("body").text("网站暂未开放哦！")
				alert("网站暂未开放，请以后重试！");
			}
		} else {
			render();
		}		
	}
	//监听屏幕大小变化
	function winsize() {
		$(window).on("resize load",function () {          //当浏览器大小变化时
		    if ($(window).width() < 720 && $("#full").hasClass("show") && environment) {
		    	$("#full").trigger("click");
		    }
		});
	}
	instantiation();
})();