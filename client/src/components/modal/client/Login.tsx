// icon
import Close from '/src/assets/icon/close.svg?react'
import Arrow from '/src/assets/icon/arrow-with-tail.svg?react';

import type { SetStateAction } from 'react'


interface LoginProp {
    close: () => void
    setSignupOpen: React.Dispatch<SetStateAction<boolean>>
}

function Login ({
    close,
    setSignupOpen
}: LoginProp) {

    const handleSignupInstead = () => {
        // reset input fields here
        setSignupOpen(true)
        close();
    }

    return (
        <form className="fade-up relative flex flex-col w-[400px] h-auto bg-[#fff] p-[3rem] rounded-[5px] gap-[2rem]">
            <button type='button' onClick={close} className="absolute top-3 right-3 cursor-pointer hover:bg-[#f2f2f2] active:bg-transparent rounded-full">
                <Close className='size-7 opacity-75'/>
            </button>
            <span className="text-[24px] text-[#292929] font-bold leading-none">Login</span>


            <div className='flex flex-col items-start w-full h-full gap-[1rem]'>
                {/* input fields here */}
                <div className='flex flex-col w-full full gap-[0.3rem]'>
                    <span className='text-[14px] font-bold opacity-75'>Email</span>
                    <input type="email" name="input_email" id="input_email" 
                    className='text-[14px] font-bold p-[0.5rem] border border-[#292929]/50 focus:outline-[#ff6b00] rounded-[5px]'/>
                </div>

                <div className='flex flex-col w-full full gap-[0.3rem]'>
                    <span className='text-[14px] font-bold opacity-75'>Password</span>
                    <input type="password" name="input_password" id="input_password" 
                    className='text-[14px] font-bold p-[0.5rem] border border-[#292929]/50 focus:outline-[#ff6b00] rounded-[5px]'/>
                </div>
            </div>

            <div className='flex flex-col items-center w-full gap-[0.5rem]'>
                <button className='group flex items-center justify-center gap-[0.3rem] py-[0.5rem] rounded-[5px] w-full bg-[#ff6b00] hover:bg-[#ea6200] active:bg-[#cc4c02]/90 transition-all duration-100 cursor-pointer'>
                    <span className='text-[16px] text-[#fff]'>Continue</span>
                    <Arrow className="size-5 group-hover:translate-x-1 transition-all duration-200" color='#fff' />
                </button>

                <div className='flex items-center justify-center gap-[0.3rem] text-[12px] text-[#404040] font-bold'>
                    <span>No account yet?</span>
                    <button type='button' onClick={handleSignupInstead}
                    className='cursor-pointer hover:underline active:text-[#cc4c02]'>Sign in instead</button>
                </div>
            </div>
        </form>
    )
}

export default Login