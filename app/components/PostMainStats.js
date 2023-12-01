import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGeneralStorage } from '../storage/general';
import { useUser } from '../context/user';
import useGetCommentsByPostId from '../hooks/useGetCommentsByPostId';
import useGetLikesByPostId from '../hooks/useGetLikesByPostId';
import useLiked from '../hooks/useLiked';
import useCreateLike from '../hooks/useCreateLike';
import useDeleteLike from '../hooks/useDeleteLike';
import { AiFillHeart } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';

export default function PostMainLikes({ post }) {
    const { setLoginOpen } = useGeneralStorage();

    const router = useRouter();

    const userContext = useUser();

    const [liked, setHasClickedLike] = useState(false);
    const [userLiked, setUserLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => { 
        getAllLikesByPost();
        getAllCommentsByPost();
    }, [post]);

    useEffect(() => { hasUserLikedPost() }, [likes, userContext]);

    const getAllCommentsByPost = async () => {
        const result = await useGetCommentsByPostId(post?.id);

        setComments(result);
    }

    const getAllLikesByPost = async () => {
        const result = await useGetLikesByPostId(post?.id);

        setLikes(result);
    }

    const hasUserLikedPost = () => {
        if (!userContext) return;

        if (!likes || !userContext?.user?.id) {
            setUserLiked(false);

            return;
        }

        const r = useLiked(userContext?.user?.id, post?.id, likes);

        setUserLiked(!!r);
    }

    const like = async () => {
        setHasClickedLike(true);

        await useCreateLike(userContext?.user?.id || '', post?.id);
        await getAllLikesByPost();

        hasUserLikedPost();

        setHasClickedLike(false);
    }

    const unlike = async (id) => {
        setHasClickedLike(true);

        await useDeleteLike(id);
        await getAllLikesByPost();

        hasUserLikedPost();
        setHasClickedLike(false);
    }

    const toggleLike = () => {
        if (!userContext?.user?.id) {
            setLoginOpen(true);

            return;
        }
        
        const r = useLiked(userContext?.user?.id, post?.id, likes);

        if (!res) like();

        else {
            likes.forEach((like) => {
                if (userContext?.user?.id == like?.user_id && like?.post_id == post?.id) unlike(like?.id);
            }
        }
    }

    return (
        <>
            <div className='relative mr-[75px]'>
                <div
                	style={{
                		bottom: 0
                	}}
                	className='absolute pl-2'
                >
                    <div className='text-center pb-4'>
                        <button 
                            disabled={liked}
                            onClick={() => toggleLike()} 
                            className='bg-gray-200 rounded-full cursor-pointer p-2'
                        >
                            {!liked ? (
                                <AiFillHeart size='24' color={likes && userLiked ? '#ff2626' : ''} />
                            ) : (
                                <BiLoaderCircle size='24' className='animate-spin' />
                            )}
                        </button>

                        <span className='font-semibold text-xs text-gray-800'>
                            {likes?.length}
                        </span>
                    </div>

                    <button 
                        onClick={() => router.push('/post/' + post?.id + '/' + post?.profile?.user_id)} 
                        className='text-center pb-4'
                    >
                        <div className='bg-gray-200 rounded-full cursor-pointer p-2'>
                            <FaCommentDots size='24' />
                        </div>

                        <span className='font-semibold text-xs text-gray-800'>{comments?.length}</span>
                    </button>
                </div>
            </div>
        </>
    );
}
