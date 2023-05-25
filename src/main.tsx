import ReactDOM from 'react-dom/client'
import router from './router';

// 引入antd-mobile样式
import 'antd-mobile/bundle/css-vars-patch.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  router
)
