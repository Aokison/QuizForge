const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

app.set('port', 3000)
app.use(express.json())
app.use(cors())

app.delete('/api/quizzes/:id', function(req, res){	//deletes quiz data
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('quizForge-01')
			const coll = db.collection('quizzes')
			const criteria = {_id: new mongo.ObjectID(req.params.id)}
			coll.deleteOne(criteria, function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

app.get('/api/quizzes', function(req, res){	//retrieves all quiz data
	if (Object.keys(req.query).length == 0) {
		MongoClient.connect(url, function(err, conn) {
			if (err) console.log(err)
			else {
				const db = conn.db('quizForge-01')
				const coll = db.collection('quizzes')
				coll.find({}).toArray(function(err, result) {
					if (err) console.log(err)
					else {
						conn.close()
						res.type('application/json')
						res.status(200)
						res.json(result)					
					}
				})
			}
		})	
	}
})

app.post('/api/quizzes', function(req, res) {	//saves quiz data
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('quizForge-01')
			const myObj = new Object()
			myObj.title = req.body.title
			myObj.questions = req.body.questions
			const coll = db.collection('quizzes')
			coll.insertOne(myObj, function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

app.post('/api/questions', function(req, res) {	//saves question data
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('quizForge-01')
			const myObj = new Object()
			myObj.prompt = req.body.prompt
			myObj.choice1 = req.body.choice1
			myObj.choice2 = req.body.choice2
			myObj.choice3 = req.body.choice3
			myObj.choice4 = req.body.choice4
			const coll = db.collection('questions')
			coll.insertOne(myObj, function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})


app.listen(app.get('port'), function(){
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})
