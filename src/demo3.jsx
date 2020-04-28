import React from 'react';
import { useClipboardState } from './hooks';

let uniqId = 0;

export default function Demo3() {
  const [data, setData] = useClipboardState([])
  function hanldeAdd() {
    setData([...data, { key: ++uniqId, createdAt: new Date().toISOString() }])
  }
  return <div>
    <h1>在此复制，到Demo4粘贴</h1>
    <span style={{ cursor: 'pointer', padding: '0 10px', fontSize: 22, border: '1px solid' }} onClick={hanldeAdd}>add item</span>
    <div style={{ margin: 10 }}>
      {data.map(d => <div key={d.key} >{JSON.stringify(d)}</div>)}
    </div>
  </div>
}