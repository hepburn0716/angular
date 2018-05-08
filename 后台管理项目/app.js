// 搭建，引入express
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
// 获取客户端
var mongoClient = mongodb.MongoClient;
// 定义数据库路径
var mongoUrl = 'mongodb://localhost:27017/ickt_12_angular';
// 创建应用程序
var app = express();
// 使用session
app.use(session({
	secret:'ickt',
	saveUninitialized:false,
	resave:true
}));

// 解析请求数据
app.use(bodyParser.json());
// 静态文件
app.use(express.static('static'));
// 模板引擎?
app.set('view engine','ejs');
// 请求
app.get('/',function(req,res) {
	// 返回模板
	if(req.session.username) {
		res.render('index.ejs', {
			username: req.session.username
		});
	}else {
		res.redirect('/login')
	}
	
});
// 登录页面
app.get('/login',function(req, res) {
	// 返回模板
	res.render('login.ejs');

});

// 登录接口
app.post('/action/login', function(req, res) {
	// 链接数据库
	mongoClient.connect(mongoUrl, function(err, db) {
		// 如果没有错误，查找数据
		if (!err) {
			db.collection('user')
				// 查找数据
				.findOne(req.body, function(err, result) {
					// 如果没有错误，并且返回数据
					if (!err && result) {
						// 更新session
						req.session.username = result.username;
						// 如果存在，返回该数据
						res.json({
							// 操作成功
							errno: 0,
							data: {
								username: result.username
							}
						})
					} else {
						// 如果不存在，通知客户端，数据不存在
						res.json({
							// 操作失败
							errno: 1,
							msg: '用户不存在或者密码错误'
						})
					}
				})
		}
	})
})
// 退出路由
app.get('/action/logout', function(req,res) {
	// 清除session
	req.session.username = '';
	res.redirect('/login');
});


// 创建用户
app.post('/action/user/regist', function(req, res) {
	// 链接数据库
	mongoClient.connect(mongoUrl, function(err, db) {
		// 如果链接出现错误，提示用户
		if (err) {
			res.json({
				errno: 2,
				msg: '数据库链接失败'
			})
			return;
		}
		// 如果用户名已经存在，就不能插入了
		db.collection('user').findOne({username: req.body.username}, function(err, result) {
			// 实现去重，如果存在用户，我们不能存储该用户
			if (!err && result) {
				res.json({
					errno: 3,
					msg: '用户已经存在'
				})
				return ;
			} else {
				// 插入数据
				db.collection('user').insertOne(req.body, function(err, result) {
					// 如果没有错误，插入成功了
					if (!err) {
						res.json({errno: 0})
					} else {
						res.json({
							errno: 1,
							msg: '存储失败'
						})
					}
					// 操作完成，关闭数据库
					db.close()
				})
			}
		})
		
	})
})
// 用户列表
app.get('/action/user/list', function(req, res) {
	// 获取页码, 数据库从0开始计数
	var page = req.query.page - 1;
	// 如果页码小于0,设置成0
	page = page < 0 ? 0 : page;
	// 链接数据库请求数据
	mongoClient.connect(mongoUrl, function(err, db) {
		// 如果有错误，阻止执行
		if (err) {
			res.json({
				errno: 2,
				msg: '数据库链接失败'
			})
			return;
		}
		db
			// 链接集合
			.collection('user')
			// 获取所有数据
			.find()
			// 排序
			.sort({_id: -1})
			// 从第page页开始显示
			.skip(page * 5)
			// 一页要显示五条
			.limit(5)
			// 转化成数组
			.toArray(function(err, result) {
				// 如果没有错误返回
				if (!err && result.length) {
					res.json({
						errno: 0,
						data: result
					})
				} else if (result.length === 0) {
					// 有错误要提示	
					res.json({
						errno: 4,
						msg: '已经没有该页数据了'
					})
				} else {
					// 有错误要提示	
					res.json({
						errno: 1,
						msg: '查询数据失败'
					})
				}
				// 操作完成，关闭数据库
				db.close()
			})
	})
})
// 定义请求路由
app.get('/action/user/detail', function(req, res) {
	// 获取用户id
	var id = req.query.id;
	// 链接数据库
	mongoClient.connect(mongoUrl, function(err, db) {
		// 如果有错误，要提示
		if (err) {
			res.json({
				errno: 2,
				msg: '数据库链接失败'
			})
			// 阻止执行
			return;
		}
		// 链接集合
		db.collection('user')
			// 获取一条数据
			// 想根据_id获取数据，要使用ObjectId方法
			.findOne({_id: mongodb.ObjectId(id)}, function(err, result) {
				// 如果有错误，要提示
				if (err) {
					res.json({
						errno: 1,
						msg: '查询错误'
					})
					return;
				}
				// 返回数据
				res.json({
					errno: 0,
					data: result
				})
				// 关闭数据库
				db.close();
			})
	})
});


// 创建新闻
app.post('/action/news/newss',function(req,res) {
	mongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.json({
				errno: 2,
				msg: '数据库链接失败'
			})
			return;
		}
	// 插入新闻
		db.collection('news').insertOne(req.body, function(err, result) {
					// 如果没有错误，插入成功了
					if (!err) {
						res.json({errno: 0})
					} else {
						res.json({
							errno: 1,
							msg: '存储失败'
						})
					}
					// 操作完成，关闭数据库
					db.close()
				})
			})
		});
		



// 新闻列表
app.get('/action/news/list', function(req, res) {
	// 获取页码, 数据库从0开始计数
	var page = req.query.page - 1;
	// 如果页码小于0,设置成0
	page = page < 0 ? 0 : page;
	// 链接数据库请求数据
	mongoClient.connect(mongoUrl, function(err, db) {
		// 如果有错误，阻止执行
		if (err) {
			res.json({
				errno: 2,
				msg: '数据库链接失败'
			})
			return;
		}
		db
			// 链接集合
			.collection('news')
			// 获取所有数据
			.find()
			// 排序
			.sort({_id: -1})
			// 从第page页开始显示
			.skip(page * 5)
			// 一页要显示五条
			.limit(5)
			// 转化成数组
			.toArray(function(err, result) {
				// 如果没有错误返回
				if (!err && result.length) {
					res.json({
						errno: 0,
						data: result
					})
				} else if (result.length === 0) {
					// 有错误要提示	
					res.json({
						errno: 4,
						msg: '已经没有该页数据了'
					})
				} else {
					// 有错误要提示	
					res.json({
						errno: 1,
						msg: '查询数据失败'
					})
				}
				// 操作完成，关闭数据库
				db.close()
			})
	})
})

app.get('/action/news/detail', function(req, res) {
	// 获取用户id
	var id = req.query.id;
	// 链接数据库
	mongoClient.connect(mongoUrl, function(err, db) {
		// 如果有错误，要提示
		if (err) {
			res.json({
				errno: 2,
				msg: '数据库链接失败'
			})
			// 阻止执行
			return;
		}
		// 链接集合
		db.collection('news')
			// 获取一条数据
			// 想根据_id获取数据，要使用ObjectId方法
			.findOne({_id: mongodb.ObjectId(id)}, function(err, result) {
				// 如果有错误，要提示
				if (err) {
					res.json({
						errno: 1,
						msg: '查询错误'
					})
					return;
				}
				// 返回数据
				res.json({
					errno: 0,
					data: result
				})
				// 关闭数据库
				db.close();
			})
	})
})
// mongoClient.connect(mongoUrl,function(err,db) {
// 	db.collection('user').insertOne({username:'a12345',password:'a12345'});
// });

// 监听端口号
app.listen(3000);