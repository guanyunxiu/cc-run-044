var ym=Object.defineProperty;var Mm=(n,t,e)=>t in n?ym(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Dt=(n,t,e)=>Mm(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Yc(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const ve={},os=[],jn=()=>{},sf=()=>!1,xa=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ya=n=>n.startsWith("onUpdate:"),We=Object.assign,qc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Sm=Object.prototype.hasOwnProperty,re=(n,t)=>Sm.call(n,t),Ht=Array.isArray,Fi=n=>Jr(n)==="[object Map]",vi=n=>Jr(n)==="[object Set]",qu=n=>Jr(n)==="[object Date]",qt=n=>typeof n=="function",we=n=>typeof n=="string",Rn=n=>typeof n=="symbol",me=n=>n!==null&&typeof n=="object",rf=n=>(me(n)||qt(n))&&qt(n.then)&&qt(n.catch),of=Object.prototype.toString,Jr=n=>of.call(n),bm=n=>Jr(n).slice(8,-1),af=n=>Jr(n)==="[object Object]",Ma=n=>we(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Ir=Yc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Sa=n=>{const t=Object.create(null);return e=>t[e]||(t[e]=n(e))},Em=/-\w/g,Fn=Sa(n=>n.replace(Em,t=>t.slice(1).toUpperCase())),Tm=/\B([A-Z])/g,_s=Sa(n=>n.replace(Tm,"-$1").toLowerCase()),lf=Sa(n=>n.charAt(0).toUpperCase()+n.slice(1)),qa=Sa(n=>n?`on${lf(n)}`:""),Xn=(n,t)=>!Object.is(n,t),Ho=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},cf=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},ba=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Ku;const Ea=()=>Ku||(Ku=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function En(n){if(Ht(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=we(i)?Cm(i):En(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(we(n)||me(n))return n}const wm=/;(?![^(]*\))/g,Am=/:([^]+)/,Rm=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function Cm(n){const t={};return n.replace(Rm,e=>e.startsWith("/*")?"":e).split(wm).forEach(e=>{if(e){const i=e.split(Am);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Oe(n){let t="";if(we(n))t=n;else if(Ht(n))for(let e=0;e<n.length;e++){const i=Oe(n[e]);i&&(t+=i+" ")}else if(me(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const Pm="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Im=Yc(Pm);function uf(n){return!!n||n===""}function Dm(n,t,e){if(n.length!==t.length)return!1;let i=!0;for(let s=0;i&&s<n.length;s++)i=xi(n[s],t[s],e);return i}function Zu(n,t,e){if(n.size!==t.size)return!1;const i=Array.from(t),s=new Uint8Array(i.length);for(const r of n){let o=-1;for(let a=0;a<i.length;a++)if(!s[a]&&xi(r,i[a],e)){o=a;break}if(o<0)return!1;s[o]=1}return!0}function Lm(n,t,e){let i=Fi(n),s=Fi(t);if(i||s||(i=vi(n),s=vi(t),i||s))return i&&s?Zu(n,t,e):!1;const r=Object.keys(n).length,o=Object.keys(t).length;if(r!==o)return!1;for(const a in n){const l=n.hasOwnProperty(a),c=t.hasOwnProperty(a);if(l&&!c||!l&&c||!xi(n[a],t[a],e))return!1}return String(n)===String(t)}function Ju(n,t,e,i){e||(e=[new Map,new Map]);const[s,r]=e;if(s.has(n)||r.has(t))return s.get(n)===t&&r.get(t)===n;s.set(n,t),r.set(t,n);const o=i(n,t,e);return s.delete(n),r.delete(t),o}function xi(n,t,e){if(n===t)return!0;let i=qu(n),s=qu(t);return i||s?i&&s?n.getTime()===t.getTime():!1:(i=Rn(n),s=Rn(t),i||s?n===t:(i=Ht(n),s=Ht(t),i||s?i&&s?Ju(n,t,e,Dm):!1:(i=me(n),s=me(t),i||s?!i||!s?!1:Ju(n,t,e,Lm):String(n)===String(t))))}function Kc(n,t){return n.findIndex(e=>xi(e,t))}const hf=n=>!!(n&&n.__v_isRef===!0),ft=n=>we(n)?n:n==null?"":Ht(n)||me(n)&&(n.toString===of||!qt(n.toString))?hf(n)?ft(n.value):JSON.stringify(n,df,2):String(n),df=(n,t)=>hf(t)?df(n,t.value):Fi(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Ka(i,r)+" =>"]=s,e),{})}:vi(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Ka(e))}:Rn(t)?Ka(t):me(t)&&!Ht(t)&&!af(t)?String(t):t,Ka=(n,t="")=>{var e;return Rn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ue;class ff{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ue&&(Ue.active?(this.parent=Ue,this.index=(Ue.scopes||(Ue.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes){const i=this.scopes.slice();for(t=0,e=i.length;t<e;t++)i[t].pause()}for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes){const s=this.scopes.slice();for(t=0,e=s.length;t<e;t++)s[t].resume()}const i=this.effects.slice();for(t=0,e=i.length;t<e;t++)i[t].resume()}}run(t){if(this._active){const e=Ue;try{return Ue=this,t()}finally{Ue=e}}}on(){++this._on===1&&(this.prevScope=Ue,Ue=this)}off(){if(this._on>0&&--this._on===0){if(Ue===this)Ue=this.prevScope;else{let t=Ue;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(e=0,i=s.length;e<i;e++)s[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function pf(n){return new ff(n)}function mf(){return Ue}function Um(n,t=!1){Ue&&Ue.cleanups.push(n)}let xe;const Za=new WeakSet;class gf{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ue&&(Ue.active?Ue.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Za.has(this)&&(Za.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||vf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Qu(this),xf(this);const t=xe,e=zn;xe=this,zn=!0;try{return this.fn()}finally{yf(this),xe=t,zn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Qc(t);this.deps=this.depsTail=void 0,Qu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Za.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Xl(this)&&this.run()}get dirty(){return Xl(this)}}let _f=0,Dr,Lr;function vf(n,t=!1){if(n.flags|=8,t){n.next=Lr,Lr=n;return}n.next=Dr,Dr=n}function Zc(){_f++}function Jc(){if(--_f>0)return;if(Lr){let t=Lr;for(Lr=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;Dr;){let t=Dr;for(Dr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function xf(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function yf(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),Qc(i),Nm(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Xl(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Mf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function Mf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Hr)||(n.globalVersion=Hr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Xl(n))))return;n.flags|=2;const t=n.dep,e=xe,i=zn;xe=n,zn=!0;try{xf(n);const s=n.fn(n._value);(t.version===0||Xn(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{xe=e,zn=i,yf(n),n.flags&=-3}}function Qc(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)Qc(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Nm(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let zn=!0;const Sf=[];function yi(){Sf.push(zn),zn=!1}function Mi(){const n=Sf.pop();zn=n===void 0?!0:n}function Qu(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=xe;xe=void 0;try{t()}finally{xe=e}}}let Hr=0;class Om{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class tu{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!xe||!zn||xe===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==xe)e=this.activeLink=new Om(xe,this),xe.deps?(e.prevDep=xe.depsTail,xe.depsTail.nextDep=e,xe.depsTail=e):xe.deps=xe.depsTail=e,bf(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=xe.depsTail,e.nextDep=void 0,xe.depsTail.nextDep=e,xe.depsTail=e,xe.deps===e&&(xe.deps=i)}return e}trigger(t){this.version++,Hr++,this.notify(t)}notify(t){Zc();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Jc()}}}function bf(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)bf(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Qo=new WeakMap,us=Symbol(""),$l=Symbol(""),Gr=Symbol("");function Ye(n,t,e){if(zn&&xe){let i=Qo.get(n);i||Qo.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new tu),s.map=i,s.key=e),s.track()}}function fi(n,t,e,i,s,r){const o=Qo.get(n);if(!o){Hr++;return}const a=l=>{l&&l.trigger()};if(Zc(),t==="clear")o.forEach(a);else{const l=Ht(n),c=l&&Ma(e);if(l&&e==="length"){const d=Number(i);o.forEach((u,h)=>{(h==="length"||h===Gr||!Rn(h)&&h>=d)&&a(u)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(Gr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(us)),Fi(n)&&a(o.get($l)));break;case"delete":l||(a(o.get(us)),Fi(n)&&a(o.get($l)));break;case"set":Fi(n)&&a(o.get(us));break}}Jc()}function Fm(n,t){const e=Qo.get(n);return e&&e.get(t)}function Ss(n){const t=te(n);return t===n||(Ye(t,"iterate",Gr),vn(n))?t:Kn(n)?Yn(n)?t.map(e=>Vi(Cn(e))):t.map(Vi):t.map(Cn)}function Ta(n){return Ye(n=te(n),"iterate",Gr),n}function Hn(n,t){return Kn(n)?Vi(Yn(n)?Cn(t):t):Cn(t)}const zm={__proto__:null,[Symbol.iterator](){return Ja(this,Symbol.iterator,n=>Hn(this,n))},concat(...n){return Ss(this).concat(...n.map(t=>Ht(t)?Ss(t):t))},entries(){return Ja(this,"entries",n=>(n[1]=Hn(this,n[1]),n))},every(n,t){return ii(this,"every",n,t,void 0,arguments)},filter(n,t){return ii(this,"filter",n,t,e=>e.map(i=>Hn(this,i)),arguments)},find(n,t){return ii(this,"find",n,t,e=>Hn(this,e),arguments)},findIndex(n,t){return ii(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return ii(this,"findLast",n,t,e=>Hn(this,e),arguments)},findLastIndex(n,t){return ii(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return ii(this,"forEach",n,t,void 0,arguments)},includes(...n){return Qa(this,"includes",n)},indexOf(...n){return Qa(this,"indexOf",n)},join(n){return Ss(this).join(n)},lastIndexOf(...n){return Qa(this,"lastIndexOf",n)},map(n,t){return ii(this,"map",n,t,void 0,arguments)},pop(){return dr(this,"pop")},push(...n){return dr(this,"push",n)},reduce(n,...t){return th(this,"reduce",n,t)},reduceRight(n,...t){return th(this,"reduceRight",n,t)},shift(){return dr(this,"shift")},some(n,t){return ii(this,"some",n,t,void 0,arguments)},splice(...n){return dr(this,"splice",n)},toReversed(){return Ss(this).toReversed()},toSorted(n){return Ss(this).toSorted(n)},toSpliced(...n){return Ss(this).toSpliced(...n)},unshift(...n){return dr(this,"unshift",n)},values(){return Ja(this,"values",n=>Hn(this,n))}};function Ja(n,t,e){const i=Ta(n),s=i[t]();return i!==n&&!vn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const Bm=Array.prototype;function ii(n,t,e,i,s,r){const o=Ta(n),a=o!==n&&!vn(n),l=o[t];if(l!==Bm[t]){const u=l.apply(n,r);return a?Cn(u):u}let c=e;o!==n&&(a?c=function(u,h){return e.call(this,Hn(n,u),h,n)}:e.length>2&&(c=function(u,h){return e.call(this,u,h,n)}));const d=l.call(o,c,i);return a&&s?s(d):d}function th(n,t,e,i){const s=Ta(n),r=s!==n&&!vn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,d,u){return a&&(a=!1,c=Hn(n,c)),e.call(this,c,Hn(n,d),u,n)}):e.length>3&&(o=function(c,d,u){return e.call(this,c,d,u,n)}));const l=s[t](o,...i);return a?Hn(n,l):l}function Qa(n,t,e){const i=te(n);Ye(i,"iterate",Gr);const s=i[t](...e);return(s===-1||s===!1)&&Aa(e[0])?(e[0]=te(e[0]),i[t](...e)):s}function dr(n,t,e=[]){yi(),Zc();const i=te(n)[t].apply(n,e);return Jc(),Mi(),i}const km=Yc("__proto__,__v_isRef,__isVue"),Ef=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Rn));function Vm(n){Rn(n)||(n=String(n));const t=te(this);return Ye(t,"has",n),t.hasOwnProperty(n)}class Tf{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?Zm:Cf:r?Rf:Af).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Ht(t);if(!s){let l;if(o&&(l=zm[e]))return l;if(e==="hasOwnProperty")return Vm}const a=Reflect.get(t,e,Ae(t)?t:i);if((Rn(e)?Ef.has(e):km(e))||(s||Ye(t,"get",e),r))return a;if(Ae(a)){const l=o&&Ma(e)?a:a.value;return s&&me(l)?Yl(l):l}return me(a)?s?Yl(a):wa(a):a}}class wf extends Tf{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Ht(t)&&Ma(e);if(!this._isShallow){const c=Kn(r);if(!vn(i)&&!Kn(i)&&(r=te(r),i=te(i)),!o&&Ae(r)&&!Ae(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:re(t,e),l=Reflect.set(t,e,i,Ae(t)?t:s);return t===te(s)&&l&&(a?Xn(i,r)&&fi(t,"set",e,i):fi(t,"add",e,i)),l}deleteProperty(t,e){const i=re(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&fi(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!Rn(e)||!Ef.has(e))&&Ye(t,"has",e),i}ownKeys(t){return Ye(t,"iterate",Ht(t)?"length":us),Reflect.ownKeys(t)}}class Hm extends Tf{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Gm=new wf,Wm=new Hm,Xm=new wf(!0);const jl=n=>n,oo=n=>Reflect.getPrototypeOf(n);function $m(n,t,e){return function(...i){const s=this.__v_raw,r=te(s),o=Fi(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),d=e?jl:t?Vi:Cn;return!t&&Ye(r,"iterate",l?$l:us),We(Object.create(c),{next(){const{value:u,done:h}=c.next();return h?{value:u,done:h}:{value:a?[d(u[0]),d(u[1])]:d(u),done:h}}})}}function ao(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function jm(n,t){const e={get(s){const r=this.__v_raw,o=te(r),a=te(s);n||(Xn(s,a)&&Ye(o,"get",s),Ye(o,"get",a));const{has:l}=oo(o),c=t?jl:n?Vi:Cn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Ye(te(s),"iterate",us),s.size},has(s){const r=this.__v_raw,o=te(r),a=te(s);return n||(Xn(s,a)&&Ye(o,"has",s),Ye(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=te(a),c=t?jl:n?Vi:Cn;return!n&&Ye(l,"iterate",us),a.forEach((d,u)=>s.call(r,c(d),c(u),o))}};return We(e,n?{add:ao("add"),set:ao("set"),delete:ao("delete"),clear:ao("clear")}:{add(s){const r=te(this),o=oo(r),a=te(s),l=!t&&!vn(s)&&!Kn(s)?a:s;return o.has.call(r,l)||Xn(s,l)&&o.has.call(r,s)||Xn(a,l)&&o.has.call(r,a)||(r.add(l),fi(r,"add",l,l)),this},set(s,r){!t&&!vn(r)&&!Kn(r)&&(r=te(r));const o=te(this),{has:a,get:l}=oo(o);let c=a.call(o,s);c||(s=te(s),c=a.call(o,s));const d=l.call(o,s);return o.set(s,r),c?Xn(r,d)&&fi(o,"set",s,r):fi(o,"add",s,r),this},delete(s){const r=te(this),{has:o,get:a}=oo(r);let l=o.call(r,s);l||(s=te(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&fi(r,"delete",s,void 0),c},clear(){const s=te(this),r=s.size!==0,o=s.clear();return r&&fi(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=$m(s,n,t)}),e}function eu(n,t){const e=jm(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(re(e,s)&&s in i?e:i,s,r)}const Ym={get:eu(!1,!1)},qm={get:eu(!1,!0)},Km={get:eu(!0,!1)};const Af=new WeakMap,Rf=new WeakMap,Cf=new WeakMap,Zm=new WeakMap;function Jm(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function wa(n){return Kn(n)?n:nu(n,!1,Gm,Ym,Af)}function Qm(n){return nu(n,!1,Xm,qm,Rf)}function Yl(n){return nu(n,!0,Wm,Km,Cf)}function nu(n,t,e,i,s){if(!me(n)||n.__v_raw&&!(t&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const o=Jm(bm(n));if(o===0)return n;const a=new Proxy(n,o===2?i:e);return s.set(n,a),a}function Yn(n){return Kn(n)?Yn(n.__v_raw):!!(n&&n.__v_isReactive)}function Kn(n){return!!(n&&n.__v_isReadonly)}function vn(n){return!!(n&&n.__v_isShallow)}function Aa(n){return n?!!n.__v_raw:!1}function te(n){const t=n&&n.__v_raw;return t?te(t):n}function iu(n){return!re(n,"__v_skip")&&Object.isExtensible(n)&&cf(n,"__v_skip",!0),n}const Cn=n=>me(n)?wa(n):n,Vi=n=>me(n)?Yl(n):n;function Ae(n){return n?n.__v_isRef===!0:!1}function zi(n){return tg(n,!1)}function tg(n,t){return Ae(n)?n:new eg(n,t)}class eg{constructor(t,e){this.dep=new tu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:te(t),this._value=e?t:Cn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||vn(t)||Kn(t);t=i?t:te(t),Xn(t,e)&&(this._rawValue=t,this._value=i?t:Cn(t),this.dep.trigger())}}function L(n){return Ae(n)?n.value:n}const ng={get:(n,t,e)=>t==="__v_raw"?n:L(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return Ae(s)&&!Ae(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Pf(n){return Yn(n)?n:new Proxy(n,ng)}function ig(n){const t=Ht(n)?new Array(n.length):{};for(const e in n)t[e]=rg(n,e);return t}class sg{constructor(t,e,i){this._object=t,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0,this._key=Rn(e)?e:String(e),this._raw=te(t);let s=!0,r=t;if(!Ht(t)||Rn(this._key)||!Ma(this._key))do s=!Aa(r)||vn(r);while(s&&(r=r.__v_raw));this._shallow=s}get value(){let t=this._object[this._key];return this._shallow&&(t=L(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&Ae(this._raw[this._key])){const e=this._object[this._key];if(Ae(e)){e.value=t;return}}this._object[this._key]=t}get dep(){return Fm(this._raw,this._key)}}function rg(n,t,e){return new sg(n,t,e)}class og{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new tu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Hr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&xe!==this)return vf(this,!0),!0}get value(){const t=this.dep.track();return Mf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function ag(n,t,e=!1){let i,s;return qt(n)?i=n:(i=n.get,s=n.set),new og(i,s,e)}const lo={},ta=new WeakMap;let ns;function lg(n,t=!1,e=ns){if(e){let i=ta.get(e);i||ta.set(e,i=[]),i.push(n)}}function cg(n,t,e=ve){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=M=>s?M:vn(M)||s===!1||s===0?pi(M,1):pi(M);let d,u,h,g,_=!1,m=!1;if(Ae(n)?(u=()=>n.value,_=vn(n)):Yn(n)?(u=()=>c(n),_=!0):Ht(n)?(m=!0,_=n.some(M=>Yn(M)||vn(M)),u=()=>n.map(M=>{if(Ae(M))return M.value;if(Yn(M))return c(M);if(qt(M))return l?l(M,2):M()})):qt(n)?t?u=l?()=>l(n,2):n:u=()=>{if(h){yi();try{h()}finally{Mi()}}const M=ns;ns=d;try{return l?l(n,3,[g]):n(g)}finally{ns=M}}:u=jn,t&&s){const M=u,R=s===!0?1/0:s;u=()=>pi(M(),R)}const f=mf(),p=()=>{d.stop(),f&&f.active&&qc(f.effects,d)};if(r&&t){const M=t;t=(...R)=>{const C=M(...R);return p(),C}}let S=m?new Array(n.length).fill(lo):lo;const x=M=>{if(!(!(d.flags&1)||!d.dirty&&!M))if(t){const R=d.run();if(M||s||_||(m?R.some((C,w)=>Xn(C,S[w])):Xn(R,S))){h&&h();const C=ns;ns=d;try{const w=[R,S===lo?void 0:m&&S[0]===lo?[]:S,g];S=R,l?l(t,3,w):t(...w)}finally{ns=C}}}else d.run()};return a&&a(x),d=new gf(u),d.scheduler=o?()=>o(x,!1):x,g=M=>lg(M,!1,d),h=d.onStop=()=>{const M=ta.get(d);if(M){if(l)l(M,4);else for(const R of M)R();ta.delete(d)}},t?i?x(!0):S=d.run():o?o(x.bind(null,!0),!0):d.run(),p.pause=d.pause.bind(d),p.resume=d.resume.bind(d),p.stop=p,p}function pi(n,t=1/0,e){if(t<=0||!me(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,Ae(n))pi(n.value,t,e);else if(Ht(n))for(let i=0;i<n.length;i++)pi(n[i],t,e);else if(vi(n)||Fi(n))n.forEach(i=>{pi(i,t,e)});else if(af(n)){for(const i in n)pi(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&pi(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Qr(n,t,e,i){try{return i?n(...i):n()}catch(s){Ra(s,t,e)}}function Bn(n,t,e,i){if(qt(n)){const s=Qr(n,t,e,i);return s&&rf(s)&&s.catch(r=>{Ra(r,t,e)}),s}if(Ht(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Bn(n[r],t,e,i));return s}}function Ra(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||ve;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const d=a.ec;if(d){for(let u=0;u<d.length;u++)if(d[u](n,l,c)===!1)return}a=a.parent}if(r){yi(),Qr(r,null,10,[n,l,c]),Mi();return}}ug(n,e,s,i,o)}function ug(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const nn=[];let Vn=-1;const js=[];let Ui=null,Ws=0;const If=Promise.resolve();let ea=null;function su(n){const t=ea||If;return n?t.then(this?n.bind(this):n):t}function hg(n){let t=Vn+1,e=nn.length;for(;t<e;){const i=t+e>>>1,s=nn[i],r=Wr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function ru(n){if(!(n.flags&1)){const t=Wr(n),e=nn[nn.length-1];!e||!(n.flags&2)&&t>=Wr(e)?nn.push(n):nn.splice(hg(t),0,n),n.flags|=1,Df()}}function Df(){ea||(ea=If.then(Uf))}function dg(n){if(!Ht(n))Ui&&n.id===-1?Ui.splice(Ws+1,0,n):n.flags&1||(js.push(n),n.flags|=1);else for(let t=0;t<n.length;t++)js.push(n[t]);Df()}function eh(n,t,e=Vn+1){for(;e<nn.length;e++){const i=nn[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;nn.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Lf(n){if(js.length){const t=[...new Set(js)].sort((e,i)=>Wr(e)-Wr(i));if(js.length=0,Ui){for(let e=0;e<t.length;e++)Ui.push(t[e]);return}for(Ui=t,Ws=0;Ws<Ui.length;Ws++){const e=Ui[Ws];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Ui=null,Ws=0}}const Wr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Uf(n){try{for(Vn=0;Vn<nn.length;Vn++){const t=nn[Vn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Qr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Vn<nn.length;Vn++){const t=nn[Vn];t&&(t.flags&=-2)}Vn=-1,nn.length=0,Lf(),ea=null,(nn.length||js.length)&&Uf()}}let Tn=null,Nf=null;function na(n){const t=Tn;return Tn=n,Nf=n&&n.type.__scopeId||null,t}function fg(n,t=Tn,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&dh(-1);const r=na(t),o=ds.length;let a;try{a=n(...s)}finally{for(let l=ds.length;l>o;l--)sp();na(r),i._d&&dh(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function _e(n,t){if(Tn===null)return n;const e=Ua(Tn),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=ve]=t[s];r&&(qt(r)&&(r={mounted:r,updated:r}),r.deep&&pi(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function ji(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(yi(),Bn(l,e,8,[n.el,a,n,t]),Mi())}}function pg(n,t){if(sn){let e=sn.provides;const i=sn.parent&&sn.parent.provides;i===e&&(e=sn.provides=Object.create(i)),e[n]=t}}function Ur(n,t,e=!1){const i=cp();if(i||hs){let s=hs?hs._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&qt(t)?t.call(i&&i.proxy):t}}function mg(){return!!(cp()||hs)}const gg=Symbol.for("v-scx"),_g=()=>Ur(gg);function Ve(n,t,e){return Of(n,t,e)}function Of(n,t,e=ve){const{immediate:i,deep:s,flush:r,once:o}=e,a=We({},e),l=t&&i||!t&&r!=="post";let c;if(jr){if(r==="sync"){const g=_g();c=g.__watcherHandles||(g.__watcherHandles=[])}else if(!l){const g=()=>{};return g.stop=jn,g.resume=jn,g.pause=jn,g}}const d=sn;a.call=(g,_,m)=>Bn(g,d,_,m);let u=!1;r==="post"?a.scheduler=g=>{cn(g,d&&d.suspense)}:r!=="sync"&&(u=!0,a.scheduler=(g,_)=>{_?g():ru(g)}),a.augmentJob=g=>{t&&(g.flags|=4),u&&(g.flags|=2,d&&(g.id=d.uid,g.i=d))};const h=cg(n,t,a);return jr&&(c?c.push(h):l&&h()),h}function vg(n,t,e){const i=this.proxy,s=we(n)?n.includes(".")?Ff(i,n):()=>i[n]:n.bind(i,i);let r;qt(t)?r=t:(r=t.handler,e=t);const o=to(this),a=Of(s,r.bind(i),e);return o(),a}function Ff(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const xg=Symbol("_vte"),Ca=n=>n.__isTeleport,tl=Symbol("_leaveCb");function yg(n){let t=n[0];if(n.length>1){for(const e of n)if(e.type!==Si){t=e;break}}return t}function zf(n){if(!au(n))return Ca(n.type)&&n.children?yg(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:t,children:e}=n;if(e){if(t&16)return e[0];if(t&32&&qt(e.default))return e.default()}}function ou(n,t){if(n.shapeFlag&6&&n.component){n.transition=t;const e=n.component.subTree;ou(Ca(e.type)&&zf(e)||e,t)}else n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function ei(n,t){return qt(n)?We({name:n.name},t,{setup:n}):n}function Bf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function nh(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const ia=new WeakMap;function Nr(n,t,e,i,s=!1){if(Ht(n)){n.forEach((m,f)=>Nr(m,t&&(Ht(t)?t[f]:t),e,i,s));return}if(Or(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Nr(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Ua(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,d=a.refs===ve?a.refs={}:a.refs,u=a.setupState,h=te(u),g=u===ve?sf:m=>nh(d,m)?!1:re(h,m),_=(m,f)=>!(f&&nh(d,f));if(c!=null&&c!==l){if(ih(t),we(c))d[c]=null,g(c)&&(u[c]=null);else if(Ae(c)){const m=t;_(c,m.k)&&(c.value=null),m.k&&(d[m.k]=null)}}if(qt(l))Qr(l,a,12,[o,d]);else{const m=we(l),f=Ae(l);if(m||f){const p=()=>{if(n.f){const S=m?g(l)?u[l]:d[l]:_()||!n.k?l.value:d[n.k];if(s)Ht(S)&&qc(S,r);else if(Ht(S))S.includes(r)||S.push(r);else if(m)d[l]=[r],g(l)&&(u[l]=d[l]);else{const x=[r];_(l,n.k)&&(l.value=x),n.k&&(d[n.k]=x)}}else m?(d[l]=o,g(l)&&(u[l]=o)):f&&(_(l,n.k)&&(l.value=o),n.k&&(d[n.k]=o))};if(o){const S=()=>{p(),ia.delete(n)};S.id=-1,ia.set(n,S),cn(S,e)}else ih(n),p()}}}function ih(n){const t=ia.get(n);t&&(t.flags|=8,ia.delete(n))}Ea().requestIdleCallback;Ea().cancelIdleCallback;const Or=n=>!!n.type.__asyncLoader,au=n=>n.type.__isKeepAlive;function Mg(n,t){kf(n,"a",t)}function Sg(n,t){kf(n,"da",t)}function kf(n,t,e=sn){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Pa(t,i,e),e){let s=e.parent;for(;s&&s.parent;)au(s.parent.vnode)&&bg(i,t,e,s),s=s.parent}}function bg(n,t,e,i){const s=Pa(t,n,i,!0);lu(()=>{qc(i[t],s)},e)}function Pa(n,t,e=sn,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{yi();const a=to(e),l=Bn(t,e,n,o);return a(),Mi(),l});return i?s.unshift(r):s.push(r),r}}const Ei=n=>(t,e=sn)=>{(!jr||n==="sp")&&Pa(n,(...i)=>t(...i),e)},Eg=Ei("bm"),Ia=Ei("m"),Tg=Ei("bu"),wg=Ei("u"),ql=Ei("bum"),lu=Ei("um"),Ag=Ei("sp"),Rg=Ei("rtg"),Cg=Ei("rtc");function Pg(n,t=sn){Pa("ec",n,t)}const Ig=Symbol.for("v-ndc");function Ne(n,t,e,i){let s;const r=e,o=Ht(n);if(o||we(n)){const a=o&&Yn(n);let l=!1,c=!1;a&&(l=!vn(n),c=Kn(n),n=Ta(n)),s=new Array(n.length);for(let d=0,u=n.length;d<u;d++)s[d]=t(l?c?Vi(Cn(n[d])):Cn(n[d]):n[d],d,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(me(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const d=a[l];s[l]=t(n[d],d,l,r)}}else s=[];return s}const Kl=n=>n?up(n)?Ua(n):Kl(n.parent):null,Fr=We(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Kl(n.parent),$root:n=>Kl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Hf(n),$forceUpdate:n=>n.f||(n.f=()=>{ru(n.update)}),$nextTick:n=>n.n||(n.n=su.bind(n.proxy)),$watch:n=>vg.bind(n)}),el=(n,t)=>n!==ve&&!n.__isScriptSetup&&re(n,t),Dg={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(el(i,t))return o[t]=1,i[t];if(s!==ve&&re(s,t))return o[t]=2,s[t];if(re(r,t))return o[t]=3,r[t];if(e!==ve&&re(e,t))return o[t]=4,e[t];Zl&&(o[t]=0)}}const c=Fr[t];let d,u;if(c)return t==="$attrs"&&Ye(n.attrs,"get",""),c(n);if((d=a.__cssModules)&&(d=d[t]))return d;if(e!==ve&&re(e,t))return o[t]=4,e[t];if(u=l.config.globalProperties,re(u,t))return u[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return el(s,t)?(s[t]=e,!0):i!==ve&&re(i,t)?(i[t]=e,!0):re(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==ve&&a[0]!=="$"&&re(n,a)||el(t,a)||re(r,a)||re(i,a)||re(Fr,a)||re(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:re(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function sh(n){return Ht(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Zl=!0;function Lg(n){const t=Hf(n),e=n.proxy,i=n.ctx;Zl=!1,t.beforeCreate&&rh(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:d,beforeMount:u,mounted:h,beforeUpdate:g,updated:_,activated:m,deactivated:f,beforeDestroy:p,beforeUnmount:S,destroyed:x,unmounted:M,render:R,renderTracked:C,renderTriggered:w,errorCaptured:D,serverPrefetch:U,expose:y,inheritAttrs:E,components:X,directives:O,filters:W}=t;if(c&&Ug(c,i,null),o)for(const G in o){const $=o[G];qt($)&&(i[G]=$.bind(e))}if(s){const G=s.call(e,e);me(G)&&(n.data=wa(G))}if(Zl=!0,r)for(const G in r){const $=r[G],ot=qt($)?$.bind(e,e):qt($.get)?$.get.bind(e,e):jn,gt=!qt($)&&qt($.set)?$.set.bind(e):jn,rt=qe({get:ot,set:gt});Object.defineProperty(i,G,{enumerable:!0,configurable:!0,get:()=>rt.value,set:vt=>rt.value=vt})}if(a)for(const G in a)Vf(a[G],i,e,G);if(l){const G=qt(l)?l.call(e):l;Reflect.ownKeys(G).forEach($=>{pg($,G[$])})}d&&rh(d,n,"c");function B(G,$){Ht($)?$.forEach(ot=>G(ot.bind(e))):$&&G($.bind(e))}if(B(Eg,u),B(Ia,h),B(Tg,g),B(wg,_),B(Mg,m),B(Sg,f),B(Pg,D),B(Cg,C),B(Rg,w),B(ql,S),B(lu,M),B(Ag,U),Ht(y))if(y.length){const G=n.exposed||(n.exposed={});y.forEach($=>{Object.defineProperty(G,$,{get:()=>e[$],set:ot=>e[$]=ot,enumerable:!0})})}else n.exposed||(n.exposed={});R&&n.render===jn&&(n.render=R),E!=null&&(n.inheritAttrs=E),X&&(n.components=X),O&&(n.directives=O),U&&Bf(n)}function Ug(n,t,e=jn){Ht(n)&&(n=Jl(n));for(const i in n){const s=n[i];let r;me(s)?"default"in s?r=Ur(s.from||i,s.default,!0):r=Ur(s.from||i):r=Ur(s),Ae(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function rh(n,t,e){Bn(Ht(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Vf(n,t,e,i){let s=i.includes(".")?Ff(e,i):()=>e[i];if(we(n)){const r=t[n];qt(r)&&Ve(s,r)}else if(qt(n))Ve(s,n.bind(e));else if(me(n))if(Ht(n))n.forEach(r=>Vf(r,t,e,i));else{const r=qt(n.handler)?n.handler.bind(e):t[n.handler];qt(r)&&Ve(s,r,n)}}function Hf(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>sa(l,c,o,!0)),sa(l,t,o)),me(t)&&r.set(t,l),l}function sa(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&sa(n,r,e,!0),s&&s.forEach(o=>sa(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=Ng[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const Ng={data:oh,props:ah,emits:ah,methods:Ar,computed:Ar,beforeCreate:Qe,created:Qe,beforeMount:Qe,mounted:Qe,beforeUpdate:Qe,updated:Qe,beforeDestroy:Qe,beforeUnmount:Qe,destroyed:Qe,unmounted:Qe,activated:Qe,deactivated:Qe,errorCaptured:Qe,serverPrefetch:Qe,components:Ar,directives:Ar,watch:Fg,provide:oh,inject:Og};function oh(n,t){return t?n?function(){return We(qt(n)?n.call(this,this):n,qt(t)?t.call(this,this):t)}:t:n}function Og(n,t){return Ar(Jl(n),Jl(t))}function Jl(n){if(Ht(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function Qe(n,t){return n?[...new Set([].concat(n,t))]:t}function Ar(n,t){return n?We(Object.create(null),n,t):t}function ah(n,t){return n?Ht(n)&&Ht(t)?[...new Set([...n,...t])]:We(Object.create(null),sh(n),sh(t??{})):t}function Fg(n,t){if(!n)return t;if(!t)return n;const e=We(Object.create(null),n);for(const i in t)e[i]=Qe(n[i],t[i]);return e}function Gf(){return{app:null,config:{isNativeTag:sf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zg=0;function Bg(n,t){return function(i,s=null){qt(i)||(i=We({},i)),s!=null&&!me(s)&&(s=null);const r=Gf(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:zg++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:m_,get config(){return r.config},set config(d){},use(d,...u){return o.has(d)||(d&&qt(d.install)?(o.add(d),d.install(c,...u)):qt(d)&&(o.add(d),d(c,...u))),c},mixin(d){return r.mixins.includes(d)||r.mixins.push(d),c},component(d,u){return u?(r.components[d]=u,c):r.components[d]},directive(d,u){return u?(r.directives[d]=u,c):r.directives[d]},mount(d,u,h){if(!l){const g=c._ceVNode||ut(i,s);return g.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(g,d,h),l=!0,c._container=d,d.__vue_app__=c,Ua(g.component)}},onUnmount(d){a.push(d)},unmount(){l&&(Bn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(d,u){return r.provides[d]=u,c},runWithContext(d){const u=hs;hs=c;try{return d()}finally{hs=u}}};return c}}let hs=null;const kg=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Fn(t)}Modifiers`]||n[`${_s(t)}Modifiers`];function Vg(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||ve;let s=e;const r=t.startsWith("update:"),o=r&&kg(i,t.slice(7));o&&(o.trim&&(s=e.map(d=>we(d)?d.trim():d)),o.number&&(s=s.map(ba)));let a,l=i[a=qa(t)]||i[a=qa(Fn(t))];!l&&r&&(l=i[a=qa(_s(t))]),l&&Bn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Bn(c,n,6,s)}}const Hg=new WeakMap;function Wf(n,t,e=!1){const i=e?Hg:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!qt(n)){const l=c=>{const d=Wf(c,t,!0);d&&(a=!0,We(o,d))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(me(n)&&i.set(n,null),null):(Ht(r)?r.forEach(l=>o[l]=null):We(o,r),me(n)&&i.set(n,o),o)}function Da(n,t){return!n||!xa(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),re(n,t[0].toLowerCase()+t.slice(1))||re(n,_s(t))||re(n,t))}function lh(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:d,props:u,data:h,setupState:g,ctx:_,inheritAttrs:m}=n,f=na(n);let p,S;try{if(e.shapeFlag&4){const M=s||i,R=M;p=Gn(c.call(R,M,d,u,g,h,_)),S=a}else{const M=t;p=Gn(M.length>1?M(u,{attrs:a,slots:o,emit:l}):M(u,null)),S=t.props?a:Gg(a)}}catch(M){ds.length=0,Ra(M,n,1),p=ut(Si)}let x=p;if(S&&m!==!1){const M=Object.keys(S),{shapeFlag:R}=x;M.length&&R&7&&(r&&M.some(ya)&&(S=Wg(S,r)),x=tr(x,S,!1,!0))}if(e.dirs&&(x=tr(x,null,!1,!0),x.dirs=x.dirs?x.dirs.concat(e.dirs):e.dirs),e.transition){const M=Ca(x.type)&&zf(x)||x;ou(M,e.transition)}return p=x,na(f),p}const Gg=n=>{let t;for(const e in n)(e==="class"||e==="style"||xa(e))&&((t||(t={}))[e]=n[e]);return t},Wg=(n,t)=>{const e={};for(const i in n)(!ya(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function Xg(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?ch(i,o,c):!!o;if(l&8){const d=t.dynamicProps;for(let u=0;u<d.length;u++){const h=d[u];if(Xf(o,i,h)&&!Da(c,h))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?ch(i,o,c):!0:!!o;return!1}function ch(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Xf(t,n,r)&&!Da(e,r))return!0}return!1}function Xf(n,t,e){const i=n[e],s=t[e];return e==="style"&&me(i)&&me(s)?!xi(i,s):i!==s}function $g({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const $f={},jf=()=>Object.create($f),Yf=n=>Object.getPrototypeOf(n)===$f;function jg(n,t,e,i=!1){const s={},r=jf();n.propsDefaults=Object.create(null),qf(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:Qm(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Yg(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=te(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const d=n.vnode.dynamicProps;for(let u=0;u<d.length;u++){let h=d[u];if(Da(n.emitsOptions,h))continue;const g=t[h];if(l)if(re(r,h))g!==r[h]&&(r[h]=g,c=!0);else{const _=Fn(h);s[_]=Ql(l,a,_,g,n,!1)}else g!==r[h]&&(r[h]=g,c=!0)}}}else{qf(n,t,s,r)&&(c=!0);let d;for(const u in a)(!t||!re(t,u)&&((d=_s(u))===u||!re(t,d)))&&(l?e&&(e[u]!==void 0||e[d]!==void 0)&&(s[u]=Ql(l,a,u,void 0,n,!0)):delete s[u]);if(r!==a)for(const u in r)(!t||!re(t,u))&&(delete r[u],c=!0)}c&&fi(n.attrs,"set","")}function qf(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(Ir(l))continue;const c=t[l];let d;s&&re(s,d=Fn(l))?!r||!r.includes(d)?e[d]=c:(a||(a={}))[d]=c:Da(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=te(e),c=a||ve;for(let d=0;d<r.length;d++){const u=r[d];e[u]=Ql(s,l,u,c[u],n,!re(c,u))}}return o}function Ql(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=re(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&qt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const d=to(s);i=c[e]=l.call(null,t),d()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===_s(e))&&(i=!0))}return i}const qg=new WeakMap;function Kf(n,t,e=!1){const i=e?qg:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!qt(n)){const d=u=>{l=!0;const[h,g]=Kf(u,t,!0);We(o,h),g&&a.push(...g)};!e&&t.mixins.length&&t.mixins.forEach(d),n.extends&&d(n.extends),n.mixins&&n.mixins.forEach(d)}if(!r&&!l)return me(n)&&i.set(n,os),os;if(Ht(r))for(let d=0;d<r.length;d++){const u=Fn(r[d]);uh(u)&&(o[u]=ve)}else if(r)for(const d in r){const u=Fn(d);if(uh(u)){const h=r[d],g=o[u]=Ht(h)||qt(h)?{type:h}:We({},h),_=g.type;let m=!1,f=!0;if(Ht(_))for(let p=0;p<_.length;++p){const S=_[p],x=qt(S)&&S.name;if(x==="Boolean"){m=!0;break}else x==="String"&&(f=!1)}else m=qt(_)&&_.name==="Boolean";g[0]=m,g[1]=f,(m||re(g,"default"))&&a.push(u)}}const c=[o,a];return me(n)&&i.set(n,c),c}function uh(n){return n[0]!=="$"&&!Ir(n)}const cu=n=>n==="_"||n==="_ctx"||n==="$stable",uu=n=>Ht(n)?n.map(Gn):[Gn(n)],Kg=(n,t,e)=>{if(t._n)return t;const i=fg((...s)=>uu(t(...s)),e);return i._c=!1,i},Zf=(n,t,e)=>{const i=n._ctx;for(const s in n){if(cu(s))continue;const r=n[s];if(qt(r))t[s]=Kg(s,r,i);else if(r!=null){const o=uu(r);t[s]=()=>o}}},Jf=(n,t)=>{const e=uu(t);n.slots.default=()=>e},Qf=(n,t,e)=>{for(const i in t)(e||!cu(i))&&(n[i]=t[i])},Zg=(n,t,e)=>{const i=n.slots=jf();if(n.vnode.shapeFlag&32){const s=t._;s?(Qf(i,t,e),e&&cf(i,"_",s,!0)):Zf(t,i)}else t&&Jf(n,t)},Jg=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=ve;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:Qf(s,t,e):(r=!t.$stable,Zf(t,s)),o=t}else t&&(Jf(n,t),o={default:1});if(r)for(const a in s)!cu(a)&&o[a]==null&&delete s[a]},cn=i_;function Qg(n){return t_(n)}function t_(n,t){const e=Ea();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:d,parentNode:u,nextSibling:h,setScopeId:g=jn,insertStaticContent:_}=n,m=(I,b,tt,nt=null,et=null,q=null,lt=void 0,st=null,T=!!b.dynamicChildren)=>{if(I===b)return;I&&!fr(I,b)&&(nt=Et(I),vt(I,et,q,!0),I=null),b.patchFlag===-2&&(T=!1,b.dynamicChildren=null),b.dynamicChildren&&I&&I.dynamicChildren&&I.dynamicChildren.hasOnce&&(b.dynamicChildren===os&&(b.dynamicChildren=[]),b.dynamicChildren.hasOnce=!0);const{type:v,ref:N,shapeFlag:k}=b;switch(v){case La:f(I,b,tt,nt);break;case Si:p(I,b,tt,nt);break;case Go:I==null&&S(b,tt,nt,lt);break;case ne:X(I,b,tt,nt,et,q,lt,st,T);break;default:k&1?R(I,b,tt,nt,et,q,lt,st,T):k&6?O(I,b,tt,nt,et,q,lt,st,T):(k&64||k&128)&&v.process(I,b,tt,nt,et,q,lt,st,T,Jt)}N!=null&&et?Nr(N,I&&I.ref,q,b||I,!b):N==null&&I&&I.ref!=null&&Nr(I.ref,null,q,I,!0)},f=(I,b,tt,nt)=>{if(I==null)i(b.el=a(b.children),tt,nt);else{const et=b.el=I.el;b.children!==I.children&&c(et,b.children)}},p=(I,b,tt,nt)=>{I==null?i(b.el=l(b.children||""),tt,nt):b.el=I.el},S=(I,b,tt,nt)=>{[I.el,I.anchor]=_(I.children,b,tt,nt,I.el,I.anchor)},x=({el:I,anchor:b},tt,nt)=>{let et;for(;I&&I!==b;)et=h(I),i(I,tt,nt),I=et;i(b,tt,nt)},M=({el:I,anchor:b})=>{let tt;for(;I&&I!==b;)tt=h(I),s(I),I=tt;s(b)},R=(I,b,tt,nt,et,q,lt,st,T)=>{if(b.type==="svg"?lt="svg":b.type==="math"&&(lt="mathml"),I==null)C(b,tt,nt,et,q,lt,st,T);else{const v=I.el&&I.el._isVueCE?I.el:null;try{v&&v._beginPatch(),U(I,b,et,q,lt,st,T)}finally{v&&v._endPatch()}}},C=(I,b,tt,nt,et,q,lt,st)=>{let T,v;const{props:N,shapeFlag:k,transition:K,dirs:j}=I;if(T=I.el=o(I.type,q,N&&N.is,N),k&8?d(T,I.children):k&16&&D(I.children,T,null,nt,et,nl(I,q),lt,st),j&&ji(I,null,nt,"created"),w(T,I,I.scopeId,lt,nt),N){for(const dt in N)dt!=="value"&&!Ir(dt)&&r(T,dt,null,N[dt],q,nt);"value"in N&&r(T,"value",null,N.value,q),(v=N.onVnodeBeforeMount)&&kn(v,nt,I)}j&&ji(I,null,nt,"beforeMount");const mt=e_(et,K);mt&&K.beforeEnter(T),i(T,b,tt),((v=N&&N.onVnodeMounted)||mt||j)&&cn(()=>{try{v&&kn(v,nt,I),mt&&K.enter(T),j&&ji(I,null,nt,"mounted")}finally{}},et)},w=(I,b,tt,nt,et)=>{if(tt&&g(I,tt),nt)for(let q=0;q<nt.length;q++)g(I,nt[q]);if(et){let q=et.subTree;if(b===q||ip(q.type)&&(q.ssContent===b||q.ssFallback===b)){const lt=et.vnode;w(I,lt,lt.scopeId,lt.slotScopeIds,et.parent)}}},D=(I,b,tt,nt,et,q,lt,st,T=0)=>{for(let v=T;v<I.length;v++){const N=I[v]=st?hi(I[v]):Gn(I[v]);m(null,N,b,tt,nt,et,q,lt,st)}},U=(I,b,tt,nt,et,q,lt)=>{const st=b.el=I.el;let{patchFlag:T,dynamicChildren:v,dirs:N}=b;T|=I.patchFlag&16;const k=I.props||ve,K=b.props||ve;let j;if(tt&&Yi(tt,!1),(j=K.onVnodeBeforeUpdate)&&kn(j,tt,b,I),N&&ji(b,I,tt,"beforeUpdate"),tt&&Yi(tt,!0),v&&(!I.dynamicChildren||I.dynamicChildren.length!==v.length)&&(T=0,lt=!1,v=null),(k.innerHTML&&K.innerHTML==null||k.textContent&&K.textContent==null)&&d(st,""),v?y(I.dynamicChildren,v,st,tt,nt,nl(b,et),q):lt||$(I,b,st,null,tt,nt,nl(b,et),q,!1),T>0){if(T&16)E(st,k,K,tt,et);else if(T&2&&k.class!==K.class&&r(st,"class",null,K.class,et),T&4&&r(st,"style",k.style,K.style,et),T&8){const mt=b.dynamicProps;for(let dt=0;dt<mt.length;dt++){const pt=mt[dt],zt=k[pt],ct=K[pt];(ct!==zt||pt==="value")&&r(st,pt,zt,ct,et,tt)}}T&1&&I.children!==b.children&&d(st,b.children)}else!lt&&v==null&&E(st,k,K,tt,et);((j=K.onVnodeUpdated)||N)&&cn(()=>{j&&kn(j,tt,b,I),N&&ji(b,I,tt,"updated")},nt)},y=(I,b,tt,nt,et,q,lt)=>{for(let st=0;st<b.length;st++){const T=I[st],v=b[st],N=T.el&&(T.type===ne||!fr(T,v)||T.shapeFlag&198)?u(T.el):tt;m(T,v,N,null,nt,et,q,lt,!0)}},E=(I,b,tt,nt,et)=>{if(b!==tt){if(b!==ve)for(const q in b)!Ir(q)&&!(q in tt)&&r(I,q,b[q],null,et,nt);for(const q in tt){if(Ir(q))continue;const lt=tt[q],st=b[q];lt!==st&&q!=="value"&&r(I,q,st,lt,et,nt)}"value"in tt&&r(I,"value",b.value,tt.value,et)}},X=(I,b,tt,nt,et,q,lt,st,T)=>{const v=b.el=I?I.el:a(""),N=b.anchor=I?I.anchor:a("");let{patchFlag:k,dynamicChildren:K,slotScopeIds:j}=b;j&&(st=st?st.concat(j):j),I==null?(i(v,tt,nt),i(N,tt,nt),D(b.children||[],tt,N,et,q,lt,st,T)):k>0&&k&64&&K&&I.dynamicChildren&&I.dynamicChildren.length===K.length?(y(I.dynamicChildren,K,tt,et,q,lt,st),(b.key!=null||et&&b===et.subTree)&&tp(I,b,!0)):$(I,b,tt,N,et,q,lt,st,T)},O=(I,b,tt,nt,et,q,lt,st,T)=>{b.slotScopeIds=st,I==null?b.shapeFlag&512?et.ctx.activate(b,tt,nt,lt,T):W(b,tt,nt,et,q,lt,T):Y(I,b,T)},W=(I,b,tt,nt,et,q,lt)=>{const st=I.component=c_(I,nt,et);if(au(I)&&(st.ctx.renderer=Jt),u_(st,!1,lt),st.asyncDep){if(et&&et.registerDep(st,B,lt),!I.el){const T=st.subTree=ut(Si);p(null,T,b,tt),I.placeholder=T.el}}else B(st,I,b,tt,et,q,lt)},Y=(I,b,tt)=>{const nt=b.component=I.component;if(Xg(I,b,tt))if(nt.asyncDep&&!nt.asyncResolved){b.el=I.el,G(nt,b,tt);return}else nt.next=b,nt.update();else b.el=I.el,nt.vnode=b},B=(I,b,tt,nt,et,q,lt)=>{const st=()=>{if(I.isMounted){let{next:k,bu:K,u:j,parent:mt,vnode:dt}=I;{const Nt=ep(I);if(Nt){k&&(k.el=dt.el,G(I,k,lt)),Nt.asyncDep.then(()=>{cn(()=>{I.isUnmounted||v()},et)});return}}let pt=k,zt;Yi(I,!1),k?(k.el=dt.el,G(I,k,lt)):k=dt,K&&Ho(K),(zt=k.props&&k.props.onVnodeBeforeUpdate)&&kn(zt,mt,k,dt),Yi(I,!0);const ct=lh(I),Mt=I.subTree;I.subTree=ct,m(Mt,ct,u(Mt.el),Et(Mt),I,et,q),k.el=ct.el,pt===null&&$g(I,ct.el),j&&cn(j,et),(zt=k.props&&k.props.onVnodeUpdated)&&cn(()=>kn(zt,mt,k,dt),et)}else{let k;const{el:K,props:j}=b,{bm:mt,m:dt,parent:pt,root:zt,type:ct}=I,Mt=Or(b);Yi(I,!1),mt&&Ho(mt),!Mt&&(k=j&&j.onVnodeBeforeMount)&&kn(k,pt,b),Yi(I,!0);{zt.ce&&zt.ce._hasShadowRoot()&&zt.ce._injectChildStyle(ct,I.parent?I.parent.type:void 0);const Nt=I.subTree=lh(I);m(null,Nt,tt,nt,I,et,q),b.el=Nt.el}if(dt&&cn(dt,et),!Mt&&(k=j&&j.onVnodeMounted)){const Nt=b;cn(()=>kn(k,pt,Nt),et)}(b.shapeFlag&256||pt&&Or(pt.vnode)&&pt.vnode.shapeFlag&256)&&I.a&&cn(I.a,et),I.isMounted=!0,b=tt=nt=null}};I.scope.on();const T=I.effect=new gf(st);I.scope.off();const v=I.update=T.run.bind(T),N=I.job=T.runIfDirty.bind(T);N.i=I,N.id=I.uid,T.scheduler=()=>ru(N),Yi(I,!0),v()},G=(I,b,tt)=>{b.component=I;const nt=I.vnode.props;I.vnode=b,I.next=null,Yg(I,b.props,nt,tt),Jg(I,b.children,tt),yi(),eh(I),Mi()},$=(I,b,tt,nt,et,q,lt,st,T=!1)=>{const v=I&&I.children,N=I?I.shapeFlag:0,k=b.children,{patchFlag:K,shapeFlag:j}=b;if(K>0){if(K&128){gt(v,k,tt,nt,et,q,lt,st,T);return}else if(K&256){ot(v,k,tt,nt,et,q,lt,st,T);return}}j&8?(N&16&&bt(v,et,q),k!==v&&d(tt,k)):N&16?j&16?gt(v,k,tt,nt,et,q,lt,st,T):bt(v,et,q,!0):(N&8&&d(tt,""),j&16&&D(k,tt,nt,et,q,lt,st,T))},ot=(I,b,tt,nt,et,q,lt,st,T)=>{I=I||os,b=b||os;const v=I.length,N=b.length,k=Math.min(v,N);let K;for(K=0;K<k;K++){const j=b[K]=T?hi(b[K]):Gn(b[K]);m(I[K],j,tt,null,et,q,lt,st,T)}v>N?bt(I,et,q,!0,!1,k):D(b,tt,nt,et,q,lt,st,T,k)},gt=(I,b,tt,nt,et,q,lt,st,T)=>{let v=0;const N=b.length;let k=I.length-1,K=N-1;for(;v<=k&&v<=K;){const j=I[v],mt=b[v]=T?hi(b[v]):Gn(b[v]);if(fr(j,mt))m(j,mt,tt,null,et,q,lt,st,T);else break;v++}for(;v<=k&&v<=K;){const j=I[k],mt=b[K]=T?hi(b[K]):Gn(b[K]);if(fr(j,mt))m(j,mt,tt,null,et,q,lt,st,T);else break;k--,K--}if(v>k){if(v<=K){const j=K+1,mt=j<N?b[j].el:nt;for(;v<=K;)m(null,b[v]=T?hi(b[v]):Gn(b[v]),tt,mt,et,q,lt,st,T),v++}}else if(v>K)for(;v<=k;)vt(I[v],et,q,!0),v++;else{const j=v,mt=v,dt=new Map;for(v=mt;v<=K;v++){const Xt=b[v]=T?hi(b[v]):Gn(b[v]);Xt.key!=null&&dt.set(Xt.key,v)}let pt,zt=0;const ct=K-mt+1;let Mt=!1,Nt=0;const Gt=new Array(ct);for(v=0;v<ct;v++)Gt[v]=0;for(v=j;v<=k;v++){const Xt=I[v];if(zt>=ct){vt(Xt,et,q,!0);continue}let Bt;if(Xt.key!=null)Bt=dt.get(Xt.key);else for(pt=mt;pt<=K;pt++)if(Gt[pt-mt]===0&&fr(Xt,b[pt])){Bt=pt;break}Bt===void 0?vt(Xt,et,q,!0):(Gt[Bt-mt]=v+1,Bt>=Nt?Nt=Bt:Mt=!0,m(Xt,b[Bt],tt,null,et,q,lt,st,T),zt++)}const It=Mt?n_(Gt):os;for(pt=It.length-1,v=ct-1;v>=0;v--){const Xt=mt+v,Bt=b[Xt],le=b[Xt+1],F=Xt+1<N?le.el||np(le):nt;Gt[v]===0?m(null,Bt,tt,F,et,q,lt,st,T):Mt&&(pt<0||v!==It[pt]?rt(Bt,tt,F,2):pt--)}}},rt=(I,b,tt,nt,et=null)=>{const{el:q,type:lt,transition:st,children:T,shapeFlag:v}=I;if(v&6){rt(I.component.subTree,b,tt,nt);return}if(v&128){I.suspense.move(b,tt,nt);return}if(v&64){lt.move(I,b,tt,Jt);return}if(lt===ne){i(q,b,tt);for(let k=0;k<T.length;k++)rt(T[k],b,tt,nt);i(I.anchor,b,tt);return}if(lt===Go){x(I,b,tt);return}if(nt!==2&&v&1&&st)if(nt===0)st.persisted&&!q[tl]?i(q,b,tt):(st.beforeEnter(q),i(q,b,tt),cn(()=>st.enter(q),et));else{const{leave:k,delayLeave:K,afterLeave:j}=st,mt=()=>{I.ctx.isUnmounted?s(q):i(q,b,tt)},dt=()=>{const pt=q._isLeaving||!!q[tl];q._isLeaving&&q[tl](!0),st.persisted&&!pt?mt():k(q,()=>{mt(),j&&j()})};K?K(q,mt,dt):dt()}else i(q,b,tt)},vt=(I,b,tt,nt=!1,et=!1)=>{const{type:q,props:lt,ref:st,children:T,dynamicChildren:v,shapeFlag:N,patchFlag:k,dirs:K,cacheIndex:j,memo:mt}=I;if((k===-2||v&&v.hasOnce)&&(et=!1),st!=null&&(yi(),Nr(st,null,tt,I,!0),Mi()),j!=null&&(!I.ctx||I.ctx===b)&&(b.renderCache[j]=void 0),N&256){b.ctx.deactivate(I);return}const dt=N&1&&K,pt=!Or(I);let zt;if(pt&&(zt=lt&&lt.onVnodeBeforeUnmount)&&kn(zt,b,I),N&6)ht(I.component,tt,nt);else{if(N&128){I.suspense.unmount(tt,nt);return}dt&&ji(I,null,b,"beforeUnmount"),N&64?I.type.remove(I,b,tt,Jt,nt):v&&!v.hasOnce&&(q!==ne||k>0&&k&64)?bt(v,b,tt,!1,!0):(q===ne&&k&384||!et&&N&16)&&bt(T,b,tt),nt&&St(I)}const ct=mt!=null&&j==null;(pt&&(zt=lt&&lt.onVnodeUnmounted)||dt||ct)&&cn(()=>{zt&&kn(zt,b,I),dt&&ji(I,null,b,"unmounted"),ct&&(I.el=null)},tt)},St=I=>{const{type:b,el:tt,anchor:nt,transition:et}=I;if(b===ne){Q(tt,nt);return}if(b===Go){M(I),et&&!et.persisted&&et.afterLeave&&et.afterLeave();return}const q=()=>{s(tt),et&&!et.persisted&&et.afterLeave&&et.afterLeave()};if(I.shapeFlag&1&&et&&!et.persisted){const{leave:lt,delayLeave:st}=et,T=()=>lt(tt,q);st?st(I.el,q,T):T()}else q()},Q=(I,b)=>{let tt;for(;I!==b;)tt=h(I),s(I),I=tt;s(b)},ht=(I,b,tt)=>{const{bum:nt,scope:et,job:q,subTree:lt,um:st,m:T,a:v}=I;hh(T),hh(v),nt&&Ho(nt),et.stop(),q?(q.flags|=8,vt(lt,I,b,tt)):I.vnode.el&&lt&&(lt.transition=I.vnode.transition,vt(lt,I,b,tt)),st&&cn(st,b),cn(()=>{I.isUnmounted=!0},b)},bt=(I,b,tt,nt=!1,et=!1,q=0)=>{for(let lt=q;lt<I.length;lt++)vt(I[lt],b,tt,nt,et)},Et=I=>{if(I.shapeFlag&6)return Et(I.component.subTree);if(I.shapeFlag&128)return I.suspense.next();const b=h(I.anchor||I.el),tt=b&&b[xg];return tt?h(tt):b};let Wt=!1;const kt=(I,b,tt)=>{let nt;I==null?b._vnode&&(vt(b._vnode,null,null,!0),nt=b._vnode.component):m(b._vnode||null,I,b,null,null,null,tt),b._vnode=I,Wt||(Wt=!0,eh(nt),Lf(),Wt=!1)},Jt={p:m,um:vt,m:rt,r:St,mt:W,mc:D,pc:$,pbc:y,n:Et,o:n};return{render:kt,hydrate:void 0,createApp:Bg(kt)}}function nl({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Yi({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function e_(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function tp(n,t,e=!1){const i=n.children,s=t.children;if(Ht(i)&&Ht(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=hi(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&tp(o,a)),a.type===La&&(a.patchFlag===-1&&(a=s[r]=hi(a)),a.el=o.el),a.type===Si&&!a.el&&(a.el=o.el)}}function n_(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function ep(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ep(t)}function hh(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function np(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?np(t.subTree):null}const ip=n=>n.__isSuspense;function i_(n,t){t&&t.pendingBranch?Ht(n)?t.effects.push(...n):t.effects.push(n):dg(n)}const ne=Symbol.for("v-fgt"),La=Symbol.for("v-txt"),Si=Symbol.for("v-cmt"),Go=Symbol.for("v-stc"),ds=[];let gn=null;function Tt(n=!1){ds.push(gn=n?null:[])}function sp(){ds.pop(),gn=ds[ds.length-1]||null}let Xr=1;function dh(n,t=!1){Xr+=n,n<0&&gn&&t&&(gn.hasOnce=!0)}function rp(n){return n.dynamicChildren=Xr>0?gn||os:null,sp(),Xr>0&&gn&&gn.push(n),n}function Rt(n,t,e,i,s,r){return rp(P(n,t,e,i,s,r,!0))}function ra(n,t,e,i,s){return rp(ut(n,t,e,i,s,!0))}function op(n){return n?n.__v_isVNode===!0:!1}function fr(n,t){return n.type===t.type&&n.key===t.key}const ap=({key:n})=>n??null,Wo=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?we(n)||Ae(n)||qt(n)?{i:Tn,r:n,k:t,f:!!e}:n:null);function P(n,t=null,e=null,i=0,s=null,r=n===ne?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&ap(t),ref:t&&Wo(t),scopeId:Nf,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Tn};return a?(oa(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=we(e)?8:16),Xr>0&&!o&&gn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&gn.push(l),l}const ut=s_;function s_(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===Ig)&&(n=Si),op(n)){const a=tr(n,t,!0);return e&&oa(a,e),Xr>0&&!r&&gn&&(a.shapeFlag&6?gn[gn.indexOf(n)]=a:gn.push(a)),a.patchFlag=-2,a}if(p_(n)&&(n=n.__vccOpts),t){t=r_(t);let{class:a,style:l}=t;a&&!we(a)&&(t.class=Oe(a)),me(l)&&(Aa(l)&&!Ht(l)&&(l=We({},l)),t.style=En(l))}const o=we(n)?1:ip(n)?128:Ca(n)?64:me(n)?4:qt(n)?2:0;return P(n,t,e,i,s,o,r,!0)}function r_(n){return n?Aa(n)||Yf(n)?We({},n):n:null}function tr(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?o_(s||{},t):s,d={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&ap(c),ref:t&&t.ref?e&&r?Ht(r)?r.concat(Wo(t)):[r,Wo(t)]:Wo(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==ne?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&tr(n.ssContent),ssFallback:n.ssFallback&&tr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce,cacheIndex:n.cacheIndex};return l&&i&&ou(d,l.clone(d)),d}function De(n=" ",t=0){return ut(La,null,n,t)}function lp(n,t){const e=ut(Go,null,n);return e.staticCount=t,e}function ge(n="",t=!1){return t?(Tt(),ra(Si,null,n)):ut(Si,null,n)}function Gn(n){return n==null||typeof n=="boolean"?ut(Si):Ht(n)?ut(ne,null,n.slice()):op(n)?hi(n):ut(La,null,String(n))}function hi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:tr(n)}function oa(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Ht(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),oa(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!Yf(t)?t._ctx=Tn:s===3&&Tn&&(Tn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else if(qt(t)){if(i&65){oa(n,{default:t});return}t={default:t,_ctx:Tn},e=32}else t=String(t),i&64?(e=16,t=[De(t)]):e=8;n.children=t,n.shapeFlag|=e}function o_(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Oe([t.class,i.class]));else if(s==="style")t.style=En([t.style,i.style]);else if(xa(s)){const r=t[s],o=i[s];o&&r!==o&&!(Ht(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!ya(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function kn(n,t,e,i=null){Bn(n,t,7,[e,i])}const a_=Gf();let l_=0;function c_(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||a_,r={uid:l_++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ff(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Kf(i,s),emitsOptions:Wf(i,s),emit:null,emitted:null,propsDefaults:ve,inheritAttrs:i.inheritAttrs,ctx:ve,data:ve,props:ve,attrs:ve,slots:ve,refs:ve,setupState:ve,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Vg.bind(null,r),n.ce&&n.ce(r),r}let sn=null;const cp=()=>sn||Tn;let aa,$r;{const n=Ea(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};aa=t("__VUE_INSTANCE_SETTERS__",e=>sn=e),$r=t("__VUE_SSR_SETTERS__",e=>jr=e)}const to=n=>{const t=sn;return aa(n),n.scope.on(),()=>{n.scope.off(),aa(t)}},fh=()=>{sn&&sn.scope.off(),aa(null)};function up(n){return n.vnode.shapeFlag&4}let jr=!1;function u_(n,t=!1,e=!1){t&&$r(t);const{props:i,children:s}=n.vnode,r=up(n);jg(n,i,r,t),Zg(n,s,e||t);const o=r?h_(n,t):void 0;return t&&$r(!1),o}function h_(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Dg);const{setup:i}=e;if(i){yi();const s=n.setupContext=i.length>1?f_(n):null,r=to(n),o=Qr(i,n,0,[n.props,s]),a=rf(o);if(Mi(),r(),(a||n.sp)&&!Or(n)&&Bf(n),a){if(o.then(fh,fh),t)return o.then(l=>{$r(!0);try{ph(n,l,t)}finally{$r(!1)}}).catch(l=>{Ra(l,n,0)});n.asyncDep=o}else ph(n,o)}else hp(n)}function ph(n,t,e){qt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:me(t)&&(n.setupState=Pf(t)),hp(n)}function hp(n,t,e){const i=n.type;n.render||(n.render=i.render||jn);{const s=to(n);yi();try{Lg(n)}finally{Mi(),s()}}}const d_={get(n,t){return Ye(n,"get",""),n[t]}};function f_(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,d_),slots:n.slots,emit:n.emit,expose:t}}function Ua(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Pf(iu(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Fr)return Fr[e](n)},has(t,e){return e in t||e in Fr}})):n.proxy}function p_(n){return qt(n)&&"__vccOpts"in n}const qe=(n,t)=>ag(n,t,jr),m_="3.5.43";/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let tc;const mh=typeof window<"u"&&window.trustedTypes;if(mh)try{tc=mh.createPolicy("vue",{createHTML:n=>n})}catch{}const dp=tc?n=>tc.createHTML(n):n=>n,g_="http://www.w3.org/2000/svg",__="http://www.w3.org/1998/Math/MathML",ui=typeof document<"u"?document:null,gh=ui&&ui.createElement("template"),v_={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?ui.createElementNS(g_,n):t==="mathml"?ui.createElementNS(__,n):e?ui.createElement(n,{is:e}):ui.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ui.createTextNode(n),createComment:n=>ui.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ui.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{gh.innerHTML=dp(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=gh.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},x_=Symbol("_vtc");function y_(n,t,e){const i=n[x_];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const la=Symbol("_vod"),fp=Symbol("_vsh"),il={name:"show",beforeMount(n,{value:t},{transition:e}){n[la]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):pr(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),pr(n,!0),i.enter(n)):i.leave(n,()=>{pr(n,!1)}):pr(n,t))},beforeUnmount(n,{value:t}){pr(n,t)}};function pr(n,t){n.style.display=t?n[la]:"none",n[fp]=!t}const M_=Symbol(""),S_=/(?:^|;)\s*display\s*:/;function b_(n,t,e){const i=n.style,s=we(e);let r=!1;if(e&&!s){if(t)if(we(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&Rr(i,a,"")}else for(const o in t)e[o]==null&&Rr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?T_(n,o,!we(t)&&t?t[o]:void 0,a)||Rr(i,o,a):Rr(i,o,"")}}else if(s){if(t!==e){const o=i[M_];o&&(e+=";"+o),i.cssText=e,r=S_.test(e)}}else t&&n.removeAttribute("style");la in n&&(n[la]=r?i.display:"",n[fp]&&(i.display="none"))}const co=/\s*!important$/;function Rr(n,t,e){if(Ht(e))e.forEach(i=>Rr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))co.test(e)?n.setProperty(t,e.replace(co,""),"important"):n.setProperty(t,e);else{const i=E_(n,t);co.test(e)?n.setProperty(_s(i),e.replace(co,""),"important"):n[i]=e}}const _h=["Webkit","Moz","ms"],sl={};function E_(n,t){const e=sl[t];if(e)return e;let i=Fn(t);if(i!=="filter"&&i in n)return sl[t]=i;i=lf(i);for(let s=0;s<_h.length;s++){const r=_h[s]+i;if(r in n)return sl[t]=r}return t}function T_(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&we(i)&&e===i}const vh="http://www.w3.org/1999/xlink";function xh(n,t,e,i,s,r=Im(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(vh,t.slice(6,t.length)):n.setAttributeNS(vh,t,e):e==null||r&&!uf(e)?n.removeAttribute(t):n.setAttribute(t,r?"":Rn(e)?String(e):e)}function yh(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?dp(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=uf(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Ni(n,t,e,i){n.addEventListener(t,e,i)}function w_(n,t,e,i){n.removeEventListener(t,e,i)}const Mh=Symbol("_vei");function A_(n,t,e,i,s=null){const r=n[Mh]||(n[Mh]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=P_(t);if(i){const c=r[t]=L_(i,s);Ni(n,a,c,l)}else o&&(w_(n,a,o,l),r[t]=void 0)}}const R_=/(Once|Passive|Capture)$/,C_=/^on:?(?:Once|Passive|Capture)$/;function P_(n){let t,e;for(;(e=n.match(R_))&&!C_.test(n);)t||(t={}),n=n.slice(0,n.length-e[1].length),t[e[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):_s(n.slice(2)),t]}let rl=0;const I_=Promise.resolve(),D_=()=>rl||(I_.then(()=>rl=0),rl=Date.now());function L_(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;const s=e.value;if(Ht(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const o=s.slice(),a=[i];for(let l=0;l<o.length&&!i._stopped;l++){const c=o[l];c&&Bn(c,t,5,a)}}else Bn(s,t,5,[i])};return e.value=n,e.attached=D_(),e}const Sh=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,U_=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?y_(n,i,o):t==="style"?b_(n,e,i):xa(t)?ya(t)||A_(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):N_(n,t,i,o))?(yh(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&xh(n,t,i,o,r,t!=="value")):n._isVueCE&&(O_(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!we(i)))?yh(n,Fn(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),xh(n,t,i,o))};function N_(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&Sh(t)&&qt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Sh(t)&&we(e)?!1:t in n}function O_(n,t){const e=n._def.props;if(!e)return!1;const i=Fn(t);return Array.isArray(e)?e.some(s=>Fn(s)===i):Object.keys(e).some(s=>Fn(s)===i)}const er=n=>{const t=n.props["onUpdate:modelValue"]||!1;return Ht(t)?e=>Ho(t,e):t};function F_(n){n.target.composing=!0}function bh(n){const t=n.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const $n=Symbol("_assign"),uo=Symbol("_initialValue");function ol(n,t,e){return t&&(n=n.trim()),e&&(n=ba(n)),n}const Cr={created(n,{modifiers:{lazy:t,trim:e,number:i}},s){n.parentNode&&(n.type==="text"?n[uo]=n.defaultValue.replace(/[\r\n]/g,""):n.type==="textarea"&&(n[uo]=n.defaultValue.replace(/\r\n?/g,`
`))),n[$n]=er(s);const r=i||s.props&&s.props.type==="number";Ni(n,t?"change":"input",o=>{o.target.composing||n[$n](ol(n.value,e,r))}),(e||r)&&Ni(n,"change",()=>{n.value=ol(n.value,e,r)}),t||(Ni(n,"compositionstart",F_),Ni(n,"compositionend",bh),Ni(n,"change",bh))},mounted(n,{value:t,modifiers:{trim:e,number:i}}){const s=t??"",r=n[uo];delete n[uo],r!==void 0&&(n.type==="text"||n.type==="textarea")&&n.value!==r?n[$n](ol(n.value,e,i)):n.value=s},beforeUpdate(n,{value:t,oldValue:e,modifiers:{lazy:i,trim:s,number:r}},o){if(n[$n]=er(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?ba(n.value):n.value,l=t??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&t===e||s&&n.value.trim()===l)||(n.value=l)}},en={deep:!0,created(n,t,e){n[$n]=er(e),Ni(n,"change",()=>{const i=n._modelValue,s=Yr(n),r=n.checked,o=n[$n];if(Ht(i)){const a=Kc(i,s),l=a!==-1;if(r&&!l)o(i.concat(s));else if(!r&&l){const c=[...i];c.splice(a,1),o(c)}}else if(vi(i)){const a=new Set(i);r?a.add(s):a.delete(s),o(a)}else o(pp(n,r))})},mounted:Eh,beforeUpdate(n,t,e){n[$n]=er(e),Eh(n,t,e)}};function Eh(n,{value:t,oldValue:e},i){n._modelValue=t;let s;if(Ht(t))s=Kc(t,i.props.value)>-1;else if(vi(t))s=t.has(i.props.value);else{if(t===e)return;s=xi(t,pp(n,!0))}n.checked!==s&&(n.checked=s)}const ho={deep:!0,created(n,{value:t,modifiers:{number:e}},i){n._modelValue=t,Ni(n,"change",()=>{const s=Array.prototype.filter.call(n.options,l=>l.selected).map(l=>e?ba(Yr(l)):Yr(l)),r=n.multiple,o=r?vi(n._modelValue)?new Set(s):s:s[0],a=n._pendingValue=[r,r?Ht(o)?s.slice():s:o];try{n[$n](o)}finally{su(()=>{n._pendingValue===a&&(n._pendingValue=void 0)})}}),n[$n]=er(i)},mounted(n,{value:t}){Th(n,t)},beforeUpdate(n,{value:t},e){n._modelValue=t,n[$n]=er(e)},updated(n,{value:t}){const e=n._pendingValue;n._pendingValue=void 0,(!e||e[0]!==n.multiple||!z_(t,e[1],e[0]))&&Th(n,t)}};function z_(n,t,e){if(!e||Ht(n))return xi(n,t);if(vi(n)){if(n.size!==t.length)return!1;for(const i of t)if(!n.has(i))return!1;return!0}return!1}function Th(n,t){const e=n.multiple,i=Ht(t);if(!(e&&!i&&!vi(t))){for(let s=0,r=n.options.length;s<r;s++){const o=n.options[s],a=Yr(o);if(e)if(i){const l=typeof a;l==="string"||l==="number"?o.selected=t.some(c=>String(c)===String(a)):o.selected=Kc(t,a)>-1}else o.selected=t.has(a);else if(xi(Yr(o),t)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!e&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function Yr(n){return"_value"in n?n._value:n.value}function pp(n,t){const e=t?"_trueValue":"_falseValue";return e in n?n[e]:t}const B_=["ctrl","shift","alt","meta"],k_={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>B_.some(e=>n[`${e}Key`]&&!t.includes(e))},qi=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=(s,...r)=>{for(let o=0;o<t.length;o++){const a=k_[t[o]];if(a&&a(s,t))return}return n(s,...r)})},V_=We({patchProp:U_},v_);let wh;function H_(){return wh||(wh=Qg(V_))}const G_=(...n)=>{const t=H_().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=X_(i);if(!s)return;const r=t._component;!qt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,W_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t};function W_(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function X_(n){return we(n)?document.querySelector(n):n}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let mp;const Na=n=>mp=n,gp=Symbol();function ec(n){return n&&typeof n=="object"&&Object.prototype.toString.call(n)==="[object Object]"&&typeof n.toJSON!="function"}var zr;(function(n){n.direct="direct",n.patchObject="patch object",n.patchFunction="patch function"})(zr||(zr={}));function $_(){const n=pf(!0),t=n.run(()=>zi({}));let e=[],i=[];const s=iu({install(r){Na(s),s._a=r,r.provide(gp,s),r.config.globalProperties.$pinia=s,i.forEach(o=>e.push(o)),i=[]},use(r){return this._a?e.push(r):i.push(r),this},_p:e,_a:null,_e:n,_s:new Map,state:t});return s}const _p=()=>{};function Ah(n,t,e,i=_p){n.push(t);const s=()=>{const r=n.indexOf(t);r>-1&&(n.splice(r,1),i())};return!e&&mf()&&Um(s),s}function bs(n,...t){n.slice().forEach(e=>{e(...t)})}const j_=n=>n(),Rh=Symbol(),al=Symbol();function nc(n,t){n instanceof Map&&t instanceof Map?t.forEach((e,i)=>n.set(i,e)):n instanceof Set&&t instanceof Set&&t.forEach(n.add,n);for(const e in t){if(!t.hasOwnProperty(e))continue;const i=t[e],s=n[e];ec(s)&&ec(i)&&n.hasOwnProperty(e)&&!Ae(i)&&!Yn(i)?n[e]=nc(s,i):n[e]=i}return n}const Y_=Symbol();function q_(n){return!ec(n)||!n.hasOwnProperty(Y_)}const{assign:Li}=Object;function K_(n){return!!(Ae(n)&&n.effect)}function Z_(n,t,e,i){const{state:s,actions:r,getters:o}=t,a=e.state.value[n];let l;function c(){a||(e.state.value[n]=s?s():{});const d=ig(e.state.value[n]);return Li(d,r,Object.keys(o||{}).reduce((u,h)=>(u[h]=iu(qe(()=>{Na(e);const g=e._s.get(n);return o[h].call(g,g)})),u),{}))}return l=vp(n,c,t,e,i,!0),l}function vp(n,t,e={},i,s,r){let o;const a=Li({actions:{}},e),l={deep:!0};let c,d,u=[],h=[],g;const _=i.state.value[n];!r&&!_&&(i.state.value[n]={});let m;function f(D){let U;c=d=!1,typeof D=="function"?(D(i.state.value[n]),U={type:zr.patchFunction,storeId:n,events:g}):(nc(i.state.value[n],D),U={type:zr.patchObject,payload:D,storeId:n,events:g});const y=m=Symbol();su().then(()=>{m===y&&(c=!0)}),d=!0,bs(u,U,i.state.value[n])}const p=r?function(){const{state:U}=e,y=U?U():{};this.$patch(E=>{Li(E,y)})}:_p;function S(){o.stop(),u=[],h=[],i._s.delete(n)}const x=(D,U="")=>{if(Rh in D)return D[al]=U,D;const y=function(){Na(i);const E=Array.from(arguments),X=[],O=[];function W(G){X.push(G)}function Y(G){O.push(G)}bs(h,{args:E,name:y[al],store:R,after:W,onError:Y});let B;try{B=D.apply(this&&this.$id===n?this:R,E)}catch(G){throw bs(O,G),G}return B instanceof Promise?B.then(G=>(bs(X,G),G)).catch(G=>(bs(O,G),Promise.reject(G))):(bs(X,B),B)};return y[Rh]=!0,y[al]=U,y},M={_p:i,$id:n,$onAction:Ah.bind(null,h),$patch:f,$reset:p,$subscribe(D,U={}){const y=Ah(u,D,U.detached,()=>E()),E=o.run(()=>Ve(()=>i.state.value[n],X=>{(U.flush==="sync"?d:c)&&D({storeId:n,type:zr.direct,events:g},X)},Li({},l,U)));return y},$dispose:S},R=wa(M);i._s.set(n,R);const w=(i._a&&i._a.runWithContext||j_)(()=>i._e.run(()=>(o=pf()).run(()=>t({action:x}))));for(const D in w){const U=w[D];if(Ae(U)&&!K_(U)||Yn(U))r||(_&&q_(U)&&(Ae(U)?U.value=_[D]:nc(U,_[D])),i.state.value[n][D]=U);else if(typeof U=="function"){const y=x(U,D);w[D]=y,a.actions[D]=U}}return Li(R,w),Li(te(R),w),Object.defineProperty(R,"$state",{get:()=>i.state.value[n],set:D=>{f(U=>{Li(U,D)})}}),i._p.forEach(D=>{Li(R,o.run(()=>D({store:R,app:i._a,pinia:i,options:a})))}),_&&r&&e.hydrate&&e.hydrate(R.$state,_),c=!0,d=!0,R}/*! #__NO_SIDE_EFFECTS__ */function xp(n,t,e){let i,s;const r=typeof t=="function";typeof n=="string"?(i=n,s=r?e:t):(s=n,i=n.id);function o(a,l){const c=mg();return a=a||(c?Ur(gp,null):null),a&&Na(a),a=mp,a._s.has(i)||(r?vp(i,t,s,a):Z_(i,s,a)),a._s.get(i)}return o.$id=i,o}const ll={size:1e3,segments:128,seed:20260920,heightScale:140,noiseScale:.0022,ridgeScale:70,canyon:!0},J_={enabled:!0,maxTurnAngle:45,maxClimbAngle:25,minStepLength:12,maxAccel:12,minTurnRadius:30,maxAttitudeChange:60},Q_={seed:20260920,rrtMaxNodes:6e3,rrtStep:40,rrtStarRadius:90,goalBias:.12,headingDiscretization:16,hybridStep:30,acoIterations:40,acoAnts:24,acoAlpha:1,acoBeta:4,acoRho:.15,acoQ:60,psoParticles:30,psoIterations:40,psoInertia:.7,psoCognitive:1.4,psoSocial:1.4,gaPopulation:36,gaIterations:40,gaMutation:.12,fallbackToAstar:!0},t0={enabled:!1,threatEnterDistance:60,collisionHorizon:6,yawThreshold:35,detourRatio:1.8,minInterval:2,lookAhead:120,windowRadius:220,predictObstacles:!0},ic={algo:"astar",cellSize:25,heightCell:20,maxNodes:2e5,maxStep:2,clearance:12,cruiseAlt:120,speedMin:15,speedMax:60,heuristicWeight:1,smoothIterations:8,dynamics:{...J_},advanced:{...Q_}},Ch={distance:1,threat:25,altitude:8,nofly:60,smooth:.15};function cl(){return[{id:"uav-1",name:"无人机-01",color:3842303},{id:"uav-2",name:"无人机-02",color:16756768}]}let e0=0;const He=(n="id")=>`${n}-${Date.now().toString(36)}-${(e0++).toString(36)}`;function Ph(){return[{id:He("thr"),kind:"radar",name:"雷达-01",position:{x:60,y:0,z:40},radius:110,heightMin:0,heightMax:160,level:4,opacity:.22},{id:He("thr"),kind:"sam",name:"防空-01",position:{x:-140,y:0,z:-90},radius:90,heightMin:20,heightMax:220,level:5,opacity:.28},{id:He("thr"),kind:"jammer",name:"干扰-01",position:{x:180,y:0,z:-160},radius:80,heightMin:0,heightMax:120,level:2,opacity:.2}]}function Ih(){return[{id:He("nfz"),name:"禁飞区-城区",position:{x:-40,y:0,z:150},radius:70,heightMin:0,heightMax:300,penalty:10,hardBlock:!0}]}function Dh(){return[{id:He("obs"),name:"建筑-A",position:{x:240,y:0,z:120},size:{x:36,z:36},height:55},{id:He("obs"),name:"建筑-B",position:{x:285,y:0,z:80},size:{x:24,z:40},height:40}]}function Lh(){return[{id:He("dyn"),name:"巡逻障碍车-01",kind:"moving-obstacle",motion:"patrol",threatKind:"sam",position:{x:-40,y:0,z:-20},radius:22,heightMin:0,heightMax:90,level:3,patrolPoints:[{x:-180,y:0,z:-40},{x:120,y:0,z:60},{x:60,y:0,z:200}],velocity:{x:18,y:0,z:0},patrolSpeed:22,triggerTime:0,growDuration:2,persistent:!0,period:30,predictHorizon:8,enabled:!0},{id:He("dyn"),name:"突发威胁-01",kind:"sudden-threat",motion:"burst",threatKind:"sam",position:{x:60,y:0,z:120},radius:70,heightMin:0,heightMax:180,level:5,patrolPoints:[{x:60,y:0,z:120},{x:60,y:0,z:120}],velocity:{x:0,y:0,z:0},patrolSpeed:0,triggerTime:12,growDuration:3,persistent:!1,period:24,predictHorizon:6,enabled:!0}]}function Uh(){return[{id:He("wp"),uavId:"uav-1",role:"start",position:{x:-420,y:120,z:-320},speed:30},{id:He("wp"),uavId:"uav-1",role:"via",position:{x:-150,y:130,z:80},speed:30},{id:He("wp"),uavId:"uav-1",role:"end",position:{x:420,y:110,z:300},speed:30},{id:He("wp"),uavId:"uav-2",role:"start",position:{x:420,y:130,z:-260},speed:28},{id:He("wp"),uavId:"uav-2",role:"end",position:{x:-400,y:120,z:260},speed:28}]}const ue=xp("scene",{state:()=>({terrain:{...ll},threats:Ph(),noflyZones:Ih(),obstacles:Dh(),dynamics:Lh(),uavs:cl(),waypoints:Uh(),planParams:{...ic},weights:{...Ch},editMode:"select",selectedId:null,activeUavId:"uav-1",terrainVersion:0}),getters:{startPoint:n=>n.waypoints.find(t=>(t.uavId??"uav-1")===n.activeUavId&&t.role==="start"),endPoint:n=>n.waypoints.find(t=>(t.uavId??"uav-1")===n.activeUavId&&t.role==="end"),activeUav:n=>n.uavs.find(t=>t.id===n.activeUavId)??n.uavs[0],activeWaypoints:n=>n.waypoints.filter(t=>(t.uavId??"uav-1")===n.activeUavId).sort((t,e)=>{const i=s=>s==="start"?0:s==="end"?2:1;return i(t.role)-i(e.role)})},actions:{setEditMode(n){this.editMode=n,n!=="select"&&(this.selectedId=null)},setActiveUav(n){this.activeUavId=n,this.selectedId=null},select(n){this.selectedId=n},addThreatAt(n,t="radar"){const e=He("thr"),i={radar:"雷达",sam:"防空",jammer:"干扰"};return this.threats.push({id:e,kind:t,name:`${i[t]}-${this.threats.length+1}`,position:{...n},radius:90,heightMin:0,heightMax:160,level:3,opacity:t==="sam"?.28:.22}),this.selectedId=e,e},updateThreat(n,t){const e=this.threats.find(i=>i.id===n);e&&Object.assign(e,t)},removeThreat(n){this.threats=this.threats.filter(t=>t.id!==n),this.selectedId===n&&(this.selectedId=null)},addNoFlyAt(n){const t=He("nfz");return this.noflyZones.push({id:t,name:`禁飞区-${this.noflyZones.length+1}`,position:{...n},radius:60,heightMin:0,heightMax:200,penalty:10,hardBlock:!0}),this.selectedId=t,t},updateNoFly(n,t){const e=this.noflyZones.find(i=>i.id===n);e&&Object.assign(e,t)},removeNoFly(n){this.noflyZones=this.noflyZones.filter(t=>t.id!==n),this.selectedId===n&&(this.selectedId=null)},addObstacleAt(n){const t=He("obs");return this.obstacles.push({id:t,name:`建筑-${this.obstacles.length+1}`,position:{...n,y:0},size:{x:30,z:30},height:45}),this.selectedId=t,t},updateObstacle(n,t){const e=this.obstacles.find(i=>i.id===n);e&&Object.assign(e,t)},removeObstacle(n){this.obstacles=this.obstacles.filter(t=>t.id!==n),this.selectedId===n&&(this.selectedId=null)},addDynamicAt(n){const t=He("dyn");return this.dynamics.push({id:t,name:`移动障碍-${this.dynamics.length+1}`,kind:"moving-obstacle",motion:"patrol",threatKind:"sam",position:{...n,y:0},radius:22,heightMin:0,heightMax:90,level:3,patrolPoints:[{x:n.x-80,y:0,z:n.z},{x:n.x+80,y:0,z:n.z+40}],velocity:{x:18,y:0,z:0},patrolSpeed:20,triggerTime:0,growDuration:2,persistent:!0,period:30,predictHorizon:8,enabled:!0}),this.selectedId=t,t},updateDynamic(n,t){const e=this.dynamics.find(i=>i.id===n);e&&Object.assign(e,t)},removeDynamic(n){this.dynamics=this.dynamics.filter(t=>t.id!==n),this.selectedId===n&&(this.selectedId=null)},addWaypointAt(n,t){const e=He("wp"),i=t??this.activeUavId,s=this.waypoints.filter(l=>(l.uavId??"uav-1")===i),r=s.some(l=>l.role==="start"),o=s.some(l=>l.role==="end"),a=r?o?"via":"end":"start";return this.waypoints.push({id:e,uavId:i,role:a,position:{...n},speed:30}),this.selectedId=e,e},updateWaypoint(n,t){const e=this.waypoints.find(i=>i.id===n);e&&Object.assign(e,t)},removeWaypoint(n){const t=this.waypoints.find(e=>e.id===n);t&&t.role==="via"&&(this.waypoints=this.waypoints.filter(e=>e.id!==n),this.selectedId===n&&(this.selectedId=null))},addUav(){const n=`uav-${this.uavs.length+1}`,t=[14702333,52937,16611752,10734392,16632686];return this.uavs.push({id:n,name:`无人机-${String(this.uavs.length+1).padStart(2,"0")}`,color:t[this.uavs.length%t.length]}),n},removeUav(n){this.uavs.length<=1||(this.uavs=this.uavs.filter(t=>t.id!==n),this.waypoints=this.waypoints.filter(t=>(t.uavId??"uav-1")!==n),this.activeUavId===n&&(this.activeUavId=this.uavs[0].id))},removeSelected(){const n=this.selectedId;n&&(this.removeThreat(n),this.removeNoFly(n),this.removeObstacle(n),this.removeWaypoint(n),this.removeDynamic(n))},serialize(n){return{version:"2.0.0",exportedAt:new Date().toISOString(),terrain:JSON.parse(JSON.stringify(this.terrain)),threats:JSON.parse(JSON.stringify(this.threats)),noflyZones:JSON.parse(JSON.stringify(this.noflyZones)),obstacles:JSON.parse(JSON.stringify(this.obstacles)),waypoints:JSON.parse(JSON.stringify(this.waypoints)),planParams:JSON.parse(JSON.stringify(this.planParams)),weights:JSON.parse(JSON.stringify(this.weights)),dynamics:JSON.parse(JSON.stringify(this.dynamics)),uavs:JSON.parse(JSON.stringify(this.uavs)),...n}},loadScene(n){var t,e;this.terrain={...ll,...n.terrain},this.threats=n.threats??[],this.noflyZones=n.noflyZones??[],this.obstacles=n.obstacles??[],this.waypoints=(n.waypoints??[]).map(i=>({uavId:"uav-1",...i})),this.planParams=n0(n.planParams),this.weights={...this.weights,...n.weights},this.dynamics=n.dynamics??[],this.uavs=(t=n.uavs)!=null&&t.length?n.uavs:cl(),this.activeUavId=((e=this.uavs[0])==null?void 0:e.id)??"uav-1",this.selectedId=null},resetScene(){this.terrain={...ll},this.threats=Ph(),this.noflyZones=Ih(),this.obstacles=Dh(),this.dynamics=Lh(),this.uavs=cl(),this.waypoints=Uh(),this.planParams={...ic},this.weights={...Ch},this.selectedId=null,this.editMode="select",this.activeUavId="uav-1"}}});function n0(n){const t=JSON.parse(JSON.stringify(ic));return n?{...t,...n,dynamics:{...t.dynamics,...n.dynamics??{}},advanced:{...t.advanced,...n.advanced??{}}}:t}function i0(n){return new Worker("/assets/planner.worker-WsaSGswI.js",{name:n==null?void 0:n.name})}const Es=new Float32Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),s0=.5*(Math.sqrt(3)-1),mr=(3-Math.sqrt(3))/6;class r0{constructor(t=1337){Dt(this,"perm",new Uint8Array(512));Dt(this,"permMod12",new Uint8Array(512));const e=new Uint8Array(256);for(let r=0;r<256;r++)e[r]=r;let i=t>>>0;const s=()=>{i|=0,i=i+1831565813|0;let r=Math.imul(i^i>>>15,1|i);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296};for(let r=255;r>0;r--){const o=Math.floor(s()*(r+1));[e[r],e[o]]=[e[o],e[r]]}for(let r=0;r<512;r++)this.perm[r]=e[r&255],this.permMod12[r]=this.perm[r]%12}noise2D(t,e){const i=this.perm,s=this.permMod12;let r=0,o=0,a=0;const l=(t+e)*s0,c=Math.floor(t+l),d=Math.floor(e+l),u=(c+d)*mr,h=t-(c-u),g=e-(d-u);let _,m;h>g?(_=1,m=0):(_=0,m=1);const f=h-_+mr,p=g-m+mr,S=h-1+2*mr,x=g-1+2*mr,M=c&255,R=d&255;let C=.5-h*h-g*g;if(C>=0){const U=s[M+i[R]]*2;C*=C,r=C*C*(Es[U]*h+Es[U+1]*g)}let w=.5-f*f-p*p;if(w>=0){const U=s[M+_+i[R+m]]*2;w*=w,o=w*w*(Es[U]*f+Es[U+1]*p)}let D=.5-S*S-x*x;if(D>=0){const U=s[M+1+i[R+1]]*2;D*=D,a=D*D*(Es[U]*S+Es[U+1]*x)}return 70*(r+o+a)}fbm(t,e,i=5,s=2,r=.5){let o=1,a=1,l=0,c=0;for(let d=0;d<i;d++)l+=o*this.noise2D(t*a,e*a),c+=o,o*=r,a*=s;return l/c}}const Re=(n,t)=>Math.hypot(n.x-t.x,n.y-t.y,n.z-t.z),o0=(n,t,e)=>({x:n.x+(t.x-n.x)*e,y:n.y+(t.y-n.y)*e,z:n.z+(t.z-n.z)*e}),wn=(n,t,e)=>Math.max(t,Math.min(e,n));function a0(n){let t=0;for(let e=1;e<n.length;e++)t+=Re(n[e-1],n[e]);return t}function l0(n){const t=[0];for(let e=1;e<n.length;e++)t.push(t[e-1]+Re(n[e-1],n[e]));return t}let fo=null;function c0(n){return JSON.stringify(n)}function yp(n){const t=c0(n);if(fo&&fo.key===t)return fo.data;const{size:e,segments:i,seed:s,heightScale:r,noiseScale:o,ridgeScale:a,canyon:l}=n,c=i+1,d=new Float32Array(c*c),u=new r0(s),h=e/2;for(let _=0;_<c;_++)for(let m=0;m<c;m++){const f=m/i*e-h,p=_/i*e-h,S=u.fbm((f+1e3)*o,(p+1e3)*o,5)*.5+.5,x=Math.pow(1-Math.abs(u.noise2D(f*o*1.6,p*o*1.6)),2);let M=S*r*.55+x*a;if(l){const w=u.noise2D(f*.004+50,7.3)*e*.06,D=Math.abs(p-w),U=e*.05,y=Math.exp(-(D*D)/(2*U*U));M=M*(1-y*.92)+2*y}const R=Math.max(Math.abs(f),Math.abs(p))/h,C=Math.max(0,(R-.8)/.2);M+=C*C*r*.35,d[_*c+m]=Math.max(0,M)}const g={params:n,halfSize:h,heights:d,gridSize:c};return fo={key:t,data:g},g}function Mp(n,t,e){const{halfSize:i,heights:s,gridSize:r,params:o}=n,a=(t+i)/o.size*(r-1),l=(e+i)/o.size*(r-1),c=Math.floor(a),d=Math.floor(l),u=Math.min(c+1,r-1),h=Math.min(d+1,r-1),g=wn(c,0,r-1),_=wn(d,0,r-1),m=wn(a-c,0,1),f=wn(l-d,0,1),p=s[_*r+g],S=s[_*r+u],x=s[h*r+g],M=s[h*r+u],R=p+(S-p)*m,C=x+(M-x)*m;return R+(C-R)*f}function u0(n,t,e=0){const i=n.halfSize-e;return t.x>=-i&&t.x<=i&&t.z>=-i&&t.z<=i&&t.y>=0}class hu{constructor(t,e,i,s,r=[]){Dt(this,"terrain");Dt(this,"threats");Dt(this,"noflyZones");Dt(this,"obstacles");Dt(this,"moving");this.terrain=yp(t),this.threats=e,this.noflyZones=i,this.obstacles=s,this.moving=r}get maxAltitude(){return Math.max(this.terrain.params.size*.3,200)}groundHeight(t,e){return Mp(this.terrain,t,e)}inBounds(t,e=0){return u0(this.terrain,t,e)}hitsObstacle(t,e){for(const i of this.obstacles)if(Math.abs(t.x-i.position.x)<=i.size.x/2+e&&Math.abs(t.z-i.position.z)<=i.size.z/2+e&&t.y<=i.position.y+i.height+e&&t.y>=i.position.y-e)return!0;return!1}hitsHardNoFly(t,e){for(const i of this.noflyZones){if(!i.hardBlock)continue;if(Math.hypot(t.x-i.position.x,t.z-i.position.z)<=i.radius+e&&t.y<=i.heightMax+e&&t.y>=i.heightMin-e)return!0}return!1}hitsMoving(t,e){for(const i of this.moving)if(Math.hypot(t.x-i.position.x,t.z-i.position.z)<=i.radius+e&&t.y<=i.heightMax+e&&t.y>=i.heightMin-e)return!0;return!1}predictedCollision(t,e,i){for(const s of this.moving){const r=s.velocity??{x:0,z:0},o=s.position.x+r.x*e,a=s.position.z+r.z*e;if(Math.hypot(t.x-o,t.z-a)<=s.radius+i&&t.y<=s.heightMax+i&&t.y>=s.heightMin-i)return s}return null}movingClearance(t){let e=1/0,i;for(const s of this.moving){const r=Math.hypot(t.x-s.position.x,t.z-s.position.z),o=Math.max(s.heightMin-t.y,0,t.y-s.heightMax),a=Math.max(r-s.radius,0),l=Math.hypot(a,o);l<e&&(e=l,i=s.entityId)}return{distance:e,entityId:i}}hitsGround(t,e){return t.y<this.groundHeight(t.x,t.z)+e}isBlocked(t,e){return!!(!this.inBounds(t)||this.hitsGround(t,e)||this.hitsObstacle(t,e)||this.hitsHardNoFly(t,e)||this.hitsMoving(t,e))}threatIntensity(t){let e=0;for(const i of this.threats){if(t.y<i.heightMin||t.y>i.heightMax)continue;const s=Math.hypot(t.x-i.position.x,t.z-i.position.z);if(s>=i.radius)continue;const r=1-s/i.radius;e+=wn(i.level,1,5)/5*r*r}return e}noflyPenalty(t){let e=0;for(const i of this.noflyZones){if(t.y<i.heightMin||t.y>i.heightMax)continue;const s=Math.hypot(t.x-i.position.x,t.z-i.position.z);if(s>=i.radius)continue;const r=1-s/i.radius;e+=i.penalty*r*r}return e}isSegmentFeasible(t,e,i,s=8){const r=e.x-t.x,o=e.y-t.y,a=e.z-t.z,l=Math.hypot(r,o,a),c=Math.max(1,Math.ceil(l/s));for(let d=0;d<=c;d++){const u=d/c,h={x:t.x+r*u,y:t.y+o*u,z:t.z+a*u};if(this.isBlocked(h,i))return!1}return!0}integrateField(t,e,i,s=10){const r=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z),o=Math.max(1,Math.ceil(r/s));let a=0;for(let l=0;l<o;l++){const c=l/o,d=(l+1)/o,u={x:t.x+(e.x-t.x)*c,y:t.y+(e.y-t.y)*c,z:t.z+(e.z-t.z)*c},h={x:t.x+(e.x-t.x)*d,y:t.y+(e.y-t.y)*d,z:t.z+(e.z-t.z)*d};a+=(i(u)+i(h))/2*(r/o)}return a}}function h0(n){const t=[];let e=0;for(let i=1;i<n.length;i++){const s=Math.hypot(n[i].x-n[i-1].x,0,n[i].z-n[i-1].z);t.push(s),e+=s}return{segLen:t,total:e}}function d0(n,t){const e=n.patrolPoints.length>=2?n.patrolPoints:[n.position,n.position],{segLen:i,total:s}=h0(e);if(s<1e-6)return{pos:{...e[0]},vel:{x:0,y:0,z:0}};const r=2*s/Math.max(n.patrolSpeed,1e-6);let o=t%r*n.patrolSpeed,a=1;o>s&&(o=2*s-o,a=-1);let l=0,c={...e[0]},d={x:1,z:0};for(let u=0;u<i.length;u++){if(o<=l+i[u]||u===i.length-1){const h=wn((o-l)/Math.max(i[u],1e-6),0,1),g=e[u],_=e[u+1];c={x:g.x+(_.x-g.x)*h,y:0,z:g.z+(_.z-g.z)*h},d={x:(_.x-g.x)/Math.max(i[u],1e-6),y:0,z:(_.z-g.z)/Math.max(i[u],1e-6)};break}l+=i[u]}return{pos:c,vel:{x:d.x*n.patrolSpeed*a,y:0,z:d.z*n.patrolSpeed*a}}}function du(n,t,e){let i=!0,s=1,r={...n.position,y:0},o={...n.velocity};if(n.motion==="burst"){let a=t-n.triggerTime;if(n.persistent)i=a>=0,i&&(s=wn(a/Math.max(n.growDuration,.1),0,1));else{const l=Math.max(n.period,1);a=((t-n.triggerTime)%l+l)%l;const c=l/2;i=a<c,i?s=wn(a/Math.max(n.growDuration,.1),0,1):s=0}}else if(n.motion==="patrol"){const a=d0(n,t);r=a.pos,o=a.vel}else if(n.motion==="linear")r={x:n.position.x+n.velocity.x*t,y:0,z:n.position.z+n.velocity.z*t},o={...n.velocity};else if(n.motion==="intercept"){const a=e??n.position,l=a.x-n.position.x,c=a.z-n.position.z,d=Math.hypot(n.velocity.x,n.velocity.z)||20,u=Math.hypot(l,c);u>1&&(o={x:l/u*d,y:0,z:c/u*d}),r={x:n.position.x+o.x*t,y:0,z:n.position.z+o.z*t}}return{entity:n,position:r,radius:n.radius*s,active:i,velocity:o,growPhase:s}}function f0(n,t,e=.5,i){const s=[],r=Math.max(n.predictHorizon,.5),o=Math.max(2,Math.ceil(r/e));for(let a=0;a<=o;a++){const l=t+a*e;let c;n.motion==="intercept"&&i&&i.length>0&&(c=i[Math.min(i.length-1,Math.floor(a/2))]);const d=du(n,l,c);d.active&&s.push({x:d.position.x,y:(n.heightMin+n.heightMax)/2,z:d.position.z})}return s}function Sp(n,t,e){const i=[],s=[];for(const r of n.dynamics){if(!r.enabled)continue;const o=du(r,t,e);!o.active||o.radius<.5||(r.kind==="moving-obstacle"?i.push({position:{x:o.position.x,y:0,z:o.position.z},radius:o.radius,heightMin:r.heightMin,heightMax:r.heightMax,velocity:o.velocity,entityId:r.id}):s.push({id:r.id,kind:r.threatKind,name:r.name,position:{x:o.position.x,y:0,z:o.position.z},radius:o.radius,heightMin:r.heightMin,heightMax:r.heightMax,level:r.level,opacity:.24}))}return new hu(n.terrain,[...n.threats,...s],n.noflyZones,n.obstacles,i)}function fu(n,t,e,i,s=.35){if(t.length<3)return t.map(o=>({...o}));const r=t.map(o=>({...o}));for(let o=0;o<e;o++){const a=r.map(l=>({...l}));for(let l=1;l<r.length-1;l++){const c=a[l-1],d=a[l+1],u={x:r[l].x+s*((c.x+d.x)/2-r[l].x),y:r[l].y+s*((c.y+d.y)/2-r[l].y),z:r[l].z+s*((c.z+d.z)/2-r[l].z)};n.isSegmentFeasible(a[l-1],u,i)&&n.isSegmentFeasible(u,a[l+1],i)&&(r[l]=u)}}return r}function Oa(n,t,e,i=6,s=3){if(t.length<3)return t.map(l=>({...l}));const r=[t[0],...t,t[t.length-1]],o=l=>{const c=l*l,d=c*l;return[(1-3*l+3*c-d)/6,(4-6*c+3*d)/6,(1+3*l+3*c-3*d)/6,d/6]},a=[];for(let l=0;l<r.length-3;l++){const c=r[l],d=r[l+1],u=r[l+2],h=r[l+3];for(let g=0;g<i;g++){const _=g/i,m=o(_);a.push({x:m[0]*c.x+m[1]*d.x+m[2]*u.x+m[3]*h.x,y:m[0]*c.y+m[1]*d.y+m[2]*u.y+m[3]*h.y,z:m[0]*c.z+m[1]*d.z+m[2]*u.z+m[3]*h.z})}}a.push({...r[r.length-1]});for(let l=1;l<a.length;l++)if(!n.isSegmentFeasible(a[l-1],a[l],e))return fu(n,t,s,e);return a}function pu(n,t){if(n.length<2)return n.map(i=>({...i}));const e=[n[0]];for(let i=1;i<n.length;i++){const s=n[i-1],r=n[i],o=Re(s,r);if(o<1e-9)continue;const a=Math.max(1,Math.ceil(o/t));for(let l=1;l<=a;l++)e.push(o0(s,r,l/a))}return e}function p0(n,t,e){if(n.length<2)return[];const i=pu(n,Math.max(t.cellSize*.5,4)),s=l0(i),r=s[s.length-1],o=Math.min(Math.max((t.speedMin+t.speedMax)/2,t.speedMin),t.speedMax),a=Math.max(o*.5,4),l=o*o/(2*a),c=h=>{if(2*l>=r){const g=Math.sqrt(a*r);return h<r/2?Math.min(Math.sqrt(2*a*h),g):Math.min(Math.sqrt(2*a*(r-h)),g)}return h<l?Math.sqrt(2*a*h):h>r-l?Math.sqrt(2*a*(r-h)):o},d=[];let u=0;for(let h=0;h<i.length;h++){const g=s[h],_=Math.max(c(g),t.speedMin*.25);let m;if(h<i.length-1){const f=Re(i[h],i[h+1]),p=f>1e-9?_/f:0;m={x:(i[h+1].x-i[h].x)*p,y:(i[h+1].y-i[h].y)*p,z:(i[h+1].z-i[h].z)*p}}else{const f=Re(i[h-1],i[h]),p=f>1e-9?_/f:0;m={x:(i[h].x-i[h-1].x)*p,y:(i[h].y-i[h-1].y)*p,z:(i[h].z-i[h-1].z)*p}}if(d.push({position:i[h],velocity:m,speed:_,time:u,s:g}),h<i.length-1){const f=s[h+1]-g,p=(_+c(s[h+1]))/2;u+=f/Math.max(p,.5)}}return d}function bp(n){return a0(n)}function Ep(n,t,e,i=8,s=3){if(t.length<3)return t.map(c=>({...c}));const r=(c,d)=>({x:(c.x+d.x)/2,y:(c.y+d.y)/2,z:(c.z+d.z)/2}),o=(c,d,u,h,g)=>{const _=1-g,m=_*_*_,f=3*_*_*g,p=3*_*g*g,S=g*g*g;return{x:m*c.x+f*d.x+p*u.x+S*h.x,y:m*c.y+f*d.y+p*u.y+S*h.y,z:m*c.z+f*d.z+p*u.z+S*h.z}},a=[{...t[0]}];for(let c=1;c<t.length-2;c++){const d=r(t[c-1],t[c]),u=r(t[c],t[c+1]),h=t[c],g={x:t[c].x+(u.x-t[c].x)*.5,y:t[c].y+(u.y-t[c].y)*.5,z:t[c].z+(u.z-t[c].z)*.5};for(let _=1;_<=i;_++)a.push(o(d,h,g,u,_/i))}const l=t.slice(-3);if(l.length===3){const c=r(l[0],l[1]);for(let d=1;d<=i;d++){const u=d/i,h=1-u;a.push({x:h*h*c.x+2*h*u*l[1].x+u*u*l[2].x,y:h*h*c.y+2*h*u*l[1].y+u*u*l[2].y,z:h*h*c.z+2*h*u*l[1].z+u*u*l[2].z})}}else a.push({...t[t.length-1]});for(let c=1;c<a.length;c++)if(!n.isSegmentFeasible(a[c-1],a[c],e))return fu(n,t,s,e);return a}function m0(n,t,e,i=8){if(t.length<3)return t.map(a=>({...a}));const s=[t[0],...t,t[t.length-1]],r=(a,l,c,d,u)=>{const h=u*u,g=h*u,_=(m,f,p,S)=>.5*(2*f+(-m+p)*u+(2*m-5*f+4*p-S)*h+(-m+3*f-3*p+S)*g);return{x:_(a.x,l.x,c.x,d.x),y:_(a.y,l.y,c.y,d.y),z:_(a.z,l.z,c.z,d.z)}},o=[{...t[0]}];for(let a=0;a<s.length-3;a++)for(let l=1;l<=i;l++)o.push(r(s[a],s[a+1],s[a+2],s[a+3],l/i));for(let a=1;a<o.length;a++)if(!n.isSegmentFeasible(o[a-1],o[a],e))return Oa(n,t,e);return o}const sc=n=>{for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n},po=n=>{for(;n<0;)n+=Math.PI*2;for(;n>=Math.PI*2;)n-=Math.PI*2;return n};function g0(n,t,e,i){if(t.length<3)return t.map(l=>({...l}));const s=Math.max(i,8),r=(l,c,d)=>({x:l.x+Math.sin(c)*s,y:d,z:l.z+Math.cos(c)*s}),o=(l,c,d,u)=>{const h=d.x-l.x,g=d.z-l.z,_=Math.hypot(h,g);if(_<s*.5)return[{...l},{...d}];const m=_/s,f=Math.atan2(h,g),p=sc(c-f),S=sc(u-f),x=[[1,1,!0],[-1,-1,!0],[1,-1,!1],[-1,1,!1]];let M=null;for(const[R,C,w]of x){let D=0,U=0,y=0;if(w){const vt=R*p,St=C*S,Q=2+m*m-2*Math.cos(vt-St)+2*m*(Math.sin(vt)-Math.sin(St));if(Q<0)continue;U=Math.sqrt(Q);const ht=Math.atan2(Math.cos(St)-Math.cos(vt),m+Math.sin(vt)-Math.sin(St));D=R*po(-vt+ht),y=C*po(St-ht)}else{const vt=R*p,St=C*S,Q=m*m-2+2*Math.cos(vt-St)+2*m*(Math.sin(vt)+Math.sin(St));if(Q<0)continue;U=Math.sqrt(Q);const ht=Math.atan2(-Math.cos(vt)-Math.cos(St),m+Math.sin(vt)+Math.sin(St)),bt=po(-vt+ht-Math.asin(Math.min(1,2/Math.max(U,1e-6))));D=R*bt,y=C*po(St-ht+Math.asin(Math.min(1,2/Math.max(U,1e-6))))}if(D<-1e-6||U<-1e-6||y<-1e-6)continue;const E={x:l.x+Math.sin(c+R*Math.PI/2)*s,y:l.y,z:l.z+Math.cos(c+R*Math.PI/2)*s},X=c-R*Math.PI/2,O=c+R*D,W=Math.max(2,Math.ceil(Math.abs(D)*s/(s/4))),Y=[];for(let vt=0;vt<=W;vt++){const St=vt/W;Y.push(r(E,X+R*D*St,l.y))}const B=Y[Y.length-1],G=Math.max(2,Math.ceil(U/.5));for(let vt=1;vt<=G;vt++){const St=vt/G,Q=U*s*St;Y.push({x:B.x+Math.sin(O)*Q,y:l.y+(d.y-l.y)*St,z:B.z+Math.cos(O)*Q})}const $={x:d.x+Math.sin(u+C*Math.PI/2)*s,y:d.y,z:d.z+Math.cos(u+C*Math.PI/2)*s},ot=O-C*Math.PI/2,gt=Math.max(2,Math.ceil(Math.abs(y)*s/(s/4)));for(let vt=1;vt<=gt;vt++){const St=vt/gt,Q=ot+C*y*St;Y.push(r($,Q,l.y+(d.y-l.y)*St))}Y[Y.length-1]={...d};const rt=x0(Y);(!M||rt<M.len)&&(M={pts:Y,len:rt})}return M?M.pts:[]},a=[{...t[0]}];for(let l=1;l<t.length-1;l++){const c=t[l-1],d=t[l],u=t[l+1],h=Math.atan2(d.x-c.x,d.z-c.z),g=Math.atan2(u.x-d.x,u.z-d.z),_=o(c,h,d,g);_.length>=2?a.push(..._.slice(1)):a.push({...d})}a.push({...t[t.length-1]});for(let l=1;l<a.length;l++)if(!n.isSegmentFeasible(a[l-1],a[l],e))return Oa(n,t,e);return a}function _0(n,t,e,i){if(t.length<3)return t.map(a=>({...a}));const s=Math.max(i,8),r=[{...t[0]}],o=10;for(let a=1;a<t.length-1;a++){const l=t[a-1],c=t[a],d=t[a+1],u=Math.atan2(c.x-l.x,c.z-l.z),h=Math.atan2(d.x-c.x,d.z-c.z);let g=sc(h-u);const _=Math.abs(g);if(_<.02){r.push({...c});continue}const m=Math.min(Re(l,c)*.4,Re(c,d)*.4,s*Math.tan(Math.min(_/2,Math.PI/2-.05))+s*.4),f={x:c.x-Math.sin(u)*m,y:c.y,z:c.z-Math.cos(u)*m},p={x:c.x+Math.sin(h)*m,y:c.y,z:c.z+Math.cos(h)*m},S=c,x=[];for(let M=1;M<=o;M++){const R=M/o,C=1-R;x.push({x:C*C*f.x+2*C*R*S.x+R*R*p.x,y:c.y,z:C*C*f.z+2*C*R*S.z+R*R*p.z})}r.push(...x)}r.push({...t[t.length-1]});for(let a=1;a<r.length;a++)if(!n.isSegmentFeasible(r[a-1],r[a],e))return Ep(n,t,e);return r}function v0(n,t,e,i){const s=i.clearance,r=Math.max(i.dynamics.minTurnRadius,8);switch(n){case"bezier":return Ep(t,e,s);case"polynomial":return m0(t,e,s);case"dubins":return g0(t,e,s,r);case"clothoid":return _0(t,e,s,r)}}function x0(n){let t=0;for(let e=1;e<n.length;e++)t+=Re(n[e-1],n[e]);return t}function Tp(n,t,e,i,s){const r=i.x-e.x,o=i.y-e.y,a=i.z-e.z,l=Math.hypot(r,o,a),c=n.integrateField(e,i,g=>n.threatIntensity(g)),d=n.integrateField(e,i,g=>n.noflyPenalty(g)),u=n.integrateField(e,i,g=>Math.abs(g.y-s.cruiseAlt)/Math.max(s.cruiseAlt,1));let h=0;if(t){const g=e.x-t.x,_=e.y-t.y,m=e.z-t.z,f=Math.hypot(g,_,m);if(f>1e-6){const p=(g*r+_*o+m*a)/(f*l);h=1-Math.max(-1,Math.min(1,p))}}return{distance:l,threat:c,altitude:u,nofly:d,smooth:h}}function wp(n,t){return n.distance*t.distance+n.threat*t.threat+n.altitude*t.altitude+n.nofly*t.nofly+n.smooth*n.distance*t.smooth}function y0(){return{distance:0,threat:0,altitude:0,nofly:0,smooth:0}}function Ap(n,t,e,i){const s=y0();let r=0;for(let o=1;o<t.length;o++){const a=o>=2?t[o-2]:null,l=Tp(n,a,t[o-1],t[o],i);s.distance+=l.distance,s.threat+=l.threat,s.altitude+=l.altitude,s.nofly+=l.nofly,s.smooth+=l.smooth,r+=wp(l,e)}return{total:r,breakdown:{distance:s.distance*e.distance,threat:s.threat*e.threat,altitude:s.altitude*e.altitude,nofly:s.nofly*e.nofly,smooth:s.smooth*e.smooth}}}function M0(n,t,e,i){const s=[{distance:0,cumulative:0,point:t[0]}];let r=0,o=0;for(let a=1;a<t.length;a++){const l=a>=2?t[a-2]:null,c=Tp(n,l,t[a-1],t[a],i);r+=wp(c,e),o+=c.distance,s.push({distance:o,cumulative:r,point:t[a]})}return s}const Rp=new Map;function wi(n){Rp.set(n.type,n)}function ul(n){return Rp.get(n)}class Fa{constructor(t){Dt(this,"state");this.state=t|0||1}next(){let t=this.state;return t^=t<<13,t^=t>>>17,t^=t<<5,this.state=t|0,(t>>>0)%1e6/1e6}range(t,e){return t+this.next()*(e-t)}int(t,e){return Math.floor(this.range(t,e+1))}pick(t){return t[this.int(0,t.length-1)]}}function Zn(n,t,e){if(!n.isBlocked(t,e))return{...t};const i=n.groundHeight(t.x,t.z)+e+2;for(let s=Math.max(t.y,i);s<n.maxAltitude-10;s+=5)if(!n.isBlocked({x:t.x,y:s,z:t.z},e))return{x:t.x,y:s,z:t.z};return{...t}}function za(n,t,e){if(t.length<=2)return t.map(r=>({...r}));const i=[t[0]];let s=0;for(;s<t.length-1;){let r=t.length-1;for(;r>s+1&&!n.isSegmentFeasible(t[s],t[r],e);)r--;i.push({...t[r]}),s=r}return i}function mu(n,t,e,i=8){for(let s=1;s<t.length;s++)if(!n.isSegmentFeasible(t[s-1],t[s],e,i))return!1;return!0}function S0(n,t,e,i=12){let s=0;for(let r=1;r<t.length;r++)n.isSegmentFeasible(t[r-1],t[r],e,i)||s++;return s}function b0(n,t,e){let i=0,s=0,r=0,o=0;for(let a=1;a<t.length;a++){const l=t[a-1],c=t[a],d=Math.hypot(c.x-l.x,c.y-l.y,c.z-l.z);if(i+=d,s+=(n.threatIntensity(l)+n.threatIntensity(c))/2*d,r+=(Math.abs(l.y-e.cruiseAlt)+Math.abs(c.y-e.cruiseAlt))/2/Math.max(e.cruiseAlt,1)*d,a>=2){const u=t[a-2],h=Math.hypot(l.x-u.x,l.y-u.y,l.z-u.z);if(h>1e-6){const g=((l.x-u.x)*(c.x-l.x)+(l.y-u.y)*(c.y-l.y)+(l.z-u.z)*(c.z-l.z))/(h*d);o+=1-Math.max(-1,Math.min(1,g))}}}return{distance:i,threat:s,altitude:r,smooth:o}}function as(n,t,e,i){const s=b0(n,t,e),r=S0(n,t,e.clearance);return s.distance*i.distance+s.threat*i.threat+s.altitude*i.altitude+s.smooth*i.smooth*20+r*5e4}class E0{constructor(){Dt(this,"keys",[]);Dt(this,"vals",[])}get size(){return this.keys.length}push(t,e){this.keys.push(t),this.vals.push(e);let i=this.keys.length-1;for(;i>0;){const s=i-1>>1;if(this.vals[s]<=this.vals[i])break;this.swap(i,s),i=s}}pop(){const t=this.keys[0],e=this.vals[0],i=this.keys.pop(),s=this.vals.pop();if(this.keys.length>0){this.keys[0]=i,this.vals[0]=s;let r=0;const o=this.keys.length;for(;;){const a=r*2+1,l=a+1;let c=r;if(a<o&&this.vals[a]<this.vals[c]&&(c=a),l<o&&this.vals[l]<this.vals[c]&&(c=l),c===r)break;this.swap(r,c),r=c}}return{key:t,val:e}}swap(t,e){[this.keys[t],this.keys[e]]=[this.keys[e],this.keys[t]],[this.vals[t],this.vals[e]]=[this.vals[e],this.vals[t]]}}class T0{constructor(t,e,i){Dt(this,"env");Dt(this,"params");Dt(this,"weights");Dt(this,"inflatedClearance");Dt(this,"dims");Dt(this,"visited");Dt(this,"gScore");Dt(this,"cameFrom");Dt(this,"threatCache");Dt(this,"noflyCache");Dt(this,"offsets",[]);this.env=t,this.params=e,this.weights=i;const s=t.terrain.params.size,r=Math.floor(s/e.cellSize)+1,o=r,a=Math.floor(t.maxAltitude/e.heightCell)+1,l=r*a*o;if(l>4e6)throw new Error("体素数量过大，请增大栅格分辨率（cellSize / heightCell）");this.dims={nx:r,ny:a,nz:o,ox:-s/2,oz:-s/2,count:l};const c=Math.hypot(e.cellSize,e.cellSize,e.heightCell)/2;this.inflatedClearance=e.clearance+c,this.visited=new Uint8Array(l),this.gScore=new Map,this.cameFrom=new Map,this.threatCache=new Float32Array(l).fill(-1),this.noflyCache=new Float32Array(l).fill(-1),this.buildOffsets()}buildOffsets(){for(let e=-1;e<=1;e++)for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)e===0&&i===0&&s===0||this.offsets.push({dx:e,dy:i,dz:s});const t=wn(Math.round(this.params.maxStep),1,3);if(t>=2){const e=t>=3?[-3,-2,2,3]:[-2,2];for(const i of e)for(const s of e)for(const r of e)Math.abs(i)<=1&&Math.abs(s)<=1&&Math.abs(r)<=1||this.offsets.push({dx:i,dy:s,dz:r})}}idx(t,e,i){const{nx:s,nz:r}=this.dims;return t+s*(i+r*e)}toWorld(t,e,i){const{ox:s,oz:r}=this.dims;return{x:s+t*this.params.cellSize,y:e*this.params.heightCell,z:r+i*this.params.cellSize}}toGrid(t){const{ox:e,oz:i}=this.dims;return{ix:wn(Math.round((t.x-e)/this.params.cellSize),0,this.dims.nx-1),iy:wn(Math.round(t.y/this.params.heightCell),0,this.dims.ny-1),iz:wn(Math.round((t.z-i)/this.params.cellSize),0,this.dims.nz-1)}}threatAt(t,e){let i=this.threatCache[t];return i<0&&(i=this.env.threatIntensity(e),this.threatCache[t]=i),i}noflyAt(t,e){let i=this.noflyCache[t];return i<0&&(i=this.env.noflyPenalty(e),this.noflyCache[t]=i),i}isFree(t,e){return this.visited[t]===0&&(this.visited[t]=this.env.isBlocked(e,this.inflatedClearance)?2:1),this.visited[t]===1}nearestFree(t){const e=this.toGrid(t),{nx:i,ny:s,nz:r}=this.dims;for(let o=0;o<=4;o++){let a=-1,l=1/0;for(let c=-o;c<=o;c++)for(let d=-o;d<=o;d++)for(let u=-o;u<=o;u++){if(Math.max(Math.abs(c),Math.abs(d),Math.abs(u))!==o)continue;const h=e.ix+c,g=e.iy+d,_=e.iz+u;if(h<0||g<0||_<0||h>=i||g>=s||_>=r)continue;const m=this.idx(h,g,_),f=this.toWorld(h,g,_);if(!this.isFree(m,f))continue;const p=(f.x-t.x)**2+(f.y-t.y)**2+(f.z-t.z)**2;p<l&&(l=p,a=m)}if(a>=0)return a}return-1}heuristic(t,e){return this.params.algo==="dijkstra"?0:Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z)*this.params.heuristicWeight*this.weights.distance}edgeCost(t,e,i,s,r){const o=Math.hypot(r.x-s.x,r.y-s.y,r.z-s.z),a=this.weights,l=(this.threatAt(e,s)+this.threatAt(i,r))/2*o,c=(this.noflyAt(e,s)+this.noflyAt(i,r))/2*o,d=(Math.abs(s.y-this.params.cruiseAlt)+Math.abs(r.y-this.params.cruiseAlt))/2/Math.max(this.params.cruiseAlt,1)*o;let u=0;const h=this.cameFrom.get(e)??t;if(h>=0){const g=this.idxToPos(h);if(g){const _=s.x-g.x,m=s.y-g.y,f=s.z-g.z,p=Math.hypot(_,m,f);if(p>1e-6){const S=(_*(r.x-s.x)+m*(r.y-s.y)+f*(r.z-s.z))/(p*o);u=1-Math.max(-1,Math.min(1,S))}}}return o*a.distance+l*a.threat+d*a.altitude+c*a.nofly+u*o*a.smooth}idxToPos(t){const{nx:e,ny:i,nz:s}=this.dims,r=t%e;let o=t/e|0;const a=o%s;o=o/s|0;const l=o%i;return l>=i?null:this.toWorld(r,l,a)}edgeClear(t,e){const i=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z),s=Math.min(this.params.cellSize,this.params.heightCell);let r=Math.max(0,Math.ceil(i/s)-1);if(r===0&&i>s*.8&&(r=1),r<=0)return!0;for(let o=1;o<=r;o++){const a=o/(r+1),l={x:t.x+(e.x-t.x)*a,y:t.y+(e.y-t.y)*a,z:t.z+(e.z-t.z)*a},c=this.toGrid(l),d=this.idx(c.ix,c.iy,c.iz);if(!this.isFree(d,this.toWorld(c.ix,c.iy,c.iz)))return!1}return!0}plan(t,e){const i=this.nearestFree(t),s=this.nearestFree(e);if(i<0)return{success:!1,path:[],expandedNodes:0,message:"起点附近无可行栅格（可能位于地形/禁飞区内）"};if(s<0)return{success:!1,path:[],expandedNodes:0,message:"终点附近无可行栅格（可能位于地形/禁飞区内）"};const r=new E0;this.gScore.set(i,0);const o=this.idxToPos(i),a=this.idxToPos(s);r.push(i,this.heuristic(o,a));const{nx:l,ny:c,nz:d}=this.dims;let u=0;const h=new Uint8Array(this.dims.count);for(;r.size>0;){const{key:g}=r.pop();if(h[g])continue;if(h[g]=1,u++,u>this.params.maxNodes)return{success:!1,path:[],expandedNodes:u,message:"达到最大扩展节点数，未找到路径"};if(g===s)return{success:!0,path:this.reconstruct(s),expandedNodes:u,message:"规划成功"};const _=this.idxToPos(g),m=this.gScore.get(g),f=g%l;let p=g/l|0;const S=p%d,x=p/d|0;for(const M of this.offsets){const R=f+M.dx,C=x+M.dy,w=S+M.dz;if(R<0||C<0||w<0||R>=l||C>=c||w>=d)continue;const D=this.idx(R,C,w);if(h[D])continue;const U=this.toWorld(R,C,w);if(!this.isFree(D,U)||!this.edgeClear(_,U))continue;const y=this.edgeCost(-1,g,D,_,U),E=m+y;E<(this.gScore.get(D)??1/0)&&(this.cameFrom.set(D,g),this.gScore.set(D,E),r.push(D,E+this.heuristic(U,a)))}}return{success:!1,path:[],expandedNodes:u,message:"开放列表耗尽：目标不可达（可能被地形/禁飞区完全封闭）"}}reconstruct(t){const e=[];let i=t;for(;i!==void 0;)e.push(this.idxToPos(i)),i=this.cameFrom.get(i);return e.reverse(),e}}function Cp(n,t){return{type:n,label:t,plan(e,i,s){const r={...s.params,algo:n};return{...new T0(s.env,r,s.weights).plan(e,i),algo:n}}}}const w0=Cp("astar","A* 三维搜索"),A0=Cp("dijkstra","Dijkstra");function Pp(n){return{type:n.type,label:n.label,plan(t,e,i){var X;const{env:s,params:r}=i,o=r.advanced,a=new Fa(o.seed+(n.star?17:3)),c=s.terrain.params.size/2,d=r.clearance,u=o.rrtStep,h=o.rrtMaxNodes,g=Zn(s,t,d),_=Zn(s,e,d),m=[{p:g,parent:-1,cost:0}];let f=-1,p=0;const S=r.dynamics.enabled?r.dynamics.maxTurnAngle*Math.PI/180:Math.PI,x=O=>{let W=0,Y=1/0;for(let B=0;B<m.length;B++){const G=Oh(m[B].p,O);G<Y&&(Y=G,W=B)}return W},M=(O,W)=>{const Y=Math.hypot(W.x-O.x,W.y-O.y,W.z-O.z);if(Y<=u)return{...W};const B=u/Y;return{x:O.x+(W.x-O.x)*B,y:O.y+(W.y-O.y)*B,z:O.z+(W.z-O.z)*B}};let R=!1;const C=()=>{if(a.next()<o.goalBias)return R=!0,{..._};R=!1;const O=a.range(-c,c),W=a.range(-c,c),Y=s.groundHeight(O,W)+d+5,B=Math.max(Y,Math.min(s.maxAltitude-20,r.cruiseAlt+a.range(-90,90)));return{x:O,y:B,z:W}},w=(O,W,Y)=>{if(!r.dynamics.enabled||O<0||R)return!0;const B=m[O].p,G=Math.atan2(W.x-B.x,W.z-B.z);let ot=Math.atan2(Y.x-W.x,Y.z-W.z)-G;for(;ot>Math.PI;)ot-=Math.PI*2;for(;ot<-Math.PI;)ot+=Math.PI*2;return Math.abs(ot)<=S},D=(O,W)=>{const Y=W*W,B=[];for(let G=0;G<m.length;G++)Oh(m[G].p,O)<=Y&&B.push(G);return B};for(let O=0;O<h;O++){const W=C(),Y=x(W),B=m[Y],G=M(B.p,W);if(p++,s.isBlocked(G,d)||!s.isSegmentFeasible(B.p,G,d)||!w(Y,B.p,G))continue;let $=Y,ot=B.cost+gr(B.p,G);if(n.star){const rt=D(G,o.rrtStarRadius);for(const vt of rt){const St=m[vt],Q=St.cost+gr(St.p,G);Q<ot&&s.isSegmentFeasible(St.p,G,d)&&w(vt,St.p,G)&&(ot=Q,$=vt)}}const gt=m.length;if(m.push({p:G,parent:$,cost:ot}),n.star){const rt=D(G,o.rrtStarRadius);for(const vt of rt){if(vt===$)continue;const St=m[vt],Q=ot+gr(G,St.p);Q<St.cost&&s.isSegmentFeasible(G,St.p,d)&&w(gt,G,St.p)&&(St.parent=gt,St.cost=Q)}}if(gr(G,_)<=u*1.2&&s.isSegmentFeasible(G,_,d)){const rt=ot+gr(G,_);if((f<0||rt<((X=m[f])==null?void 0:X.cost))&&(m.push({p:{..._},parent:gt,cost:rt}),f=m.length-1),!n.star)break}}if(f<0)return Nh(n.type,p,"RRT 未在节点上限内到达目标");const U=[];let y=f;for(;y!==void 0;)U.push(m[y].p),y=m[y].parent>=0?m[y].parent:void 0;U.reverse();const E=za(s,U,d);return mu(s,E,d)?P0(n.type,E,p):Nh(n.type,p,"RRT 简化后复核发现碰撞")}}}const R0=Pp({type:"rrt",label:"RRT",star:!1}),C0=Pp({type:"rrtstar",label:"RRT*",star:!0});function Nh(n,t,e){return{success:!1,path:[],expandedNodes:t,message:e,algo:n}}function P0(n,t,e){return{success:!0,path:t,expandedNodes:e,message:"规划成功",algo:n}}function gr(n,t){return Math.hypot(n.x-t.x,n.y-t.y,n.z-t.z)}function Oh(n,t){const e=n.x-t.x,i=n.y-t.y,s=n.z-t.z;return e*e+i*i+s*s}class I0{constructor(t){Dt(this,"ids",[]);this.f=t}get size(){return this.ids.length}push(t){this.ids.push(t);let e=this.ids.length-1;for(;e>0;){const i=e-1>>1;if(this.f(this.ids[i])<=this.f(this.ids[e]))break;[this.ids[e],this.ids[i]]=[this.ids[i],this.ids[e]],e=i}}pop(){const t=this.ids[0],e=this.ids.pop();if(this.ids.length>0){this.ids[0]=e;let i=0;const s=this.ids.length;for(;;){const r=i*2+1,o=r+1;let a=i;if(r<s&&this.f(this.ids[r])<this.f(this.ids[a])&&(a=r),o<s&&this.f(this.ids[o])<this.f(this.ids[a])&&(a=o),a===i)break;[this.ids[i],this.ids[a]]=[this.ids[a],this.ids[i]],i=a}}return t}}const D0={type:"hybridastar",label:"Hybrid A*",plan(n,t,e){const{env:i,params:s,weights:r}=e,o=s.advanced,a=s.clearance,l=Math.max(s.cellSize,10),c=Math.max(s.heightCell,10),d=Math.max(8,o.headingDiscretization),u=Math.max(o.hybridStep,l*.8),h=Math.min(s.maxNodes,26e4),g=Zn(i,n,a),_=Zn(i,t,a),m=Math.atan2(_.x-g.x,_.z-g.z),f=[{p:g,h:m,parent:-1,g:0}],p=new Map,S=new Set,x=(ot,gt)=>{const rt=Math.round(ot.x/l),vt=Math.round(ot.y/c),St=Math.round(ot.z/l);let Q=Math.round(gt/(Math.PI*2)*d)%d;return Q<0&&(Q+=d),`${rt},${vt},${St},${Q}`},M=x(g,m);p.set(M,0);const R=ot=>Math.hypot(ot.x-_.x,ot.y-_.y,ot.z-_.z)*s.heuristicWeight*r.distance,C=new I0(ot=>f[ot].g+R(f[ot].p));C.push(0);let w=0,D=-1;const U=s.dynamics.enabled?s.dynamics.maxTurnAngle*Math.PI/180:Math.PI/3,y=s.dynamics.enabled?Math.max(s.dynamics.minTurnRadius,u):u,E=s.dynamics.enabled?s.dynamics.maxClimbAngle*Math.PI/180:Math.PI/4,X=Math.min(U,u/y),O=Math.min(E,Math.PI/6),W=(ot,gt,rt)=>{const vt=ot.h+gt*X,St=rt*O,Q=Math.cos(St),ht={x:ot.p.x+Math.sin(vt)*u*Q,y:ot.p.y+Math.sin(St)*u,z:ot.p.z+Math.cos(vt)*u*Q},bt=!i.isBlocked(ht,a)&&i.isSegmentFeasible(ot.p,ht,a,Math.min(l*.6,10));return{p:ht,h:vt,ok:bt}};for(;C.size>0&&D<0;){const ot=C.pop();if(S.has(ot))continue;const gt=f[ot];if(S.add(ot),w++,w>h)break;if(Fh(gt.p,_)<=u*1.2){D=ot;break}for(const rt of[-1,0,1])for(const vt of[-1,0,1]){if(f.length>=h)break;const{p:St,h:Q,ok:ht}=W(gt,rt,vt);if(!ht)continue;const bt=x(St,Q),Et=gt.g+Fh(gt.p,St),Wt=p.get(bt);if(Wt!==void 0&&(S.has(Wt)||f[Wt].g<=Et))continue;const kt=f.length;f.push({p:St,h:Q,parent:ot,g:Et}),p.set(bt,kt),C.push(kt)}}if(D<0)return{success:!1,path:[],expandedNodes:w,message:"Hybrid A* 未在节点上限内到达目标",algo:"hybridastar"};const Y=[];let B=D;for(;B>=0;)Y.push(f[B].p),B=f[B].parent;Y.reverse();const G=za(i,Y,a);return{success:!0,path:mu(i,G,a)?G:Y,expandedNodes:w,message:"规划成功",algo:"hybridastar"}}};function Fh(n,t){return Math.hypot(n.x-t.x,n.y-t.y,n.z-t.z)}function gu(n,t,e){const{env:i,params:s}=n,r=s.clearance,o=e.x-t.x,a=e.z-t.z,l=Math.hypot(o,a);if(l<1)return null;const c=o/l,u=-(a/l),h=c,g=Math.max(s.cellSize*1.6,28),_=Math.max(4,Math.min(14,Math.floor(l/g)+1)),m=5,f=3,p=Math.max(s.cellSize*1.4,26),S=Math.max(s.heightCell*1.2,18),x=[[{...t}]];for(let R=1;R<_-1;R++){const C=R/(_-1),w=t.x+o*C,D=t.z+a*C,U=t.y+(e.y-t.y)*C,y=[];for(let E=0;E<m;E++)for(let X=0;X<f;X++){const O=(E-(m-1)/2)*p,W=(X-(f-1)/2)*S,Y={x:w+u*O,y:Math.max(i.groundHeight(w+u*O,D+h*O)+r+3,Math.min(i.maxAltitude-10,U+W)),z:D+h*O};i.isBlocked(Y,r)||y.push(Y)}if(y.length===0)return null;x.push(y)}x.push([{...e}]);const M=[];for(let R=0;R<x.length-1;R++)for(let C=0;C<x[R].length;C++){const w=[];for(let D=0;D<x[R+1].length;D++)i.isSegmentFeasible(x[R][C],x[R+1][D],r)&&w.push(D);M[R*64+C]=w}return{layers:x,adj:M,layerCount:x.length}}function Br(n,t,e){return n.adj[t*64+e]??[]}function nr(n,t){return t.map((e,i)=>({...n.layers[i][e]}))}function _u(n,t,e,i){if(t.length<2)return{success:!1,path:[],expandedNodes:i,message:"走廊图无可行序列",algo:e};const s=za(n.env,t,n.params.clearance);return mu(n.env,s,n.params.clearance)?{success:!0,path:s,expandedNodes:i,message:"规划成功",algo:e}:{success:!1,path:[],expandedNodes:i,message:"候选路径复核碰撞",algo:e}}const L0={type:"aco",label:"蚁群算法",plan(n,t,e){const i=gu(e,Zn(e.env,n,e.params.clearance),Zn(e.env,t,e.params.clearance));if(!i)return{success:!1,path:[],expandedNodes:0,message:"走廊构建失败",algo:"aco"};const{env:s,params:r,weights:o}=e,a=r.advanced,l=new Fa(a.seed+101);let c=0;const d=1,u=new Map,h=(f,p,S)=>u.get(`${f}:${p}->${S}`)??d,g=(f,p)=>{const S=Math.hypot(p.x-f.x,p.y-f.y,p.z-f.z),x=(s.threatIntensity(f)+s.threatIntensity(p))/2*S;return Math.max(1,S*o.distance+x*o.threat)};let _=null,m=1/0;for(let f=0;f<a.acoIterations;f++){const p=[];for(let S=0;S<a.acoAnts;S++){const x=[0];let M=!0;for(let w=0;w<i.layerCount-1;w++){const D=x[w],U=Br(i,w,D);if(c++,U.length===0){M=!1;break}const y=U.map(W=>{const Y=1/g(i.layers[w][D],i.layers[w+1][W]);return Math.pow(h(w,D,W),a.acoAlpha)*Math.pow(Y,a.acoBeta)}),E=y.reduce((W,Y)=>W+Y,0);let X=l.next()*E,O=U[0];for(let W=0;W<U.length;W++)if(X-=y[W],X<=0){O=U[W];break}x.push(O)}if(!M||x.length!==i.layerCount)continue;const R=nr(i,x),C=as(s,R,r,o);p.push({seq:x,score:C}),C<m&&(m=C,_=x)}for(const[S,x]of u)u.set(S,x*(1-a.acoRho));for(const S of p){const x=a.acoQ/Math.max(S.score,1);for(let M=0;M<S.seq.length-1;M++){const R=`${M}:${S.seq[M]}->${S.seq[M+1]}`;u.set(R,(u.get(R)??d)+x)}}}return _?_u(e,nr(i,_),"aco",c):{success:!1,path:[],expandedNodes:c,message:"蚁群未找到可行序列",algo:"aco"}}},U0={type:"pso",label:"粒子群算法",plan(n,t,e){const i=gu(e,Zn(e.env,n,e.params.clearance),Zn(e.env,t,e.params.clearance));if(!i)return{success:!1,path:[],expandedNodes:0,message:"走廊构建失败",algo:"pso"};const{env:s,params:r,weights:o}=e,a=r.advanced,l=new Fa(a.seed+202),c=i.layerCount,d=c,u=x=>i.layers[x].length,h=x=>Array.from({length:d},()=>l.range(-x,x)),g=[];let _=[],m=1/0,f=0;const p=(x,M)=>{for(let R=0;R<c;R++)R===0||R===c-1?M[R]=0:M[R]=Math.max(0,Math.min(u(R)-1,Math.round(x[R])));return M},S=x=>{for(let M=0;M<c-1;M++)if(!Br(i,M,x[M]).includes(x[M+1]))return 1e9;return f++,as(s,nr(i,x),r,o)};for(let x=0;x<a.psoParticles;x++){const M=[];for(let C=0;C<c;C++)M.push(C===0||C===c-1?0:l.int(0,u(C)-1));const R={x:M,v:h(1),best:[...M],bestScore:S(M)};g.push(R),R.bestScore<m&&(m=R.bestScore,_=[...R.best])}for(let x=0;x<a.psoIterations;x++)for(const M of g){for(let w=1;w<c-1;w++){const D=l.next(),U=l.next();M.v[w]=a.psoInertia*M.v[w]+a.psoCognitive*D*(M.best[w]-M.x[w])+a.psoSocial*U*(_[w]-M.x[w]),M.v[w]=Math.max(-2,Math.min(2,M.v[w])),M.x[w]+=M.v[w]}const R=p(M.x,new Array(c)),C=S(R);M.x=[...R],C<M.bestScore&&(M.bestScore=C,M.best=[...R]),C<m&&(m=C,_=[...R])}return!isFinite(m)||m>=1e9?{success:!1,path:[],expandedNodes:f,message:"粒子群未收敛到可行序列",algo:"pso"}:_u(e,nr(i,_),"pso",f)}},N0={type:"ga",label:"遗传算法",plan(n,t,e){const i=gu(e,Zn(e.env,n,e.params.clearance),Zn(e.env,t,e.params.clearance));if(!i)return{success:!1,path:[],expandedNodes:0,message:"走廊构建失败",algo:"ga"};const{env:s,params:r,weights:o}=e,a=r.advanced,l=new Fa(a.seed+303),c=i.layerCount;let d=0;const u=M=>i.layers[M].length,h=()=>{const M=[0];for(let R=1;R<c-1;R++)M.push(l.int(0,u(R)-1));return M.push(0),M},g=M=>{for(let R=0;R<c-1;R++)if(!Br(i,R,M[R]).includes(M[R+1]))return!1;return!0},_=M=>g(M)?(d++,1/(1+as(s,nr(i,M),r,o)/1e3)):0;let m=[],f=0;for(;m.length<a.gaPopulation&&f<a.gaPopulation*40;){const M=h();(g(M)||l.next()<.2)&&m.push(M),f++}if(m.length<4)return{success:!1,path:[],expandedNodes:d,message:"遗传算法初始种群无可通行路径",algo:"ga"};let p=m[0],S=_(p);for(const M of m){const R=_(M);R>S&&(S=R,p=M)}const x=(M,R)=>{const C=l.int(0,M.length-1),w=l.int(0,M.length-1);return R[C]>=R[w]?M[C]:M[w]};for(let M=0;M<a.gaIterations;M++){const R=m.map(_),C=[[...p]];for(;C.length<a.gaPopulation;){const w=x(m,R),D=x(m,R),U=l.int(1,c-2),y=[...w.slice(0,U),...D.slice(U)];for(let E=1;E<c-1;E++)if(l.next()<a.gaMutation){const X=[];for(let O=0;O<u(E);O++)Br(i,E-1,y[E-1]).includes(O)&&Br(i,E,O).includes(y[E+1])&&X.push(O);X.length>0&&(y[E]=l.pick(X))}y[0]=0,y[c-1]=0,C.push(y)}m=C;for(const w of m){const D=_(w);D>S&&(S=D,p=w)}}return g(p)?_u(e,nr(i,p),"ga",d):{success:!1,path:[],expandedNodes:d,message:"遗传算法未产生可行路径",algo:"ga"}}};let zh=!1;function O0(){zh||(wi(w0),wi(A0),wi(R0),wi(C0),wi(D0),wi(L0),wi(U0),wi(N0),zh=!0)}const fs={astar:"A*",dijkstra:"Dijkstra",rrt:"RRT",rrtstar:"RRT*",hybridastar:"Hybrid A*",aco:"蚁群算法",pso:"粒子群算法",ga:"遗传算法"},F0=["astar","dijkstra"];function Bh(n){return F0.includes(n)}function ca(n,t,e,i,s){O0();const r={env:n,params:i,weights:s,seed:i.advanced.seed},o=ul(i.algo);if(!o)return ul("astar").plan(t,e,r);const a=o.plan(t,e,r);if(!a.success&&i.advanced.fallbackToAstar&&i.algo!=="astar"){const c=ul("astar").plan(t,e,{...r,params:{...i,algo:"astar"}});if(c.success)return{...c,algo:"astar",message:`${o.label}未成功，已回退 A*：${a.message}`}}return a}const Ys=Math.PI/180;function z0(){return{turn:0,climb:0,step:0,radius:0,attitude:0,collision:0}}function ir(n,t){return Math.atan2(t.x-n.x,t.z-n.z)}function qr(n,t){let e=n-t;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}function rc(n,t){const e=Math.hypot(t.x-n.x,t.z-n.z);return Math.atan2(t.y-n.y,Math.max(e,1e-6))}function B0(n,t,e,i=8){const s=t.dynamics,r=[],o=z0();let a=Math.max(0,n.length-1),l=new Set;const c=u=>{r.push(u),o[u.type]++,l.add(u.pointIndex)};for(let u=0;u<n.length-1;u++){const h=n[u],g=n[u+1],_=Re(h,g);s.enabled&&_<s.minStepLength-1e-6&&u<n.length-1&&c({type:"step",pointIndex:u,point:h,actual:_,limit:s.minStepLength,message:`航段长度 ${_.toFixed(1)}m 小于最小步长 ${s.minStepLength}m`});const m=Math.abs(rc(h,g))/Ys;if(s.enabled&&m>s.maxClimbAngle+1e-6&&c({type:"climb",pointIndex:u,point:g,actual:m,limit:s.maxClimbAngle,message:`爬升角 ${m.toFixed(1)}° 超过限值 ${s.maxClimbAngle}°`}),s.enabled&&u>=1){const f=ir(n[u-1],h),p=ir(h,g),S=Math.abs(qr(p,f))/Ys;if(S>s.maxTurnAngle+1e-6&&c({type:"turn",pointIndex:u,point:h,actual:S,limit:s.maxTurnAngle,message:`转弯角 ${S.toFixed(1)}° 超过限值 ${s.maxTurnAngle}°`}),S>s.maxAttitudeChange+1e-6&&c({type:"attitude",pointIndex:u,point:h,actual:S,limit:s.maxAttitudeChange,message:`姿态变化 ${S.toFixed(1)}° 超过限值 ${s.maxAttitudeChange}°`}),S>.5){const x=S*Ys,M=_/(2*Math.sin(Math.min(x/2,Math.PI/2-.01)));M<s.minTurnRadius-1e-6&&c({type:"radius",pointIndex:u,point:h,actual:M,limit:s.minTurnRadius,message:`转弯半径 ${M.toFixed(1)}m 小于最小转弯半径 ${s.minTurnRadius}m`})}}if(e){const f=Math.max(1,Math.ceil(_/i));for(let p=0;p<=f;p++){const S=p/f,x={x:h.x+(g.x-h.x)*S,y:h.y+(g.y-h.y)*S,z:h.z+(g.z-h.z)*S};if(e.isBlocked(x,t.clearance)){c({type:"collision",pointIndex:u,point:x,actual:0,limit:t.clearance,message:"航迹侵入障碍/地形安全裕度"});break}}}}const d=Math.max(0,a-l.size);return{violations:r,segments:a,satisfaction:a>0?d/a:1,counts:o}}function k0(n,t,e){if(!e.dynamics.enabled||t.length<3)return t.map(l=>({...l}));const i=e.dynamics;let s=t.map(l=>({...l}));const r=[s[0]];for(let l=1;l<s.length-1;l++)Re(r[r.length-1],s[l])>=i.minStepLength&&r.push(s[l]);r.push(s[s.length-1]),s=r;const o=i.maxTurnAngle*Ys,a=i.maxClimbAngle*Ys;for(let l=0;l<3;l++){const c=[s[0]];let d=!1;for(let u=1;u<s.length-1;u++){const h=c[c.length-1],g=s[u],_=s[u+1],m=ir(h,g),f=ir(g,_),p=Math.abs(qr(f,m)),S=Math.abs(rc(h,g)),x=Math.abs(rc(g,_));if(p>o||S>a||x>a){const R=m+qr(f,m)/2,C=Math.max(i.minTurnRadius*.6,Re(g,h)*.5),w={x:g.x+Math.sin(R)*C*.5,y:(h.y+_.y)/2,z:g.z+Math.cos(R)*C*.5},D={x:w.x,y:w.y+8,z:w.z},U=n.isSegmentFeasible(h,w,e.clearance)&&n.isSegmentFeasible(w,_,e.clearance)?w:D;n.isSegmentFeasible(h,U,e.clearance)&&n.isSegmentFeasible(U,_,e.clearance)&&(c.push(U),d=!0)}c.push(g)}if(c.push(s[s.length-1]),s=c,!d)break}return s}function V0(n,t,e){const i=Re(n,t),s=Re(t,e),r=Re(n,e),o=i*s*r;if(o<1e-9)return 0;const a=t.x-n.x,l=t.y-n.y,c=t.z-n.z,d=e.x-n.x,u=e.y-n.y,h=e.z-n.z,g=l*h-c*u,_=c*d-a*h,m=a*u-l*d;return 4*(Math.hypot(g,_,m)/2)/o}function kh(n,t){const e=n.length;let i=0,s=0,r=0,o=0,a=0;for(let u=1;u<e;u++)i+=Re(n[u-1],n[u]);for(let u=1;u<e-1;u++){const h=V0(n[u-1],n[u],n[u+1]);if(Number.isFinite(h)){s=Math.max(s,h),r+=h,o++;const g=Math.abs(qr(ir(n[u-1],n[u]),ir(n[u],n[u+1])))/Ys;a=Math.max(a,g)}}let l=0,c=0,d=0;if(t&&e>=3){const u=t.speedMax,h=t.speedMin,g=Math.max(t.dynamics.maxAccel,4);let _=0,m=0;for(let f=0;f<e;f++){const p=i*f/(e-1);let S;const x=u*u/(2*g);if(2*x<i)p<x?S=Math.sqrt(2*g*p):p>i-x?S=Math.sqrt(2*g*(i-p)):S=u;else{const M=Math.sqrt(g*i);S=p<i/2?Math.min(Math.sqrt(2*g*p),M):Math.min(Math.sqrt(2*g*(i-p)),M)}if(S=Math.max(S,h*.25),d+=S,f>0){const R=Re(n[f-1],n[f])/Math.max((S+_)/2,.5),C=R>1e-6?(S-_)/R:0;if(l=Math.max(l,Math.abs(C)),f>1){const w=R>1e-6?(C-m)/R:0;c=Math.max(c,Math.abs(w))}m=C}_=S}d/=e}return{length:i,maxCurvature:s,avgCurvature:o>0?r/o:0,maxTurnAngle:a,maxAccel:l,maxJerk:c,avgSpeed:d}}function H0(n,t){let i=t.y-n.groundHeight(t.x,t.z);for(const s of n.obstacles){const r=Math.max(Math.abs(t.x-s.position.x)-s.size.x/2,0),o=Math.max(Math.abs(t.z-s.position.z)-s.size.z/2,0),a=Math.max(s.position.y-t.y,0,t.y-(s.position.y+s.height));i=Math.min(i,Math.hypot(r,o,a))}for(const s of n.noflyZones){if(!s.hardBlock)continue;const r=Math.hypot(t.x-s.position.x,t.z-s.position.z),o=Math.max(r-s.radius,0),a=Math.max(s.heightMin-t.y,0,t.y-s.heightMax);i=Math.min(i,Math.hypot(o,a))}return i=Math.min(i,n.movingClearance(t).distance),i}function G0(n,t,e){const i=H0(n,t);return Number.isFinite(i)?Math.max(0,Math.min(1,i/Math.max(e*2,1))):1}const W0=.15;function X0(n){return[...n].sort((t,e)=>{const i=s=>s==="start"?0:s==="end"?2:1;return i(t.role)-i(e.role)})}function $0(n,t,e,i){switch(i){case"polyline":return fu(n,t,e.smoothIterations,e.clearance);case"bspline":return Oa(n,t,e.clearance);case"bezier":case"polynomial":case"dubins":case"clothoid":return v0(i,n,t,e);case"none":default:return t}}function j0(n,t,e,i,s){const r=X0(t);return q0(n,r,e,i,s)}function Y0(n,t,e,i,s){const r=new Map;for(const a of t){const l=a.uavId??"uav-1";r.has(l)||r.set(l,[]),r.get(l).push(a)}const o={};for(const[a,l]of r)o[a]=j0(n,l,e,i,s);return o}function q0(n,t,e,i,s){const r=performance.now();if(t.length<2)return J0("至少需要起点和终点",0);let o=0;const a=[],l=[];let c=!0,d="规划成功",u=e.algo;for(let x=0;x<t.length-1;x++){const M=t[x].position,R=t[x+1].position,C=ca(n,M,R,e,i);o+=C.expandedNodes,u=C.algo;const w={legIndex:x,points:C.path,success:C.success,expandedNodes:C.expandedNodes,costBreakdown:{distance:0,threat:0,altitude:0,nofly:0,smooth:0},cumulativeCost:0};if(l.push(w),!C.success){c=!1,d=`航段 ${x+1} 规划失败：${C.message}`,a.length===0&&a.push({...M}),a.push({...R});continue}const D=C.path;for(let U=0;U<D.length;U++)x>0&&U===0||a.push(D[U])}let h=a;if(c&&(h=$0(n,a,e,s.smoothing),e.dynamics.enabled)){const x=k0(n,h,e);x.length>=2&&(h=x)}const g=performance.now()-r,_=c?pu(h,Math.max(e.cellSize*.5,4)):[],m=c&&a.length>=2?kh(a,e):void 0,f=c&&h.length>=2?kh(h,e):void 0,p=c&&h.length>=2?B0(h,e,n):void 0,S=K0(n,h,_,i,e,c,o,g,t.length-1,l.filter(x=>x.success).length,u,p,f);return{success:c,rawPath:a,smoothPath:h,stats:S,legs:l,message:d,algo:u,constraintReport:p,rawMetrics:m,smoothMetrics:f}}function K0(n,t,e,i,s,r,o,a,l,c,d,u,h){const g=bp(t),_=t.length>=2?Ap(n,t,i,s):{total:0,breakdown:{distance:0,threat:0,altitude:0,nofly:0,smooth:0}};let m=0,f=0;for(let w=1;w<e.length;w++){const D=n.threatIntensity(e[w-1]),U=n.threatIntensity(e[w]),y=Math.hypot(e[w].x-e[w-1].x,e[w].y-e[w-1].y,e[w].z-e[w-1].z);f+=(D+U)/2*y,(D+U)/2>W0&&(m+=y)}const p=(s.speedMin+s.speedMax)/2,S=p>0?m/p:0,x=l>0?c/l:0;let M=0;for(const w of e)n.isBlocked(w,s.clearance)||M++;const R=e.length>0?M/e.length:0,C=r&&e.length>0?Math.round(x*R*1e3)/10:Math.round(x*1e3)/10;return{distance:Math.round(g*10)/10,threatExposure:Math.round(f*100)/100,exposureTime:Math.round(S*10)/10,planTimeMs:Math.round(a*100)/100,expandedNodes:o,success:r,segments:Math.max(0,t.length-1),obstacleAvoidanceRate:C,totalCost:Math.round(_.total*100)/100,costBreakdown:{distance:Math.round(_.breakdown.distance*100)/100,threat:Math.round(_.breakdown.threat*100)/100,altitude:Math.round(_.breakdown.altitude*100)/100,nofly:Math.round(_.breakdown.nofly*100)/100,smooth:Math.round(_.breakdown.smooth*100)/100},algo:d,constraintRate:u?Math.round(u.satisfaction*1e3)/10:100,constraintViolations:u==null?void 0:u.counts,metrics:h}}function Z0(n,t,e,i){return M0(n,t,e,i)}function J0(n,t){return{success:!1,rawPath:[],smoothPath:[],stats:{distance:0,threatExposure:0,exposureTime:0,planTimeMs:t,expandedNodes:0,success:!1,segments:0,obstacleAvoidanceRate:0,totalCost:0,costBreakdown:{distance:0,threat:0,altitude:0,nofly:0,smooth:0}},legs:[],message:n}}const vu={speedTau:.6,headingTau:.45,maxAccel:12,maxYawRate:1.2};class Q0{constructor(t=vu){Dt(this,"state");Dt(this,"errors",[]);this.cfg=t,this.state={position:{x:0,y:0,z:0},velocity:{x:0,y:0,z:0},speed:0,heading:0,refTime:0}}reset(t,e=0){this.state={position:{...t},velocity:{x:0,y:0,z:0},speed:0,heading:e,refTime:0},this.errors=[]}step(t,e){const i=this.state,s=Math.atan2(t.velocity.x,t.velocity.z),r=t.speed,o=i.speed+(r-i.speed)*(1-Math.exp(-e/this.cfg.speedTau)),a=Math.max(-this.cfg.maxAccel*e,Math.min(this.cfg.maxAccel*e,o-i.speed));i.speed=Math.max(0,i.speed+a);let l=s-i.heading;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;const c=l*(1-Math.exp(-e/this.cfg.headingTau)),d=Math.max(-this.cfg.maxYawRate*e,Math.min(this.cfg.maxYawRate*e,c));i.heading+=d,i.position.x+=Math.sin(i.heading)*i.speed*e,i.position.z+=Math.cos(i.heading)*i.speed*e,i.position.y+=(t.position.y-i.position.y)*(1-Math.exp(-e/this.cfg.headingTau)),i.velocity={x:Math.sin(i.heading)*i.speed,y:(t.position.y-i.position.y)/Math.max(e,.001),z:Math.cos(i.heading)*i.speed},i.refTime=t.time;const u=Re(i.position,t.position);let h=Math.abs(l)*(180/Math.PI);return this.errors.push({t:t.time,positionError:u,headingError:h}),i}stats(){if(this.errors.length===0)return{meanError:0,maxError:0,meanHeadingError:0,samples:0};let t=0,e=0,i=0;for(const s of this.errors)t+=s.positionError,e=Math.max(e,s.positionError),i+=s.headingError;return{meanError:t/this.errors.length,maxError:e,meanHeadingError:i/this.errors.length,samples:this.errors.length}}}function tv(n,t=vu,e=.2){const i=new Q0(t);if(n.length===0)return{states:[],stats:i.stats()};i.reset(n[0].position,Math.atan2(n[0].velocity.x,n[0].velocity.z));const s=[{...i.state,position:{...i.state.position}}],r=n[n.length-1].time;for(let o=e;o<=r;o+=e){const a=ev(n,o),l=i.step(a,e);s.push({...l,position:{...l.position}})}return{states:s,stats:i.stats()}}function ev(n,t){if(t<=n[0].time)return n[0];const e=n[n.length-1];if(t>=e.time)return e;let i=0,s=n.length-1;for(;i<s-1;){const c=i+s>>1;n[c].time<=t?i=c:s=c}const r=n[i],o=n[i+1],a=o.time-r.time,l=a>1e-6?(t-r.time)/a:0;return{time:t,s:r.s+(o.s-r.s)*l,speed:r.speed+(o.speed-r.speed)*l,position:{x:r.position.x+(o.position.x-r.position.x)*l,y:r.position.y+(o.position.y-r.position.y)*l,z:r.position.z+(o.position.z-r.position.z)*l},velocity:{x:r.velocity.x+(o.velocity.x-r.velocity.x)*l,y:r.velocity.y+(o.velocity.y-r.velocity.y)*l,z:r.velocity.z+(o.velocity.z-r.velocity.z)*l}}}function nv(n){const{env:t,params:e,config:i,trajectory:s,position:r,heading:o,time:a}=n;if(!i.enabled||s.length<4)return{reason:null,label:""};if(a-n.lastReplanTime<i.minInterval)return{reason:null,label:""};const l=e.clearance,c=.5;let d=null,u=null;const h=i.collisionHorizon;for(let S=0;S<=h;S+=c){const x=hl(s,a+S);if(!x)break;const M=t.predictedCollision(x.position,S,l);M&&!d&&(d={at:S,p:x.position,entityId:M.entityId});for(const R of t.threats)Math.hypot(x.position.x-R.position.x,x.position.z-R.position.z)<R.radius+i.threatEnterDistance&&x.position.y>=R.heightMin&&x.position.y<=R.heightMax&&(u||(u={p:x.position,entityId:R.id}));if(d)break}if(d)return{reason:"collision-risk",label:`碰撞风险：${d.at.toFixed(1)}s 后预测碰撞`,entityId:d.entityId,lookPoint:d.p};if(u)return{reason:"threat-enter",label:"动态威胁进入安全裕度",entityId:u.entityId,lookPoint:u.p};const g=hl(s,a+2),_=hl(s,a);if(g&&_){const S=Math.atan2(g.position.x-_.position.x,g.position.z-_.position.z),x=Math.abs(qr(o,S))*(180/Math.PI);if(x>i.yawThreshold)return{reason:"yaw-deviation",label:`偏航过大：实测 ${x.toFixed(0)}° > 阈值 ${i.yawThreshold}°`,lookPoint:g.position}}const m=s[s.length-1],f=sv(s,a),p=Re(r,m.position);return p>50&&f>p*i.detourRatio?{reason:"range-anomaly",label:`剩余航程异常：绕航 ${(f/Math.max(p,1)).toFixed(2)}×`,lookPoint:m.position}:{reason:null,label:""}}function iv(n,t,e,i,s=[]){const{env:r,params:o,weights:a,trajectory:l,position:c}=n,d=performance.now(),u=l.map(U=>U.position),h=Vh(u,c,o.clearance*.5+4),g=u[h]??c,_=Vh(u,g,n.config.lookAhead+n.config.windowRadius*.4);let m=Math.min(_,u.length-1);for(let U=m;U>h+1;U--)if(!r.isBlocked(u[U],o.clearance)){m=U;break}const f=u[m],p=u.slice(h,m+1),S=ca(r,g,f,o,a),x=[];let M=null;if(S.success){M=za(r,S.path,o.clearance);const U=Oa(r,M,o.clearance);U.length>=2&&(M=U),x.push({label:fs[S.algo]+"（采用）",algo:S.algo,path:M,success:!0,distance:Hh(M),totalCost:as(r,M,o,a),planTimeMs:S.expandedNodes})}for(const U of s){if(U===o.algo)continue;const y=ca(r,g,f,{...o,algo:U},a);x.push({label:fs[U],algo:U,path:y.success?y.path:[],success:y.success,distance:y.success?Hh(y.path):0,totalCost:y.success?as(r,y.path,o,a):1/0,planTimeMs:0})}const R=as(r,p,o,a),C=M?as(r,M,o,a):R,w={time:n.time,reason:t,reasonLabel:e,position:{...c},replanFrom:{...g},replanGoal:{...f},oldLocalPath:p,newLocalPath:M??[],candidates:x,costBefore:R,costAfter:C,planTimeMs:performance.now()-d,entityId:i};if(!M)return{event:w,mergedPath:null,success:!1};const D=[...u.slice(0,Math.max(0,h)),...M,...u.slice(m+1)];return{event:w,mergedPath:D,success:!0}}function hl(n,t){if(n.length===0)return null;if(t<=n[0].time)return n[0];const e=n[n.length-1];if(t>=e.time)return e;let i=0,s=n.length-1;for(;i<s-1;){const r=i+s>>1;n[r].time<=t?i=r:s=r}return n[i+1]}function Vh(n,t,e){let i=0,s=1/0;for(let o=0;o<n.length;o++){const a=rv(n[o],t);a<s&&(s=a,i=o)}let r=0;for(let o=i+1;o<n.length;o++)if(r+=Re(n[o-1],n[o]),r>=e)return o;return n.length-1}function sv(n,t){let e=0,i=!1;for(let s=1;s<n.length;s++)i?e+=Re(n[s-1].position,n[s].position):n[s].time>=t&&(i=!0,e+=Re(n[s-1].position,n[s].position));return e}function Hh(n){let t=0;for(let e=1;e<n.length;e++)t+=Re(n[e-1],n[e]);return t}function rv(n,t){const e=n.x-t.x,i=n.y-t.y,s=n.z-t.z;return e*e+i*i+s*s}const ov=["rrt"];function Gh(){return{result:null,rawPath:[],smoothPath:[],trajectory:[],clockBase:0,costCurve:[],trackingStates:[],trackingStats:null,lastReplanTime:-999,replanCount:0}}function av(){return{distance:0,threatExposure:0,exposureTime:0,planTimeMs:0,expandedNodes:0,success:!1,segments:0,obstacleAvoidanceRate:0,totalCost:0,costBreakdown:{distance:0,threat:0,altitude:0,nofly:0,smooth:0}}}const vs=xp("sim",{state:()=>({status:"idle",message:"就绪",smoothing:"bspline",uavStates:{},playing:!1,simTime:0,duration:0,playbackSpeed:1,dronePosition:{x:0,y:0,z:0},droneHeading:0,cameraMode:"orbit",dirty:!0,autoReplan:!1,showThreatHeatmap:!1,replanConfig:{...t0},replanEvents:[],trackingEnabled:!1,safetyColorMode:!1,showPrediction:!0,showReplanWindow:!0}),getters:{progress:n=>n.duration>0?Math.min(1,n.simTime/n.duration):0,rawPath(n){var e;const t=ue();return((e=n.uavStates[t.activeUavId])==null?void 0:e.rawPath)??[]},smoothPath(n){var e;const t=ue();return((e=n.uavStates[t.activeUavId])==null?void 0:e.smoothPath)??[]},trajectory(n){var e;const t=ue();return((e=n.uavStates[t.activeUavId])==null?void 0:e.trajectory)??[]},stats(n){var e,i;const t=ue();return((i=(e=n.uavStates[t.activeUavId])==null?void 0:e.result)==null?void 0:i.stats)??null},costCurve(n){var e;const t=ue();return((e=n.uavStates[t.activeUavId])==null?void 0:e.costCurve)??[]},constraintReport(n){var e,i;const t=ue();return((i=(e=n.uavStates[t.activeUavId])==null?void 0:e.result)==null?void 0:i.constraintReport)??null},rawMetrics(n){var e,i;const t=ue();return(i=(e=n.uavStates[t.activeUavId])==null?void 0:e.result)==null?void 0:i.rawMetrics},smoothMetrics(n){var e,i;const t=ue();return(i=(e=n.uavStates[t.activeUavId])==null?void 0:e.result)==null?void 0:i.smoothMetrics},trackingStats(n){var e;const t=ue();return((e=n.uavStates[t.activeUavId])==null?void 0:e.trackingStats)??null},lastReplanEvent:n=>n.replanEvents[0]??null},actions:{setCameraMode(n){this.cameraMode=n},setSmoothing(n){this.smoothing=n,this.dirty=!0},markDirty(){this.dirty=!0},setPlaybackSpeed(n){this.playbackSpeed=n},setDroneTransform(n,t){this.dronePosition=n,this.droneHeading=t},play(){Object.values(this.uavStates).every(n=>n.trajectory.length<2)||(this.simTime>=this.duration&&(this.simTime=0),this.playing=!0)},pause(){this.playing=!1},togglePlay(){this.playing?this.pause():this.play()},seek(n){this.simTime=Math.max(0,Math.min(this.duration,n))},advance(n){!this.playing||!Object.values(this.uavStates).some(e=>e.trajectory.length>=2)||(this.simTime+=n*this.playbackSpeed,this.simTime>=this.duration&&(this.simTime=this.duration,this.playing=!1))},resetPlayback(){this.playing=!1,this.simTime=0},buildEnvironmentAt(n){const t=ue();return Sp({terrain:t.terrain,threats:t.threats,noflyZones:t.noflyZones,obstacles:t.obstacles,dynamics:t.dynamics},n)},buildEnvironment(){return this.buildEnvironmentAt(0)},ensureUavStates(){const n=ue();for(const t of n.uavs)this.uavStates[t.id]||(this.uavStates[t.id]=Gh())},planLocally(){const n=ue();this.ensureUavStates();const t=this.buildEnvironmentAt(0),e=Y0(t,n.waypoints,n.planParams,n.weights,{smoothing:this.smoothing});for(const i of n.uavs){const s=e[i.id];s&&this.applyUavResult(i.id,s,t)}return this.finishPlan(e[n.activeUavId]),e[n.activeUavId]??this.failureResult("无机可规划")},plan(){const n=ue();return this.status="planning",this.message="规划中…",this.pause(),this.ensureUavStates(),new Promise(t=>{const e=new i0,i={type:"plan-multi",terrain:n.terrain,threats:JSON.parse(JSON.stringify(n.threats)),noflyZones:JSON.parse(JSON.stringify(n.noflyZones)),obstacles:JSON.parse(JSON.stringify(n.obstacles)),dynamics:JSON.parse(JSON.stringify(n.dynamics)),waypoints:JSON.parse(JSON.stringify(n.waypoints)),uavIds:n.uavs.map(r=>r.id),planParams:JSON.parse(JSON.stringify(n.planParams)),weights:JSON.parse(JSON.stringify(n.weights)),smoothing:this.smoothing},s=setTimeout(()=>{e.terminate(),this.status="failed",this.message="规划超时（请增大栅格分辨率或减少最大节点数）",t(this.failureResult(this.message))},3e4);e.onmessage=r=>{clearTimeout(s);const o=r.data;if(o.type==="plan-multi-done"){const a=this.buildEnvironmentAt(0);for(const d of n.uavs){const u=o.results[d.id];u&&this.applyUavResult(d.id,u,a)}const l=o.results[n.activeUavId];this.finishPlan(l);const c=Object.values(o.results).filter(d=>d.success).length;this.message=`规划完成 ${c}/${n.uavs.length} 架（Worker ${o.workerMs} ms）`,e.terminate(),t(l??this.failureResult("无规划结果"))}else o.type==="plan-done"&&(this.applyUavResult(n.activeUavId,o.result,this.buildEnvironmentAt(0)),this.finishPlan(o.result),this.message=o.result.success?`规划成功（Worker ${o.workerMs} ms）`:o.result.message,e.terminate(),t(o.result))},e.onerror=r=>{clearTimeout(s),this.status="failed",this.message=`Worker 错误：${r.message}`,e.terminate(),t(this.failureResult(this.message))},e.postMessage(i)})},failureResult(n){return{success:!1,rawPath:[],smoothPath:[],stats:av(),legs:[],message:n}},finishPlan(n){this.status=n!=null&&n.success?"done":n?"failed":"idle",this.dirty=!1,this.simTime=0,this.playing=!1,this.replanEvents=[],this.recomputeDuration();const t=ue(),e=this.uavStates[t.activeUavId];e!=null&&e.trajectory.length&&(this.dronePosition={...e.trajectory[0].position})},applyUavResult(n,t,e){const i=ue();this.uavStates[n]||(this.uavStates[n]=Gh());const s=this.uavStates[n];s.result=t,s.rawPath=t.rawPath,s.smoothPath=t.smoothPath,s.clockBase=0,s.lastReplanTime=-999,s.replanCount=0,t.success&&t.smoothPath.length>=2?(s.costCurve=Z0(e,t.smoothPath,i.weights,i.planParams).map(r=>({distance:r.distance,cumulative:r.cumulative})),this.rebuildTrajectory(n,t.smoothPath,e)):(s.costCurve=[],s.trajectory=[],s.trackingStates=[],s.trackingStats=null)},rebuildTrajectory(n,t,e){const i=ue(),s=this.uavStates[n];if(!s)return;s.trajectory=p0(t,i.planParams);const{states:r,stats:o}=tv(s.trajectory,{...vu,maxAccel:i.planParams.dynamics.maxAccel},.2);s.trackingStates=r,s.trackingStats=o},recomputeDuration(){let n=0;for(const t of Object.values(this.uavStates))t.trajectory.length>0&&(n=Math.max(n,t.trajectory[t.trajectory.length-1].time+t.clockBase));this.duration=n},applyPlanResult(n,t,e,i){const s=ue();this.ensureUavStates(),this.applyUavResult(s.activeUavId,n,i),this.finishPlan(n)},requestTrajectory(n,t,e){const i=ue();this.rebuildTrajectory(i.activeUavId,t),this.recomputeDuration(),this.simTime=0;const s=this.uavStates[i.activeUavId];s!=null&&s.trajectory.length&&(this.dronePosition={...s.trajectory[0].position})},sampleAt(n){const t=ue(),e=this.uavStates[t.activeUavId];return!e||e.trajectory.length===0?null:this.sampleUavAt(t.activeUavId,n)},sampleUavAt(n,t){const e=this.uavStates[n];if(!e||e.trajectory.length===0)return null;const i=t-e.clockBase;return Wh(e.trajectory,i)},trackedSample(n,t){const e=this.uavStates[n];if(!e)return null;const i=t-e.clockBase;if(this.trackingEnabled&&e.trackingStates.length>1){const r=e.trackingStates;if(i<=r[0].refTime)return r[0];const o=r[r.length-1];if(i>=o.refTime)return o;let a=0,l=r.length-1;for(;a<l-1;){const g=a+l>>1;r[g].refTime<=i?a=g:l=g}const c=r[a],d=r[a+1],u=d.refTime-c.refTime,h=u>1e-6?(i-c.refTime)/u:0;return{refTime:i,speed:c.speed+(d.speed-c.speed)*h,heading:c.heading+(d.heading-c.heading)*h,position:{x:c.position.x+(d.position.x-c.position.x)*h,y:c.position.y+(d.position.y-c.position.y)*h,z:c.position.z+(d.position.z-c.position.z)*h},velocity:{x:c.velocity.x+(d.velocity.x-c.velocity.x)*h,y:c.velocity.y+(d.velocity.y-c.velocity.y)*h,z:c.velocity.z+(d.velocity.z-c.velocity.z)*h}}}const s=Wh(e.trajectory,i);return s?{position:s.position,velocity:s.velocity,speed:s.speed,heading:Math.atan2(s.velocity.x,s.velocity.z),refTime:i}:null},tickOnlineReplan(n,t){if(!this.replanConfig.enabled||!this.playing)return;const e=ue();for(const i of Object.keys(this.uavStates)){const s=this.uavStates[i];if(!s||s.trajectory.length<4||this.simTime-s.clockBase<.2)continue;const o=this.trackedSample(i,this.simTime);if(!o)continue;const a=nv({time:this.simTime,position:o.position,heading:o.heading,trajectory:s.trajectory,env:n,params:e.planParams,weights:e.weights,config:this.replanConfig,lastReplanTime:s.lastReplanTime});if(!a.reason)continue;const l=iv({time:this.simTime,position:o.position,heading:o.heading,trajectory:s.trajectory,env:n,params:e.planParams,weights:e.weights,config:this.replanConfig,lastReplanTime:s.lastReplanTime},a.reason,a.label,a.entityId,[...ov]);if(l.success&&l.mergedPath){const c=pu(s.smoothPath,Math.max(e.planParams.cellSize*.5,4)),d=lv(c,l.event.replanFrom);this.rebuildTrajectory(i,l.mergedPath);const u=this.timeAtArcLength(i,d);s.clockBase=this.simTime-u,s.lastReplanTime=this.simTime,s.replanCount++,s.result=s.result?{...s.result,smoothPath:l.mergedPath,rawPath:l.mergedPath}:null,this.replanEvents.unshift(l.event),this.replanEvents.length>12&&(this.replanEvents.length=12),this.recomputeDuration()}else s.lastReplanTime=this.simTime,this.replanEvents.unshift({...l.event,reasonLabel:l.event.reasonLabel+"（重规划失败）"}),this.replanEvents.length>12&&(this.replanEvents.length=12)}},arcLengthBefore(n,t){var r;const e=this.uavStates[n];if(!e)return 0;let i=0,s=1/0;return e.trajectory.forEach((o,a)=>{const l=(o.position.x-t.x)**2+(o.position.y-t.y)**2+(o.position.z-t.z)**2;l<s&&(s=l,i=a)}),((r=e.trajectory[i])==null?void 0:r.s)??0},timeAtArcLength(n,t){const e=this.uavStates[n];if(!e||e.trajectory.length===0)return 0;let i=0,s=e.trajectory.length-1;for(;i<s-1;){const c=i+s>>1;e.trajectory[c].s<=t?i=c:s=c}const r=e.trajectory[i],o=e.trajectory[i+1]??r,a=o.s-r.s,l=a>1e-6?(t-r.s)/a:0;return r.time+(o.time-r.time)*l},clearReplanEvents(){this.replanEvents=[]},clearPlan(){this.uavStates={},this.status="idle",this.message="就绪",this.playing=!1,this.simTime=0,this.duration=0,this.dirty=!0,this.replanEvents=[]},exportScene(){var e;const n=ue(),t=this.uavStates[n.activeUavId];return n.serialize({rawPath:(t==null?void 0:t.rawPath)??[],smoothPath:(t==null?void 0:t.smoothPath)??[],trajectory:((t==null?void 0:t.trajectory)??[]).map(i=>i.position),stats:((e=t==null?void 0:t.result)==null?void 0:e.stats)??null})}}});function lv(n,t){let e=0,i=1/0;for(let r=0;r<n.length;r++){const o=(n[r].x-t.x)**2+(n[r].y-t.y)**2+(n[r].z-t.z)**2;o<i&&(i=o,e=r)}let s=0;for(let r=1;r<=e;r++)s+=Math.hypot(n[r].x-n[r-1].x,n[r].y-n[r-1].y,n[r].z-n[r-1].z);return s}function Wh(n,t){if(n.length===0)return null;if(t<=n[0].time)return n[0];const e=n[n.length-1];if(t>=e.time)return e;let i=0,s=n.length-1;for(;i<s-1;){const c=i+s>>1;n[c].time<=t?i=c:s=c}const r=n[i],o=n[i+1],a=o.time-r.time,l=a>1e-6?(t-r.time)/a:0;return{time:t,s:r.s+(o.s-r.s)*l,speed:r.speed+(o.speed-r.speed)*l,position:{x:r.position.x+(o.position.x-r.position.x)*l,y:r.position.y+(o.position.y-r.position.y)*l,z:r.position.z+(o.position.z-r.position.z)*l},velocity:{x:r.velocity.x+(o.velocity.x-r.velocity.x)*l,y:r.velocity.y+(o.velocity.y-r.velocity.y)*l,z:r.velocity.z+(o.velocity.z-r.velocity.z)*l}}}const cv={class:"toolbar"},uv=["title","onClick"],hv=["title","onClick"],dv=ei({__name:"ToolBar",setup(n){const t=ue(),e=vs(),i=[{mode:"select",icon:"▣",title:"选择/拖拽（Esc）"},{mode:"add-threat",icon:"◎",title:"添加威胁区：在地形上点击"},{mode:"add-nofly",icon:"⊘",title:"添加禁飞区：在地形上点击"},{mode:"add-obstacle",icon:"■",title:"添加建筑障碍"},{mode:"add-dynamic",icon:"➤",title:"添加移动障碍（动态对抗）"},{mode:"add-waypoint",icon:"⚑",title:"添加途经航点"}],s=[{mode:"orbit",icon:"✥",title:"旋转/缩放/平移（左键旋转，右键平移，滚轮缩放）"},{mode:"top",icon:"▦",title:"俯视视角"},{mode:"follow",icon:"➤",title:"跟随无人机视角"}];function r(o){t.setEditMode(t.editMode===o&&o!=="select"?"select":o)}return(o,a)=>(Tt(),Rt("div",cv,[a[0]||(a[0]=P("div",{class:"logo"},"UAV",-1)),(Tt(),Rt(ne,null,Ne(i,l=>P("div",{key:l.mode,class:Oe(["tool",{active:L(t).editMode===l.mode}]),title:l.title,onClick:c=>r(l.mode)},ft(l.icon),11,uv)),64)),a[1]||(a[1]=P("div",{class:"sep"},null,-1)),(Tt(),Rt(ne,null,Ne(s,l=>P("div",{key:l.mode,class:Oe(["tool",{active:L(e).cameraMode===l.mode}]),title:l.title,onClick:c=>L(e).setCameraMode(l.mode)},ft(l.icon),11,hv)),64))]))}}),Wi=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},fv=Wi(dv,[["__scopeId","data-v-0d042ec7"]]);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xu="169",qs={ROTATE:0,DOLLY:1,PAN:2},Xs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},pv=0,Xh=1,mv=2,Ip=1,Dp=2,ci=3,Hi=0,un=1,mn=2,Bi=0,Ks=1,$h=2,jh=3,Yh=4,gv=5,ss=100,_v=101,vv=102,xv=103,yv=104,Mv=200,Sv=201,bv=202,Ev=203,oc=204,ac=205,Tv=206,wv=207,Av=208,Rv=209,Cv=210,Pv=211,Iv=212,Dv=213,Lv=214,lc=0,cc=1,uc=2,sr=3,hc=4,dc=5,fc=6,pc=7,Lp=0,Uv=1,Nv=2,ki=0,Ov=1,Fv=2,zv=3,Bv=4,kv=5,Vv=6,Hv=7,Up=300,rr=301,or=302,mc=303,gc=304,Ba=306,_c=1e3,ls=1001,vc=1002,An=1003,Gv=1004,mo=1005,Sn=1006,dl=1007,cs=1008,bi=1009,Np=1010,Op=1011,Kr=1012,yu=1013,ps=1014,mi=1015,eo=1016,Mu=1017,Su=1018,ar=1020,Fp=35902,zp=1021,Bp=1022,On=1023,kp=1024,Vp=1025,Zs=1026,lr=1027,Hp=1028,bu=1029,Gp=1030,Eu=1031,Tu=1033,Xo=33776,$o=33777,jo=33778,Yo=33779,xc=35840,yc=35841,Mc=35842,Sc=35843,bc=36196,Ec=37492,Tc=37496,wc=37808,Ac=37809,Rc=37810,Cc=37811,Pc=37812,Ic=37813,Dc=37814,Lc=37815,Uc=37816,Nc=37817,Oc=37818,Fc=37819,zc=37820,Bc=37821,qo=36492,kc=36494,Vc=36495,Wp=36283,Hc=36284,Gc=36285,Wc=36286,Wv=3200,Xv=3201,Xp=0,$v=1,Oi="",Un="srgb",Xi="srgb-linear",wu="display-p3",ka="display-p3-linear",ua="linear",Me="srgb",ha="rec709",da="p3",Ts=7680,qh=519,jv=512,Yv=513,qv=514,$p=515,Kv=516,Zv=517,Jv=518,Qv=519,Xc=35044,Kh="300 es",gi=2e3,fa=2001;class xs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zh=1234567;const kr=Math.PI/180,Zr=180/Math.PI;function _i(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]).toLowerCase()}function Ke(n,t,e){return Math.max(t,Math.min(e,n))}function Au(n,t){return(n%t+t)%t}function tx(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function ex(n,t,e){return n!==t?(e-n)/(t-n):0}function Vr(n,t,e){return(1-e)*n+e*t}function nx(n,t,e,i){return Vr(n,t,1-Math.exp(-e*i))}function ix(n,t=1){return t-Math.abs(Au(n,t*2)-t)}function sx(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function rx(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function ox(n,t){return n+Math.floor(Math.random()*(t-n+1))}function ax(n,t){return n+Math.random()*(t-n)}function lx(n){return n*(.5-Math.random())}function cx(n){n!==void 0&&(Zh=n);let t=Zh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ux(n){return n*kr}function hx(n){return n*Zr}function dx(n){return(n&n-1)===0&&n!==0}function fx(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function px(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function mx(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),d=o((t+i)/2),u=r((t-i)/2),h=o((t-i)/2),g=r((i-t)/2),_=o((i-t)/2);switch(s){case"XYX":n.set(a*d,l*u,l*h,a*c);break;case"YZY":n.set(l*h,a*d,l*u,a*c);break;case"ZXZ":n.set(l*u,l*h,a*d,a*c);break;case"XZX":n.set(a*d,l*_,l*g,a*c);break;case"YXY":n.set(l*g,a*d,l*_,a*c);break;case"ZYZ":n.set(l*_,l*g,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Nn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function he(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ko={DEG2RAD:kr,RAD2DEG:Zr,generateUUID:_i,clamp:Ke,euclideanModulo:Au,mapLinear:tx,inverseLerp:ex,lerp:Vr,damp:nx,pingpong:ix,smoothstep:sx,smootherstep:rx,randInt:ox,randFloat:ax,randFloatSpread:lx,seededRandom:cx,degToRad:ux,radToDeg:hx,isPowerOfTwo:dx,ceilPowerOfTwo:fx,floorPowerOfTwo:px,setQuaternionFromProperEuler:mx,normalize:he,denormalize:Nn};class Vt{constructor(t=0,e=0){Vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,i,s,r,o,a,l,c){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],g=i[5],_=i[8],m=s[0],f=s[3],p=s[6],S=s[1],x=s[4],M=s[7],R=s[2],C=s[5],w=s[8];return r[0]=o*m+a*S+l*R,r[3]=o*f+a*x+l*C,r[6]=o*p+a*M+l*w,r[1]=c*m+d*S+u*R,r[4]=c*f+d*x+u*C,r[7]=c*p+d*M+u*w,r[2]=h*m+g*S+_*R,r[5]=h*f+g*x+_*C,r[8]=h*p+g*M+_*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8];return e*o*d-e*a*c-i*r*d+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8],u=d*o-a*c,h=a*l-d*r,g=c*r-o*l,_=e*u+i*h+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/_;return t[0]=u*m,t[1]=(s*c-d*i)*m,t[2]=(a*i-s*o)*m,t[3]=h*m,t[4]=(d*e-s*l)*m,t[5]=(s*r-a*e)*m,t[6]=g*m,t[7]=(i*l-c*e)*m,t[8]=(o*e-i*r)*m,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(fl.makeScale(t,e)),this}rotate(t){return this.premultiply(fl.makeRotation(-t)),this}translate(t,e){return this.premultiply(fl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const fl=new Zt;function jp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function pa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function gx(){const n=pa("canvas");return n.style.display="block",n}const Jh={};function Zo(n){n in Jh||(Jh[n]=!0,console.warn(n))}function _x(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function vx(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function xx(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qh=new Zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),td=new Zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_r={[Xi]:{transfer:ua,primaries:ha,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Un]:{transfer:Me,primaries:ha,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ka]:{transfer:ua,primaries:da,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(td),fromReference:n=>n.applyMatrix3(Qh)},[wu]:{transfer:Me,primaries:da,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(td),fromReference:n=>n.applyMatrix3(Qh).convertLinearToSRGB()}},yx=new Set([Xi,ka]),oe={enabled:!0,_workingColorSpace:Xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!yx.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=_r[t].toReference,s=_r[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return _r[n].primaries},getTransfer:function(n){return n===Oi?ua:_r[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(_r[t].luminanceCoefficients)}};function Js(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function pl(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ws;class Mx{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ws===void 0&&(ws=pa("canvas")),ws.width=t.width,ws.height=t.height;const i=ws.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ws}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=pa("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Js(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Js(e[i]/255)*255):e[i]=Js(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Sx=0;class Yp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=_i(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ml(s[o].image)):r.push(ml(s[o]))}else r=ml(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function ml(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Mx.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bx=0;class rn extends xs{constructor(t=rn.DEFAULT_IMAGE,e=rn.DEFAULT_MAPPING,i=ls,s=ls,r=Sn,o=cs,a=On,l=bi,c=rn.DEFAULT_ANISOTROPY,d=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bx++}),this.uuid=_i(),this.name="",this.source=new Yp(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Up)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _c:t.x=t.x-Math.floor(t.x);break;case ls:t.x=t.x<0?0:1;break;case vc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _c:t.y=t.y-Math.floor(t.y);break;case ls:t.y=t.y<0?0:1;break;case vc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Up;rn.DEFAULT_ANISOTROPY=1;class Te{constructor(t=0,e=0,i=0,s=1){Te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],d=l[4],u=l[8],h=l[1],g=l[5],_=l[9],m=l[2],f=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-m)<.01&&Math.abs(_-f)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+m)<.1&&Math.abs(_+f)<.1&&Math.abs(c+g+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,M=(g+1)/2,R=(p+1)/2,C=(d+h)/4,w=(u+m)/4,D=(_+f)/4;return x>M&&x>R?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=C/i,r=w/i):M>R?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=C/s,r=D/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=w/r,s=D/r),this.set(i,s,r,e),this}let S=Math.sqrt((f-_)*(f-_)+(u-m)*(u-m)+(h-d)*(h-d));return Math.abs(S)<.001&&(S=1),this.x=(f-_)/S,this.y=(u-m)/S,this.z=(h-d)/S,this.w=Math.acos((c+g+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ex extends xs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new rn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Yp(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ms extends Ex{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class qp extends rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=An,this.minFilter=An,this.wrapR=ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tx extends rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=An,this.minFilter=An,this.wrapR=ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],d=i[s+2],u=i[s+3];const h=r[o+0],g=r[o+1],_=r[o+2],m=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u;return}if(a===1){t[e+0]=h,t[e+1]=g,t[e+2]=_,t[e+3]=m;return}if(u!==m||l!==h||c!==g||d!==_){let f=1-a;const p=l*h+c*g+d*_+u*m,S=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const R=Math.sqrt(x),C=Math.atan2(R,p*S);f=Math.sin(f*C)/R,a=Math.sin(a*C)/R}const M=a*S;if(l=l*f+h*M,c=c*f+g*M,d=d*f+_*M,u=u*f+m*M,f===1-a){const R=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=R,c*=R,d*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],d=i[s+3],u=r[o],h=r[o+1],g=r[o+2],_=r[o+3];return t[e]=a*_+d*u+l*g-c*h,t[e+1]=l*_+d*h+c*u-a*g,t[e+2]=c*_+d*g+a*h-l*u,t[e+3]=d*_-a*u-l*h-c*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(s/2),u=a(r/2),h=l(i/2),g=l(s/2),_=l(r/2);switch(o){case"XYZ":this._x=h*d*u+c*g*_,this._y=c*g*u-h*d*_,this._z=c*d*_+h*g*u,this._w=c*d*u-h*g*_;break;case"YXZ":this._x=h*d*u+c*g*_,this._y=c*g*u-h*d*_,this._z=c*d*_-h*g*u,this._w=c*d*u+h*g*_;break;case"ZXY":this._x=h*d*u-c*g*_,this._y=c*g*u+h*d*_,this._z=c*d*_+h*g*u,this._w=c*d*u-h*g*_;break;case"ZYX":this._x=h*d*u-c*g*_,this._y=c*g*u+h*d*_,this._z=c*d*_-h*g*u,this._w=c*d*u+h*g*_;break;case"YZX":this._x=h*d*u+c*g*_,this._y=c*g*u+h*d*_,this._z=c*d*_-h*g*u,this._w=c*d*u-h*g*_;break;case"XZY":this._x=h*d*u-c*g*_,this._y=c*g*u-h*d*_,this._z=c*d*_+h*g*u,this._w=c*d*u+h*g*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],d=e[6],u=e[10],h=i+a+u;if(h>0){const g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(d-l)*g,this._y=(r-c)*g,this._z=(o-s)*g}else if(i>a&&i>u){const g=2*Math.sqrt(1+i-a-u);this._w=(d-l)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+c)/g}else if(a>u){const g=2*Math.sqrt(1+a-i-u);this._w=(r-c)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(l+d)/g}else{const g=2*Math.sqrt(1+u-i-a);this._w=(o-s)/g,this._x=(r+c)/g,this._y=(l+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ke(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,d=e._w;return this._x=i*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-i*c,this._z=r*d+o*c+i*l-s*a,this._w=o*d-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const g=1-e;return this._w=g*o+e*this._w,this._x=g*i+e*this._x,this._y=g*s+e*this._y,this._z=g*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),u=Math.sin((1-e)*d)/c,h=Math.sin(e*d)/c;return this._w=o*u+this._w*h,this._x=i*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,i=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ed.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ed.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),d=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*d,this.y=i+l*d+a*c-r*u,this.z=s+l*u+r*d-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return gl.copy(this).projectOnVector(t),this.sub(gl)}reflect(t){return this.sub(gl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gl=new z,ed=new gs;class no{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(In.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(In.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=In.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,In):In.fromBufferAttribute(r,o),In.applyMatrix4(t.matrixWorld),this.expandByPoint(In);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),go.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),go.copy(i.boundingBox)),go.applyMatrix4(t.matrixWorld),this.union(go)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,In),In.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vr),_o.subVectors(this.max,vr),As.subVectors(t.a,vr),Rs.subVectors(t.b,vr),Cs.subVectors(t.c,vr),Ai.subVectors(Rs,As),Ri.subVectors(Cs,Rs),Ki.subVectors(As,Cs);let e=[0,-Ai.z,Ai.y,0,-Ri.z,Ri.y,0,-Ki.z,Ki.y,Ai.z,0,-Ai.x,Ri.z,0,-Ri.x,Ki.z,0,-Ki.x,-Ai.y,Ai.x,0,-Ri.y,Ri.x,0,-Ki.y,Ki.x,0];return!_l(e,As,Rs,Cs,_o)||(e=[1,0,0,0,1,0,0,0,1],!_l(e,As,Rs,Cs,_o))?!1:(vo.crossVectors(Ai,Ri),e=[vo.x,vo.y,vo.z],_l(e,As,Rs,Cs,_o))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,In).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(In).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const si=[new z,new z,new z,new z,new z,new z,new z,new z],In=new z,go=new no,As=new z,Rs=new z,Cs=new z,Ai=new z,Ri=new z,Ki=new z,vr=new z,_o=new z,vo=new z,Zi=new z;function _l(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Zi.fromArray(n,r);const a=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),l=t.dot(Zi),c=e.dot(Zi),d=i.dot(Zi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const wx=new no,xr=new z,vl=new z;class Va{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):wx.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xr.subVectors(t,this.center);const e=xr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(xr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(vl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xr.copy(t.center).add(vl)),this.expandByPoint(xr.copy(t.center).sub(vl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ri=new z,xl=new z,xo=new z,Ci=new z,yl=new z,yo=new z,Ml=new z;class Ha{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ri)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ri.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ri.copy(this.origin).addScaledVector(this.direction,e),ri.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){xl.copy(t).add(e).multiplyScalar(.5),xo.copy(e).sub(t).normalize(),Ci.copy(this.origin).sub(xl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(xo),a=Ci.dot(this.direction),l=-Ci.dot(xo),c=Ci.lengthSq(),d=Math.abs(1-o*o);let u,h,g,_;if(d>0)if(u=o*l-a,h=o*a-l,_=r*d,u>=0)if(h>=-_)if(h<=_){const m=1/d;u*=m,h*=m,g=u*(u+o*h+2*a)+h*(o*u+h+2*l)+c}else h=r,u=Math.max(0,-(o*h+a)),g=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(o*h+a)),g=-u*u+h*(h+2*l)+c;else h<=-_?(u=Math.max(0,-(-o*r+a)),h=u>0?-r:Math.min(Math.max(-r,-l),r),g=-u*u+h*(h+2*l)+c):h<=_?(u=0,h=Math.min(Math.max(-r,-l),r),g=h*(h+2*l)+c):(u=Math.max(0,-(o*r+a)),h=u>0?r:Math.min(Math.max(-r,-l),r),g=-u*u+h*(h+2*l)+c);else h=o>0?-r:r,u=Math.max(0,-(o*h+a)),g=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(xl).addScaledVector(xo,h),g}intersectSphere(t,e){ri.subVectors(t.center,this.origin);const i=ri.dot(this.direction),s=ri.dot(ri)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),d>=0?(r=(t.min.y-h.y)*d,o=(t.max.y-h.y)*d):(r=(t.max.y-h.y)*d,o=(t.min.y-h.y)*d),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-h.z)*u,l=(t.max.z-h.z)*u):(a=(t.max.z-h.z)*u,l=(t.min.z-h.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ri)!==null}intersectTriangle(t,e,i,s,r){yl.subVectors(e,t),yo.subVectors(i,t),Ml.crossVectors(yl,yo);let o=this.direction.dot(Ml),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ci.subVectors(this.origin,t);const l=a*this.direction.dot(yo.crossVectors(Ci,yo));if(l<0)return null;const c=a*this.direction.dot(yl.cross(Ci));if(c<0||l+c>o)return null;const d=-a*Ci.dot(Ml);return d<0?null:this.at(d/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Se{constructor(t,e,i,s,r,o,a,l,c,d,u,h,g,_,m,f){Se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,d,u,h,g,_,m,f)}set(t,e,i,s,r,o,a,l,c,d,u,h,g,_,m,f){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=g,p[7]=_,p[11]=m,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Se().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Ps.setFromMatrixColumn(t,0).length(),r=1/Ps.setFromMatrixColumn(t,1).length(),o=1/Ps.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const h=o*d,g=o*u,_=a*d,m=a*u;e[0]=l*d,e[4]=-l*u,e[8]=c,e[1]=g+_*c,e[5]=h-m*c,e[9]=-a*l,e[2]=m-h*c,e[6]=_+g*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*d,g=l*u,_=c*d,m=c*u;e[0]=h+m*a,e[4]=_*a-g,e[8]=o*c,e[1]=o*u,e[5]=o*d,e[9]=-a,e[2]=g*a-_,e[6]=m+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*d,g=l*u,_=c*d,m=c*u;e[0]=h-m*a,e[4]=-o*u,e[8]=_+g*a,e[1]=g+_*a,e[5]=o*d,e[9]=m-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*d,g=o*u,_=a*d,m=a*u;e[0]=l*d,e[4]=_*c-g,e[8]=h*c+m,e[1]=l*u,e[5]=m*c+h,e[9]=g*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,g=o*c,_=a*l,m=a*c;e[0]=l*d,e[4]=m-h*u,e[8]=_*u+g,e[1]=u,e[5]=o*d,e[9]=-a*d,e[2]=-c*d,e[6]=g*u+_,e[10]=h-m*u}else if(t.order==="XZY"){const h=o*l,g=o*c,_=a*l,m=a*c;e[0]=l*d,e[4]=-u,e[8]=c*d,e[1]=h*u+m,e[5]=o*d,e[9]=g*u-_,e[2]=_*u-g,e[6]=a*d,e[10]=m*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ax,t,Rx)}lookAt(t,e,i){const s=this.elements;return fn.subVectors(t,e),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),Pi.crossVectors(i,fn),Pi.lengthSq()===0&&(Math.abs(i.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),Pi.crossVectors(i,fn)),Pi.normalize(),Mo.crossVectors(fn,Pi),s[0]=Pi.x,s[4]=Mo.x,s[8]=fn.x,s[1]=Pi.y,s[5]=Mo.y,s[9]=fn.y,s[2]=Pi.z,s[6]=Mo.z,s[10]=fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],g=i[13],_=i[2],m=i[6],f=i[10],p=i[14],S=i[3],x=i[7],M=i[11],R=i[15],C=s[0],w=s[4],D=s[8],U=s[12],y=s[1],E=s[5],X=s[9],O=s[13],W=s[2],Y=s[6],B=s[10],G=s[14],$=s[3],ot=s[7],gt=s[11],rt=s[15];return r[0]=o*C+a*y+l*W+c*$,r[4]=o*w+a*E+l*Y+c*ot,r[8]=o*D+a*X+l*B+c*gt,r[12]=o*U+a*O+l*G+c*rt,r[1]=d*C+u*y+h*W+g*$,r[5]=d*w+u*E+h*Y+g*ot,r[9]=d*D+u*X+h*B+g*gt,r[13]=d*U+u*O+h*G+g*rt,r[2]=_*C+m*y+f*W+p*$,r[6]=_*w+m*E+f*Y+p*ot,r[10]=_*D+m*X+f*B+p*gt,r[14]=_*U+m*O+f*G+p*rt,r[3]=S*C+x*y+M*W+R*$,r[7]=S*w+x*E+M*Y+R*ot,r[11]=S*D+x*X+M*B+R*gt,r[15]=S*U+x*O+M*G+R*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],d=t[2],u=t[6],h=t[10],g=t[14],_=t[3],m=t[7],f=t[11],p=t[15];return _*(+r*l*u-s*c*u-r*a*h+i*c*h+s*a*g-i*l*g)+m*(+e*l*g-e*c*h+r*o*h-s*o*g+s*c*d-r*l*d)+f*(+e*c*u-e*a*g-r*o*u+i*o*g+r*a*d-i*c*d)+p*(-s*a*d-e*l*u+e*a*h+s*o*u-i*o*h+i*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8],u=t[9],h=t[10],g=t[11],_=t[12],m=t[13],f=t[14],p=t[15],S=u*f*c-m*h*c+m*l*g-a*f*g-u*l*p+a*h*p,x=_*h*c-d*f*c-_*l*g+o*f*g+d*l*p-o*h*p,M=d*m*c-_*u*c+_*a*g-o*m*g-d*a*p+o*u*p,R=_*u*l-d*m*l-_*a*h+o*m*h+d*a*f-o*u*f,C=e*S+i*x+s*M+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return t[0]=S*w,t[1]=(m*h*r-u*f*r-m*s*g+i*f*g+u*s*p-i*h*p)*w,t[2]=(a*f*r-m*l*r+m*s*c-i*f*c-a*s*p+i*l*p)*w,t[3]=(u*l*r-a*h*r-u*s*c+i*h*c+a*s*g-i*l*g)*w,t[4]=x*w,t[5]=(d*f*r-_*h*r+_*s*g-e*f*g-d*s*p+e*h*p)*w,t[6]=(_*l*r-o*f*r-_*s*c+e*f*c+o*s*p-e*l*p)*w,t[7]=(o*h*r-d*l*r+d*s*c-e*h*c-o*s*g+e*l*g)*w,t[8]=M*w,t[9]=(_*u*r-d*m*r-_*i*g+e*m*g+d*i*p-e*u*p)*w,t[10]=(o*m*r-_*a*r+_*i*c-e*m*c-o*i*p+e*a*p)*w,t[11]=(d*a*r-o*u*r-d*i*c+e*u*c+o*i*g-e*a*g)*w,t[12]=R*w,t[13]=(d*m*s-_*u*s+_*i*h-e*m*h-d*i*f+e*u*f)*w,t[14]=(_*a*s-o*m*s-_*i*l+e*m*l+o*i*f-e*a*f)*w,t[15]=(o*u*s-d*a*s+d*i*l-e*u*l-o*i*h+e*a*h)*w,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,d=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+i,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,d=o+o,u=a+a,h=r*c,g=r*d,_=r*u,m=o*d,f=o*u,p=a*u,S=l*c,x=l*d,M=l*u,R=i.x,C=i.y,w=i.z;return s[0]=(1-(m+p))*R,s[1]=(g+M)*R,s[2]=(_-x)*R,s[3]=0,s[4]=(g-M)*C,s[5]=(1-(h+p))*C,s[6]=(f+S)*C,s[7]=0,s[8]=(_+x)*w,s[9]=(f-S)*w,s[10]=(1-(h+m))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Ps.set(s[0],s[1],s[2]).length();const o=Ps.set(s[4],s[5],s[6]).length(),a=Ps.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Dn.copy(this);const c=1/r,d=1/o,u=1/a;return Dn.elements[0]*=c,Dn.elements[1]*=c,Dn.elements[2]*=c,Dn.elements[4]*=d,Dn.elements[5]*=d,Dn.elements[6]*=d,Dn.elements[8]*=u,Dn.elements[9]*=u,Dn.elements[10]*=u,e.setFromRotationMatrix(Dn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=gi){const l=this.elements,c=2*r/(e-t),d=2*r/(i-s),u=(e+t)/(e-t),h=(i+s)/(i-s);let g,_;if(a===gi)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===fa)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=gi){const l=this.elements,c=1/(e-t),d=1/(i-s),u=1/(o-r),h=(e+t)*c,g=(i+s)*d;let _,m;if(a===gi)_=(o+r)*u,m=-2*u;else if(a===fa)_=r*u,m=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=m,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ps=new z,Dn=new Se,Ax=new z(0,0,0),Rx=new z(1,1,1),Pi=new z,Mo=new z,fn=new z,nd=new Se,id=new gs;class Jn{constructor(t=0,e=0,i=0,s=Jn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return nd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nd,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return id.setFromEuler(this),this.setFromQuaternion(id,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jn.DEFAULT_ORDER="XYZ";class Ru{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Cx=0;const sd=new z,Is=new gs,oi=new Se,So=new z,yr=new z,Px=new z,Ix=new gs,rd=new z(1,0,0),od=new z(0,1,0),ad=new z(0,0,1),ld={type:"added"},Dx={type:"removed"},Ds={type:"childadded",child:null},Sl={type:"childremoved",child:null};class Fe extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cx++}),this.uuid=_i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DEFAULT_UP.clone();const t=new z,e=new Jn,i=new gs,s=new z(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Se},normalMatrix:{value:new Zt}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=Fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ru,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.multiply(Is),this}rotateOnWorldAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.premultiply(Is),this}rotateX(t){return this.rotateOnAxis(rd,t)}rotateY(t){return this.rotateOnAxis(od,t)}rotateZ(t){return this.rotateOnAxis(ad,t)}translateOnAxis(t,e){return sd.copy(t).applyQuaternion(this.quaternion),this.position.add(sd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(rd,t)}translateY(t){return this.translateOnAxis(od,t)}translateZ(t){return this.translateOnAxis(ad,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?So.copy(t):So.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(yr,So,this.up):oi.lookAt(So,yr,this.up),this.quaternion.setFromRotationMatrix(oi),s&&(oi.extractRotation(s.matrixWorld),Is.setFromRotationMatrix(oi),this.quaternion.premultiply(Is.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ld),Ds.child=t,this.dispatchEvent(Ds),Ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Dx),Sl.child=t,this.dispatchEvent(Sl),Sl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),oi.multiply(t.parent.matrixWorld)),t.applyMatrix4(oi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ld),Ds.child=t,this.dispatchEvent(Ds),Ds.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,t,Px),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,Ix,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),d=o(t.images),u=o(t.shapes),h=o(t.skeletons),g=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Fe.DEFAULT_UP=new z(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ln=new z,ai=new z,bl=new z,li=new z,Ls=new z,Us=new z,cd=new z,El=new z,Tl=new z,wl=new z,Al=new Te,Rl=new Te,Cl=new Te;class bn{constructor(t=new z,e=new z,i=new z){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Ln.subVectors(t,e),s.cross(Ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Ln.subVectors(s,e),ai.subVectors(i,e),bl.subVectors(t,e);const o=Ln.dot(Ln),a=Ln.dot(ai),l=Ln.dot(bl),c=ai.dot(ai),d=ai.dot(bl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const h=1/u,g=(c*l-a*d)*h,_=(o*d-a*l)*h;return r.set(1-g-_,_,g)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,li.x),l.addScaledVector(o,li.y),l.addScaledVector(a,li.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Al.setScalar(0),Rl.setScalar(0),Cl.setScalar(0),Al.fromBufferAttribute(t,e),Rl.fromBufferAttribute(t,i),Cl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Al,r.x),o.addScaledVector(Rl,r.y),o.addScaledVector(Cl,r.z),o}static isFrontFacing(t,e,i,s){return Ln.subVectors(i,e),ai.subVectors(t,e),Ln.cross(ai).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ln.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Ln.cross(ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return bn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return bn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return bn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ls.subVectors(s,i),Us.subVectors(r,i),El.subVectors(t,i);const l=Ls.dot(El),c=Us.dot(El);if(l<=0&&c<=0)return e.copy(i);Tl.subVectors(t,s);const d=Ls.dot(Tl),u=Us.dot(Tl);if(d>=0&&u<=d)return e.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return o=l/(l-d),e.copy(i).addScaledVector(Ls,o);wl.subVectors(t,r);const g=Ls.dot(wl),_=Us.dot(wl);if(_>=0&&g<=_)return e.copy(r);const m=g*c-l*_;if(m<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(i).addScaledVector(Us,a);const f=d*_-g*u;if(f<=0&&u-d>=0&&g-_>=0)return cd.subVectors(r,s),a=(u-d)/(u-d+(g-_)),e.copy(s).addScaledVector(cd,a);const p=1/(f+m+h);return o=m*p,a=h*p,e.copy(i).addScaledVector(Ls,o).addScaledVector(Us,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Kp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},bo={h:0,s:0,l:0};function Pl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=oe.workingColorSpace){if(t=Au(t,1),e=Ke(e,0,1),i=Ke(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Pl(o,r,t+1/3),this.g=Pl(o,r,t),this.b=Pl(o,r,t-1/3)}return oe.toWorkingColorSpace(this,s),this}setStyle(t,e=Un){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Un){const i=Kp[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Js(t.r),this.g=Js(t.g),this.b=Js(t.b),this}copyLinearToSRGB(t){return this.r=pl(t.r),this.g=pl(t.g),this.b=pl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Un){return oe.fromWorkingColorSpace($e.copy(this),t),Math.round(Ke($e.r*255,0,255))*65536+Math.round(Ke($e.g*255,0,255))*256+Math.round(Ke($e.b*255,0,255))}getHexString(t=Un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace($e.copy(this),e);const i=$e.r,s=$e.g,r=$e.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=d<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=Un){oe.fromWorkingColorSpace($e.copy(this),t);const e=$e.r,i=$e.g,s=$e.b;return t!==Un?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ii),this.setHSL(Ii.h+t,Ii.s+e,Ii.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ii),t.getHSL(bo);const i=Vr(Ii.h,bo.h,e),s=Vr(Ii.s,bo.s,e),r=Vr(Ii.l,bo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $e=new jt;jt.NAMES=Kp;let Lx=0;class ys extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lx++}),this.uuid=_i(),this.name="",this.type="Material",this.blending=Ks,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oc,this.blendDst=ac,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ks&&(i.blending=this.blending),this.side!==Hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==oc&&(i.blendSrc=this.blendSrc),this.blendDst!==ac&&(i.blendDst=this.blendDst),this.blendEquation!==ss&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _n extends ys{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Lp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ie=new z,Eo=new Vt;class Ze{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Xc,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Eo.fromBufferAttribute(this,e),Eo.applyMatrix3(t),this.setXY(e,Eo.x,Eo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Nn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=he(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Nn(e,this.array)),e}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Nn(e,this.array)),e}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Nn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Nn(e,this.array)),e}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array),r=he(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Xc&&(t.usage=this.usage),t}}class Zp extends Ze{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Jp extends Ze{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class fe extends Ze{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Ux=0;const yn=new Se,Il=new Fe,Ns=new z,pn=new no,Mr=new no,ke=new z;class be extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ux++}),this.uuid=_i(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jp(t)?Jp:Zp)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return yn.makeRotationFromQuaternion(t),this.applyMatrix4(yn),this}rotateX(t){return yn.makeRotationX(t),this.applyMatrix4(yn),this}rotateY(t){return yn.makeRotationY(t),this.applyMatrix4(yn),this}rotateZ(t){return yn.makeRotationZ(t),this.applyMatrix4(yn),this}translate(t,e,i){return yn.makeTranslation(t,e,i),this.applyMatrix4(yn),this}scale(t,e,i){return yn.makeScale(t,e,i),this.applyMatrix4(yn),this}lookAt(t){return Il.lookAt(t),Il.updateMatrix(),this.applyMatrix4(Il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new fe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new no);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Va);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const i=this.boundingSphere.center;if(pn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Mr.setFromBufferAttribute(a),this.morphTargetsRelative?(ke.addVectors(pn.min,Mr.min),pn.expandByPoint(ke),ke.addVectors(pn.max,Mr.max),pn.expandByPoint(ke)):(pn.expandByPoint(Mr.min),pn.expandByPoint(Mr.max))}pn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)ke.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ke));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)ke.fromBufferAttribute(a,c),l&&(Ns.fromBufferAttribute(t,c),ke.add(Ns)),s=Math.max(s,i.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new z,l[D]=new z;const c=new z,d=new z,u=new z,h=new Vt,g=new Vt,_=new Vt,m=new z,f=new z;function p(D,U,y){c.fromBufferAttribute(i,D),d.fromBufferAttribute(i,U),u.fromBufferAttribute(i,y),h.fromBufferAttribute(r,D),g.fromBufferAttribute(r,U),_.fromBufferAttribute(r,y),d.sub(c),u.sub(c),g.sub(h),_.sub(h);const E=1/(g.x*_.y-_.x*g.y);isFinite(E)&&(m.copy(d).multiplyScalar(_.y).addScaledVector(u,-g.y).multiplyScalar(E),f.copy(u).multiplyScalar(g.x).addScaledVector(d,-_.x).multiplyScalar(E),a[D].add(m),a[U].add(m),a[y].add(m),l[D].add(f),l[U].add(f),l[y].add(f))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let D=0,U=S.length;D<U;++D){const y=S[D],E=y.start,X=y.count;for(let O=E,W=E+X;O<W;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const x=new z,M=new z,R=new z,C=new z;function w(D){R.fromBufferAttribute(s,D),C.copy(R);const U=a[D];x.copy(U),x.sub(R.multiplyScalar(R.dot(U))).normalize(),M.crossVectors(C,U);const E=M.dot(l[D])<0?-1:1;o.setXYZW(D,x.x,x.y,x.z,E)}for(let D=0,U=S.length;D<U;++D){const y=S[D],E=y.start,X=y.count;for(let O=E,W=E+X;O<W;O+=3)w(t.getX(O+0)),w(t.getX(O+1)),w(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ze(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);const s=new z,r=new z,o=new z,a=new z,l=new z,c=new z,d=new z,u=new z;if(t)for(let h=0,g=t.count;h<g;h+=3){const _=t.getX(h+0),m=t.getX(h+1),f=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,m),o.fromBufferAttribute(e,f),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),c.fromBufferAttribute(i,f),a.add(d),l.add(d),c.add(d),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(m,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let h=0,g=e.count;h<g;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(a,l){const c=a.array,d=a.itemSize,u=a.normalized,h=new c.constructor(l.length*d);let g=0,_=0;for(let m=0,f=l.length;m<f;m++){a.isInterleavedBufferAttribute?g=l[m]*a.data.stride+a.offset:g=l[m]*d;for(let p=0;p<d;p++)h[_++]=c[g++]}return new Ze(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new be,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let d=0,u=c.length;d<u;d++){const h=c[d],g=t(h,i);l.push(g)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const g=c[u];d.push(g.toJSON(t.data))}d.length>0&&(s[l]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(e))}const r=t.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,g=u.length;h<g;h++)d.push(u[h].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,d=o.length;c<d;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ud=new Se,Ji=new Ha,To=new Va,hd=new z,wo=new z,Ao=new z,Ro=new z,Dl=new z,Co=new z,dd=new z,Po=new z;class de extends Fe{constructor(t=new be,e=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Co.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=a[l],u=r[l];d!==0&&(Dl.fromBufferAttribute(u,t),o?Co.addScaledVector(Dl,d):Co.addScaledVector(Dl.sub(e),d))}e.add(Co)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),To.copy(i.boundingSphere),To.applyMatrix4(r),Ji.copy(t.ray).recast(t.near),!(To.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(To,hd)===null||Ji.origin.distanceToSquared(hd)>(t.far-t.near)**2))&&(ud.copy(r).invert(),Ji.copy(t.ray).applyMatrix4(ud),!(i.boundingBox!==null&&Ji.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ji)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,m=h.length;_<m;_++){const f=h[_],p=o[f.materialIndex],S=Math.max(f.start,g.start),x=Math.min(a.count,Math.min(f.start+f.count,g.start+g.count));for(let M=S,R=x;M<R;M+=3){const C=a.getX(M),w=a.getX(M+1),D=a.getX(M+2);s=Io(this,p,t,i,c,d,u,C,w,D),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const _=Math.max(0,g.start),m=Math.min(a.count,g.start+g.count);for(let f=_,p=m;f<p;f+=3){const S=a.getX(f),x=a.getX(f+1),M=a.getX(f+2);s=Io(this,o,t,i,c,d,u,S,x,M),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,m=h.length;_<m;_++){const f=h[_],p=o[f.materialIndex],S=Math.max(f.start,g.start),x=Math.min(l.count,Math.min(f.start+f.count,g.start+g.count));for(let M=S,R=x;M<R;M+=3){const C=M,w=M+1,D=M+2;s=Io(this,p,t,i,c,d,u,C,w,D),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const _=Math.max(0,g.start),m=Math.min(l.count,g.start+g.count);for(let f=_,p=m;f<p;f+=3){const S=f,x=f+1,M=f+2;s=Io(this,o,t,i,c,d,u,S,x,M),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}}function Nx(n,t,e,i,s,r,o,a){let l;if(t.side===un?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Hi,a),l===null)return null;Po.copy(a),Po.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Po);return c<e.near||c>e.far?null:{distance:c,point:Po.clone(),object:n}}function Io(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,wo),n.getVertexPosition(l,Ao),n.getVertexPosition(c,Ro);const d=Nx(n,t,e,i,wo,Ao,Ro,dd);if(d){const u=new z;bn.getBarycoord(dd,wo,Ao,Ro,u),s&&(d.uv=bn.getInterpolatedAttribute(s,a,l,c,u,new Vt)),r&&(d.uv1=bn.getInterpolatedAttribute(r,a,l,c,u,new Vt)),o&&(d.normal=bn.getInterpolatedAttribute(o,a,l,c,u,new z),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new z,materialIndex:0};bn.getNormal(wo,Ao,Ro,h.normal),d.face=h,d.barycoord=u}return d}class qn extends be{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],d=[],u=[];let h=0,g=0;_("z","y","x",-1,-1,i,e,t,o,r,0),_("z","y","x",1,-1,i,e,-t,o,r,1),_("x","z","y",1,1,t,i,e,s,o,2),_("x","z","y",1,-1,t,i,-e,s,o,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(d,3)),this.setAttribute("uv",new fe(u,2));function _(m,f,p,S,x,M,R,C,w,D,U){const y=M/w,E=R/D,X=M/2,O=R/2,W=C/2,Y=w+1,B=D+1;let G=0,$=0;const ot=new z;for(let gt=0;gt<B;gt++){const rt=gt*E-O;for(let vt=0;vt<Y;vt++){const St=vt*y-X;ot[m]=St*S,ot[f]=rt*x,ot[p]=W,c.push(ot.x,ot.y,ot.z),ot[m]=0,ot[f]=0,ot[p]=C>0?1:-1,d.push(ot.x,ot.y,ot.z),u.push(vt/w),u.push(1-gt/D),G+=1}}for(let gt=0;gt<D;gt++)for(let rt=0;rt<w;rt++){const vt=h+rt+Y*gt,St=h+rt+Y*(gt+1),Q=h+(rt+1)+Y*(gt+1),ht=h+(rt+1)+Y*gt;l.push(vt,St,ht),l.push(St,Q,ht),$+=6}a.addGroup(g,$,U),g+=$,h+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function cr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function tn(n){const t={};for(let e=0;e<n.length;e++){const i=cr(n[e]);for(const s in i)t[s]=i[s]}return t}function Ox(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Qp(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const Fx={clone:cr,merge:tn};var zx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gi extends ys{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zx,this.fragmentShader=Bx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=cr(t.uniforms),this.uniformsGroups=Ox(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class tm extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=gi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Di=new z,fd=new Vt,pd=new Vt;class Mn extends tm{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Zr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(kr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zr*2*Math.atan(Math.tan(kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Di.x,Di.y).multiplyScalar(-t/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Di.x,Di.y).multiplyScalar(-t/Di.z)}getViewSize(t,e){return this.getViewBounds(t,fd,pd),e.subVectors(pd,fd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(kr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Os=-90,Fs=1;class kx extends Fe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(Os,Fs,t,e);s.layers=this.layers,this.add(s);const r=new Mn(Os,Fs,t,e);r.layers=this.layers,this.add(r);const o=new Mn(Os,Fs,t,e);o.layers=this.layers,this.add(o);const a=new Mn(Os,Fs,t,e);a.layers=this.layers,this.add(a);const l=new Mn(Os,Fs,t,e);l.layers=this.layers,this.add(l);const c=new Mn(Os,Fs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===gi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===fa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,d]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const m=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=m,t.setRenderTarget(i,5,s),t.render(e,d),t.setRenderTarget(u,h,g),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class em extends rn{constructor(t,e,i,s,r,o,a,l,c,d){t=t!==void 0?t:[],e=e!==void 0?e:rr,super(t,e,i,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Vx extends ms{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new em(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Sn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new qn(5,5,5),r=new Gi({name:"CubemapFromEquirect",uniforms:cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:Bi});r.uniforms.tEquirect.value=e;const o=new de(s,r),a=e.minFilter;return e.minFilter===cs&&(e.minFilter=Sn),new kx(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Ll=new z,Hx=new z,Gx=new Zt;class di{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ll.subVectors(i,e).cross(Hx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ll),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Gx.getNormalMatrix(t),s=this.coplanarPoint(Ll).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qi=new Va,Do=new z;class Cu{constructor(t=new di,e=new di,i=new di,s=new di,r=new di,o=new di){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=gi){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],d=s[5],u=s[6],h=s[7],g=s[8],_=s[9],m=s[10],f=s[11],p=s[12],S=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-r,h-c,f-g,M-p).normalize(),i[1].setComponents(l+r,h+c,f+g,M+p).normalize(),i[2].setComponents(l+o,h+d,f+_,M+S).normalize(),i[3].setComponents(l-o,h-d,f-_,M-S).normalize(),i[4].setComponents(l-a,h-u,f-m,M-x).normalize(),e===gi)i[5].setComponents(l+a,h+u,f+m,M+x).normalize();else if(e===fa)i[5].setComponents(a,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(t){return Qi.center.set(0,0,0),Qi.radius=.7071067811865476,Qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Do.x=s.normal.x>0?t.max.x:t.min.x,Do.y=s.normal.y>0?t.max.y:t.min.y,Do.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Do)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function nm(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Wx(n){const t=new WeakMap;function e(a,l){const c=a.array,d=a.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,d),a.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const d=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,d);else{u.sort((g,_)=>g.start-_.start);let h=0;for(let g=1;g<u.length;g++){const _=u[h],m=u[g];m.start<=_.start+_.count+1?_.count=Math.max(_.count,m.start+m.count-_.start):(++h,u[h]=m)}u.length=h+1;for(let g=0,_=u.length;g<_;g++){const m=u[g];n.bufferSubData(c,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Ga extends be{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,d=l+1,u=t/a,h=e/l,g=[],_=[],m=[],f=[];for(let p=0;p<d;p++){const S=p*h-o;for(let x=0;x<c;x++){const M=x*u-r;_.push(M,-S,0),m.push(0,0,1),f.push(x/a),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const x=S+c*p,M=S+c*(p+1),R=S+1+c*(p+1),C=S+1+c*p;g.push(x,M,C),g.push(M,R,C)}this.setIndex(g),this.setAttribute("position",new fe(_,3)),this.setAttribute("normal",new fe(m,3)),this.setAttribute("uv",new fe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ga(t.width,t.height,t.widthSegments,t.heightSegments)}}var Xx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$x=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,jx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Jx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ty=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ey=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ny=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ry=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,oy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ay=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ly=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,py=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,my=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_y=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,My="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sy=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,by=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ey=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ty=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ay=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ry=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Py=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Iy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ly=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ny=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Oy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Fy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,zy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,By=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ky=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Gy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$y=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ky=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,tM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,oM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,aM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,uM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_M=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,yM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,MM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,SM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,EM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,TM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,AM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,RM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,CM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,PM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,IM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,DM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,LM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,UM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,NM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,OM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,FM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,BM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,VM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,HM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,GM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const WM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,XM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$M=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,YM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ZM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,JM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,QM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,tS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,mS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_S=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,SS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:Xx,alphahash_pars_fragment:$x,alphamap_fragment:jx,alphamap_pars_fragment:Yx,alphatest_fragment:qx,alphatest_pars_fragment:Kx,aomap_fragment:Zx,aomap_pars_fragment:Jx,batching_pars_vertex:Qx,batching_vertex:ty,begin_vertex:ey,beginnormal_vertex:ny,bsdfs:iy,iridescence_fragment:sy,bumpmap_pars_fragment:ry,clipping_planes_fragment:oy,clipping_planes_pars_fragment:ay,clipping_planes_pars_vertex:ly,clipping_planes_vertex:cy,color_fragment:uy,color_pars_fragment:hy,color_pars_vertex:dy,color_vertex:fy,common:py,cube_uv_reflection_fragment:my,defaultnormal_vertex:gy,displacementmap_pars_vertex:_y,displacementmap_vertex:vy,emissivemap_fragment:xy,emissivemap_pars_fragment:yy,colorspace_fragment:My,colorspace_pars_fragment:Sy,envmap_fragment:by,envmap_common_pars_fragment:Ey,envmap_pars_fragment:Ty,envmap_pars_vertex:wy,envmap_physical_pars_fragment:Fy,envmap_vertex:Ay,fog_vertex:Ry,fog_pars_vertex:Cy,fog_fragment:Py,fog_pars_fragment:Iy,gradientmap_pars_fragment:Dy,lightmap_pars_fragment:Ly,lights_lambert_fragment:Uy,lights_lambert_pars_fragment:Ny,lights_pars_begin:Oy,lights_toon_fragment:zy,lights_toon_pars_fragment:By,lights_phong_fragment:ky,lights_phong_pars_fragment:Vy,lights_physical_fragment:Hy,lights_physical_pars_fragment:Gy,lights_fragment_begin:Wy,lights_fragment_maps:Xy,lights_fragment_end:$y,logdepthbuf_fragment:jy,logdepthbuf_pars_fragment:Yy,logdepthbuf_pars_vertex:qy,logdepthbuf_vertex:Ky,map_fragment:Zy,map_pars_fragment:Jy,map_particle_fragment:Qy,map_particle_pars_fragment:tM,metalnessmap_fragment:eM,metalnessmap_pars_fragment:nM,morphinstance_vertex:iM,morphcolor_vertex:sM,morphnormal_vertex:rM,morphtarget_pars_vertex:oM,morphtarget_vertex:aM,normal_fragment_begin:lM,normal_fragment_maps:cM,normal_pars_fragment:uM,normal_pars_vertex:hM,normal_vertex:dM,normalmap_pars_fragment:fM,clearcoat_normal_fragment_begin:pM,clearcoat_normal_fragment_maps:mM,clearcoat_pars_fragment:gM,iridescence_pars_fragment:_M,opaque_fragment:vM,packing:xM,premultiplied_alpha_fragment:yM,project_vertex:MM,dithering_fragment:SM,dithering_pars_fragment:bM,roughnessmap_fragment:EM,roughnessmap_pars_fragment:TM,shadowmap_pars_fragment:wM,shadowmap_pars_vertex:AM,shadowmap_vertex:RM,shadowmask_pars_fragment:CM,skinbase_vertex:PM,skinning_pars_vertex:IM,skinning_vertex:DM,skinnormal_vertex:LM,specularmap_fragment:UM,specularmap_pars_fragment:NM,tonemapping_fragment:OM,tonemapping_pars_fragment:FM,transmission_fragment:zM,transmission_pars_fragment:BM,uv_pars_fragment:kM,uv_pars_vertex:VM,uv_vertex:HM,worldpos_vertex:GM,background_vert:WM,background_frag:XM,backgroundCube_vert:$M,backgroundCube_frag:jM,cube_vert:YM,cube_frag:qM,depth_vert:KM,depth_frag:ZM,distanceRGBA_vert:JM,distanceRGBA_frag:QM,equirect_vert:tS,equirect_frag:eS,linedashed_vert:nS,linedashed_frag:iS,meshbasic_vert:sS,meshbasic_frag:rS,meshlambert_vert:oS,meshlambert_frag:aS,meshmatcap_vert:lS,meshmatcap_frag:cS,meshnormal_vert:uS,meshnormal_frag:hS,meshphong_vert:dS,meshphong_frag:fS,meshphysical_vert:pS,meshphysical_frag:mS,meshtoon_vert:gS,meshtoon_frag:_S,points_vert:vS,points_frag:xS,shadow_vert:yS,shadow_frag:MS,sprite_vert:SS,sprite_frag:bS},yt={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Wn={basic:{uniforms:tn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:tn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:tn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:tn([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:tn([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:tn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:tn([yt.points,yt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:tn([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:tn([yt.common,yt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:tn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:tn([yt.sprite,yt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:tn([yt.common,yt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:tn([yt.lights,yt.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};Wn.physical={uniforms:tn([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const Lo={r:0,b:0,g:0},ts=new Jn,ES=new Se;function TS(n,t,e,i,s,r,o){const a=new jt(0);let l=r===!0?0:1,c,d,u=null,h=0,g=null;function _(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function m(S){let x=!1;const M=_(S);M===null?p(a,l):M&&M.isColor&&(p(M,1),x=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function f(S,x){const M=_(x);M&&(M.isCubeTexture||M.mapping===Ba)?(d===void 0&&(d=new de(new qn(1,1,1),new Gi({name:"BackgroundCubeMaterial",uniforms:cr(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),ts.copy(x.backgroundRotation),ts.x*=-1,ts.y*=-1,ts.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ts.y*=-1,ts.z*=-1),d.material.uniforms.envMap.value=M,d.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(ES.makeRotationFromEuler(ts)),d.material.toneMapped=oe.getTransfer(M.colorSpace)!==Me,(u!==M||h!==M.version||g!==n.toneMapping)&&(d.material.needsUpdate=!0,u=M,h=M.version,g=n.toneMapping),d.layers.enableAll(),S.unshift(d,d.geometry,d.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new de(new Ga(2,2),new Gi({name:"BackgroundMaterial",uniforms:cr(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=oe.getTransfer(M.colorSpace)!==Me,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||g!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,g=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,x){S.getRGB(Lo,Qp(n)),i.buffers.color.setClear(Lo.r,Lo.g,Lo.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:m,addToRenderList:f}}function wS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(y,E,X,O,W){let Y=!1;const B=u(O,X,E);r!==B&&(r=B,c(r.object)),Y=g(y,O,X,W),Y&&_(y,O,X,W),W!==null&&t.update(W,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,M(y,E,X,O),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function d(y){return n.deleteVertexArray(y)}function u(y,E,X){const O=X.wireframe===!0;let W=i[y.id];W===void 0&&(W={},i[y.id]=W);let Y=W[E.id];Y===void 0&&(Y={},W[E.id]=Y);let B=Y[O];return B===void 0&&(B=h(l()),Y[O]=B),B}function h(y){const E=[],X=[],O=[];for(let W=0;W<e;W++)E[W]=0,X[W]=0,O[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:X,attributeDivisors:O,object:y,attributes:{},index:null}}function g(y,E,X,O){const W=r.attributes,Y=E.attributes;let B=0;const G=X.getAttributes();for(const $ in G)if(G[$].location>=0){const gt=W[$];let rt=Y[$];if(rt===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(rt=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(rt=y.instanceColor)),gt===void 0||gt.attribute!==rt||rt&&gt.data!==rt.data)return!0;B++}return r.attributesNum!==B||r.index!==O}function _(y,E,X,O){const W={},Y=E.attributes;let B=0;const G=X.getAttributes();for(const $ in G)if(G[$].location>=0){let gt=Y[$];gt===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(gt=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(gt=y.instanceColor));const rt={};rt.attribute=gt,gt&&gt.data&&(rt.data=gt.data),W[$]=rt,B++}r.attributes=W,r.attributesNum=B,r.index=O}function m(){const y=r.newAttributes;for(let E=0,X=y.length;E<X;E++)y[E]=0}function f(y){p(y,0)}function p(y,E){const X=r.newAttributes,O=r.enabledAttributes,W=r.attributeDivisors;X[y]=1,O[y]===0&&(n.enableVertexAttribArray(y),O[y]=1),W[y]!==E&&(n.vertexAttribDivisor(y,E),W[y]=E)}function S(){const y=r.newAttributes,E=r.enabledAttributes;for(let X=0,O=E.length;X<O;X++)E[X]!==y[X]&&(n.disableVertexAttribArray(X),E[X]=0)}function x(y,E,X,O,W,Y,B){B===!0?n.vertexAttribIPointer(y,E,X,W,Y):n.vertexAttribPointer(y,E,X,O,W,Y)}function M(y,E,X,O){m();const W=O.attributes,Y=X.getAttributes(),B=E.defaultAttributeValues;for(const G in Y){const $=Y[G];if($.location>=0){let ot=W[G];if(ot===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(ot=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(ot=y.instanceColor)),ot!==void 0){const gt=ot.normalized,rt=ot.itemSize,vt=t.get(ot);if(vt===void 0)continue;const St=vt.buffer,Q=vt.type,ht=vt.bytesPerElement,bt=Q===n.INT||Q===n.UNSIGNED_INT||ot.gpuType===yu;if(ot.isInterleavedBufferAttribute){const Et=ot.data,Wt=Et.stride,kt=ot.offset;if(Et.isInstancedInterleavedBuffer){for(let Jt=0;Jt<$.locationSize;Jt++)p($.location+Jt,Et.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Et.meshPerAttribute*Et.count)}else for(let Jt=0;Jt<$.locationSize;Jt++)f($.location+Jt);n.bindBuffer(n.ARRAY_BUFFER,St);for(let Jt=0;Jt<$.locationSize;Jt++)x($.location+Jt,rt/$.locationSize,Q,gt,Wt*ht,(kt+rt/$.locationSize*Jt)*ht,bt)}else{if(ot.isInstancedBufferAttribute){for(let Et=0;Et<$.locationSize;Et++)p($.location+Et,ot.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Et=0;Et<$.locationSize;Et++)f($.location+Et);n.bindBuffer(n.ARRAY_BUFFER,St);for(let Et=0;Et<$.locationSize;Et++)x($.location+Et,rt/$.locationSize,Q,gt,rt*ht,rt/$.locationSize*Et*ht,bt)}}else if(B!==void 0){const gt=B[G];if(gt!==void 0)switch(gt.length){case 2:n.vertexAttrib2fv($.location,gt);break;case 3:n.vertexAttrib3fv($.location,gt);break;case 4:n.vertexAttrib4fv($.location,gt);break;default:n.vertexAttrib1fv($.location,gt)}}}}S()}function R(){D();for(const y in i){const E=i[y];for(const X in E){const O=E[X];for(const W in O)d(O[W].object),delete O[W];delete E[X]}delete i[y]}}function C(y){if(i[y.id]===void 0)return;const E=i[y.id];for(const X in E){const O=E[X];for(const W in O)d(O[W].object),delete O[W];delete E[X]}delete i[y.id]}function w(y){for(const E in i){const X=i[E];if(X[y.id]===void 0)continue;const O=X[y.id];for(const W in O)d(O[W].object),delete O[W];delete X[y.id]}}function D(){U(),o=!0,r!==s&&(r=s,c(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:U,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:m,enableAttribute:f,disableUnusedAttributes:S}}function AS(n,t,e){let i;function s(c){i=c}function r(c,d){n.drawArrays(i,c,d),e.update(d,i,1)}function o(c,d,u){u!==0&&(n.drawArraysInstanced(i,c,d,u),e.update(d,i,u))}function a(c,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];e.update(g,i,1)}function l(c,d,u,h){if(u===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let _=0;_<c.length;_++)o(c[_],d[_],h[_]);else{g.multiDrawArraysInstancedWEBGL(i,c,0,d,0,h,0,u);let _=0;for(let m=0;m<u;m++)_+=d[m];for(let m=0;m<h.length;m++)e.update(_,i,h[m])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function RS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==On&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const D=w===eo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==bi&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==mi&&!D)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(h===!0){const w=t.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:g,maxVertexTextures:_,maxTextureSize:m,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:S,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:R,maxSamples:C}}function CS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new di,a=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const g=u.length!==0||h||i!==0||s;return s=h,i=u.length,g},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){e=d(u,h,0)},this.setState=function(u,h,g){const _=u.clippingPlanes,m=u.clipIntersection,f=u.clipShadows,p=n.get(u);if(!s||_===null||_.length===0||r&&!f)r?d(null):c();else{const S=r?0:i,x=S*4;let M=p.clippingState||null;l.value=M,M=d(_,h,x,g);for(let R=0;R!==x;++R)M[R]=e[R];p.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(u,h,g,_){const m=u!==null?u.length:0;let f=null;if(m!==0){if(f=l.value,_!==!0||f===null){const p=g+m*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(f===null||f.length<p)&&(f=new Float32Array(p));for(let x=0,M=g;x!==m;++x,M+=4)o.copy(u[x]).applyMatrix4(S,a),o.normal.toArray(f,M),f[M+3]=o.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=m,t.numIntersection=0,f}}function PS(n){let t=new WeakMap;function e(o,a){return a===mc?o.mapping=rr:a===gc&&(o.mapping=or),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===mc||a===gc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vx(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class im extends tm{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const $s=4,md=[.125,.215,.35,.446,.526,.582],rs=20,Ul=new im,gd=new jt;let Nl=null,Ol=0,Fl=0,zl=!1;const is=(1+Math.sqrt(5))/2,zs=1/is,_d=[new z(-is,zs,0),new z(is,zs,0),new z(-zs,0,is),new z(zs,0,is),new z(0,is,-zs),new z(0,is,zs),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class vd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Nl=this._renderer.getRenderTarget(),Ol=this._renderer.getActiveCubeFace(),Fl=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Md(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Nl,Ol,Fl),this._renderer.xr.enabled=zl,t.scissorTest=!1,Uo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===rr||t.mapping===or?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Nl=this._renderer.getRenderTarget(),Ol=this._renderer.getActiveCubeFace(),Fl=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:eo,format:On,colorSpace:Xi,depthBuffer:!1},s=xd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xd(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=IS(r)),this._blurMaterial=DS(r,t,e)}return s}_compileMaterial(t){const e=new de(this._lodPlanes[0],t);this._renderer.compile(e,Ul)}_sceneToCubeUV(t,e,i,s){const a=new Mn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(gd),d.toneMapping=ki,d.autoClear=!1;const g=new _n({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),_=new de(new qn,g);let m=!1;const f=t.background;f?f.isColor&&(g.color.copy(f),t.background=null,m=!0):(g.color.copy(gd),m=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):S===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;Uo(s,S*x,p>2?x:0,x,x),d.setRenderTarget(s),m&&d.render(_,a),d.render(t,a)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=h,d.autoClear=u,t.background=f}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===rr||t.mapping===or;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Md()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new de(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Uo(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Ul)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=_d[(s-r-1)%_d.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new de(this._lodPlanes[s],c),h=c.uniforms,g=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*rs-1),m=r/_,f=isFinite(r)?1+Math.floor(d*m):rs;f>rs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${rs}`);const p=[];let S=0;for(let w=0;w<rs;++w){const D=w/m,U=Math.exp(-D*D/2);p.push(U),w===0?S+=U:w<f&&(S+=2*U)}for(let w=0;w<p.length;w++)p[w]=p[w]/S;h.envMap.value=t.texture,h.samples.value=f,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=_,h.mipInt.value=x-i;const M=this._sizeLods[s],R=3*M*(s>x-$s?s-x+$s:0),C=4*(this._cubeSize-M);Uo(e,R,C,3*M,2*M),l.setRenderTarget(e),l.render(u,Ul)}}function IS(n){const t=[],e=[],i=[];let s=n;const r=n-$s+1+md.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-$s?l=md[o-n+$s-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],g=6,_=6,m=3,f=2,p=1,S=new Float32Array(m*_*g),x=new Float32Array(f*_*g),M=new Float32Array(p*_*g);for(let C=0;C<g;C++){const w=C%3*2/3-1,D=C>2?0:-1,U=[w,D,0,w+2/3,D,0,w+2/3,D+1,0,w,D,0,w+2/3,D+1,0,w,D+1,0];S.set(U,m*_*C),x.set(h,f*_*C);const y=[C,C,C,C,C,C];M.set(y,p*_*C)}const R=new be;R.setAttribute("position",new Ze(S,m)),R.setAttribute("uv",new Ze(x,f)),R.setAttribute("faceIndex",new Ze(M,p)),t.push(R),s>$s&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function xd(n,t,e){const i=new ms(n,t,e);return i.texture.mapping=Ba,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Uo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function DS(n,t,e){const i=new Float32Array(rs),s=new z(0,1,0);return new Gi({name:"SphericalGaussianBlur",defines:{n:rs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function yd(){return new Gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function Md(){return new Gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function Pu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function LS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===mc||l===gc,d=l===rr||l===or;if(c||d){let u=t.get(a);const h=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new vd(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const g=a.image;return c&&g&&g.height>0||d&&g&&s(g)?(e===null&&(e=new vd(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function US(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Zo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function NS(n,t,e,i){const s={},r=new WeakMap;function o(u){const h=u.target;h.index!==null&&t.remove(h.index);for(const _ in h.attributes)t.remove(h.attributes[_]);for(const _ in h.morphAttributes){const m=h.morphAttributes[_];for(let f=0,p=m.length;f<p;f++)t.remove(m[f])}h.removeEventListener("dispose",o),delete s[h.id];const g=r.get(h);g&&(t.remove(g),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(u,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(u){const h=u.attributes;for(const _ in h)t.update(h[_],n.ARRAY_BUFFER);const g=u.morphAttributes;for(const _ in g){const m=g[_];for(let f=0,p=m.length;f<p;f++)t.update(m[f],n.ARRAY_BUFFER)}}function c(u){const h=[],g=u.index,_=u.attributes.position;let m=0;if(g!==null){const S=g.array;m=g.version;for(let x=0,M=S.length;x<M;x+=3){const R=S[x+0],C=S[x+1],w=S[x+2];h.push(R,C,C,w,w,R)}}else if(_!==void 0){const S=_.array;m=_.version;for(let x=0,M=S.length/3-1;x<M;x+=3){const R=x+0,C=x+1,w=x+2;h.push(R,C,C,w,w,R)}}else return;const f=new(jp(h)?Jp:Zp)(h,1);f.version=m;const p=r.get(u);p&&t.remove(p),r.set(u,f)}function d(u){const h=r.get(u);if(h){const g=u.index;g!==null&&h.version<g.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:d}}function OS(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,g){n.drawElements(i,g,r,h*o),e.update(g,i,1)}function c(h,g,_){_!==0&&(n.drawElementsInstanced(i,g,r,h*o,_),e.update(g,i,_))}function d(h,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,g,0,r,h,0,_);let f=0;for(let p=0;p<_;p++)f+=g[p];e.update(f,i,1)}function u(h,g,_,m){if(_===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<h.length;p++)c(h[p]/o,g[p],m[p]);else{f.multiDrawElementsInstancedWEBGL(i,g,0,r,h,0,m,0,_);let p=0;for(let S=0;S<_;S++)p+=g[S];for(let S=0;S<m.length;S++)e.update(p,i,m[S])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function FS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function zS(n,t,e){const i=new WeakMap,s=new Te;function r(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(a);if(h===void 0||h.count!==u){let y=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var g=y;h!==void 0&&h.texture.dispose();const _=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let M=0;_===!0&&(M=1),m===!0&&(M=2),f===!0&&(M=3);let R=a.attributes.position.count*M,C=1;R>t.maxTextureSize&&(C=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const w=new Float32Array(R*C*4*u),D=new qp(w,R,C,u);D.type=mi,D.needsUpdate=!0;const U=M*4;for(let E=0;E<u;E++){const X=p[E],O=S[E],W=x[E],Y=R*C*4*E;for(let B=0;B<X.count;B++){const G=B*U;_===!0&&(s.fromBufferAttribute(X,B),w[Y+G+0]=s.x,w[Y+G+1]=s.y,w[Y+G+2]=s.z,w[Y+G+3]=0),m===!0&&(s.fromBufferAttribute(O,B),w[Y+G+4]=s.x,w[Y+G+5]=s.y,w[Y+G+6]=s.z,w[Y+G+7]=0),f===!0&&(s.fromBufferAttribute(W,B),w[Y+G+8]=s.x,w[Y+G+9]=s.y,w[Y+G+10]=s.z,w[Y+G+11]=W.itemSize===4?s.w:1)}}h={count:u,texture:D,size:new Vt(R,C)},i.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let _=0;for(let f=0;f<c.length;f++)_+=c[f];const m=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function BS(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,d=l.geometry,u=t.get(l,d);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class sm extends rn{constructor(t,e,i,s,r,o,a,l,c,d=Zs){if(d!==Zs&&d!==lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Zs&&(i=ps),i===void 0&&d===lr&&(i=ar),super(null,s,r,o,a,l,d,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:An,this.minFilter=l!==void 0?l:An,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const rm=new rn,Sd=new sm(1,1),om=new qp,am=new Tx,lm=new em,bd=[],Ed=[],Td=new Float32Array(16),wd=new Float32Array(9),Ad=new Float32Array(4);function hr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=bd[s];if(r===void 0&&(r=new Float32Array(s),bd[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function ze(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Be(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Wa(n,t){let e=Ed[t];e===void 0&&(e=new Int32Array(t),Ed[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function kS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function VS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2fv(this.addr,t),Be(e,t)}}function HS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;n.uniform3fv(this.addr,t),Be(e,t)}}function GS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4fv(this.addr,t),Be(e,t)}}function WS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(ze(e,i))return;Ad.set(i),n.uniformMatrix2fv(this.addr,!1,Ad),Be(e,i)}}function XS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(ze(e,i))return;wd.set(i),n.uniformMatrix3fv(this.addr,!1,wd),Be(e,i)}}function $S(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(ze(e,i))return;Td.set(i),n.uniformMatrix4fv(this.addr,!1,Td),Be(e,i)}}function jS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function YS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2iv(this.addr,t),Be(e,t)}}function qS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;n.uniform3iv(this.addr,t),Be(e,t)}}function KS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4iv(this.addr,t),Be(e,t)}}function ZS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function JS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2uiv(this.addr,t),Be(e,t)}}function QS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;n.uniform3uiv(this.addr,t),Be(e,t)}}function tb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4uiv(this.addr,t),Be(e,t)}}function eb(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Sd.compareFunction=$p,r=Sd):r=rm,e.setTexture2D(t||r,s)}function nb(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||am,s)}function ib(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||lm,s)}function sb(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||om,s)}function rb(n){switch(n){case 5126:return kS;case 35664:return VS;case 35665:return HS;case 35666:return GS;case 35674:return WS;case 35675:return XS;case 35676:return $S;case 5124:case 35670:return jS;case 35667:case 35671:return YS;case 35668:case 35672:return qS;case 35669:case 35673:return KS;case 5125:return ZS;case 36294:return JS;case 36295:return QS;case 36296:return tb;case 35678:case 36198:case 36298:case 36306:case 35682:return eb;case 35679:case 36299:case 36307:return nb;case 35680:case 36300:case 36308:case 36293:return ib;case 36289:case 36303:case 36311:case 36292:return sb}}function ob(n,t){n.uniform1fv(this.addr,t)}function ab(n,t){const e=hr(t,this.size,2);n.uniform2fv(this.addr,e)}function lb(n,t){const e=hr(t,this.size,3);n.uniform3fv(this.addr,e)}function cb(n,t){const e=hr(t,this.size,4);n.uniform4fv(this.addr,e)}function ub(n,t){const e=hr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function hb(n,t){const e=hr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function db(n,t){const e=hr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function fb(n,t){n.uniform1iv(this.addr,t)}function pb(n,t){n.uniform2iv(this.addr,t)}function mb(n,t){n.uniform3iv(this.addr,t)}function gb(n,t){n.uniform4iv(this.addr,t)}function _b(n,t){n.uniform1uiv(this.addr,t)}function vb(n,t){n.uniform2uiv(this.addr,t)}function xb(n,t){n.uniform3uiv(this.addr,t)}function yb(n,t){n.uniform4uiv(this.addr,t)}function Mb(n,t,e){const i=this.cache,s=t.length,r=Wa(e,s);ze(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||rm,r[o])}function Sb(n,t,e){const i=this.cache,s=t.length,r=Wa(e,s);ze(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||am,r[o])}function bb(n,t,e){const i=this.cache,s=t.length,r=Wa(e,s);ze(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||lm,r[o])}function Eb(n,t,e){const i=this.cache,s=t.length,r=Wa(e,s);ze(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||om,r[o])}function Tb(n){switch(n){case 5126:return ob;case 35664:return ab;case 35665:return lb;case 35666:return cb;case 35674:return ub;case 35675:return hb;case 35676:return db;case 5124:case 35670:return fb;case 35667:case 35671:return pb;case 35668:case 35672:return mb;case 35669:case 35673:return gb;case 5125:return _b;case 36294:return vb;case 36295:return xb;case 36296:return yb;case 35678:case 36198:case 36298:case 36306:case 35682:return Mb;case 35679:case 36299:case 36307:return Sb;case 35680:case 36300:case 36308:case 36293:return bb;case 36289:case 36303:case 36311:case 36292:return Eb}}class wb{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=rb(e.type)}}class Ab{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Tb(e.type)}}class Rb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Bl=/(\w+)(\])?(\[|\.)?/g;function Rd(n,t){n.seq.push(t),n.map[t.id]=t}function Cb(n,t,e){const i=n.name,s=i.length;for(Bl.lastIndex=0;;){const r=Bl.exec(i),o=Bl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Rd(e,c===void 0?new wb(a,n,t):new Ab(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new Rb(a),Rd(e,u)),e=u}}}class Jo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Cb(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Cd(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Pb=37297;let Ib=0;function Db(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function Lb(n){const t=oe.getPrimaries(oe.workingColorSpace),e=oe.getPrimaries(n);let i;switch(t===e?i="":t===da&&e===ha?i="LinearDisplayP3ToLinearSRGB":t===ha&&e===da&&(i="LinearSRGBToLinearDisplayP3"),n){case Xi:case ka:return[i,"LinearTransferOETF"];case Un:case wu:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Pd(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Db(n.getShaderSource(t),o)}else return s}function Ub(n,t){const e=Lb(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Nb(n,t){let e;switch(t){case Ov:e="Linear";break;case Fv:e="Reinhard";break;case zv:e="Cineon";break;case Bv:e="ACESFilmic";break;case Vv:e="AgX";break;case Hv:e="Neutral";break;case kv:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const No=new z;function Ob(){oe.getLuminanceCoefficients(No);const n=No.x.toFixed(4),t=No.y.toFixed(4),e=No.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pr).join(`
`)}function zb(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Bb(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Pr(n){return n!==""}function Id(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const kb=/^[ \t]*#include +<([\w\d./]+)>/gm;function $c(n){return n.replace(kb,Hb)}const Vb=new Map;function Hb(n,t){let e=Kt[t];if(e===void 0){const i=Vb.get(t);if(i!==void 0)e=Kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return $c(e)}const Gb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ld(n){return n.replace(Gb,Wb)}function Wb(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ud(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Xb(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ip?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Dp?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ci&&(t="SHADOWMAP_TYPE_VSM"),t}function $b(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case rr:case or:t="ENVMAP_TYPE_CUBE";break;case Ba:t="ENVMAP_TYPE_CUBE_UV";break}return t}function jb(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case or:t="ENVMAP_MODE_REFRACTION";break}return t}function Yb(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Lp:t="ENVMAP_BLENDING_MULTIPLY";break;case Uv:t="ENVMAP_BLENDING_MIX";break;case Nv:t="ENVMAP_BLENDING_ADD";break}return t}function qb(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Kb(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Xb(e),c=$b(e),d=jb(e),u=Yb(e),h=qb(e),g=Fb(e),_=zb(r),m=s.createProgram();let f,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Pr).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Pr).join(`
`),p.length>0&&(p+=`
`)):(f=[Ud(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),p=[Ud(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ki?"#define TONE_MAPPING":"",e.toneMapping!==ki?Kt.tonemapping_pars_fragment:"",e.toneMapping!==ki?Nb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,Ub("linearToOutputTexel",e.outputColorSpace),Ob(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Pr).join(`
`)),o=$c(o),o=Id(o,e),o=Dd(o,e),a=$c(a),a=Id(a,e),a=Dd(a,e),o=Ld(o),a=Ld(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,f=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",e.glslVersion===Kh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Kh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=S+f+o,M=S+p+a,R=Cd(s,s.VERTEX_SHADER,x),C=Cd(s,s.FRAGMENT_SHADER,M);s.attachShader(m,R),s.attachShader(m,C),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function w(E){if(n.debug.checkShaderErrors){const X=s.getProgramInfoLog(m).trim(),O=s.getShaderInfoLog(R).trim(),W=s.getShaderInfoLog(C).trim();let Y=!0,B=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,R,C);else{const G=Pd(s,R,"vertex"),$=Pd(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+X+`
`+G+`
`+$)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(O===""||W==="")&&(B=!1);B&&(E.diagnostics={runnable:Y,programLog:X,vertexShader:{log:O,prefix:f},fragmentShader:{log:W,prefix:p}})}s.deleteShader(R),s.deleteShader(C),D=new Jo(s,m),U=Bb(s,m)}let D;this.getUniforms=function(){return D===void 0&&w(this),D};let U;this.getAttributes=function(){return U===void 0&&w(this),U};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(m,Pb)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ib++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=R,this.fragmentShader=C,this}let Zb=0;class Jb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Qb(t),e.set(t,i)),i}}class Qb{constructor(t){this.id=Zb++,this.code=t,this.usedTimes=0}}function t1(n,t,e,i,s,r,o){const a=new Ru,l=new Jb,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.reverseDepthBuffer,g=s.vertexTextures;let _=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(y){return c.add(y),y===0?"uv":`uv${y}`}function p(y,E,X,O,W){const Y=O.fog,B=W.geometry,G=y.isMeshStandardMaterial?O.environment:null,$=(y.isMeshStandardMaterial?e:t).get(y.envMap||G),ot=$&&$.mapping===Ba?$.image.height:null,gt=m[y.type];y.precision!==null&&(_=s.getMaxPrecision(y.precision),_!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",_,"instead."));const rt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,vt=rt!==void 0?rt.length:0;let St=0;B.morphAttributes.position!==void 0&&(St=1),B.morphAttributes.normal!==void 0&&(St=2),B.morphAttributes.color!==void 0&&(St=3);let Q,ht,bt,Et;if(gt){const an=Wn[gt];Q=an.vertexShader,ht=an.fragmentShader}else Q=y.vertexShader,ht=y.fragmentShader,l.update(y),bt=l.getVertexShaderID(y),Et=l.getFragmentShaderID(y);const Wt=n.getRenderTarget(),kt=W.isInstancedMesh===!0,Jt=W.isBatchedMesh===!0,ae=!!y.map,I=!!y.matcap,b=!!$,tt=!!y.aoMap,nt=!!y.lightMap,et=!!y.bumpMap,q=!!y.normalMap,lt=!!y.displacementMap,st=!!y.emissiveMap,T=!!y.metalnessMap,v=!!y.roughnessMap,N=y.anisotropy>0,k=y.clearcoat>0,K=y.dispersion>0,j=y.iridescence>0,mt=y.sheen>0,dt=y.transmission>0,pt=N&&!!y.anisotropyMap,zt=k&&!!y.clearcoatMap,ct=k&&!!y.clearcoatNormalMap,Mt=k&&!!y.clearcoatRoughnessMap,Nt=j&&!!y.iridescenceMap,Gt=j&&!!y.iridescenceThicknessMap,It=mt&&!!y.sheenColorMap,Xt=mt&&!!y.sheenRoughnessMap,Bt=!!y.specularMap,le=!!y.specularColorMap,F=!!y.specularIntensityMap,Ct=dt&&!!y.transmissionMap,it=dt&&!!y.thicknessMap,at=!!y.gradientMap,wt=!!y.alphaMap,Pt=y.alphaTest>0,Qt=!!y.alphaHash,Pe=!!y.extensions;let on=ki;y.toneMapped&&(Wt===null||Wt.isXRRenderTarget===!0)&&(on=n.toneMapping);const ee={shaderID:gt,shaderType:y.type,shaderName:y.name,vertexShader:Q,fragmentShader:ht,defines:y.defines,customVertexShaderID:bt,customFragmentShaderID:Et,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:_,batching:Jt,batchingColor:Jt&&W._colorsTexture!==null,instancing:kt,instancingColor:kt&&W.instanceColor!==null,instancingMorph:kt&&W.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:Wt===null?n.outputColorSpace:Wt.isXRRenderTarget===!0?Wt.texture.colorSpace:Xi,alphaToCoverage:!!y.alphaToCoverage,map:ae,matcap:I,envMap:b,envMapMode:b&&$.mapping,envMapCubeUVHeight:ot,aoMap:tt,lightMap:nt,bumpMap:et,normalMap:q,displacementMap:g&&lt,emissiveMap:st,normalMapObjectSpace:q&&y.normalMapType===$v,normalMapTangentSpace:q&&y.normalMapType===Xp,metalnessMap:T,roughnessMap:v,anisotropy:N,anisotropyMap:pt,clearcoat:k,clearcoatMap:zt,clearcoatNormalMap:ct,clearcoatRoughnessMap:Mt,dispersion:K,iridescence:j,iridescenceMap:Nt,iridescenceThicknessMap:Gt,sheen:mt,sheenColorMap:It,sheenRoughnessMap:Xt,specularMap:Bt,specularColorMap:le,specularIntensityMap:F,transmission:dt,transmissionMap:Ct,thicknessMap:it,gradientMap:at,opaque:y.transparent===!1&&y.blending===Ks&&y.alphaToCoverage===!1,alphaMap:wt,alphaTest:Pt,alphaHash:Qt,combine:y.combine,mapUv:ae&&f(y.map.channel),aoMapUv:tt&&f(y.aoMap.channel),lightMapUv:nt&&f(y.lightMap.channel),bumpMapUv:et&&f(y.bumpMap.channel),normalMapUv:q&&f(y.normalMap.channel),displacementMapUv:lt&&f(y.displacementMap.channel),emissiveMapUv:st&&f(y.emissiveMap.channel),metalnessMapUv:T&&f(y.metalnessMap.channel),roughnessMapUv:v&&f(y.roughnessMap.channel),anisotropyMapUv:pt&&f(y.anisotropyMap.channel),clearcoatMapUv:zt&&f(y.clearcoatMap.channel),clearcoatNormalMapUv:ct&&f(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&f(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&f(y.iridescenceMap.channel),iridescenceThicknessMapUv:Gt&&f(y.iridescenceThicknessMap.channel),sheenColorMapUv:It&&f(y.sheenColorMap.channel),sheenRoughnessMapUv:Xt&&f(y.sheenRoughnessMap.channel),specularMapUv:Bt&&f(y.specularMap.channel),specularColorMapUv:le&&f(y.specularColorMap.channel),specularIntensityMapUv:F&&f(y.specularIntensityMap.channel),transmissionMapUv:Ct&&f(y.transmissionMap.channel),thicknessMapUv:it&&f(y.thicknessMap.channel),alphaMapUv:wt&&f(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(q||N),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!B.attributes.uv&&(ae||wt),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:h,skinning:W.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:St,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&X.length>0,shadowMapType:n.shadowMap.type,toneMapping:on,decodeVideoTexture:ae&&y.map.isVideoTexture===!0&&oe.getTransfer(y.map.colorSpace)===Me,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===mn,flipSided:y.side===un,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Pe&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&y.extensions.multiDraw===!0||Jt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ee.vertexUv1s=c.has(1),ee.vertexUv2s=c.has(2),ee.vertexUv3s=c.has(3),c.clear(),ee}function S(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const X in y.defines)E.push(X),E.push(y.defines[X]);return y.isRawShaderMaterial===!1&&(x(E,y),M(E,y),E.push(n.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function x(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function M(y,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.alphaToCoverage&&a.enable(20),y.push(a.mask)}function R(y){const E=m[y.type];let X;if(E){const O=Wn[E];X=Fx.clone(O.uniforms)}else X=y.uniforms;return X}function C(y,E){let X;for(let O=0,W=d.length;O<W;O++){const Y=d[O];if(Y.cacheKey===E){X=Y,++X.usedTimes;break}}return X===void 0&&(X=new Kb(n,E,y,r),d.push(X)),X}function w(y){if(--y.usedTimes===0){const E=d.indexOf(y);d[E]=d[d.length-1],d.pop(),y.destroy()}}function D(y){l.remove(y)}function U(){l.dispose()}return{getParameters:p,getProgramCacheKey:S,getUniforms:R,acquireProgram:C,releaseProgram:w,releaseShaderCache:D,programs:d,dispose:U}}function e1(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function n1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Nd(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Od(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,h,g,_,m,f){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:h,material:g,groupOrder:_,renderOrder:u.renderOrder,z:m,group:f},n[t]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=g,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=m,p.group=f),t++,p}function a(u,h,g,_,m,f){const p=o(u,h,g,_,m,f);g.transmission>0?i.push(p):g.transparent===!0?s.push(p):e.push(p)}function l(u,h,g,_,m,f){const p=o(u,h,g,_,m,f);g.transmission>0?i.unshift(p):g.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,h){e.length>1&&e.sort(u||n1),i.length>1&&i.sort(h||Nd),s.length>1&&s.sort(h||Nd)}function d(){for(let u=t,h=n.length;u<h;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function i1(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Od,n.set(i,[o])):s>=r.length?(o=new Od,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function s1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new jt};break;case"SpotLight":e={position:new z,direction:new z,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new z,halfWidth:new z,halfHeight:new z};break}return n[t.id]=e,e}}}function r1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let o1=0;function a1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function l1(n){const t=new s1,e=r1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const s=new z,r=new Se,o=new Se;function a(c){let d=0,u=0,h=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let g=0,_=0,m=0,f=0,p=0,S=0,x=0,M=0,R=0,C=0,w=0;c.sort(a1);for(let U=0,y=c.length;U<y;U++){const E=c[U],X=E.color,O=E.intensity,W=E.distance,Y=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)d+=X.r*O,u+=X.g*O,h+=X.b*O;else if(E.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(E.sh.coefficients[B],O);w++}else if(E.isDirectionalLight){const B=t.get(E);if(B.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const G=E.shadow,$=e.get(E);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,i.directionalShadow[g]=$,i.directionalShadowMap[g]=Y,i.directionalShadowMatrix[g]=E.shadow.matrix,S++}i.directional[g]=B,g++}else if(E.isSpotLight){const B=t.get(E);B.position.setFromMatrixPosition(E.matrixWorld),B.color.copy(X).multiplyScalar(O),B.distance=W,B.coneCos=Math.cos(E.angle),B.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),B.decay=E.decay,i.spot[m]=B;const G=E.shadow;if(E.map&&(i.spotLightMap[R]=E.map,R++,G.updateMatrices(E),E.castShadow&&C++),i.spotLightMatrix[m]=G.matrix,E.castShadow){const $=e.get(E);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,i.spotShadow[m]=$,i.spotShadowMap[m]=Y,M++}m++}else if(E.isRectAreaLight){const B=t.get(E);B.color.copy(X).multiplyScalar(O),B.halfWidth.set(E.width*.5,0,0),B.halfHeight.set(0,E.height*.5,0),i.rectArea[f]=B,f++}else if(E.isPointLight){const B=t.get(E);if(B.color.copy(E.color).multiplyScalar(E.intensity),B.distance=E.distance,B.decay=E.decay,E.castShadow){const G=E.shadow,$=e.get(E);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,$.shadowCameraNear=G.camera.near,$.shadowCameraFar=G.camera.far,i.pointShadow[_]=$,i.pointShadowMap[_]=Y,i.pointShadowMatrix[_]=E.shadow.matrix,x++}i.point[_]=B,_++}else if(E.isHemisphereLight){const B=t.get(E);B.skyColor.copy(E.color).multiplyScalar(O),B.groundColor.copy(E.groundColor).multiplyScalar(O),i.hemi[p]=B,p++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const D=i.hash;(D.directionalLength!==g||D.pointLength!==_||D.spotLength!==m||D.rectAreaLength!==f||D.hemiLength!==p||D.numDirectionalShadows!==S||D.numPointShadows!==x||D.numSpotShadows!==M||D.numSpotMaps!==R||D.numLightProbes!==w)&&(i.directional.length=g,i.spot.length=m,i.rectArea.length=f,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=M+R-C,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=w,D.directionalLength=g,D.pointLength=_,D.spotLength=m,D.rectAreaLength=f,D.hemiLength=p,D.numDirectionalShadows=S,D.numPointShadows=x,D.numSpotShadows=M,D.numSpotMaps=R,D.numLightProbes=w,i.version=o1++)}function l(c,d){let u=0,h=0,g=0,_=0,m=0;const f=d.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const x=c[p];if(x.isDirectionalLight){const M=i.directional[u];M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),u++}else if(x.isSpotLight){const M=i.spot[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),g++}else if(x.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(f),o.identity(),r.copy(x.matrixWorld),r.premultiply(f),o.extractRotation(r),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(f),h++}else if(x.isHemisphereLight){const M=i.hemi[m];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(f),m++}}}return{setup:a,setupView:l,state:i}}function Fd(n){const t=new l1(n),e=[],i=[];function s(d){c.camera=d,e.length=0,i.length=0}function r(d){e.push(d)}function o(d){i.push(d)}function a(){t.setup(e)}function l(d){t.setupView(e,d)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function c1(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Fd(n),t.set(s,[a])):r>=o.length?(a=new Fd(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class u1 extends ys{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class h1 extends ys{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const d1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function p1(n,t,e){let i=new Cu;const s=new Vt,r=new Vt,o=new Te,a=new u1({depthPacking:Xv}),l=new h1,c={},d=e.maxTextureSize,u={[Hi]:un,[un]:Hi,[mn]:mn},h=new Gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:d1,fragmentShader:f1}),g=h.clone();g.defines.HORIZONTAL_PASS=1;const _=new be;_.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new de(_,h),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ip;let p=this.type;this.render=function(C,w,D){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||C.length===0)return;const U=n.getRenderTarget(),y=n.getActiveCubeFace(),E=n.getActiveMipmapLevel(),X=n.state;X.setBlending(Bi),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const O=p!==ci&&this.type===ci,W=p===ci&&this.type!==ci;for(let Y=0,B=C.length;Y<B;Y++){const G=C[Y],$=G.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ot=$.getFrameExtents();if(s.multiply(ot),r.copy($.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ot.x),s.x=r.x*ot.x,$.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ot.y),s.y=r.y*ot.y,$.mapSize.y=r.y)),$.map===null||O===!0||W===!0){const rt=this.type!==ci?{minFilter:An,magFilter:An}:{};$.map!==null&&$.map.dispose(),$.map=new ms(s.x,s.y,rt),$.map.texture.name=G.name+".shadowMap",$.camera.updateProjectionMatrix()}n.setRenderTarget($.map),n.clear();const gt=$.getViewportCount();for(let rt=0;rt<gt;rt++){const vt=$.getViewport(rt);o.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),X.viewport(o),$.updateMatrices(G,rt),i=$.getFrustum(),M(w,D,$.camera,G,this.type)}$.isPointLightShadow!==!0&&this.type===ci&&S($,D),$.needsUpdate=!1}p=this.type,f.needsUpdate=!1,n.setRenderTarget(U,y,E)};function S(C,w){const D=t.update(m);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,g.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ms(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(w,null,D,h,m,null),g.uniforms.shadow_pass.value=C.mapPass.texture,g.uniforms.resolution.value=C.mapSize,g.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(w,null,D,g,m,null)}function x(C,w,D,U){let y=null;const E=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(E!==void 0)y=E;else if(y=D.isPointLight===!0?l:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const X=y.uuid,O=w.uuid;let W=c[X];W===void 0&&(W={},c[X]=W);let Y=W[O];Y===void 0&&(Y=y.clone(),W[O]=Y,w.addEventListener("dispose",R)),y=Y}if(y.visible=w.visible,y.wireframe=w.wireframe,U===ci?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:u[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const X=n.properties.get(y);X.light=D}return y}function M(C,w,D,U,y){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===ci)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const O=t.update(C),W=C.material;if(Array.isArray(W)){const Y=O.groups;for(let B=0,G=Y.length;B<G;B++){const $=Y[B],ot=W[$.materialIndex];if(ot&&ot.visible){const gt=x(C,ot,U,y);C.onBeforeShadow(n,C,w,D,O,gt,$),n.renderBufferDirect(D,null,O,gt,C,$),C.onAfterShadow(n,C,w,D,O,gt,$)}}}else if(W.visible){const Y=x(C,W,U,y);C.onBeforeShadow(n,C,w,D,O,Y,null),n.renderBufferDirect(D,null,O,Y,C,null),C.onAfterShadow(n,C,w,D,O,Y,null)}}const X=C.children;for(let O=0,W=X.length;O<W;O++)M(X[O],w,D,U,y)}function R(C){C.target.removeEventListener("dispose",R);for(const D in c){const U=c[D],y=C.target.uuid;y in U&&(U[y].dispose(),delete U[y])}}}const m1={[lc]:cc,[uc]:fc,[hc]:pc,[sr]:dc,[cc]:lc,[fc]:uc,[pc]:hc,[dc]:sr};function g1(n){function t(){let F=!1;const Ct=new Te;let it=null;const at=new Te(0,0,0,0);return{setMask:function(wt){it!==wt&&!F&&(n.colorMask(wt,wt,wt,wt),it=wt)},setLocked:function(wt){F=wt},setClear:function(wt,Pt,Qt,Pe,on){on===!0&&(wt*=Pe,Pt*=Pe,Qt*=Pe),Ct.set(wt,Pt,Qt,Pe),at.equals(Ct)===!1&&(n.clearColor(wt,Pt,Qt,Pe),at.copy(Ct))},reset:function(){F=!1,it=null,at.set(-1,0,0,0)}}}function e(){let F=!1,Ct=!1,it=null,at=null,wt=null;return{setReversed:function(Pt){Ct=Pt},setTest:function(Pt){Pt?bt(n.DEPTH_TEST):Et(n.DEPTH_TEST)},setMask:function(Pt){it!==Pt&&!F&&(n.depthMask(Pt),it=Pt)},setFunc:function(Pt){if(Ct&&(Pt=m1[Pt]),at!==Pt){switch(Pt){case lc:n.depthFunc(n.NEVER);break;case cc:n.depthFunc(n.ALWAYS);break;case uc:n.depthFunc(n.LESS);break;case sr:n.depthFunc(n.LEQUAL);break;case hc:n.depthFunc(n.EQUAL);break;case dc:n.depthFunc(n.GEQUAL);break;case fc:n.depthFunc(n.GREATER);break;case pc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}at=Pt}},setLocked:function(Pt){F=Pt},setClear:function(Pt){wt!==Pt&&(n.clearDepth(Pt),wt=Pt)},reset:function(){F=!1,it=null,at=null,wt=null}}}function i(){let F=!1,Ct=null,it=null,at=null,wt=null,Pt=null,Qt=null,Pe=null,on=null;return{setTest:function(ee){F||(ee?bt(n.STENCIL_TEST):Et(n.STENCIL_TEST))},setMask:function(ee){Ct!==ee&&!F&&(n.stencilMask(ee),Ct=ee)},setFunc:function(ee,an,ni){(it!==ee||at!==an||wt!==ni)&&(n.stencilFunc(ee,an,ni),it=ee,at=an,wt=ni)},setOp:function(ee,an,ni){(Pt!==ee||Qt!==an||Pe!==ni)&&(n.stencilOp(ee,an,ni),Pt=ee,Qt=an,Pe=ni)},setLocked:function(ee){F=ee},setClear:function(ee){on!==ee&&(n.clearStencil(ee),on=ee)},reset:function(){F=!1,Ct=null,it=null,at=null,wt=null,Pt=null,Qt=null,Pe=null,on=null}}}const s=new t,r=new e,o=new i,a=new WeakMap,l=new WeakMap;let c={},d={},u=new WeakMap,h=[],g=null,_=!1,m=null,f=null,p=null,S=null,x=null,M=null,R=null,C=new jt(0,0,0),w=0,D=!1,U=null,y=null,E=null,X=null,O=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,B=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(G)[1]),Y=B>=1):G.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),Y=B>=2);let $=null,ot={};const gt=n.getParameter(n.SCISSOR_BOX),rt=n.getParameter(n.VIEWPORT),vt=new Te().fromArray(gt),St=new Te().fromArray(rt);function Q(F,Ct,it,at){const wt=new Uint8Array(4),Pt=n.createTexture();n.bindTexture(F,Pt),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Qt=0;Qt<it;Qt++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(Ct,0,n.RGBA,1,1,at,0,n.RGBA,n.UNSIGNED_BYTE,wt):n.texImage2D(Ct+Qt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,wt);return Pt}const ht={};ht[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),ht[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ht[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),bt(n.DEPTH_TEST),r.setFunc(sr),nt(!1),et(Xh),bt(n.CULL_FACE),b(Bi);function bt(F){c[F]!==!0&&(n.enable(F),c[F]=!0)}function Et(F){c[F]!==!1&&(n.disable(F),c[F]=!1)}function Wt(F,Ct){return d[F]!==Ct?(n.bindFramebuffer(F,Ct),d[F]=Ct,F===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Ct),F===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Ct),!0):!1}function kt(F,Ct){let it=h,at=!1;if(F){it=u.get(Ct),it===void 0&&(it=[],u.set(Ct,it));const wt=F.textures;if(it.length!==wt.length||it[0]!==n.COLOR_ATTACHMENT0){for(let Pt=0,Qt=wt.length;Pt<Qt;Pt++)it[Pt]=n.COLOR_ATTACHMENT0+Pt;it.length=wt.length,at=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,at=!0);at&&n.drawBuffers(it)}function Jt(F){return g!==F?(n.useProgram(F),g=F,!0):!1}const ae={[ss]:n.FUNC_ADD,[_v]:n.FUNC_SUBTRACT,[vv]:n.FUNC_REVERSE_SUBTRACT};ae[xv]=n.MIN,ae[yv]=n.MAX;const I={[Mv]:n.ZERO,[Sv]:n.ONE,[bv]:n.SRC_COLOR,[oc]:n.SRC_ALPHA,[Cv]:n.SRC_ALPHA_SATURATE,[Av]:n.DST_COLOR,[Tv]:n.DST_ALPHA,[Ev]:n.ONE_MINUS_SRC_COLOR,[ac]:n.ONE_MINUS_SRC_ALPHA,[Rv]:n.ONE_MINUS_DST_COLOR,[wv]:n.ONE_MINUS_DST_ALPHA,[Pv]:n.CONSTANT_COLOR,[Iv]:n.ONE_MINUS_CONSTANT_COLOR,[Dv]:n.CONSTANT_ALPHA,[Lv]:n.ONE_MINUS_CONSTANT_ALPHA};function b(F,Ct,it,at,wt,Pt,Qt,Pe,on,ee){if(F===Bi){_===!0&&(Et(n.BLEND),_=!1);return}if(_===!1&&(bt(n.BLEND),_=!0),F!==gv){if(F!==m||ee!==D){if((f!==ss||x!==ss)&&(n.blendEquation(n.FUNC_ADD),f=ss,x=ss),ee)switch(F){case Ks:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $h:n.blendFunc(n.ONE,n.ONE);break;case jh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ks:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $h:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case jh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}p=null,S=null,M=null,R=null,C.set(0,0,0),w=0,m=F,D=ee}return}wt=wt||Ct,Pt=Pt||it,Qt=Qt||at,(Ct!==f||wt!==x)&&(n.blendEquationSeparate(ae[Ct],ae[wt]),f=Ct,x=wt),(it!==p||at!==S||Pt!==M||Qt!==R)&&(n.blendFuncSeparate(I[it],I[at],I[Pt],I[Qt]),p=it,S=at,M=Pt,R=Qt),(Pe.equals(C)===!1||on!==w)&&(n.blendColor(Pe.r,Pe.g,Pe.b,on),C.copy(Pe),w=on),m=F,D=!1}function tt(F,Ct){F.side===mn?Et(n.CULL_FACE):bt(n.CULL_FACE);let it=F.side===un;Ct&&(it=!it),nt(it),F.blending===Ks&&F.transparent===!1?b(Bi):b(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);const at=F.stencilWrite;o.setTest(at),at&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),lt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?bt(n.SAMPLE_ALPHA_TO_COVERAGE):Et(n.SAMPLE_ALPHA_TO_COVERAGE)}function nt(F){U!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),U=F)}function et(F){F!==pv?(bt(n.CULL_FACE),F!==y&&(F===Xh?n.cullFace(n.BACK):F===mv?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Et(n.CULL_FACE),y=F}function q(F){F!==E&&(Y&&n.lineWidth(F),E=F)}function lt(F,Ct,it){F?(bt(n.POLYGON_OFFSET_FILL),(X!==Ct||O!==it)&&(n.polygonOffset(Ct,it),X=Ct,O=it)):Et(n.POLYGON_OFFSET_FILL)}function st(F){F?bt(n.SCISSOR_TEST):Et(n.SCISSOR_TEST)}function T(F){F===void 0&&(F=n.TEXTURE0+W-1),$!==F&&(n.activeTexture(F),$=F)}function v(F,Ct,it){it===void 0&&($===null?it=n.TEXTURE0+W-1:it=$);let at=ot[it];at===void 0&&(at={type:void 0,texture:void 0},ot[it]=at),(at.type!==F||at.texture!==Ct)&&($!==it&&(n.activeTexture(it),$=it),n.bindTexture(F,Ct||ht[F]),at.type=F,at.texture=Ct)}function N(){const F=ot[$];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function k(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function K(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function mt(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function dt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function zt(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ct(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Mt(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Nt(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Gt(F){vt.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),vt.copy(F))}function It(F){St.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),St.copy(F))}function Xt(F,Ct){let it=l.get(Ct);it===void 0&&(it=new WeakMap,l.set(Ct,it));let at=it.get(F);at===void 0&&(at=n.getUniformBlockIndex(Ct,F.name),it.set(F,at))}function Bt(F,Ct){const at=l.get(Ct).get(F);a.get(Ct)!==at&&(n.uniformBlockBinding(Ct,at,F.__bindingPointIndex),a.set(Ct,at))}function le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},$=null,ot={},d={},u=new WeakMap,h=[],g=null,_=!1,m=null,f=null,p=null,S=null,x=null,M=null,R=null,C=new jt(0,0,0),w=0,D=!1,U=null,y=null,E=null,X=null,O=null,vt.set(0,0,n.canvas.width,n.canvas.height),St.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:bt,disable:Et,bindFramebuffer:Wt,drawBuffers:kt,useProgram:Jt,setBlending:b,setMaterial:tt,setFlipSided:nt,setCullFace:et,setLineWidth:q,setPolygonOffset:lt,setScissorTest:st,activeTexture:T,bindTexture:v,unbindTexture:N,compressedTexImage2D:k,compressedTexImage3D:K,texImage2D:Mt,texImage3D:Nt,updateUBOMapping:Xt,uniformBlockBinding:Bt,texStorage2D:zt,texStorage3D:ct,texSubImage2D:j,texSubImage3D:mt,compressedTexSubImage2D:dt,compressedTexSubImage3D:pt,scissor:Gt,viewport:It,reset:le}}function zd(n,t,e,i){const s=_1(i);switch(e){case zp:return n*t;case kp:return n*t;case Vp:return n*t*2;case Hp:return n*t/s.components*s.byteLength;case bu:return n*t/s.components*s.byteLength;case Gp:return n*t*2/s.components*s.byteLength;case Eu:return n*t*2/s.components*s.byteLength;case Bp:return n*t*3/s.components*s.byteLength;case On:return n*t*4/s.components*s.byteLength;case Tu:return n*t*4/s.components*s.byteLength;case Xo:case $o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case jo:case Yo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case yc:case Sc:return Math.max(n,16)*Math.max(t,8)/4;case xc:case Mc:return Math.max(n,8)*Math.max(t,8)/2;case bc:case Ec:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Tc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case wc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ac:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Rc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Cc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Dc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Lc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Uc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Nc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Oc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Fc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case zc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Bc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case qo:case kc:case Vc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Wp:case Hc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Gc:case Wc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function _1(n){switch(n){case bi:case Np:return{byteLength:1,components:1};case Kr:case Op:case eo:return{byteLength:2,components:1};case Mu:case Su:return{byteLength:2,components:4};case ps:case yu:case mi:return{byteLength:4,components:1};case Fp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function v1(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Vt,d=new WeakMap;let u;const h=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,v){return g?new OffscreenCanvas(T,v):pa("canvas")}function m(T,v,N){let k=1;const K=st(T);if((K.width>N||K.height>N)&&(k=N/Math.max(K.width,K.height)),k<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const j=Math.floor(k*K.width),mt=Math.floor(k*K.height);u===void 0&&(u=_(j,mt));const dt=v?_(j,mt):u;return dt.width=j,dt.height=mt,dt.getContext("2d").drawImage(T,0,0,j,mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+j+"x"+mt+")."),dt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function f(T){return T.generateMipmaps&&T.minFilter!==An&&T.minFilter!==Sn}function p(T){n.generateMipmap(T)}function S(T,v,N,k,K=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=v;if(v===n.RED&&(N===n.FLOAT&&(j=n.R32F),N===n.HALF_FLOAT&&(j=n.R16F),N===n.UNSIGNED_BYTE&&(j=n.R8)),v===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(j=n.R8UI),N===n.UNSIGNED_SHORT&&(j=n.R16UI),N===n.UNSIGNED_INT&&(j=n.R32UI),N===n.BYTE&&(j=n.R8I),N===n.SHORT&&(j=n.R16I),N===n.INT&&(j=n.R32I)),v===n.RG&&(N===n.FLOAT&&(j=n.RG32F),N===n.HALF_FLOAT&&(j=n.RG16F),N===n.UNSIGNED_BYTE&&(j=n.RG8)),v===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(j=n.RG8UI),N===n.UNSIGNED_SHORT&&(j=n.RG16UI),N===n.UNSIGNED_INT&&(j=n.RG32UI),N===n.BYTE&&(j=n.RG8I),N===n.SHORT&&(j=n.RG16I),N===n.INT&&(j=n.RG32I)),v===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(j=n.RGB8UI),N===n.UNSIGNED_SHORT&&(j=n.RGB16UI),N===n.UNSIGNED_INT&&(j=n.RGB32UI),N===n.BYTE&&(j=n.RGB8I),N===n.SHORT&&(j=n.RGB16I),N===n.INT&&(j=n.RGB32I)),v===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),N===n.UNSIGNED_INT&&(j=n.RGBA32UI),N===n.BYTE&&(j=n.RGBA8I),N===n.SHORT&&(j=n.RGBA16I),N===n.INT&&(j=n.RGBA32I)),v===n.RGB&&N===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),v===n.RGBA){const mt=K?ua:oe.getTransfer(k);N===n.FLOAT&&(j=n.RGBA32F),N===n.HALF_FLOAT&&(j=n.RGBA16F),N===n.UNSIGNED_BYTE&&(j=mt===Me?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(T,v){let N;return T?v===null||v===ps||v===ar?N=n.DEPTH24_STENCIL8:v===mi?N=n.DEPTH32F_STENCIL8:v===Kr&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ps||v===ar?N=n.DEPTH_COMPONENT24:v===mi?N=n.DEPTH_COMPONENT32F:v===Kr&&(N=n.DEPTH_COMPONENT16),N}function M(T,v){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==An&&T.minFilter!==Sn?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function R(T){const v=T.target;v.removeEventListener("dispose",R),w(v),v.isVideoTexture&&d.delete(v)}function C(T){const v=T.target;v.removeEventListener("dispose",C),U(v)}function w(T){const v=i.get(T);if(v.__webglInit===void 0)return;const N=T.source,k=h.get(N);if(k){const K=k[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&D(T),Object.keys(k).length===0&&h.delete(N)}i.remove(T)}function D(T){const v=i.get(T);n.deleteTexture(v.__webglTexture);const N=T.source,k=h.get(N);delete k[v.__cacheKey],o.memory.textures--}function U(T){const v=i.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(v.__webglFramebuffer[k]))for(let K=0;K<v.__webglFramebuffer[k].length;K++)n.deleteFramebuffer(v.__webglFramebuffer[k][K]);else n.deleteFramebuffer(v.__webglFramebuffer[k]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[k])}else{if(Array.isArray(v.__webglFramebuffer))for(let k=0;k<v.__webglFramebuffer.length;k++)n.deleteFramebuffer(v.__webglFramebuffer[k]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let k=0;k<v.__webglColorRenderbuffer.length;k++)v.__webglColorRenderbuffer[k]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[k]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=T.textures;for(let k=0,K=N.length;k<K;k++){const j=i.get(N[k]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(N[k])}i.remove(T)}let y=0;function E(){y=0}function X(){const T=y;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),y+=1,T}function O(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function W(T,v){const N=i.get(T);if(T.isVideoTexture&&q(T),T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){const k=T.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{St(N,T,v);return}}e.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+v)}function Y(T,v){const N=i.get(T);if(T.version>0&&N.__version!==T.version){St(N,T,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+v)}function B(T,v){const N=i.get(T);if(T.version>0&&N.__version!==T.version){St(N,T,v);return}e.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+v)}function G(T,v){const N=i.get(T);if(T.version>0&&N.__version!==T.version){Q(N,T,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+v)}const $={[_c]:n.REPEAT,[ls]:n.CLAMP_TO_EDGE,[vc]:n.MIRRORED_REPEAT},ot={[An]:n.NEAREST,[Gv]:n.NEAREST_MIPMAP_NEAREST,[mo]:n.NEAREST_MIPMAP_LINEAR,[Sn]:n.LINEAR,[dl]:n.LINEAR_MIPMAP_NEAREST,[cs]:n.LINEAR_MIPMAP_LINEAR},gt={[jv]:n.NEVER,[Qv]:n.ALWAYS,[Yv]:n.LESS,[$p]:n.LEQUAL,[qv]:n.EQUAL,[Jv]:n.GEQUAL,[Kv]:n.GREATER,[Zv]:n.NOTEQUAL};function rt(T,v){if(v.type===mi&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Sn||v.magFilter===dl||v.magFilter===mo||v.magFilter===cs||v.minFilter===Sn||v.minFilter===dl||v.minFilter===mo||v.minFilter===cs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,$[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,$[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,$[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ot[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ot[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,gt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===An||v.minFilter!==mo&&v.minFilter!==cs||v.type===mi&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function vt(T,v){let N=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",R));const k=v.source;let K=h.get(k);K===void 0&&(K={},h.set(k,K));const j=O(v);if(j!==T.__cacheKey){K[j]===void 0&&(K[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),K[j].usedTimes++;const mt=K[T.__cacheKey];mt!==void 0&&(K[T.__cacheKey].usedTimes--,mt.usedTimes===0&&D(v)),T.__cacheKey=j,T.__webglTexture=K[j].texture}return N}function St(T,v,N){let k=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(k=n.TEXTURE_3D);const K=vt(T,v),j=v.source;e.bindTexture(k,T.__webglTexture,n.TEXTURE0+N);const mt=i.get(j);if(j.version!==mt.__version||K===!0){e.activeTexture(n.TEXTURE0+N);const dt=oe.getPrimaries(oe.workingColorSpace),pt=v.colorSpace===Oi?null:oe.getPrimaries(v.colorSpace),zt=v.colorSpace===Oi||dt===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let ct=m(v.image,!1,s.maxTextureSize);ct=lt(v,ct);const Mt=r.convert(v.format,v.colorSpace),Nt=r.convert(v.type);let Gt=S(v.internalFormat,Mt,Nt,v.colorSpace,v.isVideoTexture);rt(k,v);let It;const Xt=v.mipmaps,Bt=v.isVideoTexture!==!0,le=mt.__version===void 0||K===!0,F=j.dataReady,Ct=M(v,ct);if(v.isDepthTexture)Gt=x(v.format===lr,v.type),le&&(Bt?e.texStorage2D(n.TEXTURE_2D,1,Gt,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,Gt,ct.width,ct.height,0,Mt,Nt,null));else if(v.isDataTexture)if(Xt.length>0){Bt&&le&&e.texStorage2D(n.TEXTURE_2D,Ct,Gt,Xt[0].width,Xt[0].height);for(let it=0,at=Xt.length;it<at;it++)It=Xt[it],Bt?F&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,It.width,It.height,Mt,Nt,It.data):e.texImage2D(n.TEXTURE_2D,it,Gt,It.width,It.height,0,Mt,Nt,It.data);v.generateMipmaps=!1}else Bt?(le&&e.texStorage2D(n.TEXTURE_2D,Ct,Gt,ct.width,ct.height),F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,Mt,Nt,ct.data)):e.texImage2D(n.TEXTURE_2D,0,Gt,ct.width,ct.height,0,Mt,Nt,ct.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Bt&&le&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Ct,Gt,Xt[0].width,Xt[0].height,ct.depth);for(let it=0,at=Xt.length;it<at;it++)if(It=Xt[it],v.format!==On)if(Mt!==null)if(Bt){if(F)if(v.layerUpdates.size>0){const wt=zd(It.width,It.height,v.format,v.type);for(const Pt of v.layerUpdates){const Qt=It.data.subarray(Pt*wt/It.data.BYTES_PER_ELEMENT,(Pt+1)*wt/It.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,Pt,It.width,It.height,1,Mt,Qt,0,0)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,It.width,It.height,ct.depth,Mt,It.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,it,Gt,It.width,It.height,ct.depth,0,It.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?F&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,It.width,It.height,ct.depth,Mt,Nt,It.data):e.texImage3D(n.TEXTURE_2D_ARRAY,it,Gt,It.width,It.height,ct.depth,0,Mt,Nt,It.data)}else{Bt&&le&&e.texStorage2D(n.TEXTURE_2D,Ct,Gt,Xt[0].width,Xt[0].height);for(let it=0,at=Xt.length;it<at;it++)It=Xt[it],v.format!==On?Mt!==null?Bt?F&&e.compressedTexSubImage2D(n.TEXTURE_2D,it,0,0,It.width,It.height,Mt,It.data):e.compressedTexImage2D(n.TEXTURE_2D,it,Gt,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?F&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,It.width,It.height,Mt,Nt,It.data):e.texImage2D(n.TEXTURE_2D,it,Gt,It.width,It.height,0,Mt,Nt,It.data)}else if(v.isDataArrayTexture)if(Bt){if(le&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Ct,Gt,ct.width,ct.height,ct.depth),F)if(v.layerUpdates.size>0){const it=zd(ct.width,ct.height,v.format,v.type);for(const at of v.layerUpdates){const wt=ct.data.subarray(at*it/ct.data.BYTES_PER_ELEMENT,(at+1)*it/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,at,ct.width,ct.height,1,Mt,Nt,wt)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Mt,Nt,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Gt,ct.width,ct.height,ct.depth,0,Mt,Nt,ct.data);else if(v.isData3DTexture)Bt?(le&&e.texStorage3D(n.TEXTURE_3D,Ct,Gt,ct.width,ct.height,ct.depth),F&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Mt,Nt,ct.data)):e.texImage3D(n.TEXTURE_3D,0,Gt,ct.width,ct.height,ct.depth,0,Mt,Nt,ct.data);else if(v.isFramebufferTexture){if(le)if(Bt)e.texStorage2D(n.TEXTURE_2D,Ct,Gt,ct.width,ct.height);else{let it=ct.width,at=ct.height;for(let wt=0;wt<Ct;wt++)e.texImage2D(n.TEXTURE_2D,wt,Gt,it,at,0,Mt,Nt,null),it>>=1,at>>=1}}else if(Xt.length>0){if(Bt&&le){const it=st(Xt[0]);e.texStorage2D(n.TEXTURE_2D,Ct,Gt,it.width,it.height)}for(let it=0,at=Xt.length;it<at;it++)It=Xt[it],Bt?F&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,Mt,Nt,It):e.texImage2D(n.TEXTURE_2D,it,Gt,Mt,Nt,It);v.generateMipmaps=!1}else if(Bt){if(le){const it=st(ct);e.texStorage2D(n.TEXTURE_2D,Ct,Gt,it.width,it.height)}F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Mt,Nt,ct)}else e.texImage2D(n.TEXTURE_2D,0,Gt,Mt,Nt,ct);f(v)&&p(k),mt.__version=j.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Q(T,v,N){if(v.image.length!==6)return;const k=vt(T,v),K=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+N);const j=i.get(K);if(K.version!==j.__version||k===!0){e.activeTexture(n.TEXTURE0+N);const mt=oe.getPrimaries(oe.workingColorSpace),dt=v.colorSpace===Oi?null:oe.getPrimaries(v.colorSpace),pt=v.colorSpace===Oi||mt===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const zt=v.isCompressedTexture||v.image[0].isCompressedTexture,ct=v.image[0]&&v.image[0].isDataTexture,Mt=[];for(let at=0;at<6;at++)!zt&&!ct?Mt[at]=m(v.image[at],!0,s.maxCubemapSize):Mt[at]=ct?v.image[at].image:v.image[at],Mt[at]=lt(v,Mt[at]);const Nt=Mt[0],Gt=r.convert(v.format,v.colorSpace),It=r.convert(v.type),Xt=S(v.internalFormat,Gt,It,v.colorSpace),Bt=v.isVideoTexture!==!0,le=j.__version===void 0||k===!0,F=K.dataReady;let Ct=M(v,Nt);rt(n.TEXTURE_CUBE_MAP,v);let it;if(zt){Bt&&le&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Ct,Xt,Nt.width,Nt.height);for(let at=0;at<6;at++){it=Mt[at].mipmaps;for(let wt=0;wt<it.length;wt++){const Pt=it[wt];v.format!==On?Gt!==null?Bt?F&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,wt,0,0,Pt.width,Pt.height,Gt,Pt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,wt,Xt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,wt,0,0,Pt.width,Pt.height,Gt,It,Pt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,wt,Xt,Pt.width,Pt.height,0,Gt,It,Pt.data)}}}else{if(it=v.mipmaps,Bt&&le){it.length>0&&Ct++;const at=st(Mt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Ct,Xt,at.width,at.height)}for(let at=0;at<6;at++)if(ct){Bt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Mt[at].width,Mt[at].height,Gt,It,Mt[at].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Xt,Mt[at].width,Mt[at].height,0,Gt,It,Mt[at].data);for(let wt=0;wt<it.length;wt++){const Qt=it[wt].image[at].image;Bt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,wt+1,0,0,Qt.width,Qt.height,Gt,It,Qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,wt+1,Xt,Qt.width,Qt.height,0,Gt,It,Qt.data)}}else{Bt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Gt,It,Mt[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Xt,Gt,It,Mt[at]);for(let wt=0;wt<it.length;wt++){const Pt=it[wt];Bt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,wt+1,0,0,Gt,It,Pt.image[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,wt+1,Xt,Gt,It,Pt.image[at])}}}f(v)&&p(n.TEXTURE_CUBE_MAP),j.__version=K.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ht(T,v,N,k,K,j){const mt=r.convert(N.format,N.colorSpace),dt=r.convert(N.type),pt=S(N.internalFormat,mt,dt,N.colorSpace);if(!i.get(v).__hasExternalTextures){const ct=Math.max(1,v.width>>j),Mt=Math.max(1,v.height>>j);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,j,pt,ct,Mt,v.depth,0,mt,dt,null):e.texImage2D(K,j,pt,ct,Mt,0,mt,dt,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),et(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,K,i.get(N).__webglTexture,0,nt(v)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,K,i.get(N).__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function bt(T,v,N){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){const k=v.depthTexture,K=k&&k.isDepthTexture?k.type:null,j=x(v.stencilBuffer,K),mt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=nt(v);et(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt,j,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,j,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,j,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,mt,n.RENDERBUFFER,T)}else{const k=v.textures;for(let K=0;K<k.length;K++){const j=k[K],mt=r.convert(j.format,j.colorSpace),dt=r.convert(j.type),pt=S(j.internalFormat,mt,dt,j.colorSpace),zt=nt(v);N&&et(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,zt,pt,v.width,v.height):et(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,zt,pt,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,pt,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Et(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const k=i.get(v.depthTexture).__webglTexture,K=nt(v);if(v.depthTexture.format===Zs)et(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0);else if(v.depthTexture.format===lr)et(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0);else throw new Error("Unknown depthTexture format")}function Wt(T){const v=i.get(T),N=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const k=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),k){const K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,k.removeEventListener("dispose",K)};k.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=k}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Et(v.__webglFramebuffer,T)}else if(N){v.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[k]),v.__webglDepthbuffer[k]===void 0)v.__webglDepthbuffer[k]=n.createRenderbuffer(),bt(v.__webglDepthbuffer[k],T,!1);else{const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer[k];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,j)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),bt(v.__webglDepthbuffer,T,!1);else{const k=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,k,n.RENDERBUFFER,K)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function kt(T,v,N){const k=i.get(T);v!==void 0&&ht(k.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Wt(T)}function Jt(T){const v=T.texture,N=i.get(T),k=i.get(v);T.addEventListener("dispose",C);const K=T.textures,j=T.isWebGLCubeRenderTarget===!0,mt=K.length>1;if(mt||(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=v.version,o.memory.textures++),j){N.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[dt]=[];for(let pt=0;pt<v.mipmaps.length;pt++)N.__webglFramebuffer[dt][pt]=n.createFramebuffer()}else N.__webglFramebuffer[dt]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let dt=0;dt<v.mipmaps.length;dt++)N.__webglFramebuffer[dt]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(mt)for(let dt=0,pt=K.length;dt<pt;dt++){const zt=i.get(K[dt]);zt.__webglTexture===void 0&&(zt.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&et(T)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let dt=0;dt<K.length;dt++){const pt=K[dt];N.__webglColorRenderbuffer[dt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[dt]);const zt=r.convert(pt.format,pt.colorSpace),ct=r.convert(pt.type),Mt=S(pt.internalFormat,zt,ct,pt.colorSpace,T.isXRRenderTarget===!0),Nt=nt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Nt,Mt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,N.__webglColorRenderbuffer[dt])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),bt(N.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),rt(n.TEXTURE_CUBE_MAP,v);for(let dt=0;dt<6;dt++)if(v.mipmaps&&v.mipmaps.length>0)for(let pt=0;pt<v.mipmaps.length;pt++)ht(N.__webglFramebuffer[dt][pt],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,pt);else ht(N.__webglFramebuffer[dt],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);f(v)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(mt){for(let dt=0,pt=K.length;dt<pt;dt++){const zt=K[dt],ct=i.get(zt);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),rt(n.TEXTURE_2D,zt),ht(N.__webglFramebuffer,T,zt,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,0),f(zt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let dt=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(dt=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(dt,k.__webglTexture),rt(dt,v),v.mipmaps&&v.mipmaps.length>0)for(let pt=0;pt<v.mipmaps.length;pt++)ht(N.__webglFramebuffer[pt],T,v,n.COLOR_ATTACHMENT0,dt,pt);else ht(N.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,dt,0);f(v)&&p(dt),e.unbindTexture()}T.depthBuffer&&Wt(T)}function ae(T){const v=T.textures;for(let N=0,k=v.length;N<k;N++){const K=v[N];if(f(K)){const j=T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,mt=i.get(K).__webglTexture;e.bindTexture(j,mt),p(j),e.unbindTexture()}}}const I=[],b=[];function tt(T){if(T.samples>0){if(et(T)===!1){const v=T.textures,N=T.width,k=T.height;let K=n.COLOR_BUFFER_BIT;const j=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=i.get(T),dt=v.length>1;if(dt)for(let pt=0;pt<v.length;pt++)e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let pt=0;pt<v.length;pt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),dt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,mt.__webglColorRenderbuffer[pt]);const zt=i.get(v[pt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,zt,0)}n.blitFramebuffer(0,0,N,k,0,0,N,k,K,n.NEAREST),l===!0&&(I.length=0,b.length=0,I.push(n.COLOR_ATTACHMENT0+pt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(I.push(j),b.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,b)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,I))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),dt)for(let pt=0;pt<v.length;pt++){e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,mt.__webglColorRenderbuffer[pt]);const zt=i.get(v[pt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,zt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function nt(T){return Math.min(s.maxSamples,T.samples)}function et(T){const v=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function q(T){const v=o.render.frame;d.get(T)!==v&&(d.set(T,v),T.update())}function lt(T,v){const N=T.colorSpace,k=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||N!==Xi&&N!==Oi&&(oe.getTransfer(N)===Me?(k!==On||K!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}function st(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=E,this.setTexture2D=W,this.setTexture2DArray=Y,this.setTexture3D=B,this.setTextureCube=G,this.rebindTextures=kt,this.setupRenderTarget=Jt,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=Wt,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=et}function x1(n,t){function e(i,s=Oi){let r;const o=oe.getTransfer(s);if(i===bi)return n.UNSIGNED_BYTE;if(i===Mu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Su)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Fp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Np)return n.BYTE;if(i===Op)return n.SHORT;if(i===Kr)return n.UNSIGNED_SHORT;if(i===yu)return n.INT;if(i===ps)return n.UNSIGNED_INT;if(i===mi)return n.FLOAT;if(i===eo)return n.HALF_FLOAT;if(i===zp)return n.ALPHA;if(i===Bp)return n.RGB;if(i===On)return n.RGBA;if(i===kp)return n.LUMINANCE;if(i===Vp)return n.LUMINANCE_ALPHA;if(i===Zs)return n.DEPTH_COMPONENT;if(i===lr)return n.DEPTH_STENCIL;if(i===Hp)return n.RED;if(i===bu)return n.RED_INTEGER;if(i===Gp)return n.RG;if(i===Eu)return n.RG_INTEGER;if(i===Tu)return n.RGBA_INTEGER;if(i===Xo||i===$o||i===jo||i===Yo)if(o===Me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Xo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===$o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Xo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===$o)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===jo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Yo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xc||i===yc||i===Mc||i===Sc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===xc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===yc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Sc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===bc||i===Ec||i===Tc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===bc||i===Ec)return o===Me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Tc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===wc||i===Ac||i===Rc||i===Cc||i===Pc||i===Ic||i===Dc||i===Lc||i===Uc||i===Nc||i===Oc||i===Fc||i===zc||i===Bc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===wc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ac)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Rc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Pc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ic)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Dc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Lc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Uc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Nc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Oc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Bc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qo||i===kc||i===Vc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===qo)return o===Me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===kc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Wp||i===Hc||i===Gc||i===Wc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===qo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Hc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Gc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Wc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ar?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class y1 extends Mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class je extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const M1={type:"move"};class kl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const m of t.hand.values()){const f=e.getJointPose(m,i),p=this._getHandJoint(c,m);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),g=.02,_=.005;c.inputState.pinching&&h>g+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=g-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(M1)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new je;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const S1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,b1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class E1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new rn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Gi({vertexShader:S1,fragmentShader:b1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new de(new Ga(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class T1 extends xs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,u=null,h=null,g=null,_=null;const m=new E1,f=e.getContextAttributes();let p=null,S=null;const x=[],M=[],R=new Vt;let C=null;const w=new Mn;w.layers.enable(1),w.viewport=new Te;const D=new Mn;D.layers.enable(2),D.viewport=new Te;const U=[w,D],y=new y1;y.layers.enable(1),y.layers.enable(2);let E=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ht=x[Q];return ht===void 0&&(ht=new kl,x[Q]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(Q){let ht=x[Q];return ht===void 0&&(ht=new kl,x[Q]=ht),ht.getGripSpace()},this.getHand=function(Q){let ht=x[Q];return ht===void 0&&(ht=new kl,x[Q]=ht),ht.getHandSpace()};function O(Q){const ht=M.indexOf(Q.inputSource);if(ht===-1)return;const bt=x[ht];bt!==void 0&&(bt.update(Q.inputSource,Q.frame,c||o),bt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Y);for(let Q=0;Q<x.length;Q++){const ht=M[Q];ht!==null&&(M[Q]=null,x[Q].disconnect(ht))}E=null,X=null,m.reset(),t.setRenderTarget(p),g=null,h=null,u=null,s=null,S=null,St.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Y),f.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){const ht={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),S=new ms(g.framebufferWidth,g.framebufferHeight,{format:On,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil})}else{let ht=null,bt=null,Et=null;f.depth&&(Et=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=f.stencil?lr:Zs,bt=f.stencil?ar:ps);const Wt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:r};u=new XRWebGLBinding(s,e),h=u.createProjectionLayer(Wt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new ms(h.textureWidth,h.textureHeight,{format:On,type:bi,depthTexture:new sm(h.textureWidth,h.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),St.setContext(s),St.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Y(Q){for(let ht=0;ht<Q.removed.length;ht++){const bt=Q.removed[ht],Et=M.indexOf(bt);Et>=0&&(M[Et]=null,x[Et].disconnect(bt))}for(let ht=0;ht<Q.added.length;ht++){const bt=Q.added[ht];let Et=M.indexOf(bt);if(Et===-1){for(let kt=0;kt<x.length;kt++)if(kt>=M.length){M.push(bt),Et=kt;break}else if(M[kt]===null){M[kt]=bt,Et=kt;break}if(Et===-1)break}const Wt=x[Et];Wt&&Wt.connect(bt)}}const B=new z,G=new z;function $(Q,ht,bt){B.setFromMatrixPosition(ht.matrixWorld),G.setFromMatrixPosition(bt.matrixWorld);const Et=B.distanceTo(G),Wt=ht.projectionMatrix.elements,kt=bt.projectionMatrix.elements,Jt=Wt[14]/(Wt[10]-1),ae=Wt[14]/(Wt[10]+1),I=(Wt[9]+1)/Wt[5],b=(Wt[9]-1)/Wt[5],tt=(Wt[8]-1)/Wt[0],nt=(kt[8]+1)/kt[0],et=Jt*tt,q=Jt*nt,lt=Et/(-tt+nt),st=lt*-tt;if(ht.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(st),Q.translateZ(lt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Wt[10]===-1)Q.projectionMatrix.copy(ht.projectionMatrix),Q.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const T=Jt+lt,v=ae+lt,N=et-st,k=q+(Et-st),K=I*ae/v*T,j=b*ae/v*T;Q.projectionMatrix.makePerspective(N,k,K,j,T,v),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ot(Q,ht){ht===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ht.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ht=Q.near,bt=Q.far;m.texture!==null&&(m.depthNear>0&&(ht=m.depthNear),m.depthFar>0&&(bt=m.depthFar)),y.near=D.near=w.near=ht,y.far=D.far=w.far=bt,(E!==y.near||X!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),E=y.near,X=y.far);const Et=Q.parent,Wt=y.cameras;ot(y,Et);for(let kt=0;kt<Wt.length;kt++)ot(Wt[kt],Et);Wt.length===2?$(y,w,D):y.projectionMatrix.copy(w.projectionMatrix),gt(Q,y,Et)};function gt(Q,ht,bt){bt===null?Q.matrix.copy(ht.matrixWorld):(Q.matrix.copy(bt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ht.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ht.projectionMatrix),Q.projectionMatrixInverse.copy(ht.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Zr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&g===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(y)};let rt=null;function vt(Q,ht){if(d=ht.getViewerPose(c||o),_=ht,d!==null){const bt=d.views;g!==null&&(t.setRenderTargetFramebuffer(S,g.framebuffer),t.setRenderTarget(S));let Et=!1;bt.length!==y.cameras.length&&(y.cameras.length=0,Et=!0);for(let kt=0;kt<bt.length;kt++){const Jt=bt[kt];let ae=null;if(g!==null)ae=g.getViewport(Jt);else{const b=u.getViewSubImage(h,Jt);ae=b.viewport,kt===0&&(t.setRenderTargetTextures(S,b.colorTexture,h.ignoreDepthValues?void 0:b.depthStencilTexture),t.setRenderTarget(S))}let I=U[kt];I===void 0&&(I=new Mn,I.layers.enable(kt),I.viewport=new Te,U[kt]=I),I.matrix.fromArray(Jt.transform.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale),I.projectionMatrix.fromArray(Jt.projectionMatrix),I.projectionMatrixInverse.copy(I.projectionMatrix).invert(),I.viewport.set(ae.x,ae.y,ae.width,ae.height),kt===0&&(y.matrix.copy(I.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Et===!0&&y.cameras.push(I)}const Wt=s.enabledFeatures;if(Wt&&Wt.includes("depth-sensing")){const kt=u.getDepthInformation(bt[0]);kt&&kt.isValid&&kt.texture&&m.init(t,kt,s.renderState)}}for(let bt=0;bt<x.length;bt++){const Et=M[bt],Wt=x[bt];Et!==null&&Wt!==void 0&&Wt.update(Et,ht,c||o)}rt&&rt(Q,ht),ht.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ht}),_=null}const St=new nm;St.setAnimationLoop(vt),this.setAnimationLoop=function(Q){rt=Q},this.dispose=function(){}}}const es=new Jn,w1=new Se;function A1(n,t){function e(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function i(f,p){p.color.getRGB(f.fogColor.value,Qp(n)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function s(f,p,S,x,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(f,p):p.isMeshToonMaterial?(r(f,p),u(f,p)):p.isMeshPhongMaterial?(r(f,p),d(f,p)):p.isMeshStandardMaterial?(r(f,p),h(f,p),p.isMeshPhysicalMaterial&&g(f,p,M)):p.isMeshMatcapMaterial?(r(f,p),_(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),m(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(o(f,p),p.isLineDashedMaterial&&a(f,p)):p.isPointsMaterial?l(f,p,S,x):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,e(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===un&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,e(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===un&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,e(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,e(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const S=t.get(p),x=S.envMap,M=S.envMapRotation;x&&(f.envMap.value=x,es.copy(M),es.x*=-1,es.y*=-1,es.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),f.envMapRotation.value.setFromMatrix4(w1.makeRotationFromEuler(es)),f.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,f.aoMapTransform))}function o(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform))}function a(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,S,x){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*S,f.scale.value=x*.5,p.map&&(f.map.value=p.map,e(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function d(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function u(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function h(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function g(f,p,S){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===un&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,p){p.matcap&&(f.matcap.value=p.matcap)}function m(f,p){const S=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function R1(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){const M=x.program;i.uniformBlockBinding(S,M)}function c(S,x){let M=s[S.id];M===void 0&&(_(S),M=d(S),s[S.id]=M,S.addEventListener("dispose",f));const R=x.program;i.updateUBOMapping(S,R);const C=t.render.frame;r[S.id]!==C&&(h(S),r[S.id]=C)}function d(S){const x=u();S.__bindingPointIndex=x;const M=n.createBuffer(),R=S.__size,C=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,R,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,M),M}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const x=s[S.id],M=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let C=0,w=M.length;C<w;C++){const D=Array.isArray(M[C])?M[C]:[M[C]];for(let U=0,y=D.length;U<y;U++){const E=D[U];if(g(E,C,U,R)===!0){const X=E.__offset,O=Array.isArray(E.value)?E.value:[E.value];let W=0;for(let Y=0;Y<O.length;Y++){const B=O[Y],G=m(B);typeof B=="number"||typeof B=="boolean"?(E.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,X+W,E.__data)):B.isMatrix3?(E.__data[0]=B.elements[0],E.__data[1]=B.elements[1],E.__data[2]=B.elements[2],E.__data[3]=0,E.__data[4]=B.elements[3],E.__data[5]=B.elements[4],E.__data[6]=B.elements[5],E.__data[7]=0,E.__data[8]=B.elements[6],E.__data[9]=B.elements[7],E.__data[10]=B.elements[8],E.__data[11]=0):(B.toArray(E.__data,W),W+=G.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,X,E.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(S,x,M,R){const C=S.value,w=x+"_"+M;if(R[w]===void 0)return typeof C=="number"||typeof C=="boolean"?R[w]=C:R[w]=C.clone(),!0;{const D=R[w];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return R[w]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function _(S){const x=S.uniforms;let M=0;const R=16;for(let w=0,D=x.length;w<D;w++){const U=Array.isArray(x[w])?x[w]:[x[w]];for(let y=0,E=U.length;y<E;y++){const X=U[y],O=Array.isArray(X.value)?X.value:[X.value];for(let W=0,Y=O.length;W<Y;W++){const B=O[W],G=m(B),$=M%R,ot=$%G.boundary,gt=$+ot;M+=ot,gt!==0&&R-gt<G.storage&&(M+=R-gt),X.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=M,M+=G.storage}}}const C=M%R;return C>0&&(M+=R-C),S.__size=M,S.__cache={},this}function m(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function f(S){const x=S.target;x.removeEventListener("dispose",f);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class C1{constructor(t={}){const{canvas:e=gx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const p=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Un,this.toneMapping=ki,this.toneMappingExposure=1;const x=this;let M=!1,R=0,C=0,w=null,D=-1,U=null;const y=new Te,E=new Te;let X=null;const O=new jt(0);let W=0,Y=e.width,B=e.height,G=1,$=null,ot=null;const gt=new Te(0,0,Y,B),rt=new Te(0,0,Y,B);let vt=!1;const St=new Cu;let Q=!1,ht=!1;const bt=new Se,Et=new Se,Wt=new z,kt=new Te,Jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ae=!1;function I(){return w===null?G:1}let b=i;function tt(A,V){return e.getContext(A,V)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${xu}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",wt,!1),e.addEventListener("webglcontextcreationerror",Pt,!1),b===null){const V="webgl2";if(b=tt(V,A),b===null)throw tt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let nt,et,q,lt,st,T,v,N,k,K,j,mt,dt,pt,zt,ct,Mt,Nt,Gt,It,Xt,Bt,le,F;function Ct(){nt=new US(b),nt.init(),Bt=new x1(b,nt),et=new RS(b,nt,t,Bt),q=new g1(b),et.reverseDepthBuffer&&q.buffers.depth.setReversed(!0),lt=new FS(b),st=new e1,T=new v1(b,nt,q,st,et,Bt,lt),v=new PS(x),N=new LS(x),k=new Wx(b),le=new wS(b,k),K=new NS(b,k,lt,le),j=new BS(b,K,k,lt),Gt=new zS(b,et,T),ct=new CS(st),mt=new t1(x,v,N,nt,et,le,ct),dt=new A1(x,st),pt=new i1,zt=new c1(nt),Nt=new TS(x,v,N,q,j,h,l),Mt=new p1(x,j,et),F=new R1(b,lt,et,q),It=new AS(b,nt,lt),Xt=new OS(b,nt,lt),lt.programs=mt.programs,x.capabilities=et,x.extensions=nt,x.properties=st,x.renderLists=pt,x.shadowMap=Mt,x.state=q,x.info=lt}Ct();const it=new T1(x,b);this.xr=it,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){const A=nt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=nt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(A){A!==void 0&&(G=A,this.setSize(Y,B,!1))},this.getSize=function(A){return A.set(Y,B)},this.setSize=function(A,V,Z=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=A,B=V,e.width=Math.floor(A*G),e.height=Math.floor(V*G),Z===!0&&(e.style.width=A+"px",e.style.height=V+"px"),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(Y*G,B*G).floor()},this.setDrawingBufferSize=function(A,V,Z){Y=A,B=V,G=Z,e.width=Math.floor(A*Z),e.height=Math.floor(V*Z),this.setViewport(0,0,A,V)},this.getCurrentViewport=function(A){return A.copy(y)},this.getViewport=function(A){return A.copy(gt)},this.setViewport=function(A,V,Z,J){A.isVector4?gt.set(A.x,A.y,A.z,A.w):gt.set(A,V,Z,J),q.viewport(y.copy(gt).multiplyScalar(G).round())},this.getScissor=function(A){return A.copy(rt)},this.setScissor=function(A,V,Z,J){A.isVector4?rt.set(A.x,A.y,A.z,A.w):rt.set(A,V,Z,J),q.scissor(E.copy(rt).multiplyScalar(G).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(A){q.setScissorTest(vt=A)},this.setOpaqueSort=function(A){$=A},this.setTransparentSort=function(A){ot=A},this.getClearColor=function(A){return A.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(A=!0,V=!0,Z=!0){let J=0;if(A){let H=!1;if(w!==null){const xt=w.texture.format;H=xt===Tu||xt===Eu||xt===bu}if(H){const xt=w.texture.type,At=xt===bi||xt===ps||xt===Kr||xt===ar||xt===Mu||xt===Su,Lt=Nt.getClearColor(),Ut=Nt.getClearAlpha(),$t=Lt.r,Yt=Lt.g,Ot=Lt.b;At?(g[0]=$t,g[1]=Yt,g[2]=Ot,g[3]=Ut,b.clearBufferuiv(b.COLOR,0,g)):(_[0]=$t,_[1]=Yt,_[2]=Ot,_[3]=Ut,b.clearBufferiv(b.COLOR,0,_))}else J|=b.COLOR_BUFFER_BIT}V&&(J|=b.DEPTH_BUFFER_BIT,b.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Z&&(J|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),b.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",wt,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),pt.dispose(),zt.dispose(),st.dispose(),v.dispose(),N.dispose(),j.dispose(),le.dispose(),F.dispose(),mt.dispose(),it.dispose(),it.removeEventListener("sessionstart",Vu),it.removeEventListener("sessionend",Hu),$i.stop()};function at(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const A=lt.autoReset,V=Mt.enabled,Z=Mt.autoUpdate,J=Mt.needsUpdate,H=Mt.type;Ct(),lt.autoReset=A,Mt.enabled=V,Mt.autoUpdate=Z,Mt.needsUpdate=J,Mt.type=H}function Pt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Qt(A){const V=A.target;V.removeEventListener("dispose",Qt),Pe(V)}function Pe(A){on(A),st.remove(A)}function on(A){const V=st.get(A).programs;V!==void 0&&(V.forEach(function(Z){mt.releaseProgram(Z)}),A.isShaderMaterial&&mt.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,Z,J,H,xt){V===null&&(V=Jt);const At=H.isMesh&&H.matrixWorld.determinant()<0,Lt=gm(A,V,Z,J,H);q.setMaterial(J,At);let Ut=Z.index,$t=1;if(J.wireframe===!0){if(Ut=K.getWireframeAttribute(Z),Ut===void 0)return;$t=2}const Yt=Z.drawRange,Ot=Z.attributes.position;let ce=Yt.start*$t,ye=(Yt.start+Yt.count)*$t;xt!==null&&(ce=Math.max(ce,xt.start*$t),ye=Math.min(ye,(xt.start+xt.count)*$t)),Ut!==null?(ce=Math.max(ce,0),ye=Math.min(ye,Ut.count)):Ot!=null&&(ce=Math.max(ce,0),ye=Math.min(ye,Ot.count));const Ee=ye-ce;if(Ee<0||Ee===1/0)return;le.setup(H,J,Lt,Z,Ut);let hn,ie=It;if(Ut!==null&&(hn=k.get(Ut),ie=Xt,ie.setIndex(hn)),H.isMesh)J.wireframe===!0?(q.setLineWidth(J.wireframeLinewidth*I()),ie.setMode(b.LINES)):ie.setMode(b.TRIANGLES);else if(H.isLine){let Ft=J.linewidth;Ft===void 0&&(Ft=1),q.setLineWidth(Ft*I()),H.isLineSegments?ie.setMode(b.LINES):H.isLineLoop?ie.setMode(b.LINE_LOOP):ie.setMode(b.LINE_STRIP)}else H.isPoints?ie.setMode(b.POINTS):H.isSprite&&ie.setMode(b.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ie.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))ie.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ft=H._multiDrawStarts,Ge=H._multiDrawCounts,se=H._multiDrawCount,Pn=Ut?k.get(Ut).bytesPerElement:1,Ms=st.get(J).currentProgram.getUniforms();for(let dn=0;dn<se;dn++)Ms.setValue(b,"_gl_DrawID",dn),ie.render(Ft[dn]/Pn,Ge[dn])}else if(H.isInstancedMesh)ie.renderInstances(ce,Ee,H.count);else if(Z.isInstancedBufferGeometry){const Ft=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ge=Math.min(Z.instanceCount,Ft);ie.renderInstances(ce,Ee,Ge)}else ie.render(ce,Ee)};function ee(A,V,Z){A.transparent===!0&&A.side===mn&&A.forceSinglePass===!1?(A.side=un,A.needsUpdate=!0,ro(A,V,Z),A.side=Hi,A.needsUpdate=!0,ro(A,V,Z),A.side=mn):ro(A,V,Z)}this.compile=function(A,V,Z=null){Z===null&&(Z=A),f=zt.get(Z),f.init(V),S.push(f),Z.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),A!==Z&&A.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();const J=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const xt=H.material;if(xt)if(Array.isArray(xt))for(let At=0;At<xt.length;At++){const Lt=xt[At];ee(Lt,Z,H),J.add(Lt)}else ee(xt,Z,H),J.add(xt)}),S.pop(),f=null,J},this.compileAsync=function(A,V,Z=null){const J=this.compile(A,V,Z);return new Promise(H=>{function xt(){if(J.forEach(function(At){st.get(At).currentProgram.isReady()&&J.delete(At)}),J.size===0){H(A);return}setTimeout(xt,10)}nt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let an=null;function ni(A){an&&an(A)}function Vu(){$i.stop()}function Hu(){$i.start()}const $i=new nm;$i.setAnimationLoop(ni),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(A){an=A,it.setAnimationLoop(A),A===null?$i.stop():$i.start()},it.addEventListener("sessionstart",Vu),it.addEventListener("sessionend",Hu),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(V),V=it.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,V,w),f=zt.get(A,S.length),f.init(V),S.push(f),Et.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),St.setFromProjectionMatrix(Et),ht=this.localClippingEnabled,Q=ct.init(this.clippingPlanes,ht),m=pt.get(A,p.length),m.init(),p.push(m),it.enabled===!0&&it.isPresenting===!0){const xt=x.xr.getDepthSensingMesh();xt!==null&&Xa(xt,V,-1/0,x.sortObjects)}Xa(A,V,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort($,ot),ae=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,ae&&Nt.addToRenderList(m,A),this.info.render.frame++,Q===!0&&ct.beginShadows();const Z=f.state.shadowsArray;Mt.render(Z,A,V),Q===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,H=m.transmissive;if(f.setupLights(),V.isArrayCamera){const xt=V.cameras;if(H.length>0)for(let At=0,Lt=xt.length;At<Lt;At++){const Ut=xt[At];Wu(J,H,A,Ut)}ae&&Nt.render(A);for(let At=0,Lt=xt.length;At<Lt;At++){const Ut=xt[At];Gu(m,A,Ut,Ut.viewport)}}else H.length>0&&Wu(J,H,A,V),ae&&Nt.render(A),Gu(m,A,V);w!==null&&(T.updateMultisampleRenderTarget(w),T.updateRenderTargetMipmap(w)),A.isScene===!0&&A.onAfterRender(x,A,V),le.resetDefaultState(),D=-1,U=null,S.pop(),S.length>0?(f=S[S.length-1],Q===!0&&ct.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,p.pop(),p.length>0?m=p[p.length-1]:m=null};function Xa(A,V,Z,J){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||St.intersectsSprite(A)){J&&kt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Et);const At=j.update(A),Lt=A.material;Lt.visible&&m.push(A,At,Lt,Z,kt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||St.intersectsObject(A))){const At=j.update(A),Lt=A.material;if(J&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),kt.copy(A.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),kt.copy(At.boundingSphere.center)),kt.applyMatrix4(A.matrixWorld).applyMatrix4(Et)),Array.isArray(Lt)){const Ut=At.groups;for(let $t=0,Yt=Ut.length;$t<Yt;$t++){const Ot=Ut[$t],ce=Lt[Ot.materialIndex];ce&&ce.visible&&m.push(A,At,ce,Z,kt.z,Ot)}}else Lt.visible&&m.push(A,At,Lt,Z,kt.z,null)}}const xt=A.children;for(let At=0,Lt=xt.length;At<Lt;At++)Xa(xt[At],V,Z,J)}function Gu(A,V,Z,J){const H=A.opaque,xt=A.transmissive,At=A.transparent;f.setupLightsView(Z),Q===!0&&ct.setGlobalState(x.clippingPlanes,Z),J&&q.viewport(y.copy(J)),H.length>0&&so(H,V,Z),xt.length>0&&so(xt,V,Z),At.length>0&&so(At,V,Z),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function Wu(A,V,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[J.id]===void 0&&(f.state.transmissionRenderTarget[J.id]=new ms(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?eo:bi,minFilter:cs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace}));const xt=f.state.transmissionRenderTarget[J.id],At=J.viewport||y;xt.setSize(At.z,At.w);const Lt=x.getRenderTarget();x.setRenderTarget(xt),x.getClearColor(O),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),ae&&Nt.render(Z);const Ut=x.toneMapping;x.toneMapping=ki;const $t=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),f.setupLightsView(J),Q===!0&&ct.setGlobalState(x.clippingPlanes,J),so(A,Z,J),T.updateMultisampleRenderTarget(xt),T.updateRenderTargetMipmap(xt),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let Ot=0,ce=V.length;Ot<ce;Ot++){const ye=V[Ot],Ee=ye.object,hn=ye.geometry,ie=ye.material,Ft=ye.group;if(ie.side===mn&&Ee.layers.test(J.layers)){const Ge=ie.side;ie.side=un,ie.needsUpdate=!0,Xu(Ee,Z,J,hn,ie,Ft),ie.side=Ge,ie.needsUpdate=!0,Yt=!0}}Yt===!0&&(T.updateMultisampleRenderTarget(xt),T.updateRenderTargetMipmap(xt))}x.setRenderTarget(Lt),x.setClearColor(O,W),$t!==void 0&&(J.viewport=$t),x.toneMapping=Ut}function so(A,V,Z){const J=V.isScene===!0?V.overrideMaterial:null;for(let H=0,xt=A.length;H<xt;H++){const At=A[H],Lt=At.object,Ut=At.geometry,$t=J===null?At.material:J,Yt=At.group;Lt.layers.test(Z.layers)&&Xu(Lt,V,Z,Ut,$t,Yt)}}function Xu(A,V,Z,J,H,xt){A.onBeforeRender(x,V,Z,J,H,xt),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(x,V,Z,J,A,xt),H.transparent===!0&&H.side===mn&&H.forceSinglePass===!1?(H.side=un,H.needsUpdate=!0,x.renderBufferDirect(Z,V,J,H,A,xt),H.side=Hi,H.needsUpdate=!0,x.renderBufferDirect(Z,V,J,H,A,xt),H.side=mn):x.renderBufferDirect(Z,V,J,H,A,xt),A.onAfterRender(x,V,Z,J,H,xt)}function ro(A,V,Z){V.isScene!==!0&&(V=Jt);const J=st.get(A),H=f.state.lights,xt=f.state.shadowsArray,At=H.state.version,Lt=mt.getParameters(A,H.state,xt,V,Z),Ut=mt.getProgramCacheKey(Lt);let $t=J.programs;J.environment=A.isMeshStandardMaterial?V.environment:null,J.fog=V.fog,J.envMap=(A.isMeshStandardMaterial?N:v).get(A.envMap||J.environment),J.envMapRotation=J.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,$t===void 0&&(A.addEventListener("dispose",Qt),$t=new Map,J.programs=$t);let Yt=$t.get(Ut);if(Yt!==void 0){if(J.currentProgram===Yt&&J.lightsStateVersion===At)return ju(A,Lt),Yt}else Lt.uniforms=mt.getUniforms(A),A.onBeforeCompile(Lt,x),Yt=mt.acquireProgram(Lt,Ut),$t.set(Ut,Yt),J.uniforms=Lt.uniforms;const Ot=J.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ot.clippingPlanes=ct.uniform),ju(A,Lt),J.needsLights=vm(A),J.lightsStateVersion=At,J.needsLights&&(Ot.ambientLightColor.value=H.state.ambient,Ot.lightProbe.value=H.state.probe,Ot.directionalLights.value=H.state.directional,Ot.directionalLightShadows.value=H.state.directionalShadow,Ot.spotLights.value=H.state.spot,Ot.spotLightShadows.value=H.state.spotShadow,Ot.rectAreaLights.value=H.state.rectArea,Ot.ltc_1.value=H.state.rectAreaLTC1,Ot.ltc_2.value=H.state.rectAreaLTC2,Ot.pointLights.value=H.state.point,Ot.pointLightShadows.value=H.state.pointShadow,Ot.hemisphereLights.value=H.state.hemi,Ot.directionalShadowMap.value=H.state.directionalShadowMap,Ot.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ot.spotShadowMap.value=H.state.spotShadowMap,Ot.spotLightMatrix.value=H.state.spotLightMatrix,Ot.spotLightMap.value=H.state.spotLightMap,Ot.pointShadowMap.value=H.state.pointShadowMap,Ot.pointShadowMatrix.value=H.state.pointShadowMatrix),J.currentProgram=Yt,J.uniformsList=null,Yt}function $u(A){if(A.uniformsList===null){const V=A.currentProgram.getUniforms();A.uniformsList=Jo.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function ju(A,V){const Z=st.get(A);Z.outputColorSpace=V.outputColorSpace,Z.batching=V.batching,Z.batchingColor=V.batchingColor,Z.instancing=V.instancing,Z.instancingColor=V.instancingColor,Z.instancingMorph=V.instancingMorph,Z.skinning=V.skinning,Z.morphTargets=V.morphTargets,Z.morphNormals=V.morphNormals,Z.morphColors=V.morphColors,Z.morphTargetsCount=V.morphTargetsCount,Z.numClippingPlanes=V.numClippingPlanes,Z.numIntersection=V.numClipIntersection,Z.vertexAlphas=V.vertexAlphas,Z.vertexTangents=V.vertexTangents,Z.toneMapping=V.toneMapping}function gm(A,V,Z,J,H){V.isScene!==!0&&(V=Jt),T.resetTextureUnits();const xt=V.fog,At=J.isMeshStandardMaterial?V.environment:null,Lt=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Xi,Ut=(J.isMeshStandardMaterial?N:v).get(J.envMap||At),$t=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Yt=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ot=!!Z.morphAttributes.position,ce=!!Z.morphAttributes.normal,ye=!!Z.morphAttributes.color;let Ee=ki;J.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Ee=x.toneMapping);const hn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ie=hn!==void 0?hn.length:0,Ft=st.get(J),Ge=f.state.lights;if(Q===!0&&(ht===!0||A!==U)){const xn=A===U&&J.id===D;ct.setState(J,A,xn)}let se=!1;J.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==Ge.state.version||Ft.outputColorSpace!==Lt||H.isBatchedMesh&&Ft.batching===!1||!H.isBatchedMesh&&Ft.batching===!0||H.isBatchedMesh&&Ft.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ft.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ft.instancing===!1||!H.isInstancedMesh&&Ft.instancing===!0||H.isSkinnedMesh&&Ft.skinning===!1||!H.isSkinnedMesh&&Ft.skinning===!0||H.isInstancedMesh&&Ft.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ft.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ft.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ft.instancingMorph===!1&&H.morphTexture!==null||Ft.envMap!==Ut||J.fog===!0&&Ft.fog!==xt||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==ct.numPlanes||Ft.numIntersection!==ct.numIntersection)||Ft.vertexAlphas!==$t||Ft.vertexTangents!==Yt||Ft.morphTargets!==Ot||Ft.morphNormals!==ce||Ft.morphColors!==ye||Ft.toneMapping!==Ee||Ft.morphTargetsCount!==ie)&&(se=!0):(se=!0,Ft.__version=J.version);let Pn=Ft.currentProgram;se===!0&&(Pn=ro(J,V,H));let Ms=!1,dn=!1,$a=!1;const Ce=Pn.getUniforms(),Ti=Ft.uniforms;if(q.useProgram(Pn.program)&&(Ms=!0,dn=!0,$a=!0),J.id!==D&&(D=J.id,dn=!0),Ms||U!==A){et.reverseDepthBuffer?(bt.copy(A.projectionMatrix),vx(bt),xx(bt),Ce.setValue(b,"projectionMatrix",bt)):Ce.setValue(b,"projectionMatrix",A.projectionMatrix),Ce.setValue(b,"viewMatrix",A.matrixWorldInverse);const xn=Ce.map.cameraPosition;xn!==void 0&&xn.setValue(b,Wt.setFromMatrixPosition(A.matrixWorld)),et.logarithmicDepthBuffer&&Ce.setValue(b,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Ce.setValue(b,"isOrthographic",A.isOrthographicCamera===!0),U!==A&&(U=A,dn=!0,$a=!0)}if(H.isSkinnedMesh){Ce.setOptional(b,H,"bindMatrix"),Ce.setOptional(b,H,"bindMatrixInverse");const xn=H.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),Ce.setValue(b,"boneTexture",xn.boneTexture,T))}H.isBatchedMesh&&(Ce.setOptional(b,H,"batchingTexture"),Ce.setValue(b,"batchingTexture",H._matricesTexture,T),Ce.setOptional(b,H,"batchingIdTexture"),Ce.setValue(b,"batchingIdTexture",H._indirectTexture,T),Ce.setOptional(b,H,"batchingColorTexture"),H._colorsTexture!==null&&Ce.setValue(b,"batchingColorTexture",H._colorsTexture,T));const ja=Z.morphAttributes;if((ja.position!==void 0||ja.normal!==void 0||ja.color!==void 0)&&Gt.update(H,Z,Pn),(dn||Ft.receiveShadow!==H.receiveShadow)&&(Ft.receiveShadow=H.receiveShadow,Ce.setValue(b,"receiveShadow",H.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Ti.envMap.value=Ut,Ti.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&V.environment!==null&&(Ti.envMapIntensity.value=V.environmentIntensity),dn&&(Ce.setValue(b,"toneMappingExposure",x.toneMappingExposure),Ft.needsLights&&_m(Ti,$a),xt&&J.fog===!0&&dt.refreshFogUniforms(Ti,xt),dt.refreshMaterialUniforms(Ti,J,G,B,f.state.transmissionRenderTarget[A.id]),Jo.upload(b,$u(Ft),Ti,T)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Jo.upload(b,$u(Ft),Ti,T),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Ce.setValue(b,"center",H.center),Ce.setValue(b,"modelViewMatrix",H.modelViewMatrix),Ce.setValue(b,"normalMatrix",H.normalMatrix),Ce.setValue(b,"modelMatrix",H.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const xn=J.uniformsGroups;for(let Ya=0,xm=xn.length;Ya<xm;Ya++){const Yu=xn[Ya];F.update(Yu,Pn),F.bind(Yu,Pn)}}return Pn}function _m(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function vm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(A,V,Z){st.get(A.texture).__webglTexture=V,st.get(A.depthTexture).__webglTexture=Z;const J=st.get(A);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Z===void 0,J.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,V){const Z=st.get(A);Z.__webglFramebuffer=V,Z.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,Z=0){w=A,R=V,C=Z;let J=!0,H=null,xt=!1,At=!1;if(A){const Ut=st.get(A);if(Ut.__useDefaultFramebuffer!==void 0)q.bindFramebuffer(b.FRAMEBUFFER,null),J=!1;else if(Ut.__webglFramebuffer===void 0)T.setupRenderTarget(A);else if(Ut.__hasExternalTextures)T.rebindTextures(A,st.get(A.texture).__webglTexture,st.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ot=A.depthTexture;if(Ut.__boundDepthTexture!==Ot){if(Ot!==null&&st.has(Ot)&&(A.width!==Ot.image.width||A.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(A)}}const $t=A.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(At=!0);const Yt=st.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Yt[V])?H=Yt[V][Z]:H=Yt[V],xt=!0):A.samples>0&&T.useMultisampledRTT(A)===!1?H=st.get(A).__webglMultisampledFramebuffer:Array.isArray(Yt)?H=Yt[Z]:H=Yt,y.copy(A.viewport),E.copy(A.scissor),X=A.scissorTest}else y.copy(gt).multiplyScalar(G).floor(),E.copy(rt).multiplyScalar(G).floor(),X=vt;if(q.bindFramebuffer(b.FRAMEBUFFER,H)&&J&&q.drawBuffers(A,H),q.viewport(y),q.scissor(E),q.setScissorTest(X),xt){const Ut=st.get(A.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ut.__webglTexture,Z)}else if(At){const Ut=st.get(A.texture),$t=V||0;b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,Ut.__webglTexture,Z||0,$t)}D=-1},this.readRenderTargetPixels=function(A,V,Z,J,H,xt,At){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=st.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&At!==void 0&&(Lt=Lt[At]),Lt){q.bindFramebuffer(b.FRAMEBUFFER,Lt);try{const Ut=A.texture,$t=Ut.format,Yt=Ut.type;if(!et.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-J&&Z>=0&&Z<=A.height-H&&b.readPixels(V,Z,J,H,Bt.convert($t),Bt.convert(Yt),xt)}finally{const Ut=w!==null?st.get(w).__webglFramebuffer:null;q.bindFramebuffer(b.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(A,V,Z,J,H,xt,At){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=st.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&At!==void 0&&(Lt=Lt[At]),Lt){const Ut=A.texture,$t=Ut.format,Yt=Ut.type;if(!et.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=A.width-J&&Z>=0&&Z<=A.height-H){q.bindFramebuffer(b.FRAMEBUFFER,Lt);const Ot=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,Ot),b.bufferData(b.PIXEL_PACK_BUFFER,xt.byteLength,b.STREAM_READ),b.readPixels(V,Z,J,H,Bt.convert($t),Bt.convert(Yt),0);const ce=w!==null?st.get(w).__webglFramebuffer:null;q.bindFramebuffer(b.FRAMEBUFFER,ce);const ye=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await _x(b,ye,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,Ot),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,xt),b.deleteBuffer(Ot),b.deleteSync(ye),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,V=null,Z=0){A.isTexture!==!0&&(Zo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,A=arguments[1]);const J=Math.pow(2,-Z),H=Math.floor(A.image.width*J),xt=Math.floor(A.image.height*J),At=V!==null?V.x:0,Lt=V!==null?V.y:0;T.setTexture2D(A,0),b.copyTexSubImage2D(b.TEXTURE_2D,Z,0,0,At,Lt,H,xt),q.unbindTexture()},this.copyTextureToTexture=function(A,V,Z=null,J=null,H=0){A.isTexture!==!0&&(Zo("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,A=arguments[1],V=arguments[2],H=arguments[3]||0,Z=null);let xt,At,Lt,Ut,$t,Yt;Z!==null?(xt=Z.max.x-Z.min.x,At=Z.max.y-Z.min.y,Lt=Z.min.x,Ut=Z.min.y):(xt=A.image.width,At=A.image.height,Lt=0,Ut=0),J!==null?($t=J.x,Yt=J.y):($t=0,Yt=0);const Ot=Bt.convert(V.format),ce=Bt.convert(V.type);T.setTexture2D(V,0),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,V.flipY),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),b.pixelStorei(b.UNPACK_ALIGNMENT,V.unpackAlignment);const ye=b.getParameter(b.UNPACK_ROW_LENGTH),Ee=b.getParameter(b.UNPACK_IMAGE_HEIGHT),hn=b.getParameter(b.UNPACK_SKIP_PIXELS),ie=b.getParameter(b.UNPACK_SKIP_ROWS),Ft=b.getParameter(b.UNPACK_SKIP_IMAGES),Ge=A.isCompressedTexture?A.mipmaps[H]:A.image;b.pixelStorei(b.UNPACK_ROW_LENGTH,Ge.width),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Ge.height),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Lt),b.pixelStorei(b.UNPACK_SKIP_ROWS,Ut),A.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,H,$t,Yt,xt,At,Ot,ce,Ge.data):A.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,H,$t,Yt,Ge.width,Ge.height,Ot,Ge.data):b.texSubImage2D(b.TEXTURE_2D,H,$t,Yt,xt,At,Ot,ce,Ge),b.pixelStorei(b.UNPACK_ROW_LENGTH,ye),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Ee),b.pixelStorei(b.UNPACK_SKIP_PIXELS,hn),b.pixelStorei(b.UNPACK_SKIP_ROWS,ie),b.pixelStorei(b.UNPACK_SKIP_IMAGES,Ft),H===0&&V.generateMipmaps&&b.generateMipmap(b.TEXTURE_2D),q.unbindTexture()},this.copyTextureToTexture3D=function(A,V,Z=null,J=null,H=0){A.isTexture!==!0&&(Zo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,J=arguments[1]||null,A=arguments[2],V=arguments[3],H=arguments[4]||0);let xt,At,Lt,Ut,$t,Yt,Ot,ce,ye;const Ee=A.isCompressedTexture?A.mipmaps[H]:A.image;Z!==null?(xt=Z.max.x-Z.min.x,At=Z.max.y-Z.min.y,Lt=Z.max.z-Z.min.z,Ut=Z.min.x,$t=Z.min.y,Yt=Z.min.z):(xt=Ee.width,At=Ee.height,Lt=Ee.depth,Ut=0,$t=0,Yt=0),J!==null?(Ot=J.x,ce=J.y,ye=J.z):(Ot=0,ce=0,ye=0);const hn=Bt.convert(V.format),ie=Bt.convert(V.type);let Ft;if(V.isData3DTexture)T.setTexture3D(V,0),Ft=b.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)T.setTexture2DArray(V,0),Ft=b.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,V.flipY),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),b.pixelStorei(b.UNPACK_ALIGNMENT,V.unpackAlignment);const Ge=b.getParameter(b.UNPACK_ROW_LENGTH),se=b.getParameter(b.UNPACK_IMAGE_HEIGHT),Pn=b.getParameter(b.UNPACK_SKIP_PIXELS),Ms=b.getParameter(b.UNPACK_SKIP_ROWS),dn=b.getParameter(b.UNPACK_SKIP_IMAGES);b.pixelStorei(b.UNPACK_ROW_LENGTH,Ee.width),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Ee.height),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Ut),b.pixelStorei(b.UNPACK_SKIP_ROWS,$t),b.pixelStorei(b.UNPACK_SKIP_IMAGES,Yt),A.isDataTexture||A.isData3DTexture?b.texSubImage3D(Ft,H,Ot,ce,ye,xt,At,Lt,hn,ie,Ee.data):V.isCompressedArrayTexture?b.compressedTexSubImage3D(Ft,H,Ot,ce,ye,xt,At,Lt,hn,Ee.data):b.texSubImage3D(Ft,H,Ot,ce,ye,xt,At,Lt,hn,ie,Ee),b.pixelStorei(b.UNPACK_ROW_LENGTH,Ge),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,se),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Pn),b.pixelStorei(b.UNPACK_SKIP_ROWS,Ms),b.pixelStorei(b.UNPACK_SKIP_IMAGES,dn),H===0&&V.generateMipmaps&&b.generateMipmap(Ft),q.unbindTexture()},this.initRenderTarget=function(A){st.get(A).__webglFramebuffer===void 0&&T.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?T.setTextureCube(A,0):A.isData3DTexture?T.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?T.setTexture2DArray(A,0):T.setTexture2D(A,0),q.unbindTexture()},this.resetState=function(){R=0,C=0,w=null,q.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===wu?"display-p3":"srgb",e.unpackColorSpace=oe.workingColorSpace===ka?"display-p3":"srgb"}}class Iu{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new jt(t),this.near=e,this.far=i}clone(){return new Iu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class P1 extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class I1{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Xc,this.updateRanges=[],this.version=0,this.uuid=_i()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Je=new z;class ma{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix4(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Je.fromBufferAttribute(this,e),Je.applyNormalMatrix(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Je.fromBufferAttribute(this,e),Je.transformDirection(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Nn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=he(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Nn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Nn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Nn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Nn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array),r=he(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ze(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ma(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class cm extends ys{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Bs;const Sr=new z,ks=new z,Vs=new z,Hs=new Vt,br=new Vt,um=new Se,Oo=new z,Er=new z,Fo=new z,Bd=new Vt,Vl=new Vt,kd=new Vt;class D1 extends Fe{constructor(t=new cm){if(super(),this.isSprite=!0,this.type="Sprite",Bs===void 0){Bs=new be;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new I1(e,5);Bs.setIndex([0,1,2,0,2,3]),Bs.setAttribute("position",new ma(i,3,0,!1)),Bs.setAttribute("uv",new ma(i,2,3,!1))}this.geometry=Bs,this.material=t,this.center=new Vt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ks.setFromMatrixScale(this.matrixWorld),um.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Vs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ks.multiplyScalar(-Vs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;zo(Oo.set(-.5,-.5,0),Vs,o,ks,s,r),zo(Er.set(.5,-.5,0),Vs,o,ks,s,r),zo(Fo.set(.5,.5,0),Vs,o,ks,s,r),Bd.set(0,0),Vl.set(1,0),kd.set(1,1);let a=t.ray.intersectTriangle(Oo,Er,Fo,!1,Sr);if(a===null&&(zo(Er.set(-.5,.5,0),Vs,o,ks,s,r),Vl.set(0,1),a=t.ray.intersectTriangle(Oo,Fo,Er,!1,Sr),a===null))return;const l=t.ray.origin.distanceTo(Sr);l<t.near||l>t.far||e.push({distance:l,point:Sr.clone(),uv:bn.getInterpolation(Sr,Oo,Er,Fo,Bd,Vl,kd,new Vt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function zo(n,t,e,i,s,r){Hs.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(br.x=r*Hs.x-s*Hs.y,br.y=s*Hs.x+r*Hs.y):br.copy(Hs),n.copy(t),n.x+=br.x,n.y+=br.y,n.applyMatrix4(um)}class Qn extends ys{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ga=new z,_a=new z,Vd=new Se,Tr=new Ha,Bo=new Va,Hl=new z,Hd=new z;class io extends Fe{constructor(t=new be,e=new Qn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)ga.fromBufferAttribute(e,s-1),_a.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=ga.distanceTo(_a);t.setAttribute("lineDistance",new fe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bo.copy(i.boundingSphere),Bo.applyMatrix4(s),Bo.radius+=r,t.ray.intersectsSphere(Bo)===!1)return;Vd.copy(s).invert(),Tr.copy(t.ray).applyMatrix4(Vd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const g=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let m=g,f=_-1;m<f;m+=c){const p=d.getX(m),S=d.getX(m+1),x=ko(this,t,Tr,l,p,S);x&&e.push(x)}if(this.isLineLoop){const m=d.getX(_-1),f=d.getX(g),p=ko(this,t,Tr,l,m,f);p&&e.push(p)}}else{const g=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let m=g,f=_-1;m<f;m+=c){const p=ko(this,t,Tr,l,m,m+1);p&&e.push(p)}if(this.isLineLoop){const m=ko(this,t,Tr,l,_-1,g);m&&e.push(m)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ko(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(ga.fromBufferAttribute(o,s),_a.fromBufferAttribute(o,r),e.distanceSqToSegment(ga,_a,Hl,Hd)>i)return;Hl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Hl);if(!(l<t.near||l>t.far))return{distance:l,point:Hd.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const Gd=new z,Wd=new z;class Du extends io{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Gd.fromBufferAttribute(e,s),Wd.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Gd.distanceTo(Wd);t.setAttribute("lineDistance",new fe(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Lu extends io{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class L1 extends rn{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Uu extends be{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new z,d=new Vt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=e;u++,h+=3){const g=i+u/e*s;c.x=t*Math.cos(g),c.y=t*Math.sin(g),o.push(c.x,c.y,c.z),a.push(0,0,1),d.x=(o[h]/t+1)/2,d.y=(o[h+1]/t+1)/2,l.push(d.x,d.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new fe(o,3)),this.setAttribute("normal",new fe(a,3)),this.setAttribute("uv",new fe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ti extends be{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],g=[];let _=0;const m=[],f=i/2;let p=0;S(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(g,2));function S(){const M=new z,R=new z;let C=0;const w=(e-t)/i;for(let D=0;D<=r;D++){const U=[],y=D/r,E=y*(e-t)+t;for(let X=0;X<=s;X++){const O=X/s,W=O*l+a,Y=Math.sin(W),B=Math.cos(W);R.x=E*Y,R.y=-y*i+f,R.z=E*B,u.push(R.x,R.y,R.z),M.set(Y,w,B).normalize(),h.push(M.x,M.y,M.z),g.push(O,1-y),U.push(_++)}m.push(U)}for(let D=0;D<s;D++)for(let U=0;U<r;U++){const y=m[U][D],E=m[U+1][D],X=m[U+1][D+1],O=m[U][D+1];t>0&&(d.push(y,E,O),C+=3),e>0&&(d.push(E,X,O),C+=3)}c.addGroup(p,C,0),p+=C}function x(M){const R=_,C=new Vt,w=new z;let D=0;const U=M===!0?t:e,y=M===!0?1:-1;for(let X=1;X<=s;X++)u.push(0,f*y,0),h.push(0,y,0),g.push(.5,.5),_++;const E=_;for(let X=0;X<=s;X++){const W=X/s*l+a,Y=Math.cos(W),B=Math.sin(W);w.x=U*B,w.y=f*y,w.z=U*Y,u.push(w.x,w.y,w.z),h.push(0,y,0),C.x=Y*.5+.5,C.y=B*.5*y+.5,g.push(C.x,C.y),_++}for(let X=0;X<s;X++){const O=R+X,W=E+X;M===!0?d.push(W,W+1,O):d.push(W+1,W,O),D+=3}c.addGroup(p,D,M===!0?1:2),p+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ti(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nu extends ti{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Nu(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ou extends be{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],d=[];let u=t;const h=(e-t)/s,g=new z,_=new Vt;for(let m=0;m<=s;m++){for(let f=0;f<=i;f++){const p=r+f/i*o;g.x=u*Math.cos(p),g.y=u*Math.sin(p),l.push(g.x,g.y,g.z),c.push(0,0,1),_.x=(g.x/e+1)/2,_.y=(g.y/e+1)/2,d.push(_.x,_.y)}u+=h}for(let m=0;m<s;m++){const f=m*(i+1);for(let p=0;p<i;p++){const S=p+f,x=S,M=S+i+1,R=S+i+2,C=S+1;a.push(x,M,C),a.push(M,R,C)}}this.setIndex(a),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(c,3)),this.setAttribute("uv",new fe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ou(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Qs extends be{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const d=[],u=new z,h=new z,g=[],_=[],m=[],f=[];for(let p=0;p<=i;p++){const S=[],x=p/i;let M=0;p===0&&o===0?M=.5/e:p===i&&l===Math.PI&&(M=-.5/e);for(let R=0;R<=e;R++){const C=R/e;u.x=-t*Math.cos(s+C*r)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(s+C*r)*Math.sin(o+x*a),_.push(u.x,u.y,u.z),h.copy(u).normalize(),m.push(h.x,h.y,h.z),f.push(C+M,1-x),S.push(c++)}d.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){const x=d[p][S+1],M=d[p][S],R=d[p+1][S],C=d[p+1][S+1];(p!==0||o>0)&&g.push(x,M,C),(p!==i-1||l<Math.PI)&&g.push(M,R,C)}this.setIndex(g),this.setAttribute("position",new fe(_,3)),this.setAttribute("normal",new fe(m,3)),this.setAttribute("uv",new fe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Fu extends be{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],d=new z,u=new z,h=new z;for(let g=0;g<=i;g++)for(let _=0;_<=s;_++){const m=_/s*r,f=g/i*Math.PI*2;u.x=(t+e*Math.cos(f))*Math.cos(m),u.y=(t+e*Math.cos(f))*Math.sin(m),u.z=e*Math.sin(f),a.push(u.x,u.y,u.z),d.x=t*Math.cos(m),d.y=t*Math.sin(m),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(_/s),c.push(g/i)}for(let g=1;g<=i;g++)for(let _=1;_<=s;_++){const m=(s+1)*g+_-1,f=(s+1)*(g-1)+_-1,p=(s+1)*(g-1)+_,S=(s+1)*g+_;o.push(m,f,S),o.push(f,p,S)}this.setIndex(o),this.setAttribute("position",new fe(a,3)),this.setAttribute("normal",new fe(l,3)),this.setAttribute("uv",new fe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class U1 extends be{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,s=new z,r=new z;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,d=l.length;c<d;++c){const u=l[c],h=u.start,g=u.count;for(let _=h,m=h+g;_<m;_+=3)for(let f=0;f<3;f++){const p=a.getX(_+f),S=a.getX(_+(f+1)%3);s.fromBufferAttribute(o,p),r.fromBufferAttribute(o,S),Xd(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const d=3*a+c,u=3*a+(c+1)%3;s.fromBufferAttribute(o,d),r.fromBufferAttribute(o,u),Xd(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new fe(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Xd(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(s)===!0?!1:(e.add(i),e.add(s),!0)}class ur extends ys{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xp,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class hm extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class N1 extends hm{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Gl=new Se,$d=new z,jd=new z;class O1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cu,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;$d.setFromMatrixPosition(t.matrixWorld),e.position.copy($d),jd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(jd),e.updateMatrixWorld(),Gl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Gl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class F1 extends O1{constructor(){super(new im(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class z1 extends hm{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new F1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class B1{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Yd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Yd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Yd(){return performance.now()}const qd=new Se;class k1{constructor(t,e,i=0,s=1/0){this.ray=new Ha(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ru,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return qd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(qd),this}intersectObject(t,e=!0,i=[]){return jc(t,this,i,e),i.sort(Kd),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)jc(t[s],this,i,e);return i.sort(Kd),i}}function Kd(n,t){return n.distance-t.distance}function jc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)jc(r[o],t,e,!0)}}class Zd{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ke(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class V1 extends Du{constructor(t=10,e=10,i=4473924,s=8947848){i=new jt(i),s=new jt(s);const r=e/2,o=t/e,a=t/2,l=[],c=[];for(let h=0,g=0,_=-a;h<=e;h++,_+=o){l.push(-a,0,_,a,0,_),l.push(_,0,-a,_,0,a);const m=h===r?i:s;m.toArray(c,g),g+=3,m.toArray(c,g),g+=3,m.toArray(c,g),g+=3,m.toArray(c,g),g+=3}const d=new be;d.setAttribute("position",new fe(l,3)),d.setAttribute("color",new fe(c,3));const u=new Qn({vertexColors:!0,toneMapped:!1});super(d,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class H1 extends Du{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new be;s.setAttribute("position",new fe(e,3)),s.setAttribute("color",new fe(i,3));const r=new Qn({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(t,e,i){const s=new jt,r=this.geometry.attributes.color.array;return s.set(t),s.toArray(r,0),s.toArray(r,3),s.set(e),s.toArray(r,6),s.toArray(r,9),s.set(i),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class G1 extends xs{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xu);const Jd={type:"change"},zu={type:"start"},dm={type:"end"},Vo=new Ha,Qd=new di,W1=Math.cos(70*Ko.DEG2RAD),Le=new z,ln=2*Math.PI,pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Wl=1e-6;class X1 extends G1{constructor(t,e=null){super(t,e),this.state=pe.NONE,this.enabled=!0,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:qs.ROTATE,MIDDLE:qs.DOLLY,RIGHT:qs.PAN},this.touches={ONE:Xs.ROTATE,TWO:Xs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new gs,this._lastTargetPosition=new z,this._quat=new gs().setFromUnitVectors(t.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zd,this._sphericalDelta=new Zd,this._scale=1,this._panOffset=new z,this._rotateStart=new Vt,this._rotateEnd=new Vt,this._rotateDelta=new Vt,this._panStart=new Vt,this._panEnd=new Vt,this._panDelta=new Vt,this._dollyStart=new Vt,this._dollyEnd=new Vt,this._dollyDelta=new Vt,this._dollyDirection=new z,this._mouse=new Vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=j1.bind(this),this._onPointerDown=$1.bind(this),this._onPointerUp=Y1.bind(this),this._onContextMenu=eE.bind(this),this._onMouseWheel=Z1.bind(this),this._onKeyDown=J1.bind(this),this._onTouchStart=Q1.bind(this),this._onTouchMove=tE.bind(this),this._onMouseDown=q1.bind(this),this._onMouseMove=K1.bind(this),this._interceptControlDown=nE.bind(this),this._interceptControlUp=iE.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Jd),this.update(),this.state=pe.NONE}update(t=null){const e=this.object.position;Le.copy(e).sub(this.target),Le.applyQuaternion(this._quat),this._spherical.setFromVector3(Le),this.autoRotate&&this.state===pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ln:i>Math.PI&&(i-=ln),s<-Math.PI?s+=ln:s>Math.PI&&(s-=ln),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Le.setFromSpherical(this._spherical),Le.applyQuaternion(this._quatInverse),e.copy(this.target).add(Le),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Le.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new z(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Le.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Vo.origin.copy(this.object.position),Vo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Vo.direction))<W1?this.object.lookAt(this.target):(Qd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Vo.intersectPlane(Qd,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Wl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Wl||this._lastTargetPosition.distanceToSquared(this.target)>Wl?(this.dispatchEvent(Jd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ln/60*this.autoRotateSpeed*t:ln/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Le.setFromMatrixColumn(e,0),Le.multiplyScalar(-t),this._panOffset.add(Le)}_panUp(t,e){this.screenSpacePanning===!0?Le.setFromMatrixColumn(e,1):(Le.setFromMatrixColumn(e,0),Le.crossVectors(this.object.up,Le)),Le.multiplyScalar(t),this._panOffset.add(Le)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Le.copy(s).sub(this.target);let r=Le.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function $1(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function j1(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Y1(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(dm),this.state=pe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function q1(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case qs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=pe.DOLLY;break;case qs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pe.ROTATE}break;case qs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pe.PAN}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(zu)}function K1(n){switch(this.state){case pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Z1(n){this.enabled===!1||this.enableZoom===!1||this.state!==pe.NONE||(n.preventDefault(),this.dispatchEvent(zu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(dm))}function J1(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function Q1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Xs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=pe.TOUCH_ROTATE;break;case Xs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=pe.TOUCH_PAN;break;default:this.state=pe.NONE}break;case 2:switch(this.touches.TWO){case Xs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=pe.TOUCH_DOLLY_PAN;break;case Xs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=pe.TOUCH_DOLLY_ROTATE;break;default:this.state=pe.NONE}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(zu)}function tE(n){switch(this._trackPointer(n),this.state){case pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=pe.NONE}}function eE(n){this.enabled!==!1&&n.preventDefault()}function nE(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function iE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var sE=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function rE(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var fm={exports:{}};(function(n,t){(function(e,i){n.exports=i()})(sE,function(){var e=function(){function i(g){return o.appendChild(g.dom),g}function s(g){for(var _=0;_<o.children.length;_++)o.children[_].style.display=_===g?"block":"none";r=g}var r=0,o=document.createElement("div");o.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",o.addEventListener("click",function(g){g.preventDefault(),s(++r%o.children.length)},!1);var a=(performance||Date).now(),l=a,c=0,d=i(new e.Panel("FPS","#0ff","#002")),u=i(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var h=i(new e.Panel("MB","#f08","#201"));return s(0),{REVISION:16,dom:o,addPanel:i,showPanel:s,begin:function(){a=(performance||Date).now()},end:function(){c++;var g=(performance||Date).now();if(u.update(g-a,200),g>l+1e3&&(d.update(1e3*c/(g-l),100),l=g,c=0,h)){var _=performance.memory;h.update(_.usedJSHeapSize/1048576,_.jsHeapSizeLimit/1048576)}return g},update:function(){a=this.end()},domElement:o,setMode:s}};return e.Panel=function(i,s,r){var o=1/0,a=0,l=Math.round,c=l(window.devicePixelRatio||1),d=80*c,u=48*c,h=3*c,g=2*c,_=3*c,m=15*c,f=74*c,p=30*c,S=document.createElement("canvas");S.width=d,S.height=u,S.style.cssText="width:80px;height:48px";var x=S.getContext("2d");return x.font="bold "+9*c+"px Helvetica,Arial,sans-serif",x.textBaseline="top",x.fillStyle=r,x.fillRect(0,0,d,u),x.fillStyle=s,x.fillText(i,h,g),x.fillRect(_,m,f,p),x.fillStyle=r,x.globalAlpha=.9,x.fillRect(_,m,f,p),{dom:S,update:function(M,R){o=Math.min(o,M),a=Math.max(a,M),x.fillStyle=r,x.globalAlpha=1,x.fillRect(0,0,d,m),x.fillStyle=s,x.fillText(l(M)+" "+i+" ("+l(o)+"-"+l(a)+")",h,g),x.drawImage(S,_+c,m,f-c,p,_,m,f-c,p),x.fillRect(_+f-c,m,c,p),x.fillStyle=r,x.globalAlpha=.9,x.fillRect(_+f-c,m,c,l((1-M/R)*p))}}},e})})(fm);var oE=fm.exports;const aE=rE(oE),va={radar:2271231,sam:16726832,jammer:11552511},pm=16723285,lE={start:3066993,end:15158332,via:15844367},Gs=new jt;function cE(n,t,e){const i=Math.max(0,Math.min(1,n/t));return i<.25?e.setRGB(.83+i*.3,.76+i*.25,.52):i<.55?e.setRGB(.36-(i-.25)*.4,.55-(i-.25)*.15,.28):i<.8?e.setRGB(.34+(i-.55)*.9,.31+(i-.55)*.8,.28):e.setRGB(.9,.92,.95),e}function uE(n){const t=n.gridSize,{size:e}=n.params,i=new be,s=new Float32Array(t*t*3),r=new Float32Array(t*t*3),o=[];let a=0;for(let m=0;m<t;m++)for(let f=0;f<t;f++){const p=f/(t-1)*e-n.halfSize,S=m/(t-1)*e-n.halfSize,x=n.heights[m*t+f];s[a]=p,s[a+1]=x,s[a+2]=S,a+=3}for(let m=0;m<t-1;m++)for(let f=0;f<t-1;f++){const p=m*t+f,S=p+1,x=p+t,M=x+1;o.push(p,x,S,S,x,M)}i.setAttribute("position",new Ze(s,3)),i.setAttribute("color",new Ze(r,3)),i.setIndex(o),i.computeVertexNormals();const l=new ur({vertexColors:!0,roughness:.95,metalness:.02,flatShading:!1}),c=new de(i,l);c.receiveShadow=!0,c.name="terrain";const d=Math.max(...n.heights,1),u=i.getAttribute("color"),h=new jt,g=new jt(pm),_=(m,f,p)=>{let S=0;for(let x=0;x<t;x++)for(let M=0;M<t;M++){const R=s[S*3],C=s[S*3+2],w=s[S*3+1];if(cE(w,d,Gs),p){const D=Math.min(1,m(R,C));D>.02&&(h.setHSL(.02*(1-D),.95,.5),Gs.lerp(h,Math.min(.75,D*.8)));const U=Math.min(1,f(R,C));U>.02&&Gs.lerp(g,Math.min(.7,U*.8))}u.setXYZ(S,Gs.r,Gs.g,Gs.b),S++}u.needsUpdate=!0};return _(()=>0,()=>0,!1),{mesh:c,applyOverlay:_}}function tf(n){const t=new je;t.userData.entityId=n.id,t.userData.entityType="threat";const i=new jt(va[n.kind]).clone();i.offsetHSL(0,0,(n.level-3)*.04);const s=Math.max(1,n.heightMax-n.heightMin),r=new ti(n.radius,n.radius,s,48,1,!0),o=new _n({color:i,transparent:!0,opacity:n.opacity,side:mn,depthWrite:!1}),a=new de(r,o);a.position.set(n.position.x,(n.heightMin+n.heightMax)/2,n.position.z),t.add(a);const l=new Qn({color:i,transparent:!0,opacity:.9});for(const u of[n.heightMin+.5,n.heightMax]){const h=new Lu(new be().setFromPoints(Bu(n.radius,u)),l);h.position.set(n.position.x,0,n.position.z),t.add(h)}const c=new de(new Uu(n.radius,48),new _n({color:i,transparent:!0,opacity:.08,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.set(n.position.x,.5,n.position.z),t.add(c);const d=new de(new ti(1.2,1.2,s,8),new _n({color:i}));return d.position.set(n.position.x,n.heightMin+s/2,n.position.z),t.add(d),t}function Bu(n,t){const e=[];for(let i=0;i<64;i++){const s=i/64*Math.PI*2;e.push(new z(Math.cos(s)*n,t,Math.sin(s)*n))}return e}function ef(n){const t=new je;t.userData.entityId=n.id,t.userData.entityType="nofly";const e=new jt(pm),i=Math.max(1,n.heightMax-n.heightMin),s=new de(new ti(n.radius,n.radius,i,48,1,!0),new _n({color:e,transparent:!0,opacity:.16,side:mn,depthWrite:!1}));s.position.set(n.position.x,(n.heightMin+n.heightMax)/2,n.position.z),t.add(s);const r=new Du(new U1(new ti(n.radius,n.radius,i,24,4,!0)),new Qn({color:e,transparent:!0,opacity:.55}));r.position.copy(s.position),t.add(r);for(const o of[.5,n.heightMax]){const a=new Lu(new be().setFromPoints(Bu(n.radius,o)),new Qn({color:e,linewidth:2}));a.position.set(n.position.x,0,n.position.z),t.add(a)}return t}function nf(n,t){const e=Mp(t,n.position.x,n.position.z)-.3,i=new de(new qn(n.size.x,n.height,n.size.z),new ur({color:10134445,roughness:.8,metalness:.15}));return i.position.set(n.position.x,e+n.height/2,n.position.z),i.castShadow=!0,i.receiveShadow=!0,i.userData.entityId=n.id,i.userData.entityType="obstacle",i}function hE(n,t,e,i){const s=new je;s.userData.entityId=n,s.userData.entityType="waypoint";const r=i??lE[t],o=new de(new Qs(7,20,16),new ur({color:r,emissive:r,emissiveIntensity:.45,roughness:.4}));s.add(o);const a=new de(new Fu(10,.8,8,32),new _n({color:r}));a.rotation.x=Math.PI/2,s.add(a);const l=ku(e,`#${new jt(r).getHexString()}`);return l.position.set(0,16,0),s.add(l),s}function ku(n,t="#ffffff"){const e=document.createElement("canvas"),i=e.getContext("2d"),s=44;i.font=`bold ${s}px sans-serif`;const r=Math.ceil(i.measureText(n).width)+24;e.width=r,e.height=s+20,i.font=`bold ${s}px sans-serif`,i.fillStyle="rgba(15,20,30,0.65)",i.fillRect(0,0,e.width,e.height),i.fillStyle=t,i.textBaseline="middle",i.fillText(n,12,e.height/2);const o=new L1(e);o.minFilter=Sn;const a=new cm({map:o,depthTest:!1,transparent:!0}),l=new D1(a),c=.5;return l.scale.set(e.width*c*.5,e.height*c*.5,1),l}function dE(n=1752220){const t=new je,e=new ur({color:2899536,roughness:.4,metalness:.4}),i=new ur({color:n,emissive:n,emissiveIntensity:.35}),s=new de(new qn(5,2,6),e);t.add(s);const r=new de(new Nu(1.6,3,4),i);r.rotation.x=-Math.PI/2,r.position.z=4,t.add(r);const o=new qn(1.1,.8,1.1),a=new qn(7,.15,.6),l=[],c=[[3.4,3.4],[-3.4,3.4],[3.4,-3.4],[-3.4,-3.4]];for(const[d,u]of c){const h=new de(o,e);h.scale.set(Math.abs(d)/1.5,1,Math.abs(u)/1.5),h.position.set(d/2,.3,u/2),h.rotation.y=Math.sign(d)===Math.sign(u)?Math.PI/4:-Math.PI/4,t.add(h);const g=new de(new ti(.5,.5,1.2,8),e);g.position.set(d,.8,u),t.add(g);const _=new de(a,i);_.position.set(d,1.6,u),t.add(_),l.push(_)}return t.scale.setScalar(1.2),{group:t,rotors:l}}function wr(n,t={}){const e=new be().setFromPoints(n.map(r=>new z(r.x,r.y,r.z)));t.vertexColors&&e.setAttribute("color",new Ze(t.vertexColors,3));const i=new Qn({color:t.color??16777215,transparent:!0,opacity:t.opacity??1,vertexColors:!!t.vertexColors}),s=new io(e,i);return s.frustumCulled=!1,s}function fE(n=14){const t=new de(new Ou(n,n+2,48),new _n({color:16769126,side:mn,transparent:!0,opacity:.9,depthTest:!1}));return t.rotation.x=-Math.PI/2,t.renderOrder=99,t}function pE(n){return n.kind==="moving-obstacle"?16747546:va[n.threatKind]}function mE(n){const t=new je;t.userData.entityId=n.id,t.userData.entityType="dynamic";const e=pE(n),i=new _n({color:e,transparent:!0,opacity:.28,side:mn,depthWrite:!1}),s=new de(new ti(Math.max(n.radius,1),Math.max(n.radius,1),1,32,1,!0),i);t.add(s);const r=new Qn({color:e,transparent:!0,opacity:.95}),o=new Lu(new be().setFromPoints(Bu(Math.max(n.radius,1),.6)),r);t.add(o);let a=null;n.kind==="moving-obstacle"&&(a=new de(new qn(n.radius*1.2,n.heightMax,n.radius*1.2),new ur({color:e,emissive:e,emissiveIntensity:.25,roughness:.6})),a.position.y=n.heightMax/2,t.add(a));const l=new be;l.setAttribute("position",new Ze(new Float32Array(0),3));const c=new io(l,new Qn({color:16765286,transparent:!0,opacity:.8}));c.frustumCulled=!1,t.add(c);const d=ku(n.name,`#${new jt(e).getHexString()}`);return d.position.set(0,Math.max(n.heightMax+14,30),0),t.add(d),{group:t,updateState:g=>{const _=!!g&&g.active;if(t.visible=_,!g||!_)return;t.position.set(g.position.x,0,g.position.z);const m=Math.max(g.radius,.5),f=Math.max(n.heightMax-n.heightMin,1);if(s.scale.set(m/Math.max(n.radius,1),f,m/Math.max(n.radius,1)),s.position.y=(n.heightMin+n.heightMax)/2,o.scale.setScalar(m/Math.max(n.radius,1)),o.visible=!0,a){a.scale.setScalar(Math.min(2,Math.max(.2,m/Math.max(n.radius,1))));const p=g.velocity;Math.hypot(p.x,p.z)>.5&&(a.rotation.y=Math.atan2(p.x,p.z))}n.kind==="sudden-threat"&&(i.opacity=.12+.3*g.growPhase)},setPrediction:g=>{const _=new Float32Array(g.length*3);g.forEach((m,f)=>{_[f*3]=m.x,_[f*3+1]=m.y,_[f*3+2]=m.z}),c.geometry.dispose(),c.geometry=new be,c.geometry.setAttribute("position",new Ze(_,3))}}}function gE(n,t){const e=new be().setFromPoints(n.map(s=>new z(s.x,s.y,s.z))),i=new io(e,new Qn({color:t,transparent:!0,opacity:.9}));return i.frustumCulled=!1,i}class _E{constructor(t,e,i){Dt(this,"container");Dt(this,"sceneStore");Dt(this,"simStore");Dt(this,"renderer");Dt(this,"scene");Dt(this,"camera");Dt(this,"controls");Dt(this,"stats");Dt(this,"raycaster",new k1);Dt(this,"pointer",new Vt);Dt(this,"terrainView",null);Dt(this,"terrain",null);Dt(this,"env",null);Dt(this,"zoneGroup",new je);Dt(this,"dynamicGroup",new je);Dt(this,"waypointGroup",new je);Dt(this,"pathRoot",new je);Dt(this,"overlayGroup",new je);Dt(this,"dynamicMeshes",new Map);Dt(this,"drones",new Map);Dt(this,"selectRing");Dt(this,"replanGroup",new je);Dt(this,"replanSprite",null);Dt(this,"replanSpriteUntil",0);Dt(this,"drag",null);Dt(this,"dragPlane",new di);Dt(this,"dragOffset",new z);Dt(this,"downPos",{x:0,y:0});Dt(this,"moved",!1);Dt(this,"raf",0);Dt(this,"clock",new B1);Dt(this,"resizeObserver");Dt(this,"disposed",!1);Dt(this,"replanTickAcc",0);Dt(this,"predictTickAcc",0);Dt(this,"dynamicsDirty",!0);Dt(this,"onPointerDown",t=>{if(t.button!==0)return;this.updatePointer(t),this.downPos={x:t.clientX,y:t.clientY},this.moved=!1;const e=this.sceneStore.editMode,i=this.pickTerrain();if(e==="select"){const r=this.pickEntity();if(r){const o=r.userData.entityId,a=r.userData.entityType;this.sceneStore.select(o),this.drag={type:a,id:o,pointerId:t.pointerId},this.controls.enabled=!1;const l=new z;r.getWorldPosition(l),this.dragPlane.set(new z(0,1,0),-l.y);const c=this.rayToPlane(t);c?this.dragOffset.copy(l).sub(c):this.dragOffset.set(0,0,0),this.renderer.domElement.style.cursor="grabbing"}else this.sceneStore.select(null);return}if(!i)return;const s={x:i.x,y:i.y,z:i.z};if(e==="add-threat")s.y=0,this.sceneStore.addThreatAt(s,"radar");else if(e==="add-nofly")s.y=0,this.sceneStore.addNoFlyAt(s);else if(e==="add-obstacle")s.y=0,this.sceneStore.addObstacleAt(s),this.syncZones();else if(e==="add-dynamic")s.y=0,this.sceneStore.addDynamicAt(s),this.syncDynamics();else if(e==="add-waypoint"){const r=this.getEnvironment();s.y=Math.max(r.groundHeight(s.x,s.z)+this.sceneStore.planParams.clearance+5,this.sceneStore.planParams.cruiseAlt),this.sceneStore.addWaypointAt(s),this.syncWaypoints()}this.simStore.markDirty()});Dt(this,"onPointerMove",t=>{if(this.drag&&t.pointerId===this.drag.pointerId){Math.abs(t.clientX-this.downPos.x)+Math.abs(t.clientY-this.downPos.y)>3&&(this.moved=!0);const e=this.rayToPlane(t);if(!e)return;e.add(this.dragOffset),this.applyDragPosition(e);return}if(this.sceneStore.editMode==="select"){this.updatePointer(t);const e=this.pickEntity();this.renderer.domElement.style.cursor=e?"grab":"default"}else this.renderer.domElement.style.cursor="crosshair"});Dt(this,"onPointerUp",t=>{this.drag&&t.pointerId===this.drag.pointerId&&(this.drag=null,this.controls.enabled=this.simStore.cameraMode!=="follow",this.renderer.domElement.style.cursor="default",this.moved&&this.simStore.autoReplan&&this.simStore.plan())});Dt(this,"onContextMenu",t=>t.preventDefault());Dt(this,"animate",()=>{var i,s;if(this.disposed)return;this.raf=requestAnimationFrame(this.animate),(i=this.stats)==null||i.begin();const t=Math.min(this.clock.getDelta(),.05);this.simStore.advance(t);const e=this.simStore.simTime;if(this.updateDynamics(e),this.predictTickAcc+=t,(this.dynamicsDirty||this.predictTickAcc>=.5)&&(this.predictTickAcc=0,this.dynamicsDirty=!1,this.simStore.showPrediction&&this.syncDynamics()),this.updateDrones(t,e),this.replanTickAcc+=t,this.replanTickAcc>=.25){this.replanTickAcc=0;const r=this.simStore.buildEnvironmentAt(e);this.simStore.tickOnlineReplan(r,t),this.simStore.showReplanWindow&&this.updateReplanOverlay()}this.updateSelectRing(),this.updateReplanSprite(t,e),this.simStore.cameraMode==="follow"&&this.updateFollowCamera(),this.controls.update(),this.renderer.render(this.scene,this.camera),(s=this.stats)==null||s.end()});this.container=t,this.sceneStore=e,this.simStore=i,this.initRenderer(),this.initScene(),this.selectRing=fE(),this.selectRing.visible=!1,this.scene.add(this.selectRing),this.scene.add(this.zoneGroup,this.dynamicGroup,this.waypointGroup,this.pathRoot,this.overlayGroup,this.replanGroup),this.rebuildTerrain(),this.syncZones(),this.syncDynamics(),this.syncWaypoints(),this.syncDrones(),this.syncPaths(),this.ensureDrone(),this.bindEvents(),this.resizeObserver=new ResizeObserver(()=>this.onResize()),this.resizeObserver.observe(t),this.animate()}markDynamicsDirty(){this.dynamicsDirty=!0}initRenderer(){const t=document.createElement("canvas");this.renderer=new C1({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.capabilities.isWebGL2||console.warn("当前环境不支持 WebGL 2.0，已回退到 WebGL1 渲染"),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Dp,this.renderer.outputColorSpace=Un,this.container.appendChild(t);try{this.stats=new aE,this.stats.showPanel(0),this.stats.dom.style.position="absolute",this.stats.dom.style.left="8px",this.stats.dom.style.top="8px",this.stats.dom.style.zIndex="10",this.container.appendChild(this.stats.dom)}catch{this.stats=void 0}}initScene(){this.scene=new P1,this.scene.background=new jt(857382),this.scene.fog=new Iu(857382,1400,3200);const t=this.container.clientWidth,e=this.container.clientHeight;this.camera=new Mn(55,t/e,.5,8e3),this.camera.position.set(620,480,720),this.controls=new X1(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.maxPolarAngle=Math.PI/2-.02,this.controls.minDistance=30,this.controls.maxDistance=2600,this.controls.target.set(0,60,0);const i=new N1(12376319,3359018,.9);this.scene.add(i);const s=new z1(16773848,1.6);s.position.set(500,800,300),s.castShadow=!0,s.shadow.mapSize.set(2048,2048);const r=700;s.shadow.camera.left=-r,s.shadow.camera.right=r,s.shadow.camera.top=r,s.shadow.camera.bottom=-r,s.shadow.camera.far=2400,this.scene.add(s);const o=new V1(1e3,40,3824256,2109514);o.material.transparent=!0,o.material.opacity=.35,this.scene.add(o);const a=new H1(60);a.position.set(-500,2,-500),this.scene.add(a)}getEnvironment(){return this.env||(this.env=new hu(this.sceneStore.terrain,this.sceneStore.threats,this.sceneStore.noflyZones,this.sceneStore.obstacles)),this.env}rebuildTerrain(){this.terrainView&&(this.scene.remove(this.terrainView.mesh),this.terrainView.mesh.geometry.dispose(),this.terrainView.mesh.material.dispose()),this.terrain=yp(this.sceneStore.terrain),this.env=null,this.terrainView=uE(this.terrain),this.scene.add(this.terrainView.mesh),this.applyHeatmap(),this.syncZones()}syncZones(){this.disposeGroup(this.zoneGroup);for(const t of this.sceneStore.threats)this.zoneGroup.add(tf(t));for(const t of this.sceneStore.noflyZones)this.zoneGroup.add(ef(t));if(this.terrain)for(const t of this.sceneStore.obstacles)this.zoneGroup.add(nf(t,this.terrain));this.applyHeatmap()}refreshEntity(t){const e=this.zoneGroup.children.findIndex(o=>o.userData.entityId===t);if(e>=0){const o=this.zoneGroup.children[e];this.zoneGroup.remove(o),this.disposeObject(o)}const i=this.sceneStore.threats.find(o=>o.id===t);i&&this.zoneGroup.add(tf(i));const s=this.sceneStore.noflyZones.find(o=>o.id===t);s&&this.zoneGroup.add(ef(s));const r=this.sceneStore.obstacles.find(o=>o.id===t);r&&this.terrain&&this.zoneGroup.add(nf(r,this.terrain)),this.applyHeatmap()}syncDynamics(){this.dynamicsDirty=!0;const t=new Set(this.sceneStore.dynamics.map(e=>e.id));for(const[e,i]of this.dynamicMeshes)t||(this.dynamicGroup.remove(i.group),this.disposeObject(i.group),this.dynamicMeshes.delete(e));for(const e of this.sceneStore.dynamics){let i=this.dynamicMeshes.get(e.id);if(i||(i=mE(e),i.group.userData.entityType="dynamic",this.dynamicGroup.add(i.group),this.dynamicMeshes.set(e.id,i)),this.simStore.showPrediction){const s=this.simStore.smoothPath,r=f0(e,Math.max(this.simStore.simTime,0),.5,s);i.setPrediction(r)}else i.setPrediction([])}}updateDynamics(t){for(const e of this.sceneStore.dynamics){const i=this.dynamicMeshes.get(e.id);if(!i)continue;const s=this.simStore.dronePosition,r=e.enabled?du(e,t,s):null;i.updateState(r)}}refreshDynamic(t){const e=this.dynamicMeshes.get(t);e&&(this.dynamicGroup.remove(e.group),this.disposeObject(e.group),this.dynamicMeshes.delete(t)),this.syncDynamics()}syncWaypoints(){this.disposeGroup(this.waypointGroup);const t={start:"起点",end:"终点",via:"途经点"},e=new Map;for(const i of this.sceneStore.waypoints){const s=i.uavId??"uav-1",r=this.sceneStore.uavs.find(c=>c.id===s),o=(r==null?void 0:r.color)??15844367;let a;if(i.role==="via"){const c=(e.get(s)??0)+1;e.set(s,c),a=`${(r==null?void 0:r.name)??""}途经${c}`}else a=`${(r==null?void 0:r.name)??""}${t[i.role]}`;const l=hE(i.id,i.role,a,o);l.position.set(i.position.x,i.position.y,i.position.z),this.waypointGroup.add(l)}}findWaypointObject(t){return this.waypointGroup.children.find(e=>e.userData.entityId===t)}syncDrones(){const t=new Set(this.sceneStore.uavs.map(e=>e.id));for(const[e,i]of this.drones)t.has(e)||(this.scene.remove(i.model.group),this.disposeObject(i.model.group),this.pathRoot.remove(i.pathGroup),this.disposeObject(i.pathGroup),this.drones.delete(e));for(const e of this.sceneStore.uavs)if(!this.drones.has(e.id)){const i=dE(e.color);this.scene.add(i.group);const s=new je;this.pathRoot.add(s),this.drones.set(e.id,{uav:e,model:i,pathGroup:s,rawLine:null,smoothLine:null,trackLine:null,violationMarks:[]})}}syncPaths(){this.syncDrones();const t=this.simStore;for(const[e,i]of this.drones){const s=t.uavStates[e];if(this.clearPathLines(i),s&&s.rawPath.length>=2&&(i.rawLine=wr(s.rawPath,{color:9413567,opacity:.4}),i.pathGroup.add(i.rawLine)),s&&s.smoothPath.length>=2){const r=this.pathVertexColors(s.smoothPath);i.smoothLine=wr(s.smoothPath,{vertexColors:r,opacity:.98}),i.pathGroup.add(i.smoothLine)}if(t.trackingEnabled&&s&&s.trackingStates.length>1){const r=s.trackingStates.map(o=>o.position);i.trackLine=gE(r,16732771),i.trackLine.material.opacity=.85,i.pathGroup.add(i.trackLine)}this.updateViolationMarks(e,i)}}clearPathLines(t){for(const e of[t.rawLine,t.smoothLine,t.trackLine])e&&(t.pathGroup.remove(e),e.geometry.dispose(),e.material.dispose());t.rawLine=null,t.smoothLine=null,t.trackLine=null;for(const e of t.violationMarks)t.pathGroup.remove(e),this.disposeObject(e);t.violationMarks=[]}updateViolationMarks(t,e){var o,a;const i=(a=(o=this.simStore.uavStates[t])==null?void 0:o.result)==null?void 0:a.constraintReport;if(!i)return;const s=new Qs(5,10,8),r=new _n({color:16726832});for(const l of i.violations){if(l.type!=="collision"&&l.type!=="turn"&&l.type!=="climb")continue;const c=new de(s,r);c.position.set(l.point.x,l.point.y,l.point.z),e.pathGroup.add(c),e.violationMarks.push(c)}}pathVertexColors(t){const e=this.getEnvironment(),i=new Float32Array(t.length*3),s=new jt;for(let r=0;r<t.length;r++){if(this.simStore.safetyColorMode){const o=G0(e,t[r],this.sceneStore.planParams.clearance);s.setHSL(o*.33,.9,.55)}else{const o=Math.min(1,e.threatIntensity(t[r])*.9);s.setHSL(.33-o*.33,.9,.55)}i[r*3]=s.r,i[r*3+1]=s.g,i[r*3+2]=s.b}return i}applyHeatmap(){if(!this.terrainView)return;const t=this.getEnvironment();this.terrainView.applyOverlay((e,i)=>t.threatIntensity({x:e,y:1,z:i}),(e,i)=>t.noflyPenalty({x:e,y:1,z:i}),this.simStore.showThreatHeatmap)}ensureDrone(){this.syncDrones();for(const[t,e]of this.drones){const i=this.simStore.uavStates[t];if(i&&i.trajectory.length>0){const s=this.simStore.trackedSample(t,0);s&&e.model.group.position.set(s.position.x,s.position.y,s.position.z)}else{const s=this.sceneStore.waypoints.find(r=>(r.uavId??"uav-1")===t&&r.role==="start");s&&e.model.group.position.set(s.position.x,s.position.y,s.position.z)}}}bindEvents(){const t=this.renderer.domElement;t.addEventListener("pointerdown",this.onPointerDown),t.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),t.addEventListener("contextmenu",this.onContextMenu)}updatePointer(t){const e=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(t.clientX-e.left)/e.width*2-1,this.pointer.y=-((t.clientY-e.top)/e.height)*2+1}pickEntity(){this.raycaster.setFromCamera(this.pointer,this.camera);const t=[...this.zoneGroup.children,...this.dynamicGroup.children,...this.waypointGroup.children],e=this.raycaster.intersectObjects(t,!0);for(const i of e){let s=i.object;for(;s;){if(s.userData.entityId)return s;s=s.parent}}return null}pickTerrain(){if(!this.terrainView)return null;this.raycaster.setFromCamera(this.pointer,this.camera);const t=this.raycaster.intersectObject(this.terrainView.mesh,!1);return t.length>0?t[0].point.clone():null}rayToPlane(t){this.updatePointer(t),this.raycaster.setFromCamera(this.pointer,this.camera);const e=new z;return this.raycaster.ray.intersectPlane(this.dragPlane,e)?e:null}applyDragPosition(t){if(!this.drag)return;const{id:e,type:i}=this.drag,s=this.sceneStore.terrain.size/2-10;t.x=Ko.clamp(t.x,-s,s),t.z=Ko.clamp(t.z,-s,s);const r=this.getEnvironment();if(i==="waypoint"){const o=this.sceneStore.waypoints.find(l=>l.id===e);if(!o)return;const a=r.groundHeight(t.x,t.z)+this.sceneStore.planParams.clearance;t.y=Math.max(o.position.y,a),o.position={x:t.x,y:t.y,z:t.z}}else if(i==="threat"){const o=this.sceneStore.threats.find(a=>a.id===e);if(!o)return;o.position={x:t.x,y:0,z:t.z},this.refreshEntity(e)}else if(i==="nofly"){const o=this.sceneStore.noflyZones.find(a=>a.id===e);if(!o)return;o.position={x:t.x,y:0,z:t.z},this.refreshEntity(e)}else if(i==="obstacle"){const o=this.sceneStore.obstacles.find(a=>a.id===e);if(!o)return;o.position={x:t.x,y:0,z:t.z},this.refreshEntity(e)}else if(i==="dynamic"){const o=this.sceneStore.dynamics.find(c=>c.id===e);if(!o)return;const a=t.x-o.position.x,l=t.z-o.position.z;o.position={x:t.x,y:0,z:t.z},o.patrolPoints=o.patrolPoints.map(c=>({x:c.x+a,y:0,z:c.z+l})),this.syncDynamics()}this.simStore.markDirty()}setCameraMode(t){if(this.controls.enabled=t!=="follow",this.camera.up.set(0,1,0),t==="top"){const e=this.sceneStore.terrain.size*.9;this.camera.position.set(.01,e,.01),this.controls.target.set(0,0,0)}else t==="orbit"&&(this.camera.position.set(620,480,720),this.controls.target.set(0,60,0));this.controls.update()}focusSelected(){const t=this.sceneStore.selectedId;if(!t)return;const e=this.zoneGroup.children.find(s=>s.userData.entityId===t)??this.dynamicGroup.children.find(s=>s.userData.entityId===t)??this.waypointGroup.children.find(s=>s.userData.entityId===t);if(!e)return;const i=new z;e.getWorldPosition(i),this.controls.target.copy(i),this.camera.position.set(i.x+180,i.y+160,i.z+180),this.controls.update()}updateDrones(t,e){const i=this.simStore;for(const[s,r]of this.drones){const o=r.model.group,a=i.trackedSample(s,e);a&&(o.position.set(a.position.x,a.position.y,a.position.z),Math.hypot(a.velocity.x,a.velocity.z)>.5&&(o.rotation.y=a.heading,o.rotation.x=Ko.clamp(-Math.atan2(a.velocity.y,Math.hypot(a.velocity.x,a.velocity.z))*.5,-.4,.4)),s===this.sceneStore.activeUavId&&i.setDroneTransform(a.position,a.heading));const l=i.playing?1+t*28:t*6;for(const c of r.model.rotors)c.rotation.y+=l}}updateReplanOverlay(){this.disposeGroup(this.replanGroup);const t=this.simStore.lastReplanEvent;if(!t||this.simStore.simTime-t.time>6)return;const e=new de(new Qs(7,12,10),new _n({color:3066993}));e.position.set(t.replanFrom.x,t.replanFrom.y+4,t.replanFrom.z),this.replanGroup.add(e);const i=new de(new Qs(7,12,10),new _n({color:15158332}));i.position.set(t.replanGoal.x,t.replanGoal.y+4,t.replanGoal.z),this.replanGroup.add(i),t.oldLocalPath.length>=2&&this.replanGroup.add(wr(t.oldLocalPath,{color:16732771,opacity:.5})),t.newLocalPath.length>=2&&this.replanGroup.add(wr(t.newLocalPath,{color:3066993,opacity:.95}));for(const r of t.candidates){if(!r.success||r.path.length<2||r.label.includes("采用"))continue;const o=wr(r.path,{color:16765286,opacity:.55});o.material.opacity=.5,this.replanGroup.add(o)}const s=new de(new ti(3,3,120,8,1,!0),new _n({color:16726832,transparent:!0,opacity:.4,depthWrite:!1}));s.position.set(t.position.x,t.position.y+40,t.position.z),this.replanGroup.add(s),this.replanSpriteUntil=t.time+4}updateReplanSprite(t,e){const i=this.simStore.lastReplanEvent;if(!i||e>this.replanSpriteUntil){this.replanSprite&&(this.scene.remove(this.replanSprite),this.disposeObject(this.replanSprite),this.replanSprite=null);return}this.replanSprite||(this.replanSprite=ku(`⚠ 重规划：${i.reasonLabel}`,"#ff6b6b"),this.scene.add(this.replanSprite)),this.replanSprite.position.set(i.position.x,i.position.y+38,i.position.z)}updateSelectRing(){const t=this.sceneStore.selectedId;if(!t){this.selectRing.visible=!1;return}let e=null;const i=this.sceneStore.waypoints.find(s=>s.id===t);if(i)e=new z(i.position.x,i.position.y,i.position.z);else{const s=this.zoneGroup.children.find(r=>r.userData.entityId===t)??this.dynamicGroup.children.find(r=>r.userData.entityId===t);if(s){e=new z,s.getWorldPosition(e);const r=this.sceneStore.threats.find(c=>c.id===t),o=this.sceneStore.noflyZones.find(c=>c.id===t),a=this.sceneStore.dynamics.find(c=>c.id===t),l=(r==null?void 0:r.radius)??(o==null?void 0:o.radius)??(a==null?void 0:a.radius)??14;this.selectRing.scale.setScalar(l/14)}}e&&(this.selectRing.visible=!0,i&&this.selectRing.scale.setScalar(1),this.selectRing.position.copy(e),this.selectRing.position.y+=.3)}updateFollowCamera(){const t=this.drones.get(this.sceneStore.activeUavId);if(!t)return;const e=t.model.group.position,i=t.model.group.rotation.y,s=70,r=35,o=new z(-Math.sin(i)*s,r,-Math.cos(i)*s);this.camera.position.lerp(e.clone().add(o),.12),this.controls.target.lerp(e,.15)}onResize(){const t=this.container.clientWidth,e=this.container.clientHeight;t===0||e===0||(this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e))}disposeGroup(t){for(;t.children.length>0;){const e=t.children.pop();this.disposeObject(e)}}disposeObject(t){t.traverse(e=>{const i=e;i.geometry&&i.geometry.dispose();const s=i.material;Array.isArray(s)?s.forEach(r=>r.dispose()):s&&s.dispose()})}dispose(){var e,i;this.disposed=!0,cancelAnimationFrame(this.raf),this.resizeObserver.disconnect();const t=this.renderer.domElement;t.removeEventListener("pointerdown",this.onPointerDown),t.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),t.removeEventListener("contextmenu",this.onContextMenu),this.controls.dispose(),this.renderer.dispose(),t.remove(),(i=(e=this.stats)==null?void 0:e.dom)==null||i.remove()}}const vE={class:"hint"},xE={class:"status-chip"},yE={key:0,style:{color:"var(--warn)"}},ME={key:1,style:{color:"var(--danger)"}},SE={key:0,class:"replan-toast"},bE={class:"rt-title"},EE=ei({__name:"Viewport",setup(n){const t=ue(),e=vs(),i=zi(null);let s=null;Ia(()=>{s=new _E(i.value,t,e),Ve(()=>JSON.stringify([t.threats,t.noflyZones,t.obstacles]),()=>s==null?void 0:s.syncZones()),Ve(()=>t.dynamics.map(a=>a.id).join(","),()=>s==null?void 0:s.syncDynamics()),Ve(()=>JSON.stringify(t.dynamics),()=>s==null?void 0:s.syncDynamics(),{deep:!1}),Ve(()=>t.waypoints.map(a=>a.id).join(","),()=>s==null?void 0:s.syncWaypoints()),Ve(()=>t.uavs.map(a=>a.id).join(","),()=>{s==null||s.syncDrones(),s==null||s.syncPaths()}),Ve(()=>t.terrainVersion,()=>s==null?void 0:s.rebuildTerrain()),Ve(()=>t.waypoints.map(a=>[a.position.x,a.position.y,a.position.z].join(",")).join("|"),()=>{for(const a of t.waypoints){const l=s==null?void 0:s.findWaypointObject(a.id);l==null||l.position.set(a.position.x,a.position.y,a.position.z)}}),Ve(()=>[...Object.values(e.uavStates).map(a=>a.smoothPath.length),e.trackingEnabled,e.safetyColorMode,t.activeUavId].join("|"),()=>s==null?void 0:s.syncPaths()),Ve(()=>e.showThreatHeatmap,()=>s==null?void 0:s.applyHeatmap()),Ve(()=>e.cameraMode,a=>s==null?void 0:s.setCameraMode(a)),Ve(()=>e.showPrediction,()=>s==null?void 0:s.syncDynamics());const o=a=>{var l;a.key==="Escape"&&t.setEditMode("select"),(a.key==="Delete"||a.key==="Backspace")&&((l=document.activeElement)==null?void 0:l.tagName)!=="INPUT"&&t.removeSelected(),a.key===" "&&(a.preventDefault(),e.togglePlay())};window.addEventListener("keydown",o),ql(()=>window.removeEventListener("keydown",o))}),ql(()=>{s==null||s.dispose(),s=null});const r=()=>{var o;switch(t.editMode){case"add-threat":return"点击地形放置雷达威胁区（放置后在右侧面板修改类型与参数）";case"add-nofly":return"点击地形放置禁飞区";case"add-obstacle":return"点击地形放置建筑障碍";case"add-dynamic":return"点击地形放置移动障碍（默认巡逻运动，可在面板改为突发威胁/拦截）";case"add-waypoint":return`点击地形添加 ${((o=t.activeUav)==null?void 0:o.name)??""} 的途经航点（自动设置安全高度）`;default:return"左键旋转 · 右键平移 · 滚轮缩放 · 拖拽要素编辑 · Delete 删除选中"}};return(o,a)=>{var l;return Tt(),Rt("div",{ref_key:"containerRef",ref:i,class:"viewport"},[P("div",vE,ft(r()),1),P("div",xE,[P("span",{class:Oe(["dot",{green:L(e).status==="done"&&((l=L(e).stats)==null?void 0:l.success),red:L(e).status==="failed",yellow:L(e).status==="planning",gray:L(e).status==="idle"}])},null,2),P("span",null,ft(L(e).message),1),L(e).dirty&&L(e).status!=="planning"?(Tt(),Rt("span",yE," ●参数已变更 ")):ge("",!0),L(e).replanEvents.length?(Tt(),Rt("span",ME," ⚠ 在线重规划 ×"+ft(L(e).replanEvents.reduce((c,d)=>c+1,0)),1)):ge("",!0)]),L(e).lastReplanEvent?(Tt(),Rt("div",SE,[P("div",bE,"⚠ 在线重规划（"+ft(L(e).lastReplanEvent.time.toFixed(1))+"s）",1),P("div",null,ft(L(e).lastReplanEvent.reasonLabel),1),P("div",null,[De(" 代价 "+ft(L(e).lastReplanEvent.costBefore.toFixed(0))+" → ",1),P("b",{style:En({color:L(e).lastReplanEvent.costAfter<L(e).lastReplanEvent.costBefore?"var(--ok)":"var(--warn)"})},ft(L(e).lastReplanEvent.costAfter.toFixed(0)),5),De(" · "+ft(L(e).lastReplanEvent.planTimeMs.toFixed(0))+" ms ",1)])])):ge("",!0),a[0]||(a[0]=lp('<div class="legend" data-v-7b3fa1c7><div data-v-7b3fa1c7><i style="background:#22a7ff;" data-v-7b3fa1c7></i>雷达区</div><div data-v-7b3fa1c7><i style="background:#ff3b30;" data-v-7b3fa1c7></i>防空区</div><div data-v-7b3fa1c7><i style="background:#b046ff;" data-v-7b3fa1c7></i>干扰区</div><div data-v-7b3fa1c7><i style="background:#ff2d55;" data-v-7b3fa1c7></i>禁飞区</div><div data-v-7b3fa1c7><i style="background:#ff8c1a;" data-v-7b3fa1c7></i>移动障碍（黄虚线为预测）</div><div data-v-7b3fa1c7><i style="background:#2ecc71;" data-v-7b3fa1c7></i>起点 / <i style="background:#e74c3c;" data-v-7b3fa1c7></i>终点 / <i style="background:#f1c40f;" data-v-7b3fa1c7></i>途经</div></div>',1))],512)}}}),TE=Wi(EE,[["__scopeId","data-v-7b3fa1c7"]]),wE={class:"field"},AE=["min","max","step","value"],RE={class:"val"},_t=ei({__name:"NumberSlider",props:{label:{},modelValue:{},min:{},max:{},step:{default:1},unit:{default:""},decimals:{default:0}},emits:["update:modelValue"],setup(n,{emit:t}){const e=n,i=t,s=qe(()=>{const r=Number(e.modelValue);return e.decimals>0?r.toFixed(e.decimals):String(Math.round(r))});return(r,o)=>(Tt(),Rt("div",wE,[P("label",null,ft(n.label),1),P("input",{type:"range",min:n.min,max:n.max,step:n.step,value:n.modelValue,onInput:o[0]||(o[0]=a=>i("update:modelValue",Number(a.target.value)))},null,40,AE),P("span",RE,ft(s.value)+ft(n.unit),1)]))}}),CE={class:"section"},PE={class:"section-title"},IE=["onClick"],DE={class:"name"},LE=["onClick"],UE={class:"section"},NE={class:"section-title"},OE=["onClick"],FE={class:"name"},zE=["onClick"],BE={class:"section"},kE={class:"section-title"},VE=["onClick"],HE={class:"name"},GE=["onClick"],WE=["onClick"],XE={class:"section"},$E={class:"section-title"},jE=["onClick"],YE={class:"name"},qE=["onClick"],KE={class:"section"},ZE={class:"section-title"},JE=["onClick"],QE={class:"name"},tT=["onClick"],eT={class:"section"},nT={class:"section-title"},iT=["onClick"],sT={class:"name"},rT=["onClick"],oT={key:0,class:"section editor"},aT={class:"field",style:{"grid-template-columns":"88px 1fr"}},lT=["value"],cT={key:1,class:"section editor"},uT={class:"field",style:{"grid-template-columns":"88px 1fr"}},hT=["value"],dT={class:"field",style:{"grid-template-columns":"88px 1fr"}},fT=["value"],pT={key:0,class:"field",style:{"grid-template-columns":"88px 1fr"}},mT=["value"],gT={class:"sub-tip"},_T={class:"field",style:{"grid-template-columns":"88px 1fr"}},vT={class:"checkbox"},xT={class:"checkbox"},yT={key:2,class:"section editor"},MT={class:"field",style:{"grid-template-columns":"88px 1fr"}},ST={class:"checkbox"},bT={key:3,class:"section editor"},ET={key:4,class:"section editor"},TT={class:"section-title"},wT={key:5,class:"empty-tip"},AT=ei({__name:"EditPanel",setup(n){const t=ue(),e=qe(()=>t.threats.find(g=>g.id===t.selectedId)),i=qe(()=>t.noflyZones.find(g=>g.id===t.selectedId)),s=qe(()=>t.obstacles.find(g=>g.id===t.selectedId)),r=qe(()=>t.waypoints.find(g=>g.id===t.selectedId)),o=qe(()=>t.dynamics.find(g=>g.id===t.selectedId)),a=[{value:"radar",label:"雷达"},{value:"sam",label:"防空"},{value:"jammer",label:"干扰"}],l=[{value:"moving-obstacle",label:"移动障碍（硬碰撞）"},{value:"dynamic-threat",label:"动态威胁区"},{value:"sudden-threat",label:"突发威胁"}],c=[{value:"patrol",label:"巡逻（往返）"},{value:"linear",label:"直线匀速"},{value:"intercept",label:"拦截参考航迹"},{value:"burst",label:"突发（定时出现）"}],d={start:"起点",end:"终点",via:"途经点"},u=t.terrain.size/2-10;function h(g){var _;return((_=t.uavs.find(m=>m.id===(g??"uav-1")))==null?void 0:_.name)??"uav-1"}return(g,_)=>(Tt(),Rt("div",null,[P("div",CE,[P("div",PE,"无人机任务（"+ft(L(t).uavs.length)+" 架）",1),(Tt(!0),Rt(ne,null,Ne(L(t).uavs,m=>(Tt(),Rt("div",{key:m.id,class:Oe(["list-item",{selected:L(t).activeUavId===m.id}]),onClick:f=>L(t).setActiveUav(m.id)},[P("span",{class:"swatch",style:En({background:`#${m.color.toString(16).padStart(6,"0")}`})},null,4),P("span",DE,ft(m.name)+" · "+ft(L(t).waypoints.filter(f=>(f.uavId??"uav-1")===m.id).length)+" 航点 ",1),L(t).uavs.length>1?(Tt(),Rt("button",{key:0,class:"icon-btn danger",onClick:qi(f=>L(t).removeUav(m.id),["stop"]),title:"删除该无人机及其航点"},"×",8,LE)):ge("",!0)],10,IE))),128)),P("button",{style:{width:"100%","margin-top":"4px"},onClick:_[0]||(_[0]=m=>L(t).addUav())},"＋ 添加无人机")]),P("div",UE,[P("div",NE,"威胁区（"+ft(L(t).threats.length)+"）",1),(Tt(!0),Rt(ne,null,Ne(L(t).threats,m=>(Tt(),Rt("div",{key:m.id,class:Oe(["list-item",{selected:L(t).selectedId===m.id}]),onClick:f=>L(t).select(m.id)},[P("span",{class:"swatch",style:En({background:`#${L(va)[m.kind].toString(16).padStart(6,"0")}`})},null,4),P("span",FE,ft(m.name)+" · L"+ft(m.level),1),P("button",{class:"icon-btn danger",onClick:qi(f=>L(t).removeThreat(m.id),["stop"])},"×",8,zE)],10,OE))),128))]),P("div",BE,[P("div",kE,"动态实体（"+ft(L(t).dynamics.length)+"）",1),(Tt(!0),Rt(ne,null,Ne(L(t).dynamics,m=>(Tt(),Rt("div",{key:m.id,class:Oe(["list-item",{selected:L(t).selectedId===m.id}]),onClick:f=>L(t).select(m.id)},[P("span",{class:"swatch",style:En({background:m.kind==="moving-obstacle"?"#ff8c1a":`#${L(va)[m.threatKind].toString(16).padStart(6,"0")}`})},null,4),P("span",HE,ft(m.name)+ft(m.enabled?"":"（停用）"),1),P("button",{class:"icon-btn",onClick:qi(f=>L(t).updateDynamic(m.id,{enabled:!m.enabled}),["stop"])},ft(m.enabled?"⏸":"▶"),9,GE),P("button",{class:"icon-btn danger",onClick:qi(f=>L(t).removeDynamic(m.id),["stop"])},"×",8,WE)],10,VE))),128))]),P("div",XE,[P("div",$E,"禁飞区（"+ft(L(t).noflyZones.length)+"）",1),(Tt(!0),Rt(ne,null,Ne(L(t).noflyZones,m=>(Tt(),Rt("div",{key:m.id,class:Oe(["list-item",{selected:L(t).selectedId===m.id}]),onClick:f=>L(t).select(m.id)},[_[47]||(_[47]=P("span",{class:"swatch",style:{background:"#ff2d55"}},null,-1)),P("span",YE,ft(m.name)+ft(m.hardBlock?"":"（软）"),1),P("button",{class:"icon-btn danger",onClick:qi(f=>L(t).removeNoFly(m.id),["stop"])},"×",8,qE)],10,jE))),128))]),P("div",KE,[P("div",ZE,"建筑障碍（"+ft(L(t).obstacles.length)+"）",1),(Tt(!0),Rt(ne,null,Ne(L(t).obstacles,m=>(Tt(),Rt("div",{key:m.id,class:Oe(["list-item",{selected:L(t).selectedId===m.id}]),onClick:f=>L(t).select(m.id)},[_[48]||(_[48]=P("span",{class:"swatch",style:{background:"#9aa3ad"}},null,-1)),P("span",QE,ft(m.name),1),P("button",{class:"icon-btn danger",onClick:qi(f=>L(t).removeObstacle(m.id),["stop"])},"×",8,tT)],10,JE))),128))]),P("div",eT,[P("div",nT,"任务航点（"+ft(L(t).waypoints.length)+"）",1),(Tt(!0),Rt(ne,null,Ne(L(t).waypoints,(m,f)=>{var p;return Tt(),Rt("div",{key:m.id,class:Oe(["list-item",{selected:L(t).selectedId===m.id}]),onClick:S=>L(t).select(m.id)},[P("span",{class:"swatch",style:En({background:m.role==="start"?"#2ecc71":m.role==="end"?"#e74c3c":`#${(((p=L(t).uavs.find(S=>S.id===(m.uavId??"uav-1")))==null?void 0:p.color)??15844367).toString(16).padStart(6,"0")}`})},null,4),P("span",sT," ["+ft(h(m.uavId))+"] "+ft(m.role==="via"?`途经 ${f}`:d[m.role])+" · "+ft(m.position.y.toFixed(0))+"m ",1),m.role==="via"?(Tt(),Rt("button",{key:0,class:"icon-btn danger",onClick:qi(S=>L(t).removeWaypoint(m.id),["stop"])}," × ",8,rT)):ge("",!0)],10,iT)}),128))]),e.value?(Tt(),Rt("div",oT,[_[50]||(_[50]=P("div",{class:"section-title"},"编辑威胁区",-1)),_e(P("input",{type:"text","onUpdate:modelValue":_[1]||(_[1]=m=>e.value.name=m),style:{"margin-bottom":"8px"}},null,512),[[Cr,e.value.name]]),P("div",aT,[_[49]||(_[49]=P("label",null,"类型",-1)),_e(P("select",{"onUpdate:modelValue":_[2]||(_[2]=m=>e.value.kind=m)},[(Tt(),Rt(ne,null,Ne(a,m=>P("option",{key:m.value,value:m.value},ft(m.label),9,lT)),64))],512),[[ho,e.value.kind]])]),ut(_t,{label:"威胁等级",modelValue:e.value.level,"onUpdate:modelValue":_[3]||(_[3]=m=>e.value.level=m),min:1,max:5},null,8,["modelValue"]),ut(_t,{label:"作用半径",modelValue:e.value.radius,"onUpdate:modelValue":_[4]||(_[4]=m=>e.value.radius=m),min:20,max:250,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最低高度",modelValue:e.value.heightMin,"onUpdate:modelValue":_[5]||(_[5]=m=>e.value.heightMin=m),min:0,max:400,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最高高度",modelValue:e.value.heightMax,"onUpdate:modelValue":_[6]||(_[6]=m=>e.value.heightMax=m),min:10,max:500,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"透明度",modelValue:e.value.opacity,"onUpdate:modelValue":_[7]||(_[7]=m=>e.value.opacity=m),min:.05,max:.6,step:.01,decimals:2},null,8,["modelValue"]),ut(_t,{label:"X 位置",modelValue:e.value.position.x,"onUpdate:modelValue":_[8]||(_[8]=m=>e.value.position.x=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"]),ut(_t,{label:"Z 位置",modelValue:e.value.position.z,"onUpdate:modelValue":_[9]||(_[9]=m=>e.value.position.z=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"])])):ge("",!0),o.value?(Tt(),Rt("div",cT,[_[57]||(_[57]=P("div",{class:"section-title"},"编辑动态实体",-1)),_e(P("input",{type:"text","onUpdate:modelValue":_[10]||(_[10]=m=>o.value.name=m),style:{"margin-bottom":"8px"}},null,512),[[Cr,o.value.name]]),P("div",uT,[_[51]||(_[51]=P("label",null,"实体类型",-1)),_e(P("select",{"onUpdate:modelValue":_[11]||(_[11]=m=>o.value.kind=m)},[(Tt(),Rt(ne,null,Ne(l,m=>P("option",{key:m.value,value:m.value},ft(m.label),9,hT)),64))],512),[[ho,o.value.kind]])]),P("div",dT,[_[52]||(_[52]=P("label",null,"运动模型",-1)),_e(P("select",{"onUpdate:modelValue":_[12]||(_[12]=m=>o.value.motion=m)},[(Tt(),Rt(ne,null,Ne(c,m=>P("option",{key:m.value,value:m.value},ft(m.label),9,fT)),64))],512),[[ho,o.value.motion]])]),o.value.kind!=="moving-obstacle"?(Tt(),Rt("div",pT,[_[53]||(_[53]=P("label",null,"威胁类型",-1)),_e(P("select",{"onUpdate:modelValue":_[13]||(_[13]=m=>o.value.threatKind=m)},[(Tt(),Rt(ne,null,Ne(a,m=>P("option",{key:m.value,value:m.value},ft(m.label),9,mT)),64))],512),[[ho,o.value.threatKind]])])):ge("",!0),ut(_t,{label:"作用半径",modelValue:o.value.radius,"onUpdate:modelValue":_[14]||(_[14]=m=>o.value.radius=m),min:10,max:200,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最低高度",modelValue:o.value.heightMin,"onUpdate:modelValue":_[15]||(_[15]=m=>o.value.heightMin=m),min:0,max:400,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最高高度",modelValue:o.value.heightMax,"onUpdate:modelValue":_[16]||(_[16]=m=>o.value.heightMax=m),min:10,max:400,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"威胁等级",modelValue:o.value.level,"onUpdate:modelValue":_[17]||(_[17]=m=>o.value.level=m),min:1,max:5},null,8,["modelValue"]),o.value.motion==="patrol"?(Tt(),Rt(ne,{key:1},[ut(_t,{label:"巡逻速度",modelValue:o.value.patrolSpeed,"onUpdate:modelValue":_[18]||(_[18]=m=>o.value.patrolSpeed=m),min:2,max:60,unit:"m/s"},null,8,["modelValue"]),P("div",gT,"巡逻点 "+ft(o.value.patrolPoints.length)+" 个（拖动实体整体平移）",1)],64)):ge("",!0),o.value.motion==="linear"||o.value.motion==="intercept"?(Tt(),Rt(ne,{key:2},[ut(_t,{label:"X 速度",modelValue:o.value.velocity.x,"onUpdate:modelValue":_[19]||(_[19]=m=>o.value.velocity.x=m),min:-40,max:40,step:1,unit:"m/s"},null,8,["modelValue"]),ut(_t,{label:"Z 速度",modelValue:o.value.velocity.z,"onUpdate:modelValue":_[20]||(_[20]=m=>o.value.velocity.z=m),min:-40,max:40,step:1,unit:"m/s"},null,8,["modelValue"])],64)):ge("",!0),o.value.motion==="burst"?(Tt(),Rt(ne,{key:3},[ut(_t,{label:"出现时刻",modelValue:o.value.triggerTime,"onUpdate:modelValue":_[21]||(_[21]=m=>o.value.triggerTime=m),min:0,max:60,step:1,unit:"s"},null,8,["modelValue"]),ut(_t,{label:"生长时间",modelValue:o.value.growDuration,"onUpdate:modelValue":_[22]||(_[22]=m=>o.value.growDuration=m),min:.5,max:10,step:.5,decimals:1,unit:"s"},null,8,["modelValue"]),P("div",_T,[_[55]||(_[55]=P("label",null,"持续模式",-1)),P("label",vT,[_e(P("input",{type:"checkbox","onUpdate:modelValue":_[23]||(_[23]=m=>o.value.persistent=m)},null,512),[[en,o.value.persistent]]),_[54]||(_[54]=De("出现后持续存在（否则周期开关）",-1))])]),o.value.persistent?ge("",!0):(Tt(),ra(_t,{key:0,label:"周期",modelValue:o.value.period,"onUpdate:modelValue":_[24]||(_[24]=m=>o.value.period=m),min:8,max:60,step:2,unit:"s"},null,8,["modelValue"]))],64)):ge("",!0),ut(_t,{label:"预测时长",modelValue:o.value.predictHorizon,"onUpdate:modelValue":_[25]||(_[25]=m=>o.value.predictHorizon=m),min:2,max:20,step:1,unit:"s"},null,8,["modelValue"]),ut(_t,{label:"X 位置",modelValue:o.value.position.x,"onUpdate:modelValue":_[26]||(_[26]=m=>o.value.position.x=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"]),ut(_t,{label:"Z 位置",modelValue:o.value.position.z,"onUpdate:modelValue":_[27]||(_[27]=m=>o.value.position.z=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"]),P("label",xT,[_e(P("input",{type:"checkbox","onUpdate:modelValue":_[28]||(_[28]=m=>o.value.enabled=m)},null,512),[[en,o.value.enabled]]),_[56]||(_[56]=De("启用（参与仿真与重规划触发）",-1))])])):ge("",!0),i.value?(Tt(),Rt("div",yT,[_[60]||(_[60]=P("div",{class:"section-title"},"编辑禁飞区",-1)),_e(P("input",{type:"text","onUpdate:modelValue":_[29]||(_[29]=m=>i.value.name=m),style:{"margin-bottom":"8px"}},null,512),[[Cr,i.value.name]]),ut(_t,{label:"作用半径",modelValue:i.value.radius,"onUpdate:modelValue":_[30]||(_[30]=m=>i.value.radius=m),min:20,max:250,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最低高度",modelValue:i.value.heightMin,"onUpdate:modelValue":_[31]||(_[31]=m=>i.value.heightMin=m),min:0,max:400,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最高高度",modelValue:i.value.heightMax,"onUpdate:modelValue":_[32]||(_[32]=m=>i.value.heightMax=m),min:10,max:500,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"惩罚权重",modelValue:i.value.penalty,"onUpdate:modelValue":_[33]||(_[33]=m=>i.value.penalty=m),min:0,max:50,step:.5,decimals:1},null,8,["modelValue"]),P("div",MT,[_[59]||(_[59]=P("label",null,"硬避障",-1)),P("label",ST,[_e(P("input",{type:"checkbox","onUpdate:modelValue":_[34]||(_[34]=m=>i.value.hardBlock=m)},null,512),[[en,i.value.hardBlock]]),_[58]||(_[58]=De(" 启用后体素不可通行；关闭则仅施加软惩罚 ",-1))])]),ut(_t,{label:"X 位置",modelValue:i.value.position.x,"onUpdate:modelValue":_[35]||(_[35]=m=>i.value.position.x=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"]),ut(_t,{label:"Z 位置",modelValue:i.value.position.z,"onUpdate:modelValue":_[36]||(_[36]=m=>i.value.position.z=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"])])):ge("",!0),s.value?(Tt(),Rt("div",bT,[_[61]||(_[61]=P("div",{class:"section-title"},"编辑建筑障碍",-1)),_e(P("input",{type:"text","onUpdate:modelValue":_[37]||(_[37]=m=>s.value.name=m),style:{"margin-bottom":"8px"}},null,512),[[Cr,s.value.name]]),ut(_t,{label:"宽度 X",modelValue:s.value.size.x,"onUpdate:modelValue":_[38]||(_[38]=m=>s.value.size.x=m),min:10,max:120,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"进深 Z",modelValue:s.value.size.z,"onUpdate:modelValue":_[39]||(_[39]=m=>s.value.size.z=m),min:10,max:120,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"高度",modelValue:s.value.height,"onUpdate:modelValue":_[40]||(_[40]=m=>s.value.height=m),min:10,max:200,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"X 位置",modelValue:s.value.position.x,"onUpdate:modelValue":_[41]||(_[41]=m=>s.value.position.x=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"]),ut(_t,{label:"Z 位置",modelValue:s.value.position.z,"onUpdate:modelValue":_[42]||(_[42]=m=>s.value.position.z=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"])])):ge("",!0),r.value?(Tt(),Rt("div",ET,[P("div",TT,"编辑"+ft(d[r.value.role])+"（"+ft(h(r.value.uavId))+"）",1),ut(_t,{label:"高度 Y",modelValue:r.value.position.y,"onUpdate:modelValue":_[43]||(_[43]=m=>r.value.position.y=m),min:0,max:450,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"飞行速度",modelValue:r.value.speed,"onUpdate:modelValue":_[44]||(_[44]=m=>r.value.speed=m),min:L(t).planParams.speedMin,max:L(t).planParams.speedMax,unit:"m/s"},null,8,["modelValue","min","max"]),ut(_t,{label:"X 位置",modelValue:r.value.position.x,"onUpdate:modelValue":_[45]||(_[45]=m=>r.value.position.x=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"]),ut(_t,{label:"Z 位置",modelValue:r.value.position.z,"onUpdate:modelValue":_[46]||(_[46]=m=>r.value.position.z=m),min:-u,max:u,unit:"m"},null,8,["modelValue","min"])])):ge("",!0),L(t).selectedId?ge("",!0):(Tt(),Rt("div",wT," 在 3D 视图中点选要素，或使用左侧工具在地形上点击添加。 动态对抗：添加移动障碍/突发威胁后，在「规划参数」中开启在线重规划并播放。 "))]))}}),RT=Wi(AT,[["__scopeId","data-v-ed6b41dc"]]),CT={class:"section"},PT={class:"algo-grid"},IT=["onClick"],DT={class:"field",style:{"grid-template-columns":"88px 1fr","margin-top":"8px"}},LT=["value"],UT={class:"checkbox",style:{"margin-top":"6px"}},NT={class:"section"},OT={class:"section-title"},FT={key:0,class:"section"},zT={key:1,class:"section"},BT={key:2,class:"section"},kT={key:3,class:"section"},VT={key:4,class:"section"},HT={class:"section"},GT={class:"checkbox",style:{"margin-bottom":"6px"}},WT={class:"section"},XT={class:"checkbox",style:{"margin-bottom":"6px"}},$T={class:"checkbox"},jT={class:"section"},YT={class:"section"},qT={class:"field-row",style:{"margin-top":"6px"}},KT={class:"checkbox"},ZT={class:"section"},JT={class:"checkbox"},QT={class:"checkbox"},tw={class:"checkbox"},ew={class:"checkbox"},nw={class:"checkbox"},iw={class:"section"},sw={class:"field",style:{"grid-template-columns":"88px 1fr"}},rw={class:"checkbox"},ow={class:"field-row"},aw=ei({__name:"PlanPanel",setup(n){const t=ue(),e=vs(),i=t.planParams,s=t.weights,r=i.dynamics,o=i.advanced,a=e.replanConfig,l=["astar","dijkstra","rrt","rrtstar","hybridastar","aco","pso","ga"];function c(d){i.algo=d}return(d,u)=>(Tt(),Rt("div",null,[P("div",CT,[u[69]||(u[69]=P("div",{class:"section-title"},"高级规划算法（可插拔）",-1)),P("div",PT,[(Tt(),Rt(ne,null,Ne(l,h=>P("button",{key:h,class:Oe({active:L(i).algo===h}),onClick:g=>c(h)},ft(L(fs)[h]),11,IT)),64))]),P("div",DT,[u[67]||(u[67]=P("label",null,"平滑方式",-1)),P("select",{value:L(e).smoothing,onChange:u[0]||(u[0]=h=>L(e).setSmoothing(h.target.value))},[...u[66]||(u[66]=[lp('<option value="none" data-v-680c42f1>不平滑（原始折线）</option><option value="polyline" data-v-680c42f1>折线松弛平滑</option><option value="bspline" data-v-680c42f1>三次 B 样条平滑</option><option value="bezier" data-v-680c42f1>三次贝塞尔平滑</option><option value="polynomial" data-v-680c42f1>Catmull-Rom 多项式</option><option value="dubins" data-v-680c42f1>Dubins 曲线</option><option value="clothoid" data-v-680c42f1>Clothoid 回旋曲线</option>',7)])],40,LT)]),P("label",UT,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[1]||(u[1]=h=>L(o).fallbackToAstar=h)},null,512),[[en,L(o).fallbackToAstar]]),u[68]||(u[68]=De(" 采样/群智算法失败时回退 A*（保证可达） ",-1))])]),P("div",NT,[P("div",OT," 搜索参数"+ft(L(Bh)(L(i).algo)?"（体素栅格）":"（高级算法采样口径）"),1),ut(_t,{label:"水平栅格",modelValue:L(i).cellSize,"onUpdate:modelValue":u[2]||(u[2]=h=>L(i).cellSize=h),min:10,max:60,step:5,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"高度栅格",modelValue:L(i).heightCell,"onUpdate:modelValue":u[3]||(u[3]=h=>L(i).heightCell=h),min:10,max:50,step:5,unit:"m"},null,8,["modelValue"]),L(Bh)(L(i).algo)?(Tt(),ra(_t,{key:0,label:"最大步长",modelValue:L(i).maxStep,"onUpdate:modelValue":u[4]||(u[4]=h=>L(i).maxStep=h),min:1,max:3},null,8,["modelValue"])):ge("",!0),ut(_t,{label:"启发权重",modelValue:L(i).heuristicWeight,"onUpdate:modelValue":u[5]||(u[5]=h=>L(i).heuristicWeight=h),min:.5,max:3,step:.1,decimals:1},null,8,["modelValue"]),ut(_t,{label:"扩展上限",modelValue:L(i).maxNodes,"onUpdate:modelValue":u[6]||(u[6]=h=>L(i).maxNodes=h),min:2e4,max:5e5,step:2e4},null,8,["modelValue"]),ut(_t,{label:"平滑迭代",modelValue:L(i).smoothIterations,"onUpdate:modelValue":u[7]||(u[7]=h=>L(i).smoothIterations=h),min:0,max:30},null,8,["modelValue"]),ut(_t,{label:"随机种子",modelValue:L(o).seed,"onUpdate:modelValue":u[8]||(u[8]=h=>L(o).seed=h),min:1,max:999999,step:1},null,8,["modelValue"])]),L(i).algo==="rrt"||L(i).algo==="rrtstar"?(Tt(),Rt("div",FT,[u[70]||(u[70]=P("div",{class:"section-title"},"RRT 参数",-1)),ut(_t,{label:"最大节点",modelValue:L(o).rrtMaxNodes,"onUpdate:modelValue":u[9]||(u[9]=h=>L(o).rrtMaxNodes=h),min:1e3,max:2e4,step:500},null,8,["modelValue"]),ut(_t,{label:"扩展步长",modelValue:L(o).rrtStep,"onUpdate:modelValue":u[10]||(u[10]=h=>L(o).rrtStep=h),min:15,max:80,step:5,unit:"m"},null,8,["modelValue"]),L(i).algo==="rrtstar"?(Tt(),ra(_t,{key:0,label:"近邻半径",modelValue:L(o).rrtStarRadius,"onUpdate:modelValue":u[11]||(u[11]=h=>L(o).rrtStarRadius=h),min:30,max:200,step:10,unit:"m"},null,8,["modelValue"])):ge("",!0),ut(_t,{label:"目标偏置",modelValue:L(o).goalBias,"onUpdate:modelValue":u[12]||(u[12]=h=>L(o).goalBias=h),min:0,max:.5,step:.02,decimals:2},null,8,["modelValue"])])):ge("",!0),L(i).algo==="hybridastar"?(Tt(),Rt("div",zT,[u[71]||(u[71]=P("div",{class:"section-title"},"Hybrid A* 参数",-1)),ut(_t,{label:"航向离散",modelValue:L(o).headingDiscretization,"onUpdate:modelValue":u[13]||(u[13]=h=>L(o).headingDiscretization=h),min:8,max:32,step:4},null,8,["modelValue"]),ut(_t,{label:"扩展步长",modelValue:L(o).hybridStep,"onUpdate:modelValue":u[14]||(u[14]=h=>L(o).hybridStep=h),min:15,max:60,step:5,unit:"m"},null,8,["modelValue"])])):ge("",!0),L(i).algo==="aco"?(Tt(),Rt("div",BT,[u[72]||(u[72]=P("div",{class:"section-title"},"蚁群参数",-1)),ut(_t,{label:"迭代次数",modelValue:L(o).acoIterations,"onUpdate:modelValue":u[15]||(u[15]=h=>L(o).acoIterations=h),min:10,max:100,step:5},null,8,["modelValue"]),ut(_t,{label:"蚂蚁数量",modelValue:L(o).acoAnts,"onUpdate:modelValue":u[16]||(u[16]=h=>L(o).acoAnts=h),min:8,max:60,step:2},null,8,["modelValue"]),ut(_t,{label:"信息素 α",modelValue:L(o).acoAlpha,"onUpdate:modelValue":u[17]||(u[17]=h=>L(o).acoAlpha=h),min:0,max:4,step:.1,decimals:1},null,8,["modelValue"]),ut(_t,{label:"启发 β",modelValue:L(o).acoBeta,"onUpdate:modelValue":u[18]||(u[18]=h=>L(o).acoBeta=h),min:0,max:8,step:.2,decimals:1},null,8,["modelValue"]),ut(_t,{label:"挥发 ρ",modelValue:L(o).acoRho,"onUpdate:modelValue":u[19]||(u[19]=h=>L(o).acoRho=h),min:.02,max:.6,step:.02,decimals:2},null,8,["modelValue"])])):ge("",!0),L(i).algo==="pso"?(Tt(),Rt("div",kT,[u[73]||(u[73]=P("div",{class:"section-title"},"粒子群参数",-1)),ut(_t,{label:"粒子数",modelValue:L(o).psoParticles,"onUpdate:modelValue":u[20]||(u[20]=h=>L(o).psoParticles=h),min:10,max:80,step:2},null,8,["modelValue"]),ut(_t,{label:"迭代次数",modelValue:L(o).psoIterations,"onUpdate:modelValue":u[21]||(u[21]=h=>L(o).psoIterations=h),min:10,max:100,step:5},null,8,["modelValue"]),ut(_t,{label:"惯性权重",modelValue:L(o).psoInertia,"onUpdate:modelValue":u[22]||(u[22]=h=>L(o).psoInertia=h),min:.2,max:1.2,step:.05,decimals:2},null,8,["modelValue"]),ut(_t,{label:"认知因子",modelValue:L(o).psoCognitive,"onUpdate:modelValue":u[23]||(u[23]=h=>L(o).psoCognitive=h),min:.5,max:3,step:.1,decimals:1},null,8,["modelValue"]),ut(_t,{label:"社会因子",modelValue:L(o).psoSocial,"onUpdate:modelValue":u[24]||(u[24]=h=>L(o).psoSocial=h),min:.5,max:3,step:.1,decimals:1},null,8,["modelValue"])])):ge("",!0),L(i).algo==="ga"?(Tt(),Rt("div",VT,[u[74]||(u[74]=P("div",{class:"section-title"},"遗传算法参数",-1)),ut(_t,{label:"种群规模",modelValue:L(o).gaPopulation,"onUpdate:modelValue":u[25]||(u[25]=h=>L(o).gaPopulation=h),min:12,max:80,step:2},null,8,["modelValue"]),ut(_t,{label:"迭代次数",modelValue:L(o).gaIterations,"onUpdate:modelValue":u[26]||(u[26]=h=>L(o).gaIterations=h),min:10,max:100,step:5},null,8,["modelValue"]),ut(_t,{label:"变异概率",modelValue:L(o).gaMutation,"onUpdate:modelValue":u[27]||(u[27]=h=>L(o).gaMutation=h),min:0,max:.5,step:.02,decimals:2},null,8,["modelValue"])])):ge("",!0),P("div",HT,[u[76]||(u[76]=P("div",{class:"section-title"},"动力学约束",-1)),P("label",GT,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[28]||(u[28]=h=>L(r).enabled=h)},null,512),[[en,L(r).enabled]]),u[75]||(u[75]=De(" 启用动力学约束检查与自动修正 ",-1))]),ut(_t,{label:"最大转弯角",modelValue:L(r).maxTurnAngle,"onUpdate:modelValue":u[29]||(u[29]=h=>L(r).maxTurnAngle=h),min:10,max:90,unit:"°"},null,8,["modelValue"]),ut(_t,{label:"最大爬升角",modelValue:L(r).maxClimbAngle,"onUpdate:modelValue":u[30]||(u[30]=h=>L(r).maxClimbAngle=h),min:5,max:60,unit:"°"},null,8,["modelValue"]),ut(_t,{label:"最小步长",modelValue:L(r).minStepLength,"onUpdate:modelValue":u[31]||(u[31]=h=>L(r).minStepLength=h),min:0,max:40,step:2,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最小转弯半径",modelValue:L(r).minTurnRadius,"onUpdate:modelValue":u[32]||(u[32]=h=>L(r).minTurnRadius=h),min:10,max:120,step:5,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最大加速度",modelValue:L(r).maxAccel,"onUpdate:modelValue":u[33]||(u[33]=h=>L(r).maxAccel=h),min:2,max:40,step:1,unit:"m/s²"},null,8,["modelValue"]),ut(_t,{label:"姿态变化限",modelValue:L(r).maxAttitudeChange,"onUpdate:modelValue":u[34]||(u[34]=h=>L(r).maxAttitudeChange=h),min:20,max:120,unit:"°"},null,8,["modelValue"])]),P("div",WT,[u[79]||(u[79]=P("div",{class:"section-title"},"在线重规划（动态对抗）",-1)),P("label",XT,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[35]||(u[35]=h=>L(a).enabled=h)},null,512),[[en,L(a).enabled]]),u[77]||(u[77]=De(" 播放时启用在线避障与局部重规划 ",-1))]),ut(_t,{label:"威胁裕度",modelValue:L(a).threatEnterDistance,"onUpdate:modelValue":u[36]||(u[36]=h=>L(a).threatEnterDistance=h),min:20,max:160,step:5,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"碰撞预测窗",modelValue:L(a).collisionHorizon,"onUpdate:modelValue":u[37]||(u[37]=h=>L(a).collisionHorizon=h),min:2,max:15,step:.5,decimals:1,unit:"s"},null,8,["modelValue"]),ut(_t,{label:"偏航阈值",modelValue:L(a).yawThreshold,"onUpdate:modelValue":u[38]||(u[38]=h=>L(a).yawThreshold=h),min:10,max:80,unit:"°"},null,8,["modelValue"]),ut(_t,{label:"绕航倍率",modelValue:L(a).detourRatio,"onUpdate:modelValue":u[39]||(u[39]=h=>L(a).detourRatio=h),min:1.2,max:3,step:.1,decimals:1,unit:"×"},null,8,["modelValue"]),ut(_t,{label:"最小间隔",modelValue:L(a).minInterval,"onUpdate:modelValue":u[40]||(u[40]=h=>L(a).minInterval=h),min:.5,max:10,step:.5,decimals:1,unit:"s"},null,8,["modelValue"]),ut(_t,{label:"前瞻距离",modelValue:L(a).lookAhead,"onUpdate:modelValue":u[41]||(u[41]=h=>L(a).lookAhead=h),min:40,max:300,step:10,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"窗口半径",modelValue:L(a).windowRadius,"onUpdate:modelValue":u[42]||(u[42]=h=>L(a).windowRadius=h),min:80,max:400,step:20,unit:"m"},null,8,["modelValue"]),P("label",$T,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[43]||(u[43]=h=>L(a).predictObstacles=h)},null,512),[[en,L(a).predictObstacles]]),u[78]||(u[78]=De(" 动态障碍预测避让 ",-1))])]),P("div",jT,[u[80]||(u[80]=P("div",{class:"section-title"},"飞行约束",-1)),ut(_t,{label:"安全距离",modelValue:L(i).clearance,"onUpdate:modelValue":u[44]||(u[44]=h=>L(i).clearance=h),min:0,max:40,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"巡航高度",modelValue:L(i).cruiseAlt,"onUpdate:modelValue":u[45]||(u[45]=h=>L(i).cruiseAlt=h),min:40,max:300,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"最小速度",modelValue:L(i).speedMin,"onUpdate:modelValue":u[46]||(u[46]=h=>L(i).speedMin=h),min:5,max:40,unit:"m/s"},null,8,["modelValue"]),ut(_t,{label:"最大速度",modelValue:L(i).speedMax,"onUpdate:modelValue":u[47]||(u[47]=h=>L(i).speedMax=h),min:20,max:120,unit:"m/s"},null,8,["modelValue"])]),P("div",YT,[u[82]||(u[82]=P("div",{class:"section-title"},"代价权重（实时影响航迹）",-1)),ut(_t,{label:"航程代价",modelValue:L(s).distance,"onUpdate:modelValue":u[48]||(u[48]=h=>L(s).distance=h),min:0,max:10,step:.1,decimals:1},null,8,["modelValue"]),ut(_t,{label:"威胁暴露",modelValue:L(s).threat,"onUpdate:modelValue":u[49]||(u[49]=h=>L(s).threat=h),min:0,max:100,step:1},null,8,["modelValue"]),ut(_t,{label:"高度代价",modelValue:L(s).altitude,"onUpdate:modelValue":u[50]||(u[50]=h=>L(s).altitude=h),min:0,max:40,step:.5,decimals:1},null,8,["modelValue"]),ut(_t,{label:"禁飞惩罚",modelValue:L(s).nofly,"onUpdate:modelValue":u[51]||(u[51]=h=>L(s).nofly=h),min:0,max:200,step:2},null,8,["modelValue"]),ut(_t,{label:"平滑代价",modelValue:L(s).smooth,"onUpdate:modelValue":u[52]||(u[52]=h=>L(s).smooth=h),min:0,max:2,step:.05,decimals:2},null,8,["modelValue"]),P("div",qT,[P("label",KT,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[53]||(u[53]=h=>L(e).autoReplan=h)},null,512),[[en,L(e).autoReplan]]),u[81]||(u[81]=De(" 参数/环境变更后自动重规划 ",-1))])])]),P("div",ZT,[u[88]||(u[88]=P("div",{class:"section-title"},"可视化增强",-1)),P("label",JT,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[54]||(u[54]=h=>L(e).showPrediction=h)},null,512),[[en,L(e).showPrediction]]),u[83]||(u[83]=De("移动障碍预测轨迹",-1))]),P("label",QT,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[55]||(u[55]=h=>L(e).safetyColorMode=h)},null,512),[[en,L(e).safetyColorMode]]),u[84]||(u[84]=De("安全裕度颜色映射（否则按威胁着色）",-1))]),P("label",tw,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[56]||(u[56]=h=>L(e).trackingEnabled=h)},null,512),[[en,L(e).trackingEnabled]]),u[85]||(u[85]=De("跟踪误差对比（参考/实际）",-1))]),P("label",ew,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[57]||(u[57]=h=>L(e).showReplanWindow=h)},null,512),[[en,L(e).showReplanWindow]]),u[86]||(u[86]=De("局部重规划窗口与候选航迹",-1))]),P("label",nw,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[58]||(u[58]=h=>L(e).showThreatHeatmap=h)},null,512),[[en,L(e).showThreatHeatmap]]),u[87]||(u[87]=De("地形威胁热力叠加",-1))])]),P("div",iw,[u[92]||(u[92]=P("div",{class:"section-title"},"地形参数",-1)),ut(_t,{label:"地形尺寸",modelValue:L(t).terrain.size,"onUpdate:modelValue":u[59]||(u[59]=h=>L(t).terrain.size=h),min:600,max:1600,step:200,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"高程幅度",modelValue:L(t).terrain.heightScale,"onUpdate:modelValue":u[60]||(u[60]=h=>L(t).terrain.heightScale=h),min:40,max:260,step:10,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"山脊强度",modelValue:L(t).terrain.ridgeScale,"onUpdate:modelValue":u[61]||(u[61]=h=>L(t).terrain.ridgeScale=h),min:0,max:150,step:5,unit:"m"},null,8,["modelValue"]),ut(_t,{label:"噪声密度",modelValue:L(t).terrain.noiseScale,"onUpdate:modelValue":u[62]||(u[62]=h=>L(t).terrain.noiseScale=h),min:.001,max:.005,step:1e-4,decimals:4},null,8,["modelValue"]),P("div",sw,[u[90]||(u[90]=P("label",null,"峡谷",-1)),P("label",rw,[_e(P("input",{type:"checkbox","onUpdate:modelValue":u[63]||(u[63]=h=>L(t).terrain.canyon=h)},null,512),[[en,L(t).terrain.canyon]]),u[89]||(u[89]=De(" 生成蜿蜒峡谷 ",-1))])]),P("div",ow,[u[91]||(u[91]=P("label",null,"随机种子",-1)),_e(P("input",{type:"number","onUpdate:modelValue":u[64]||(u[64]=h=>L(t).terrain.seed=h)},null,512),[[Cr,L(t).terrain.seed,void 0,{number:!0}]]),P("button",{onClick:u[65]||(u[65]=h=>L(t).terrain.seed=Math.floor(Math.random()*1e6))},"🎲")])])]))}}),lw=Wi(aw,[["__scopeId","data-v-680c42f1"]]),cw=ei({__name:"CostChart",props:{curve:{},color:{}},setup(n){const t=n,e=zi(null);function i(){const s=e.value;if(!s)return;const r=s.getContext("2d"),o=Math.min(window.devicePixelRatio,2),a=s.clientWidth,l=s.clientHeight;s.width=a*o,s.height=l*o,r.setTransform(o,0,0,o,0,0),r.clearRect(0,0,a,l),r.strokeStyle="rgba(80,100,140,0.25)",r.lineWidth=1;for(let h=1;h<4;h++){const g=l/4*h;r.beginPath(),r.moveTo(0,g),r.lineTo(a,g),r.stroke()}if(t.curve.length<2){r.fillStyle="#7888a6",r.font="12px sans-serif",r.textAlign="center",r.fillText("完成规划后显示代价曲线",a/2,l/2);return}const c=t.curve[t.curve.length-1].distance||1,d=t.curve[t.curve.length-1].cumulative||1,u=r.createLinearGradient(0,0,0,l);u.addColorStop(0,"rgba(58,160,255,0.35)"),u.addColorStop(1,"rgba(58,160,255,0.02)"),r.beginPath(),r.moveTo(0,l);for(const h of t.curve)r.lineTo(h.distance/c*a,l-h.cumulative/d*(l-6)-3);r.lineTo(a,l),r.closePath(),r.fillStyle=u,r.fill(),r.beginPath(),t.curve.forEach((h,g)=>{const _=h.distance/c*a,m=l-h.cumulative/d*(l-6)-3;g===0?r.moveTo(_,m):r.lineTo(_,m)}),r.strokeStyle=t.color??"#3aa0ff",r.lineWidth=2,r.stroke(),r.fillStyle="#7888a6",r.font="10px sans-serif",r.textAlign="left",r.fillText(`航程 ${Math.round(c)} m`,6,12),r.textAlign="right",r.fillText(`总代价 ${d.toFixed(1)}`,a-6,12)}return Ia(i),Ve(()=>t.curve,i,{deep:!0}),(s,r)=>(Tt(),Rt("canvas",{ref_key:"canvasRef",ref:e,class:"cost-chart"},null,512))}}),uw=Wi(cw,[["__scopeId","data-v-3ca82bbd"]]),hw={class:"section"},dw={class:"section-title"},fw={class:"stat-grid"},pw={class:"stat-card"},mw={class:"v"},gw={class:"stat-card"},_w={class:"v"},vw={class:"stat-card"},xw={class:"v"},yw={class:"stat-card"},Mw={class:"v"},Sw={class:"stat-card"},bw={class:"v"},Ew={class:"stat-card"},Tw={class:"stat-card"},ww={class:"v",style:{"font-size":"13px"}},Aw={class:"stat-card"},Rw={class:"stat-card",style:{"grid-column":"1 / -1"}},Cw={class:"k"},Pw={class:"v"},Iw={class:"section"},Dw={key:0,class:"sub"},Lw={key:1,class:"sub ok"},Uw={key:2,class:"vio-list"},Nw={class:"vio-n"},Ow={class:"section"},Fw={class:"metrics"},zw={key:0,class:"section"},Bw={class:"stat-grid"},kw={class:"stat-card"},Vw={class:"v"},Hw={class:"stat-card"},Gw={class:"v"},Ww={class:"stat-card"},Xw={class:"v"},$w={class:"stat-card"},jw={class:"v"},Yw={class:"section"},qw={class:"algo-pick"},Kw=["onClick"],Zw=["disabled"],Jw={key:0,class:"metrics",style:{"margin-top":"8px"}},Qw={class:"section"},tA={class:"section-title"},eA={key:0,class:"sub"},nA={key:1,class:"replan-list"},iA={class:"rr-head"},sA={class:"rr-time"},rA={class:"rr-reason"},oA={class:"rr-cost"},aA={class:"section"},lA={class:"cost-bars"},cA={style:{color:"var(--text-1)"}},uA={class:"bar-track"},hA={style:{"text-align":"right","font-variant-numeric":"tabular-nums"}},dA={class:"section"},fA=ei({__name:"StatsPanel",setup(n){const t=vs(),e=ue(),i=qe(()=>t.stats),s=["astar","dijkstra","rrt","rrtstar","hybridastar","aco","pso","ga"],r=zi(["astar","rrt","aco"]),o=zi(!1),a=zi([]),l=qe(()=>{var S;const f=(S=i.value)==null?void 0:S.costBreakdown,p=((f==null?void 0:f.distance)??0)+((f==null?void 0:f.threat)??0)+((f==null?void 0:f.altitude)??0)+((f==null?void 0:f.nofly)??0)+((f==null?void 0:f.smooth)??0);return[{key:"航程",v:(f==null?void 0:f.distance)??0,color:"#3aa0ff",total:p},{key:"威胁",v:(f==null?void 0:f.threat)??0,color:"#ff5263",total:p},{key:"高度",v:(f==null?void 0:f.altitude)??0,color:"#ffb020",total:p},{key:"禁飞",v:(f==null?void 0:f.nofly)??0,color:"#b046ff",total:p},{key:"平滑",v:(f==null?void 0:f.smooth)??0,color:"#1abc9c",total:p}]}),c=qe(()=>t.constraintReport),d=qe(()=>t.rawMetrics),u=qe(()=>t.smoothMetrics),h=qe(()=>{var p;const f=(p=c.value)==null?void 0:p.counts;return f?[{key:"转弯角超限",v:f.turn},{key:"爬升角超限",v:f.climb},{key:"步长不足",v:f.step},{key:"转弯半径不足",v:f.radius},{key:"姿态变化超限",v:f.attitude},{key:"碰撞/净空侵入",v:f.collision}].filter(S=>S.v>0):[]});function g(f){const p=r.value.indexOf(f);p>=0?r.value.splice(p,1):r.value.length<4&&r.value.push(f)}async function _(){o.value=!0,a.value=[],await new Promise(R=>setTimeout(R,30));const f=e.activeWaypoints;if(f.length<2){o.value=!1;return}const p=Sp({terrain:e.terrain,threats:e.threats,noflyZones:e.noflyZones,obstacles:e.obstacles,dynamics:e.dynamics},0),S=f[0].position,x=f[f.length-1].position,M=[];for(const R of r.value){const C=performance.now(),w=ca(p,S,x,{...e.planParams,algo:R},e.weights),D=performance.now()-C;M.push({label:fs[R],algo:R,path:w.success?w.path:[],success:w.success,distance:w.success?bp(w.path):0,totalCost:w.success?Ap(p,w.path,e.weights,{...e.planParams}).total:1/0,planTimeMs:Math.round(D)})}a.value=M,o.value=!1}function m(f,p=1){return f===void 0?"—":f.toFixed(p)}return(f,p)=>{var S,x,M,R,C,w,D,U,y,E,X,O,W,Y,B,G,$,ot,gt;return Tt(),Rt("div",null,[P("div",hw,[P("div",dw,"仿真评估（"+ft((S=L(e).activeUav)==null?void 0:S.name)+"）",1),P("div",fw,[P("div",pw,[p[1]||(p[1]=P("div",{class:"k"},"总航程 (m)",-1)),P("div",mw,ft(i.value?i.value.distance.toFixed(0):"—"),1)]),P("div",gw,[p[2]||(p[2]=P("div",{class:"k"},"规划耗时 (ms)",-1)),P("div",_w,ft(i.value?i.value.planTimeMs.toFixed(1):"—"),1)]),P("div",vw,[p[3]||(p[3]=P("div",{class:"k"},"威胁暴露量",-1)),P("div",xw,ft(i.value?i.value.threatExposure.toFixed(1):"—"),1)]),P("div",yw,[p[4]||(p[4]=P("div",{class:"k"},"暴露时间 (s)",-1)),P("div",Mw,ft(i.value?i.value.exposureTime.toFixed(1):"—"),1)]),P("div",Sw,[p[5]||(p[5]=P("div",{class:"k"},"扩展节点",-1)),P("div",bw,ft(i.value?i.value.expandedNodes:"—"),1)]),P("div",Ew,[p[6]||(p[6]=P("div",{class:"k"},"避障成功率",-1)),P("div",{class:"v",style:En({color:(((x=i.value)==null?void 0:x.obstacleAvoidanceRate)??100)>=100?"var(--ok)":"var(--danger)"})},ft(i.value?i.value.obstacleAvoidanceRate+"%":"—"),5)]),P("div",Tw,[p[7]||(p[7]=P("div",{class:"k"},"规划算法",-1)),P("div",ww,ft((M=i.value)!=null&&M.algo?L(fs)[i.value.algo]:"—"),1)]),P("div",Aw,[p[8]||(p[8]=P("div",{class:"k"},"约束满足率",-1)),P("div",{class:"v",style:En({color:(((R=i.value)==null?void 0:R.constraintRate)??100)>=99?"var(--ok)":"var(--warn)"})},ft(i.value?i.value.constraintRate+"%":"—"),5)]),P("div",Rw,[P("div",Cw,"总加权代价（"+ft((C=i.value)!=null&&C.success?"可行航迹":"规划失败")+"）",1),P("div",Pw,ft(i.value?i.value.totalCost.toFixed(1):"—"),1)])])]),P("div",Iw,[p[9]||(p[9]=P("div",{class:"section-title"},"动力学约束统计",-1)),c.value?h.value.length===0?(Tt(),Rt("div",Lw,"✓ 全部航段满足动力学约束")):(Tt(),Rt("div",Uw,[(Tt(!0),Rt(ne,null,Ne(h.value,rt=>(Tt(),Rt("div",{key:rt.key,class:"vio-row"},[P("span",null,ft(rt.key),1),P("span",Nw,ft(rt.v),1)]))),128))])):(Tt(),Rt("div",Dw,"完成规划后显示约束检查结果"))]),P("div",Ow,[p[18]||(p[18]=P("div",{class:"section-title"},"平滑前后指标对比",-1)),P("table",Fw,[p[17]||(p[17]=P("thead",null,[P("tr",null,[P("th",null,"指标"),P("th",null,"原始"),P("th",null,"平滑后")])],-1)),P("tbody",null,[P("tr",null,[p[10]||(p[10]=P("td",null,"航程 (m)",-1)),P("td",null,ft(m((w=d.value)==null?void 0:w.length,0)),1),P("td",null,ft(m((D=u.value)==null?void 0:D.length,0)),1)]),P("tr",null,[p[11]||(p[11]=P("td",null,"最大曲率 (1/m)",-1)),P("td",null,ft(m((U=d.value)==null?void 0:U.maxCurvature,4)),1),P("td",null,ft(m((y=u.value)==null?void 0:y.maxCurvature,4)),1)]),P("tr",null,[p[12]||(p[12]=P("td",null,"平均曲率 (1/m)",-1)),P("td",null,ft(m((E=d.value)==null?void 0:E.avgCurvature,4)),1),P("td",null,ft(m((X=u.value)==null?void 0:X.avgCurvature,4)),1)]),P("tr",null,[p[13]||(p[13]=P("td",null,"最大转角 (°)",-1)),P("td",null,ft(m((O=d.value)==null?void 0:O.maxTurnAngle,1)),1),P("td",null,ft(m((W=u.value)==null?void 0:W.maxTurnAngle,1)),1)]),P("tr",null,[p[14]||(p[14]=P("td",null,"最大加速度 (m/s²)",-1)),P("td",null,ft(m((Y=d.value)==null?void 0:Y.maxAccel,2)),1),P("td",null,ft(m((B=u.value)==null?void 0:B.maxAccel,2)),1)]),P("tr",null,[p[15]||(p[15]=P("td",null,"最大抖动 (m/s³)",-1)),P("td",null,ft(m((G=d.value)==null?void 0:G.maxJerk,2)),1),P("td",null,ft(m(($=u.value)==null?void 0:$.maxJerk,2)),1)]),P("tr",null,[p[16]||(p[16]=P("td",null,"平均速度 (m/s)",-1)),P("td",null,ft(m((ot=d.value)==null?void 0:ot.avgSpeed,1)),1),P("td",null,ft(m((gt=u.value)==null?void 0:gt.avgSpeed,1)),1)])])])]),L(t).trackingStats?(Tt(),Rt("div",zw,[p[23]||(p[23]=P("div",{class:"section-title"},"轨迹跟踪误差（参考 vs 实际）",-1)),P("div",Bw,[P("div",kw,[p[19]||(p[19]=P("div",{class:"k"},"平均位置误差 (m)",-1)),P("div",Vw,ft(L(t).trackingStats.meanError.toFixed(2)),1)]),P("div",Hw,[p[20]||(p[20]=P("div",{class:"k"},"最大位置误差 (m)",-1)),P("div",Gw,ft(L(t).trackingStats.maxError.toFixed(2)),1)]),P("div",Ww,[p[21]||(p[21]=P("div",{class:"k"},"平均航向误差 (°)",-1)),P("div",Xw,ft(L(t).trackingStats.meanHeadingError.toFixed(1)),1)]),P("div",$w,[p[22]||(p[22]=P("div",{class:"k"},"样本数",-1)),P("div",jw,ft(L(t).trackingStats.samples),1)])])])):ge("",!0),P("div",Yw,[p[25]||(p[25]=P("div",{class:"section-title"},"规划策略对比（首航段，最多选 4 个）",-1)),P("div",qw,[(Tt(),Rt(ne,null,Ne(s,rt=>P("button",{key:rt,class:Oe({active:r.value.includes(rt)}),onClick:vt=>g(rt)},ft(L(fs)[rt]),11,Kw)),64))]),P("button",{class:"primary",style:{width:"100%","margin-top":"6px"},disabled:o.value||r.value.length===0,onClick:_},ft(o.value?"对比计算中…":"运行策略对比"),9,Zw),a.value.length?(Tt(),Rt("table",Jw,[p[24]||(p[24]=P("thead",null,[P("tr",null,[P("th",null,"算法"),P("th",null,"航程"),P("th",null,"代价"),P("th",null,"耗时")])],-1)),P("tbody",null,[(Tt(!0),Rt(ne,null,Ne(a.value,rt=>(Tt(),Rt("tr",{key:rt.algo},[P("td",null,ft(rt.label),1),P("td",{class:Oe({fail:!rt.success})},ft(rt.success?rt.distance.toFixed(0):"失败"),3),P("td",null,ft(rt.success?rt.totalCost.toFixed(0):"—"),1),P("td",null,ft(rt.planTimeMs)+" ms",1)]))),128))])])):ge("",!0)]),P("div",Qw,[P("div",tA,"在线重规划事件（"+ft(L(t).replanEvents.length)+"）",1),L(t).replanEvents.length===0?(Tt(),Rt("div",eA," 开启「在线重规划」并播放后，遇到移动障碍/突发威胁将在此记录 ")):(Tt(),Rt("div",nA,[(Tt(!0),Rt(ne,null,Ne(L(t).replanEvents,(rt,vt)=>(Tt(),Rt("div",{key:vt,class:"replan-row"},[P("div",iA,[P("span",sA,"t="+ft(rt.time.toFixed(1))+"s",1),P("span",rA,ft(rt.reasonLabel),1)]),P("div",oA,[De(" 代价 "+ft(rt.costBefore.toFixed(0))+" → ",1),P("b",{style:En({color:rt.costAfter<rt.costBefore?"var(--ok)":"var(--warn)"})},ft(rt.costAfter.toFixed(0)),5),De(" · "+ft(rt.planTimeMs.toFixed(0))+" ms ",1)])]))),128))])),L(t).replanEvents.length?(Tt(),Rt("button",{key:2,style:{width:"100%","margin-top":"6px"},onClick:p[0]||(p[0]=rt=>L(t).clearReplanEvents())},"清空事件")):ge("",!0)]),P("div",aA,[p[26]||(p[26]=P("div",{class:"section-title"},"代价分量",-1)),P("div",lA,[(Tt(!0),Rt(ne,null,Ne(l.value,rt=>(Tt(),Rt("div",{key:rt.key,class:"bar-row"},[P("span",cA,ft(rt.key),1),P("div",uA,[P("div",{class:"bar-fill",style:En({width:rt.total>0?Math.max(2,rt.v/rt.total*100)+"%":"0%",background:rt.color})},null,4)]),P("span",hA,ft(rt.v.toFixed(1)),1)]))),128))])]),P("div",dA,[p[27]||(p[27]=P("div",{class:"section-title"},"累积代价曲线",-1)),ut(uw,{curve:L(t).costCurve},null,8,["curve"])])])}}}),pA=Wi(fA,[["__scopeId","data-v-8b220668"]]),mA={class:"panel"},gA={class:"action-bar"},_A=["disabled"],vA=["disabled"],xA={class:"tabs"},yA={class:"panel-body"},MA=ei({__name:"RightPanel",setup(n){const t=ue(),e=vs(),i=zi("plan"),s=zi(null);async function r(){await e.plan(),i.value="stats"}function o(){const u=e.exportScene(),h=new Blob([JSON.stringify(u,null,2)],{type:"application/json"}),g=URL.createObjectURL(h),_=document.createElement("a");_.href=g,_.download=`uav-scene-${new Date().toISOString().slice(0,19).replace(/[:T]/g,"-")}.json`,_.click(),URL.revokeObjectURL(g)}function a(){if(e.smoothPath.length===0)return;const u=["index,x,y,z"];e.smoothPath.forEach((m,f)=>u.push(`${f},${m.x.toFixed(2)},${m.y.toFixed(2)},${m.z.toFixed(2)}`));const h=new Blob([u.join(`
`)],{type:"text/csv"}),g=URL.createObjectURL(h),_=document.createElement("a");_.href=g,_.download="uav-path.csv",_.click(),URL.revokeObjectURL(g)}function l(){var u;(u=s.value)==null||u.click()}function c(u){var m;const h=u.target,g=(m=h.files)==null?void 0:m[0];if(!g)return;const _=new FileReader;_.onload=async()=>{try{const f=JSON.parse(String(_.result));if(!f.terrain||!Array.isArray(f.waypoints))throw new Error("配置格式不正确");if(e.clearPlan(),t.loadScene(f),e.message=`已导入场景：${f.exportedAt??g.name}`,f.smoothPath&&f.smoothPath.length>=2&&f.stats){const p=new hu(t.terrain,t.threats,t.noflyZones,t.obstacles);e.applyPlanResult({success:f.stats.success,rawPath:f.rawPath??f.smoothPath,smoothPath:f.smoothPath,stats:f.stats,legs:[],message:"导入航迹"},t.planParams,t.weights,p)}}catch(f){e.message=`导入失败：${f.message}`}},_.readAsText(g),h.value=""}function d(){confirm("确定恢复默认场景？当前编辑将丢失。")&&(e.clearPlan(),t.resetScene())}return(u,h)=>(Tt(),Rt("div",mA,[P("div",gA,[P("button",{class:"primary",disabled:L(e).status==="planning",onClick:r},ft(L(e).status==="planning"?"规划中…":"⚡ 执行规划"),9,_A),P("button",{onClick:o,title:"导出场景配置 JSON"},"导出"),P("button",{onClick:a,disabled:L(e).smoothPath.length===0,title:"导出航迹 CSV"},"CSV",8,vA),P("button",{onClick:l},"导入"),P("button",{class:"danger",onClick:d},"重置"),P("input",{ref_key:"fileInput",ref:s,type:"file",accept:"application/json,.json",style:{display:"none"},onChange:c},null,544)]),P("div",xA,[P("div",{class:Oe(["tab",{active:i.value==="edit"}]),onClick:h[0]||(h[0]=g=>i.value="edit")}," 环境编辑 ",2),P("div",{class:Oe(["tab",{active:i.value==="plan"}]),onClick:h[1]||(h[1]=g=>i.value="plan")}," 规划参数 ",2),P("div",{class:Oe(["tab",{active:i.value==="stats"}]),onClick:h[2]||(h[2]=g=>i.value="stats")}," 仿真评估 ",2)]),P("div",yA,[_e(ut(RT,null,null,512),[[il,i.value==="edit"]]),_e(ut(lw,null,null,512),[[il,i.value==="plan"]]),_e(ut(pA,null,null,512),[[il,i.value==="stats"]])]),h[3]||(h[3]=P("div",{class:"footer-bar"},[P("span",{class:"tip"},"动态对抗：开启在线重规划后播放"),P("span",{class:"ver"},"UAV Path Sim v2.0 · WebGL2")],-1))]))}}),SA=Wi(MA,[["__scopeId","data-v-243ceac0"]]),bA={class:"playback"},EA={class:"left"},TA=["disabled"],wA=["disabled"],AA=["onClick"],RA=["disabled"],CA={class:"mini-chk",title:"播放时遇到移动障碍/突发威胁自动局部重规划"},PA={class:"center"},IA={class:"t"},DA=["max","value"],LA={class:"t"},UA={class:"right"},NA={key:0,class:"mini"},OA={class:"mini"},FA={class:"mini"},zA={class:"mini"},BA=ei({__name:"PlaybackBar",setup(n){const t=vs();ue();const e=[.5,1,2,4,8],i=a=>{const l=Math.floor(a/60),c=(a%60).toFixed(1).padStart(4,"0");return`${l}:${c}`},s=qe(()=>{const a=t.sampleAt(t.simTime);return a?a.speed:0}),r=qe(()=>{const a=t.sampleAt(t.simTime);return a?a.s:0});async function o(){await t.plan()}return(a,l)=>{var c;return Tt(),Rt("div",bA,[P("div",EA,[P("button",{class:"primary",disabled:L(t).status==="planning"||L(t).trajectory.length<2,onClick:l[0]||(l[0]=d=>L(t).togglePlay()),title:"空格播放/暂停"},ft(L(t).playing?"⏸ 暂停":"▶ 播放"),9,TA),P("button",{disabled:L(t).trajectory.length<2,onClick:l[1]||(l[1]=d=>L(t).seek(0))},"⏮ 回放",8,wA),(Tt(),Rt(ne,null,Ne(e,d=>P("button",{key:d,class:Oe({active:L(t).playbackSpeed===d}),onClick:u=>L(t).setPlaybackSpeed(d)},ft(d)+"× ",11,AA)),64)),P("button",{disabled:L(t).status==="planning",onClick:o,title:"基于当前场景与参数重新执行全局规划（全部无人机）"}," ↻ 重新规划 ",8,RA),P("label",CA,[_e(P("input",{type:"checkbox","onUpdate:modelValue":l[2]||(l[2]=d=>L(t).replanConfig.enabled=d)},null,512),[[en,L(t).replanConfig.enabled]]),l[4]||(l[4]=De(" 在线重规划 ",-1))])]),P("div",PA,[P("span",IA,ft(i(L(t).simTime)),1),P("input",{class:"scrub",type:"range",min:"0",max:Math.max(L(t).duration,.01),step:"0.05",value:L(t).simTime,onInput:l[3]||(l[3]=d=>L(t).seek(Number(d.target.value)))},null,40,DA),P("span",LA,ft(i(L(t).duration)),1)]),P("div",UA,[(c=L(t).stats)!=null&&c.algo?(Tt(),Rt("span",NA,ft(L(fs)[L(t).stats.algo]),1)):ge("",!0),P("span",OA,"航程 "+ft(r.value.toFixed(0))+" m",1),P("span",FA,"速度 "+ft(s.value.toFixed(1))+" m/s",1),P("span",zA,"重规划 "+ft(L(t).replanEvents.length)+" 次",1)])])}}}),kA=Wi(BA,[["__scopeId","data-v-7f0f6292"]]),VA={class:"app-shell"},HA=ei({__name:"App",setup(n){const t=ue(),e=vs();let i=0;Ve(()=>({...t.terrain}),()=>{e.markDirty(),window.clearTimeout(i),i=window.setTimeout(()=>{t.terrainVersion++},250)});let s=0;return Ve(()=>[JSON.stringify(t.threats),JSON.stringify(t.noflyZones),JSON.stringify(t.obstacles),JSON.stringify(t.dynamics),JSON.stringify(t.waypoints),JSON.stringify(t.uavs),JSON.stringify(t.planParams),JSON.stringify(t.weights),e.smoothing],()=>{e.markDirty(),e.autoReplan&&e.status!=="planning"&&(window.clearTimeout(s),s=window.setTimeout(()=>void e.plan(),450))}),Ia(()=>{e.plan()}),lu(()=>{window.clearTimeout(i),window.clearTimeout(s)}),(r,o)=>(Tt(),Rt("div",VA,[ut(fv),ut(TE),ut(SA),ut(kA)]))}}),mm=G_(HA);mm.use($_());mm.mount("#app");
