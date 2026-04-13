// ============================================================
// GhCrowd — Simulated Seed Data (Ghana Crowdfunding Platform)
// ============================================================

export const CATEGORIES = [
  { id: 'medical',   label: 'Medical',   color: '#02a95c', bg: '#f4fbf7', emoji: '🏥' },
  { id: 'funeral',   label: 'Funeral',   color: '#494949', bg: '#f5f5f5', emoji: '🕊️' },
  { id: 'education', label: 'Education', color: '#0070e0', bg: '#f0f7ff', emoji: '🎓' },
  { id: 'business',  label: 'Business',  color: '#f59e0b', bg: '#fffbeb', emoji: '💼' },
  { id: 'emergency', label: 'Emergency', color: '#eb0000', bg: '#fff0f0', emoji: '🆘' },
  { id: 'community', label: 'Community', color: '#7c3aed', bg: '#f5f3ff', emoji: '🤝' },
];

export const USERS = [
  {
    id: 'user-001',
    role: 'user',
    name: 'Ama Mensah',
    email: 'ama.mensah@gmail.com',
    phone: '+233 24 567 8901',
    avatar: 'AM',
    avatarColor: '#0B4D2B',
    location: 'East Legon, Accra',
    joinedAt: '2023-08-12',
    totalDonated: 1420,
    totalRaised: 8500,
    campaigns: ['camp-003', 'camp-007'],
    donations: ['don-001','don-004','don-009'],
  },
  {
    id: 'agent-001',
    role: 'agent',
    name: 'Kofi Boateng',
    email: 'kofi.boateng@ghcrowd.com',
    phone: '+233 55 234 5678',
    avatar: 'KB',
    avatarColor: '#7C3AED',
    location: 'Kumasi, Ashanti',
    joinedAt: '2023-05-20',
    totalCommission: 2340,
    campaignsManaged: ['camp-001','camp-002','camp-005'],
    successRate: 87,
  },
  {
    id: 'company-001',
    role: 'company',
    name: 'Hope Foundation Ghana',
    email: 'info@hopefoundation.org.gh',
    phone: '+233 30 291 1234',
    avatar: 'HF',
    avatarColor: '#065F46',
    location: 'Accra, Greater Accra',
    joinedAt: '2023-01-10',
    verified: true,
    totalRaised: 142500,
    campaigns: ['camp-006','camp-008'],
    donorCount: 1847,
    description: 'A registered NGO focused on education and healthcare for vulnerable communities.',
  },
  {
    id: 'admin-001',
    role: 'admin',
    name: 'System Admin',
    email: 'admin@ghcrowd.com',
    phone: '+233 30 000 0001',
    avatar: 'SA',
    avatarColor: '#1E3A5F',
    location: 'GhCrowd HQ, Accra',
    joinedAt: '2023-01-01',
  },
];

