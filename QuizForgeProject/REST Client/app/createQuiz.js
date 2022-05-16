
import {Quiz} from '/quizForge.js'
import {Question} from '/quizForge.js'
let count = 0
let questions = new Array()

document.getElementById('addQuestions').addEventListener('click', function(event){	//create new question field
	event.preventDefault()	
	count += 1
	const body = document.getElementsByTagName('body')[0]
	document.getElementById('addQuestions').style.visibility = 'hidden'	//hides add question button until current question is confirmed
	const choices = new Array()

	let divv = document.createElement('div')	//create div tag for labels and buttons to append to
	divv.style.cssText = 'text-align: center;'
	body.insertBefore(divv, body.lastElementChild)

	divv.appendChild(document.createElement('br'))
	let lbl = document.createElement('label')
	lbl.innerText = `Question ${count}: `
	divv.appendChild(lbl)
	let ip = document.createElement('input')
	ip.type = 'text'
	choices.push(ip) 
	divv.appendChild(ip)	//Prompt input

	divv.appendChild(document.createElement('br'))
	lbl = document.createElement('label')
	lbl.innerText = `Choice 1: `
	divv.appendChild(lbl)
	ip = document.createElement('input')
	ip.type = 'text'
	choices.push(ip) 
	divv.appendChild(ip)	//Choice 1 input

	divv.appendChild(document.createElement('br'))
	lbl = document.createElement('label')
	lbl.innerText = `Choice 2: `
	divv.appendChild(lbl)
	ip = document.createElement('input')
	ip.type = 'text'
	choices.push(ip) 
	divv.appendChild(ip)	//Choice 2 input

	divv.appendChild(document.createElement('br'))
	lbl = document.createElement('label')
	lbl.innerText = `Choice 3: `
	divv.appendChild(lbl)
	ip = document.createElement('input')
	ip.type = 'text'
	choices.push(ip) 
	divv.appendChild(ip)	//Choice 3 input

	divv.appendChild(document.createElement('br'))
	lbl = document.createElement('label')
	lbl.innerText = `Choice 4: `
	divv.appendChild(lbl)
	ip = document.createElement('input')
	ip.type = 'text'
	choices.push(ip) 
	divv.appendChild(ip)	//Choice 4 input
				
	divv.appendChild(document.createElement('br'))
	let btn = document.createElement('button')
	btn.innerText = 'Confirm'
	btn.addEventListener('click', function(event){
		btn.style.display = 'none'	//hide confirm button
		document.getElementById('addQuestions').style.visibility = 'visible'	//bring back add question button
		createQuestion(choices)	//create question
	})
	divv.appendChild(btn)	//Confirm button
})

function createQuestion(choices){	//add question to database
	const stObj = new Question(choices[0].value, choices[1].value, choices[2].value, choices[3].value, choices[4].value)
	questions.push(stObj)
	
	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:3000/api/questions')	//opens question collection
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
		}
	}
	const jsonStr = JSON.stringify(stObj)
	xhr.send(jsonStr)	//sends question data
	 
}

document.getElementById('createQuiz').addEventListener('click', function(event){	//add quiz to database
	event.preventDefault()	

	const ttl = document.getElementById('quizTitle').value
	const stObj = new Quiz(ttl, questions)
	
	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:3000/api/quizzes')	//opens quiz collection
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
		}
	}
	const jsonStr = JSON.stringify(stObj)
	xhr.send(jsonStr)	//sends quiz data
})

