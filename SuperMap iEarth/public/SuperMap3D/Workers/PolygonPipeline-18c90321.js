define(["exports","./WindingOrder-4b7f0ae8","./Cartesian2-b18a5d2b","./Cartographic-bd336518","./Check-7b2a090c","./ComponentDatatype-c140a87d","./when-b60132fc","./EllipsoidRhumbLine-a4eddede","./GeometryAttribute-b4292e3e","./Math-09b0b739","./PrimitiveType-39acab88"],(function(a,e,t,i,r,n,s,u,o,p,h){"use strict";var d=new i.Cartesian3,l=new i.Cartesian3,m={computeArea2D:function(a){for(var e=a.length,t=0,i=e-1,r=0;r<e;i=r++){var n=a[i],s=a[r];t+=n.x*s.y-s.x*n.y}return.5*t},computeWindingOrder2D:function(a){return m.computeArea2D(a)>0?e.WindingOrder.COUNTER_CLOCKWISE:e.WindingOrder.CLOCKWISE},triangulate:function(a,i){var r=t.Cartesian2.packArray(a);return e.earcut(r,i,2)}},c=new i.Cartesian3,C=new i.Cartesian3,y=new i.Cartesian3,f=new i.Cartesian3,g=new i.Cartesian3,v=new i.Cartesian3,b=new i.Cartesian3;m.computeSubdivision=function(a,e,t,r,u){u=s.defaultValue(u,!1),r=s.defaultValue(r,p.CesiumMath.RADIANS_PER_DEGREE);var d,l=t.slice(0),m=e.length,w=new Array(3*m),A=0;for(d=0;d<m;d++){var E=e[d];w[A++]=E.x,w[A++]=E.y,w[A++]=E.z}for(var x=[],S={},M=a.maximumRadius,R=p.CesiumMath.chordLength(r,M),D=R*R;l.length>0;){var L,T,z=l.pop(),G=l.pop(),P=l.pop(),B=i.Cartesian3.fromArray(w,3*P,c),O=i.Cartesian3.fromArray(w,3*G,C),W=i.Cartesian3.fromArray(w,3*z,y),I=u?B:i.Cartesian3.multiplyByScalar(i.Cartesian3.normalize(B,f),M,f),N=u?O:i.Cartesian3.multiplyByScalar(i.Cartesian3.normalize(O,g),M,g),U=u?W:i.Cartesian3.multiplyByScalar(i.Cartesian3.normalize(W,v),M,v),V=i.Cartesian3.magnitudeSquared(i.Cartesian3.subtract(I,N,b)),_=i.Cartesian3.magnitudeSquared(i.Cartesian3.subtract(N,U,b)),q=i.Cartesian3.magnitudeSquared(i.Cartesian3.subtract(U,I,b)),F=Math.max(V,_,q);F>D?V===F?(d=S[L=Math.min(P,G)+" "+Math.max(P,G)],s.defined(d)||(T=i.Cartesian3.add(B,O,b),i.Cartesian3.multiplyByScalar(T,.5,T),w.push(T.x,T.y,T.z),d=w.length/3-1,S[L]=d),l.push(P,d,z),l.push(d,G,z)):_===F?(d=S[L=Math.min(G,z)+" "+Math.max(G,z)],s.defined(d)||(T=i.Cartesian3.add(O,W,b),i.Cartesian3.multiplyByScalar(T,.5,T),w.push(T.x,T.y,T.z),d=w.length/3-1,S[L]=d),l.push(G,d,P),l.push(d,z,P)):q===F&&(d=S[L=Math.min(z,P)+" "+Math.max(z,P)],s.defined(d)||(T=i.Cartesian3.add(W,B,b),i.Cartesian3.multiplyByScalar(T,.5,T),w.push(T.x,T.y,T.z),d=w.length/3-1,S[L]=d),l.push(z,d,G),l.push(d,P,G)):(x.push(P),x.push(G),x.push(z))}return new o.Geometry({attributes:{position:new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:w})},indices:x,primitiveType:h.PrimitiveType.TRIANGLES})};var w=new i.Cartographic,A=new i.Cartographic,E=new i.Cartographic,x=new i.Cartographic;m.computeRhumbLineSubdivision=function(a,e,t,r){r=s.defaultValue(r,p.CesiumMath.RADIANS_PER_DEGREE);var d,l=t.slice(0),m=e.length,f=new Array(3*m),g=0;for(d=0;d<m;d++){var v=e[d];f[g++]=v.x,f[g++]=v.y,f[g++]=v.z}for(var S=[],M={},R=a.maximumRadius,D=p.CesiumMath.chordLength(r,R),L=new u.EllipsoidRhumbLine(void 0,void 0,a),T=new u.EllipsoidRhumbLine(void 0,void 0,a),z=new u.EllipsoidRhumbLine(void 0,void 0,a);l.length>0;){var G=l.pop(),P=l.pop(),B=l.pop(),O=i.Cartesian3.fromArray(f,3*B,c),W=i.Cartesian3.fromArray(f,3*P,C),I=i.Cartesian3.fromArray(f,3*G,y),N=a.cartesianToCartographic(O,w),U=a.cartesianToCartographic(W,A),V=a.cartesianToCartographic(I,E);L.setEndPoints(N,U);var _=L.surfaceDistance;T.setEndPoints(U,V);var q=T.surfaceDistance;z.setEndPoints(V,N);var F,k,K,H,j=z.surfaceDistance,J=Math.max(_,q,j);J>D?_===J?(d=M[F=Math.min(B,P)+" "+Math.max(B,P)],s.defined(d)||(k=L.interpolateUsingFraction(.5,x),K=.5*(N.height+U.height),H=i.Cartesian3.fromRadians(k.longitude,k.latitude,K,a,b),f.push(H.x,H.y,H.z),d=f.length/3-1,M[F]=d),l.push(B,d,G),l.push(d,P,G)):q===J?(d=M[F=Math.min(P,G)+" "+Math.max(P,G)],s.defined(d)||(k=T.interpolateUsingFraction(.5,x),K=.5*(U.height+V.height),H=i.Cartesian3.fromRadians(k.longitude,k.latitude,K,a,b),f.push(H.x,H.y,H.z),d=f.length/3-1,M[F]=d),l.push(P,d,B),l.push(d,G,B)):j===J&&(d=M[F=Math.min(G,B)+" "+Math.max(G,B)],s.defined(d)||(k=z.interpolateUsingFraction(.5,x),K=.5*(V.height+N.height),H=i.Cartesian3.fromRadians(k.longitude,k.latitude,K,a,b),f.push(H.x,H.y,H.z),d=f.length/3-1,M[F]=d),l.push(G,d,P),l.push(d,B,P)):(S.push(B),S.push(P),S.push(G))}return new o.Geometry({attributes:{position:new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f})},indices:S,primitiveType:h.PrimitiveType.TRIANGLES})},m.scaleToGeodeticHeight=function(a,e,r,n){r=s.defaultValue(r,t.Ellipsoid.WGS84);var u=d,o=l;if(e=s.defaultValue(e,0),n=s.defaultValue(n,!0),s.defined(a))for(var p=a.length,h=0;h<p;h+=3)i.Cartesian3.fromArray(a,h,o),n&&(o=r.scaleToGeodeticSurface(o,o)),0!==e&&(u=r.geodeticSurfaceNormal(o,u),i.Cartesian3.multiplyByScalar(u,e,u),i.Cartesian3.add(o,u,o)),a[h]=o.x,a[h+1]=o.y,a[h+2]=o.z;return a},a.PolygonPipeline=m}));