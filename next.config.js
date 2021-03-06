/**
 * This file sets a custom webpack configuration to use your Next.js app
 * with Sentry.
 *
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 * @see https://blog.sentry.io/2020/08/04/enable-suspect-commits-unminify-js-and-track-releases-with-vercel-and-sentry
 */
const { withSentryConfig } = require('@sentry/nextjs')
const withPlugins = require('next-compose-plugins')
// demo plugin demonstrating how to use @sentry/nextjs with next-compose-plugins
const withGraphql = require('next-plugin-graphql')

const moduleExports = {
  publicRuntimeConfig: {
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
}

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)

const config = withPlugins([withGraphql], moduleExports)
module.exports = withSentryConfig(config, SentryWebpackPluginOptions)
