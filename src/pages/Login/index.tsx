import React, { useState } from 'react';
import { Form, Input, Button, Tabs } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { post } from '../../utils/ajax';
import { main1 } from '../../utils/translate';
import './index.scss';



const loginMethods = [
  {
    img: 'https://img.alicdn.com/imgextra/i4/O1CN01vx8Zpq1cxzYEQYrfF_!!6000000003668-2-tps-200-200.png',
    key: 'mobile',
  },
  {
    img: 'https://img.alicdn.com/imgextra/i1/O1CN01ME9QsR1lQrRXdjMmt_!!6000000004814-2-tps-200-200.png',
    key: 'psd',
  },
]

export default function index() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [state, seState] = useState({
    loginMethod: 'psd',
  });

  const fetchLogin = async(params) => {
    const res: any = await post('/users/login', params);
    if (res.errorCode === 0) {
      navigate('/my');
      // 存储用户信息
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    }
  }

  const onLogin = () => {
    const { nickName, password, mobile, verifyCode } = form.getFieldsValue(true);
    const params: any = {
      loginMethod: state.loginMethod,
    };
    if (state.loginMethod === 'psd') {
      params.nickName = nickName;
      params.password = password;
    } else if (state.loginMethod === 'mobile') {
      params.mobile = mobile;
      params.verifyCode = verifyCode;
    }
    fetchLogin(params);
  }
  return (
    <div className="login">
      <h2 className="login-title">终于等到你～</h2>
      <Form layout='horizontal' mode='card' form={form}>
        {
          state.loginMethod === 'psd' && <>
            <Form.Item name="nickName" label='昵称/手机号'>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item name="password" label='密码'>
              <Input placeholder='请输入' />
            </Form.Item>
          </>
        }
        {
          state.loginMethod === 'mobile' && <>
            <Form.Item name="mobile" label='手机号'>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item name="verifyCode" label='验证码' extra={<a>发送验证码</a>}>
              <Input placeholder='请输入' />
            </Form.Item>
          </>
        }
      </Form>
      <Button style={{ marginTop: '30%' }} block color='primary' size='large' onClick={onLogin}>
        确定
      </Button>
      <div className="login-login">
        <span onClick={() => {
          navigate('/regist')
        }}>什么？还没有账号？去注册～</span>
      </div>
      <div className="flex-start-center login-bottom">
        <span>其他登陆方式: </span>
        <div className="login-bottom-content">
          {
            loginMethods.map(item => {
              return <img className="login-methods-icon" src={item.img} alt={item.key} onClick={
                () => {
                  seState({ loginMethod: item.key })
                }
              } />
            })
          }
        </div>
      </div>
    </div>
  )
}
