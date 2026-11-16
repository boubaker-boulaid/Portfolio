// Technology logos from Devicon (https://devicon.dev), in resume order.
import php from '../assets/logos/php.svg';
import laravel from '../assets/logos/laravel.svg';
import livewire from '../assets/logos/livewire.svg';
import express from '../assets/logos/express.svg';
import javascript from '../assets/logos/javascript.svg';
import react from '../assets/logos/react.svg';
import vitejs from '../assets/logos/vitejs.svg';
import html5 from '../assets/logos/html5.svg';
import css3 from '../assets/logos/css3.svg';
import tailwindcss from '../assets/logos/tailwindcss.svg';
import bootstrap from '../assets/logos/bootstrap.svg';
import mysql from '../assets/logos/mysql.svg';
import mongodb from '../assets/logos/mongodb.svg';
import docker from '../assets/logos/docker.svg';
import git from '../assets/logos/git.svg';
import github from '../assets/logos/github.svg';
import githubactions from '../assets/logos/githubactions.svg';
import linux from '../assets/logos/linux.webp';

export const skills = [
  { name: 'PHP', logo: php },
  { name: 'Laravel', logo: laravel },
  { name: 'Livewire', logo: livewire },
  { name: 'Express.js', logo: express },
  { name: 'JavaScript', logo: javascript },
  { name: 'React', logo: react },
  { name: 'Vite', logo: vitejs },
  { name: 'HTML5', logo: html5 },
  { name: 'CSS3', logo: css3 },
  { name: 'Tailwind', logo: tailwindcss },
  { name: 'Bootstrap', logo: bootstrap },
  { name: 'MySQL', logo: mysql },
  { name: 'MongoDB', logo: mongodb },
  { name: 'Docker', logo: docker },
  { name: 'Git', logo: git },
  { name: 'GitHub', logo: github },
  { name: 'GH Actions', logo: githubactions },
  { name: 'Linux', logo: linux },
];

// Resume skills that have no logo, shown as tags under the grid.
export const moreSkills = [
  'REST API design',
  'Laravel Sanctum',
  'Pest (PHPUnit)',
  'Queues & scheduled jobs',
  'RBAC',
  'Token authentication',
  'Rate limiting',
  'Audit logging',
];
