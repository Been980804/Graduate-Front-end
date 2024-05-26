import { useState } from "react";

export function useInput(defaultValue, validationFn) {
	const [enteredValue, setEnteredValue] = useState(defaultValue);
	const [didEdit, setDidEdit] = useState(false);

	const valueIsValid = validationFn(enteredValue);

	function handleInputChange(event) {
		setEnteredValue(event.target.value);
	}

	function handleInputBlur() {
		setDidEdit(true);
	}

	return {
		value: enteredValue,
		handleInputChange,
		handleInputBlur,
		hasError: didEdit && !valueIsValid,
	};
}
