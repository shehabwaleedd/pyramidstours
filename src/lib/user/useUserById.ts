import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User } from '@/types/hooks';

export const useUserById = (id: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserById = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token && id) { // Ensure id is not empty
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`, {
                    headers: { token },
                });
                setUser(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchUserById();
    }, [fetchUserById]);

    return { user, loading, setUser };
}
