'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ImMusic } from 'react-icons/im';
import { AiFillHeart } from 'react-icons/ai';
import PostMainStats from './PostMainStats';

export default function PostMain({ post }) {
	useEffect(() => {
		const video = document.getElementById('video-' + post?.id);
		const postMainElement = document.getElementById('post_main-' + post?.id);

		if (postMainElement) {
			let observer = new IntersectionObserver((entries) => {
				entries[0].isIntersecting ? video.play() : video.pause();
			}, { threshold: [0.6] });

			observer.observe(postMainElement);
		}
	}, []);

	return (
		<>
			<div id={'post_main=' + post.id} className='flex border-b py-6'>
				<div className='cursor-pointer'>
					<img src={post?.profile?.image} width='64' className='max-h-[60px] rounded-full' />
				</div>

				<div className='w-full px-4 pl-3'>
					<div className='flex justify-between items-center pb-0.5'>
						<Link href={'/profile/' + post.profile.user_id}>
							<span className='font-bold text-white cursor-pointer hover:underline'>
								{post.profile.name}
							</span>
						</Link>

						<button className='hover:bg-[#ffeef2] font-semibold text-[16px] text-[#c70030] border border-[#c70030] rounded-md px-[20px] py-0.5'>
							Follow
						</button>
					</div>

					<p className='max-w-[300px] md:max-w-[400px] text-[16px] text-white break-words pb-0.5'>
						{post.text}
					</p>
					<p className='text-[16px] text-gray-400 pb-0.5'>
						#fun #cool #awesome
					</p>
					<p className='flex font-semibold text-[16px] text-white items-center pb-0.5'>
						<ImMusic size='16' />

						<span className='px-1'>original sound - AWESOME</span>

						<AiFillHeart size='24' />
					</p>

					<div className='flex mt-2.5'>
						<div className='relative max-w-[260px] min-h-[480px] max-h-[580px] bg-black items-center rounded-xl cursor-pointer'>
							<video
								id={'video-' + post.id}
								src={post?.video_url}
								loop
								controls
								muted
								className='overflow-hidden h-full border border-white object-cover rounded-xl mx-auto'
							/>
						</div>

						<PostMainStats post={post} />
					</div>
				</div>
			</div>
		</>
	);
}
