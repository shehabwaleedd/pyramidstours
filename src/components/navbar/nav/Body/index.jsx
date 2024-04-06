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
        open: { opacity: 1, height: "auto", display: "block" },
        closed: { opacity: 0, height: 0, display: "none"}
    };

    return (
        <motion.div className="faqs">
            <div className="faqs__container containered">
                {Data.map(({ id, title, desc, expandable, href }, index) => (
                    <div key={id} className={`item-1 ${activeAccordion === id ? 'open' : ''}`}>
                        {expandable ? (
                            <>
                                <div className="accordion" onClick={() => toggleAccordion(id)}>
                                    <div className="title"><span>{title}</span></div>
                                    <div className="accCategory">
                                        <div className="icon">{activeAccordion === 0 ? 'Less -' : 'More +'}</div>
                                    </div>
                                </div>
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        initial="closed"
                                        animate={activeAccordion === id ? "open" : "closed"}
                                        variants={variants}
                                        transition={{ duration: 0.5 }}
                                        className="panel"
                                    >
                                        {desc.map((item, idx) => (
                                            <div className="desc" key={idx}>
                                                <Link href={item.href}><p>{item.title}</p></Link>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </>
                        ) : (
                            <Link href={href}>
                                <span className="link">{title}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
