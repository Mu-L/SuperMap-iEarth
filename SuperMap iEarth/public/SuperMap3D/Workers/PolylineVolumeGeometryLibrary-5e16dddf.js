define(["exports","./Cartesian2-54f49cd5","./Cartographic-9ee1f1bd","./Cartesian4-6d2e270a","./EllipsoidTangentPlane-3d01b139","./Math-4ffce144","./Matrix4-52faaaf8","./PolylinePipeline-f897b61d","./GeometryAttribute-84124076"],(function(a,e,r,t,n,i,s,o,l){"use strict";var C=Object.freeze({ROUNDED:0,MITERED:1,BEVELED:2}),c=[new r.Cartesian3,new r.Cartesian3],u=new r.Cartesian3,y=new r.Cartesian3,m=new r.Cartesian3,d=new r.Cartesian3,p=new r.Cartesian3,f=new r.Cartesian3,g=new r.Cartesian3,v=new r.Cartesian3,h=new r.Cartesian3,x=new r.Cartesian3,w=new r.Cartesian3,M={},P=new r.Cartographic;function E(a,e){for(var r=new Array(a.length),t=0;t<a.length;t++){var n=a[t];P=e.cartesianToCartographic(n,P),r[t]=P.height,a[t]=e.scaleToGeodeticSurface(n,n)}return r}function B(a,e,t,n){var i,s=a[0],o=a[1],l=r.Cartesian3.angleBetween(s,o),C=Math.ceil(l/n),c=new Array(C);if(e===t){for(i=0;i<C;i++)c[i]=e;return c.push(t),c}var u=(t-e)/C;for(i=1;i<C;i++){var y=e+i*u;c[i]=y}return c[0]=e,c.push(t),c}var T=new r.Cartesian3,z=new r.Cartesian3;function S(a,t,i,s){var o=new n.EllipsoidTangentPlane(i,s),l=o.projectPointOntoPlane(r.Cartesian3.add(i,a,T),T),C=o.projectPointOntoPlane(r.Cartesian3.add(i,t,z),z),c=e.Cartesian2.angleBetween(l,C);return C.x*l.y-C.y*l.x>=0?-c:c}var A=new r.Cartesian3(-1,0,0),b=s.Matrix4.clone(s.Matrix4.IDENTITY),D=new s.Matrix4,N=new s.Matrix3,O=s.Matrix3.IDENTITY.clone(),V=new r.Cartesian3,R=new t.Cartesian4,I=new r.Cartesian3;function L(a,e,t,n,i,o,C,c){var u=V,y=R;b=l.Transforms.eastNorthUpToFixedFrame(a,i,b),u=s.Matrix4.multiplyByPointAsVector(b,A,u);var m=S(u=r.Cartesian3.normalize(u,u),e,a,i);N=s.Matrix3.fromRotationZ(m,N),I.z=o,b=s.Matrix4.multiplyTransformation(b,s.Matrix4.fromRotationTranslation(N,I,D),b);var d=O;d[0]=C;for(var p=0;p<c;p++)for(var f=0;f<t.length;f+=3)y=r.Cartesian3.fromArray(t,f,y),y=s.Matrix3.multiplyByVector(d,y,y),y=s.Matrix4.multiplyByPoint(b,y,y),n.push(y.x,y.y,y.z);return n}function F(a,e,t,n,i,o,C,c,u){var y=V,m=R;b=l.Transforms.eastNorthUpToFixedFrame(a,i,b),y=s.Matrix4.multiplyByPointAsVector(b,A,y);var d=S(y=r.Cartesian3.normalize(y,y),e,a,i);N=s.Matrix3.fromRotationZ(d,N),I.z=o,b=s.Matrix4.multiplyTransformation(b,s.Matrix4.fromRotationTranslation(N,I,D),b);var p=O;p[0]=C;for(var f=0;f<c;f++)for(var g=0;g<t.length;g+=3)m=r.Cartesian3.fromArray(t,g,m),m=s.Matrix3.multiplyByVector(p,m,m),m=s.Matrix4.multiplyByPoint(b,m,m),m=s.Matrix4.multiplyByPoint(u,m,m),n.push(m.x,m.y,m.z);return n}var G=new r.Cartesian3;function U(a,e,t,n,i,s,o){for(var l=0;l<a.length;l+=3){n=L(r.Cartesian3.fromArray(a,l,G),e,t,n,i,s[l/3],o,1)}return n}function _(a,e){var r=a.length,t=new Array(6*r),n=0,i=e.x+e.width/2,s=e.y+e.height/2,o=a[0];t[n++]=o.x-i,t[n++]=0,t[n++]=o.y-s;for(var l=1;l<r;l++){var C=(o=a[l]).x-i,c=o.y-s;t[n++]=C,t[n++]=0,t[n++]=c,t[n++]=C,t[n++]=0,t[n++]=c}return o=a[0],t[n++]=o.x-i,t[n++]=0,t[n++]=o.y-s,t}function j(a,e){for(var r=a.length,t=new Array(3*r),n=0,i=e.x+e.width/2,s=e.y+e.height/2,o=0;o<r;o++)t[n++]=a[o].x-i,t[n++]=0,t[n++]=a[o].y-s;return t}var Q=new l.Quaternion,q=new r.Cartesian3,Y=new s.Matrix3;function Z(a,e,t,n,o,c,u,y,m,d){var p,f,g=r.Cartesian3.angleBetween(r.Cartesian3.subtract(e,a,x),r.Cartesian3.subtract(t,a,w)),v=n===C.BEVELED?0:Math.ceil(g/i.CesiumMath.toRadians(5));if(p=o?s.Matrix3.fromQuaternion(l.Quaternion.fromAxisAngle(r.Cartesian3.negate(a,x),g/(v+1),Q),Y):s.Matrix3.fromQuaternion(l.Quaternion.fromAxisAngle(a,g/(v+1),Q),Y),e=r.Cartesian3.clone(e,q),v>0)for(var h=d?2:1,M=0;M<v;M++)e=s.Matrix3.multiplyByVector(p,e,e),f=r.Cartesian3.subtract(e,a,x),f=r.Cartesian3.normalize(f,f),o||(f=r.Cartesian3.negate(f,f)),u=L(c.scaleToGeodeticSurface(e,w),f,y,u,c,m,1,h);else f=r.Cartesian3.subtract(e,a,x),f=r.Cartesian3.normalize(f,f),o||(f=r.Cartesian3.negate(f,f)),u=L(c.scaleToGeodeticSurface(e,w),f,y,u,c,m,1,1),t=r.Cartesian3.clone(t,q),f=r.Cartesian3.subtract(t,a,x),f=r.Cartesian3.normalize(f,f),o||(f=r.Cartesian3.negate(f,f)),u=L(c.scaleToGeodeticSurface(t,w),f,y,u,c,m,1,1);return u}M.removeDuplicatesFromShape=function(a){for(var r=a.length,t=[],n=r-1,i=0;i<r;n=i++){var s=a[n],o=a[i];e.Cartesian2.equals(s,o)||t.push(o)}return t},M.angleIsGreaterThanPi=function(a,e,t,i){var s=new n.EllipsoidTangentPlane(t,i),o=s.projectPointOntoPlane(r.Cartesian3.add(t,a,T),T),l=s.projectPointOntoPlane(r.Cartesian3.add(t,e,z),z);return l.x*o.y-l.y*o.x>=0};var k=new r.Cartesian3,H=new r.Cartesian3;M.computePositions=function(a,e,t,n,s){var l=n._ellipsoid,w=E(a,l),P=n._granularity,T=n._cornerType,z=s?_(e,t):j(e,t),S=s?j(e,t):void 0,A=t.height/2,b=t.width/2,D=a.length,N=[],O=s?[]:void 0,V=u,R=y,I=m,F=d,G=p,Q=f,q=g,Y=v,J=h,K=a[0],W=a[1];F=l.geodeticSurfaceNormal(K,F),V=r.Cartesian3.subtract(W,K,V),V=r.Cartesian3.normalize(V,V),Y=r.Cartesian3.cross(F,V,Y),Y=r.Cartesian3.normalize(Y,Y);var X,$=w[0],aa=w[1];s&&(O=L(K,Y,S,O,l,$+A,1,1)),J=r.Cartesian3.clone(K,J),K=W,R=r.Cartesian3.negate(V,R);for(var ea=1;ea<D-1;ea++){var ra=s?2:1;W=a[ea+1],V=r.Cartesian3.subtract(W,K,V),V=r.Cartesian3.normalize(V,V),I=r.Cartesian3.add(V,R,I),I=r.Cartesian3.normalize(I,I),F=l.geodeticSurfaceNormal(K,F);var ta=r.Cartesian3.multiplyByScalar(F,r.Cartesian3.dot(V,F),k);r.Cartesian3.subtract(V,ta,ta),r.Cartesian3.normalize(ta,ta);var na=r.Cartesian3.multiplyByScalar(F,r.Cartesian3.dot(R,F),H);if(r.Cartesian3.subtract(R,na,na),r.Cartesian3.normalize(na,na),!i.CesiumMath.equalsEpsilon(Math.abs(r.Cartesian3.dot(ta,na)),1,i.CesiumMath.EPSILON7)){I=r.Cartesian3.cross(I,F,I),I=r.Cartesian3.cross(F,I,I),I=r.Cartesian3.normalize(I,I);var ia=1/Math.max(.25,r.Cartesian3.magnitude(r.Cartesian3.cross(I,R,x))),sa=M.angleIsGreaterThanPi(V,R,K,l);sa?(G=r.Cartesian3.add(K,r.Cartesian3.multiplyByScalar(I,ia*b,I),G),Q=r.Cartesian3.add(G,r.Cartesian3.multiplyByScalar(Y,b,Q),Q),c[0]=r.Cartesian3.clone(J,c[0]),c[1]=r.Cartesian3.clone(Q,c[1]),X=B(c,$+A,aa+A,P),N=U(o.PolylinePipeline.generateArc({positions:c,granularity:P,ellipsoid:l}),Y,z,N,l,X,1),Y=r.Cartesian3.cross(F,V,Y),Y=r.Cartesian3.normalize(Y,Y),q=r.Cartesian3.add(G,r.Cartesian3.multiplyByScalar(Y,b,q),q),T===C.ROUNDED||T===C.BEVELED?Z(G,Q,q,T,sa,l,N,z,aa+A,s):N=L(K,I=r.Cartesian3.negate(I,I),z,N,l,aa+A,ia,ra),J=r.Cartesian3.clone(q,J)):(G=r.Cartesian3.add(K,r.Cartesian3.multiplyByScalar(I,ia*b,I),G),Q=r.Cartesian3.add(G,r.Cartesian3.multiplyByScalar(Y,-b,Q),Q),c[0]=r.Cartesian3.clone(J,c[0]),c[1]=r.Cartesian3.clone(Q,c[1]),X=B(c,$+A,aa+A,P),N=U(o.PolylinePipeline.generateArc({positions:c,granularity:P,ellipsoid:l}),Y,z,N,l,X,1),Y=r.Cartesian3.cross(F,V,Y),Y=r.Cartesian3.normalize(Y,Y),q=r.Cartesian3.add(G,r.Cartesian3.multiplyByScalar(Y,-b,q),q),T===C.ROUNDED||T===C.BEVELED?Z(G,Q,q,T,sa,l,N,z,aa+A,s):N=L(K,I,z,N,l,aa+A,ia,ra),J=r.Cartesian3.clone(q,J)),R=r.Cartesian3.negate(V,R)}else N=L(J,Y,z,N,l,$+A,1,1),J=K;$=aa,aa=w[ea+1],K=W}c[0]=r.Cartesian3.clone(J,c[0]),c[1]=r.Cartesian3.clone(K,c[1]),X=B(c,$+A,aa+A,P),N=U(o.PolylinePipeline.generateArc({positions:c,granularity:P,ellipsoid:l}),Y,z,N,l,X,1),s&&(O=L(K,Y,S,O,l,aa+A,1,1)),D=N.length;var oa=s?D+O.length:D,la=new Float64Array(oa);return la.set(N),s&&la.set(O,D),la},M.computeLocalPositions=function(a,e,t,n,w,P){var T=n._ellipsoid,z=E(a,T),S=n._granularity,A=n._cornerType,b=w?_(e,t):j(e,t),D=w?j(e,t):void 0,N=t.width/2,O=a.length,V=[],R=w?[]:void 0,I=u,L=y,Q=m,q=d,Y=p,J=f,K=g,W=v,X=h,$=l.Transforms.eastNorthUpToFixedFrame(P,T,new s.Matrix4),aa=s.Matrix4.inverse($,new s.Matrix4),ea=a[0],ra=a[1];q=T.geodeticSurfaceNormal(ea,q),I=r.Cartesian3.subtract(ra,ea,I),I=r.Cartesian3.normalize(I,I),W=r.Cartesian3.cross(q,I,W),W=r.Cartesian3.normalize(W,W);var ta,na=z[0],ia=z[1];w&&(R=F(ea,W,D,R,T,na+0,1,1,aa)),X=r.Cartesian3.clone(ea,X),ea=ra,L=r.Cartesian3.negate(I,L);for(var sa=1;sa<O-1;sa++){var oa=w?2:1;ra=a[sa+1],I=r.Cartesian3.subtract(ra,ea,I),I=r.Cartesian3.normalize(I,I),Q=r.Cartesian3.add(I,L,Q),Q=r.Cartesian3.normalize(Q,Q),q=T.geodeticSurfaceNormal(ea,q);var la=r.Cartesian3.multiplyByScalar(q,r.Cartesian3.dot(I,q),k);r.Cartesian3.subtract(I,la,la),r.Cartesian3.normalize(la,la);var Ca=r.Cartesian3.multiplyByScalar(q,r.Cartesian3.dot(L,q),H);if(r.Cartesian3.subtract(L,Ca,Ca),r.Cartesian3.normalize(Ca,Ca),!i.CesiumMath.equalsEpsilon(Math.abs(r.Cartesian3.dot(la,Ca)),1,i.CesiumMath.EPSILON7)){Q=r.Cartesian3.cross(Q,q,Q),Q=r.Cartesian3.cross(q,Q,Q),Q=r.Cartesian3.normalize(Q,Q);var ca=1/Math.max(.25,r.Cartesian3.magnitude(r.Cartesian3.cross(Q,L,x))),ua=M.angleIsGreaterThanPi(I,L,ea,T);ua?(Y=r.Cartesian3.add(ea,r.Cartesian3.multiplyByScalar(Q,ca*N,Q),Y),J=r.Cartesian3.add(Y,r.Cartesian3.multiplyByScalar(W,N,J),J),c[0]=r.Cartesian3.clone(X,c[0]),c[1]=r.Cartesian3.clone(J,c[1]),ta=B(c,na+0,ia+0,S),V=U(o.PolylinePipeline.generateArc({positions:c,granularity:S,ellipsoid:T}),W,b,V,T,ta,1,fromEnu),W=r.Cartesian3.cross(q,I,W),W=r.Cartesian3.normalize(W,W),K=r.Cartesian3.add(Y,r.Cartesian3.multiplyByScalar(W,N,K),K),A===C.ROUNDED||A===C.BEVELED?Z(Y,J,K,A,ua,T,V,b,ia+0,w):V=F(ea,Q=r.Cartesian3.negate(Q,Q),b,V,T,ia+0,ca,oa,aa),X=r.Cartesian3.clone(K,X)):(Y=r.Cartesian3.add(ea,r.Cartesian3.multiplyByScalar(Q,ca*N,Q),Y),J=r.Cartesian3.add(Y,r.Cartesian3.multiplyByScalar(W,-N,J),J),c[0]=r.Cartesian3.clone(X,c[0]),c[1]=r.Cartesian3.clone(J,c[1]),ta=B(c,na+0,ia+0,S),V=U(o.PolylinePipeline.generateArc({positions:c,granularity:S,ellipsoid:T}),W,b,V,T,ta,1),W=r.Cartesian3.cross(q,I,W),W=r.Cartesian3.normalize(W,W),K=r.Cartesian3.add(Y,r.Cartesian3.multiplyByScalar(W,-N,K),K),A===C.ROUNDED||A===C.BEVELED?Z(Y,J,K,A,ua,T,V,b,ia+0,w):V=F(ea,Q,b,V,T,ia+0,ca,oa,aa),X=r.Cartesian3.clone(K,X)),L=r.Cartesian3.negate(I,L)}else V=F(X,W,b,V,T,na+0,1,1,aa),X=ea;na=ia,ia=z[sa+1],ea=ra}c[0]=r.Cartesian3.clone(X,c[0]),c[1]=r.Cartesian3.clone(ea,c[1]),ta=B(c,na+0,ia+0,S),V=function(a,e,t,n,i,s,o,l){for(var C=0;C<a.length;C+=3)n=F(r.Cartesian3.fromArray(a,C,G),e,t,n,i,s[C/3],o,1,l);return n}(o.PolylinePipeline.generateArc({positions:c,granularity:S,ellipsoid:T}),W,b,V,T,ta,1,aa),w&&(R=F(ea,W,D,R,T,ia+0,1,1,aa)),O=V.length;var ya=w?O+R.length:O,ma=new Float64Array(ya);return ma.set(V),w&&ma.set(R,O),ma},a.CornerType=C,a.PolylineVolumeGeometryLibrary=M}));