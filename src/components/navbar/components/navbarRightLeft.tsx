import React from 'react'
import styles from '../style.module.scss'
import NavbarItem from './navbarItems'
import NavbarData from '../NavbarData'

const NavbarRightLeft = () => {
    return (
        <ul className={styles.ul}>
            <div className={styles.navbar__right_left}>
                {NavbarData.map((item) =>
                    <NavbarItem key={item.id} item={item} expandable={item.expandable} />
                )}
            </div>
        </ul>
    )
}

export default NavbarRightLeft