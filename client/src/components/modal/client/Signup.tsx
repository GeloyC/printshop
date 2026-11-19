// icon
import Close from '/src/assets/icon/close.svg?react'
import Arrow from '/src/assets/icon/arrow-with-tail.svg?react';
import Check from '/src/assets/icon/check.svg?react'

import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registration, login } from '../../../api/user';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';

type SignupProp = {
    close: () => void
    handleOpenLogin: () => void
}

function Signup ({
    close,
    handleOpenLogin
}: SignupProp) {

    const [newAccount, setNewAccount] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<{
        name: string,
        email: string,
        password: string
    }>({
        name: '',
        email: '',
        password: ''
    });

    const queryClient = useQueryClient();
    const handleRegistration = useMutation({
        mutationFn: async () => {
            await registration(newAccount);
            return login({
                email: newAccount.email,
                password: newAccount.password
            });
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']})
            close(); 
        },
        onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                console.log(err?.response?.data.errors);

                setErrors({
                    name: err?.response?.data.errors.name?.[0] ?? '',
                    email: err?.response?.data.errors.email?.[0] ?? '',
                    password: err?.response?.data.errors.password?.[0] ?? '',
                });
            }
        }
    });

    const min8 = /[a-zA-Z0-9]{8,}/.test(newAccount.password);
    const mixedCase = /^(?=.*?[a-z])(?=.*?[A-Z])/.test(newAccount.password); 
    const withNum = /^(?=.*\d)/.test(newAccount.password);

    const isPasswordGood = min8 && mixedCase && withNum;

    const hasFilled = 
        newAccount.name !== '' && 
        newAccount.email !== '' &&
        newAccount.password !== '';

    console.log(newAccount.password.length);
    console.log('check min8: ', min8);
    console.log('check mixedCase: ', mixedCase);
    console.log('check withNum: ', withNum);

    return (
        <form onSubmit={(e)=>{
                e.preventDefault();
                handleRegistration.mutate();
            }} className='fade-up grid grid-cols-2 rounded-[20px] overflow-hidden'>
            <div className='flex items-center justify-center p-[0.5rem] bg-[#fff]'>
                <div className='flex items-center justify-center w-full h-full bg-[#ff6b00] rounded-[15px]'>
                    
                </div>
            </div>

            <div  className="relative flex flex-col items-start justify-between w-[500px] h-auto bg-[#fff] p-[3rem] gap-[2rem]">
                <button onClick={close} className="absolute top-3 right-3 hover:bg-[#f2f2f2] active:bg-transparent rounded-full cursor-pointer">
                    <Close className='size-7 opacity-75' />
                </button>

                <span className="text-[24px] text-[#292929] font-bold leading-none">Create an account</span>
                
                <div className='flex flex-col items-start w-full h-full gap-[1rem]'>
                    {/* input fields here */}
                    <div className='flex flex-col gap-[0.3rem] w-full'>
                        <span className='text-[14px] font-bold opacity-75'>Name</span>
                        <input type="text" name="input_name" id="input_name" required autoComplete='name'
                            value={newAccount.name} 
                            onChange={(e)=>{
                                setNewAccount(prev=> ({
                                    ...prev,
                                    name: e.target.value
                                }));

                                setErrors(prev => ({
                                    ...prev,
                                    name: ''
                                }))
                            }}
                            className={`text-[14px] font-bold bg-[#f2f2f2] p-[0.75rem] border ${errors.name ? 'text-[#ff0000] border-[#ff0000]' : 'text-[#292929] border-[#292929]/15'} focus:outline-[#ff6b00] rounded-[5px]`}/>

                            {errors.name && (
                                <span className='text-sm text-[#ff0000] leading-none'>{errors.name}</span>
                            )}
                    </div>

                    <div className='flex flex-col gap-[0.3rem] w-full'>
                        <span className='text-[14px] font-bold opacity-75'>Email</span>
                        <input type="email" name="input_email" id="input_email" required autoComplete='email'
                            value={newAccount.email}
                            onChange={(e)=>{
                                setNewAccount(prev=>({
                                    ...prev,
                                    email:e.target.value
                                }));

                                setErrors(prev => ({
                                    ...prev,
                                    email: ''
                                }))
                            }}
                            className={`text-[14px] font-bold bg-[#f2f2f2] p-[0.75rem] border ${errors.email ? 'text-[#ff0000] border-[#ff0000]' : 'text-[#2929292] border-[#292929]/15'} focus:outline-[#ff6b00] rounded-[5px]`}/>

                            {errors.email && (
                                <span className='text-sm text-[#ff0000] leading-none'>{errors.email}</span>
                            )}
                    </div>

                    <div className='flex flex-col w-full full gap-[0.3rem]'>
                        <span className='text-[14px] font-bold opacity-75'>Password</span>
                        <input type="password" name="input_password" id="input_password" autoComplete='new-password'
                            value={newAccount.password}
                            onChange={(e)=>{
                                setNewAccount(prev=>({
                                    ...prev,
                                    password:e.target.value
                                }));

                                setErrors(prev => ({
                                    ...prev,
                                    password: ''
                                }))
                            }}
                                className={`
                                    text-[14px] font-bold bg-[#f2f2f2] p-[0.75rem] border rounded-[5px]
                                    ${errors.password 
                                        ? 'text-[#ff0000] border-[#ff0000]' 
                                        : isPasswordGood 
                                            ? 'text-[#498d49] border-[#498d49] focus:outline-[#498d49]'    
                                            :'text-[#292929] border-[#292929]/15 focus:outline-[#ff6b00]'
                                    }
                                `}
                            />

                            {errors.password && (
                                <span className='text-sm text-[#ff0000] leading-none'>{errors.password}</span>
                            )}

                            <div className={`flex flex-col w-full gap-[0.5rem] mt-[0.5rem]  rounded-[5px] ${newAccount.password ? 'h-15 opacity-100' : 'h-0 opacity-0'} transition-all duration-200`}>
                                <div className='flex items-center gap-[0.3rem]'>
                                    <Check className='size-4' color={mixedCase ? '#498d49' : '#292929'} />
                                    <span className={`text-sm font-bold ${mixedCase ? 'text-[#498d49]' : 'text-[#292929]'} leading-none`}>Password contains uppercase and lower case letters</span>
                                </div>

                                <div className='flex items-center gap-[0.3rem]'>
                                    <Check className='size-4' color={withNum ? '#498d49' : '#292929'}/>
                                    <span className={`text-sm font-bold ${withNum ? 'text-[#498d49]' : 'text-[#292929]'} leading-none`}>Password contains number</span>
                                </div>

                                <div className='flex items-center gap-[0.3rem]'>
                                    <Check className='size-4' color={min8 ? '#498d49' : '#292929'} />
                                    <span className={`text-sm font-bold ${min8 ? 'text-[#498d49]' : 'text-[#292929]'} leading-none`}>Password have minimum of 8 characters</span>
                                </div>
                            </div>
                    </div>
                </div>


                <div className='flex flex-col items-center w-full gap-[0.3rem]'>
                    <button 
                        type='submit' 
                        disabled={!hasFilled}
                        className={`group flex items-center justify-center gap-[0.3rem] py-[0.75rem] rounded-[10px] w-full bg-[#ff6b00] ${hasFilled ? 'hover:bg-[#ea6200] active:bg-[#cc4c02]/90 cursor-pointer' : 'opacity-50'} transition-all duration-100`}
                    >
                            <span className='text-[16px] text-[#fff]'>
                            {handleRegistration.isPending 
                                ? <LoadingSpinner size={15} color={'#FFFFFF'} />
                                : 'Continue'
                            }
                        </span>
                        <Arrow className={`size-5 ${hasFilled && 'group-hover:translate-x-1'} transition-all duration-200`} color='#fff' />
                    </button>

                    <div className='flex items-center gap-[0.3rem] opacity-75 hover:opacity-100'>
                        <span className='text-md text-[#292929]'>Already have account?</span>
                        <button onClick={()=>{
                            close();
                            handleOpenLogin();
                        }} className='group cursor-pointer'>
                            <span className='text-md text-[#292929] underline group-hover:text-[#ff6b00]'>Login instead</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Signup;