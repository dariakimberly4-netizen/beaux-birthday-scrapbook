window.BEAUX_MEDIA=(window.BEAUX_PHOTOS||[]).map(function(p){return{full:p,thumb:p.replace('assets/photos/','assets/thumbs/').replace(/\.(jpg|jpeg|png)$/i,'.webp')}});

(function(){
  const vault=document.getElementById('vault');
  const dogs=document.getElementById('dogs');
  const avatar=document.getElementById('avatar');
  const uni=document.getElementById('uni');
  if(!vault)return;

  // Birthday Vault is the first visible scene.
  dogs&&dogs.classList.remove('on');
  if(dogs)dogs.style.display='none';
  avatar&&avatar.classList.remove('on');
  uni&&uni.classList.remove('on');
  vault.classList.add('on');

  // Exact uploaded Keeper avatar, stored locally in this GitHub repository.
  const keeperImg=document.querySelector('#avatar .avatarFrame img');
  if(keeperImg){
    keeperImg.src='assets/beaux-avatar-keeper.webp';
    keeperImg.alt='Beaux — Keeper of the Birthday Universe';
    keeperImg.classList.add('keeperAvatarImage');
  }

  const style=document.createElement('style');
  style.textContent=`
    #avatar .avatarFrame{
      overflow:hidden;
      box-shadow:0 28px 80px #0008,0 0 72px #ffd6ec66;
      animation:avatarIn 1.2s cubic-bezier(.2,.8,.2,1) both,keeperFrameGlow 4.8s ease-in-out 1.2s infinite;
    }
    #avatar .keeperAvatarImage{
      --keeper-x:0px;
      --keeper-y:0px;
      width:100%;
      height:100%;
      object-fit:cover;
      object-position:center;
      will-change:transform,filter;
      animation:keeperAlive 8s ease-in-out infinite;
      filter:saturate(1.04) brightness(1.035) contrast(1.01);
    }
    #avatar .avatarFrame:before{
      content:'';
      position:absolute;
      inset:-45%;
      z-index:3;
      pointer-events:none;
      background:linear-gradient(115deg,transparent 38%,rgba(255,244,214,.0) 45%,rgba(255,244,214,.42) 50%,rgba(255,244,214,.0) 56%,transparent 63%);
      transform:translateX(-60%) rotate(8deg);
      animation:keeperShimmer 5.5s ease-in-out infinite;
      mix-blend-mode:screen;
    }
    #avatar .avatarFrame:after{z-index:2}
    #avatar .portal{animation:spin 18s linear infinite,breath 4s ease-in-out infinite}
    @keyframes keeperAlive{
      0%,100%{transform:translate3d(var(--keeper-x),var(--keeper-y),0) scale(1.025)}
      50%{transform:translate3d(var(--keeper-x),calc(var(--keeper-y) - 8px),0) scale(1.065)}
    }
    @keyframes keeperFrameGlow{
      0%,100%{box-shadow:0 28px 80px #0008,0 0 55px #ffd6ec55}
      50%{box-shadow:0 30px 85px #0008,0 0 92px #ffd79a88,0 0 125px #dca7ff33}
    }
    @keyframes keeperShimmer{
      0%,18%{transform:translateX(-65%) rotate(8deg);opacity:0}
      30%{opacity:1}
      55%{transform:translateX(65%) rotate(8deg);opacity:.85}
      70%,100%{transform:translateX(65%) rotate(8deg);opacity:0}
    }
    @media (prefers-reduced-motion:reduce){
      #avatar .keeperAvatarImage,#avatar .avatarFrame,#avatar .avatarFrame:before{animation:none!important}
    }
  `;
  document.head.appendChild(style);

  // Pointer/touch parallax — subtle enough to keep her face steady.
  if(avatar&&keeperImg){
    const updateParallax=(e)=>{
      const r=avatar.getBoundingClientRect();
      const x=((e.clientX-r.left)/Math.max(r.width,1)-.5)*8;
      const y=((e.clientY-r.top)/Math.max(r.height,1)-.5)*6;
      keeperImg.style.setProperty('--keeper-x',x.toFixed(1)+'px');
      keeperImg.style.setProperty('--keeper-y',y.toFixed(1)+'px');
    };
    const resetParallax=()=>{
      keeperImg.style.setProperty('--keeper-x','0px');
      keeperImg.style.setProperty('--keeper-y','0px');
    };
    avatar.addEventListener('pointermove',updateParallax,{passive:true});
    avatar.addEventListener('pointerleave',resetParallax,{passive:true});
    avatar.addEventListener('pointercancel',resetParallax,{passive:true});
  }
})();
