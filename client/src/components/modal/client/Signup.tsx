// icon
import Close from '/src/assets/icon/close.svg?react'
import Arrow from '/src/assets/icon/arrow-with-tail.svg?react';


type SignupProp = {
    close: () => void
}

function Signup ({
    close
}: SignupProp) {

    return (
        <div className='fade-up grid grid-cols-2 rounded-[10px] overflow-hidden'>
            <div className='flex items-center justify-center p-[0.5rem] bg-[#fff]'>
                <div className='flex items-center justify-center w-full h-full bg-[#B1B2B5]/50 rounded-[5px]'>
                    asdasd
                </div>
            </div>

            <div className="relative flex flex-col items-start justify-between w-[400px] h-auto bg-[#fff] p-[3rem] gap-[2rem]">
                <button onClick={close} className="absolute top-3 right-3 hover:bg-[#f2f2f2] active:bg-transparent rounded-full cursor-pointer">
                    <Close className='size-7 opacity-75' />
                </button>

                <span className="text-[24px] text-[#292929] font-bold leading-none">Create an account</span>
                
                <div className='flex flex-col items-start w-full h-full gap-[1rem]'>
                    {/* input fields here */}
                    <div className='flex flex-col gap-[0.3rem] w-full'>
                        <span className='text-[14px] font-bold opacity-75'>Name</span>
                        <input type="text" name="input_name" id="input_name" 
                        className='text-[14px] font-bold p-[0.5rem] border border-[#292929]/50 focus:outline-[#ff6b00] rounded-[5px]'/>
                    </div>

                    <div className='flex flex-col gap-[0.3rem] w-full'>
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

                <div className='flex items-center w-full gap-[0.3rem]'>
                    <button className='group flex items-center justify-center gap-[0.3rem] py-[0.5rem] rounded-[5px] w-full bg-[#ff6b00] hover:bg-[#ea6200] active:bg-[#cc4c02]/90 transition-all duration-100 cursor-pointer'>
                        <span className='text-[16px] text-[#fff]'>Continue</span>
                        <Arrow className="size-5 group-hover:translate-x-1 transition-all duration-200" color='#fff' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signup;