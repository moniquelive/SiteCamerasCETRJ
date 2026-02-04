module.exports = {
  content: [
    "./themes/camerasrj/layouts/**/*.html",
    "./themes/camerasrj/assets/**/*.css",
    "./themes/camerasrj/static/js/**/*.js",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
