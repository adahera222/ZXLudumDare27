#pragma strict

// DoStuff reference for atkDir
var stuffComp : DoStuff;

/* Attack Stats */
// Angle of attack
var atkAngle = 60f;
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

function OnCollisionStay(collide : Collision) {
	// If it's on your team, don't shoot and don't collide
	if(collide.gameObject.tag == gameObject.tag)
		return;

	// If it's a tree, don't shoot but do collide
	stuffComp.canMove = false;
	if(collide.gameObject.tag == "Env")
		return;

	// Otherwise, OPEN THE DANG FIRE
	if(atkCurr <= 0)
	{
		// Get angle of rightmost bound
		var rightVect = Quaternion.AngleAxis(-atkAngle / 2, Vector3.up) * stuffComp.atkDir;
		Debug.DrawRay(transform.position, rightVect * 20, Color.white, 0.5);
		// Get angle of leftmost bound
		var leftVect = Quaternion.AngleAxis(atkAngle / 2, Vector3.up) * stuffComp.atkDir;
		Debug.DrawRay(transform.position, leftVect * 20, Color.red, 0.5);
		// Get relative vector of enemy
		var enemyVect = collide.transform.position - gameObject.transform.position;
		// Compare angles
		if(Vector3.Angle(rightVect, enemyVect) <= atkAngle && Vector3.Angle(leftVect, enemyVect) <= atkAngle)
			collide.gameObject.GetComponent(DoStuff).hp -= 1;
		// Reset the cooldown
		atkCurr = atkCool;
	}
}

function OnCollisionExit() {
	// Awesome, he's dead. You can move again.
	stuffComp.canMove = true;
}