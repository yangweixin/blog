var mysql = require('../models/db');

module.exports = function(app) {
	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' , user : req.session.user});
	});
	app.get('/reg', function(req,res) {
		res.render('reg' , {
			title : '注册',
			error : req.flash('error').toString(),
			success : req.flash('success').toString()
		});
	});
	app.post('/reg' , function(req , res){
		var username = req.body.username;
		var password = req.body.password;
		var insertSql = "insert into member (name,password) values (?,?)";
		var param = [username,password];
		
		mysql.insert(insertSql	, param , function(err , result){
			if(err){
				console.log(err);
				req.flash('error','注册失败');
				res.redirect('/reg');
			}else{
				console.log('注册成功');
				req.flash('success','注册成功');
				req.session.user = {
					username : username,
					password : password
				};
				res.redirect('/');
			}
		});
	});
	app.get('/login', function(req,res) {
		res.render('login' , {
			title : '登录',
			error : req.flash('error').toString(),
			success : req.flash('success').toString(),
			user : req.session.user
		});
	});
	app.post('/login' , function(req , res) {
		var username = req.body.username;
		var password = req.body.password;
		var insertSql = "select * from member where name='" + username +"'";
		
		mysql.query(insertSql , function(err , row , fields){
			if(err){
				console.log(err);
				req.flash('error','登录失败');
				res.redirect('/login');
			}else{
				if(password == row[0].password){
					console.log('登录成功');
					req.flash('success','登录成功');
					req.session.user = {
						username : username,
						password : password
					};
					res.redirect('/');
				}else{
					console.log('密码错误');
					req.flash('error','登录失败');
					res.redirect('/login');
				}
			}
		});
	});
}
