
type LoadingBarProp = {
    isLoading: boolean
}

function TopLoadingBar ({
    isLoading
}: LoadingBarProp) {

    if (!isLoading) return null;
    
    return (
        <div className="fixed inset-x-0 top-0 z-[999] h-1 overflow-hidden bg-[#f2f2f2]">
            <div className="load-progress w-full h-full bg-[#ff6b00]" />
        </div>
    )
}


export default TopLoadingBar