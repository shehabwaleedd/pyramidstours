'use client'
import React from 'react'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"


const Slider = ({ content }: { content: JSX.Element }) => {
    const [sliderRef] = useKeenSlider({
        loop: false,
        breakpoints: {
            "(min-width: 440px)": {
                slides: { perView: 1, spacing: 10 },
            },
            "(min-width: 768px)": {
                slides: { perView: 2, spacing: 20 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 3, spacing: 30 },
            },
        },
        slides: {
            perView: 1, spacing: 10, origin: "auto",
        },

    })


    return (
        <div ref={sliderRef} style={{ userSelect: "none" }}>
            {content}
        </div>
    )
}

export default Slider
