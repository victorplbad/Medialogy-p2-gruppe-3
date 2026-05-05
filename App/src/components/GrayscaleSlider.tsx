import { useState, useEffect, useCallback } from "react";

const GrayscaleSlider = () => {
    const [grayscale, setGrayscale] = useState<number>(0);
    useEffect(() => {
        const root = document.documentElement;
        root.style.filter = `grayscale(${grayscale}%)`;
        root.style.transition = "filter 0.10s ease";
    },
        [grayscale]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setGrayscale(Number(e.target.value));
        },
        []
    );
    return (
        <div className="grayscale-widget">
            <h4>Grey scale: {grayscale}%</h4> {/* name of slider */}
            <input
                type="range"
                min={0}
                max={100}
                value={grayscale}
                onChange={handleChange}
            />
        </div>
    );
};
export default GrayscaleSlider;