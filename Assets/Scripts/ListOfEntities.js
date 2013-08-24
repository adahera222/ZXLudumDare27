#pragma strict

var units = new GameObject[100];
var currUnit = 0;
var numUnits = 0;
var timer:Timer;
var lastSelectedUnit=0;

var selectMod="Units";
var homeBase:Transform;

function Start(){
timer=gameObject.GetComponent(Timer);
}

function Update(){
	if(timer.turn=="plan"){
	if(Input.GetButtonDown("Units")){selectMod="Units";}
	else if(Input.GetButtonDown("Construct")){selectMod="Construct";}
	else if(Input.GetButtonDown("Harvesters")){selectMod="Harvesters";}
	if(selectMod=="Units"){
		if(Input.GetButtonDown("Switch")){
			if(Input.GetAxisRaw("Switch") < 0)
				Previous();
			if(Input.GetAxisRaw("Switch") > 0)
				Next();
				]
			Camera.main.transform.x=units[currUnit].transform.x;
			Camera.main.transform.z=units[currUnit].transform.z;
		}
	}
	else if (selectMod=="Construct"){
	units[currUnit].GetComponent(DoStuff).selected = false;
	Camera.main.transform.x=homeBase.x;
			Camera.main.transform.z=homeBase.z;
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