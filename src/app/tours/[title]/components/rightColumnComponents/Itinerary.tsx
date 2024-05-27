import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Parser } from 'html-to-react';
import styles from '../../page.module.scss';

const htmlToReactParser = Parser();

const Itinerary = React.memo(({ itinerary }: { itinerary: string }) => {
    const [showFullItinerary, setShowFullItinerary] = useState(false);

    const renderHTMLContent = useCallback((htmlContent: string) => {
        return htmlToReactParser.parse(htmlContent);
    }, []);

    const truncatedContent = useMemo(() => {
        if (itinerary.length > 500) {
            return itinerary.slice(0, 500) + '...';
        }
        return itinerary;
    }, [itinerary]);

    const parsedItinerary = useMemo(() => renderHTMLContent(itinerary), [renderHTMLContent, itinerary]);
    const parsedTruncatedItinerary = useMemo(() => renderHTMLContent(truncatedContent), [renderHTMLContent, truncatedContent]);

    const handleToggleItinerary = useCallback(() => setShowFullItinerary(prev => !prev), []);

    return (
        <div className={styles.eventDetails__lower_right_desc}>
            <h2>Itinerary</h2>
            <div>
                {showFullItinerary ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.fullContent}
                    >
                        {parsedItinerary}
                    </motion.div>
                ) : (
                    <div>
                        {parsedTruncatedItinerary}
                    </div>
                )}
                {itinerary.length > 500 && (
                    <button onClick={handleToggleItinerary} className={styles.showMoreButton}>
                        {showFullItinerary ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        </div>
    );
});

Itinerary.displayName = 'Itinerary';

export default Itinerary;
