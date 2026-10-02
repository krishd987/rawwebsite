/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

/**
 * TEAM DATA STRUCTURE
 * Optimized for WebP images with lazy loading and responsive layouts
 */

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  department: string;
  domain?: string;
  domains?: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
  imageUrl: string;
  category: 'core' | 'mentors' | 'members';
  responsibilities?: string[];
  createdAt?: string;
  hidden?: boolean;
}

export interface Domain {
  id: string;
  name: string;
  head: string;
  headId: string;
  objective: string;
  icon: string;
}

export const domains: Domain[] = [
  {
    id: 'electronics',
    name: 'Electronics & Embedded Team',
    head: 'Parth Sutar',
    headId: 'core3',
    objective: 'Hardware coding • All kind of electronics work',
    icon: 'Cpu'
  },
  {
    id: 'software',
    name: 'Software & Automation Team',
    head: 'Riyan Gonsalves',
    headId: 'core4',
    objective: 'Computer Vision • Automation • Embedded System • Robot Kinematics',
    icon: 'Code'
  },
  {
    id: 'mechanical',
    name: 'Mechanical Design & Manufacturing Team',
    head: 'Vansh Singh',
    headId: 'core6',
    objective: 'Bot Design • Bot Fabrication • Bot Animation',
    icon: 'Cog'
  },
  {
    id: 'rnd',
    name: 'R & D Team',
    head: 'Jhoshua Coutinho',
    headId: 'core2',
    objective: 'Problem identification and Research • Research Paper and Patent • Long Term Project • Product Development',
    icon: 'Zap'
  },
  {
    id: 'event',
    name: 'Event Management Team',
    head: 'Parth Sutar',
    headId: 'core3',
    objective: 'Workshops, Seminars, Talks • Exhibitions • Identify Robotic events • Mentor Participants • Event Logistics',
    icon: 'Calendar'
  },
  {
    id: 'publicity',
    name: 'Publicity & Logistics Team',
    head: 'Parth Sutar',
    headId: 'core3',
    objective: 'Photography & Videography • Sponsorships • Collaboration with outside world • Posters & PRing',
    icon: 'Users'
  },
  {
    id: 'documentation',
    name: 'Documentation Team',
    head: 'Pal Rajak',
    headId: 'core5',
    objective: 'Monthly Newsletters & Magazine • Reports • Permission letters • Technical Documentation',
    icon: 'Briefcase'
  },
];

