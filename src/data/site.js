// Site-wide content. Edit this file to update contact details and links.

export const site = {
  name: 'Boubaker',
  lastName: 'Boulaid',
  fullName: 'Boubaker Boulaid',
  role: 'Full-Stack Developer',
  tagline:
    'I build modern web applications with Laravel, and turn ideas into powerful digital products.',
  email: 'boubakerboulaid205@gmail.com',
  phone: '+212 6 93 30 31 30',
  location: 'Agadir region, Morocco',
  availability: 'Open to remote work and relocation',
  cvUrl: '/Boubaker-Boulaid-CV.pdf',
  /*
   * Optional: a form endpoint (e.g. Formspree "https://formspree.io/f/xxxx")
   * that accepts a JSON POST. When empty, the contact form opens the visitor's
   * email app with the message already filled in.
   */
  formEndpoint: '',
  social: {
    github: 'https://github.com/boubaker-boulaid',
    linkedin: 'https://www.linkedin.com/in/boubaker-boulaid',
  },
};

export const mailto = `mailto:${site.email}`;
export const tel = `tel:${site.phone.replace(/\s+/g, '')}`;

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const socialLinks = [
  { id: 'github', label: 'GitHub', href: site.social.github, external: true },
  { id: 'linkedin', label: 'LinkedIn', href: site.social.linkedin, external: true },
  { id: 'mail', label: 'Email', href: mailto, external: false },
];

export const heroStats = [
  { id: 'projects', label: 'Projects', value: '6', note: 'Completed', icon: 'arrow-up-right' },
  {
    id: 'experience',
    label: 'Year of Experience',
    value: '1',
    note: 'Growing Stronger',
    icon: 'rocket',
  },
];

export const impactStats = [
  { id: 'projects', value: '6', label: 'Projects', icon: 'folder' },
  { id: 'endpoints', value: '47', label: 'API Endpoints Shipped', icon: 'code' },
  { id: 'experience', value: '1', label: 'Year Experience', icon: 'clock' },
];
