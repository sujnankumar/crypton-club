import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'National Cyber League',
    description: 'Placed 1st out of 500+ teams in the Gold Bracket. Demonstrated advanced skills in Log Analysis and Network Traffic Forensics.',
    year: '2023',
    category: 'competition',
    rank: '1st Place',
    imageUrl: '/achievements/ncl.png'
  },
  {
    id: 'a2',
    title: 'HackTheBox University CTF',
    description: 'Top 10 finish globally. Successfully exploited 15/20 machines including the "Insane" difficulty final boss.',
    year: '2023',
    category: 'competition',
    rank: '8th Global',
    imageUrl: '/achievements/htb.png'
  },
  {
    id: 'a3',
    title: 'NSA Codebreaker Challenge',
    description: 'Chapter awarded as a Center of Academic Excellence for completing all challenge phases.',
    year: '2022',
    category: 'recognition',
    imageUrl: '/achievements/nsa.png'
  },
  {
    id: 'a4',
    title: 'OSCP Certification Mass-Pass',
    description: '10 club members successfully obtained their Offensive Security Certified Professional certification in a single summer cohort.',
    year: '2024',
    category: 'certification',
    imageUrl: '/achievements/oscp.png'
  },
  {
    id: 'a5',
    title: 'DEF CON 31 CTF Qualifiers',
    description: 'Qualified for the semi-finals in Las Vegas. Solved the critical crypto challenge "Enigma2.0".',
    year: '2023',
    category: 'competition',
    rank: 'Semi-Finalist',
    imageUrl: '/achievements/defcon.png'
  }
];