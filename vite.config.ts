import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
// import usePluginImport from 'vite-plugin-importer'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'
import fs from 'fs'
import lessToJS from 'less-vars-to-js'

var themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, 'src/styles/variables.less'), 'utf8')
)

// 需要忽略的分片文件
var ignoreFile = []

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // usePluginImport({
    //   libraryName: "antd",
    //   libraryDirectory: "es",
    //   style: "css"
    // }),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`
        }
      ]
    }),
    reactRefresh()
  ],
  server: {
    port: 3000,
    // https: true,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            var fileName = id.toString().split('node_modules/')[1].split('/')[0].toString()
            if (ignoreFile.indexOf(fileName) === -1) {
              return fileName
            }
          }
        }
      }
    }
    // 去掉console
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     pure_funcs: ['console.log']
    //   }
    // }
  },
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      '@': path.resolve(__dirname, './src')
    }
  },
  // 修改antd主题色
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables
        // modifyVars: {
        //   "primary-color": "#1DA57A",
        //   "link-color": "#1DA57A",
        //   "border-radius-base": "2px"
        // }
      }
    }
  }
})
