#pragma strict

var moveDir = new Vector3(0, 0, 0);
var atkDir = new Vector3(0, 0, 0);
var action = 0;
var controller : GameObject;
var timerObj : Timer;
var unitList : ListOfEntities;
var selected = false;
var mat : Renderer;
var arrow : Transform;

function Start() {
	timerObj = controller.GetComponent(Timer);
	unitList = controller.GetComponent(ListOfEntities);
	mat = gameObject.GetComponent(Renderer);
	unitList.Add(gameObject);
}

function Update () {
	if(selected)
	{
		// Make 'im green, Jim!
		mat.material.color = Color.green;
		
		// If we're in the planning step, assign actions
		if(timerObj.turn == "plan") {
			// Get movement from axis 1. != so that it doesn't set it while the stick is neutral
			var moveHor = Input.GetAxisRaw("Horizontal1");
			var moveVert = Input.GetAxisRaw("Vertical1");
			if(moveHor != 0 || moveVert != 0) {
				moveDir.x = moveHor;
				moveDir.z = moveVert;
				moveDir.Normalize(); // Normalize so we get a magnitude of one.
				
				Debug.Log(moveHor);
				Debug.Log(moveVert);
			}
			
			/*/ Get attack direction from axis 2
			var atkHor = Input.GetAxisRaw("Horizontal2");
			var atkVert = Input.GetAxisRaw("Vertical2");
			if(atkHor != 0) {
				atkDir.x = atkHor / Mathf.Abs(atkHor);
			}
			if(atkVert != 0) {
				atkDir.z = atkVert / Mathf.Abs(atkVert);
			}
			// */
			
			/*/ Get action type from buttons
			if(Input.GetButtonDown("Action1")) {
				action = 1;
			}
			if(Input.GetButtonDown("Action2")) {
				action = 2;
			}
			// */
			
			// Handle next and previous buttons
			
		}
	}
	else {
		// Make 'im red, Jim!
		mat.material.color = Color.red;
	}
		
	// If we're in the exec step, execute actions
	if(timerObj.turn == "exec") {
		// Deselect him - nothing can be selected during exec phase
		selected = false;
	
		// Apply movement in moveDir
		transform.position += moveDir * Time.deltaTime;
		
		// For now, simply rotate towards atkDir
		//transform.rotation = Quaternion.Euler(atkDir);
		
		// And action isn't used for now, so...
	}
	
	// If we're coming up on a new planning phase, clear the current values
	if(timerObj.turn == "wait" && timerObj.prevTurn == "exec") {
		//moveDir = new Vector3(0, 0, 0);
		//atkDir = new Vector3(0, 0, 0);
	}
	
	// Make an arrow!
	arrow.rotation = Quaternion.LookRotation(-moveDir);
	arrow.localPosition = moveDir;
}
