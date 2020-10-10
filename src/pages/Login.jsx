import React, {useCallback, useMemo} from "react"
import Validator from "validator"

import "./Login.scss"

import useForm from "../hooks/useForm";

import {loginUserWithEmailAndPassword} from "../utils/authentication";
import {Link} from "react-router-dom";
import {REGISTER} from "../constants/routes";
import Button from "../components/controls/buttons/Button";


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

    }, [])

    const {formFieldsValues, formFieldsErrors, formFieldsTouched, handleFieldChange, handleSubmitForm, isFormSubmitting, formSubmittingErrors} = useForm(initialFormFieldsValues, formValidationSchema, handleFormSubmit)

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

                    <Button onClick={handleSubmitForm} disabled={isFormSubmitting} color="Primary" size="Medium">Login</Button>
                    {formSubmittingErrors.auth ?
                        <span
                            className="login-form__error-message register-form__error-message--no-field">{formSubmittingErrors.auth}</span> : null}
                </form>
                <Link to={REGISTER} className="login__link">Go to register</Link>
            </main>
        </div>
    </div>)
}


