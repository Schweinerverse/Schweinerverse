// trees & rocks
const place=(mesh,n,fn)=>{const m=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler();
 for(let i=0;i<n;i++){let x,z;do{x=(R()-.5)*1300;z=(R()-.5)*1300}while(Math.hypot(x,z)<35||(Math.abs(x-CX)<190&&Math.abs(z-CZ)<190));
  const s=fn(i);e.set(0,R()*6.28,0);q.setFromEuler(e);m.compose(new T.Vector3(x,H(x,z)+s.y,z),q,new T.Vector3(s.x,s.h,s.x));mesh.setMatrixAt(i,m)}
 scene.add(mesh)};
// spruce trees from Spruce1.glb (decimated), chunked instancing
const tm=new T.MeshStandardMaterial({color:0x3c5a4c,roughness:1,side:T.DoubleSide});
async function loadTree(){
 const ab=await (await fetch('tree.glb')).arrayBuffer(),dv=new DataView(ab),jl=dv.getUint32(12,true);
 const js=JSON.parse(new TextDecoder().decode(new Uint8Array(ab,20,jl))),bo=20+jl+8,bv=js.bufferViews,nv=js.accessors[1].count;
 const F=(i,C,n)=>new C(ab,bo+bv[i].byteOffset,n),g=new T.BufferGeometry();
 g.setAttribute('position',new T.BufferAttribute(F(1,Float32Array,nv*3),3));
 g.setAttribute('uv',new T.BufferAttribute(F(2,Float32Array,nv*2),2));
 g.setAttribute('normal',new T.BufferAttribute(F(3,Float32Array,nv*3),3));
 g.setIndex(new T.BufferAttribute(F(0,Uint16Array,js.accessors[0].count),1));
 const url=URL.createObjectURL(new Blob([new Uint8Array(ab,bo+bv[4].byteOffset,bv[4].byteLength)],{type:'image/jpeg'}));
 new T.TextureLoader().load(url,t=>{t.flipY=false;tm.map=t;tm.color.set(0xffffff);tm.needsUpdate=true});
 return g}
tm.onBeforeCompile=sh=>{sh.uniforms.uT=uT;
 sh.vertexShader='uniform float uT;varying float vTy;\n'+sh.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
 vTy=transformed.y;float sw=max(transformed.y+.5,0.);sw*=sw;vec4 iw=instanceMatrix*vec4(transformed,1.);
 transformed.x+=sin(uT*1.5+iw.x*.25+iw.z*.2)*.02*sw;transformed.z+=cos(uT*1.2+iw.z*.25)*.012*sw;`);
 sh.fragmentShader='varying float vTy;\n'+sh.fragmentShader.replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
 vec3 wn=normalize((vec4(normal,0.)*viewMatrix).xyz);float sn=smoothstep(.15,.7,wn.y+(vTy+.5)*.25-.1);
 diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.93,.96,1.),sn*.75);`)
 .replace('#include <lights_fragment_end>',`#include <lights_fragment_end>
 float nd2=dot(normal,normalize((viewMatrix*vec4(vec3(${SV}),0.)).xyz));reflectedLight.indirectDiffuse+=diffuseColor.rgb*vec3(.9,1.,.85)*max(-nd2,0.)*.18;`)};
const CH=100,chunks=[],bk={};
for(let i=0;i<1600;i++){const x=(R()-.5)*1300,z=(R()-.5)*1300;if(Math.hypot(x,z)<35||Math.max(Math.abs(x),Math.abs(z))>520)continue;(bk[Math.floor(x/CH)+','+Math.floor(z/CH)]??=[]).push([x,z,9+R()*7,R()*6.28])}
for(let i=0;i<1100;i++){const x=470+R()*1400,z=-1300+R()*1800,y=H(x,z);if(y>25||Math.abs(H(x+5,z)-y)>3.5||Math.abs(H(x,z+5)-y)>3.5)continue;(bk[Math.floor(x/CH)+','+Math.floor(z/CH)]??=[]).push([x,z,9+R()*8,R()*6.28])}
for(let i=0;i<220;i++){const x=-560+R()*980,z=-1420+R()*900;if(Math.max(Math.abs(x-CX),Math.abs(z-CZ))<350)continue;const rx=CX+35*Math.sin((z+470)*.013)*sm(CZ+170,CZ+330,z);if(Math.abs(x-rx)<16)continue;(bk[Math.floor(x/CH)+','+Math.floor(z/CH)]??=[]).push([x,z,9+R()*8,R()*6.28])} // the marches: far fewer trees
function buildTrees(tgeo){const m4=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler();
for(const k in bk){const a=bk[k],im=new T.InstancedMesh(tgeo,tm,a.length);im.frustumCulled=false;
 a.forEach((t,i)=>{e.set(0,t[3],0);q.setFromEuler(e);m4.compose(new T.Vector3(t[0],H(t[0],t[1])+t[2]*.35,t[1]),q,new T.Vector3(t[2],t[2],t[2]));im.setMatrixAt(i,m4)});
 const [cx,cz]=k.split(',').map(Number);chunks.push({m:im,cx:(cx+.5)*CH,cz:(cz+.5)*CH});scene.add(im)}}
