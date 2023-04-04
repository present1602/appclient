import { TemporaryCredentials } from 'aws-sdk';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiGetBizReg } from 'services/BizRegService';

const Home = (props) => {
  // const [bizId] = useSelector((state)=> state. )

  useEffect(() => {
    const tt = async () => {
      const aa = await apiGetBizReg()
    }
    tt()
  }, [])


  return (<div>home compoent</div>);
}

export default Home;