// ================= Citadel of the Pale Crown: the castle at the heart of the northern marches =================
const COLS=[],FLR=[],STEPS=[],RUB=[];
const CB=(x0,x1,z0,z1,y1,y0=0)=>COLS.push({x0:CX+x0,x1:CX+x1,z0:CZ+z0,z1:CZ+z1,y0:PL+y0,y1:PL+y1}),CC=(x,z,r,y1,y0=0)=>COLS.push({cx:CX+x,cz:CZ+z,r,y0:PL+y0,y1:PL+y1});
function surfY(x,z,ym){let b=-1e9;for(const f of FLR){if(x<f[0]||x>f[1]||z<f[2]||z>f[3])continue;const y=f[6]==0?f[4]:f[4]+(f[5]-f[4])*(z-f[2])/(f[3]-f[2]);if(y<=ym&&y>b)b=y}return b}
function groundY(o){const g=H(o.x,o.z);if(Math.abs(o.x-CX)>200||Math.abs(o.z-CZ)>200)return g;const s=surfY(o.x,o.z,o.y+1.1);return s>g?s:g}
function collide(o,rad){if(Math.abs(o.x-CX)>300||Math.abs(o.z-CZ)>300)return;const oy=o.y===undefined?PL:o.y;
 for(let it=0;it<2;it++)for(const c of COLS){if(oy>=c.y1-.4||oy+1.9<=c.y0+.1)continue;
  if(c.r===undefined){const px=Math.max(c.x0,Math.min(c.x1,o.x)),pz=Math.max(c.z0,Math.min(c.z1,o.z)),dx=o.x-px,dz=o.z-pz,d2=dx*dx+dz*dz;
   if(d2<rad*rad){if(d2>1e-8){const d=Math.sqrt(d2);o.x=px+dx/d*rad;o.z=pz+dz/d*rad}else{const l=o.x-c.x0,r=c.x1-o.x,t=o.z-c.z0,b=c.z1-o.z,m=Math.min(l,r,t,b);if(m==l)o.x=c.x0-rad;else if(m==r)o.x=c.x1+rad;else if(m==t)o.z=c.z0-rad;else o.z=c.z1+rad}}}
  else{const dx=o.x-c.cx,dz=o.z-c.cz,d=Math.hypot(dx,dz),rr=c.r+rad;if(d<rr){if(d>1e-6){o.x=c.cx+dx/d*rr;o.z=c.cz+dz/d*rr}else o.x=c.cx+rr}}}}
function inCol(x,z,y){for(const c of COLS){if(y>=c.y1||y<=c.y0)continue;if(c.r===undefined){if(x>c.x0-.5&&x<c.x1+.5&&z>c.z0-.5&&z<c.z1+.5)return true}else if(Math.hypot(x-c.cx,z-c.cz)<c.r+.5)return true}return false}
function camFree(tx,ty,tz,cx,cy,cz){if((Math.abs(tx-CX)>330||Math.abs(tz-CZ)>330)&&(Math.abs(cx-CX)>330||Math.abs(cz-CZ)>330))return 1;
 for(let k=1;k<=16;k++){const t=k/16;if(inCol(tx+(cx-tx)*t,tz+(cz-tz)*t,ty+(cy-ty)*t))return Math.max(.14,(k-1)/16-.05)}return 1}
