import { useState } from 'react';
import { useGeneralStorage } from'@/app/storage/general';
import { AiOutlineClose } from 'react-icons/ai';
import SignUp from '@/app/components/auth/SignUp';
import Login from '@/app/components/auth/Login';

export default function AuthOverlay() {
    let { setLoginOpen } = useGeneralStorage();

    let [isSignUp, setIsSignUp] = useState(false);

    return (
        <>
            <div
                style={{
                    top: 0,
                    left: 0
                }}
                className='flex fixed z-50 w-full h-full bg-black bg-opacity-50 justify-center items-center'>
                <div className='relative w-full h-[70%] max-w-[470px] bg-white rounded-lg p-4'>
                    <div className='w-full flex justify-end'>
                        <button onClick={() => setLoginOpen(false)} className='p-1.5 rounded-full bg-gray-100'>
                            <AiOutlineClose size='24'/>
                        </button>
                    </div>

                    {isSignUp ? <SignUp /> : <Login />}

                    <div
                        style={{
                            bottom: 0,
                            left: 0
                        }}
                        className='flex absolute w-full justify-center items-center border-t py-5'>
                        <span className='text-[16px] text-gray-600'>Dont have an account?</span>

                        <button onClick={() => setIsSignUp(isSignUp = !isSignUp)} className='font-semibold text-[16px] text-[#c70030] pl-1' >
                            <span>{!isSignUp ? 'Sign Up' : 'LOgin'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
