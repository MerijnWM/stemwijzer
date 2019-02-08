var intro = document.getElementById('intro');
var statements = document.getElementById('statements');
var back_btn = document.getElementById('back-btn');
var statement_title = document.getElementById('statement-title');
var statement = document.getElementById('statement');
var question_count = 0;
var opinions = [];


function loadIntro(){
	statements.style.display = 'none';
	back_btn.style.display = 'none';
	intro.style.display = 'block';
}

function loadStatements() {
	intro.style.display = 'none';
	back_btn.style.display = 'block';
	statements.style.display = 'block';
	statement_title.innerHTML = question_count + 1 + '.' + subjects[question_count].title;
	statement.innerHTML = subjects[question_count].statement;

	console.log(opinions);
	var btn = document.getElementsByClassName('btn')
	for (var i = 0; i < btn.length; i++) {
        btn[i].style.backgroundColor = "black";
    }
	
	if(opinions[question_count] != null && opinions[question_count] != ''){
		var btn = document.getElementById(opinions[question_count]);
		btn.style.backgroundColor = 'grey';
	}
	
}

function setChoice(opinion){
	opinions[question_count] = opinion;
	if(question_count != 11){
		question_count += 1; 
	} 
	loadStatements();	
}

function back(){
	if(question_count == 0){
		loadIntro();
	}else{
		question_count -= 1;
		loadStatements();
	}
}