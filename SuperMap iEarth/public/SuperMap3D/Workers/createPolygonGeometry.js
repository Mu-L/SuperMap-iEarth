define(["./when-7d8885d2","./Cartesian2-54f49cd5","./ArcType-29cf2197","./arrayFill-0e93951b","./BoundingRectangle-0828d65a","./buildModuleUrl-9403d69d","./Cartographic-9ee1f1bd","./Check-737bd4ec","./ComponentDatatype-94b9147c","./EllipsoidGeodesic-83f454fb","./EllipsoidTangentPlane-adf29704","./GeometryAttribute-bf27d0ff","./GeometryInstance-66495308","./GeometryOffsetAttribute-fbeb6f1a","./GeometryPipeline-78c783ae","./IndexDatatype-cb5f74b7","./Math-4ffce144","./FeatureDetection-07e177c7","./PolygonGeometryLibrary-83bb5a0c","./PolygonPipeline-68e6c052","./VertexFormat-86386b6b","./Event-1c0f5ff4","./RuntimeError-f53bcb51","./WebGLConstants-6b41cc89","./Cartesian4-6d2e270a","./IntersectionTests-6a0482c9","./Plane-74ce87e7","./AttributeCompression-cd5a3a25","./EncodedCartesian3-8b0babb6","./arrayRemoveDuplicates-30a3675e","./EllipsoidRhumbLine-fd512dba","./GeometryAttributes-2f749385"],(function(e,t,r,o,a,i,n,s,l,u,c,p,d,g,y,m,h,f,b,_,v,P,x,C,w,A,T,E,I,G,V,F){"use strict";var H=new n.Cartographic,N=new n.Cartographic;function O(e,t,r,o){var a=o.cartesianToCartographic(e,H).height,i=o.cartesianToCartographic(t,N);i.height=a,o.cartographicToCartesian(i,t);var n=o.cartesianToCartographic(r,N);n.height=a-100,o.cartographicToCartesian(n,r)}var R=new a.BoundingRectangle,D=new n.Cartesian3,L=new n.Cartesian3,M=new n.Cartesian3,B=new n.Cartesian3,S=new n.Cartesian3,k=new n.Cartesian3,z=new n.Cartesian3,Y=new n.Cartesian3,U=new n.Cartesian3,W=new t.Cartesian2,j=new t.Cartesian2,Q=new n.Cartesian3,q=new p.Quaternion,K=new f.Matrix3,Z=new f.Matrix3;function J(r){var a=r.vertexFormat,i=r.geometry,s=r.shadowVolume,u=i.attributes.position.values,c=u.length,d=r.wall,y=r.top||d,m=r.bottom||d;if(a.st||a.normal||a.tangent||a.bitangent||s){var b=r.boundingRectangle,_=r.tangentPlane,v=r.ellipsoid,P=r.stRotation,x=r.perPositionHeight,C=W;C.x=b.x,C.y=b.y;var w,A=r.isComputeTexCoord?new Float32Array(c):new Float32Array(c/3*2),T=a.st?A:void 0;a.normal&&(w=x&&y&&!d?i.attributes.normal.values:new Float32Array(c));var E=a.tangent?new Float32Array(c):void 0,I=a.bitangent?new Float32Array(c):void 0,G=s?new Float32Array(c):void 0,V=0,F=0,H=L,N=M,R=B,J=!0,X=K,$=Z;if(0!==P){var ee=p.Quaternion.fromAxisAngle(_._plane.normal,P,q);X=f.Matrix3.fromQuaternion(ee,X),ee=p.Quaternion.fromAxisAngle(_._plane.normal,-P,q),$=f.Matrix3.fromQuaternion(ee,$)}else X=f.Matrix3.clone(f.Matrix3.IDENTITY,X),$=f.Matrix3.clone(f.Matrix3.IDENTITY,$);var te=0,re=0;y&&m&&(te=c/2,re=c/3,c/=2);for(var oe=0;oe<c;oe+=3){var ae=n.Cartesian3.fromArray(u,oe,Q);if(a.st){var ie=f.Matrix3.multiplyByVector(X,ae,D);ie=v.scaleToGeodeticSurface(ie,ie);var ne=_.projectPointOntoPlane(ie,j);t.Cartesian2.subtract(ne,C,ne);var se=h.CesiumMath.clamp(ne.x/b.width,0,1),le=h.CesiumMath.clamp(ne.y/b.height,0,1);m&&(T[V+re]=se,T[V+1+re]=le),y&&(T[V]=se,T[V+1]=le),V+=2}if(a.normal||a.tangent||a.bitangent||s){var ue=F+1,ce=F+2;if(d){if(oe+3<c){var pe=n.Cartesian3.fromArray(u,oe+3,S);if(J){var de=n.Cartesian3.fromArray(u,oe+c,k);x&&O(ae,pe,de,v),n.Cartesian3.subtract(pe,ae,pe),n.Cartesian3.subtract(de,ae,de),H=n.Cartesian3.normalize(n.Cartesian3.cross(de,pe,H),H),J=!1}n.Cartesian3.equalsEpsilon(pe,ae,h.CesiumMath.EPSILON10)&&(J=!0)}(a.tangent||a.bitangent)&&(R=v.geodeticSurfaceNormal(ae,R),a.tangent&&(N=n.Cartesian3.normalize(n.Cartesian3.cross(R,H,N),N)))}else H=v.geodeticSurfaceNormal(ae,H),(a.tangent||a.bitangent)&&(x&&(z=n.Cartesian3.fromArray(w,F,z),Y=n.Cartesian3.cross(n.Cartesian3.UNIT_Z,z,Y),Y=n.Cartesian3.normalize(f.Matrix3.multiplyByVector($,Y,Y),Y),a.bitangent&&(U=n.Cartesian3.normalize(n.Cartesian3.cross(z,Y,U),U))),N=n.Cartesian3.cross(n.Cartesian3.UNIT_Z,H,N),N=n.Cartesian3.normalize(f.Matrix3.multiplyByVector($,N,N),N),a.bitangent&&(R=n.Cartesian3.normalize(n.Cartesian3.cross(H,N,R),R)));a.normal&&(r.wall?(w[F+te]=H.x,w[ue+te]=H.y,w[ce+te]=H.z):m&&(w[F+te]=-H.x,w[ue+te]=-H.y,w[ce+te]=-H.z),(y&&!x||d)&&(w[F]=H.x,w[ue]=H.y,w[ce]=H.z)),s&&(d&&(H=v.geodeticSurfaceNormal(ae,H)),G[F+te]=-H.x,G[ue+te]=-H.y,G[ce+te]=-H.z),a.tangent&&(r.wall?(E[F+te]=N.x,E[ue+te]=N.y,E[ce+te]=N.z):m&&(E[F+te]=-N.x,E[ue+te]=-N.y,E[ce+te]=-N.z),y&&(x?(E[F]=Y.x,E[ue]=Y.y,E[ce]=Y.z):(E[F]=N.x,E[ue]=N.y,E[ce]=N.z))),a.bitangent&&(m&&(I[F+te]=R.x,I[ue+te]=R.y,I[ce+te]=R.z),y&&(x?(I[F]=U.x,I[ue]=U.y,I[ce]=U.z):(I[F]=R.x,I[ue]=R.y,I[ce]=R.z))),F+=3}}a.st&&(i.attributes.st=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:T})),a.normal&&(i.attributes.normal=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:w})),a.tangent&&(i.attributes.tangent=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:E})),a.bitangent&&(i.attributes.bitangent=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:I})),s&&(i.attributes.extrudeDirection=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:G}))}if(r.extrude&&e.defined(r.offsetAttribute)){var ge=u.length/3,ye=new Uint8Array(ge);if(r.offsetAttribute===g.GeometryOffsetAttribute.TOP)y&&m||d?ye=o.arrayFill(ye,1,0,ge/2):y&&(ye=o.arrayFill(ye,1));else{var me=r.offsetAttribute===g.GeometryOffsetAttribute.NONE?0:1;ye=o.arrayFill(ye,me)}i.attributes.applyOffset=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:ye})}return i}var X=new n.Cartographic,$=new n.Cartographic,ee={west:0,east:0},te=new u.EllipsoidGeodesic;function re(o,a,i,n,s){if(s=e.defaultValue(s,new t.Rectangle),!e.defined(o)||o.length<3)return s.west=0,s.north=0,s.south=0,s.east=0,s;if(i===r.ArcType.RHUMB)return t.Rectangle.fromCartesianArray(o,a,s);te.ellipsoid.equals(a)||(te=new u.EllipsoidGeodesic(void 0,void 0,a)),s.west=Number.POSITIVE_INFINITY,s.east=Number.NEGATIVE_INFINITY,s.south=Number.POSITIVE_INFINITY,s.north=Number.NEGATIVE_INFINITY,ee.west=Number.POSITIVE_INFINITY,ee.east=Number.NEGATIVE_INFINITY;for(var l,c=1/h.CesiumMath.chordLength(n,a.maximumRadius),p=o.length,d=a.cartesianToCartographic(o[0],$),g=X,y=1;y<p;y++)l=g,g=d,d=a.cartesianToCartographic(o[y],l),te.setEndPoints(g,d),ae(te,c,s,ee);return l=g,g=d,d=a.cartesianToCartographic(o[0],l),te.setEndPoints(g,d),ae(te,c,s,ee),s.east-s.west>ee.west-ee.east&&(s.east=ee.east,s.west=ee.west),s}var oe=new n.Cartographic;function ae(e,t,r,o){for(var a=e.surfaceDistance,i=Math.ceil(a*t),n=i>0?a/(i-1):Number.POSITIVE_INFINITY,s=0,l=0;l<i;l++){var u=e.interpolateUsingSurfaceDistance(s,oe);s+=n;var c=u.longitude,p=u.latitude;r.west=Math.min(r.west,c),r.east=Math.max(r.east,c),r.south=Math.min(r.south,p),r.north=Math.max(r.north,p),o.west=c>0?Math.min(c,o.west):o.west,o.east=c<0?Math.max(c,o.east):o.east}}var ie=[];function ne(e,t,r,o,a,i,n,s,l,u){var p,g={walls:[]};if(i||n){var y,h,f=b.PolygonGeometryLibrary.createGeometryFromPositions(e,t,r,a,s,l),v=f.attributes.position.values,P=f.indices;if(i&&n){var x=v.concat(v);y=x.length/3,(h=m.IndexDatatype.createTypedArray(y,2*P.length)).set(P);var C=P.length,w=y/2;for(p=0;p<C;p+=3){var A=h[p]+w,T=h[p+1]+w,E=h[p+2]+w;h[p+C]=E,h[p+1+C]=T,h[p+2+C]=A}if(f.attributes.position.values=x,a&&s.normal){var I=f.attributes.normal.values;f.attributes.normal.values=new Float32Array(x.length),f.attributes.normal.values.set(I)}f.indices=h}else if(n){for(y=v.length/3,h=m.IndexDatatype.createTypedArray(y,P.length),p=0;p<P.length;p+=3)h[p]=P[p+2],h[p+1]=P[p+1],h[p+2]=P[p];f.indices=h}g.topAndBottom=new d.GeometryInstance({geometry:f})}var G,V=o.outerRing,F=c.EllipsoidTangentPlane.fromPoints(V,e),H=F.projectPointsOntoPlane(V,ie),N=_.PolygonPipeline.computeWindingOrder2D(H);N===_.WindingOrder.CLOCKWISE&&(V=V.slice().reverse()),u&&(G=b.PolygonGeometryLibrary.computeWallGeometry(V,e,r,a,l),g.walls.push(new d.GeometryInstance({geometry:G})));var O=o.holes;for(p=0;p<O.length;p++){var R=O[p];H=(F=c.EllipsoidTangentPlane.fromPoints(R,e)).projectPointsOntoPlane(R,ie),(N=_.PolygonPipeline.computeWindingOrder2D(H))===_.WindingOrder.COUNTER_CLOCKWISE&&(R=R.slice().reverse()),G=b.PolygonGeometryLibrary.computeWallGeometry(R,e,r,a,l),g.walls.push(new d.GeometryInstance({geometry:G}))}return g}function se(o){var a=o.polygonHierarchy,i=e.defaultValue(o.vertexFormat,v.VertexFormat.DEFAULT),n=e.defaultValue(o.ellipsoid,t.Ellipsoid.WGS84),s=e.defaultValue(o.granularity,h.CesiumMath.RADIANS_PER_DEGREE),l=e.defaultValue(o.stRotation,0),u=e.defaultValue(o.perPositionHeight,!1),c=u&&e.defined(o.extrudedHeight),p=e.defaultValue(o.height,0),d=e.defaultValue(o.extrudedHeight,p);if(!c){var g=Math.max(p,d);d=Math.min(p,d),p=g}this._vertexFormat=v.VertexFormat.clone(i),this._ellipsoid=t.Ellipsoid.clone(n),this._granularity=s,this._stRotation=l,this._height=p,this._extrudedHeight=d,this._closeTop=e.defaultValue(o.closeTop,!0),this._closeBottom=e.defaultValue(o.closeBottom,!0),this._extrudeOutering=e.defaultValue(o.extrudeOutering,!0),this._polygonHierarchy=a,this._perPositionHeight=u,this._perPositionHeightExtrude=c,this._shadowVolume=e.defaultValue(o.shadowVolume,!1),this._workerName="createPolygonGeometry",this._offsetAttribute=o.offsetAttribute,this._arcType=e.defaultValue(o.arcType,r.ArcType.GEODESIC),this._groundBottomAltitude=e.defaultValue(o.groundBottomAltitude,void 0),this._groundExtrudedHeight=e.defaultValue(o.groundExtrudedHeight,0),this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0,this.packedLength=b.PolygonGeometryLibrary.computeHierarchyPackedLength(a)+t.Ellipsoid.packedLength+v.VertexFormat.packedLength+12}se.fromPositions=function(t){return new se({polygonHierarchy:{positions:(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions},height:t.height,extrudedHeight:t.extrudedHeight,vertexFormat:t.vertexFormat,stRotation:t.stRotation,ellipsoid:t.ellipsoid,granularity:t.granularity,perPositionHeight:t.perPositionHeight,closeTop:t.closeTop,closeBottom:t.closeBottom,offsetAttribute:t.offsetAttribute,arcType:t.arcType})},se.pack=function(r,o,a){return a=e.defaultValue(a,0),a=b.PolygonGeometryLibrary.packPolygonHierarchy(r._polygonHierarchy,o,a),t.Ellipsoid.pack(r._ellipsoid,o,a),a+=t.Ellipsoid.packedLength,v.VertexFormat.pack(r._vertexFormat,o,a),a+=v.VertexFormat.packedLength,o[a++]=r._height,o[a++]=r._extrudedHeight,o[a++]=r._granularity,o[a++]=r._stRotation,o[a++]=r._perPositionHeightExtrude?1:0,o[a++]=r._perPositionHeight?1:0,o[a++]=r._closeTop?1:0,o[a++]=r._closeBottom?1:0,o[a++]=r._shadowVolume?1:0,o[a++]=e.defaultValue(r._offsetAttribute,-1),o[a++]=r._arcType,o[a]=r.packedLength,o};var le=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),ue=new v.VertexFormat,ce={polygonHierarchy:{}};return se.unpack=function(r,o,a){o=e.defaultValue(o,0);var i=b.PolygonGeometryLibrary.unpackPolygonHierarchy(r,o);o=i.startingIndex,delete i.startingIndex;var n=t.Ellipsoid.unpack(r,o,le);o+=t.Ellipsoid.packedLength;var s=v.VertexFormat.unpack(r,o,ue);o+=v.VertexFormat.packedLength;var l=r[o++],u=r[o++],c=r[o++],p=r[o++],d=1===r[o++],g=1===r[o++],y=1===r[o++],m=1===r[o++],h=1===r[o++],f=r[o++],_=r[o++],P=r[o];return e.defined(a)||(a=new se(ce)),a._polygonHierarchy=i,a._ellipsoid=t.Ellipsoid.clone(n,a._ellipsoid),a._vertexFormat=v.VertexFormat.clone(s,a._vertexFormat),a._height=l,a._extrudedHeight=u,a._granularity=c,a._stRotation=p,a._perPositionHeightExtrude=d,a._perPositionHeight=g,a._closeTop=y,a._closeBottom=m,a._shadowVolume=h,a._offsetAttribute=-1===f?void 0:f,a._arcType=_,a.packedLength=P,a},se.computeRectangle=function(o,a){var i=e.defaultValue(o.granularity,h.CesiumMath.RADIANS_PER_DEGREE),n=e.defaultValue(o.arcType,r.ArcType.GEODESIC),s=o.polygonHierarchy,l=e.defaultValue(o.ellipsoid,t.Ellipsoid.WGS84);return re(s.positions,l,n,i,a)},se.createGeometry=function(t){var r=t._vertexFormat,a=t._ellipsoid,n=t._granularity,s=t._stRotation,u=t._polygonHierarchy,f=t._perPositionHeight,v=t._closeTop,P=t._closeBottom,x=t._arcType,C=u.positions;if(!(C.length<3)){var w=c.EllipsoidTangentPlane.fromPoints(C,a),A=b.PolygonGeometryLibrary.polygonsFromHierarchy(u,w.projectPointsOntoPlane.bind(w),!f,a),T=A.hierarchy,E=A.polygons;if(0!==T.length){C=T[0].outerRing;var I,G=b.PolygonGeometryLibrary.computeBoundingRectangle(w.plane.normal,w.projectPointOntoPlane.bind(w),C,s,R),V=[],F=t._height,H=t._extrudedHeight,N={perPositionHeight:f,vertexFormat:r,geometry:void 0,tangentPlane:w,boundingRectangle:G,ellipsoid:a,stRotation:s,bottom:!1,top:!0,wall:!1,extrude:!1,arcType:x};if(t._perPositionHeightExtrude||!h.CesiumMath.equalsEpsilon(F,H,0,h.CesiumMath.EPSILON2))for(N.extrude=!0,N.top=v,N.bottom=P,N.shadowVolume=t._shadowVolume,N.offsetAttribute=t._offsetAttribute,I=0;I<E.length;I++){var O,D=ne(a,E[I],n,T[I],f,v,P,r,x,t._extrudeOutering);v&&P?(O=D.topAndBottom,N.geometry=b.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(O.geometry,F,H,a,f)):v?((O=D.topAndBottom).geometry.attributes.position.values=_.PolygonPipeline.scaleToGeodeticHeight(O.geometry.attributes.position.values,F,a,!f),N.geometry=O.geometry):P&&((O=D.topAndBottom).geometry.attributes.position.values=_.PolygonPipeline.scaleToGeodeticHeight(O.geometry.attributes.position.values,H,a,!0),N.geometry=O.geometry),(v||P)&&(N.wall=!1,O.geometry=J(N),V.push(O));var L=D.walls;N.wall=!0;for(var M=0;M<L.length;M++){var B=L[M];N.geometry=b.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(B.geometry,F,H,a,f),B.geometry=J(N),V.push(B)}}else for(I=0;I<E.length;I++){var S=new d.GeometryInstance({geometry:b.PolygonGeometryLibrary.createGeometryFromPositions(a,E[I],n,f,r,x)});if(S.geometry.attributes.position.values=_.PolygonPipeline.scaleToGeodeticHeight(S.geometry.attributes.position.values,F,a,!f),N.geometry=S.geometry,S.geometry=J(N),e.defined(t._offsetAttribute)){var k=S.geometry.attributes.position.values.length,z=new Uint8Array(k/3),Y=t._offsetAttribute===g.GeometryOffsetAttribute.NONE?0:1;o.arrayFill(z,Y),S.geometry.attributes.applyOffset=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:z})}V.push(S)}var U=y.GeometryPipeline.combineInstances(V)[0];U.attributes.position.values=new Float64Array(U.attributes.position.values),U.indices=m.IndexDatatype.createTypedArray(U.attributes.position.values.length/3,U.indices);var W=U.attributes,j=i.BoundingSphere.fromVertices(W.position.values);return r.position||delete W.position,new p.Geometry({attributes:W,indices:U.indices,primitiveType:U.primitiveType,boundingSphere:j,offsetAttribute:t._offsetAttribute})}}},se.createShadowVolume=function(e,t,r){var o=e._granularity,a=e._ellipsoid,i=e._groundBottomAltitude+e._groundExtrudedHeight,n=e._groundBottomAltitude?e._groundBottomAltitude:t(o,a),s=i||r(o,a);return new se({polygonHierarchy:e._polygonHierarchy,ellipsoid:a,stRotation:e._stRotation,granularity:o,perPositionHeight:!1,extrudedHeight:n,height:s,vertexFormat:v.VertexFormat.POSITION_ONLY,shadowVolume:!0,arcType:e._arcType})},Object.defineProperties(se.prototype,{rectangle:{get:function(){if(!e.defined(this._rectangle)){var t=this._polygonHierarchy.positions;this._rectangle=re(t,this._ellipsoid,this._arcType,this._granularity)}return this._rectangle}},textureCoordinateRotationPoints:{get:function(){return e.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(e){var t=-e._stRotation;if(0===t)return[0,0,0,1,1,0];var r=e._ellipsoid,o=e._polygonHierarchy.positions,a=e.rectangle;return p.Geometry._textureCoordinateRotationPoints(o,t,r,a)}(this)),this._textureCoordinateRotationPoints}}}),function(r,o){return e.defined(o)&&(r=se.unpack(r,o)),r._ellipsoid=t.Ellipsoid.clone(r._ellipsoid),se.createGeometry(r)}}));