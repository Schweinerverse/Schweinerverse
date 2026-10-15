// ================= The Great Forest: a giant hollow tree, treehouses, root arches, fallen logs =================
const FCOL=[],FTREES={},FCH=60,FCHUNKS=[],FST=[],FSITES=[];
const fcc=(x,z,r,y1,y0)=>FCOL.push({cx:x,cz:z,r,y0,y1}),fcr=(x0,x1,z0,z1,y1,y0)=>FCOL.push({x0,x1,z0,z1,y0,y1});
function fpush(o,c,rad){if(c.r===undefined){const px=Math.max(c.x0,Math.min(c.x1,o.x)),pz=Math.max(c.z0,Math.min(c.z1,o.z)),dx=o.x-px,dz=o.z-pz,d2=dx*dx+dz*dz;
  if(d2<rad*rad){if(d2>1e-8){const d=Math.sqrt(d2);o.x=px+dx/d*rad;o.z=pz+dz/d*rad}else{const l=o.x-c.x0,r=c.x1-o.x,t=o.z-c.z0,b=c.z1-o.z,m=Math.min(l,r,t,b);if(m==l)o.x=c.x0-rad;else if(m==r)o.x=c.x1+rad;else if(m==t)o.z=c.z0-rad;else o.z=c.z1+rad}}}
 else{const dx=o.x-c.cx,dz=o.z-c.cz,d=Math.hypot(dx,dz),rr=c.r+rad;if(d<rr){if(d>1e-6){o.x=c.cx+dx/d*rr;o.z=c.cz+dz/d*rr}else o.x=c.cx+rr}}}
function fcollide(o,rad){if(o.x>-430&&o.x<1900)return;const oy=o.y===undefined?H(o.x,o.z):o.y;
 for(const c of FCOL){if(oy>=c.y1-.4||oy+1.9<=c.y0+.1)continue;if(c.r!==undefined?(Math.abs(o.x-c.cx)>c.r+rad+1||Math.abs(o.z-c.cz)>c.r+rad+1):(o.x<c.x0-rad-1||o.x>c.x1+rad+1||o.z<c.z0-rad-1||o.z>c.z1+rad+1))continue;fpush(o,c,rad)}
 const gx=Math.floor(o.x/FCH),gz=Math.floor(o.z/FCH);for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const a=FTREES[(gx+i)+','+(gz+j)];if(!a)continue;for(const t of a){const dx=o.x-t[0],dz=o.z-t[1],rr=t[2]+rad;if(dx*dx+dz*dz<rr*rr){const d=Math.sqrt(dx*dx+dz*dz)||1e-3;o.x=t[0]+dx/d*rr;o.z=t[1]+dz/d*rr}}}}
function finCol(x,z,y){for(const c of FCOL){if(y>=c.y1||y<=c.y0)continue;if(c.r===undefined){if(x>c.x0-.5&&x<c.x1+.5&&z>c.z0-.5&&z<c.z1+.5)return true}else if(Math.hypot(x-c.cx,z-c.cz)<c.r+.5)return true}return false}
{const c0=collide,k0=camFree; // forest collision, camera occlusion and floors (platforms and ramps) join the castle's
 window.collide=(o,r)=>{c0(o,r);fcollide(o,r)};
 window.camFree=(tx,ty,tz,cx,cy,cz)=>{let f=k0(tx,ty,tz,cx,cy,cz);if(tx<-430||cx<-430||tx>1900||cx>1900)for(let k=1;k<=16;k++){const t=k/16;if(finCol(tx+(cx-tx)*t,tz+(cz-tz)*t,ty+(cy-ty)*t)){f=Math.min(f,Math.max(.14,(k-1)/16-.05));break}}return f};
 window.groundY=o=>{const g=H(o.x,o.z),s=surfY(o.x,o.z,o.y+1.1);return s>g?s:g}}
