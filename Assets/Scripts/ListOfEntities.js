#pragma strict

var units = new GameObject[100];
var currUnit = 0;
var numUnits = 0;
var timer:Timer;
var lastSelectedUnit=0;

var selectMod="Units";
var homeBase:BaseScript;

function Start(){
timer=gameObject.GetComponent(Timer);
}

function Update(){
	if(timer.turn=="plan"){
	if(Input.GetButtonDown("Units")){
		selectMod="Units";
		units[currUnit].GetComponent(DoStuff).selected = true;
		}
	else if(Input.GetButtonDown("Construct")){selectMod="Construct";}
	else if(Input.GetButtonDown("Harvesters")){selectMod="Harvesters";}
	if(selectMod=="Units"){
		Camera.main.transform.position.x=units[currUnit].transform.position.x;
		Camera.main.transform.position.z=units[currUnit].transform.position.z;
		if(Input.GetButtonDown("Switch")){
			if(Input.GetAxisRaw("Switch") < 0)
				Previous();
			if(Input.GetAxisRaw("Switch") > 0)
				Next();
		}
	}
	else{units[currUnit].GetComponent(DoStuff).selected = false;}
	 if (selectMod=="Construct")
		{
		homeBase.selected=true;
		Camera.main.transform.position.x=homeBase.GetComponent(Transform).position.x;
		Camera.main.transform.position.z=homeBase.GetComponent(Transform).position.z;
		}
		else{homeBase.selected=false;}
		if(selectMod=="harvesters"){
		//DoStuff with harvesters
		}
	}
}

function Next() {
	units[currUnit].GetComponent(DoStuff).selected = false;
	currUnit+=1;
	if (currUnit>=numUnits){currUnit=0;}
	units[currUnit].GetComponent(DoStuff).selected = true;
}

function Previous() {
	units[currUnit].GetComponent(DoStuff).selected = false;
	currUnit-=1;
	if (currUnit<0){currUnit=numUnits-1;}
	units[currUnit].GetComponent(DoStuff).selected = true;
}

function Add(obj : GameObject) {
	units[numUnits] = obj;
	numUnits += 1;
}

function BeginTurn() {
	if(numUnits > 0) {
		units[currUnit].GetComponent(DoStuff).selected = true;
	}
}