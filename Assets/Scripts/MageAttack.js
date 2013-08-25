#pragma strict

var emitter : ParticleSystem;
var stuffComp : DoStuff;

function Start() {
	emitter = gameObject.GetComponent(ParticleSystem);
	stuffComp = gameObject.GetComponent(DoStuff);
}

function Update() {
	if(stuffComp.timerObj.turn == "exec") {
		// Get all units and stuff in a sphere
		var sphereHits : Collider[] = Physics.OverlapSphere(transform.position, 1.5);
		Debug.Log(sphereHits.Length);
		// If there are some units, iterate through them.
		if(sphereHits.Length > 0) {
			var enemyPresent = false;
			for(hitfo in sphereHits) {
				// Compare tags'n'such
				var hitfoTag = hitfo.collider.gameObject.tag;
				if(hitfoTag != gameObject.tag && hitfoTag != "Env") {
					// Turn on the FREAKIN' EPIC particle system
					emitter.Play();
					// Note that we got an enemy
					enemyPresent = true;
					// Do damage at a rate of 1/s
					hitfo.collider.gameObject.GetComponent(DoStuff).hp -= Time.deltaTime;
				}
			}
			// If we didn't get an enemy, turn the FREAKIN' EPIC partical system off :(
			if(!enemyPresent)
				emitter.Stop();
		}
	}
}

function OnCollisionStay(collide : Collision) {
	// If it's on your team, don't shoot and don't collide
	if(collide.gameObject.tag == gameObject.tag)
		return;

	stuffComp.canMove = false;
}

function OnCollisionExit() {
	// Awesome, he's dead. You can move again.
	stuffComp.canMove = true;
}
