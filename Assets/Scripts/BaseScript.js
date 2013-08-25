#pragma strict

var buildGuidePlane:Transform;
var selected:boolean;
var constructables:GameObject[];
var arrow:Transform;
var buildClock:float;
var currentBuild:GameObject;
var nextInQueue:GameObject;
var outputLocation:Vector3;
var timer:Timer;
var controller:GameObject;

function Start () {
buildGuidePlane.position.y=20;
	for(var i=0;i<constructables.length;i+=1){
		var placeVector=Vector3(Mathf.Cos(2*Mathf.PI/constructables.length*i),0,Mathf.Sin(2*Mathf.PI/constructables.length*i));
		Instantiate(constructables[i],transform.position+placeVector,Quaternion.identity);
	}
}

function Update () {
if (timer.turn=="exec"){
selected=false;
if(currentBuild){
buildClock+=Time.deltaTime;
if(buildClock>9.9){
buildClock-=9.9;
var newUnit=Instantiate(currentBuild,transform.position+outputLocation,Quaternion.identity);
newUnit.GetComponent(DoStuff).controller=controller;
}
}}
if(nextInQueue&&!currentBuild){
currentBuild=nextInQueue;
nextInQueue=null;
}


if(timer.turn=="plan"){
if(selected){
var stickVector=Vector2(Input.GetAxisRaw("Horizontal1"),Input.GetAxisRaw("Vertical1"));
buildGuidePlane.position.y=transform.position.y;
if (stickVector.magnitude>.9){
var stickAngle=Vector2.Angle(Vector2.right,stickVector);
if (Input.GetAxisRaw("Vertical1")<0.0){stickAngle=360.0-stickAngle;}
Debug.Log(stickAngle);
var toBuildIndex=Mathf.RoundToInt(stickAngle/360*constructables.Length);
stickAngle=toBuildIndex*360/constructables.Length;
stickVector=Vector2(Mathf.Cos(stickAngle*Mathf.PI/180),Mathf.Sin(stickAngle*Mathf.PI/180));
var stickVector3=Vector3(stickVector.x,0,stickVector.y);
	arrow.rotation = Quaternion.LookRotation(-stickVector3);
	arrow.localPosition = stickVector3;
	Debug.Log(toBuildIndex);
	if(toBuildIndex==constructables.Length){toBuildIndex=0;}
	nextInQueue=constructables[toBuildIndex];
var stick2Vector=Vector3(Input.GetAxisRaw("Horizontal2"),0,Input.GetAxisRaw("Vertical2"));
if(stick2Vector.magnitude>.5){outputLocation=stick2Vector.normalized;}
outputLocation=stickVector3;
}
}
else{buildGuidePlane.position.y=20;}
}
else{buildGuidePlane.position.y=20;}
}