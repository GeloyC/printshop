
function ModalWrapper ({ children }: { children:React.ReactNode }) {

    return (
        <div className="absolute inset-0 flex items-center justify-center w-full h-full  bg-[#461704]/50 z-20">
            { children }
        </div>
    )
}

export default ModalWrapper