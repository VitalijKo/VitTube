import Link from 'next/link';
import useCreateBucketUrl from '@/app/hooks/useCreateBucketUrl';
import { AiOutlineCheck } from 'react-icons/ai';

export default function MenuItemFollow({ user }) {
    return (
        <>
            <Link 
                href={'/profile/' + user?.id}
                className='flex w-full hover:bg-gray-100 items-center rounded-md px-2 py-1.5'
            >
                <img 
                    className='rounded-full mx-auto lg:mx-0' 
                    width='36'
                    src={useCreateBucketUrl(user?.image)}
                />

                <div className='lg:block hidden lg:pl-2.5'>
                    <div className='flex items-center'>
                        <p className='font-bold text-[16px] truncate'>
                            {user?.name}
                        </p>

                        <p className='relative h-[16px] bg-[#58de5c] rounded-fullml-1'>
                            <AiOutlineCheck  size='16' color='#fff' className='relative p-[3px]' />
                        </p>
                    </div>

                    <p className='font-light text-[12px] text-gray-600'>
                        {user?.name}
                    </p>
                </div>
            </Link>
        </>
    );
}
