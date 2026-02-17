window.ASSESSMENT = {
  title: "แบบประเมินสถานะความมั่นคงปลอดภัยเว็บไซต์",
  description: "ประเมินตาม Checklist มาตรฐานการรักษาความมั่นคงปลอดภัยสำหรับเว็บไซต์",
  requireAllAnswers: true,

  scoringScale: [
    { label: "ยังไม่ได้ดำเนินการ", points: 0 },
    { label: "อยู่ในระหว่างดำเนินการ", points: 1 },
    { label: "ดำเนินการแล้ว", points: 2 }
  ],

  // Total score (percentage) ปรับแก้คำแนะนำให้เหมาะสม
  recommendations: [
    {
      min: 0, max: 39,
      label: "ความเสี่ยงสูง",
      badgeClass: "bad",
      items: [
        "เร่งจัดทำแผนแก้ไขและจัดลำดับความสำคัญตามความเสี่ยง",
        "ดำเนินการ Gap Analysis เชิงลึกและกำหนดผู้รับผิดชอบ/กรอบเวลา",
        "ยกระดับการติดตามผลและรายงานผู้บริหาร"
      ]
    },
    {
      min: 40, max: 74,
      label: "ความเสี่ยงปานกลาง",
      badgeClass: "warn",
      items: [
        "ปิดช่องว่างในประเด็นที่ยังไม่สมบูรณ์ โดยโฟกัส Part ที่ได้คะแนนต่ำ",
        "เพิ่มความถี่การทบทวน/ตรวจประเมิน และเสริมหลักฐานการปฏิบัติ",
        "พิจารณา VA/PT เพิ่มเติมในบริการสำคัญ"
      ]
    },
    {
      min: 75, max: 100,
      label: "อยู่ในเกณฑ์ดี",
      badgeClass: "ok",
      items: [
        "รักษามาตรฐานและปรับปรุงอย่างต่อเนื่อง",
        "จัดทำหลักฐานให้พร้อมสำหรับการตรวจประเมินภายนอก",
        "ฝึกซ้อม IR/BCP อย่างสม่ำเสมอ"
      ]
    }
  ],

  // Parts 1–11 
  parts: [
    {
      id: "p1",
      title: "Part 1",
      description: "Organization Context (5.1)",
      questions: [
        { id: "5_1_1", text: "หน่วยงานมีการสำรวจและทำความเข้าใจบริบทขององค์กรที่เกี่ยวข้องกับการจัดการความเสี่ยงเว็บไซต์ (5.1.1)" }
      ]
    },
    {
      id: "p2",
      title: "Part 2",
      description: "Website Security Policies (5.2)",
      questions: [
        { id: "5_2_1", text: "หน่วยงานกำหนดนโยบายความมั่นคงปลอดภัยสำหรับเว็บไซต์ตามบริบทองค์กร มีการสื่อสารและบังคับใช้ (5.2.1)" },
        { id: "5_2_2", text: "หน่วยงานทบทวน/ปรับปรุง/สื่อสาร/บังคับใช้นโยบายเว็บไซต์ให้ทันต่อภัยคุกคาม เทคโนโลยี และภารกิจ (5.2.2)" }
      ]
    },
    {
      id: "p3",
      title: "Part 3",
      description: "Risk Management Strategy (5.3)",
      questions: [
        { id: "5_3_1", text: "หน่วยงานมีวัตถุประสงค์และกรอบการบริหารความเสี่ยงด้านเว็บไซต์เป็นลายลักษณ์อักษร (5.3.1)" },
        { id: "5_3_2", text: "มีการประเมินความเสี่ยงตามแนวทาง/คำแนะนำที่เกี่ยวข้อง (กรณีเข้าเงื่อนไข CII) (5.3.2)" },
        { id: "5_3_3", text: "มี Risk Register, Risk Appetite/Tolerance และติดตามให้ความเสี่ยงอยู่ในเกณฑ์ที่ยอมรับได้ (5.3.3)" }
      ]
    },
    {
      id: "p4",
      title: "Part 4",
      description: "Roles & Responsibilities (5.4)",
      questions: [
        { id: "5_4_1", text: "มีโครงสร้างองค์กรถ่วงดุล กำหนดบทบาท/อำนาจ/ความรับผิดชอบชัดเจน (แนวคิด Three Lines of Defense) (5.4.1)" },
        { id: "5_4_2", text: "กำหนดผู้รับผิดชอบจัดทำ/บริหารเว็บไซต์และความมั่นคงปลอดภัยเว็บไซต์อย่างต่อเนื่อง (5.4.2)" },
        { id: "5_4_3", text: "สื่อสาร ทำความเข้าใจ และบังคับใช้บทบาท/อำนาจ รวมถึงจัดสรรทรัพยากรเพียงพอ (5.4.3)" }
      ]
    },
    {
      id: "p5",
      title: "Part 5",
      description: "Security Requirements & Baseline (5.5–5.6)",
      questions: [
        { id: "5_5_1", text: "กำหนดวัตถุประสงค์และความต้องการของเว็บไซต์ รวมถึงความต้องการด้านความมั่นคงปลอดภัย (5.5.1)" },
        { id: "5_6_1", text: "มีแนวทางความมั่นคงปลอดภัยระดับพื้นฐานตาม CIA (5.6.1)" },
        { id: "5_6_8", text: "กำหนดแนวทางสำรองข้อมูลเพื่อลดผลกระทบหากเว็บไซต์ถูกโจมตี (5.6.8)" },
        { id: "5_6_9", text: "จัดการ Log Management ให้เป็นไปตามกฎหมายที่เกี่ยวข้อง (5.6.9)" },
        { id: "5_6_10", text: "กำหนดหลักปฏิบัติในการเลิกใช้งานเว็บไซต์/ทำลายข้อมูลอย่างเหมาะสม (5.6.10)" }
      ]
    },
    {
      id: "p6",
      title: "Part 6",
      description: "Identification (6.1)",
      questions: [
        { id: "6_1_asset", text: "มี Asset Management และทะเบียนทรัพย์สิน ทบทวนอย่างน้อยปีละ 1 ครั้ง และอัปเดตเมื่อเปลี่ยนแปลง" },
        { id: "6_1_risk", text: "มี Risk Assessment อย่างน้อยปีละ 1 ครั้งหรือเมื่อมีการเปลี่ยนแปลงสำคัญ และอัปเดต Risk Register" },
        { id: "6_1_vapt", text: "ดำเนินการ Vulnerability Assessment ครอบคลุมบริการสำคัญและองค์ประกอบที่เกี่ยวข้อง" },
        { id: "6_1_pt", text: "พิจารณาดำเนินการ Penetration Testing อย่างน้อยปีละ 1 ครั้งตามความจำเป็น" },
        { id: "6_1_thirdparty", text: "มี Third Party Management และข้อกำหนดด้านความมั่นคงปลอดภัยใน SLA/สัญญา" }
      ]
    },
    {
      id: "p7",
      title: "Part 7",
      description: "Protection – Secure SDLC & Architecture (6.2.1–6.2.3)",
      questions: [
        { id: "6_2_devsecops", text: "กำหนดแนวทางพัฒนา Web Application อย่างมั่นคงปลอดภัย (เช่น DevSecOps) (6.2.1)" },
        { id: "6_2_owasp", text: "พิจารณาปัจจัยเสี่ยง OWASP Top 10 ในการพัฒนา (6.2.2)" },
        { id: "6_2_arch", text: "ออกแบบสถาปัตยกรรมเว็บไซต์อย่างมั่นคงปลอดภัย เช่น segmentation / แยก Web & DB / อุปกรณ์ความปลอดภัย (6.2.3)" }
      ]
    },
    {
      id: "p8",
      title: "Part 8",
      description: "Protection – Controls & Hardening (6.2.4–6.2.6)",
      questions: [
        { id: "6_2_access", text: "มี Access Control / System Hardening / Remote Connection / Removable Media / Information Sharing / Awareness ตามกรอบมาตรฐาน (6.2.4)" },
        { id: "6_2_mfa", text: "พิจารณาใช้ MFA หรือ Digital ID สำหรับการพิสูจน์ตัวตน (6.2.5)" },
        { id: "6_2_baseline_cfg", text: "ตั้งค่า baseline security สำหรับ Web Server, Web App, CMS, OS, Database (6.2.6)" }
      ]
    },
    {
      id: "p9",
      title: "Part 9",
      description: "Protection – Service Selection & Firewall (6.2.7–6.2.8)",
      questions: [
        { id: "6_2_selection", text: "กำหนดแนวทาง/การเลือกบริการที่เกี่ยวข้อง: Web Server, CMS, Domain registrar, TLS Cipher Suite (6.2.7)" },
        { id: "6_2_fw", text: "ตั้งค่า Firewall เพื่อควบคุม/ป้องกันการบุกรุก มี monitoring/logging และอัปเดตสม่ำเสมอ (6.2.8)" }
      ]
    },
    {
      id: "p10",
      title: "Part 10",
      description: "Detection (6.3)",
      questions: [
        { id: "6_3_monitor", text: "มี Cyber Threat Detection & Monitoring สำหรับเว็บไซต์ (6.3.1)" },
        { id: "6_3_review", text: "ทบทวนกลไกและกระบวนการตรวจจับอย่างน้อยปีละ 1 ครั้งตามความเหมาะสม" }
      ]
    },
    {
      id: "p11",
      title: "Part 11",
      description: "Incident Response & Recovery (6.4–6.5)",
      questions: [
        { id: "6_4_irp", text: "มี Website Security Incident Response Plan รวมถึงการสื่อสาร/ฝึกซ้อม/ทบทวน/ปรับปรุง (6.4.1)" },
        { id: "6_4_crisis", text: "มี Crisis Communication Plan สำหรับเหตุการณ์ด้านความมั่นคงปลอดภัยไซเบอร์เว็บไซต์" },
        { id: "6_5_bcp", text: "มี Website Recovery/Resilience และจัดทำ BCP พร้อมฝึกซ้อมอย่างน้อยปีละ 1 ครั้ง (6.5.1)" }
      ]
    }
  ]
};

// Inject scoring choices into every question (so you only edit text above)
(() => {
  const scale = window.ASSESSMENT.scoringScale;
  window.ASSESSMENT.parts.forEach(p => {
    p.questions.forEach(q => {
      q.choices = scale;
    });
  });
})();
