import{_ as or,a as yn,s as T,A as Eu,b as Cu,c as Pu,d as Nu,e as ur,I as Ru,t as Tu,T as cr,p as Tt,g as Zn,f as yt,h as dr,i as Be,j as it,k as ot,l as lr,m as Bu,n as Wu,o as Ou,q as $u,r as Lu,u as Hu,v as zu,w as pr,x as Bt,y as Vu,z as wn,B as Gu,C as ju,R as Uu,D as qu,E as Se,F as mr,S as Ju,G as Xu,H as Yu,J as ve,K as Ku,L as Xa,M as Qu,N as fr,O as hr,P as gr,Q as Zu,U as ec,V as br,W as tc,X as nc,Y as ac,Z as rc,$ as _r,a0 as sc,a1 as ic,a2 as $n,a3 as oc,a4 as uc,a5 as yr,a6 as wr,a7 as Wt,a8 as vr,a9 as Ir,aa as ea,ab as xr,ac as kr,ad as cc,ae as dc,af as Sr,ag as Mr,ah as Dr,ai as Fr,aj as lc,ak as Ar,al as Er,am as pc,an as Cr,ao as ta,ap as Pr,aq as Nr,ar as mc,as as Rr,at as fc,au as hc,av as gc,aw as bc,ax as _c,ay as yc,az as wc,aA as Tr,aB as vc,aC as Ic,aD as Br,aE as Wr,aF as Or,aG as $r,aH as xc,aI as kc,aJ as Sc,aK as Mc,aL as Dc,aM as Fc,aN as Ac,aO as Ec,aP as Lr,aQ as Cc,aR as Pc,aS as Hr,aT as Nc,aU as Rc,aV as Tc,aW as Bc,aX as Wc,aY as Oc,aZ as zr,a_ as Vr,a$ as Gr,b0 as $c,b1 as jr,b2 as Lc,b3 as Hc,b4 as zc,b5 as Vc,b6 as Gc,b7 as Ur,b8 as qr,b9 as jc,ba as Jr,bb as Xr,bc as Yr,bd as Uc,be as qc,bf as Jc,bg as Kr,bh as Qr,bi as Zr,bj as Xc,bk as es,bl as Yc,bm as Kc,bn as Qc,bo as ts,bp as Zc,bq as ns,br as as,bs as ed,bt as td,bu as nd,bv as ad,bw as rd,bx as sd,by as rs,bz as ss,bA as is,bB as os,bC as us,bD as cs,bE as id,bF as od,bG as ud,bH as ds,bI as na,bJ as ls,bK as cd,bL as dd,bM as ld,bN as pd,bO as md,bP as fd,bQ as hd,bR as gd,bS as bd,bT as _d,bU as yd,bV as wd,bW as ps,bX as vd,bY as Id,bZ as xd,b_ as kd,b$ as Sd,c0 as Ya,c1 as Md,c2 as Dd,c3 as Fd,c4 as Ad,c5 as Ed,c6 as ms,c7 as Cd,c8 as Pd,c9 as Nd,ca as Rd,cb as Td,cc as fs,cd as hs,ce as Bd,cf as Wd,cg as Od,ch as $d,ci as Ld,cj as Hd,ck as zd,cl as Vd,cm as Gd,cn as gs,co as jd,cp as Ud,cq as bs,cr as _s,cs as ys,ct as ws,cu as qd,cv as Jd,cw as Xd,cx as Yd,cy as Kd,cz as Vn,cA as at,cB as Qd,cC as Zd,cD as el,cE as Ka,cF as Qa,cG as tl,cH as nl,cI as al,cJ as rl,cK as sl}from"./tf-B4t4PpI5.js";import{c as Za,g as vs}from"./maps-CvRfrq9E.js";function il(e,t){for(var r=0;r<t.length;r++){const i=t[r];if(typeof i!="string"&&!Array.isArray(i)){for(const s in i)if(s!=="default"&&!(s in e)){const n=Object.getOwnPropertyDescriptor(i,s);n&&Object.defineProperty(e,s,n.get?n:{enumerable:!0,get:()=>i[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var j;(function(e){e[e.float32=0]="float32",e[e.int32=1]="int32",e[e.bool=2]="bool",e[e.string=3]="string",e[e.complex64=4]="complex64"})(j||(j={}));var Nt;(function(e){e[e.linear=0]="linear",e[e.relu=1]="relu",e[e.relu6=2]="relu6",e[e.prelu=3]="prelu",e[e.leakyrelu=4]="leakyrelu",e[e.sigmoid=5]="sigmoid",e[e.elu=6]="elu"})(Nt||(Nt={}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Is;function ol(e){Is=e.wasm.cwrap(or,null,["number","array","number","number","array","number","number","number","number","number","number","number","number"])}function ul(e){const{inputs:t,backend:r,attrs:i}=e,{a:s,b:n,bias:u,preluActivationWeights:c}=t;if(s.dtype!=="float32"||n.dtype!=="float32")throw new Error("_FusedMatMul for non non-float32 tensors not yet supported.");const{transposeA:d,transposeB:o,activation:a,leakyreluAlpha:l}=i,m=r.dataIdMap.get(s.dataId).id,p=r.dataIdMap.get(n.dataId).id;let g=0;if(u!=null){const W=r.dataIdMap.get(u.dataId);if(W.shape.length!==1)throw new Error(`_FusedMatMul only supports rank-1 bias but got rank ${W.shape.length}.`);g=W.id}const b=c==null?0:r.dataIdMap.get(c.dataId).id,I=Nt[a];if(I==null)throw new Error(`${a} activation not yet supported for FusedConv2D in the wasm backend.`);const v=d?s.shape[2]:s.shape[1],_=o?n.shape[1]:n.shape[2],y=yn(s.shape.slice(0,-2),n.shape.slice(0,-2)),k=r.makeOutput([...y,v,_],s.dtype),A=r.dataIdMap.get(k.dataId).id,E=new Uint8Array(new Int32Array(s.shape).buffer),R=new Uint8Array(new Int32Array(n.shape).buffer);return Is(m,E,s.shape.length,p,R,n.shape.length,d,o,I,g,b,l||0,A),k}const cl={kernelName:or,backendName:"wasm",setupFunc:ol,kernelFunc:ul};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function G(e,t){let r;function i(n){r=n.wasm.cwrap(e,null,["number","number","number"])}function s(n){const{backend:u,inputs:{x:c}}=n,d=u.dataIdMap.get(c.dataId).id,o=u.makeOutput(c.shape,t||c.dtype),a=u.dataIdMap.get(o.dataId).id;return T(o.shape)===0||r(d,j[c.dtype],a),o}return{kernelName:e,backendName:"wasm",setupFunc:i,kernelFunc:s}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dl=G(Eu);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ll=G(Cu);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pl=G(Pu);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ae(e,t,r){let i;function s(u){i=u.wasm.cwrap(e,null,["number","array","number","number","array","number","number","number"])}function n(u){const{backend:c,inputs:d}=u,{a:o,b:a}=d,l=c.dataIdMap.get(o.dataId).id,m=c.dataIdMap.get(a.dataId).id,p=r??o.dtype,g=yn(o.shape,a.shape),b=c.makeOutput(g,p);if(T(g)===0)return b;const I=new Uint8Array(new Int32Array(o.shape).buffer),v=new Uint8Array(new Int32Array(a.shape).buffer),_=c.dataIdMap.get(b.dataId).id;return i(l,I,o.shape.length,m,v,a.shape.length,j[o.dtype],_),b}return{kernelName:e,backendName:"wasm",setupFunc:s,kernelFunc:n}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ml=ae(Nu);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let xs;function fl(e){xs=e.wasm.cwrap(ur,null,["array","number","number","number"])}function hl(e){const{inputs:t,backend:r}=e,i=r.makeOutput(t[0].shape,t[0].dtype);if(T(i.shape)===0)return i;const s=t.map(c=>r.dataIdMap.get(c.dataId).id),n=new Uint8Array(new Int32Array(s).buffer),u=r.dataIdMap.get(i.dataId).id;return xs(n,s.length,j[i.dtype],u),i}const gl={kernelName:ur,backendName:"wasm",setupFunc:fl,kernelFunc:hl};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vn(e){const{inputs:{x:t},backend:r}=e;if(t.dtype==="string")return Tu(r.readSync(t.dataId),t.shape,t.dtype);const i=r.makeOutput(t.shape,t.dtype),s=r.typedArrayFromHeap(t);return r.typedArrayFromHeap(i).set(s),i}const bl={kernelName:Ru,backendName:"wasm",kernelFunc:vn};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ks;function _l(e){ks=e.wasm.cwrap(cr,null,["number","array","number","number","number","array","number"])}function Ve(e){const{inputs:t,backend:r,attrs:i}=e,[s,n]=wl(t.x.shape,i.perm);let u=!0;for(let g=0;g<n.length;g++)n[g]!==g&&(u=!1);const c=yl(t.x.shape,i.perm),d={dataId:t.x.dataId,shape:s,dtype:t.x.dtype};if(u){const g=vn({inputs:t,backend:r});return g.shape=c,g}const o=r.makeOutput(c,d.dtype),a=r.dataIdMap.get(d.dataId).id,l=r.dataIdMap.get(o.dataId).id,m=new Uint8Array(new Int32Array(n).buffer),p=new Uint8Array(new Int32Array(d.shape).buffer);return ks(a,p,d.shape.length,j[d.dtype],l,m,n.length),o}function yl(e,t){const r=new Array(e.length);for(let i=0;i<r.length;i++)r[i]=e[t[i]];return r}function wl(e,t){const r=[],i=[];for(let s=0;s<e.length;++s)e[s]!==1&&r.push(e[s]),e[t[s]]!==1&&i.push(t[s]);for(let s=0;s<i.length;++s){let n=-1;for(let u=0;u<i.length;++u)i[u]>=s&&(n===-1||i[n]>i[u])&&(n=u);i[n]=s}return[r,i]}const vl={kernelName:cr,backendName:"wasm",kernelFunc:Ve,setupFunc:_l};/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function je(e,t,r){const i=e.shape,s=e.shape.length,n=Tt(t,i);let u=n;const c=Zn(u,s);let d=null,o=!1;if(c!=null){const a=new Array(s);for(let p=0;p<a.length;p++)a[p]=i[c[p]];u=yt(u.length,s),d=Ve({inputs:{x:e},attrs:{perm:c},backend:r});const l=r.dataIdMap.get(e.dataId).id;r.dataIdMap.get(d.dataId).id!==l&&(o=!0)}return{transposed:d,originalAxes:n,axes:u,inputWasTransposed:o}}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ss;function Il(e){Ss=e.wasm.cwrap(dr,null,["number, number, number"])}function xl(e){const{backend:t,inputs:r,attrs:i}=e,{axis:s,keepDims:n}=i,{x:u}=r;let d=t.dataIdMap.get(u.dataId).id,o=u;const{transposed:a,axes:l,originalAxes:m,inputWasTransposed:p}=je(u,s,t);if(p){const y=t.dataIdMap.get(a.dataId).id;o=a,d=y}const g=o.shape.length;Be("all",l,g);const[b,I]=it(o.shape,l),v=T(I),_=t.makeOutput(b,u.dtype);if(T(o.shape)!==0){const y=t.dataIdMap.get(_.dataId).id;Ss(d,v,y)}if(p&&t.disposeData(a.dataId),n){const y=ot(_.shape,m);_.shape=y}return _}const kl={kernelName:dr,backendName:"wasm",setupFunc:Il,kernelFunc:xl};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ms;function Sl(e){Ms=e.wasm.cwrap(lr,null,["number, number, number"])}function Ml(e){const{backend:t,inputs:r,attrs:i}=e,{axis:s,keepDims:n}=i,{x:u}=r;let d=t.dataIdMap.get(u.dataId).id,o=u;const{transposed:a,axes:l,originalAxes:m,inputWasTransposed:p}=je(u,s,t);if(p){const y=t.dataIdMap.get(a.dataId).id;o=a,d=y}const g=o.shape.length;Be("any",l,g);const[b,I]=it(o.shape,l),v=T(I),_=t.makeOutput(b,u.dtype);if(T(o.shape)!==0){const y=t.dataIdMap.get(_.dataId).id;Ms(d,v,y)}if(p&&t.disposeData(a.dataId),n){const y=ot(_.shape,m);_.shape=y}return _}const Dl={kernelName:lr,backendName:"wasm",setupFunc:Sl,kernelFunc:Ml};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ds(e){let t;function r(s){t=s.wasm.cwrap(e,null,["number","number","number","number","number"])}function i(s){const{backend:n,inputs:u,attrs:c}=s,{axis:d}=c,{x:o}=u,a=n.dataIdMap.get(o.dataId).id;let l=a,m=o;const{transposed:p,axes:g,inputWasTransposed:b}=je(o,d,n);if(b){const A=n.dataIdMap.get(p.dataId).id;A!==a&&(m=p,l=A)}const I=m.shape.slice(0,-1),v=n.makeOutput(I,"int32"),_=n.dataIdMap.get(v.dataId).id,y=T(v.shape),k=m.shape[g[0]];return t(l,j[m.dtype],y,k,_),b&&n.disposeData(p.dataId),v}return{kernelName:e,backendName:"wasm",setupFunc:r,kernelFunc:i}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fl=Ds(Bu);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Al=Ds(Wu);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const El=G(Ou);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Cl=G($u);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pl=G(Lu);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nl=ae(Hu);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rl=G(zu);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Fs;function Tl(e){Fs=e.wasm.cwrap(pr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Bl(e){const{inputs:t,attrs:r,backend:i}=e,s=t.x,n=i.dataIdMap.get(s.dataId).id,{filterSize:u,strides:c,pad:d,dimRoundingMode:o}=r,a=Bt(s.shape,u,c,1,d,o),l=a.filterHeight,m=a.filterWidth,p=a.padInfo.top,g=a.padInfo.right,b=a.padInfo.bottom,I=a.padInfo.left,v=a.strideHeight,_=a.strideWidth,y=a.inChannels;if(a.dataFormat!=="channelsLast")throw new Error(`wasm backend does not support dataFormat:'${a.dataFormat}'. Please use 'channelsLast'.`);if(a.dilationWidth!==1||a.dilationHeight!==1)throw new Error(`was backend only supports average pooling with dilation = [1, 1], got [${a.dilationHeight}, ${a.dilationWidth}].`);const k=i.makeOutput(a.outShape,"float32"),A=i.dataIdMap.get(k.dataId).id;return Fs(n,s.shape[0],s.shape[1],s.shape[2],l,m,p,g,b,I,v,_,y,A),k}const Wl={kernelName:pr,backendName:"wasm",setupFunc:Tl,kernelFunc:Bl};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let As;function Ol(e){As=e.wasm.cwrap("AvgPool3D",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function $l(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{filterSize:n,strides:u,pad:c,dimRoundingMode:d,dataFormat:o}=i,a=wn(s.shape,n,u,1,c,d,o),l=r.makeOutput(a.outShape,s.dtype);return As(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(l.dataId).id,a.batchSize,a.inChannels,a.inDepth,a.inHeight,a.inWidth,a.outDepth,a.outHeight,a.outWidth,a.strideDepth,a.strideHeight,a.strideWidth,a.dilationDepth,a.dilationHeight,a.dilationWidth,a.effectiveFilterDepth,a.effectiveFilterHeight,a.effectiveFilterWidth,a.padInfo.front,a.padInfo.top,a.padInfo.left),l}const Ll={kernelName:Vu,backendName:"wasm",setupFunc:Ol,kernelFunc:$l};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Es;function Hl(e){Es=e.wasm.cwrap("AvgPool3DGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function zl(e){const{inputs:t,backend:r,attrs:i}=e,{dy:s,input:n}=t,{filterSize:u,strides:c,pad:d,dimRoundingMode:o}=i,a=wn(n.shape,u,c,1,d,o),l=r.makeOutput(n.shape,n.dtype);return Es(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(l.dataId).id,a.batchSize,a.inChannels,a.inDepth,a.inHeight,a.inWidth,a.outDepth,a.outHeight,a.outWidth,a.strideDepth,a.strideHeight,a.strideWidth,a.dilationDepth,a.dilationHeight,a.dilationWidth,a.effectiveFilterDepth,a.effectiveFilterHeight,a.effectiveFilterWidth,a.padInfo.front,a.padInfo.top,a.padInfo.left,a.filterDepth,a.filterHeight,a.filterWidth),l}const Vl={kernelName:Gu,backendName:"wasm",setupFunc:Hl,kernelFunc:zl};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Cs;function Gl(e){Cs=e.wasm.cwrap("AvgPoolGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function jl(e){const{inputs:t,backend:r,attrs:i}=e,{dy:s,input:n}=t,{filterSize:u,strides:c,pad:d}=i,o=Bt(n.shape,u,c,1,d),a=r.makeOutput(n.shape,n.dtype);return Cs(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(a.dataId).id,o.batchSize,o.inChannels,o.inHeight,o.inWidth,o.outHeight,o.outWidth,o.strideHeight,o.strideWidth,o.dilationHeight,o.dilationWidth,o.effectiveFilterHeight,o.effectiveFilterWidth,o.padInfo.top,o.padInfo.left,o.filterHeight,o.filterWidth),a}const Ul={kernelName:ju,backendName:"wasm",setupFunc:Gl,kernelFunc:jl};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function me(e){const{inputs:t,attrs:r}=e,{x:i}=t,{shape:s}=r,n=T(i.shape),u=qu(s,n);return Se(n===T(u),()=>`new shape: ${u}, old shape: ${i.shape}. New shape and old shape must have the same number of elements.`),e.backend.incRef(i.dataId),{dataId:i.dataId,shape:u,dtype:i.dtype}}const ql={kernelName:Uu,backendName:"wasm",kernelFunc:me};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ps;function Jl(e){Ps=e.wasm.cwrap(mr,null,["number","array","number","number","array","number","number","number","number"])}function Xl(e){const{inputs:t,backend:r,attrs:i}=e,{a:s,b:n}=t,{transposeA:u,transposeB:c}=i;if(s.dtype!=="float32"||n.dtype!=="float32")throw new Error("BatchMatMul for non non-float32 tensors not yet supported.");const d=s.shape.length,o=n.shape.length,a=u?s.shape[d-2]:s.shape[d-1],l=c?n.shape[o-1]:n.shape[o-2],m=u?s.shape[d-1]:s.shape[d-2],p=c?n.shape[o-2]:n.shape[o-1],g=s.shape.slice(0,-2),b=n.shape.slice(0,-2),I=T(g),v=T(b),y=yn(s.shape.slice(0,-2),n.shape.slice(0,-2)).concat([m,p]);Se(a===l,()=>`Error in matMul: inner shapes (${a}) and (${l}) of Tensors with shapes ${s.shape} and ${n.shape} and transposeA=${u} and transposeB=${c} must match.`);const k=u?[I,a,m]:[I,m,a],A=c?[v,p,l]:[v,l,p],E=me({inputs:{x:s},backend:r,attrs:{shape:k}}),R=me({inputs:{x:n},backend:r,attrs:{shape:A}}),W=r.dataIdMap.get(E.dataId).id,H=r.dataIdMap.get(R.dataId).id,B=u?E.shape[2]:E.shape[1],V=c?R.shape[1]:R.shape[2],U=Math.max(I,v),Z=r.makeOutput([U,B,V],E.dtype),pe=r.dataIdMap.get(Z.dataId).id,K=new Uint8Array(new Int32Array(E.shape).buffer),re=new Uint8Array(new Int32Array(R.shape).buffer);return Ps(W,K,E.shape.length,H,re,R.shape.length,u,c,pe),r.disposeData(E.dataId),r.disposeData(R.dataId),Z.shape=y,Z}const Yl={kernelName:mr,backendName:"wasm",setupFunc:Jl,kernelFunc:Xl};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function st(e){const{inputs:{x:t},attrs:{begin:r,size:i},backend:s}=e,[n,u]=Xu(t,r,i),c=Yu(t.shape,n,u),d=s.readSync(t.dataId),o=s.makeOutput(u,t.dtype),a=ve(t.shape),l=s.dataIdMap.get(o.dataId);if(c){const g=Ku(n,a);return t.dtype==="string"?l.stringBytes=d.slice(g,g+T(u)):s.typedArrayFromHeap(o).set(d.subarray(g,g+T(u))),o}if(t.dtype==="string"){const g=Xa(d,n,u,t.shape,t.dtype);return l.stringBytes=g,o}const m=s.typedArrayFromHeap(o),p=t.shape.length;if(p===2)Kl(d,a[0],m,n,u);else if(p===3)Ql(d,a[0],a[1],m,n,u);else if(p===4)Zl(d,a[0],a[1],a[2],m,n,u);else{const g=Xa(d,n,u,t.shape,t.dtype);m.set(g)}return o}function Kl(e,t,r,i,s){let n=0;const u=i[0],c=i[1],d=u+s[0];for(let o=u;o<d;o++){const a=o*t+c;r.set(e.subarray(a,a+s[1]),n),n+=s[1]}}function Ql(e,t,r,i,s,n){let u=0;const c=s[0],d=s[1],o=s[2],a=c+n[0],l=d+n[1];for(let m=c;m<a;m++)for(let p=d;p<l;p++){const g=m*t+p*r+o;i.set(e.subarray(g,g+n[2]),u),u+=n[2]}}function Zl(e,t,r,i,s,n,u){let c=0;const d=n[0],o=n[1],a=n[2],l=d+u[0],m=o+u[1],p=a+u[2],g=n[3];for(let b=d;b<l;b++)for(let I=o;I<m;I++)for(let v=a;v<p;v++){const _=b*t+I*r+v*i+g;s.set(e.subarray(_,_+u[3]),c),c+=u[3]}}const ep={kernelName:Ju,backendName:"wasm",kernelFunc:st};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tp(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{blockShape:n,crops:u}=i,c=n.reduce((v,_)=>v*_),d=fr(s.shape,n,c),o=hr(d.length,n.length),a=gr(s.shape,n,c),l=Zu(u,n.length),m=ec(a,u,n.length),p=me({inputs:{x:s},backend:r,attrs:{shape:d}}),g=Ve({inputs:{x:p},backend:r,attrs:{perm:o}}),b=me({inputs:{x:g},backend:r,attrs:{shape:a}}),I=st({inputs:{x:b},backend:r,attrs:{begin:l,size:m}});return r.disposeData(p.dataId),r.disposeData(g.dataId),r.disposeData(b.dataId),I}const np={kernelName:Qu,backendName:"wasm",kernelFunc:tp};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ns;function ap(e){Ns=e.wasm.cwrap(br,null,["number","number","boolean","number","number","number"])}function rp(e){const{backend:t,inputs:r,attrs:i}=e,{x:s,weights:n}=r,{size:u}=i,c=n.shape.reduce((l,m)=>l*m,1)!==0,d=s.shape.length===1?[u]:[s.shape[0],u],o=t.makeOutput(d,n.dtype);function a(l){return t.dataIdMap.get(l.dataId).id}return Ns(a(s),u,c,a(n),j[n.dtype],a(o)),o}const sp={kernelName:br,backendName:"wasm",setupFunc:ap,kernelFunc:rp};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ip=ae(tc);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function op(e){const{inputs:t,backend:r}=e,{s0:i,s1:s}=t,n=r.typedArrayFromHeap(i),u=r.typedArrayFromHeap(s),c=yn(Array.from(n),Array.from(u));return r.makeOutput([c.length],"int32",void 0,new Int32Array(c))}const up={kernelName:nc,backendName:"wasm",kernelFunc:op};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ue(e){const{inputs:{x:t},attrs:{dtype:r},backend:i}=e,s=i.makeOutput(t.shape,r),n=i.typedArrayFromHeap(t);return i.typedArrayFromHeap(s).set(n),s}const cp={kernelName:ac,backendName:"wasm",kernelFunc:Ue};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dp=G(rc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Rs;function lp(e){Rs=e.wasm.cwrap(_r,null,["number","number","number","number"])}function pp(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{clipValueMin:n,clipValueMax:u}=i,c=r.dataIdMap.get(s.dataId).id,d=r.makeOutput(s.shape,s.dtype),o=r.dataIdMap.get(d.dataId).id;return Rs(c,n,u,o),d}const mp={kernelName:_r,backendName:"wasm",setupFunc:lp,kernelFunc:pp};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ts(e){const{inputs:t,backend:r}=e,i=Tt(e.attrs.axis,t[0].shape)[0],s=t.map(p=>p.shape);ic(s,i);let n=$n(t.map(p=>p.shape),i);const u=t.filter(p=>T(p.shape)>0);if(u.length===1)return vn({inputs:{x:u[0]},backend:r});const c=r.makeOutput(n,t[0].dtype);if(T(n)===0)return c;if(u[0].dtype==="string"){const p=u.map(y=>{const A=[-1,T(y.shape.slice(i))];return me({inputs:{x:y},backend:r,attrs:{shape:A}})}),g=p.map(y=>({vals:r.readSync(y.dataId),shape:y.shape}));n=$n(p.map(y=>y.shape),1);const b=p[0].shape[0]===1,I=oc(g,n,t[0].dtype,b),v=$n(u.map(y=>y.shape),i);c.shape=v;const _=r.dataIdMap.get(c.dataId);return _.stringBytes=uc(I),p.forEach(y=>r.disposeData(y.dataId)),c}const d=T(u[0].shape.slice(0,i));let o=0;const a=u.map(p=>{const g=T(p.shape.slice(i));return o+=g,g}),l=u.map(p=>r.typedArrayFromHeap(p)),m=r.typedArrayFromHeap(c);for(let p=0;p<d;p++){let g=p*o;for(let b=0;b<l.length;b++){const I=a[b],v=p*I,_=l[b].subarray(v,v+I);m.set(_,g),g+=I}}return c}const fp={kernelName:sc,backendName:"wasm",kernelFunc:Ts};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Bs;function hp(e){Bs=e.wasm.cwrap(yr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function gp(e){const{inputs:t,attrs:r,backend:i}=e,{x:s,filter:n}=t,u=i.dataIdMap.get(s.dataId).id,c=i.dataIdMap.get(n.dataId).id,{strides:d,dilations:o,pad:a,dimRoundingMode:l,dataFormat:m}=r,p=wr(m),g=Wt(s.shape,n.shape,d,o,a,l,!1,p),b=g.filterHeight,I=g.filterWidth,v=g.padInfo.top,_=g.padInfo.right,y=g.padInfo.bottom,k=g.padInfo.left,A=g.dilationHeight,E=g.dilationWidth,R=g.strideHeight,W=g.strideWidth,H=g.inChannels,B=g.outChannels,V=g.padInfo.type==="SAME"?1:0;if(g.dataFormat!=="channelsLast")throw new Error(`wasm backend Conv2D does not support dataFormat:'${g.dataFormat}'. Please use 'channelsLast'.`);const U=i.makeOutput(g.outShape,"float32"),Z=i.dataIdMap.get(U.dataId).id;return Bs(u,s.shape[0],s.shape[1],s.shape[2],c,b,I,v,_,y,k,V,A,E,R,W,H,B,Z),U}const bp={kernelName:yr,backendName:"wasm",setupFunc:hp,kernelFunc:gp};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ws;function _p(e){Ws=e.wasm.cwrap(vr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function yp(e){const{backend:t,inputs:r,attrs:i}=e,{dy:s,filter:n}=r,{strides:u,pad:c,dataFormat:d,dimRoundingMode:o,inputShape:a}=i,l=1,m=wr(d),p=Wt(a,n.shape,u,l,c,o,!1,m),{batchSize:g,filterHeight:b,filterWidth:I,inChannels:v,inHeight:_,inWidth:y,outChannels:k,outHeight:A,outWidth:E,strideHeight:R,strideWidth:W}=p,H=b-1-p.padInfo.top,B=I-1-p.padInfo.left,V=p.dataFormat==="channelsLast",U=ve(p.inShape),Z=ve(s.shape),[pe,K,re]=ve(n.shape),be=U[0],q=V?U[1]:U[2],xe=V?U[2]:1,fe=V?1:U[1],he=Z[0],Ae=V?Z[1]:Z[2],ie=V?Z[2]:1,ct=V?1:Z[1],dt=t.makeOutput(p.inShape,"float32"),It=t.dataIdMap.get(dt.dataId).id,xt=t.dataIdMap.get(s.dataId).id,te=t.dataIdMap.get(n.dataId).id;return Ws(xt,te,g,b,I,_,y,v,A,E,k,R,W,H,B,pe,K,re,be,q,xe,fe,he,Ae,ie,ct,It),dt}const wp={kernelName:vr,backendName:"wasm",setupFunc:_p,kernelFunc:yp};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Os;function vp(e){Os=e.wasm.cwrap(Ir,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Ip(e){const{inputs:t,backend:r,attrs:i}=e,{x:s,filter:n}=t,{strides:u,pad:c,dilations:d}=i;if(s.dtype!=="float32")throw new Error(`Tensor x must have dtype float32, got ${s.dtype}`);if(n.dtype!=="float32")throw new Error(`Tensor filter must have dtype float32, got ${n.dtype}`);const o=ea(s.shape,n.shape,u,d,c),a=r.makeOutput(o.outShape,s.dtype);return Os(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(a.dataId).id,o.batchSize,o.inDepth,o.inHeight,o.inWidth,o.inChannels,o.outDepth,o.outHeight,o.outWidth,o.outChannels,o.strideDepth,o.strideHeight,o.strideWidth,o.dilationDepth,o.dilationHeight,o.dilationWidth,o.filterDepth,o.filterHeight,o.filterWidth,o.padInfo.front,o.padInfo.top,o.padInfo.left),a}const xp={kernelName:Ir,backendName:"wasm",setupFunc:vp,kernelFunc:Ip};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let $s;function kp(e){$s=e.wasm.cwrap(xr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Sp(e){const{inputs:t,backend:r,attrs:i}=e,{x:s,dy:n}=t,{strides:u,pad:c,filterShape:d}=i;if(s.dtype!=="float32")throw new Error(`Tensor dy must have dtype float32, got ${s.dtype}`);if(n.dtype!=="float32")throw new Error(`Tensor filter must have dtype float32, got ${n.dtype}`);const o=ea(s.shape,d,u,1,c),a=r.makeOutput(o.filterShape,n.dtype);return $s(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(a.dataId).id,o.batchSize,o.inDepth,o.inHeight,o.inWidth,o.inChannels,o.outDepth,o.outHeight,o.outWidth,o.outChannels,o.strideDepth,o.strideHeight,o.strideWidth,o.dilationDepth,o.dilationHeight,o.dilationWidth,o.filterDepth,o.filterHeight,o.filterWidth,o.padInfo.front,o.padInfo.top,o.padInfo.left),a}const Mp={kernelName:xr,backendName:"wasm",setupFunc:kp,kernelFunc:Sp};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ls;function Dp(e){Ls=e.wasm.cwrap(kr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Fp(e){const{inputs:t,backend:r,attrs:i}=e,{dy:s,filter:n}=t,{pad:u,strides:c,inputShape:d}=i;if(s.dtype!=="float32")throw new Error(`Tensor dy must have dtype float32, got ${s.dtype}`);if(n.dtype!=="float32")throw new Error(`Tensor filter must have dtype float32, got ${n.dtype}`);const o=ea(d,n.shape,c,1,u),a=r.makeOutput(o.inShape,s.dtype);return Ls(r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(a.dataId).id,o.batchSize,o.inDepth,o.inHeight,o.inWidth,o.inChannels,o.outDepth,o.outHeight,o.outWidth,o.outChannels,o.strideDepth,o.strideHeight,o.strideWidth,o.dilationDepth,o.dilationHeight,o.dilationWidth,o.filterDepth,o.filterHeight,o.filterWidth,o.padInfo.front,o.padInfo.top,o.padInfo.left),a}const Ap={kernelName:kr,backendName:"wasm",setupFunc:Dp,kernelFunc:Fp};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ep=G(cc);/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Cp=G(dc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Gn;(function(e){e[e.bilinear=0]="bilinear",e[e.nearest=1]="nearest"})(Gn||(Gn={}));let Hs;function Pp(e){Hs=e.wasm.cwrap(Sr,null,["number","number","number","number","array","number","number","number","number","number"])}function Np(e){const{backend:t,inputs:r,attrs:i}=e,{method:s,extrapolationValue:n,cropSize:u}=i,{image:c,boxes:d,boxInd:o}=r,a=d.shape[0],[l,m]=u,p=[a,l,m,c.shape[3]];let g=t.dataIdMap.get(c.dataId),b;c.dtype!=="float32"&&(b=Ue({backend:t,inputs:{x:c},attrs:{dtype:"float32"}}),g=t.dataIdMap.get(b.dataId));const I=g.id,v=t.dataIdMap.get(d.dataId).id,_=t.dataIdMap.get(o.dataId).id,y=t.makeOutput(p,"float32"),k=t.dataIdMap.get(y.dataId).id,A=new Uint8Array(new Int32Array(c.shape).buffer);return Hs(I,v,_,a,A,l,m,Gn[s],n,k),b!=null&&t.disposeData(b.dataId),y}const Rp={kernelName:Sr,backendName:"wasm",setupFunc:Pp,kernelFunc:Np};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let zs;function Tp(e){zs=e.wasm.cwrap(Mr,null,["number","number","number","number","number","number"])}function Bp(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{axis:n,exclusive:u,reverse:c}=i,d=s.shape.length;Se(s.dtype==="float32"||s.dtype==="int32",()=>`cumprod does not support ${s.dtype} tensors in the WASM backend`);const o=Zn([n],d);let a=s;o!==null&&(a=Ve({inputs:{x:s},attrs:{perm:o},backend:r}));const l=yt(1,d)[0];Be("cumprod",[l],d);const m=r.makeOutput(a.shape,a.dtype),p=a.shape[l],g=r.dataIdMap.get(a.dataId).id,b=r.dataIdMap.get(m.dataId).id;zs(g,u?1:0,c?1:0,p,b,j[s.dtype]);let I=m;if(o!==null){const v=Dr(o);I=Ve({inputs:{x:m},attrs:{perm:v},backend:r}),r.disposeData(a.dataId),r.disposeData(m.dataId)}return I}const Wp={kernelName:Mr,backendName:"wasm",setupFunc:Tp,kernelFunc:Bp};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Vs;function Op(e){Vs=e.wasm.cwrap(Fr,null,["number","number","number","number","number","number"])}function $p(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{axis:n,exclusive:u,reverse:c}=i,d=s.shape.length;Se(s.dtype==="float32"||s.dtype==="int32",()=>`cumsum does not support ${s.dtype} tensors in the WASM backend`);const o=Zn([n],d);let a=s;o!==null&&(a=Ve({inputs:{x:s},attrs:{perm:o},backend:r}));const l=yt(1,d)[0];Be("cumsum",[l],d);const m=r.makeOutput(a.shape,a.dtype),p=a.shape[l],g=r.dataIdMap.get(a.dataId).id,b=r.dataIdMap.get(m.dataId).id;Vs(g,u?1:0,c?1:0,p,b,j[s.dtype]);let I=m;if(o!==null){const v=Dr(o);I=Ve({inputs:{x:m},attrs:{perm:v},backend:r}),r.disposeData(a.dataId),r.disposeData(m.dataId)}return I}const Lp={kernelName:Fr,backendName:"wasm",setupFunc:Op,kernelFunc:$p};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Gs;function Hp(e){Gs=e.wasm.cwrap("DenseBincount",null,["number","array","number","number","boolean","number","number","boolean","number"])}function zp(e){const{backend:t,inputs:r,attrs:i}=e,{x:s,weights:n}=r,{size:u,binaryOutput:c}=i,d=n.shape.reduce((m,p)=>m*p,1)!==0,o=s.shape.length===1?[u]:[s.shape[0],u],a=t.makeOutput(o,n.dtype);function l(m){return t.dataIdMap.get(m.dataId).id}return Gs(l(s),new Uint8Array(new Int32Array(s.shape).buffer),s.shape.length,u,d,l(n),j[n.dtype],c,l(a)),a}const Vp={kernelName:lc,backendName:"wasm",setupFunc:Hp,kernelFunc:zp};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let js;function Gp(e){js=e.wasm.cwrap(Ar,null,["number","number","number","array","number","array","array","number","number"])}function jp(e){const{backend:t,inputs:r,attrs:i}=e,{x:s}=r,{blockSize:n,dataFormat:u}=i,c=s.shape[0],d=u==="NHWC"?s.shape[1]:s.shape[2],o=u==="NHWC"?s.shape[2]:s.shape[3],a=u==="NHWC"?s.shape[3]:s.shape[1],l=d*n,m=o*n,p=a/(n*n),g=u==="NHWC"?[c,l,m,p]:[c,p,l,m],b=t.makeOutput(g,"float32"),v=t.dataIdMap.get(s.dataId).id,_=new Uint8Array(new Int32Array(ve(s.shape)).buffer),y=new Uint8Array(new Int32Array(g).buffer),k=new Uint8Array(new Int32Array(ve(g)).buffer),A=t.dataIdMap.get(b.dataId).id;return js(v,n,u==="NHWC"?1:0,_,s.shape.length-1,y,k,g.length,A),b}const Up={kernelName:Ar,backendName:"wasm",setupFunc:Gp,kernelFunc:jp};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Us;function qp(e){Us=e.wasm.cwrap(Er,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Jp(e){const{inputs:t,attrs:r,backend:i}=e,{x:s,filter:n}=t,u=i.dataIdMap.get(s.dataId).id,c=i.dataIdMap.get(n.dataId).id,{strides:d,dilations:o,pad:a,dimRoundingMode:l}=r,m=o??[1,1],p=Wt(s.shape,n.shape,d,m,a,l,!0),g=p.filterHeight,b=p.filterWidth,I=p.padInfo.top,v=p.padInfo.right,_=p.padInfo.bottom,y=p.padInfo.left,k=p.dilationHeight,A=p.dilationWidth,E=p.strideHeight,R=p.strideWidth,W=p.inChannels,H=p.outChannels,B=p.padInfo.type==="SAME"?1:0;if(p.dataFormat!=="channelsLast")throw new Error(`wasm backend DepthwiseConv2dNative does not support dataFormat:'${p.dataFormat}'. Please use 'channelsLast'.`);const V=i.makeOutput(p.outShape,"float32"),U=i.dataIdMap.get(V.dataId).id;return Us(u,s.shape[0],s.shape[1],s.shape[2],c,g,b,I,v,_,y,B,k,A,E,R,W,H,U),V}const Xp={kernelName:Er,backendName:"wasm",setupFunc:qp,kernelFunc:Jp};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let qs;function Yp(e){qs=e.wasm.cwrap("Diag",null,["number","number","number","number"])}function Kp(e){const{inputs:t,backend:r}=e,{x:i}=t,s=T(i.shape),n=r.makeOutput([...i.shape,...i.shape],i.dtype);return qs(r.dataIdMap.get(i.dataId).id,j[i.dtype],s,r.dataIdMap.get(n.dataId).id),n}const Qp={kernelName:pc,backendName:"wasm",setupFunc:Yp,kernelFunc:Kp};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Js;function Zp(e){Js=e.wasm.cwrap(Cr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function em(e){const{inputs:t,backend:r,attrs:i}=e,{x:s,filter:n}=t,{strides:u,pad:c,dilations:d}=i;if(s.dtype!==n.dtype)throw new Error(`Dilation2D error: x must have the same dtype as filter. Got ${s.dtype} and ${n.dtype}`);const o=ta(s.shape,n.shape,u,c,"NHWC",d),a=r.makeOutput(o.outShape,s.dtype);return Js(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(a.dataId).id,j[s.dtype],o.batchSize,o.inChannels,o.inHeight,o.inWidth,o.outHeight,o.outWidth,o.strideHeight,o.strideWidth,o.dilationHeight,o.dilationWidth,o.filterHeight,o.filterWidth,o.padInfo.top,o.padInfo.left),a}const tm={kernelName:Cr,backendName:"wasm",setupFunc:Zp,kernelFunc:em};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Xs;function nm(e){Xs=e.wasm.cwrap(Pr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function am(e){const{inputs:t,backend:r,attrs:i}=e,{x:s,filter:n,dy:u}=t,{strides:c,pad:d,dilations:o}=i;if(s.dtype!==n.dtype||s.dtype!==u.dtype)throw new Error(`Dilation2DBackpropFilter error: x must have the same dtype as filter and dy. Got ${s.dtype}, ${n.dtype}, and ${u.dtype}`);const a=ta(s.shape,n.shape,c,d,"NHWC",o),l=r.makeOutput(n.shape,n.dtype);return Xs(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(u.dataId).id,r.dataIdMap.get(l.dataId).id,j[s.dtype],a.batchSize,a.inChannels,a.inHeight,a.inWidth,a.outHeight,a.outWidth,a.strideHeight,a.strideWidth,a.dilationHeight,a.dilationWidth,a.filterHeight,a.filterWidth,a.padInfo.top,a.padInfo.left),l}const rm={kernelName:Pr,backendName:"wasm",setupFunc:nm,kernelFunc:am};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ys;function sm(e){Ys=e.wasm.cwrap(Nr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function im(e){const{inputs:t,backend:r,attrs:i}=e,{x:s,filter:n,dy:u}=t,{strides:c,pad:d,dilations:o}=i;if(s.dtype!==n.dtype||s.dtype!==u.dtype)throw new Error(`Dilation2DBackpropInput error: x must have the same dtype as filter and dy. Got ${s.dtype}, ${n.dtype}, and ${u.dtype}`);const a=ta(s.shape,n.shape,c,d,"NHWC",o),l=r.makeOutput(s.shape,s.dtype);return Ys(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(u.dataId).id,r.dataIdMap.get(l.dataId).id,j[s.dtype],a.batchSize,a.inChannels,a.inHeight,a.inWidth,a.outHeight,a.outWidth,a.strideHeight,a.strideWidth,a.dilationHeight,a.dilationWidth,a.filterHeight,a.filterWidth,a.padInfo.top,a.padInfo.left),l}const om={kernelName:Nr,backendName:"wasm",setupFunc:sm,kernelFunc:im};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const um=G(mc);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ks;function cm(e){Ks=e.wasm.cwrap(Rr,null,["number","number","number"])}function dm(e){const{inputs:t,backend:r}=e,{dy:i,y:s}=t,n=r.makeOutput(s.shape,"float32"),u=c=>r.dataIdMap.get(c.dataId).id;return Ks(u(s),u(i),u(n)),n}const lm={kernelName:Rr,backendName:"wasm",setupFunc:cm,kernelFunc:dm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pm=!1,mm=ae(fc,pm,"bool");/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fm=G(hc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hm=G(gc,"float32");/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jn(e){const{inputs:t,attrs:r,backend:i}=e,{input:s}=t,{dim:n}=r,u=s.shape.length,c=s.shape.slice();let d=n;return n<0&&(Se(-(u+1)<=n,()=>`Axis must be in the interval [${-(u+1)}, ${u}]`),d=u+n+1),c.splice(d,0,1),me({inputs:{x:s},backend:i,attrs:{shape:c}})}const gm={kernelName:bc,backendName:"wasm",kernelFunc:jn};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bm=G(_c,"float32");/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qs(e){const{attrs:{shape:t,value:r},backend:i}=e;let{attrs:{dtype:s}}=e;s=s||wc(r);const n=i.makeOutput(t,s);return i.typedArrayFromHeap(n).fill(r),n}const _m={kernelName:yc,backendName:"wasm",kernelFunc:Qs};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Zs;function ym(e){Zs=e.wasm.cwrap(Tr,null,["number","number","number","number","number","number"])}function wm(e){const{inputs:t,backend:r}=e,{image:i}=t,s=r.makeOutput(i.shape,i.dtype),n=r.dataIdMap.get(i.dataId).id,u=r.dataIdMap.get(s.dataId).id,[c,d,o,a]=i.shape;return Zs(n,c,d,o,a,u),s}const vm={kernelName:Tr,backendName:"wasm",kernelFunc:wm,setupFunc:ym};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Im=G(vc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xm=ae(Ic);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ei;function km(e){ei=e.wasm.cwrap(Br,null,["number","number","number","number","number","number","number"])}function Sm(e){const{backend:t,inputs:r,attrs:i}=e,{varianceEpsilon:s}=i,{x:n,mean:u,variance:c,offset:d,scale:o}=r,a=t.dataIdMap.get(n.dataId).id,l=t.dataIdMap.get(u.dataId).id,m=t.dataIdMap.get(c.dataId).id,p=d!=null?t.dataIdMap.get(d.dataId).id:0,g=o!=null?t.dataIdMap.get(o.dataId).id:0,b=t.makeOutput(n.shape,n.dtype);if(T(n.shape)===0)return b;const I=t.dataIdMap.get(b.dataId).id;return ei(a,l,m,p,g,s,I),b}const Mm={kernelName:Br,backendName:"wasm",setupFunc:km,kernelFunc:Sm};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ti;function Dm(e){ti=e.wasm.cwrap(Wr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Fm(e){const{inputs:t,attrs:r,backend:i}=e,{x:s,filter:n,bias:u,preluActivationWeights:c}=t,{strides:d,pad:o,dilations:a,dataFormat:l,dimRoundingMode:m,activation:p,leakyreluAlpha:g}=r,b=Wt(s.shape,n.shape,d,a,o,m),I=Nt[p];if(I==null)throw new Error(`${p} activation not yet supported for FusedConv2D in the wasm backend.`);const v=i.dataIdMap.get(s.dataId).id,_=i.dataIdMap.get(n.dataId).id,y=b.outChannels;let k=0;if(u!=null){const ie=i.dataIdMap.get(u.dataId);if(ie.shape.length!==1)throw new Error(`FusedConv2D only supports rank-1 bias but got rank ${ie.shape.length}.`);if(ie.shape[0]!==y)throw new Error(`FusedConv2D bias shape (${ie.shape}) does not match the number of output channels (${y})`);k=ie.id}const A=b.filterHeight,E=b.filterWidth,R=b.padInfo.top,W=b.padInfo.right,H=b.padInfo.bottom,B=b.padInfo.left,V=b.dilationHeight,U=b.dilationWidth,Z=b.strideHeight,pe=b.strideWidth,K=b.inChannels,re=b.padInfo.type==="SAME"?1:0,be=b.batchSize,q=b.inHeight,xe=b.inWidth;if(l!=="NHWC")throw new Error(`wasm backend FusedConv2D does not support dataFormat:'${l}'. Please use 'NHWC'.`);const fe=i.makeOutput(b.outShape,"float32"),he=i.dataIdMap.get(fe.dataId).id,Ae=c==null?0:i.dataIdMap.get(c.dataId).id;return ti(v,be,q,xe,_,A,E,k,R,W,H,B,re,V,U,Z,pe,K,y,I,Ae,g||0,he),fe}const Am={kernelName:Wr,backendName:"wasm",setupFunc:Dm,kernelFunc:Fm};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ni;function Em(e){ni=e.wasm.cwrap(Or,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Cm(e){const{inputs:t,attrs:r,backend:i}=e,{x:s,filter:n,bias:u,preluActivationWeights:c}=t,{strides:d,pad:o,dilations:a,dataFormat:l,dimRoundingMode:m,activation:p,leakyreluAlpha:g}=r,b=Wt(s.shape,n.shape,d,a,o,m,!0),I=Nt[p];if(I==null)throw new Error(`${p} activation not yet supported for FusedDepthwiseConv2D in the wasm backend.`);const v=i.dataIdMap.get(s.dataId).id,_=i.dataIdMap.get(n.dataId).id,y=b.outChannels;let k=0;if(u!=null){const ie=i.dataIdMap.get(u.dataId);if(ie.shape.length!==1)throw new Error(`FusedDepthwiseConv2D only supports rank-1 bias but got rank ${ie.shape.length}.`);if(ie.shape[0]!==y)throw new Error(`FusedDepthwiseConv2D bias shape (${ie.shape}) does not match the number of output channels (${y})`);k=ie.id}const A=b.filterHeight,E=b.filterWidth,R=b.padInfo.top,W=b.padInfo.right,H=b.padInfo.bottom,B=b.padInfo.left,V=b.dilationHeight,U=b.dilationWidth,Z=b.strideHeight,pe=b.strideWidth,K=b.inChannels,re=b.padInfo.type==="SAME"?1:0,be=b.batchSize,q=b.inHeight,xe=b.inWidth;if(l!=="NHWC")throw new Error(`wasm backend FusedDepthwiseConv2D does not support dataFormat:'${l}'. Please use 'NHWC'.`);const fe=i.makeOutput(b.outShape,"float32"),he=i.dataIdMap.get(fe.dataId).id,Ae=c==null?0:i.dataIdMap.get(c.dataId).id;return ni(v,be,q,xe,_,A,E,k,R,W,H,B,re,V,U,Z,pe,K,y,I,Ae,g||0,he),fe}const Pm={kernelName:Or,backendName:"wasm",setupFunc:Em,kernelFunc:Cm};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ai;function Nm(e){ai=e.wasm.cwrap($r,null,["number","number","number","number","number","number","array","number"])}function Rm(e){const{backend:t,inputs:r}=e,{params:i,indices:s}=r,[n,u,c,d]=xc(i,s),o=t.makeOutput(n,i.dtype);if(u===0)return o;const a=s.shape,l=a[a.length-1],p=t.dataIdMap.get(i.dataId).id,b=t.dataIdMap.get(s.dataId).id,I=new Uint8Array(new Int32Array(d).buffer),v=t.dataIdMap.get(o.dataId).id;return ai(p,j[i.dtype],b,u,l,c,I,v),o}const Tm={kernelName:$r,backendName:"wasm",setupFunc:Nm,kernelFunc:Rm};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ri;function Bm(e){ri=e.wasm.cwrap("Gather",null,["number","number","array","number","number","number","array","number"])}function Wm(e){const{backend:t,inputs:r,attrs:i}=e,{x:s,indices:n}=r,{axis:u,batchDims:c}=i,d=Tt(u,s.shape)[0],o=t.readSync(n.dataId),a=s.shape[d];for(let H=0;H<o.length;++H){const B=o[H];Se(B<=a-1&&B>=0,()=>`GatherV2: the index value ${B} is not in [0, ${a-1}]`)}const l=Sc(s,n,d,c),m=me({inputs:{x:s},attrs:{shape:[l.batchSize,l.outerSize,l.dimSize,l.sliceSize]},backend:t}),p=T(n.shape),g=me({inputs:{x:n},attrs:{shape:[l.batchSize,p/l.batchSize]},backend:t}),b=[l.batchSize,l.outerSize,p/l.batchSize,l.sliceSize],I=t.makeOutput(b,s.dtype);if(T(s.shape)===0)return I;const v=m.shape.length-1,y=t.dataIdMap.get(m.dataId).id,A=t.dataIdMap.get(g.dataId).id,E=t.dataIdMap.get(I.dataId).id,R=new Uint8Array(new Int32Array(ve(m.shape)).buffer),W=new Uint8Array(new Int32Array(ve(b)).buffer);return ri(y,j[s.dtype],R,v,A,l.batchSize,W,E),t.disposeData(m.dataId),t.disposeData(g.dataId),I.shape=l.outputShape,I}const Om={kernelName:kc,backendName:"wasm",setupFunc:Bm,kernelFunc:Wm};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $m=!1,Lm=ae(Mc,$m,"bool");/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Hm=!1,zm=ae(Dc,Hm,"bool");/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vm=G(Fc,"bool");/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gm=G(Ac,"bool");/**
 * @license
 * Copyright 2022 The TensorFlow Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jm=G(Ec,"bool");/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let si;function Um(e){si=e.wasm.cwrap(Lr,null,["number","number","number","number"])}function qm(e){const{inputs:{x:t},attrs:{alpha:r},backend:i}=e,s=i.dataIdMap.get(t.dataId).id,n=i.makeOutput(t.shape,"float32");if(T(t.shape)!==0){const u=i.dataIdMap.get(n.dataId).id;si(s,j[t.dtype],r,u)}return n}const Jm={kernelName:Lr,backendName:"wasm",setupFunc:Um,kernelFunc:qm};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xm=!1,Ym=ae(Cc,Xm,"bool");/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Km=!1,Qm=ae(Pc,Km,"bool");/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ii;function Zm(e){ii=e.wasm.cwrap(Hr,null,["number","number","number","number"])}function ef(e){const{attrs:t,backend:r}=e,{start:i,stop:s,num:n}=t,u=Math.floor(n),c=r.makeOutput([u],"float32");return ii(r.dataIdMap.get(c.dataId).id,i,s,u),c}const tf={kernelName:Hr,backendName:"wasm",setupFunc:Zm,kernelFunc:ef};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nf=G(Nc);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const af=G(Rc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rf=!1,sf=ae(Tc,rf,"bool");/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const of=G(Bc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const uf=!1,cf=ae(Wc,uf,"bool");/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const df=!1,lf=ae(Oc,df,"bool");/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let oi;function pf(e){oi=e.wasm.cwrap(zr,null,["number","number","number","number","number","number","number"])}function mf(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{depthRadius:n,bias:u,alpha:c,beta:d}=i;if(s.dtype!=="float32")throw new Error("LRN error: x must have dtype float32");const o=r.makeOutput(s.shape,s.dtype);return oi(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(o.dataId).id,s.shape[3],n,u,c,d),o}const ff={kernelName:zr,backendName:"wasm",setupFunc:pf,kernelFunc:mf};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ui;function hf(e){ui=e.wasm.cwrap(Vr,null,["number","number","number","number","number","number","number","number","number"])}function gf(e){const{inputs:t,backend:r,attrs:i}=e,{x:s,y:n,dy:u}=t,{depthRadius:c,bias:d,alpha:o,beta:a}=i;if(s.dtype!=="float32"||n.dtype!=="float32"||u.dtype!=="float32")throw new Error("LRNGrad error: x, y, and dy must have dtype float32");const l=r.makeOutput(s.shape,s.dtype);return ui(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(u.dataId).id,r.dataIdMap.get(l.dataId).id,u.shape[3],c,d,o,a),l}const bf={kernelName:Vr,backendName:"wasm",setupFunc:hf,kernelFunc:gf};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ci;function _f(e){ci=e.wasm.cwrap(Gr,null,["number","number","number","number"])}function yf(e){const{backend:t,inputs:r,attrs:i}=e,{reductionIndices:s,keepDims:n}=i,{x:u}=r;let d=t.dataIdMap.get(u.dataId).id,o=u;const{transposed:a,axes:l,originalAxes:m,inputWasTransposed:p}=je(u,s,t);if(p){const y=t.dataIdMap.get(a.dataId).id;o=a,d=y}const g=o.shape.length;Be("max",l,g);const[b,I]=it(o.shape,l),v=T(I),_=t.makeOutput(b,u.dtype);if(T(o.shape)!==0){const y=t.dataIdMap.get(_.dataId).id;ci(d,j[u.dtype],v,y)}if(p&&t.disposeData(a.dataId),n){const y=ot(_.shape,m);_.shape=y}return _}const wf={kernelName:Gr,backendName:"wasm",setupFunc:_f,kernelFunc:yf};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vf=ae($c);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let di;function If(e){di=e.wasm.cwrap(jr,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function xf(e){const{inputs:t,attrs:r,backend:i}=e,s=t.x,n=i.dataIdMap.get(s.dataId).id;Se(s.dtype==="float32",()=>`Error in MaxPool: only float32 input is supported. Got ${s.dtype}.`);const{filterSize:u,strides:c,pad:d,dimRoundingMode:o}=r,a=Bt(s.shape,u,c,1,d,o),l=a.filterHeight,m=a.filterWidth,p=a.padInfo.top,g=a.padInfo.right,b=a.padInfo.bottom,I=a.padInfo.left,v=a.dilationHeight,_=a.dilationWidth,y=a.strideHeight,k=a.strideWidth,A=a.inChannels,E=a.outChannels;if(a.dataFormat!=="channelsLast")throw new Error(`wasm backend does not support dataFormat:'${a.dataFormat}'. Please use 'channelsLast'.`);const R=i.makeOutput(a.outShape,"float32"),W=i.dataIdMap.get(R.dataId).id;return di(n,s.shape[0],s.shape[1],s.shape[2],l,m,p,g,b,I,v,_,y,k,A,E,W),R}const kf={kernelName:jr,backendName:"wasm",setupFunc:If,kernelFunc:xf};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let li;function Sf(e){li=e.wasm.cwrap("MaxPool3D",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Mf(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{filterSize:n,strides:u,pad:c,dimRoundingMode:d,dataFormat:o}=i,a=wn(s.shape,n,u,1,c,d,o),l=r.makeOutput(a.outShape,s.dtype);return li(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(l.dataId).id,a.batchSize,a.inChannels,a.inDepth,a.inHeight,a.inWidth,a.outDepth,a.outHeight,a.outWidth,a.strideDepth,a.strideHeight,a.strideWidth,a.dilationDepth,a.dilationHeight,a.dilationWidth,a.effectiveFilterDepth,a.effectiveFilterHeight,a.effectiveFilterWidth,a.padInfo.front,a.padInfo.top,a.padInfo.left),l}const Df={kernelName:Lc,backendName:"wasm",setupFunc:Sf,kernelFunc:Mf};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let pi;function Ff(e){pi=e.wasm.cwrap("MaxPool3DGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Af(e){const{inputs:t,backend:r,attrs:i}=e,{dy:s,input:n}=t,{filterSize:u,strides:c,pad:d,dimRoundingMode:o}=i,a=wn(n.shape,u,c,1,d,o),l=r.makeOutput(n.shape,n.dtype);return pi(r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(l.dataId).id,a.batchSize,a.inChannels,a.inDepth,a.inHeight,a.inWidth,a.outDepth,a.outHeight,a.outWidth,a.strideDepth,a.strideHeight,a.strideWidth,a.dilationDepth,a.dilationHeight,a.dilationWidth,a.effectiveFilterDepth,a.effectiveFilterHeight,a.effectiveFilterWidth,a.padInfo.front,a.padInfo.top,a.padInfo.left),l}const Ef={kernelName:Hc,backendName:"wasm",setupFunc:Ff,kernelFunc:Af};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let mi;function Cf(e){mi=e.wasm.cwrap("MaxPoolGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Pf(e){const{inputs:t,backend:r,attrs:i}=e,{dy:s,input:n}=t,{filterSize:u,strides:c,pad:d,dimRoundingMode:o}=i,a=Bt(n.shape,u,c,1,d,o),l=r.makeOutput(n.shape,n.dtype);return mi(r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(l.dataId).id,a.batchSize,a.inChannels,a.inHeight,a.inWidth,a.outHeight,a.outWidth,a.strideHeight,a.strideWidth,a.dilationHeight,a.dilationWidth,a.effectiveFilterHeight,a.effectiveFilterWidth,a.padInfo.top,a.padInfo.left),l}const Nf={kernelName:zc,backendName:"wasm",setupFunc:Cf,kernelFunc:Pf};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let fi;function Rf(e){fi=e.wasm.cwrap("MaxPoolWithArgmax",null,["number","number","number","number","boolean","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Tf(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{filterSize:n,strides:u,pad:c,includeBatchInIndex:d}=i;Se(s.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${s.shape.length}.`);const o=[1,1];Se(Gc(u,o),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${u} and dilations '${o}'`);const a=Bt(s.shape,n,u,[1,1],c),l=r.makeOutput(a.outShape,s.dtype),m=r.makeOutput(a.outShape,"int32");return fi(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(l.dataId).id,r.dataIdMap.get(m.dataId).id,j[s.dtype],d,a.batchSize,a.inChannels,a.inHeight,a.inWidth,a.outHeight,a.outWidth,a.strideHeight,a.strideWidth,a.dilationHeight,a.dilationWidth,a.effectiveFilterHeight,a.effectiveFilterWidth,a.padInfo.top,a.padInfo.left),[l,m]}const Bf={kernelName:Vc,backendName:"wasm",setupFunc:Rf,kernelFunc:Tf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let hi;function Wf(e){hi=e.wasm.cwrap(Ur,null,["number, number, number"])}function Of(e){const{backend:t,inputs:r,attrs:i}=e,{axis:s,keepDims:n}=i,{x:u}=r,c=t.dataIdMap.get(u.dataId).id;let d=c,o=u;const{transposed:a,axes:l,originalAxes:m,inputWasTransposed:p}=je(u,s,t);let g=l;if(p){const k=t.dataIdMap.get(a.dataId).id;k!==c&&(o=a,d=k,g=yt(g.length,o.shape.length))}Be("mean",g,o.shape.length);const[b,I]=it(o.shape,g),v=T(I);let _=o;o.dtype!=="float32"&&(_=Ue({backend:t,inputs:{x:o},attrs:{dtype:"float32"}}),d=t.dataIdMap.get(_.dataId).id);const y=t.makeOutput(b,"float32");if(T(o.shape)!==0){const k=t.dataIdMap.get(y.dataId).id;hi(d,v,k)}if(p&&t.disposeData(a.dataId),n){const k=ot(y.shape,m);y.shape=k}return o.dtype!=="float32"&&t.disposeData(_.dataId),y}const $f={kernelName:Ur,backendName:"wasm",setupFunc:Wf,kernelFunc:Of};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let gi;function Lf(e){gi=e.wasm.cwrap(qr,null,["number","number","number","number"])}function Hf(e){const{backend:t,inputs:r,attrs:i}=e,{axis:s,keepDims:n}=i,{x:u}=r,c=t.dataIdMap.get(u.dataId).id;let d=c,o=u;const{transposed:a,axes:l,originalAxes:m,inputWasTransposed:p}=je(u,s,t);if(p){const y=t.dataIdMap.get(a.dataId).id;y!==c&&(o=a,d=y)}const g=o.shape.length;Be("min",l,g);const[b,I]=it(o.shape,l),v=T(I),_=t.makeOutput(b,o.dtype);if(T(o.shape)!==0){const y=t.dataIdMap.get(_.dataId).id;gi(d,j[u.dtype],v,y)}if(p&&t.disposeData(a.dataId),n){const y=ot(_.shape,m);_.shape=y}return _}const zf={kernelName:qr,backendName:"wasm",setupFunc:Lf,kernelFunc:Hf};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vf=ae(jc);/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Un;(function(e){e[e.reflect=0]="reflect",e[e.symmetric=1]="symmetric"})(Un||(Un={}));let bi;function Gf(e){bi=e.wasm.cwrap(Jr,null,["number","array","number","number","array","array","number","number"])}function jf(e){const{inputs:{x:t},backend:r,attrs:{paddings:i,mode:s}}=e,n=i.map((g,b)=>g[0]+t.shape[b]+g[1]),u=r.dataIdMap.get(t.dataId).id,c=r.makeOutput(n,t.dtype),d=r.dataIdMap.get(c.dataId).id,o=new Uint8Array(new Int32Array(t.shape).buffer),a=i.map(g=>g[0]),l=i.map(g=>g[1]),m=new Uint8Array(new Int32Array(a).buffer),p=new Uint8Array(new Int32Array(l).buffer);return bi(u,o,t.shape.length,j[t.dtype],m,p,Un[s],d),c}const Uf={kernelName:Jr,backendName:"wasm",kernelFunc:jf,setupFunc:Gf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let _i;function qf(e){_i=e.wasm.cwrap(Xr,null,["number","number","number","number"])}function yi(e){const{backend:t,inputs:{logits:r},attrs:{dim:i}}=e,s=t.dataIdMap.get(r.dataId).id,n=t.makeOutput(r.shape,r.dtype),u=t.dataIdMap.get(n.dataId).id,c=r.shape[i],d=T(r.shape)/c;return T(n.shape)===0||_i(s,u,c,d),n}const Jf={kernelName:Xr,backendName:"wasm",setupFunc:qf,kernelFunc:yi};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let wi;function Xf(e){wi=e.wasm.cwrap(Yr,null,["number","number","number","number","number","number"])}function Yf(e){const{inputs:t,backend:r,attrs:i}=e,{logits:s}=t,{numSamples:n,seed:u,normalized:c}=i;if(s.dtype!=="float32")throw new Error(`Tensor logits must have dtype float32, got ${s.dtype}`);const d=c?s:yi({inputs:{logits:s},backend:r,attrs:{dim:s.shape.length-1}}),[o,a]=d.shape,l=r.makeOutput([o,n],"int32");return wi(r.dataIdMap.get(d.dataId).id,o,a,n,u,r.dataIdMap.get(l.dataId).id),c||r.disposeData(d.dataId),l}const Kf={kernelName:Yr,backendName:"wasm",setupFunc:Xf,kernelFunc:Yf};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Qf=ae(Uc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zf=ae(qc);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const eh=G(Jc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function aa(e,t){const r=new Int32Array(e.wasm.HEAPU8.buffer,t,4),i=r[0],s=r[1],n=r[2],u=r[3];return e.wasm._free(t),{pSelectedIndices:i,selectedSize:s,pSelectedScores:n,pValidOutputs:u}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let vi;function th(e){vi=e.wasm.cwrap(Kr,"number",["number","number","number","number","number"])}function nh(e){const{backend:t,inputs:r,attrs:i}=e,{iouThreshold:s,maxOutputSize:n,scoreThreshold:u}=i,{boxes:c,scores:d}=r,o=t.dataIdMap.get(c.dataId).id,a=t.dataIdMap.get(d.dataId).id,l=vi(o,a,n,s,u),{pSelectedIndices:m,selectedSize:p,pSelectedScores:g,pValidOutputs:b}=aa(t,l);return t.wasm._free(g),t.wasm._free(b),t.makeOutput([p],"int32",m)}const ah={kernelName:Kr,backendName:"wasm",setupFunc:th,kernelFunc:nh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ii;function rh(e){Ii=e.wasm.cwrap(Qr,"number",["number","number","number","number","number","bool"])}function sh(e){const{backend:t,inputs:r,attrs:i}=e,{iouThreshold:s,maxOutputSize:n,scoreThreshold:u,padToMaxOutputSize:c}=i,{boxes:d,scores:o}=r,a=t.dataIdMap.get(d.dataId).id,l=t.dataIdMap.get(o.dataId).id,m=Ii(a,l,n,s,u,c),{pSelectedIndices:p,selectedSize:g,pSelectedScores:b,pValidOutputs:I}=aa(t,m);t.wasm._free(b);const v=t.makeOutput([g],"int32",p),_=t.makeOutput([],"int32",I);return[v,_]}const ih={kernelName:Qr,backendName:"wasm",setupFunc:rh,kernelFunc:sh};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let xi;function oh(e){xi=e.wasm.cwrap(Zr,"number",["number","number","number","number","number","number"])}function uh(e){const{backend:t,inputs:r,attrs:i}=e,{iouThreshold:s,maxOutputSize:n,scoreThreshold:u,softNmsSigma:c}=i,{boxes:d,scores:o}=r,a=t.dataIdMap.get(d.dataId).id,l=t.dataIdMap.get(o.dataId).id,m=xi(a,l,n,s,u,c),{pSelectedIndices:p,selectedSize:g,pSelectedScores:b,pValidOutputs:I}=aa(t,m);t.wasm._free(I);const v=t.makeOutput([g],"int32",p),_=t.makeOutput([g],"float32",b);return[v,_]}const ch={kernelName:Zr,backendName:"wasm",setupFunc:oh,kernelFunc:uh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dh=!1,lh=ae(Xc,dh,"bool");/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ki;function ph(e){ki=e.wasm.cwrap(es,null,["number","number","number","number","number"])}function mh(e){const{inputs:t,backend:r,attrs:i}=e,{indices:s}=t,{dtype:n,depth:u,onValue:c,offValue:d}=i,o=r.makeOutput([...s.shape,u],n),a=r.dataIdMap.get(o.dataId).id,m=r.dataIdMap.get(s.dataId).id;return ki(m,u,c,d,a),o}const fh={kernelName:es,backendName:"wasm",setupFunc:ph,kernelFunc:mh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hh(e){const{inputs:{x:t},backend:r}=e,i=r.makeOutput(t.shape,t.dtype);return r.typedArrayFromHeap(i).fill(1),i}const gh={kernelName:Yc,backendName:"wasm",kernelFunc:hh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bh(e){const{inputs:t,backend:r,attrs:i}=e,{axis:s}=i;if(t.length===1)return jn({inputs:{input:t[0]},backend:r,attrs:{dim:s}});const n=t[0].shape,u=t[0].dtype;t.forEach(a=>{Qc(n,a.shape,"All tensors passed to stack must have matching shapes"),Se(u===a.dtype,()=>"All tensors passed to stack must have matching dtypes")});const c=[],d=t.map(a=>{const l=jn({inputs:{input:a},backend:r,attrs:{dim:s}});return c.push(l),l}),o=Ts({inputs:d,backend:r,attrs:{axis:s}});return c.forEach(a=>r.disposeData(a.dataId)),o}const _h={kernelName:Kc,backendName:"wasm",kernelFunc:bh};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Si;function yh(e){Si=e.wasm.cwrap(ts,null,["number","array","number","number","array","array","number","number"])}function wh(e){const{inputs:{x:t},backend:r,attrs:{paddings:i,constantValue:s}}=e,n=i.map((b,I)=>b[0]+t.shape[I]+b[1]);if(T(t.shape)===0)return Qs({backend:r,attrs:{shape:n,value:s,dtype:t.dtype}});const u=r.dataIdMap.get(t.dataId).id,c=r.makeOutput(n,t.dtype),o=r.dataIdMap.get(c.dataId).id,a=new Uint8Array(new Int32Array(t.shape).buffer),l=i.map(b=>b[0]),m=i.map(b=>b[1]),p=new Uint8Array(new Int32Array(l).buffer),g=new Uint8Array(new Int32Array(m).buffer);return Si(u,a,t.shape.length,j[t.dtype],p,g,s,o),c}const Mi={kernelName:ts,backendName:"wasm",kernelFunc:wh,setupFunc:yh};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vh=ae(Zc);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Di;function Ih(e){Di=e.wasm.cwrap(ns,null,["number","number","number"])}function xh(e){const{inputs:t,backend:r}=e,{x:i,alpha:s}=t,n=r.dataIdMap.get(i.dataId).id,u=r.dataIdMap.get(s.dataId).id;let c=n;const d=i;let o=d;d.dtype!=="float32"&&(o=Ue({backend:r,inputs:{x:i},attrs:{dtype:"float32"}}),c=r.dataIdMap.get(o.dataId).id);const a=r.makeOutput(i.shape,"float32"),l=r.dataIdMap.get(a.dataId).id;return Di(c,u,l),d.dtype!=="float32"&&r.disposeData(o.dataId),a}const kh={kernelName:ns,backendName:"wasm",setupFunc:Ih,kernelFunc:xh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Fi;function Sh(e){Fi=e.wasm.cwrap(as,null,["number","number","number","number"])}function Mh(e){const{backend:t,inputs:r,attrs:i}=e,{axis:s,keepDims:n}=i,{x:u}=r,c=t.dataIdMap.get(u.dataId).id;let d=c,o=u;const{transposed:a,axes:l,originalAxes:m,inputWasTransposed:p}=je(u,s,t);let g=l;if(p){const y=t.dataIdMap.get(a.dataId).id;y!==c&&(o=a,d=y,g=yt(g.length,o.shape.length))}Be("prod",g,o.shape.length);const[b,I]=it(o.shape,g),v=T(I),_=t.makeOutput(b,o.dtype);if(T(o.shape)!==0){const y=t.dataIdMap.get(_.dataId).id;Fi(d,v,j[_.dtype],y)}if(p&&t.disposeData(a.dataId),n){const y=ot(_.shape,m);_.shape=y}return _}const Dh={kernelName:as,backendName:"wasm",setupFunc:Sh,kernelFunc:Mh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fh=e=>{const{backend:t,attrs:r}=e,{start:i,stop:s,step:n,dtype:u}=r,c=td(i,s,n,u),d=t.makeOutput([c.length],u);return t.typedArrayFromHeap(d).set(c),d},Ah={kernelName:ed,backendName:"wasm",kernelFunc:Fh};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Eh=ae(nd);/**
 * @license
 * Copyright 2022 The TensorFlow Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ch=G(ad);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ph=G(rd);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nh=G(sd);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ai;function Rh(e){Ai=e.wasm.cwrap(rs,null,["number","number","number","number","number","number","number","number","number","number"])}function Th(e){const{backend:t,inputs:r,attrs:i}=e,{images:s}=r,{alignCorners:n,halfPixelCenters:u,size:c}=i,[d,o]=c,[a,l,m,p]=s.shape,g=[a,d,o,p];let b=t.dataIdMap.get(s.dataId),I;b.dtype!=="float32"&&(I=Ue({backend:t,inputs:{x:s},attrs:{dtype:"float32"}}),b=t.dataIdMap.get(I.dataId));const v=b.id,_=t.makeOutput(g,"float32");if(T(s.shape)===0)return _;const y=t.dataIdMap.get(_.dataId).id;return Ai(v,a,l,m,p,d,o,n?1:0,u?1:0,y),I!=null&&t.disposeData(I.dataId),_}const Bh={kernelName:rs,backendName:"wasm",setupFunc:Rh,kernelFunc:Th};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ei;function Wh(e){Ei=e.wasm.cwrap(ss,null,["number","number","number","array","array","boolean"])}function Oh(e){const{inputs:t,backend:r,attrs:i}=e,{images:s,dy:n}=t,{alignCorners:u}=i,c=r.makeOutput(s.shape,"float32");let d=r.dataIdMap.get(s.dataId),o;return d.dtype!=="float32"&&(o=Ue({backend:r,inputs:{x:s},attrs:{dtype:"float32"}}),d=r.dataIdMap.get(o.dataId)),Ei(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(c.dataId).id,new Uint8Array(new Int32Array(s.shape).buffer),new Uint8Array(new Int32Array(n.shape).buffer),u),o!=null&&r.disposeData(o.dataId),c}const $h={kernelName:ss,backendName:"wasm",setupFunc:Wh,kernelFunc:Oh};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ci;function Lh(e){Ci=e.wasm.cwrap(is,null,["number","number","number","number","number","number","number","number","number","number"])}function Hh(e){const{backend:t,inputs:r,attrs:i}=e,{images:s}=r,{alignCorners:n,halfPixelCenters:u,size:c}=i,[d,o]=c,[a,l,m,p]=s.shape,g=[a,d,o,p],b=t.makeOutput(g,"float32");if(T(s.shape)===0)return b;let I=t.dataIdMap.get(s.dataId),v;I.dtype!=="float32"&&(v=Ue({backend:t,inputs:{x:s},attrs:{dtype:"float32"}}),I=t.dataIdMap.get(v.dataId));const _=I.id,y=t.dataIdMap.get(b.dataId).id;return Ci(_,a,l,m,p,d,o,n?1:0,u?1:0,y),v!=null&&t.disposeData(v.dataId),b}const zh={kernelName:is,backendName:"wasm",setupFunc:Lh,kernelFunc:Hh};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Pi;function Vh(e){Pi=e.wasm.cwrap(os,null,["number","number","number","array","array","boolean"])}function Gh(e){const{inputs:t,backend:r,attrs:i}=e,{images:s,dy:n}=t,{alignCorners:u}=i,c=r.makeOutput(s.shape,"float32");let d=r.dataIdMap.get(s.dataId),o;return d.dtype!=="float32"&&(o=Ue({backend:r,inputs:{x:s},attrs:{dtype:"float32"}}),d=r.dataIdMap.get(o.dataId)),Pi(r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(n.dataId).id,r.dataIdMap.get(c.dataId).id,new Uint8Array(new Int32Array(s.shape).buffer),new Uint8Array(new Int32Array(n.shape).buffer),u),o!=null&&r.disposeData(o.dataId),c}const jh={kernelName:os,backendName:"wasm",setupFunc:Vh,kernelFunc:Gh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ni;function Uh(e){Ni=e.wasm.cwrap(us,null,["number","array","number","array","number","number"])}function qh(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{dims:n}=i,u=Tt(n,s.shape);if(s.shape.length===0)return vn({inputs:{x:s},backend:r});const c=r.makeOutput(s.shape,s.dtype),d=r.dataIdMap.get(s.dataId).id,o=r.dataIdMap.get(c.dataId).id,a=new Uint8Array(new Int32Array(u).buffer),l=new Uint8Array(new Int32Array(s.shape).buffer);Ni(d,a,u.length,l,s.shape.length,o);const m=me({inputs:{x:c},attrs:{shape:s.shape},backend:r});return r.disposeData(c.dataId),m}const Jh={kernelName:us,backendName:"wasm",kernelFunc:qh,setupFunc:Uh};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ri;function Xh(e){Ri=e.wasm.cwrap(cs,null,["number","number","number","number","number","number","number","number","array","number","number"])}function Yh(e){const{inputs:t,backend:r,attrs:i}=e,{image:s}=t,{radians:n,fillValue:u,center:c}=i,d=r.makeOutput(s.shape,s.dtype),o=r.dataIdMap.get(s.dataId).id,a=r.dataIdMap.get(d.dataId).id,[l,m,p,g]=s.shape,[b,I]=id(c,m,p),v=u===0,_=255,y=typeof u=="number"?[u,u,u,v?0:_]:[...u,_],k=new Uint8Array(new Int32Array(y).buffer);return Ri(o,l,m,p,g,n,b,I,k,y.length,a),d}const Kh={kernelName:cs,backendName:"wasm",kernelFunc:Yh,setupFunc:Xh};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Qh=G(od);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zh=G(ud);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ti;function eg(e){Ti=e.wasm.cwrap(ds,null,["number","number","number","number","number","number","array","number","number"])}function tg(e){const{backend:t,inputs:r,attrs:i}=e,{indices:s,updates:n}=r,{shape:u}=i,c=t.makeOutput(u,n.dtype);if(T(u)===0)return c;const{sliceRank:d,numUpdates:o,sliceSize:a,strides:l,outputSize:m}=na(n,s,u),g=t.dataIdMap.get(s.dataId).id,I=t.dataIdMap.get(n.dataId).id,v=new Uint8Array(new Int32Array(l).buffer),_=t.dataIdMap.get(c.dataId).id;return Ti(g,I,j[n.dtype],d,o,a,v,m,_),c}const ng={kernelName:ds,backendName:"wasm",setupFunc:eg,kernelFunc:tg};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Bi;function ag(e){Bi=e.wasm.cwrap(ls,null,["number","number","number","number","number","number","bool","number"])}function rg(e){const{inputs:t,backend:r,attrs:i}=e,{sortedSequence:s,values:n}=t,{side:u}=i;if(s.dtype!==n.dtype)throw new Error(`SearchSorted error: sorted_sequence must have the same dtype as values. Got ${s.dtype} and ${n.dtype}`);const c=r.makeOutput(n.shape,"int32");function d(o){return r.dataIdMap.get(o.dataId).id}return Bi(d(s),d(n),s.shape[0],s.shape[1],n.shape[1],j[s.dtype],u==="left",d(c)),c}const sg={kernelName:ls,backendName:"wasm",setupFunc:ag,kernelFunc:rg};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Wi;function ig(e){Wi=e.wasm.cwrap("SelectV2",null,["number","number","number","number","number"])}function og(e){const{inputs:t,backend:r}=e,{condition:i,t:s,e:n}=t,u=r.dataIdMap.get(i.dataId).id,c=r.dataIdMap.get(s.dataId).id,d=r.dataIdMap.get(n.dataId).id,o=r.makeOutput(s.shape,s.dtype),a=r.dataIdMap.get(o.dataId).id,l=i.shape.length,m=s.shape.length,p=l===0||l>1||m===1?1:T(s.shape.slice(1));return Wi(u,c,d,p,a),o}const ug={kernelName:cd,backendName:"wasm",kernelFunc:og,setupFunc:ig};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const cg=G(dd);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Oi;function dg(e){Oi=e.wasm.cwrap(ld,null,["number","number"])}function lg(e){const{backend:t,inputs:{x:r}}=e,i=t.dataIdMap.get(r.dataId).id,s=t.makeOutput(r.shape,r.dtype),n=t.dataIdMap.get(s.dataId).id;return T(s.shape)===0||Oi(i,n),s}const pg={kernelName:"Sigmoid",backendName:"wasm",setupFunc:dg,kernelFunc:lg};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mg=G(pd);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fg=G(md);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hg=G(fd);/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gg=G(hd);/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bg(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,{blockShape:n,paddings:u}=i,c=T(n),d=[[0,0]];d.push(...u);for(let E=1+n.length;E<s.shape.length;++E)d.push([0,0]);const o=Mi.kernelFunc({inputs:{x:s},backend:r,attrs:{paddings:d,constantValue:0}}),a=fr(o.shape,n,c,!1),l=hr(a.length,n.length,!1),m=gr(o.shape,n,c,!1),b=me({inputs:{x:o},backend:r,attrs:{shape:a}}),_=Ve({inputs:{x:b},backend:r,attrs:{perm:l}}),A=me({inputs:{x:_},backend:r,attrs:{shape:m}});return r.disposeData(o.dataId),r.disposeData(b.dataId),r.disposeData(_.dataId),A}const _g={kernelName:gd,backendName:"wasm",kernelFunc:bg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let $i;function yg(e){$i=e.wasm.cwrap("SparseFillEmptyRows","number",["number","number","number","number","number","number","number","number","number","number","number","number"])}function wg(e){const{backend:t,inputs:r}=e,{indices:i,values:s,denseShape:n,defaultValue:u}=r,c=i.shape[0],d=i.shape[1],o=t.readSync(n.dataId)[0],a=[c+o,d],l=t.dataIdMap.get(i.dataId).id,m=t.dataIdMap.get(s.dataId).id,p=t.dataIdMap.get(u.dataId).id,g=t.makeOutput(a,i.dtype),b=t.dataIdMap.get(g.dataId).id,I=t.makeOutput(a.slice(0,1),s.dtype),v=t.dataIdMap.get(I.dataId).id,_=t.makeOutput([o],"bool"),y=t.dataIdMap.get(_.dataId).id,k=t.makeOutput([c],i.dtype),A=t.dataIdMap.get(k.dataId).id,E=t.makeOutput([4],"int32"),R=t.dataIdMap.get(E.dataId).id,W=$i(l,m,j[s.dtype],c,o,d,p,b,v,y,A,R),H=t.readSync(E.dataId);let B;switch(H[0]){case 1:{B=wd(H[1]);break}case 2:{B=yd(H[1],H[2]);break}case 3:B=_d(H[1],H[2],H[3]);break;default:B=""}if(t.disposeData(E.dataId),B)throw t.disposeData(g.dataId),t.disposeData(I.dataId),t.disposeData(_.dataId),t.disposeData(k.dataId),new Error(B);let V=g,U=I;return W!==a[0]&&(V=st({inputs:{x:g},attrs:{begin:0,size:[W,d]},backend:t}),U=st({inputs:{x:I},attrs:{begin:0,size:W},backend:t}),t.disposeData(g.dataId),t.disposeData(I.dataId)),[V,U,_,k]}const vg={kernelName:bd,backendName:"wasm",setupFunc:yg,kernelFunc:wg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Li;function Ig(e){Li=e.wasm.cwrap(ps,null,["number","number","number","number","number","number","number"])}function xg(e){const{backend:t,inputs:r}=e,{inputIndices:i,inputShape:s,newShape:n}=r;if(i.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${i.shape}`);if(s.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${s.shape}`);if(n.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${n.shape}`);const u=t.dataIdMap.get(i.dataId).id,c=t.dataIdMap.get(s.dataId).id,d=t.dataIdMap.get(n.dataId).id,o=i.shape[0],a=T(n.shape),l=t.makeOutput([o,a],i.dtype),m=t.dataIdMap.get(l.dataId).id,p=t.makeOutput([a],n.dtype),g=t.dataIdMap.get(p.dataId).id,b=t.makeOutput([3],"int32"),I=t.dataIdMap.get(b.dataId).id;Li(u,c,d,o,m,g,I);const v=t.readSync(b.dataId);let _;switch(v[0]){case 0:{_=kd(v[1],v[2]);break}case 1:{_=xd(v[1],v[2]);break}case 2:_=Sd();break;case 3:{const y=Array.from(t.readSync(s.dataId)),k=Array.from(t.readSync(p.dataId));_=Id(y,k);break}case 4:{const y=Array.from(t.readSync(s.dataId)),k=Array.from(t.readSync(p.dataId));_=vd(y,k);break}default:_=""}if(t.disposeData(b.dataId),_)throw t.disposeData(l.dataId),t.disposeData(p.dataId),new Error(_);return[l,p]}const kg={kernelName:ps,backendName:"wasm",setupFunc:Ig,kernelFunc:xg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Hi;function zi(e){Hi=e.wasm.cwrap("SparseSegmentReduction",null,["number","number","number","number","number","number","number","number","number"])}function Vi(e,t){const{backend:r,inputs:i}=e,{data:s,indices:n,segmentIds:u}=i,c=n.shape[0],d=r.readSync(u.dataId,c-1,c)[0],a=c>0?d+1:0;if(a<0)throw new Error(Ya());const l=s.shape.slice();l[0]=a;const m=r.dataIdMap.get(s.dataId).id,p=r.dataIdMap.get(n.dataId).id,g=r.dataIdMap.get(u.dataId).id,b=r.makeOutput(l,s.dtype),I=r.dataIdMap.get(b.dataId).id,v=r.makeOutput([4],"int32"),_=r.dataIdMap.get(v.dataId).id;Hi(m,j[s.dtype],s.shape[0],p,g,I,_,t,0);const y=r.readSync(v.dataId);let k;switch(y[0]){case 0:{k=Ya();break}case 1:{k=Fd();break}case 2:k=Dd(y[1],y[2]);break;case 3:k=Md(y[1],y[2],y[3]);break;default:k=""}if(r.disposeData(v.dataId),k)throw r.disposeData(b.dataId),new Error(k);return b}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sg(e){return Vi(e,!0)}const Mg={kernelName:Ad,backendName:"wasm",setupFunc:zi,kernelFunc:Sg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dg(e){return Vi(e,!1)}const Fg={kernelName:Ed,backendName:"wasm",setupFunc:zi,kernelFunc:Dg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Gi;function Ag(e){Gi=e.wasm.cwrap(ms,null,["number","number","number","number","number","number","number","number","array","number","number"])}function Eg(e){const{backend:t,inputs:r,attrs:i}=e,{sparseIndices:s,sparseValues:n,defaultValue:u}=r,{outputShape:c}=i,d=t.makeOutput(c,u.dtype);if(T(c)===0)return d;const{sliceRank:o,numUpdates:a,sliceSize:l,strides:m,outputSize:p}=na(n,s,c),g=t.dataIdMap.get(s.dataId).id,b=t.dataIdMap.get(n.dataId).id,I=t.dataIdMap.get(u.dataId).id,v=new Uint8Array(new Int32Array(m).buffer),_=t.dataIdMap.get(d.dataId).id;return Gi(g,b,n.shape.length,I,j[u.dtype],o,a,l,v,p,_),d}const Cg={kernelName:ms,backendName:"wasm",setupFunc:Ag,kernelFunc:Eg};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pg(e){const{inputs:t,attrs:r,backend:i}=e,{x:s}=t,{numOrSizeSplits:n,axis:u}=r,c=Tt(u,s.shape)[0],d=Pd(s,n,c),o=new Array(s.shape.length).fill(0),a=s.shape.slice();return d.map(l=>{const m=[...a];m[c]=l;const p=st({inputs:{x:s},attrs:{begin:o,size:m},backend:i});return o[c]+=l,p})}const Ng={kernelName:Cd,backendName:"wasm",kernelFunc:Pg};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rg=G(Nd);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tg=G(Rd);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bg=ae(Td);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ji;function Wg(e){ji=e.wasm.cwrap(fs,null,["number","number","number","number"])}function Og(e){const{backend:t,inputs:r,attrs:i}=e,{alpha:s}=i,{x:n}=r,u=t.dataIdMap.get(n.dataId).id,c=t.makeOutput(n.shape,n.dtype),d=t.dataIdMap.get(c.dataId).id;return ji(u,s,j[n.dtype],d),c}const $g={kernelName:fs,backendName:"wasm",setupFunc:Wg,kernelFunc:Og};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ui;function Lg(e){Ui=e.wasm.cwrap(hs,null,["number","array","number","array","array","array","array","array","number","number"])}function Hg(e){const{backend:t,inputs:r,attrs:i}=e,{x:s}=r,{begin:n,end:u,strides:c,beginMask:d,endMask:o,ellipsisMask:a,newAxisMask:l,shrinkAxisMask:m}=i,{finalShapeSparse:p,finalShape:g,isIdentity:b,sliceDim0:I,isSimpleSlice:v,begin:_,end:y,strides:k}=Bd(s.shape,n,u,c,d,o,a,l,m);let A;if(b)A=me({inputs:{x:s},backend:t,attrs:{shape:g}});else if(I||v){Se(s.shape.length>=1,()=>`Input must have rank at least 1, got: ${s.shape.length}`);const E=Wd(_,y,k),R=st({inputs:{x:s},backend:t,attrs:{begin:_,size:E}});A=me({inputs:{x:R},backend:t,attrs:{shape:g}}),t.disposeData(R.dataId)}else{const E=t.makeOutput(p,"float32"),R=t.dataIdMap.get(s.dataId).id,W=new Uint8Array(new Int32Array(ve(s.shape)).buffer),H=new Uint8Array(new Int32Array(_).buffer),B=new Uint8Array(new Int32Array(y).buffer),V=new Uint8Array(new Int32Array(k).buffer),U=new Uint8Array(new Int32Array(p).buffer),Z=new Uint8Array(new Int32Array(ve(p)).buffer),pe=t.dataIdMap.get(E.dataId).id;Ui(R,W,s.shape.length,H,B,V,U,Z,p.length,pe),A=me({inputs:{x:E},backend:t,attrs:{shape:g}}),t.disposeData(E.dataId)}return A}const zg={kernelName:hs,backendName:"wasm",setupFunc:Lg,kernelFunc:Hg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vg(e){const{backend:t,inputs:r,attrs:i}=e,{data:s,dataSplits:n}=r,{separator:u,nGramWidths:c,leftPad:d,rightPad:o,padWidth:a,preserveShortSequences:l}=i,m=t.readSync(s.dataId),p=t.readSync(n.dataId),[g,b]=$d(m,p,u,c,d,o,a,l),I=t.makeOutput([g.length],"string"),v=t.dataIdMap.get(I.dataId);v.stringBytes=g;const _=t.makeOutput(n.shape,"int32");return t.typedArrayFromHeap(_).set(b),[I,_]}const Gg={kernelName:Od,backendName:"wasm",kernelFunc:Vg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jg(e){const{backend:t,inputs:r,attrs:i}=e,{input:s,delimiter:n}=r,{skipEmpty:u}=i,c=t.readSync(s.dataId),d=t.readSync(n.dataId),[o,a,l]=Hd(c,d[0],u),m=a.length,p=t.makeOutput([m,2],"int32");t.typedArrayFromHeap(p).set(o);const b=t.makeOutput([m],"string"),I=t.dataIdMap.get(b.dataId);I.stringBytes=a;const v=t.makeOutput([2],"int32");return t.typedArrayFromHeap(v).set(l),[p,b,v]}const Ug={kernelName:Ld,backendName:"wasm",kernelFunc:jg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qg(e){const{backend:t,inputs:r,attrs:i}=e,{input:s}=r,{numBuckets:n}=i,u=t.readSync(s.dataId),c=Vd(u,n),d=t.makeOutput(s.shape,"int32");return t.typedArrayFromHeap(d).set(c),d}const Jg={kernelName:zd,backendName:"wasm",kernelFunc:qg};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xg=ae(Gd);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let qi;function Yg(e){qi=e.wasm.cwrap(gs,null,["number","number","number","number"])}function Kg(e){const{backend:t,inputs:r,attrs:i}=e,{axis:s,keepDims:n}=i,{x:u}=r,c=t.dataIdMap.get(u.dataId).id;let d=c,o=u;const{transposed:a,axes:l,originalAxes:m,inputWasTransposed:p}=je(u,s,t);let g=l;if(p){const y=t.dataIdMap.get(a.dataId).id;y!==c&&(o=a,d=y,g=yt(g.length,o.shape.length))}Be("sum",g,o.shape.length);const[b,I]=it(o.shape,g),v=T(I),_=t.makeOutput(b,o.dtype);if(T(o.shape)!==0){const y=t.dataIdMap.get(_.dataId).id;qi(d,v,j[_.dtype],y)}if(p&&t.disposeData(a.dataId),n){const y=ot(_.shape,m);_.shape=y}return _}const Qg={kernelName:gs,backendName:"wasm",setupFunc:Yg,kernelFunc:Kg};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zg=G(jd);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const eb=G(Ud);/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ji;function tb(e){Ji=e.wasm.cwrap(bs,null,["number","number","number","number","number","number","array","number","number","number"])}function nb(e){const{backend:t,inputs:r,attrs:i}=e,{tensor:s,indices:n,updates:u}=r,c=t.makeOutput(s.shape,s.dtype);if(T(s.shape)===0)return c;const{sliceRank:d,numUpdates:o,sliceSize:a,strides:l,outputSize:m}=na(u,n,s.shape),g=t.dataIdMap.get(n.dataId).id,I=t.dataIdMap.get(u.dataId).id,_=t.dataIdMap.get(s.dataId).id,y=new Uint8Array(new Int32Array(l).buffer),k=t.dataIdMap.get(c.dataId).id;return Ji(g,I,j[u.dtype],d,o,a,y,m,k,_),c}const ab={kernelName:bs,backendName:"wasm",setupFunc:tb,kernelFunc:nb};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Xi;function rb(e){Xi=e.wasm.cwrap(_s,null,["number","array","number","array","number","number"])}function sb(e){const{inputs:t,backend:r,attrs:i}=e,{x:s}=t,n=r.dataIdMap.get(s.dataId).id,{reps:u}=i,c=new Array(s.shape.length);for(let m=0;m<c.length;m++)c[m]=s.shape[m]*u[m];const d=new Uint8Array(new Int32Array(s.shape).buffer),o=new Uint8Array(new Int32Array(c).buffer),a=r.makeOutput(c,s.dtype),l=r.dataIdMap.get(a.dataId).id;return Xi(n,d,s.shape.length,o,c.length,j[a.dtype],l),a}const ib={kernelName:_s,backendName:"wasm",setupFunc:rb,kernelFunc:sb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Yi;function ob(e){Yi=e.wasm.cwrap(ys,null,["number","array","number","number","number","bool","number","number"])}const ub=({inputs:e,backend:t,attrs:r})=>{const{x:i}=e,{k:s,sorted:n}=r,u=t.dataIdMap.get(i.dataId).id,c=new Uint8Array(new Int32Array(i.shape).buffer),d=i.shape.slice();d[d.length-1]=s;const o=t.makeOutput(d,i.dtype),a=t.dataIdMap.get(o.dataId).id,l=t.makeOutput(d,"int32"),m=t.dataIdMap.get(l.dataId).id;return Yi(u,c,i.shape.length,j[i.dtype],s,n,a,m),[o,l]},cb={kernelName:ys,backendName:"wasm",setupFunc:ob,kernelFunc:ub};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ki;function db(e){Ki=e.wasm.cwrap(ws,null,["number","number","bool","number","number","number","number","number","number","array","number","array","number","number","number","number","number"])}function lb(e){const{backend:t,inputs:r,attrs:i}=e,{image:s,transforms:n}=r,{interpolation:u,fillMode:c,fillValue:d,outputShape:o}=i,[a,l,m,p]=s.shape,[g,b]=o??[l,m],I=[a,g,b,p],v=new Uint8Array(new Int32Array(ve(s.shape)).buffer),_=new Uint8Array(new Int32Array(ve(I)).buffer),y=t.makeOutput(I,s.dtype),k=t.dataIdMap.get(y.dataId).id,E=t.dataIdMap.get(s.dataId).id,W=t.dataIdMap.get(n.dataId).id,H=u==="nearest"?1:2;let B;switch(c){case"constant":B=1;break;case"reflect":B=2;break;case"wrap":B=3;break;case"nearest":B=4;break;default:B=1;break}return Ki(E,W,n.shape[0]>1,a,g,b,p,m,l,v,s.shape.length-1,_,I.length-1,H,B,d,k),y}const pb={kernelName:ws,backendName:"wasm",setupFunc:db,kernelFunc:lb};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mb(e){const{inputs:t,attrs:r,backend:i}=e,{axis:s}=r,{x:n}=t,{outputValues:u,outputShape:c,indices:d}=Jd(i.readSync(n.dataId),s,n.shape,n.dtype);return[i.makeOutput(c,n.dtype,void 0,u),i.makeOutput([d.length],"int32",void 0,d)]}const fb={kernelName:qd,backendName:"wasm",kernelFunc:mb};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hb(e){const{inputs:t,backend:r,attrs:i}=e,{value:s}=t;let{axis:n}=i;n<0&&(n+=s.shape.length);const u=s.shape[n],c=s.shape.length,d=new Array(c-1);let o=0;for(let p=0;p<c;p++)p!==n&&(d[o++]=s.shape[p]);const a=new Array(u),l=new Array(c).fill(0),m=s.shape.slice();m[n]=1;for(let p=0;p<a.length;p++)l[n]=p,a[p]=st({inputs:{x:s},attrs:{begin:l,size:m},backend:r});return a.map(({dataId:p,dtype:g})=>({dataId:p,dtype:g,shape:d}))}const gb={kernelName:Xd,backendName:"wasm",kernelFunc:hb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bb(e){const{inputs:{x:t},backend:r}=e,i=r.makeOutput(t.shape,t.dtype);return r.typedArrayFromHeap(i).fill(0),i}const _b={kernelName:Yd,backendName:"wasm",kernelFunc:bb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yb=[cl,dl,ll,pl,ml,gl,kl,Dl,Fl,Al,El,Cl,Pl,Nl,Rl,Wl,Ul,Ll,Vl,Yl,np,sp,ip,up,cp,dp,mp,fp,bp,wp,xp,Mp,Ap,Ep,Cp,Rp,Wp,Lp,Vp,Up,Xp,Qp,tm,rm,om,um,lm,mm,fm,hm,gm,bm,_m,vm,Im,xm,Mm,Am,Pm,Tm,Om,Lm,zm,bl,Vm,Gm,jm,Jm,Ym,Qm,tf,af,nf,sf,of,cf,lf,ff,bf,wf,vf,kf,Df,Ef,Nf,Bf,$f,zf,Vf,Uf,Kf,Qf,Zf,eh,ah,ih,ch,lh,fh,gh,_h,Mi,vh,kh,Dh,Ah,Eh,Ch,Ph,Nh,ql,Bh,$h,zh,jh,Jh,Kh,Qh,Zh,ng,sg,ug,cg,pg,mg,fg,hg,ep,Jf,gg,_g,vg,kg,Mg,Fg,Cg,Ng,Rg,Tg,Bg,$g,zg,Gg,Ug,Jg,Xg,Qg,Zg,eb,ab,ib,cb,pb,vl,fb,gb,_b];for(const e of yb)Kd(e);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qn=Vn();qn.registerFlag("WASM_HAS_SIMD_SUPPORT",async()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,9,1,7,0,65,0,253,15,26,11]))}catch{return!1}});qn.registerFlag("WASM_HAS_MULTITHREAD_SUPPORT",async()=>{if(qn.get("IS_NODE"))return!1;try{return new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}});var Qi={exports:{}};(function(e,t){var r=(()=>{var i=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(i=i||__filename),function(s){s=s||{};function n(){return q.buffer!=te&&Me(q.buffer),We}function u(){return q.buffer!=te&&Me(q.buffer),Ht}function c(){return q.buffer!=te&&Me(q.buffer),zt}function d(){return q.buffer!=te&&Me(q.buffer),Ye}function o(){return q.buffer!=te&&Me(q.buffer),Vt}var a=typeof s<"u"?s:{},l,m;a.ready=new Promise(function(h,w){l=h,m=w});var p;typeof process<"u"&&process.listeners&&(p={uncaughtException:process.listeners("uncaughtException"),unhandledRejection:process.listeners("unhandledRejection")});var g=Object.assign({},a),b=(h,w)=>{throw w},I=typeof window=="object",v=typeof importScripts=="function",_=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",y=a.ENVIRONMENT_IS_PTHREAD||!1,k="";function A(h){return a.locateFile?a.locateFile(h,k):k+h}var E,R,W;function H(h){if(h instanceof Ce)return;K("exiting due to exception: "+h)}if(_){var B=at,V=at;v?k=V.dirname(k)+"/":k=__dirname+"/",E=(w,M)=>(w=pt(w)?new URL(w):V.normalize(w),B.readFileSync(w,M?void 0:"utf8")),W=w=>{var M=E(w,!0);return M.buffer||(M=new Uint8Array(M)),M},R=(w,M,N)=>{w=pt(w)?new URL(w):V.normalize(w),B.readFile(w,function(O,L){O?N(O):M(L.buffer)})},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(w){if(!(w instanceof Ce))throw w}),process.on("unhandledRejection",function(w){throw w}),b=(w,M)=>{if(lt())throw process.exitCode=w,M;H(M),process.exit(w)},a.inspect=function(){return"[Emscripten Module object]"};let h;try{h=at}catch(w){throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'),w}Za.Worker=h.Worker}else(I||v)&&(v?k=self.location.href:typeof document<"u"&&document.currentScript&&(k=document.currentScript.src),typeof i<"u"&&i&&(k=i),k.indexOf("blob:")!==0?k=k.substr(0,k.replace(/[?#].*/,"").lastIndexOf("/")+1):k="",_||(E=h=>{var w=new XMLHttpRequest;return w.open("GET",h,!1),w.send(null),w.responseText},v&&(W=h=>{var w=new XMLHttpRequest;return w.open("GET",h,!1),w.responseType="arraybuffer",w.send(null),new Uint8Array(w.response)}),R=(h,w,M)=>{var N=new XMLHttpRequest;N.open("GET",h,!0),N.responseType="arraybuffer",N.onload=()=>{if(N.status==200||N.status==0&&N.response){w(N.response);return}M()},N.onerror=M,N.send(null)}));_&&typeof performance>"u"&&(Za.performance=at.performance);var U=console.log.bind(console),Z=console.warn.bind(console);_&&(U=h=>B.writeSync(1,h+`
`),Z=h=>B.writeSync(2,h+`
`));var pe=a.print||U,K=a.printErr||Z;Object.assign(a,g),g=null,a.arguments&&a.arguments,a.thisProgram&&a.thisProgram,a.quit&&(b=a.quit);var re;a.wasmBinary&&(re=a.wasmBinary);var be=a.noExitRuntime||!0;typeof WebAssembly!="object"&&Ze("no native wasm support detected");var q,xe,fe=!1,he;function Ae(h,w){h||Ze(w)}var ie=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0;function ct(h,w,M){w>>>=0;for(var N=w+M,O=w;h[O]&&!(O>=N);)++O;if(O-w>16&&h.buffer&&ie)return ie.decode(h.buffer instanceof SharedArrayBuffer?h.slice(w,O):h.subarray(w,O));for(var L="";w<O;){var F=h[w++];if(!(F&128)){L+=String.fromCharCode(F);continue}var C=h[w++]&63;if((F&224)==192){L+=String.fromCharCode((F&31)<<6|C);continue}var ee=h[w++]&63;if((F&240)==224?F=(F&15)<<12|C<<6|ee:F=(F&7)<<18|C<<12|ee<<6|h[w++]&63,F<65536)L+=String.fromCharCode(F);else{var ye=F-65536;L+=String.fromCharCode(55296|ye>>10,56320|ye&1023)}}return L}function dt(h,w){return h>>>=0,h?ct(u(),h,w):""}function It(h,w,M,N){if(M>>>=0,!(N>0))return 0;for(var O=M,L=M+N-1,F=0;F<h.length;++F){var C=h.charCodeAt(F);if(C>=55296&&C<=57343){var ee=h.charCodeAt(++F);C=65536+((C&1023)<<10)|ee&1023}if(C<=127){if(M>=L)break;w[M++>>>0]=C}else if(C<=2047){if(M+1>=L)break;w[M++>>>0]=192|C>>6,w[M++>>>0]=128|C&63}else if(C<=65535){if(M+2>=L)break;w[M++>>>0]=224|C>>12,w[M++>>>0]=128|C>>6&63,w[M++>>>0]=128|C&63}else{if(M+3>=L)break;w[M++>>>0]=240|C>>18,w[M++>>>0]=128|C>>12&63,w[M++>>>0]=128|C>>6&63,w[M++>>>0]=128|C&63}}return w[M>>>0]=0,M-O}function xt(h,w,M){return It(h,u(),w,M)}var te,We,Ht,zt,Ye,Vt;y&&(te=a.buffer);function Me(h){te=h,a.HEAP8=We=new Int8Array(h),a.HEAP16=new Int16Array(h),a.HEAP32=zt=new Int32Array(h),a.HEAPU8=Ht=new Uint8Array(h),a.HEAPU16=new Uint16Array(h),a.HEAPU32=Ye=new Uint32Array(h),a.HEAPF32=new Float32Array(h),a.HEAPF64=Vt=new Float64Array(h)}var Ke=a.INITIAL_MEMORY||16777216;if(y)q=a.wasmMemory,te=a.buffer;else if(a.wasmMemory)q=a.wasmMemory;else if(q=new WebAssembly.Memory({initial:Ke/65536,maximum:65536,shared:!0}),!(q.buffer instanceof SharedArrayBuffer))throw K("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),_&&K("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");q&&(te=q.buffer),Ke=te.byteLength,Me(te);var oe,kt=[],Gt=[],jt=[];function lt(){return be}function St(){if(a.preRun)for(typeof a.preRun=="function"&&(a.preRun=[a.preRun]);a.preRun.length;)Dn(a.preRun.shift());X(kt)}function Ut(){y||X(Gt)}function qt(){if(!y){if(a.postRun)for(typeof a.postRun=="function"&&(a.postRun=[a.postRun]);a.postRun.length;)An(a.postRun.shift());X(jt)}}function Dn(h){kt.unshift(h)}function Fn(h){Gt.unshift(h)}function An(h){jt.unshift(h)}var Ee=0,Qe=null;function En(h){Ee++,a.monitorRunDependencies&&a.monitorRunDependencies(Ee)}function Cn(h){if(Ee--,a.monitorRunDependencies&&a.monitorRunDependencies(Ee),Ee==0&&Qe){var w=Qe;Qe=null,w()}}function Ze(h){a.onAbort&&a.onAbort(h),h="Aborted("+h+")",K(h),fe=!0,he=1,h+=". Build with -sASSERTIONS for more info.";var w=new WebAssembly.RuntimeError(h);throw m(w),w}var Pn="data:application/octet-stream;base64,";function Mt(h){return h.startsWith(Pn)}function pt(h){return h.startsWith("file://")}var de;de="tfjs-backend-wasm-threaded-simd.wasm",Mt(de)||(de=A(de));function Jt(h){try{if(h==de&&re)return new Uint8Array(re);if(W)return W(h);throw"both async and sync fetching of the wasm failed"}catch(w){Ze(w)}}function Xt(){if(!re&&(I||v)){if(typeof fetch=="function"&&!pt(de))return fetch(de,{credentials:"same-origin"}).then(function(h){if(!h.ok)throw"failed to load wasm binary file at '"+de+"'";return h.arrayBuffer()}).catch(function(){return Jt(de)});if(R)return new Promise(function(h,w){R(de,function(M){h(new Uint8Array(M))},w)})}return Promise.resolve().then(function(){return Jt(de)})}function Yt(){var h={env:La,wasi_snapshot_preview1:La};function w(F,C){var ee=F.exports;if(a.asm=ee,Pe(a.asm._emscripten_tls_init),oe=a.asm.__indirect_function_table,Fn(a.asm.__wasm_call_ctors),xe=C,!y){var ye=D.unusedWorkers.length;D.unusedWorkers.forEach(function(Ne){D.loadWasmModuleToWorker(Ne,function(){--ye||Cn()})})}}y||En();function M(F){w(F.instance,F.module)}function N(F){return Xt().then(function(C){return WebAssembly.instantiate(C,h)}).then(function(C){return C}).then(F,function(C){K("failed to asynchronously prepare wasm: "+C),Ze(C)})}function O(){return!re&&typeof WebAssembly.instantiateStreaming=="function"&&!Mt(de)&&!pt(de)&&!_&&typeof fetch=="function"?fetch(de,{credentials:"same-origin"}).then(function(F){var C=WebAssembly.instantiateStreaming(F,h);return C.then(M,function(ee){return K("wasm streaming compile failed: "+ee),K("falling back to ArrayBuffer instantiation"),N(M)})}):N(M)}if(a.instantiateWasm)try{var L=a.instantiateWasm(h,w);return L}catch(F){K("Module.instantiateWasm callback failed with error: "+F),m(F)}return O().catch(m),{}}var Kt={};function Ce(h){this.name="ExitStatus",this.message="Program terminated with exit("+h+")",this.status=h}function mt(h){var w=D.pthreads[h];delete D.pthreads[h],w.terminate(),Bn(h),D.runningWorkers.splice(D.runningWorkers.indexOf(w),1),w.pthread_ptr=0}function Qt(h){var w=D.pthreads[h];w.postMessage({cmd:"cancel"})}function et(h){var w=D.pthreads[h];Ae(w),D.returnWorkerToPool(w)}function tt(h){var w=D.getNewWorker();if(!w)return 6;D.runningWorkers.push(w),D.pthreads[h.pthread_ptr]=w,w.pthread_ptr=h.pthread_ptr;var M={cmd:"run",start_routine:h.startRoutine,arg:h.arg,pthread_ptr:h.pthread_ptr};return w.runPthread=()=>{_&&w.ref(),w.postMessage(M,h.transferList),delete w.runPthread},w.loaded&&w.runPthread(),0}function Zt(h){if(y)return ft(1,1,h);he=h,lt()||(D.terminateAllThreads(),a.onExit&&a.onExit(h),fe=!0),b(h,new Ce(h))}function x(h,w){if(he=h,!w&&y)throw z(h),"unwind";Zt(h)}var S=x;function P(h){if(h instanceof Ce||h=="unwind")return he;b(1,h)}var D={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init:function(){y?D.initWorker():D.initMainThread()},initMainThread:function(){for(var h=8;h--;)D.allocateUnusedWorker()},initWorker:function(){be=!1},setExitStatus:function(h){he=h},terminateAllThreads:function(){for(var h of Object.values(D.pthreads))D.returnWorkerToPool(h);for(var h of D.unusedWorkers)h.terminate();D.unusedWorkers=[]},returnWorkerToPool:function(h){var w=h.pthread_ptr;delete D.pthreads[w],D.unusedWorkers.push(h),D.runningWorkers.splice(D.runningWorkers.indexOf(h),1),h.pthread_ptr=0,_&&h.unref(),Bn(w)},receiveObjectTransfer:function(h){},threadInitTLS:function(){D.tlsInitFunctions.forEach(h=>h())},loadWasmModuleToWorker:function(h,w){h.onmessage=L=>{var F=L.data,C=F.cmd;if(h.pthread_ptr&&(D.currentProxiedOperationCallerThread=h.pthread_ptr),F.targetThread&&F.targetThread!=an()){var ee=D.pthreads[F.targetThread];ee?ee.postMessage(F,F.transferList):K('Internal error! Worker sent a message "'+C+'" to target pthread '+F.targetThread+", but that thread no longer exists!"),D.currentProxiedOperationCallerThread=void 0;return}C==="processProxyingQueue"?Nn(F.queue):C==="spawnThread"?tt(F):C==="cleanupThread"?et(F.thread):C==="killThread"?mt(F.thread):C==="cancelThread"?Qt(F.thread):C==="loaded"?(h.loaded=!0,_&&h.unref(),w&&w(h),h.runPthread&&h.runPthread()):C==="print"?pe("Thread "+F.threadId+": "+F.text):C==="printErr"?K("Thread "+F.threadId+": "+F.text):C==="alert"?alert("Thread "+F.threadId+": "+F.text):F.target==="setimmediate"?h.postMessage(F):C==="callHandler"?a[F.handler](...F.args):C&&K("worker sent an unknown command "+C),D.currentProxiedOperationCallerThread=void 0},h.onerror=L=>{var F="worker sent an error!";throw K(F+" "+L.filename+":"+L.lineno+": "+L.message),L},_&&(h.on("message",function(L){h.onmessage({data:L})}),h.on("error",function(L){h.onerror(L)}),h.on("detachedExit",function(){}));var M=[],N=["onExit","onAbort","print","printErr"];for(var O of N)a.hasOwnProperty(O)&&M.push(O);h.postMessage({cmd:"load",handlers:M,urlOrBlob:a.mainScriptUrlOrBlob||i,wasmMemory:q,wasmModule:xe})},allocateUnusedWorker:function(){var h,w=A("tfjs-backend-wasm-threaded-simd.worker.js");h=new Worker(w),D.unusedWorkers.push(h)},getNewWorker:function(){return D.unusedWorkers.length==0&&(D.allocateUnusedWorker(),D.loadWasmModuleToWorker(D.unusedWorkers[0])),D.unusedWorkers.pop()}};a.PThread=D;function X(h){for(;h.length>0;)h.shift()(a)}function Q(){var h=an(),w=c()[h+52>>>2],M=c()[h+56>>>2],N=w-M;ja(w,N),rn(w)}a.establishStackSpace=Q;function z(h){if(y)return ft(2,0,h);try{S(h)}catch(w){P(w)}}var $=[];function ne(h){var w=$[h];return w||(h>=$.length&&($.length=h+1),$[h]=w=oe.get(h)),w}function _e(h,w){var M=ne(h)(w);lt()?D.setExitStatus(M):Ga(M)}a.invokeEntryPoint=_e;function Pe(h){D.tlsInitFunctions.push(h)}function en(h){Ha(h,!v,1,!I),D.threadInitTLS()}function Dt(h){y?postMessage({cmd:"cleanupThread",thread:h}):et(h)}function tn(h,w,M,N){return y?ft(3,1,h,w,M,N):ue(h,w,M,N)}function ue(h,w,M,N){if(typeof SharedArrayBuffer>"u")return K("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var O=[],L=0;if(y&&(O.length===0||L))return tn(h,w,M,N);var F={startRoutine:M,pthread_ptr:h,arg:N,transferList:O};return y?(F.cmd="spawnThread",postMessage(F,O),0):tt(F)}function Oe(){return 65536}var nn=!0;function uu(){return nn}function Nn(h){Atomics.store(c(),h>>2,1),an()&&Va(h),Atomics.compareExchange(c(),h>>2,1,0)}a.executeNotifiedProxyingQueue=Nn;function cu(h,w,M,N){if(h==w)setTimeout(()=>Nn(N));else if(y)postMessage({targetThread:h,cmd:"processProxyingQueue",queue:N});else{var O=D.pthreads[h];if(!O)return;O.postMessage({cmd:"processProxyingQueue",queue:N})}return 1}function du(h,w,M){return-1}function lu(){Ze("")}function Ft(h){Ft.shown||(Ft.shown={}),Ft.shown[h]||(Ft.shown[h]=1,_&&(h="warning: "+h),K(h))}function pu(){_||v||Ft("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread")}function mu(){return Date.now()}function Ta(){return 4294901760}function fu(){return Ta()}var Rn;_?Rn=()=>{var h=process.hrtime();return h[0]*1e3+h[1]/1e6}:Rn=()=>performance.timeOrigin+performance.now();function hu(h,w,M){u().copyWithin(h>>>0,w>>>0,w+M>>>0)}function gu(){return _?at.cpus().length:navigator.hardwareConcurrency}function bu(h){var w=Wn(),M=h();return rn(w),M}function ft(h,w){var M=arguments.length-2,N=arguments;return bu(()=>{for(var O=M,L=sn(O*8),F=L>>3,C=0;C<M;C++){var ee=N[2+C];o()[F+C>>>0]=ee}return za(h,O,L,w)})}var Tn=[];function _u(h,w,M){Tn.length=w;for(var N=M>>3,O=0;O<w;O++)Tn[O]=o()[N+O>>>0];var L=h<0,F=L?Kt[-h-1]:Du[h];return F.apply(null,Tn)}function yu(h){try{return q.grow(h-te.byteLength+65535>>>16),Me(q.buffer),1}catch{}}function wu(h){var w=u().length;if(h=h>>>0,h<=w)return!1;var M=Ta();if(h>M)return!1;let N=(ee,ye)=>ee+(ye-ee%ye)%ye;for(var O=1;O<=4;O*=2){var L=w*(1+.2/O);L=Math.min(L,h+100663296);var F=Math.min(M,N(Math.max(h,L),65536)),C=yu(F);if(C)return!0}return!1}function vu(){throw"unwind"}function Ba(h){return y?ft(4,1,h):52}function Wa(h,w,M,N,O){return y?ft(5,1,h,w,M,N,O):70}var Iu=[null,[],[]];function xu(h,w){var M=Iu[h];w===0||w===10?((h===1?pe:K)(ct(M,0)),M.length=0):M.push(w)}function Oa(h,w,M,N){if(y)return ft(6,1,h,w,M,N);for(var O=0,L=0;L<M;L++){var F=d()[w>>>2],C=d()[w+4>>>2];w+=8;for(var ee=0;ee<C;ee++)xu(h,u()[F+ee>>>0]);O+=C}return d()[N>>>2]=O,0}function $a(h){var w=a["_"+h];return w}function ku(h,w){n().set(h,w>>>0)}function Su(h,w,M,N,O){var L={string:ge=>{var ht=0;if(ge!=null&&ge!==0){var Ja=(ge.length<<2)+1;ht=sn(Ja),xt(ge,ht,Ja)}return ht},array:ge=>{var ht=sn(ge.length);return ku(ge,ht),ht}};function F(ge){return w==="string"?dt(ge):w==="boolean"?!!ge:ge}var C=$a(h),ee=[],ye=0;if(N)for(var Ne=0;Ne<N.length;Ne++){var qa=L[M[Ne]];qa?(ye===0&&(ye=Wn()),ee[Ne]=qa(N[Ne])):ee[Ne]=N[Ne]}var On=C.apply(null,ee);function Au(ge){return ye!==0&&rn(ye),F(ge)}return On=Au(On),On}function Mu(h,w,M,N){M=M||[];var O=M.every(F=>F==="number"||F==="boolean"),L=w!=="string";return L&&O&&!N?$a(h):function(){return Su(h,w,M,arguments)}}D.init();var Du=[null,Zt,z,tn,Ba,Wa,Oa],La={__emscripten_init_main_thread_js:en,__emscripten_thread_cleanup:Dt,__pthread_create_js:ue,_emscripten_default_pthread_stack_size:Oe,_emscripten_get_now_is_monotonic:uu,_emscripten_notify_task_queue:cu,_emscripten_set_offscreencanvas_size:du,abort:lu,emscripten_check_blocking_allowed:pu,emscripten_date_now:mu,emscripten_get_heap_max:fu,emscripten_get_now:Rn,emscripten_memcpy_big:hu,emscripten_num_logical_cores:gu,emscripten_receive_on_main_thread_js:_u,emscripten_resize_heap:wu,emscripten_unwind_to_js_event_loop:vu,exit:S,fd_close:Ba,fd_seek:Wa,fd_write:Oa,memory:q||a.wasmMemory};Yt(),a.___wasm_call_ctors=function(){return(a.___wasm_call_ctors=a.asm.__wasm_call_ctors).apply(null,arguments)},a._init=function(){return(a._init=a.asm.init).apply(null,arguments)},a._init_with_threads_count=function(){return(a._init_with_threads_count=a.asm.init_with_threads_count).apply(null,arguments)},a._get_threads_count=function(){return(a._get_threads_count=a.asm.get_threads_count).apply(null,arguments)},a._register_tensor=function(){return(a._register_tensor=a.asm.register_tensor).apply(null,arguments)},a._dispose_data=function(){return(a._dispose_data=a.asm.dispose_data).apply(null,arguments)},a._dispose=function(){return(a._dispose=a.asm.dispose).apply(null,arguments)},a._Abs=function(){return(a._Abs=a.asm.Abs).apply(null,arguments)},a._Acos=function(){return(a._Acos=a.asm.Acos).apply(null,arguments)},a._Acosh=function(){return(a._Acosh=a.asm.Acosh).apply(null,arguments)},a._Add=function(){return(a._Add=a.asm.Add).apply(null,arguments)},a._AddN=function(){return(a._AddN=a.asm.AddN).apply(null,arguments)},a._All=function(){return(a._All=a.asm.All).apply(null,arguments)},a._Any=function(){return(a._Any=a.asm.Any).apply(null,arguments)},a._ArgMax=function(){return(a._ArgMax=a.asm.ArgMax).apply(null,arguments)},a._ArgMin=function(){return(a._ArgMin=a.asm.ArgMin).apply(null,arguments)},a._Asin=function(){return(a._Asin=a.asm.Asin).apply(null,arguments)},a._Asinh=function(){return(a._Asinh=a.asm.Asinh).apply(null,arguments)},a._Atan=function(){return(a._Atan=a.asm.Atan).apply(null,arguments)},a._Atan2=function(){return(a._Atan2=a.asm.Atan2).apply(null,arguments)},a._Atanh=function(){return(a._Atanh=a.asm.Atanh).apply(null,arguments)},a._AvgPool=function(){return(a._AvgPool=a.asm.AvgPool).apply(null,arguments)},a._AvgPool3D=function(){return(a._AvgPool3D=a.asm.AvgPool3D).apply(null,arguments)},a._AvgPool3DGrad=function(){return(a._AvgPool3DGrad=a.asm.AvgPool3DGrad).apply(null,arguments)},a._AvgPoolGrad=function(){return(a._AvgPoolGrad=a.asm.AvgPoolGrad).apply(null,arguments)},a._BatchMatMul=function(){return(a._BatchMatMul=a.asm.BatchMatMul).apply(null,arguments)},a._Bincount=function(){return(a._Bincount=a.asm.Bincount).apply(null,arguments)},a._BitwiseAnd=function(){return(a._BitwiseAnd=a.asm.BitwiseAnd).apply(null,arguments)},a._Ceil=function(){return(a._Ceil=a.asm.Ceil).apply(null,arguments)},a._ClipByValue=function(){return(a._ClipByValue=a.asm.ClipByValue).apply(null,arguments)},a._Conv2D=function(){return(a._Conv2D=a.asm.Conv2D).apply(null,arguments)},a._Conv2DBackpropInput=function(){return(a._Conv2DBackpropInput=a.asm.Conv2DBackpropInput).apply(null,arguments)},a._Conv3D=function(){return(a._Conv3D=a.asm.Conv3D).apply(null,arguments)},a._Conv3DBackpropFilterV2=function(){return(a._Conv3DBackpropFilterV2=a.asm.Conv3DBackpropFilterV2).apply(null,arguments)},a._Conv3DBackpropInputV2=function(){return(a._Conv3DBackpropInputV2=a.asm.Conv3DBackpropInputV2).apply(null,arguments)},a._Cos=function(){return(a._Cos=a.asm.Cos).apply(null,arguments)},a._Cosh=function(){return(a._Cosh=a.asm.Cosh).apply(null,arguments)},a._CropAndResize=function(){return(a._CropAndResize=a.asm.CropAndResize).apply(null,arguments)},a._Cumprod=function(){return(a._Cumprod=a.asm.Cumprod).apply(null,arguments)},a._Cumsum=function(){return(a._Cumsum=a.asm.Cumsum).apply(null,arguments)},a._DenseBincount=function(){return(a._DenseBincount=a.asm.DenseBincount).apply(null,arguments)},a._DepthToSpace=function(){return(a._DepthToSpace=a.asm.DepthToSpace).apply(null,arguments)},a._DepthwiseConv2dNative=function(){return(a._DepthwiseConv2dNative=a.asm.DepthwiseConv2dNative).apply(null,arguments)},a._Diag=function(){return(a._Diag=a.asm.Diag).apply(null,arguments)},a._Dilation2D=function(){return(a._Dilation2D=a.asm.Dilation2D).apply(null,arguments)},a._Dilation2DBackpropFilter=function(){return(a._Dilation2DBackpropFilter=a.asm.Dilation2DBackpropFilter).apply(null,arguments)},a._Dilation2DBackpropInput=function(){return(a._Dilation2DBackpropInput=a.asm.Dilation2DBackpropInput).apply(null,arguments)},a._Elu=function(){return(a._Elu=a.asm.Elu).apply(null,arguments)},a._EluGrad=function(){return(a._EluGrad=a.asm.EluGrad).apply(null,arguments)},a._Equal=function(){return(a._Equal=a.asm.Equal).apply(null,arguments)},a._Erf=function(){return(a._Erf=a.asm.Erf).apply(null,arguments)},a._Exp=function(){return(a._Exp=a.asm.Exp).apply(null,arguments)},a._Expm1=function(){return(a._Expm1=a.asm.Expm1).apply(null,arguments)},a._FlipLeftRight=function(){return(a._FlipLeftRight=a.asm.FlipLeftRight).apply(null,arguments)},a._Floor=function(){return(a._Floor=a.asm.Floor).apply(null,arguments)},a._FloorDiv=function(){return(a._FloorDiv=a.asm.FloorDiv).apply(null,arguments)},a._FusedBatchNorm=function(){return(a._FusedBatchNorm=a.asm.FusedBatchNorm).apply(null,arguments)},a._FusedConv2D=function(){return(a._FusedConv2D=a.asm.FusedConv2D).apply(null,arguments)},a._FusedDepthwiseConv2D=function(){return(a._FusedDepthwiseConv2D=a.asm.FusedDepthwiseConv2D).apply(null,arguments)},a._Gather=function(){return(a._Gather=a.asm.Gather).apply(null,arguments)},a._GatherNd=function(){return(a._GatherNd=a.asm.GatherNd).apply(null,arguments)},a._Greater=function(){return(a._Greater=a.asm.Greater).apply(null,arguments)},a._GreaterEqual=function(){return(a._GreaterEqual=a.asm.GreaterEqual).apply(null,arguments)},a._IsFinite=function(){return(a._IsFinite=a.asm.IsFinite).apply(null,arguments)},a._IsInf=function(){return(a._IsInf=a.asm.IsInf).apply(null,arguments)},a._IsNan=function(){return(a._IsNan=a.asm.IsNan).apply(null,arguments)},a._LRN=function(){return(a._LRN=a.asm.LRN).apply(null,arguments)},a._LRNGrad=function(){return(a._LRNGrad=a.asm.LRNGrad).apply(null,arguments)},a._LeakyRelu=function(){return(a._LeakyRelu=a.asm.LeakyRelu).apply(null,arguments)},a._Less=function(){return(a._Less=a.asm.Less).apply(null,arguments)},a._LessEqual=function(){return(a._LessEqual=a.asm.LessEqual).apply(null,arguments)},a._LinSpace=function(){return(a._LinSpace=a.asm.LinSpace).apply(null,arguments)},a._Log=function(){return(a._Log=a.asm.Log).apply(null,arguments)},a._Log1p=function(){return(a._Log1p=a.asm.Log1p).apply(null,arguments)},a._LogicalAnd=function(){return(a._LogicalAnd=a.asm.LogicalAnd).apply(null,arguments)},a._LogicalNot=function(){return(a._LogicalNot=a.asm.LogicalNot).apply(null,arguments)},a._LogicalOr=function(){return(a._LogicalOr=a.asm.LogicalOr).apply(null,arguments)},a._LogicalXor=function(){return(a._LogicalXor=a.asm.LogicalXor).apply(null,arguments)},a._Max=function(){return(a._Max=a.asm.Max).apply(null,arguments)},a._MaxPool=function(){return(a._MaxPool=a.asm.MaxPool).apply(null,arguments)},a._MaxPool3D=function(){return(a._MaxPool3D=a.asm.MaxPool3D).apply(null,arguments)},a._MaxPool3DGrad=function(){return(a._MaxPool3DGrad=a.asm.MaxPool3DGrad).apply(null,arguments)},a._MaxPoolGrad=function(){return(a._MaxPoolGrad=a.asm.MaxPoolGrad).apply(null,arguments)},a._MaxPoolWithArgmax=function(){return(a._MaxPoolWithArgmax=a.asm.MaxPoolWithArgmax).apply(null,arguments)},a._Maximum=function(){return(a._Maximum=a.asm.Maximum).apply(null,arguments)},a._Mean=function(){return(a._Mean=a.asm.Mean).apply(null,arguments)},a._Min=function(){return(a._Min=a.asm.Min).apply(null,arguments)},a._Minimum=function(){return(a._Minimum=a.asm.Minimum).apply(null,arguments)},a._MirrorPad=function(){return(a._MirrorPad=a.asm.MirrorPad).apply(null,arguments)},a._Mod=function(){return(a._Mod=a.asm.Mod).apply(null,arguments)},a._Multinomial=function(){return(a._Multinomial=a.asm.Multinomial).apply(null,arguments)},a._Multiply=function(){return(a._Multiply=a.asm.Multiply).apply(null,arguments)},a._Neg=function(){return(a._Neg=a.asm.Neg).apply(null,arguments)},a._NonMaxSuppressionV3=function(){return(a._NonMaxSuppressionV3=a.asm.NonMaxSuppressionV3).apply(null,arguments)},a._NonMaxSuppressionV4=function(){return(a._NonMaxSuppressionV4=a.asm.NonMaxSuppressionV4).apply(null,arguments)},a._NonMaxSuppressionV5=function(){return(a._NonMaxSuppressionV5=a.asm.NonMaxSuppressionV5).apply(null,arguments)},a._NotEqual=function(){return(a._NotEqual=a.asm.NotEqual).apply(null,arguments)},a._OneHot=function(){return(a._OneHot=a.asm.OneHot).apply(null,arguments)},a._PadV2=function(){return(a._PadV2=a.asm.PadV2).apply(null,arguments)},a._Pow=function(){return(a._Pow=a.asm.Pow).apply(null,arguments)},a._Prelu=function(){return(a._Prelu=a.asm.Prelu).apply(null,arguments)},a._Prod=function(){return(a._Prod=a.asm.Prod).apply(null,arguments)},a._RealDiv=function(){return(a._RealDiv=a.asm.RealDiv).apply(null,arguments)},a._Reciprocal=function(){return(a._Reciprocal=a.asm.Reciprocal).apply(null,arguments)},a._Relu=function(){return(a._Relu=a.asm.Relu).apply(null,arguments)},a._Relu6=function(){return(a._Relu6=a.asm.Relu6).apply(null,arguments)},a._ResizeBilinear=function(){return(a._ResizeBilinear=a.asm.ResizeBilinear).apply(null,arguments)},a._ResizeBilinearGrad=function(){return(a._ResizeBilinearGrad=a.asm.ResizeBilinearGrad).apply(null,arguments)},a._ResizeNearestNeighbor=function(){return(a._ResizeNearestNeighbor=a.asm.ResizeNearestNeighbor).apply(null,arguments)},a._ResizeNearestNeighborGrad=function(){return(a._ResizeNearestNeighborGrad=a.asm.ResizeNearestNeighborGrad).apply(null,arguments)},a._Reverse=function(){return(a._Reverse=a.asm.Reverse).apply(null,arguments)},a._RotateWithOffset=function(){return(a._RotateWithOffset=a.asm.RotateWithOffset).apply(null,arguments)},a._Round=function(){return(a._Round=a.asm.Round).apply(null,arguments)},a._Rsqrt=function(){return(a._Rsqrt=a.asm.Rsqrt).apply(null,arguments)},a._ScatterNd=function(){return(a._ScatterNd=a.asm.ScatterNd).apply(null,arguments)},a._SearchSorted=function(){return(a._SearchSorted=a.asm.SearchSorted).apply(null,arguments)},a._SelectV2=function(){return(a._SelectV2=a.asm.SelectV2).apply(null,arguments)},a._Selu=function(){return(a._Selu=a.asm.Selu).apply(null,arguments)},a._Sigmoid=function(){return(a._Sigmoid=a.asm.Sigmoid).apply(null,arguments)},a._Sign=function(){return(a._Sign=a.asm.Sign).apply(null,arguments)},a._Sin=function(){return(a._Sin=a.asm.Sin).apply(null,arguments)},a._Sinh=function(){return(a._Sinh=a.asm.Sinh).apply(null,arguments)},a._Softmax=function(){return(a._Softmax=a.asm.Softmax).apply(null,arguments)},a._Softplus=function(){return(a._Softplus=a.asm.Softplus).apply(null,arguments)},a._SparseFillEmptyRows=function(){return(a._SparseFillEmptyRows=a.asm.SparseFillEmptyRows).apply(null,arguments)},a._SparseReshape=function(){return(a._SparseReshape=a.asm.SparseReshape).apply(null,arguments)},a._SparseSegmentReduction=function(){return(a._SparseSegmentReduction=a.asm.SparseSegmentReduction).apply(null,arguments)},a._SparseToDense=function(){return(a._SparseToDense=a.asm.SparseToDense).apply(null,arguments)},a._Sqrt=function(){return(a._Sqrt=a.asm.Sqrt).apply(null,arguments)},a._Square=function(){return(a._Square=a.asm.Square).apply(null,arguments)},a._SquaredDifference=function(){return(a._SquaredDifference=a.asm.SquaredDifference).apply(null,arguments)},a._Step=function(){return(a._Step=a.asm.Step).apply(null,arguments)},a._StridedSlice=function(){return(a._StridedSlice=a.asm.StridedSlice).apply(null,arguments)},a._Sub=function(){return(a._Sub=a.asm.Sub).apply(null,arguments)},a._Sum=function(){return(a._Sum=a.asm.Sum).apply(null,arguments)},a._Tan=function(){return(a._Tan=a.asm.Tan).apply(null,arguments)},a._Tanh=function(){return(a._Tanh=a.asm.Tanh).apply(null,arguments)},a._TensorScatterUpdate=function(){return(a._TensorScatterUpdate=a.asm.TensorScatterUpdate).apply(null,arguments)},a._Tile=function(){return(a._Tile=a.asm.Tile).apply(null,arguments)},a._TopK=function(){return(a._TopK=a.asm.TopK).apply(null,arguments)},a._Transform=function(){return(a._Transform=a.asm.Transform).apply(null,arguments)},a._Transpose=function(){return(a._Transpose=a.asm.Transpose).apply(null,arguments)},a.__FusedMatMul=function(){return(a.__FusedMatMul=a.asm._FusedMatMul).apply(null,arguments)},a._malloc=function(){return(a._malloc=a.asm.malloc).apply(null,arguments)},a._free=function(){return(a._free=a.asm.free).apply(null,arguments)},a.__emscripten_tls_init=function(){return(a.__emscripten_tls_init=a.asm._emscripten_tls_init).apply(null,arguments)};var an=a._pthread_self=function(){return(an=a._pthread_self=a.asm.pthread_self).apply(null,arguments)};a.___errno_location=function(){return(a.___errno_location=a.asm.__errno_location).apply(null,arguments)};var Ha=a.__emscripten_thread_init=function(){return(Ha=a.__emscripten_thread_init=a.asm._emscripten_thread_init).apply(null,arguments)};a.__emscripten_thread_crashed=function(){return(a.__emscripten_thread_crashed=a.asm._emscripten_thread_crashed).apply(null,arguments)},a._emscripten_main_thread_process_queued_calls=function(){return(a._emscripten_main_thread_process_queued_calls=a.asm.emscripten_main_thread_process_queued_calls).apply(null,arguments)},a._emscripten_main_browser_thread_id=function(){return(a._emscripten_main_browser_thread_id=a.asm.emscripten_main_browser_thread_id).apply(null,arguments)};var za=a._emscripten_run_in_main_runtime_thread_js=function(){return(za=a._emscripten_run_in_main_runtime_thread_js=a.asm.emscripten_run_in_main_runtime_thread_js).apply(null,arguments)};a._emscripten_dispatch_to_thread_=function(){return(a._emscripten_dispatch_to_thread_=a.asm.emscripten_dispatch_to_thread_).apply(null,arguments)};var Va=a.__emscripten_proxy_execute_task_queue=function(){return(Va=a.__emscripten_proxy_execute_task_queue=a.asm._emscripten_proxy_execute_task_queue).apply(null,arguments)},Bn=a.__emscripten_thread_free_data=function(){return(Bn=a.__emscripten_thread_free_data=a.asm._emscripten_thread_free_data).apply(null,arguments)},Ga=a.__emscripten_thread_exit=function(){return(Ga=a.__emscripten_thread_exit=a.asm._emscripten_thread_exit).apply(null,arguments)},ja=a._emscripten_stack_set_limits=function(){return(ja=a._emscripten_stack_set_limits=a.asm.emscripten_stack_set_limits).apply(null,arguments)},Wn=a.stackSave=function(){return(Wn=a.stackSave=a.asm.stackSave).apply(null,arguments)},rn=a.stackRestore=function(){return(rn=a.stackRestore=a.asm.stackRestore).apply(null,arguments)},sn=a.stackAlloc=function(){return(sn=a.stackAlloc=a.asm.stackAlloc).apply(null,arguments)};a.dynCall_iijjiiii=function(){return(a.dynCall_iijjiiii=a.asm.dynCall_iijjiiii).apply(null,arguments)},a.dynCall_jiji=function(){return(a.dynCall_jiji=a.asm.dynCall_jiji).apply(null,arguments)},a.keepRuntimeAlive=lt,a.wasmMemory=q,a.cwrap=Mu,a.ExitStatus=Ce,a.PThread=D;var on;Qe=function h(){on||Ua(),on||(Qe=h)};function Ua(h){if(Ee>0)return;if(y){l(a),Ut(),startWorker(a);return}if(St(),Ee>0)return;function w(){on||(on=!0,a.calledRun=!0,!fe&&(Ut(),l(a),a.onRuntimeInitialized&&a.onRuntimeInitialized(),qt()))}a.setStatus?(a.setStatus("Running..."),setTimeout(function(){setTimeout(function(){a.setStatus("")},1),w()},1)):w()}if(a.preInit)for(typeof a.preInit=="function"&&(a.preInit=[a.preInit]);a.preInit.length>0;)a.preInit.pop()();Ua();var un;p&&(un={uncaughtException:process.listeners("uncaughtException").filter(function(h){return!p.uncaughtException.indexOf(h)>-1}),unhandledRejection:process.listeners("unhandledRejection").filter(function(h){return!p.unhandledRejection.indexOf(h)>-1})});var cn;if(typeof WasmBackendModule<"u")cn=WasmBackendModule;else if(typeof s<"u")cn=s;else throw new Error("Could not find wasm module in post.js");if(un){var Fu=cn._dispose;cn._dispose=function(){Fu(),un.uncaughtException.forEach(function(h){process.removeListener("uncaughtException",h)}),un.unhandledRejection.forEach(function(h){process.removeListener("unhandledRejection",h)})}}return s.ready}})();e.exports=r})(Qi);var Zi=Qi.exports;const eo=vs(Zi),wb=il({__proto__:null,default:eo},[Zi]);var vb=`"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(f){(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f)},postMessage:function(msg){parentPort.postMessage(msg)},performance:global.performance||{now:function(){return Date.now()}}})}var initializedJS=false;var pendingNotifiedProxyingQueues=[];function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"
");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var instance=new WebAssembly.Instance(Module["wasmModule"],info);receiveInstance(instance);Module["wasmModule"]=null;return instance.exports};self.onunhandledrejection=e=>{throw e.reason??e};self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"})};self.onmessage=e=>{try{if(e.data.cmd==="load"){Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=function(){postMessage({cmd:"callHandler",handler:handler,args:[...arguments]})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}WasmBackendModuleThreadedSimd(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,0,0,1);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){pendingNotifiedProxyingQueues.forEach(queue=>{Module["executeNotifiedProxyingQueue"](queue)});pendingNotifiedProxyingQueues=[];initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){if(ex instanceof Module["ExitStatus"]){if(Module["keepRuntimeAlive"]()){}else{Module["__emscripten_thread_exit"](ex.status)}}else{throw ex}}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="processProxyingQueue"){if(initializedJS){Module["executeNotifiedProxyingQueue"](e.data.queue)}else{pendingNotifiedProxyingQueues.push(e.data.queue)}}else if(e.data.cmd){err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}};`,to={exports:{}};(function(e,t){var r=(()=>{var i=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(i=i||__filename),function(s){s=s||{};var n=typeof s<"u"?s:{},u,c;n.ready=new Promise(function(x,S){u=x,c=S});var d;typeof process<"u"&&process.listeners&&(d={uncaughtException:process.listeners("uncaughtException"),unhandledRejection:process.listeners("unhandledRejection")});var o=Object.assign({},n),a=typeof window=="object",l=typeof importScripts=="function",m=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",p="";function g(x){return n.locateFile?n.locateFile(x,p):p+x}var b,I,v;if(m){var _=at,y=at;l?p=y.dirname(p)+"/":p=__dirname+"/",b=(x,S)=>(x=Ke(x)?new URL(x):y.normalize(x),_.readFileSync(x,S?void 0:"utf8")),v=x=>{var S=b(x,!0);return S.buffer||(S=new Uint8Array(S)),S},I=(x,S,P)=>{x=Ke(x)?new URL(x):y.normalize(x),_.readFile(x,function(D,X){D?P(D):S(X.buffer)})},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(x){if(!(x instanceof lt))throw x}),process.on("unhandledRejection",function(x){throw x}),n.inspect=function(){return"[Emscripten Module object]"}}else(a||l)&&(l?p=self.location.href:typeof document<"u"&&document.currentScript&&(p=document.currentScript.src),i&&(p=i),p.indexOf("blob:")!==0?p=p.substr(0,p.replace(/[?#].*/,"").lastIndexOf("/")+1):p="",b=x=>{var S=new XMLHttpRequest;return S.open("GET",x,!1),S.send(null),S.responseText},l&&(v=x=>{var S=new XMLHttpRequest;return S.open("GET",x,!1),S.responseType="arraybuffer",S.send(null),new Uint8Array(S.response)}),I=(x,S,P)=>{var D=new XMLHttpRequest;D.open("GET",x,!0),D.responseType="arraybuffer",D.onload=()=>{if(D.status==200||D.status==0&&D.response){S(D.response);return}P()},D.onerror=P,D.send(null)});var k=n.print||console.log.bind(console),A=n.printErr||console.warn.bind(console);Object.assign(n,o),o=null,n.arguments&&n.arguments,n.thisProgram&&n.thisProgram,n.quit&&n.quit;var E;n.wasmBinary&&(E=n.wasmBinary),n.noExitRuntime,typeof WebAssembly!="object"&&Ye("no native wasm support detected");var R,W=!1,H=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0;function B(x,S,P){S>>>=0;for(var D=S+P,X=S;x[X]&&!(X>=D);)++X;if(X-S>16&&x.buffer&&H)return H.decode(x.subarray(S,X));for(var Q="";S<X;){var z=x[S++];if(!(z&128)){Q+=String.fromCharCode(z);continue}var $=x[S++]&63;if((z&224)==192){Q+=String.fromCharCode((z&31)<<6|$);continue}var ne=x[S++]&63;if((z&240)==224?z=(z&15)<<12|$<<6|ne:z=(z&7)<<18|$<<12|ne<<6|x[S++]&63,z<65536)Q+=String.fromCharCode(z);else{var _e=z-65536;Q+=String.fromCharCode(55296|_e>>10,56320|_e&1023)}}return Q}function V(x,S){return x>>>=0,x?B(re,x,S):""}function U(x,S,P,D){if(P>>>=0,!(D>0))return 0;for(var X=P,Q=P+D-1,z=0;z<x.length;++z){var $=x.charCodeAt(z);if($>=55296&&$<=57343){var ne=x.charCodeAt(++z);$=65536+(($&1023)<<10)|ne&1023}if($<=127){if(P>=Q)break;S[P++>>>0]=$}else if($<=2047){if(P+1>=Q)break;S[P++>>>0]=192|$>>6,S[P++>>>0]=128|$&63}else if($<=65535){if(P+2>=Q)break;S[P++>>>0]=224|$>>12,S[P++>>>0]=128|$>>6&63,S[P++>>>0]=128|$&63}else{if(P+3>=Q)break;S[P++>>>0]=240|$>>18,S[P++>>>0]=128|$>>12&63,S[P++>>>0]=128|$>>6&63,S[P++>>>0]=128|$&63}}return S[P>>>0]=0,P-X}function Z(x,S,P){return U(x,re,S,P)}var pe,K,re,be;function q(x){pe=x,n.HEAP8=K=new Int8Array(x),n.HEAP16=new Int16Array(x),n.HEAP32=new Int32Array(x),n.HEAPU8=re=new Uint8Array(x),n.HEAPU16=new Uint16Array(x),n.HEAPU32=be=new Uint32Array(x),n.HEAPF32=new Float32Array(x),n.HEAPF64=new Float64Array(x)}n.INITIAL_MEMORY;var xe=[],fe=[],he=[];function Ae(){if(n.preRun)for(typeof n.preRun=="function"&&(n.preRun=[n.preRun]);n.preRun.length;)dt(n.preRun.shift());St(xe)}function ie(){St(fe)}function ct(){if(n.postRun)for(typeof n.postRun=="function"&&(n.postRun=[n.postRun]);n.postRun.length;)xt(n.postRun.shift());St(he)}function dt(x){xe.unshift(x)}function It(x){fe.unshift(x)}function xt(x){he.unshift(x)}var te=0,We=null;function Ht(x){te++,n.monitorRunDependencies&&n.monitorRunDependencies(te)}function zt(x){if(te--,n.monitorRunDependencies&&n.monitorRunDependencies(te),te==0&&We){var S=We;We=null,S()}}function Ye(x){n.onAbort&&n.onAbort(x),x="Aborted("+x+")",A(x),W=!0,x+=". Build with -sASSERTIONS for more info.";var S=new WebAssembly.RuntimeError(x);throw c(S),S}var Vt="data:application/octet-stream;base64,";function Me(x){return x.startsWith(Vt)}function Ke(x){return x.startsWith("file://")}var oe;oe="tfjs-backend-wasm.wasm",Me(oe)||(oe=g(oe));function kt(x){try{if(x==oe&&E)return new Uint8Array(E);if(v)return v(x);throw"both async and sync fetching of the wasm failed"}catch(S){Ye(S)}}function Gt(){if(!E&&(a||l)){if(typeof fetch=="function"&&!Ke(oe))return fetch(oe,{credentials:"same-origin"}).then(function(x){if(!x.ok)throw"failed to load wasm binary file at '"+oe+"'";return x.arrayBuffer()}).catch(function(){return kt(oe)});if(I)return new Promise(function(x,S){I(oe,function(P){x(new Uint8Array(P))},S)})}return Promise.resolve().then(function(){return kt(oe)})}function jt(){var x={env:Xt,wasi_snapshot_preview1:Xt};function S(z,$){var ne=z.exports;n.asm=ne,R=n.asm.memory,q(R.buffer),n.asm.__indirect_function_table,It(n.asm.__wasm_call_ctors),zt()}Ht();function P(z){S(z.instance)}function D(z){return Gt().then(function($){return WebAssembly.instantiate($,x)}).then(function($){return $}).then(z,function($){A("failed to asynchronously prepare wasm: "+$),Ye($)})}function X(){return!E&&typeof WebAssembly.instantiateStreaming=="function"&&!Me(oe)&&!Ke(oe)&&!m&&typeof fetch=="function"?fetch(oe,{credentials:"same-origin"}).then(function(z){var $=WebAssembly.instantiateStreaming(z,x);return $.then(P,function(ne){return A("wasm streaming compile failed: "+ne),A("falling back to ArrayBuffer instantiation"),D(P)})}):D(P)}if(n.instantiateWasm)try{var Q=n.instantiateWasm(x,S);return Q}catch(z){A("Module.instantiateWasm callback failed with error: "+z),c(z)}return X().catch(c),{}}function lt(x){this.name="ExitStatus",this.message="Program terminated with exit("+x+")",this.status=x}function St(x){for(;x.length>0;)x.shift()(n)}function Ut(){Ye("")}function qt(){return 4294901760}function Dn(){return qt()}function Fn(x,S,P){re.copyWithin(x>>>0,S>>>0,S+P>>>0)}function An(x){try{return R.grow(x-pe.byteLength+65535>>>16),q(R.buffer),1}catch{}}function Ee(x){var S=re.length;x=x>>>0;var P=qt();if(x>P)return!1;let D=(ne,_e)=>ne+(_e-ne%_e)%_e;for(var X=1;X<=4;X*=2){var Q=S*(1+.2/X);Q=Math.min(Q,x+100663296);var z=Math.min(P,D(Math.max(x,Q),65536)),$=An(z);if($)return!0}return!1}function Qe(x){return 52}function En(x,S,P,D,X){return 70}var Cn=[null,[],[]];function Ze(x,S){var P=Cn[x];S===0||S===10?((x===1?k:A)(B(P,0)),P.length=0):P.push(S)}function Pn(x,S,P,D){for(var X=0,Q=0;Q<P;Q++){var z=be[S>>>2],$=be[S+4>>>2];S+=8;for(var ne=0;ne<$;ne++)Ze(x,re[z+ne>>>0]);X+=$}return be[D>>>2]=X,0}function Mt(x){var S=n["_"+x];return S}function pt(x,S){K.set(x,S>>>0)}function de(x,S,P,D,X){var Q={string:ue=>{var Oe=0;if(ue!=null&&ue!==0){var nn=(ue.length<<2)+1;Oe=Ce(nn),Z(ue,Oe,nn)}return Oe},array:ue=>{var Oe=Ce(ue.length);return pt(ue,Oe),Oe}};function z(ue){return S==="string"?V(ue):S==="boolean"?!!ue:ue}var $=Mt(x),ne=[],_e=0;if(D)for(var Pe=0;Pe<D.length;Pe++){var en=Q[P[Pe]];en?(_e===0&&(_e=Yt()),ne[Pe]=en(D[Pe])):ne[Pe]=D[Pe]}var Dt=$.apply(null,ne);function tn(ue){return _e!==0&&Kt(_e),z(ue)}return Dt=tn(Dt),Dt}function Jt(x,S,P,D){P=P||[];var X=P.every(z=>z==="number"||z==="boolean"),Q=S!=="string";return Q&&X&&!D?Mt(x):function(){return de(x,S,P,arguments)}}var Xt={abort:Ut,emscripten_get_heap_max:Dn,emscripten_memcpy_big:Fn,emscripten_resize_heap:Ee,fd_close:Qe,fd_seek:En,fd_write:Pn};jt(),n.___wasm_call_ctors=function(){return(n.___wasm_call_ctors=n.asm.__wasm_call_ctors).apply(null,arguments)},n._init=function(){return(n._init=n.asm.init).apply(null,arguments)},n._init_with_threads_count=function(){return(n._init_with_threads_count=n.asm.init_with_threads_count).apply(null,arguments)},n._get_threads_count=function(){return(n._get_threads_count=n.asm.get_threads_count).apply(null,arguments)},n._register_tensor=function(){return(n._register_tensor=n.asm.register_tensor).apply(null,arguments)},n._dispose_data=function(){return(n._dispose_data=n.asm.dispose_data).apply(null,arguments)},n._dispose=function(){return(n._dispose=n.asm.dispose).apply(null,arguments)},n._Abs=function(){return(n._Abs=n.asm.Abs).apply(null,arguments)},n._Acos=function(){return(n._Acos=n.asm.Acos).apply(null,arguments)},n._Acosh=function(){return(n._Acosh=n.asm.Acosh).apply(null,arguments)},n._Add=function(){return(n._Add=n.asm.Add).apply(null,arguments)},n._AddN=function(){return(n._AddN=n.asm.AddN).apply(null,arguments)},n._All=function(){return(n._All=n.asm.All).apply(null,arguments)},n._Any=function(){return(n._Any=n.asm.Any).apply(null,arguments)},n._ArgMax=function(){return(n._ArgMax=n.asm.ArgMax).apply(null,arguments)},n._ArgMin=function(){return(n._ArgMin=n.asm.ArgMin).apply(null,arguments)},n._Asin=function(){return(n._Asin=n.asm.Asin).apply(null,arguments)},n._Asinh=function(){return(n._Asinh=n.asm.Asinh).apply(null,arguments)},n._Atan=function(){return(n._Atan=n.asm.Atan).apply(null,arguments)},n._Atan2=function(){return(n._Atan2=n.asm.Atan2).apply(null,arguments)},n._Atanh=function(){return(n._Atanh=n.asm.Atanh).apply(null,arguments)},n._AvgPool=function(){return(n._AvgPool=n.asm.AvgPool).apply(null,arguments)},n._AvgPool3D=function(){return(n._AvgPool3D=n.asm.AvgPool3D).apply(null,arguments)},n._AvgPool3DGrad=function(){return(n._AvgPool3DGrad=n.asm.AvgPool3DGrad).apply(null,arguments)},n._AvgPoolGrad=function(){return(n._AvgPoolGrad=n.asm.AvgPoolGrad).apply(null,arguments)},n._BatchMatMul=function(){return(n._BatchMatMul=n.asm.BatchMatMul).apply(null,arguments)},n._Bincount=function(){return(n._Bincount=n.asm.Bincount).apply(null,arguments)},n._BitwiseAnd=function(){return(n._BitwiseAnd=n.asm.BitwiseAnd).apply(null,arguments)},n._Ceil=function(){return(n._Ceil=n.asm.Ceil).apply(null,arguments)},n._ClipByValue=function(){return(n._ClipByValue=n.asm.ClipByValue).apply(null,arguments)},n._Conv2D=function(){return(n._Conv2D=n.asm.Conv2D).apply(null,arguments)},n._Conv2DBackpropInput=function(){return(n._Conv2DBackpropInput=n.asm.Conv2DBackpropInput).apply(null,arguments)},n._Conv3D=function(){return(n._Conv3D=n.asm.Conv3D).apply(null,arguments)},n._Conv3DBackpropFilterV2=function(){return(n._Conv3DBackpropFilterV2=n.asm.Conv3DBackpropFilterV2).apply(null,arguments)},n._Conv3DBackpropInputV2=function(){return(n._Conv3DBackpropInputV2=n.asm.Conv3DBackpropInputV2).apply(null,arguments)},n._Cos=function(){return(n._Cos=n.asm.Cos).apply(null,arguments)},n._Cosh=function(){return(n._Cosh=n.asm.Cosh).apply(null,arguments)},n._CropAndResize=function(){return(n._CropAndResize=n.asm.CropAndResize).apply(null,arguments)},n._Cumprod=function(){return(n._Cumprod=n.asm.Cumprod).apply(null,arguments)},n._Cumsum=function(){return(n._Cumsum=n.asm.Cumsum).apply(null,arguments)},n._DenseBincount=function(){return(n._DenseBincount=n.asm.DenseBincount).apply(null,arguments)},n._DepthToSpace=function(){return(n._DepthToSpace=n.asm.DepthToSpace).apply(null,arguments)},n._DepthwiseConv2dNative=function(){return(n._DepthwiseConv2dNative=n.asm.DepthwiseConv2dNative).apply(null,arguments)},n._Diag=function(){return(n._Diag=n.asm.Diag).apply(null,arguments)},n._Dilation2D=function(){return(n._Dilation2D=n.asm.Dilation2D).apply(null,arguments)},n._Dilation2DBackpropFilter=function(){return(n._Dilation2DBackpropFilter=n.asm.Dilation2DBackpropFilter).apply(null,arguments)},n._Dilation2DBackpropInput=function(){return(n._Dilation2DBackpropInput=n.asm.Dilation2DBackpropInput).apply(null,arguments)},n._Elu=function(){return(n._Elu=n.asm.Elu).apply(null,arguments)},n._EluGrad=function(){return(n._EluGrad=n.asm.EluGrad).apply(null,arguments)},n._Equal=function(){return(n._Equal=n.asm.Equal).apply(null,arguments)},n._Erf=function(){return(n._Erf=n.asm.Erf).apply(null,arguments)},n._Exp=function(){return(n._Exp=n.asm.Exp).apply(null,arguments)},n._Expm1=function(){return(n._Expm1=n.asm.Expm1).apply(null,arguments)},n._FlipLeftRight=function(){return(n._FlipLeftRight=n.asm.FlipLeftRight).apply(null,arguments)},n._Floor=function(){return(n._Floor=n.asm.Floor).apply(null,arguments)},n._FloorDiv=function(){return(n._FloorDiv=n.asm.FloorDiv).apply(null,arguments)},n._FusedBatchNorm=function(){return(n._FusedBatchNorm=n.asm.FusedBatchNorm).apply(null,arguments)},n._FusedConv2D=function(){return(n._FusedConv2D=n.asm.FusedConv2D).apply(null,arguments)},n._FusedDepthwiseConv2D=function(){return(n._FusedDepthwiseConv2D=n.asm.FusedDepthwiseConv2D).apply(null,arguments)},n._Gather=function(){return(n._Gather=n.asm.Gather).apply(null,arguments)},n._GatherNd=function(){return(n._GatherNd=n.asm.GatherNd).apply(null,arguments)},n._Greater=function(){return(n._Greater=n.asm.Greater).apply(null,arguments)},n._GreaterEqual=function(){return(n._GreaterEqual=n.asm.GreaterEqual).apply(null,arguments)},n._IsFinite=function(){return(n._IsFinite=n.asm.IsFinite).apply(null,arguments)},n._IsInf=function(){return(n._IsInf=n.asm.IsInf).apply(null,arguments)},n._IsNan=function(){return(n._IsNan=n.asm.IsNan).apply(null,arguments)},n._LRN=function(){return(n._LRN=n.asm.LRN).apply(null,arguments)},n._LRNGrad=function(){return(n._LRNGrad=n.asm.LRNGrad).apply(null,arguments)},n._LeakyRelu=function(){return(n._LeakyRelu=n.asm.LeakyRelu).apply(null,arguments)},n._Less=function(){return(n._Less=n.asm.Less).apply(null,arguments)},n._LessEqual=function(){return(n._LessEqual=n.asm.LessEqual).apply(null,arguments)},n._LinSpace=function(){return(n._LinSpace=n.asm.LinSpace).apply(null,arguments)},n._Log=function(){return(n._Log=n.asm.Log).apply(null,arguments)},n._Log1p=function(){return(n._Log1p=n.asm.Log1p).apply(null,arguments)},n._LogicalAnd=function(){return(n._LogicalAnd=n.asm.LogicalAnd).apply(null,arguments)},n._LogicalNot=function(){return(n._LogicalNot=n.asm.LogicalNot).apply(null,arguments)},n._LogicalOr=function(){return(n._LogicalOr=n.asm.LogicalOr).apply(null,arguments)},n._LogicalXor=function(){return(n._LogicalXor=n.asm.LogicalXor).apply(null,arguments)},n._Max=function(){return(n._Max=n.asm.Max).apply(null,arguments)},n._MaxPool=function(){return(n._MaxPool=n.asm.MaxPool).apply(null,arguments)},n._MaxPool3D=function(){return(n._MaxPool3D=n.asm.MaxPool3D).apply(null,arguments)},n._MaxPool3DGrad=function(){return(n._MaxPool3DGrad=n.asm.MaxPool3DGrad).apply(null,arguments)},n._MaxPoolGrad=function(){return(n._MaxPoolGrad=n.asm.MaxPoolGrad).apply(null,arguments)},n._MaxPoolWithArgmax=function(){return(n._MaxPoolWithArgmax=n.asm.MaxPoolWithArgmax).apply(null,arguments)},n._Maximum=function(){return(n._Maximum=n.asm.Maximum).apply(null,arguments)},n._Mean=function(){return(n._Mean=n.asm.Mean).apply(null,arguments)},n._Min=function(){return(n._Min=n.asm.Min).apply(null,arguments)},n._Minimum=function(){return(n._Minimum=n.asm.Minimum).apply(null,arguments)},n._MirrorPad=function(){return(n._MirrorPad=n.asm.MirrorPad).apply(null,arguments)},n._Mod=function(){return(n._Mod=n.asm.Mod).apply(null,arguments)},n._Multinomial=function(){return(n._Multinomial=n.asm.Multinomial).apply(null,arguments)},n._Multiply=function(){return(n._Multiply=n.asm.Multiply).apply(null,arguments)},n._Neg=function(){return(n._Neg=n.asm.Neg).apply(null,arguments)},n._NonMaxSuppressionV3=function(){return(n._NonMaxSuppressionV3=n.asm.NonMaxSuppressionV3).apply(null,arguments)},n._NonMaxSuppressionV4=function(){return(n._NonMaxSuppressionV4=n.asm.NonMaxSuppressionV4).apply(null,arguments)},n._NonMaxSuppressionV5=function(){return(n._NonMaxSuppressionV5=n.asm.NonMaxSuppressionV5).apply(null,arguments)},n._NotEqual=function(){return(n._NotEqual=n.asm.NotEqual).apply(null,arguments)},n._OneHot=function(){return(n._OneHot=n.asm.OneHot).apply(null,arguments)},n._PadV2=function(){return(n._PadV2=n.asm.PadV2).apply(null,arguments)},n._Pow=function(){return(n._Pow=n.asm.Pow).apply(null,arguments)},n._Prelu=function(){return(n._Prelu=n.asm.Prelu).apply(null,arguments)},n._Prod=function(){return(n._Prod=n.asm.Prod).apply(null,arguments)},n._RealDiv=function(){return(n._RealDiv=n.asm.RealDiv).apply(null,arguments)},n._Reciprocal=function(){return(n._Reciprocal=n.asm.Reciprocal).apply(null,arguments)},n._Relu=function(){return(n._Relu=n.asm.Relu).apply(null,arguments)},n._Relu6=function(){return(n._Relu6=n.asm.Relu6).apply(null,arguments)},n._ResizeBilinear=function(){return(n._ResizeBilinear=n.asm.ResizeBilinear).apply(null,arguments)},n._ResizeBilinearGrad=function(){return(n._ResizeBilinearGrad=n.asm.ResizeBilinearGrad).apply(null,arguments)},n._ResizeNearestNeighbor=function(){return(n._ResizeNearestNeighbor=n.asm.ResizeNearestNeighbor).apply(null,arguments)},n._ResizeNearestNeighborGrad=function(){return(n._ResizeNearestNeighborGrad=n.asm.ResizeNearestNeighborGrad).apply(null,arguments)},n._Reverse=function(){return(n._Reverse=n.asm.Reverse).apply(null,arguments)},n._RotateWithOffset=function(){return(n._RotateWithOffset=n.asm.RotateWithOffset).apply(null,arguments)},n._Round=function(){return(n._Round=n.asm.Round).apply(null,arguments)},n._Rsqrt=function(){return(n._Rsqrt=n.asm.Rsqrt).apply(null,arguments)},n._ScatterNd=function(){return(n._ScatterNd=n.asm.ScatterNd).apply(null,arguments)},n._SearchSorted=function(){return(n._SearchSorted=n.asm.SearchSorted).apply(null,arguments)},n._SelectV2=function(){return(n._SelectV2=n.asm.SelectV2).apply(null,arguments)},n._Selu=function(){return(n._Selu=n.asm.Selu).apply(null,arguments)},n._Sigmoid=function(){return(n._Sigmoid=n.asm.Sigmoid).apply(null,arguments)},n._Sign=function(){return(n._Sign=n.asm.Sign).apply(null,arguments)},n._Sin=function(){return(n._Sin=n.asm.Sin).apply(null,arguments)},n._Sinh=function(){return(n._Sinh=n.asm.Sinh).apply(null,arguments)},n._Softmax=function(){return(n._Softmax=n.asm.Softmax).apply(null,arguments)},n._Softplus=function(){return(n._Softplus=n.asm.Softplus).apply(null,arguments)},n._SparseFillEmptyRows=function(){return(n._SparseFillEmptyRows=n.asm.SparseFillEmptyRows).apply(null,arguments)},n._SparseReshape=function(){return(n._SparseReshape=n.asm.SparseReshape).apply(null,arguments)},n._SparseSegmentReduction=function(){return(n._SparseSegmentReduction=n.asm.SparseSegmentReduction).apply(null,arguments)},n._SparseToDense=function(){return(n._SparseToDense=n.asm.SparseToDense).apply(null,arguments)},n._Sqrt=function(){return(n._Sqrt=n.asm.Sqrt).apply(null,arguments)},n._Square=function(){return(n._Square=n.asm.Square).apply(null,arguments)},n._SquaredDifference=function(){return(n._SquaredDifference=n.asm.SquaredDifference).apply(null,arguments)},n._Step=function(){return(n._Step=n.asm.Step).apply(null,arguments)},n._StridedSlice=function(){return(n._StridedSlice=n.asm.StridedSlice).apply(null,arguments)},n._Sub=function(){return(n._Sub=n.asm.Sub).apply(null,arguments)},n._Sum=function(){return(n._Sum=n.asm.Sum).apply(null,arguments)},n._Tan=function(){return(n._Tan=n.asm.Tan).apply(null,arguments)},n._Tanh=function(){return(n._Tanh=n.asm.Tanh).apply(null,arguments)},n._TensorScatterUpdate=function(){return(n._TensorScatterUpdate=n.asm.TensorScatterUpdate).apply(null,arguments)},n._Tile=function(){return(n._Tile=n.asm.Tile).apply(null,arguments)},n._TopK=function(){return(n._TopK=n.asm.TopK).apply(null,arguments)},n._Transform=function(){return(n._Transform=n.asm.Transform).apply(null,arguments)},n._Transpose=function(){return(n._Transpose=n.asm.Transpose).apply(null,arguments)},n.__FusedMatMul=function(){return(n.__FusedMatMul=n.asm._FusedMatMul).apply(null,arguments)},n._malloc=function(){return(n._malloc=n.asm.malloc).apply(null,arguments)},n._free=function(){return(n._free=n.asm.free).apply(null,arguments)},n.___errno_location=function(){return(n.___errno_location=n.asm.__errno_location).apply(null,arguments)};var Yt=n.stackSave=function(){return(Yt=n.stackSave=n.asm.stackSave).apply(null,arguments)},Kt=n.stackRestore=function(){return(Kt=n.stackRestore=n.asm.stackRestore).apply(null,arguments)},Ce=n.stackAlloc=function(){return(Ce=n.stackAlloc=n.asm.stackAlloc).apply(null,arguments)};n.dynCall_iijjiiii=function(){return(n.dynCall_iijjiiii=n.asm.dynCall_iijjiiii).apply(null,arguments)},n.dynCall_jiji=function(){return(n.dynCall_jiji=n.asm.dynCall_jiji).apply(null,arguments)},n.cwrap=Jt;var mt;We=function x(){mt||Qt(),mt||(We=x)};function Qt(x){if(te>0||(Ae(),te>0))return;function S(){mt||(mt=!0,n.calledRun=!0,!W&&(ie(),u(n),n.onRuntimeInitialized&&n.onRuntimeInitialized(),ct()))}n.setStatus?(n.setStatus("Running..."),setTimeout(function(){setTimeout(function(){n.setStatus("")},1),S()},1)):S()}if(n.preInit)for(typeof n.preInit=="function"&&(n.preInit=[n.preInit]);n.preInit.length>0;)n.preInit.pop()();Qt();var et;d&&(et={uncaughtException:process.listeners("uncaughtException").filter(function(x){return!d.uncaughtException.indexOf(x)>-1}),unhandledRejection:process.listeners("unhandledRejection").filter(function(x){return!d.unhandledRejection.indexOf(x)>-1})});var tt;if(typeof s<"u")tt=s;else if(typeof WasmBackendModuleThreadedSimd<"u")tt=WasmBackendModuleThreadedSimd;else throw new Error("Could not find wasm module in post.js");if(et){var Zt=tt._dispose;tt._dispose=function(){Zt(),et.uncaughtException.forEach(function(x){process.removeListener("uncaughtException",x)}),et.unhandledRejection.forEach(function(x){process.removeListener("unhandledRejection",x)})}}return s.ready}})();e.exports=r})(to);var Ib=to.exports;const no=vs(Ib),xb=Object.freeze(Object.defineProperty({__proto__:null,default:no},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const er=eo||wb,kb=no||xb;class ao extends Qd{constructor(t){super(),this.wasm=t,this.dataIdNextNumber=1,this.wasm.tfjs.initWithThreadsCount(ro),Jn=this.wasm.tfjs.getThreadsCount(),this.dataIdMap=new Zd(this,el())}write(t,r,i){const s={id:this.dataIdNextNumber++};return this.move(s,t,r,i,1),s}numDataIds(){return this.dataIdMap.numDataIds()}async time(t){const r=Ka();return t(),{kernelMs:Ka()-r}}move(t,r,i,s,n){const u=this.dataIdNextNumber++;if(s==="string"){const a=r;this.dataIdMap.set(t,{id:u,stringBytes:a,shape:i,dtype:s,memoryOffset:null,refCount:n});return}const c=T(i),d=c*Qa(s),o=this.wasm._malloc(d)>>>0;this.dataIdMap.set(t,{id:u,memoryOffset:o,shape:i,dtype:s,refCount:n}),this.wasm.tfjs.registerTensor(u,c,o),r!=null&&this.wasm.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,d),o)}async read(t){return this.readSync(t)}readSync(t,r,i){const{memoryOffset:s,dtype:n,shape:u,stringBytes:c}=this.dataIdMap.get(t);if(n==="string")return(r==null||r===0)&&(i==null||i>=c.length)?c:c.slice(r,i);r=r||0,i=i||T(u);const d=Qa(n),o=this.wasm.HEAPU8.slice(s+r*d,s+i*d);return Db(o.buffer,n)}disposeData(t,r=!1){if(this.dataIdMap.has(t)){const i=this.dataIdMap.get(t);if(i.refCount--,!r&&i.refCount>0)return!1;this.wasm._free(i.memoryOffset),this.wasm.tfjs.disposeData(i.id),this.dataIdMap.delete(t)}return!0}refCount(t){return this.dataIdMap.has(t)?this.dataIdMap.get(t).refCount:0}incRef(t){const r=this.dataIdMap.get(t);r!=null&&r.refCount++}floatPrecision(){return 32}getMemoryOffset(t){return this.dataIdMap.get(t).memoryOffset}dispose(){this.wasm.tfjs.dispose(),"PThread"in this.wasm&&this.wasm.PThread.terminateAllThreads(),this.wasm=null}memory(){return{unreliable:!1}}makeOutput(t,r,i,s){let n;if(i==null)n=this.write(s??null,t,r);else{const u=this.dataIdNextNumber++;n={id:u},this.dataIdMap.set(n,{id:u,memoryOffset:i,shape:t,dtype:r,refCount:1});const c=T(t);this.wasm.tfjs.registerTensor(u,c,i)}return{dataId:n,shape:t,dtype:r}}typedArrayFromHeap({shape:t,dtype:r,dataId:i}){const s=this.wasm.HEAPU8.buffer,{memoryOffset:n}=this.dataIdMap.get(i),u=T(t);switch(r){case"float32":return new Float32Array(s,n,u);case"int32":return new Int32Array(s,n,u);case"bool":return new Uint8Array(s,n,u);default:throw new Error(`Unknown dtype ${r}`)}}}function Sb(e){return(t,r)=>(nl(e,{credentials:"same-origin"}).then(i=>{i.ok||t.env.a(`failed to load wasm binary file at '${e}'`),i.arrayBuffer().then(s=>{WebAssembly.instantiate(s,t).then(n=>{r(n.instance,n.module)})})}),{})}function tr(e,t,r){if(fn!=null)return fn;let i="tfjs-backend-wasm.wasm";return e&&t?i="tfjs-backend-wasm-threaded-simd.wasm":e&&(i="tfjs-backend-wasm-simd.wasm"),Et!=null&&Et[i]!=null?Et[i]:r+i}async function Mb(){const[e,t]=await Promise.all([Vn().getAsync("WASM_HAS_SIMD_SUPPORT"),Vn().getAsync("WASM_HAS_MULTITHREAD_SUPPORT")]);return new Promise((r,i)=>{const s={};s.locateFile=(c,d)=>{if(c.endsWith(".worker.js")){const o=vb.replace(/\n/g,"\\n"),a=new Blob([o],{type:"application/javascript"});return URL.createObjectURL(a)}return c.endsWith(".wasm")?tr(e,t,At??d):d+c},ra&&(s.instantiateWasm=Sb(tr(e,t,At??"")));let n=!1;s.onAbort=()=>{if(n||Ct)return;Ct=!0,i({message:"Make sure the server can serve the `.wasm` file relative to the bundled js file. For more details see https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/README.md#using-bundlers"})};let u;t&&e&&fn==null?(s.mainScriptUrlOrBlob=new Blob(["var WasmBackendModuleThreadedSimd = "+er.toString()],{type:"text/javascript"}),u=er(s)):u=kb(s),u.then(c=>{n=!0,Ct=!1;const d=null;c.tfjs={init:c.cwrap("init",null,[]),initWithThreadsCount:c.cwrap("init_with_threads_count",null,["number"]),getThreadsCount:c.cwrap("get_threads_count","number",[]),registerTensor:c.cwrap("register_tensor",null,["number","number","number"]),disposeData:c.cwrap("dispose_data",d,["number"]),dispose:c.cwrap("dispose",d,[])},r({wasm:c})}).catch(i)})}function Db(e,t){switch(t){case"float32":return new Float32Array(e);case"int32":return new Int32Array(e);case"bool":return new Uint8Array(e);default:throw new Error(`Unknown dtype ${t}`)}}const Fb=["tfjs-backend-wasm.wasm","tfjs-backend-wasm-simd.wasm","tfjs-backend-wasm-threaded-simd.wasm"];let fn=null,At=null,Et={},Ct=!1,ra=!1;function Ab(e,t=!1){if(tl("setWasmPath has been deprecated in favor of setWasmPaths and will be removed in a future release."),Ct)throw new Error("The WASM backend was already initialized. Make sure you call `setWasmPath()` before you call `tf.setBackend()` or `tf.ready()`");fn=e,ra=t}function Eb(e,t=!1){if(Ct)throw new Error("The WASM backend was already initialized. Make sure you call `setWasmPaths()` before you call `tf.setBackend()` or `tf.ready()`");if(typeof e=="string")At=e;else{Et=e;const r=Fb.filter(i=>Et[i]==null);if(r.length>0)throw new Error(`There were no entries found for the following binaries: ${r.join(",")}. Please either call setWasmPaths with a map providing a path for each binary, or with a string indicating the directory where all the binaries can be found.`)}ra=t}let ro=-1,Jn=-1;function Cb(e){ro=e}function Pb(){if(Jn===-1)throw new Error("WASM backend not initialized.");return Jn}/** @license See the LICENSE file. */const Nb="4.22.0";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rb=2;al("wasm",async()=>{const{wasm:e}=await Mb();return new ao(e)},Rb);/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tb=Object.freeze(Object.defineProperty({__proto__:null,BackendWasm:ao,getThreadsCount:Pb,setThreadsCount:Cb,setWasmPath:Ab,setWasmPaths:Eb,version_wasm:Nb},Symbol.toStringTag,{value:"Module"}));var so=Object.defineProperty,Bb=Object.getOwnPropertyDescriptor,Wb=Object.getOwnPropertyNames,Ob=Object.prototype.hasOwnProperty,$b=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),sa=(e,t)=>{for(var r in t)so(e,r,{get:t[r],enumerable:!0})},Lb=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Wb(t))!Ob.call(e,s)&&s!==r&&so(e,s,{get:()=>t[s],enumerable:!(i=Bb(t,s))||i.enumerable});return e},ia=(e,t,r)=>(Lb(e,t,"default"),r),f={};sa(f,{version:()=>jb});ia(f,rl);ia(f,sl);ia(f,Tb);var nr="4.22.0",Hb="4.22.0",zb="4.22.0",Vb="4.22.0",Gb="4.22.0",jb={tfjs:nr,"tfjs-core":nr,"tfjs-converter":Hb,"tfjs-backend-cpu":zb,"tfjs-backend-webgl":Vb,"tfjs-backend-wasm":Gb},Ub={};sa(Ub,{AnchorPosition:()=>Io,DrawBox:()=>So,DrawBoxOptions:()=>ko,DrawFaceLandmarks:()=>$o,DrawFaceLandmarksOptions:()=>Oo,DrawTextField:()=>la,DrawTextFieldOptions:()=>da,drawContour:()=>He,drawDetections:()=>r_,drawFaceExpressions:()=>__,drawFaceLandmarks:()=>w_});function He(e,t,r=!1){if(e.beginPath(),t.slice(1).forEach(({x:i,y:s},n)=>{let u=t[n];e.moveTo(u.x,u.y),e.lineTo(i,s)}),r){let i=t[t.length-1],s=t[0];if(!i||!s)return;e.moveTo(i.x,i.y),e.lineTo(s.x,s.y)}e.stroke()}var qb={};sa(qb,{computeReshapedDimensions:()=>co,getCenterPoint:()=>xn,isDimensions:()=>Yn,isEven:()=>Xn,isFloat:()=>uo,isTensor:()=>wt,isTensor1D:()=>Jb,isTensor2D:()=>oo,isTensor3D:()=>Ot,isTensor4D:()=>Re,isValidNumber:()=>ze,isValidProbablitiy:()=>hn,range:()=>bt,round:()=>In});var rt=class io{constructor(t,r){if(!ze(t)||!ze(r))throw new Error(`Dimensions.constructor - expected width and height to be valid numbers, instead have ${JSON.stringify({width:t,height:r})}`);this._width=t,this._height=r}get width(){return this._width}get height(){return this._height}reverse(){return new io(1/this.width,1/this.height)}};function wt(e,t){return e instanceof f.Tensor&&e.shape.length===t}function Jb(e){return wt(e,1)}function oo(e){return wt(e,2)}function Ot(e){return wt(e,3)}function Re(e){return wt(e,4)}function uo(e){return e%1!==0}function Xn(e){return e%2===0}function In(e,t=2){let r=10**t;return Math.floor(e*r)/r}function Yn(e){return e&&e.width&&e.height}function co({width:e,height:t},r){let i=r/Math.max(t,e);return new rt(Math.round(e*i),Math.round(t*i))}function xn(e){return e.reduce((t,r)=>t.add(r),new J(0,0)).div(new J(e.length,e.length))}function bt(e,t,r){return Array(e).fill(0).map((i,s)=>t+s*r)}function ze(e){return!!e&&e!==1/0&&e!==-1/0&&!Number.isNaN(e)||e===0}function hn(e){return ze(e)&&e>=0&&e<=1}var J=class nt{constructor(t,r){this._x=t,this._y=r}get x(){return this._x}get y(){return this._y}add(t){return new nt(this.x+t.x,this.y+t.y)}sub(t){return new nt(this.x-t.x,this.y-t.y)}mul(t){return new nt(this.x*t.x,this.y*t.y)}div(t){return new nt(this.x/t.x,this.y/t.y)}abs(){return new nt(Math.abs(this.x),Math.abs(this.y))}magnitude(){return Math.sqrt(this.x**2+this.y**2)}floor(){return new nt(Math.floor(this.x),Math.floor(this.y))}},Te=class ke{static isRect(t){return!!t&&[t.x,t.y,t.width,t.height].every(ze)}static assertIsValidBox(t,r,i=!1){if(!ke.isRect(t))throw new Error(`${r} - invalid box: ${JSON.stringify(t)}, expected object with properties x, y, width, height`);if(!i&&(t.width<0||t.height<0))throw new Error(`${r} - width (${t.width}) and height (${t.height}) must be positive numbers`)}constructor(t,r=!0){let i=t||{},s=[i.left,i.top,i.right,i.bottom].every(ze),n=[i.x,i.y,i.width,i.height].every(ze);if(!n&&!s)throw new Error(`Box.constructor - expected box to be IBoundingBox | IRect, instead have ${JSON.stringify(i)}`);let[u,c,d,o]=n?[i.x,i.y,i.width,i.height]:[i.left,i.top,i.right-i.left,i.bottom-i.top];ke.assertIsValidBox({x:u,y:c,width:d,height:o},"Box.constructor",r),this._x=u,this._y=c,this._width=d,this._height=o}get x(){return this._x}get y(){return this._y}get width(){return this._width}get height(){return this._height}get left(){return this.x}get top(){return this.y}get right(){return this.x+this.width}get bottom(){return this.y+this.height}get area(){return this.width*this.height}get topLeft(){return new J(this.left,this.top)}get topRight(){return new J(this.right,this.top)}get bottomLeft(){return new J(this.left,this.bottom)}get bottomRight(){return new J(this.right,this.bottom)}round(){let[t,r,i,s]=[this.x,this.y,this.width,this.height].map(n=>Math.round(n));return new ke({x:t,y:r,width:i,height:s})}floor(){let[t,r,i,s]=[this.x,this.y,this.width,this.height].map(n=>Math.floor(n));return new ke({x:t,y:r,width:i,height:s})}toSquare(){let{x:t,y:r,width:i,height:s}=this,n=Math.abs(i-s);return i<s&&(t-=n/2,i+=n),s<i&&(r-=n/2,s+=n),new ke({x:t,y:r,width:i,height:s})}rescale(t){let r=Yn(t)?t.width:t,i=Yn(t)?t.height:t;return new ke({x:this.x*r,y:this.y*i,width:this.width*r,height:this.height*i})}pad(t,r){let[i,s,n,u]=[this.x-t/2,this.y-r/2,this.width+t,this.height+r];return new ke({x:i,y:s,width:n,height:u})}clipAtImageBorders(t,r){let{x:i,y:s,right:n,bottom:u}=this,c=Math.max(i,0),d=Math.max(s,0),o=n-c,a=u-d,l=Math.min(o,t-c),m=Math.min(a,r-d);return new ke({x:c,y:d,width:l,height:m}).floor()}shift(t,r){let{width:i,height:s}=this,n=this.x+t,u=this.y+r;return new ke({x:n,y:u,width:i,height:s})}padAtBorders(t,r){let i=this.width+1,s=this.height+1,n=1,u=1,c=i,d=s,o=this.left,a=this.top,l=this.right,m=this.bottom;return l>r&&(c=-l+r+i,l=r),m>t&&(d=-m+t+s,m=t),o<1&&(d=2-o,o=1),a<1&&(d=2-a,a=1),{dy:u,edy:d,dx:n,edx:c,y:a,ey:m,x:o,ex:l,w:i,h:s}}calibrate(t){return new ke({left:this.left+t.left*this.width,top:this.top+t.top*this.height,right:this.right+t.right*this.width,bottom:this.bottom+t.bottom*this.height}).toSquare().round()}},lo=class extends Te{constructor(e,t,r,i,s=!1){super({left:e,top:t,right:r,bottom:i},s)}},po=class mo{constructor(t,r,i,s,n){this._imageDims=new rt(n.width,n.height),this._score=t,this._classScore=r,this._className=i,this._box=new Te(s).rescale(this._imageDims)}get score(){return this._score}get classScore(){return this._classScore}get className(){return this._className}get box(){return this._box}get imageDims(){return this._imageDims}get imageWidth(){return this.imageDims.width}get imageHeight(){return this.imageDims.height}get relativeBox(){return new Te(this._box).rescale(this.imageDims.reverse())}forSize(t,r){return new mo(this.score,this.classScore,this.className,this.relativeBox,{width:t,height:r})}},Ie=class fo extends po{constructor(t,r,i){super(t,t,"",r,i)}forSize(t,r){let{score:i,relativeBox:s,imageDims:n}=super.forSize(t,r);return new fo(i,s,n)}};function Xb(e,t,r=!0){let i=Math.max(0,Math.min(e.right,t.right)-Math.max(e.left,t.left)),s=Math.max(0,Math.min(e.bottom,t.bottom)-Math.max(e.top,t.top)),n=i*s;return r?n/(e.area+t.area-n):n/Math.min(e.area,t.area)}function Yb(e){let t=e.map(c=>c.x),r=e.map(c=>c.y),i=t.reduce((c,d)=>d<c?d:c,1/0),s=r.reduce((c,d)=>d<c?d:c,1/0),n=t.reduce((c,d)=>c<d?d:c,0),u=r.reduce((c,d)=>c<d?d:c,0);return new lo(i,s,n,u)}function Kb(e,t,r,i=!0){let s=t.map((u,c)=>({score:u,boxIndex:c})).sort((u,c)=>u.score-c.score).map(u=>u.boxIndex),n=[];for(;s.length>0;){let u=s.pop();n.push(u);let c=s,d=[];for(let o=0;o<c.length;o++){let a=c[o],l=e[u],m=e[a];d.push(Xb(l,m,i))}s=s.filter((o,a)=>d[a]<=r)}return n}function $t(e,t){return f.tidy(()=>{let[r,i,s]=t,n=f.fill([...e.shape.slice(0,3),1],r,"float32"),u=f.fill([...e.shape.slice(0,3),1],i,"float32"),c=f.fill([...e.shape.slice(0,3),1],s,"float32"),d=f.concat([n,u,c],3);return f.sub(e,d)})}function Qb(e,t=!1){return f.tidy(()=>{let[r,i]=e.shape.slice(1);if(r===i)return e;let s=Math.abs(r-i),n=Math.round(s*(t?.5:1)),u=r>i?2:1,c=l=>{let m=e.shape.slice();return m[u]=l,f.fill(m,0,"float32")},d=c(n),o=s-d.shape[u],a=[t&&o?c(o):null,e,d].filter(l=>!!l).map(l=>f.cast(l,"float32"));return f.concat(a,u)})}function Ay(e){let t=e.slice();for(let r=t.length-1;r>0;r--){let i=Math.floor(Math.random()*(r+1)),s=t[r];t[r]=t[i],t[i]=s}return t}function Ln(e){return 1/(1+Math.exp(-e))}function Ey(e){return Math.log(e/(1-e))}var ho=class extends Te{constructor(e,t,r,i,s=!1){super({x:e,y:t,width:r,height:i},s)}},Zb=.5,e_=.43,t_=.45,_t=class{constructor(e,t,r=new J(0,0)){let{width:i,height:s}=t;this._imgDims=new rt(i,s),this._shift=r,this._positions=e.map(n=>n.mul(new J(i,s)).add(r))}get shift(){return new J(this._shift.x,this._shift.y)}get imageWidth(){return this._imgDims.width}get imageHeight(){return this._imgDims.height}get positions(){return this._positions}get relativePositions(){return this._positions.map(e=>e.sub(this._shift).div(new J(this.imageWidth,this.imageHeight)))}forSize(e,t){return new this.constructor(this.relativePositions,{width:e,height:t})}shiftBy(e,t){return new this.constructor(this.relativePositions,this._imgDims,new J(e,t))}shiftByPoint(e){return this.shiftBy(e.x,e.y)}align(e,t={}){if(e){let s=e instanceof Ie?e.box.floor():new Te(e);return this.shiftBy(s.x,s.y).align(null,t)}let{useDlibAlignment:r,minBoxPadding:i}={useDlibAlignment:!1,minBoxPadding:.2,...t};return r?this.alignDlib():this.alignMinBbox(i)}alignDlib(){let e=this.getRefPointsForAlignment(),[t,r,i]=e,s=a=>i.sub(a).magnitude(),n=(s(t)+s(r))/2,u=Math.floor(n/t_),c=xn(e),d=Math.floor(Math.max(0,c.x-Zb*u)),o=Math.floor(Math.max(0,c.y-e_*u));return new ho(d,o,Math.min(u,this.imageWidth+d),Math.min(u,this.imageHeight+o))}alignMinBbox(e){let t=Yb(this.positions);return t.pad(t.width*e,t.height*e)}getRefPointsForAlignment(){throw new Error("getRefPointsForAlignment not implemented by base class")}},Cy=class extends _t{getRefPointsForAlignment(){let e=this.positions;return[e[0],e[1],xn([e[3],e[4]])]}},go=class extends _t{getJawOutline(){return this.positions.slice(0,17)}getLeftEyeBrow(){return this.positions.slice(17,22)}getRightEyeBrow(){return this.positions.slice(22,27)}getNose(){return this.positions.slice(27,36)}getLeftEye(){return this.positions.slice(36,42)}getRightEye(){return this.positions.slice(42,48)}getMouth(){return this.positions.slice(48,68)}getRefPointsForAlignment(){return[this.getLeftEye(),this.getRightEye(),this.getMouth()].map(xn)}},ar=class{constructor(e,t){this._label=e,this._distance=t}get label(){return this._label}get distance(){return this._distance}toString(e=!0){return`${this.label}${e?` (${In(this.distance)})`:""}`}},rr=class extends Te{static assertIsValidLabeledBox(e,t){if(Te.assertIsValidBox(e,t),!ze(e.label))throw new Error(`${t} - expected property label (${e.label}) to be a number`)}constructor(e,t){super(e),this._label=t}get label(){return this._label}},dn=class bo{constructor(t,r){if(typeof t!="string")throw new Error("LabeledFaceDescriptors - constructor expected label to be a string");if(!Array.isArray(r)||r.some(i=>!(i instanceof Float32Array)))throw new Error("LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array");this._label=t,this._descriptors=r}get label(){return this._label}get descriptors(){return this._descriptors}toJSON(){return{label:this.label,descriptors:this.descriptors.map(t=>Array.from(t))}}static fromJSON(t){let r=t.descriptors.map(i=>new Float32Array(i));return new bo(t.label,r)}},Py=class extends rr{static assertIsValidPredictedBox(e,t){if(rr.assertIsValidLabeledBox(e,t),!hn(e.score)||!hn(e.classScore))throw new Error(`${t} - expected properties score (${e.score}) and (${e.classScore}) to be a number between [0, 1]`)}constructor(e,t,r,i){super(e,t),this._score=r,this._classScore=i}get score(){return this._score}get classScore(){return this._classScore}};function Rt(e){return e.detection instanceof Ie}function gn(e,t){return{...e,detection:t}}function _o(){let e=window.fetch;if(!e)throw new Error("fetch - missing fetch implementation for browser environment");return{Canvas:HTMLCanvasElement,CanvasRenderingContext2D,Image:HTMLImageElement,ImageData,Video:HTMLVideoElement,createCanvasElement:()=>document.createElement("canvas"),createImageElement:()=>document.createElement("img"),createVideoElement:()=>document.createElement("video"),fetch:e,readFile:()=>{throw new Error("readFile - filesystem not available for browser environment")}}}function oa(){return typeof global=="object"&&typeof process<"u"&&process.versions!=null&&process.versions.node!=null}function yo(e){let t="";if(!e&&oa())try{e=$b("fs")}catch(r){t=r.toString()}return{readFile:e?r=>new Promise((i,s)=>{e.readFile(r,(n,u)=>n?s(n):i(u))}):()=>{throw new Error(`readFile - failed to require fs in nodejs environment with error: ${t}`)}}}function wo(){let e=global.Canvas||global.HTMLCanvasElement,t=global.Image||global.HTMLImageElement,r=global.Video||global.HTMLVideoElement,i=()=>{if(e)return new e;throw new Error("createCanvasElement - missing Canvas implementation for nodejs environment")},s=()=>{if(t)return new t;throw new Error("createImageElement - missing Image implementation for nodejs environment")},n=()=>{if(r)return new r;throw new Error("createVideoElement - missing Video implementation for nodejs environment")},u=global.fetch,c=yo();return{Canvas:e||class{},CanvasRenderingContext2D:global.CanvasRenderingContext2D||class{},Image:t||class{},ImageData:global.ImageData||class{},Video:global.HTMLVideoElement||class{},createCanvasElement:i,createImageElement:s,createVideoElement:n,fetch:u,...c}}function vo(){return typeof window=="object"&&typeof document<"u"&&typeof HTMLImageElement<"u"&&typeof HTMLCanvasElement<"u"&&typeof HTMLVideoElement<"u"&&typeof ImageData<"u"&&typeof CanvasRenderingContext2D<"u"}var se;function n_(){if(!se)throw new Error("getEnv - environment is not defined, check isNodejs() and isBrowser()");return se}function Kn(e){se=e}function ua(){return vo()?Kn(_o()):oa()?Kn(wo()):null}function a_(e){if(se||ua(),!se)throw new Error("monkeyPatch - environment is not defined, check isNodejs() and isBrowser()");let{Canvas:t=se.Canvas,Image:r=se.Image}=e;se.Canvas=t,se.Image=r,se.createCanvasElement=e.createCanvasElement||(()=>new t),se.createImageElement=e.createImageElement||(()=>new r),se.ImageData=e.ImageData||se.ImageData,se.Video=e.Video||se.Video,se.fetch=e.fetch||se.fetch,se.readFile=e.readFile||se.readFile}var ce={getEnv:n_,setEnv:Kn,initialize:ua,createBrowserEnv:_o,createFileSystem:yo,createNodejsEnv:wo,monkeyPatch:a_,isBrowser:vo,isNodejs:oa};ua();function ca(e){return!ce.isNodejs()&&typeof e=="string"?document.getElementById(e):e}function Ge(e){let{Canvas:t,CanvasRenderingContext2D:r}=ce.getEnv();if(e instanceof r)return e;let i=ca(e);if(!(i instanceof t))throw new Error("resolveContext2d - expected canvas to be of instance of Canvas");let s=i.getContext("2d",{willReadFrequently:!0});if(!s)throw new Error("resolveContext2d - canvas 2d context is null");return s}var Io=(e=>(e.TOP_LEFT="TOP_LEFT",e.TOP_RIGHT="TOP_RIGHT",e.BOTTOM_LEFT="BOTTOM_LEFT",e.BOTTOM_RIGHT="BOTTOM_RIGHT",e))(Io||{}),da=class{constructor(e={}){let{anchorPosition:t,backgroundColor:r,fontColor:i,fontSize:s,fontStyle:n,padding:u}=e;this.anchorPosition=t||"TOP_LEFT",this.backgroundColor=r||"rgba(0, 0, 0, 0.5)",this.fontColor=i||"rgba(255, 255, 255, 1)",this.fontSize=s||14,this.fontStyle=n||"Georgia",this.padding=u||4}},la=class xo{constructor(t,r,i={}){this.text=typeof t=="string"?[t]:t instanceof xo?t.text:t,this.anchor=r,this.options=new da(i)}measureWidth(t){let{padding:r}=this.options;return this.text.map(i=>t.measureText(i).width).reduce((i,s)=>i<s?s:i,0)+2*r}measureHeight(){let{fontSize:t,padding:r}=this.options;return this.text.length*t+2*r}getUpperLeft(t,r){let{anchorPosition:i}=this.options,s=i==="BOTTOM_RIGHT"||i==="TOP_RIGHT",n=i==="BOTTOM_LEFT"||i==="BOTTOM_RIGHT",u=this.measureWidth(t),c=this.measureHeight(),d=s?this.anchor.x-u:this.anchor.x,o=n?this.anchor.y-c:this.anchor.y;if(r){let{width:a,height:l}=r,m=Math.max(Math.min(d,a-u),0),p=Math.max(Math.min(o,l-c),0);return{x:m,y:p}}return{x:d,y:o}}draw(t){let r=ca(t),i=Ge(r),{backgroundColor:s,fontColor:n,fontSize:u,fontStyle:c,padding:d}=this.options;i.font=`${u}px ${c}`;let o=this.measureWidth(i),a=this.measureHeight();i.fillStyle=s;let l=this.getUpperLeft(i,r);i.fillRect(l.x,l.y,o,a),i.fillStyle=n,this.text.forEach((m,p)=>{let g=d+l.x,b=d+l.y+(p+1)*u;i.fillText(m,g,b)})}},ko=class{constructor(e={}){let{boxColor:t,lineWidth:r,label:i,drawLabelOptions:s}=e;this.boxColor=t||"rgba(0, 0, 255, 1)",this.lineWidth=r||2,this.label=i;let n={anchorPosition:"BOTTOM_LEFT",backgroundColor:this.boxColor};this.drawLabelOptions=new da({...n,...s})}},So=class{constructor(e,t={}){this.box=new Te(e),this.options=new ko(t)}draw(e){let t=Ge(e),{boxColor:r,lineWidth:i}=this.options,{x:s,y:n,width:u,height:c}=this.box;t.strokeStyle=r,t.lineWidth=i,t.strokeRect(s,n,u,c);let{label:d}=this.options;d&&new la([d],{x:s-i/2,y:n},this.options.drawLabelOptions).draw(e)}};function r_(e,t){(Array.isArray(t)?t:[t]).forEach(r=>{let i=r instanceof Ie?r.score:Rt(r)?r.detection.score:void 0,s=r instanceof Ie?r.box:Rt(r)?r.detection.box:new Te(r),n=i?`${In(i)}`:void 0;new So(s,{label:n}).draw(e)})}function Mo(e){let{Image:t,Video:r}=ce.getEnv();return e instanceof t&&e.complete||e instanceof r&&e.readyState>=3}function s_(e){return new Promise((t,r)=>{if(e instanceof ce.getEnv().Canvas||Mo(e)){t(null);return}function i(n){n.currentTarget&&(n.currentTarget.removeEventListener("load",s),n.currentTarget.removeEventListener("error",i),r(n))}function s(n){n.currentTarget&&(n.currentTarget.removeEventListener("load",s),n.currentTarget.removeEventListener("error",i),t(n))}e.addEventListener("load",s),e.addEventListener("error",i)})}function i_(e){return new Promise((t,r)=>{e instanceof Blob||r(new Error("bufferToImage - expected buf to be of type: Blob"));let i=new FileReader;i.onload=()=>{typeof i.result!="string"&&r(new Error("bufferToImage - expected reader.result to be a string, in onload"));let s=ce.getEnv().createImageElement();s.onload=()=>t(s),s.onerror=r,s.src=i.result},i.onerror=r,i.readAsDataURL(e)})}function pa(e){let{Image:t,Video:r}=ce.getEnv();return e instanceof t?new rt(e.naturalWidth,e.naturalHeight):e instanceof r?new rt(e.videoWidth,e.videoHeight):new rt(e.width,e.height)}function bn({width:e,height:t}){let{createCanvasElement:r}=ce.getEnv(),i=r();return i.width=e,i.height=t,i}function Do(e,t){let{ImageData:r}=ce.getEnv();if(!(e instanceof r)&&!Mo(e))throw new Error("createCanvasFromMedia - media has not finished loading yet");let{width:i,height:s}=t||pa(e),n=bn({width:i,height:s});return e instanceof r?Ge(n).putImageData(e,0,0):Ge(n).drawImage(e,0,0,i,s),n}async function o_(e,t){let r=t||ce.getEnv().createCanvasElement(),[i,s,n]=e.shape.slice(Re(e)?1:0),u=f.tidy(()=>e.as3D(i,s,n).toInt());return await f.browser.toPixels(u,r),u.dispose(),r}function sr(e){let{Image:t,Canvas:r,Video:i}=ce.getEnv();return e instanceof t||e instanceof r||e instanceof i}function u_(e,t,r=!1){let{Image:i,Canvas:s}=ce.getEnv();if(!(e instanceof i||e instanceof s))throw new Error("imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement");if(t<=0)return bn({width:1,height:1});let n=pa(e),u=t/Math.max(n.height,n.width),c=u*n.width,d=u*n.height,o=bn({width:t,height:t}),a=e instanceof s?e:Do(e),l=Math.abs(c-d)/2,m=r&&c<d?l:0,p=r&&d<c?l:0;return a.width>0&&a.height>0&&Ge(o).drawImage(a,m,p,c,d),o}var _n=class{constructor(e,t=!1){if(this._imageTensors=[],this._canvases=[],this._treatAsBatchInput=!1,this._inputDimensions=[],this._inputSize=0,!Array.isArray(e))throw new Error(`NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have ${e}`);this._treatAsBatchInput=t,this._batchSize=e.length,e.forEach((r,i)=>{if(Ot(r)){this._imageTensors[i]=r,this._inputDimensions[i]=r.shape;return}if(Re(r)){let n=r.shape[0];if(n!==1)throw new Error(`NetInput - tf.Tensor4D with batchSize ${n} passed, but not supported in input array`);this._imageTensors[i]=r,this._inputDimensions[i]=r.shape.slice(1);return}let s=r instanceof ce.getEnv().Canvas?r:Do(r);this._canvases[i]=s,this._inputDimensions[i]=[s.height,s.width,3]})}get imageTensors(){return this._imageTensors}get canvases(){return this._canvases}get isBatchInput(){return this.batchSize>1||this._treatAsBatchInput}get batchSize(){return this._batchSize}get inputDimensions(){return this._inputDimensions}get inputSize(){return this._inputSize}get reshapedInputDimensions(){return bt(this.batchSize,0,1).map((e,t)=>this.getReshapedInputDimensions(t))}getInput(e){return this.canvases[e]||this.imageTensors[e]}getInputDimensions(e){return this._inputDimensions[e]}getInputHeight(e){return this._inputDimensions[e][0]}getInputWidth(e){return this._inputDimensions[e][1]}getReshapedInputDimensions(e){if(typeof this.inputSize!="number")throw new Error("getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet");let t=this.getInputWidth(e),r=this.getInputHeight(e);return co({width:t,height:r},this.inputSize)}toBatchTensor(e,t=!0){return this._inputSize=e,f.tidy(()=>{let r=bt(this.batchSize,0,1).map(i=>{let s=this.getInput(i);if(s instanceof f.Tensor){let n=Re(s)?s:f.expandDims(s);return n=Qb(n,t),(n.shape[1]!==e||n.shape[2]!==e)&&(n=f.image.resizeBilinear(n,[e,e],!1,!1)),n.as3D(e,e,3)}if(s instanceof ce.getEnv().Canvas)return f.browser.fromPixels(u_(s,e,t));throw new Error(`toBatchTensor - at batchIdx ${i}, expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have ${s}`)});return f.stack(r.map(i=>f.cast(i,"float32"))).as4D(this.batchSize,e,e,3)})}};async function le(e){if(e instanceof _n)return e;let t=Array.isArray(e)?e:[e];if(!t.length)throw new Error("toNetInput - empty array passed as input");let r=s=>Array.isArray(e)?` at input index ${s}:`:"",i=t.map(ca);return i.forEach((s,n)=>{if(!sr(s)&&!Ot(s)&&!Re(s))throw typeof t[n]=="string"?new Error(`toNetInput -${r(n)} string passed, but could not resolve HTMLElement for element id ${t[n]}`):new Error(`toNetInput -${r(n)} expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id`);if(Re(s)){let u=s.shape[0];if(u!==1)throw new Error(`toNetInput -${r(n)} tf.Tensor4D with batchSize ${u} passed, but not supported in input array`)}}),await Promise.all(i.map(s=>sr(s)&&s_(s))),new _n(i,Array.isArray(e))}async function ma(e,t){let{Canvas:r}=ce.getEnv(),i=e;if(!(e instanceof r)){let n=await le(e);if(n.batchSize>1)throw new Error("extractFaces - batchSize > 1 not supported");let u=n.getInput(0);i=u instanceof r?u:await o_(u)}let s=Ge(i);return t.map(n=>n instanceof Ie?n.forSize(i.width,i.height).box.floor():n).map(n=>n.clipAtImageBorders(i.width,i.height)).map(({x:n,y:u,width:c,height:d})=>{let o=bn({width:c,height:d});return c>0&&d>0&&Ge(o).putImageData(s.getImageData(n,u,c,d),0,0),o})}async function fa(e,t){if(!Ot(e)&&!Re(e))throw new Error("extractFaceTensors - expected image tensor to be 3D or 4D");if(Re(e)&&e.shape[0]>1)throw new Error("extractFaceTensors - batchSize > 1 not supported");return f.tidy(()=>{let[r,i,s]=e.shape.slice(Re(e)?1:0);return t.map(n=>n instanceof Ie?n.forSize(i,r).box:n).map(n=>n.clipAtImageBorders(i,r)).filter(n=>n.width>0&&n.height>0).map(({x:n,y:u,width:c,height:d})=>f.slice3d(e.as3D(r,i,s),[u,n,0],[d,c,s]))})}async function kn(e,t){let{fetch:r}=ce.getEnv(),i=await r(e,t);if(!(i.status<400))throw new Error(`failed to fetch: (${i.status}) ${i.statusText}, from url: ${i.url}`);return i}async function Ny(e){let t=await kn(e),r=await t.blob();if(!r.type.startsWith("image/"))throw new Error(`fetchImage - expected blob type to be of type image/*, instead have: ${r.type}, for url: ${t.url}`);return i_(r)}async function c_(e){return(await kn(e)).json()}async function Ry(e){return new Float32Array(await(await kn(e)).arrayBuffer())}function d_(e){return new Promise((t,r)=>{e instanceof Blob||r(new Error("bufferToVideo - expected buf to be of type: Blob"));let i=ce.getEnv().createVideoElement();i.oncanplay=()=>t(i),i.onerror=r,i.playsInline=!0,i.muted=!0,i.src=URL.createObjectURL(e),i.play()})}async function Ty(e){let t=await kn(e),r=await t.blob();if(!r.type.startsWith("video/"))throw new Error(`fetchVideo - expected blob type to be of type video/*, instead have: ${r.type}, for url: ${t.url}`);return d_(r)}function Fo(e,t){let r=`${t}-weights_manifest.json`;if(!e)return{modelBaseUri:"",manifestUri:r};if(e==="/")return{modelBaseUri:"/",manifestUri:`/${r}`};let i=e.startsWith("http://")?"http://":e.startsWith("https://")?"https://":"";e=e.replace(i,"");let s=e.split("/").filter(c=>c),n=e.endsWith(".json")?s[s.length-1]:r,u=i+(e.endsWith(".json")?s.slice(0,s.length-1):s).join("/");return u=e.startsWith("/")?`/${u}`:u,{modelBaseUri:u,manifestUri:u==="/"?`/${n}`:`${u}/${n}`}}async function l_(e,t){let{manifestUri:r,modelBaseUri:i}=Fo(e,t),s=await c_(r);return f.io.loadWeights(s,i)}function By(e,t,r=!1){let{width:i,height:s}=r?pa(t):t;return e.width=i,e.height=s,{width:i,height:s}}var qe=class{constructor(e){this._params=void 0,this._paramMappings=[],this._name=e}get params(){return this._params}get paramMappings(){return this._paramMappings}get isLoaded(){return!!this.params}getParamFromPath(e){let{obj:t,objProp:r}=this.traversePropertyPath(e);return t[r]}reassignParamFromPath(e,t){let{obj:r,objProp:i}=this.traversePropertyPath(e);r[i].dispose(),r[i]=t}getParamList(){return this._paramMappings.map(({paramPath:e})=>({path:e,tensor:this.getParamFromPath(e)}))}getTrainableParams(){return this.getParamList().filter(e=>e.tensor instanceof f.Variable)}getFrozenParams(){return this.getParamList().filter(e=>!(e.tensor instanceof f.Variable))}variable(){this.getFrozenParams().forEach(({path:e,tensor:t})=>{this.reassignParamFromPath(e,t.variable())})}freeze(){this.getTrainableParams().forEach(({path:e,tensor:t})=>{let r=f.tensor(t.dataSync());t.dispose(),this.reassignParamFromPath(e,r)})}dispose(e=!0){this.getParamList().forEach(t=>{if(e&&t.tensor.isDisposed)throw new Error(`param tensor has already been disposed for path ${t.path}`);t.tensor.dispose()}),this._params=void 0}serializeParams(){return new Float32Array(this.getParamList().map(({tensor:e})=>Array.from(e.dataSync())).reduce((e,t)=>e.concat(t)))}async load(e){if(e instanceof Float32Array){this.extractWeights(e);return}await this.loadFromUri(e)}async loadFromUri(e){if(e&&typeof e!="string")throw new Error(`${this._name}.loadFromUri - expected model uri`);let t=await l_(e,this.getDefaultModelName());this.loadFromWeightMap(t)}async loadFromDisk(e){if(e&&typeof e!="string")throw new Error(`${this._name}.loadFromDisk - expected model file path`);let{readFile:t}=ce.getEnv(),{manifestUri:r,modelBaseUri:i}=Fo(e,this.getDefaultModelName()),s=d=>Promise.all(d.map(o=>t(o).then(a=>typeof a=="string"?Buffer.from(a):a.buffer))),n=f.io.weightsLoaderFactory(s),u=JSON.parse((await t(r)).toString()),c=await n(u,i);this.loadFromWeightMap(c)}loadFromWeightMap(e){let{paramMappings:t,params:r}=this.extractParamsFromWeightMap(e);this._paramMappings=t,this._params=r}extractWeights(e){let{paramMappings:t,params:r}=this.extractParams(e);this._paramMappings=t,this._params=r}traversePropertyPath(e){if(!this.params)throw new Error("traversePropertyPath - model has no loaded params");let t=e.split("/").reduce((s,n)=>{if(!s.nextObj.hasOwnProperty(n))throw new Error(`traversePropertyPath - object does not have property ${n}, for path ${e}`);return{obj:s.nextObj,objProp:n,nextObj:s.nextObj[n]}},{nextObj:this.params}),{obj:r,objProp:i}=t;if(!r||!i||!(r[i]instanceof f.Tensor))throw new Error(`traversePropertyPath - parameter is not a tensor, for path ${e}`);return{obj:r,objProp:i}}};function we(e,t,r){return f.tidy(()=>{let i=f.separableConv2d(e,t.depthwise_filter,t.pointwise_filter,r,"same");return i=f.add(i,t.bias),i})}function Hn(e,t,r=!1){return f.tidy(()=>{let i=f.relu(r?f.add(f.conv2d(e,t.conv0.filters,[2,2],"same"),t.conv0.bias):we(e,t.conv0,[2,2])),s=we(i,t.conv1,[1,1]),n=f.relu(f.add(i,s)),u=we(n,t.conv2,[1,1]);return f.relu(f.add(i,f.add(s,u)))})}function ln(e,t,r=!1,i=!0){return f.tidy(()=>{let s=f.relu(r?f.add(f.conv2d(e,t.conv0.filters,i?[2,2]:[1,1],"same"),t.conv0.bias):we(e,t.conv0,i?[2,2]:[1,1])),n=we(s,t.conv1,[1,1]),u=f.relu(f.add(s,n)),c=we(u,t.conv2,[1,1]),d=f.relu(f.add(s,f.add(n,c))),o=we(d,t.conv3,[1,1]);return f.relu(f.add(s,f.add(n,f.add(c,o))))})}function Pt(e,t,r="same",i=!1){return f.tidy(()=>{let s=f.add(f.conv2d(e,t.filters,[1,1],r),t.bias);return i?f.relu(s):s})}function Je(e,t){Object.keys(e).forEach(r=>{t.some(i=>i.originalPath===r)||e[r].dispose()})}function ha(e,t){return(r,i,s,n)=>{let u=f.tensor4d(e(r*i*s*s),[s,s,r,i]),c=f.tensor1d(e(i));return t.push({paramPath:`${n}/filters`},{paramPath:`${n}/bias`}),{filters:u,bias:c}}}function Ao(e,t){return(r,i,s)=>{let n=f.tensor2d(e(r*i),[r,i]),u=f.tensor1d(e(i));return t.push({paramPath:`${s}/weights`},{paramPath:`${s}/bias`}),{weights:n,bias:u}}}var Eo=class{constructor(e,t,r){this.depthwise_filter=e,this.pointwise_filter=t,this.bias=r}};function ga(e,t){return(r,i,s)=>{let n=f.tensor4d(e(9*r),[3,3,r,1]),u=f.tensor4d(e(r*i),[1,1,r,i]),c=f.tensor1d(e(i));return t.push({paramPath:`${s}/depthwise_filter`},{paramPath:`${s}/pointwise_filter`},{paramPath:`${s}/bias`}),new Eo(n,u,c)}}function ba(e){return t=>{let r=e(`${t}/depthwise_filter`,4),i=e(`${t}/pointwise_filter`,4),s=e(`${t}/bias`,1);return new Eo(r,i,s)}}function ut(e,t){return(r,i,s)=>{let n=e[r];if(!wt(n,i))throw new Error(`expected weightMap[${r}] to be a Tensor${i}D, instead have ${n}`);return t.push({originalPath:r,paramPath:s||r}),n}}function Xe(e){let t=e;function r(s){let n=t.slice(0,s);return t=t.slice(s),n}function i(){return t}return{extractWeights:r,getRemainingWeights:i}}function Co(e,t){let r=ha(e,t),i=ga(e,t);function s(u,c,d,o=!1){let a=o?r(u,c,3,`${d}/conv0`):i(u,c,`${d}/conv0`),l=i(c,c,`${d}/conv1`),m=i(c,c,`${d}/conv2`);return{conv0:a,conv1:l,conv2:m}}function n(u,c,d,o=!1){let{conv0:a,conv1:l,conv2:m}=s(u,c,d,o),p=i(c,c,`${d}/conv3`);return{conv0:a,conv1:l,conv2:m,conv3:p}}return{extractDenseBlock3Params:s,extractDenseBlock4Params:n}}function p_(e){let t=[],{extractWeights:r,getRemainingWeights:i}=Xe(e),{extractDenseBlock4Params:s}=Co(r,t),n=s(3,32,"dense0",!0),u=s(32,64,"dense1"),c=s(64,128,"dense2"),d=s(128,256,"dense3");if(i().length!==0)throw new Error(`weights remaing after extract: ${i().length}`);return{paramMappings:t,params:{dense0:n,dense1:u,dense2:c,dense3:d}}}function Po(e){return t=>{let r=e(`${t}/filters`,4),i=e(`${t}/bias`,1);return{filters:r,bias:i}}}function No(e,t){let r=ut(e,t),i=Po(r),s=ba(r);function n(c,d=!1){let o=d?i(`${c}/conv0`):s(`${c}/conv0`),a=s(`${c}/conv1`),l=s(`${c}/conv2`);return{conv0:o,conv1:a,conv2:l}}function u(c,d=!1){let o=d?i(`${c}/conv0`):s(`${c}/conv0`),a=s(`${c}/conv1`),l=s(`${c}/conv2`),m=s(`${c}/conv3`);return{conv0:o,conv1:a,conv2:l,conv3:m}}return{extractDenseBlock3Params:n,extractDenseBlock4Params:u}}function m_(e){let t=[],{extractDenseBlock4Params:r}=No(e,t),i={dense0:r("dense0",!0),dense1:r("dense1"),dense2:r("dense2"),dense3:r("dense3")};return Je(e,t),{params:i,paramMappings:t}}var Ro=class extends qe{constructor(){super("FaceFeatureExtractor")}forwardInput(e){let{params:t}=this;if(!t)throw new Error("FaceFeatureExtractor - load model before inference");return f.tidy(()=>{let r=f.cast(e.toBatchTensor(112,!0),"float32"),i=$t(r,[122.782,117.001,104.298]).div(255),s=ln(i,t.dense0,!0);return s=ln(s,t.dense1),s=ln(s,t.dense2),s=ln(s,t.dense3),s=f.avgPool(s,[7,7],[2,2],"valid"),s})}async forward(e){return this.forwardInput(await le(e))}getDefaultModelName(){return"face_feature_extractor_model"}extractParamsFromWeightMap(e){return m_(e)}extractParams(e){return p_(e)}};function Qn(e,t){return f.tidy(()=>f.add(f.matMul(e,t.weights),t.bias))}function f_(e,t,r){let i=[],{extractWeights:s,getRemainingWeights:n}=Xe(e),u=Ao(s,i)(t,r,"fc");if(n().length!==0)throw new Error(`weights remaing after extract: ${n().length}`);return{paramMappings:i,params:{fc:u}}}function h_(e){let t=[],r=ut(e,t);function i(n){let u=r(`${n}/weights`,2),c=r(`${n}/bias`,1);return{weights:u,bias:c}}let s={fc:i("fc")};return Je(e,t),{params:s,paramMappings:t}}function To(e){let t={},r={};return Object.keys(e).forEach(i=>{let s=i.startsWith("fc")?r:t;s[i]=e[i]}),{featureExtractorMap:t,classifierMap:r}}var Bo=class extends qe{constructor(e,t){super(e),this._faceFeatureExtractor=t}get faceFeatureExtractor(){return this._faceFeatureExtractor}runNet(e){let{params:t}=this;if(!t)throw new Error(`${this._name} - load model before inference`);return f.tidy(()=>{let r=e instanceof _n?this.faceFeatureExtractor.forwardInput(e):e;return Qn(r.as2D(r.shape[0],-1),t.fc)})}dispose(e=!0){this.faceFeatureExtractor.dispose(e),super.dispose(e)}loadClassifierParams(e){let{params:t,paramMappings:r}=this.extractClassifierParams(e);this._params=t,this._paramMappings=r}extractClassifierParams(e){return f_(e,this.getClassifierChannelsIn(),this.getClassifierChannelsOut())}extractParamsFromWeightMap(e){let{featureExtractorMap:t,classifierMap:r}=To(e);return this.faceFeatureExtractor.loadFromWeightMap(t),h_(r)}extractParams(e){let t=this.getClassifierChannelsIn(),r=this.getClassifierChannelsOut(),i=r*t+r,s=e.slice(0,e.length-i),n=e.slice(e.length-i);return this.faceFeatureExtractor.extractWeights(s),this.extractClassifierParams(n)}},ir=["neutral","happy","sad","angry","fearful","disgusted","surprised"],_a=class{constructor(e){if(this.neutral=0,this.happy=0,this.sad=0,this.angry=0,this.fearful=0,this.disgusted=0,this.surprised=0,e.length!==7)throw new Error(`FaceExpressions.constructor - expected probabilities.length to be 7, have: ${e.length}`);ir.forEach((t,r)=>{this[t]=e[r]})}asSortedArray(){return ir.map(e=>({expression:e,probability:this[e]})).sort((e,t)=>t.probability-e.probability)}},g_=class extends Bo{constructor(e=new Ro){super("FaceExpressionNet",e)}forwardInput(e){return f.tidy(()=>f.softmax(this.runNet(e)))}async forward(e){return this.forwardInput(await le(e))}async predictExpressions(e){let t=await le(e),r=await this.forwardInput(t),i=await Promise.all(f.unstack(r).map(async n=>{let u=n.dataSync();return n.dispose(),u}));r.dispose();let s=i.map(n=>new _a(n));return t.isBatchInput?s:s[0]}getDefaultModelName(){return"face_expression_model"}getClassifierChannelsIn(){return 256}getClassifierChannelsOut(){return 7}};function b_(e){return e.expressions instanceof _a}function Wo(e,t){return{...e,expressions:t}}function __(e,t,r=.1,i){(Array.isArray(t)?t:[t]).forEach(s=>{let n=s instanceof _a?s:b_(s)?s.expressions:void 0;if(!n)throw new Error("drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof");let u=n.asSortedArray().filter(d=>d.probability>r),c=Rt(s)?s.detection.box.bottomLeft:i||new J(0,0);new la(u.map(d=>`${d.expression} (${In(d.probability)})`),c).draw(e)})}function ya(e){return Rt(e)&&e.landmarks instanceof _t&&e.unshiftedLandmarks instanceof _t&&e.alignedRect instanceof Ie}function y_(e){let t=d=>d*180/Math.PI,r=(d,o)=>Math.sqrt((d.x-o.x)**2+(d.y-o.y)**2),i={roll:void 0,pitch:void 0,yaw:void 0},s=(d,o,a)=>{let l=Math.floor(d.x-o.x),m=Math.floor(o.x-a.x);return l-m},n=(d,o)=>{let a=Math.hypot(o.x-d.x,o.y-d.y),l=o.y-d.y,m=Math.asin(l/a),p=t(m),g=Math.floor(90-p),b=o.x-d.x<0?-1:1;return g*b},u=(d,o,a)=>{let l=r(d,a),m=new J((d.x+a.x)/2,(d.y+a.y)/2),p=r(o,m),g=Math.atan(p/l),b=Math.floor(t(g)),I=m.y-o.y<0?-1:1;return b*I};if(!e||!e.positions||e.positions.length!==68)return i;let c=e.positions;return i.roll=n(c[27],c[66]),i.pitch=u(c[14],c[30],c[2]),i.yaw=s(c[14],c[33],c[2]),i}function wa(e,t){let{box:r}=e.detection,i=t.shiftBy(r.x,r.y),s=i.align(),{imageDims:n}=e.detection,u=new Ie(e.detection.score,s.rescale(n.reverse()),n),c=y_(t);return{...e,landmarks:i,unshiftedLandmarks:t,alignedRect:u,angle:c}}var Oo=class{constructor(e={}){let{drawLines:t=!0,drawPoints:r=!0,lineWidth:i,lineColor:s,pointSize:n,pointColor:u}=e;this.drawLines=t,this.drawPoints=r,this.lineWidth=i||1,this.pointSize=n||2,this.lineColor=s||"rgba(0, 255, 255, 1)",this.pointColor=u||"rgba(255, 0, 255, 1)"}},$o=class{constructor(e,t={}){this.faceLandmarks=e,this.options=new Oo(t)}draw(e){let t=Ge(e),{drawLines:r,drawPoints:i,lineWidth:s,lineColor:n,pointSize:u,pointColor:c}=this.options;if(r&&this.faceLandmarks instanceof go&&(t.strokeStyle=n,t.lineWidth=s,He(t,this.faceLandmarks.getJawOutline()),He(t,this.faceLandmarks.getLeftEyeBrow()),He(t,this.faceLandmarks.getRightEyeBrow()),He(t,this.faceLandmarks.getNose()),He(t,this.faceLandmarks.getLeftEye(),!0),He(t,this.faceLandmarks.getRightEye(),!0),He(t,this.faceLandmarks.getMouth(),!0)),i){t.strokeStyle=c,t.fillStyle=c;let d=o=>{t.beginPath(),t.arc(o.x,o.y,u,0,2*Math.PI),t.fill()};this.faceLandmarks.positions.forEach(d)}}};function w_(e,t){(Array.isArray(t)?t:[t]).forEach(r=>{let i=r instanceof _t?r:ya(r)?r.landmarks:void 0;if(!i)throw new Error("drawFaceLandmarks - expected faceExpressions to be FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>> or array thereof");new $o(i).draw(e)})}var v_="1.7.15";function I_(e,t){let r=ha(e,t),i=ga(e,t);function s(u,c,d){let o=i(u,c,`${d}/separable_conv0`),a=i(c,c,`${d}/separable_conv1`),l=r(u,c,1,`${d}/expansion_conv`);return{separable_conv0:o,separable_conv1:a,expansion_conv:l}}function n(u,c){let d=i(u,u,`${c}/separable_conv0`),o=i(u,u,`${c}/separable_conv1`),a=i(u,u,`${c}/separable_conv2`);return{separable_conv0:d,separable_conv1:o,separable_conv2:a}}return{extractConvParams:r,extractSeparableConvParams:i,extractReductionBlockParams:s,extractMainBlockParams:n}}function x_(e,t){let r=[],{extractWeights:i,getRemainingWeights:s}=Xe(e),{extractConvParams:n,extractSeparableConvParams:u,extractReductionBlockParams:c,extractMainBlockParams:d}=I_(i,r),o=n(3,32,3,"entry_flow/conv_in"),a=c(32,64,"entry_flow/reduction_block_0"),l=c(64,128,"entry_flow/reduction_block_1"),m={conv_in:o,reduction_block_0:a,reduction_block_1:l},p={};bt(t,0,1).forEach(v=>{p[`main_block_${v}`]=d(128,`middle_flow/main_block_${v}`)});let g=c(128,256,"exit_flow/reduction_block"),b=u(256,512,"exit_flow/separable_conv"),I={reduction_block:g,separable_conv:b};if(s().length!==0)throw new Error(`weights remaing after extract: ${s().length}`);return{paramMappings:r,params:{entry_flow:m,middle_flow:p,exit_flow:I}}}function k_(e,t){let r=ut(e,t),i=Po(r),s=ba(r);function n(c){let d=s(`${c}/separable_conv0`),o=s(`${c}/separable_conv1`),a=i(`${c}/expansion_conv`);return{separable_conv0:d,separable_conv1:o,expansion_conv:a}}function u(c){let d=s(`${c}/separable_conv0`),o=s(`${c}/separable_conv1`),a=s(`${c}/separable_conv2`);return{separable_conv0:d,separable_conv1:o,separable_conv2:a}}return{extractConvParams:i,extractSeparableConvParams:s,extractReductionBlockParams:n,extractMainBlockParams:u}}function S_(e,t){let r=[],{extractConvParams:i,extractSeparableConvParams:s,extractReductionBlockParams:n,extractMainBlockParams:u}=k_(e,r),c=i("entry_flow/conv_in"),d=n("entry_flow/reduction_block_0"),o=n("entry_flow/reduction_block_1"),a={conv_in:c,reduction_block_0:d,reduction_block_1:o},l={};bt(t,0,1).forEach(b=>{l[`main_block_${b}`]=u(`middle_flow/main_block_${b}`)});let m=n("exit_flow/reduction_block"),p=s("exit_flow/separable_conv"),g={reduction_block:m,separable_conv:p};return Je(e,r),{params:{entry_flow:a,middle_flow:l,exit_flow:g},paramMappings:r}}function Lo(e,t,r){return f.add(f.conv2d(e,t.filters,r,"same"),t.bias)}function zn(e,t,r=!0){let i=r?f.relu(e):e;return i=we(i,t.separable_conv0,[1,1]),i=we(f.relu(i),t.separable_conv1,[1,1]),i=f.maxPool(i,[3,3],[2,2],"same"),i=f.add(i,Lo(e,t.expansion_conv,[2,2])),i}function M_(e,t){let r=we(f.relu(e),t.separable_conv0,[1,1]);return r=we(f.relu(r),t.separable_conv1,[1,1]),r=we(f.relu(r),t.separable_conv2,[1,1]),r=f.add(r,e),r}var D_=class extends qe{constructor(e){super("TinyXception"),this._numMainBlocks=e}forwardInput(e){let{params:t}=this;if(!t)throw new Error("TinyXception - load model before inference");return f.tidy(()=>{let r=f.cast(e.toBatchTensor(112,!0),"float32"),i=$t(r,[122.782,117.001,104.298]).div(255),s=f.relu(Lo(i,t.entry_flow.conv_in,[2,2]));return s=zn(s,t.entry_flow.reduction_block_0,!1),s=zn(s,t.entry_flow.reduction_block_1),bt(this._numMainBlocks,0,1).forEach(n=>{s=M_(s,t.middle_flow[`main_block_${n}`])}),s=zn(s,t.exit_flow.reduction_block),s=f.relu(we(s,t.exit_flow.separable_conv,[1,1])),s})}async forward(e){return this.forwardInput(await le(e))}getDefaultModelName(){return"tiny_xception_model"}extractParamsFromWeightMap(e){return S_(e,this._numMainBlocks)}extractParams(e){return x_(e,this._numMainBlocks)}};function F_(e){let t=[],{extractWeights:r,getRemainingWeights:i}=Xe(e),s=Ao(r,t),n=s(512,1,"fc/age"),u=s(512,2,"fc/gender");if(i().length!==0)throw new Error(`weights remaing after extract: ${i().length}`);return{paramMappings:t,params:{fc:{age:n,gender:u}}}}function A_(e){let t=[],r=ut(e,t);function i(n){let u=r(`${n}/weights`,2),c=r(`${n}/bias`,1);return{weights:u,bias:c}}let s={fc:{age:i("fc/age"),gender:i("fc/gender")}};return Je(e,t),{params:s,paramMappings:t}}var E_=(e=>(e.FEMALE="female",e.MALE="male",e))(E_||{}),C_=class extends qe{constructor(e=new D_(2)){super("AgeGenderNet"),this._faceFeatureExtractor=e}get faceFeatureExtractor(){return this._faceFeatureExtractor}runNet(e){let{params:t}=this;if(!t)throw new Error(`${this._name} - load model before inference`);return f.tidy(()=>{let r=e instanceof _n?this.faceFeatureExtractor.forwardInput(e):e,i=f.avgPool(r,[7,7],[2,2],"valid").as2D(r.shape[0],-1),s=Qn(i,t.fc.age).as1D(),n=Qn(i,t.fc.gender);return{age:s,gender:n}})}forwardInput(e){return f.tidy(()=>{let{age:t,gender:r}=this.runNet(e);return{age:t,gender:f.softmax(r)}})}async forward(e){return this.forwardInput(await le(e))}async predictAgeAndGender(e){let t=await le(e),r=await this.forwardInput(t),i=f.unstack(r.age),s=f.unstack(r.gender),n=i.map((c,d)=>({ageTensor:c,genderTensor:s[d]})),u=await Promise.all(n.map(async({ageTensor:c,genderTensor:d})=>{let o=c.dataSync()[0],a=d.dataSync()[0],l=a>.5,m=l?"male":"female",p=l?a:1-a;return c.dispose(),d.dispose(),{age:o,gender:m,genderProbability:p}}));return r.age.dispose(),r.gender.dispose(),t.isBatchInput?u:u[0]}getDefaultModelName(){return"age_gender_model"}dispose(e=!0){this.faceFeatureExtractor.dispose(e),super.dispose(e)}loadClassifierParams(e){let{params:t,paramMappings:r}=this.extractClassifierParams(e);this._params=t,this._paramMappings=r}extractClassifierParams(e){return F_(e)}extractParamsFromWeightMap(e){let{featureExtractorMap:t,classifierMap:r}=To(e);return this.faceFeatureExtractor.loadFromWeightMap(t),A_(r)}extractParams(e){let t=e.slice(0,e.length-1539),r=e.slice(e.length-1539);return this.faceFeatureExtractor.extractWeights(t),this.extractClassifierParams(r)}},Ho=class extends Bo{postProcess(e,t,r){let i=r.map(({width:n,height:u})=>{let c=t/Math.max(u,n);return{width:n*c,height:u*c}}),s=i.length;return f.tidy(()=>{let n=(o,a)=>f.stack([f.fill([68],o,"float32"),f.fill([68],a,"float32")],1).as2D(1,136).as1D(),u=(o,a)=>{let{width:l,height:m}=i[o];return a(l,m)?Math.abs(l-m)/2:0},c=o=>u(o,(a,l)=>a<l),d=o=>u(o,(a,l)=>l<a);return e.mul(f.fill([s,136],t,"float32")).sub(f.stack(Array.from(Array(s),(o,a)=>n(c(a),d(a))))).div(f.stack(Array.from(Array(s),(o,a)=>n(i[a].width,i[a].height))))})}forwardInput(e){return f.tidy(()=>{let t=this.runNet(e);return this.postProcess(t,e.inputSize,e.inputDimensions.map(([r,i])=>({height:r,width:i})))})}async forward(e){return this.forwardInput(await le(e))}async detectLandmarks(e){let t=await le(e),r=f.tidy(()=>f.unstack(this.forwardInput(t))),i=await Promise.all(r.map(async(s,n)=>{let u=Array.from(s.dataSync()),c=u.filter((o,a)=>Xn(a)),d=u.filter((o,a)=>!Xn(a));return new go(Array(68).fill(0).map((o,a)=>new J(c[a],d[a])),{height:t.getInputHeight(n),width:t.getInputWidth(n)})}));return r.forEach(s=>s.dispose()),t.isBatchInput?i:i[0]}getClassifierChannelsOut(){return 136}},zo=class extends Ho{constructor(e=new Ro){super("FaceLandmark68Net",e)}getDefaultModelName(){return"face_landmark_68_model"}getClassifierChannelsIn(){return 256}};function P_(e){let t=[],{extractDenseBlock3Params:r}=No(e,t),i={dense0:r("dense0",!0),dense1:r("dense1"),dense2:r("dense2")};return Je(e,t),{params:i,paramMappings:t}}function N_(e){let t=[],{extractWeights:r,getRemainingWeights:i}=Xe(e),{extractDenseBlock3Params:s}=Co(r,t),n=s(3,32,"dense0",!0),u=s(32,64,"dense1"),c=s(64,128,"dense2");if(i().length!==0)throw new Error(`weights remaing after extract: ${i().length}`);return{paramMappings:t,params:{dense0:n,dense1:u,dense2:c}}}var R_=class extends qe{constructor(){super("TinyFaceFeatureExtractor")}forwardInput(e){let{params:t}=this;if(!t)throw new Error("TinyFaceFeatureExtractor - load model before inference");return f.tidy(()=>{let r=f.cast(e.toBatchTensor(112,!0),"float32"),i=$t(r,[122.782,117.001,104.298]).div(255),s=Hn(i,t.dense0,!0);return s=Hn(s,t.dense1),s=Hn(s,t.dense2),s=f.avgPool(s,[14,14],[2,2],"valid"),s})}async forward(e){return this.forwardInput(await le(e))}getDefaultModelName(){return"face_feature_extractor_tiny_model"}extractParamsFromWeightMap(e){return P_(e)}extractParams(e){return N_(e)}},T_=class extends Ho{constructor(e=new R_){super("FaceLandmark68TinyNet",e)}getDefaultModelName(){return"face_landmark_68_tiny_model"}getClassifierChannelsIn(){return 128}},Wy=class extends zo{};function B_(e,t){return f.add(f.mul(e,t.weights),t.biases)}function va(e,t,r,i,s="same"){let{filters:n,bias:u}=t.conv,c=f.conv2d(e,n,r,s);return c=f.add(c,u),c=B_(c,t.scale),i?f.relu(c):c}function W_(e,t){return va(e,t,[1,1],!0)}function Vo(e,t){return va(e,t,[1,1],!1)}function Go(e,t){return va(e,t,[2,2],!0,"valid")}function O_(e,t){function r(c,d,o){let a=e(c),l=a.length/(d*o*o);if(uo(l))throw new Error(`depth has to be an integer: ${l}, weights.length: ${a.length}, numFilters: ${d}, filterSize: ${o}`);return f.tidy(()=>f.transpose(f.tensor4d(a,[d,l,o,o]),[2,3,1,0]))}function i(c,d,o,a){let l=r(c,d,o),m=f.tensor1d(e(d));return t.push({paramPath:`${a}/filters`},{paramPath:`${a}/bias`}),{filters:l,bias:m}}function s(c,d){let o=f.tensor1d(e(c)),a=f.tensor1d(e(c));return t.push({paramPath:`${d}/weights`},{paramPath:`${d}/biases`}),{weights:o,biases:a}}function n(c,d,o,a){let l=i(c,d,o,`${a}/conv`),m=s(d,`${a}/scale`);return{conv:l,scale:m}}function u(c,d,o,a,l=!1){let m=n((l?.5:1)*c,d,o,`${a}/conv1`),p=n(c,d,o,`${a}/conv2`);return{conv1:m,conv2:p}}return{extractConvLayerParams:n,extractResidualLayerParams:u}}function $_(e){let{extractWeights:t,getRemainingWeights:r}=Xe(e),i=[],{extractConvLayerParams:s,extractResidualLayerParams:n}=O_(t,i),u=s(4704,32,7,"conv32_down"),c=n(9216,32,3,"conv32_1"),d=n(9216,32,3,"conv32_2"),o=n(9216,32,3,"conv32_3"),a=n(36864,64,3,"conv64_down",!0),l=n(36864,64,3,"conv64_1"),m=n(36864,64,3,"conv64_2"),p=n(36864,64,3,"conv64_3"),g=n(147456,128,3,"conv128_down",!0),b=n(147456,128,3,"conv128_1"),I=n(147456,128,3,"conv128_2"),v=n(589824,256,3,"conv256_down",!0),_=n(589824,256,3,"conv256_1"),y=n(589824,256,3,"conv256_2"),k=n(589824,256,3,"conv256_down_out"),A=f.tidy(()=>f.transpose(f.tensor2d(t(256*128),[128,256]),[1,0]));if(i.push({paramPath:"fc"}),r().length!==0)throw new Error(`weights remaing after extract: ${r().length}`);return{params:{conv32_down:u,conv32_1:c,conv32_2:d,conv32_3:o,conv64_down:a,conv64_1:l,conv64_2:m,conv64_3:p,conv128_down:g,conv128_1:b,conv128_2:I,conv256_down:v,conv256_1:_,conv256_2:y,conv256_down_out:k,fc:A},paramMappings:i}}function L_(e,t){let r=ut(e,t);function i(u){let c=r(`${u}/scale/weights`,1),d=r(`${u}/scale/biases`,1);return{weights:c,biases:d}}function s(u){let c=r(`${u}/conv/filters`,4),d=r(`${u}/conv/bias`,1),o=i(u);return{conv:{filters:c,bias:d},scale:o}}function n(u){return{conv1:s(`${u}/conv1`),conv2:s(`${u}/conv2`)}}return{extractConvLayerParams:s,extractResidualLayerParams:n}}function H_(e){let t=[],{extractConvLayerParams:r,extractResidualLayerParams:i}=L_(e,t),s=r("conv32_down"),n=i("conv32_1"),u=i("conv32_2"),c=i("conv32_3"),d=i("conv64_down"),o=i("conv64_1"),a=i("conv64_2"),l=i("conv64_3"),m=i("conv128_down"),p=i("conv128_1"),g=i("conv128_2"),b=i("conv256_down"),I=i("conv256_1"),v=i("conv256_2"),_=i("conv256_down_out"),{fc:y}=e;if(t.push({originalPath:"fc",paramPath:"fc"}),!oo(y))throw new Error(`expected weightMap[fc] to be a Tensor2D, instead have ${y}`);let k={conv32_down:s,conv32_1:n,conv32_2:u,conv32_3:c,conv64_down:d,conv64_1:o,conv64_2:a,conv64_3:l,conv128_down:m,conv128_1:p,conv128_2:g,conv256_down:b,conv256_1:I,conv256_2:v,conv256_down_out:_,fc:y};return Je(e,t),{params:k,paramMappings:t}}function De(e,t){let r=W_(e,t.conv1);return r=Vo(r,t.conv2),r=f.add(r,e),r=f.relu(r),r}function pn(e,t){let r=Go(e,t.conv1);r=Vo(r,t.conv2);let i=f.avgPool(e,2,2,"valid"),s=f.zeros(i.shape),n=i.shape[3]!==r.shape[3];if(i.shape[1]!==r.shape[1]||i.shape[2]!==r.shape[2]){let u=[...r.shape];u[1]=1;let c=f.zeros(u);r=f.concat([r,c],1);let d=[...r.shape];d[2]=1;let o=f.zeros(d);r=f.concat([r,o],2)}return i=n?f.concat([i,s],3):i,r=f.add(i,r),r=f.relu(r),r}var jo=class extends qe{constructor(){super("FaceRecognitionNet")}forwardInput(e){let{params:t}=this;if(!t)throw new Error("FaceRecognitionNet - load model before inference");return f.tidy(()=>{let r=f.cast(e.toBatchTensor(150,!0),"float32"),i=$t(r,[122.782,117.001,104.298]).div(255),s=Go(i,t.conv32_down);s=f.maxPool(s,3,2,"valid"),s=De(s,t.conv32_1),s=De(s,t.conv32_2),s=De(s,t.conv32_3),s=pn(s,t.conv64_down),s=De(s,t.conv64_1),s=De(s,t.conv64_2),s=De(s,t.conv64_3),s=pn(s,t.conv128_down),s=De(s,t.conv128_1),s=De(s,t.conv128_2),s=pn(s,t.conv256_down),s=De(s,t.conv256_1),s=De(s,t.conv256_2),s=pn(s,t.conv256_down_out);let n=s.mean([1,2]);return f.matMul(n,t.fc)})}async forward(e){return this.forwardInput(await le(e))}async computeFaceDescriptor(e){var t;if((t=e==null?void 0:e.shape)!=null&&t.some(n=>n<=0))return new Float32Array(128);let r=await le(e),i=f.tidy(()=>f.unstack(this.forwardInput(r))),s=await Promise.all(i.map(n=>n.data()));return i.forEach(n=>n.dispose()),r.isBatchInput?s:s[0]}getDefaultModelName(){return"face_recognition_model"}extractParamsFromWeightMap(e){return H_(e)}extractParams(e){return $_(e)}};function Oy(e){let t=new jo;return t.extractWeights(e),t}function Uo(e,t){return{...e,descriptor:t}}function $y(e){return typeof e.age=="number"}function qo(e,t){return{...e,age:t}}function Ly(e){return(e.gender==="male"||e.gender==="female")&&hn(e.genderProbability)}function Jo(e,t,r){return{...e,gender:t,genderProbability:r}}function z_(e,t){function r(d,o){let a=f.tensor4d(e(9*d),[3,3,d,1]),l=f.tensor1d(e(d)),m=f.tensor1d(e(d)),p=f.tensor1d(e(d)),g=f.tensor1d(e(d));return t.push({paramPath:`${o}/filters`},{paramPath:`${o}/batch_norm_scale`},{paramPath:`${o}/batch_norm_offset`},{paramPath:`${o}/batch_norm_mean`},{paramPath:`${o}/batch_norm_variance`}),{filters:a,batch_norm_scale:l,batch_norm_offset:m,batch_norm_mean:p,batch_norm_variance:g}}function i(d,o,a,l,m){let p=f.tensor4d(e(d*o*a*a),[a,a,d,o]),g=f.tensor1d(e(o));return t.push({paramPath:`${l}/filters`},{paramPath:`${l}/${m?"batch_norm_offset":"bias"}`}),{filters:p,bias:g}}function s(d,o,a,l){let{filters:m,bias:p}=i(d,o,a,l,!0);return{filters:m,batch_norm_offset:p}}function n(d,o,a){let l=r(d,`${a}/depthwise_conv`),m=s(d,o,1,`${a}/pointwise_conv`);return{depthwise_conv:l,pointwise_conv:m}}function u(){let d=s(3,32,3,"mobilenetv1/conv_0"),o=n(32,64,"mobilenetv1/conv_1"),a=n(64,128,"mobilenetv1/conv_2"),l=n(128,128,"mobilenetv1/conv_3"),m=n(128,256,"mobilenetv1/conv_4"),p=n(256,256,"mobilenetv1/conv_5"),g=n(256,512,"mobilenetv1/conv_6"),b=n(512,512,"mobilenetv1/conv_7"),I=n(512,512,"mobilenetv1/conv_8"),v=n(512,512,"mobilenetv1/conv_9"),_=n(512,512,"mobilenetv1/conv_10"),y=n(512,512,"mobilenetv1/conv_11"),k=n(512,1024,"mobilenetv1/conv_12"),A=n(1024,1024,"mobilenetv1/conv_13");return{conv_0:d,conv_1:o,conv_2:a,conv_3:l,conv_4:m,conv_5:p,conv_6:g,conv_7:b,conv_8:I,conv_9:v,conv_10:_,conv_11:y,conv_12:k,conv_13:A}}function c(){let d=s(1024,256,1,"prediction_layer/conv_0"),o=s(256,512,3,"prediction_layer/conv_1"),a=s(512,128,1,"prediction_layer/conv_2"),l=s(128,256,3,"prediction_layer/conv_3"),m=s(256,128,1,"prediction_layer/conv_4"),p=s(128,256,3,"prediction_layer/conv_5"),g=s(256,64,1,"prediction_layer/conv_6"),b=s(64,128,3,"prediction_layer/conv_7"),I=i(512,12,1,"prediction_layer/box_predictor_0/box_encoding_predictor"),v=i(512,9,1,"prediction_layer/box_predictor_0/class_predictor"),_=i(1024,24,1,"prediction_layer/box_predictor_1/box_encoding_predictor"),y=i(1024,18,1,"prediction_layer/box_predictor_1/class_predictor"),k=i(512,24,1,"prediction_layer/box_predictor_2/box_encoding_predictor"),A=i(512,18,1,"prediction_layer/box_predictor_2/class_predictor"),E=i(256,24,1,"prediction_layer/box_predictor_3/box_encoding_predictor"),R=i(256,18,1,"prediction_layer/box_predictor_3/class_predictor"),W=i(256,24,1,"prediction_layer/box_predictor_4/box_encoding_predictor"),H=i(256,18,1,"prediction_layer/box_predictor_4/class_predictor"),B=i(128,24,1,"prediction_layer/box_predictor_5/box_encoding_predictor"),V=i(128,18,1,"prediction_layer/box_predictor_5/class_predictor");return{conv_0:d,conv_1:o,conv_2:a,conv_3:l,conv_4:m,conv_5:p,conv_6:g,conv_7:b,box_predictor_0:{box_encoding_predictor:I,class_predictor:v},box_predictor_1:{box_encoding_predictor:_,class_predictor:y},box_predictor_2:{box_encoding_predictor:k,class_predictor:A},box_predictor_3:{box_encoding_predictor:E,class_predictor:R},box_predictor_4:{box_encoding_predictor:W,class_predictor:H},box_predictor_5:{box_encoding_predictor:B,class_predictor:V}}}return{extractMobilenetV1Params:u,extractPredictionLayerParams:c}}function V_(e){let t=[],{extractWeights:r,getRemainingWeights:i}=Xe(e),{extractMobilenetV1Params:s,extractPredictionLayerParams:n}=z_(r,t),u=s(),c=n(),d={extra_dim:f.tensor3d(r(5118*4),[1,5118,4])};if(t.push({paramPath:"output_layer/extra_dim"}),i().length!==0)throw new Error(`weights remaing after extract: ${i().length}`);return{params:{mobilenetv1:u,prediction_layer:c,output_layer:d},paramMappings:t}}function G_(e,t){let r=ut(e,t);function i(o,a,l){let m=r(`${o}/Conv2d_${a}_pointwise/weights`,4,`${l}/filters`),p=r(`${o}/Conv2d_${a}_pointwise/convolution_bn_offset`,1,`${l}/batch_norm_offset`);return{filters:m,batch_norm_offset:p}}function s(o){let a=`mobilenetv1/conv_${o}`,l=`MobilenetV1/Conv2d_${o}_depthwise`,m=`${a}/depthwise_conv`,p=`${a}/pointwise_conv`,g=r(`${l}/depthwise_weights`,4,`${m}/filters`),b=r(`${l}/BatchNorm/gamma`,1,`${m}/batch_norm_scale`),I=r(`${l}/BatchNorm/beta`,1,`${m}/batch_norm_offset`),v=r(`${l}/BatchNorm/moving_mean`,1,`${m}/batch_norm_mean`),_=r(`${l}/BatchNorm/moving_variance`,1,`${m}/batch_norm_variance`);return{depthwise_conv:{filters:g,batch_norm_scale:b,batch_norm_offset:I,batch_norm_mean:v,batch_norm_variance:_},pointwise_conv:i("MobilenetV1",o,p)}}function n(){return{conv_0:i("MobilenetV1",0,"mobilenetv1/conv_0"),conv_1:s(1),conv_2:s(2),conv_3:s(3),conv_4:s(4),conv_5:s(5),conv_6:s(6),conv_7:s(7),conv_8:s(8),conv_9:s(9),conv_10:s(10),conv_11:s(11),conv_12:s(12),conv_13:s(13)}}function u(o,a){let l=r(`${o}/weights`,4,`${a}/filters`),m=r(`${o}/biases`,1,`${a}/bias`);return{filters:l,bias:m}}function c(o){let a=u(`Prediction/BoxPredictor_${o}/BoxEncodingPredictor`,`prediction_layer/box_predictor_${o}/box_encoding_predictor`),l=u(`Prediction/BoxPredictor_${o}/ClassPredictor`,`prediction_layer/box_predictor_${o}/class_predictor`);return{box_encoding_predictor:a,class_predictor:l}}function d(){return{conv_0:i("Prediction",0,"prediction_layer/conv_0"),conv_1:i("Prediction",1,"prediction_layer/conv_1"),conv_2:i("Prediction",2,"prediction_layer/conv_2"),conv_3:i("Prediction",3,"prediction_layer/conv_3"),conv_4:i("Prediction",4,"prediction_layer/conv_4"),conv_5:i("Prediction",5,"prediction_layer/conv_5"),conv_6:i("Prediction",6,"prediction_layer/conv_6"),conv_7:i("Prediction",7,"prediction_layer/conv_7"),box_predictor_0:c(0),box_predictor_1:c(1),box_predictor_2:c(2),box_predictor_3:c(3),box_predictor_4:c(4),box_predictor_5:c(5)}}return{extractMobilenetV1Params:n,extractPredictionLayerParams:d}}function j_(e){let t=[],{extractMobilenetV1Params:r,extractPredictionLayerParams:i}=G_(e,t),s=e["Output/extra_dim"];if(t.push({originalPath:"Output/extra_dim",paramPath:"output_layer/extra_dim"}),!Ot(s))throw new Error(`expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have ${s}`);let n={mobilenetv1:r(),prediction_layer:i(),output_layer:{extra_dim:s}};return Je(e,t),{params:n,paramMappings:t}}function Fe(e,t,r){return f.tidy(()=>{let i=f.conv2d(e,t.filters,r,"same");return i=f.add(i,t.batch_norm_offset),f.clipByValue(i,0,6)})}var U_=.0010000000474974513;function q_(e,t,r){return f.tidy(()=>{let i=f.depthwiseConv2d(e,t.filters,r,"same");return i=f.batchNorm(i,t.batch_norm_mean,t.batch_norm_variance,t.batch_norm_offset,t.batch_norm_scale,U_),f.clipByValue(i,0,6)})}function J_(e){return[2,4,6,12].some(t=>t===e)?[2,2]:[1,1]}function X_(e,t){return f.tidy(()=>{let r,i=Fe(e,t.conv_0,[2,2]);if([t.conv_1,t.conv_2,t.conv_3,t.conv_4,t.conv_5,t.conv_6,t.conv_7,t.conv_8,t.conv_9,t.conv_10,t.conv_11,t.conv_12,t.conv_13].forEach((s,n)=>{let u=n+1,c=J_(u);i=q_(i,s.depthwise_conv,c),i=Fe(i,s.pointwise_conv,[1,1]),u===11&&(r=i)}),r===null)throw new Error("mobileNetV1 - output of conv layer 11 is null");return{out:i,conv11:r}})}function Y_(e,t,r){let i=e.arraySync(),s=Math.min(i[t][0],i[t][2]),n=Math.min(i[t][1],i[t][3]),u=Math.max(i[t][0],i[t][2]),c=Math.max(i[t][1],i[t][3]),d=Math.min(i[r][0],i[r][2]),o=Math.min(i[r][1],i[r][3]),a=Math.max(i[r][0],i[r][2]),l=Math.max(i[r][1],i[r][3]),m=(u-s)*(c-n),p=(a-d)*(l-o);if(m<=0||p<=0)return 0;let g=Math.max(s,d),b=Math.max(n,o),I=Math.min(u,a),v=Math.min(c,l),_=Math.max(I-g,0)*Math.max(v-b,0);return _/(m+p-_)}function K_(e,t,r,i,s){let n=e.shape[0],u=Math.min(r,n),c=t.map((a,l)=>({score:a,boxIndex:l})).filter(a=>a.score>s).sort((a,l)=>l.score-a.score),d=a=>a<=i?1:0,o=[];return c.forEach(a=>{if(o.length>=u)return;let l=a.score;for(let m=o.length-1;m>=0;--m){let p=Y_(e,a.boxIndex,o[m]);if(p!==0&&(a.score*=d(p),a.score<=s))break}l===a.score&&o.push(a.boxIndex)}),o}function Q_(e){let t=f.unstack(f.transpose(e,[1,0])),r=[f.sub(t[2],t[0]),f.sub(t[3],t[1])],i=[f.add(t[0],f.div(r[0],2)),f.add(t[1],f.div(r[1],2))];return{sizes:r,centers:i}}function Z_(e,t){let{sizes:r,centers:i}=Q_(e),s=f.unstack(f.transpose(t,[1,0])),n=f.div(f.mul(f.exp(f.div(s[2],5)),r[0]),2),u=f.add(f.mul(f.div(s[0],10),r[0]),i[0]),c=f.div(f.mul(f.exp(f.div(s[3],5)),r[1]),2),d=f.add(f.mul(f.div(s[1],10),r[1]),i[1]);return f.transpose(f.stack([f.sub(u,n),f.sub(d,c),f.add(u,n),f.add(d,c)]),[1,0])}function ey(e,t,r){return f.tidy(()=>{let i=e.shape[0],s=Z_(f.reshape(f.tile(r.extra_dim,[i,1,1]),[-1,4]),f.reshape(e,[-1,4]));s=f.reshape(s,[i,s.shape[0]/i,4]);let n=f.sigmoid(f.slice(t,[0,0,1],[-1,-1,-1])),u=f.slice(n,[0,0,0],[-1,-1,1]);u=f.reshape(u,[i,u.shape[1]]);let c=f.unstack(s),d=f.unstack(u);return{boxes:c,scores:d}})}function gt(e,t){return f.tidy(()=>{let r=e.shape[0],i=f.reshape(Pt(e,t.box_encoding_predictor),[r,-1,1,4]),s=f.reshape(Pt(e,t.class_predictor),[r,-1,3]);return{boxPredictionEncoding:i,classPrediction:s}})}function ty(e,t,r){return f.tidy(()=>{let i=Fe(e,r.conv_0,[1,1]),s=Fe(i,r.conv_1,[2,2]),n=Fe(s,r.conv_2,[1,1]),u=Fe(n,r.conv_3,[2,2]),c=Fe(u,r.conv_4,[1,1]),d=Fe(c,r.conv_5,[2,2]),o=Fe(d,r.conv_6,[1,1]),a=Fe(o,r.conv_7,[2,2]),l=gt(t,r.box_predictor_0),m=gt(e,r.box_predictor_1),p=gt(s,r.box_predictor_2),g=gt(u,r.box_predictor_3),b=gt(d,r.box_predictor_4),I=gt(a,r.box_predictor_5),v=f.concat([l.boxPredictionEncoding,m.boxPredictionEncoding,p.boxPredictionEncoding,g.boxPredictionEncoding,b.boxPredictionEncoding,I.boxPredictionEncoding],1),_=f.concat([l.classPrediction,m.classPrediction,p.classPrediction,g.classPrediction,b.classPrediction,I.classPrediction],1);return{boxPredictions:v,classPredictions:_}})}var vt=class{constructor({minConfidence:e,maxResults:t}={}){if(this._name="SsdMobilenetv1Options",this._minConfidence=e||.5,this._maxResults=t||100,typeof this._minConfidence!="number"||this._minConfidence<=0||this._minConfidence>=1)throw new Error(`${this._name} - expected minConfidence to be a number between 0 and 1`);if(typeof this._maxResults!="number")throw new Error(`${this._name} - expected maxResults to be a number`)}get minConfidence(){return this._minConfidence}get maxResults(){return this._maxResults}},Ia=class extends qe{constructor(){super("SsdMobilenetv1")}forwardInput(e){let{params:t}=this;if(!t)throw new Error("SsdMobilenetv1 - load model before inference");return f.tidy(()=>{let r=f.cast(e.toBatchTensor(512,!1),"float32"),i=f.sub(f.div(r,127.5),1),s=X_(i,t.mobilenetv1),{boxPredictions:n,classPredictions:u}=ty(s.out,s.conv11,t.prediction_layer);return ey(n,u,t.output_layer)})}async forward(e){return this.forwardInput(await le(e))}async locateFaces(e,t={}){let{maxResults:r,minConfidence:i}=new vt(t),s=await le(e),{boxes:n,scores:u}=this.forwardInput(s),c=n[0],d=u[0];for(let v=1;v<n.length;v++)n[v].dispose(),u[v].dispose();let o=Array.from(d.dataSync()),a=K_(c,o,r,.5,i),l=s.getReshapedInputDimensions(0),m=s.inputSize,p=m/l.width,g=m/l.height,b=c.arraySync(),I=a.map(v=>{let[_,y]=[Math.max(0,b[v][0]),Math.min(1,b[v][2])].map(E=>E*g),[k,A]=[Math.max(0,b[v][1]),Math.min(1,b[v][3])].map(E=>E*p);return new Ie(o[v],new ho(k,_,A-k,y-_),{height:s.getInputHeight(0),width:s.getInputWidth(0)})});return c.dispose(),d.dispose(),I}getDefaultModelName(){return"ssd_mobilenetv1_model"}extractParamsFromWeightMap(e){return j_(e)}extractParams(e){return V_(e)}};function ny(e){let t=new Ia;return t.extractWeights(e),t}function Hy(e){return ny(e)}var zy=class extends Ia{},ay=.4,ry=[new J(.738768,.874946),new J(2.42204,2.65704),new J(4.30971,7.04493),new J(10.246,4.59428),new J(12.6868,11.8741)],sy=[new J(1.603231,2.094468),new J(6.041143,7.080126),new J(2.882459,3.518061),new J(4.266906,5.178857),new J(9.041765,10.66308)],iy=[117.001,114.697,97.404],oy="tiny_yolov2_model",uy="tiny_yolov2_separable_conv_model",mn=e=>typeof e=="number";function cy(e){if(!e)throw new Error(`invalid config: ${e}`);if(typeof e.withSeparableConvs!="boolean")throw new Error(`config.withSeparableConvs has to be a boolean, have: ${e.withSeparableConvs}`);if(!mn(e.iouThreshold)||e.iouThreshold<0||e.iouThreshold>1)throw new Error(`config.iouThreshold has to be a number between [0, 1], have: ${e.iouThreshold}`);if(!Array.isArray(e.classes)||!e.classes.length||!e.classes.every(t=>typeof t=="string"))throw new Error(`config.classes has to be an array class names: string[], have: ${JSON.stringify(e.classes)}`);if(!Array.isArray(e.anchors)||!e.anchors.length||!e.anchors.map(t=>t||{}).every(t=>mn(t.x)&&mn(t.y)))throw new Error(`config.anchors has to be an array of { x: number, y: number }, have: ${JSON.stringify(e.anchors)}`);if(e.meanRgb&&(!Array.isArray(e.meanRgb)||e.meanRgb.length!==3||!e.meanRgb.every(mn)))throw new Error(`config.meanRgb has to be an array of shape [number, number, number], have: ${JSON.stringify(e.meanRgb)}`)}function xa(e){return f.tidy(()=>{let t=f.mul(e,f.scalar(.10000000149011612));return f.add(f.relu(f.sub(e,t)),t)})}function $e(e,t){return f.tidy(()=>{let r=f.pad(e,[[0,0],[1,1],[1,1],[0,0]]);return r=f.conv2d(r,t.conv.filters,[1,1],"valid"),r=f.sub(r,t.bn.sub),r=f.mul(r,t.bn.truediv),r=f.add(r,t.conv.bias),xa(r)})}function Le(e,t){return f.tidy(()=>{let r=f.pad(e,[[0,0],[1,1],[1,1],[0,0]]);return r=f.separableConv2d(r,t.depthwise_filter,t.pointwise_filter,[1,1],"valid"),r=f.add(r,t.bias),xa(r)})}function dy(e,t){let r=ha(e,t);function i(u,c){let d=f.tensor1d(e(u)),o=f.tensor1d(e(u));return t.push({paramPath:`${c}/sub`},{paramPath:`${c}/truediv`}),{sub:d,truediv:o}}function s(u,c,d){let o=r(u,c,3,`${d}/conv`),a=i(c,`${d}/bn`);return{conv:o,bn:a}}let n=ga(e,t);return{extractConvParams:r,extractConvWithBatchNormParams:s,extractSeparableConvParams:n}}function ly(e,t,r,i){let{extractWeights:s,getRemainingWeights:n}=Xe(e),u=[],{extractConvParams:c,extractConvWithBatchNormParams:d,extractSeparableConvParams:o}=dy(s,u),a;if(t.withSeparableConvs){let[l,m,p,g,b,I,v,_,y]=i,k=t.isFirstLayerConv2d?c(l,m,3,"conv0"):o(l,m,"conv0"),A=o(m,p,"conv1"),E=o(p,g,"conv2"),R=o(g,b,"conv3"),W=o(b,I,"conv4"),H=o(I,v,"conv5"),B=_?o(v,_,"conv6"):void 0,V=y?o(_,y,"conv7"):void 0,U=c(y||_||v,5*r,1,"conv8");a={conv0:k,conv1:A,conv2:E,conv3:R,conv4:W,conv5:H,conv6:B,conv7:V,conv8:U}}else{let[l,m,p,g,b,I,v,_,y]=i,k=d(l,m,"conv0"),A=d(m,p,"conv1"),E=d(p,g,"conv2"),R=d(g,b,"conv3"),W=d(b,I,"conv4"),H=d(I,v,"conv5"),B=d(v,_,"conv6"),V=d(_,y,"conv7"),U=c(y,5*r,1,"conv8");a={conv0:k,conv1:A,conv2:E,conv3:R,conv4:W,conv5:H,conv6:B,conv7:V,conv8:U}}if(n().length!==0)throw new Error(`weights remaing after extract: ${n().length}`);return{params:a,paramMappings:u}}function py(e,t){let r=ut(e,t);function i(c){let d=r(`${c}/sub`,1),o=r(`${c}/truediv`,1);return{sub:d,truediv:o}}function s(c){let d=r(`${c}/filters`,4),o=r(`${c}/bias`,1);return{filters:d,bias:o}}function n(c){let d=s(`${c}/conv`),o=i(`${c}/bn`);return{conv:d,bn:o}}let u=ba(r);return{extractConvParams:s,extractConvWithBatchNormParams:n,extractSeparableConvParams:u}}function my(e,t){let r=[],{extractConvParams:i,extractConvWithBatchNormParams:s,extractSeparableConvParams:n}=py(e,r),u;if(t.withSeparableConvs){let c=t.filterSizes&&t.filterSizes.length||9;u={conv0:t.isFirstLayerConv2d?i("conv0"):n("conv0"),conv1:n("conv1"),conv2:n("conv2"),conv3:n("conv3"),conv4:n("conv4"),conv5:n("conv5"),conv6:c>7?n("conv6"):void 0,conv7:c>8?n("conv7"):void 0,conv8:i("conv8")}}else u={conv0:s("conv0"),conv1:s("conv1"),conv2:s("conv2"),conv3:s("conv3"),conv4:s("conv4"),conv5:s("conv5"),conv6:s("conv6"),conv7:s("conv7"),conv8:i("conv8")};return Je(e,r),{params:u,paramMappings:r}}var Sn=class{constructor({inputSize:e,scoreThreshold:t}={}){if(this._name="TinyYolov2Options",this._inputSize=e||416,this._scoreThreshold=t||.5,typeof this._inputSize!="number"||this._inputSize%32!==0)throw new Error(`${this._name} - expected inputSize to be a number divisible by 32`);if(typeof this._scoreThreshold!="number"||this._scoreThreshold<=0||this._scoreThreshold>=1)throw new Error(`${this._name} - expected scoreThreshold to be a number between 0 and 1`)}get inputSize(){return this._inputSize}get scoreThreshold(){return this._scoreThreshold}},Xo=class Yo extends qe{constructor(t){super("TinyYolov2"),cy(t),this._config=t}get config(){return this._config}get withClassScores(){return this.config.withClassScores||this.config.classes.length>1}get boxEncodingSize(){return 5+(this.withClassScores?this.config.classes.length:0)}runTinyYolov2(t,r){let i=$e(t,r.conv0);return i=f.maxPool(i,[2,2],[2,2],"same"),i=$e(i,r.conv1),i=f.maxPool(i,[2,2],[2,2],"same"),i=$e(i,r.conv2),i=f.maxPool(i,[2,2],[2,2],"same"),i=$e(i,r.conv3),i=f.maxPool(i,[2,2],[2,2],"same"),i=$e(i,r.conv4),i=f.maxPool(i,[2,2],[2,2],"same"),i=$e(i,r.conv5),i=f.maxPool(i,[2,2],[1,1],"same"),i=$e(i,r.conv6),i=$e(i,r.conv7),Pt(i,r.conv8,"valid",!1)}runMobilenet(t,r){let i=this.config.isFirstLayerConv2d?xa(Pt(t,r.conv0,"valid",!1)):Le(t,r.conv0);return i=f.maxPool(i,[2,2],[2,2],"same"),i=Le(i,r.conv1),i=f.maxPool(i,[2,2],[2,2],"same"),i=Le(i,r.conv2),i=f.maxPool(i,[2,2],[2,2],"same"),i=Le(i,r.conv3),i=f.maxPool(i,[2,2],[2,2],"same"),i=Le(i,r.conv4),i=f.maxPool(i,[2,2],[2,2],"same"),i=Le(i,r.conv5),i=f.maxPool(i,[2,2],[1,1],"same"),i=r.conv6?Le(i,r.conv6):i,i=r.conv7?Le(i,r.conv7):i,Pt(i,r.conv8,"valid",!1)}forwardInput(t,r){let{params:i}=this;if(!i)throw new Error("TinyYolov2 - load model before inference");return f.tidy(()=>{let s=f.cast(t.toBatchTensor(r,!1),"float32");return s=this.config.meanRgb?$t(s,this.config.meanRgb):s,s=s.div(255),this.config.withSeparableConvs?this.runMobilenet(s,i):this.runTinyYolov2(s,i)})}async forward(t,r){return this.forwardInput(await le(t),r)}async detect(t,r={}){let{inputSize:i,scoreThreshold:s}=new Sn(r),n=await le(t),u=await this.forwardInput(n,i),c=f.tidy(()=>f.unstack(u)[0].expandDims()),d={width:n.getInputWidth(0),height:n.getInputHeight(0)},o=await this.extractBoxes(c,n.getReshapedInputDimensions(0),s);u.dispose(),c.dispose();let a=o.map(g=>g.box),l=o.map(g=>g.score),m=o.map(g=>g.classScore),p=o.map(g=>this.config.classes[g.label]);return Kb(a.map(g=>g.rescale(i)),l,this.config.iouThreshold,!0).map(g=>new po(l[g],m[g],p[g],a[g],d))}getDefaultModelName(){return""}extractParamsFromWeightMap(t){return my(t,this.config)}extractParams(t){let r=this.config.filterSizes||Yo.DEFAULT_FILTER_SIZES,i=r?r.length:void 0;if(i!==7&&i!==8&&i!==9)throw new Error(`TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found ${i} filterSizes in config`);return ly(t,this.config,this.boxEncodingSize,r)}async extractBoxes(t,r,i){let{width:s,height:n}=r,u=Math.max(s,n),c=u/s,d=u/n,o=t.shape[1],a=this.config.anchors.length,[l,m,p]=f.tidy(()=>{let v=t.reshape([o,o,a,this.boxEncodingSize]),_=v.slice([0,0,0,0],[o,o,a,4]),y=v.slice([0,0,0,4],[o,o,a,1]),k=this.withClassScores?f.softmax(v.slice([0,0,0,5],[o,o,a,this.config.classes.length]),3):f.scalar(0);return[_,y,k]}),g=[],b=await m.array(),I=await l.array();for(let v=0;v<o;v++)for(let _=0;_<o;_++)for(let y=0;y<a;y++){let k=Ln(b[v][_][y][0]);if(!i||k>i){let A=(_+Ln(I[v][_][y][0]))/o*c,E=(v+Ln(I[v][_][y][1]))/o*d,R=Math.exp(I[v][_][y][2])*this.config.anchors[y].x/o*c,W=Math.exp(I[v][_][y][3])*this.config.anchors[y].y/o*d,H=A-R/2,B=E-W/2,V={row:v,col:_,anchor:y},{classScore:U,label:Z}=this.withClassScores?await this.extractPredictedClass(p,V):{classScore:1,label:0};g.push({box:new lo(H,B,H+R,B+W),score:k,classScore:k*U,label:Z,...V})}}return l.dispose(),m.dispose(),p.dispose(),g}async extractPredictedClass(t,r){let{row:i,col:s,anchor:n}=r,u=await t.array();return Array(this.config.classes.length).fill(0).map((c,d)=>u[i][s][n][d]).map((c,d)=>({classScore:c,label:d})).reduce((c,d)=>c.classScore>d.classScore?c:d)}};Xo.DEFAULT_FILTER_SIZES=[3,16,32,64,128,256,512,1024,1024];var Ko=Xo,Qo=class extends Ko{constructor(e=!0){let t={withSeparableConvs:e,iouThreshold:ay,classes:["face"],...e?{anchors:sy,meanRgb:iy}:{anchors:ry,withClassScores:!0}};super(t)}get withSeparableConvs(){return this.config.withSeparableConvs}get anchors(){return this.config.anchors}async locateFaces(e,t){return(await this.detect(e,t)).map(r=>new Ie(r.score,r.relativeBox,{width:r.imageWidth,height:r.imageHeight}))}getDefaultModelName(){return this.withSeparableConvs?uy:oy}extractParamsFromWeightMap(e){return super.extractParamsFromWeightMap(e)}};function Vy(e,t=!0){let r=new Qo(t);return r.extractWeights(e),r}var fy=class extends Sn{constructor(){super(...arguments),this._name="TinyFaceDetectorOptions"}},Lt=class{async then(e){return e(await this.run())}async run(){throw new Error("ComposableTask - run is not implemented")}};async function Mn(e,t,r,i,s=({alignedRect:n})=>n){let n=e.map(d=>ya(d)?s(d):d.detection),u=i||(t instanceof f.Tensor?await fa(t,n):await ma(t,n)),c=await r(u);return u.forEach(d=>d instanceof f.Tensor&&d.dispose()),c}async function ka(e,t,r,i,s){return Mn([e],t,async n=>r(n[0]),i,s)}var hy=.4,gy=[new J(1.603231,2.094468),new J(6.041143,7.080126),new J(2.882459,3.518061),new J(4.266906,5.178857),new J(9.041765,10.66308)],by=[117.001,114.697,97.404],Zo=class extends Ko{constructor(){let e={withSeparableConvs:!0,iouThreshold:hy,classes:["face"],anchors:gy,meanRgb:by,isFirstLayerConv2d:!0,filterSizes:[3,16,32,64,128,256,512]};super(e)}get anchors(){return this.config.anchors}async locateFaces(e,t){return(await this.detect(e,t)).map(r=>new Ie(r.score,r.relativeBox,{width:r.imageWidth,height:r.imageHeight}))}getDefaultModelName(){return"tiny_face_detector_model"}extractParamsFromWeightMap(e){return super.extractParamsFromWeightMap(e)}},Y={ssdMobilenetv1:new Ia,tinyFaceDetector:new Zo,tinyYolov2:new Qo,faceLandmark68Net:new zo,faceLandmark68TinyNet:new T_,faceRecognitionNet:new jo,faceExpressionNet:new g_,ageGenderNet:new C_},_y=(e,t)=>Y.ssdMobilenetv1.locateFaces(e,t),Gy=(e,t)=>Y.tinyFaceDetector.locateFaces(e,t),jy=(e,t)=>Y.tinyYolov2.locateFaces(e,t),yy=e=>Y.faceLandmark68Net.detectLandmarks(e),Uy=e=>Y.faceLandmark68TinyNet.detectLandmarks(e),qy=e=>Y.faceRecognitionNet.computeFaceDescriptor(e),Jy=e=>Y.faceExpressionNet.predictExpressions(e),Xy=e=>Y.ageGenderNet.predictAgeAndGender(e),wy=e=>Y.ssdMobilenetv1.load(e),Yy=e=>Y.tinyFaceDetector.load(e),Ky=e=>Y.tinyYolov2.load(e),Qy=e=>Y.faceLandmark68Net.load(e),Zy=e=>Y.faceLandmark68TinyNet.load(e),ew=e=>Y.faceRecognitionNet.load(e),tw=e=>Y.faceExpressionNet.load(e),nw=e=>Y.ageGenderNet.load(e),aw=wy,rw=_y,sw=yy,eu=class extends Lt{constructor(e,t,r){super(),this.parentTask=e,this.input=t,this.extractedFaces=r}},Sa=class extends eu{async run(){let e=await this.parentTask,t=await Mn(e,this.input,async r=>Promise.all(r.map(i=>Y.faceExpressionNet.predictExpressions(i))),this.extractedFaces);return e.map((r,i)=>Wo(r,t[i]))}withAgeAndGender(){return new Aa(this,this.input)}},Ma=class extends eu{async run(){let e=await this.parentTask;if(!e)return;let t=await ka(e,this.input,r=>Y.faceExpressionNet.predictExpressions(r),this.extractedFaces);return Wo(e,t)}withAgeAndGender(){return new Ea(this,this.input)}},Da=class extends Sa{withAgeAndGender(){return new Ca(this,this.input)}withFaceDescriptors(){return new Na(this,this.input)}},Fa=class extends Ma{withAgeAndGender(){return new Pa(this,this.input)}withFaceDescriptor(){return new Ra(this,this.input)}},tu=class extends Lt{constructor(e,t,r){super(),this.parentTask=e,this.input=t,this.extractedFaces=r}},Aa=class extends tu{async run(){let e=await this.parentTask,t=await Mn(e,this.input,async r=>Promise.all(r.map(i=>Y.ageGenderNet.predictAgeAndGender(i))),this.extractedFaces);return e.map((r,i)=>{let{age:s,gender:n,genderProbability:u}=t[i];return qo(Jo(r,n,u),s)})}withFaceExpressions(){return new Sa(this,this.input)}},Ea=class extends tu{async run(){let e=await this.parentTask;if(!e)return;let{age:t,gender:r,genderProbability:i}=await ka(e,this.input,s=>Y.ageGenderNet.predictAgeAndGender(s),this.extractedFaces);return qo(Jo(e,r,i),t)}withFaceExpressions(){return new Ma(this,this.input)}},Ca=class extends Aa{withFaceExpressions(){return new Da(this,this.input)}withFaceDescriptors(){return new Na(this,this.input)}},Pa=class extends Ea{withFaceExpressions(){return new Fa(this,this.input)}withFaceDescriptor(){return new Ra(this,this.input)}},nu=class extends Lt{constructor(e,t){super(),this.parentTask=e,this.input=t}},Na=class extends nu{async run(){let e=await this.parentTask;return(await Mn(e,this.input,t=>Promise.all(t.map(r=>Y.faceRecognitionNet.computeFaceDescriptor(r))),null,t=>t.landmarks.align(null,{useDlibAlignment:!0}))).map((t,r)=>Uo(e[r],t))}withFaceExpressions(){return new Da(this,this.input)}withAgeAndGender(){return new Ca(this,this.input)}},Ra=class extends nu{async run(){let e=await this.parentTask;if(!e)return;let t=await ka(e,this.input,r=>Y.faceRecognitionNet.computeFaceDescriptor(r),null,r=>r.landmarks.align(null,{useDlibAlignment:!0}));return Uo(e,t)}withFaceExpressions(){return new Fa(this,this.input)}withAgeAndGender(){return new Pa(this,this.input)}},au=class extends Lt{constructor(e,t,r){super(),this.parentTask=e,this.input=t,this.useTinyLandmarkNet=r}get landmarkNet(){return this.useTinyLandmarkNet?Y.faceLandmark68TinyNet:Y.faceLandmark68Net}},vy=class extends au{async run(){let e=await this.parentTask,t=e.map(s=>s.detection),r=this.input instanceof f.Tensor?await fa(this.input,t):await ma(this.input,t),i=await Promise.all(r.map(s=>this.landmarkNet.detectLandmarks(s)));return r.forEach(s=>s instanceof f.Tensor&&s.dispose()),e.filter((s,n)=>i[n]).map((s,n)=>wa(s,i[n]))}withFaceExpressions(){return new Da(this,this.input)}withAgeAndGender(){return new Ca(this,this.input)}withFaceDescriptors(){return new Na(this,this.input)}},Iy=class extends au{async run(){let e=await this.parentTask;if(!e)return;let{detection:t}=e,r=this.input instanceof f.Tensor?await fa(this.input,[t]):await ma(this.input,[t]),i=await this.landmarkNet.detectLandmarks(r[0]);return r.forEach(s=>s instanceof f.Tensor&&s.dispose()),wa(e,i)}withFaceExpressions(){return new Fa(this,this.input)}withAgeAndGender(){return new Pa(this,this.input)}withFaceDescriptor(){return new Ra(this,this.input)}},ru=class extends Lt{constructor(e,t=new vt){super(),this.input=e,this.options=t}},su=class extends ru{async run(){let{input:e,options:t}=this,r;if(t instanceof fy)r=Y.tinyFaceDetector.locateFaces(e,t);else if(t instanceof vt)r=Y.ssdMobilenetv1.locateFaces(e,t);else if(t instanceof Sn)r=Y.tinyYolov2.locateFaces(e,t);else throw new Error("detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | TinyYolov2Options");return r}runAndExtendWithFaceDetections(){return new Promise((e,t)=>{this.run().then(r=>e(r.map(i=>gn({},i)))).catch(r=>t(r))})}withFaceLandmarks(e=!1){return new vy(this.runAndExtendWithFaceDetections(),this.input,e)}withFaceExpressions(){return new Sa(this.runAndExtendWithFaceDetections(),this.input)}withAgeAndGender(){return new Aa(this.runAndExtendWithFaceDetections(),this.input)}},xy=class extends ru{async run(){let e=await new su(this.input,this.options),t=e[0];return e.forEach(r=>{r.score>t.score&&(t=r)}),t}runAndExtendWithFaceDetection(){return new Promise(async e=>{let t=await this.run();e(t?gn({},t):void 0)})}withFaceLandmarks(e=!1){return new Iy(this.runAndExtendWithFaceDetection(),this.input,e)}withFaceExpressions(){return new Ma(this.runAndExtendWithFaceDetection(),this.input)}withAgeAndGender(){return new Ea(this.runAndExtendWithFaceDetection(),this.input)}};function iw(e,t=new vt){return new xy(e,t)}function iu(e,t=new vt){return new su(e,t)}async function ky(e,t){return iu(e,new vt(t?{minConfidence:t}:{})).withFaceLandmarks().withFaceDescriptors()}async function ow(e,t={}){return iu(e,new Sn(t)).withFaceLandmarks().withFaceDescriptors()}var uw=ky;function Sy(e,t){if(e.length!==t.length)throw new Error("euclideanDistance: arr1.length !== arr2.length");let r=Array.from(e),i=Array.from(t);return Math.sqrt(r.map((s,n)=>s-i[n]).reduce((s,n)=>s+n*n,0))}var cw=class ou{constructor(t,r=.6){this._distanceThreshold=r;let i=Array.isArray(t)?t:[t];if(!i.length)throw new Error("FaceRecognizer.constructor - expected atleast one input");let s=1,n=()=>`person ${s++}`;this._labeledDescriptors=i.map(u=>{if(u instanceof dn)return u;if(u instanceof Float32Array)return new dn(n(),[u]);if(u.descriptor&&u.descriptor instanceof Float32Array)return new dn(n(),[u.descriptor]);throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>")})}get labeledDescriptors(){return this._labeledDescriptors}get distanceThreshold(){return this._distanceThreshold}computeMeanDistance(t,r){return r.map(i=>Sy(i,t)).reduce((i,s)=>i+s,0)/(r.length||1)}matchDescriptor(t){return this.labeledDescriptors.map(({descriptors:r,label:i})=>new ar(i,this.computeMeanDistance(t,r))).reduce((r,i)=>r.distance<i.distance?r:i)}findBestMatch(t){let r=this.matchDescriptor(t);return r.distance<this._distanceThreshold?r:new ar("unknown",r.distance)}toJSON(){return{distanceThreshold:this._distanceThreshold,labeledDescriptors:this._labeledDescriptors.map(t=>t.toJSON())}}static fromJSON(t){let r=t.labeledDescriptors.map(i=>dn.fromJSON(i));return new ou(r,t.distanceThreshold)}};function dw(e){let t=new Zo;return t.extractWeights(e),t}function My(e,t){let{width:r,height:i}=new rt(t.width,t.height);if(r<=0||i<=0)throw new Error(`resizeResults - invalid dimensions: ${JSON.stringify({width:r,height:i})}`);if(Array.isArray(e))return e.map(s=>My(s,{width:r,height:i}));if(ya(e)){let s=e.detection.forSize(r,i),n=e.unshiftedLandmarks.forSize(s.box.width,s.box.height);return wa(gn(e,s),n)}return Rt(e)?gn(e,e.detection.forSize(r,i)):e instanceof _t||e instanceof Ie?e.forSize(r,i):e}var lw=v_;export{C_ as AgeGenderNet,lo as BoundingBox,Te as Box,Lt as ComposableTask,Na as ComputeAllFaceDescriptorsTask,nu as ComputeFaceDescriptorsTaskBase,Ra as ComputeSingleFaceDescriptorTask,vy as DetectAllFaceLandmarksTask,su as DetectAllFacesTask,au as DetectFaceLandmarksTaskBase,ru as DetectFacesTaskBase,Iy as DetectSingleFaceLandmarksTask,xy as DetectSingleFaceTask,rt as Dimensions,ir as FACE_EXPRESSION_LABELS,Ie as FaceDetection,zy as FaceDetectionNet,g_ as FaceExpressionNet,_a as FaceExpressions,zo as FaceLandmark68Net,T_ as FaceLandmark68TinyNet,Wy as FaceLandmarkNet,_t as FaceLandmarks,Cy as FaceLandmarks5,go as FaceLandmarks68,ar as FaceMatch,cw as FaceMatcher,jo as FaceRecognitionNet,E_ as Gender,rr as LabeledBox,dn as LabeledFaceDescriptors,_n as NetInput,qe as NeuralNetwork,po as ObjectDetection,J as Point,Py as PredictedBox,ho as Rect,Ia as SsdMobilenetv1,vt as SsdMobilenetv1Options,Zo as TinyFaceDetector,fy as TinyFaceDetectorOptions,Qo as TinyYolov2,Sn as TinyYolov2Options,uw as allFaces,ky as allFacesSsdMobilenetv1,ow as allFacesTinyYolov2,s_ as awaitMediaLoaded,i_ as bufferToImage,qy as computeFaceDescriptor,bn as createCanvas,Do as createCanvasFromMedia,Hy as createFaceDetectionNet,Oy as createFaceRecognitionNet,ny as createSsdMobilenetv1,dw as createTinyFaceDetector,Vy as createTinyYolov2,iu as detectAllFaces,yy as detectFaceLandmarks,Uy as detectFaceLandmarksTiny,sw as detectLandmarks,iw as detectSingleFace,Ub as draw,ce as env,Sy as euclideanDistance,qo as extendWithAge,Uo as extendWithFaceDescriptor,gn as extendWithFaceDetection,Wo as extendWithFaceExpressions,wa as extendWithFaceLandmarks,Jo as extendWithGender,fa as extractFaceTensors,ma as extractFaces,Ny as fetchImage,c_ as fetchJson,Ry as fetchNetWeights,kn as fetchOrThrow,Ty as fetchVideo,Ge as getContext2dOrThrow,pa as getMediaDimensions,o_ as imageTensorToCanvas,u_ as imageToSquare,Ey as inverseSigmoid,Xb as iou,sr as isMediaElement,Mo as isMediaLoaded,$y as isWithAge,Rt as isWithFaceDetection,b_ as isWithFaceExpressions,ya as isWithFaceLandmarks,Ly as isWithGender,nw as loadAgeGenderModel,aw as loadFaceDetectionModel,tw as loadFaceExpressionModel,Qy as loadFaceLandmarkModel,Zy as loadFaceLandmarkTinyModel,ew as loadFaceRecognitionModel,wy as loadSsdMobilenetv1Model,Yy as loadTinyFaceDetectorModel,Ky as loadTinyYolov2Model,l_ as loadWeightMap,rw as locateFaces,By as matchDimensions,Yb as minBbox,Y as nets,Kb as nonMaxSuppression,$t as normalize,Qb as padToSquare,Xy as predictAgeAndGender,Jy as recognizeFaceExpressions,My as resizeResults,ca as resolveInput,Ay as shuffleArray,Ln as sigmoid,_y as ssdMobilenetv1,f as tf,Gy as tinyFaceDetector,jy as tinyYolov2,le as toNetInput,qb as utils,cy as validateConfig,lw as version};
