import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from "./style.module.scss";

// Validation schema
const validationSchema = Yup.object({
    password: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required')
        .notOneOf([Yup.ref('currentPassword'), null], "New password must be different from current password")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/, 'Password must contain at least 8 characters, one letter, and one number'),
    reNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirming new password is required'),
});

const ChangePasswordForm = () => {
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload = {
            password: values.password, 
            newPassword: values.newPassword,
            reNewPassword: values.reNewPassword,
        };

        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/changePassword`, payload, {
                headers: {  token: localStorage.getItem('token')},
            });

            if (response.data.success) {
                alert('Password changed successfully');
                resetForm();
            } else {
                setErrors('Error changing password. Please try again.');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            const errorMessage = error.response?.err || 'Error changing password. Please try again.';
            setErrors(errorMessage);
        }

        setSubmitting(false);
    };

    return (
        <section className={styles.changePassword}>
            <div className={styles.changePassword__top}>
                <h2>Change Password</h2>
            </div>
            <Formik
                initialValues={{
                    password: '',
                    newPassword: '',
                    reNewPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.changePassword__form}>
                        <div className={styles.changePassword__form_input}>
                            <label htmlFor="password">Current Password</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className={styles.error} />
                        </div>
                        <div className={styles.changePassword__form_input}>
                            <label htmlFor="newPassword">New Password</label>
                            <Field type="password" id="newPassword" name="newPassword" />
                            <ErrorMessage name="newPassword" component="div" className={styles.error} />
                        </div>
                        <div className={styles.changePassword__form_input}>
                            <label htmlFor="reNewPassword">Confirm New Password</label>
                            <Field type="password" id="reNewPassword" name="reNewPassword" />
                            <ErrorMessage name="reNewPassword" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.changePassword__form_submit}>
                            Change Password
                        </button>
                        {errors && <div className={styles.error}>{errors}</div>}
                    </Form>
                )}
            </Formik>
        </section>
    );
};

export default ChangePasswordForm;
