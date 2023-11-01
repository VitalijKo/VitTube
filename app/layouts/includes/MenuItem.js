'use client';

import { AiOutlineHome } from 'react-icons/ai';
import { RiGroupLine } from 'react-icons/ri';
import { BsCameraVideo } from 'react-icons/bs';

export default function MenuItem({ icon, color, size }) {
	const icons = () => {
		if (icon == 'For You') return <AiOutlineHome size={size} />;

		if (icon == 'Following') return <RiGroupLine size={size} />;

		if (icon == 'LIVE') return <BsCameraVideo size={size} />;
	}

	return (
		<>
			<div
				style={{ color }}
				className='flex w-full text-[$(color)] items-center rounded-md p-2.5'
			>
				<div className='flex items-center mx-auto lg:mx-0'>
					{icons()}

					<p className='lg:block hidden font-semibold text-[16px] mt-0.5 pl-[10px]'>
						{icon}
					</p>
				</div>
			</div>
		</>
	);
}
