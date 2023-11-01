'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiSolidCloudUpload, BiLoaderCircle } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import UploadLayout from '../layouts/UploadLayout';
export default function Upload() {
	const router = useRouter();

	const [file, setFile] = useState(null);
	const [fileDisplay, setFileDisplay] = useState('');
	const [title, setTitle] = useState('');
	const [error, setError] = useState(null);
	const [uploading, setUploading] = useState(false);

	const onChange = (e) => {
		const files = e.target.files;

		if (files) {
			const file = files[0];
			const fileUrl = URL.createObjectURL(file);

			setFile(file);
			setFileDisplay(fileUrl);
		}
	}

	const clear = () => {
		setFile(null);
		setFileDisplay('');
	}

	const discard = () => {
		clear();
		setTitle('');
	}

	const upload = () => {
		console.log('XXX');
	}

	return (
		<>
			<UploadLayout>
				<div className='w-full bg-black rounded-md shadow-lg mt-[80px] mb-[40px] px-4 md:px-10 py-6'>
					<div>
						<h1 className='font-semibold text-[24px] text-white'>Upload video</h1>
						<h2 className='text-gray-400 mt-1'>Post a video to your account</h2>
					</div>

					<div className='md:flex gap-6 mt-8'>
						{!fileDisplay ? (
							<label
								htmlFor='file_input'
								className='flex flex-col w-full max-w-[260px] h-[470px] hover:bg-gray-100 border-2 border-dashed border-gray-300 justify-center items-center text-center rounded-lg cursor-pointer mx-auto md:mx-0 mt-4 mb-6 p-3'
							>
								<BiSolidCloudUpload size='36' color='#b3b3b1' />

	                            <p className='text-[16px] mt-4'>Select video to upload</p>
	                            <p className='text-[12px] text-gray-500 mt-1.5'>Or drag and drop a file</p>
	                            <p className='text-sm text-gray-400 mt-12'>MP4</p>
	                            <p className='text-[12px] text-gray-400 mt-2'>Up to 5 minutes</p>
	                            <p className='text-[12px] text-gray-400 mt-2'>Less than 500 MB</p>
							
	                            <label
	                            	htmlFor='file_input'
	                            	className='w-[80%] bg-[#c70030] text-[16px] text-white rounded-sm cursor-pointer mt-8 px-2 py-1.5'
	                            >
	                            	Select file
	                            </label>

	                            <input
	                            	id='file_input'
	                            	type='file'
	                            	accept='mp4'
	                            	hidden
	                            	onChange={onChange}
	                            />
							</label>
						) : (
							<div className='flex relative w-full max-w-[260px] h-[540px] justify-center items-center rounded-2xl cursor-pointer mx-auto md:mx-0 mt-4 mb-16 md:mb-12 p-3'>
								{uploading ? (
									<div className='flex relative z-20 w-full h-full bg-black bg-opaticy-50 justify-center items-center rounded-[50px]'>
										<div className='flex justify-center items-center gap-1 mx-auto'>
											<BiLoaderCircle size='36' color='#f12b56' className='animate-spin' />
										
											<div class='font-bold text-white'>Uploading...</div>
										</div>
									</div>
								) : null}

								<img src='/images/mobile-case.png' className='absolute z-20 pointer-events-none' />
								<img src='/images/vittube-white.png' width='90' style={{ bottom: '1.5rem', right: '1rem' }} className='absolute z-20' />
							
								<video
									src={fileDisplay}
									autoPlay
									loop
									muted
									width='90%'
									className='absolute z-10 w-12 h-full object-cover rounded-xl p-[13px]'
								/>

								<div style={{ bottom: '-3rem' }} className='flex absolute z-50 w-full border border-gray-300 justify-between items-center rounded-xl'>
									<div className='flex items-center truncate'>
										<AiOutlineCheckCircle size='16' className='min-w-[16px]' />
									
										<p className='text-[12px] truncate text-ellipsis pl-1'>
											{file ? file.name : ''}
										</p>
									</div>

									<button onClick={() => clear()} className='font-semibold text-[12px] text-white ml-2'>
										Change
									</button>
								</div>
							</div>
						)}

						<div className='mt-4 mb-6'>
							<div className='mt-5'>
								<div className='flex justify-between items-center'>
									<div className='text-[16px] text-white mb-1'>
										Title
									</div>

									<div className='text-[12px] text-gray-400'>
										{title.length}/150
									</div>
								</div>

								<input
									type='text'
									value={title}
									maxLength={150}
									onChange={e => setTitle(e.target.value)}
									className='w-full border rounded-md p-2.5 focus:outline-none'
								/>
							</div>

							<div className='flex gap-3'>
								<button
									disabled
									onClick={() => discard()}
									className='hover:bg-[#c70030] text-[16px] text-white border rounded-md cursor-pointer mt-8 px-10 py-2.5'
								>
									Discard
								</button>

								<button
									disabled
									onClick={() => upload()}
									className='text-[16px] bg-[#c70030] text-white border rounded-md cursor-pointer mt-8 px-10 py-2.5'
								>
									{uploading ? <BiLoaderCircle size={24} color='#fff' className='animate-spin' /> : 'Upload'}
								</button>
							</div>

							{error ? (
								<div className='text-red-600 mt-4'>
									{error.message}
								</div>
							) : null}
						</div>
					</div>
				</div>
			</UploadLayout>
		</>
	);
}
