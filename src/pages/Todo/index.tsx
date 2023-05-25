import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { SearchBar, SwipeAction, } from 'antd-mobile'
import { FaceRecognitionOutline, CalendarOutline, FileOutline, CheckOutline, UnorderedListOutline } from 'antd-mobile-icons';
import NavBottom from '@/components/NavBottom';
import { get } from '../../utils/ajax';
import './index.scss'

const PAGE_NAME = 'todo-page';


export default () => {
  const navigator = useNavigate();
  const [overViewData, setOverViewData] = useState({
    today: 0,
    plan: 0,
    all: 0,
    finished: 0,
  });
  const [todoList, setTodoList] = useState<any[]>([]);

  const fetchTodoList = async() => {
    const res = await get('/todo/type/list');
    const data = _.get(res, 'data.data', []);
    setTodoList(data);
  };

  const fetchOverview = async() => {
    const res: any = await get('/todo/overview');
    const data = _.get(res, 'data', {
      today: 0,
      plan: 0,
      all: 0,
      finished: 0,
    });
    setOverViewData(data);
  };

  const fetchDelTodoList = async(id) => {
    const res: any = await get('/todo/type/del', {id});
    if (res.errorCode === 0) {
      fetchTodoList();
    }
  };

  useEffect(() => {
    fetchTodoList();
    fetchOverview();
  }, []);

  const OverView = () => {
    const overview = [
      {
        color: '#91cdf0',
        text: '今日',
        num: overViewData.today,
        icon: <FaceRecognitionOutline fontSize={34} />,
        onClick: () => {
          console.log('今日');
          navigator(`/todo/event/0/`);
        },
      },
      {
        color: '#91f0af',
        text: '计划',
        num: overViewData.plan,
        icon: <CalendarOutline fontSize={34} />,
        onClick: () => {
          console.log('计划');
        },
      },
      {
        color: '#c0c6c9',
        text: '全部',
        num: overViewData.all,
        icon: <FileOutline fontSize={34} />,
        onClick: () => {
          console.log('全部');
        },
      },
      {
        color: '#f2a281',
        text: '完成',
        num: overViewData.finished,
        icon: <CheckOutline fontSize={34} />,
        onClick: () => {
          console.log('完成');
        },
      },
    ]
    return (
      <div className={`${PAGE_NAME}-cards`}>
        {
          overview.map(item => (
            <div className={`${PAGE_NAME}-cards-li`} style={{ backgroundColor: item.color }} onClick={() => navigator(`/todo/event/0/${item.text}`)}>
              <div className={`${PAGE_NAME}-cards-li-top`}>
                {item.icon}
                <span style={{ fontSize: '36px'}}>{item.num}</span>
              </div>
              <span>{item.text}</span>
            </div>
          ))
        }
      </div>
    )
  };

  const rightActions = (id) => {
    return [
      {
        key: 'mute',
        text: '编辑',
        color: 'primary',
        onClick: (e) => {
          // 阻止父级事件
          e.stopPropagation();
          navigator('/todo/modify/' + id);
        }
      },
      {
        key: 'delete',
        text: '删除',
        color: 'danger',
        onClick: (e) => {
          // 阻止父级事件
          e.stopPropagation();
          fetchDelTodoList(id);
        }
      }
    ];
  };

  const onSearchEvent = (val) => {
    if (val) {
      navigator('/todo/search/' + val);
    }
  };
  return (
    <>
      <div className={PAGE_NAME}>
        <div className={`${PAGE_NAME}-top`}>
          <SearchBar  style={{ backgroundColor: '#ffffff', width: '280px' }} placeholder='请输入内容' onSearch={onSearchEvent} />
          <div className={`${PAGE_NAME}-top-btn`} onClick={() => navigator('/todo/modify/event/0/0')}>添加事件</div>
        </div>
        <OverView />
        <div className={`${PAGE_NAME}-label`}>
          <div>我的列表</div>
          <div className={`${PAGE_NAME}-label-btn`} onClick={() => navigator('/todo/modify/0')}>添加列表</div>
        </div>
        <div className={`${PAGE_NAME}-list`}>
          {
            todoList.map(item => <div onClick={() => navigator(`/todo/event/${item.id}/0`)}>
              <SwipeAction key={item.id} rightActions={rightActions(item.id)} className={`${PAGE_NAME}-list-li`}>
                <div className={`${PAGE_NAME}-list-li-icon`} style={{ backgroundColor: item.color }}>
                  <UnorderedListOutline fontSize={22} />
                </div>
                <span>{item.typeName}</span>
              </SwipeAction>
            </div>
            )
          }
        </div>
      </div>
      <NavBottom activityKey='/todo' />
    </>
  )
}
