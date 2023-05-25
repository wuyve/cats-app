import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { SearchBar, SwipeAction, } from 'antd-mobile'
import NavTop from '@/components/NavTop';
import { get } from '../../../utils/ajax';
import './index.scss'

const PAGE_NAME = 'todo-event-search-page';
const STATUS = ['待办', '已办', '已过期'];
const STATUS_COLOR = ['#3d9deb', '#3deb46', '#eb6d0f'];

export default () => {
  const navigator = useNavigate();
  const urlParams = useParams();
  console.log(urlParams)

  const [eventList, setEventList] = useState<any[]>([]);

  const refreshData = async() => {
    const { search } = urlParams;
    const res = await get('/todo/search/event/by/title', {title: search});
    const data = _.get(res, 'data.data', []);
    setEventList(data);
  };


  const fetchDelTodoList = async (id) => {
    const res: any = await get('/todo/event/del', { id });
    if (res.errorCode === 0) {
      refreshData();
    }
  };

  const fetchFinishTodoList = async (id, isFinished) => {
    const res: any = await get('/todo/event/finish', { id, isFinished });
    if (res.errorCode === 0) {
      refreshData();
    }
  };

  useEffect(() => {
    refreshData();
  }, []);


  const rightActions = (id, stateno) => {
    const results = [
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
    if (STATUS[stateno] === '待办') {
      results.unshift({
        key: 'mute',
        text: '标记为已完成',
        color: 'primary',
        onClick: (e) => {
          // 阻止父级事件
          e.stopPropagation();
          fetchFinishTodoList(id, '1');
        }
      })
    } else {
      results.unshift({
        key: 'mute',
        text: '标记为待办',
        color: 'primary',
        onClick: (e) => {
          // 阻止父级事件
          e.stopPropagation();
          fetchFinishTodoList(id, '0');
        }
      });
    }
    return results;
  };

  return (
    <>
      <NavTop title="事件" />
      <div className={PAGE_NAME}>
        <div className={`${PAGE_NAME}-list`}>
          {
            eventList.map(item => {
              return (
                <div onClick={() => navigator(`/todo/modify/event/${item.id}/0`)}>
                  <SwipeAction key={item.id} rightActions={rightActions(item.id, item.stateno)} className={`${PAGE_NAME}-list-li`}>
                    <div style={{ width: '100%' }} className="flex-between-center">
                      <div className="flex-start-center">
                        <div className="dot" style={{ backgroundColor: STATUS_COLOR[item.stateno] }}></div>
                        <span className="title">{item.title}</span>
                      </div>
                      <span className="state" style={{ color: STATUS_COLOR[item.stateno] }}>{item.state}</span>
                    </div>
                  </SwipeAction>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
