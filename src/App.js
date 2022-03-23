import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
	const [input, setInput] = useState(); 
	const [length, setLength] = useState(); 
	const [initialText, setInitialText] = useState();
	const [justifiedText, setJustifiedText] = useState();
	const [errorMessage, setErrorMessage] = useState();
	
	const justifyText = () => {
	// Extra space in the justified length needs to be evenly distributed throughout 
	// the given number of spaces in the initial text. 
		// So count the number of spaces there are intially
		if (input === undefined || input.trim() === "") {
			setErrorMessage("Please enter a text to be justified.");
		} else if (isNaN(length)) {
			setErrorMessage("Please enter a valid number.");
		} else if (parseInt(length) > 225) {
			setErrorMessage("Please input a justified length of less than or equal to 225.")
		} else {
			let inputString = input + "";
			let spaceCount = (inputString.split(" ").length - 1);
			// Count how many letters of text there are. 
			let lettersOfText = (inputString.replace(/\s/g, "").length - 1);
			// Subtract the letters of text from justified length.
			let spacesToDistribute = parseInt(length) - lettersOfText;
			// Evenly distribute remaining spaces into the number of spaces found earlier. 
			let charArray = inputString.trim().split('');
			let addedSpaces = parseInt(spacesToDistribute / spaceCount);
			
			// Any remainder spaces can be evenly distributed starting from the beginnging of the sentence. 
			let remainderSpaces = addedSpaces % spaceCount;
			
			let newJustifiedText = "";
			for (let i = 0; i < charArray.length; i++) {
				if (charArray[i] === " ") {
					for (let spaces = addedSpaces; spaces >= 0; spaces--) {
						newJustifiedText += "\u00A0";
					}
					if (remainderSpaces > 0) {
						newJustifiedText += "\u00A0";
						remainderSpaces--;
					}
				} else {
					newJustifiedText += charArray[i];
				}
			}
			setJustifiedText(newJustifiedText);
			setInitialText(input);
		}
	}
	
	return (
		<div className="App">
			<header className="App-header">
				Justify Your Text
			</header>
			<div className="form">
				<div>
					<label>The text to be justified:</label><input className="inputText" value={input || ""} onChange={val => setInput(val.target.value)} maxLength="100" data-testid="input-text" type="text" />
				</div>
				<div>
					<label>The length the text should be justified to (max: 225):</label><input className="inputLength" value={length || 0} onChange={val => setLength(val.target.value)} data-testid="input-length" type="text" />
					<button onClick={() => justifyText()} data-testid="justify-text-button">Justify Text</button>
				</div>
				<div>
					<label value={initialText} onChange={val => setInitialText(val.target.value)} data-testid="initial-text-label">{initialText}</label>
				</div>
				<div>
					<label value={justifiedText} onChange={val => setJustifiedText(val.target.value)} data-testid="justified-text-label">{justifiedText}</label>
				</div>
				<label className="red" value={errorMessage} onChange={val => setErrorMessage(val.target.value)} data-testid="error-message-label">{errorMessage}</label>
			</div>
		</div>
	);
}

export default App;
