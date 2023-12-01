import { useState } from 'react';
import { useCommentStorage } from '@/app/storage/comment';
import { useGeneralStorage } from '@/app/storage/general';
import { useUser } from '@/app/context/user';
import useCreateComment from '@/app/hooks/useCreateComment';
import { BiLoaderCircle } from 'react-icons/bi';
import Comment from './Comment';
import ClientOnly from '../ClientOnly';

export default function Comments({ params }) {
    let { commentsByPost, setCommentsByPost } = useCommentStorage();
    let { setLoginOpen } = useGeneralStorage();

    const userContext = useUser();

    const [comment, setComment] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [uploading, setUploading] = useState(false);

    const addComment = async () => {
        if (!userContext?.user) return setLoginOpen(true);

        try {
            setUploading(true);

            await useCreateComment(userContext?.user?.id, params?.postId, comment);

            setCommentsByPost(params?.postId);
            setComment('');
            setUploading(false);
        } catch (e) {
            console.log(e);

            alert(e);
        }
    }

    return (
        <>
            <div className='relative z-0 w-full h-[calc(100%-273px)] overflow-auto bg-[#f8f8f8] border-t-2'>
                <div className='pt-2' />

                <ClientOnly>
                    {!commentsByPost ? (
                        <div className='text-xl text-gray-500 text-center mt-6'>No comments...</div>
                    ) : (
                        <div>
                            {commentsByPost.map((comment, i) => (
                                <Comment key={i} comment={comment} params={params} />
                            ))}
                        </div>
                    )}
                </ClientOnly>

                <div className='mb-28' />

            </div>

            <div className='flex absolute w-full lg:max-w-[550px] h-[85px] bg-white border-t-2 justify-between items-center bottom-0 px-8 py-5'>
                <div 
                    className={'flex w-full lg:max-w-[420px] bg-[#f1f1f1] items-center rounded-lg ' + (inputFocused ? 'border-2 border-gray-400' : 'border-2 border-[#f1f1f1]')}
                >
                    <input
                        type='text'
                        value={comment}
                        placeholder='Add comment...'
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onChange={e => setComment(e.target.value)}
                        className='w-full lg:max-w-[420px] bg-[#f1f1f1] text-[16px] rounded-lg focus:outline-none p-2'
                    />
                </div>
                {!uploading ? (
                    <button
                        disabled={!comment}
                        onClick={() => addComment()}
                        className={'font-semibold text-sm ml-5 pr-1 ' + (comment ? 'text-[#c70030] cursor-pointer' : 'text-gray-400')}
                    >
                        Post
                    </button>
                ) : (
                    <BiLoaderCircle size='24' color='#e91e62' className='animate-spin' />
                )}
            </div>
        </>
    );
}
