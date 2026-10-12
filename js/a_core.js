const T=THREE,PI=Math.PI,$=id=>document.getElementById(id);
const SUN=new T.Vector3(-.55,.4,.45).normalize(),SV=SUN.toArray().map(x=>x.toFixed(4)).join(',');
{const F=T.ShaderChunk; // sun-scattered fog: tints distant haze toward the sun
 if(F.fog_pars_vertex.includes('varying float vFogDepth;')&&F.fog_vertex.includes('vFogDepth = - mvPosition.z;')&&F.fog_pars_fragment.includes('varying float vFogDepth;')&&F.fog_fragment.includes('fogDensity')){
 F.fog_pars_vertex=F.fog_pars_vertex.replace('varying float vFogDepth;','varying float vFogDepth;varying vec3 vFogDir;');
 F.fog_vertex=F.fog_vertex.replace('vFogDepth = - mvPosition.z;','vFogDepth = - mvPosition.z;vFogDir=(vec4(mvPosition.xyz,0.)*viewMatrix).xyz;');
 F.fog_pars_fragment=F.fog_pars_fragment.replace('varying float vFogDepth;','varying float vFogDepth;varying vec3 vFogDir;');
 F.fog_fragment=`#ifdef USE_FOG
 float fgd=fogDensity*exp(-max(cameraPosition.y+vFogDir.y,0.)*.011);float fogFactor=1.0-exp(-fgd*fgd*vFogDepth*vFogDepth);
 float sgl=pow(max(dot(normalize(vFogDir),vec3(${SV})),0.),5.);
 gl_FragColor.rgb=mix(gl_FragColor.rgb,mix(fogColor,vec3(1.,.84,.64),sgl*.6),fogFactor);
#endif`}}
const LIM=575,XMAX=2540,ZN=2600,CX=-60,CZ=-980,PL=10; // castle centre and plateau height
const H0=(x,z)=>{const f=Math.min(1,Math.max(0,(Math.hypot(x,z)-25)/60));return f*(Math.sin(x*.012)*Math.cos(z*.015)*7+Math.sin(x*.035+z*.022)*2.2+Math.sin(z*.06)*Math.sin(x*.05)*.8)};
const sm=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
const hsh=(x,z)=>{let h=Math.imul(x,374761393)+Math.imul(z,668265263);h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967295};
const n2=(x,z)=>{const ix=Math.floor(x),iz=Math.floor(z),fx=x-ix,fz=z-iz,u=fx*fx*(3-2*fx),v=fz*fz*(3-2*fz),a=hsh(ix,iz),b=hsh(ix+1,iz),c=hsh(ix,iz+1),d=hsh(ix+1,iz+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};
const rid=(x,z)=>{let a=.5,f=1,s=0,w=1;for(let i=0;i<5;i++){let n=1-Math.abs(n2(x*f,z*f)*2-1);n*=n;s+=n*a*w;w=Math.min(1,n*2);a*=.5;f*=2.1}return s};
// Eastern mountain province: ridged peaks with two winding passes (zc1 main, zc2 north-east branch)
const zc1=x=>-450-450*sm(420,1300,x)+110*Math.sin((x-400)*.004)+45*Math.sin(x*.011); // the pass climbs north-east, then dead-ends in the range
const PK=[[700,150,650,420],[800,-250,850,520],[1000,200,750,450],[1200,-550,1350,700],[1450,-100,1550,650],[1650,-750,1950,800],[1750,150,1350,600],[2000,-350,2250,850],[2050,-950,2050,800],[1300,-1150,1550,700],[900,-950,1150,650],[2300,50,1550,650],[1650,-1300,1850,650],[2300,-950,2450,850]]; // x,z,height,radius
const MTN=(x,z)=>{const F=sm(380,520,x);if(F<=0)return 0;const d=Math.abs(z-zc1(x)),m0=sm(120,650,d),m=1-(1-m0)*(1-sm(1750,1950,x));if(m<=0)return 0;
 let a=0;for(const p of PK){const q=Math.hypot(x-p[0],z-p[1])/p[3];if(q<1){const c=p[2]*Math.pow(1-q,1.6);a+=c*c*c}}
 const cone=Math.cbrt(a),base=250*sm(450,1300,x),body=base+cone*.85*(.75+.5*rid(x*.003+4,z*.003)),q=Math.min(1,body/400);
 return(body+q*(rid(x*.011+7,z*.011-3)*110+rid(x*.024-5,z*.024+2)*28+40*n2(x*.01,z*.01)))*m*F}; // crags scale with height
// The Sundered Reach (north of the castle): winding ravines, chasms and rocky ground, crossed by one narrow stone causeway
const NM=(x,z)=>sm(-1330,-1450,z)*(1-sm(480,780,x)),PX=z=>CX+60*Math.sin((z+1300)*.0045)*sm(-1310,-1500,z); // area mask, causeway centreline
const CHASMS=[[-300,-1700,110],[150,-1900,130],[-420,-2100,100],[40,-2250,120],[-200,-2450,90]];
function RVN(x,z){const m=NM(x,z);if(m<=0)return 0;const wx=x+60*n2(x*.004+8,z*.004),wz=z+60*n2(x*.004,z*.004+3);
 const a=Math.abs(n2(wx*.0035+11,wz*.0035-4)-.5),b=Math.abs(n2(wx*.0072-3,wz*.0072+9)-.5);let c=Math.max(1-sm(.018,.055,a),(1-sm(.012,.04,b))*.8);
 for(const k of CHASMS){const d=Math.hypot(x-k[0],z-k[1])/k[2];if(d<1)c=Math.max(c,1-sm(.55,1,d))}
 return c*m*sm(7,14,Math.abs(x-PX(z)))}
const NH=(x,z)=>{const m=NM(x,z);if(m<=0)return 0;return m*(n2(x*.005+2,z*.005+7)-.5)*50-RVN(x,z)*(110+60*sm(-1400,-2200,z))};
const H=(x,z)=>{const e=Math.min(3,Math.max(0,(-x-480)/100,(x-2450)/100,(z-480)/100,(-z-2500)/100));
 const h=H0(x,z)+e*e*45*(1+.4*Math.sin(x*.045+z*.03)*Math.cos(z*.05))+MTN(x,z)+NH(x,z),w=1-sm(215,330,Math.max(Math.abs(x-CX),Math.abs(z-CZ)));return h+(PL-h)*w};
const R=Math.random;
const scene=new T.Scene();scene.background=new T.Color(0xb9c6d3);scene.fog=new T.FogExp2(0xb9c6d3,.017);const uT={value:0};
const cam=new T.PerspectiveCamera(65,innerWidth/innerHeight,.2,3500);
const ren=new T.WebGLRenderer({antialias:true});ren.setSize(innerWidth,innerHeight);ren.setPixelRatio(Math.min(devicePixelRatio,2));
ren.shadowMap.enabled=true;ren.shadowMap.type=T.PCFSoftShadowMap;ren.toneMapping=T.ACESFilmicToneMapping;ren.toneMappingExposure=1.05;document.body.appendChild(ren.domElement);
scene.add(new T.HemisphereLight(0xcfdcf0,0x7f92ab,.55));
const sun=new T.DirectionalLight(0xffe9cf,1.5);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.bias=-.0004;sun.shadow.normalBias=.04;
Object.assign(sun.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:160});scene.add(sun,sun.target);
const rim=new T.DirectionalLight(0x86a6e8,.45);rim.position.set(-SUN.x*50,SUN.y*20+10,-SUN.z*50);scene.add(rim);
const elight=new T.PointLight(0xff3b2a,0,16,2);scene.add(elight);
const skyU={hz:{value:new T.Color(0xb9c6d3)},zn:{value:new T.Color(0x5b6f8c)},sd:{value:SUN},tm:uT};
const sky=new T.Mesh(new T.SphereGeometry(700,32,16),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,fog:false,uniforms:skyU,
 vertexShader:'varying vec3 vD;void main(){vD=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:`uniform vec3 hz,zn,sd;uniform float tm;varying vec3 vD;
 float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hs(i),hs(i+vec2(1.,0.)),f.x),mix(hs(i+vec2(0.,1.)),hs(i+vec2(1.,1.)),f.x),f.y);}
 float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*vn(p);p=p*2.03+7.1;a*=.5;}return s;}
 void main(){vec3 d=normalize(vD);float h=clamp(d.y,0.,1.);vec3 c=mix(hz,zn,pow(h,.45));float mu=max(dot(d,sd),0.);
  vec2 cp=d.xz/(d.y+.18)*1.4+vec2(tm*.02,tm*.012);float cl=smoothstep(.35,.85,fbm(cp)+.2*fbm(cp*3.));cl*=smoothstep(-.05,.25,d.y);
  vec3 cc=mix(vec3(.62,.68,.76),vec3(.96,.95,.93),pow(mu,.5)*.8+h*.3);c=mix(c,cc,cl*.85);
  c+=vec3(1.,.8,.55)*(pow(mu,4.)*.22+pow(mu,64.)*.5*(1.-cl*.7));c=mix(c,hz,pow(1.-h,4.)*.6);gl_FragColor=vec4(c,1.);}`}));
sky.renderOrder=-1;sky.frustumCulled=false;scene.add(sky);

// terrain
const tg=new T.PlaneGeometry(3400,3500,525,540);tg.rotateX(-PI/2);tg.translate(1000,0,-1050);
const tp=tg.attributes.position;for(let i=0;i<tp.count;i++)tp.setY(i,H(tp.getX(i),tp.getZ(i)));
tg.computeVertexNormals();
{const nA=tg.attributes.normal,col=new Float32Array(tp.count*3);
 for(let i=0;i<tp.count;i++){const x=tp.getX(i),y=tp.getY(i),z=tp.getZ(i),ny=nA.getY(i),mm=sm(450,950,x);let r=1,g=1,b=1;
  if(mm>0){const sl=650+350*n2(x*.01,z*.01),pat=sm(.45,.65,n2(x*.02,z*.02)+n2(x*.15,z*.15)*.25)*sm(.7,.95,ny)*.6,
    snw=Math.max(sm(sl-200,sl+150,y)*sm(.5,.85,ny+n2(x*.15,z*.15)*.2),pat),band=.5+.5*Math.sin(y*.07+n2(x*.01,z*.01)*6),t=band*.8+n2(x*.5,z*.5)*.3,sc=sm(.8,.95,ny)*.4;
   let rr=.24+.26*t,rg=.24+.2*t,rb=.26+.12*t;rr+=(.5-rr)*sc;rg+=(.5-rg)*sc;rb+=(.52-rb)*sc;
   r=1+((rr+(.93-rr)*snw)-1)*mm;g=1+((rg+(.96-rg)*snw)-1)*mm;b=1+((rb+(1-rb)*snw)-1)*mm}
  {const dx=Math.abs(x-CX),dz=Math.abs(z-CZ);let k=0,v=.5; // cobbled courtyard and the road up to the gate
   if(dx<174&&dz<174){k=1;v=.42+.16*n2(x*.35,z*.35)}else if(z<-470&&z>CZ+170){const rx=CX+35*Math.sin((z+470)*.013)*sm(CZ+170,CZ+330,z);k=(1-sm(5,9,Math.abs(x-rx)))*.9}
   if(k>0){r+=(v-r)*k;g+=(v-g)*k;b+=(v*1.03-b)*k}}
  {const nm=NM(x,z);if(nm>0){const rv=RVN(x,z),cl=Math.abs(x-PX(z)),cut=Math.max(sm(.04,.5,rv),sm(.82,.55,ny)), // ravine walls and steep ground are bare strata
    st=sm(.52,.64,n2(x*.011+5,z*.011)+.3*n2(x*.06,z*.06))*nm,band=.5+.5*Math.sin(y*.16+n2(x*.02,z*.02)*5),sv=.28+.14*band+.05*n2(x*.4,z*.4);   // stone patches in the snow
   const k=Math.max(cut*nm,st*.9);r+=(sv-r)*k;g+=(sv*.98-g)*k;b+=(sv*1.04-b)*k;
   if(z<-1150&&z>-2430&&cl<5){const f=1-sm(3,5,cl);r+=(.5-r)*f*.9;g+=(.5-g)*f*.9;b+=(.52-b)*f*.9}}} // flagstones along the causeway
  col[i*3]=r;col[i*3+1]=g;col[i*3+2]=b}
 tg.setAttribute('color',new T.BufferAttribute(col,3))}
// ground: a tiling canvas texture (snow drifts, ripples, flecks) used as colour AND bump map, so the snow has visible grain at any distance
const gt=(()=>{const S=512,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');g.fillStyle='#cdd8e4';g.fillRect(0,0,S,S);
 const wrap=f=>{for(const ox of[-S,0,S])for(const oy of[-S,0,S])f(ox,oy)};
 for(let i=0;i<260;i++){const x=Math.random()*S,y=Math.random()*S,r=14+Math.random()*46,v=Math.random()<.5?255:140,a=.06+Math.random()*.12;wrap((ox,oy)=>{const gr=g.createRadialGradient(x+ox,y+oy,0,x+ox,y+oy,r);gr.addColorStop(0,'rgba('+v+','+v+','+(v+6)+','+a+')');gr.addColorStop(1,'rgba('+v+','+v+','+(v+6)+',0)');g.fillStyle=gr;g.fillRect(x+ox-r,y+oy-r,2*r,2*r)})}
 for(let i=0;i<14;i++){const y=Math.random()*S;g.strokeStyle='rgba(255,255,255,.2)';g.lineWidth=2+Math.random()*3;g.beginPath();for(let x=0;x<=S;x+=16){const yy=y+Math.sin(x/S*PI*6+i)*9;if(x==0)g.moveTo(x,yy);else g.lineTo(x,yy)}g.stroke()}
 for(let i=0;i<5200;i++){const v=Math.random()<.35?255:110+Math.random()*60|0;g.fillStyle='rgba('+v+','+v+','+(v+8)+','+(.1+Math.random()*.18)+')';g.fillRect(Math.random()*S,Math.random()*S,1+Math.random()*2,1+Math.random()*2)}
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(3400/22,3500/22);t.anisotropy=8;return t})();
const gm=new T.MeshStandardMaterial({color:0xe9eff6,roughness:.9,vertexColors:true,map:gt,bumpMap:gt,bumpScale:2.2});
const ground=new T.Mesh(tg,gm);ground.receiveShadow=true;scene.add(ground);

