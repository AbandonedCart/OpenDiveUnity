public class PCUtil extends MonoBehaviour
{
	public var playerPrefabName : String[];
	private static var prefabName : String[];
	private static var playerPrefab : GameObject[];
	public static var fullView : Texture2D;
	public static var textBox : Texture2D;
	public static var tutorial : Texture2D;
	public static var femaleLead : boolean = true;
	public static var whiteHats : boolean = true;
	public var introModel : String;
	public var miniMapTexture : RenderTexture;
	public var miniMapMaterial : Material;
	public static var mapTexture : RenderTexture;
	public static var mapMaterial : Material;
	private static var temp : GameObject;
	public static var greeter : GameObject;
	public static var display : boolean = true;
	private static var pathway : GameObject;
	private static var buildings : GameObject[];
	private static var lobby : GameObject;
	private static var handler : GameObject;
	private static var shop_owner : GameObject;
	private static var practice : GameObject;
	private static var vehicle : GameObject;
	public static var textStyle : GUIStyle;
	public var extensionScenes : String[];
	private static var extensions : String[];
	public static var uniStorm : GameObject;
	public static var skyControl : GameObject;
	public static var isLocked : boolean = false;
	public static var isVR : boolean = false;
	
	public static function loadAvatarData() {
		if (PlayerPrefs.HasKey("PlayerGender")) {
			PCUtil.femaleLead = (PlayerPrefs.GetInt("PlayerGender") == 1) ? true : false;
		}
		if (!PCUtil.femaleLead) {
			PCUtil.configGender();
		}
		if (PlayerPrefs.HasKey("PlayerTeam")) {
			PCUtil.whiteHats = (PlayerPrefs.GetInt("PlayerTeam") == 1) ? true : false;
		}
		if (!PCUtil.whiteHats) {
			PCUtil.configTeams();
		}
	}
	
	public static function hasGoogleGames () {
		if (PlayerPrefs.HasKey("GoogleGames")) {
			return (PlayerPrefs.GetInt("GoogleGames") == 1) ? true : false;
		}
		return Social.localUser.authenticated || false;
	}
	
	public static function saveAvatarData() {
		PlayerPrefs.SetInt("PlayerGender", femaleLead ? 1 : 0);
		PlayerPrefs.SetInt("PlayerTeam", whiteHats ? 1 : 0);
	}
	
	public static function dismissIntro() {
		Destroy(greeter);
		Resources.UnloadUnusedAssets();
		loadPlatform();
	}
	
	public static function aspectRatio() {
		if (Camera.main.aspect >= 1.7)
		{
			Debug.Log("16:9");
			return 2;
		}
		else if (Camera.main.aspect >= 1.5)
		{
			Debug.Log("3:2");
			return 0;
		}
		else
		{
			Debug.Log("4:3");
			return 1;
		}
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
		var scale : Vector3 = new Vector3 (
			Screen.width / baseWidth(),
			Screen.height / baseHeight(),
			1f
		);
		var svMat : Matrix4x4 = GUI.matrix; // save current matrix
		// substitute matrix - only scale is altered from standard
		GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, scale);
		GUI.skin.label.alignment = TextAnchor.UpperLeft;
		GUI.skin.button.alignment = TextAnchor.MiddleCenter;
		GUI.skin.textField.alignment = TextAnchor.MiddleCenter;
		GUI.skin.label.fontSize = 12;
		GUI.skin.button.fontSize = 12;
		return svMat;
	}
	
	public static function loadPlatform() {
		buildings = new GameObject[10];
		if (Network.isClient || Network.isServer)
			lobby = Instantiate (Resources.Load("Prefabs/Lobby") as GameObject, new Vector3 (116.36f, 11f, 240.2582f), Quaternion.Euler(new Vector3(0f, 270f, 0f)));
		handler = Instantiate (Resources.Load("Prefabs/ToonHouse") as GameObject, new Vector3 (63.5f, 0f, -2.8f), Quaternion.identity);
		shop_owner = Instantiate (Resources.Load("Prefabs/Shop_Owner_NPC") as GameObject, new Vector3 (78.818f, 0.0241f, 15.555f), Quaternion.Euler(new Vector3(0f, -90f, 0f)));
		pathway = Instantiate (Resources.Load("Prefabs/Pathway") as GameObject, new Vector3 (150.96f, -48.18792f, 204.032f), Quaternion.identity);
	}
	
	public static function loadBuildings(level : int) {
		buildings[0] = Instantiate (Resources.Load("Prefabs/Building1") as GameObject, new Vector3 (105.8553f, 0f, 53.28491f), Quaternion.Euler(new Vector3(0f, -180f, 0f)));
		if (level >= 2)
			buildings[1] = Instantiate (Resources.Load("Prefabs/Building2") as GameObject, new Vector3 (71.03601f, 0f, 60.10316f), Quaternion.Euler(new Vector3(0f, 90f, 0f)));
		if (level >= 3)
			buildings[2] = Instantiate (Resources.Load("Prefabs/Building3") as GameObject, new Vector3 (105.672f, 0f, 78.70976f), Quaternion.Euler(new Vector3(0f, -180f, 0f)));
		if (level >= 4)
			buildings[3] = Instantiate (Resources.Load("Prefabs/Building4") as GameObject, new Vector3 (75.7848f, 0f, 91.59146f), Quaternion.identity);
		if (level >= 5)
			buildings[4] = Instantiate (Resources.Load("Prefabs/Building5") as GameObject, new Vector3 (125.4734f, 0f, 108.2014f), Quaternion.Euler(new Vector3(0f, 39.28314f, 0f)));
		if (level >= 6)
			buildings[5] = Instantiate (Resources.Load("Prefabs/Building6") as GameObject, new Vector3 (96.72293f, 0f, 133.8481f), Quaternion.identity);
		if (level >= 7)
			buildings[6] = Instantiate (Resources.Load("Prefabs/Building7") as GameObject, new Vector3 (132.8022f, 0f, 147.0101f), Quaternion.Euler(new Vector3(0f, -180f, 0f)));
		if (level >= 8)
			buildings[7] = Instantiate (Resources.Load("Prefabs/Building8") as GameObject, new Vector3 (99.10777f, 0f, 164.2761f), Quaternion.Euler(new Vector3(0f, -180f, 0f)));
		if (level >= 9)
			buildings[8] = Instantiate (Resources.Load("Prefabs/Building9") as GameObject, new Vector3 (155.0892f, 0f, 178.6105f), Quaternion.Euler(new Vector3(0f, 45f, 0f)));
		if (level >= 10)
			buildings[9] = Instantiate (Resources.Load("Prefabs/Building10") as GameObject, new Vector3 (105.7715f, 0f, 193.0396f), Quaternion.Euler(new Vector3(0f, -135f, 0f)));
	}
	
	public static function loadExtended() {
		practice = Instantiate (Resources.Load("Prefabs/Ethan") as GameObject, new Vector3 (97.62f, 0.29f, 106.65f), Quaternion.Euler(new Vector3(0f, 180f, 0f)));
		vehicle = Instantiate (Resources.Load("Prefabs/Car") as GameObject, new Vector3 (50.779f, 0.15f, 9.505f), Quaternion.identity);
	}
	
	public static function unloadPlatform(level : int) {
		if (uniStorm != null)
			Destroy(uniStorm);
		if (skyControl != null)
			Destroy(skyControl);
		for (var i = 0; i < buildings.length; i ++) {
			if (buildings[i] != null && i != level - 1)
				Destroy (buildings[i]);
		}
		if ((Network.isClient || Network.isServer) && lobby != null)
			Destroy (lobby);
		if (handler != null)
			Destroy (handler);
		if (shop_owner != null)
			Destroy (shop_owner);
		if (pathway != null)
			Destroy (pathway);
		Resources.UnloadUnusedAssets();
	}
	
	public static function unloadExtended() {
		if (vehicle != null)
			Destroy (vehicle);
		if (practice != null)
			Destroy (practice);
		Resources.UnloadUnusedAssets();
	}

	public static var spawnPoints : Vector3[] = [
		new Vector3 (141.56351f, 4.35f, 241.625647f),
		new Vector3 (148.021029f, 4.35f, 241.625647f),
		new Vector3 (141.56351f, 4.35f, 239.080664f),
		new Vector3 (148.021029f, 4.35f, 239.080664f)
	];
	
	public static function isLevel () {
//		for (var level : String in extensions) {
//			if (Application.loadedLevelName == level)
//				return false;
//		}
		return Application.loadedLevelName != "Splashscreen" 
		&& Application.loadedLevelName != "Loader" 
		&& Application.loadedLevelName != "Level-Menu";
	}

	function Awake() {
		prefabName = playerPrefabName;
		extensions = extensionScenes;
		tutorial =  Resources.Load("Textures/IntroTutorial") as Texture2D;
		fullView = Resources.Load("Textures/HeroineCG") as Texture2D;
		textBox = Resources.Load("Textures/TextWindow") as Texture2D;
		textStyle = new GUIStyle();
		textStyle.normal.textColor = Color.white;
		greeter = Instantiate (Resources.Load("Prefabs/" + introModel), new Vector3 (70f, 0.017f, 9f), Quaternion.Euler(new Vector3(0f, -180f, 0f))) as GameObject;
		uniStorm = Instantiate (Resources.Load("Prefabs/UniStorm"), new Vector3 (0f, -600f, 0f), Quaternion.identity) as GameObject;
		skyControl = Instantiate (Resources.Load("Prefabs/SkyControl"), new Vector3 (110f, 0f, 150f), Quaternion.identity) as GameObject;
		mapTexture = miniMapTexture;
		mapMaterial = miniMapMaterial;
	}

	public static function generate() {
		playerPrefab = new GameObject[prefabName.Length];
		PCUtil.loadAvatarData();
	}
	
	public static function configGender() {
		var zeroW : String = prefabName [0];
		var zeroV : String = prefabName [1];
		prefabName [0] = prefabName [2];
		prefabName [1] = prefabName [3];
		prefabName [2] = zeroW;
		prefabName [3] = zeroV;
	}

	public static function configTeams() {
		var zeroW : String = prefabName [0];
		var zeroV : String = prefabName [2];
		prefabName [0] = prefabName [1];
		prefabName [1] = zeroW;
		prefabName [2] = prefabName [3];
		prefabName [3] = zeroV;
	}

	public static function swapGender() {
		var zeroW : String = prefabName [0];
		var zeroV : String = prefabName [1];
		prefabName [0] = prefabName [2];
		prefabName [1] = prefabName [3];
		prefabName [2] = zeroW;
		prefabName [3] = zeroV;
		if (femaleLead)
			femaleLead = false;
		else
			femaleLead = true;
		return femaleLead;
	}

	public static function swapTeams() {
		var zeroW : String = prefabName [0];
		var zeroV : String = prefabName [2];
		prefabName [0] = prefabName [1];
		prefabName [1] = zeroW;
		prefabName [2] = prefabName [3];
		prefabName [3] = zeroV;
		if (whiteHats)
			whiteHats = false;
		else
			whiteHats = true;
		return whiteHats;
	}

	public static function getLabel(player : int) {
		return prefabName [player];
	}

	public static function setAvatar(player : int, avatar : GameObject) {
		playerPrefab [player] = avatar;
	}

	public static function getAvatar(player : int) {
		if (playerPrefab [player] as GameObject) {
			return playerPrefab [player] as GameObject;
		} else {
			return null;
		}
	}

	public static function getTransform(player : int) {
		var temp : GameObject = GameObject.Find (prefabName[player] + "(Clone)");
		if (temp) {
			return temp.transform;
		} else {
			return null;
		}
	}

	public static function getCount() {
		return prefabName.Length;
	}

	public static function getPanel() {
		return fullView;
	}

	public static function getWindow() {
		return textBox;
	}
	
	public static function displayTutorial() {
		GUI.color = Color.white;
		GUI.backgroundColor = Color.white;
		
		GUI.DrawTexture(new Rect(40, 180, 460, 280), tutorial);
		
		GUI.color = Color.green;
		GUI.backgroundColor = Color.white;
	}

	public static function ColorTexture(col : Color) {
		var pix : Color[] = new Color[baseWidth() * baseHeight()];
		
		for (var i = 0; i < pix.Length; i++) {
			pix[i] = col;
		}
		
		var result : Texture2D = new Texture2D(baseWidth(), baseHeight());
		result.SetPixels(pix);
		result.Apply();
		return result;
	}
	
	public static function pauseGame() {
		if (Time.timeScale != 0.0) {
			Time.timeScale = 0.0;
		} else {
			Time.timeScale = 1.0;
		}
	}
}