export const CAMPAIGNS = [
  {
    id: 'camp-001',
    title: 'Help Akua Fight Breast Cancer',
    shortDesc: 'Akua is a 34-year-old teacher from Tema fighting stage-2 breast cancer. Your support pays for her chemotherapy.',
    story: `My name is Akua Asante. I am a primary school teacher in Tema, and I have dedicated 11 years of my life to educating the children of this community. In October last year, I was diagnosed with stage-2 breast cancer.

The diagnosis came as a shock to my family. My husband is a driver and our combined income barely covers our rent and our three children's school fees. The cost of chemotherapy at Korle Bu Teaching Hospital is beyond what we can raise on our own.

Each cycle of treatment costs GHS 3,200. I need 6 cycles. We have already sold our television and my jewelry to pay for the first cycle. Our church has contributed GHS 1,800. But we are still far short of what I need to complete the treatment my doctors say gives me the best chance of survival.

I am not asking for charity. I am asking for a chance to live — to watch my children grow up, to return to the classroom I love, and to repay this community's kindness for the rest of my life.

Every cedi you give brings me one step closer to seeing my children graduate. God bless you.`,
    category: 'medical',
    target: 25000,
    raised: 16320,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085806/breast_tumyjm.jpg',
    location: 'Tema, Greater Accra',
    creatorId: 'agent-001',
    beneficiary: 'Akua Asante',
    status: 'approved',
    featured: true,
    verified: true,
    createdAt: '2024-02-01',
    daysLeft: 5,
    donorCount: 134,
    updates: [
      { date: '2024-02-15', text: 'Akua completed her second cycle of chemo. Doctors report positive early signs. Thank you!' },
      { date: '2024-02-28', text: 'Cycle 3 begins next week. Your donations are making this possible. She sends her heartfelt gratitude.' },
    ],
    donors: [
      { name: 'Kwame O.', amount: 500, date: '2024-02-28', message: 'Praying for your full recovery, Akua! 🙏' },
      { name: 'Anonymous', amount: 200, date: '2024-02-27', message: 'Stay strong' },
      { name: 'Abena M.', amount: 1000, date: '2024-02-26', message: 'From one teacher to another — we stand with you.' },
      { name: 'Ama M.', amount: 150, date: '2024-02-25', message: '' },
      { name: 'Joseph A.', amount: 300, date: '2024-02-24', message: 'God is with you' },
    ],
  },
  {
    id: 'camp-002',
    title: 'Final Journey of Papa Yaw Darko',
    shortDesc: 'The Darko family seeks help to give a dignified burial to their beloved father who passed away last week.',
    story: `Our father, Yaw Kofi Darko, passed away peacefully on February 22nd at the age of 78. Papa, as we all called him, was a retired teacher, a proud Ashanti man, and the rock of our family in Kumasi.

He spent 32 years teaching mathematics at Asante Mampong Secondary School, shaping hundreds of young minds. He was known for his patience, his wisdom, and his infectious laugh.

A proper Ashanti burial is not just a ceremony — it is a sacred farewell, a celebration of a life well lived. It involves family gathering from across the country, traditional rites, and a dignified sendoff. The full cost is approximately GHS 18,000.

As a retired teacher, Papa did not leave behind much financially. We are seven siblings, many of us with our own families to care for. We have pooled together what we can, but we are still GHS 8,000 short.

We are reaching out humbly to friends, well-wishers, and the Ghanaian community everywhere. Papa deserves to rest in dignity. Help us give him the farewell he deserves.

The family of Yaw Kofi Darko.`,
    category: 'funeral',
    target: 18000,
    raised: 14200,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776083653/cvb_touqa8.jpg',
    location: 'Kumasi, Ashanti',
    creatorId: 'agent-001',
    beneficiary: 'Darko Family',
    status: 'approved',
    featured: false,
    verified: true,
    createdAt: '2024-02-22',
    daysLeft: 7,
    donorCount: 89,
    updates: [
      { date: '2024-02-26', text: 'We have reached 78% of our goal. The burial is scheduled for March 8th. Thank you all so much.' },
    ],
    donors: [
      { name: 'Eric D.', amount: 800, date: '2024-02-27', message: 'Uncle Yaw taught me. He was the best. May he rest well.' },
      { name: 'Anonymous', amount: 1000, date: '2024-02-26', message: '' },
      { name: 'Maame A.', amount: 500, date: '2024-02-25', message: 'Condolences to the family 🙏' },
      { name: 'Old Boys AMASS', amount: 2000, date: '2024-02-24', message: 'From the Class of 1998 — rest well, Sir.' },
    ],
  },
  {
    id: 'camp-003',
    title: 'Send Kwame to University of Ghana',
    shortDesc: 'Kwame scored 7As in WASSCE but cannot afford university fees. Help this brilliant student reach his potential.',
    story: `My name is Kwame Asiedu. I am 18 years old, from a small town near Koforidua in Eastern Region. Last year I sat for my WASSCE examinations and scored 7 As — a result that made my mother weep with joy.

I have been offered admission to study Computer Science at the University of Ghana, Legon. This has been my dream since I was 12 years old, when our school got its first computer lab and I realized I wanted to build technology that helps people.

My mother is a seamstress. My father passed away when I was 9. My mother has raised me and my two sisters alone. She earns approximately GHS 1,200 per month. University fees and living expenses for one year come to GHS 14,000 — more than she earns in a year.

I have applied for several scholarships with no success yet. I have taken every small job I can find. But time is running out — I must pay my first semester fees within the next 3 weeks or lose my admission.

I don't want to lose this chance. Please help me get to Legon. I promise to work hard and give back to this country.`,
    category: 'education',
    target: 14000,
    raised: 6300,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085605/rtr_pzhirr.jpg',
    location: 'Koforidua, Eastern Region',
    creatorId: 'user-001',
    beneficiary: 'Kwame Asiedu',
    status: 'approved',
    featured: true,
    verified: false,
    createdAt: '2024-01-28',
    daysLeft: 14,
    donorCount: 47,
    updates: [
      { date: '2024-02-14', text: 'Kwame wanted to say thank you personally. He passed his Legon screening test this week!' },
    ],
    donors: [
      { name: 'Prof. K. Mensah', amount: 500, date: '2024-02-27', message: 'Education changes lives. Keep pushing, young man.' },
      { name: 'Ama M.', amount: 200, date: '2024-02-25', message: '7 As is no joke. You deserve this 💪' },
      { name: 'GH Abroad Alumni', amount: 1000, date: '2024-02-20', message: 'From Ghanaians in the diaspora — we got you.' },
    ],
  },
  {
    id: 'camp-004',
    title: "Afia's Kente Weaving Business Expansion",
    shortDesc: "Help Afia buy two more looms to expand her kente weaving workshop and employ 4 more women in her village.",
    story: `My name is Afia Owusu. I am a 29-year-old kente weaver from Bonwire — the village known as the birthplace of kente in Ghana.

I started weaving at age 14, learning from my grandmother. Four years ago, I started my own small workshop with one loom. Today I have 3 looms and employ 5 women from my community. We supply kente to stores in Accra and Kumasi, and I recently received an order from a Ghanaian-American boutique in New York.

To fulfil the New York order and future export demand, I need 2 more industrial looms. Each costs GHS 4,500. I also need working capital for silk thread and dyes — approximately GHS 3,000.

Total needed: GHS 12,000.

With this investment, I can hire 4 more women, double our production, and build something that keeps our cultural heritage alive while feeding families.

This is not just business. It is culture, it is community, it is the identity of Bonwire. Please help us grow.`,
    category: 'business',
    target: 12000,
    raised: 4100,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097719/slide3_npuvnt.jpg',
    location: 'Bonwire, Ashanti',
    creatorId: 'user-001',
    beneficiary: 'Afia Owusu',
    status: 'approved',
    featured: false,
    verified: false,
    createdAt: '2024-02-10',
    daysLeft: 12,
    donorCount: 28,
    updates: [],
    donors: [
      { name: 'Diaspora Roots', amount: 800, date: '2024-02-22', message: 'Keep our culture alive 🇬🇭' },
      { name: 'Anonymous', amount: 300, date: '2024-02-20', message: 'Best of luck Afia' },
    ],
  },
  {
    id: 'camp-005',
    title: 'Kidney Dialysis Fund for Uncle Kofi',
    shortDesc: 'Kofi Ntim, 58, needs 3 dialysis sessions per week at a cost his family simply cannot sustain.',
    story: `Kofi Ntim is my uncle. He is 58 years old, a retired police officer who served Ghana for 26 years. He was diagnosed with end-stage kidney disease (ESKD) in December 2023.

His doctors at 37 Military Hospital have prescribed 3 dialysis sessions per week as the only way to keep him alive while he waits for a potential kidney transplant. Each session costs GHS 650. That is GHS 7,800 per month — more than his police pension of GHS 2,400.

My uncle gave his best years to protecting this country. He never complained. He never asked for anything. Now his kidneys have failed, and the system that he served has no safety net for him.

We, his family, are contributing everything we can. His children are young and still in school. His wife is a trader. We are stretched to our limits.

We are asking for help to cover 6 months of dialysis while we explore transplant options. GHS 46,800 in total. Every contribution, no matter how small, keeps my uncle alive.

Please share this widely. Please give if you can.

— Nana Kofi (nephew)`,
    category: 'medical',
    target: 46800,
    raised: 26700,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085965/kidney_b93bcz.jpg',
    location: 'Accra, Greater Accra',
    creatorId: 'agent-001',
    beneficiary: 'Kofi Ntim',
    status: 'approved',
    featured: true,
    verified: true,
    createdAt: '2024-01-20',
    daysLeft: 8,
    donorCount: 203,
    updates: [
      { date: '2024-02-01', text: 'Uncle Kofi has completed his 12th dialysis session. His condition is stable. Doctors are encouraged.' },
      { date: '2024-02-18', text: 'We have passed 50% of our goal! A transplant evaluation is scheduled for March 15.' },
    ],
    donors: [
      { name: 'Ghana Police Officers Union', amount: 5000, date: '2024-02-27', message: 'We do not forget our own. Get well, Inspector Ntim.' },
      { name: 'Anonymous', amount: 2000, date: '2024-02-26', message: '' },
      { name: 'Emmanuel K.', amount: 500, date: '2024-02-25', message: 'Prayers from London 🙏' },
      { name: 'Dr. Abena F.', amount: 1000, date: '2024-02-24', message: 'From one healthcare worker to another — stay strong.' },
    ],
  },
  {
    id: 'camp-006',
    title: 'Rebuild Nkoranza Community School',
    shortDesc: 'A fire destroyed 4 classrooms serving 680 children. Hope Foundation is raising funds to rebuild.',
    story: `On the night of January 14th, a fire swept through the Nkoranza Presbyterian Primary School in the Bono East Region, destroying 4 of the school's 6 classrooms. 680 children are now learning in shifts under a tree and in borrowed church halls.

Hope Foundation Ghana has committed to rebuilding the school fully. We have already secured building materials for 2 classrooms through our operational budget. We are raising funds to complete the remaining 2 classrooms, install proper roofing, and replace destroyed furniture and learning materials.

Breakdown of funds needed:
• 2 classroom blocks: GHS 62,000
• Roofing and windows: GHS 18,000
• Desks, chairs, blackboards: GHS 14,000
• Textbooks and supplies: GHS 6,000
Total: GHS 100,000

Construction begins April 1st. Your donation means 680 children return to a proper school before the next academic term.

We are a registered NGO (Reg. No. DSW/RA/A.21/Vol.3/53) and will provide full financial reports to all donors above GHS 500.`,
    category: 'community',
    target: 100000,
    raised: 71400,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097721/slide4_yukxzd.jpg',
    location: 'Nkoranza, Bono East',
    creatorId: 'company-001',
    beneficiary: 'Nkoranza Presbyterian Primary School',
    status: 'approved',
    featured: true,
    verified: true,
    createdAt: '2024-01-18',
    daysLeft: 3,
    donorCount: 512,
    updates: [
      { date: '2024-02-02', text: 'Site clearing completed. Foundation work begins Monday Feb 5.' },
      { date: '2024-02-20', text: 'Classroom 1 & 2 foundations laid! We are on track. Photos uploaded to our website.' },
    ],
    donors: [
      { name: 'Accra Business Club', amount: 10000, date: '2024-02-27', message: 'Education first. Proud to support.' },
      { name: 'Anonymous', amount: 5000, date: '2024-02-26', message: '' },
      { name: 'GH Teachers Union', amount: 8000, date: '2024-02-20', message: 'Every child deserves a classroom.' },
      { name: 'Diaspora for Ghana', amount: 15000, date: '2024-02-15', message: 'From Ghanaians in the UK 🇬🇧🇬🇭' },
    ],
  },
  {
    id: 'camp-007',
    title: 'Scholarship for the Asantewaa Twins',
    shortDesc: 'Twin sisters Esi and Efua both got into KNUST but their single mother cannot afford two sets of fees.',
    story: `Esi and Efua Asantewaa are 19-year-old twins from Sunyani. They are remarkable — both scored distinctions in WASSCE, both got admission to KNUST, and both want to study engineering to build infrastructure in Ghana's Northern regions.

Their mother, Madam Joyce Asantewaa, is a market trader who raised them alone after their father passed away in 2018. She earns about GHS 1,800 per month selling tomatoes and peppers at Sunyani market.

University fees for both girls is GHS 22,000 per year — over 12 months of their mother's entire income, before food, rent, or other expenses.

Esi and Efua have asked us to clarify: this fundraiser is for their first year only. They are actively applying for KNUST scholarship programs for subsequent years. They simply need to get started.

They are bright, determined, and humble. They have never asked for anything. Please give them the chance they have earned through their own hard work.

A donation of any size from you could be the thing these two girls tell their children about someday.`,
    category: 'education',
    target: 22000,
    raised: 13800,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097707/slide1_lmjqg2.jpg',
    location: 'Sunyani, Bono Region',
    creatorId: 'user-001',
    beneficiary: 'Esi & Efua Asantewaa',
    status: 'approved',
    featured: true,
    verified: false,
    createdAt: '2024-02-05',
    daysLeft: 11,
    donorCount: 98,
    updates: [
      { date: '2024-02-25', text: 'Esi and Efua say thank you from the bottom of their hearts. They are studying hard and waiting for the fees to be settled.' },
    ],
    donors: [
      { name: 'KNUST Alumni Assoc.', amount: 3000, date: '2024-02-26', message: 'Welcome to the KNUST family! 🏫' },
      { name: 'Ama M.', amount: 300, date: '2024-02-25', message: 'Ghana needs more women engineers!' },
      { name: 'Anonymous', amount: 1000, date: '2024-02-22', message: 'Go well' },
    ],
  },
  {
    id: 'camp-008',
    title: 'Emergency Relief: Accra Flood Victims',
    shortDesc: 'Heavy rains flooded 3 communities in Accra, displacing 2,000 residents. Hope Foundation needs funds for food and shelter.',
    story: `On the night of February 19th, heavy rains caused severe flooding across Adabraka, Alajo, and Sukura communities in Accra. Over 2,000 residents were displaced. Homes were submerged. Families lost everything.

Hope Foundation Ghana mobilized within 12 hours. Our teams are on the ground providing water, food, and basic shelter materials. But the scale of the disaster is beyond what our emergency fund can cover.

We need to provide:
• Emergency food parcels for 400 families: GHS 32,000
• Tarpaulins and shelter kits: GHS 18,000
• Clean water and sanitation: GHS 12,000
• Medical outreach for flood-related illness: GHS 8,000
• Logistics and volunteers: GHS 5,000
Total: GHS 75,000

This is urgent. People are sleeping outside. Children have missed a week of school. We have already spent GHS 24,000 from reserves.

100% of donations go directly to relief operations. We publish weekly reports at hopefoundation.org.gh/flood-relief.

Time is critical. Please donate and please share.`,
    category: 'emergency',
    target: 75000,
    raised: 63200,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097120/slide2_e1m7pp.jpg',
    location: 'Accra, Greater Accra',
    creatorId: 'company-001',
    beneficiary: 'Flood victims in Adabraka, Alajo, Sukura',
    status: 'approved',
    featured: true,
    verified: true,
    createdAt: '2024-02-20',
    daysLeft: 10,
    donorCount: 634,
    updates: [
      { date: '2024-02-21', text: 'Day 1: 200 food parcels distributed. Teams in all 3 communities.' },
      { date: '2024-02-24', text: 'Day 4: Shelter kits deployed for 150 families. Water tankers in place.' },
      { date: '2024-02-27', text: 'Day 7: 84% of funds committed. Medical outreach reached 320 people. Still more to do.' },
    ],
    donors: [
      { name: 'Telecel Ghana', amount: 20000, date: '2024-02-22', message: 'Corporate solidarity with Accra families.' },
      { name: 'Anonymous', amount: 5000, date: '2024-02-21', message: '' },
      { name: 'NADMO (matched)', amount: 10000, date: '2024-02-21', message: 'NADMO matched donation through GhCrowd.' },
    ],
  },
  {
    id: 'camp-009',
    title: 'New Dialysis Machine for Ridge Hospital',
    shortDesc: 'Ridge Hospital serves thousands but their only dialysis machine is broken. Help save lives today.',
    story: `Ridge Hospital in Accra serves over 40,000 outpatients per year. Their nephrology unit is the only public-sector dialysis facility serving the entire Greater Accra Region.

Their primary dialysis machine broke down on February 10th. It has not been repaired. Patients who depend on this machine for life-sustaining treatment are being turned away or referred to private facilities at costs they cannot afford.

We — a group of medical professionals and concerned citizens — are raising funds to purchase a new Fresenius dialysis machine (GHS 38,000) and cover one year of maintenance and consumables (GHS 12,000).

Total: GHS 50,000.

This is not charity. This is infrastructure. This is the basic equipment a public hospital in Ghana's capital should have. Help us make it happen.`,
    category: 'medical',
    target: 50000,
    raised: 18900,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085965/kidney_b93bcz.jpg',
    location: 'Accra, Greater Accra',
    creatorId: 'user-001',
    beneficiary: 'Ridge Hospital Nephrology Unit',
    status: 'pending',
    featured: false,
    verified: false,
    createdAt: '2024-02-24',
    daysLeft: 60,
    donorCount: 45,
    updates: [],
    donors: [
      { name: 'Ghana Medical Assoc.', amount: 5000, date: '2024-02-26', message: 'We stand with Ridge Hospital.' },
      { name: 'Anonymous', amount: 2000, date: '2024-02-25', message: '' },
    ],
  },
  {
    id: 'camp-010',
    title: 'Football Academy for Boys of Nima',
    shortDesc: 'Give 30 talented boys from Nima the training, equipment, and platform to chase their dream of professional football.',
    story: `Nima is a vibrant community in Accra. It is also a community where many talented young men have no structured pathway to develop their potential in football — Africa's most powerful dream-maker.

I am Emmanuel Ayisi, a retired Black Stars under-20 player. I have been coaching boys in Nima for free on a gravel pitch for the past two years. I have identified 30 boys aged 12–17 with genuine professional potential.

I need funding to:
• Register the academy with GFA: GHS 3,000
• Procure boots, kits, and training equipment: GHS 8,000
• Rent proper training ground for 6 months: GHS 6,000
• Pay qualified assistant coaches: GHS 4,000
• Enter under-17 league: GHS 2,000
Total: GHS 23,000

Football gave me a way out. I want to give these boys the same chance. Please help.`,
    category: 'community',
    target: 23000,
    raised: 7200,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097110/slide5_pndb9r.jpg',
    location: 'Nima, Accra',
    creatorId: 'user-001',
    beneficiary: 'Nima Football Academy',
    status: 'pending',
    featured: false,
    verified: false,
    createdAt: '2024-02-26',
    daysLeft: 50,
    donorCount: 34,
    updates: [],
    donors: [
      { name: 'Kweku F.', amount: 500, date: '2024-02-27', message: 'Nima to the world! 🌍' },
      { name: 'Anonymous', amount: 200, date: '2024-02-26', message: 'Go boys!' },
    ],
  },
  {
    id: 'camp-011',
    title: 'Life-Saving Heart Surgery for Baby Sena',
    shortDesc: 'Sena is only 8 months old and was born with a hole in her heart. She needs urgent surgery outside Ghana.',
    story: `Baby Sena was born a fighter, but she is facing a battle no infant should. Diagnosed with a Ventricular Septal Defect (VSD), her heart is working twice as hard just to keep her breathing. 

Her doctors at the National Cardiothoracic Centre have recommended surgery at a specialized facility in India. The total cost, including travel and post-operative care, is GHS 180,000. Every cedi you give brings her one step closer to her first birthday.`,
    category: 'medical',
    target: 180000,
    raised: 38150,
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085806/breast_tumyjm.jpg',
    location: 'Ho, Volta Region',
    creatorId: 'agent-001',
    beneficiary: 'Sena Dogbe',
    status: 'approved',
    featured: true,
    verified: true,
    createdAt: '2024-03-01',
    daysLeft: 45,
    donorCount: 132,
    updates: [],
    donors: [{ name: 'Anonymous', amount: 5000, date: '2024-03-02', message: 'Get well soon little angel.' }],
  },
];

