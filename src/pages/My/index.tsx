import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import { getUserInfo } from '../../utils/utils';
import NavBottom from '@/components/NavBottom';
import './index.scss';

const PAGE_NAME = 'my-page';

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(getUserInfo());

  // useEffect(() => {

  // }, [])
  console.log(userInfo)
  return (
    <div className='flex-start-center my-header'>
      <img className="avatar-large" src="https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/afe54052-6b37-4a59-942d-a6f1d030f144.png" alt="" />
      {
        userInfo.id ? 
        <div className="my-header-nickname">{userInfo.nickName}</div> : 
        <div className="my-login"  onClick={() => {
          console.log('跳转到登录～');
          navigate('/login');
          return null;
        }}>
          快来登录解锁更多吧～
        </div>
      }

    </div>
  )
}

const Settings = () => {
  const settingLists = [
    {
      label: '个人信息',
      path: '/my/userinfo',
    },
    {
      label: '账号设置',
      path: '/11',
    }
  ]
  return (
    <div className="my-setting-block">
      {
        settingLists.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.path}
              className="flex-between my-navlink"
            >
              <div>{item.label}</div>
              <RightOutline />
            </NavLink>
          );
        })
      }
    </div>
  )
}

const MyCats = () => {
  const catsList = [
    {
      id: 222,
      name: '小猪',
      img: 'https://img2.baidu.com/it/u=3484895696,2896813567&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660410000&t=ec5b138630e3ca60884c462dbb0c2232'
    },
    {
      id: 2222,
      name: '小猪22',
      img: 'https://img2.baidu.com/it/u=3484895696,2896813567&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660410000&t=ec5b138630e3ca60884c462dbb0c2232'
    },
    {
      id: 29612,
      name: '小猪324',
      img: 'https://img2.baidu.com/it/u=3484895696,2896813567&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660410000&t=ec5b138630e3ca60884c462dbb0c2232'
    },
    {
      id: 2412,
      name: '小猪324',
      img: 'https://img2.baidu.com/it/u=3484895696,2896813567&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660410000&t=ec5b138630e3ca60884c462dbb0c2232'
    }, {
      id: 2292,
      name: '小猪324',
      img: 'https://img2.baidu.com/it/u=3484895696,2896813567&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660410000&t=ec5b138630e3ca60884c462dbb0c2232'
    },
  ]
  return (
    <div className="my-cats-block">
      <div className="card-title">我的崽崽</div>
      <div className="flex my-cats-block-content">
        {
          catsList.map(item => {
            return (
              <div key={item.id} className="flex-cloumn-center my-cats-img-block">
                <img src={item.img} className="my-cats-img" />
                <span>{item.name}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default function index() {
  return (
    <>
      <div className={PAGE_NAME}>
        <Header />
        <MyCats />
        <Settings />
      </div>
      <NavBottom activityKey='/my' />
    </>
  )
}
