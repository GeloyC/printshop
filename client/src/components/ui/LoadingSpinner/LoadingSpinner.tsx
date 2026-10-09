import "./LoadingSpinner.css"


type LoadingSpinnerProp = {
    color?: string,
    borderSize?: number
    size: number
}

function LoadingSpinner ({
    color,
    borderSize = 5,
    size
}: LoadingSpinnerProp) {

    return (
        <div
            className="loading-spinner rounded-full border-solid bg-[#ff6b00]"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderTopWidth: `${borderSize}px`,
                borderTopColor: color
            }}
        />
    )
}

export default LoadingSpinner;