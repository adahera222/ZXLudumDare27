#pragma strict

var origLoc : Vector3;//original location

var runSpeed=5f;
var secondRunSpeed=13f;
var control:introController;
var clock:float;

function Start(){
	clock=0f;
	runSpeed=control.initRunSpeed;
	origLoc = transform.position;
	var rand2 = Random.insideUnitCircle *6*runSpeed;
	transform.position.x += rand2.x;
	transform.position.z += rand2.y;
}

function Update() {
	transform.position = Vector3.MoveTowards(transform.position, origLoc, Time.deltaTime * runSpeed);
	if(control.clock>7&&runSpeed!=control.secondRunSpeed){
		origLoc+=Random.onUnitSphere*100;
		runSpeed=control.secondRunSpeed;
	}
}