/**
 * Starter knowledge base content for the admissions/fees agent.
 * This is exactly what non-technical staff manage from /knowledge-base —
 * the agent is only ever allowed to answer FAQ-intent questions from what's
 * retrieved here, so keep answers factual, current, and specific.
 */

export const kbSeedData = [
  // ── Fees ────────────────────────────────────────────────────────────
  {
    category: "Fees",
    question: "How much is the Term 1 fee for Primary?",
    answer: "Term 1 fees for Primary 1–6 are ₦180,000, due before the resumption date printed on the school calendar.",
  },
  {
    category: "Fees",
    question: "How much is the Term 1 fee for Secondary?",
    answer: "Term 1 fees for JSS1–SS3 are ₦230,000, due before the resumption date printed on the school calendar.",
  },
  {
    category: "Fees",
    question: "Is there a fee for Nursery/Kindergarten?",
    answer: "Nursery and Kindergarten Term 1 fees are ₦150,000, which includes feeding and the daily creche bus.",
  },
  {
    category: "Fees",
    question: "Do fees cover textbooks and uniforms?",
    answer: "No. Tuition fees do not include textbooks, uniforms, or the school bus service — these are billed separately, and details are on the Admissions checklist sent after enrollment.",
  },
  {
    category: "Fees",
    question: "Is there a discount for siblings?",
    answer: "Yes, families with more than one child enrolled receive a 10% discount on tuition for the second child and every child after that.",
  },
  {
    category: "Fees",
    question: "Can I pay fees in installments?",
    answer: "Yes, fees can be split into two installments per term: 60% before resumption and the remaining 40% by the fourth week of term. A signed installment agreement is required from the Bursar's office.",
  },
  {
    category: "Fees",
    question: "What payment methods do you accept?",
    answer: "We accept bank transfer, Paystack card payment through the parent portal, and POS payment at the Bursar's office. We do not accept cash payments above ₦50,000.",
  },
  {
    category: "Fees",
    question: "What happens if fees are paid late?",
    answer: "A late payment attracts a 5% surcharge after the second week of term, and the child may not be permitted into class after the fourth week until fees are cleared or a payment plan is agreed with the Bursar.",
  },
  {
    category: "Fees",
    question: "Do you offer scholarships or fee waivers?",
    answer: "A limited number of merit-based partial scholarships are available for Secondary students based on the entrance exam score. Applications open at the start of Term 3 each year for the following academic year.",
  },
  {
    category: "Fees",
    question: "Is the acceptance fee refundable?",
    answer: "The ₦50,000 acceptance fee secures your child's admission slot and is non-refundable, but it is deducted from your first term's tuition invoice.",
  },

  // ── Admissions ──────────────────────────────────────────────────────
  {
    category: "Admissions",
    question: "What documents do I need to apply?",
    answer: "You'll need the child's birth certificate, the last school's report card (last 2 terms), 2 recent passport photographs, and immunization records.",
  },
  {
    category: "Admissions",
    question: "What is the entry age for Primary 1?",
    answer: "A child must turn 6 years old on or before September 30th of the admission year to be eligible for Primary 1.",
  },
  {
    category: "Admissions",
    question: "Is there an entrance exam?",
    answer: "Yes. Primary 2 and above sit a short English and Maths assessment; Secondary applicants sit a full entrance exam covering English, Maths, and Basic Science.",
  },
  {
    category: "Admissions",
    question: "How long does the admission process take?",
    answer: "From tour to enrollment, the process typically takes 1–2 weeks: entrance assessment results are usually released within 5 working days, and a decision letter follows within 2 working days after that.",
  },
  {
    category: "Admissions",
    question: "Can I apply if we're relocating from another city or country?",
    answer: "Yes — we accept remote applications. The entrance assessment can be proctored virtually, and the tour can be done via a recorded video walkthrough on request.",
  },
  {
    category: "Admissions",
    question: "Do you accept mid-term transfers?",
    answer: "Mid-term transfers are considered on a case-by-case basis, subject to space availability in the child's grade level and a review of their most recent report card.",
  },
  {
    category: "Admissions",
    question: "What is the maximum class size?",
    answer: "Class sizes are capped at 25 pupils for Primary and 30 students for Secondary, each with a dedicated form teacher.",
  },
  {
    category: "Admissions",
    question: "Do you have a waiting list?",
    answer: "When a grade level is full, qualifying applicants are placed on a waiting list in order of application date and contacted immediately if a space opens.",
  },

  // ── Tours & Visits ──────────────────────────────────────────────────
  {
    category: "Tours",
    question: "What happens during a school tour?",
    answer: "Tours run about 45 minutes: a walkthrough of classrooms, the library, and sports facilities, followed by a short Q&A with an admissions officer. Children are welcome to come along.",
  },
  {
    category: "Tours",
    question: "What days and times are tours available?",
    answer: "Tours run Monday to Friday, 9:00 AM to 3:00 PM, by appointment. Weekend tours can be arranged for families traveling from out of town.",
  },
  {
    category: "Tours",
    question: "Do I need to pay to book a tour?",
    answer: "No, school tours are completely free and don't require any commitment to apply.",
  },

  // ── Uniform & Supplies ──────────────────────────────────────────────
  {
    category: "Uniform",
    question: "Where do I buy the school uniform?",
    answer: "Uniforms are sold at the school's approved supplier, Beacon Uniforms, located at the school gate every Monday, Wednesday, and Friday from 8 AM to 1 PM, or by appointment.",
  },
  {
    category: "Uniform",
    question: "Is PE kit compulsory?",
    answer: "Yes, the PE kit (branded polo, shorts/track pants, and white sneakers) is compulsory for all students and worn on their assigned sports day.",
  },
  {
    category: "Uniform",
    question: "What's on the school supplies list?",
    answer: "A grade-specific supplies list is emailed to every enrolled family two weeks before resumption, and is also available at the Admissions office on request.",
  },

  // ── Transport ───────────────────────────────────────────────────────
  {
    category: "Transport",
    question: "Do you provide a school bus service?",
    answer: "Yes, bus routes cover most parts of the city. Bus fees are billed per term and vary by distance zone — the Bursar's office can confirm the fee for your specific address.",
  },
  {
    category: "Transport",
    question: "Can I register for the bus mid-term?",
    answer: "Yes, bus registration is accepted at any point in the term, prorated for the remaining weeks, subject to seat availability on your route.",
  },

  // ── Academics ───────────────────────────────────────────────────────
  {
    category: "Academics",
    question: "What curriculum do you follow?",
    answer: "We follow the Nigerian national curriculum enriched with a Cambridge-aligned international syllabus for English, Maths, and Science from Primary 4 upward.",
  },
  {
    category: "Academics",
    question: "Do you prepare students for Common Entrance or WAEC?",
    answer: "Yes, Primary 6 pupils are prepared for the Common Entrance examination, and Secondary students are prepared for BECE and WAEC/NECO as appropriate to their level.",
  },
  {
    category: "Academics",
    question: "What extracurricular activities are available?",
    answer: "We offer football, basketball, swimming, chess club, debate club, coding club, and a music program with instrument lessons, all included in the term's activity fee.",
  },
  {
    category: "Academics",
    question: "How often are report cards issued?",
    answer: "Report cards are issued at the end of every term, with a mid-term progress note sent to parents in week 6 for all grade levels.",
  },

  // ── Health & Safety ─────────────────────────────────────────────────
  {
    category: "Health & Safety",
    question: "Is there a school nurse or clinic?",
    answer: "Yes, a qualified nurse is on-site every school day from 8 AM to 4 PM, and a doctor visits weekly for routine check-ups.",
  },
  {
    category: "Health & Safety",
    question: "What is the policy on food allergies?",
    answer: "Please inform the Admissions office of any allergies during enrollment — the school kitchen maintains an allergen log and can accommodate most common allergies with advance notice.",
  },
  {
    category: "Health & Safety",
    question: "What security measures are in place?",
    answer: "The campus has a manned gate with visitor sign-in, CCTV coverage across common areas, and a parent pick-up card system — children are only released to an authorized, ID-verified adult.",
  },

  // ── School Calendar & Hours ─────────────────────────────────────────
  {
    category: "Calendar",
    question: "What are the school hours?",
    answer: "Primary school runs 8:00 AM to 2:30 PM, and Secondary school runs 8:00 AM to 3:15 PM, Monday to Friday.",
  },
  {
    category: "Calendar",
    question: "When does the next term begin?",
    answer: "Please check the current school calendar posted on the parent portal for exact resumption dates, as these are updated at the start of each academic year.",
  },
];
