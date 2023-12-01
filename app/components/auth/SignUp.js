import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGeneralStorage } from '@/app/storage/general';
import { useUser } from '@/app/context/user';
import { BiLoaderCircle } from 'react-icons/bi';
import TextInput from '../TextInput';

export default function SignUp() {
    let { setLoginOpen } = useGeneralStorage();

    const router = useRouter();

    const userContext = useUser();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const showError = (type) => {
        if (error && Object.entries(error) && error?.type == type) return error.message;
    }

    const validate = () => {
        setError(null);

        const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!name) setError({ type: 'name', message: 'A name is required' });
        
        else if (!email) setError({ type: 'email', message: 'An email is required' });

        else if (!email_pattern.test(email)) setError({ type: 'email', message: 'The email is not valid' });

        else if (!password) setError({ type: 'password', message: 'A password is required' });

        else if (password.length < 8) setError({ type: 'password', message: 'The password needs to be longer' });

        else if (password != confirmPassword) setError({ type: 'password', message: 'The passwords do not match' });

        return !!error;
    }

    const signUp = async () => {
        if (validate()) return;

        if (!userContext) return;

        try {
            setLoading(true);

            await userContext.signUp(name, email, password);

            setLoading(false);
            setLoginOpen(false);

            router.refresh();
        } catch (e) {
            console.log(e);

            setLoading(false);

            alert(e);
        }
    }

    return (
        <>
            <div>
                <h1 className='font-bold text-[28px] text-center mb-4'>Sign Up</h1>

                <div className='px-6 pb-2'>
                    <TextInput 
                        inputType='text'
                        string={name}
                        placeholder='Name'
                        onUpdate={setName}
                        error={showError('name')}
                    />
                    
                </div>

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

                <div className='px-6 pb-2'>
                    <TextInput 
                        inputType='password'
                        string={confirmPassword}
                        placeholder='Confirm Password'
                        onUpdate={setConfirmPassword}
                        error={showError('confirmPassword')}
                    />
                </div>

                <div className='px-6 pb-2 mt-6'>
                    <button 
                        disabled={loading}
                        onClick={() => signUp()} 
                        className={'flex w-full font-semibold text-[16px] text-white justify-center items-center rounded-sm py-3' + (!name || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#c70030]'}
                    >
                        {loading ? <BiLoaderCircle className='animate-spin' color='#fff' size={24} /> : 'Sign Up'}
                    </button>
                </div>
            </div>
        </>
    )
}