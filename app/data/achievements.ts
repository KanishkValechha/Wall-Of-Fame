export interface Achievement {
  id: string;
  name: string;
  image: string;
  category: string;
  title: string;
  description: string;
  position?: {
    top?: string;
    left?: string;
    rotate?: string;
  };
}

export const achievements: Achievement[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop',
    category: 'Academic Excellence',
    title: 'Outstanding Research in AI Ethics',
    description: 'Led groundbreaking research in artificial intelligence ethics, publishing in top-tier journals and presenting at international conferences.',
    position: { top: '30%', left: '25%', rotate: '-5deg' }
  },
  {
    id: '2',
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop',
    category: 'Innovation & Technology',
    title: 'Tech Innovation Award',
    description: 'Developed a revolutionary sustainable energy solution that received international recognition and multiple patent approvals.',
    position: { top: '45%', left: '35%', rotate: '3deg' }
  },
  {
    id: '3',
    name: 'Sarah Williams',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2787&auto=format&fit=crop',
    category: 'Leadership & Service',
    title: 'Community Leadership Excellence',
    description: 'Founded and led a successful nonprofit organization focusing on youth education in underserved communities.',
    position: { top: '20%', left: '75%', rotate: '-2deg' }
  },
  {
    id: '4',
    name: 'James Rodriguez',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop',
    category: 'Sports & Athletics',
    title: 'National Championship Victory',
    description: 'Led the university team to a national championship victory while maintaining academic excellence.',
    position: { top: '35%', left: '15%', rotate: '3deg' }
  },
  {
    id: '5',
    name: 'Lisa Zhang',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2787&auto=format&fit=crop',
    category: 'Research Achievements',
    title: 'Breakthrough in Medical Research',
    description: 'Made significant contributions to cancer research, leading to new treatment possibilities.',
    position: { top: '30%', left: '45%', rotate: '-1deg' }
  },
  {
    id: '6',
    name: 'David Park',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop',
    category: 'Professional Achievements',
    title: 'Global Business Leadership',
    description: 'Successfully led a multinational team in launching innovative products across three continents.',
    position: { top: '25%', left: '80%', rotate: '2deg' }
  },
  {
    id: '7',
    name: 'Maria Garcia',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2787&auto=format&fit=crop',
    category: 'Academic Excellence',
    title: 'Distinguished Teaching Award',
    description: 'Recognized for exceptional teaching methods and student mentorship in computer science.',
    position: { top: '60%', left: '25%', rotate: '-2deg' }
  },
  {
    id: '8',
    name: 'Alex Foster',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2787&auto=format&fit=crop',
    category: 'Innovation & Technology',
    title: 'Cybersecurity Excellence',
    description: 'Developed cutting-edge security protocols now used by major tech companies worldwide.',
    position: { top: '55%', left: '60%', rotate: '3deg' }
  },
  {
    id: '9',
    name: 'Nina Patel',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2787&auto=format&fit=crop',
    category: 'Research Achievements',
    title: 'Environmental Science Pioneer',
    description: 'Led groundbreaking research in climate change mitigation strategies.',
    position: { top: '50%', left: '85%', rotate: '-3deg' }
  },
  {
    id: '10',
    name: 'Thomas Wright',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop',
    category: 'Professional Achievements',
    title: 'Engineering Innovation Award',
    description: 'Revolutionized renewable energy systems with patented solar technology.',
    position: { top: '75%', left: '50%', rotate: '2deg' }
  },
  {
    id: '11',
    name: 'Aisha Rahman',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2787&auto=format&fit=crop',
    category: 'Academic Excellence',
    title: 'International Mathematics Olympiad Gold',
    description: 'Won gold medal at IMO 2023, representing the university with distinction in advanced mathematical problem-solving.',
    position: { top: '40%', left: '30%', rotate: '4deg' }
  },
  {
    id: '12',
    name: 'Marcus Johnson',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=2787&auto=format&fit=crop',
    category: 'Sports & Athletics',
    title: 'Swimming World Record',
    description: 'Broke the university record in 200m butterfly and represented the country at World Championships.',
    position: { top: '65%', left: '70%', rotate: '-4deg' }
  },
  {
    id: '13',
    name: 'Sofia Martinez',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=2787&auto=format&fit=crop',
    category: 'Leadership & Service',
    title: 'Social Impact Initiative',
    description: 'Founded "Tech for All" program, providing coding education to over 1000 underprivileged students.',
    position: { top: '25%', left: '40%', rotate: '2deg' }
  },
  {
    id: '14',
    name: 'Ryan O\'Connor',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2787&auto=format&fit=crop',
    category: 'Innovation & Technology',
    title: 'Blockchain Innovation Award',
    description: 'Developed a revolutionary blockchain solution for sustainable supply chain management.',
    position: { top: '45%', left: '55%', rotate: '-3deg' }
  },
  {
    id: '15',
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2787&auto=format&fit=crop',
    category: 'Research Achievements',
    title: 'Quantum Computing Research',
    description: 'Published groundbreaking research in quantum computing algorithms in Nature journal.',
    position: { top: '70%', left: '25%', rotate: '3deg' }
  },
  {
    id: '16',
    name: 'Kai Nakamura',
    image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2787&auto=format&fit=crop',
    category: 'Professional Achievements',
    title: 'Young Entrepreneur Award',
    description: 'Created a successful AI-driven healthcare startup while completing final year studies.',
    position: { top: '55%', left: '80%', rotate: '-2deg' }
  },
  {
    id: '17',
    name: 'Elena Popov',
    image: 'https://images.unsplash.com/photo-1614644147724-2d4785d69962?q=80&w=2787&auto=format&fit=crop',
    category: 'Sports & Athletics',
    title: 'Chess Grandmaster',
    description: 'Achieved International Chess Grandmaster status while maintaining a 4.0 GPA in Computer Science.',
    position: { top: '35%', left: '65%', rotate: '4deg' }
  },
  {
    id: '18',
    name: 'Jordan Lee',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=2787&auto=format&fit=crop',
    category: 'Leadership & Service',
    title: 'Environmental Leadership',
    description: 'Led campus-wide sustainability initiative reducing carbon footprint by 30% in one year.',
    position: { top: '80%', left: '40%', rotate: '-3deg' }
  },
  {
    id: '19',
    name: 'Fatima Al-Sayed',
    image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=2787&auto=format&fit=crop',
    category: 'Academic Excellence',
    title: 'Rhodes Scholar',
    description: 'Selected as Rhodes Scholar for groundbreaking research in artificial neural networks.',
    position: { top: '20%', left: '75%', rotate: '2deg' }
  },
  {
    id: '20',
    name: 'Diego Ramirez',
    image: 'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=2787&auto=format&fit=crop',
    category: 'Innovation & Technology',
    title: 'Space Technology Innovation',
    description: 'Developed new satellite communication protocol adopted by major space agencies.',
    position: { top: '60%', left: '35%', rotate: '-4deg' }
  }
];

export const categories = [
  'Overall TOP 10',
  'Academic Excellence',
  'Research Achievements',
  'Professional Achievements',
  'Leadership & Service',
  'Sports & Athletics',
  'Innovation & Technology'
];