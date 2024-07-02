import React, { useState } from 'react';


function Input({ticket, required, onChange}) {
  return (
    <div>
        <p>
          <input type="range"
            value={ticket}
            step="1"
            onChange={onChange}
            min="0"
            max={required}
        />
          
         <input onChange={onChange} type="number" min="0" max={required} value={ticket}></input> 현재 티켓 수를 입력하세요
        </p>
        <div>

        </div>
    </div>
  );
}
export default Input;