export const BLOG_POSTS = [
  {
    id: 'blog-001',
    title: 'How Nkabom Fund is Changing Lives in Rural Ghana',
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097707/slide1_lmjqg2.jpg',
    date: 'March 15, 2024',
    category: 'Impact',
    excerpt: 'Read about the incredible stories of resilience and community support making a difference in remote villages.',
    link: '#'
  },
  {
    id: 'blog-002',
    title: '5 Tips for a Successful Nkabom Fund Campaign',
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097719/slide3_npuvnt.jpg',
    date: 'March 10, 2024',
    category: 'Tips & Guides',
    excerpt: 'Maximize your fundraising potential with these expert strategies and best practices.',
    link: '#'
  },
  {
    id: 'blog-003',
    title: 'Meet the Nkabom Fund Agents: Your Local Fundraising Partners',
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097721/slide4_yukxzd.jpg',
    date: 'March 01, 2024',
    category: 'Community',
    excerpt: 'Discover how our dedicated agents are helping individuals and organizations achieve their goals.',
    link: '#'
  },
];

export const TRANSACTIONS = [
  { id: 'txn-001', campaignId: 'camp-001', donor: 'Kwame O.', amount: 500, method: 'MTN MoMo', date: '2024-02-28', status: 'completed' },
  { id: 'txn-002', campaignId: 'camp-001', donor: 'Anonymous', amount: 200, method: 'Card', date: '2024-02-27', status: 'completed' },
  { id: 'txn-003', campaignId: 'camp-002', donor: 'Old Boys AMASS', amount: 2000, method: 'MTN MoMo', date: '2024-02-24', status: 'completed' },
  { id: 'txn-004', campaignId: 'camp-003', donor: 'GH Abroad Alumni', amount: 1000, method: 'Card', date: '2024-02-20', status: 'completed' },
  { id: 'txn-005', campaignId: 'camp-005', donor: 'Ghana Police Officers Union', amount: 5000, method: 'Bank Transfer', date: '2024-02-27', status: 'completed' },
  { id: 'txn-006', campaignId: 'camp-006', donor: 'Diaspora for Ghana', amount: 15000, method: 'Card', date: '2024-02-15', status: 'completed' },
  { id: 'txn-007', campaignId: 'camp-008', donor: 'Telecel Ghana', amount: 20000, method: 'Bank Transfer', date: '2024-02-22', status: 'completed' },
  { id: 'txn-008', campaignId: 'camp-008', donor: 'NADMO (matched)', amount: 10000, method: 'Bank Transfer', date: '2024-02-21', status: 'completed' },
];

