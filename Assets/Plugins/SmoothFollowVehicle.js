/* ====================================================================
 * Copyright (c) 2012-2013 Lounge Katt Entertainment.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 *
 * 3. All advertising materials mentioning features or use of this
 *    software must display the following acknowledgment:
 *    "This product includes software developed by Lounge Katt" unless
 *    otherwise displayed by public repository entries.
 *
 * 4. The names "Lounge Katt", "TwistedUmbrella", and "L Project"  
 *    must not be used to endorse or promote products derived from this 
 *    software without prior written permission. For written permission,
 *    please contact admin@loungekatt.com.
 *
 * 5. Products derived from this software may not be called "L Project"
 *    nor may "L Project" appear in their names without prior written
 *    permission of Lounge Katt Entertainment.
 *
 * 6. Redistributions of any form whatsoever must retain the following
 *    acknowledgment:
 *    "This product includes software developed by Lounge Katt" unless
 *    otherwise displayed by tagged repository entries.
 *
 * THIS SOFTWARE IS PROVIDED BY Lounge Katt ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE OpenSSL PROJECT OR
 * ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ====================================================================
 *
 * The license and distribution terms for any publicly available version or
 * derivative of this code cannot be changed.  i.e. this code cannot simply be
 * copied and put under another distribution license
 * [including the GNU Public License.] Content not subject to these terms is
 * subject to to the terms and conditions of the Apache License, Version 2.0.
 */

/*
Original concept provided as a part of Unity Standard Assets (Beta):

This camera smoothes out rotation around the y-axis and height.
Horizontal Distance to the target is always fixed.
 
There are many different ways to smooth the rotation but doing it this way gives you a lot of control over how the camera behaves.
 
For every of those smoothed values we calculate the wanted value and the current value.
Then we smooth it using the Lerp function.
Then we apply the smoothed values to the transform's position.
*/
 
private var target : Transform;
public var height : float = 2.0;
private var distance : float = 6.0;
public var carLead : float = 6.0;
public var reverseOffset : float = 4.0;
public var lookAt = false;
var heightDamping = 1.0;
var rotationDamping = 0.0;

private var isFacingForward : boolean = true;

 
// Place the script in the Camera-Control group in the component menu
@script AddComponentMenu("Camera-Control/Smooth Follow/Smooth Follow Vehicle")
 
 
	function LateUpdate () {

 		target = transform.parent.gameObject.transform;
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
    
    public function cameraForward() {
	    if (GetComponent.<NetworkView>().isMine) {
	    	distance = carLead;
	    	if (!isFacingForward) {
	    		transform.rotation = transform.rotation * Quaternion.AngleAxis(180, Vector3.up);
	    		isFacingForward = true;
	    	}
	    }
    }
    public function cameraReverse() {
	    if (GetComponent.<NetworkView>().isMine) {
	    	distance = carLead - reverseOffset;
	    	if (isFacingForward) {
	    		transform.rotation = transform.rotation * Quaternion.AngleAxis(180, Vector3.up);
	    		isFacingForward = false;
	    	}
	    }
    }