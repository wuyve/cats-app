import React from 'react';
import { Button } from 'antd';
import CheckList from './components/CheckList';
import 'antd/dist/reset.css';
import './App.css'


const LyPopover: React.FC<any> = () => {
  

  return (
    <div className='app'>
      <CheckList />
      <Button>00</Button>
    </div>
  );
};

export default LyPopover;
