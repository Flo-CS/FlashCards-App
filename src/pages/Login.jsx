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

    return (<div className="Login">
        <div className="Login__Wrapper">
            <main className="Login__Frame">
                <h1 className="Login__Title">
                    Login
                </h1>
                <form action="" className="LoginForm">

                    <label className="LoginForm__Label">Email
                        <input type="text" name="email" onChange={handleFieldChange} value={formFieldsValues.email}
                               className="LoginForm__Input"/>

                        {formFieldsTouched.email && formFieldsErrors.email ?
                            <span className="LoginForm__ErrorMessage">{formFieldsErrors.email}</span> : null}

                    </label>

                    <label className="LoginForm__Label">Password

                        <input type="password" name="password" onChange={handleFieldChange}
                               value={formFieldsValues.password}
                               className="LoginForm__Input"/>

                        {formFieldsTouched.password && formFieldsErrors.password ?
                            <span className="LoginForm__ErrorMessage">{formFieldsErrors.password}</span> : null}
                    </label>

                    <Button onClick={handleSubmitForm} disabled={isFormSubmitting} color="Primary"
                            size="Medium">Login</Button>
                    {formSubmittingErrors.auth ?
                        <span
                            className="LoginForm__ErrorMessage RegisterForm__ErrorMessage--NoField">{formSubmittingErrors.auth}</span> : null}
                </form>
                <Link to={REGISTER} className="Login__Link">Go to register</Link>
            </main>
        </div>
    </div>)
}


