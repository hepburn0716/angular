<div class="app-inner">
	<h1>用户列表</h1>
	<div class="container-fluid">
		<div class="row title">
			<div class="col-lg-1">用户ID</div>
			<div class="col-lg-1">用户名</div>
			<div class="col-lg-1">性别</div>
			<div class="col-lg-2">密码</div>
			<div class="col-lg-2">电话</div>
			<div class="col-lg-5">简介</div>
		</div>
		<div class="row" ng-repeat="item in list">
			<div class="col-lg-1"><a ng-href="#!/userdetail/{{item._id}}">{{$index+1}}</a></div>
			<div class="col-lg-1">{{item.username}}</div>
			<div class="col-lg-1">{{item.sex}}</div>
			<div class="col-lg-2">{{item.password}}</div>
			<div class="col-lg-2">{{item.tel}}</div>
			<div class="col-lg-5">{{item.intro}}</div>
		</div>
	</div>
	<!-- 翻页 -->
	<!-- <ul class="pagination"> -->
	<ul class="pager">
		<li class="previous"><a ng-href="#!/userlist/{{pageNum <= 1 ? 1 : pageNum - 1}}"><span>&larr;</span> 前一页</a></li>
		<!-- 1 转换数字，2 设置路由参数类型 -->
		<li class="next"><a ng-href="#!/userlist/{{+pageNum + 1}}">后一页 <span>&rarr;</span></a></li>
	</ul>
</div>