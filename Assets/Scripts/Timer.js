#pragma strict

// Make default values
var turnTime = 10;
var waitTime = 5;
var currTime = 2.8;
var prevTurn = "exec";
var turn = "wait";

var unitList : ListOfEntities;

function Start() {
	unitList = gameObject.GetComponent(ListOfEntities);
}

function Update () {
	// Increase current counter
	currTime += Time.deltaTime;
	
	// If you're planning, go to wait for a second
	if(turn == "plan" && (currTime >= turnTime || Input.GetButtonDown("EndTurn"))) {
		currTime = 0;
		turn = "wait";
		prevTurn = "plan";
	}
	
	// If you're waiting, go to the next phase
	if(turn == "wait" && currTime >= waitTime) {
		currTime = 0;
		switch(prevTurn) {
			case("plan"):
				turn = "exec";
				break;
			case("exec"):
				turn = "plan";
				unitList.BeginTurn();
				break;
			default:
				Debug.Log("Dude, you brok'd it.");
		}
	}
	
	// If you're executing, go to the wait phase
	if(turn == "exec" && (currTime >= turnTime || Input.GetButtonDown("EndTurn"))) {
		currTime = 0;
		turn = "wait";
		prevTurn = "exec";
	}
}