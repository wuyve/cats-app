import React, { useState, useEffect } from 'react';
import { Swiper, Toast, PullToRefresh, InfiniteScroll } from 'antd-mobile'
import { HeartFill, HeartOutline, ChatAddOutline } from 'antd-mobile-icons'
import { sleep } from 'antd-mobile/es/utils/sleep'
import NavBottom from '@/components/NavBottom';
import './index.scss'

const PAGE_NAME = 'home-page';

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className="content"
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
));

const Content: React.FC = (props) => {
  const [contentLists, setContentLists] = useState<any>([]);
  useEffect(() => {
    fetchContentLists()
  }, []);

  const fetchContentLists = async () => {
    setTimeout(() => {
      const data = [
        {
          id: 9999,
          avatar: 'http://p1.music.126.net/2bxgpVK8zTD7g5uPUYPOtg==/109951167110140245.jpg?param=50y50',
          content: {
            text: '今天天气真好啊阿啊阿今天天气真好啊阿啊阿今天天气真好啊阿啊阿今天天气真好啊阿啊阿今天天气真好啊阿啊阿今天天气真好啊阿啊阿',
            imgList: [
              'http://p1.music.126.net/xqEHaZ3fow0t2xRdVO2z5w==/109951163435181489.jpg?param=50y50"',
              'http://p1.music.126.net/MfXSghWCuL47DskMBoz1tw==/109951164883141339.jpg?param=50y50',
              'http://p1.music.126.net/kT4yvmwfbo1ey097yVON_A==/18997361905163689.jpg?param=50y50',
              'http://p1.music.126.net/mIb4dfy-mBOlctpH8KyGUQ==/109951166607327805.jpg?param=50y50',
              'http://p1.music.126.net/5WPQ51dfmcN83VNmWVt9WA==/109951166752395712.jpg?param=50y50'
            ],
          },
          createDate: '2022-09-10 12:22',
          creator: '9990', // 创建人ID
          loveNum: 10,
          isLoved: true,  // 获取列表时，传入本人ID，查询，若不传，则为false
          comment: [
            {
              id: '111',
              avatar: 'http://p1.music.126.net/_JtjpMG8B1w9vdcx6RIwxg==/109951164031172067.jpg?param=50y50',
              userId: 'xxx4',
              content: ' 我评论了我评论了我评论了我评论了我评论了我评论了'
            }
          ]
    
        },
        {
          id: 99993,
          avatar: 'http://p1.music.126.net/2bxgpVK8zTD7g5uPUYPOtg==/109951167110140245.jpg?param=50y50',
          content: {
            text: '今天天气真好啊阿啊阿今天天气真好啊阿啊阿今天天气真好啊阿啊阿今天天气真好啊阿啊阿今天天气真好啊阿啊阿今天天气真好啊阿啊阿',
            imgList: [
              'http://p1.music.126.net/xqEHaZ3fow0t2xRdVO2z5w==/109951163435181489.jpg?param=50y50"',
              'http://p1.music.126.net/MfXSghWCuL47DskMBoz1tw==/109951164883141339.jpg?param=50y50',
              'http://p1.music.126.net/kT4yvmwfbo1ey097yVON_A==/18997361905163689.jpg?param=50y50',
              'http://p1.music.126.net/mIb4dfy-mBOlctpH8KyGUQ==/109951166607327805.jpg?param=50y50',
              'http://p1.music.126.net/5WPQ51dfmcN83VNmWVt9WA==/109951166752395712.jpg?param=50y50',
              'http://p1.music.126.net/5WPQ51dfmcN83VNmWVt9WA==/109951166752395712.jpg?param=50y50',
              'http://p1.music.126.net/5WPQ51dfmcN83VNmWVt9WA==/109951166752395712.jpg?param=50y50',
              'http://p1.music.126.net/5WPQ51dfmcN83VNmWVt9WA==/109951166752395712.jpg?param=50y50',
            ],
          },
          createDate: '2022-09-17 12:22',
          creator: '99393990', // 创建人ID
          loveNum: 199,
          isLoved: false,  // 获取列表时，传入本人ID，查询，若不传，则为false
          comment: [
            {
              id: '11151',
              avatar: 'http://p1.music.126.net/_JtjpMG8B1w9vdcx6RIwxg==/109951164031172067.jpg?param=50y50',
              userId: 'xxx4',
              content: ' 我评论了我评论了我评论了我评论了我评论了我评论了',
            },
            {
              id: '1141',
              avatar: 'http://p1.music.126.net/_JtjpMG8B1w9vdcx6RIwxg==/109951164031172067.jpg?param=50y50',
              userId: 'xxx4',
              content: ' 我评论了我评论了我评论了我评论了我评论了我评论了',
            },
          ]
        }
      ];
      setContentLists(contentLists);
    }, 300);
  }

  return (
    <div>
      {
        contentLists.map((item, index) => {
          return (
            <div key={index} className="dynamic-block flex">
              <img src={item.avatar} className="avatar" alt="" />
              <div className="dynamic-content">
                <div>
                  {item.content.text}
                </div>
                <div className="img-list">
                  {
                    (item.content.imgList || []).map((imgSrc, imgIndex) => <img key={imgIndex} className="content-img" src={imgSrc} />)
                  }
                </div>
                <div className="flex-between-end">
                  <div className="date">{item.createDate}</div>
                  <div className="flex-between-center">
                    <div className='flex-start-center love'>
                      {
                        item.isLoved ? <HeartFill color="var(--adm-color-primary)" fontSize={24} /> : <HeartOutline fontSize={24} />
                      }
                      {item.loveNum}
                    </div>
                    <ChatAddOutline fontSize={24} />
                  </div>
                </div>
                <div>
                  {
                    item.comment.map(comment => {
                      return (
                        <div key={comment.id} className="flex content-item">
                          <img src={comment.avatar} className="avatar-small" alt="" />
                          <div className="content-content">{comment.content}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          )
        })
      }
      <InfiniteScroll className="load-more" loadMore={async () => {
        await sleep(1000)
        if (Math.random() > 0.5) {
          throw new Error('mock request failed')
        }
      }} hasMore={false} />
    </div>
  )
}

const LunBo = () => {
  return (
    <>
      <Swiper loop autoplay>{items}</Swiper>
      {/* 正文 */}

    </>
  )
}

export default () => {
  
  return (
    <div className={PAGE_NAME}>
      <PullToRefresh onRefresh={async () => {
        await sleep(1000)
        console.log(999)
      }}>
        <LunBo />
        <Content />
        
      </PullToRefresh>
      <NavBottom activityKey='/home' />
    </div>
  )
}
