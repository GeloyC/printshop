// icon
import Close from '/src/assets/icon/close.svg?react'
import Arrow from '/src/assets/icon/arrow-with-tail.svg?react';

import axios, { isAxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../../api/user';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';


interface LoginProp {
    close: () => void
    handleOpenSignup: ()=>void
}

type LoginType = {
    email: string,
    password: string
}

function Login ({
    close,
    handleOpenSignup
}: LoginProp) {


    const [account, setAccount] = useState<LoginType>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    });

    const queryClient = useQueryClient();
    const handleLogin = useMutation({
        mutationFn: async () => {
            return await login(account);
        },
        onSuccess: (response) => {
            close();

            return Promise.all([
                queryClient.invalidateQueries({ queryKey: ['user'] }),
                queryClient.invalidateQueries({ queryKey: ['cart-items', response.data.id] }),
                queryClient.invalidateQueries({ queryKey: ['cart', response.data.id] }),
            ])
        },
        onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                if (err?.response?.data.errors && err.response?.status === 422) {
                    setError({
                        email: err?.response?.data.errors?.email?.[0] ?? '',
                        password: err?.response?.data.errors?.password?.[0] ?? '',
                    });
                }
            }
        }
    })

    const hasFilled = account.email !== '' && account.password !== '';


    return (
        <form onSubmit={(e)=>{e.preventDefault(); handleLogin.mutate()}} className="fade-up relative flex flex-col w-[450px] h-auto bg-[#fff] p-[3rem] rounded-[25px] gap-[2rem]">
            <button type='button' onClick={close} className="absolute top-3 right-3 cursor-pointer hover:bg-[#f2f2f2] active:bg-transparent rounded-full">
                <Close className='size-7 opacity-75'/>
            </button>
            <span className="text-[24px] text-[#292929] font-bold leading-none">Login</span>


            <div className='flex flex-col items-start w-full h-full gap-[1rem]'>
                {/* input fields here */}
                <div className={`flex flex-col w-full full gap-[0.3rem] ${handleLogin.isPending && 'opacity-50'} transition-all duration-200`}>
                    <span className='text-[14px] font-bold opacity-75'>Email</span>
                    <input type="email" name="input_email" id="input_email" autoComplete="email"
                        value={account.email}
                        onChange={(e)=>{
                            setAccount(prev=>({
                                ...prev,
                                email: e.target.value
                            }));
                            setError(prev => ({ ...prev, email: '' }));
                        }}
                        disabled={handleLogin.isPending}
                    className={`text-[14px] font-bold p-[0.75rem] border ${error.email ? 'border-[#ff0000]' : 'border-[#292929]/15'} focus:outline-[#ff6b00] bg-[#f2f2f2] rounded-[5px]`}/>
                    {error.email && (
                        <span className='text-[#ff0000] text-sm leading-none'>{error.email}</span>
                    )}
                </div>

                <div className={`flex flex-col w-full full gap-[0.3rem] ${handleLogin.isPending && 'opacity-50'} transition-all duration-200`}>
                    <span className='text-[14px] font-bold opacity-75'>Password</span>
                    <input type="password" name="input_password" id="input_password" autoComplete="current-password"
                        value={account.password}
                        onChange={(e)=>{
                            setAccount(prev=>({
                                ...prev,
                                password: e.target.value
                            }));
                            setError(prev => ({ ...prev, password: '' }));
                        }}
                        disabled={handleLogin.isPending}
                    className={`text-[14px] font-bold p-[0.75rem] border ${error.password ? 'border-[#ff0000]' : 'border-[#292929]/15'} bg-[#f2f2f2] focus:outline-[#ff6b00] rounded-[5px]
                    `}/>
                    {error.password && (
                        <span className='text-[#ff0000] text-sm leading-none'>{error.password}</span>
                    )}
                </div>
            </div>

            <div className='flex flex-col items-center w-full gap-[0.5rem]'>
                <button 
                    type='submit' 
                    disabled={!hasFilled}
                    className={`group flex items-center justify-center gap-[0.3rem] py-[0.75rem] rounded-[10px] w-full bg-[#ff6b00] ${hasFilled ? 'opacity-100 hover:bg-[#ea6200] active:bg-[#cc4c02]/90 transition-all duration-100 cursor-pointer' : 'opacity-50'}`}
                >
                    <span className='text-[16px] text-[#fff]'>Continue</span>
                    {handleLogin.isPending ? (
                        <LoadingSpinner 
                            size={15}
                            borderSize={2}
                            color='#fff'
                        />
                    ):(
                        <Arrow className="size-5 group-hover:translate-x-1 transition-all duration-200" color='#fff' /> 
                    )}
                </button>

                <div className='flex items-center justify-center gap-[0.3rem] text-md'>
                    <span className='text-[#404040]'>No account yet?</span>
                    <button type='button' onClick={handleOpenSignup}
                    className='cursor-pointer text-[#404040] underline hover:text-[#ff6b00] active:text-[#cc4c02]'>Sign in instead</button>
                </div>
            </div>
        </form>
    )
}

export default Login