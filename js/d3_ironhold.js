// ================= Ironhold: an armoured fortress-town in the north-west corner =================
{const NX=NWX,NZ=NWZ,NY=NWH,R_=190;
 const TM=(c,r,m)=>new T.MeshStandardMaterial({color:c,roughness:r??1,metalness:m||0}),jit=c=>{const f=.82+Math.random()*.36,q=v=>Math.min(255,v*f|0);return q(c>>16&255)<<16|q(c>>8&255)<<8|q(c&255)};
 const stoneT=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=256;const g=cv.getContext('2d');g.fillStyle='#3e4146';g.fillRect(0,0,256,256);
  for(let r=0;r<8;r++){const o=(r%2)*24;for(let x=-o;x<256;x+=48){const v=88+Math.random()*50|0;g.fillStyle='rgb('+v+','+v+','+(v+6)+')';g.fillRect(x+1.5,r*32+1.5,45,29)}}
  for(let i=0;i<500;i++){g.fillStyle='rgba('+(Math.random()<.5?'255,255,255':'0,0,0')+','+Math.random()*.12+')';g.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3)}
  const t=new T.CanvasTexture(cv);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;return t})();
 const mstR=(rx,ry,c)=>{const t=stoneT.clone();t.needsUpdate=true;t.repeat.set(rx,ry);return new T.MeshStandardMaterial({map:t,color:c||0xc2c6cc,roughness:1})};
 const MST=()=>new T.MeshStandardMaterial({map:stoneT,color:jit(0xc2c6cc),roughness:1}),MROOF=new T.MeshStandardMaterial({map:stoneT,color:0x555a62,roughness:1}),
  MFLR=TM(0x2a2a2d),MWD=TM(0x4a3a2c),MIRN=TM(0x2b2f36,.5,.6),MSNW=TM(0xf2f6fc),MWIN=new T.MeshBasicMaterial({color:0xc98a3f}),MEMB=new T.MeshBasicMaterial({color:0xff8f3a}),MRED=TM(0x8a1f1f),MGLD=TM(0xb59a45,.4,.6),MBED=TM(0x57606a),MDK=TM(0x1c1815),MCLO=[TM(0x8a1f1f),TM(0x2f3a46),TM(0x5c4a2c)];
 const tadd=(m,x,y,z)=>{m.position.set(NX+x,NY+y,NZ+z);m.castShadow=m.receiveShadow=true;scene.add(m);return m};
 const tbx=(x0,x1,z0,z1,y0,y1,m,c)=>{const w=x1-x0,h=y1-y0,d=z1-z0,g=new T.BoxGeometry(w,h,d),uv=g.attributes.uv,f=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]];
  for(let i=0;i<24;i++){const q=f[i>>2];uv.setXY(i,uv.getX(i)*q[0]/4,uv.getY(i)*q[1]/4)}tadd(new T.Mesh(g,m),(x0+x1)/2,(y0+y1)/2,(z0+z1)/2);if(c)fcr(NX+x0,NX+x1,NZ+z0,NZ+z1,NY+y1,NY+y0)};
 const tcy=(x,z,r,h,m,c,y0,seg)=>{y0=y0||0;tadd(new T.Mesh(new T.CylinderGeometry(r,r*1.06,h,seg||12),m),x,y0+h/2,z);if(c)fcc(NX+x,NZ+z,r+.1,NY+y0+h,NY+y0)};
 const glow=(x,y,z,r)=>{const s=new T.Mesh(new T.SphereGeometry(r||.35,8,6),MEMB);s.position.set(NX+x,NY+y,NZ+z);scene.add(s)};
 const WIN=[];
 function house(cx,cz,w,d,face,o){o=o||{};const t=.45,h=o.h||4,dw=o.dw||2.4,m=MST(),x0=cx-w/2,x1=cx+w/2,z0=cz-d/2,z1=cz+d/2;
  const wl=(a0,a1,b0,b1,gap)=>{if(!gap){tbx(a0,a1,b0,b1,0,h,m,true);return}
   if(gap.a=='x'){tbx(a0,gap.c-dw/2,b0,b1,0,h,m,true);tbx(gap.c+dw/2,a1,b0,b1,0,h,m,true);tbx(gap.c-dw/2,gap.c+dw/2,b0,b1,2.8,h,m)}
   else{tbx(a0,a1,b0,gap.c-dw/2,0,h,m,true);tbx(a0,a1,gap.c+dw/2,b1,0,h,m,true);tbx(a0,a1,gap.c-dw/2,gap.c+dw/2,2.8,h,m)}};
  wl(x0,x1,z1-t,z1,face=='s'?{a:'x',c:cx}:null);wl(x0,x1,z0,z0+t,face=='n'?{a:'x',c:cx}:null);wl(x0,x0+t,z0+t,z1-t,face=='w'?{a:'z',c:cz}:null);wl(x1-t,x1,z0+t,z1-t,face=='e'?{a:'z',c:cz}:null);
  tbx(x0+t,x1-t,z0+t,z1-t,0,.1,MFLR);
  {const long=w>=d,L=long?w:d,S=long?d:w,rise=S*.3,ang=Math.atan2(rise,S/2),sl=S/2/Math.cos(ang)+.7;
   for(const s of[-1,1]){const dx=long?L+1.6:sl,dz=long?sl:L+1.6,r=new T.Mesh(new T.BoxGeometry(dx,.3,dz),MROOF),sn=new T.Mesh(new T.BoxGeometry(dx,.18,dz),MSNW),px=NX+cx+(long?0:s*S/4),pz=NZ+cz+(long?s*S/4:0),py=NY+h+rise/2+.15;
    r.position.set(px,py,pz);sn.position.set(px,py+.22,pz);if(long)r.rotation.x=sn.rotation.x=s*ang;else r.rotation.z=sn.rotation.z=-s*ang;r.castShadow=r.receiveShadow=true;sn.receiveShadow=true;scene.add(r);scene.add(sn)}
   const sh=new T.Shape();sh.moveTo(-S/2,0);sh.lineTo(S/2,0);sh.lineTo(0,rise);const sg=new T.ShapeGeometry(sh),gm_=TM(0x3c3f45);gm_.side=T.DoubleSide;
   for(const s of[-1,1]){const e=new T.Mesh(sg,gm_);if(long){e.position.set(NX+cx+s*L/2,NY+h,NZ+cz);e.rotation.y=PI/2}else e.position.set(NX+cx,NY+h,NZ+cz+s*L/2);scene.add(e)}
   if(o.chim!==false){const hx=long?w*.25:0,hz=long?0:d*.25;tbx(cx+hx-.6,cx+hx+.6,cz+hz-.6,cz+hz+.6,h+rise*.4,h+rise+2,MST());tbx(cx+hx-.7,cx+hx+.7,cz+hz-.7,cz+hz+.7,h+rise+2,h+rise+2.2,MSNW)}}
  for(const q of[[x0+w*.28,z0-.02,PI],[x1-w*.28,z0-.02,PI],[x0-.02,cz,-PI/2],[x1+.02,cz,PI/2],[x0+w*.28,z1+.02,0],[x1-w*.28,z1+.02,0]]){
   if((face=='n'&&q[1]<z0)||(face=='s'&&q[1]>z1)||(face=='w'&&q[0]<x0)||(face=='e'&&q[0]>x1))continue;WIN.push([q[0],2.1,q[1],q[2]])}
  if(o.int!==false){if(face=='s'||face=='n'){const bz=face=='s'?z0+t+.2:z1-t-1.4;tbx(x0+t,x0+t+1.1,cz-1.1,cz+1.1,0,.7,MBED,true);tbx(x1-t-1.3,x1-t,cz-1,cz+1,0,2.4,MST(),true);glow(x1-t-1.5,.45,cz,.4);tbx(cx+.9,cx+2.3,bz,bz+1.2,0,.9,MWD,true)}
   else{const bx=face=='w'?x1-t-1.4:x0+t+.2;tbx(cx-1.1,cx+1.1,z0+t,z0+t+1.1,0,.7,MBED,true);tbx(cx-1,cx+1,z1-t-1.3,z1-t,0,2.4,MST(),true);glow(cx,.45,z1-t-1.5,.4);tbx(bx,bx+1.2,cz+.9,cz+2.3,0,.9,MWD,true)}}}
 const barracks=(cx,cz,face)=>{house(cx,cz,36,11,face,{h:4.8,int:false,dw:3.2});const x0=cx-18,z0=cz-5.5,z1=cz+5.5;for(let i=0;i<5;i++){tbx(x0+4+i*6,x0+6.2+i*6,z0+.5,z0+1.5,0,.8,MBED,true);tbx(x0+4+i*6,x0+6.2+i*6,z1-1.5,z1-.5,0,.8,MBED,true)}};
 const rack=(x,z)=>{tbx(x-1.6,x-1.4,z-.2,z+.2,0,2.2,MWD);tbx(x+1.4,x+1.6,z-.2,z+.2,0,2.2,MWD);tbx(x-1.6,x+1.6,z-.2,z+.2,1.6,1.8,MWD,true);for(let i=0;i<5;i++){const s=new T.Mesh(new T.CylinderGeometry(.04,.04,2.6,5),MIRN);s.rotation.z=.1;tadd(s,x-1.2+i*.6,1.3,z)}};
 // ---- curtain wall, towers and gate ----
 {const NS=64,gapS=(x,z)=>(z>0&&Math.abs(x)<8.5)||(z<0&&Math.abs(x)<5),wl=[],mr=[];
  for(let i=0;i<NS;i++){const a=(i+.5)*2*PI/NS,x=Math.sin(a)*R_,z=Math.cos(a)*R_;if(gapS(x,z))continue;wl.push([x,z,a]);for(const t of[-6.2,0,6.2])mr.push([x+Math.cos(a)*t,z-Math.sin(a)*t,a])}
  for(let a=0;a<2*PI;a+=3.2/R_){const x=Math.sin(a)*R_,z=Math.cos(a)*R_;if(gapS(x,z))continue;fcc(NX+x,NZ+z,3.1,NY+12,NY-1)}
  const d=new T.Object3D(),wm=new T.InstancedMesh(new T.BoxGeometry(1,1,1),mstR(4,2.5,0xb4b8be),wl.length),mm=new T.InstancedMesh(new T.BoxGeometry(1,1,1),mstR(1,1,0xb4b8be),mr.length);
  wl.forEach((w,i)=>{d.position.set(NX+w[0],NY+6,NZ+w[1]);d.rotation.set(0,w[2],0);d.scale.set(19.4,12,5);d.updateMatrix();wm.setMatrixAt(i,d.matrix)});
  mr.forEach((w,i)=>{d.position.set(NX+w[0],NY+12.7,NZ+w[1]);d.rotation.set(0,w[2],0);d.scale.set(3,1.4,5.2);d.updateMatrix();mm.setMatrixAt(i,d.matrix)});
  for(const m of[wm,mm]){m.castShadow=m.receiveShadow=true;m.frustumCulled=false;scene.add(m)}
  for(const a of[1,2,3,4,5,7,8,9,10,11].map(k=>k*PI/6).concat([.085,-.085])){const x=Math.sin(a)*R_,z=Math.cos(a)*R_,big=Math.abs(a)<.1,r=big?8.5:7,h=big?24:19;
   tcy(x,z,r,h,mstR(10,4),true,0,18);const c=new T.Mesh(new T.ConeGeometry(r*1.2,r*.95,18),MROOF);tadd(c,x,h+r*.47,z);const cs=new T.Mesh(new T.ConeGeometry(r*.95,r*.3,18),MSNW);tadd(cs,x,h+r*.95,z);glow(x+Math.sin(a)*r*.98,h*.65,z+Math.cos(a)*r*.98,.45)}
  tbx(-8.5,8.5,R_-2.5,R_+2.5,9,12,MST());tbx(-10,-8.5,R_-2.5,R_+2.5,0,12,MST(),true);tbx(8.5,10,R_-2.5,R_+2.5,0,12,MST(),true);
  for(let i=-6;i<=6;i+=1.5)tbx(i-.1,i+.1,R_-.2,R_+.2,5.4,9,MIRN);tbx(-8.5,8.5,R_-.2,R_+.2,5.4,5.7,MIRN);tbx(-8.5,8.5,R_-.2,R_+.2,7.2,7.5,MIRN);
  for(const s of[-1,1]){const b=new T.Mesh(new T.BoxGeometry(.15,6.5,3),MCLO[0]);tadd(b,s*8.4,6,R_+2.7);tcy(s*5.6,-R_+.5,.5,6,MST(),true)}}
 // ---- the keep ----
 {const x0=-34,x1=34,z0=-142,z1=-92,H_=22,t=1.6,m=mstR(14,4,0xb0b4ba);
  tbx(x0,x0+t,z0,z1,0,H_,m,true);tbx(x1-t,x1,z0,z1,0,H_,m,true);tbx(x0,x1,z0,z0+t,0,H_,m,true);tbx(x0,-3.6,z1-t,z1,0,H_,m,true);tbx(3.6,x1,z1-t,z1,0,H_,m,true);tbx(-3.6,3.6,z1-t,z1,6.6,H_,m);
  tbx(x0+t,x1-t,z0+t,z1-t,0,.1,MFLR);tbx(x0-.4,x1+.4,z0-.4,z1+.4,H_,H_+1,MST());
  for(const q of[[x0,z0,x1,z0+.8],[x0,z1-.8,x1,z1],[x0,z0,x0+.8,z1],[x1-.8,z0,x1,z1]])tbx(q[0],q[2],q[1],q[3],H_+1,H_+2.4,MST());
  for(const sx of[x0,x1])for(const sz of[z0,z1]){tcy(sx,sz,6.5,H_+8,mstR(8,4),true,0,16);const c=new T.Mesh(new T.ConeGeometry(8,7,16),MROOF);tadd(c,sx,H_+11.5,sz);const cs=new T.Mesh(new T.ConeGeometry(6.2,2,16),MSNW);tadd(cs,sx,H_+14,sz);glow(sx,H_+4,sz+(sz>z0?6.6:-6.6)*.98,.5)}
  for(const s of[-1,1]){const b=new T.Mesh(new T.BoxGeometry(.2,9,3.4),MCLO[0]);tadd(b,s*11,12,z1+.3)}const gl=new T.Mesh(new T.BoxGeometry(3.4,.2,.2),MGLD);tadd(gl,0,8.4,z1+.5);
  tbx(-10,10,-120,-118.2,0,.95,MWD,true);tbx(-10,10,-124,-122.6,0,.5,MWD,true);tbx(-10,10,-114.6,-113.2,0,.5,MWD,true);tbx(-8,8,-140.4,-133,0,1.2,MST(),true);tbx(-1.3,1.3,-139.6,-137.4,1.2,3.4,MWD,true);tbx(-1.3,1.3,-140.2,-139.6,1.2,5.4,MWD);
  for(const q of[[-16,-100],[16,-100],[-16,-132],[16,-132]]){tcy(q[0],q[1],.8,.9,MST(),true);glow(q[0],1.2,q[1],.55);glow(q[0]+.2,1.7,q[1],.3)}
  for(const q of[-18,18]){tbx(q-.1,q+.1,-141,-140.4,3,9,MCLO[0])}}
 // ---- buildings: houses along the avenue, barracks, armoury, smithy, training yard ----
 for(const a of[[-42,150,'e'],[-42,118,'e'],[-42,86,'e'],[42,150,'w'],[42,118,'w'],[42,86,'w'],[-110,100,'e'],[110,100,'w'],[-95,140,'e'],[95,140,'w']])house(a[0],a[1],10,9,a[2]);
 barracks(-90,50,'e');barracks(90,50,'w');barracks(-90,-10,'e');
 house(90,-10,16,10,'w',{h:4.8,dw:3});rack(66,-14);rack(66,-5);
 {const sx=95,sz=-62;for(const p of[[-4.5,-3.5],[4.5,-3.5],[-4.5,3.5],[4.5,3.5]])tcy(sx+p[0],sz+p[1],.4,3.8,MWD,true);const r=new T.Mesh(new T.BoxGeometry(12,.3,9.5),MROOF);r.rotation.z=.1;tadd(r,sx,4.3,sz);const sn=new T.Mesh(new T.BoxGeometry(12,.2,9.5),MSNW);sn.rotation.z=.1;tadd(sn,sx,4.55,sz);
  tcy(sx-.4,sz,.7,.6,MWD);tbx(sx-1.1,sx+.3,sz-.4,sz+.4,.6,1.2,MIRN,true);tbx(sx+2.5,sx+4.5,sz-3.6,sz-1.6,0,1.2,MST(),true);glow(sx+3.5,1.45,sz-2.6,.55);glow(sx+3.2,1.9,sz-2.4,.35);tcy(sx-3.5,sz+2,.6,1.1,MWD,true)}
 {const fx0=-123,fx1=-67,fz0=-92,fz1=-48;for(let x=fx0;x<=fx1;x+=4){tcy(x,fz0,.3,2.2,MWD,true);tcy(x,fz1,.3,2.2,MWD,true)}for(let z=fz0+4;z<fz1;z+=4){tcy(fx0,z,.3,2.2,MWD,true);if(Math.abs(z+70)>5)tcy(fx1,z,.3,2.2,MWD,true)}
  for(const q of[[-110,-80],[-98,-80],[-86,-80],[-104,-62],[-90,-62]]){tcy(q[0],q[1],.18,2.4,MWD,true);tbx(q[0]-.9,q[0]+.9,q[1]-.12,q[1]+.12,1.7,1.95,MWD);const h=new T.Mesh(new T.SphereGeometry(.34,8,6),TM(0x8a7a5a));tadd(h,q[0],2.6,q[1])}rack(-75,-56);rack(-75,-84)}
 // ---- parade ground and avenue: statue, stalls, well, braziers, lamps, banners ----
 {tbx(-2.4,2.4,37.6,42.4,0,1.8,MST(),true);tbx(-.9,.9,39.1,40.9,1.8,4.6,MIRN,true);const hd=new T.Mesh(new T.SphereGeometry(.6,10,8),MIRN);tadd(hd,0,5.2,40);tbx(-1.5,1.5,39.3,40.7,3.8,4.4,MIRN);tbx(-.1,.1,39.6,40.4,4,7.2,MGLD);
  [[-22,28,0],[22,28,1],[-22,60,2],[22,60,0]].forEach(q=>{for(const p of[[-2,-1.3],[2,-1.3],[-2,1.3],[2,1.3]])tcy(q[0]+p[0],q[1]+p[1],.12,2.7,MWD);const c=new T.Mesh(new T.BoxGeometry(5.2,.12,3.4),MCLO[q[2]]);c.rotation.x=.1;tadd(c,q[0],2.8,q[1]);tbx(q[0]-1.9,q[0]+1.9,q[1]+.7,q[1]+1.5,0,1,MWD,true)});
  tcy(22,4,2.4,1.2,MST(),true);tcy(19.8,4,.2,3.2,MWD);tcy(24.2,4,.2,3.2,MWD);tbx(19.6,24.4,3.7,4.3,3,3.3,MWD);
  for(const q of[[-14,16],[14,16],[-14,64],[14,64],[-9,176],[9,176]]){tcy(q[0],q[1],.9,.9,MST(),true);glow(q[0],1.2,q[1],.55);glow(q[0]+.2,1.7,q[1],.3)}
  for(const z of[165,125,85,45,5,-35,-75]){for(const s of[-1,1]){tcy(s*7.5,z,.15,3.8,MWD,true);glow(s*7.5,3.95,z,.32)}}
  for(const z of[170,140,110,80,20,-20,-60,-85])for(const s of[-1,1]){tcy(s*11,z,.18,8,MWD,true);const b=new T.Mesh(new T.BoxGeometry(.12,4.2,2.2),MCLO[0]);tadd(b,s*11,5.6,z+1.2);tadd(new T.Mesh(new T.SphereGeometry(.3,8,6),MGLD),s*11,8.2,z)}}
 {const d=new T.Object3D(),wi=new T.InstancedMesh(new T.BoxGeometry(.9,1.1,.14),MWIN,WIN.length);WIN.forEach((w,i)=>{d.position.set(NX+w[0],NY+w[1],NZ+w[2]);d.rotation.set(0,w[3],0);d.updateMatrix();wi.setMatrixAt(i,d.matrix)});wi.frustumCulled=false;scene.add(wi)}
 // ---- the garrison: strong guards in plate, captains, a few townsfolk, and patrols that tour the map ----
 const NPCS=[],npcEl=document.createElement('div');npcEl.style.cssText='position:fixed;left:50%;bottom:17%;transform:translateX(-50%);padding:10px 18px;background:rgba(14,20,30,.82);border:1px solid rgba(216,181,106,.5);color:#eef3f8;font:16px Georgia,serif;max-width:560px;text-align:center;pointer-events:none;z-index:4;display:none';document.body.appendChild(npcEl);
 let level=1,talkT=0,cur=null;
 const LVN=['FRIENDLY','ALERT','AGGRESSIVE'],LVC=['#8fcf9a','#e0b44f','#d9503f'],tEl=document.createElement('div');tEl.style.cssText='font-size:12px;letter-spacing:.18em;margin-top:6px;display:none;text-shadow:0 1px 4px #000';$('hud').appendChild(tEl);
 // Ironhold never relaxes: ALERT from the start and forever; AGGRESSIVE only while the garrison hunts you
 const setLevel=l=>{if(l==level)return;level=l;if(Math.hypot(P.x-NX,P.z-NZ)<600)msg(l==1?'IRONHOLD IS ON ALERT':'IRONHOLD MARCHES',2600,l==1?'The garrison has given up the chase':'')};
 const ST={g:{hp:260,dmg:22,wind:.65,spd:4.3,rec:1},c:{hp:420,dmg:32,wind:.85,spd:4,rec:1.2}},GX=NX,GZ=NZ+R_,ins=(x,z)=>Math.hypot(x-NX,z-NZ)<R_-6;
 const aim=(n,tx,tz)=>{const ni=ins(n.x,n.z);if(ni!=ins(tx,tz)){const ax=Math.abs(n.x-GX)<=6;if(ni){if(!ax||n.z<GZ-24){tx=GX;tz=GZ-20}else{tx=GX;tz=GZ+20}}else{if(!ax||n.z>GZ+24){tx=GX;tz=GZ+20}else{tx=GX;tz=GZ-20}}}return Math.atan2(tx-n.x,tz-n.z)+(n.sideT>0?n.side*1.2:0)};
 const GC={},gb=(w,h,d)=>GC[w+','+h+','+d]||(GC[w+','+h+','+d]=new T.BoxGeometry(w,h,d)),SPG=new T.SphereGeometry(1,10,8);
 function mk(d){const guard=d.k=='g',cap=d.rank=='c',g=new T.Group(),mats=[],M=(c,r,m)=>{const x=new T.MeshStandardMaterial({color:c,roughness:r??.9,metalness:m||0});mats.push(x);return x};
  const part=(geo,m,x,y,z,p,sx,sy,sz)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);if(sx)o.scale.set(sx,sy,sz);o.castShadow=true;(p||g).add(o);return o};
  const skin=M(0xcdb4a0),steel=M(cap?0x9aa3ad:0x7a838d,.45,.65),dark=M(0x2b2f36,.6,.5),red=M(cap?0xc9a24a:0x8a1f1f,.9),cl=M(d.c||0x6b5a46),dk=M(d.c2||0x4a3f33);
  const legs=[-1,1].map(s=>{const l=new T.Group();l.position.set(s*.17,.95,0);g.add(l);part(gb(.28,.95,.3),guard?dark:dk,0,-.47,0,l);if(guard)part(gb(.3,.2,.42),steel,0,-.88,.05,l);return l});
  part(gb(.7,.85,.42),guard?steel:cl,0,1.35,0);const hd=part(SPG,skin,0,1.98,0,null,.2,.22,.21);
  const arms=[-1,1].map(s=>{const a=new T.Group();a.position.set(s*.44,1.68,0);g.add(a);part(gb(.22,.78,.24),guard?steel:cl,0,-.39,0,a);return a});
  let weapon=null;
  if(guard){part(gb(.46,.78,.04),red,0,1.3,.23);part(gb(.72,.1,.44),dark,0,.92,0);for(const s of[-1,1])part(SPG,steel,s*.48,1.74,0,null,.27,.17,.29);
   part(SPG,steel,0,2.06,0,null,.25,.21,.26);part(gb(.3,.06,.05),dark,0,1.99,.2);part(gb(.06,cap?.4:.22,.34),red,0,cap?2.36:2.28,0);
   part(gb(.08,.95,.62),dark,-.22,-.55,.12,arms[0]);part(gb(.09,.4,.3),red,-.27,-.5,.12,arms[0]);
   weapon=new T.Group();weapon.position.set(0,-.7,.12);arms[1].add(weapon);part(new T.CylinderGeometry(.04,.04,cap?3.1:2.8,6),dark,0,.95,0,weapon);part(gb(.5,.34,.06),steel,.2,2.2,0,weapon);part(new T.ConeGeometry(.07,.45,6),steel,0,2.55,0,weapon);weapon.rotation.x=-.2}
  else{part(new T.ConeGeometry(.25,.4,8),dk,0,2.16,0);part(gb(.5,.14,.36),M(0x8a8079),0,1.64,0)}
  return{g,legs,arms,mats,weapon}}
 const D=[],GL=[['Halt. Ironhold admits only those who have been searched.','Hands where I can see them.'],['State your name and your business, stranger.','The Warden has ordered every traveller watched.'],['Walk straight. Touch nothing. Speak when spoken to.','You are being watched from the walls.'],['No weapons drawn inside the walls. Not ever.','Test us and the whole garrison answers.']],PLN=['Halt. Patrol of Ironhold. Where are you bound?','The roads belong to Ironhold. Keep to them.'];
 const G=(n,x,z,f,o)=>D.push(Object.assign({n,k:'g',x,z,f:f||0,la:GL[D.length%4]},o||{})),C=(n,x,z,f,c,la)=>D.push({n,k:'c',x,z,f,c,c2:0x3f3a36,la});
 for(const q of[[-11,176],[11,176],[-15,171],[15,171],[-9,166],[9,166]])G('Gate guard',q[0],q[1],0);
 for(const a of[50,100,150,210,260,310].map(v=>v*PI/180))G('Wall sentry',Math.sin(a)*(R_-1.5),Math.cos(a)*(R_-1.5),a,{dy0:12});
 G('Garrison guard',0,150,0,{patrol:[[0,150],[0,60],[-30,30],[0,60]]});G('Garrison guard',30,100,0,{patrol:[[30,100],[60,40],[30,0],[60,40]]});G('Garrison guard',-60,0,0,{patrol:[[-60,0],[-60,-50],[-20,-80],[-60,-50]]});G('Garrison guard',0,-60,0,{patrol:[[0,-60],[40,-80],[0,-88],[-40,-80]]});
 for(const q of[[-10,-107],[10,-107],[-14,-128],[14,-128]])G('Keep guard',q[0],q[1],0);
 G('Barracks guard',-80,50,0);G('Barracks guard',80,50,0);G('Barracks guard',-80,-10,0);
 G('Captain Vael',0,-129,0,{rank:'c',la:['I command this garrison. Remember it.','One blow struck here and you will not leave these walls alive.']});G('Captain Rurik',0,52,0,{rank:'c',la:['The Warden is watching you through my eyes.','Keep to the avenue, and keep your steel sheathed.']});
 const tf=(i,p)=>({tour:p.concat(p.slice(0,-1).reverse()),ti:0,wait:[20,70,130][i],off:0}),rx=z=>CX+35*Math.sin((z+470)*.013)*sm(CZ+170,CZ+330,z),out=[[NX,NZ+215]].concat(RD3.slice(0,-1).reverse());
 const tours=[out.concat([[-760,FPATH(-760)],[-900,FPATH(-900)],[-990,FPATH(-990)]]),out.concat([[-470,FPATH(-470)],[-250,10],[0,10],[150,80],[160,-90],[0,-130],[-150,-60],[-250,10]]),out.concat([[-470,FPATH(-470)],[-200,10],[rx(-300),-300],[rx(-520),-520],[rx(-650),-650],[rx(-760),-760]])];
 tours.forEach((p,i)=>{for(let j=0;j<3;j++)G('Iron patrol',(j-1)*4,160-i*12,0,Object.assign(tf(i,p),{la:PLN,off:(j-1)*2.6,wait:[20,70,130][i]+j*1.2}))});
 C('Armourer Ysolde',76,-10,PI/2,0x5c4a3a,['Armour is for the garrison. Not for you.','Keep your hands off the racks.']);C('Smith Torvald',92,-58,PI,0x4a4038,['Steel for the watch only. Move along.','I would not linger here, stranger.']);
 C('Quartermaster Edda',-22,25,0,0x4d5a63,['Name, purpose, and how long you stay.','Everything here is counted, stranger.']);C('Merchant Bram',22,25,0,0x6e5f45,['I sell to the garrison. Not to strangers.','Keep your voice down. They listen.']);
 C('Chaplain Orin',22,9,PI,0x3a3f4a,['Pray quietly. The walls hear everything.','May the Warden find you harmless.']);C('Cook Maren',-90,38,0,0x6a5560,['Stew is for the barracks. Be gone.','Mind the guards. They mind you.']);
 for(const d of D){const m=mk(d),s=ST[d.rank||'g'],n=Object.assign({},d,{g:m.g,legs:m.legs,arms:m.arms,mats:m.mats,weapon:m.weapon,x:NX+d.x,z:NZ+d.z,f:d.f||0,hx:NX+d.x,hz:NZ+d.z,hf:d.f||0,hp:d.k=='g'?s.hp:40,st:s,sc:d.rank=='c'?1.12:1,
   state:d.tour?'rest':d.patrol?'patrol':'idle',pat:(d.patrol||[]).map(p=>[NX+p[0],NZ+p[1]]),pi:0,wait:d.wait||0,cd:0,flash:0,li:0,ph:Math.random()*6,dead:0,atk:null,fleeT:0,chase:0,rest:0,grudge:false,mv:0,tw:0,side:1,sideT:0,dy:d.dy0||0,halt:0,off:d.off||0});NPCS.push(n);scene.add(m.g)}
 const lines=n=>n.grudge?(n.k=='g'?['You again. I remember your face. Come closer and I finish it.','Ironhold does not forgive a blow to its garrison.']:['Get away from me!','You struck me. I will not forget it.']):level==2?['Please, put the blade away!','Guards! GUARDS!']:n.la;
 const hit=dm=>{let struck=null;for(const n of NPCS){if(n.dead||n.dy>6)continue;const ox=n.x-P.x,oz=n.z-P.z,dd=Math.hypot(ox,oz);if(dd<3.9&&(ox*Math.sin(P.face)+oz*Math.cos(P.face))/dd>.3){struck=n;n.hp-=dm;n.flash=.2;n.grudge=true;stop=Math.max(stop,dm>50?.13:.07);shake=Math.max(shake,dm>50?.5:.25);
   if(n.k=='g'){n.state='hostile';n.atk=null;n.chase=0}else{n.state='flee';n.fleeT=7}
   if(n.hp<=0){n.dead=.01;n.state='dead'}}}
  if(struck){const inside=ins(struck.x,struck.z),was=level;for(const q of NPCS)if(q.k=='g'&&!q.dead&&q.state!='hostile'&&((inside&&ins(q.x,q.z))||Math.hypot(q.x-struck.x,q.z-struck.z)<150)){q.state='hostile';q.atk=null;q.chase=0;q.dy=Math.min(q.dy,6)} // the garrison answers a blow in town; a patrol answers one on the road
   if(inside){level=2;if(was<2)msg('THE GARRISON TURNS ON YOU',2400,'You struck first')}else msg('THE PATROL ATTACKS',2000);if(typeof saveGame=='function')saveGame()}};
 const talk=()=>{if(!cur||cur.dead)return;talkT=6;const L=lines(cur);npcEl.innerHTML='<b style="color:#d8b56a">'+cur.n+'</b><br>'+L[cur.li++%L.length];npcEl.style.display='block'};
 const save=()=>({lv:level,at:0,n:NPCS.map(n=>[n.hp,n.dead?1:0,n.grudge?1:0,n.dead?+n.x.toFixed(1):0,n.dead?+n.z.toFixed(1):0,n.dead?+n.f.toFixed(2):0])});
 const load=s=>{if(!s||!Array.isArray(s.n)||s.n.length!=NPCS.length)return;level=1;s.n.forEach((a,i)=>{const n=NPCS[i];n.hp=a[0];n.grudge=!!a[2];if(a[1]){n.dead=1;n.state='dead';n.x=a[3];n.z=a[4];n.f=a[5]}})};
 const upd=dt=>{const td=Math.hypot(P.x-NX,P.z-NZ),inTown=td<R_-4;let near=null,nd=4.5;
  if(level==2&&!NPCS.some(n=>n.k=='g'&&!n.dead&&n.state=='hostile'))setLevel(1);
  const fols=NPCS.filter(n=>n.state=='follow'); // on alert, two guards shadow you inside the walls
  if(level==1&&inTown&&!P.dead){while(fols.length<2){let b=null,bd=1e9;for(const n of NPCS)if(n.k=='g'&&!n.dead&&!n.tour&&n.dy<6&&(n.state=='patrol'||n.state=='idle'||n.state=='return')&&!fols.includes(n)){const d=Math.hypot(P.x-n.x,P.z-n.z);if(d<bd){bd=d;b=n}}if(!b)break;b.state='follow';b.atk=null;fols.push(b)}}
  else for(const f of fols)f.state='return';
  for(const n of NPCS){const dx=P.x-n.x,dz=P.z-n.z,d=Math.hypot(dx,dz),g=n.g,st=n.st;n.flash=Math.max(0,n.flash-dt);n.cd-=dt;n.rest-=dt;
   if(n.dead){n.dead=Math.min(1,n.dead+dt*1.4);g.rotation.x=-n.dead*PI/2*.98;g.position.set(n.x,H(n.x,n.z)+.15*n.dead+n.dy,n.z);for(const m of n.mats){m.emissive.setHex(0);m.emissiveIntensity=0}continue}
   let sp=0,aw=0,arm=0;
   if(P.dead&&(n.state=='hostile'||n.state=='follow')){n.state=n.tour?'rest':'return';n.atk=null}
   if(n.k=='g'&&n.grudge&&n.rest<=0&&d<28&&!P.dead&&n.state!='hostile'&&n.state!='flee'&&n.dy<6){n.state='hostile';n.atk=null;n.chase=0}
   if(n.state=='hostile'){if(d<4)n.chase=0;else n.chase+=dt;
    if(n.chase>25){n.atk=null;n.chase=0;n.rest=8;if(n.tour){n.state='tour';let b=0,bd=1e9;n.tour.forEach((p,i)=>{const e=Math.hypot(p[0]-n.x,p[1]-n.z);if(e<bd){bd=e;b=i}});n.ti=b}else n.state='return'} // chased long enough: give up
    else{const want=Math.atan2(dx,dz),W=st.wind;
     if(n.atk){const a=n.atk;a.t+=dt;n.f=lerpA(n.f,want,Math.min(1,dt*(a.t<W?3:.5)));
      if(a.t<W){arm=-1.6*(a.t/W);aw=a.t/W}else if(a.t<W+.18){arm=-1.6+.5*((a.t-W)/.18);aw=1;if(!a.hit&&a.t>W+.04){a.hit=true;if(d<3.9&&Math.abs(((want-n.f+3*PI)%(2*PI))-PI)<1.1)hurt(st.dmg)}}
      else if(a.t<W+.85){arm=-1.1*(1-(a.t-W-.18)/.67)}else{n.atk=null;n.cd=st.rec}}
     else{n.f=lerpA(n.f,d>8?aim(n,P.x,P.z):want,Math.min(1,dt*6));if(d>2.8){sp=st.spd}else if(n.cd<=0)n.atk={t:0,hit:false}}}}
   else if(n.state=='follow'){n.f=lerpA(n.f,d>7?aim(n,P.x,P.z):Math.atan2(dx,dz),Math.min(1,dt*5));if(d>9)sp=5.8;else if(d>6.2)sp=4.7;else if(d<3.8)sp=-1.6}
   else if(n.state=='flee'){n.fleeT-=dt;n.f=lerpA(n.f,Math.atan2(-dx,-dz),Math.min(1,dt*8));sp=5;if(n.fleeT<=0)n.state='return'}
   else if(n.state=='return'){const hx=n.hx-n.x,hz=n.hz-n.z,hd=Math.hypot(hx,hz);if(hd<1.2){n.state=n.pat.length?'patrol':'idle'}else{n.f=lerpA(n.f,aim(n,n.hx,n.hz),Math.min(1,dt*6));sp=4.2}}
   else if(n.state=='patrol'){const p=n.pat[n.pi],hx=p[0]-n.x,hz=p[1]-n.z,hd=Math.hypot(hx,hz);if(n.wait>0)n.wait-=dt;else if(hd<1){n.pi=(n.pi+1)%n.pat.length;n.wait=1.4}else{n.f=lerpA(n.f,Math.atan2(hx,hz),Math.min(1,dt*5));sp=1.8}}
   else if(n.state=='rest'){const hx=n.hx-n.x,hz=n.hz-n.z,hd=Math.hypot(hx,hz); // waiting in the garrison between patrols
    if(hd>2){n.f=lerpA(n.f,aim(n,n.hx,n.hz),Math.min(1,dt*5));sp=3.2}else{n.wait-=dt;n.f=lerpA(n.f,d<30?Math.atan2(dx,dz):n.hf,Math.min(1,dt*2));if(n.wait<=0){n.state='tour';n.ti=0}}}
   else if(n.state=='tour'){const p=n.tour[n.ti],tx=p[0]+n.off,tz=p[1],hd=Math.hypot(tx-n.x,tz-n.z); // march the route: out through the gate, around the map, and back
    if(d<16&&!P.dead)n.halt+=dt;else n.halt=0;
    if(d<16&&!P.dead&&n.halt<10)n.f=lerpA(n.f,Math.atan2(dx,dz),Math.min(1,dt*4)); // halt and eye any traveller they meet
    else if(hd<5){n.ti++;if(n.ti>=n.tour.length){n.state='rest';n.wait=60+Math.random()*60}}
    else{n.f=lerpA(n.f,aim(n,tx,tz),Math.min(1,dt*4));sp=3.2}}
   else{const hx=n.hx-n.x,hz=n.hz-n.z,hd=Math.hypot(hx,hz),scared=n.k!='g'&&(n.grudge||level==2)&&d<(level==2?14:12);
    if(scared){n.f=lerpA(n.f,Math.atan2(-dx,-dz),Math.min(1,dt*8));sp=3.4}
    else if(hd>1.5){n.f=lerpA(n.f,Math.atan2(hx,hz),Math.min(1,dt*5));sp=2.2}
    else n.f=lerpA(n.f,d<(n.k=='g'?30:9)?Math.atan2(dx,dz):n.hf,Math.min(1,dt*2))}
   n.dy+=((n.dy0&&n.state=='idle'?n.dy0:0)-n.dy)*Math.min(1,dt*3);
   if(sp!=0){const ox=n.x,oz=n.z;n.x+=Math.sin(n.f)*sp*dt;n.z+=Math.cos(n.f)*sp*dt;if(n.dy<6)fcollide(n,.5);n.mv+=Math.hypot(n.x-ox,n.z-oz);n.tw+=Math.abs(sp)*dt;if(n.tw>.6){if(n.mv<n.tw*.3){n.side=Math.random()<.5?-1:1;n.sideT=1.2}n.mv=n.tw=0}}else if(n.dy<6)fcollide(n,.5);n.sideT-=dt;
   if(d<.9&&!P.dead&&n.dy<6){const k=.9-d;P.x+=dx/(d||1)*k;P.z+=dz/(d||1)*k}
   n.ph+=Math.abs(sp)*dt*2.4;const sw=sp!=0?Math.sin(n.ph)*.7:0;n.legs[0].rotation.x=sw;n.legs[1].rotation.x=-sw;
   n.arms[0].rotation.x=-sw*.6;n.arms[1].rotation.x=n.atk?arm:sw*.6;
   g.position.set(n.x,H(n.x,n.z)+n.dy,n.z);g.rotation.y=n.f;g.scale.set(n.sc,n.sc*(1+Math.sin(performance.now()*.002+n.ph)*.008),n.sc);
   const f=n.flash>0;for(const m of n.mats){m.emissive.setHex(f?0xffffff:0xff3b2a);m.emissiveIntensity=f?.5:aw*.4}
   if(n.state!='hostile'&&n.state!='flee'&&n.dy<6&&d<nd){near=n;nd=d}}
  if(td<300){tEl.style.display='block';tEl.style.color=LVC[level];tEl.textContent='IRONHOLD \u00b7 '+LVN[level]}else tEl.style.display='none';
  cur=near;if(near){if(talkT>0)talkT-=dt;else{npcEl.innerHTML='<span style="color:#d8b56a">E</span> &mdash; speak with '+near.n}npcEl.style.display='block'}else{npcEl.style.display='none';talkT=0}};
 {const u0=window.npcUpdate,h0=window.hitNPCs,t0=window.npcTalk,s0=window.townSave,l0=window.townLoad;
  window.npcUpdate=dt=>{u0(dt);upd(dt)};window.hitNPCs=dm=>{h0(dm);hit(dm)};window.npcTalk=()=>{t0();talk()};
  window.townSave=()=>{const o=s0();o.w=save();return o};window.townLoad=s=>{l0(s);if(s&&s.w)load(s.w)}}}

