import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuItem from './MenuItem';
import ClientOnly from '@/app/components/ClientOnly';
import MenuItemFollow from '@/app/components/MenuItemFollow';

export default function TopNav() {
	const pathname = usePathname();

	return (
		<>
			<div id='side_nav_main' className={'fixed z-20 w-[75px] h-full bg-black lg:border-r-0 border-r pt-[70px] ' + (pathname == '/' ? 'lg:w-[310px]' : 'lg:w-[220px]')}>
				<div className='w-[55px] lg:w-full mx-auto'>
					<Link href='/'>
						<MenuItem
							icon='For You'
							size='24'
							color={pathname == '/' ? '#c70030' : ''}
						/>
					</Link>
					<Link href='/'>
						<MenuItem
							icon='Following'
							size='24'
							color={pathname == '/' ? '#fff' : ''}
						/>
					</Link>
					<Link href='/'>
					<MenuItem
						icon='LIVE'
						size='24'
						color={pathname == '/' ? '#fff' : ''}
					/>
					</Link>

					<div className='border-b lg:ml-2 mt-2' />

					<h3 className='lg:block hidden font-semibold text-xs text-gray-400 px-2 pt-4 pb-2'>Suggested accounts</h3>
				
					<div className='block lg:hidden pt-3' />

					<ClientOnly>
						<div className='cursor-pointer'>
							<MenuItemFollow user={{ id: '1', name: 'User', image: 'https://placehold.co/48' }} />
						</div>
					</ClientOnly>

					<button className='lg:block hidden text-[12px] text-[#c70030] pt-1.5 pl-2'>
						See all
					</button>

					{true ? (
						<div>
							<div className='border-b lg:ml-2 mt-2' />

							<h3 className='lg:block hidden font-semibold text-xs text-gray-400 px-2 pt-4 pb-2'>Following accounts</h3>
						
							<div className='block lg:hidden pt-3' />

							<ClientOnly>
								<div className='cursor-pointer'>
									<MenuItemFollow user={{ id: '1', name: 'User', image: 'https://placehold.co/48' }} />
								</div>
							</ClientOnly>

							<button className='lg:block hidden text-[12px] text-[#c70030] pt-1.5 pl-2'>
								See more
							</button>
						</div>
					) : null}

					<div className='lg:block hidden border-b lg:ml-2 mt-2' />

					<div className='lg:block hidden text-[12px] text-gray-400'>
                        <p className='px-2 pt-4'>About Newsroom VitTube Shop Contact Careers</p>
                        <p className='px-2 pt-4'>VitTube for Good Advertise Developers Transparency VitTube Rewards VitTube Browse VitTube Embeds</p>
                        <p className='px-2 pt-4'>Help Safety Terms Privacy Creator Portal Community Guidelines</p>
                        <p className='px-2 pt-4'>© 2023 VitTube</p>
					</div>
				</div>
			</div>
		</>
	);
}
