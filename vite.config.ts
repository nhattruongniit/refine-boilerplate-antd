import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';
import macrosPlugin from 'vite-plugin-babel-macros';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import eslint from 'vite-plugin-eslint';
import { compression } from 'vite-plugin-compression2';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env');

  const htmlPlugin = () => {
    return {
      name: 'html-transform',
      transformIndexHtml(html: string) {
        return html.replace(/%(.*?)%/g, function (match, p1) {
          return env[p1];
        });
      },
    };
  };
  return {
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
    },
    build: {
      target: 'es2020',
      outDir: 'build',
      minify: isProd,
      chunkSizeWarningLimit: 1000,
    },
    define: {
      'process.platform': {},
      'process.versions': {},
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
        '@src': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
        define: {
          global: 'globalThis',
        },
        // plugins: [
        // NodeGlobalsPolyfillPlugin({
        //   buffer: true,
        // }),
        // ],
      },
    },
    plugins: [
      nodePolyfills(),
      VitePluginHtmlEnv({
        compiler: true,
        // compiler: false // old
      }),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          presets: ['@emotion/babel-preset-css-prop'],
        },
      }),
      envCompatible(),
      tsconfigPaths(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
      macrosPlugin(),
      htmlPlugin(),
      eslint(),
      isProd && splitVendorChunkPlugin(),
      isProd && compression({ exclude: ['.webp', '.gif', '.ico'] }),
    ].filter(Boolean),
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  };
});
