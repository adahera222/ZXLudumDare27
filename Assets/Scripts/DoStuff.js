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
var maxHp = 2f;
// Current hp
var hp = 2f;

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
//Hold position, used to counteract physics and allow collisions.
var holdPos : Vector3;

function Start() {
	// Get all the controller components for future reference
	timerObj = controller.GetComponent(Timer);
	unitList = controller.GetComponent(ListOfEntities);
	mat = gameObject.GetComponent(Renderer);
	// Add yourself to the list of units
	unitList.units.Add(gameObject);
	holdPos=transform.position;
}

function Update () {
	if(!canMove){
	rigidbody.velocity=Vector3.zero;
	}
	if(hp <= 0) {
		unitList.units.Remove(gameObject);
		unitList.currUnit--;
		Destroy(gameObject);
	}
	if(selected)
	{
		// Make 'im green, Jim!
		mat.material.color = Color.green;
		
		// If we're in the planning step, assign actions
		if(timerObj.turn == "plan"&&unitList.selectMod=="Units") {
			// Get movement from axis 1. != so that it doesn't set it while the stick is neutral
			var moveHor = Input.GetAxisRaw("MoveHoriz");
			var moveVert = Input.GetAxisRaw("MoveVert");
			if(moveHor != 0 || moveVert != 0) {
				moveDir.x = moveHor;
				moveDir.z = -moveVert; // Because the Ouya controller is weird.
				moveDir.Normalize(); // Normalize so we get a magnitude of one.
			}
			if(Input.GetButtonDown("Deselect")){
					moveDir = Vector3.zero;
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
			rigidbody.velocity=moveDir;
			//transform.position += moveDir * Time.deltaTime;
			
		
		// And action isn't used for now, so...
	}
	
	// If we're coming up on a new planning phase, clear the current values
	if(timerObj.turn == "wait" && timerObj.prevTurn == "exec") {
		// You can potentially go in a new direction
		canMove = true;
	}
	else if(timerObj.turn=="plan"){
	if((holdPos-transform.position).magnitude<.1){
	rigidbody.velocity=Vector3.zero;
	transform.position=holdPos;}
	holdPos=transform.position;
	}
	
	// Rotate unit to look towards atkDir
	gameObject.transform.forward = atkDir;
	
	// Make an arrow!
	arrow.rotation = Quaternion.LookRotation(-moveDir);
	arrow.position = transform.position + moveDir;
}

function OnCollisionStay(collide : Collision) {
Debug.Log("CollisionStay");//Maybe because we're not using physics stuff, they're not colliding?
	// If it's a projectile from the other team, take some damage
	if (collide.collider.tag=="Env"){
	Debug.Log("with a wall");
	transform.position-=moveDir*Time.deltaTime;
	moveDir=Vector3.zero;
	canMove=false;}
	if(gameObject.tag == "Player1Unit" && collide.gameObject.tag == "Player2Proj"
		|| gameObject.tag == "Player2Unit" && collide.gameObject.tag == "Player1Proj") {
		hp -= 1;
		Destroy(collide.gameObject);
	}
}

function OnCollisionEnter(collide:Collision){
	Debug.Log("Collided");
	if (collide.gameObject.tag=="Env"){
	Debug.Log("with a wall");
	transform.position-=moveDir*Time.deltaTime;
	moveDir=Vector3.zero;
	canMove=false;}//seems like it should fix the problem.
}