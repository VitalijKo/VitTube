import { debounce } from 'debounce';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGeneralStorage } from '@/app/storage/general';
import { useUser } from '@/app/context/user';
import useCreateBucketUrl from '@/app/hooks/useCreateBucketUrl';
import useSearchProfilesByName from '@/app/hooks/useSearchProfilesByName';;
import { BiSearch, BiUser } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

export default function TopNav() {    
    const userContext = useUser();

    const router = useRouter();

    const pathname = usePathname();

    const [searchProfiles, setSearchProfiles] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [setLoginOpen, setIsEditProfileOpen] = useGeneralStorage();

    useEffect(() => { setIsEditProfileOpen(false) }, [])

    const search = debounce(async (event) => {
        if (!event.target.value) return setSearchProfiles([]);

        try {
            const result = await useSearchProfilesByName(event.target.value);

            if (result) return setSearchProfiles(result);

            setSearchProfiles([]);
        } catch (e) {
            console.log(e);

            setSearchProfiles([]);

            alert(e);
        }
    }, 500);

    const upload = () => {
        if (!userContext?.user) return setLoginOpen(true);

        router.push('/upload');
    }

    return (
        <>
            <div className='flex fixed z-30 w-full h-[60px] bg-white border-b items-center'>
                <div className={'flex w-full justify-between items-center gap-6 mx-auto px-4' + (pathname == '/' ? 'max-w-[1150px]' : '')}>
					<Link href='/' className='w-[150px] ml-2'>
						<h1 className='font-bold text-[32px] text-white tracking-wide'><span className='text-[#c70030]'>V</span>it<span className='text-[#c70030]'>T</span>ube</h1>
					</Link>

                    <div className='md:flex relative w-full max-w-[430px] hidden bg-[#f1f1f1] justify-end items-center rounded-full p-1'>
                            <input 
                                type='text' 
                                onChange={search}
                                className='w-full bg-transparent text-[16px] placeholder-[#838383] focus:outline-none my-2 pl-3'
                                placeholder='Search...'
                            />

                            {searchProfiles ?
                                <div
                                	style={{
                                		top: '3rem',
                                		left: 0
                                	}}
                                	className='absolute z-20 w-full max-w-[910px] h-auto bg-white border p-1'
                                >
                                    {searchProfiles.map((profile, index) => (
                                        <div key={index} className='p-1'>
                                            <Link 
                                                href={'/profile/' + profile?.id}
                                                className='flex w-full hover:bg-[#c70030] hover:text-white justify-between items-center cursor-pointer p-1 px-2'
                                            >
                                                <div className='flex items-center'>
                                                    <img src={useCreateBucketUrl(profile?.image)} width='36' className='rounded-md' />

                                                    <div className='truncate ml-2'>{profile?.name}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            : null}

                            <div className='flex border-l border-gray-300 items-center px-3 py-1'>
                                <BiSearch size='24' color='#a1a2a7' />
                            </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button 
                            onClick={() => upload()}
                            className='flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5'
                        >
                            <AiOutlinePlus size='24' color='#000' />

                            <span className='font-medium text-[16px] px-2'>Upload</span>
                        </button>

                        {!userContext?.user?.id ? (
                            <div className='flex items-center'>
                                <button 
                                    onClick={() => setLoginOpen(true)}
                                    className='flex bg-[#c70030] text-white border items-center rounded-md px-3 py-[6px]'
                                >
                                    <span className='font-medium text-[16px] whitespace-nowrap mx-4'>Login</span>
                                </button>
                                <BsThreeDotsVertical size='24' color='#161724' />
                            </div>
                        ) : (
                            <div className='flex items-center'>
                                <div className='relative'>
                                    <button 
                                        onClick={() => setShowMenu(showMenu = !showMenu)} 
                                        className='border-gray-200 border rounded-full mt-1 '
                                    >
                                        <img src={useCreateBucketUrl(userContext?.user?.image || '')} className='rounded-full w-[35px] h-[35px]' />
                                    </button>
                                    
                                    {showMenu ? (
                                        <div
                                        	style={{
                                        		top: '40px'
                                        	}}
                                        	className='absolute w-[200px] bg-white border rounded-lg shadow-xl right-0 py-1.5'>
                                            <button 
                                                onClick={() => { 
                                                    router.push('/profile/' + userContext?.user?.id);

                                                    setShowMenu(false);
                                                }}
                                                className='flex w-full hover:bg-gray-100 justify-start items-center cursor-pointer px-2 py-3'
                                            >
                                                <BiUser size='20' />

                                                <span className='font-semibold text-sm pl-2'>Profile</span>
                                            </button>
                                            <button 
                                                onClick={async () => {
                                                    await userContext?.logout();

                                                    setShowMenu(false);
                                                }} 
                                                className='flex w-full hover:bg-gray-100 border-t justify-start items-center cursor-pointer px-1.5 py-3'
                                            >
                                                <FiLogOut size='20' />

                                                <span className='pl-2 font-semibold text-sm'>Logout</span>
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
