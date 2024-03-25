'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

const Account = () => {
    const { user, loading, error, setUser, handleLogout, isLoggedIn } = useAuth();

    return (
        <main>

        </main>
    )
}

export default Account