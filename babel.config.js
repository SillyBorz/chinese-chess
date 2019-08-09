module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ],
    [
      'import',
      {
        libraryName: 'muse-ui',
        libraryDirectory: 'lib',
        camel2DashComponentName: false
      },
      'muse'
    ]
  ]
};
