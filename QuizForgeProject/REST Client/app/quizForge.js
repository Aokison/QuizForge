export class Quiz {
	constructor(ttl, qsts) {
		this.title = ttl
		this.questions = qsts
	}
}

export class Question {
	constructor(prmt, c1, c2, c3, c4) {
		this.prompt = prmt
		this.choice1 = c1
		this.choice2 = c2
		this.choice3 = c3
		this.choice4 = c4
	}
}





