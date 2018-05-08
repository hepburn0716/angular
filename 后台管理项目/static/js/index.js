// 获取应用程序
angular.module('ickt', ['ngRoute'])
// 配置路由
.config(function($routeProvider) {
	// 配置路由
	$routeProvider
		// 创建用户
		.when('/createuser', {
			templateUrl: 'view/user/create.tpl',
			controller: 'createUserCtrl'
		})
		// 用户列表
		.when('/userlist/:pageNum', {
			templateUrl: 'view/user/list.tpl',
			controller: 'userListCtrl'
		})
		// 用户详情
		.when('/userdetail/:id', {
			templateUrl: 'view/user/detail.tpl',
			controller: 'userDetailCtrl'
		})
		// 创建新闻
		.when('/createnews', {
			templateUrl: 'view/news/create.tpl',
			controller: 'createNewsCtrl'
		})
		// 新闻列表
		.when('/newslist/:pageNum', {
			templateUrl: 'view/news/list.tpl',
			controller: 'newsListCtrl'
		})
		// 新闻详情
		.when('/newsdetail/:id', {
			templateUrl: 'view/news/detail.tpl',
			controller: 'newsDetailCtrl'
		})
		// 首页
		.when('/', {
			templateUrl: 'view/home.tpl',
			controller: 'homeCtrl'
		})
		// 默认路由
		.otherwise({
			redirectTo: '/'
		})
})
// 定义控制器
.controller('navCtrl', function($scope, $element) {
	// 定义导航数据
	$scope.list = [
		// 用户模块
		{
			title: '用户模块',
			childList: [
				{ title: '创建用户', href: '/createuser' },
				{ title: '用户列表', href: '/userlist/1' }
			]
		},
		// 新闻模块
		{
			title: '新闻模块',
			childList: [
				{ title: '创建新闻', href: '/createnews' },
				{ title: '新闻列表', href: '/newslist/1' }
			]
		}
	]
	// 点击h3，切换下面的ul列表的显隐
	$scope.toggle = function(e) {
		// 在容器元素中，寻找h3
		$element.find(e.target)
			// 获取兄弟元素
			.siblings('ul')
			// 切换显隐
			.slideToggle()
		// console.log(e.target)
	}
})
// 创建用户
.controller('createUserCtrl', function($scope, $http, $location) {
	// 定义单选框（性别）默认值
	$scope.data = {
		sex: 'woman'
	}
	// 提交数据
	$scope.submitRegistData = function() {
		// 发送post请求，提交数据
		$http
			.post('/action/user/regist', $scope.data)
			// 监听返回的结果，如果返回成功，进入列表页
			.then(function(res) {
				// data属性是我们真正返回的数据
				var data = res.data;
				// 如果返回成功
				if (data.errno === 0) {
					// 进入列表页
					// $location.path('/userlist/1')
				}
			})
	}
})
// 用户列表
.controller('userListCtrl', function($scope, $http, $routeParams) {
	// 存储当前页码
	$scope.pageNum = $routeParams.pageNum;
	// 获取页码
	$http.get('/action/user/list?page=' + $routeParams.pageNum)
		// 监听数据返回
		.then(function(res) {
			var data = res.data;
			// 如果数据返回成功，存储数据
			if (data.errno === 0) {
				$scope.list = data.data;
			} else {
				// 否则，提示用户
				alert(data.msg)
			}
		})
})
// 用户详情
.controller('userDetailCtrl', function($scope, $http, $routeParams) {
	// 发送请求获取数据
	$http.get('/action/user/detail', {
		// 定义query参数
		params: {
			id: $routeParams.id
		}
	// 监听返回的数据
	}).then(function(res) {
		// 获取返回的数据
		var data = res.data;
		// 如果操作成功，存储数据
		if (data.errno === 0) {
			$scope.data = data.data
		} else {
			// 提示用户。出现错误
			alert(res.msg)
		}
	})

})
// 创建新闻
.controller('createNewsCtrl', function($scope,$http,$location) {
	// 提交数据
	$scope.submitNewsData = function() {
		$http
		.post('/action/news/newss',$scope.data)
		.then(function(res) {
			var data = res.data;
			if(data.errno === 0) {

			}
		})
	}
})

// // 新闻列表
.controller('newsListCtrl', function($scope,$http,$routeParams) {
	$scope.pageNum = $routeParams.pageNum;
	$http.get('/action/news/list?page=' + $routeParams.pageNum)
		// 监听数据返回
		.then(function(res) {
			var data = res.data;
			// 如果数据返回成功，存储数据
			if (data.errno === 0) {
				$scope.list = data.data;
			} else {
				// 否则，提示用户
				alert(data.msg)
			}
		})

})
// // 新闻详情
.controller('newsDetailCtrl', function($scope,$http, $routeParams) {
	$http.get('/action/news/detail', {
		// 定义query参数
		params: {
			id: $routeParams.id
		}
	// 监听返回的数据
	}).then(function(res) {
		// 获取返回的数据
		var data = res.data;
		// 如果操作成功，存储数据
		if (data.errno === 0) {
			$scope.data = data.data
		} else {
			// 提示用户。出现错误
			alert(res.msg)
		}
	})


})
// 首页
.controller('homeCtrl', function($scope) {})