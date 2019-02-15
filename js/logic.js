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
var statement_count = 0;
var opinions = [];
var results = [];
var filter_results = [];

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
	statement_title.innerHTML = statement_count + 1 + '.' + subjects[statement_count].title;
	statement.innerHTML = subjects[statement_count].statement;
	
	//set background to grey of selected choice
	var btn = document.getElementsByClassName('btn');
	for (var i = 0; i < btn.length; i++) {
        btn[i].style.backgroundColor = "black";
    }	

	if(opinions[statement_count] != null && opinions[statement_count] != ''){
		var btn = document.getElementById(opinions[statement_count]);
		btn.style.backgroundColor = 'grey';
	}
}

function setChoice(opinion){
	opinions[statement_count] = opinion;
	if(statement_count != 11){
		statement_count += 1; 
		loadStatements();
	}else{
		statement_count += 1;
		loadChooseStatements();
	}		
}

function back(){
	if(statement_count == 0){
		loadIntro();
	}else{
		statement_count -= 1;
		loadStatements();
	}
}

function loadChooseStatements(){
	statements.style.display = 'none';
	chooseParties.style.display = 'none';
	chooseStatements.style.display = 'block';
	back_btn.setAttribute("onclick", "back()");
	
	//display all statemens
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
	results = [];
	chooseStatements.style.display = 'none';
	score.style.display = 'none';
	chooseParties.style.display = 'block';
	back_btn.setAttribute("onclick", "loadChooseStatements()");

	//display all parties
	if(parties_ul.childNodes.length == 0){
		for(var index = 0; index < parties.length; ++index ){		
			var input = document.createElement("input");
			var label = document.createElement("label");
			parties_ul.appendChild(label);
			parties_ul.appendChild(input);
			input.setAttribute("type", "checkbox");	
			input.setAttribute("value", parties[index].name);
			input.setAttribute("id", "parties");
			input.setAttribute("checked", "checked");
			input.style.display = 'block';			
			label.innerHTML = parties[index].name;				
		}
	}	
}

function loadScore(){
	var score = document.getElementById('score');
	var points = 0;
	var parties = document.querySelectorAll('input[id=parties]');
	var statement_titles = document.querySelectorAll('input[id=statements]');

	chooseParties.style.display = 'none';
	score.style.display = 'block';
	back_btn.setAttribute("onclick", "loadChooseParties()");
	
	//calculate score
	for(var y = 0; y < opinions.length; ++y ){		

		if(opinions[y] != ""){
			var sum = 1;
			points +=1;
			if(statement_titles[y].checked == true){
				sum = 2;
				points +=1;
			}

			for (var i = 0; i < parties.length; ++i ){		
				
				if(opinions[y] == subjects[y].parties[i].position ){

					if(results[subjects[y].parties[i].name] == null){
						results[subjects[y].parties[i].name] = sum; 
					}else{
						results[subjects[y].parties[i].name] += sum;
					}	
				}
			}	
		}		
	}	

	// filter result by parties
	for(var x = 0; x < parties.length; ++x ){
		if (parties[x].checked == true ) {
			
			 filter_results[x] = [parties[x].defaultValue , results[parties[x].defaultValue]];			 
		}
	}

	//sort result by best choice
	var sort_results = filter_results.slice(0);
	sort_results.sort(function(a,b) {
	    return  b[1] - a[1];
	});

	//make div score empty
	while (score.firstChild) {
	    score.removeChild(score.firstChild);
	}

	//display ordered and filtered score 
	var h2 = document.createElement("h2");
	score.appendChild(h2);
	h2.innerHTML = "Uw mening komt het best overeen met:";

	sort_results.forEach(function(sort_result){
		var p = document.createElement("p");
		score.appendChild(p);
		p.innerHTML = sort_result[0] + " " + sort_result[1] + "/" + points;
	});
}


 
