const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  webpack: (config, { isServer }) =>
  {
    if (!isServer)
    {
      config.resolve.fallback = { fs: false, path: false }
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
    }

    return config
  },
}
