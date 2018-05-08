<div class="app-inner">
	<h1>新闻列表</h1>
	<div class="container-fluid">
		<div class="row title">
			<div class="col-lg-1">新闻ID</div>
			<div class="col-lg-1">新闻标题</div>
			<div class="col-lg-1">新闻作者</div>
			<div class="col-lg-2">发布时间</div>
			<div class="col-lg-2">新闻内容</div>
		</div>
		<div class="row" ng-repeat="item in list">
			<div class="col-lg-1"><a ng-href="#!/newsdetail/{{item._id}}">{{$index+1}}</a></div>
			<div class="col-lg-1">{{item.news}}</div>
			<div class="col-lg-1">{{item.title}}</div>
			<div class="col-lg-2">{{item.auto}}</div>
			<div class="col-lg-2">{{item.time}}</div>
			<div class="col-lg-5">{{item.content}}</div>
		</div>
	</div>
	<!-- 翻页 -->
	<!-- <ul class="pagination"> -->
	<ul class="pager">
		<li class="previous" ><a ng-href="#!/newslist/{{pageNum <= 1 ? 1 : pageNum - 1}}"><span></span> 前一页</a></li>
		<!-- 1 转换数字，2 设置路由参数类型 -->
		<li class="next"><a ng-href="#!/newslist/{{+pageNum + 1}}">后一页 <span></span></a></li>
	</ul>
</div>