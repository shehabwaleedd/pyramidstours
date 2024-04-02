"use client";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut, animatePageIn } from "@/animation/animatePageOut";
import styles from "@/components/navbar/style.module.scss"

export const TransitionLink = ({ href, label }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router);
        }
    };

    return (
        <button onClick={handleClick} aria-label={label}>
            {label}
        </button>
    );
};

export const TransitionLogo = ({ href, label }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router);
        } 
    };

    return (
        <h2 onClick={handleClick} style={{ cursor: 'pointer' }} aria-label={label}>
            {label}
        </h2>
    );
};


export const TransitionH4 = ({ href, label }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router);
        }
    };

    return (
        <div className={styles.navbar__links_user_btn}>
            <h4 onClick={handleClick} aria-label={label}>
                {label}
            </h4>
        </div>
    );
}

export const TransitionButton = ({ href, label }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router);
        }
    };

    return (
        <button onClick={handleClick} aria-label={label}>
            {label}
        </button>
    );
}

export const TransitionCard = ({ href, children }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router);
        } 
    };

    return (
        <div onClick={handleClick}>
            {children}
        </div>
    );
}