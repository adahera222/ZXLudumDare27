#pragma strict

// Move, attack, and action, made in "plan", done in "exec"
var moveDir = Vector3(0, 0, 0);
var atkDir = Vector3(0, 0, 0);
var action = 0;

/* Misc Statistics */
// Selected or not - can only give commands when selected
var selected = false;
// Pretty self-explanitory - can it move? Controlled externally (mostly)
var canMove = true;
// Max hp (potentially unused)
var maxHp = 2;
// Current hp
var hp = 2;

/* Controller Data */
// Controller object, set in inspector
var controller : GameObject;
// Timer object, inherited from controller
var timerObj : Timer;
// List of units, inherited from controller
var unitList : ListOfEntities;

/* Internal Components */
// Used for changing color upon selection, retrieved in code
var mat : Renderer;
// Used to show intended direction, set in inspector
var arrow : Transform;

function Start() {
	// Get all the controller components for future reference
	timerObj = controller.GetComponent(Timer);
	unitList = controller.GetComponent(ListOfEntities);
	mat = gameObject.GetComponent(Renderer);
	// Add yourself to the list of units
	unitList.units.Add(gameObject);
}

function Update () {
	if(hp <= 0) {
		unitList.units.Remove(gameObject);
		Destroy(gameObject);
	}
	if(selected)
	{
		// Make 'im green, Jim!
		mat.material.color = Color.green;
		
		// If we're in the planning step, assign actions
		if(timerObj.turn == "plan") {
			// Get movement from axis 1. != so that it doesn't set it while the stick is neutral
			var moveHor = Input.GetAxisRaw("MoveHoriz");
			var moveVert = Input.GetAxisRaw("MoveVert");
			if(moveHor != 0 || moveVert != 0) {
				moveDir.x = moveHor;
				moveDir.z = -moveVert; // Because the Ouya controller is weird.
				moveDir.Normalize(); // Normalize so we get a magnitude of one.
			}
			
			// Get attack direction from axis 2
			var atkHor = Input.GetAxisRaw("AtkHoriz");
			var atkVert = Input.GetAxisRaw("AtkVert");
			if(atkHor != 0 || atkVert != 0) {
				atkDir.x = atkHor;
				atkDir.z = -atkVert; // Because the Ouya controller is weird.
				atkDir.Normalize();
			}
		}
	}
	else {
		// He's red, Jim!
		mat.material.color = Color.red;
	}
		
	// If we're in the exec step, execute actions
	if(timerObj.turn == "exec") {
		// Deselect him - nothing can be selected during exec phase
		selected = false;
	
		// Apply movement in moveDir
		if(canMove)
			transform.position += moveDir * Time.deltaTime;
		
		// And action isn't used for now, so...
	}
	
	// If we're coming up on a new planning phase, clear the current values
	if(timerObj.turn == "wait" && timerObj.prevTurn == "exec") {
		// You can potentially go in a new direction
		canMove = true;
	}
	
	// Rotate unit to look towards atkDir
	gameObject.transform.forward = atkDir;
	
	// Make an arrow!
	arrow.rotation = Quaternion.LookRotation(-moveDir);
	arrow.position = transform.position + moveDir;
}