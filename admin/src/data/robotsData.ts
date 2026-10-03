/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

export interface Robot {
  _id: string;
  name: string;
  type: string;
  category: 'competition' | 'research' | 'development';
  description: string;
  longDescription?: string;
  imageUrl: string;
  specs: string[];
  tags: string[];
  features?: string[];
  achievements?: string[];
  year?: number;
  status?: 'active' | 'retired' | 'development';
  teamLead?: string;
  createdAt?: string;
}

export const robotsData: Robot[] = [
  {
    _id: 'robot-robocon-2026-1',
    name: 'DD Robocon 2026 Robot 1',
    type: 'Autonomous Navigation Robot',
    category: 'competition',
    description: 'First robot for DD Robocon 2026 competition featuring SLAM & LiDAR autonomy',
    longDescription: 'Advanced competition robot designed for DD Robocon 2026 with real-time autonomous pathfinding, precision obstacle evasion, and integrated multi-layer sensor fusion.',
    imageUrl: '/images/2026 r1.PNG',
    specs: ['Autonomous Navigation', 'LiDAR SLAM', 'Multi-task Capability', 'High Precision Control'],
    tags: ['DD Robocon', 'Competition', '2026', 'Autonomous'],
    features: [
      'Advanced ROS2 control systems',
      'LiDAR & depth camera integration',
      'Carbon-fiber composite chassis',
      'Competition-ready tactical software',
    ],
    achievements: ['DD Robocon 2026 Primary Entry'],
    year: 2026,
    status: 'active',
    teamLead: 'Team RAW',
    createdAt: '2025-12-01',
  },
  {
    _id: 'robot-robocon-2026-2',
    name: 'DD Robocon 2026 Robot 2',
    type: 'Precision Gripper Robot',
    category: 'competition',
    description: 'Second robot for DD Robocon 2026 featuring high-torque pneumatic gripper',
    imageUrl: '/images/robocon 2026.jpeg',
    specs: ['Pneumatic Gripper', 'High Speed', 'Cooperative Control', 'Custom Gearbox'],
    tags: ['DD Robocon', 'Competition', '2026', 'Manual'],
    features: [
      'High-torque custom gripper',
      'Dual-operator telemetry',
      'Rapid air-reservoir recharge',
      'Strategic coordination module',
    ],
    achievements: ['DD Robocon 2026 Secondary Entry'],
    year: 2026,
    status: 'active',
    teamLead: 'Team RAW',
    createdAt: '2025-11-20',
  },
  {
    _id: 'robot-robocon-2025-1',
    name: 'DD Robocon 2025 Robot 1',
    type: 'Competition Robot',
    category: 'competition',
    description: 'First robot for DD Robocon 2025 competition',
    longDescription: 'Advanced competition robot designed for DD Robocon 2025 challenges with precise control systems and innovative agricultural harvesting mechanisms.',
    imageUrl: '/images/2025 bots.jpg',
    specs: ['Autonomous Navigation', 'Manual Control', 'Multi-task Capability', 'High Precision'],
    tags: ['DD Robocon', 'Competition', '2025'],
    features: [
      'Advanced control systems',
      'Innovative mechanical design',
      'Robust construction',
      'Competition-ready performance',
    ],
    achievements: ['DD Robocon 2025 Participant'],
    year: 2025,
    status: 'active',
    teamLead: 'Team RAW',
    createdAt: '2024-12-01',
  },
  {
    _id: 'robot-robocon-2025-2',
    name: 'DD Robocon 2025 Robot 2',
    type: 'Competition Robot',
    category: 'competition',
    description: 'Second robot for DD Robocon 2025 competition',
    longDescription: 'Complementary robot for DD Robocon 2025 featuring specialized mechanisms for team strategy execution and holonomic omni-drive.',
    imageUrl: '/images/bots-hero/2025 r2.png',
    specs: ['Team Coordination', 'Specialized Tasks', 'High Speed', 'Precision Control'],
    tags: ['DD Robocon', 'Competition', '2025'],
    features: [
      'Team coordination systems',
      'Specialized mechanisms',
      'Fast response time',
      'Strategic capability',
    ],
    achievements: ['DD Robocon 2025 Participant'],
    year: 2025,
    status: 'active',
    teamLead: 'Team RAW',
    createdAt: '2024-11-28',
  },
];

export default robotsData;