const barkT=(()=>{const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.fillStyle='#4a3d33';g.fillRect(0,0,256,256);
 for(let i=0;i<190;i++){const x=Math.random()*256,w=2+Math.random()*7,v=20+Math.random()*60|0;g.fillStyle='rgba('+v+','+(v-4)+','+(v-8)+','+(.35+Math.random()*.3)+')';g.fillRect(x,0,w,256)}
 for(let i=0;i<60;i++){g.fillStyle='rgba('+(60+Math.random()*30|0)+','+(80+Math.random()*30|0)+',55,'+(.12+Math.random()*.2)+')';g.beginPath();g.arc(Math.random()*256,Math.random()*256,4+Math.random()*14,0,6.3);g.fill()}
 for(let i=0;i<1400;i++){g.fillStyle='rgba(255,255,255,'+Math.random()*.1+')';g.fillRect(Math.random()*256,Math.random()*256,1,3)}
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;return t})();
const barkM=(rx,ry)=>{const t=barkT.clone();t.needsUpdate=true;t.repeat.set(rx,ry);return new T.MeshStandardMaterial({map:t,color:0xcdbfae,roughness:1,side:T.DoubleSide})};
const MPL=new T.MeshStandardMaterial({color:0x4b3a2b,roughness:.95}),MLN=new T.MeshBasicMaterial({color:0xffb45a}),MTL=new T.MeshBasicMaterial({color:0x8fe8d8});
const fadd=(m,x,y,z)=>{m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;scene.add(m);return m};
// ---- the giant hollow tree: trunk shell 50 m in radius, entrance on the east side, four levels inside, crown above (see buildForest) ----
{const GE=PI/2,GG=.5,TRr=y=>y<=110?50:50-24*(y-110)/60;
 const flathe=(y0,y1,off,full,m)=>{const p=[],n=Math.max(2,Math.ceil((y1-y0)/10));for(let k=0;k<=n;k++){const y=y0+(y1-y0)*k/n;p.push(new T.Vector2(TRr(y)-off,y))}
  fadd(new T.Mesh(full?new T.LatheGeometry(p,72):new T.LatheGeometry(p,72,GE+GG/2,PI*2-GG),m),TX,FT,TZ)};
 flathe(0,24,0,false,barkM(36,3));flathe(0,24,9,false,barkM(30,3));flathe(24,170,0,true,barkM(36,13));flathe(24,100,9,true,barkM(30,9));
 {const c=new T.Mesh(new T.CircleGeometry(41,48),barkM(8,8));c.rotation.x=PI/2;fadd(c,TX,FT+100,TZ);const d=new T.Mesh(new T.CircleGeometry(26,36),barkM(5,5));d.rotation.x=-PI/2;fadd(d,TX,FT+170,TZ);
  const f=new T.Mesh(new T.CircleGeometry(41,48),new T.MeshStandardMaterial({color:0x3a3027,roughness:1}));f.rotation.x=-PI/2;fadd(f,TX,FT+.06,TZ)}
 for(const s of[-1,1]){const a=GE+s*GG/2,x=TX+Math.sin(a)*46,z=TZ+Math.cos(a)*46;fadd(new T.Mesh(new T.CylinderGeometry(5.5,6.5,26,12),barkM(3,3)),x,FT+13,z);fcc(x,z,5.5,FT+170,FT)}
 {const n=Math.round(2*PI*45.5/7);for(let k=0;k<n;k++){const a=k*2*PI/n;let d=Math.abs(a-GE);d=Math.min(d,2*PI-d);if(d<GG/2+.12)continue;fcc(TX+Math.sin(a)*45.5,TZ+Math.cos(a)*45.5,5.5,FT+170,FT)}}
 for(let k=0;k<8;k++){const a=k*PI/4+.2;let d=Math.abs(a-GE);d=Math.min(d,2*PI-d);if(d<.62)continue;const g=new T.ConeGeometry(7,46,8);g.translate(0,23,0);const m=new T.Mesh(g,barkM(3,5));m.rotation.set(0,a-PI/2,-PI/2);fadd(m,TX+Math.sin(a)*44,FT+3,TZ+Math.cos(a)*44);
  for(const rr of[52,62])fcc(TX+Math.sin(a)*rr,TZ+Math.cos(a)*rr,4,FT+8,FT)}
 // interior (tree-local coordinates): platforms, ramps and rails, switchback like the castle keep: 0 -> 28 -> 56 -> 84
 const ftb=(x0,x1,z0,z1,y0,y1,m,col)=>{fadd(new T.Mesh(new T.BoxGeometry(x1-x0,y1-y0,z1-z0),m),TX+(x0+x1)/2,FT+(y0+y1)/2,TZ+(z0+z1)/2);if(col)fcr(TX+x0,TX+x1,TZ+z0,TZ+z1,FT+y1,FT+y0)};
 const fslab=(x0,x1,z0,z1,top)=>{ftb(x0,x1,z0,z1,top-1.6,top,MPL);FLR.push([TX+x0,TX+x1,TZ+z0,TZ+z1,FT+top,FT+top,0])};
 const fstair=(x0,x1,z0,z1,yA,yB,base)=>{FLR.push([TX+x0,TX+x1,TZ+z0,TZ+z1,FT+yA,FT+yB,1]);const L=z1-z0,n=Math.ceil(L/1.5),dz=L/n,h=z=>yA+(yB-yA)*(z-z0)/L;
  for(let k=0;k<n;k++){const a=z0+k*dz,m=a+dz/2,top=h(m);FST.push([TX+(x0+x1)/2,FT+(base+top)/2,TZ+m,x1-x0,top-base,dz+.05]);if(k%2==0){const b2=Math.min(z1,a+2*dz);fcr(TX+x0,TX+x1,TZ+a,TZ+b2,FT+Math.min(h(a),h(b2))-.6,FT+base)}}};
 fslab(-28,28,-28,-14,28);fslab(17,28,-14,26,28);fslab(-28,28,-28,-14,56);fslab(-28,-17,-14,26,56);fslab(-17,28,-28,10,84);fslab(-28,-17,-28,-14,84);
 fstair(-26,-19,-14,24,28,0,0);fstair(22,28,-14,24,56,28,28);fstair(-28,-22,-14,24,84,56,56);
 for(const r of[[-28,-26.2,-14,-14,28],[-18.8,17,-14,-14,28],[17,17,-14,26,28],[17,28,26,26,28],[-17,21.8,-14,-14,56],[-17,-17,-14,26,56],[-28,-17,26,26,56],[-17,28,10,10,84],[-17,-17,-14,10,84],[-22.2,-17,-14,-14,84]]){ftb(r[0]-.3,r[1]+.3,r[2]-.3,r[3]+.3,r[4],r[4]+1.3,MPL);fcr(TX+r[0]-.3,TX+r[1]+.3,TZ+r[2]-.3,TZ+r[3]+.3,FT+r[4]+2.6,FT+r[4]+.2)}
 // heartwood sap pool, hanging lanterns and two lights
 {const p=new T.Mesh(new T.CircleGeometry(7,32),MTL);p.rotation.x=-PI/2;fadd(p,TX-2,FT+.14,TZ+2);
  for(let k=0;k<20;k++){const a=k*2.4,r=36+(k%3)*1.5,y=8+(k%7)*13;fadd(new T.Mesh(new T.SphereGeometry(.9,8,6),MLN),TX+Math.sin(a)*r,FT+y,TZ+Math.cos(a)*r)}
  for(const l of[[0,12,0,0x7fe0d0,1.6],[0,66,0,0xffb070,1.4]]){const pl=new T.PointLight(l[3],l[4],72,2);pl.position.set(TX+l[0],FT+l[1],TZ+l[2]);scene.add(pl)}}}