const castle=new T.Group();scene.add(castle);
const mk=(c,r,m)=>new T.MeshStandardMaterial({color:c,roughness:r??.9,metalness:m||0});
const stoneT=(()=>{const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.fillStyle='#6f737b';g.fillRect(0,0,256,256);
 for(let r=0;r<8;r++){const y=r*32,off=(r%2)*32;for(let k=-1;k<5;k++){const v=100+Math.floor(Math.random()*46);g.fillStyle='rgb('+v+','+(v+3)+','+(v+9)+')';g.fillRect(k*64+off+2,y+2,60,28)}}
 for(let i=0;i<2400;i++){const v=Math.random()*70|0;g.fillStyle='rgba('+v+','+v+','+v+',.2)';g.fillRect(Math.random()*256,Math.random()*256,2,2)}
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;return t})();
const MST=new T.MeshStandardMaterial({map:stoneT,color:0xc9ced6,roughness:.95}),MRF=mk(0x34425a,.8),MSN=mk(0xf4f8ff,1),MWD=mk(0x4a3524,.9),MIR=mk(0x2b2f36,.5,.8),MRD=mk(0x8a1f24,1),MFL=mk(0x6f747c,.95),MGD=mk(0xc9a54a,.4,.8),MGE=mk(0x8b9099,1),MFIRE=new T.MeshBasicMaterial({color:0xff9a3c}),MIN=new T.MeshStandardMaterial({map:stoneT,color:0x8e97a3,roughness:1}),MFT=new T.MeshStandardMaterial({map:stoneT,color:0x80868f,roughness:1}),MCA=mk(0xd9d2c0,1),MBL=mk(0x3f5878,1),MBK=[mk(0x6b2a2a,1),mk(0x2f4a63,1),mk(0x5a5a3a,1)],MDK=mk(0x15171b,1),MGL=new T.MeshBasicMaterial({color:0x7fa6d8}),MICE=mk(0xcfe4ff,.15,.1),MMAP=mk(0x8a8f7a,1);MGE.side=T.DoubleSide;
const UVS=8,MER=[],WIN=[];
const bxm=(w,h,d,mat,x,y,z)=>{const g=new T.BoxGeometry(w,h,d),uv=g.attributes.uv,f=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]];
 for(let i=0;i<24;i++){const q=f[i>>2];uv.setXY(i,uv.getX(i)*q[0]/UVS,uv.getY(i)*q[1]/UVS)}
 const m=new T.Mesh(g,mat);m.position.set(CX+x,PL+y,CZ+z);m.castShadow=m.receiveShadow=true;castle.add(m);return m};
const blk=(x0,x1,z0,z1,y0,y1,mat,col)=>{bxm(x1-x0,y1-y0,z1-z0,mat||MST,(x0+x1)/2,(y0+y1)/2,(z0+z1)/2);if(col)CB(x0,x1,z0,z1,y1,y0)};
const wmer=(x0,x1,z0,z1,h,single)=>{const hz=(x1-x0)>(z1-z0),lo=hz?x0:z0,hi=hz?x1:z1,ln=single?[hz?(z0+z1)/2:(x0+x1)/2]:hz?[z0+1,z1-1]:[x0+1,x1-1];
 for(const f of ln)for(let p=lo+2;p<hi-1;p+=5.5)MER.push(hz?[p,h+2.7,f,0]:[f,h+2.7,p,PI/2])};
const wall=(x0,x1,z0,z1,h,nm)=>{blk(x0,x1,z0,z1,0,h,MST,true);blk(x0-.4,x1+.4,z0-.4,z1+.4,h,h+.7,MSN);if(!nm)wmer(x0,x1,z0,z1,h)};
const tw=(x,z,r,h,roof=true)=>{const g=new T.CylinderGeometry(r,r*1.05,h,22,1,false),uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*r*6.3/UVS,uv.getY(i)*h/UVS);
 const m=new T.Mesh(g,MST);m.position.set(CX+x,PL+h/2,CZ+z);m.castShadow=m.receiveShadow=true;castle.add(m);
 const b=new T.Mesh(new T.CylinderGeometry(r+1.4,r+1.4,2.4,22),MST);b.position.set(CX+x,PL+h,CZ+z);b.castShadow=true;castle.add(b);
 if(roof){const c=new T.Mesh(new T.ConeGeometry(r+2.2,r*1.9,22),MRF);c.position.set(CX+x,PL+h+1.2+r*.95,CZ+z);c.castShadow=true;castle.add(c)}CC(x,z,r,h)};
