/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const path = require('path')

const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  )
}

// Overrides for css-loader plugin
function cssLoaderOptions(modules) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getLocalIndent, ...others } = modules // Need to delete getLocalIdent else localIdentName doesn't work
  return {
    ...others,
    localIdentName: '[hash:base64:6]',
    exportLocalsConvention: 'camelCaseOnly',
    mode: 'local',
  }
}

module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['vinprotocol.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })


    const oneOf = config.module.rules.find((rule) => typeof rule.oneOf === 'object')

    if (oneOf) {
      // Find the module which targets *.scss|*.sass files
      const moduleSassRule = oneOf.oneOf.find((rule) =>
        regexEqual(rule.test, /\.module\.(scss|sass)$/),
      )

      if (moduleSassRule) {
        // Get the config object for css-loader plugin
        const cssLoader = moduleSassRule.use.find(({ loader }) => loader.includes('css-loader'))
        if (cssLoader) {
          cssLoader.options = {
            ...cssLoader.options,
            modules: cssLoaderOptions(cssLoader.options.modules),
          }
        }
      }
    }

    return config
  },
}