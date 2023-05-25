import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Regist from './pages/Regist';
import Home from './pages/Home';
import Login from './pages/Login';
import UserInfo from './pages/My/UserInfo'
import Demo22 from './pages/Demo22';
import NotFound from './assets/NotFound';
import App from './pages/App'
import My from './pages/My';
import Todo from './pages/Todo';
import TodoAdd from './pages/Todo/AddList';
import AddEvent from './pages/Todo/AddEvent';
import Event from './pages/Todo/Event';
import SearchList from './pages/Todo/SearchList';

import TestPageDemo22 from './pages/TestPageDemo22';

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="home" element={<Home />} />
        <Route path="my">
          <Route index element={<My />} />
          <Route path="userinfo" element={<UserInfo />} />
        </Route>
        <Route path="todo">
          <Route index element={<Todo />} />
          <Route path="modify/:id" element={<TodoAdd />} />
          <Route path="modify/event/:id/:typeId" element={<AddEvent />} />
          <Route path="event/:typeId/:type" element={<Event />} />
          <Route path="search/:search" element={<SearchList />} />

        </Route>
        <Route path="regist">
          <Route index element={<Regist />} />
        </Route>
        <Route path="login">
          <Route index element={<Login />} />
        </Route>
        <Route path="test">
            <Route index element={<TestPageDemo22 />} />
        </Route>
      </Route>
      
      
      <Route path="*" element={<NotFound />} />
      {/* <Route path="error" element={<Forbidden />} /> */}

    </Routes>
  </BrowserRouter>
);
