"use strict";(()=>{var p="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";function b(){return`tz1${Array.from({length:33},()=>p[Math.random()*p.length|0]).join("")}`}function A(t){if(t.length!==36)return!1;for(let r=0;r<t.length;r++)if(!p.includes(t[r]))return!1;return!0}function T(t){return/^(0x)?[0-9a-fA-F]{40}$/.test(t)}function v(){return`oo${Array.from({length:49},()=>p[Math.random()*p.length|0]).join("")}`}function P(t){return/^(0x)?([A-Fa-f0-9]{64})$/.test(t)}function j(t){return[...t].reduce(function(r,e){return r*p.length+p.indexOf(e)|0},0)}function U(t){let r=t[0]|0,e=t[1]|0,n=t[2]|0,s=t[3]|0;return function(){r|=0,e|=0,n|=0,s|=0;let o=(r+e|0)+s|0;return s=s+1|0,r=e^e>>>9,e=n+(n<<3)|0,n=n<<21|n>>>11,n=n+o|0,(o>>>0)/4294967296}}function M(t,r,e=j){return t.slice(r).match(new RegExp(".{"+(t.length-r>>2)+"}","g")).map(e)}function C(t){return P(t)||T(t)?M(t,2,r=>parseInt(r,16)|0):A(t)?M(t,3):M(t,2)}function l(t){let r=C(t);return U(r)}function H(t){let r=t.replace("#","");return r.length===6&&(r=`${r}ff`),r.length===3&&(r=`${r[0]}${r[0]}${r[1]}${r[1]}${r[2]}${r[2]}ff`),r}var w=function(t){let r="";for(let e=0;e<t.length;e++)r+=t.charCodeAt(e).toString(16).padStart(4,"0");return r},O=function(t){let r=t.match(/.{1,4}/g)||[],e="";for(let n=0;n<r.length;n++){let s=parseInt(r[n],16);if(s===0)break;e+=String.fromCharCode(s)}return e},k=BigInt("-9223372036854775808"),R=BigInt("9223372036854775807"),h={number:{serialize:t=>{let r=new DataView(new ArrayBuffer(8));return r.setFloat64(0,t),r.getBigUint64(0).toString(16).padStart(16,"0")},deserialize:t=>{let r=new DataView(new ArrayBuffer(8));for(let e=0;e<8;e++)r.setUint8(e,parseInt(t.substring(e*2,e*2+2),16));return r.getFloat64(0)},bytesLength:()=>8,constrain:(t,r)=>{let e=Number.MIN_SAFE_INTEGER;typeof r.options?.min<"u"&&(e=Number(r.options.min));let n=Number.MAX_SAFE_INTEGER;typeof r.options?.max<"u"&&(n=Number(r.options.max)),n=Math.min(n,Number.MAX_SAFE_INTEGER),e=Math.max(e,Number.MIN_SAFE_INTEGER);let s=Math.min(Math.max(t,e),n);if(r?.options?.step){let o=1/r?.options?.step;return Math.round(s*o)/o}return s},random:t=>{let r=Number.MIN_SAFE_INTEGER;typeof t.options?.min<"u"&&(r=Number(t.options.min));let e=Number.MAX_SAFE_INTEGER;typeof t.options?.max<"u"&&(e=Number(t.options.max)),e=Math.min(e,Number.MAX_SAFE_INTEGER),r=Math.max(r,Number.MIN_SAFE_INTEGER);let n=Math.random()*(e-r)+r;if(t?.options?.step){let s=1/t?.options?.step;return Math.round(n*s)/s}return n}},bigint:{serialize:t=>{let r=new DataView(new ArrayBuffer(8));return r.setBigInt64(0,BigInt(t)),r.getBigUint64(0).toString(16).padStart(16,"0")},deserialize:t=>{let r=new DataView(new ArrayBuffer(8));for(let e=0;e<8;e++)r.setUint8(e,parseInt(t.substring(e*2,e*2+2),16));return r.getBigInt64(0)},bytesLength:()=>8,random:t=>{let r=k,e=R;typeof t.options?.min<"u"&&(r=BigInt(t.options.min)),typeof t.options?.max<"u"&&(e=BigInt(t.options.max));let n=e-r,s=n.toString(2).length,o;do o=BigInt("0b"+Array.from(crypto.getRandomValues(new Uint8Array(Math.ceil(s/8)))).map(u=>u.toString(2).padStart(8,"0")).join(""));while(o>n);return o+r}},boolean:{serialize:t=>typeof t=="boolean"?t?"01":"00":typeof t=="string"&&t==="true"?"01":"00",deserialize:t=>t!=="00",bytesLength:()=>1,random:()=>Math.random()<.5},color:{serialize:t=>H(t),deserialize:t=>t,bytesLength:()=>4,transform:t=>{let r=H(t),e=parseInt(r.slice(0,2),16),n=parseInt(r.slice(2,4),16),s=parseInt(r.slice(4,6),16),o=parseInt(r.slice(6,8),16);return{hex:{rgb:"#"+t.slice(0,6),rgba:"#"+t},obj:{rgb:{r:e,g:n,b:s},rgba:{r:e,g:n,b:s,a:o}},arr:{rgb:[e,n,s],rgba:[e,n,s,o]}}},constrain:t=>t.replace("#","").slice(0,8).padEnd(8,"f"),random:()=>`${[...Array(8)].map(()=>Math.floor(Math.random()*16).toString(16)).join("")}`},string:{serialize:(t,r)=>{if(!r.version){let s=w(t.substring(0,64));return s=s.padEnd(64*4,"0"),s}let e=64;typeof r.options?.maxLength<"u"&&(e=Number(r.options.maxLength));let n=w(t.substring(0,e));return n=n.padEnd(e*4,"0"),n},deserialize:t=>O(t),bytesLength:t=>t.version&&typeof t.options?.maxLength<"u"?Number(t.options.maxLength)*2:64*2,random:t=>{let r=0;typeof t.options?.minLength<"u"&&(r=t.options.minLength);let e=64;typeof t.options?.maxLength<"u"&&(e=t.options.maxLength);let n=Math.round(Math.random()*(e-r)+r);return[...Array(n)].map(s=>(~~(Math.random()*36)).toString(36)).join("")},constrain:(t,r)=>{let e=0;typeof r.options?.minLength<"u"&&(e=r.options.minLength);let n=64;typeof r.options?.maxLength<"u"&&(n=r.options.maxLength);let s=t.slice(0,n);return s.length<e?s.padEnd(e):s}},bytes:{serialize:(t,r)=>Array.from(t).map(e=>e.toString(16).padStart(2,"0")).join(""),deserialize:(t,r)=>{let e=t.length/2,n=new Uint8Array(e),s;for(let o=0;o<e;o++)s=o*2,n[o]=parseInt(`${t[s]}${t[s+1]}`,16);return n},bytesLength:t=>t.options.length,random:t=>{let r=t.options?.length||0,e=new Uint8Array(r);for(let n=0;n<r;n++)e[n]=Math.random()*255|0;return e}},select:{serialize:(t,r)=>Math.min(255,r.options?.options?.indexOf(t)||0).toString(16).padStart(2,"0"),deserialize:(t,r)=>{let e=parseInt(t,16);return r.options?.options?.[e]||r.options?.options?.[0]||""},bytesLength:()=>1,constrain:(t,r)=>r.options.options.includes(t)?t:r.options.options[0],random:t=>{let r=Math.round(Math.random()*(t.options.options.length-1)+0);return t?.options?.options[r]}}};function I(t,r){let e="";if(!r)return e;for(let n of r){let{id:s,type:o}=n,u=h[o],m=t[s],g=typeof m<"u"?m:typeof n.default<"u"?n.default:u.random(n),d=u.serialize(g,n);e+=d}return e}function F(t,r,e){let n={};for(let s of r){let o=h[s.type],u=e.withTransform&&o[e.transformType||"transform"];if(!t){let x;typeof s.default>"u"?x=o.random(s):x=s.default,n[s.id]=u?u(x,s):x;continue}let m=o.bytesLength(s),g=t.substring(0,m*2);t=t.substring(m*2);let d=o.deserialize(g,s);n[s.id]=u?u(d,s):d}return n}var z=(t,r,e,n)=>{let s=e.find(m=>m.id===t),u=h[s.type][n];return u?.(r,s)||r},E=(t,r,e)=>{let n={};for(let s of r){let o=h[s.type],u=t[s.id],m=o[e];n[s.id]=m?.(u,s)||u}return n};function V(t,r){let{parent:e}=t,n=new URLSearchParams(t.location.search),s=n.get("fxhash")||v(),o=l(s),u=n.get("fxminter")||b(),m=l(u),g=n.get("preview")==="1";function d(){t.dispatchEvent(new Event("fxhash-preview")),setTimeout(()=>d(),500)}let $=t.location.hash?.replace("#0x",""),_={_version:"4.0.0",_processors:h,_params:void 0,_features:void 0,_paramValues:{},_listeners:{},_receiveUpdateParams:async function(a,i){let c=await this.propagateEvent("params:update",a);c.forEach(([f,y])=>{typeof f=="boolean"&&!f||(this._updateParams(a),i?.()),y?.(f,a)}),c.length===0&&(this._updateParams(a),i?.())},_updateParams:function(a){let i=E({...this._rawValues,...a},this._params,"constrain");Object.keys(i).forEach(c=>{this._rawValues[c]=i[c]}),this._paramValues=E(this._rawValues,this._params,"transform"),this._updateInputBytes()},_updateInputBytes:function(){let a=I(this._rawValues,this._params);this.inputBytes=a},_emitParams:function(a){let i=Object.keys(a).reduce((c,f)=>(c[f]=z(f,a[f],this._params,"constrain"),c),{});this._receiveUpdateParams(i,()=>{e.postMessage({id:"fxhash_emit:params:update",data:{params:i}},"*")})},hash:s,rand:o,minter:u,randminter:m,iteration:Number(n.get("fxiteration"))||1,context:n.get("fxcontext")||"standalone",preview:d,isPreview:g,params:function(a){this._params=a.map(i=>({...i,version:this._version})),this._rawValues=F($,this._params,{withTransform:!0,transformType:"constrain"}),this._paramValues=E(this._rawValues,this._params,"transform"),this._updateInputBytes()},features:function(a){this._features=a},getFeature:function(a){return this._features[a]},getFeatures:function(){return this._features},getParam:function(a){return this._paramValues[a]},getParams:function(){return this._paramValues},getRawParam:function(a){return this._rawValues[a]},getRawParams:function(){return this._rawValues},getRandomParam:function(a){let i=this._params.find(f=>f.id===a);return h[i.type].random(i)},getDefinitions:function(){return this._params},stringifyParams:function(a){return JSON.stringify(a||this._rawValues,(i,c)=>typeof c=="bigint"?c.toString():c,2)},on:function(a,i,c){return this._listeners[a]||(this._listeners[a]=[]),this._listeners[a].push([i,c]),()=>{let f=this._listeners[a].findIndex(([y])=>y===i);f>-1&&this._listeners[a].splice(f,1)}},propagateEvent:async function(a,i){let c=[];if(this._listeners?.[a])for(let[f,y]of this._listeners[a]){let S=f(i);c.push([S instanceof Promise?await S:S,y])}return c},emit:function(a,i){switch(a){case"params:update":this._emitParams(i);break;default:console.log("$fx.emit called with unknown id:",a);break}}},N=()=>{o=l(s),_.rand=o,o.reset=N};o.reset=N;let B=()=>{m=l(u),_.randminter=m,m.reset=B};return m.reset=B,t.addEventListener("message",a=>{if(a.data==="fxhash_getInfo"&&e.postMessage({id:"fxhash_getInfo",data:{version:t.$fx._version,hash:t.$fx.hash,iteration:t.$fx.iteration,features:t.$fx.getFeatures(),params:{definitions:t.$fx.getDefinitions(),values:t.$fx.getRawParams()},minter:t.$fx.minter}},"*"),a.data?.id==="fxhash_params:update"){let{params:i}=a.data.data;i&&t.$fx._receiveUpdateParams(i)}}),_}window.$fx=V(window,{});})();
