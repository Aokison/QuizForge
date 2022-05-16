const xhr = new XMLHttpRequest()	//displays summary view of all Quiz objects of user
xhr.open('GET', 'http://localhost:3000/api/quizzes')	//retrieves all Quiz objects
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		const body = document.getElementsByTagName('body')[0]

		let divv = document.createElement('div')	//create div tag for labels and buttons to append to
		divv.style.cssText = 'text-align: center;'
		body.appendChild(divv)

		for (const i of this.response) {	//iterates through all Quiz objects
			divv.appendChild(document.createElement('br'))
			divv.appendChild(document.createElement('br'))

			let lbl = document.createElement('label')
			lbl.innerText = `${i.title} - `
			lbl.style.cssText = 'font-size: 24px;font-weight:bold;color: CornflowerBlue;'
			divv.appendChild(lbl)	//Quiz title label

			let btn = document.createElement('button')
			btn.innerText = 'View'
			btn.addEventListener('click', function(event){	//detailed view screen
				createViewScreen(i) 
			}) 
			divv.appendChild(btn)	//View button

			btn = document.createElement('button')
			btn.innerText = 'Delete'
			btn.addEventListener('click', function(event){	//delete quiz
				deleteQuiz(i) 
			}) 
			divv.appendChild(btn)	//Delete button			
		}
	}
}
xhr.send()

function deleteQuiz(idd) {	//delete quiz function
	let quizID = idd._id
	const xhr = new XMLHttpRequest()
	xhr.open('DELETE', `http://localhost:3000/api/quizzes/${quizID}`)	//deletes specific quiz given ID
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
		}
	}
	xhr.send()
}

function createViewScreen(idd) {	//create view screen function
	const xhr = new XMLHttpRequest()
	xhr.open('GET', 'http://localhost:4020/viewScreen.html') //retrieves specific quiz given ID
	xhr.responseType = 'text'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const body = document.getElementsByTagName('body')[0]
			body.innerHTML = this.response

			let divv = document.createElement('div')	//create div tag for labels and buttons to append to
			divv.style.cssText = 'text-align: center;font-family: cursive;font-size: 36px;font-style: italic;font-weight:bold;'
			body.appendChild(divv)

			let lbl = document.createElement('label')
			lbl.innerText = idd.title
			divv.appendChild(lbl)
		
			for (let i=0; i<idd.questions.length; i++) {	//iterates through all of a quiz's questions
				body.appendChild(document.createElement('br'))
				lbl = document.createElement('label')
				lbl.innerText = `Question ${i+1}:  `
				lbl.style.cssText = 'font-size: 30px;font-style: italic;font-weight:bold;'
				body.append(lbl)	//Question label

				lbl = document.createElement('label')
				lbl.innerText = idd.questions[i].prompt
				lbl.style.cssText = 'font-family: fantasy;font-size: 30px;font-weight:bold;color: CornflowerBlue;'
				body.append(lbl)	//Prompt label
	
				body.appendChild(document.createElement('br'))
				lbl = document.createElement('label')
				lbl.innerText = `A: `
				body.append(lbl)
				lbl = document.createElement('label')
				lbl.innerText = idd.questions[i].choice1
				lbl.style.cssText = 'font-size: 18px;font-weight:bold;color: CornflowerBlue;'
				body.append(lbl)	//Choice 1 label

				body.appendChild(document.createElement('br'))
				lbl = document.createElement('label')
				lbl.innerText = `B: `
				body.append(lbl)
				lbl = document.createElement('label')
				lbl.innerText = idd.questions[i].choice2
				lbl.style.cssText = 'font-size: 18px;font-weight:bold;color: CornflowerBlue;'
				body.append(lbl)	//Choice 2 label

				body.appendChild(document.createElement('br'))
				lbl = document.createElement('label')
				lbl.innerText = `C: `
				body.append(lbl)
				lbl = document.createElement('label')
				lbl.innerText = idd.questions[i].choice3
				lbl.style.cssText = 'font-size: 18px;font-weight:bold;color: CornflowerBlue;'
				body.append(lbl)	//Choice 3 label

				body.appendChild(document.createElement('br'))
				lbl = document.createElement('label')
				lbl.innerText = `D: `
				body.append(lbl)
				lbl = document.createElement('label')
				lbl.innerText = idd.questions[i].choice4
				lbl.style.cssText = 'font-size: 18px;font-weight:bold;color: CornflowerBlue;'
				body.append(lbl)	//Choice 4 label

				
			}			
		}
	}	
	xhr.send()				
}