const WN=(x,y,z,ry)=>WIN.push([x,y,z,ry]);
const braz=(x,z)=>{const p=new T.Mesh(new T.CylinderGeometry(.22,.3,1.8,8),MIR);p.position.set(CX+x,PL+.9,CZ+z);castle.add(p);const f=new T.Mesh(new T.SphereGeometry(.6,8,6),MFIRE);f.position.set(CX+x,PL+2.2,CZ+z);castle.add(f);CC(x,z,.55,2)};
function gable(x0,x1,z0,z1,wh,rise,rz){const cx=(x0+x1)/2,cz=(z0+z1)/2,W=rz?x1-x0:z1-z0,D=rz?z1-z0:x1-x0,a=Math.atan2(rise,W/2),L=W/2/Math.cos(a)+1.2;
 for(const s of[-1,1]){const m=rz?bxm(L,1.2,D+2,MRF,cx+s*W/4,wh+rise/2,cz):bxm(D+2,1.2,L,MRF,cx,wh+rise/2,cz+s*W/4);if(rz)m.rotation.z=-s*a;else m.rotation.x=s*a}
 const sh=new T.Shape();sh.moveTo(-W/2,0);sh.lineTo(W/2,0);sh.lineTo(0,rise);const g=new T.ShapeGeometry(sh);
 for(const s of[-1,1]){const m=new T.Mesh(g,MGE);m.position.set(CX+(rz?cx:cx+s*D/2),PL+wh,CZ+(rz?cz+s*D/2:cz));if(!rz)m.rotation.y=PI/2;castle.add(m)}}
