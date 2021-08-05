import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import moment from 'moment'
// 引入less,主题色才起作用
// import 'antd/dist/antd.less'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// vite环境变量
console.log(import.meta.env.VITE_APP_URL)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
