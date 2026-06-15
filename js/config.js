const models = [
  {name:'Склад 12',area:'576 м²',dims:'48×12×6 м',tagline:'Старт малого бизнеса',price:4200000,office:'—',time:'45 дней'},
  {name:'Склад 12 +',area:'576 м²',dims:'48×12×6 м',tagline:'Оптимальный выбор',price:6800000,office:'288 м²',time:'60 дней'},
  {name:'Склад 18',area:'864 м²',dims:'48×18×6 м',tagline:'Масштабное хранение',price:6300000,office:'—',time:'75 дней'},
  {name:'Склад 18 +',area:'864 м²',dims:'48×18×6 м',tagline:'Промышленный масштаб',price:7700000,office:'288 м²',time:'90 дней'},
  {name:'Склад 24',area:'1152 м²',dims:'48×24×6 м',tagline:'Масштабное хранение',price:8400000,office:'—',time:'105 дней'},
  {name:'Склад 24 +',area:'1152 м²',dims:'48×24×6 м',tagline:'Промышленный масштаб',price:9800000,office:'288 м²',time:'120 дней'},
];
const levels = [
  {name:'Base',extra:0,office:'—'},
  {name:'Base+',extra:680000,office:'—'},
  {name:'Optimal',extra:1400000,office:'—'},
  {name:'Max',extra:2500000,office:'—'},
];
const services = [
  {name:'Комплексное проектирование',price:980000},
  {name:'Инженерные изыскания',price:420000},
  {name:'Работы нулевого цикла',price:1800000},
  {name:'Промышленные полы',price:1200000},
  {name:'Сопровождение и сдача объекта',price:480000},
  {name:'Отделка помещений',price:720000},
  {name:'Благоустройство территории',price:650000},
];
const fins = [
  {name:'100% оплата',detail:'Единовременно',discount:0.05},
  {name:'Лизинг',detail:'от 11,9% / год',discount:0},
  {name:'Кредит',detail:'от 14,5% / год',discount:0},
  {name:'Поэтапно',detail:'30% → 40% → 30%',discount:0},
];
const equips = [
  {name:'Стеллажное оборудование',price:780000},
  {name:'Крановое оборудование',price:1850000},
  {name:'Погрузочное оборудование',price:1200000},
  {name:'Холодильное оборудование',price:1450000},
];

let state = {model:-1,level:-1,services:[],equip:[],fin:-1};
let curStep = 0;

function fmt(n){return n.toLocaleString('ru-RU')+'  ₽';}

function goToStep(s){
  document.querySelectorAll('.page').forEach((p,i)=>p.classList.toggle('active',i===s));
  document.querySelectorAll('.step-item').forEach((el,i)=>{
    el.classList.remove('active','done');
    if(i===s) el.classList.add('active');
    else if(i<s) el.classList.add('done');
  });
  curStep = s;
  if(s===5) buildResult();
  updateLeftPanel();
}

function selectModel(i){
  state.model=i;
  document.querySelectorAll('[id^="mr"]').forEach((el,j)=>el.classList.toggle('selected',j===i));
  updateLeftPanel();
}
function selectLevel(i){
  state.level=i;
  document.querySelectorAll('[id^="lr"]').forEach((el,j)=>el.classList.toggle('selected',j===i));
  updateLeftPanel();
}
function toggleService(i){
  const idx=state.services.indexOf(i);
  if(idx===-1) state.services.push(i); else state.services.splice(idx,1);
  document.getElementById('sv'+i).classList.toggle('selected',state.services.includes(i));
  updateLeftPanel();
}
function selectFin(i){
  state.fin=i;
  document.querySelectorAll('[id^="fn"]').forEach((el,j)=>el.classList.toggle('selected',j===i));
  updateLeftPanel();
}
function toggleEquip(i){
  const idx=state.equip.indexOf(i);
  if(idx===-1) state.equip.push(i); else state.equip.splice(idx,1);
  document.getElementById('eq'+i).classList.toggle('selected',state.equip.includes(i));
  updateLeftPanel();
}

function calcTotal(){
  if(state.model<0) return 0;
  let t = models[state.model].price;
  if(state.level>=0) t += levels[state.level].extra;
  state.services.forEach(s=>t+=services[s].price);
  state.equip.forEach(e=>t+=equips[e].price);
  if(state.fin===0) t = Math.round(t*0.95);
  return t;
}

