import { Form, Input, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { randomStr } from '@/utils/utils';
import { post } from '@/utils/ajax';
import md5 from 'md5';
import './index.scss';

export default function index() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const fetchRegist = async(data) => {
    const res: any = await post('/users/registe', data);
    if (res.errorCode === 0) {
      navigate('/my');
    }
  };

  const regist = () => {
    const fieldsValues = form.getFieldsValue(true)
    const solt = randomStr(6);
    const params = {
      nickName: fieldsValues.nickName,
      password: md5(md5(fieldsValues.password + solt)),
      mobile: fieldsValues.mobile,
      verifyCode: fieldsValues.verifyCode,
      solt,
    };
    fetchRegist(params);
  };
  return (
    <div className="regist">
      <h2 className="regist-title">终于等到你～</h2>
      <Form
          layout='horizontal'
          mode='card'
          form={form}
        >
        <Form.Item name="nickName" label='昵称' required>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name="password" label='密码' required>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name="comfirmPassword" label='确认密码' required>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name="mobile" label='手机号' required>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name="verifyCode" label='验证码' required>
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>
      <Button block color='primary' size='large' onClick={regist}>
        确定
      </Button>
      <div className="regist-login">
        <span onClick={() => {
          navigate('/login');
        }}
        >
          去登陆
        </span>
      </div>
    </div>
  )
}
