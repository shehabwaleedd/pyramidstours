import "./skeleton.scss";
export default function TourSkeleton() {
    return (
        <div className="column">
            <div className="skeleton-video skeleton"></div>
            <div className="skeleton-title skeleton"></div>
            <div className="products-grid-tour">
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
                <div className="tour-grid-right">

                    <article className="skeleton-card-tour-header">
                        <div className="skeleton-card-img-header skeleton">
                        </div>
                    </article>
                    <div className="equal-grid">
                        <div className="skeleton-card-tour-header">
                            <div className="skeleton-card-img-header skeleton">
                            </div>
                        </div>
                        <div className="skeleton-card-tour-header">
                            <div className="skeleton-card-img-header skeleton">
                            </div>
                        </div>
                    </div>
                    <article className="skeleton-card-tour-header">
                        <div className="skeleton-card-img-header skeleton">
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}