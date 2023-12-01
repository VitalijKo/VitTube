import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { useCommentStorage } from '@/app/storage/comment';
import { useUser } from '@/app/context/user';
import useDeleteComment from '@/app/hooks/useDeleteComment';
import { BiLoaderCircle } from 'react-icons/bi';
import { BsTrash3 } from 'react-icons/bs';

export default function Comment({ comment, params }) {
    const userContext = useUser();

    let { setCommentsByPost } = useCommentStorage();

    const [deleting, setDeleting] = useState(false);

    const deleteComment = async () => {
        try {
            setDeleting(true);

            await useDeleteComment(comment?.id);

            setCommentsByPost(params?.postId);
            setDeleting(false);
        } catch (e) {
            console.log(e);

            alert(e);
        }
    }

    return (
        <>
            <div className='flex justify-between items-center mt-4 px-8'>
                <div className='flex relative w-full items-center'>
                    <Link href={`/profile/${comment.profile.user_id}`}>
                        <img     }}
                            src={useCreateBucketUrl(comment.profile.image)}
                            width='36'
                            style={{
                                top: 0
                            }}
                            className='absolute rounded-full mx-auto lg:mx-0'
                        />
                    </Link>
                    <div className='w-full ml-16 pt-0.5'>

                        <div className='flex font-semibold text-[16px] justify-between items-center'>
                            <span className='flex items-center'>
                                {comment?.profile?.name} - 
                                <span className='font-light text-[12px] text-gray-600 ml-1'>
                                    {moment(comment?.created_at).calendar()}
                                </span>
                            </span>

                            {userContext?.user?.id == comment.profile.user_id ? (
                                <button 
                                    disabled={deleting} 
                                    onClick={() => deleteComment()}
                                >
                                    {deleting 
                                        ? <BiLoaderCircle size='20' color='#e91e62' className='animate-spin' />
                                        : <BsTrash3 size='24' className='cursor-pointer' />
                                    }
                                </button>
                            ) : null}
                        </div>
                        
                        <p className='font-light text-[16px]'>{comment.text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
