define(["exports","./WebGLConstants-615fbe7f","./when-7d8885d2"],(function(_,t,n){"use strict";var e={UNSIGNED_BYTE:t.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:t.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:t.WebGLConstants.UNSIGNED_INT,FLOAT:t.WebGLConstants.FLOAT,HALF_FLOAT:t.WebGLConstants.HALF_FLOAT_OES,UNSIGNED_INT_24_8:t.WebGLConstants.UNSIGNED_INT_24_8,UNSIGNED_SHORT_4_4_4_4:t.WebGLConstants.UNSIGNED_SHORT_4_4_4_4,UNSIGNED_SHORT_5_5_5_1:t.WebGLConstants.UNSIGNED_SHORT_5_5_5_1,UNSIGNED_SHORT_5_6_5:t.WebGLConstants.UNSIGNED_SHORT_5_6_5,isPacked:function(_){return _===e.UNSIGNED_INT_24_8||_===e.UNSIGNED_SHORT_4_4_4_4||_===e.UNSIGNED_SHORT_5_5_5_1||_===e.UNSIGNED_SHORT_5_6_5},sizeInBytes:function(_){switch(_){case e.UNSIGNED_BYTE:return 1;case e.UNSIGNED_SHORT:case e.UNSIGNED_SHORT_4_4_4_4:case e.UNSIGNED_SHORT_5_5_5_1:case e.UNSIGNED_SHORT_5_6_5:case t.WebGLConstants.HALF_FLOAT:case t.WebGLConstants.HALF_FLOAT_OES:return 2;case e.UNSIGNED_INT:case e.FLOAT:case e.UNSIGNED_INT_24_8:return 4}},validate:function(_){return _===e.UNSIGNED_BYTE||_===e.UNSIGNED_SHORT||_===e.UNSIGNED_INT||_===e.FLOAT||_===t.WebGLConstants.HALF_FLOAT||_===t.WebGLConstants.HALF_FLOAT_OES||_===e.UNSIGNED_INT_24_8||_===e.UNSIGNED_SHORT_4_4_4_4||_===e.UNSIGNED_SHORT_5_5_5_1||_===e.UNSIGNED_SHORT_5_6_5},toWebGLConstant:function(_,n){switch(_){case e.UNSIGNED_BYTE:return t.WebGLConstants.UNSIGNED_BYTE;case e.UNSIGNED_SHORT:return t.WebGLConstants.UNSIGNED_SHORT;case e.UNSIGNED_INT:return t.WebGLConstants.UNSIGNED_INT;case e.FLOAT:return t.WebGLConstants.FLOAT;case e.HALF_FLOAT:return n.webgl2?t.WebGLConstants.HALF_FLOAT:t.WebGLConstants.HALF_FLOAT_OES;case e.UNSIGNED_INT_24_8:return t.WebGLConstants.UNSIGNED_INT_24_8;case e.UNSIGNED_SHORT_4_4_4_4:return t.WebGLConstants.UNSIGNED_SHORT_4_4_4_4;case e.UNSIGNED_SHORT_5_5_5_1:return t.WebGLConstants.UNSIGNED_SHORT_5_5_5_1;case e.UNSIGNED_SHORT_5_6_5:return e.UNSIGNED_SHORT_5_6_5}}},T={DEPTH_COMPONENT:t.WebGLConstants.DEPTH_COMPONENT,DEPTH_COMPONENT16:t.WebGLConstants.DEPTH_COMPONENT16,DEPTH_COMPONENT32F:t.WebGLConstants.DEPTH_COMPONENT32F,DEPTH_STENCIL:t.WebGLConstants.DEPTH_STENCIL,ALPHA:t.WebGLConstants.ALPHA,RGB:t.WebGLConstants.RGB,RGBA:t.WebGLConstants.RGBA,LUMINANCE:t.WebGLConstants.LUMINANCE,LUMINANCE_ALPHA:t.WebGLConstants.LUMINANCE_ALPHA,RGB_DXT1:t.WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,RGBA_DXT1:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,RGBA_DXT3:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,RGBA_DXT5:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,RGB_PVRTC_4BPPV1:t.WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,RGB_PVRTC_2BPPV1:t.WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,RGBA_PVRTC_4BPPV1:t.WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,RGBA_PVRTC_2BPPV1:t.WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,RGB_ETC1:t.WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,RED_INTEGER:t.WebGLConstants.RED_INTEGER,RED:t.WebGLConstants.RED,componentsLength:function(_){switch(_){case T.RGB:return 3;case T.RGBA:return 4;case T.LUMINANCE_ALPHA:return 2;case T.ALPHA:case T.LUMINANCE:case T.RED:case T.RED_INTEGER:default:return 1}},validate:function(_){return _===T.DEPTH_COMPONENT||_===T.DEPTH_COMPONENT16||_===T.DEPTH_COMPONENT32F||_===T.DEPTH_STENCIL||_===T.ALPHA||_===T.RED||_===T.RED_INTEGER||_===T.RGB||_===T.RGBA||_===T.LUMINANCE||_===T.LUMINANCE_ALPHA||_===T.RGB_DXT1||_===T.RGBA_DXT1||_===T.RGBA_DXT3||_===T.RGBA_DXT5||_===T.RGB_PVRTC_4BPPV1||_===T.RGB_PVRTC_2BPPV1||_===T.RGBA_PVRTC_4BPPV1||_===T.RGBA_PVRTC_2BPPV1||_===T.RGB_ETC1},isColorFormat:function(_){return _===T.ALPHA||_===T.RED||_===T.RED_INTEGER||_===T.RGB||_===T.RGBA||_===T.LUMINANCE||_===T.LUMINANCE_ALPHA},isDepthFormat:function(_){return _===T.DEPTH_COMPONENT||_===T.DEPTH_COMPONENT16||_===T.DEPTH_COMPONENT32F||_===T.DEPTH_STENCIL},isCompressedFormat:function(_){return _===T.RGB_DXT1||_===T.RGBA_DXT1||_===T.RGBA_DXT3||_===T.RGBA_DXT5||_===T.RGB_PVRTC_4BPPV1||_===T.RGB_PVRTC_2BPPV1||_===T.RGBA_PVRTC_4BPPV1||_===T.RGBA_PVRTC_2BPPV1||_===T.RGB_ETC1},isDXTFormat:function(_){return _===T.RGB_DXT1||_===T.RGBA_DXT1||_===T.RGBA_DXT3||_===T.RGBA_DXT5},isPVRTCFormat:function(_){return _===T.RGB_PVRTC_4BPPV1||_===T.RGB_PVRTC_2BPPV1||_===T.RGBA_PVRTC_4BPPV1||_===T.RGBA_PVRTC_2BPPV1},isETC1Format:function(_){return _===T.RGB_ETC1},compressedTextureSizeInBytes:function(_,t,e,G){var s=n.defined(G)?G:1;switch(_){case T.RGB_DXT1:case T.RGBA_DXT1:case T.RGB_ETC1:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8*s;case T.RGBA_DXT3:case T.RGBA_DXT5:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16*s;case T.RGB_PVRTC_4BPPV1:case T.RGBA_PVRTC_4BPPV1:return Math.floor((Math.max(t,8)*Math.max(e,8)*4+7)/8)*s;case T.RGB_PVRTC_2BPPV1:case T.RGBA_PVRTC_2BPPV1:return Math.floor((Math.max(t,16)*Math.max(e,8)*2+7)/8)*s;default:return 0}},textureSizeInBytes:function(_,t,G,s,E){var N=n.defined(E)?E:1,R=T.componentsLength(_);return e.isPacked(t)&&(R=1),R*e.sizeInBytes(t)*G*s*N},alignmentInBytes:function(_,t,n){var e=T.textureSizeInBytes(_,t,n,1)%4;return 0===e?4:2===e?2:1},createTypedArray:function(_,t,n,G){var s=e.sizeInBytes(t);return new(s===Uint8Array.BYTES_PER_ELEMENT?Uint8Array:s===Uint16Array.BYTES_PER_ELEMENT?Uint16Array:s===Float32Array.BYTES_PER_ELEMENT&&t===e.FLOAT?Float32Array:Uint32Array)(T.componentsLength(_)*n*G)},flipY:function(_,t,n,e,G){if(1===G)return _;for(var s=T.createTypedArray(t,n,e,G),E=T.componentsLength(t),N=e*E,R=0;R<G;++R)for(var r=R*e*E,a=(G-R-1)*e*E,P=0;P<N;++P)s[a+P]=_[r+P];return s},RGBToRGBA:function(_,t,n,e){for(var G=T.createTypedArray(T.RGBA,t,n,e),s=_.length/3,E=0;E<s;E++)G[4*E]=_[3*E],G[4*E+1]=_[3*E+1],G[4*E+2]=_[3*E+2];return G},toInternalFormat:function(_,n,G){if(!G.webgl2)return _;if(_===T.DEPTH_STENCIL)return t.WebGLConstants.DEPTH24_STENCIL8;if(_===T.DEPTH_COMPONENT){if(n===e.UNSIGNED_SHORT)return t.WebGLConstants.DEPTH_COMPONENT16;if(n===e.UNSIGNED_INT)return t.WebGLConstants.DEPTH_COMPONENT24;if(n===e.FLOAT)return t.WebGLConstants.DEPTH_COMPONENT32F}if(_===T.DEPTH_COMPONENT16)return t.WebGLConstants.DEPTH_COMPONENT16;if(_===T.DEPTH_COMPONENT32F)return t.WebGLConstants.DEPTH_COMPONENT32F;if(n===e.FLOAT)switch(_){case T.RGBA:return t.WebGLConstants.RGBA32F;case T.RGB:return t.WebGLConstants.RGB32F;case T.RG:return t.WebGLConstants.RG32F;case T.R:return t.WebGLConstants.R32F}if(n===e.HALF_FLOAT)switch(_){case T.RGBA:return t.WebGLConstants.RGBA16F;case T.RGB:return t.WebGLConstants.RGB16F;case T.RG:return t.WebGLConstants.RG16F;case T.R:return t.WebGLConstants.R16F}return _}},G=Object.freeze(T);_.PixelDatatype=e,_.PixelFormat=G}));