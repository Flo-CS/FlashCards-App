import React from "react"
import {ErrorMessage, Field, Form, Formik} from "formik";


export default function Login() {
    function handleLoginFormValidation(values) {
        const errors = {};
        if (!values.email) {
            errors.email = "Required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }
        return errors
    }

    function handleLoginFormSubmit(values, {setSubmitting}) {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }

    return (<main className="login-page">
        <h1>
            Login
        </h1>
        <Formik className="login-form"
                initialValues={{email: "", password: ""}}
                validate={handleLoginFormValidation}
                onSubmit={handleLoginFormSubmit}>
            {({isSubmitting}) => (
                <Form>
                    <Field type="email" name="email"/>
                    <ErrorMessage name="email" component="div"/>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" component="div"/>
                    <button type="submit" disabled={isSubmitting}>Login</button>
                </Form>
            )
            }

            )}
        </Formik>
    </main>)
}