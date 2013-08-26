#pragma strict

var clock:float;
var initRunSpeed = 8.0;
var secondRunSpeed = 13.0;

function Update () {
clock+=Time.deltaTime;
if (clock>=10||Input.GetButtonDown("Units")||Input.GetMouseButtonDown(0)||Input.GetButtonDown("EndTurn")){
Application.LoadLevel(1);
}
}