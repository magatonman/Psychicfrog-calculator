import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import 'dayjs/locale/ko';
import Input from './Input.js'
import Items from './Items.js'

function Select(props) {
  const avatars=[
    {id: 'a_ulamog', name:'울라목 아바타 (85)'},
    {id: 'a_kaalia', name:'칼리아 아바타 (70)'},
    {id: 'a_ashling', name: '애쉴링 아바타 (70)'},
    {id: 'a_grist', name: '그리스트 아바타 (70)'},
    {id: 'a_six', name: '6호체 아바타 (70)'}
  ];
  const sleeves=[
    {id: 's_thief', name: '정교한 존재의 도둑 슬리브 (100)'},  
    {id: 's_emrakul', name: '새로워진 세계, 엠라쿨 슬리브 (55)'},  
    {id: 's_phelia', name: '원기왕성한 목동, 펠리아 슬리브 (55)'},  
    {id: 's_arna', name: '창공지휘관, 아르나 케너뤼드 슬리브 (55)'},  
    {id: 's_shilgengar', name: '기근의 아버지, 실겐가르 슬리브 (55)'},  
    {id: 's_herigast', name: '분출하는 결손룡, 헤리가스트 슬리브 (55)'},  
    {id: 's_eladamri', name: '코르벡달, 엘라담리 슬리브 (55)'}
  ];
  const games=[{id: 'draft', name: '드래프트 토큰 (300)'}];
  const borderless=[
    {id: 'b_emrakul', name: '새로워진 세계, 엠라쿨 카드 스타일 (12)'},  
    {id: 'b_ocelot', name: '오셀롯 무리 카드 스타일 (12)'},  
    {id: 'b_ugin', name: '우진의 구속 카드 스타일 (12)'},  
    {id: 'b_nethergoyf', name: '네더고이프 카드 스타일 (12)'},  
    {id: 'b_ashling', name: '불꽃 무희, 애쉴링 카드 스타일 (12)'},  
    {id: 'b_eladamri', name: '코르벡달, 엘라담리 카드 스타일 (12)'},  
    {id: 'b_kozilek', name: '코질렉의 명령 카드 스타일 (6)'},  
    {id: 'b_wflare', name: '불굴의 섬광 카드 스타일 (6)'},  
    {id: 'b_uflare', name: '부정의 섬광 카드 스타일 (6)'},  
    {id: 'b_bflare', name: '악의의 섬광 카드 스타일 (6)'},  
    {id: 'b_rflare', name: '복제의 섬광 카드 스타일 (6)'},  
    {id: 'b_gflare', name: '경작의 섬광 카드 스타일 (6)'},  
    {id: 'b_nulldrifter', name: '결손떠돌이 카드 스타일 (6)'},  
    {id: 'b_whiteorchidphantom', name: '백란 허깨비 카드 스타일 (6)'},  
    {id: 'b_bluemoon', name: '바다의 전조 카드 스타일 (6)'},  
    {id: 'b_crab', name: '게 흉물 카드 스타일 (6)'},  
    {id: 'b_shilgengar', name: '기근의 아버지, 실겐가르 카드 스타일 (6)'},  
    {id: 'b_phoenix', name: '탐정의 불사조 카드 스타일 (6)'},  
    {id: 'b_six', name: '6호체 카드 스타일 (6)'},  
    {id: 'b_herald', name: '종말을 알리는 자 카드 스타일 (4)'},  
    {id: 'b_evangel', name: '전이성 전도사 알리는 자 카드 스타일 (4)'},  
    {id: 'b_copycrook', name: '복사사기꾼 카드 스타일 (4)'},  
    {id: 'b_marionette', name: '꼭두각시 견습생 카드 스타일 (4)'},  
    {id: 'b_spawngang', name: '산란체 무리 사령관 카드 스타일 (4)'},  
    {id: 'b_hydra', name: '히드라 조련사 카드 스타일 (4)'},  
    {id: 'b_uw', name: '진압 광선 카드 스타일 (4)'},  
    {id: 'b_ub', name: '침수된 가르침 카드 스타일 (4)'},  
    {id: 'b_br', name: '피에 젖은 통찰 카드 스타일 (4)'},  
    {id: 'b_rg', name: '그루터기 발구르기 카드 스타일 (4)'},  
    {id: 'b_gw', name: '수확의 힘 카드 스타일 (4)'},  
    {id: 'b_wb', name: '유리날개의 기품 카드 스타일 (4)'},  
    {id: 'b_ur', name: '영감의 쇄도 카드 스타일 (4)'},  
    {id: 'b_bg', name: '활력을 북돋는 식사 카드 스타일 (4)'},  
    {id: 'b_rw', name: '군단의 지휘력 카드 스타일 (4)'},  
    {id: 'b_ug', name: '진실을 질식시키는 자 카드 스타일 (4)'},  
    {id: 'b_kite', name: '하악골 연 카드 스타일 (2)'},  
    {id: 'b_dog', name: '개의 그림자 카드 스타일 (2)'},  
    {id: 'b_aerie', name: '둥지 원군 카드 스타일 (2)'},  
    {id: 'b_merfolk', name: '폭풍우 수확자 카드 스타일 (2)'},  
    {id: 'b_shuffle', name: '열등한 것으로 간주하다 카드 스타일 (2)'},  
    {id: 'b_3draw', name: '불가해한 진실 카드 스타일 (2)'},  
    {id: 'b_witherbloom', name: '몰락과 번영 카드 스타일 (2)'},  
    {id: 'b_murder', name: '마지막 호흡 카드 스타일 (2)'},  
    {id: 'b_affinity', name: '다시 단장한 소환수 카드 스타일 (2)'},  
    {id: 'b_galvanic', name: '전기 방전 카드 스타일 (2)'},  
    {id: 'b_4burn', name: '송곳니를 드러낸 불길 카드 스타일 (2)'},  
    {id: 'b_skyclaw', name: '번성하는 하늘발톱 카드 스타일 (2)'},  
    {id: 'b_bite', name: '끔찍한 습격 카드 스타일 (2)'},  
    {id: 'b_3eldrazi', name: '엘드라지 용도변경자 카드 스타일 (2)'},  
    {id: 'b_oozewagg', name: '신경질적인 점액와그 카드 스타일 (2)'}    
  ];
  const [mythic, setMythic] = useState(10);
  const [booster, setBooster] = useState(8);
  const [checkedAvatars, setCheckedAvatars]=useState(avatars.map(item=>item.id));
  const [checkedSleeves, setCheckedSleeves]=useState(sleeves.map(item=>item.id));
  const [checkedGames, setCheckedGames]=useState(['draft']);
  const [checkedBorderless, setCheckedBorderless]=useState(borderless.map(item=>item.id));

  const avatarCheck=(checked, id)=>{
    if (checked){
      setCheckedAvatars(prev=>[...prev, id]);
    }else{
      setCheckedAvatars(checkedAvatars.filter((e)=>e!==id));
    }
  }
  const avatarAll=(checked)=>{
    if(checked){
      const idArray=[];
      avatars.forEach((e)=>idArray.push(e.id));
      setCheckedAvatars(idArray);
    }
    else{
      setCheckedAvatars([]);
    }
  }
  const sleeveCheck=(checked, id)=>{
    if (checked){
      setCheckedSleeves(prev=>[...prev, id]);
    }else{
      setCheckedSleeves(checkedSleeves.filter((e)=>e!==id));
    }
  }
  const sleeveAll=(checked)=>{
    if(checked){
      const idArray=[];
      sleeves.forEach((e)=>idArray.push(e.id));
      setCheckedSleeves(idArray);
    }
    else{
      setCheckedSleeves([]);
    }
  }
  const gameCheck=(checked, id)=>{
    if (checked){
      setCheckedGames(prev=>[...prev, id]);
    }else{
      setCheckedGames(checkedGames.filter((e)=>e!==id));
    }
  }
  const gameAll=(checked)=>{
    if(checked){
      setCheckedGames(['draft']);
      setMythic(10);
      setBooster(8);
    }else{
      setCheckedGames([]);
      setMythic(0);
      setBooster(0);
    }
  }
  const borderlessCheck=(checked, id)=>{
    if (checked){
      setCheckedBorderless(prev=>[...prev, id]);
    }else{
      setCheckedBorderless(checkedBorderless.filter((e)=>e!==id));
    }
  }
  const borderlessAll=(checked)=>{
    if(checked){
      const idArray=[];
      borderless.forEach((e)=>idArray.push(e.id));
      setCheckedBorderless(idArray);
    }
    else{
      setCheckedBorderless([]);
    }
  }
  const checkedAll=(checked)=>{
    if(checked){
      const idArray_a=[];
      const idArray_s=[];
      const idArray_g=[];
      const idArray_b=[];
      avatars.forEach((e)=>idArray_a.push(e.id));
      sleeves.forEach((e)=>idArray_s.push(e.id));
      games.forEach((e)=>idArray_g.push(e.id));
      borderless.forEach((e)=>idArray_b.push(e.id));
      setMythic(10);
      setBooster(8);
      setCheckedAvatars(idArray_a);
      setCheckedSleeves(idArray_s);
      setCheckedGames(idArray_g);
      setCheckedBorderless(idArray_b);
    }else{
      setCheckedAvatars([]);
      setCheckedSleeves([]);
      setCheckedGames([]);
      setCheckedBorderless([]);
      setMythic(0);
      setBooster(0);
    }
  }
  var required_ticket=
    checkedAvatars.length*70+checkedAvatars.includes('a_ulamog')*15+
    checkedSleeves.length*55+checkedSleeves.includes('s_thief')*45+
    checkedGames.length*300+Number(mythic)*70+Number(booster)*95+
    checkedBorderless.length*2+
    (checkedBorderless.includes('b_emrakul') +  
    checkedBorderless.includes('b_ocelot') +  
    checkedBorderless.includes('b_ugin') +  
    checkedBorderless.includes('b_nethergoyf') +  
    checkedBorderless.includes('b_ashling') +  
    checkedBorderless.includes('b_eladamri'))*10 +  
    (checkedBorderless.includes('b_kozilek') +  
    checkedBorderless.includes('b_wflare') +  
    checkedBorderless.includes('b_uflare') +  
    checkedBorderless.includes('b_bflare') +  
    checkedBorderless.includes('b_rflare') +  
    checkedBorderless.includes('b_gflare') +  
    checkedBorderless.includes('b_nulldrifter') +  
    checkedBorderless.includes('b_whiteorchidphantom') +  
    checkedBorderless.includes('b_bluemoon') +  
    checkedBorderless.includes('b_crab') +  
    checkedBorderless.includes('b_shilgengar') +  
    checkedBorderless.includes('b_phoenix') +  
    checkedBorderless.includes('b_six'))*4 +  
    (checkedBorderless.includes('b_herald') +  
    checkedBorderless.includes('b_evangel') +  
    checkedBorderless.includes('b_copycrook') +  
    checkedBorderless.includes('b_marionette') +  
    checkedBorderless.includes('b_spawngang') +  
    checkedBorderless.includes('b_hydra') +  
    checkedBorderless.includes('b_uw') +  
    checkedBorderless.includes('b_ub') +  
    checkedBorderless.includes('b_br') +  
    checkedBorderless.includes('b_rg') +  
    checkedBorderless.includes('b_gw') +  
    checkedBorderless.includes('b_wb') +  
    checkedBorderless.includes('b_ur') +  
    checkedBorderless.includes('b_bg') +  
    checkedBorderless.includes('b_rw') +  
    checkedBorderless.includes('b_ug'))*2;
  const [ticket, setTicket] = useState(0);

  const onTicket = (e) =>{
    setTicket(e.target.value);
  }
  const [win, setWin] = useState(0);

  const onWin = (e) =>{
    setWin(e.target.value);
  }
  var remained_ticket=Math.max(0, required_ticket-ticket);
  var daily_ticket=45+Number(win)+Math.min(Number(win), 5);
  var game_date=Math.ceil(remained_ticket/daily_ticket);
  dayjs.locale('ko');
  dayjs.extend(duration);
  const currentDate=dayjs();
  const formattedDate=currentDate.format('MM-DD');
  const [runningTime, setRunningTime] = useState(null);
  useEffect(() => {
      const interval = setInterval(() => {
        setRunningTime(currentDate);
      }, 1000);
    
      return () => {
        clearInterval(interval);
      };
    }, [currentDate]);
  const deadline=dayjs.unix(1722315600);
  const diff=dayjs.duration(deadline.diff(currentDate));
  const diffDate=Math.floor(diff/(24*60*60*1000));
  const diffHour=Math.floor(diff/(60*60*1000)-diffDate*24);
  const diffMin=Math.floor(diff/(60*1000)-diffDate*24*60-diffHour*60);
  const diffSec=Math.floor(diff/1000-diffDate*24*60*60-diffHour*60*60-diffMin*60);
  return (
    
    <div align="center">
      <header>
       <h1>초능력 개구리의 호라이즌 은신처 계산기</h1>
       <p>오늘 날짜: {formattedDate}</p>
       <p>남은 시간: {diffDate}일 {diffHour}시 {diffMin}분 {diffSec}초</p>
      </header>
      <Input ticket={ticket} required={required_ticket} onChange={onTicket}/>
      <p>필요 티켓량: {required_ticket}</p>
      <p>모아야 할 티켓량: {remained_ticket}</p>
      <Items win={win} onChange={onWin}/>
      <p>일일 티켓 획득량: {daily_ticket}</p>
      <p>최소 플레이 일수: {game_date}</p>
      <p>티켓 전부 모으기: {((game_date<=diffDate)?"가능":"불가")}</p>
      <table border="1" bordercolor="black">
        <thead align="center">
          <th>분류</th>
          <td>선택</td>
          <td>전체 선택</td>
        </thead>

        <tbody>
          <tr>
            <th>전체 선택</th>
            <td align = "left" colspan="2">
              <label>
              <input
                  type="checkbox"
                  onChange={(e)=>checkedAll(e.target.checked)}
                  checked={
                    (((checkedGames.length+checkedAvatars.length+checkedSleeves.length+checkedBorderless.length)
                    ===(avatars.length+sleeves.length+borderless.length+1))
                    &&Number(mythic)===10&&Number(booster)===8)?true:false}
                />
              </label>
              전체 선택 (2799)
            </td>
          </tr>

          <tr>
            <th>아바타</th>
            <td align ="left" style={{whiteSpace: "pre-wrap"}}>
              {avatars.map((item)=>(
                <div>
                  <input
                    type="checkbox"
                    id={item.id}
                    onChange={(e)=>avatarCheck(e.target.checked, item.id)}
                    checked={checkedAvatars.includes(item.id)?true:false}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </td>

            <td align="center">
              <label>
                <input
                  type="checkbox"
                  onChange={(e)=>avatarAll(e.target.checked)}
                  checked={checkedAvatars.length===avatars.length?true:false}
                />
                전체 (365)
              </label>
            </td>

          </tr>
          <tr>
            <th>슬리브</th>
            <td align ="left" style={{whiteSpace: "pre-wrap"}}>
              {sleeves.map((item)=>(
                <div>
                  <input
                    type="checkbox"
                    id={item.id}
                    onChange={(e)=>sleeveCheck(e.target.checked, item.id)}
                    checked={checkedSleeves.includes(item.id)?true:false}
                    defaultChecked="true"
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </td>

            <td align="center">
              <label>
                  <input
                    type="checkbox"
                    onChange={(e)=>sleeveAll(e.target.checked)}
                    checked={checkedSleeves.length===sleeves.length?true:false}
                  />
                  전체 (430)
              </label>
            </td>
          </tr>

          <tr>
            <th>인게임 재화</th>
            <td align="left" style={{whiteSpace: "pre-wrap"}}>
            {games.map((item)=>(
                <div>
                  <input
                    type="checkbox"
                    id={item.id}
                    onChange={(e)=>gameCheck(e.target.checked, item.id)}
                    checked={checkedGames.includes(item.id)?true:false}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
              <label>
              <input
                  type="range"
                  name="items"
                  min="0"
                  max="10"
                  value={mythic}
                  onChange={e=>setMythic(e.target.value)}
                />
                <input
                  type="number"
                  name="items"
                  min="0"
                  max="10"
                  value={mythic}
                  onChange={e=>setMythic(e.target.value)}
                />
              </label>모호3 미식카드 (70){"\n"}
              <label>
                <input
                  type="range"
                  name="items"
                  min="0"
                  max="8"
                  value={booster}
                  onChange={e=>setBooster(e.target.value)}
                />
                <input
                  type="number"
                  name="items"
                  min="0"
                  max="8"
                  value={booster}
                  onChange={e=>setBooster(e.target.value)}
                />
              </label>모호3 팩 (95)
            </td>
            <td align="center">
              <label><input
                    type="checkbox"
                    onChange={(e)=>gameAll(e.target.checked)}
                    checked={(checkedGames.length===games.length&&Number(mythic)===10&&Number(booster)===8)?true:false}
                  />
                  전체 (1760)</label>
            </td>
          </tr>

          <tr>
            <th>카드 스타일</th>
            <td align ="left" style={{whiteSpace: "pre-wrap"}}>
              {borderless.map((item)=>(
                <div>
                  <input
                    type="checkbox"
                    id={item.id}
                    onChange={(e)=>borderlessCheck(e.target.checked, item.id)}
                    checked={checkedBorderless.includes(item.id)?true:false}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </td>

            <td align="center">
            <label>
                  <input
                    type="checkbox"
                    onChange={(e)=>borderlessAll(e.target.checked)}
                    checked={checkedBorderless.length===borderless.length?true:false}
                  />
                  전체 (244)
              </label>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
    
  );
}

export default Select;