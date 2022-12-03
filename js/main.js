'use strict';
{
	const question = document.getElementById('question');
	const choices = document.getElementById('choices');
	const btn = document.getElementById('btn');
	const result = document.getElementById('result');
	const scoreLabel = document.querySelector('#result >p');
	const chart = document.getElementById('chart');

	const quizSet = shuffle([ 
    {q: 'console.log ( 1 + "2" );', c: ['12', '2', '1']},
    {q: 'console.log ( 1 - "2" );', c: ['-1', '-12', '1']},
		{q: 'HTMLにおいて、デフォルトでは縦並びにならないものを次のうちから1つ選んでください。', c: ['a要素', 'form要素', 'div要素']},
		{q: 'アクションの説明として正しいものを次のうちから選んでください。', c: ['ルーティングが割り当てられ、コントローラーに定義されるメソッド', 'クラス外から呼び出すことのできないメソッド', 'コントローラーが最終的にレスポンスとして返す、見た目を決めるファイル']},		
    {q: '「【 A 】は、値の設計図となるもの。【 A 】には共通の【 B 】を【 C 】変数として定義することで、【 C 】メソッドで個別の【 B 】値を扱うことができる」', c: ['A: クラス, B: 属性, C: インスタンス', 'A: インスタンス, B: 属性, C: initialize', 'A: クラス, B: メソッド, C: インスタンス']},
		{q: '今日は何曜日？', c: ['金曜日', '眠い', 'お腹すいた']},
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