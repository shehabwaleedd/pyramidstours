import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import "./Body.scss"
export default function Body({ Data }) {
    // State to track the currently active (expanded) accordion
    const [activeAccordion, setActiveAccordion] = useState(null);

    // Function to toggle the accordion's open/close state
    const toggleAccordion = (id) => {
        // If the accordion being clicked is already active, close it by setting the state to null
        // Otherwise, open it by setting the state to the clicked accordion's id
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const variants = {
        open: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        },
        closed: {
            opacity: 0,
            height: 0,
            
            transition: {
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    
    return (
        <motion.div className="faqs">
            <div className="faqs__container containered">
                {Data.map(({ id, title, desc, expandable, href }, index) => (
                    <div key={id} className={`item-1 ${activeAccordion === id ? 'open' : ''}`}>
                        <AnimatePresence initial={false}>
                            {expandable ? (
                                <>
                                    <div className="accordion" onClick={() => toggleAccordion(id)}>
                                        <div className="title"><span>{title}</span></div>
                                        <div className="accCategory">
                                            <div className="icon">{activeAccordion === 0 ? 'Less -' : 'More +'}</div>
                                        </div>
                                    </div>
                                    <motion.div
                                        initial="closed"
                                        animate={activeAccordion === id ? "open" : "closed"}
                                        variants={variants}
                                        className="panel"
                                        style={{ overflow: 'hidden', listStyleType: 'none', padding: 0 }}>
                                        {desc.map((item, idx) => (
                                            <div className="desc" key={idx}>
                                                <Link href={item.href} aria-label='Link to the page'><p>{item.title}</p></Link>
                                            </div>
                                        ))}
                                    </motion.div>
                                </>
                            ) : (
                                <Link href={href} aria-label='Link to the page'>
                                    <span className="link">{title}</span>
                                </Link>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
