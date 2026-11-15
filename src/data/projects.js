import ecommerceStore from '../assets/projects/ecommerce-store.webp';
import adminDashboard from '../assets/projects/admin-dashboard.webp';
import taskManager from '../assets/projects/task-manager.webp';
import libraryManagement from '../assets/projects/library-management.webp';
import perfumeStore from '../assets/projects/perfume-store.webp';
import { site } from './site.js';

/*
 * `featured` projects are always visible; the rest appear when the visitor
 * presses "View All Projects". `url` is where the card's arrow button goes —
 * point it at the live site or the repository.
 */
export const projects = [
  {
    id: 'ecommerce-store',
    title: 'E-Commerce Store',
    category: 'Web App',
    tone: 'lime',
    stack: ['Laravel', 'Vue.js'],
    image: ecommerceStore,
    alt: 'Home page of a shoe store with a featured sneaker and a Shop Now button',
    url: site.social.github,
    featured: true,
  },
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard',
    category: 'Dashboard',
    tone: 'lavender',
    stack: ['Laravel', 'Livewire'],
    image: adminDashboard,
    alt: 'Stock management dashboard with sales, stock value and alert summary cards',
    url: site.social.github,
    featured: true,
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    category: 'SaaS',
    tone: 'lime',
    stack: ['Laravel', 'Inertia.js'],
    // Rendered mockup — swap for a real screenshot when one is available.
    image: taskManager,
    alt: 'Task board with To Do, In Progress and Done columns',
    url: site.social.github,
    featured: true,
  },
  {
    id: 'library-management',
    title: 'Library Management',
    category: 'Web App',
    tone: 'lavender',
    // TODO: confirm the stack for this project.
    stack: ['Laravel', 'Tailwind CSS'],
    image: libraryManagement,
    alt: 'Library site home page with a book search field',
    url: site.social.github,
    featured: false,
  },
  {
    id: 'perfume-store',
    title: 'Perfume Store',
    category: 'E-Commerce',
    tone: 'lime',
    // TODO: confirm the stack for this project.
    stack: ['Laravel', 'Tailwind CSS'],
    image: perfumeStore,
    alt: 'Perfume shop landing page with a bottle on a stone pedestal',
    url: site.social.github,
    featured: false,
  },
];
