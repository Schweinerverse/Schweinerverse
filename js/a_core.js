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
const LIM=575,XMAX=2540,ZN=1440,CX=-60,CZ=-980,PL=10; // castle centre and plateau height
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
const H=(x,z)=>{const e=Math.min(3,Math.max(0,(-x-480)/100,(x-2450)/100,(z-480)/100,(-z-1350)/100));
 const h=H0(x,z)+e*e*45*(1+.4*Math.sin(x*.045+z*.03)*Math.cos(z*.05))+MTN(x,z),w=1-sm(215,330,Math.max(Math.abs(x-CX),Math.abs(z-CZ)));return h+(PL-h)*w};
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
const tg=new T.PlaneGeometry(3400,2200,525,340);tg.rotateX(-PI/2);tg.translate(1000,0,-400);
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
  col[i*3]=r;col[i*3+1]=g;col[i*3+2]=b}
 tg.setAttribute('color',new T.BufferAttribute(col,3))}
const gm=new T.MeshStandardMaterial({color:0xeef3fa,roughness:.85,vertexColors:true});
const GN=`float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hs(i),hs(i+vec2(1.,0.)),f.x),mix(hs(i+vec2(0.,1.)),hs(i+vec2(1.,1.)),f.x),f.y);}
float hh(vec2 p){return vn(p*.35)*.6+vn(p*1.3)*.25+sin((p.x*.8+p.y*.55)*2.5+vn(p*.2)*6.)*.12+vn(p*5.)*.08;}`;
gm.onBeforeCompile=sh=>{sh.uniforms.uT=uT;
 sh.vertexShader='varying vec3 vWP;varying vec3 vWN;\n'+sh.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvWP=(modelMatrix*vec4(transformed,1.)).xyz;vWN=normalize(mat3(modelMatrix)*normal);');
 sh.fragmentShader='uniform float uT;varying vec3 vWP;varying vec3 vWN;\n'+GN+sh.fragmentShader
  .replace('#include <color_fragment>',`#include <color_fragment>
  diffuseColor.rgb*=mix(vec3(.78,.87,.98),vec3(1.),smoothstep(.2,.8,vn(vWP.xz*.08)+vn(vWP.xz*.6)*.2));
  float rk=smoothstep(.14,.32,1.-vWN.y+vn(vWP.xz*.3)*.08)*smoothstep(3.,20.,vWP.y);rk*=(1.-smoothstep(450.,950.,vWP.x))*(1.-.5*smoothstep(500.,1300.,vWP.y));diffuseColor.rgb=mix(diffuseColor.rgb,mix(vec3(.26,.28,.33),vec3(.5,.47,.45),vn(vec2(vWP.y*.04,vWP.x*.01+vWP.z*.01)))*(.8+.4*vn(vWP.xz*1.5)),rk);`)
  .replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
  float vd=distance(vWP,cameraPosition);float fd=1.-smoothstep(25.,110.,vd);if(fd>.01){vec2 wq=vWP.xz;float e0=.06,h0=hh(wq);
  vec3 gw=vec3(-(hh(wq+vec2(e0,0.))-h0)/e0,0.,-(hh(wq+vec2(0.,e0))-h0)/e0);
  normal=normalize(normal+(mat3(viewMatrix)*gw)*.45*fd);}`)
  .replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
  float hsp=hs(floor(vWP.xz*45.));float sp=step(.982,hsp)*(.5+.5*sin(uT*2.5+hsp*60.))*(1.-smoothstep(10.,60.,vd));
  totalEmissiveRadiance+=vec3(.9,.95,1.)*sp*.8;`)
  .replace('#include <lights_fragment_end>',`#include <lights_fragment_end>
  float ndlS=dot(normal,normalize((viewMatrix*vec4(vec3(${SV}),0.)).xyz));reflectedLight.indirectDiffuse+=diffuseColor.rgb*vec3(.32,.5,.85)*(1.-clamp(ndlS,0.,1.))*.22;
  float fres=pow(1.-clamp(dot(normal,normalize(vViewPosition)),0.,1.),4.);reflectedLight.indirectSpecular+=vec3(.7,.8,1.)*fres*.12;`)};
const ground=new T.Mesh(tg,gm);ground.receiveShadow=true;scene.add(ground);

