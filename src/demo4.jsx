import React from 'react';
import { useClipboardState } from './hooks';


export default function Demo4() {
  const [data, setData] = useClipboardState([])
  function hanldeDel() {
    if (data.length) {
      setData(data.slice(0, data.length - 1))
    }
  }
  return <div>
    <h1>在此复制，到Demo3粘贴</h1>
    <span style={{ cursor: 'pointer', padding: '0 10px', fontSize: 22, border: '1px solid' }} onClick={hanldeDel}>remove item</span>
    <div style={{ margin: 10 }}>
      {data.map(d => <div key={d.key} >{JSON.stringify(d)}</div>)}
    </div>
  </div>
}