module.exports = {
  devServer: {
    proxy: {
        //zhengze zhiyaoshi /api kaitou
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
      }
    }
  }
}