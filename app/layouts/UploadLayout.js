import { usePathname } from 'next/navigation';
import TopNav from './includes/TopNav';

export default function MainLayout({ children }) {
	const pathname = usePathname();

	return (
		<>
			<div className='h-[100vh] bg-[#f8f8f8]'>
				<TopNav />

				<div className='flex w-full max-w-[1140px] justify-between mx-auto px-2'>
					{children}
				</div>
			</div>
		</>
	)
}
