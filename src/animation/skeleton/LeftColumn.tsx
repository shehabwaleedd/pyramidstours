import React from 'react'
import "./skeleton.scss";
const LeftColumnSkeleton = () => {
    return (
        <div className="tour-grid-left">
            {
                [...new Array(4)].map((p, index) => (
                    <article key={index} className="skeleton-card-tours">
                        <div className="skeleton skeleton-card-img">
                        </div>
                    </article>
                ))
            }
        </div>
    )
}

export default LeftColumnSkeleton