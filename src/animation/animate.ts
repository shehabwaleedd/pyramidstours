export const getVariants = (isMobile: boolean) => ({
    initial: {
        opacity: 0,
        y: isMobile ? 200 : -50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    exit: {
        opacity: 0,
        y: isMobile ? 150 : -50,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
        }
    }
});


export const mobileVariants = {
    initial: {

        y: 400,
        transition: {
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    animate: {

        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {

        y: 600,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};



export const getLoginFormVariants = (isMobile: boolean) => ({
    initial: {
        opacity: 0,
        y: isMobile ? '70vh' : '70vh',
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        y: isMobile ? '70vh' : '70vh',
        transition: {
            duration: 0.6,  
            ease: [0.4, 0, 0.2, 1],  
        },
    },
});