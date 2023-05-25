import React, { useState } from 'react';
import { Input, Radio, DatePicker, ImageUploader } from 'antd-mobile';
import { SEX } from '../../../utils/enum';
import NavTop from '@/components/NavTop';
import './index.scss'

const PAGE_NAME = 'my-userinfo-page';

const Info = () => {
  const [userInfo, setUserInfo] = useState({
    myName: '',
    mysex: '1',
    myBirth: new Date(),
    mypwd: '',
    myPhone: '',
  });
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [avatarList, setAvatarList] = useState<any>([]);
  const onchangeUserInfo = (key, val) => {
    setUserInfo({
      ...userInfo,
      [key]: val,
    });
  };


  return (
    <div className={`${PAGE_NAME}-info`}>
      <div className={`${PAGE_NAME}-info-item flex-between-end`}>
        <div className="label">我的头像</div>
        <div>
          <img className="avatar" src="https://img2.baidu.com/it/u=1654878211,2919102183&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=704" alt="" />
          <span style={{ fontSize: '12px', color: '#a5b' }}>更换</span>
        </div>
        {/* <ImageUploader
          value={avatarList}
          onChange={(val) => console.log(val)}
          upload={(file) => {
            console.log(file)
            return [];
          }}
        /> */}
      </div>
      <div className={`${PAGE_NAME}-info-item flex-between-end`}>
        <div className="label">我的昵称</div>
        <Input
          style={{
            '--text-align': 'right'
          }}
          placeholder='请输入我的昵称'
          value={userInfo.myName}
          onChange={val => onchangeUserInfo('myName', val)}
        />
      </div>
      
      <div className={`${PAGE_NAME}-info-item flex-between-end`}>
        <div className="label">性别</div>
        <Radio.Group value={userInfo.mysex} onChange={val => onchangeUserInfo('mysex', val)}>
          {
            SEX.map(item => <Radio value={item.value} key={item.value}>{item.label}</Radio>)
          }
        </Radio.Group>
      </div>
      <div className={`${PAGE_NAME}-info-item flex-between-end`}>
        <div className="label">生日</div>
        <div onClick={() => setDatePickerVisible(true)}>{userInfo.myBirth?.toDateString()}</div>
      </div>
      <div className={`${PAGE_NAME}-info-item flex-between-end`}>
        <div className="label">密码</div>
        <Input
          style={{
            '--text-align': 'right'
          }}
          placeholder='请输入密码'
          type='password'
          value={userInfo.mypwd}
          onChange={val => onchangeUserInfo('mypwd', val)}
        />
      </div>
      <div className={`${PAGE_NAME}-info-item flex-between-end`}>
        <div className="label">关联手机号</div>
        <Input
          style={{
            '--text-align': 'right'
          }}
          placeholder='请输入手机号'
          value={userInfo.myPhone}
          type="number"
          onChange={val => onchangeUserInfo('myPhone', val)}
        />
      </div>
    </div>
  )
}
const index = () => {
  return (
    <>
      <NavTop />
      <div className={PAGE_NAME}>
        <Info />
        <div className={`${PAGE_NAME}-bottom flex-center-center`}>
          <div className="flex-center-center">
            确定
          </div>
        </div>
      </div>
    </>
  )
}
export default index
