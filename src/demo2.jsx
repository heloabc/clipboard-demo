import React, { useState } from 'react';

export default function Demo2() {
  const [result, setResult] = useState()
  function handleClick(e) {
    function handleCopy(e) {
      e.preventDefault()
      const { clipboardData } = e
      clipboardData.clearData();
      const msg = `code: ${Math.random().toString().slice(2, 10)}\ncopied at: ${new Date().toISOString()}`;
      clipboardData.setData('text/plain', msg);
      document.removeEventListener('copy', handleCopy);
      setResult(msg)
    }
    document.addEventListener('copy', handleCopy)
    document.execCommand('copy');
  }
  return <div>
    <div style={{ cursor: 'pointer', margin: 30, padding: 30 }} onClick={handleClick}>点击复制口令</div>
    <pre style={{ border: '1px solid', margin: 30, padding: 30 }}>{result}</pre>
  </div>
}
