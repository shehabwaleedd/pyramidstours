import React from 'react';
import styles from './style.module.scss'
import SearchField from '../searchField';


const SearchForm: React.FC = () => {
    const isNavbar: boolean = false
    return (
        <section className={styles.landing}>
            <video autoPlay loop muted playsInline>
                <source src="https://res.cloudinary.com/dls2yjn9t/video/upload/v1714547159/newerVid_tdb00k.mp4" type="video/mp4" />
            </video>
            <SearchField isNavbar={isNavbar} />
        </section>
    )
}

export default SearchForm