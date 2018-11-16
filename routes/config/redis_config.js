
module.exports = (function () {
  return {
      run: {
          host: '127.0.0.1',
          port: '6379'
      },
      local: {
          host: '127.0.0.1',
          port: '6379'
      },
      dev: {
        host: '127.0.0.1',
        port: '6379'
      },
      live: {
        host: '127.0.0.1',
        port: '6379'
      }
  }
})();