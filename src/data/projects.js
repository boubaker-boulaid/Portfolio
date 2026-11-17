import ecommerceStore from '../assets/projects/ecommerce-store.webp';
import adminDashboard from '../assets/projects/admin-dashboard.webp';
import libraryManagement from '../assets/projects/library-management.webp';
import perfumeStore from '../assets/projects/perfume-store.webp';
import { site } from './site.js';

/*
 * `featured` projects are always visible; the rest appear when the visitor
 * presses "View All Projects". `url` is where the card's arrow button goes —
 * point it at the live site or the repository, or set it to null to hide the
 * button (e.g. for private client work).
 */
export const projects = [
  {
    id: 'perfume-store',
    title: 'Perfume E-commerce Platform',
    category: 'E-Commerce',
    tone: 'lime',
    stack: ['Laravel 12', 'React 19'],
    image: perfumeStore,
    alt: 'Perfume shop landing page with a bottle on a stone pedestal',
    url: 'https://github.com/boubaker-boulaid/perfume-online-shop',
    featured: true,
  },
  {
    id: 'stock-management',
    title: 'Stock Management System',
    category: 'Internship',
    tone: 'lavender',
    stack: ['Laravel', 'MySQL', 'Sanctum'],
    image: adminDashboard,
    alt: 'Stock management dashboard with sales, stock value and alert summary cards',
    // Client project built during my internship at HOUATNOUR — code is private.
    url: null,
    featured: true,
  },
  {
    id: 'library-management',
    title: 'Multilingual Library System',
    category: 'Web App',
    tone: 'lime',
    stack: ['Laravel 12', 'Livewire'],
    image: libraryManagement,
    alt: 'Library site home page with a book search field',
    url: 'https://github.com/boubaker-boulaid/library_management_system',
    featured: true,
  },
  {
    id: 'ecommerce-store',
    title: 'Shoe Store',
    category: 'E-Commerce',
    tone: 'lavender',
    // TODO: confirm the stack and repository for this project.
    stack: ['Laravel', 'Tailwind CSS'],
    image: ecommerceStore,
    alt: 'Home page of a shoe store with a featured sneaker and a Shop Now button',
    url: site.social.github,
    featured: false,
  },
];
