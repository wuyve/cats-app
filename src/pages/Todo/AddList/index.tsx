import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { Input } from 'antd-mobile'
import { UnorderedListOutline } from 'antd-mobile-icons';
import { post, get } from '../../../utils/ajax';

import './index.scss'

const PAGE_NAME = 'todo-add-page';

const colors = ['#000', '#F00', '#0F0', '#00F', '#FF0', '#F0F', '#0FF', '#CCC'];

export default () => {
  const navigator = useNavigate();
  const urlParams = useParams();
  console.log(urlParams)
  const [color, setColor] = useState<string>(colors[0]);
  const [typeName, setTypeName] = useState<string>(null);

  useEffect(() => {
    fetchSingleType();
  }, []);

  const confirm = async() => {
    if (!typeName) return;
    const params = { color, typeName, id: urlParams.id };
    const res: any = await post('/todo/add/type', params);
    if (res.errorCode === 0) {
      navigator(-1);
    }
  };

  const fetchSingleType = async() => {
    if (urlParams.id === '0') return;
    const res = await get('/todo/type/list/single', { id: urlParams.id });
    const data = _.get(res, 'data.data[0]', {});
    setTypeName(_.get(data, 'typeName', null));
    setColor(_.get(data, 'color', colors[0]));
  }

  return (
    <div className={PAGE_NAME}>
      <div className={`${PAGE_NAME}-top flex-between-center`}>
        <div className="cancel" onClick={() => navigator(-1)}>取消</div>
        <div className="title">新建列表</div>
        <div className="confirm" onClick={confirm} style={{ color: typeName ? '#2b9fe7' : '#ccc' }}>确定</div>
      </div>
      <div className={`${PAGE_NAME}-body`}>
        <div className={`${PAGE_NAME}-body-icon flex-center-center`} style={{ backgroundColor: color }}>
          <UnorderedListOutline fontSize={30} color="#FFF" />
        </div>
        <div className={`${PAGE_NAME}-body-input`}>
          <Input value={typeName} onChange={val => setTypeName(val)} placeholder='请输入内容' maxLength={20} clearable />
        </div>
      </div>
      <div className={`${PAGE_NAME}-color flex-start-center`}>
        {
          colors.map(item => <div key={item} className={`${PAGE_NAME}-color-li`} style={{ backgroundColor: item }} onClick={() => setColor(item)}></div>)
        }
      </div>
    </div>
  )
}
