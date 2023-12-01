'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import useCreateBucketUrl from '@/app/hooks/useCreateBucketUrl';
import { usePostStorage } from '@/app/storage/post';
import { useLikeStorage } from '@/app/storage/like';
import { useCommentStorage } from '@/app/storage/comment';
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ClientOnly from '@/app/components/ClientOnly';
import Comments from '@/app/components/post/Comments';
import CommentsHeader from '@/app/components/post/CommentsHeader';

export default function Post({ params }) {
    const { postById, postsByUser, setPostById, setPostsByUser } = usePostStorage();
    const { setLikesByPost } = useLikeStorage();
    const { setCommentsByPost } = useCommentStorage();

    const router = useRouter();

    useEffect(() => { 
        setPostById(params.postId);
        setCommentsByPost(params.postId);
        setLikesByPost(params.postId);
        setPostsByUser(params.userId);
    }, []);

    const loopPostsUp = () => {
        postsByUser.forEach(post => {
            if (post.id > params.postId) router.push('/post/' + post.id + '/' + params.userId);
        });
    }

    const loopPostsDown = () => {
        postsByUser.forEach(post => {
            if (post.id < params.postId) router.push('/post/' + post.id + '/' + params.userId);
        });
    }

    return (
        <>
            <div 
                id='post_page' 
                className='lg:flex w-full h-screen overflow-auto bg-black justify-between'
            >
                <div className='relative lg:w-[calc(100%-540px)] h-full'>
                    <Link
                        href={'/profile/' + params?.userId}
                        className='absolute z-20 bg-gray-700 hover:bg-gray-800 text-white rounded-full p-1.5 m-5'
                    >
                        <AiOutlineClose size='24' />
                    </Link>

                    <div >
                        <button 
                            onClick={() => loopPostsUp()}
                            style={{
                                top: 4,
                                right: 4
                            }}
                            className='flex absolute z-20 bg-gray-700 hover:bg-gray-800 justify-center items-center rounded-full p-1.5'
                        >
                            <BiChevronUp size='32' color='#fff' />
                        </button>

                        <button  
                            onClick={() => loopPostsDown()}
                            style={{
                                top: 20,
                                right: 4
                            }}
                            className='flex absolute z-20 bg-gray-700 hover:bg-gray-800 justify-center items-center rounded-full p-1.5'
                        >
                            <BiChevronDown size='32' color='#fff' />
                        </button>
                    </div>

                    <ClientOnly>
                        {postById?.video_url ? (
                            <video 
                                className='fixed z-[0] w-full h-screen object-cover my-auto' 
                                src={useCreateBucketUrl(postById?.video_url)}
                            />
                        ) : null}

                        <div className='relative lg:min-w-[480px] z-10 bg-black bg-opacity-70'>
                            {postById?.video_url ? (
                                <video 
                                    autoPlay
                                    controls
                                    loop
                                    muted
                                    className='h-screen mx-auto' 
                                    src={useCreateBucketUrl(postById.video_url)}
                                />
                            ) : null}
                        </div>
                    </ClientOnly>
                </div>

                <div id='info_section' className='relative w-full lg:max-w-[550px] h-full bg-white'>
                    <div className='py-7' />

                        <ClientOnly>
                            {postById ? (
                                <CommentsHeader post={postById} params={params}/>
                            ) : null}
                        </ClientOnly>

                        <Comments params={params} />
                </div>
            </div>
        </>
    );
}
