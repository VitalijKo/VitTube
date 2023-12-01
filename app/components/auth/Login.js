import { useState } from 'react';
import { useGeneralStorage } from '@/app/storage/general';
import { useUser } from '@/app/context/user';
import { BiLoaderCircle } from 'react-icons/bi';
import TextInput from '../TextInput';

export default function SignUp() {
    let { setIsLoginOpen } = useGeneralStorage();

    const userContext = useUser()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const showError = (type) => {
        if (error && Object.entries(error) && error?.type == type) return error.message;
    }

    const validate = () => {
        setError(null);

        let isError = false;

        if (!email) {
            setError({ type: 'email', message: 'An email is required'});

            isError = true;
        } else if (!password) {
            setError({ type: 'password', message: 'A password is required'});

            isError = true;
        }

        return isError;
    }

    const login = async () => {
        let isError = validate();

        if (isError) return;
        if (!userContext) return;

        try {
            setLoading(true);

            await userContext.login(email, password);

            setLoading(false);
            setIsLoginOpen(false);
        } catch (e) {
            console.log(e);

            setLoading(false);
            alert(error);
        }
    }

    return (
        <>
            <div>
                <h1 className='font-bold text-[24px] text-center mb-4'>Login</h1>

                <div className='px-6 pb-2'>
                    <TextInput 
                        inputType='email'
                        string={email}
                        placeholder='Email address'
                        onUpdate={setEmail}
                        error={showError('email')}
                    />
                </div>

                <div className='px-6 pb-2'>
                    <TextInput 
                        inputType='password'
                        string={password}
                        placeholder='Password'
                        onUpdate={setPassword}
                        error={showError('password')}
                    />
                </div>

                <div className='mt-6 px-6 pb-2'>
                    <button 
                        disabled={loading}
                        onClick={() => login()} 
                        className={'flex w-full font-semibold text-[16px] text-white justify-center items-center rounded-sm py-3' + (!email || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'}
                    >
                        {loading ? <BiLoaderCircle className='animate-spin' color='#ffffff' size={24} /> : 'Login'}
                    </button>
                </div>
            </div>
        </>
    );
}
