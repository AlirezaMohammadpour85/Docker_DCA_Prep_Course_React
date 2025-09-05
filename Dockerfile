FROM node:18-alpine

WORKDIR /app

# Create React app
RUN npx create-react-app . --template typescript --skip-git

# Install dependencies
RUN npm install lucide-react

# Copy your component first
COPY docker-course-tutorial.tsx src/App.tsx

# Create index.css with basic styles (no Tailwind for now)
RUN cat > src/index.css << 'EOF'
body {
margin: 0;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

/* Basic utility classes to replace Tailwind */
.min-h-screen { min-height: 100vh; }
.bg-gradient-to-br { background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); }
.container { max-width: 1200px; margin: 0 auto; }
.mx-auto { margin-left: auto; margin-right: auto; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.text-center { text-align: center; }
.text-4xl { font-size: 2.25rem; }
.font-bold { font-weight: 700; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.text-gray-800 { color: #1f2937; }
.text-gray-600 { color: #4b5563; }
.bg-white { background-color: white; }
.rounded-lg { border-radius: 0.5rem; }
.shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.w-full { width: 100%; }
.h-2 { height: 0.5rem; }
.bg-gray-200 { background-color: #e5e7eb; }
.bg-blue-600 { background-color: #2563eb; }
.rounded-full { border-radius: 9999px; }
.transition-all { transition: all 0.3s; }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.lg\:col-span-1 { grid-column: span 1; }
.lg\:col-span-3 { grid-column: span 3; }
.sticky { position: sticky; }
.top-4 { top: 1rem; }
.text-left { text-align: left; }
.text-sm { font-size: 0.875rem; }
.font-medium { font-weight: 500; }
.bg-gray-50 { background-color: #f9fafb; }
.hover\:bg-gray-100:hover { background-color: #f3f4f6; }
.bg-blue-100 { background-color: #dbeafe; }
.text-blue-800 { color: #1e40af; }
.border-l-4 { border-left-width: 4px; }
.border-blue-600 { border-color: #2563eb; }
.text-green-600 { color: #059669; }
.text-green-800 { color: #065f46; }
.border-2 { border-width: 2px; }
.border-gray-300 { border-color: #d1d5db; }
.w-4 { width: 1rem; }
.h-4 { width: 1rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-xl { font-size: 1.25rem; }
.text-lg { font-size: 1.125rem; }
.font-semibold { font-weight: 600; }
.mt-6 { margin-top: 1.5rem; }
.mt-5 { margin-top: 1.25rem; }
.mt-4 { margin-top: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.ml-4 { margin-left: 1rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-3 { margin-bottom: 0.75rem; }
.border-t { border-top-width: 1px; }
.border { border-width: 1px; }
.rounded-md { border-radius: 0.375rem; }
.cursor-pointer { cursor: pointer; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.text-white { color: white; }
.bg-green-600 { background-color: #059669; }
.hover\:bg-green-700:hover { background-color: #047857; }
.hover\:bg-blue-700:hover { background-color: #1d4ed8; }
.bg-gray-600 { background-color: #4b5563; }
.hover\:bg-gray-700:hover { background-color: #374151; }
.disabled\:opacity-50:disabled { opacity: 0.5; }
.disabled\:cursor-not-allowed:disabled { cursor: not-allowed; }
.border-green-400 { border-color: #4ade80; }
.bg-green-100 { background-color: #dcfce7; }
.border-red-400 { border-color: #f87171; }
.bg-red-100 { background-color: #fee2e2; }
.border-blue-400 { border-color: #60a5fa; }
.hover\:bg-gray-100:hover { background-color: #f3f4f6; }
.text-red-600 { color: #dc2626; }
.font-medium { font-weight: 500; }
.mr-2 { margin-right: 0.5rem; }
.justify-between { justify-content: space-between; }
.text-right { text-align: right; }

@media (min-width: 1024px) {
.lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.lg\:col-span-1 { grid-column: span 1; }
.lg\:col-span-3 { grid-column: span 3; }
}
EOF

EXPOSE 3000

CMD ["npm", "start"]