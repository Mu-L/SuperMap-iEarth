define(["exports","./when-b60132fc","./Check-7b2a090c","./RuntimeError-4a5c8994"],(function(e,r,t,n){"use strict";function o(e,t,n,d){return t=r.defaultValue(t,0),n=r.defaultValue(n,e.byteLength-t),d=r.defaultValue(d,"utf-8"),e=e.subarray(t,t+n),o.decode(e,d)}function d(e,r,t){return r<=e&&e<=t}o.decodeWithTextDecoder=function(e,r){return new TextDecoder(r).decode(e)},o.decodeWithFromCharCode=function(e){for(var r="",t=function(e){for(var r=0,t=0,o=0,i=128,u=191,c=[],f=e.length,a=0;a<f;++a){var h=e[a];if(0===o){if(d(h,0,127)){c.push(h);continue}if(d(h,194,223)){o=1,r=31&h;continue}if(d(h,224,239)){224===h&&(i=160),237===h&&(u=159),o=2,r=15&h;continue}if(d(h,240,244)){240===h&&(i=144),244===h&&(u=143),o=3,r=7&h;continue}throw new n.RuntimeError("String decoding failed.")}d(h,i,u)?(i=128,u=191,r=r<<6|63&h,++t===o&&(c.push(r),r=o=t=0)):(r=o=t=0,i=128,u=191,--a)}return c}(e),o=t.length,i=0;i<o;++i){var u=t[i];u<=65535?r+=String.fromCharCode(u):(u-=65536,r+=String.fromCharCode(55296+(u>>10),56320+(1023&u)))}return r},"undefined"!=typeof TextDecoder?o.decode=o.decodeWithTextDecoder:o.decode=o.decodeWithFromCharCode,e.getStringFromTypedArray=o}));