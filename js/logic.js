var intro = document.getElementById('intro');
var statements = document.getElementById('statements');
var chooseStatements = document.getElementById('chooseStatements');
var chooseParties = document.getElementById('chooseParties');
var score = document.getElementById('score');
var back_btn = document.getElementById('back-btn');
var statement_title = document.getElementById('statement-title');
var statement = document.getElementById('statement');
var statement_ul = document.getElementById('statements-ul');
var parties_ul = document.getElementById('parties-ul');
var question_count = 0;
var opinions = [];

function loadIntro(){
	statements.style.display = 'none';
	back_btn.style.display = 'none';
	score.style.display = 'none';
	intro.style.display = 'block';
	chooseStatements.style.display = 'none';
	chooseParties.style.display = 'none';
}

function loadStatements() {
	chooseStatements.style.display = 'none';
	chooseParties.style.display = 'none';
	score.style.display = 'none';
	intro.style.display = 'none';
	back_btn.style.display = 'block';
	statements.style.display = 'block';
	statement_title.innerHTML = question_count + 1 + '.' + subjects[question_count].title;
	statement.innerHTML = subjects[question_count].statement;

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
		loadStatements();
	}else{
		question_count += 1;
		loadChooseStatements();
	}		
}

function back(){
	if(question_count == 0){
		loadIntro();
	}else{
		question_count -= 1;
		loadStatements();
	}
}

function loadChooseStatements(){
	statements.style.display = 'none';
	chooseParties.style.display = 'none';
	chooseStatements.style.display = 'block';
	back_btn.setAttribute("onclick", "back()");
	
	if(statement_ul.childNodes.length == 0){
		for(var index = 0; index < subjects.length; ++index ){		
			var input = document.createElement("input");
			var label = document.createElement("label");
			statement_ul.appendChild(label);
			statement_ul.appendChild(input);
			input.setAttribute("type", "checkbox");	
			input.setAttribute("value", subjects[index].title);	
			input.setAttribute("id", "statements");	
			input.style.display = 'block';			
			label.innerHTML = subjects[index].title;				
		}
	}	
}

function loadChooseParties(){
	console.log(document.querySelectorAll('input[id=statements]'));
	chooseStatements.style.display = 'none';
	score.style.display = 'none';
	chooseParties.style.display = 'block';
	back_btn.setAttribute("onclick", "loadChooseStatements()");

	if(parties_ul.childNodes.length == 0){
		for(var index = 0; index < parties.length; ++index ){		
			var input = document.createElement("input");
			var label = document.createElement("label");
			parties_ul.appendChild(label);
			parties_ul.appendChild(input);
			input.setAttribute("type", "checkbox");	
			input.setAttribute("value", parties[index].name);
			input.setAttribute("id", "parties");
			input.style.display = 'block';			
			label.innerHTML = parties[index].name;				
		}
	}	
}

function loadScore(){
	chooseParties.style.display = 'none';
	score.style.display = 'block';
	back_btn.setAttribute("onclick", "loadChooseParties()");
	console.log(document.querySelectorAll('input[id=parties]'));
}

 
