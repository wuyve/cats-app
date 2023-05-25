import React from 'react';
import CheckList from './components/CheckList';
import 'antd/dist/reset.css';
import './App.css'


const LyPopover: React.FC<any> = () => {
  

  return (
    <div className='app'>
      <CheckList />
    </div>
  );
};

export default LyPopover;
