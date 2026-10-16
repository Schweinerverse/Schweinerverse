// ================= Rimeholt: a poor, frozen hamlet in the north-east corner =================
{const TM=(c,r)=>new T.MeshStandardMaterial({color:c,roughness:r??1}),jit=c=>{const f=.8+Math.random()*.4,q=v=>Math.min(255,v*f|0);return q(c>>16&255)<<16|q(c>>8&255)<<8|q(c&255)};
 const plankT=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=256;const g=cv.getContext('2d');g.fillStyle='#5a4a3c';g.fillRect(0,0,256,256);
  for(let r=0;r<8;r++){const v=70+Math.random()*40|0;g.fillStyle='rgb('+v+','+(v-14)+','+(v-26)+')';g.fillRect(0,r*32+1,256,30);for(let i=0;i<40;i++){g.fillStyle='rgba(20,14,10,'+Math.random()*.35+')';g.fillRect(Math.random()*256,r*32+2+Math.random()*28,10+Math.random()*50,1)}}
  for(let i=0;i<60;i++){g.fillStyle='rgba(200,210,220,'+Math.random()*.25+')';g.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*6,1)}
  const t=new T.CanvasTexture(cv);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;return t})();
 const MPK=()=>new T.MeshStandardMaterial({map:plankT,color:jit(0xb4a595),roughness:1}),MROOF=new T.MeshStandardMaterial({map:plankT,color:0x5a524a,roughness:1}),
  MFLR=TM(0x2d2620),MSTN=TM(0x6a6d72),MSNW=TM(0xf2f6fc),MWIN=new T.MeshBasicMaterial({color:0xc98a3f}),MEMB=new T.MeshBasicMaterial({color:0xff8f3a}),MICt=TM(0xbfdcf2,.15),MBED=TM(0x57606a),MGB=TM(0x40362d),MCLO=[TM(0x7a3b2e),TM(0x4d5a63),TM(0x6e5f45)],MDK=TM(0x1c1815);MGB.side=T.DoubleSide;
 const tadd=(m,x,y,z)=>{m.position.set(TWX+x,TWH+y,TWZ+z);m.castShadow=m.receiveShadow=true;scene.add(m);return m};
 const tbx=(x0,x1,z0,z1,y0,y1,m,c)=>{const w=x1-x0,h=y1-y0,d=z1-z0,g=new T.BoxGeometry(w,h,d),uv=g.attributes.uv,f=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]];
  for(let i=0;i<24;i++){const q=f[i>>2];uv.setXY(i,uv.getX(i)*q[0]/4,uv.getY(i)*q[1]/4)}tadd(new T.Mesh(g,m),(x0+x1)/2,(y0+y1)/2,(z0+z1)/2);if(c)fcr(TWX+x0,TWX+x1,TWZ+z0,TWZ+z1,TWH+y1,TWH+y0)};
 const tcy=(x,z,r,h,m,c,y0)=>{y0=y0||0;tadd(new T.Mesh(new T.CylinderGeometry(r,r*1.1,h,10),m),x,y0+h/2,z);if(c)fcc(TWX+x,TWZ+z,r+.1,TWH+y0+h,TWH+y0)};
 const gy=(x,z)=>H(TWX+x,TWZ+z)-TWH,WIN=[];
 const glow=(x,y,z,r)=>{const s=new T.Mesh(new T.SphereGeometry(r||.35,8,6),MEMB);s.position.set(TWX+x,TWH+y,TWZ+z);scene.add(s)};
 function house(cx,cz,w,d,face,o){o=o||{};const t=.4,h=o.h||3.4,dw=o.dw||2.2,m=MPK(),x0=cx-w/2,x1=cx+w/2,z0=cz-d/2,z1=cz+d/2;
  const wl=(a0,a1,b0,b1,gap)=>{if(!gap){tbx(a0,a1,b0,b1,0,h,m,true);return}
   if(gap.a=='x'){tbx(a0,gap.c-dw/2,b0,b1,0,h,m,true);tbx(gap.c+dw/2,a1,b0,b1,0,h,m,true);tbx(gap.c-dw/2,gap.c+dw/2,b0,b1,2.6,h,m)}
   else{tbx(a0,a1,b0,gap.c-dw/2,0,h,m,true);tbx(a0,a1,gap.c+dw/2,b1,0,h,m,true);tbx(a0,a1,gap.c-dw/2,gap.c+dw/2,2.6,h,m)}};
  wl(x0,x1,z1-t,z1,face=='s'?{a:'x',c:cx}:null);wl(x0,x1,z0,z0+t,face=='n'?{a:'x',c:cx}:null);wl(x0,x0+t,z0+t,z1-t,face=='w'?{a:'z',c:cz}:null);wl(x1-t,x1,z0+t,z1-t,face=='e'?{a:'z',c:cz}:null);
  tbx(x0+t,x1-t,z0+t,z1-t,0,.1,MFLR);
  if(!o.noroof){const long=w>=d,L=long?w:d,S=long?d:w,rise=S*.32,ang=Math.atan2(rise,S/2),sl=S/2/Math.cos(ang)+.7,jt=()=>(Math.random()-.5)*.05;
   for(const s of[-1,1]){const dx=long?L+1.6:sl,dz=long?sl:L+1.6,r=new T.Mesh(new T.BoxGeometry(dx,.28,dz),MROOF),sn=new T.Mesh(new T.BoxGeometry(dx,.2,dz),MSNW),px=TWX+cx+(long?0:s*S/4),pz=TWZ+cz+(long?s*S/4:0),py=TWH+h+rise/2+.14;
    r.position.set(px,py,pz);sn.position.set(px,py+.22,pz);if(long)r.rotation.x=sn.rotation.x=s*ang+jt();else r.rotation.z=sn.rotation.z=-s*ang+jt();
    r.castShadow=r.receiveShadow=true;sn.receiveShadow=true;scene.add(r);scene.add(sn)}
   const sh=new T.Shape();sh.moveTo(-S/2,0);sh.lineTo(S/2,0);sh.lineTo(0,rise);const sg=new T.ShapeGeometry(sh);
   for(const s of[-1,1]){const e=new T.Mesh(sg,MGB);if(long){e.position.set(TWX+cx+s*L/2,TWH+h,TWZ+cz);e.rotation.y=PI/2}else e.position.set(TWX+cx,TWH+h,TWZ+cz+s*L/2);scene.add(e)}
   if(o.chim!==false){const hx=long?w*.25:0,hz=long?0:d*.25;tbx(cx+hx-.5,cx+hx+.5,cz+hz-.5,cz+hz+.5,h+rise*.4,h+rise+1.8,MSTN);tbx(cx+hx-.6,cx+hx+.6,cz+hz-.6,cz+hz+.6,h+rise+1.8,h+rise+2,MSNW)}}
  for(const q of[[x0+w*.28,z0-.02,PI],[x1-w*.28,z0-.02,PI],[x0-.02,cz,-PI/2],[x1+.02,cz,PI/2],[x0+w*.28,z1+.02,0],[x1-w*.28,z1+.02,0]]){
   if((face=='n'&&q[1]<z0)||(face=='s'&&q[1]>z1)||(face=='w'&&q[0]<x0)||(face=='e'&&q[0]>x1))continue;WIN.push([q[0],1.9,q[1],q[2]])}
  if(o.int!==false){if(face=='s'||face=='n'){const bz=face=='s'?z0+t+.2:z1-t-1.4;tbx(x0+t,x0+t+1.1,cz-1.1,cz+1.1,0,.7,MBED,true);tbx(x1-t-1.3,x1-t,cz-1,cz+1,0,2.4,MSTN,true);glow(x1-t-1.5,.45,cz,.4);tbx(cx+.9,cx+2.3,bz,bz+1.2,0,.9,MPK(),true)}
   else{const bx=face=='w'?x1-t-1.4:x0+t+.2;tbx(cx-1.1,cx+1.1,z0+t,z0+t+1.1,0,.7,MBED,true);tbx(cx-1,cx+1,z1-t-1.3,z1-t,0,2.4,MSTN,true);glow(cx,.45,z1-t-1.5,.4);tbx(bx,bx+1.2,cz+.9,cz+2.3,0,.9,MPK(),true)}}
  const px=face=='e'?x1+2:face=='w'?x0-2:cx+2,pz=face=='s'?z1+2:face=='n'?z0-2:cz+2;{const c=new T.Mesh(new T.CircleGeometry(.9+Math.random()*.8,14),MICt);c.rotation.x=-PI/2;tadd(c,px,.07,pz)}
  if(o.crate!==false)tbx(px+1.2,px+2.2,pz-.4,pz+.6,0,.9,MPK(),true)}
 // streets: west and east rows, back lanes, and the special buildings
 for(const a of[[-22,100,9,8,'e'],[-22,64,9,8,'e'],[-23,28,10,9,'e'],[-22,-28,9,8,'e'],[22,100,9,8,'w'],[22,66,10,8,'w'],[23,30,9,9,'w'],[22,-26,9,8,'w'],[-62,70,9,8,'s'],[62,70,9,8,'s'],[-64,20,9,8,'e'],[64,20,9,8,'w']])house(a[0],a[1],a[2],a[3],a[4]);
 house(-26,118,8,7,'e',{c:0x7a7e84,crate:false}); // guardhouse
 house(0,-76,18,11,'s',{h:4.4,dw:3.2,int:false,crate:false}); // tavern: The Last Ember
 tbx(-8,8,-80,-78.6,0,1.2,MPK(),true);tbx(-8,8,-81.3,-80.7,1.6,3.5,MPK());tbx(-6,-2,-75,-73.4,0,.9,MPK(),true);tbx(2,6,-75,-73.4,0,.9,MPK(),true);tbx(-8.8,-7.4,-76.8,-73.2,0,2.6,MSTN,true);glow(-7,.5,-75,.5);tbx(-2.5,2.5,-70.1,-69.9,3.4,4.1,MPK());
 // smithy: an open shed with a cold forge
 {const sx=62,sz=-44;for(const p of[[-4,-3],[4,-3],[-4,3],[4,3]])tcy(sx+p[0],sz+p[1],.35,3.4,MPK(),true);const r=new T.Mesh(new T.BoxGeometry(11,.3,8.5),MROOF);r.rotation.z=.12;tadd(r,sx,3.9,sz);const sn=new T.Mesh(new T.BoxGeometry(11,.2,8.5),MSNW);sn.rotation.z=.12;tadd(sn,sx,4.15,sz);
  tcy(sx-.4,sz,.7,.6,MPK());tbx(sx-1.1,sx+.3,sz-.4,sz+.4,.6,1.2,MDK,true);tbx(sx+2,sx+4,sz-3.3,sz-1.6,0,1.1,MSTN,true);glow(sx+3,1.3,sz-2.4,.4);tcy(sx-3,sz+2,.6,1.1,MPK(),true)}
 // ruined chapel
 {const cx=-58,cz=-48;tbx(cx-6,cx-5.6,cz-5,cz+5,0,4.5,MPK(),true);tbx(cx+5.6,cx+6,cz-5,cz+1,0,3.1,MPK(),true);tbx(cx-6,cx-1,cz-5,cz-4.6,0,5.2,MPK(),true);tbx(cx+1,cx+6,cz-5,cz-4.6,0,2.4,MPK(),true);tbx(cx-6,cx-1.6,cz+4.6,cz+5,0,2,MPK(),true);
  tbx(cx-.2,cx+.2,cz-4.3,cz-4.1,0,3.4,MSTN);tbx(cx-1,cx+1,cz-4.3,cz-4.1,2.1,2.5,MSTN);for(const q of[[-3,2],[2,3],[4,-2]]){const s=new T.Mesh(new T.SphereGeometry(1,8,6),MSNW);s.scale.set(1.8,.5,1.4);tadd(s,cx+q[0],.2,cz+q[1])}}
 // plaza: well, brazier, market stalls, lamps, broken cart, woodpiles, puddles
 {tcy(0,0,2.6,1.2,MSTN,true);tcy(-2.6,0,.2,3.4,MPK());tcy(2.6,0,.2,3.4,MPK());tbx(-2.8,2.8,-.3,.3,3.2,3.5,MPK());const d0=new T.Mesh(new T.CircleGeometry(2.1,16),MDK);d0.rotation.x=-PI/2;tadd(d0,0,1.21,0);
  tcy(-9,9,.9,.8,MSTN,true);glow(-9,1.1,9,.55);glow(-9.3,1.5,9.2,.3);glow(-8.7,1.6,8.8,.28);
  [[12,-14,0],[-16,10,1],[16,20,2]].forEach(q=>{for(const p of[[-2,-1.3],[2,-1.3],[-2,1.3],[2,1.3]])tcy(q[0]+p[0],q[1]+p[1],.12,2.6,MPK());const c=new T.Mesh(new T.BoxGeometry(5,.12,3.2),MCLO[q[2]]);c.rotation.x=.1;tadd(c,q[0],2.7,q[1]);tbx(q[0]-1.8,q[0]+1.8,q[1]+.7,q[1]+1.5,0,1,MPK(),true)});
  for(const q of[[-7,125],[7,125],[-7,70],[7,70],[-7,15],[7,15],[-7,-40],[7,-40]]){tcy(q[0],q[1],.15,3.8,MPK(),true);glow(q[0],3.95,q[1],.32)}
  tbx(-20,-17.6,-4,-2.8,.6,1.2,MPK(),true);{const w=new T.Mesh(new T.TorusGeometry(.8,.1,6,14),MDK);w.rotation.y=.4;tadd(w,-18.8,.8,-4.2)}
  for(const q of[[-44,-20],[40,-8],[-40,60]])for(let i=0;i<3;i++){const l=new T.Mesh(new T.CylinderGeometry(.3,.3,3,8),MPK());l.rotation.z=PI/2;tadd(l,q[0],.3+(i>1?.5:0),q[1]+(i%2?.45:-.45)+(i>1?0:0))}
  for(let i=0;i<9;i++){const a=Math.random()*6.3,r=8+Math.random()*50,c=new T.Mesh(new T.CircleGeometry(.8+Math.random()*1.3,14),MICt);c.rotation.x=-PI/2;tadd(c,Math.sin(a)*r,.08,Math.cos(a)*r)}}
 // palisade ring (radius 130) with a south gate (16 wide) and a small north gate (9 wide), gate posts and two gate towers
 {const R_=130,gap=(x,z)=>(z>0&&Math.abs(x)<8.2)||(z<0&&Math.abs(x)<4.7),stk=[];
  for(let a=0;a<2*PI;a+=1.3/R_){const x=Math.sin(a)*R_,z=Math.cos(a)*R_;if(gap(x,z))continue;stk.push([x,z,4.2+Math.random()*1.4,(Math.random()-.5)*.1,Math.random()*6])}
  for(let a=0;a<2*PI;a+=2.4/R_){const x=Math.sin(a)*R_,z=Math.cos(a)*R_;if(gap(x,z))continue;fcc(TWX+x,TWZ+z,1.3,TWH+5,TWH-1)}
  const d=new T.Object3D(),im=new T.InstancedMesh(new T.CylinderGeometry(.22,.3,1,6),MPK(),stk.length);stk.forEach((s,i)=>{d.position.set(TWX+s[0],TWH+gy(s[0],s[1])+s[2]/2-.4,TWZ+s[1]);d.scale.set(1,s[2],1);d.rotation.set(0,s[4],s[3]);d.updateMatrix();im.setMatrixAt(i,d.matrix)});im.castShadow=true;im.frustumCulled=false;scene.add(im);
  for(const s of[-1,1]){tcy(s*9.4,R_-.5,.7,9,MPK(),true);tcy(s*5.4,-R_+.5,.6,6.5,MPK(),true);glow(s*9.4,7.5,R_-.5,.4);tbx(s*14-3,s*14+3,R_-6,R_,0,10,MPK(),true);const c=new T.Mesh(new T.ConeGeometry(5,3.2,4),MROOF);c.rotation.y=PI/4;tadd(c,s*14,11.6,R_-3);const cs=new T.Mesh(new T.ConeGeometry(4.5,1.2,4),MSNW);cs.rotation.y=PI/4;tadd(cs,s*14,12.7,R_-3);glow(s*14,8.5,R_-6.4,.35)}
  tbx(-9.4,9.4,R_-1,R_,8.2,8.8,MPK());tbx(-5.4,5.4,-R_,-R_+1,6,6.5,MPK());
  // dead trees inside and outside the walls
  for(let k=0;k<14;k++){const a=k*.9+Math.random()*.5,r=k<5?100+Math.random()*25:140+Math.random()*70,x=Math.sin(a)*r,z=Math.cos(a)*r,g=gy(x,z),h=6+Math.random()*3;if(Math.abs(x)<14&&z>0)continue;tcy(x,z,.65,h,MPK(),true,g);
   for(let b=0;b<3;b++){const br=new T.Mesh(new T.CylinderGeometry(.08,.2,3.2,5),MPK());br.rotation.set(0,b*2.1+k,.9);tadd(br,x+Math.sin(b*2.1+k)*.8,g+h*(.55+b*.14),z+Math.cos(b*2.1+k)*.8)}}}
 {const d=new T.Object3D(),wi=new T.InstancedMesh(new T.BoxGeometry(.9,.9,.14),MWIN,WIN.length);WIN.forEach((w,i)=>{d.position.set(TWX+w[0],TWH+w[1],TWZ+w[2]);d.rotation.set(0,w[3],0);d.updateMatrix();wi.setMatrixAt(i,d.matrix)});wi.frustumCulled=false;scene.add(wi)}
 // ---- townsfolk and guards ----
 const NPCS=[],npcEl=document.createElement('div');npcEl.style.cssText='position:fixed;left:50%;bottom:17%;transform:translateX(-50%);padding:10px 18px;background:rgba(14,20,30,.82);border:1px solid rgba(216,181,106,.5);color:#eef3f8;font:16px Georgia,serif;max-width:560px;text-align:center;pointer-events:none;z-index:4;display:none';document.body.appendChild(npcEl);
 let talkT=0,cur=null;
 function mkNPC(d){const guard=d.k=='g',g=new T.Group(),mats=[],M=c=>{const m=new T.MeshStandardMaterial({color:c,roughness:.95});mats.push(m);return m},
   pal=guard?[0x59656f,0x39424a]:[[0x6b5a46,0x4a3f33],[0x5a6a5c,0x3d4a40],[0x70604f,0x4f4237],[0x6a5560,0x47383f]][NPCS.length%4];
  const part=(geo,m,x,y,z,p)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;(p||g).add(o);return o};
  const skin=M(0xcdb4a0),cl=M(pal[0]),dk=M(pal[1]);
  const legs=[-1,1].map(s=>{const l=new T.Group();l.position.set(s*.16,.9,0);g.add(l);part(BX(.24,.9,.26),dk,0,-.45,0,l);return l});
  part(BX(.6,.75,.34),cl,0,1.28,0);const hd=part(SP,skin,0,1.9,0);hd.scale.set(.2,.22,.21);
  const arms=[-1,1].map(s=>{const a=new T.Group();a.position.set(s*.4,1.6,0);g.add(a);part(BX(.2,.72,.22),cl,0,-.36,0,a);return a});
  let weapon=null;
  if(guard){const st=M(0x8a939c);part(SP,st,0,1.97,0).scale.set(.25,.19,.26);part(BX(.07,.3,.05),st,0,1.88,.2);part(BX(.42,.7,.03),M(0x7a3b2e),0,1.25,.19);weapon=new T.Group();weapon.position.set(0,-.7,.12);arms[1].add(weapon);part(new T.CylinderGeometry(.04,.04,2.6,6),M(0x6a5640),0,.9,0,weapon);part(new T.ConeGeometry(.08,.4,6),st,0,2.3,0,weapon);weapon.rotation.x=-.2}
  else{part(new T.ConeGeometry(.25,.4,8),dk,0,2.12,0);part(BX(.5,.14,.36),M(0x8a8079),0,1.62,0)}
  return{g,legs,arms,mats,weapon}}
 let level=0,alertT=0;
 const LVN=['FRIENDLY','ALERT','AGGRESSIVE'],LVC=['#8fcf9a','#e0b44f','#d9503f'],tEl=document.createElement('div');tEl.style.cssText='font-size:12px;letter-spacing:.18em;margin-top:6px;display:none;text-shadow:0 1px 4px #000';$('hud').appendChild(tEl);
 // Rimeholt's mood: FRIENDLY until somebody is struck; AGGRESSIVE while the watch hunts you; ALERT afterwards (a guard shadows you, townsfolk are curt) until it fades
 const setLevel=(l,sub)=>{if(l==level)return;const was=level;level=l;if(l==1)alertT=300;if(Math.hypot(P.x-TWX,P.z-TWZ)<600)msg(l==1?'RIMEHOLT IS ON ALERT':'RIMEHOLT HAS CALMED',2600,sub||(l==1?'The watch has given up the chase':'The town forgives, but does not forget'))};
 const GX=TWX,GZ=TWZ+130,ins=(x,z)=>Math.hypot(x-TWX,z-TWZ)<126; // no pathfinding: guards cross the palisade through the south gate, and sidestep when they snag on a corner
 const aim=(n,tx,tz)=>{if(ins(n.x,n.z)!=ins(tx,tz)){const ax=Math.abs(n.x-GX)<=5;if(ins(n.x,n.z)){if(!ax||n.z<GZ-16){tx=GX;tz=GZ-14}else{tx=GX;tz=GZ+14}}else{if(!ax||n.z>GZ+16){tx=GX;tz=GZ+14}else{tx=GX;tz=GZ-14}}}return Math.atan2(tx-n.x,tz-n.z)+(n.sideT>0?n.side*1.2:0)};
 const DEFS=[
  {n:'Gate warden',k:'g',x:-11,z:122,f:PI,l:['Hold. State your business.','Rimeholt has little to give and less to spare.','Keep your blade sheathed inside the walls.'],la:['I have my eye on you, stranger.','One wrong step and the whole watch hears of it.']},
  {n:'Gate warden',k:'g',x:11,z:122,f:PI,l:['Winter took the stores early. Do not make trouble.','We turn away no one. We also feed no one.'],la:['We know what you did. Keep walking.','Do not test us twice.']},
  {n:'Watchman Oske',k:'g',x:0,z:100,patrol:[[0,100],[0,30],[-10,-30],[0,30]],l:['Quiet night. Quiet nights are the dear ones, here.','If you see the smoke stop, wake us.'],la:['You are the one who raised a blade. I remember.','Stay where I can see you.']},
  {n:'Watchman Brann',k:'g',x:40,z:50,patrol:[[40,50],[50,90],[10,100],[10,50]],l:['Three guards for a town of forty. Guess who sleeps.','Strike a neighbour and you strike all of us.'],la:['Walk slowly. Touch nothing.','The captain wants you watched.']},
  {n:'Captain Hild',k:'g',x:-16,z:124,f:1.2,l:['I keep the peace on bark soup and stubbornness.','Raise a hand against anyone here and my watch answers. All of it.'],la:['You have tried this watch enough for one day.','Behave, and perhaps this passes. Do not mistake patience for weakness.']},
  {n:'Old Marta',k:'c',x:3,z:5,f:PI/2,l:['The well is the only thing here still warm.','My son went north for work. That was six winters ago.'],la:['I have nothing to say to you.','Go on. Not today.']},
  {n:'Odd the woodcutter',k:'c',x:-42,z:-18,f:.8,l:['The trees are frozen to their hearts. The axe rings like a bell.','Burn the chairs first, they said. We have burnt the chairs.'],la:['Word travels fast in a town this small.','I will not speak with a brawler.']},
  {n:'Brenna',k:'c',x:-7,z:11,f:2.4,l:['Sit a while by the brazier. Warmth is free, so far.','Do not stare at the knight on the hill. They say he walks.'],la:['Sit elsewhere. The fire is for friends.','They say you struck one of us.']},
  {n:'Hrolf the trader',k:'c',x:12,z:-12,f:0,l:['I would sell you bread, but the baker burnt his oven for heat.','Everything on this table is for sale. Nobody here has coin.'],la:['Nothing for sale. Not to you. Not today.','Move along, traveller.']},
  {n:'Smith Gudrun',k:'c',x:60,z:-41,f:PI,l:['Iron is cheap. Coal is not.','The forge has been cold since the first snow.'],la:['I heard. I will not sell you iron.','Keep your trouble out of my forge.']}];
 for(const d of DEFS){const m=mkNPC(d),n=Object.assign({},d,{g:m.g,legs:m.legs,arms:m.arms,mats:m.mats,weapon:m.weapon,x:TWX+d.x,z:TWZ+d.z,f:d.f||0,hx:TWX+d.x,hz:TWZ+d.z,hf:d.f||0,hp:d.k=='g'?130:30,state:d.patrol?'patrol':'idle',pat:(d.patrol||[]).map(p=>[TWX+p[0],TWZ+p[1]]),pi:0,wait:0,cd:0,flash:0,li:0,ph:Math.random()*6,dead:0,atk:null,fleeT:0,chase:0,rest:0,grudge:false,mv:0,tw:0,side:1,sideT:0});NPCS.push(n);scene.add(m.g)}
 // what a person says depends on the town's mood and on whether you ever struck them: they never forget that
 const lines=n=>n.grudge?(n.k=='g'?['You again. I remember your face. Come closer and I finish it.','Rimeholt does not forgive a blow to its watch.']:['Get away from me!','You struck me. I will not forget it.']):level==2?['Please, leave us be!','Guards! Guards!']:level==1?n.la:n.l;
 window.hitNPCs=dm=>{let hit=false;for(const n of NPCS){if(n.dead)continue;const ox=n.x-P.x,oz=n.z-P.z,dd=Math.hypot(ox,oz);if(dd<3.9&&(ox*Math.sin(P.face)+oz*Math.cos(P.face))/dd>.3){hit=true;n.hp-=dm;n.flash=.2;n.grudge=true;stop=Math.max(stop,dm>50?.13:.07);shake=Math.max(shake,dm>50?.5:.25);
   if(n.k=='g'){n.state='hostile';n.atk=null;n.chase=0}else{n.state='flee';n.fleeT=7}
   if(n.hp<=0){n.dead=.01;n.state='dead'}}}
  if(hit){const was=level;alertT=300;level=2;for(const q of NPCS)if(q.k=='g'&&!q.dead&&q.state!='hostile'){q.state='hostile';q.atk=null;q.chase=0} // news of a blow travels through the whole village
   if(was<2)msg('THE WATCH TURNS ON YOU',2400,was?'Rimeholt was already watching you':'You struck first');if(typeof saveGame=='function')saveGame()}};
 window.npcTalk=()=>{if(!cur||cur.dead)return;talkT=6;const L=lines(cur);npcEl.innerHTML='<b style="color:#d8b56a">'+cur.n+'</b><br>'+L[cur.li++%L.length];npcEl.style.display='block'};
 window.townSave=()=>({lv:level,at:alertT,n:NPCS.map(n=>[n.hp,n.dead?1:0,n.grudge?1:0,n.dead?+n.x.toFixed(1):0,n.dead?+n.z.toFixed(1):0,n.dead?+n.f.toFixed(2):0])});
 window.townLoad=s=>{if(!s||!Array.isArray(s.n)||s.n.length!=NPCS.length)return;level=s.lv==2?1:(s.lv|0);alertT=s.lv==2?300:+s.at||0;if(level==1&&alertT<=0)alertT=300; // a chase in progress when you left becomes an alert
  s.n.forEach((a,i)=>{const n=NPCS[i];n.hp=a[0];n.grudge=!!a[2];if(a[1]){n.dead=1;n.state='dead';n.x=a[3];n.z=a[4];n.f=a[5]}})};
 window.npcUpdate=dt=>{const td=Math.hypot(P.x-TWX,P.z-TWZ),inTown=td<175;let near=null,nd=4.5;
  if(level==2){if(!NPCS.some(n=>n.k=='g'&&!n.dead&&n.state=='hostile'))setLevel(1)}
  else if(level==1){alertT-=dt;if(alertT<=0)setLevel(0)}
  const fol=NPCS.find(n=>n.state=='follow'); // on alert, one guard shadows you while you are inside the walls
  if(level==1&&inTown&&!P.dead){if(!fol){let b=null,bd=1e9;for(const n of NPCS)if(n.k=='g'&&!n.dead&&(n.state=='patrol'||n.state=='idle'||n.state=='return')){const d=Math.hypot(P.x-n.x,P.z-n.z);if(d<bd){bd=d;b=n}}if(b){b.state='follow';b.atk=null}}}
  else if(fol)fol.state='return';
  for(const n of NPCS){const dx=P.x-n.x,dz=P.z-n.z,d=Math.hypot(dx,dz),g=n.g;n.flash=Math.max(0,n.flash-dt);n.cd-=dt;n.rest-=dt;
   if(n.dead){n.dead=Math.min(1,n.dead+dt*1.4);g.rotation.x=-n.dead*PI/2*.98;g.position.set(n.x,H(n.x,n.z)+.15*n.dead,n.z);for(const m of n.mats){m.emissive.setHex(0);m.emissiveIntensity=0}continue}
   let sp=0,aw=0,arm=0;
   if(P.dead&&(n.state=='hostile'||n.state=='follow')){n.state='return';n.atk=null}
   if(n.k=='g'&&n.grudge&&n.rest<=0&&d<28&&!P.dead&&n.state!='hostile'&&n.state!='flee'){n.state='hostile';n.atk=null;n.chase=0;if(level==0)setLevel(1,'A guard remembers you')}
   if(n.state=='hostile'){if(d<4)n.chase=0;else n.chase+=dt;
    if(n.chase>25){n.state='return';n.atk=null;n.chase=0;n.rest=8} // chased long enough: give up and walk back to town
    else{const want=Math.atan2(dx,dz);
     if(n.atk){const a=n.atk;a.t+=dt;n.f=lerpA(n.f,want,Math.min(1,dt*(a.t<.6?3:.5)));
      if(a.t<.6){arm=-1.6*(a.t/.6);aw=a.t/.6}else if(a.t<.78){arm=-1.6+.5*((a.t-.6)/.18);aw=1;if(!a.hit&&a.t>.64){a.hit=true;if(d<3.8&&Math.abs(((want-n.f+3*PI)%(2*PI))-PI)<1.1)hurt(13)}}
      else if(a.t<1.45){arm=-1.1*(1-(a.t-.78)/.67)}else{n.atk=null;n.cd=1}}
     else{n.f=lerpA(n.f,d>8?aim(n,P.x,P.z):want,Math.min(1,dt*6));if(d>2.7){sp=3.8}else if(n.cd<=0)n.atk={t:0,hit:false}}}}
   else if(n.state=='follow'){n.f=lerpA(n.f,d>7?aim(n,P.x,P.z):Math.atan2(dx,dz),Math.min(1,dt*5));if(d>9)sp=5.8;else if(d>6.2)sp=4.7;else if(d<3.8)sp=-1.6}
   else if(n.state=='flee'){n.fleeT-=dt;n.f=lerpA(n.f,Math.atan2(-dx,-dz),Math.min(1,dt*8));sp=5;if(n.fleeT<=0)n.state='return'}
   else if(n.state=='return'){const hx=n.hx-n.x,hz=n.hz-n.z,hd=Math.hypot(hx,hz);if(hd<1.2){n.state=n.pat.length?'patrol':'idle'}else{n.f=lerpA(n.f,aim(n,n.hx,n.hz),Math.min(1,dt*6));sp=4.2}}
   else if(n.state=='patrol'){const p=n.pat[n.pi],hx=p[0]-n.x,hz=p[1]-n.z,hd=Math.hypot(hx,hz);if(n.wait>0)n.wait-=dt;else if(hd<1){n.pi=(n.pi+1)%n.pat.length;n.wait=1.4}else{n.f=lerpA(n.f,Math.atan2(hx,hz),Math.min(1,dt*5));sp=1.6}}
   else{const hx=n.hx-n.x,hz=n.hz-n.z,hd=Math.hypot(hx,hz),scared=n.k!='g'&&(n.grudge||level==2)&&d<(level==2?14:12); // villagers who were struck, or any villager while the watch is hunting you, keep their distance
    if(scared){n.f=lerpA(n.f,Math.atan2(-dx,-dz),Math.min(1,dt*8));sp=3.4}
    else if(hd>1.5){n.f=lerpA(n.f,Math.atan2(hx,hz),Math.min(1,dt*5));sp=2.2}
    else n.f=lerpA(n.f,d<9?Math.atan2(dx,dz):n.hf,Math.min(1,dt*2))}
   if(sp!=0){const ox=n.x,oz=n.z;n.x+=Math.sin(n.f)*sp*dt;n.z+=Math.cos(n.f)*sp*dt;fcollide(n,.5);n.mv+=Math.hypot(n.x-ox,n.z-oz);n.tw+=Math.abs(sp)*dt;if(n.tw>.6){if(n.mv<n.tw*.3){n.side=Math.random()<.5?-1:1;n.sideT=1.2}n.mv=n.tw=0}}else fcollide(n,.5);n.sideT-=dt;
   if(d<.9&&!P.dead){const k=.9-d;P.x+=dx/(d||1)*k;P.z+=dz/(d||1)*k}
   n.ph+=Math.abs(sp)*dt*2.4;const sw=sp!=0?Math.sin(n.ph)*.7:0;n.legs[0].rotation.x=sw;n.legs[1].rotation.x=-sw;
   n.arms[0].rotation.x=-sw*.6+(n.k=='g'?0:.1);n.arms[1].rotation.x=n.atk?arm:sw*.6;
   g.position.set(n.x,H(n.x,n.z),n.z);g.rotation.y=n.f;g.scale.y=1+Math.sin(performance.now()*.002+n.ph)*.008;
   const f=n.flash>0;for(const m of n.mats){m.emissive.setHex(f?0xffffff:0xff3b2a);m.emissiveIntensity=f?.5:aw*.4}
   if(n.state!='hostile'&&n.state!='flee'&&d<nd){near=n;nd=d}}
  if(td<260){tEl.style.display='block';tEl.style.color=LVC[level];tEl.textContent='RIMEHOLT \u00b7 '+LVN[level]}else tEl.style.display='none';
  cur=near;if(near){if(talkT>0)talkT-=dt;else{npcEl.innerHTML='<span style="color:#d8b56a">E</span> &mdash; speak with '+near.n}npcEl.style.display='block'}else{npcEl.style.display='none';talkT=0}}}

