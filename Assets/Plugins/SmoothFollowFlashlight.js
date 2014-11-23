
/*
This camera smoothes out rotation around the y-axis and height.
Horizontal Distance to the target is always fixed.
 
There are many different ways to smooth the rotation but doing it this way gives you a lot of control over how the camera behaves.
 
For every of those smoothed values we calculate the wanted value and the current value.
Then we smooth it using the Lerp function.
Then we apply the smoothed values to the transform's position.
*/
 
private var target : Transform;
public var height : float = 2.0;
private var distance : float = 5.0;
public var origin : float = 4.0;
public var reverseOffset : float = 6.0;
public var spotlight = false;
public var projection : float = 45.0f;
var heightDamping = 1.0;
var rotationDamping = 0.0;
 
// Place the script in the Camera-Control group in the component menu
@script AddComponentMenu("Camera-Control/Smooth Follow/Smooth Follow Flashlight")
 
function LateUpdate () {
    var target : Transform = transform.parent.GetComponent(SmoothFollowMobile).target;
 	if (target) {
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
	 
	    // Set the position of the camera on the x-z plane to:
	    // distance meters behind the target
	    transform.position = target.position;
	    transform.rotation =  Quaternion.Euler (projection, currentRotationAngle, 0);
	 
	    // Set the height of the camera
	    transform.position.y = currentHeight;
	 
	    // Always look at the target
	    if (spotlight) {
	    	transform.LookAt (target);
	    }
    }
    }
    
    public function lightForward() {
    	distance = origin;
    }
    public function lightReverse() {
    	distance = -(origin + reverseOffset);
    }
    
    public function lightTilt(offset : float) {
    	transform.rotation = transform.rotation * Quaternion.AngleAxis(offset, Vector3.up);
    }