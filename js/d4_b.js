  const wl=(a0,a1,b0,b1,g)=>{if(g===null){bd(k,a0,a1,b0,b1,0,h,c,1);return}if(g.a=='x'){bd(k,a0,gc-dw/2,b0,b1,0,h,c,1);bd(k,gc+dw/2,a1,b0,b1,0,h,c,1);bx(k,gc-dw/2,gc+dw/2,b0,b1,5.4,h,c)}else{bd(k,a0,a1,b0,gc-dw/2,0,h,c,1);bd(k,a0,a1,gc+dw/2,b1,0,h,c,1);bx(k,a0,a1,gc-dw/2,gc+dw/2,5.4,h,c)}};
  wl(x0,x1,z1-t,z1,face=='s'?{a:'x'}:null);wl(x0,x1,z0,z0+t,face=='n'?{a:'x'}:null);wl(x0,x0+t,z0+t,z1-t,face=='w'?{a:'z'}:null);wl(x1-t,x1,z0+t,z1-t,face=='e'?{a:'z'}:null);
  bx('solid',x0+t,x1-t,z0+t,z1-t,0,.12,o.fl||0x7b7d84);if(!o.open){bx(k,x0-.4,x1+.4,z0-.4,z1+.4,h,h+1,c);for(const q of[[x0,z0,x1,z0+.8],[x0,z1-.8,x1,z1],[x0,z0,x0+.8,z1],[x1-.8,z0,x1,z1]])bx(k,q[0],q[2],q[1],q[3],h+1,h+2.4,c)}
  for(let y=3.2;y<h-2;y+=5)for(let x=x0+9;x<x1-6;x+=11){if(Math.random()<.3)continue;bx('glow',x-.6,x+.6,z1-.02,z1+.08,y-.8,y+.8,GLOW);bx('glow',x-.6,x+.6,z0-.08,z0+.02,y-.8,y+.8,GLOW)}}
 const tower=(x,z,r,h,rc,cone)=>{bcy('stone',x,z,r,r,h,0xa9adb3,0,true,16);cyl('roof',x,z,r*1.2,0,cone||r*.95,rc||0x4d5863,h,16);cyl('snow',x,z,r*.9,0,r*.4,SNOW,h+(cone||r*.95)-r*.4,16);bx('glow',x-.5,x+.5,z+r-.05,z+r+.1,h*.62-.6,h*.62+.6,GLOW)};
 const lamp=(x,z)=>{bcy('iron',x,z,.14,.14,3.9,0x2b2f36,0,true,6);bx('glow',x-.3,x+.3,z-.3,z+.3,3.9,4.5,0xffc66a)};
 const crate=(x,z,s)=>bd('plank',x-s/2,x+s/2,z-s/2,z+s/2,0,s,0x8a6a45,1),barrel=(x,z)=>bcy('plank',x,z,.5,.5,1.1,0x6a4a2c,0,true,8);
 const banner=(x,z,y,c,face)=>{if(face=='z')bx('cloth',x-.05,x+.05,z-1.1,z+1.1,y-4,y,c);else bx('cloth',x-1.1,x+1.1,z-.05,z+.05,y-4,y,c)};
 const stall=(sx,sz,c)=>{for(const p of[[-2.4,-1.6],[2.4,-1.6],[-2.4,1.6],[2.4,1.6]])bcy('plank',sx+p[0],sz+p[1],.12,.12,2.7,0x4a3a2c,0,false,5);rbx('cloth',sx,2.85,sz,5.4,.12,3.6,.1,0,0,c);bd('plank',sx-2,sx+2,sz+.6,sz+1.6,0,1,0x7a5a3a,1)};
 // ---- the city: walls, gates, towers ----
 const WH=10,WT=2,WC=0xa9adb3;
 {const wallX=(x0,x1,zc)=>{bd('stone',x0,x1,zc-WT,zc+WT,0,WH,WC,1);for(let x=x0+2;x<x1-1;x+=4.5)bx('stone',x,x+2.4,zc-WT-.3,zc+WT+.3,WH,WH+1.4,WC)},wallZ=(z0,z1,xc)=>{bd('stone',xc-WT,xc+WT,z0,z1,0,WH,WC,1);for(let z=z0+2;z<z1-1;z+=4.5)bx('stone',xc-WT-.3,xc+WT+.3,z,z+2.4,WH,WH+1.4,WC)};
  wallX(-330,-10,-215);wallX(10,330,-215);wallZ(-215,-10,330);wallZ(10,215,330);wallZ(-215,-10,-330);wallZ(10,215,-330);
  bx('stone',-10,10,-217,-213,8,WH,WC);bx('stone',328,332,-10,10,8,WH,WC);bx('stone',-332,-328,-10,10,8,WH,WC);
  for(const q of[[-330,-215],[330,-215],[-330,215],[330,215],[-220,-215],[-110,-215],[110,-215],[220,-215],[-330,-110],[-330,110],[330,-110],[330,110]])tower(q[0],q[1],6.5,17);
  for(const q of[[-16,-215],[16,-215],[330,-16],[330,16],[-330,-16],[-330,16]])tower(q[0],q[1],7.2,21,0x56606b);
  for(let i=-6;i<=6;i+=2)bx('iron',i-.1,i+.1,-215.2,-214.8,5.6,8,0x2b2f36);for(const s of[-1,1]){banner(s*9.6,-218,8,0x8a1f1f,'z');banner(334,s*9.6,8,0x8a1f1f,'x');banner(-334,s*9.6,8,0x8a1f1f,'x')}}
 // ---- streets and squares (paved decals), fountain, lamps ----
 {const st=(x0,x1,z0,z1,y)=>bx('cobble',x0,x1,z0,z1,0,y||.1,0xb8b8be,4);
  st(-8,8,-215,228,.1);st(-330,330,-8,8,.11);st(-50,50,-50,50,.12);st(-118,-102,-210,205,.09);st(102,118,-210,205,.09);st(-326,326,92,108,.09);st(-326,326,-108,-92,.09);st(-326,326,200,228,.1);st(8,44,-172,-118,.12);st(-72,-10,-182,-138,.12);
  bcy('stone',0,0,7.4,7.4,1.2,0xb0b4ba,0,true,20);bcy('stone',0,0,1.1,1.1,4.2,0xb0b4ba,0,false,10);bcy('stone',0,0,2.8,.6,1.1,0xb0b4ba,4.2,false,12);bx('solid',-.4,.4,-.4,.4,5.3,7.4,0xb59a45);
  for(let z=-205;z<=225;z+=26)if(Math.abs(z)>52)for(const s of[-1,1])lamp(s*10,z);for(let x=-318;x<=318;x+=26)if(Math.abs(x)>56)for(const s of[-1,1])lamp(x,s*10);for(const q of[[-30,-30],[30,-30],[-30,30],[30,30]])lamp(q[0],q[1])}
 // ---- Governor's Palace (north-east), forecourt on the avenue ----
 hall(44,170,-200,-92,15,0xc9cdd3,'w',{gc:-146,dw:6.5,fl:0x8d8f97});
 for(const q of[[44,-200],[170,-200],[170,-92]])tower(q[0],q[1],8,27,0x4d5863);tower(44,-92,8,27,0x4d5863);tower(44,-146+9,5,22,0x4d5863);tower(44,-146-9,5,22,0x4d5863);
 for(let x=72;x<=152;x+=20)for(const z of[-174,-118]){bcy('stone',x,z,1.1,1.1,13,0xd7dae0,0,true,10)}
 bx('cloth',46,156,-147.2,-144.8,.12,.18,0x7a1f1f);bd('stone',156,168,-170,-120,0,1.4,0xb0b4ba,1);bd('solid',162,165,-148,-142,1.4,3.6,0xb59a45,1);bx('solid',165,166,-149,-141,1.4,6,0xb59a45);
 for(let z=-190;z<=-100;z+=18){bx('cloth',46.1,46.4,z,z+2.2,6,12,0x8a1f1f)}for(const s of[-1,1]){banner(46,-146+s*5,14.5,0xb59a45,'z')}
 for(const q of[[56,-180],[56,-112],[160,-182],[160,-110]]){bcy('stone',q[0],q[1],.8,.8,.9,0xb0b4ba,0,true,8);bx('glow',q[0]-.3,q[0]+.3,q[1]-.3,q[1]+.3,.9,1.5,0xff8f3a)}
 // ---- Cathedral of the Tides (north-west) ----
 hall(-150,-70,-180,-148,17,0xbcc0c7,'e',{gc:-164,dw:5.5,fl:0x8d8f97,open:true});gable(-110,-164,80,32,17,0x4d5863,0xbcc0c7,'stone',false);
 bd('stone',-84,-70,-196,-182,0,38,0xbcc0c7,1);cyl('roof',-77,-189,11,0,22,0x4d5863,38,4);cyl('snow',-77,-189,7,0,8,SNOW,52,4);bx('glow',-78,-76,-181.9,-181.6,26,31,GLOW);
 for(let x=-142;x<=-84;x+=7){bd('plank',x,x+1.2,-177,-170,0,.9,0x6a4a2c,1);bd('plank',x,x+1.2,-158,-151,0,.9,0x6a4a2c,1)}bd('stone',-150,-146,-167,-161,0,1.1,0xd7dae0,1);bx('glow',-149.6,-149.2,-165,-163,1.1,3,0xffd27a);
 // ---- military quarter (west): barracks, armoury, drill ground ----
 const barracks=(cx,cz,face)=>{house(cx,cz,36,12,6,face,{k:'stone',c:0xb4b8be,dw:3.4,int:false,rc:0x3f4852});const x0=cx-18,z0=cz-6,z1=cz+6;for(let i=0;i<5;i++){bd('solid',x0+4+i*6,x0+6.2+i*6,z0+.7,z0+1.7,0,.8,0x57606a,1);bd('solid',x0+4+i*6,x0+6.2+i*6,z1-1.7,z1-.7,0,.8,0x57606a,1)}};
 barracks(-250,-165,'e');barracks(-250,-130,'e');barracks(-250,-95,'e');house(-250,-55,22,12,6,'e',{k:'stone',c:0xb4b8be,dw:3.4,rc:0x3f4852});
 for(let x=-318;x<=-200;x+=4){bcy('plank',x,-30,.25,.25,2.2,0x4a3a2c,0,true,6)}for(const q of[[-300,-40],[-280,-40],[-260,-40],[-290,-20],[-270,-20]]){bcy('plank',q[0],q[1],.2,.2,2.2,0x4a3a2c,0,true,6);bx('plank',q[0]-.9,q[0]+.9,q[1]-.12,q[1]+.12,1.7,1.95,0x4a3a2c)}
 // ---- market square: stalls ring the fountain ----
 const STALLS=[[-34,-22],[-34,0],[-34,22],[34,-22],[34,0],[34,22],[-16,-38],[16,-38],[-16,38],[16,38]];STALLS.forEach((q,i)=>stall(q[0],q[1],[0x8a1f1f,0x2f5a7a,0x6e5f45,0x4d6a52,0x7a4a7a][i%5]));
 // ---- guild hall, inns, customs house, shops ----
 house(82,-10,40,24,10,'w',{k:'stone',c:0xbfc3c9,dw:4.2,rc:0x4d5863});house(-80,35,22,14,8.2,'e',{dw:3.4,c:0xd9b99b});house(80,48,22,14,8.2,'w',{dw:3.4,c:0xcdd9c6});
 bx('plank',-91.4,-91.1,30,40,5,7,0x6a4a2c);bx('plank',90.6,91.4,44,52,5,7,0x6a4a2c);
 house(-40,172,26,14,8,'s',{k:'stone',c:0xbfc3c9,dw:4.5,rc:0x4d5863});
 // ---- harbour district: warehouses, fish market, shipyard, cranes ----
 for(const x of[-300,-265,-230,-195,150,185,220])house(x,165,28,16,6.5,'s',{k:'plank',c:0xb09a80,dw:6,rc:0x56606b,int:false,chim:false});
 for(const q of[[-290,186],[-255,186],[-225,186],[160,186],[190,186],[210,186]]){crate(q[0],q[1],1.4);crate(q[0]+1.6,q[1],1.2);barrel(q[0]-1.6,q[1])}
 for(const q of[[-120,208],[-100,208],[-80,208]])stall(q[0],q[1],0x2f5a7a);for(let x=-124;x<=-70;x+=9){bx('plank',x,x+.2,211,211.2,0,2.2,0x4a3a2c);bx('plank',x+4.5,x+4.7,211,211.2,0,2.2,0x4a3a2c);bx('plank',x,x+4.7,211,211.2,2.2,2.4,0x4a3a2c)}
 house(270,175,40,18,6.5,'w',{k:'plank',c:0xa88f72,dw:6,rc:0x56606b,int:false,chim:false});
 for(const q of[[-110,258],[110,258],[0,258]])for(const s of[-1,1]){bd('plank',q[0]+s*8-.4,q[0]+s*8+.4,q[1]-.4,q[1]+.4,0,13,0x4a3a2c,1)}for(const q of[[-110,258],[110,258],[0,258]])bx('plank',q[0]-8.4,q[0]+8.4,q[1]-.3,q[1]+.3,12,12.6,0x4a3a2c);
 const crate2=(x,z,s,y0)=>bd('plank',x-s/2,x+s/2,z-s/2,z+s/2,y0,y0+s,0x8a6a45,1);
 // ---- houses and shops along the streets ----
 const RESV=[[38,178,-208,-88],[8,46,-174,-116],[-156,-62,-200,-142],[-74,-8,-184,-136],[-330,-186,-200,-12],[-52,52,-52,52],[58,106,-26,6],[-96,-64,22,48],[64,96,35,61],[-56,-24,160,184],[-318,-176,150,208],[-128,-62,196,218],[136,236,150,208],[246,294,160,200],[296,326,140,205]];
 const STR=[[-13,13,-216,230],[-330,330,-13,13],[-120,-100,-212,207],[100,120,-212,207],[-326,326,90,110],[-326,326,-110,-90],[-326,326,198,230]];
 const hit_=(a,b,c,d,L)=>L.some(r=>a<r[1]&&b>r[0]&&c<r[3]&&d>r[2]);
 const nearSt=(x,z)=>Math.min(Math.abs(x),Math.abs(x-110),Math.abs(x+110))<34||Math.min(Math.abs(z),Math.abs(z-100),Math.abs(z+100),Math.abs(z-214))<34;
 let nHouses=0;for(let x=-318;x<318;x+=rnd(16,21))for(let z=-204;z<190;z+=rnd(15,19)){if(!nearSt(x,z)||Math.random()<.12)continue;const w=rnd(9,12.5),d=rnd(8,11),h=Math.random()<.45?4.6:Math.random()<.7?8.2:11.8;
  if(hit_(x-w/2-1,x+w/2+1,z-d/2-1,z+d/2+1,RESV)||hit_(x-w/2-1,x+w/2+1,z-d/2-1,z+d/2+1,STR))continue;house(x,z,w,d,h,Math.abs(x)<Math.abs(z)?(x<0?'e':'w'):(z<0?'s':'n'));nHouses++}
 // snowy evergreens in the forecourts and along the promenade
 for(const q of[[-60,-170],[-60,-150],[-20,-160],[16,-128],[16,-166],[-40,205],[40,205],[-80,194],[80,194],[-18,-70],[18,-70],[-18,70],[18,70],[-200,5],[200,5],[-150,-5],[150,-5]]){bcy('solid',q[0],q[1],.3,.3,2.4,0x5a4030,0,true,6);cyl('solid',q[0],q[1],2.7,0,6.5,0x35553f,2.2,8);cyl('snow',q[0],q[1],1.6,0,3,SNOW,5.6,8)}
 // ---- harbour: three piers, a breakwater and the lighthouse ----
 const DKL=DKA-GY;
 for(const xc of[-110,0,110]){const z0=262,z1=352;bx('plank',xc-5.5,xc+5.5,z0,z1,DKL-.45,DKL,0x7a5c3c);FLR.push([xc+CX_-5.5,xc+CX_+5.5,z0+CZ_,z1+CZ_,DKA,DKA,0]);
  for(let z=z0+4;z<z1;z+=8)for(const s of[-1,1])bcy('plank',xc+s*5,z,.35,.35,9,0x4a3a2c,DKL-9,false,6);
  for(const s of[-1,1]){bx('plank',xc+s*5.5-.1,xc+s*5.5+.1,z0,z1,DKL,DKL+1.1,0x6a4a2c);ccr(xc+s*5.5-.2,xc+s*5.5+.2,z0,z1,DKL,DKL+2.2)}bx('plank',xc-5.5,xc+5.5,z1-.1,z1+.1,DKL,DKL+1.1,0x6a4a2c);ccr(xc-5.5,xc+5.5,z1-.2,z1+.2,DKL,DKL+2.2);
  for(let z=z0+12;z<z1-6;z+=18){crate2(xc-3.5,z,1.2,DKL);bcy('plank',xc+3.6,z+2,.5,.5,1.1,0x6a4a2c,DKL,true,8)}for(const s of[-1,1]){bcy('plank',xc+s*5.5,z1,.2,.2,2.4,0x4a3a2c,DKL,false,6);bx('glow',xc+s*5.5-.3,xc+s*5.5+.3,z1-.3,z1+.3,DKL+2.4,DKL+3,0xffc66a)}}
 bx('stone',150,162,250,350,-12,-2.5,0x9a9ea5);FLR.push([150+CX_,162+CX_,250+CZ_,350+CZ_,GY-2.5,GY-2.5,0]);
 bcy('stone',156,345,4.6,3.2,28,0xe3e5e8,-2.5,true,14);bcy('solid',156,345,4.3,3.9,5,0x8a1f1f,6,false,14);bcy('solid',156,345,3.9,3.5,5,0x8a1f1f,16,false,14);cyl('glow',156,345,2.7,2.7,4,0xfff0b0,25.5,12);cyl('roof',156,345,3.8,0,3.4,0x8a1f1f,29.5,12);
 // ---- ships (built in their own local space so they can bob on the water) ----
 const ships=[];
 function ship(x,z,len,beam,yaw,big,hullc,y0){const keep=BUF;BUF={};OX=OZ=OY=0;const hw=beam/2,bow=Math.min(len*.28,beam*1.6);
  prism('solid',[[-hw,-len/2],[hw,-len/2],[hw*1.05,len/2-bow],[0,len/2],[-hw*1.05,len/2-bow]],-1.8,1.4,hullc||0x4a3322);bx('plank',-hw*.9,hw*.9,-len/2+.6,len/2-bow*.7,1.4,1.6,0x8a6d4a);bx('solid',-hw*1.02,hw*1.02,-len/2,len/2-bow,.7,.95,0xb59a45);
  for(const m of big?[.2,-.08,-.32]:[0]){cyl('plank',0,m*len,.3,.2,big?19:12,0x4a3a2c,1.5,false,6);rbx('cloth',0,1.5+(big?10.5:6.5),m*len+.2,beam*.95,big?11:7,.12,0,0,0,0xe8e2d0);bx('plank',-beam*.5,beam*.5,m*len-.1,m*len+.1,(big?11.5:7.5),(big?11.7:7.7),0x4a3a2c)}
  bx('plank',-hw*.8,hw*.8,-len/2+.8,-len/2+6,1.6,4.4,0x6a4a2c);bx('glow',-hw*.4,hw*.4,-len/2+5.9,-len/2+6.05,2.6,3.6,GLOW);rbx('plank',0,2.2,len/2+.6,.3,.3,5,-.25,0,0,0x4a3a2c);
  for(const s of[-1,1])bx('plank',s*hw*.98-.05,s*hw*.98+.05,-len/2+.6,len/2-bow*.8,1.6,2.6,0x6a4a2c);
  const g=new T.Group();emit(BUF,g);BUF=keep;OX=CX_;OZ=CZ_;OY=GY;const yy=y0!==undefined?y0:SEA+1.2;g.position.set(CX_+x,yy,CZ_+z);g.rotation.y=yaw||0;grp.add(g);if(y0===undefined)ships.push({g,ph:Math.random()*6,y0:yy,yaw:yaw||0})}
 ship(-9.8,300,38,6,0,true,0x4a3322);ship(9.2,326,26,5,0,false,0x3a4a5a);ship(-119.8,310,26,5,0,false,0x5a3a2a);ship(119.8,300,34,6,0,true,0x3a3a46);ship(-100,340,14,3.4,0,false,0x6a4a2c);ship(70,400,46,8,.3,true,0x2a2f3a);ship(-60,380,12,3,2.2,false,0x6a4a2c);ship(-190,360,13,3.2,1.2,false,0x5a3a2a);
 ship(305,175,42,9,0,true,0x4a3322,GY+2.6);for(const z of[158,166,174,182,190])bx('plank',298,312,z,z+1.2,0,2,0x5a4030);
 // ---- the sea: scrolling swell texture, ice floes, and distance culling ----
 const wt=tex(g=>{g.fillStyle='#2f5c72';g.fillRect(0,0,256,256);for(let i=0;i<700;i++){const l=Math.random()<.5;g.strokeStyle=l?'rgba(190,225,240,'+(.05+Math.random()*.12)+')':'rgba(10,30,45,'+(.08+Math.random()*.15)+')';g.lineWidth=1+Math.random()*2;const x=Math.random()*256,y=Math.random()*256,w=10+Math.random()*30;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+w/2,y-3-Math.random()*3,x+w,y);g.stroke()}});
 wt.repeat.set(420,420);const seaG=new T.Group();scene.add(seaG);
 const sea=new T.Mesh(new T.PlaneGeometry(9000,6000),new T.MeshStandardMaterial({map:wt,bumpMap:wt,bumpScale:1.3,color:0xe2f1f6,roughness:.22,metalness:.22}));sea.rotation.x=-PI/2;sea.position.set(400,SEA,4150);seaG.add(sea);
