export default {
  entry: ['src/**/*.ts'], // Include all files in the src folder
  format: ['esm', 'cjs'], // Output both ESM and CommonJS formats
  dts: true, // Generate TypeScript declaration files
  splitting: true, // Enable code splitting for modular imports
  clean: true, // Clean output directory before each build
  sourcemap: true, // Include source maps for easier debugging
  minify: true, // Minify output files
};
