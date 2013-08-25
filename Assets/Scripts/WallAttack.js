#pragma strict
//"Attack."
var stuffComp : DoStuff;
var wallHP=10f;
function Start () {
stuffComp = gameObject.GetComponent(DoStuff);
stuffComp.hp=wallHP;
stuffComp.maxHp=wallHP;//in case we institute healing or something.
}

function OnCollisionStay (collide:Collision) {
// If it's on your team, don't shoot and don't collide
	if(collide.gameObject.tag == gameObject.tag)
		return;

	// If it's a tree, don't shoot but do collide
	stuffComp.canMove = false;
	if(collide.gameObject.tag == "Env")
		return;
}

function OnCollisionExit(){
stuffComp.canMove=true;//feels like it should be part of DoStuff, but we'll fix that after LD.//Definitely a reason to use spheres or cylinders for the colliders so corners do not get stuck. 
}