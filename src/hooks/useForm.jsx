import {useEffect, useState} from "react";


export default function useForm(initialFormFieldsValues = {}, validationSchema, handleFormSubmit) {
    const [formFieldsValues, setFormFieldsValues] = useState(initialFormFieldsValues)
    const [formFieldsErrors, setFormFieldsErrors] = useState({})
    const [formFieldsTouched, setFormFieldsTouched] = useState({}) // Add name of the field with the value of true if the field was touched
    const [isFormSubmitting, setIsFormSubmitting] = useState(false)
    const [formSubmittingErrors, setFormSubmittingErrors] = useState({})

    // Make a form validation at the component creation
    useEffect(() => {
        let _formErrors = {}
        for (const initialFieldName of Object.keys(initialFormFieldsValues)) {
            const initialFieldValue = initialFormFieldsValues[initialFieldName]

            const errorCode = validationSchema[initialFieldName].validator(initialFieldValue, {initialFormFieldsValues})
            _formErrors[initialFieldName] = validationSchema[initialFieldName].errors[errorCode]
        }
        setFormFieldsErrors(_formErrors)
    }, [initialFormFieldsValues, validationSchema])

    function handleFieldChange(e) {
        e.persist()

        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormFieldsValues((values) => {
            return {...values, [fieldName]: fieldValue}
        })
        const errorCode = validationSchema[fieldName].validator(fieldValue, {formFieldsValues})
        const errorMessage = validationSchema[fieldName].errors[errorCode]
        const error = {[fieldName]: errorMessage}

        setFormFieldsErrors((errors) => {
            return {...errors, ...error}
        })

        setFormFieldsTouched((fieldsTouched) => {
            return {...fieldsTouched, [fieldName]: true}
        })
    }

    function handleSubmitForm(e) {
        e.preventDefault()

        // Check if all values of the object are undefined if it's the case, the form is valid
        const isFormValid = Object.values(formFieldsErrors).every(formError => formError === undefined)

        if (isFormValid) {
            setIsFormSubmitting(true)
            handleFormSubmit(formFieldsValues, {setIsFormSubmitting, setFormSubmittingErrors})

        }

    }

    return {formFieldsValues, formFieldsErrors, formFieldsTouched, handleFieldChange, handleSubmitForm, isFormSubmitting,formSubmittingErrors}

}