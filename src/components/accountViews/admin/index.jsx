import React from 'react'

const AdminView = ({ handleOpen }) => {
    const options = [
        { value: 'personalInfo', label: 'Personal Info' },
        { value: 'changePassword', label: 'Change Password' },
        { value: 'forgotPassword', label: 'Forgot Password' },
        { value: 'subscriptions', label: 'Subscriptions' },
        { value: 'users', label: 'Users' },
        { value: 'tours', label: 'Tours' },
        { value: 'createTour', label: 'Create Tour' },
    ];

    const handleSelectChange = (e) => {
        const value = e.target.value;
        handleOpen(value)();
    }

    return (
        <select onChange={handleSelectChange}>
            <option value="">Select View</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default AdminView