module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'primary': '#d1ad89',
        'secondary': '#fbf8f5',
        'secondary-deep': '#f0e3d8',
        'tertiary': '#a37b57',
        'pink-primary': '#fd99ff',
        'pink-secondary': '#ff9e9e',
        'green-primary': '#9effff',
        'green-secondary': '#91f48f',
        'yellow-primary': '#fff599',
        'yellow-secondary': '#f7d959',
        'blue-primary': '#7ed4f2',
        'blue-secondary': '#4acbed',
      },
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '991px',
      },
    },
  },
  plugins: [],
}
