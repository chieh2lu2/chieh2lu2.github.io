var posts=["2024/09/16/HexoI/","2024/09/30/HDU-5396/","2024/09/16/P10252/","2024/09/15/P5824/","2024/09/16/P10511/","2024/12/01/Spider/","2024/09/16/PCFont/","2024/09/15/UVA11437/","2026/10/08/pad-streaming/","2024/09/15/YJZXCCReport/","2025/01/01/nikki/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };