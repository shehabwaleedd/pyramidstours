import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Parser } from 'html-to-react';
import styles from '../../page.module.scss';

const htmlToReactParser = Parser();

const HistoryBrief = React.memo(({ historyBrief }: { historyBrief: string }) => {
    const [showFullHistoryBrief, setShowFullHistoryBrief] = useState(false);

    const renderHTMLContent = useCallback((htmlContent: string) => {
        return htmlToReactParser.parse(htmlContent);
    }, []);

    const truncatedContent = useMemo(() => {
        if (historyBrief.length > 500) {
            return historyBrief.slice(0, 500) + '...';
        }
        return historyBrief;
    }, [historyBrief]);

    const parsedHistoryBrief = useMemo(() => renderHTMLContent(historyBrief), [renderHTMLContent, historyBrief]);
    const parsedTruncatedHistoryBrief = useMemo(() => renderHTMLContent(truncatedContent), [renderHTMLContent, truncatedContent]);

    const handleToggleHistoryBrief = useCallback(() => setShowFullHistoryBrief(prev => !prev), []);

    return (
        <div className={styles.eventDetails__lower_right_desc}>
            <h2>History Brief</h2>
            <div>
                {showFullHistoryBrief ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.fullContent}
                    >
                        {parsedHistoryBrief}
                    </motion.div>
                ) : (
                    <div>
                        {parsedTruncatedHistoryBrief}
                    </div>
                )}
                {historyBrief.length > 500 && (
                    <button onClick={handleToggleHistoryBrief} className={styles.showMoreButton}>
                        {showFullHistoryBrief ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        </div>
    );
});

HistoryBrief.displayName = 'HistoryBrief';

export default HistoryBrief;
