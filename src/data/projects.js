/*
 * Projects: the home page cards and each project's detail page
 * (/projects/<slug>). Content comes from each project's README in
 * ../projects/<folder>/README.md.
 *
 * - `featured` cards are always visible on the home page; the rest appear
 *   under "View All Projects".
 * - `repo` is the "Source code" button. Leave it null for private code and
 *   set `privateNote` instead.
 * - Screenshots live in src/assets/projects/<folder>/ and are referenced as
 *   shot('<folder>/<file name>', alt text, caption).
 */

const files = import.meta.glob('../assets/projects/*/*.webp', { eager: true, import: 'default' });

// Pixel sizes, so the page reserves the right space before images load.
const sizes = {
  'perfume/home': [1440, 900],
  'perfume/shop': [1440, 900],
  'perfume/product': [1440, 900],
  'perfume/offer': [1440, 900],
  'perfume/checkout': [1440, 900],
  'perfume/admin-dashboard': [1440, 900],
  'perfume/admin-order': [1440, 900],
  'perfume/mobile': [1346, 940],
  'stock/dashboard': [1440, 1316],
  'stock/sales': [1440, 900],
  'stock/sale-form': [1440, 900],
  'stock/invoices': [1440, 900],
  'stock/stock': [1440, 900],
  'stock/production': [1440, 900],
  'stock/mobile': [1757, 1204],
  'library/home': [1280, 800],
  'library/search': [1280, 900],
  'library/books': [1280, 900],
  'library/book': [1280, 800],
  'library/mobile': [1330, 924],
  'ecommerce/home': [1280, 978],
  'ecommerce/products': [1280, 800],
  'ecommerce/product': [1280, 800],
  'ecommerce/cart': [1280, 800],
  'ecommerce/admin-products': [1280, 800],
  'ecommerce/admin-edit-product': [1280, 800],
  'ecommerce/mobile': [1266, 892],
};

function shot(key, alt, caption = '') {
  const src = files[`../assets/projects/${key}.webp`];
  if (!src) throw new Error(`Missing screenshot: ${key}`);
  const [width, height] = sizes[key];
  return { src, width, height, alt, caption };
}

