import { useCallback, useState } from 'react';
import axios from 'axios';
import { User } from '@/types/hooks';
import Cookies from "js-cookie"

export const useGetAllUsers = () => {
    const [users, setUsers] = useState < User[] > ([]);
    const getAllUsers = useCallback(async (): Promise<User[] | undefined> => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
                    headers: { token },
                });
                const filteredUsers: User[] = response.data.data.filter((user: User) => user.role !== "admin");
                setUsers(filteredUsers);
                return filteredUsers; 
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    return { users, getAllUsers };
};

export default useGetAllUsers;
