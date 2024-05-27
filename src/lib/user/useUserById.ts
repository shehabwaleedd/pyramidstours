import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User } from '@/types/hooks';
import Cookies from "js-cookie"
export const useUserById = (id: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const token = Cookies.get('token');

    const fetchUserById = useCallback(async () => {
        setLoading(true);
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
