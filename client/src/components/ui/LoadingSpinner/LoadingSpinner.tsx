import "./LoadingSpinner.css"


type LoadingSpinnerProp = {
    color?: string,
    size: number
}

function LoadingSpinner ({
    color,
    size
}: LoadingSpinnerProp) {

    return (
        <div
            className="loading-spinner rounded-full border-t-4 border-solid bg-[#ff6b00]"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderTopColor: color
            }}
        />
    )
}

export default LoadingSpinner;