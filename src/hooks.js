import { useState, useEffect } from 'react';

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

export function useClipboardState(initData) {
  const [data, setData] = useState(initData);
  useEffect(function () {
    async function handlePaste(e) {
      const d = await getClipboardData(e.clipboardData);
      if (d && d['text/custom']) {
        try {
          setData(JSON.parse(d['text/custom']))
        } catch (e) {
          console.log('paste failed.')
        }
      }
    }
    function handleCopy(e) {
      e.preventDefault()
      const { clipboardData } = e
      clipboardData.clearData();
      clipboardData.setData('text/custom', JSON.stringify(data))
    }
    document.addEventListener('copy', handleCopy)
    document.addEventListener('paste', handlePaste);
    return function () {
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('copy', handleCopy)
    }
  }, [data]);
  return [data, setData]
}