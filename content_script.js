// ================================-- settings --================================= //
// types of tags considered to hold an entire paragraph.
const paragraphElems = ["DIV" , "P" , "BODY" , "DD" , "DT" , "H1" , "H2" , "H3" , "H4" , "H5" , "H6" , "H1" , "LI" , "TD" , "BLOCKQUOTE" , "PRE"];
let volume = 0.55;
// ==================================-- code --=================================== //
// Recursively gets the nearest ancestor that is one of the above listed elements.
const getParagraphElem = ( elem ) => paragraphElems.includes( elem.tagName ) ? elem : getParagraphElem( elem.parentElement );
const mousedown = ( e ) => {
	if ( e.ctrlKey ) {
		e.preventDefault();
		e.stopPropagation();
		let sel = window.getSelection();
		window.speechSynthesis.cancel();
		let elem = getParagraphElem( e.target );
		if ( sel.focusNode !== null && elem == getParagraphElem( sel.focusNode ) ) {
			let utterance = new SpeechSynthesisUtterance( elem.textContent );
			utterance.rate = 10;
			utterance.volume = volume;
			window.speechSynthesis.speak( utterance );
		}
		let range = document.createRange();
		range.selectNodeContents( elem );
		let selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange( range );
	}
}
document.addEventListener( "mousedown" , mousedown , true );
