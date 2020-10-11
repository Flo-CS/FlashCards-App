import React, {useCallback, useMemo} from "react"
import Validator from "validator"

import "./Register.scss"

import useForm from "../hooks/useForm";


import {registerUserWithEmailAndPassword} from "../utils/authentication";
import {Link} from "react-router-dom";
import {LOGIN} from "../constants/routes";
import Button from "../components/controls/buttons/Button";

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

    const {formFieldsValues, formFieldsErrors, formFieldsTouched, handleFieldChange, handleSubmitForm, isFormSubmitting, formSubmittingErrors} = useForm(initialFormFieldsValues, formValidationSchema, handleFormSubmit)
    return (<div className="Register">
        <div className="Register__Wrapper">
            <main className="Register__Frame">
                <h1 className="Register__Title">
                    Register
                </h1>
                <form action="" className="RegisterForm">

                    <label className="RegisterForm__Label">Email
                        <input type="text" name="email" onChange={handleFieldChange} value={formFieldsValues.email}
                               className="RegisterForm__Input"/>

                        {formFieldsTouched.email && formFieldsErrors.email ?
                            <span className="RegisterForm__ErrorMessage">{formFieldsErrors.email}</span> : null}

                    </label>

                    <label className="RegisterForm__Label">Password

                        <input type="password" name="password" onChange={handleFieldChange}
                               value={formFieldsValues.password}
                               className="RegisterForm__Input"/>

                        {formFieldsTouched.password && formFieldsErrors.password ?
                            <span className="RegisterForm__ErrorMessage">{formFieldsErrors.password}</span> : null}
                    </label>

                    <Button onClick={handleSubmitForm} disabled={isFormSubmitting} color="Primary"
                            size="Medium">Register</Button>

                    {formSubmittingErrors.auth ?
                        <span
                            className="RegisterForm__ErrorMessage RegisterForm__ErrorMessage--NoField">{formSubmittingErrors.auth}</span> : null}
                </form>
                <Link to={LOGIN} className="Register__Link">Go to login</Link>
            </main>
        </div>
    </div>)
}