'use strict';
{
	const question = document.getElementById('question');
	const choices = document.getElementById('choices');
	const btn = document.getElementById('btn');
	const result = document.getElementById('result');
	const scoreLabel = document.querySelector('#result >p');
	const chart = document.getElementById('chart');

	const quizSet = shuffle([ 
    {q: 'preiswert', c: ['正解', 'teuer', 'nett']},
    {q: 'sich auf den Weg machen', c: ['正解', 'umziehen', 'brechen']},
		{q: 'etwas anderes im Kopf haben', c: ['正解', 'mit jemandem Kontakt aufnehmen', 'jemanden einstellen oder für ein Studium zulassen']},
		{q: 'テスト問題つくりました', c: ['正解', '不正解', '不正解']},		
    {q: 'preiswert', c: ['正解', 'teuer', 'nett']},
    {q: 'sich auf den Weg machen', c: ['正解', 'umziehen', 'brechen']},
		{q: 'etwas anderes im Kopf haben', c: ['正解', 'mit jemandem Kontakt aufnehmen', 'jemanden einstellen oder für ein Studium zulassen']},
		{q: 'テスト問題つくりました', c: ['正解', '不正解', '不正解']},		
    



  ]);
							
	let currentNum = 0;
	let isAnswered;
	let score = 0;
 

	function shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[j], arr[i]] = [arr[i], arr[j]];
		}
			return arr;
	}


	function checkAnswer(li){
		if (isAnswered === true) {
			return;
		}
		isAnswered = true;
		if (li.textContent === quizSet[currentNum].c[0]){
			li.classList.add('correct');
			score++;
			} else {
				li.classList.add('wrong');
				}
				
		btn.classList.remove('disabled');
	}
	
	function setQuiz(){
		isAnswered = false;
		
		question.textContent = quizSet[currentNum].q;
		
		while(choices.firstChild){
			choices.removeChild(choices.firstChild);
			
		}
		
		const shuffledChoices = shuffle([...quizSet[currentNum].c]);
		 shuffledChoices.forEach(choice => {
			 const li = document.createElement('li');
			 li.textContent = choice;
			 li.addEventListener('click', () => {
				 	checkAnswer(li);
				 });
			 choices.appendChild(li);
		});
		
		if(currentNum === quizSet.length - 1){
			btn.textContent = 'Show Score';
		}
	}
	
	setQuiz();
	/////////////////////////////////////////////////
	console.log(quizSet[0].q + quizSet[0].c[0]);
	
	btn.addEventListener('click', () =>{
		if(btn.classList.contains('disabled')){
			return;
		}
		btn.classList.add('disabled');
		
		if(currentNum === quizSet.length - 1){
			result.classList.remove('hidden');
			scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
			
			
			for(let i = 0; i < quizSet.length; i++){
				const li = document.createElement('li');
				li.textContent = `${quizSet[i].q}　　　A. ${quizSet[i].c[i]}`;
				chart.appendChild(li);
			}
//			console.log(`Score: ${score} / ${quizSet.length}`);
		}else{
			currentNum++;
			 setQuiz();
		}
		
	});
}