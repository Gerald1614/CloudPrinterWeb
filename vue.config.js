module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    transpile: true,
    workboxOptions: {
      swSrc: 'src/sw.js',
      swDest: 'sw.js',
    },
  },
};
