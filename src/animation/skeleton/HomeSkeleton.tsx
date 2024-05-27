import React from 'react';
import "./skeleton.scss";

const HomeSkeleton = () => {
    return (
        <div className="column">
            <div className="skeleton-video skeleton"></div>
            <div className="skeleton-title skeleton"></div>
            <div className="products-grid">
                {[...new Array(10)].map((_, index) => (
                    <article key={index} className="skeleton-card">
                        <div className="skeleton skeleton-card-img"></div>
                        <div className="skeleton-card-text">
                            <h2 className="skeleton skeleton-card-title"></h2>
                            <h3 className="skeleton skeleton-card-brand"></h3>
                            <div>
                                <p className="skeleton skeleton-card-description"></p>
                                <p className="skeleton skeleton-card-description"></p>
                                <p className="skeleton skeleton-card-description"></p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default HomeSkeleton;
