import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';

export default function EditProfileOverlay() {
	const router = useRouter();

	const [file, setFile] = useState(null);
	const [crop, setCrop] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [image, setImage] = useState('https://placehold.co/96');
	const [name, setName] = useState('');
	const [bio, setBio] = useState('');
	const [updating, setUpdating] = useState(false);
	const [error, setError] = useState(null);

	const getUploadedImage = () => {
		console.log('X');
	}

	return (
		<>
			<div
				id='edit_profile_overlay'
				style={{
					top: 0,
					left: 0
				}}
				className='flex fixed z-50 w-full h-full overflow-auto bg-black bg-opacity-50 justify-center pt-12 md:px-[105px]'
			>
				<div className={'relative w-full max-w-[700px] h-[655px] sm:h-[580px] bg-white rounded-lg mx-3 mb-10 p-4 ' + !uploadedImage ? 'h-[655px]' : 'h-[580px]'}>
					<div
						style={{
							top: 0,
							left: 0
						}}
						className='flex absolute w-full border-b border-b-gray-300 justify-between p-5'>
						<h1 className='font-medium text-[24px]'>
							Edit profile 
						</h1>

						<button
							disabled={updating}
							className='hover:bg-gray-200 rounded-full p-1'
						>
							<AiOutlineClose size='24' />
						</button>
					</div>

					<div className={'h-[calc(500px-200px)] ' + !uploadedImage ? 'mt-16' : 'mt-[60px]'}>
						{!uploadedImage ? (
							<div>
								<div
									id='profile_photo_section'
									className='flex flex-col w-full h-[145px] sm:h-[120px] border-b px-1.5 py-2'
								>
									<h3 className='sm:w-[160px] font-semibold text-[16px] sm:text-left text-gray-700 text-center mb-1 sm:mb-0'>
										Profile photo
									</h3>

									<div className='flex justify-center items-center sm:-mt-6'>
										<label htmlFor='image' className='relative cursor-pointer'>
											<img src={image} width='96' className='rounded-full' />

											<button
												style={{
													bottom: 0,
													right: 0
												}}
												className='inline-block absolute w-[32px] h-[32px] bg-white border border-gray-300 rounded-full shadow-xl p-1'
											>
												<BsPencil size='16' className='ml-0.5' />
											</button>
										</label>

										<input
											id='image'
											type='file'
											accept='image/png, image/jpg, image/jpeg'
											onChange={getUploadedImage}
											className='hidden'
										/>
									</div>
								</div>

								<div
									id='username_section'
									className='flex flex-col w-full sm:h-[120px] border-b mt-1.5 px-1.5 py-2'
								>
									<h3 className='sm:w-[160px] font-semibold text-[16px] text-gray-700 text-center sm:text-left sm:mb-0'>
										Name
									</h3>
								</div>
							</div>
						) : (
							<div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
