'use client';

import MainLayout from './layouts/MainLayout';
import ClientOnly from './components/ClientOnly';
import PostMain from './components/PostMain';

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className='w-[calc(100%-90px)] max-w-[690px] ml-auto mt-[80px]'>
          <ClientOnly>
            <PostMain post={{
                id: '100',
                user_id: '456',
                video_url: '/x.mp4',
                text: 'XXX',
                created: 'DATE',
                profile: {
                    user_id: '456',
                    name: 'Corruptor',
                    image: 'https://placehold.co/100'
                }
            }} />
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}
