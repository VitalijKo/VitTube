import Link from 'next/link';
import { useEffect } from 'react';
import useCreateBucketUrl from '@app/hooks/useCreateBucketUrl';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function PostUser({ post }) {
	useEffect(() => {
		const video = document.getElementById('video' + post?.id);

		setTimeout(() => {
			video.onmouseenter = () => video.play();
			video.onmouseleave = () => video.pause();
		}, 50);
	}, []);

	return (
		<>
			<div className='relative brightness-90 hover:brightness-[1.1] cursor-pointer'>
				{!post.video_url ? (
					<div
						style={{
							top: 0,
							left: 0
						}}
						className='flex absolute w-full bg-white justify-center items-center object-cover aspect-[3/4] rounded-md'>
						<AiOutlineLoading3Quarters size='96' color='#fff' className='animate-spin ml-4' />
					</div>
				) : (
					<Link href={'/post' + post.id + '/' + post.user_id}>
						<video
							id={'video' + post.id}
							src={useCreateBucketUrl(post.video_url)}
							loop
							muted
							className='object-cover aspect-[3/4] rounded-md'
						/>
					</Link>
				)}

				<div className='px-1'>
					<p className='text-[16px] text-white break-words pt-1'>
						{post.text}
					</p>
				</div>
			</div>
		</>
	);
}
