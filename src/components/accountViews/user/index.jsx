import React from 'react'

const UserView = ({ handleOpen }) => {
    const options = [
        { value: 'personalInfo', label: 'Personal Info' },
        { value: 'changePassword', label: 'Change Password' },
        { value: 'forgotPassword', label: 'Forgot Password' },
        { value: 'useUserSubscriptions', label: 'My Subscriptions' },
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

export default UserView