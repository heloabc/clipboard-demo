import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const blockStyle = {
  margin: '0 10px 10px 10px',
  padding: 8,
  border: '1px solid gray',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all'
}

function readDataTransferItemAsString(item) {
  return new Promise(function (resolve) {
    item.getAsString(resolve);
  })
}

async function getClipboardData(data) {
  const { items } = data;
  const result = {};
  await Promise.all([...items].map(async item => {
    console.log(item)
    const { type, kind } = item;
    if (kind === 'string') {
      result[type] = await readDataTransferItemAsString(item);
    } else if (kind === 'file') {
      result[type] = item.getAsFile();
    }
  }))
  console.log(result)
  return result;
}

export default function Demo1() {
  const [clipInfo, setClipInfo] = useState({});
  useEffect(function () {
    function handlePaste(e) {
      getClipboardData(e.clipboardData).then(setClipInfo)
    }
    function handleCopy(e) {
      e.preventDefault()
      const { clipboardData } = e
      clipboardData.clearData();
      clipboardData.setData('text/plain', '版权保护中')
    }
    document.addEventListener('copy', handleCopy)
    document.addEventListener('paste', handlePaste);
    return function () {
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('copy', handleCopy)
    }
  }, [])
  return <div>
    <h1>复制任意资源并粘贴：</h1>
    <h3>text/plain</h3>
    <pre style={blockStyle}>{clipInfo['text/plain']}</pre>
    <h3>image</h3>
    <div style={blockStyle}>
      {
        clipInfo['image/png'] &&
        <img src={URL.createObjectURL(clipInfo['image/png'])} alt="" />
      }
    </div>
    <h3>text/html</h3>
    <pre style={blockStyle}>{clipInfo['text/html']}</pre>
    <h3>text/rtf</h3>
    <pre style={blockStyle}>{clipInfo['text/rtf']}</pre>
  </div>
}

