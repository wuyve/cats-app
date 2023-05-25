import React, { useEffect, useState } from 'react';
import { Button, Switch, Modal, message, Input } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { checkList, getStorage, setStorage } from '../utils/checkList';
import './CheckList.css';

const { confirm } = Modal;
const { TextArea } = Input;

type Itextarea = string | number | readonly string[] | undefined;

const CheckList: React.FC<any> = () => {
  const [list, setList] = useState<any[]>([]);
  const [showAddModal, setshowAddModal] = useState<boolean>(false);
  const [listOfItem, setListOfItem] = useState<{key: Itextarea; remark: Itextarea}>({
    key: undefined,
    remark: undefined,
  });
  const [isDelete, setIsDelete] = useState<boolean>(false);


  useEffect(() => {
    const storageList = getStorage('checkList');
    if (!storageList.length) {
      const data = checkList?.map(item => ({ ...item, checked: false }));
      setList(data);
      setStorage('checkList', data);
    } else {
      setList(storageList);
    }
  }, []);

  const onClearStatus = () => {
    confirm({
      title: '确定要重置吗?',
      icon: <ExclamationCircleFilled />,
      content: '重置后不可恢复！！！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        const data = list.map(item => ({ ...item, checked: false }));
        setList(data);
        setStorage('checkList', data);
      },
    });
  };

  const onChangeStatus = (checked: boolean, no: number) => {
    const data = list.map((item, index) => {
      if (no === index) {
        item.checked = checked;
      }
      return item;
    })
    setList(data);
    setStorage('checkList', data);
  };

  const onConfirmCheck = () => {
    const unCheckedList = list.filter(item => !item.checked);
    const unCheckedNum = unCheckedList?.length;
    const checkedNum = list.length - unCheckedNum;
    if (unCheckedNum) {
      message.warning(`您已完成${checkedNum}项检查，未完成${unCheckedNum}项检查`);
    } else {
      message.success(`恭喜🎉，验车成功！`);
    }
  };

  const onAddList = () => {
    setshowAddModal(true);
  };

  const onChangeTextarea = (val: string, key: string) => {
    console.log(val)
    setListOfItem({
      ...listOfItem,
      [key]: val,
    });
  };

  const handleCancel = () => {
    setListOfItem({
      key: undefined,
      remark: undefined,
    });
    setshowAddModal(false)
  };

  const handleOk = () => {
    const data = [...list, {...listOfItem, checked: false}];
    setList(data);
    setStorage('checkList', data);
    handleCancel();
  };

  const onDelItem = () => {
    setIsDelete(!isDelete);
  };

  const onDeleteItem = (no: number) => {
    let data = [...list];
    data?.splice(no, 1);
    setList(data);
    setStorage('checkList', data);
  };

  const onClearStorage = () => {
    confirm({
      title: '确定要清空缓存吗?',
      icon: <ExclamationCircleFilled />,
      content: '清空后不可恢复！！！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        const data = checkList.map(item => ({ ...item, checked: false }));
        setList(data);
        setStorage('checkList', data);
      },
    });
  };

  return (
    <div>
      <div className="app-head">
        <div onClick={() => onClearStorage()}>验车记录</div>
        <div>
          <PlusCircleOutlined onClick={() => onAddList()} />
          <span className="app-head-del" onClick={() => onDelItem()}>
            {isDelete ? '取消' : '删除项'}
          </span>
        </div>
      </div>
      <div className="check-list">
        {
          list.map((item, index) => (
            <div key={item.key} className="check-list-item">
              <div style={{ width: '100%' }}>
                <div className="check-list-item-head">
                  <div>{index + 1}. {item.key}</div>
                  <Switch
                    checked={item?.checked}
                    onChange={(checked) => onChangeStatus(checked, index)}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                  />
                </div>
                <div className="check-list-item-mark">{item.remark}</div>
              </div>
              {
                isDelete && <div className="check-list-item-delete" onClick={() => onDeleteItem(index)}>删除</div>
              }
            </div>
          ))
        }
      </div>
      <div className="check-btns-group">
        <Button onClick={() => onClearStatus()}>清除状态</Button>
        <Button type="primary" onClick={() => onConfirmCheck()}>验车完成</Button>
      </div>
      <Modal
        title="新增验车项目"
        open={showAddModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <div>
          <div>
            <span>主题</span>
            <TextArea value={listOfItem?.key} allowClear onChange={(e) => onChangeTextarea(e?.target?.value, 'key')} rows={2} />
          </div>
          <div>
            <span>备注</span>
            <TextArea value={listOfItem?.remark} allowClear onChange={(e) => onChangeTextarea(e?.target?.value, 'remark')} rows={6} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckList;
