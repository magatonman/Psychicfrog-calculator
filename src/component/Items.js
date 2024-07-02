import React, { useState } from 'react';

function Items({win, onChange}) {


  return (

    <div>
    <p><input type="range"
            value={win}
            step="1"
            onChange={onChange}
            min="0"
            max="15"
        />
          
         <input onChange={onChange} type="number" min="0" max="15" value={win}></input> 일일 승리 횟수를 입력하세요</p>
    
    </div>
  );
}
export default Items;