const treeP=loadTree().catch(()=>{tm.color.set(0x2f4a3c);return new T.ConeGeometry(.3,1,7)});treeP.then(buildTrees);
const cItems=[];
for(let d=0;d<360;d+=15){const e=document.createElement('span'),L={0:'N',45:'NE',90:'E',135:'SE',180:'S',225:'SW',270:'W',315:'NW'}[d];e.className='c'+(L?(L.length==1?' c1':' c2'):'');e.textContent=L||'\u00b7';$('ctrack').appendChild(e);cItems.push([e,d])}
function compassUpdate(){const h=(((PI-P.face)*180/PI)%360+360)%360;
 for(const [e,d] of cItems){const x=((d-h+540)%360)-180;e.style.transform='translateX(calc(-50% + '+x*2.4+'px))';e.style.opacity=Math.max(0,1-Math.abs(x)/62)}
 $('cval').textContent=['N','NE','E','SE','S','SW','W','NW'][Math.round(h/45)%8]+' '+Math.round(h)+'\u00b0'}
let areaN='Frostfall Basin';function areaUpdate(){const n=P.x>1850&&P.z<-1950?'Rimeholt':P.x<-470&&P.z>-720?'The Great Forest':P.x<430?(Math.abs(P.x-CX)<176&&Math.abs(P.z-CZ)<176?'Citadel of the Pale Crown':P.z<-1340?'The Sundered Reach':P.z<-520?'The Pale Marches':'Frostfall Basin'):P.x<1100?'The Frostpass':'Spirefall Heights';if(n!=areaN){areaN=n;$('area').textContent=n;msg(n.toUpperCase(),2800)}}
let edgeT=0;function edgeCheck(){edgeT-=1/60;if(edgeT<0&&(P.x<-WL+6||P.z>LIM-6||P.x>XMAX-6||P.z<-ZN+6)){edgeT=5;msg('The storm and the mountains bar the way',2400,'Other regions of Eternal Snow are yet to be opened')}}
function treeUpdate(){if(typeof forestUpdate=='function')forestUpdate();for(const c of chunks){const d=Math.hypot(c.cx-P.x,c.cz-P.z);c.m.visible=d<210;c.m.castShadow=d<45}}
place(new T.InstancedMesh(new T.IcosahedronGeometry(1,0),new T.MeshStandardMaterial({color:0x9aa3ad,roughness:1,flatShading:true}),200),200,()=>({x:1+R()*3,h:.6+R()*1.5,y:.1}));
{const n=520,im=new T.InstancedMesh(new T.IcosahedronGeometry(1,0),new T.MeshStandardMaterial({color:0x6d6a68,roughness:1,flatShading:true}),n),m4=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler();let c=0; // the Sundered Reach: boulders, rock pillars and the gate ring at the end of the causeway
 for(let i=0;i<n*4&&c<n;i++){const x=-560+R()*1000,z=-2550+R()*1200,y=H(x,z);if(RVN(x,z)>.01||NM(x,z)<.9)continue;const s=1.5+R()*R()*8;e.set(R()*6,R()*6,R()*6);q.setFromEuler(e);m4.compose(new T.Vector3(x,y+s*.2,z),q,new T.Vector3(s*1.3,s*.8,s));im.setMatrixAt(c++,m4)}im.count=c;scene.add(im)}
{const n=70,im=new T.InstancedMesh(new T.CylinderGeometry(.6,1,1,7),new T.MeshStandardMaterial({color:0x77746f,roughness:1,flatShading:true}),n),m4=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler();let c=0;
 for(let i=0;i<n*5&&c<n;i++){const x=-560+R()*1000,z=-2550+R()*1150,y=H(x,z);if(RVN(x,z)>.01||NM(x,z)<.9||Math.abs(x-PX(z))<20)continue;const r=2+R()*3.5,h=10+R()*26;e.set(0,R()*6,0);q.setFromEuler(e);m4.compose(new T.Vector3(x,y+h*.45,z),q,new T.Vector3(r,h,r));im.setMatrixAt(c++,m4)}im.count=c;scene.add(im)}
{const gx=PX(-2420),gz=-2420,im=new T.InstancedMesh(new T.CylinderGeometry(.6,1,1,8),new T.MeshStandardMaterial({color:0x8a8782,roughness:1,flatShading:true}),9),m4=new T.Matrix4(),q=new T.Quaternion();
 for(let k=0;k<8;k++){const a=k*PI/4,x=gx+Math.sin(a)*20,z=gz+Math.cos(a)*20;m4.compose(new T.Vector3(x,H(x,z)+9,z),q,new T.Vector3(3,18,3));im.setMatrixAt(k,m4)}
 m4.compose(new T.Vector3(gx,H(gx,gz)+17,gz),q,new T.Vector3(4,34,4));im.setMatrixAt(8,m4);scene.add(im)}
{const n=260,im=new T.InstancedMesh(new T.IcosahedronGeometry(1,0),new T.MeshStandardMaterial({color:0x4a4a50,roughness:1,flatShading:true}),n),m4=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler();let c=0; // boulders strewn across the mountain floors
 for(let i=0;i<n*3&&c<n;i++){const x=450+R()*1600,z=-1400+R()*1650,y=H(x,z);if(Math.abs(H(x+4,z)-y)>2.5||Math.abs(H(x,z+4)-y)>2.5)continue;const s=1+R()*R()*7;e.set(R()*6,R()*6,R()*6);q.setFromEuler(e);m4.compose(new T.Vector3(x,y+s*.25,z),q,new T.Vector3(s*1.3,s*.8,s));im.setMatrixAt(c++,m4)}im.count=c;scene.add(im)}