export const projects = [
  {
    id: 'perfume',
    slug: 'lume-parfums',
    title: 'Perfume E-commerce Platform',
    name: 'Lumé Parfums',
    category: 'E-Commerce',
    tone: 'lime',
    stack: ['Laravel 13', 'React 19'],
    featured: true,
    repo: 'https://github.com/boubaker-boulaid/perfume-online-shop',
    summary:
      'A full-stack online perfume shop for the Moroccan market. Customers browse the catalog, order with cash on delivery and confirm through WhatsApp, while the owner runs orders, products, categories and offers from an admin area.',
    meta: [
      { label: 'Type', value: 'Personal project' },
      { label: 'Market', value: 'Morocco · French · prices in DH' },
      { label: 'Focus', value: 'Phones first' },
    ],
    stats: [
      { value: '228', label: 'feature tests' },
      { value: 'v1', label: 'versioned REST API' },
      { value: '2', label: 'apps: shop and admin' },
    ],
    overview: [
      'Lumé Parfums is a complete shop: a React and TypeScript storefront, a separate admin area, and a versioned Laravel API behind both. The admin code is loaded as its own file, so shop visitors never download it.',
      'Most of the work went into making orders safe. Orders can be retried without creating duplicates, stock rows are locked in a fixed order to avoid deadlocks, and prices are always taken from the database, never from the browser.',
    ],
    features: [
      {
        title: 'The shop',
        items: [
          'Catalog with search, category filters, a price range and sorting, all kept in the address so a filtered page can be shared.',
          'Special offers sold as sets, like "4 perfumes for 180 DH".',
          'A bag kept in the browser, and a checkout with field-by-field errors from the server.',
          'After ordering, the customer sends a ready-made WhatsApp message to confirm.',
        ],
      },
      {
        title: 'The admin area',
        items: [
          'Dashboard with the month’s revenue, orders by status, a 30-day sales chart, best sellers and low stock.',
          'Orders searchable by number, name or phone. Only allowed status changes are offered, and cancelling puts the stock back.',
          'Products, categories and offers: create, edit, hide and delete, with image upload.',
        ],
      },
      {
        title: 'The API',
        items: [
          'One response shape, French error messages and a request ID in every error.',
          'Idempotency keys on orders and cached catalog reads, cleared whenever the catalog changes.',
          'Customer and shop e-mails, plus scheduled payment reminders and automatic cancellation.',
        ],
      },
    ],
    techStack: [
      { label: 'Frontend', value: 'React 19, TypeScript, Vite, React Router, GSAP and Lenis' },
      { label: 'Backend', value: 'PHP 8.3, Laravel 13, Sanctum (cookie sessions and CSRF)' },
      { label: 'Database', value: 'MySQL or MariaDB, or SQLite' },
      { label: 'Quality', value: 'PHPUnit, Laravel Pint, ESLint, TypeScript' },
    ],
    cover: shot('perfume/home', 'Lumé Parfums home page with a perfume bottle on a satin backdrop'),
    gallery: [
      shot('perfume/shop', 'The shop grid with search, category filters and sorting', 'Catalog with filters'),
      shot('perfume/product', 'A product page for Sauvage with quantity and order buttons', 'Product page'),
      shot('perfume/offer', 'An offer page for a pack of four perfumes', 'Special offer sold as a set'),
      shot('perfume/checkout', 'The checkout form next to the order summary', 'Checkout'),
      shot('perfume/admin-dashboard', 'Admin dashboard with revenue, order counts, a sales chart and best sellers', 'Admin dashboard'),
      shot('perfume/admin-order', 'One order in the admin, with its items, customer and status buttons', 'Managing one order'),
    ],
    mobile: shot('perfume/mobile', 'The home page, a product and the admin dashboard on a phone'),
  },
  {
    id: 'stock',
    slug: 'houatnour-stock',
    title: 'Stock Management System',
    name: 'HOUATNOUR Stock',
    category: 'Internship',
    tone: 'lavender',
    stack: ['Laravel 13', 'React 18', 'MySQL'],
    featured: true,
    repo: null,
    privateNote: 'Client project built during my internship, so the code is private.',
    summary:
      'A stock and sales management app for HOUATNOUR, a halal meat distributor. The team tracks production lots, stock, clients, suppliers, sales and invoices in one place, and each employee sees only what their role needs.',
    meta: [
      { label: 'Role', value: 'Backend Developer Intern' },
      { label: 'Client', value: 'HOUATNOUR, Aoulouz' },
      { label: 'When', value: 'March – April 2026' },
    ],
    stats: [
      { value: '47', label: 'API endpoints' },
      { value: '3', label: 'user roles' },
      { value: '61', label: 'feature tests in CI' },
    ],
    overview: [
      'HOUATNOUR was running its stock on Excel sheets and paper logs. This app replaced them: sales, stock movements, production and invoices now live in one system that every team uses.',
      'Validating a sale takes the items out of stock and creates its invoice in one step. If a single article lacks stock, nothing changes, and stock rows are locked while they change so quantities always match the movements.',
    ],
    features: [
      {
        title: 'Sales and invoices',
        items: [
          'Clients, and sales with several articles per order, filtered by date, client and status.',
          'A sale moves from pending to validated or cancelled. Validating updates stock and creates the invoice together.',
          'Invoices with 20% VAT, marked paid or unpaid, and printable from the browser.',
        ],
      },
      {
        title: 'Stock and production',
        items: [
          'Live stock per article, flagged available, low or out of stock.',
          'Stock movements in and out. A movement that would make stock negative is refused.',
          'Production lots with their slaughter certificate. Completing a lot adds it to stock.',
        ],
      },
      {
        title: 'Administration and security',
        items: [
          'A dashboard with the month’s sales, stock value, alerts, pending orders, unpaid invoices and charts.',
          'Three roles (admin, sales, stock), hashed access codes, rate-limited logins and Sanctum tokens.',
          'Records that are part of the history can’t be deleted, and the last admin can’t be demoted.',
        ],
      },
    ],
    techStack: [
      { label: 'Frontend', value: 'React 18, Vite, React Router, Tailwind CSS, Radix UI, Recharts' },
      { label: 'Backend', value: 'PHP 8.3, Laravel 13, Sanctum (Bearer tokens)' },
      { label: 'Database', value: 'MySQL 8 or MariaDB' },
      { label: 'Quality', value: 'Pest, Laravel Pint, Composer audit, GitHub Actions' },
    ],
    cover: shot('stock/dashboard', 'HOUATNOUR admin dashboard with sales, stock value, alerts and charts'),
    gallery: [
      shot('stock/sales', 'The sales list with date, client and status filters', 'Sales and their status'),
      shot('stock/sale-form', 'The new sale form with client, delivery date and articles', 'Creating a sale'),
      shot('stock/invoices', 'The invoices list with paid, pending and unpaid invoices', 'Invoices'),
      shot('stock/stock', 'Stock per article with its status', 'Live stock levels'),
      shot('stock/production', 'Production lots with their quantity, status and certificate', 'Production lots'),
    ],
    mobile: shot('stock/mobile', 'The dashboard, the sales page and the menu on a phone'),
  },
  {
    id: 'library',
    slug: 'library-management',
    title: 'Multilingual Library System',
    name: 'Library Management System',
    category: 'Web App',
    tone: 'lime',
    stack: ['Laravel 12', 'Livewire 4'],
    featured: true,
    repo: 'https://github.com/boubaker-boulaid/library_management_system',
    summary:
      'An online library catalogue in English, French and Arabic. Visitors search and filter the books without page reloads, admins manage the catalogue from the same pages, and a token-protected API serves it to other apps.',
    meta: [
      { label: 'Type', value: 'Personal project' },
      { label: 'Languages', value: 'English, French, Arabic (right-to-left)' },
      { label: 'Focus', value: 'Security and tests' },
    ],
    stats: [
      { value: '3', label: 'languages, with RTL' },
      { value: '88', label: 'feature tests' },
      { value: '5/min', label: 'rate-limited login' },
    ],
    overview: [
      'The library catalogue is built with Laravel and Livewire. Search filters by category, language and type and sorts results live, and switching to Arabic turns the whole layout right-to-left.',
      'The REST API is hardened: Sanctum bearer tokens that expire after 7 days, a scheduled job that deletes expired tokens, rate-limited logins and admin-only writes. Every change to a book goes to an activity log, and GitHub Actions runs the tests and style checks on every push.',
    ],
    features: [
      {
        title: 'The catalogue',
        items: [
          'A home page search by title or author, a grid of covers, and a page for each book.',
          'A Livewire search page that filters by category, language and type and sorts by date, title, price or author.',
          'A phone layout with a menu button, filters that fold away and a two-column grid.',
        ],
      },
      {
        title: 'Accounts and admin',
        items: [
          'Registration, login, password reset and e-mail verification.',
          'Admins create, edit and delete books, with cover upload. Regular users can e-mail themselves a book’s details.',
          'Console commands to create, list, promote and delete users.',
        ],
      },
      {
        title: 'The API',
        items: [
          'Paginated book lists (up to 100 per page), with writes limited to admins.',
          'Queued e-mails and event-driven audit logging, so pages never wait on slow work.',
        ],
      },
    ],
    techStack: [
      { label: 'Backend', value: 'PHP 8.4, Laravel 12, Livewire 4, Sanctum 4' },
      { label: 'Frontend', value: 'Blade, Tailwind CSS, Alpine.js, Vite' },
      { label: 'Database', value: 'SQLite, MySQL or PostgreSQL' },
      { label: 'Quality', value: 'Pest, Laravel Pint, ESLint, Prettier, GitHub Actions' },
    ],
    cover: shot('library/home', 'Library home page with a "Find all the books you want" search box'),
    gallery: [
      shot('library/search', 'The search page with category, language and type filters', 'Live search and filters'),
      shot('library/books', 'The grid of book covers', 'Browsing the books'),
      shot('library/book', 'A book page with its description and overview', 'One book'),
    ],
    mobile: shot('library/mobile', 'The home page, the search page and a book page on a phone'),
  },
  {
    id: 'ecommerce',
    slug: 'footcap',
    title: 'Footcap Shoe Store',
    name: 'Footcap',
    category: 'E-Commerce',
    tone: 'lavender',
    stack: ['React 19', 'Laravel 12'],
    featured: false,
    repo: 'https://github.com/boubaker-boulaid/E-Commerce-Project',
    summary:
      'An online sports shoe store built with React and Laravel. Visitors filter and sort the shoes, signed-in customers keep a cart and favourites, and admins manage products and user accounts from their own dashboard.',
    meta: [
      { label: 'Type', value: 'Personal project' },
      { label: 'Design', value: 'Based on the free Footcap template' },
      { label: 'Auth', value: 'Sanctum SPA cookies' },
    ],
    stats: [
      { value: '2', label: 'roles: customer and admin' },
      { value: '0', label: 'tokens stored in the browser' },
    ],
    overview: [
      'Footcap is a React single-page app talking to a Laravel API. Logins use Sanctum’s cookie-based session for SPAs, so no token is ever kept in the browser.',
      'Customers get a cart saved on the server and a favourites list, both behind route guards. Admins are sent to a separate area under /admin that other users can’t open.',
    ],
    features: [
      {
        title: 'The shop',
        items: [
          'Product grid with brand filters, sorting by date or price, and pagination.',
          'A page for each shoe with a size and quantity picker.',
          'A phone layout with a menu button in the header.',
        ],
      },
      {
        title: 'Customers',
        items: [
          'Registration, login, password reset and e-mail verification.',
          'A server-side cart with subtotal, shipping and total, and a favourites list toggled from any card.',
        ],
      },
      {
        title: 'Admins',
        items: [
          'A product table with low stock highlighted, and a form to add or edit products with an image upload.',
          'A user table to change roles or delete accounts. Admins can’t delete their own account.',
        ],
      },
    ],
    techStack: [
      { label: 'Frontend', value: 'React 19, React Router 7, Axios, Vite, plain CSS' },
      { label: 'Backend', value: 'PHP 8.2, Laravel 12, Sanctum 4, Breeze (API auth)' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Quality', value: 'Pest, Laravel Pint, ESLint' },
    ],
    note: 'The storefront design is based on the free Footcap template by codewithsadee.',
    cover: shot('ecommerce/home', 'Footcap home page with a large running shoe and collection banners'),
    gallery: [
      shot('ecommerce/products', 'The product grid with brand filters', 'Products and brand filters'),
      shot('ecommerce/product', 'A shoe page with size and quantity pickers', 'Product page'),
      shot('ecommerce/cart', 'The cart with its order summary', 'Cart'),
      shot('ecommerce/admin-products', 'The admin table of products with edit and delete buttons', 'Admin product list'),
      shot('ecommerce/admin-edit-product', 'The admin form for editing a product', 'Editing a product'),
    ],
    mobile: shot('ecommerce/mobile', 'The home page, the product grid and a product page on a phone'),
  },
];

export const projectPath = (project) => `/projects/${project.slug}`;

export const findProject = (slug) => projects.find((project) => project.slug === slug);
