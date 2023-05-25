import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from 'postcss-pxtorem'
import vitePluginsImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      vitePluginsImp({
        libList: [
          {
            libName: 'antd-mobile',
            libDirectory: 'es/components',
            style(name) {
              return `antd-mobile/es/components/${name}/${name}.css`
            }
          }
        ]
      })
    ],
    server: {
      // host: '30.197.227.228',
      // port: 3344,

      // host: '127.0.0.1',
      // port: 8080,
      // open: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }

    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.tsx', '.jsx', '.json'],
      alias: {
        '@': '/src'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/scss/all.scss";'
        }
      },
      postcss: {
        plugins: [
          postcss({
            rootValue: 16,
            propList: ['*'],
            unitPrecision: 5,
            exclude: /(node_modules)/
          })
        ]
      }
    }
  }
  
})
