#pragma strict

var myIndex:int;
var myMenu:MenuScript;

function Start () {

}

function Update () {

}

function LookSelected(){
transform.position.z-=.5;//change textures and stuff
}

function LookUnSelected(){
transform.position.z+=.5;
}

function OnMouseOver(){//only if you have a mouse
myMenu.setSelected(myIndex);
}

function OnMouseDown(){//only if you're on a system with a mouse
myMenu.ButtonAction(myIndex);
}

