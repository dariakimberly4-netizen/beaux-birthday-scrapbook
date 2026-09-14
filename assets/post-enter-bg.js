(()=>{
  const style=document.createElement('style');
  style.textContent=`
    body{background:radial-gradient(circle at 52% 46%,#33205a 0,#100a23 48%,#05040c 100%)!important}
    #gate{background:radial-gradient(circle,#39265f,#100a22 55%,#05040c)!important}
    #app{background:
      linear-gradient(rgba(5,4,12,.36),rgba(5,4,12,.48)),
      url('file_0000000013c481f5966a9b404b093318.png') center center/cover no-repeat!important;
      background-attachment:fixed!important;
    }
    @media(max-width:760px){
      #app{background-position:38% center!important}
    }
  `;
  document.head.appendChild(style);
})();