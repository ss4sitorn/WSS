import p1 from './parts/p1.json';
import p2 from './parts/p2.json';
import p3 from './parts/p3.json';
import p4 from './parts/p4.json';
import p5 from './parts/p5.json';
import p6 from './parts/p6.json';
import p7 from './parts/p7.json';
import p8 from './parts/p8.json';
import p9 from './parts/p9.json';
import p10 from './parts/p10.json';
import p11 from './parts/p11.json';
import recommendations from './recommendations.json';

const ASSESSMENT = {
  title: 'WSS Self-Assessment',
  description:
    'แบบประเมินตนเองตามมาตรฐานความมั่นคงปลอดภัยสำหรับเว็บไซต์ (Website Security Standard) — แบบฟอร์ม ค1',
  requireAllAnswers: true,
  parts: [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11],
  recommendations,
};

export default ASSESSMENT;
