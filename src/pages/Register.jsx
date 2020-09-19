import React, {useCallback, useMemo} from "react"
import Validator from "validator"

import "./Register.scss"

import UseForm from "../hooks/UseForm";


import {registerUserWithEmailAndPassword} from "../helpers/authentication";

export default function Register() {
    const initialFormFieldsValues = useMemo(() => {
        return {email: "", password: ""}
    }, [])

    const formValidationSchema = useMemo(() => {
        return {
            email: {
                validator: (value) => {
                    if (Validator.isEmpty(value)) return "isRequired"
                    if (!Validator.isEmail(value)) return "isNotValid"
                },
                errors: {
                    "isNotValid": "Email address is not valid",
                    "isRequired": "Email address is required"
                }
            },
            password: {
                validator: (value) => {
                    if (Validator.isEmpty(value)) return "isRequired"
                },
                errors: {
                    "isRequired": "Password is required"
                }
            }
        }
    }, [])

    const handleFormSubmit = useCallback((formFieldsValues, {setIsFormSubmitting, setFormSubmittingErrors}) => {
        registerUserWithEmailAndPassword(formFieldsValues.email, formFieldsValues.password).then((userCred) => {
            console.log(userCred)
            setIsFormSubmitting(false)
        }).catch(authError => {
            console.log(authError)
            setFormSubmittingErrors((errors) => {
                return {...errors, "auth": authError.message}
            })
            setIsFormSubmitting(false)
        })

    }, [])

    const {formFieldsValues, formFieldsErrors, formFieldsTouched, handleFieldChange, handleSubmitForm, isFormSubmitting, formSubmittingErrors} = UseForm(initialFormFieldsValues, formValidationSchema, handleFormSubmit)
    return (<div className="register">
        <div className="wrapper">
            <main className="frame">
                <h1 className="title">
                    Register
                </h1>
                <form action="" className="register-form">

                    <label className="register-form__label">Email
                        <input type="text" name="email" onChange={handleFieldChange} value={formFieldsValues.email}
                               className="register-form__input"/>

                        {formFieldsTouched.email && formFieldsErrors.email ?
                            <span className="register-form__error-message">{formFieldsErrors.email}</span> : null}

                    </label>

                    <label className="register-form__label">Password

                        <input type="password" name="password" onChange={handleFieldChange}
                               value={formFieldsValues.password}
                               className="register-form__input"/>

                        {formFieldsTouched.password && formFieldsErrors.password ?
                            <span className="register-form__error-message">{formFieldsErrors.password}</span> : null}
                    </label>


                    <button type="submit" onClick={handleSubmitForm} disabled={isFormSubmitting}
                            className="register-form__register-button">Register
                    </button>
                    {formSubmittingErrors.auth ?
                        <span className="register-form__error-message register-form__error-message--no-field">{formSubmittingErrors.auth}</span> : null}
                </form>
            </main>
        </div>
    </div>)
}