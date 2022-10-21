import { useState, useEffect, useMemo } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }
    
    const onResetForm = () => {
        setFormState(initialForm);
    }
    
    const createValidators = () => {
        const formCheckValues = {};
        // Iterating the properties of my formValidations
        for (const formProperty of Object.keys(formValidations)) {
            // Destructuring function and error message of the different properties of formValidations
            const [ fn, erroMessage ] = formValidations[formProperty];
            
            // Create a new property, and the corresponding validation is done
            formCheckValues[`${formProperty}Valid`] = fn(formState[formProperty]) ? null : erroMessage;
        }
        // Set the validated property in the state
        setFormValidation(formCheckValues);
    }
    
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        
        return true;
    }, [formValidation]);
    
    useEffect(() => {
        createValidators();
    }, [formState]);

	// If change activeNote, render my component again
	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}