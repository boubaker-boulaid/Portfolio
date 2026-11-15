// Site-wide content. Edit this file to update contact details and links.

export const site = {
  name: 'Boubaker',
  role: 'Full-Stack Developer',
  tagline:
    'I build modern web applications with Laravel, and turn ideas into powerful digital products.',
  // TODO: replace with your public contact address.
  email: 'your-email@example.com',
  // TODO: drop your CV into /public with this file name (or change the path).
  cvUrl: '/Boubaker-CV.pdf',
  social: {
    github: 'https://github.com/boubaker-boulaid',
    // TODO: replace with your LinkedIn profile URL.
    linkedin: 'https://www.linkedin.com/',
  },
};

export const mailto = `mailto:${site.email}`;

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export const socialLinks = [
  { id: 'github', label: 'GitHub', href: site.social.github, external: true },
  { id: 'linkedin', label: 'LinkedIn', href: site.social.linkedin, external: true },
  { id: 'mail', label: 'Email', href: mailto, external: false },
];

export const heroStats = [
  { id: 'projects', label: 'Projects', value: '12+', note: 'Completed', icon: 'arrow-up-right' },
  {
    id: 'experience',
    label: 'Years of Experience',
    value: '2+',
    note: 'Growing Stronger',
    icon: 'rocket',
  },
];

export const impactStats = [
  { id: 'projects', value: '12+', label: 'Projects', icon: 'folder' },
  { id: 'users', value: '1K+', label: 'Happy Users', icon: 'users' },
  { id: 'experience', value: '2+', label: 'Years Experience', icon: 'clock' },
];
