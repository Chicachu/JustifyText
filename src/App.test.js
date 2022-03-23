import App from './App';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {fireEvent} from '@testing-library/react';

let container = null;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("input text is non-empty", () => {
	act(() => {
		render(<App />, container);
	});
	
	const input = document.querySelector("[data-testid=input-text]");
	expect(input.textContent).toBe("");
	
	//const justifyText = jest.spyOn(App, 'justifyText');
	const justifyTextButton = document.querySelector("[data-testid=justify-text-button]");
	act(() => {
		justifyTextButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	
	//expect(justifyText).toHaveBeenCalledTimes(1);
	
	const errorMessage = document.querySelector("[data-testid=error-message-label]");
	expect(errorMessage.textContent).toBe("Please enter a text to be justified.");
});

it("length is a valid number less than or equal to 255", () => {
	act(() => {
		render(<App />, container);
	});
	
	const length = document.querySelector("[data-testid=input-length]");
	const input = document.querySelector("[data-testid=input-text]");
	
	fireEvent.change(input, {
		target: {
			value: "The quick brown fox jumps over the lazy dog."
		}
	});
	
	expect(length.value).toBe("0");
	
	fireEvent.change(length, {
		target: {
			value: 300
		}
	});
	
	const justifyTextButton = document.querySelector("[data-testid=justify-text-button]");
	act(() => {
		justifyTextButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	
	const errorMessage = document.querySelector("[data-testid=error-message-label]");
	expect(errorMessage.textContent).toBe("Please input a justified length of less than or equal to 225.");
	
	fireEvent.change(length, {
		target: {
			value: "foo"
		}
	});
	
	act(() => {
		justifyTextButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	
	expect(errorMessage.textContent).toBe("Please enter a valid number.");
});

it("justifyText method justifies text", () => {
	act(() => {
		render(<App />, container);
	});
	
	const input = document.querySelector("[data-testid=input-text]");
	const length = document.querySelector("[data-testid=input-length]");
	
	fireEvent.change(input, {
		target: {
			value: "The quick brown fox jumps over the lazy dog."
		}
	});
	
	fireEvent.change(length, {
		target: {
			value: 80
		}
	});
	
	const justifyTextButton = document.querySelector("[data-testid=justify-text-button]");
	act(() => {
		justifyTextButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	
	const outputLabel = document.querySelector("[data-testid=justified-text-label]");
	expect(outputLabel.textContent).toBe("The       quick       brown       fox       jumps       over      the      lazy      dog.")
});