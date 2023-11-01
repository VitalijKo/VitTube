'use client'

import MainLayout from '@/app/layouts/MainLayout';
import ClientOnly from '@/app/components/ClientOnly';
import PostUser from '@/app/components/profile/PostUser';
import EditProfileOverlay from '@/app/components/profile/EditProfileOverlay';
import { BsPencil } from 'react-icons/bs';

export default function Profile({ params }) {
	const profile = {
		id: '123',
		user_id: '123',
		name: 'Vitaly',
		image: 'https://placehold.co/200',
		bio: 'QQQQQQQ'
	}

	const post = {
		id: '123',
		user_id: '123',
		video_url: '/x.mp4',
		text: 'xxx',
		created: 'xxx'
	}

	return (
		<>
			<EditProfileOverlay />
			
			<MainLayout>
				<div className='w-[calc(90%-90px)] max-w-[1600px] overflow-hidden ml-[90px] 2xl:mx-auto lg:pl-[160px] 2xl:pl-[185px] pr-3 lg:pr-0 pt-[90px]'>
					<div className='flex w-[calc(100vw-230px)]'>
						<ClientOnly>
							{true ? (
								<img src={profile.image} className='w-[120px] min-w-[120px] rounded-full' />
							) : (
								<div className='win-w-[150px] h-[120px] bg-gray-200 rounded-full' />
							)}
						</ClientOnly>

						<div className='w-full ml-5'>
							<ClientOnly>
								{profile?.name ? (
									<div>
										<p className='font-bold text-[32px] truncate'>{profile?.name}</p>
										<p className='text-[16px] truncate'>{profile?.name}</p>
									</div>
								) : (
									<div className='h-[60px]' />
								)}
							</ClientOnly>

							{true ? (
								<button className='flex hover:bg-gray-100 font-semibold text-[16px] text-white border items-center rounded-md mt-3 px-3.5 py-1.5'>
									<BsPencil size='16' className='mt-0.5 mr-1' />
								
									<span>Edit</span>
								</button>
							) : (
								<button className='flex font-semibold text-[16px] bg-[#c70030] text-white items-center rounded-md mt-3 px-8 py-1.5'>
									Follow
								</button>
							)}
						</div>
					</div>

					<div className='flex items-center pt-4'>
						<div className='mr-4'>
							<span className='font-bold text-white'>10K</span>
							<span className='text-[16px] font-light text-white pl-1.5'>Following</span>
						</div>

						<div className='mr-4'>
							<span className='font-bold text-white'>10K</span>
							<span className='text-[16px] font-light text-white pl-1.5'>Followers</span>
						</div>
					</div>

					<ClientOnly>
						<p className='max-w-[500px] font-light text-white mr-4 pl-1.5 pt-4'>
							{profile?.bio}
						</p>
					</ClientOnly>

					<ul className='flex w-full border-b items-center pt-4'>
						<li className='w-60 font-bold text-[16px] border-b-2 border-b-black text-center py-2'>Videos</li>
						<li className='w-60 font-semibold text-[16px] text-white text-center'>Likes</li>
					</ul>

					<ClientOnly>
						<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mt-4'>
							<PostUser post={post} />
						</div>
					</ClientOnly>
				</div>
			</MainLayout>
		</>
	);
}
