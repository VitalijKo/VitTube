import { usePathname } from 'next/navigation';
import TopNav from './includes/TopNav';
import SideNavMain from './includes/SideNavMain';

export default function MainLayout({ children }) {
	const pathname = usePathname();

	return (
		<>
			<TopNav />

			<div className={'flex w-full justify-between mx-auto px-0 lg:px-2.5' + (pathname == '/' ? ' max-w-[1140px]' : '')}>
				<SideNavMain />

				{children}
			</div>
		</>
	)
}
