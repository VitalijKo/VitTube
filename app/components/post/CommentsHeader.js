'use client'

import moment from 'moment';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLikeStorage } from '@/app/storage/like';
import { useCommentStorage } from '@/app/storage/comment';
import { useGeneralStorage } from '@/app/storage/general';
import { useUser } from '@/app/context/user';
import useCreateBucketUrl from '@/app/hooks/useCreateBucketUrl';
import useIsLiked from '@/app/hooks/useIsLiked';
import useCreateLike from '@/app/hooks/useCreateLike';
import useDeleteLike from '@/app/hooks/useDeleteLike';
import useDeletePostById from '@/app/hooks/useDeletePostById';
import { BiLoaderCircle } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { BsChatDots, BsTrash3 } from 'react-icons/bs';
import { ImMusic } from 'react-icons/im';
import ClientOnly from '../ClientOnly';

export default function CommentsHeader({ post, params }) {
    let { setLikesByPost, likesByPost } = useLikeStorage();
    let { commentsByPost, setCommentsByPost } = useCommentStorage();
    let { setLoginOpen } = useGeneralStorage();

    const userContext = useUser();
    const router = useRouter();

    const [liked, setLiked] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [userLiked, setUserLiked] = useState(false);

    useEffect(() => { 
        setCommentsByPost(params?.postId); 
        setLikesByPost(params?.postId);
    }, [post]);

    useEffect(() => { userLikedPost() }, [likesByPost]);
    
    const userLikedPost = () => {
        if (!likesByPost || !userContext?.user?.id) {
            setUserLiked(false);

            return;
        }

        let r = useIsLiked(userContext.user.id, params.postId, likesByPost);

        setUserLiked(!!r);
    }

    const like = async () => {
        try {
            setLiked(true);

            await useCreateLike(userContext?.user?.id || '', params.postId);

            setLikesByPost(params.postId);
            setLiked(false);
        } catch (e) {
            console.log(e);

            alert(e);

            setLiked(false);
        }
    }

    const unlike = async (id) => {
        try {
            setLiked(true);

            await useDeleteLike(id);

            setLikesByPost(params.postId);
            setLiked(false);
        } catch (e) {
            console.log(e);

            alert(e);

            setLiked(false);
        }
    }

    const like = () => {
        if (!userContext?.user) return setLoginOpen(true);

        let r = useIsLiked(userContext.user.id, params.postId, likesByPost);

        if (!r) like();

        else likesByPost.forEach(like => {
            if (userContext?.user?.id && userContext.user.id == like.user_id && like.post_id == params.postId) unlike(like.id);
        }
    }

    const deletePost = async () => {
        setDeleting(true);

        try {
            await useDeletePostById(params?.postId, post?.video_url);

            router.push(`/profile/${params.userId}`);

            setDeleting(false);
        } catch (e) {
            console.log(e);

            setDeleting(e);

            alert(e);
        }
    }

    return (
        <>
            <div className='flex justify-between items-center px-8'>
                <div className='flex items-center'>
                    <Link href={'/profile/' + post?.user_id}>
                        {post?.profile.image ? (
                            <img className='rounded-full mx-auto lg:mx-0' width='36' src={useCreateBucketUrl(post?.profile.image)} />
                        ) : (
                            <div className='w-[40px] h-[40px] bg-gray-200 rounded-full'></div>
                        )}
                    </Link>

                    <div className='ml-3 pt-0.5'>
                        <Link 
                            href={'/profile/' + post?.user_id} 
                            className='relative z-10 font-semibold text-[16px] hover:underline'
                        >
                            {post?.profile.name}
                        </Link>

                        <div className='relative z-0 font-light text-[12px] -mt-5'>
                            {post?.profile.name}

                            <span className='relative -top-[2px] text-[30px] pl-1 pr-0.5'>.</span>
                            <span className='font-medium'>{moment(post?.created_at).calendar()}</span>
                        </div>
                    </div>
                </div>

                {userContext?.user?.id == post?.user_id ? (
                    <div>
                        {deleting ? (
                            <BiLoaderCircle size='24' className='animate-spin' />
                        ) : (
                            <button disabled={deleting} onClick={() => deletePost()}>
                                <BsTrash3 size='24' className='cursor-pointer' />
                            </button>
                        )}
                    </div>
                ) : null}
            </div>

            <p className='text-sm mt-4 px-8'>{post?.text}</p>

            <p className='flex font-bold text-sm items-center gap-2 mt-4 px-8'>
                <ImMusic size='16' />

                original sound - {post?.profile.name}
            </p>

            <div className='flex items-center mt-8 px-8'>
                <ClientOnly>
                    <div className='flex text-center items-center pb-4'>
                        <button 
                            disabled={liked}
                            onClick={() => like()} 
                            className='bg-gray-200 rounded-full cursor-pointer p-2'
                        >
                            {!liked ? (
                                <AiFillHeart size='24' color={likesByPost && userLiked ? '#ff2626' : ''} />
                            ) : (
                                <BiLoaderCircle size='24' className='animate-spin' />
                            )}
                        </button>

                        <span className='font-semibold text-xs text-gray-800 pl-2 pr-4'>
                            {likesByPost.length}
                        </span>
                    </div>
                </ClientOnly>

                <div className='flex text-center items-center pb-4'>
                    <div className='bg-gray-200 rounded-full cursor-pointer p-2'>
                        <BsChatDots size={24} />
                    </div>

                    <span className='font-semibold text-xs text-gray-800 pl-2'>{commentsByPost?.length}</span>
                </div>
            </div>
        </>
    )
}
