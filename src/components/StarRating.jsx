import Star from "./Star.jsx";
import {useState} from "react";

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
}

const starContainerStyle = {
    display: 'flex',
    gap: '4px',
}
export default function StarRating({maxRating = 10, color = '#fcc419', size = 48}) {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: "1",
        margin: '0',
        color,
        fontSize: `${size / 1.5}px`,
    }

    return (
        <>
            <div style={containerStyle}>
                <div style={starContainerStyle}>
                    {Array.from({length: maxRating}, (_, i) => <Star key={i}
                                                                     onRate={() => setRating(i + 1)}
                                                                     onHoverIn={() => setTempRating(i + 1)}
                                                                     onHoverOut={() => setTempRating(0)}
                                                                     full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                                                                     color={color}
                                                                     size={size}/>)}
                </div>
                <p style={textStyle}>{tempRating || rating || ""}</p>
            </div>
        </>
    )
}