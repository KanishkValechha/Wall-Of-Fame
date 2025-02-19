import { Achievement } from "@/app/types/achievements";
/*
export const achievements: Achievement[] = [
  {
    _id: 1,
    fullName: "Emma Thompson",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop",
    achievementCategory: "Academic Excellence",
    title: "Outstanding Research in AI Ethics",
    description:
      "Led groundbreaking research in artificial intelligence ethics, publishing in top-tier journals and presenting at international conferences.",
    overallTop: true,
  },
  {
    _id: 2,
    fullName: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Innovation & Technology",
    title: "Tech Innovation Award",
    description:
      "Developed a revolutionary sustainable energy solution that received international recognition and multiple patent approvals.",
    overallTop: true,
  },
  {
    _id: 3,
    fullName: "Sarah Williams",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Leadership & Service",
    title: "Community Leadership Excellence",
    description:
      "Founded and led a successful nonprofit organization focusing on youth education in underserved communities.",
    overallTop: true,
  },
  {
    _id: 4,
    fullName: "James Rodriguez",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Sports & Athletics",
    title: "National Championship Victory",
    description:
      "Led the university team to a national championship victory while maintaining academic excellence.",
    overallTop: true,
  },
  {
    _id: 5,
    fullName: "Lisa Zhang",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2761&auto=format&fit=crop",
    achievementCategory: "Research Achievements",
    title: "Breakthrough in Medical Research",
    description:
      "Made significant contributions to cancer research, leading to new treatment possibilities.",
    overallTop: true,
  },
  {
    _id: 6,
    fullName: "David Park",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Professional Achievements",
    title: "Global Business Leadership",
    description:
      "Successfully led a multinational team in launching innovative products across three continents.",
    overallTop: true,
  },
  {
    _id: 7,
    fullName: "Maria Garcia",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop",
    achievementCategory: "Academic Excellence",
    title: "Distinguished Teaching Award",
    description:
      "Recognized for exceptional teaching methods and student mentorship in computer science.",
    overallTop: true,
  },
  {
    _id: 8,
    fullName: "Alex Foster",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Innovation & Technology",
    title: "Cybersecurity Excellence",
    description:
      "Developed cutting-edge security protocols now used by major tech companies worldwide.",
    overallTop: true,
  },
  {
    _id: 9,
    fullName: "Nina Patel",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
    achievementCategory: "Research Achievements",
    title: "Environmental Science Pioneer",
    description:
      "Led groundbreaking research in climate change mitigation strategies.",
    overallTop: true,
  },
  {
    _id: 10,
    fullName: "Thomas Wright",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Professional Achievements",
    title: "Engineering Innovation Award",
    description:
      "Revolutionized renewable energy systems with patented solar technology.",
    overallTop: true,
  },
  {
    _id: 11,
    fullName: "Aisha Rahman",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2870&auto=format&fit=crop",
    achievementCategory: "Academic Excellence",
    title: "International Mathematics Olympiad Gold",
    description:
      "Won gold medal at IMO 2023, representing the university with distinction in advanced mathematical problem-solving.",
    overallTop: true,
  },
  {
    _id: 12,
    fullName: "Marcus Johnson",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2860&auto=format&fit=crop",
    achievementCategory: "Sports & Athletics",
    title: "Swimming World Record",
    description:
      "Broke the university record in 200m butterfly and represented the country at World Championships.",
    overallTop: true,
  },
  {
    _id: 13,
    fullName: "Sofia Martinez",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Leadership & Service",
    title: "Social Impact Initiative",
    description:
      'Founded "Tech for All" program, providing coding education to over 1000 underprivileged students.',
    overallTop: true,
  },
  {
    _id: 14,
    fullName: "Ryan O'Connor",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2870&auto=format&fit=crop",
    achievementCategory: "Innovation & Technology",
    title: "Blockchain Innovation Award",
    description:
      "Developed a revolutionary blockchain solution for sustainable supply chain management.",
    overallTop: true,
  },
  {
    _id: 15,
    fullName: "Priya Sharma",
    image:
      "https://images.unsplash.com/photo-1557555187-23d685287bc3?q=80&w=2864&auto=format&fit=crop",
    achievementCategory: "Research Achievements",
    title: "Quantum Computing Research",
    description:
      "Published groundbreaking research in quantum computing algorithms in Nature journal.",
    overallTop: true,
  },
  {
    _id: 16,
    fullName: "Ethan Lee",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2848&auto=format&fit=crop",
    achievementCategory: "Academic Excellence",
    title: "Valedictorian",
    description: "Graduated as valedictorian with a perfect GPA.",
  },
  {
    _id: 17,
    fullName: "Chloe Davis",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2864&auto=format&fit=crop",
    achievementCategory: "Sports & Athletics",
    title: "Tennis Champion",
    description: "Won the national collegiate tennis championship.",
  },
  {
    _id: 18,
    fullName: "Brandon Wilson",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Leadership & Service",
    title: "Student Body President",
    description:
      "Served as student body president, implementing key initiatives.",
  },
  {
    _id: 19,
    fullName: "Olivia Green",
    image:
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=2788&auto=format&fit=crop",
    achievementCategory: "Innovation & Technology",
    title: "AI Innovator",
    description: "Developed a novel AI algorithm for medical diagnosis.",
  },
  {
    _id: 20,
    fullName: "Kevin Brown",
    image:
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Research Achievements",
    title: "Climate Research Grant",
    description: "Received a prestigious grant for climate change research.",
  },
  {
    _id: 21,
    fullName: "Lauren Taylor",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Professional Achievements",
    title: "Startup Founder",
    description: "Founded a successful tech startup.",
  },
  {
    _id: 22,
    fullName: "Joseph Hill",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Academic Excellence",
    title: "Dean's List",
    description:
      "Regularly featured on the Dean's List for academic excellence.",
  },
  {
    _id: 23,
    fullName: "Ashley White",
    image:
      "https://images.unsplash.com/photo-1541647376583-02892320673a?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Sports & Athletics",
    title: "Track and Field Star",
    description: "Excelled in track and field, winning multiple awards.",
  },
  {
    _id: 24,
    fullName: "Christopher King",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Leadership & Service",
    title: "Volunteer Leader",
    description: "Led numerous volunteer initiatives in the community.",
  },
  {
    _id: 25,
    fullName: "Jessica Wright",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Innovation & Technology",
    title: "Software Developer",
    description:
      "Developed innovative software solutions for various industries.",
  },
  {
    _id: 26,
    fullName: "Daniel Garcia",
    image:
      "https://images.unsplash.com/photo-1568602471122-78329514c265?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Research Achievements",
    title: "Medical Breakthrough",
    description: "Contributed to a significant medical breakthrough.",
  },
  {
    _id: 27,
    fullName: "Michelle Adams",
    image:
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2787&auto=format&fit=crop",
    achievementCategory: "Professional Achievements",
    title: "Business Innovator",
    description: "Introduced innovative business strategies.",
  },
];
*/
export const categories = [
  "Overall TOP 10",
  "Academic Excellence",
  "Research Achievements",
  "Professional Achievements",
  "Leadership & Service",
  "Sports & Athletics",
  "Innovation & Technology",
];
