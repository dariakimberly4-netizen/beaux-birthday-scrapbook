window.BEAUX_MEDIA=(window.BEAUX_PHOTOS||[]).map(function(p){return{full:p,thumb:p.replace('assets/photos/','assets/thumbs/').replace(/\.(jpg|jpeg|png)$/i,'.webp')}});

(function(){
  const vault=document.getElementById('vault');
  const dogs=document.getElementById('dogs');
  const avatar=document.getElementById('avatar');
  const uni=document.getElementById('uni');
  const callBeaux=document.getElementById('callBeaux');
  const enter=document.getElementById('enter');
  const pass=document.getElementById('pass');
  if(!vault||!dogs)return;

  // FIRST SCENE: locked dog guardians.
  vault.classList.remove('on');
  avatar&&avatar.classList.remove('on');
  uni&&uni.classList.remove('on');
  dogs.classList.add('on');

  const style=document.createElement('style');
  style.textContent=`
    #dogs .dogWrap:before{content:'🔒  BIRTHDAY GATE LOCKED';display:inline-block;margin-bottom:12px;padding:9px 14px;border:1px solid #ffffff55;border-radius:999px;background:#ffffff12;font-size:10px;font-weight:900;letter-spacing:.16em;box-shadow:0 8px 24px #0004}
    #dogs .dogCard:before{content:'🔒';position:absolute;left:50%;top:12%;transform:translateX(-50%);z-index:5;font-size:28px;filter:drop-shadow(0 5px 10px #0008);transition:.3s}
    #dogs .dogCard.ready:before{content:'🔓';transform:translateX(-50%) scale(1.08)}
    #dogs .dogCard:not(.ready){filter:saturate(.7) brightness(.82)}
    #dogs .dogCard.ready{filter:none}
  `;
  document.head.appendChild(style);

  const h2=dogs.querySelector('h2');
  const p=dogs.querySelector('.dogWrap>p');
  const labels=dogs.querySelectorAll('.dogLabel');
  if(h2)h2.textContent='Unlock the two dog guardians first.';
  if(p)p.textContent='Tap both locked dogs. When both approve, the Birthday Vault will open.';
  if(labels[0])labels[0].textContent='LOCKED GUARDIAN ONE';
  if(labels[1])labels[1].textContent='LOCKED GUARDIAN TWO';
  if(callBeaux)callBeaux.textContent='UNLOCK BIRTHDAY VAULT ✦';

  if(callBeaux){
    callBeaux.addEventListener('click',function(e){
      if(callBeaux.disabled)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      dogs.classList.remove('on');
      vault.classList.add('on');
    },true);
  }

  if(enter){
    enter.addEventListener('click',function(e){
      if((pass?.value||'').trim().toUpperCase()!=='BEAUX')return;
      e.preventDefault();
      e.stopImmediatePropagation();
      vault.classList.remove('on');
      avatar&&avatar.classList.add('on');
      setTimeout(function(){document.getElementById('speakAgain')?.click()},450);
    },true);
  }
})();
