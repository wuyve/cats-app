import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Popup, Picker, TextArea, Input, Calendar, PickerView, Switch } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons';
import { post, get } from '../../../utils/ajax';
import { hours, minutes } from '@/utils/utils';

import './index.scss'

const PAGE_NAME = 'todo-add-event-page';


export default () => {
  const navigator = useNavigate();
  const urlParams = useParams();
  console.log(urlParams);

  const [title, setTitle] = useState<string>(null);
  const [description, setDescription] = useState<string>('');
  const [showDetailPopup, setShowDetailPopup] = useState<boolean>(false);
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false);
  const [typeId, setTypeId] = useState<string>(null);
  const [typeList, setTypeList] = useState<any[]>([[]])
  const [detailDate, setDetailDate] = useState<any>(null);
  const [detailTime, setDetailTime] = useState<any>();
  const [detailArea, setDetailArea] = useState<string>('');
  const [isCalendarShow, setIsCalendarShow] = useState<'none' | 'block'>('none');
  const [isTimeShow, setIsTimeShow] = useState<'none' | 'block'>('none');
  const [isShowArea, setIsShowArea] = useState<'none' | 'block'>('none');

  const fetchTypeList = async() => {
    const res = await get('/todo/type/list');
    const data = _.get(res, 'data.data', []);
    setTypeList([data.map(item => ({ label: item.typeName, value: item.id }))]);
    if (urlParams.typeId !== '0') {
      setTypeId(urlParams.typeId);
    }
  };

  const fetchOneEvent = async() => {
    const { id } = urlParams;
    if (id === '0') return;
    const res = await get('/todo/event/detail', { id });
    const data = _.get(res, 'data', {});
    setTitle(data.title);
    setDescription(data.description);
    setTypeId(data.typeId);
    setDetailDate(data.detailDate);
    setDetailTime(data.detailTime?.split(':'));
    setDetailArea(data.detailArea);
    setIsCalendarShow(data.detailDate ? 'block' : 'none');
    setIsTimeShow(data.detailTime ? 'block' : 'none');
    setIsShowArea(data.detailArea ? 'block' : 'none');
  }

  const fetchModifyEvent = async(params) => {
    const res: any = await post('/todo/add/event', params);
    if (res.errorCode === 0) {
      navigator(-1);
    }
  };

  useEffect(() => {
    fetchTypeList();
    fetchOneEvent();
  }, []);

  const confirm = () => {
    if (!title) {
      return;
    }
    const params: any = {
      title,
      description,
      typeId,
      detailDate,
      detailTime: isTimeShow === 'block' ? detailTime?.join(':') : null,
      detailArea,
    };
    if (urlParams.id !== '0') {
      params.id = urlParams.id;
    }
    fetchModifyEvent(params);
  };

  const getTypeName = () => {
    const filterItem = typeList[0].find(item => item.value === Number(typeId));
    return _.get(filterItem, 'label', null);
  };
  const timeColumns = () => {
    return [
      hours().map(item => ({ label: item, value: item })),
      minutes().map(item => ({ label: item, value: item })),
    ]
  };

  return (
    <div className={PAGE_NAME}>
      <div className={`${PAGE_NAME}-top flex-between-center`}>
        <div className="cancel" onClick={() => navigator(-1)}>取消</div>
        <div className="title">新建提醒事项</div>
        <div className="confirm" onClick={confirm} style={{ color: title ? '#2b9fe7' : '#ccc' }}>确定</div>
      </div>
      <div className={`${PAGE_NAME}-center`}>
        <Input
          placeholder='标题'
          value={title}
          maxLength={18}
          onChange={val => {
            setTitle(val)
          }}
        />
        <TextArea
          placeholder='备注'
          value={description}
          onChange={val => {
            setDescription(val)
          }}
          showCount
        />
      </div>
      <div className={`${PAGE_NAME}-li flex-between-center`} onClick={() => setShowDetailPopup(true)}>
        <div>详细信息</div>
        <div>
          <span className="content">
            {
              isCalendarShow === 'block' && detailDate
            }
            {
              isTimeShow === 'block' && (' ' + detailTime?.join(':'))
            }
          </span>
          <RightOutline />
        </div>
      </div>
      <Popup
        visible={showDetailPopup}
        onClose={() => {
          setShowDetailPopup(false);
        }}
        position='right'
        showCloseButton
        bodyClassName={`${PAGE_NAME}-detail`}
      >
        <div className={`${PAGE_NAME}-detail-content`}>
          <h3>详细信息</h3>
          <div className={`${PAGE_NAME}-li flex-between-center`}>
            <div>日期</div>
            <div>
              <span>{detailDate}</span>
              <Switch checked={isCalendarShow === 'block'} uncheckedText='关' checkedText='开' onChange={(val) => {
                if (val) {
                  setDetailDate(dayjs().format('YYYY-MM-DD'));
                  setIsCalendarShow('block');
                } else {
                  setIsCalendarShow('none');
                  setDetailDate(isTimeShow === 'none' ? null : dayjs().format('YYYY-MM-DD'));
                }
              }} />
            </div>
          </div>
          <div className={`${PAGE_NAME}-detail-calendar`} style={{ display: isCalendarShow }}>
            <Calendar
              allowClear
              selectionMode='single'
              value={detailDate}
              onChange={val => {
                setDetailDate(dayjs(val).format('YYYY-MM-DD'))
              }}
            />
          </div>
          <div className={`${PAGE_NAME}-li flex-between-center`}>
            <div>时间</div>
            <div>
              <span>{detailTime?.join(': ')}</span>
              <Switch checked={isTimeShow === 'block'} uncheckedText='关' checkedText='开' onChange={(val) => {
                if (val) {
                  setIsTimeShow('block');
                  setDetailTime([0, 0])
                  setDetailDate(isCalendarShow === 'none' ? dayjs().format('YYYY-MM-DD') : detailDate);
                } else {
                  setIsTimeShow('none');
                  setDetailTime([])
                }
              }} />
            </div>
          </div>
          <div className={`${PAGE_NAME}-detail-calendar`} style={{ display: isTimeShow }}>
            <PickerView
              columns={timeColumns}
              value={detailTime}
              onChange={(val) => {
                setDetailTime(val)
              }}
            />
          </div>
          <div className={`${PAGE_NAME}-li flex-between-center`}>
            <div>地区</div>
            <Switch checked={isShowArea === 'block'} uncheckedText='关' checkedText='开' onChange={(val) => {
              if (val) {
                setIsShowArea('block');
              } else {
                setIsShowArea('none');
                setDetailArea('')
              }
            }} />
          </div>
          <div className={`${PAGE_NAME}-detail-calendar`} style={{ display: isShowArea }}>
            <TextArea
              placeholder='请输入地区'
              value={detailArea}
              onChange={val => {
                setDetailArea(val)
              }}
              showCount
            />
          </div>
        </div>
      </Popup>
      <div className={`${PAGE_NAME}-li flex-between-center`} onClick={() => setShowTypePicker(true)}>
        <div>列表</div>
        <div>
          <span className="content">{getTypeName()}</span>
          <RightOutline />
        </div>
      </div>
      <Picker
        columns={typeList}
        visible={showTypePicker}
        onClose={() => {
          setShowTypePicker(false)
        }}
        value={[typeId]}
        onConfirm={v => {
          setTypeId(v[0]);
        }}
      />
    </div>
  )
}
