#pragma strict

var units = new Array();
var currUnit = 0;
var timer : Timer;
var selectMod="Units";
var homeBase : BaseScript;
var playerNum:int;

function Start() {
	timer = gameObject.GetComponent(Timer);
	homeBase.controller = gameObject;
	homeBase.timer = timer;
}

function Update() {
	var tempUnit : GameObject;
	if(timer.turn == "plan") {
		if(Input.GetButtonDown("Units")) {
			selectMod = "Units";
			tempUnit = units[currUnit];
			tempUnit.GetComponent(DoStuff).selected = true;
		}
		else if(Input.GetButtonDown("Construct")) {selectMod = "Construct";}
		else if(Input.GetButtonDown("Harvesters")) {selectMod = "Harvesters";}
		if(selectMod=="Units") {
			tempUnit = units[currUnit];
			Camera.main.transform.position.x = tempUnit.transform.position.x;
			Camera.main.transform.position.z = tempUnit.transform.position.z;
			if(Input.GetButtonDown("Previous"))
				Previous();
			if(Input.GetButtonDown("Next"))
				Next();
		}
	}
	else {
		tempUnit = units[currUnit];
		tempUnit.GetComponent(DoStuff).selected = false;
	}
	if (selectMod=="Construct") {
		homeBase.selected = true;
		Camera.main.transform.position.x = homeBase.GetComponent(Transform).position.x;
		Camera.main.transform.position.z = homeBase.GetComponent(Transform).position.z;
	}
	else {homeBase.selected=false;}
	if(selectMod == "harvesters") {
		//DoStuff with harvesters
	}
}

function Next() {
	var tempUnit : GameObject = units[currUnit];
	tempUnit.GetComponent(DoStuff).selected = false;
	currUnit++;
	if (currUnit>=units.length) { currUnit=0; }
	tempUnit = units[currUnit];
	tempUnit.GetComponent(DoStuff).selected = true;
}

function Previous() {
	var tempUnit : GameObject = units[currUnit];
	tempUnit.GetComponent(DoStuff).selected = false;
	currUnit--;
	if (currUnit < 0) {currUnit = units.length - 1;}
	tempUnit = units[currUnit];
	tempUnit.GetComponent(DoStuff).selected = true;
}

function BeginTurn() {
	if(units.length > 0) {
		var tempUnit : GameObject = units[0];
		tempUnit.GetComponent(DoStuff).selected = true;
	}
}