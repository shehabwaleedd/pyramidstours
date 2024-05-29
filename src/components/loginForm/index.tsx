'use client'
import { useWishlist } from '@/context/WishlistContext'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
const LoginComponent = dynamic(() => import('@/components/accountComponents/loginComponent'), { ssr: false });
const RegisterComponent = dynamic(() => import('@/components/accountComponents/registerComponent'), { ssr: false });

const AuthForms = () => {
    const { isLoginOpen, isRegisterOpen } = useWishlist()
    return (
        <>
            <AnimatePresence mode='wait'>
                {isLoginOpen && <LoginComponent />}
                {isRegisterOpen && <RegisterComponent />}
            </AnimatePresence>
        </>
    )
}

export default AuthForms