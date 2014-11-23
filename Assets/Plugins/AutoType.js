#pragma strict

public class AutoType extends MonoBehaviour
{
	public var output : String = "";
	public var Delay : float = 0.02;
	public var doubleSpace : boolean = false;

	function WriteText(aText : String[]) {
		StartCoroutine(TypeText(aText));
	}

	function TypeText (aText : String[]) {
		output = "";
		for (var word : String in aText) {
			for (var letter in word.ToCharArray()) {
				output += letter;
				yield WaitForSeconds (Delay);
			}
			output += "\n";
			if (doubleSpace)
				output += "\n";
		}
	}
}