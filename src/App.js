import React, { useState } from 'react';
import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';
import Demo4 from './demo4';

const demos = [{ c: Demo1, name: 'Demo1' }, { c: Demo2, name: 'Demo2' }, { c: Demo3, name: 'Demo3' }, { c: Demo4, name: 'Demo4' }]

function App() {
  const [current, setActive] = useState(0);
  function onChange(x) {
    setActive(x);
  }
  return (
    <div>
      <div style={{ display: 'flex' }}>
        {demos.map((x, i) => <div
          key={x.name}
          style={{
            cursor: 'pointer',
            border: '1px solid',
            margin: 10,
            padding: 10,
            color: current === i ? 'red' : 'black',
          }}
          onClick={onChange.bind(undefined, i)}>
          {x.name}
        </div>
        )}
      </div>
      {demos[current] && React.createElement(demos[current].c)}
    </div>
  );
}

export default App;
