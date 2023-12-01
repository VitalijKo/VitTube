import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useProfileStorage } from '@/app/storage/profile';
import { useGeneralStorage } from '@/app/storage/general';
import { useUser } from '@/app/context/user';
import useUpdateProfile from '@/app/hooks/useUpdateProfile';
import useChangeUserImage from '@/app/hooks/useChangeUserImage';
import useUpdateProfileImage from '@/app/hooks/useUpdateProfileImage';
import useCreateBucketUrl from '@/app/hooks/useCreateBucketUrl';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import TextInput from '../TextInput';

export default function EditProfileOverlay() {
    let { profile, setProfile } = useProfileStorage();
    let { setProfileOpen } = useGeneralStorage();

    const userContext = useUser();
    const router = useRouter();

    const [file, setFile] = useState(null);
    const [cropper, setCropper] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setName(profile?.name || '');
        setBio(profile?.bio || '');
        setImage(profile?.image || '');
    }, [])

    const getUploadedImage = (e) => {
        const selectedFile = e.target.files && e.target.files[0];
        
        if (selectedFile) {
            setFile(selectedFile);
            setUploadedImage(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setUploadedImage(null);
        }
    }

    const updateUserInfo = async () => {
        if (validate()) return;
        if (!userContext?.user) return;
        
        try {
            setUpdating(true);

            await useUpdateProfile(profile?.id || '', name, bio);

            setProfile(userContext?.user?.id);
            setProfileOpen(false);

            router.refresh();
            
        } catch (e) {
            console.log(e);
        }
    }

    const cropImage = async () => {
        if (validate()) return;
        if (!userContext?.user) return;

        try {
            if (!file) return alert('You have no file');
            if (!cropper) return alert('You have no file');

            setUpdating(true);

            const newImageId = await useChangeUserImage(file, cropper, image);

            await useUpdateProfileImage(profile?.id || '', newImageId);
            await userContext.checkUser();

            setProfile(userContext?.user?.id);
            setProfileOpen(false);
            setUpdating(false);
        } catch (e) {
            console.log(e);

            setUpdating(false);

            alert(e);
        }
    }

    const showError = (type) => {
        if (error && Object.entries(error) && error?.type == type) return error.message;
    }

    const validate = () => {
        setError(null);

        if (!name) setError({ type: 'name', message: 'A username is required'});

        return !!error;
    }

    return (
        <>
            <div
            	style={{
            		top: 0,
            		left: 0
            	}}
            	className='flex fixed z-50 w-full h-full overflow-auto bg-black bg-opacity-50 justify-center pt-12 md:pt-[105px]'>
                <div className={'relative w-full max-w-[700px] h-[655px] sm:h-[580px] bg-white rounded-lg mx-3 mb-10 p-4' + (!uploadedImage ? 'h-[655px]' : 'h-[580px]')}>
                    <div
		            	style={{
		            		top: 0,
		            		left: 0
		            	}}
                    	className='flex absolute w-full justify-between border-b border-b-gray-300 items-center p-5'>
                        <h1 className='font-medium text-[24px]'>
                            Edit profile
                        </h1>
                        <button 
                            disabled={updating} 
                            onClick={() => setProfileOpen(false)} 
                            className='hover:bg-gray-200 p-1 rounded-full'
                        >
                            <AiOutlineClose size='24' />
                        </button>
                    </div>

                    <div className={'h-[calc(500px-200px)] ' + (!uploadedImage ? 'mt-16' : 'mt-[60px]')}>
                        {!uploadedImage ? ( 
                            <div>
                                <div className='flex flex-col w-full h-[145px] sm:h-[118px] border-b px-1.5 py-2'>
                                    <h3 className='sm:w-[160px] font-semibold text-[16px] text-gray-700 text-center sm:text-left mb-1 sm:mb-0'>
                                        Profile photo
                                    </h3>

                                    <div className='flex justify-center items-center sm:-mt-6'>
                                        <label htmlFor='image' className='relative cursor-pointer'>
                                            <img className='rounded-full' width='96' src={useCreateBucketUrl(image)} />

                                            <button
								            	style={{
								            		bottom: 0,
								            		right: 0
								            	}}
                                            	className='inline-block absolute w-[32px] h-[32px] bg-white border border-gray-300 rounded-full p-1'>
                                                <BsPencil size='16' className='ml-0.5' />
                                            </button>
                                        </label>
                                        <input
                                        	id='image'
                                            type='file'
                                            accept='image/png, image/jpeg, image/jpg'
                                            onChange={getUploadedImage}
                                            className='hidden'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col w-full sm:h-[118px] border-b mt-1.5 px-1.5 py-2'>
                                    <h3 className='sm:w-[160px] font-semibold text-[16px] text-center text-gray-700 sm:text-left sm:mb-0 mb-1'>
                                        Name
                                    </h3>

                                    <div className='flex justify-center items-center sm:-mt-6'>
                                        <div className='w-full sm:w-[60%] max-w-md'>
                                            <TextInput 
                                                inputType='text'
                                                string={name}
                                                placeholder='Username'
                                                onUpdate={setName}
                                                error={showError('name')}
                                            />
                                            
                                            <p className={'relative text-[12px] text-gray-500 ' + (error ? 'mt-1' : 'mt-4')}>
                                                Username can only contain letters, numbers, underscores, and periods. 
                                                Changing your username will also change your profile link.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col w-full sm:h-[120px] mt-2 px-1.5 py-2'>
                                    <h3 className='sm:w-[160px] font-semibold text-center sm:text-left text-[16px] text-gray-700 mb-1 sm:mb-0'>
                                        Bio
                                    </h3>

                                    <div className='flex justify-center items-center sm:-mt-6'>
                                        <div className='w-full sm:w-[60%] max-w-md'>
                                            <textarea 
                                                cols={30}
                                                rows={4}
                                                onChange={e => setBio(e.target.value)}
                                                value={bio || ''}
                                                maxLength={80}
                                                className='w-full resize-none bg-[#f1f1f1] text-gray-800 border border-gray-300 rounded-md focus:outline-none px-3py-2.5'>
                                            </textarea>
                                            <p className='text-[12px] text-gray-500'>{bio ? bio.length : 0}/80</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='w-full max-h-[420px] bg-black circle-stencil mx-auto'>
                                <Cropper
                                	src={uploadedImage}
                                    stencilProps={{ aspectRatio: 1 }}
                                    onChange={(cropper) => setCropper(cropper.getCoordinates())}
                                    className='h-[400px]'
                                />
                            </div>
                        )}
                        
                    </div>

                    <div
		            	style={{
		            		bottom: 0,
		            		left: 0
		            	}}
                    	className='absolute w-full border-t border-t-gray-300 p-5'>
                        {!uploadedImage ? (
                            <div className='flex justify-end items-center'>
                                <button 
                                    disabled={updating}
                                    onClick={() => setProfileOpen(false)}
                                    className='flex hover:bg-gray-100 border items-center rounded-sm px-3 py-[6px]'
                                >
                                    <span className='font-medium text-[16px] px-2'>Cancel</span>
                                </button>

                                <button 
                                    disabled={updating}
                                    onClick={() => updateUserInfo()}
                                    className='flex bg-[#c70030] text-white border items-center rounded-md ml-3 px-3 py-[6px]'
                                >
                                    <span className='font-medium text-[16px] mx-4'>
                                        {updating ? <BiLoaderCircle color='#fff' className='animate-spin mx-2.5 my-1' /> : 'Save' }
                                    </span>
                                </button>

                            </div>
                        ) : (
                            <div className='flex justify-end items-center'>
                                <button 
                                    onClick={() => setUploadedImage(null)}
                                    className='flex hover:bg-gray-100 border items-center rounded-sm px-3 py-[6px]'
                                >
                                    <span className='font-medium text-[15px] px-4'>Cancel</span>
                                </button>

                                <button 
                                    onClick={() => cropImage()}
                                    className='flex bg-[#c70030] text-white border items-center rounded-md ml-3 px-3 py-[6px]'
                                >
                                    <span className='font-medium text-[16px] mx-4'>
                                        {updating ? <BiLoaderCircle color='#fff' className='animate-spin mx-2.5 my-1' /> : 'Apply' }
                                    </span>
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
