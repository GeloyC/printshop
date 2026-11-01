import "./LoadingSpinner.css"


type LoadingSpinnerProp = {
    color?: string,
    borderSize?: number
    size: number
}

function LoadingSpinner ({
    color,
    borderSize = 3,
    size
}: LoadingSpinnerProp) {

    return (
        <div
            className="loading-spinner rounded-full border-solid"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderWidth: `${borderSize}px`,
                borderColor: `transparent transparent ${color} ${color}`
            }}
        />
    )
}

export default LoadingSpinner;