export const PLATFORM_STATS = {
  totalRaised: 268670,
  activeCampaigns: 8,
  totalDonors: 1941,
  successRate: 74,
  monthlyGrowth: 23,
  avgDonation: 187,
};

export const MONTHLY_DATA = [
  { month: 'Aug', raised: 18200, donors: 124 },
  { month: 'Sep', raised: 24100, donors: 178 },
  { month: 'Oct', raised: 31500, donors: 230 },
  { month: 'Nov', raised: 28900, donors: 198 },
  { month: 'Dec', raised: 42700, donors: 312 },
  { month: 'Jan', raised: 56300, donors: 401 },
  { month: 'Feb', raised: 71400, donors: 534 },
];

export const AI_IMPROVED_STORIES = {
  'camp-003': `Kwame Asiedu is 18 years old, and he just achieved something extraordinary: 7 A grades in his WASSCE examinations, earning him a coveted place to study Computer Science at the University of Ghana, Legon.

But brilliance alone does not pay fees.

Kwame's mother is a seamstress in Koforidua. She raised him and his two sisters alone after losing her husband when Kwame was just nine. Every cedi she earns goes toward keeping a roof over their heads and food on the table. There is nothing left for the GHS 14,000 that stands between Kwame and his future.

If he cannot pay in three weeks, he loses his admission.

Three weeks is all he has.

Kwame wants to build technology that solves real problems in Ghana. He has the grades, the drive, and the acceptance letter. He is missing only one thing: financial support from people who believe in what Ghana's young people can achieve.

A donation of any amount — GHS 20, GHS 100, GHS 1,000 — moves this young man one step closer to Legon and one step closer to the engineer Ghana deserves.

Please give. Please share. Let's make sure talent wins.`,

  'camp-004': `In the village of Bonwire — birthplace of Ghana's most sacred textile — 29-year-old Afia Owusu is quietly building something remarkable.

She learned to weave kente from her grandmother at age 14. At 25, she started her own workshop with a single loom. Today she employs 5 women from her community, her work graces boutiques in Accra and Kumasi, and she just received her first international order from a Ghanaian-American fashion brand in New York.

Now Afia stands at a crossroads.

Two more looms, a supply of silk thread, and vibrant dyes — totalling GHS 12,000 — would allow her to double production, hire four more women, and fulfil orders that could put Bonwire kente on the global stage.

This is not just about one business. It is about keeping a 400-year-old cultural tradition alive and profitable. It is about women in rural Ghana having dignified, skilled, well-paid work. It is about Ghanaian creativity reaching the world.

Help Afia grow. Help kente endure. Help Bonwire thrive.`
};

export const formatGHS = (amount) => {
  return `₵${amount.toLocaleString('en-GH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const getProgressPercent = (raised, target) => {
  return Math.min(Math.round((raised / target) * 100), 100);
};

export const getCategoryStyle = (categoryId) => {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat || CATEGORIES[0];
};
