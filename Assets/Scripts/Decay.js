#pragma strict

var decayTime : float = 10;

function Update() {
	decayTime -= Time.deltaTime;
	if(decayTime <= 0)
		Destroy(gameObject);
}