#pragma strict

var units = new GameObject[100];
var currUnit = 0;
var numUnits = 0;

function Next() {
	units[currUnit].GetComponent(DoStuff).selected = false;
	units[++currUnit].GetComponent(DoStuff).selected = true;
}

function Previous() {
	units[currUnit].GetComponent(DoStuff).selected = false;
	units[--currUnit].GetComponent(DoStuff).selected = true;
}

function Add(obj : GameObject) {
	units[numUnits] = obj;
	numUnits += 1;
}

function BeginTurn() {
	if(numUnits > 0) {
		units[0].GetComponent(DoStuff).selected = true;
	}
}