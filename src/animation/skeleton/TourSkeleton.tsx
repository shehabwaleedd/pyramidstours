import HeaderSkeleton from "./HeaderSkeleton";
import LeftColumnSkeleton from "./LeftColumn";
import "./skeleton.scss";
export default function TourSkeleton() {
    return (
        <div className="column">
            <div className="skeleton-video skeleton"></div>
            <div className="skeleton-title skeleton"></div>
            <div className="products-grid-tour">
                <LeftColumnSkeleton />
                <div className="tour-grid-right">

                    <HeaderSkeleton />
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