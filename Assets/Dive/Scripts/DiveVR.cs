using UnityEngine;
using System.Collections;

public class DiveVR : MonoBehaviour {

	public static bool isVR = false;
	private static GameObject[] OpenDiveCamera;
	private static int delay;
	public int vrDelay = 6;
	private static int delayOrig;

/*
 *  The start function for the character requires the following
 *  Camera.main.GetComponent<OpenDiveSensor>().target = transform.gameObject;
 *  (Sets the focus of the OpenDiveSensor as the character)
 *  CardboardMagnet.SetEnabled(true);
 *  (Enables use of the magnet button as a valid input method)
 * 
 */
	
	void Start () {
		OpenDiveCamera = Camera.main.GetComponent<SmoothFollowMobile> ().OpenDiveCamera;
		delay = delayOrig = vrDelay;
	}

	void Update () {
		if (!DiveVR.isVR) {
			if (CardboardMagnet.CheckIfWasClicked()) {
				DiveVR.enableVR();
				CardboardMagnet.ResetClick();
			}
		}
	}
	
	public static void enableVR () {
		if (OpenDiveCamera[0] != null && OpenDiveCamera[1] != null) {
			DiveVR.isVR = true;
			// Perform any actions required for enabled VR
			Camera.main.GetComponent <AudioListener>().enabled = false;
			OpenDiveCamera[0].SetActive(true);
			OpenDiveCamera [1].SetActive (true);
			Camera.main.GetComponent <OpenDiveSensor>().enabled = true;
		}
	}

	public static void disableVR () {
		if (OpenDiveCamera[0] != null && OpenDiveCamera[0].activeInHierarchy
		    && OpenDiveCamera[1] != null && OpenDiveCamera[1].activeInHierarchy) {
			DiveVR.isVR = false;
			Camera.main.GetComponent <OpenDiveSensor>().enabled = false;
			OpenDiveCamera[0].SetActive(false);
			OpenDiveCamera[1].SetActive(false);
			Camera.main.GetComponent <AudioListener>().enabled = true;
			Camera.main.transform.rotation = Quaternion.identity;
			// Perform any actions that result from disabled VR
		}
	}

	public static void delayedVR (MonoBehaviour instance) {
		instance.StartCoroutine(VirtualTimeout());
	}

	public static function baseWidth() {
		return 	854.0f;
	}

	public static function baseHeight() {
		if (aspectRatio == 1) {
			return 640.0f;
		} else {
			return 480.0f;
		}
	}

	public static function initGui() {
		Vector3 scale = new Vector3 (
			Screen.width / baseWidth(),
			Screen.height / baseHeight(),
			1f
		);
		Matrix4x4 svMat = GUI.matrix; // save default matrix
		GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, scale);
		GUI.skin.label.alignment = TextAnchor.UpperLeft;
		GUI.skin.button.alignment = TextAnchor.MiddleCenter;
		GUI.skin.textField.alignment = TextAnchor.MiddleCenter;
		GUI.skin.label.fontSize = 12;
		GUI.skin.button.fontSize = 12;
		return svMat;
	}

	void OnGUI() {
		Matrix4x4 svMat = initGui ();
		if (delay < 6)
			GUI.Button (new Rect (350, 170, 180, 40), "Enabling VR in " + delay);
		GUI.matrix = svMat; // restore default matrix
	}

	public static IEnumerator VirtualTimeout ()
	{
		while (delay > 0) {
			yield return new WaitForSeconds (1.0f);
			delay = delay - 1;
		}
		DiveVR.enableVR();
		delay = delayOrig;
	}
}
	