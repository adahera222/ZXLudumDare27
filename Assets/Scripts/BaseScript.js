#pragma strict

var buildGuidePlane:Transform;
var selected:boolean;
var constructables:GameObject[];
var arrow:Transform;

function Start () {

}

function Update () {
var stickVector=Vector2(Input.GetAxisRaw("Horizontal1"),Input.GetAxisRaw("Vertical1"));
Debug.Log(stickVector);
if(selected){
buildGuidePlane.position.y=transform.position.y;
if (stickVector.magnitude>.9){
var stickAngle=Vector2.Angle(Vector2.right,stickVector);
if (Input.GetAxisRaw("Vertical1")<0.0){stickAngle=360.0-stickAngle;}
Debug.Log(stickAngle);
var ToBuildIndex=Mathf.RoundToInt(stickAngle/360*constructables.Length);
stickAngle=toBuildIndex*360/constructable.Length;
	arrow.rotation = Quaternion.LookRotation(-stickAngle);
	arrow.localPosition = stickAngle;
	//build constructables.ToBuildIndex
}
}
else{buildGuidePlane.position.y=20;}
}