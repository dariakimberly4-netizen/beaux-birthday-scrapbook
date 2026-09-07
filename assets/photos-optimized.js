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
})();
