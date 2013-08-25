#pragma strict

var units = new Array();
var currUnit = 0;
var timer : Timer;

function Start(){
	timer = gameObject.GetComponent(Timer);
}

function Update(){
	if(timer.turn=="plan"){
		if(Input.GetButtonDown("Previous")) {
			Debug.Log("Previous called...");
			Previous();
		}
		if(Input.GetButtonDown("Next")) {
			Debug.Log("Next called...");
			Next();
		}
	}
}

function Next() {
	Debug.Log("Next invoked.");
	var tempUnit : GameObject = units[currUnit];
	tempUnit.GetComponent(DoStuff).selected = false;
	currUnit++;
	if (currUnit>=units.length) { currUnit=0; }
	tempUnit = units[currUnit];
	tempUnit.GetComponent(DoStuff).selected = true;
}

function Previous() {
	Debug.Log("Previous invoked");
	var tempUnit : GameObject = units[currUnit];
	tempUnit.GetComponent(DoStuff).selected = false;
	currUnit-=1;
	if (currUnit<0){currUnit=units.length - 1;}
	tempUnit = units[currUnit];
	tempUnit.GetComponent(DoStuff).selected = true;
}

function BeginTurn() {
	if(units.length > 0) {
		var tempUnit : GameObject = units[0];
		Debug.Log(units.length);
		tempUnit.GetComponent(DoStuff).selected = true;
	}
}