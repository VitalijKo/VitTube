import Link from 'next/link';
import { AiOutlineCheck } from 'react-icons/ai';

export default function MenuItemFollow({ user }) {
	return (
		<>
			<Link
				href={'profile/' + user?.id}
				className='flex w-full hover:bg-[#c70030] items-center rounded-md px-2 py-1.5'
			>
				<img src={user?.image} width='36' className='rounded-full lg:mx-0 mx-auto' />
			
				<div className='lg:block hidden lg:px-2.5'>
					<div className='flex items-center'>
						<p className='font-bold text-[16px] text-white truncate'>{user?.name}</p>
						<p className='relative h-[16px] bg-[#58d5ec] rounded-full ml-1'>
							<AiOutlineCheck size='16' color='#fff' className='relative p-[3px]' />
						</p>
					</div>

					<p className='font-light text-[12px] text-[#ccc]'>{user?.name}</p>
				</div>
			</Link>
		</>
	);
}
