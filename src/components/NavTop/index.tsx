import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom'

interface IProps {
  title?: string;
  back?: any;
}

export default (props: IProps) => {
  const navigate = useNavigate()
  const back = () => {
    console.log('点击了返回！！！');
    navigate(-1);
  }
  return (
    <NavBar onBack={props.back || back}>{props.title || '返回'}</NavBar>
  )
}

