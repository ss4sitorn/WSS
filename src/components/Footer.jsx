import s from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerLogo}>
        W<span className={s.footerLogoAccent}>SS</span> Portal
      </div>
      <div>มาตรฐานความมั่นคงปลอดภัยสำหรับเว็บไซต์ พ.ศ. 2568</div>
      <div>Website Security Standard · NCSA Thailand</div>
    </footer>
  );
}
