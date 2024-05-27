import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Parser } from 'html-to-react';
import styles from '../../page.module.scss';

const htmlToReactParser =  Parser();

const Description = React.memo(({ description }: { description: string }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const renderHTMLContent = useCallback((htmlContent: string) => {
        return htmlToReactParser.parse(htmlContent);
    }, []);

    const truncatedContent = useMemo(() => {
        if (description.length > 500) {
            return description.slice(0, 500) + '...';
        }
        return description;
    }, [description]);

    const parsedDescription = useMemo(() => renderHTMLContent(description), [renderHTMLContent, description]);
    const parsedTruncatedDescription = useMemo(() => renderHTMLContent(truncatedContent), [renderHTMLContent, truncatedContent]);

    const handleToggleDescription = useCallback(() => setShowFullDescription(prev => !prev), []);

    return (
        <div className={styles.eventDetails__lower_right_desc}>
            <h2>Description</h2>
            <div>
                {showFullDescription ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.fullContent}
                    >
                        {parsedDescription}
                    </motion.div>
                ) : (
                    <div>
                        {parsedTruncatedDescription}
                    </div>
                )}
                {description.length > 500 && (
                    <button onClick={handleToggleDescription} className={styles.showMoreButton}>
                        {showFullDescription ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        </div>
    );
});

Description.displayName = 'Description';

export default Description;
