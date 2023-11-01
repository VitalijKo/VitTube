import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BiSearch, BiUser } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

export default function TopNav() {
	const router = useRouter();
	const pathname = usePathname();

	const handleSearchName = (e) => {
		console.log(e.target.value);
	};

	const go = (path) => {
		router.push(path);
	}

	return (
		<>
			<div id='top_nav' className='flex fixed z-30 w-full h-[60px] bg-black border-b items-center'>
				<div className={'flex w-full justify-between items-center gap-6 mx-auto px-4' + (pathname == '/' ? ' max-w-[1150px]' : '')}>
					<Link href='/' className='ml-2 w-[150px]'>
						<h1 className='font-bold text-[32px] text-white tracking-wide'><span className='text-[#c70030]'>V</span>it<span className='text-[#c70030]'>T</span>ube</h1>
					</Link>

					<div className='relative md:flex hidden w-full max-w-[430px] bg-[#f1f1f1] justify-end items-center rounded-full p-1'>
						<input
							type='text'
							placeholder='Search accounts'
							onChange={handleSearchName}
							className='w-full bg-transparent placeholder-[#838383] text-[16px] outline-none my-2 pl-3'
						/>

						<div
							style={{
								top: '3rem',
								left: 0
							}}
							className='absolute z-20 w-full max-w-[910px] h-auto bg-black border p-1'
						>
							<div className='p-1'>
								<Link
									href={'/profile/' + '1'}
									className='flex w-full hover:bg-[#c70030] font-semibold text-white hover:text-black justify-between items-center cursor-pointer p-1 px-2'
								>
									<div className='flex items-center'>
										<img src='https://placehold.co/36' width='36' className='rounded-md' />

										<div className='truncate ml-2'>Corruptor</div>
									</div>
								</Link>
							</div>
						</div>

						<div className='flex border-l border-l-gray-300 items-center px-3 py-1'>
							<BiSearch size='24' color='#a1a2a7' />
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<button
							onClick={() => go('/upload')}
							className='flex hover:bg-[#c70030] border items-center rounded-sm py-[6px] pl-1.5'
						>
							<AiOutlinePlus size='24' color='#fff' />

							<span className='font-medium text-[16px] text-white px-2'>Upload</span>
						</button>

						{true ? (
							<div className='flex items-center'>
								<button className='flex bg-[#c70030] text-white border font-medium items-center rounded-md px-3 py-[6px]'>
									<span className='font-medium text-[16px] whitespace-nowrap mx-4'>Log in</span>
								</button>

								<BsThreeDotsVertical size='24' color='#fff' />
							</div>
						) : (
							<div className='flex items-center'>
								<div className='relative'>
									<button className='border border-gray-200 rounded-full mt-1'>
										<img src='https://placehold.co/36' className='w-[36px] h-[36px] rounded-full' />
									</button>

									<div className='absolute top-[40px] right-0 w-[200px] bg-black border rounded-lg shadow-xl py-1.5'>
										<button className='flex w-full hover:bg-gray-100 justify-start items-center cursor-pointer px-2 py-3'>
											<BiUser size='20' />

											<span className='font-semibold text-sm pl-2'>Profile</span>
										</button>

										<button className='flex w-full hover:bg-gray-100 justify-start items-center cursor-pointer px-2 py-3'>
											<FiLogOut size='20' />

											<span className='font-semibold text-sm pl-2'>Log out</span>
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
