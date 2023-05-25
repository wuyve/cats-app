import React, { FC, useState } from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import './index.scss';
import My from '../My';


const Bottom = (props) => {
  const { tabs, setRouteActive } = props;
  return (
    <TabBar safeArea={true} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
const tabs = [
  {
    key: '/home',
    title: '首页',
    icon: <AppOutline />,
    // component: <Home />,
  },
  {
    key: '/demo',
    title: '我的待办',
    icon: <UnorderedListOutline />,
    // component: <Home />,
  },
  {
    key: '/demo22',
    title: '我的消息',
    icon: <MessageOutline />,
    // component: <Home />,
  },
  {
    key: '/my',
    title: '个人中心',
    icon: <UserOutline />,
    component: <My />,
  },
];

export default function () {

  const setRouteActive = (item: string) => {
    setActivityKey(item)
  }
  const navBarRight = () => {
    if (activityKey !== '/home') return null;
    return <AddCircleOutline fontSize={24} onClick={
      () => {
        console.log('发表文章');
        // 跳转到发表文章页面
      }
    } />
  }

  const [activityKey, setActivityKey] = useState(tabs[0].key)
  const activeTitle = tabs.find(item => item.key === activityKey)?.title;
  const content = tabs.find(item => item.key === activityKey)?.component;
  return (
    <div className="app">
      <div className="app-top">
        <NavBar back={null} right={navBarRight()}>{ activeTitle }</NavBar>
      </div>
      <div className="app-content">
        {content}
      </div>
      <div className="app-bottom">
        <Bottom setRouteActive={setRouteActive} tabs={tabs} />
      </div>
    </div>
  )
}
