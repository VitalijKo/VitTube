import './globals.css';

export const metadata = {
  title: 'VitTube',
  description: '18+ Short Videos'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <link rel='icon' href='/favicon.png' />
      <body className='bg-black'>{children}</body>
    </html>
  );
}
