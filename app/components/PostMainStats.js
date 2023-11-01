import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaCommentDots, FaShare } from 'react-icons/fa';

export default function PostMainStats({ post }) {
	const router = useRouter();

	const [clickedLike, setClickedLike] = useState(false);
	const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState([]);
	const [comments, setComments] = useState([]);

	const like = () => {
		console.log('like');
	}

	return (
		<>
			<div id={'post_main_likes=' + post.id} className='relative mr-[75px]'>
				<div className='absolute bottom-0 pl-2'>
					<div className='text-center pb-4'>
						<button
							disabled={clickedLike}
							onClick={() => like()}
							className='bg-white rounded-full cursor-pointer p-2'
						>
							{!clickedLike ? (
								<AiFillHeart size='24' color={likes && liked ? '#ff2626': ''} />
							) : (
								<BiLoaderCircle size='24' className='animate-spin' />
							)}
						</button>

						<span className='font-semibold text-xs text-white'>
							{likes?.length}
						</span>
					</div>

					<button
						onClick={() => router.push('/post/' + post?.id + '/' + post?.profile?.user_id)}
						className='text-center pb-4'
					>
						<div className='bg-white rounded-full cursor-pointer p-2'>
							<FaCommentDots size='24' />
						</div>

						<span className='font-semibold text-xs text-white'>
							{comments?.length}
						</span>
					</button>

					<button className='text-center pb-4'>
						<div className='bg-white rounded-full cursor-pointer p-2'>
							<FaShare size='24' />
						</div>

						<span className='font-semibold text-xs text-white'>
							11
						</span>
					</button>
				</div>
			</div>
		</>
	);
}
