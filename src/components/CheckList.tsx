import React, { useEffect, useState } from 'react';
import { Button, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { checkList } from '../utils/checkList';
import './CheckList.css';


const CheckList: React.FC<any> = () => {
  const [list, setlist] = useState<any[]>([]);

  useEffect(() => {
    setlist(checkList?.map(item => ({ ...item, checked: false })))
  }, [])

  return (
    <div>
      {
        list.map((item, index) => (
          <div key={item.key} className="check-list-item">
            <div className="check-list-item-head">
              <div>{index + 1}. {item.key}</div>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </div>
            <div className="check-list-item-mark">{item.remark}</div>
          </div>
        ))
      }
      <Button>00</Button>
    </div>
  );
};

export default CheckList;
