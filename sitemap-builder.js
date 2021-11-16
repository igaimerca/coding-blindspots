require('babel-register')({
  presets: ['es2015', 'react'],
});

const router = require('./Routes').default;
const Sitemap = require('react-router-sitemap').default;

new Sitemap(router).build('https://localhost8081').save('./public/sitemap.xml');
