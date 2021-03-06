// ================================-- settings --================================= //
// types of tags considered to hold an entire paragraph.
const paragraphElems = ["DIV" , "P" , "BODY" , "DD" , "DT" , "H1" , "H2" , "H3" , "H4" , "H5" , "H6" , "H1" , "LI" , "TD" , "BLOCKQUOTE" , "PRE"];
let volume = 0.55;
// ==================================-- code --=================================== //
// Recursively gets the nearest ancestor that is one of the above listed elements.
const getParagraphElem = ( elem ) => paragraphElems.includes( elem.tagName ) ? elem : getParagraphElem( elem.parentElement );
const selectParagraph = ( elem ) => {
	const range = document.createRange();
	range.selectNodeContents( elem );
	const selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange( range );
}
const click = e => {
	if ( e.ctrlKey ) {
		const elem = getParagraphElem( e.target );
		selectParagraph( elem );
	}
}
const contextmenu = e => {
	window.speechSynthesis.cancel();
	if ( e.buttons == 1 ) {
		e.preventDefault();
		e.stopPropagation();
		const elem = getParagraphElem( e.target );
		selectParagraph( elem );
		const utterance = new SpeechSynthesisUtterance( elem.textContent );
		utterance.rate = 10;
		utterance.volume = volume;
		utterance.voice = voice;
		window.speechSynthesis.speak( utterance );
	}
}
const voice = window.speechSynthesis.getVoices()[0];
document.addEventListener( "click" , click , true );
document.addEventListener( "contextmenu" , contextmenu , true );