
/*
This camera smoothes out rotation around the y-axis and height.
Horizontal Distance to the target is always fixed.
 
There are many different ways to smooth the rotation but doing it this way gives you a lot of control over how the camera behaves.
 
For every of those smoothed values we calculate the wanted value and the current value.
Then we smooth it using the Lerp function.
Then we apply the smoothed values to the transform's position.
*/
 
public var height : float = 2.0;
private var distance : float = 3.0;
public var playerLead : float = 3.0;
public var reverseOffset : float = 2.0;
public var lookAt : boolean = false;
var heightDamping = 1.0;
var rotationDamping = 0.0;
public var target : Transform;
public var menuMusic : AudioSource;
public var levelMusic : AudioSource;
public var weather : GameObject;
public var limelight : Light;
public var flashlight : GameObject;

public var reparentCamera : boolean = false;
private var isFacingForward : boolean = true;

public var OpenDiveCamera : GameObject[];
 
// Place the script in the Camera-Control group in the component menu
@script AddComponentMenu("Camera-Control/Smooth Follow/Smooth Follow Mobile")

	function OnPreCull () {
		if (limelight != null)
			limelight.enabled = false;
	}
	
	function OnPreRender() {
		if (limelight != null)
			limelight.enabled = false;
	}

	function OnPostRender() {
		if (limelight != null)
			limelight.enabled = true;
	}
 
 	function Awake() {
 		if (lookAt) {
	    	playerLead = playerLead + 2;
	    }
	}
	
	function OnLevelWasLoaded (level : int) {
		if (PCUtil.isLevel()) {
			if (menuMusic.isPlaying)
				menuMusic.Stop();
			levelMusic.Play();
			if (flashlight != null)
				flashlight.SetActive(true);
		} else {
			if (flashlight != null)
				flashlight.SetActive(false);
		}
	}
 
	function LateUpdate () {

	 	//target = transform.parent.gameObject.transform;
	 	if (target) {
	 		if (reparentCamera)
		 		transform.parent = target;
		    // Calculate the current rotation angles
			var wantedRotationAngle = target.eulerAngles.y;
			var wantedHeight = target.position.y + height;
				
			var currentRotationAngle = transform.eulerAngles.y;
			var currentHeight = transform.position.y;
		 
		    // Calculate the current rotation angles
		    wantedRotationAngle = target.eulerAngles.y;
		    wantedHeight = target.position.y + height;
		 
		    currentRotationAngle = transform.eulerAngles.y;
		    currentHeight = transform.position.y;
		 
		    // Damp the rotation around the y-axis
		    currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);
		 
		    // Damp the height
		    currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);
		 
		    // Convert the angle into a rotation
			var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
		 
		    // Set the position of the camera on the x-z plane to:
		    // distance meters behind the target
		    transform.position = target.position;
		    transform.position -= currentRotation * Vector3.forward * distance;
		 
		    // Set the height of the camera
		    transform.position.y = currentHeight;
		 
		    // Always look at the target
		    if (lookAt) {
		    	transform.LookAt (target);
		    }
	    }
	}
    
    public function cameraForward() {
	    if (GetComponent.<NetworkView>().isMine || !(Network.isServer || Network.isClient)) {
	    	distance = playerLead;
	    	if (reparentCamera && !isFacingForward) {
	    		transform.rotation = transform.rotation * Quaternion.AngleAxis(180, Vector3.up);
	    		isFacingForward = true;
	    	}
	    	if (flashlight != null && flashlight.GetComponent(SmoothFollowFlashlight) != null) {
	    		flashlight.GetComponent(SmoothFollowFlashlight).lightForward();
	    	}
	    }
    }
    public function cameraReverse() {
	    if (GetComponent.<NetworkView>().isMine|| !(Network.isServer || Network.isClient)) {
	    	distance = playerLead + reverseOffset;
	    	if (reparentCamera && isFacingForward) {
	    		transform.rotation = transform.rotation * Quaternion.AngleAxis(180, Vector3.up);
	    		isFacingForward = false;
	    	}
	    	if (flashlight != null && flashlight.GetComponent(SmoothFollowFlashlight) != null) {
	    		flashlight.GetComponent(SmoothFollowFlashlight).lightReverse();
	    	}
	    }
    }
    public function cameraTilt(offset : float) {
	    if (GetComponent.<NetworkView>().isMine|| !(Network.isServer || Network.isClient)) {
	    	if (!reparentCamera) {
				transform.rotation = transform.rotation * Quaternion.AngleAxis(offset, Vector3.up);
			}
	    	if (flashlight != null && flashlight.GetComponent(SmoothFollowFlashlight) != null) {
	    		flashlight.GetComponent(SmoothFollowFlashlight).lightTilt(offset);
	    	}
		}
    }
    
    