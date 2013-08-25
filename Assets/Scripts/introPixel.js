#pragma strict

var origLoc:Vector3;//original location
var timeAlive=0f;
var runspeed=1f;

function Start () {
origLoc=transform.position;
var rand2=Random.insideUnitCircle*5;
transform.position.x=rand2.x;
transform.position.z=rand2.y;
}

function Update () {
transform.position=Vector3(transform.position,origLoc,time.deltaTime*runSpeed);
if (timeAlive>6f&&runSpeed<2f){
origLoc=Random.onUnitSphere*100;
runspeed=5f;
}
}