var express = require('express');
var router = express.Router();
var mongo = require("mongodb-curd");
var dateName = 'monthTest';
var listName = 'address';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/getData', function(req, res, next) {
  mongo.find(dateName,listName,function(result){
			if(!result){
				res.send({
					code:0,
					msg:"error"
				})
			}else{
				res.send({
					code:1,
					msg:"success",
					data:result
				})
			}
	})
});

router.post('/api/removeData', function(req, res, next) {
  mongo.remove(dateName,listName,{_id:req.body._id},function(result){
			if(!result){
				res.send({
					code:0,
					msg:"error"
				})
			}else{
				res.send({
					code:1,
					msg:"success",
					data:result
				})
			}
	})
});

router.post('/api/updateData', function(req, res, next) {
	 mongo.find(dateName,listName,{_id:req.body._id},function(result){
			if(!result){
				res.send({
					code:0,
					msg:"error"
				})
			}else{
				res.send({
					code:1,
					msg:"success",
					data:result
				})
			}
	})
//   mongo.update(dateName,listName,[{_id:req.body._id},req.body],function(result){
// 			if(!result){
// 				res.send({
// 					code:0,
// 					msg:"error"
// 				})
// 			}else{
// 				res.send({
// 					code:1,
// 					msg:"success",
// 					data:result
// 				})
// 			}
// 	})
});

router.post('/api/newData', function(req, res, next) {
  mongo.insert(dateName,listName,req.body,function(result){
		console.log(req.body)
			if(!result){
				res.send({
					code:0,
					msg:"error"
				})
			}else{
				res.send({
					code:1,
					msg:"success",
					data:result
				})
			}
	})
});

router.post('/api/findData', function(req, res, next) {
  mongo.find(dateName,listName,{_id:req.body._id},function(result){
		console.log(req.body)
			if(!result){
				res.send({
					code:0,
					msg:"error"
				})
			}else{
				res.send({
					code:1,
					msg:"success",
					data:result
				})
			}
	})
});

module.exports = router;
