import './globals.css';

export const metadata = {
  title: 'WSS — มาตรฐานความมั่นคงปลอดภัยสำหรับเว็บไซต์',
  description:
    'กรอบมาตรฐานด้านความมั่นคงปลอดภัยไซเบอร์สำหรับเว็บไซต์หน่วยงานของรัฐ หน่วยงานโครงสร้างพื้นฐานสำคัญทางสารสนเทศ และหน่วยงานเอกชน — Website Security Standard (WSS)',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;700&family=Chakra+Petch:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
