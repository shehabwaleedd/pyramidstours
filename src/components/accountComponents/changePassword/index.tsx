import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from "./style.module.scss";
import { toast } from 'sonner';
// TypeScript types for form values
interface FormValues {
    password: string;
    newPassword: string;
    reNewPassword: string;
}

// Validation schema
const validationSchema = Yup.object({
    password: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required')
        .notOneOf([Yup.ref('password')], "New password must be different from current password")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/, 'Password must contain at least 8 characters, one letter, and one number'),
    reNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirming new password is required'),
});

const ChangePasswordForm = () => {
    const [errors, setErrors] = useState<string | null>(null);

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        const payload = {
            password: values.password,
            newPassword: values.newPassword,
            reNewPassword: values.reNewPassword,
        };

        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/changePassword`, payload, {
                headers: { token: localStorage.getItem('token') },
            });

            if (response.data.success) {
                toast.success('Password changed successfully');
                resetForm();
            } else {
                toast.error('Error changing password. Please try again.');
            }
        } catch (error: any) {
            console.error('Error changing password:', error);
            const errorMessage = error.response?.data?.err || 'Error changing password. Please try again.';
            toast.error(errorMessage);
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
                        <button type="submit" disabled={isSubmitting} className={styles.changePassword__form_submit} aria-label="Change Password">
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
