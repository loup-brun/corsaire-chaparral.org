module.exports = {
//  parser: 'sugarss',
  map: false,
  plugins: [
    require('autoprefixer')({
      stats: [
        '>1%',
        'IE 9'
      ]
    })
  ]
}