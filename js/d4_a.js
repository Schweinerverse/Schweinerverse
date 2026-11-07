// ================= Brightwater: a rich harbour city on the southern coast =================
{const CX_=CSX,CZ_=CSZ,GY=CYH,DKA=1;
 const grp=new T.Group();scene.add(grp);
 const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
 const tex=f=>{const cv=document.createElement('canvas');cv.width=cv.height=256;const g=cv.getContext('2d');f(g);const t=new T.CanvasTexture(cv);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;return t};
 const stoneT=tex(g=>{g.fillStyle='#3e4146';g.fillRect(0,0,256,256);for(let r=0;r<8;r++){const o=(r%2)*24;for(let x=-o;x<256;x+=48){const v=96+Math.random()*50|0;g.fillStyle='rgb('+v+','+v+','+(v+6)+')';g.fillRect(x+1.5,r*32+1.5,45,29)}}for(let i=0;i<400;i++){g.fillStyle='rgba(0,0,0,'+Math.random()*.12+')';g.fillRect(Math.random()*256,Math.random()*256,2,2)}});
 const plasterT=tex(g=>{g.fillStyle='#e8e1d2';g.fillRect(0,0,256,256);for(let i=0;i<900;i++){const v=205+Math.random()*45|0;g.fillStyle='rgba('+v+','+(v-6)+','+(v-18)+','+Math.random()*.3+')';g.fillRect(Math.random()*256,Math.random()*256,3+Math.random()*10,2+Math.random()*6)}for(let i=0;i<260;i++){g.fillStyle='rgba(70,60,50,'+Math.random()*.1+')';g.fillRect(Math.random()*256,Math.random()*256,1,8+Math.random()*30)}});
 const cobbleT=tex(g=>{g.fillStyle='#34363a';g.fillRect(0,0,256,256);for(let r=0;r<16;r++){const o=(r%2)*8;for(let x=-o;x<256;x+=16){const v=105+Math.random()*50|0;g.fillStyle='rgb('+v+','+v+','+(v+5)+')';g.beginPath();g.ellipse(x+8,r*16+8,7,6.4,0,0,6.3);g.fill()}}});
 const plankT=tex(g=>{g.fillStyle='#5a4a3c';g.fillRect(0,0,256,256);for(let r=0;r<8;r++){const v=70+Math.random()*40|0;g.fillStyle='rgb('+v+','+(v-14)+','+(v-26)+')';g.fillRect(0,r*32+1,256,30);for(let i=0;i<30;i++){g.fillStyle='rgba(20,14,10,'+Math.random()*.35+')';g.fillRect(Math.random()*256,r*32+2+Math.random()*28,10+Math.random()*50,1)}}});
 const tileT=tex(g=>{g.fillStyle='#55595f';g.fillRect(0,0,256,256);for(let r=0;r<16;r++){const o=(r%2)*8;for(let x=-o;x<256;x+=16){const v=110+Math.random()*40|0;g.fillStyle='rgb('+v+','+v+','+(v+8)+')';g.fillRect(x+1,r*16+1,14,14);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x+1,r*16+12,14,3)}}});
 const mat=(t,x)=>new T.MeshStandardMaterial(Object.assign({map:t,vertexColors:true,roughness:1},x||{}));
 const MT={stone:mat(stoneT),plaster:mat(plasterT),cobble:mat(cobbleT,{polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),plank:mat(plankT),roof:mat(tileT),
  solid:new T.MeshStandardMaterial({vertexColors:true,roughness:.9}),iron:new T.MeshStandardMaterial({vertexColors:true,roughness:.45,metalness:.6}),glow:new T.MeshBasicMaterial({vertexColors:true}),
  cloth:new T.MeshStandardMaterial({vertexColors:true,roughness:1,side:T.DoubleSide}),snow:new T.MeshStandardMaterial({vertexColors:true,roughness:1})};
 // ---- merged geometry: every static building piece goes into a handful of meshes (one per material per 150 m cell)
 let BUF={},OX=CX_,OZ=CZ_,OY=GY;const buf=(k,wx,wz)=>{const id=k+'|'+Math.floor(wx/150)+','+Math.floor(wz/150);return BUF[id]||(BUF[id]={k,p:[],n:[],u:[],c:[],i:[]})};
 const c3=c=>[(c>>16&255)/255,(c>>8&255)/255,(c&255)/255];
 const vtx=(b,p,n,u,v,cc)=>{b.p.push(p[0],p[1],p[2]);b.n.push(n[0],n[1],n[2]);b.u.push(u,v);b.c.push(cc[0],cc[1],cc[2])};
 const quad=(b,P,n,U,cc)=>{const o=b.p.length/3;for(let i=0;i<4;i++)vtx(b,P[i],n,U[i][0],U[i][1],cc);b.i.push(o,o+1,o+2,o,o+2,o+3)};
 const FACES=(lo,hi,uk)=>{const out=[],ext=[hi[0]-lo[0],hi[1]-lo[1],hi[2]-lo[2]];for(let a=0;a<3;a++)for(const s of[1,-1]){const ua=a==1?0:a==0?2:0,va=a==1?2:1,cr=((va-ua+3)%3==1)?1:-1,ord=cr*s>0?[[0,0],[1,0],[1,1],[0,1]]:[[0,0],[0,1],[1,1],[1,0]],P=[],U=[],n=[0,0,0];n[a]=s;
   for(const q of ord){const p=[0,0,0];p[a]=s>0?hi[a]:lo[a];p[ua]=q[0]?hi[ua]:lo[ua];p[va]=q[1]?hi[va]:lo[va];P.push(p);U.push([q[0]*ext[ua]/uk,q[1]*ext[va]/uk])}out.push({n,P,U})}return out};
 const rot=(p,rx,ry,rz)=>{let x=p[0],y=p[1],z=p[2],c,s,t;if(rz){c=Math.cos(rz);s=Math.sin(rz);t=x*c-y*s;y=x*s+y*c;x=t}if(rx){c=Math.cos(rx);s=Math.sin(rx);t=y*c-z*s;z=y*s+z*c;y=t}if(ry){c=Math.cos(ry);s=Math.sin(ry);t=x*c+z*s;z=-x*s+z*c;x=t}return[x,y,z]};
 // axis-aligned box in city-local coordinates (x east, z south, y up from the street)
 const bx=(k,x0,x1,z0,z1,y0,y1,c,uk)=>{const b=buf(k,x0+OX,z0+OZ),cc=c3(c);for(const f of FACES([x0+OX,y0+OY,z0+OZ],[x1+OX,y1+OY,z1+OZ],uk||4))quad(b,f.P,f.n,f.U,cc)};
 // oriented box (roof slabs, hulls, sails): centre, size, rotations
 const rbx=(k,cx,cy,cz,w,h,d,rx,ry,rz,c,uk)=>{const b=buf(k,cx+OX,cz+OZ),cc=c3(c);for(const f of FACES([-w/2,-h/2,-d/2],[w/2,h/2,d/2],uk||4)){const P=f.P.map(p=>{const q=rot(p,rx,ry,rz);return[q[0]+cx+OX,q[1]+cy+OY,q[2]+cz+OZ]});quad(b,P,rot(f.n,rx,ry,rz),f.U,cc)}};
 const tri=(k,A,B,C,c,uk)=>{uk=uk||4;const b=buf(k,A[0]+OX,A[2]+OZ),cc=c3(c),P=[A,B,C].map(p=>[p[0]+OX,p[1]+OY,p[2]+OZ]),u=[B[0]-A[0],B[1]-A[1],B[2]-A[2]],v=[C[0]-A[0],C[1]-A[1],C[2]-A[2]];
  let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const l=Math.hypot(n[0],n[1],n[2])||1;n=[n[0]/l,n[1]/l,n[2]/l];const o=b.p.length/3;
  for(const p of P)vtx(b,p,n,(p[0]+p[2])/uk,p[1]/uk,cc);b.i.push(o,o+1,o+2)};
 // cylinder / cone (r1 = 0 for a cone), centred at (x,z), base at y0
 const cyl=(k,x,z,r0,r1,h,c,y0,seg)=>{y0=y0||0;seg=seg||10;const b=buf(k,x+OX,z+OZ),cc=c3(c),ox=x+OX,oz=z+OZ,yb=y0+OY,yt=yb+h,sl=(r0-r1)/h;
  for(let i=0;i<seg;i++){const a0=i/seg*2*PI,a1=(i+1)/seg*2*PI,s0=Math.sin(a0),c0=Math.cos(a0),s1=Math.sin(a1),c1=Math.cos(a1),l=Math.hypot(1,sl),n0=[s0/l,sl/l,c0/l],n1=[s1/l,sl/l,c1/l],o=b.p.length/3,u0=i/seg*r0*2*PI/4,u1=(i+1)/seg*r0*2*PI/4;
   vtx(b,[ox+s0*r0,yb,oz+c0*r0],n0,u0,0,cc);vtx(b,[ox+s1*r0,yb,oz+c1*r0],n1,u1,0,cc);vtx(b,[ox+s1*r1,yt,oz+c1*r1],n1,u1,h/4,cc);vtx(b,[ox+s0*r1,yt,oz+c0*r1],n0,u0,h/4,cc);b.i.push(o,o+1,o+2,o,o+2,o+3);
   if(r1>0){const q=b.p.length/3;vtx(b,[ox,yt,oz],[0,1,0],.5,.5,cc);vtx(b,[ox+s0*r1,yt,oz+c0*r1],[0,1,0],.5+s0*.5,.5+c0*.5,cc);vtx(b,[ox+s1*r1,yt,oz+c1*r1],[0,1,0],.5+s1*.5,.5+c1*.5,cc);b.i.push(q,q+1,q+2)}
   if(y0>-50){const q=b.p.length/3;vtx(b,[ox,yb,oz],[0,-1,0],.5,.5,cc);vtx(b,[ox+s1*r0,yb,oz+c1*r0],[0,-1,0],.5+s1*.5,.5+c1*.5,cc);vtx(b,[ox+s0*r0,yb,oz+c0*r0],[0,-1,0],.5+s0*.5,.5+c0*.5,cc);b.i.push(q,q+1,q+2)}}};
 // convex prism from a footprint polygon (hulls)
 const prism=(k,pts,y0,y1,c)=>{const b=buf(k,pts[0][0]+OX,pts[0][1]+OZ),cc=c3(c),n=pts.length;let cx=0,cz=0;for(const p of pts){cx+=p[0]/n;cz+=p[1]/n}
  for(let i=0;i<n;i++){const A=pts[i],B=pts[(i+1)%n],dx=B[0]-A[0],dz=B[1]-A[1],l=Math.hypot(dx,dz)||1,nn=[dz/l,0,-dx/l],mid=[(A[0]+B[0])/2-cx,(A[1]+B[1])/2-cz],sg=(nn[0]*mid[0]+nn[2]*mid[1])>=0?1:-1,o=b.p.length/3,m=[nn[0]*sg,0,nn[2]*sg];
   const P=[[A[0],y0,A[1]],[B[0],y0,B[1]],[B[0],y1,B[1]],[A[0],y1,A[1]]].map(p=>[p[0]+OX,p[1]+OY,p[2]+OZ]);if(sg>0){P.reverse();}
   for(const p of P)vtx(b,p,m,(p[0]+p[2])/4,p[1]/4,cc);b.i.push(o,o+1,o+2,o,o+2,o+3);
   const q=b.p.length/3;vtx(b,[cx+OX,y1+OY,cz+OZ],[0,1,0],0,0,cc);vtx(b,[A[0]+OX,y1+OY,A[1]+OZ],[0,1,0],0,0,cc);vtx(b,[B[0]+OX,y1+OY,B[1]+OZ],[0,1,0],0,0,cc);
   const cr=(A[0]-cx)*(B[1]-cz)-(A[1]-cz)*(B[0]-cx);if(cr>0)b.i.push(q,q+2,q+1);else b.i.push(q,q+1,q+2)}};
 const emit=(B,parent)=>{for(const id in B){const b=B[id],g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(b.p,3));g.setAttribute('normal',new T.Float32BufferAttribute(b.n,3));g.setAttribute('uv',new T.Float32BufferAttribute(b.u,2));g.setAttribute('color',new T.Float32BufferAttribute(b.c,3));
   g.setIndex(new T.BufferAttribute(b.p.length/3>65535?new Uint32Array(b.i):new Uint16Array(b.i),1));const m=new T.Mesh(g,MT[b.k]);m.castShadow=m.receiveShadow=b.k!='glow';parent.add(m)}},flush=()=>emit(BUF,grp);
 // ---- colliders, bucketed into 40 m cells so every query touches only a handful
 const CG={},CCOL=[];
 const cadd=c=>{CCOL.push(c);const x0=(c.r!==undefined?c.cx-c.r:c.x0)-1,x1=(c.r!==undefined?c.cx+c.r:c.x1)+1,z0=(c.r!==undefined?c.cz-c.r:c.z0)-1,z1=(c.r!==undefined?c.cz+c.r:c.z1)+1;for(let i=Math.floor(x0/40);i<=Math.floor(x1/40);i++)for(let j=Math.floor(z0/40);j<=Math.floor(z1/40);j++)(CG[i+','+j]??=[]).push(c)};
 const ccr=(x0,x1,z0,z1,y0,y1)=>cadd({x0:x0+CX_,x1:x1+CX_,z0:z0+CZ_,z1:z1+CZ_,y0:y0+GY,y1:y1+GY}),ccc=(x,z,r,y0,y1)=>cadd({cx:x+CX_,cz:z+CZ_,r,y0:y0+GY,y1:y1+GY});
 const ccollide=(o,rad)=>{const oy=o.y===undefined?H(o.x,o.z):o.y,gi=Math.floor(o.x/40),gj=Math.floor(o.z/40);for(let i=gi-1;i<=gi+1;i++)for(let j=gj-1;j<=gj+1;j++){const a=CG[i+','+j];if(!a)continue;for(const c of a){if(oy>=c.y1-.4||oy+1.9<=c.y0+.1)continue;fpush(o,c,rad)}}};
 const cin=(x,z,y)=>{const a=CG[Math.floor(x/40)+','+Math.floor(z/40)];if(a)for(const c of a){if(y>=c.y1||y<=c.y0)continue;if(c.r===undefined){if(x>c.x0-.5&&x<c.x1+.5&&z>c.z0-.5&&z<c.z1+.5)return true}else if(Math.hypot(x-c.cx,z-c.cz)<c.r+.5)return true}return false};
 {const f0=fcollide,c1=collide,k1=camFree;
  window.fcollide=(o,r)=>{if(o.z>700&&o.x>-420&&o.x<420)ccollide(o,r);else f0(o,r)};
  window.collide=(o,r)=>{c1(o,r);if(o.z>1100&&H(o.x,o.z)<SEA-1.2&&!(surfY(o.x,o.z,o.y+1.1)>-1e8)){let k=0;while(H(o.x,o.z)<SEA-1.2&&k++<400)o.z-=.5}}; // deep water is a wall: you can wade, not swim
  window.camFree=(tx,ty,tz,cx,cy,cz)=>{let f=k1(tx,ty,tz,cx,cy,cz);if(tz>700||cz>700)for(let k=1;k<=16;k++){const t=k/16;if(cin(tx+(cx-tx)*t,tz+(cz-tz)*t,ty+(cy-ty)*t)){f=Math.min(f,Math.max(.14,(k-1)/16-.05));break}}return f}}
 const bd=(k,x0,x1,z0,z1,y0,y1,c,col)=>{bx(k,x0,x1,z0,z1,y0,y1,c);if(col)ccr(x0,x1,z0,z1,y0,y1)};
 const bcy=(k,x,z,r0,r1,h,c,y0,col,seg)=>{cyl(k,x,z,r0,r1,h,c,y0,seg);if(col)ccc(x,z,Math.max(r0,r1)+.1,y0||0,(y0||0)+h)};
 const PAL=[0xeadfc9,0xd8c7a6,0xc6d2d9,0xd9b99b,0xcddac6,0xe4c8bf,0xb9c5d0,0xe8d9a8],ROOFS=[0x8a4a3a,0x4d5863,0x56606b,0x7a3f32,0x3f4852],SNOW=0xf2f6fc,GLOW=0xd9a24f;
 // gabled roof with snow, gable ends and a chimney
 const gable=(cx,cz,w,d,h,rc,c,k,chim)=>{const long=w>=d,L=long?w:d,S=long?d:w,rise=Math.min(S*.32,3.6),ang=Math.atan2(rise,S/2),sl=S/2/Math.cos(ang)+.8;
  for(const s of[-1,1]){const px=cx+(long?0:s*S/4),pz=cz+(long?s*S/4:0),py=h+rise/2+.15;
   if(long){rbx('roof',px,py,pz,L+1.8,.32,sl,s*ang,0,0,rc);rbx('snow',px,py+.24,pz,L+1.8,.2,sl,s*ang,0,0,SNOW)}else{rbx('roof',px,py,pz,sl,.32,L+1.8,0,0,-s*ang,rc);rbx('snow',px,py+.24,pz,sl,.2,L+1.8,0,0,-s*ang,SNOW)}}
  for(const s of[-1,1]){if(long){const xe=cx+s*L/2,A=[xe,h,cz-S/2],B=[xe,h,cz+S/2],C=[xe,h+rise,cz];if(s>0)tri(k,A,C,B,c);else tri(k,A,B,C,c)}else{const ze=cz+s*L/2,A=[cx-S/2,h,ze],B=[cx+S/2,h,ze],C=[cx,h+rise,ze];if(s>0)tri(k,A,B,C,c);else tri(k,A,C,B,c)}}
  if(chim){const hx=cx+(long?w*.25:0),hz=cz+(long?0:d*.25);bx('stone',hx-.6,hx+.6,hz-.6,hz+.6,h+rise*.4,h+rise+2.2,0x8a8d93);bx('snow',hx-.7,hx+.7,hz-.7,hz+.7,h+rise+2.2,h+rise+2.4,SNOW)}return rise};
 const winRows=(x0,x1,z0,z1,h,face,cx,cz)=>{const w=x1-x0,d=z1-z0;for(let y=1.9;y<h-1;y+=3.4)for(const q of[[x0+w*.3,z0,0],[x1-w*.3,z0,0],[x0+w*.3,z1,0],[x1-w*.3,z1,0],[x0,cz,1],[x1,cz,1]]){
   if(q[2]&&y<3&&((face=='w'&&q[0]==x0)||(face=='e'&&q[0]==x1)))continue;if(Math.random()<.22)continue;
   if(q[2]==0)bx('glow',q[0]-.45,q[0]+.45,q[1]-(q[1]==z0?.07:-.01),q[1]+(q[1]==z0?.01:.07),y-.55,y+.55,GLOW);else bx('glow',q[0]-(q[0]==x0?.07:-.01),q[0]+(q[0]==x0?.01:.07),q[1]-.45,q[1]+.45,y-.55,y+.55,GLOW)}};
 // a house or shop: plastered walls, a doorway, windows on every floor, a snowy gabled roof, a hearth and bed inside
 const HS=[];
 function house(cx,cz,w,d,h,face,o){o=o||{};HS.push([cx,cz,w,d,face]);const t=.5,dw=o.dw||2.6,k=o.k||'plaster',c=o.c||pick(PAL),x0=cx-w/2,x1=cx+w/2,z0=cz-d/2,z1=cz+d/2;
  const wl=(a0,a1,b0,b1,g)=>{if(!g){bd(k,a0,a1,b0,b1,0,h,c,1);return}
   if(g.a=='x'){bd(k,a0,g.c-dw/2,b0,b1,0,h,c,1);bd(k,g.c+dw/2,a1,b0,b1,0,h,c,1);bx(k,g.c-dw/2,g.c+dw/2,b0,b1,3,h,c)}
   else{bd(k,a0,a1,b0,g.c-dw/2,0,h,c,1);bd(k,a0,a1,g.c+dw/2,b1,0,h,c,1);bx(k,a0,a1,g.c-dw/2,g.c+dw/2,3,h,c)}};
  wl(x0,x1,z1-t,z1,face=='s'?{a:'x',c:cx}:null);wl(x0,x1,z0,z0+t,face=='n'?{a:'x',c:cx}:null);wl(x0,x0+t,z0+t,z1-t,face=='w'?{a:'z',c:cz}:null);wl(x1-t,x1,z0+t,z1-t,face=='e'?{a:'z',c:cz}:null);
  bx('solid',x0+t,x1-t,z0+t,z1-t,0,.1,0x3b342d);winRows(x0,x1,z0,z1,h,face,cx,cz);
  if(o.noroof!==true)gable(cx,cz,w,d,h,o.rc||pick(ROOFS),c,k,o.chim!==false);
  if(o.int!==false){if(face=='s'||face=='n'){bd('solid',x0+t,x0+t+1.1,cz-1.1,cz+1.1,0,.7,0x57606a,1);bd('stone',x1-t-1.3,x1-t,cz-1,cz+1,0,2.4,0x8a8d93,1)}else{bd('solid',cx-1.1,cx+1.1,z0+t,z0+t+1.1,0,.7,0x57606a,1);bd('stone',cx-1,cx+1,z1-t-1.3,z1-t,0,2.4,0x8a8d93,1)}}}
 // big public building with a flat roof, parapet, and a doorway (gc = door centre, along the wall)
 function hall(x0,x1,z0,z1,h,c,face,o){o=o||{};const t=1.6,dw=o.dw||4.5,gc=o.gc!==undefined?o.gc:((face=='n'||face=='s')?(x0+x1)/2:(z0+z1)/2),k=o.k||'stone';
