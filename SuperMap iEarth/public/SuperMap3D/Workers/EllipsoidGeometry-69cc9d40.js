define(["exports","./arrayFill-0e93951b","./buildModuleUrl-9403d69d","./Cartesian2-54f49cd5","./Cartographic-9ee1f1bd","./ComponentDatatype-94b9147c","./when-7d8885d2","./Check-737bd4ec","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./GeometryOffsetAttribute-fbeb6f1a","./IndexDatatype-cb5f74b7","./Math-4ffce144","./FeatureDetection-07e177c7","./VertexFormat-86386b6b"],(function(t,e,a,i,r,n,o,m,s,u,l,f,c,d,C){"use strict";var p=new r.Cartesian3,y=new r.Cartesian3,_=new r.Cartesian3,h=new r.Cartesian3,v=new r.Cartesian3(1,1,1),b=Math.cos,A=Math.sin;function x(t){t=o.defaultValue(t,o.defaultValue.EMPTY_OBJECT);var e=o.defaultValue(t.radii,v),a=o.defaultValue(t.innerRadii,e),i=o.defaultValue(t.minimumClock,0),n=o.defaultValue(t.maximumClock,c.CesiumMath.TWO_PI),m=o.defaultValue(t.minimumCone,0),s=o.defaultValue(t.maximumCone,c.CesiumMath.PI),u=Math.round(o.defaultValue(t.stackPartitions,64)),l=Math.round(o.defaultValue(t.slicePartitions,64)),f=o.defaultValue(t.vertexFormat,C.VertexFormat.DEFAULT);this._radii=r.Cartesian3.clone(e),this._innerRadii=r.Cartesian3.clone(a),this._minimumClock=i,this._maximumClock=n,this._minimumCone=m,this._maximumCone=s,this._stackPartitions=u,this._slicePartitions=l,this._vertexFormat=C.VertexFormat.clone(f),this._offsetAttribute=t.offsetAttribute,this._workerName="createEllipsoidGeometry"}x.packedLength=2*r.Cartesian3.packedLength+C.VertexFormat.packedLength+7,x.pack=function(t,e,a){return a=o.defaultValue(a,0),r.Cartesian3.pack(t._radii,e,a),a+=r.Cartesian3.packedLength,r.Cartesian3.pack(t._innerRadii,e,a),a+=r.Cartesian3.packedLength,C.VertexFormat.pack(t._vertexFormat,e,a),a+=C.VertexFormat.packedLength,e[a++]=t._minimumClock,e[a++]=t._maximumClock,e[a++]=t._minimumCone,e[a++]=t._maximumCone,e[a++]=t._stackPartitions,e[a++]=t._slicePartitions,e[a]=o.defaultValue(t._offsetAttribute,-1),e};var k,F=new r.Cartesian3,w=new r.Cartesian3,P=new C.VertexFormat,g={radii:F,innerRadii:w,vertexFormat:P,minimumClock:void 0,maximumClock:void 0,minimumCone:void 0,maximumCone:void 0,stackPartitions:void 0,slicePartitions:void 0,offsetAttribute:void 0};x.unpack=function(t,e,a){e=o.defaultValue(e,0);var i=r.Cartesian3.unpack(t,e,F);e+=r.Cartesian3.packedLength;var n=r.Cartesian3.unpack(t,e,w);e+=r.Cartesian3.packedLength;var m=C.VertexFormat.unpack(t,e,P);e+=C.VertexFormat.packedLength;var s=t[e++],u=t[e++],l=t[e++],f=t[e++],c=t[e++],d=t[e++],p=t[e];return o.defined(a)?(a._radii=r.Cartesian3.clone(i,a._radii),a._innerRadii=r.Cartesian3.clone(n,a._innerRadii),a._vertexFormat=C.VertexFormat.clone(m,a._vertexFormat),a._minimumClock=s,a._maximumClock=u,a._minimumCone=l,a._maximumCone=f,a._stackPartitions=c,a._slicePartitions=d,a._offsetAttribute=-1===p?void 0:p,a):(g.minimumClock=s,g.maximumClock=u,g.minimumCone=l,g.maximumCone=f,g.stackPartitions=c,g.slicePartitions=d,g.offsetAttribute=-1===p?void 0:p,new x(g))},x.createGeometry=function(t){var m=t._radii;if(!(m.x<=0||m.y<=0||m.z<=0)){var C=t._innerRadii;if(!(C.x<=0||C.y<=0||C.z<=0)){var v,x,k=t._minimumClock,F=t._maximumClock,w=t._minimumCone,P=t._maximumCone,g=t._vertexFormat,V=t._slicePartitions+1,M=t._stackPartitions+1;(V=Math.round(V*Math.abs(F-k)/c.CesiumMath.TWO_PI))<2&&(V=2),(M=Math.round(M*Math.abs(P-w)/c.CesiumMath.PI))<2&&(M=2);var T=0,D=[w],G=[k];for(v=0;v<M;v++)D.push(w+v*(P-w)/(M-1));for(D.push(P),x=0;x<V;x++)G.push(k+x*(F-k)/(V-1));G.push(F);var O=D.length,I=G.length,L=0,E=1,z=C.x!==m.x||C.y!==m.y||C.z!==m.z,N=!1,R=!1,U=!1;z&&(E=2,w>0&&(N=!0,L+=V-1),P<Math.PI&&(R=!0,L+=V-1),(F-k)%c.CesiumMath.TWO_PI?(U=!0,L+=2*(M-1)+1):L+=1);var S=I*O*E,W=new Float64Array(3*S),B=e.arrayFill(new Array(S),!1),Y=e.arrayFill(new Array(S),!1),J=V*M*E,X=6*(J+L+1-(V+M)*E),Z=f.IndexDatatype.createTypedArray(J,X),j=g.normal?new Float32Array(3*S):void 0,q=g.tangent?new Float32Array(3*S):void 0,H=g.bitangent?new Float32Array(3*S):void 0,K=g.st?new Float32Array(2*S):void 0,Q=new Array(O),$=new Array(O);for(v=0;v<O;v++)Q[v]=A(D[v]),$[v]=b(D[v]);var tt=new Array(I),et=new Array(I);for(x=0;x<I;x++)et[x]=b(G[x]),tt[x]=A(G[x]);for(v=0;v<O;v++)for(x=0;x<I;x++)W[T++]=m.x*Q[v]*et[x],W[T++]=m.y*Q[v]*tt[x],W[T++]=m.z*$[v];var at,it,rt,nt,ot=S/2;if(z)for(v=0;v<O;v++)for(x=0;x<I;x++)W[T++]=C.x*Q[v]*et[x],W[T++]=C.y*Q[v]*tt[x],W[T++]=C.z*$[v],B[ot]=!0,v>0&&v!==O-1&&0!==x&&x!==I-1&&(Y[ot]=!0),ot++;for(T=0,v=1;v<O-2;v++)for(at=v*I,it=(v+1)*I,x=1;x<I-2;x++)Z[T++]=it+x,Z[T++]=it+x+1,Z[T++]=at+x+1,Z[T++]=it+x,Z[T++]=at+x+1,Z[T++]=at+x;if(z){var mt=O*I;for(v=1;v<O-2;v++)for(at=mt+v*I,it=mt+(v+1)*I,x=1;x<I-2;x++)Z[T++]=it+x,Z[T++]=at+x,Z[T++]=at+x+1,Z[T++]=it+x,Z[T++]=at+x+1,Z[T++]=it+x+1}if(z){if(N)for(nt=O*I,v=1;v<I-2;v++)Z[T++]=v,Z[T++]=v+1,Z[T++]=nt+v+1,Z[T++]=v,Z[T++]=nt+v+1,Z[T++]=nt+v;if(R)for(rt=O*I-I,nt=O*I*E-I,v=1;v<I-2;v++)Z[T++]=rt+v+1,Z[T++]=rt+v,Z[T++]=nt+v,Z[T++]=rt+v+1,Z[T++]=nt+v,Z[T++]=nt+v+1}if(U){for(v=1;v<O-2;v++)nt=I*O+I*v,rt=I*v,Z[T++]=nt,Z[T++]=rt+I,Z[T++]=rt,Z[T++]=nt,Z[T++]=nt+I,Z[T++]=rt+I;for(v=1;v<O-2;v++)nt=I*O+I*(v+1)-1,rt=I*(v+1)-1,Z[T++]=rt+I,Z[T++]=nt,Z[T++]=rt,Z[T++]=rt+I,Z[T++]=nt+I,Z[T++]=nt}var st=new u.GeometryAttributes;g.position&&(st.position=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:W}));var ut,lt=0,ft=0,ct=0,dt=0,Ct=S/2,pt=i.Ellipsoid.fromCartesian3(m),yt=i.Ellipsoid.fromCartesian3(C);if(g.st||g.normal||g.tangent||g.bitangent){for(v=0;v<S;v++){ut=B[v]?yt:pt;var _t=r.Cartesian3.fromArray(W,3*v,p),ht=ut.geodeticSurfaceNormal(_t,y);if(g.st){var vt=Math.atan2(ht.y,ht.x);vt<0&&(vt+=c.CesiumMath.TWO_PI),K[lt++]=vt/c.CesiumMath.TWO_PI,K[lt++]=Math.asin(ht.z)/Math.PI+.5}if(g.normal&&(Y[v]&&r.Cartesian3.negate(ht,ht),j[ft++]=ht.x,j[ft++]=ht.y,j[ft++]=ht.z),g.tangent||g.bitangent){var bt,At=_,xt=0;if(B[v]&&(xt=Ct),bt=!N&&v>=xt&&v<xt+2*I?r.Cartesian3.UNIT_X:r.Cartesian3.UNIT_Z,r.Cartesian3.cross(bt,ht,At),r.Cartesian3.normalize(At,At),g.tangent&&(q[ct++]=At.x,q[ct++]=At.y,q[ct++]=At.z),g.bitangent){var kt=r.Cartesian3.cross(ht,At,h);r.Cartesian3.normalize(kt,kt),H[dt++]=kt.x,H[dt++]=kt.y,H[dt++]=kt.z}}}g.st&&(st.st=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:K})),g.normal&&(st.normal=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:j})),g.tangent&&(st.tangent=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:q})),g.bitangent&&(st.bitangent=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:H}))}if(o.defined(t._offsetAttribute)){var Ft=W.length,wt=new Uint8Array(Ft/3),Pt=t._offsetAttribute===l.GeometryOffsetAttribute.NONE?0:1;e.arrayFill(wt,Pt),st.applyOffset=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:wt})}return new s.Geometry({attributes:st,indices:Z,primitiveType:d.PrimitiveType.TRIANGLES,boundingSphere:a.BoundingSphere.fromEllipsoid(pt),offsetAttribute:t._offsetAttribute})}}},x.getUnitEllipsoid=function(){return o.defined(k)||(k=x.createGeometry(new x({radii:new r.Cartesian3(1,1,1),vertexFormat:C.VertexFormat.POSITION_ONLY}))),k},t.EllipsoidGeometry=x}));