function updateLeftPanel(){
  const m = state.model>=0?models[state.model]:null;
  const l = state.level>=0?levels[state.level]:null;
  const f = state.fin>=0?fins[state.fin]:null;
  document.getElementById('lp-tagline').textContent = m?m.tagline:'Выберите модель';
  document.getElementById('lp-title').textContent = m?m.name:'Склад';
  const total = calcTotal();
  document.getElementById('lp-price').textContent = total>0?fmt(total):'—';
  document.getElementById('lp-pricesub').textContent = total>0?'':'Выберите модель и комплектацию';
  document.getElementById('spec-area').textContent = m?m.area:'—';
  document.getElementById('spec-level').textContent = l?l.name:'—';
  document.getElementById('spec-office').textContent = m?m.office:'—';
  document.getElementById('spec-services').textContent = state.services.length>0?state.services.length+' опций':'—';
  document.getElementById('spec-equip').textContent = state.equip.length>0?state.equip.map(i=>equips[i].name).join(', '):'—';
  document.getElementById('spec-fin').textContent = f?f.name:'—';
  const btn = document.getElementById('lp-mainbtn');
  if(curStep<5){btn.textContent=curStep===0?'Выбрать модель →':'Продолжить →';}
  else{btn.textContent='Отправить заявку →';}
  // update svg size label
  if(m){
    const svgs=document.querySelectorAll('#lp-svg text');
    svgs.forEach(t=>{if(t.getAttribute('font-size')==='28')t.textContent=m.area;});
  }
}

function handleMainBtn(){
  if(curStep<5) goToStep(Math.min(curStep+1,5));
  else submitRequest();
}

function buildResult(){
  const m=state.model>=0?models[state.model]:{name:'—',area:'—',time:'—'};
  const l=state.level>=0?levels[state.level]:{name:'—',office:'—'};
  const f=state.fin>=0?fins[state.fin]:{name:'—',detail:'—',discount:0};
  
  document.getElementById('res-model').textContent=m.name;
  document.getElementById('res-area').textContent=m.area;
  document.getElementById('res-level').textContent=l.name;
  document.getElementById('res-office').textContent=m.office;
  document.getElementById('res-time').textContent=m.time;
  document.getElementById('res-fin').textContent=f.name;
  document.getElementById('res-fin-detail').textContent=f.detail;
  document.getElementById('res-discount').textContent=f.discount>0?'-'+(f.discount*100)+'%':'—';
  const sl=document.getElementById('res-services-list');
  if(state.services.length===0){
    sl.innerHTML='<div class="result-line"><span class="result-line-key">Дополнительные опции</span><span class="result-line-val" style="color:var(--gray-dim)">не выбраны</span></div>';
  } else {
    sl.innerHTML=state.services.map(i=>`<div class="result-line"><span class="result-line-key">${services[i].name}</span><span class="result-line-val" style="color:var(--accent)">+ ${services[i].price.toLocaleString('ru-RU')} ₽</span></div>`).join('');
  }
  const el=document.getElementById('res-equip-list');
  if(el){
    if(state.equip.length===0){
      el.innerHTML='<div class="result-line"><span class="result-line-key">Оборудование</span><span class="result-line-val" style="color:var(--gray-dim)">не выбрано</span></div>';
    } else {
      el.innerHTML=state.equip.map(i=>`<div class="result-line"><span class="result-line-key">${equips[i].name}</span><span class="result-line-val" style="color:var(--accent)">+ ${equips[i].price.toLocaleString('ru-RU')} ₽</span></div>`).join('');
    }
  }
  const total=calcTotal();
  document.getElementById('res-total').textContent=total>0?fmt(total):'—';
  document.getElementById('res-note').textContent=f.discount>0?'Включена скидка 5% за 100% оплату':'';
}

function submitRequest(){alert('Заявка отправлена! Менеджер свяжется с вами в течение 30 минут.');}
function requestCallback(){alert('Оставьте номер телефона — мы перезвоним.');}

updateLeftPanel();

// Читаем параметр ?model= из URL и автоматически выбираем модель
(function(){
  const params = new URLSearchParams(window.location.search);
  const modelParam = params.get('model');
  if(modelParam !== null){
    const idx = parseInt(modelParam, 10);
    if(idx >= 0 && idx < models.length){
      selectModel(idx);
      goToStep(1);
    }
  }
})();

// Плавный скролл: страница появляется снизу и поднимается наверх
/* window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const target = document.querySelector('.configurator');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 400);
}) */;