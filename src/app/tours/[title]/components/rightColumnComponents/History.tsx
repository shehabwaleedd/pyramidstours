import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Parser } from 'html-to-react';
import styles from '../../page.module.scss';

const htmlToReactParser = Parser() 

const HistoryBrief = React.memo(({ historyBrief }: { historyBrief: string }) => {
    const [showFullHistoryBrief, setShowFullHistoryBrief] = useState(false);

    const renderHTMLContent = useCallback((htmlContent: string) => {
        return htmlToReactParser.parse(htmlContent);
    }, []);

    const truncateHTMLContent = useCallback((htmlContent: string, maxLength: number) => {
        if (htmlContent.length <= maxLength) return htmlContent;
        return htmlContent.slice(0, maxLength) + '...';
    }, []);

    const handleToggleHistoryBrief = useCallback(() => setShowFullHistoryBrief(prev => !prev), []);

    const renderToggleButton = useCallback((content: string, showFull: boolean, toggleFunc: () => void) => {
        return content.length > 500 && (
            <button onClick={toggleFunc} className={styles.showMoreButton}>
                {showFull ? 'Show Less' : 'Show More'}
            </button>
        );
    }, []);

    const parsedHistoryBrief = useMemo(() => renderHTMLContent(historyBrief), [renderHTMLContent, historyBrief]);
    const truncatedHistoryBrief = useMemo(() => truncateHTMLContent(historyBrief, 500), [truncateHTMLContent, historyBrief]);

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
                        {truncatedHistoryBrief}
                    </div>
                )}
                {renderToggleButton(historyBrief, showFullHistoryBrief, handleToggleHistoryBrief)}
            </div>
        </div>
    );
});

HistoryBrief.displayName = 'HistoryBrief';

export default HistoryBrief;
