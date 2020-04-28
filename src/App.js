import React, { useState } from 'react';
import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';
import Demo4 from './demo4';

const demos = [Demo1, Demo2, Demo3, Demo4]

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
      {demos[current] && React.createElement(demos[current])}
    </div>
  );
}

export default App;
