export interface Achievement {
  id: string;
  name: string;
  image: string;
  category: string;
  title: string;
  description: string;
  overallTop?: boolean;
}

export const achievements: Achievement[] = [
  {
    id: "1",
    name: "Emma Thompson",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop",
    category: "Academic Excellence",
    title: "Outstanding Research in AI Ethics",
    description:
      "Led groundbreaking research in artificial intelligence ethics, publishing in top-tier journals and presenting at international conferences.",
    overallTop: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
    category: "Innovation & Technology",
    title: "Tech Innovation Award",
    description:
      "Developed a revolutionary sustainable energy solution that received international recognition and multiple patent approvals.",
    overallTop: true,
  },
  {
    id: "3",
    name: "Sarah Williams",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
    category: "Leadership & Service",
    title: "Community Leadership Excellence",
    description:
      "Founded and led a successful nonprofit organization focusing on youth education in underserved communities.",
    overallTop: true,
  },
  {
    id: "4",
    name: "James Rodriguez",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
    category: "Sports & Athletics",
    title: "National Championship Victory",
    description:
      "Led the university team to a national championship victory while maintaining academic excellence.",
    overallTop: true,
  },
  {
    id: "5",
    name: "Lisa Zhang",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2761&auto=format&fit=crop",
    category: "Research Achievements",
    title: "Breakthrough in Medical Research",
    description:
      "Made significant contributions to cancer research, leading to new treatment possibilities.",
    overallTop: true,
  },
  {
    id: "6",
    name: "David Park",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop",
    category: "Professional Achievements",
    title: "Global Business Leadership",
    description:
      "Successfully led a multinational team in launching innovative products across three continents.",
    overallTop: true,
  },
  {
    id: "7",
    name: "Maria Garcia",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop",
    category: "Academic Excellence",
    title: "Distinguished Teaching Award",
    description:
      "Recognized for exceptional teaching methods and student mentorship in computer science.",
    overallTop: true,
  },
  {
    id: "8",
    name: "Alex Foster",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop",
    category: "Innovation & Technology",
    title: "Cybersecurity Excellence",
    description:
      "Developed cutting-edge security protocols now used by major tech companies worldwide.",
    overallTop: true,
  },
  {
    id: "9",
    name: "Nina Patel",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
    category: "Research Achievements",
    title: "Environmental Science Pioneer",
    description:
      "Led groundbreaking research in climate change mitigation strategies.",
    overallTop: true,
  },
  {
    id: "10",
    name: "Thomas Wright",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2787&auto=format&fit=crop",
    category: "Professional Achievements",
    title: "Engineering Innovation Award",
    description:
      "Revolutionized renewable energy systems with patented solar technology.",
    overallTop: true,
  },
  {
    id: "11",
    name: "Aisha Rahman",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2870&auto=format&fit=crop",
    category: "Academic Excellence",
    title: "International Mathematics Olympiad Gold",
    description:
      "Won gold medal at IMO 2023, representing the university with distinction in advanced mathematical problem-solving.",
    overallTop: true,
  },
  {
    id: "12",
    name: "Marcus Johnson",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2860&auto=format&fit=crop",
    category: "Sports & Athletics",
    title: "Swimming World Record",
    description:
      "Broke the university record in 200m butterfly and represented the country at World Championships.",
    overallTop: true,
  },
  {
    id: "13",
    name: "Sofia Martinez",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2787&auto=format&fit=crop",
    category: "Leadership & Service",
    title: "Social Impact Initiative",
    description:
      'Founded "Tech for All" program, providing coding education to over 1000 underprivileged students.',
    overallTop: true,
  },
  {
    id: "14",
    name: "Ryan O'Connor",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2870&auto=format&fit=crop",
    category: "Innovation & Technology",
    title: "Blockchain Innovation Award",
    description:
      "Developed a revolutionary blockchain solution for sustainable supply chain management.",
    overallTop: true,
  },
  {
    id: "15",
    name: "Priya Sharma",
    image:
      "https://images.unsplash.com/photo-1557555187-23d685287bc3?q=80&w=2864&auto=format&fit=crop",
    category: "Research Achievements",
    title: "Quantum Computing Research",
    description:
      "Published groundbreaking research in quantum computing algorithms in Nature journal.",
    overallTop: true,
  },
  {
    id: "16",
    name: "Ethan Lee",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2848&auto=format&fit=crop",
    category: "Academic Excellence",
    title: "Valedictorian",
    description: "Graduated as valedictorian with a perfect GPA.",
  },
  {
    id: "17",
    name: "Chloe Davis",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2864&auto=format&fit=crop",
    category: "Sports & Athletics",
    title: "Tennis Champion",
    description: "Won the national collegiate tennis championship.",
  },
  {
    id: "18",
    name: "Brandon Wilson",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2787&auto=format&fit=crop",
    category: "Leadership & Service",
    title: "Student Body President",
    description:
      "Served as student body president, implementing key initiatives.",
  },
  {
    id: "19",
    name: "Olivia Green",
    image:
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=2788&auto=format&fit=crop",
    category: "Innovation & Technology",
    title: "AI Innovator",
    description: "Developed a novel AI algorithm for medical diagnosis.",
  },
  {
    id: "20",
    name: "Kevin Brown",
    image:
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=2787&auto=format&fit=crop",
    category: "Research Achievements",
    title: "Climate Research Grant",
    description: "Received a prestigious grant for climate change research.",
  },
  {
    id: "21",
    name: "Lauren Taylor",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=2787&auto=format&fit=crop",
    category: "Professional Achievements",
    title: "Startup Founder",
    description: "Founded a successful tech startup.",
  },
  {
    id: "22",
    name: "Joseph Hill",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2787&auto=format&fit=crop",
    category: "Academic Excellence",
    title: "Dean's List",
    description:
      "Regularly featured on the Dean's List for academic excellence.",
  },
  {
    id: "23",
    name: "Ashley White",
    image:
      "https://images.unsplash.com/photo-1541647376583-02892320673a?q=80&w=2787&auto=format&fit=crop",
    category: "Sports & Athletics",
    title: "Track and Field Star",
    description: "Excelled in track and field, winning multiple awards.",
  },
  {
    id: "24",
    name: "Christopher King",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop",
    category: "Leadership & Service",
    title: "Volunteer Leader",
    description: "Led numerous volunteer initiatives in the community.",
  },
  {
    id: "25",
    name: "Jessica Wright",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2787&auto=format&fit=crop",
    category: "Innovation & Technology",
    title: "Software Developer",
    description:
      "Developed innovative software solutions for various industries.",
  },
  {
    id: "26",
    name: "Daniel Garcia",
    image:
      "https://images.unsplash.com/photo-1568602471122-78329514c265?q=80&w=2787&auto=format&fit=crop",
    category: "Research Achievements",
    title: "Medical Breakthrough",
    description: "Contributed to a significant medical breakthrough.",
  },
  {
    id: "27",
    name: "Michelle Adams",
    image:
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2787&auto=format&fit=crop",
    category: "Professional Achievements",
    title: "Business Innovator",
    description: "Introduced innovative business strategies.",
  },
];

export const categories = [
  "Overall TOP 10",
  "Academic Excellence",
  "Research Achievements",
  "Professional Achievements",
  "Leadership & Service",
  "Sports & Athletics",
  "Innovation & Technology",
];
