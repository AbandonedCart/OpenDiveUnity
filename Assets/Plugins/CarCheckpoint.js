#pragma strict

var checkPointArray : Transform[]; //Checkpoint GameObjects stored as an array
public var currentCheckpoint : int = 0; //Current checkpoint
public var currentLap : int = 0; //Current lap
public var startPos : Vector3; //Starting position

function Start () {
	//Set a simple visual aid for the Checkpoints
	for (objAlpha in checkPointArray) {
		objAlpha.GetComponent.<Renderer>().material.color.a = 0.2;
	}
	checkPointArray[0].GetComponent.<Renderer>().material.color.a = 0.8;
	
	//Store the starting position of the player
	startPos = transform.position;
}
