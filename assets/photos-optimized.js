window.BEAUX_MEDIA=(window.BEAUX_PHOTOS||[]).map(function(p){return{full:p,thumb:p.replace('assets/photos/','assets/thumbs/').replace(/\.(jpg|jpeg|png)$/i,'.webp')}});

(function(){
  const vault=document.getElementById('vault');
  const avatar=document.getElementById('avatar');
  const uni=document.getElementById('uni');
  if(!vault)return;

  avatar&&avatar.classList.remove('on');
  uni&&uni.classList.remove('on');
  vault.classList.add('on');

  const keeperImg=document.querySelector('#avatar .avatarFrame img');
  if(keeperImg){
    keeperImg.src='assets/beaux-avatar-keeper-v2.webp?v=1';
    keeperImg.alt='Beaux — Keeper of the Birthday Universe';
    keeperImg.classList.add('keeperAvatarImage');
  }

  const style=document.createElement('style');
  style.textContent=`
    #avatar .avatarFrame{
      position:relative;
      overflow:hidden;
      box-shadow:0 28px 80px #0008,0 0 72px #ffd6ec66;
      animation:keeperFrameGlow 4.8s ease-in-out infinite;
      transform-style:preserve-3d;
    }
    #avatar .keeperAvatarImage{
      --kx:0px;
      --ky:0px;
      position:relative;
      z-index:1;
      width:100%;
      height:100%;
      object-fit:cover;
      object-position:center;
      opacity:1 !important;
      visibility:visible !important;
      display:block !important;
      will-change:transform,filter;
      animation:keeperAlive 8s ease-in-out infinite;
      filter:saturate(1.04) brightness(1.03);
    }
    #avatar .avatarFrame::before{
      content:'';
      position:absolute;
      inset:-35%;
      z-index:3;
      pointer-events:none;
      background:linear-gradient(115deg,transparent 37%,#fff7d899 48%,transparent 59%);
      transform:translateX(-55%) rotate(8deg);
      animation:keeperShimmer 5.2s ease-in-out infinite;
      mix-blend-mode:screen;
    }
    #avatar .avatarFrame::after{pointer-events:none;z-index:2}
    @keyframes keeperAlive{
      0%,100%{transform:translate3d(var(--kx),var(--ky),0) scale(1.015);filter:saturate(1.03) brightness(1.02)}
      50%{transform:translate3d(var(--kx),calc(var(--ky) - 8px),0) scale(1.055);filter:saturate(1.07) brightness(1.07)}
    }
    @keyframes keeperFrameGlow{
      0%,100%{box-shadow:0 28px 80px #0008,0 0 52px #ffd6ec44}
      50%{box-shadow:0 30px 86px #0008,0 0 86px #ffe2b777}
    }
    @keyframes keeperShimmer{
      0%,24%{transform:translateX(-70%) rotate(8deg);opacity:0}
      38%{opacity:.85}
      56%{transform:translateX(70%) rotate(8deg);opacity:0}
      100%{transform:translateX(70%) rotate(8deg);opacity:0}
    }
    @media (prefers-reduced-motion:reduce){
      #avatar .keeperAvatarImage,#avatar .avatarFrame,#avatar .avatarFrame::before{animation:none!important}
    }
  `;
  document.head.appendChild(style);

  const frame=document.querySelector('#avatar .avatarFrame');
  if(frame&&keeperImg){
    const move=e=>{
      const r=frame.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*10;
      const y=((e.clientY-r.top)/r.height-.5)*8;
      keeperImg.style.setProperty('--kx',x.toFixed(1)+'px');
      keeperImg.style.setProperty('--ky',y.toFixed(1)+'px');
    };
    const reset=()=>{
      keeperImg.style.setProperty('--kx','0px');
      keeperImg.style.setProperty('--ky','0px');
    };
    frame.addEventListener('pointermove',move,{passive:true});
    frame.addEventListener('pointerleave',reset,{passive:true});
  }
})();