export const allTeamMembers: TeamMember[] = [
  // CORE TEAM
  {
    _id: 'core1',
    name: 'Ramjee Yadav',
    role: 'Convener',
    department: 'Management',
    domain: 'management',
    category: 'core',
    imageUrl: '/ramjee.jpeg',
    email: 'ramjeeyadav@sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/ramjeeyadav/',
    createdAt: '2024-01-15',
  },
  {
    _id: 'core2',
    name: 'Jhoshua Coutinho',
    role: 'CRC',
    department: 'Technical',
    domain: 'mechanical',
    category: 'core',
    imageUrl: '/Jhoshua.png',
    email: 'coutinhojhoshua5@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/jhoshua-coutinho-34b70333b',
    createdAt: '2024-03-10',
  },
  {
    _id: 'core3',
    name: 'Parth Sutar',
    role: 'Event & Publicity Head',
    department: 'Technical',
    domain: 'electronics',
    category: 'core',
    imageUrl: '/parth.jpeg',
    email: 'parthsutar2006@gmail.com',
    linkedin: 'https://www.linkedin.com/in/parth-sutar-34463533b',
    createdAt: '2024-03-10',
  },
  {
    _id: 'core4',
    name: 'Riyan Gonsalves',
    role: 'Inventory Head',
    department: 'Technical',
    domain: 'electronics',
    category: 'core',
    imageUrl: '/Riyan.jpg',
    email: 'riyan.gonsalves@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/riyan-gonsalves',
    createdAt: '2024-03-10',
  },
  {
    _id: 'core5',
    name: 'Pal Rajak',
    role: 'Treasurer & Secretary',
    department: 'PR',
    domain: 'electronics',
    category: 'core',
    imageUrl: '/pal.jpg',
    phone: '7208697241',
    email: 'palrajak06@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/pal-rajak-a92830342',
    createdAt: '2024-01-15',
  },
  {
    _id: 'core6',
    name: 'Vansh Singh',
    role: 'Manufacturing Head',
    department: 'Technical',
    domain: 'mechanical',
    category: 'core',
    imageUrl: '/Vansh.jpg',
    email: 'Vanshsinghat@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/vansh-singh-738353347',
    createdAt: '2024-03-10',
  },
  // MENTORS
  {
    _id: 'mentor1',
    name: 'Siddhant Monde',
    role: 'Mentor & Ex-CRC',
    department: 'Electronics',
    domain: 'electronics',
    category: 'mentors',
    imageUrl: '/siddhant.jpg',
    email: 'siddhantj.monde23@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/siddhant-monde-4a60502b7',
    createdAt: '2024-01-15',
  },
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_1',
    name: 'Dittino Thomas',
    role: 'CO-CRC',
    department: 'Designer',
    domain: 'mechanical',
    category: 'core',
    imageUrl: '/dittino.jpg',
    email: 'dittinothomas05@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/dittinothomas',
    createdAt: '2024-01-15',
  },
  */
  {
    _id: 'mentor2',
    name: 'Taksh Gandhi',
    role: 'Mentor',
    department: 'Coder',
    domain: 'software',
    category: 'mentors',
    imageUrl: '/Taksh.jpg',
    email: 'takshgandhi4@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/taksh-gandhi-4136222b7',
    createdAt: '2024-01-15',
  },
  {
    _id: 'mentor3',
    name: 'Saish Loke',
    role: 'Mentor',
    department: 'Electronics',
    domain: 'electronics',
    category: 'mentors',
    imageUrl: '/Saish.jpeg',
    email: 'lokesaish@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/saish-loke-867646291/',
    createdAt: '2024-01-15',
  },
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_2',
    name: 'Dikshi Adani',
    role: 'SECRETARY',
    department: 'Coder',
    domain: 'software',
    category: 'core',
    imageUrl: '/Dikshi.jpg',
    email: 'hetal.adani0279@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/dikshi-adani-8390b52b7',
    createdAt: '2024-01-15',
  },
  */
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_3',
    name: 'Samruddhi Kharul',
    role: 'CO-SECRETARY',
    department: 'Coder',
    domain: 'software',
    category: 'members',
    imageUrl: '/samruddhi.jpg',
    email: 'samruddhi.kharul9@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/samruddhi-kharul-a6b762341',
    createdAt: '2024-01-15',
  },
  */
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_4',
    name: 'Nandini Salunkhe',
    role: 'EVENT HEAD',
    department: 'Coder',
    domain: 'software',
    category: 'core',
    imageUrl: '/nandini.jpg',
    phone: '8329324952',
    email: 'nandinisalunkhe97@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/nandini-salunkhe-a776452b7',
    createdAt: '2024-01-15',
  },
  */
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_5',
    name: 'Aryan Wasnik',
    role: 'CO-PUBLICITY HEAD',
    department: 'Electronics',
    domain: 'electronics',
    category: 'members',
    imageUrl: '/aryan.jpg',
    email: 'aryanwasnik25@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aryanwasnik',
    createdAt: '2024-01-15',
  },
  */
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_6',
    name: 'Amisha Thaduri',
    role: 'PUBLICITY HEAD',
    department: 'Designer',
    domain: 'publicity',
    category: 'core',
    imageUrl: '/amisha.jpeg',
    email: 'manojthaduri82@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/amisha-thaduri-4ab68a347',
    createdAt: '2024-01-15',
  },
  */

  {
    _id: 'mentor4',
    name: 'Shail Raut',
    role: 'Mentor',
    department: 'Designer',
    domain: 'mechanical',
    category: 'mentors',
    imageUrl: '/Shell.jpg',
    email: 'shailrautmcoc@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/shail-raut-54386a358',
    createdAt: '2024-01-15',
  },
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_7',
    name: 'Jash Mewada',
    role: 'INVENTORY MANAGER',
    department: 'Coder',
    domain: 'software',
    category: 'members',
    imageUrl: '/Jash.jpg',
    email: 'mewadajash94@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jash-mewada-86aa252b6',
    createdAt: '2024-01-15',
  },
  */
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_8',
    name: 'Shaun Mascherenus',
    role: 'CORE MEMBER',
    department: 'Technical',
    domain: 'electronics',
    category: 'core',
    imageUrl: '/shaun.jpeg',
    email: 'shaun.mascherenus@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/shaun-mascherenus',
    createdAt: '2024-01-15',
  },
  */
  {
    _id: 'mentor5',
    name: 'Shreehari Punna',
    role: 'Alumni-Mentor',
    department: 'Electronics',
    domain: 'electronics',
    category: 'mentors',
    imageUrl: '/shreehari.jpg',
    email: 'shreehari.punna@alumni.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/shreehari-punna',
    createdAt: '2024-02-01',
  },
  /* Ex-RAW Members 2024
  {
    _id: 'ex_member2024_9',
    name: 'Diyanshu Modi',
    role: 'MENTOR',
    department: 'Coder Electronics',
    domain: 'software',
    category: 'mentors',
    imageUrl: '/diyanshu modi.jpeg',
    email: 'divyanshu.jmodi@gmail.com',
    linkedin: 'https://www.linkedin.com/in/divyanshu-modi',
    createdAt: '2024-02-01',
  },
  {
    _id: 'ex_member2024_10',
    name: 'Yash Pathak',
    role: 'MENTOR',
    department: 'Designer Coder',
    domain: 'software',
    category: 'mentors',
    imageUrl: '/Yash Pathak.jpeg',
    email: 'yash.pathak@alumni.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/yash-pathak',
    createdAt: '2024-02-01',
  },
  {
    _id: 'ex_member2024_11',
    name: 'Hrushikesh Auti',
    role: 'MENTOR',
    department: 'Designer',
    domain: 'mechanical',
    category: 'mentors',
    imageUrl: '/Hrushikhi.jpg',
    email: 'hrushikesh.auti@alumni.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/hrushikesh-auti',
    createdAt: '2024-02-01',
  },
  */
  // Ex-RAW Members 2024
  /*
  {
    _id: 'ex_member2024_12',
    name: 'Swanand Deshpande',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/Swanand.jpg',
    email: 'dswanand14@gmail.com',
    linkedin: 'https://www.linkedin.com/in/swanand-deshpande-3731422b3',
    createdAt: '2024-03-10',
  },
  */
  /*
  {
    _id: 'ex_member2024_13',
    name: 'Siddha Shete',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'electronics',
    category: 'members',
    imageUrl: '/siddha.jpg',
    email: 'siddhashete26@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/siddha-shete-48497833b',
    createdAt: '2024-03-10',
  },
  */
  /*
  {
    _id: 'ex_member2024_14',
    name: 'Sarthak Chaurasiya',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'electronics',
    category: 'members',
    imageUrl: '/sarthak.jpg',
    email: 'sths.sarthak20@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/sparkysdome',
    createdAt: '2024-03-10',
  },
  */
  /*
  {
    _id: 'ex_member2024_15',
    name: 'Jay Lohar',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'electronics',
    category: 'members',
    imageUrl: '/Jay.jpg',
    email: 'loharjai6@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/jai-lohar-572610309/',
    createdAt: '2024-03-10',
  },
  */

  /*
  {
    _id: 'ex_member2024_16',
    name: 'Paarth Pradhan',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'electronics',
    category: 'members',
    imageUrl: '/paarth.jpeg',
    email: 'paarth.pradhan44@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/paarth-pradhan-183a81240',
    createdAt: '2024-03-10',
  },
  */
  /*
  {
    _id: 'ex_member2024_17',
    name: 'Sakshi Virani',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/sakshi.jpg',
    email: 'sakshivirani2006@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/sakshi-virani-26ba16359',
    createdAt: '2024-03-10',
  },
  */

  /*
  {
    _id: 'ex_member2024_18',
    name: 'Jwen Lobo',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'mechanical',
    category: 'members',
    imageUrl: '/Jwen.jpg',
    email: 'jwenlobo1967@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jwen-lobo-14356230a',
    createdAt: '2024-03-10',
  },
  */

  /*
  {
    _id: 'ex_member2024_19',
    name: 'Gunjan Patil',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'electronics',
    category: 'members',
    imageUrl: '/gunjan.jpg',
    email: 'gunjanpatil968@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/gunjan-patil-2a069333b',
    createdAt: '2024-03-10',
  },
  */
  /*
  {
    _id: 'ex_member2024_20',
    name: 'Nityant Tiwari',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'electronics',
    category: 'members',
    imageUrl: '/nityant.jpeg',
    email: 'nityant.tiwari2404@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nityant-tiwari-88b97533b',
    createdAt: '2024-03-10',
  },
  */
  // EXECUTIVE MEMBERS 2026-2027 (Ordered as requested)
  // 1. Co-Secretary
  {
    _id: 'member1',
    name: 'Soham Salekar',
    role: 'Co-Secretary',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/soham.jpg',
    email: 'salekarsoham059@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/soham-salekar-2007a8364/',
    createdAt: '2026-08-15',
  },
  // 2. Inventory Manager
  {
    _id: 'member2',
    name: 'Krish Dankhara',
    role: 'Inventory Manager',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/krish.jpg',
    email: 'krish.dankhara@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/krish-dankhara-915431280/',
    createdAt: '2026-08-15',
  },
  // 3. Co Event Head
  {
    _id: 'member3',
    name: 'Krishna Maurya',
    role: 'Co-Event Head',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/krishna.jpg',
    email: 'krishnamaurya6907@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/krishna-maurya-98a819382/',
    createdAt: '2026-08-15',
  },
  // 4. Co Publicity
  {
    _id: 'member4',
    name: 'Pragya Mishra',
    role: 'Co-Publicity Head',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/pragya.jpg',
    email: 'ashwanikm444@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/pragya-mishra-50524a399',
    createdAt: '2026-08-15',
  },
  // 5. Aditya Bhole
  {
    _id: 'member5',
    name: 'Aditya Bhole',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/aditya.jpg',
    email: '',
    linkedin: 'https://www.linkedin.com/in/aditya315/',
    createdAt: '2026-08-15',
  },
  // 6. Darshan Barekar
  {
    _id: 'member6',
    name: 'Darshan Barekar',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/darshan.jpg',
    email: '',
    linkedin: 'https://www.linkedin.com/in/darshan-barekar/',
    createdAt: '2026-08-15',
  },
  // 7. Tanish Gaddam
  {
    _id: 'member7',
    name: 'Tanish Gaddam',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/tanish.jpg',
    email: 'tanishgaddam0706@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/tanishgaddam/',
    createdAt: '2026-08-15',
  },
  // 8+ Rest of executive members in alphabetical order
  {
    _id: 'member8',
    name: 'Aryan Raul',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/aryanr.jpg',
    email: 'aryanraul22@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/aryanraul/',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member9',
    name: 'Christina',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/christina.jpg',
    email: '',
    linkedin: '',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member10',
    name: 'Divyesh Singh',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/divyesh.jpg',
    email: 'divyeshsingh26@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/divyesh-singh-b18511397/',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member11',
    name: 'Emmanuel Fernandes',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/emmanuel.jpg',
    email: 'mgemm2929@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/emmanuel-fernandes-1367b4382/',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member12',
    name: 'Gaurav Kamble',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/gaurav.jpg',
    email: 'gauravkamble.gpk@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/gaurav-kamble-62133b394/',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member13',
    name: 'Gauri Mali',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/gauri.jpg',
    email: 'gaurimali2327@student.sfit.ac.in ',
    linkedin: 'https://www.linkedin.com/in/gauri-mali-50a922412/',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member14',
    name: "Isaiah D'Souza",
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/isaiah.jpg',
    email: 'isaiahdsouza5@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/isaiah-d-016a93398/',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member15',
    name: 'Kannan Pillai',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/kannan.jpg',
    email: 'pillaikannan072@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/kannan-pillai-36610b2a9/',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member16',
    name: 'Kavisha Galipelly',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/kavisha.jpg',
    email: 'hgalipelly@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/kavisha-galipelly-99927a398/',
    createdAt: '2026-08-15',
  },
  {
    _id: 'member17',
    name: 'Naaz Husseni',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/naaz.jpg',
    email: 'naazhusseni@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/naaz-husseni-7a230b399/',
    createdAt: '2026-08-15',
  },
  // Hidden members
  {
    _id: 'member18',
    name: 'Kelvin Chetty',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/kelvin.jpg',
    email: 'kelwinchetty7@student.sfit.ac.in',
    linkedin: 'https://www.linkedin.com/in/kelwin-chetty-a22a58391/',
    createdAt: '2026-08-15',
    hidden: true,
  },
  {
    _id: 'member19',
    name: 'Ved',
    role: 'EXECUTIVE MEMBER',
    department: 'Technical',
    domain: 'software',
    category: 'members',
    imageUrl: '/ved.jpg',
    email: '',
    linkedin: '',
    createdAt: '2026-08-15',
    hidden: true,
  }
];

// Visible team members by default (excluding hidden members)
export const teamMembers: TeamMember[] = allTeamMembers.filter(m => !m.hidden);

export default teamMembers;
