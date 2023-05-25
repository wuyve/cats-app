import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, TabBar } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import './index.scss'

const PAGE_NAME = 'nav-bottom-page';



export default function (props) {
  console.log('props', props)
  const [activityKey, setActivityKey] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setActivityKey(props.activityKey);

  }, [props.activityKey]);

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/todo',
      title: '我的待办',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/demo22',
      title: '我的消息',
      icon: <MessageOutline />,
    },
    {
      key: '/my',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ];

  const changeTab = (value) => {
    setActivityKey(value);
    navigate(value);
  };
  console.log('activityKey', activityKey)
  return (
    <div className={PAGE_NAME}>
      <TabBar activeKey={activityKey} safeArea={true} onChange={changeTab}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}
