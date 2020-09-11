import React, {useCallback, useMemo} from "react"
import Validator from "validator"

import "./Login.scss"

import useForm from "../hooks/useForm";


import {loginUserWithEmailAndPassword} from "../helpers/firebase";

export default function Login() {
    const intialFormFieldsValues = useMemo(() => {
        return {email: "", password: ""}
    }, [])

    const validationSchema = useMemo(() => {
        return {
            email: {
                validator: (value) => {
                    if (Validator.isEmpty(value)) return "isRequired"
                    if (!Validator.isEmail(value)) return "isNotValid"
                },
                errors: {
                    "isNotValid": "Your email address is not valid",
                    "isRequired": "Your email address is required"
                }
            },
            password: {
                validator: (value) => {
                    if (Validator.isEmpty(value)) return "isRequired"
                },
                errors: {
                    "isRequired": "Your password is required"
                }
            }
        }
    }, [])

    const handleFormSubmit = useCallback((formFieldsValues, {setIsFormSubmitting}) => {
        loginUserWithEmailAndPassword(formFieldsValues.email, formFieldsValues.password).then((userCred) => {
            console.log(userCred)
            setIsFormSubmitting(false)
        }).catch(err => {
            console.log(err)
            setIsFormSubmitting(false)
        })

    }, [])


    const {formFieldsValues, formErrors, formFieldsTouched, onFieldChange, submitForm, isFormSubmitting} = useForm(intialFormFieldsValues, validationSchema, handleFormSubmit)

    return (<div className="login">
        <div className="login__wrapper">
            <main className="login__frame">
                <h1 className="login__title">
                    Login
                </h1>
                <form action="" className="login-form">

                    <label className="login-form__label">Email
                        <input type="text" name="email" onChange={onFieldChange} value={formFieldsValues.email}
                               className="login-form__input"/>

                        {formFieldsTouched.email && formErrors.email ?
                            <span className="login-form__error-message">{formErrors.email}</span> : null}

                    </label>

                    <label className="login-form__label">Password

                        <input type="password" name="password" onChange={onFieldChange}
                               value={formFieldsValues.password}
                               className="login-form__input"/>

                        {formFieldsTouched.password && formErrors.password ?
                            <span className="login-form__error-message">{formErrors.password}</span> : null}
                    </label>

                    <button type="submit" onClick={submitForm} disabled={isFormSubmitting}
                            className="login-form__login-button">Login
                    </button>
                </form>
            </main>
        </div>
    </div>)
}