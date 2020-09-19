import React, {useCallback, useMemo} from "react"
import Validator from "validator"

import "./Login.scss"

import UseForm from "../hooks/UseForm";

import {loginUserWithEmailAndPassword} from "../utils/firebase";


export default function Login() {
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
            },
        }
    }, [])

    const handleFormSubmit = useCallback((formFieldsValues, {setIsFormSubmitting, setFormSubmittingErrors}) => {
        loginUserWithEmailAndPassword(formFieldsValues.email, formFieldsValues.password).then((userCred) => {
            console.log(userCred)
            setIsFormSubmitting(false)

        }).catch(authError => {
            console.log(authError)
            setFormSubmittingErrors((errors) => {
                return {...errors, "auth": authError.message}
            })
            setIsFormSubmitting(false)
        })

    },[] )

    const {formFieldsValues, formFieldsErrors, formFieldsTouched, handleFieldChange, handleSubmitForm, isFormSubmitting, formSubmittingErrors} = UseForm(initialFormFieldsValues, formValidationSchema, handleFormSubmit)
    return (<div className="login">
        <div className="login__wrapper">
            <main className="login__frame">
                <h1 className="login__title">
                    Login
                </h1>
                <form action="" className="login-form">

                    <label className="login-form__label">Email
                        <input type="text" name="email" onChange={handleFieldChange} value={formFieldsValues.email}
                               className="login-form__input"/>

                        {formFieldsTouched.email && formFieldsErrors.email ?
                            <span className="login-form__error-message">{formFieldsErrors.email}</span> : null}

                    </label>

                    <label className="login-form__label">Password

                        <input type="password" name="password" onChange={handleFieldChange}
                               value={formFieldsValues.password}
                               className="login-form__input"/>

                        {formFieldsTouched.password && formFieldsErrors.password ?
                            <span className="login-form__error-message">{formFieldsErrors.password}</span> : null}
                    </label>


                    <button type="submit" onClick={handleSubmitForm} disabled={isFormSubmitting}
                            className="login-form__login-button">Login
                    </button>
                    {formSubmittingErrors.auth ?
                        <span className="login-form__error-message register-form__error-message--no-field">{formSubmittingErrors.auth}</span> : null}
                </form>
            </main>
        </div>
    </div>)
}


