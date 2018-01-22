import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './index.css';

// 1. Initialize
const app = dva({
    history: createHistory()
});

// 2. Plugins
// app.use({});    //插件

// 3. Model
app.model(require('./models/calendar').default);    //加载数据model文件

// 4. Router
app.router(require('./router').default);    //加载路由文件

// 5. Start
app.start('#root');     //启动程序
