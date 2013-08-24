#pragma strict

var controller : GameObject;
var timerObj : Timer;
var text : GUIText;

function Start() {
	timerObj = controller.GetComponent(Timer);
	text = gameObject.GetComponent(GUIText);
}

function Update () {
	text.text = timerObj.currTime.ToString();
}