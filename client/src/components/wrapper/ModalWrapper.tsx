
function ModalWrapper ({ children }: { children:React.ReactNode }) {

    return (
        <div className="absolute flex items-center justify-center w-full h-screen z-10 bg-[#272727]/50 transition-all duration-100">
            { children }
        </div>
    )
}

export default ModalWrapper