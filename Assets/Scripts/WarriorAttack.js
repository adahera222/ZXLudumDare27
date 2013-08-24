#pragma strict

// DoStuff reference for atkDir
var stuffComp : DoStuff;

/* Attack Stats */
// Angle of attack
var atkAngle = 30f;
// Attack cooldown
var atkCool = 0.5f;
// Current attack's cooldown
var atkCurr = 0f;

function Start() {
	// Get the reference
	stuffComp = gameObject.GetComponent(DoStuff);
}

function Update() {
	// Decrease current cooldown
	if(atkCurr > 0)
		atkCurr -= Time.deltaTime;
}

function OnCollisionEnter(collide : Collision) {
	// Can't move once you're engaged!
	stuffComp.canMove = false;
}

function OnCollision(collide : Collision) {
	// If it's a tree or they're on your team, don't shoot
	if(collide.gameObject.tag == "Env" || collide.gameObject.tag == gameObject.tag)
		return;

	if(atkCurr <= 0)
	{
		// Get angle of rightmost bound
		var rightVect = Quaternion.AngleAxis(-atkAngle / 2, Vector3.up) * stuffComp.atkDir;
		// Get angle of leftmost bound
		var leftVect = Quaternion.AngleAxis(atkAngle / 2, Vector3.up) * stuffComp.atkDir;
		// Get relative vector of enemy
		var enemyVect = collide.transform.position - gameObject.transform.position;
		// Compare angles
		if(Vector3.Angle(rightVect, enemyVect) <= atkAngle && Vector3.Angle(leftVect, enemyVect) <= atkAngle)
			collide.gameObject.GetComponent(DoStuff).hp -= 1;
		// Reset the cooldown
		atkCurr = atkCool;
	}
}

function OnCollisionExit(collide : Collision) {
	// Awesome, he's dead. You can move again.
	stuffComp.canMove = true;
}