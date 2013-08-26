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
var hp=20f;

//when you lose, show a texture;
var loseTexture:Texture;

function Start () {
buildGuidePlane.position.y=20;
	for(var i=0;i<constructables.length;i+=1){
		var placeVector=Vector3(Mathf.Cos(2*Mathf.PI/constructables.length*i),0,Mathf.Sin(2*Mathf.PI/constructables.length*i));
		var newUnit=Instantiate(constructables[i],transform.position+placeVector,Quaternion.identity);
		newUnit.GetComponent(DoStuff).controller=controller;
		newUnit.tag=gameObject.tag;
	}
}

function Update () {
	if(hp<0){
	//Die fantastically;
	GetComponent(ParticleSystem).Play();
	controller.GetComponent(ListOfEntities).iLose=true;
	}
	else{
		if (timer.turn=="exec"){
			selected=false;
		if(currentBuild){
			buildClock+=Time.deltaTime;
			if(buildClock>9.9){
				buildClock-=9.9;
				var newUnit=Instantiate(currentBuild,transform.position+outputLocation,Quaternion.identity);
				newUnit.GetComponent(DoStuff).controller=controller;
				newUnit.tag=gameObject.tag;
			}
		}
	}
	if(nextInQueue&&!currentBuild){
	currentBuild=nextInQueue;
	nextInQueue=null;
	}
	
	
	if(timer.turn=="plan"){
		if(selected){
			var stickVector=Vector2(Input.GetAxisRaw("MoveHoriz"),Input.GetAxisRaw("MoveVert"));
			buildGuidePlane.position.y=transform.position.y-.1;
			if (stickVector.magnitude>.9){
				var stickAngle=Vector2.Angle(Vector2.right,stickVector);
				if (Input.GetAxisRaw("MoveVert")>0.0){stickAngle=360.0-stickAngle;}
				//Debug.Log(stickAngle);
				var toBuildIndex=Mathf.RoundToInt(stickAngle/360*constructables.Length);
				stickAngle=toBuildIndex*360/constructables.Length;
				stickVector=Vector2(Mathf.Cos(stickAngle*Mathf.PI/180),Mathf.Sin(stickAngle*Mathf.PI/180));
				var stickVector3=Vector3(stickVector.x,0,stickVector.y);
				arrow.rotation = Quaternion.LookRotation(-stickVector3);
				arrow.localPosition = stickVector3;
				//Debug.Log(toBuildIndex);
				if(toBuildIndex==constructables.Length){toBuildIndex=0;}
				nextInQueue=constructables[toBuildIndex];
				var stick2Vector=Vector3(Input.GetAxisRaw("AtkHoriz"),0,Input.GetAxisRaw("AtkVert"));
				if(stick2Vector.magnitude>.5){outputLocation=stick2Vector.normalized;}
				outputLocation=stickVector3;
			}
		}
		else{buildGuidePlane.position.y=20;}
	}
	else{buildGuidePlane.position.y=20;}
	}
}

function OnCollisionStay(collide:Collision){
if(gameObject.tag == "Player1Unit" && collide.gameObject.tag == "Player2Proj"
		|| gameObject.tag == "Player2Unit" && collide.gameObject.tag == "Player1Proj") {
		takeDamage(1);
		Destroy(collide.gameObject);
	}
}

function takeDamage(damage:float){
hp-=damage;
}

function OnGUI(){
if(selected){
GUI.Label(Rect(0,50,Screen.currentResolution.width,50),"Your home base! Defend it! Left stick or WASD selects the Unit to build. Currently at "+hp+" hitpoints. You lose if this drops to 0!");
}
if (hp<0){
GUI.DrawTexture(Rect(0,0,Screen.currentResolution.width,Screen.currentResolution.height),loseTexture,ScaleMode.ScaleToFit);
}
}