// ---- treehouses: a thick trunk, a railed platform with a roof, and a long ramp up from the south ----
function treehouse(x,z){const G=FT,top=G+34;FSITES.push([x,z,70]);
 fadd(new T.Mesh(new T.CylinderGeometry(5,6.5,56,14),barkM(3,4)),x,G+28,z);fcc(x,z,6,G+56,G);
 const pb=(x0,x1,z0,z1,y0,y1,m,c)=>{fadd(new T.Mesh(new T.BoxGeometry(x1-x0,y1-y0,z1-z0),m),(x0+x1)/2,(y0+y1)/2,(z0+z1)/2);if(c)fcr(x0,x1,z0,z1,y1,y0)};
 pb(x-14,x+14,z-14,z+14,top-1.6,top,MPL);FLR.push([x-14,x+14,z-14,z+14,top,top,0]);
 for(const r of[[x-14.3,x-13.7,z-14,z+14],[x+13.7,x+14.3,z-14,z+14],[x-14,x+14,z-14.3,z-13.7],[x-14,x-3.2,z+13.7,z+14.3],[x+3.2,x+14,z+13.7,z+14.3]]){pb(r[0],r[1],r[2],r[3],top,top+1.3,MPL);fcr(r[0],r[1],r[2],r[3],top+2.6,top+.2)}
 for(const sx of[-1,1])for(const sz of[-1,1])pb(x+sx*12.5-.4,x+sx*12.5+.4,z+sz*12.5-.4,z+sz*12.5+.4,top,top+13,MPL);
 for(const s of[-1,1]){const r=new T.Mesh(new T.BoxGeometry(17,.8,30),new T.MeshStandardMaterial({color:0x33422e,roughness:1}));r.rotation.z=-s*.35;fadd(r,x+s*7,top+14.5,z)}
 fadd(new T.Mesh(new T.SphereGeometry(.9,8,6),MLN),x+12,top+2,z+12);fadd(new T.Mesh(new T.SphereGeometry(.9,8,6),MLN),x-12,top+2,z-12);
 const z0=z+14,z1=z+60,L=z1-z0,n=Math.ceil(L/1.5),dz=L/n,hh=zz=>top+(G-top)*(zz-z0)/L;FLR.push([x-3,x+3,z0,z1,top,G,1]);
 for(let k=0;k<n;k++){const a=z0+k*dz,m=a+dz/2,t=hh(m);FST.push([x,(G+t)/2,m,6,t-G,dz+.05]);if(k%2==0){const b2=Math.min(z1,a+2*dz),lo=Math.min(hh(a),hh(b2)),hi=Math.max(hh(a),hh(b2));fcr(x-3,x+3,a,b2,lo-.6,G);fcr(x-3.4,x-3,a,b2,hi+2.2,lo+.2);fcr(x+3,x+3.4,a,b2,hi+2.2,lo+.2)}}}