const bld=(x0,x1,z0,z1,wh,rise,rz)=>{blk(x0,x1,z0,z1,0,wh,MST,true);gable(x0,x1,z0,z1,wh,rise,rz)};
// LAYOUT-START (all coordinates are local to the castle centre; +z faces south towards the basin, -z is north)
{const S=170;
 // outer curtain wall: main gate south (x -8..8), postern north (10 wide), sally ports east and west (7 wide)
 wall(-S,-42,165,175,30);wall(42,S,165,175,30);wall(-S,-5,-175,-165,30);wall(5,S,-175,-165,30);
 wall(165,175,-S,-3.5,30);wall(165,175,3.5,S,30);wall(-175,-165,-S,-3.5,30);wall(-175,-165,3.5,S,30);
 blk(-5,5,-175,-165,15,30);blk(165,175,-3.5,3.5,15,30);blk(-175,-165,-3.5,3.5,15,30);
 // great gatehouse: two blocks, a passage 16 wide, an arch bridge above and a raised portcullis
 wall(-42,-8,154,186,54);wall(8,42,154,186,54);blk(-8,8,154,186,22,54);
 for(let i=0;i<9;i++){const sp=new T.Mesh(new T.ConeGeometry(.35,3,6),MIR);sp.rotation.x=PI;sp.position.set(CX-7+i*1.75,PL+20.5,CZ+185.5);castle.add(sp)}
 blk(-30,-22,186,186.7,24,46,MRD);blk(22,30,186,186.7,24,46,MRD);
 tw(-42,186,11,62);tw(42,186,11,62);tw(-16,-170,7,44);tw(16,-170,7,44);
 for(const sx of[-1,1])for(const sz of[-1,1])tw(sx*S,sz*S,20,58);
 for(const o of[-105,105]){tw(o,170,12,44)}for(const o of[-100,100]){tw(o,-170,12,44);tw(170,o,12,44);tw(-170,o,12,44)}
 // inner ward
 wall(-80,-26,76,84,38);wall(26,80,76,84,38);wall(-26,-7,67,93,50);wall(7,26,67,93,50);blk(-7,7,67,93,20,50);
 wall(-80,80,-84,-76,38);wall(76,84,-80,80,38);wall(-84,-76,-80,80,38);
 for(const sx of[-1,1])for(const sz of[-1,1])tw(sx*80,sz*80,13,64);
 // ---- the keep: hall + 3 upper floors + roof terrace + observatory tower, joined by switchback stairs A,B,C,D ----
 const FY=[0,28,42,56],CL=[26,40,54,72];
 wall(-40,-6,28,35,72,1);wall(6,40,28,35,72,1);blk(-6,6,28,35,18,72);wall(-40,40,-45,-38,72,1);wall(33,40,-38,28,72,1);wall(-40,-33,-38,28,72,1);
 const slab=(x0,x1,z0,z1,top)=>{blk(x0,x1,z0,z1,top-2,top,MFT);FLR.push([CX+x0,CX+x1,CZ+z0,CZ+z1,PL+top,PL+top,0])};
 slab(-27,33,-38,28,28);slab(-33,-27,-38,-14,28);slab(-33,27,-38,28,42);slab(27,33,-38,6,42);slab(-27,33,-38,28,56);slab(-33,-27,-38,6,56);
 slab(-40,27,-45,35,74);slab(33,40,-45,35,74);slab(27,33,-45,0,74);slab(27,33,28,35,74);
 wmer(-40,40,-45,-43,74,1);wmer(-40,40,33,35,74,1);wmer(-40,-38,-45,35,74,1);wmer(38,40,-45,35,74,1);
 CB(-40,40,-45,-42,78,74);CB(-40,40,33,35,78,74);CB(-40,-38,-45,35,78,74);CB(38,40,-45,35,78,74);
 // stairs: A hall->1 (west), B 1->2 (east), C 2->3 (west), D 3->roof (east); stz(x0,x1,z0,z1,heightAtZ0,heightAtZ1,base)
 const stz=(x0,x1,z0,z1,yA,yB,base)=>{FLR.push([CX+x0,CX+x1,CZ+z0,CZ+z1,PL+yA,PL+yB,1]);const L=z1-z0,n=Math.ceil(L/1.4),dz=L/n,h=z=>yA+(yB-yA)*(z-z0)/L;
  for(let k=0;k<n;k++){const a=z0+k*dz,m=a+dz/2,top=h(m);STEPS.push([(x0+x1)/2,(base+top)/2,m,x1-x0,top-base,dz+.05]);if(k%2==0){const b2=Math.min(z1,a+2*dz);CB(x0,x1,a,b2,Math.min(h(a),h(b2)),base)}}};
 stz(-33,-27,-14,26,28,.12,0);stz(27,33,6,26,42,28,28);stz(-33,-27,6,26,56,42,42);stz(27,33,0,26,74,56,56);
 for(const r of[[-27.3,-26.9,-14,28,28],[26.7,27.1,6,28,42],[-27.3,-26.9,6,28,56],[26.7,27.1,0,28,74]]){blk(r[0],r[1],r[2],r[3],r[4],r[4]+1.4,MWD);CB(r[0],r[1],r[2],r[3],r[4]+2.2,r[4]+.2)}
 // observatory tower on the roof (door in the south face), solid cap and spire above
 blk(-22,-5,13,17,74,132,MST,true);blk(5,22,13,17,74,132,MST,true);blk(-5,5,13,17,96,132);blk(-22,22,-27,-23,74,132,MST,true);blk(-22,-18,-23,13,74,132,MST,true);blk(18,22,-23,13,74,132,MST,true);
 blk(-18,18,-23,13,98,100,MFT);blk(-22,22,-27,17,100,132);{const sp=new T.Mesh(new T.ConeGeometry(30,56,8),MRF);sp.position.set(CX,PL+160,CZ-5);sp.castShadow=true;castle.add(sp);
  const pl=new T.Mesh(new T.CylinderGeometry(.35,.35,16,6),MIR);pl.position.set(CX,PL+196,CZ-5);castle.add(pl);bxm(10,5,.3,MRD,5,199,-5)}
 for(const sx of[-1,1])for(const sz of[-1,0.]){const tx=sx*40,tz=sz?-45:35;tw(tx,tz,11,100);for(const yy of[48,74])for(let k=0;k<4;k++){const a=k*PI/2;WN(tx+Math.sin(a)*11.3,yy,tz+Math.cos(a)*11.3,a)}}
 for(const y of[14,34,48,64]){for(const x of[-30,-22,-14,14,22,30])WN(x,y,35.3,0);for(let x=-30;x<=30;x+=10)WN(x,y,-45.3,PI);for(let z=-30;z<=20;z+=10){WN(40.3,y,z,PI/2);WN(-40.3,y,z,-PI/2)}}
 for(const y of[86,112])for(const x of[-12,0,12]){WN(x,y,17.3,0);WN(x,y,-27.3,PI)}
 // small builders for the interior
 const bx=(x0,x1,z0,z1,y,h,m,c)=>blk(x0,x1,z0,z1,y,y+h,m||MWD,c),pw=(x0,x1,z0,z1,l)=>blk(x0,x1,z0,z1,FY[l],CL[l],MIN,true);
 const ws=(hz,c,a0,a1,l,gaps)=>{let p=a0;for(const g of(gaps||[]).concat([[a1,a1]])){if(g[0]>p){if(hz)pw(p,g[0],c-.75,c+.75,l);else pw(c-.75,c+.75,p,g[0],l)}p=g[1]}};
 const cnd=(x,y,z)=>{bxm(.5,.9,.5,MCA,x,y+.45,z);const f=new T.Mesh(new T.SphereGeometry(.22,6,4),MFIRE);f.position.set(CX+x,PL+y+1.05,CZ+z);castle.add(f)};
 const shelf=(x0,x1,z0,z1,y)=>{bx(x0,x1,z0,z1,y,9,MWD,true);for(let r=0;r<3;r++)bx(x0-.08,x1+.08,z0-.08,z1+.08,y+1.2+r*2.8,1,MBK[r])};
 const bed=(x,z,y,w)=>{w=w||1.6;bx(x-w,x+w,z-3,z+3,y,1.2,MWD,true);bx(x-w+.1,x+w-.1,z-2.9,z+2.9,y+1.2,.5,MBL);bx(x-w+.4,x+w-.4,z+2,z+2.9,y+1.7,.5,MFL)};
 const chest=(x,z,y)=>{bx(x-1.2,x+1.2,z-.8,z+.8,y,1.4,MWD,true);bx(x-1.25,x+1.25,z-.2,z+.2,y+.4,.4,MIR)};
 const rack=(x0,x1,z0,z1,y)=>{const hz=(x1-x0)>(z1-z0);bx(x0,x1,z0,z1,y,1,MWD,true);for(let i=0;i<6;i++){const t=(i+.5)/6,px=hz?x0+(x1-x0)*t:(x0+x1)/2,pz=hz?(z0+z1)/2:z0+(z1-z0)*t;bx(px-.15,px+.15,pz-.15,pz+.15,y+1,7,MIR)}};
 const stand=(x,z,y)=>{bx(x-1,x+1,z-1,z+1,y,.4,MFL);bx(x-.7,x+.7,z-.7,z+.7,y+.4,5,MIR,true);bx(x-.5,x+.5,z-.5,z+.5,y+5.4,1.4,MIR)};
 const rtab=(x,z,y)=>{const t=new T.Mesh(new T.CylinderGeometry(3.6,3.6,.4,18),MWD);t.position.set(CX+x,PL+y+2.8,CZ+z);castle.add(t);const p=new T.Mesh(new T.CylinderGeometry(1,1.4,2.6,10),MWD);p.position.set(CX+x,PL+y+1.3,CZ+z);castle.add(p);CC(x,z,3.6,y+3,y);
  for(let k=0;k<8;k++){const a=k*PI/4;bx(x+Math.sin(a)*5-.7,x+Math.sin(a)*5+.7,z+Math.cos(a)*5-.7,z+Math.cos(a)*5+.7,y,2,MWD,true)}};
 const hearth=(x0,x1,z0,z1,y,fx,fz)=>{bx(x0,x1,z0,z1,y,9,MST,true);const f=new T.Mesh(new T.SphereGeometry(.9,8,6),MFIRE);f.scale.y=.6;f.position.set(CX+fx,PL+y+1.1,CZ+fz);castle.add(f)};
 const rub=(x,z,y)=>{for(let k=0;k<4;k++)RUB.push([x+(Math.random()-.5)*3,y+.3,z+(Math.random()-.5)*3,.5+Math.random()*1.1])};
 const frost=(x,z,y,w,d)=>blk(x-w/2,x+w/2,z-d/2,z+d/2,y,y+.08,MSN);
 const desk=(x0,x1,z0,z1,y)=>{bx(x0,x1,z0,z1,y,2.8,MWD,true);cnd((x0+x1)/2,y+2.8,(z0+z1)/2)};
 // ---- ground floor: the Great Hall (ceiling 26) ----
 FLR.push([CX-33,CX+33,CZ-38,CZ+28,PL+.12,PL+.12,0]);
 blk(-33,33,-38,28,0,.12,MFL);blk(-4,4,-34,28,.12,.2,MRD);blk(-14,14,-38,-28,.12,.35,MFL);blk(-2.6,2.6,-37,-33,.35,3.2,MGD,true);blk(-2.6,2.6,-37.6,-36.6,3.2,8,MGD);
 for(const z of[20,8,-4,-16,-28])for(const x of[-14,14])tw(x,z,2.4,26,false);
 for(const z of[14,-2,-18])blk(32.5,33,z-2.5,z+2.5,6,22,MRD);for(const z of[6.5,-10,-27])blk(32.7,33,z-2,z+2,4,20,MGL);
 for(const sd of[-1,1])for(const t of[[8,-6],[-14,-26]]){const xa=Math.min(sd*6.5,sd*10),xb=Math.max(sd*6.5,sd*10);bx(xa,xb,t[1],t[0],2.4,.4,MWD);bx(xa+.6,xb-.6,t[1]+.6,t[0]-.6,0,2.4,MWD,true);for(let z=t[1]+2;z<t[0];z+=4)cnd((xa+xb)/2,2.8,z)}
 {const r=new T.Mesh(new T.TorusGeometry(7,.35,6,24),MIR);r.rotation.x=PI/2;r.position.set(CX,PL+19,CZ-5);castle.add(r);bxm(.25,7,.25,MIR,0,22.5,-5);
  for(let k=0;k<12;k++){const a=k*PI/6,f=new T.Mesh(new T.SphereGeometry(.35,6,4),MFIRE);f.position.set(CX+Math.sin(a)*7,PL+19.8,CZ-5+Math.cos(a)*7);castle.add(f)}
  for(let i=0;i<14;i++){const c=new T.Mesh(new T.ConeGeometry(.35,2+Math.random()*2.5,5),MICE);c.rotation.x=PI;c.position.set(CX-5.5+i*.85,PL+17,CZ+28.2);castle.add(c)}
  for(const d of[[-3,26,4,1.2],[4,25,5,1.4],[-7,24,3,.9]]){const m=new T.Mesh(new T.SphereGeometry(1,10,6),MSN);m.scale.set(d[2],d[3],d[2]*.7);m.position.set(CX+d[0],PL+.1,CZ+d[1]);castle.add(m)}}
 rub(28,-34,0);rub(-22,-34,0);rub(20,-36,0);frost(-20,10,.12,6,3);frost(18,-14,.12,5,4);frost(-8,-30,.12,4,6);
 blk(-6,-5.2,22,28,0,14,MWD);blk(5.2,6,22,28,0,14,MWD);braz(-9,22);braz(9,22);
 // ---- levels 1-3: a central corridor, galleries north and south, four rooms per floor ----
 for(let l=1;l<=3;l++){const dg=[[-22,-16],[8,14]];ws(0,-6,-32,22,l,dg);ws(0,6,-32,22,l,dg);ws(0,-26.5,-32,22,l,[[-26,-22]]);ws(0,26.5,-32,22,l);
  for(const ab of[[-26.5,-6.75],[6.75,26.5]]){ws(1,-1.5,ab[0],ab[1],l);ws(1,-32,ab[0],ab[1],l);ws(1,22,ab[0],ab[1],l)}
  const y=FY[l];bx(-3,3,-30,20,y,.1,MRD);for(const z of[-26,-8,10]){cnd(-5,y+3.2,z);cnd(5,y+3.2,z)}frost(0,-36,y,12,3);frost(-15,24,y,5,3);rub(-24,-35,y);rub(24,25,y)}
 // floor 1: library, scriptorium, chapel, infirmary
 {const y=28;shelf(-26,-24.5,-31,-27.5,y);shelf(-26,-24.5,-21,-4.5,y);shelf(-24,-9,-31.4,-29.9,y);bx(-20,-13,-30,-27.5,y,2.8,MWD,true);bx(-20,-13,-11,-8.5,y,2.8,MWD,true);cnd(-16,y+2.8,-28.7);cnd(-16,y+2.8,-9.7);
  desk(-24,-20,1,3.5,y);desk(-24,-20,5,7.5,y);bx(-18,-11,16,19.5,y,3,MMAP,true);shelf(-24,-9,20,21.5,y);shelf(-26,-24.5,1,19,y);
  bx(21,25,-19,-14,y,3,MST,true);bx(20.8,25.2,-19.3,-13.7,y+3,.25,MRD);cnd(21.6,y+3.25,-18);cnd(21.6,y+3.25,-15);bx(25.65,25.8,-26,-8,y+4,11,MGL);
  for(const x of[11,14.5,18])for(const z of[[-29,-24],[-13,-6]])bx(x,x+1.6,z[0],z[1],y,2,MWD,true);
  for(const x of[10,16,22]){bed(x,3,y);bed(x,18,y)}bx(21,25,9,13,y,2.8,MWD,true);cnd(23,y+2.8,11)}
 // floor 2: armory, council chamber, two bedchambers
 {const y=42;rack(-26,-24.6,-31,-27.5,y);rack(-26,-24.6,-21,-6,y);rack(-24,-10,-31.4,-30,y);bx(-20,-14,-30,-27.5,y,3,MWD,true);stand(-12,-26,y);stand(-12,-14,y);stand(-20,-9,y);
  rtab(-17,10,y);for(const a of[0,2,4,6])cnd(-17+Math.sin(a)*2,y+3.2,10+Math.cos(a)*2);shelf(-26,-24.5,1,5,y);
  bed(22,-26,y);chest(10,-28,y);hearth(23.5,25.7,-14,-6,y,23,-10);bx(12,20,-22,-16,y,.1,MRD);
  bed(22,18,y);chest(10,19.5,y);hearth(23.5,25.7,2,9,y,23,5.5);bx(12,20,8,14,y,.1,MRD)}
 // floor 3: solar, treasury, royal bedchamber, war room
 {const y=56;hearth(-25.7,-23.5,-14,-6,y,-23,-10);bx(-25.95,-25.8,-30,-18,y+3,10,MRD);for(const c of[[-19,-13],[-19,-9],[-14,-11]])bx(c[0],c[0]+1.6,c[1],c[1]+1.6,y,2.4,MWD,true);bx(-24,-21,-30,-27,y,5,MWD,true);bx(-20.4,-20.2,-30,-27,y,7,MWD);
  for(const z of[3,7,12,16])chest(-24,z,y);for(const x of[-20,-16,-12,-9])chest(x,19.4,y);for(const g of[[-22,5.2],[-22,14],[-14,17.5]]){const m=new T.Mesh(new T.SphereGeometry(1,8,6),MGD);m.scale.set(2.2,.9,2.2);m.position.set(CX+g[0],PL+y+.2,CZ+g[1]);castle.add(m)}
  bed(20,-26,y,3);for(const p of[[16.7,-29.3],[23.3,-29.3],[16.7,-22.7],[23.3,-22.7]])bx(p[0]-.25,p[0]+.25,p[1]-.25,p[1]+.25,y,8,MWD);bx(16.4,23.6,-29.6,-22.4,y+8,.4,MRD);chest(10,-8,y);hearth(23.5,25.7,-14,-6,y,23,-10);bx(25.65,25.8,-30,-20,y+4,9,MGL);
  bx(12,22,5,15,y,3,MWD,true);bx(12.5,21.5,5.5,14.5,y+3,.12,MMAP);for(const p of[[14,8],[17,10],[19.5,12],[15,13]])bx(p[0]-.3,p[0]+.3,p[1]-.3,p[1]+.3,y+3.1,.8,MRD);for(const c of[[10,7],[10,13],[24,7],[24,13]])bx(c[0]-.7,c[0]+.7,c[1]-.7,c[1]+.7,y,2.2,MWD,true);cnd(12.5,y+3.1,5.5);cnd(21.5,y+3.1,14.5);rub(18,-12,y)}
 // observatory (tower interior, floor at the roof level)
 {const y=74;const o=new T.Mesh(new T.SphereGeometry(1.8,14,10),new T.MeshBasicMaterial({color:0x9fd0ff}));o.position.set(CX,PL+y+6,CZ-5);castle.add(o);bx(-1.6,1.6,-6.6,-3.4,y,3,MST,true);
  for(const r of[3,4.4]){const t=new T.Mesh(new T.TorusGeometry(r,.12,6,30),MGD);t.rotation.x=PI/2+r*.1;t.position.set(CX,PL+y+6,CZ-5);castle.add(t)}
  bx(-15,-9,-20,-17,y,2.8,MWD,true);bx(9,15,-20,-17,y,2.8,MWD,true);bx(-12,-5,8,10,y,1,MWD,true);bx(5,12,8,10,y,1,MWD,true);bx(-17.8,-17.6,-18,-6,y+3,12,MMAP);frost(0,6,y,8,6);rub(14,-18,y)}
 
 // courtyard buildings leave the main road, the postern road and the sally ports clear
 bld(-155,-115,25,95,14,12,true);bld(115,155,25,95,14,12,true);bld(30,100,-140,-112,14,10,false);bld(-100,-40,-140,-112,14,10,false);bld(-110,-80,110,140,10,8,true);bld(80,110,110,140,10,8,true);
 for(const x of[-28,28]){const w=new T.Mesh(new T.CylinderGeometry(3,3.2,1.5,14),MST);w.position.set(CX+x,PL+.75,CZ+125);w.castShadow=true;castle.add(w);CC(x,125,3.4,1.5)}
 for(const p of[[-10,150],[10,150],[-10,125],[10,125],[-10,100],[10,100],[-8,58],[8,58],[-8,44],[8,44],[-12,205],[12,205]])braz(p[0],p[1]);
}
// LAYOUT-END
{const d=new T.Object3D(),mi=new T.InstancedMesh(new T.BoxGeometry(3.2,4,2),MST,MER.length);MER.forEach((m,i)=>{d.position.set(CX+m[0],PL+m[1],CZ+m[2]);d.rotation.set(0,m[3],0);d.updateMatrix();mi.setMatrixAt(i,d.matrix)});mi.castShadow=true;mi.frustumCulled=false;castle.add(mi);
 const wi=new T.InstancedMesh(new T.BoxGeometry(1.5,3.2,.5),new T.MeshBasicMaterial({color:0xffc874}),WIN.length);WIN.forEach((m,i)=>{d.position.set(CX+m[0],PL+m[1],CZ+m[2]);d.rotation.set(0,m[3],0);d.updateMatrix();wi.setMatrixAt(i,d.matrix)});wi.frustumCulled=false;castle.add(wi);
 const si=new T.InstancedMesh(new T.BoxGeometry(1,1,1),MFT,STEPS.length);STEPS.forEach((m,i)=>{d.position.set(CX+m[0],PL+m[1],CZ+m[2]);d.scale.set(m[3],m[4],m[5]);d.updateMatrix();si.setMatrixAt(i,d.matrix)});si.castShadow=si.receiveShadow=true;si.frustumCulled=false;castle.add(si);d.scale.set(1,1,1);
 const ri=new T.InstancedMesh(new T.IcosahedronGeometry(1,0),MFL,RUB.length);RUB.forEach((m,i)=>{d.position.set(CX+m[0],PL+m[1],CZ+m[2]);d.scale.set(m[3],m[3]*.7,m[3]);d.rotation.set(Math.random()*3,Math.random()*3,0);d.updateMatrix();ri.setMatrixAt(i,d.matrix)});ri.castShadow=true;ri.frustumCulled=false;castle.add(ri)}
for(const l of[[-9,22,5,0xffa860,1.5],[9,22,5,0xffa860,1.5],[0,0,37,0xffb070,1.2],[0,0,51,0xffb070,1.2],[0,0,65,0xffb070,1.2],[0,-5,84,0x9fc4ff,1.4]]){const pl=new T.PointLight(l[3],l[4],46,2);pl.position.set(CX+l[0],PL+l[2],CZ+l[1]);castle.add(pl)}

