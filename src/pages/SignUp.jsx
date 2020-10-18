import React, {useCallback, useMemo} from "react";
import {Link} from "react-router-dom";
import Validator from "validator";
import {SIGN_IN} from "../constants/routes";

import useForm from "../hooks/useForm";


import {signUpUserWithEmailAndPassword} from "../utils/authentication";

import "./Login.scss";


export default function SignUp() {
    const initialFormFieldsValues = useMemo(() => {
        return {email: "", password: ""};
    }, []);

    const formValidationSchema = useMemo(() => {
        return {
            email: {
                validator: (value) => {
                    if (Validator.isEmpty(value)) return "isRequired";
                    if (!Validator.isEmail(value)) return "isNotValid";
                },
                errors: {
                    "isNotValid": "Email address is not valid",
                    "isRequired": "Email address is required"
                }
            },
            password: {
                validator: (value) => {
                    if (Validator.isEmpty(value)) return "isRequired";
                },
                errors: {
                    "isRequired": "Password is required"
                }
            }
        };
    }, []);

    const handleFormSubmit = useCallback((formFieldsValues, {setIsFormSubmitting, setFormSubmittingErrors}) => {
        signUpUserWithEmailAndPassword(formFieldsValues.email, formFieldsValues.password).then((userCred) => {
            setIsFormSubmitting(false);
        }).catch(authError => {
            setFormSubmittingErrors((errors) => {
                return {...errors, "auth": authError.message};
            });
            setIsFormSubmitting(false);
        });

    }, []);

    const {formFieldsValues, formFieldsErrors, formFieldsTouched, handleFieldChange, handleSubmitForm, isFormSubmitting, formSubmittingErrors} = useForm(initialFormFieldsValues, formValidationSchema, handleFormSubmit);
    return (<div className="Login">
        <div className="Login__Wrapper">
            <main className="Login__Frame">
                <h1 className="Login__Title">
                    Sign Up
                </h1>
                <form action="" className="LoginForm">

                    <label className="LoginForm__Label">Email
                        <input type="text" name="email" onChange={handleFieldChange} value={formFieldsValues.email}
                               className="Input Input--Big"/>

                        {formFieldsTouched.email && formFieldsErrors.email ?
                            <span className="LoginForm__ErrorMessage">{formFieldsErrors.email}</span> : null}

                    </label>

                    <label className="LoginForm__Label">Password

                        <input type="password" name="password" onChange={handleFieldChange}
                               value={formFieldsValues.password}
                               className="Input Input--Big"/>

                        {formFieldsTouched.password && formFieldsErrors.password ?
                            <span className="LoginForm__ErrorMessage">{formFieldsErrors.password}</span> : null}
                    </label>

                    <button onClick={handleSubmitForm} disabled={isFormSubmitting}
                            className="Button Button--Accent Button--Big Button--Secondary">Sign Up
                    </button>

                    {formSubmittingErrors.auth ?
                        <span
                            className="LoginForm__ErrorMessage LoginForm__ErrorMessage--NoField">{formSubmittingErrors.auth}</span> : null}
                </form>
                <Link to={SIGN_IN} className="Login__Link">Go to sign in</Link>
            </main>
        </div>
    </div>);
}