for(const t of THS)treehouse(t[0],t[1]);
// ---- fallen giants, great stumps and root arches scattered through the forest ----
{const near=(x,z,r)=>FSITES.some(s=>Math.hypot(x-s[0],z-s[1])<s[2]+r),free=(x,z,r)=>FM(x,z)>.95&&Math.hypot(x-TX,z-TZ)>140&&!near(x,z,r)&&!(x>TX+40&&Math.abs(z-FPATH(x))<r);
 for(let i=0,c=0;c<16&&i<600;i++){const x=-1560+R()*1000,z=-650+R()*1100,len=24+R()*38,r=2.2+R()*2.4,ang=R()*PI;if(!free(x,z,len*.6+10))continue;const g=H(x,z),m=new T.Mesh(new T.CylinderGeometry(r,r*1.1,len,10),barkM(3,len/8));m.rotation.set(0,ang,PI/2);fadd(m,x,g+r*.85,z);
  const dx=-Math.cos(ang),dz=Math.sin(ang);for(let t=-len/2+r;t<=len/2-r+.1;t+=r*1.3)fcc(x+dx*t,z+dz*t,r+.2,g+r*2.2,g-2);FSITES.push([x,z,len*.6]);c++}
 const ringT=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=128;const g=cv.getContext('2d');g.fillStyle='#8a6b47';g.fillRect(0,0,128,128);for(let r=60;r>2;r-=5){g.strokeStyle='rgba(60,40,22,'+(.3+Math.random()*.3)+')';g.lineWidth=1+Math.random()*2;g.beginPath();g.arc(64,64,r,0,6.3);g.stroke()}return new T.CanvasTexture(cv)})();
 for(let i=0,c=0;c<12&&i<400;i++){const x=-1560+R()*1000,z=-650+R()*1100,r=5+R()*4,h=6+R()*6;if(!free(x,z,r+12))continue;const g=H(x,z);fadd(new T.Mesh(new T.CylinderGeometry(r*.9,r*1.15,h+3,14),barkM(4,1)),x,g+h/2-1.5,z);
  const cap=new T.Mesh(new T.CircleGeometry(r*.9,24),new T.MeshStandardMaterial({map:ringT,roughness:1}));cap.rotation.x=-PI/2;fadd(cap,x,g+h+.05,z);fcc(x,z,r*1.1,g+h,g-3);FSITES.push([x,z,r+6]);c++}
 for(let i=0,c=0;c<7&&i<400;i++){const x=-1560+R()*1000,z=-650+R()*1100,hd=R()*PI;if(!free(x,z,26))continue;const g=H(x,z),m=new T.Mesh(new T.TorusGeometry(11,2.8,8,20,PI),barkM(6,2));m.rotation.y=hd;fadd(m,x,g,z);
  for(const s of[-1,1]){const fx=x+s*11*Math.cos(hd),fz=z-s*11*Math.sin(hd);fcc(fx,fz,3.4,g+6,g-3)}FSITES.push([x,z,22]);c++}}
{const d=new T.Object3D(),si=new T.InstancedMesh(new T.BoxGeometry(1,1,1),MPL,FST.length);FST.forEach((m,i)=>{d.position.set(m[0],m[1],m[2]);d.scale.set(m[3],m[4],m[5]);d.updateMatrix();si.setMatrixAt(i,d.matrix)});si.castShadow=si.receiveShadow=true;si.frustumCulled=false;scene.add(si)}
// ---- the forest itself: GLB spruces (full model up close, cones in the distance) and the crown of the giant tree ----
function buildForest(tgeo){const m4=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler(),cells={},cone=new T.ConeGeometry(.3,1,6),mlo=new T.MeshStandardMaterial({color:0x2c4637,roughness:1,flatShading:true});
 {const cm=new T.InstancedMesh(tgeo,tm,1);m4.compose(new T.Vector3(TX,FT+210,TZ),q,new T.Vector3(230,230,230));cm.setMatrixAt(0,m4);cm.frustumCulled=false;scene.add(cm)}
 let n=0;for(let i=0;i<40000&&n<5200;i++){const x=-1630+R()*1170,z=-710+R()*1170;if(FM(x,z)<.9||Math.hypot(x-TX,z-TZ)<125||(x>TX+40&&Math.abs(z-FPATH(x))<15)||FSITES.some(s=>Math.hypot(x-s[0],z-s[1])<s[2]))continue;const y=H(x,z);if(Math.abs(H(x+6,z)-y)>4.5||Math.abs(H(x,z+6)-y)>4.5)continue;
  const s=14+R()*R()*24,k=Math.floor(x/100)+','+Math.floor(z/100);(cells[k]??=[]).push([x,y,z,s,R()*6.28]);(FTREES[Math.floor(x/FCH)+','+Math.floor(z/FCH)]??=[]).push([x,z,.05*s+.35]);n++}
 for(const k in cells){const a=cells[k],hi=new T.InstancedMesh(tgeo,tm,a.length),lo=new T.InstancedMesh(cone,mlo,a.length);hi.frustumCulled=lo.frustumCulled=false;
  a.forEach((t,i)=>{e.set(0,t[4],0);q.setFromEuler(e);m4.compose(new T.Vector3(t[0],t[1]+t[3]*.35,t[2]),q,new T.Vector3(t[3],t[3],t[3]));hi.setMatrixAt(i,m4);lo.setMatrixAt(i,m4)});
  const [cx,cz]=k.split(',').map(Number);FCHUNKS.push({hi,lo,cx:(cx+.5)*100,cz:(cz+.5)*100});scene.add(hi);scene.add(lo)}}
function forestUpdate(){for(const c of FCHUNKS){const d=Math.hypot(c.cx-P.x,c.cz-P.z);c.hi.visible=d<120;c.lo.visible=d>=120&&d<390;c.hi.castShadow=d<45}}
treeP.then(buildForest);

