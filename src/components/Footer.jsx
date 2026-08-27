import s from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        {/* Top Grid */}
        <div className={s.topGrid}>
          {/* Logo Column */}
          <div className={s.logoCol}>
            {/* Official NCSA Image Logo */}
            <img
              src="/ncsa_logo.png"
              alt="NCSA Logo"
              className={s.logoImg}
            />
            <div className={s.logoSub}>
              <span className={s.orgNameThai}>สำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ (สกมช.)</span>
              <span>National Cyber Security Agency - NCSA</span>
            </div>
          </div>

          {/* Contact Column */}
          <div className={s.col}>
            <div className={s.heading}>ติดต่อสำนักงาน</div>
            <div className={s.addrList}>
              <span>120 หมู่ 3 อาคารซี ชั้น 7</span>
              <span>ศูนย์ราชการเฉลิมพระเกียรติ 80 พรรษา 5 ธันวาคม 2550</span>
              <span>ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง</span>
              <span>เขตหลักสี่ กรุงเทพฯ 10210</span>
            </div>
          </div>

          {/* Phone Column */}
          <div className={s.col}>
            <div className={s.heading}>โทรศัพท์</div>
            <div className={s.phoneNum}>+66 2 142 6885</div>
            <div className={s.timeWrap}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>จ.-ศ. เวลา 08:30 น. - 16:30 น. (Office Hours)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={s.bottomBar}>
          <div className={s.bottomLeft}>
            <span>Copyright © 2026, All Right Reserved. NCSA | National Cyber Security Agency</span>
          </div>
          <div className={s.bottomRight}>
            <a href="https://ncsa.or.th" target="_blank" rel="noopener noreferrer" className={s.bottomLink}>NCSA Website</a>
            <a href="https://www.nist.gov" target="_blank" rel="noopener noreferrer" className={s.bottomLink}>NIST Standards</a>
            <a href="https://www.ncsa.or.th/policy/PrivacyPolicy" target="_blank" rel="noopener noreferrer" className={s.bottomLink}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
