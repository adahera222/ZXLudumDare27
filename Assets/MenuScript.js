#pragma strict

var buttons: MenuButton[];
var selectedButton=0;
@HideInInspector
var selectedLast:boolean;

function Start () {
buttons[0].LookSelected();
for(var i=0;i<buttons.length;i+=1){
	buttons[i].myMenu=gameObject.GetComponent(MenuScript);
	buttons[i].myIndex=i;
}
}

function Update () {


if (Input.GetAxisRaw("Vertical1")>.5){
	if(!selectedLast){setSelected(selectedButton+1);}
	selectedLast=true;
}
else if (Input.GetAxisRaw("Vertical1")<-.5){
	if(!selectedLast){setSelected(selectedButton-1);}
	selectedLast=true;
}
else {selectedLast=false;}
if(Input.GetButtonDown("Button1")){
ButtonAction(selectedButton);
}
}

function ButtonAction(ButtonIndex:int){
switch(ButtonIndex)
{
case 0:
	//Start - go to next scene
	break;
case 1:
	//quit?
	break;
default://options? maybe buy other maps eventually?
	Debug.Log("You fail standing up school");//mr. blah
}
}

function setSelected(selection:int){
buttons[selectedButton].LookUnSelected();
selectedButton=selection;
if (selectedButton<0){selectedButton=buttons.Length-1;}
else if (selectedButton>buttons.Length-1){selectedButton=0;}
buttons[selectedButton].LookSelected();
}