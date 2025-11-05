/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: This 'content' array tells Tailwind which files to scan.
  content: [
    "./index.html",
    // This path is essential. It tells Tailwind to scan all files
    // with .js, .ts, .jsx, and .tsx extensions inside the 'src' directory and its subdirectories.
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}