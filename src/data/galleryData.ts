/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

/**
 * STATIC GALLERY DATA
 * Events, Workshops, Competitions, and Team Moments with real verified assets.
 * Note: Robot models are defined exclusively in robotsData.ts to eliminate duplicate entries.
 */

export interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  detailedDescription?: string;
  imageUrl: string;
  category: 'events' | 'workshops' | 'competitions' | 'team';
  uploadedBy?: string;
  createdAt?: string;
  year?: number;
}

export const galleryImages: GalleryImage[] = [
  // EVENTS
  {
    _id: 'event-mu-techconnect-2026',
    title: 'MU TechConnect Robotic Competition 2026',
    description: 'Team RAW official robotics competition entry at Mumbai University TechConnect. 1st Prize Winner.',
    detailedDescription: 'Interactive demonstration and competitive exhibition of Team RAW autonomous rovers, sensor telemetry systems, and aviation prototypes presented at Mumbai University TechConnect. Secured 1st Prize.',
    category: 'competitions',
    imageUrl: '/images/MU Techconnect.jpg',
    uploadedBy: 'Team RAW',
    createdAt: '2026-03-01',
    year: 2026,
  },
  {
    _id: 'event-prayas-2026',
    title: 'prayas 2026',
    description: 'PRAYAS 2026 technical exhibition and live robotics demonstration at SFIT.',
    detailedDescription: 'Robotics innovation, student project certification, and live hardware demonstration conducted during PRAYAS 2026.',
    category: 'events',
    imageUrl: '/images/PRAYAS 2026.jpeg',
    uploadedBy: 'Team RAW',
    createdAt: '2026-02-28',
    year: 2026,
  },
  {
    _id: 'event-mosaic-2026',
    title: 'Mosaic 2026 Technical Fest',
    description: 'Team RAW flagship robotics demonstration & arena showcase at SFIT Mosaic techfest.',
    detailedDescription: 'Full public exhibition of Team RAW autonomous robots, live obstacle courses, and drone telemetry demonstrations presented to over 2,000 students and engineering guests.',
    category: 'events',
    imageUrl: '/Mosaic26.png',
    uploadedBy: 'Team RAW',
    createdAt: '2026-02-15',
    year: 2026,
  },
  {
    _id: 'event-robocon-national',
    title: 'DD Robocon National Arena',
    description: 'Team RAW on the competition field during the live national arena rounds.',
    detailedDescription: 'Intense match runs featuring coordinated dual-robot tasks, high-speed ball sorting, and precision sensor calibration on the official Doordarshan arena.',
    category: 'events',
    imageUrl: '/robocon2025.png',
    uploadedBy: 'Team RAW',
    createdAt: '2025-06-20',
    year: 2025,
  },

  // WORKSHOPS
  {
    _id: 'workshop-sfit-lab',
    title: 'Robotics Workshop at SFIT Lab',
    description: 'Hands-on embedded systems, ROS2, and PCB design bootcamps conducted in Room 027.',
    detailedDescription: 'Intensive peer learning sessions for first and second year engineering recruits covering microcontrollers, motor drivers, Fusion 360 CAD, and autonomous navigation architectures.',
    category: 'workshops',
    imageUrl: '/group foto.jpeg',
    uploadedBy: 'Team RAW',
    createdAt: '2025-09-12',
    year: 2025,
  },

  // COMPETITIONS
  {
    _id: 'comp-eyantra-arena',
    title: 'National Robotics Championship',
    description: 'Championship match staging and technical inspection at IIT Bombay.',
    detailedDescription: 'Rigorous hardware safety reviews, software verification, and timed autonomous trials competing against top technological institutes nationwide.',
    category: 'competitions',
    imageUrl: '/Robococon.png',
    uploadedBy: 'Team RAW',
    createdAt: '2024-04-18',
    year: 2024,
  },

  // TEAM
  {
    _id: 'team-sfit-assembly',
    title: 'Team RAW Engineering Wing',
    description: 'Core robotics committee, mechanical fabricators, electronics leads, and coders.',
    detailedDescription: 'The dedicated student engineering contingent of St. Francis Institute of Technology driving relentless innovation across mechanical, electrical, and autonomous domains.',
    category: 'team',
    imageUrl: '/team image.JPG',
    uploadedBy: 'Team RAW',
    createdAt: '2025-10-05',
    year: 2025,
  },
];

// Filter helper functions
export const getImagesByCategory = (category: string): GalleryImage[] => {
  return galleryImages.filter(img => img.category === category);
};

export const getRecentImages = (count: number = 10): GalleryImage[] => {
  return [...galleryImages]
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, count);
};

export default galleryImages;
