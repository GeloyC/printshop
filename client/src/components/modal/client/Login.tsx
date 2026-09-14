// icon
import Close from '/src/assets/icon/close.svg?react'

interface LoginProp {
    close: () => void
}

function Login ({
    close
}: LoginProp) {

    return (
        <div className="fade-up relative flex flex-col w-[500px] h-[500px] bg-[#fff] p-[2rem]">
            <button onClick={close} className="absolute top-3 right-3 cursor-pointer">
                <Close className='size-7'/>
            </button>
            <span className="text-[20px] text-[#292929] font-bold leading-none">Login</span>


            <div className='flex flex-col items-start w-full h-full gap-[1rem]'>

                {/* input fields here */}

            </div>

            <div className='flex items-center w-full gap-[0.3rem]'>
                <button className='py-[0.5rem] w-full bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] transition-all duration-100 cursor-pointer'>
                    <span className='text-[14px] text-[#fff] font-bold'>Continue</span>
                </button>
            </div>
        </div>
    )
}

export default Login