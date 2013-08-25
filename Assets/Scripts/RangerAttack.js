#pragma strict

// DoStuff reference for atkDir
var stuffComp : DoStuff;

/* Attack Stats */
// Attack cooldown
var atkCool = 0.75f;
// Current attack's cooldown
var atkCurr = 0f;

// Projectile to instantiate
var projectile : Rigidbody;

function Start() {
	// Get the reference
	stuffComp = gameObject.GetComponent(DoStuff);
}

function Update() {
	// Decrease current cooldown
	if(atkCurr > 0)
		atkCurr -= Time.deltaTime;

	// Raycast, and if there's something in our way, make a projectile
	if(atkCurr <= 0 && stuffComp.timerObj.turn == "exec") {
		var hitfo : RaycastHit;
		Debug.DrawRay(transform.position, stuffComp.atkDir * 10, Color.white);
		if(Physics.Raycast(transform.position, stuffComp.atkDir, hitfo, 10)) {
			if(hitfo.collider.gameObject.tag != gameObject.tag && hitfo.collider.gameObject.tag != "Projectile") {
				// Maek a new arrow
				var proj : Rigidbody;
				proj = Instantiate(projectile, transform.position + stuffComp.atkDir * 1.2, Quaternion.identity);
				proj.transform.up = stuffComp.atkDir;
				proj.velocity = stuffComp.atkDir * 5;
				// Set projectile's tag based on unit's tag
				switch(gameObject.tag) {
					case("Player1Unit"):
						proj.gameObject.tag = "Player1Proj";
						break;
					case("Player2Unit"):
						proj.gameObject.tag = "Player2Proj";
						break;
					default:
						Debug.Log("I don't know what you did moron, but you sure screwed everything up.");
						break;
				}
				// Reset the cooldown
				atkCurr = atkCool;
			}
		}
	}
}

function OnTriggerStay(collide : Collider) {
	// If it's a tree or they're on your team, don't shoot
	if(collide.gameObject.tag == "Env" || collide.gameObject.tag == gameObject.tag)
		return;

	stuffComp.canMove = false;
}

function OnTriggerExit() {
	// Awesome, he's dead. You can move again.
	stuffComp.canMove = true;
}
