define(["./when-7d8885d2","./Cartesian2-54f49cd5","./ArcType-29cf2197","./arrayRemoveDuplicates-30a3675e","./buildModuleUrl-9403d69d","./Cartographic-9ee1f1bd","./Color-1274f10e","./ComponentDatatype-94b9147c","./Check-737bd4ec","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./IndexDatatype-cb5f74b7","./Math-4ffce144","./PolylinePipeline-89be7253","./FeatureDetection-07e177c7","./VertexFormat-86386b6b","./Event-1c0f5ff4","./RuntimeError-f53bcb51","./WebGLConstants-6b41cc89","./Cartesian4-6d2e270a","./EllipsoidGeodesic-83f454fb","./EllipsoidRhumbLine-fd512dba","./IntersectionTests-6a0482c9","./Plane-74ce87e7"],(function(e,t,r,a,o,i,n,l,s,p,d,c,u,y,f,m,h,v,C,_,A,b,g,E){"use strict";var w=[];function P(e,t,r,a,o){var i,l=w;l.length=o;var s=r.red,p=r.green,d=r.blue,c=r.alpha,u=a.red,y=a.green,f=a.blue,m=a.alpha;if(n.Color.equals(r,a)){for(i=0;i<o;i++)l[i]=n.Color.clone(r);return l}var h=(u-s)/o,v=(y-p)/o,C=(f-d)/o,_=(m-c)/o;for(i=0;i<o;i++)l[i]=new n.Color(s+i*h,p+i*v,d+i*C,c+i*_);return l}function T(a){var l,s,p=(a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT)).positions,d=a.colors,c=e.defaultValue(a.width,1),y=e.defaultValue(a.hMax,-1),f=e.defaultValue(a.colorsPerVertex,!1);this._positions=p,this._colors=d,this._width=c,this._hMax=y,this._colorsPerVertex=f,this._dist=a.dist,this._period=a.period,this._vertexFormat=m.VertexFormat.clone(e.defaultValue(a.vertexFormat,m.VertexFormat.DEFAULT)),this._followSurface=e.defaultValue(a.followSurface,!0),e.defined(a.followSurface)&&(l="PolylineGeometry.followSurface",s="PolylineGeometry.followSurface is deprecated and will be removed in SuperMap3D. Use PolylineGeometry.arcType instead.",o.oneTimeWarning(l,s),a.arcType=a.followSurface?r.ArcType.GEODESIC:r.ArcType.NONE),this._arcType=e.defaultValue(a.arcType,r.ArcType.GEODESIC),this._followSurface=this._arcType!==r.ArcType.NONE,this._granularity=e.defaultValue(a.granularity,u.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=t.Ellipsoid.clone(e.defaultValue(a.ellipsoid,t.Ellipsoid.WGS84)),this._workerName="createPolylineGeometry";var h=1+p.length*i.Cartesian3.packedLength;h+=e.defined(d)?1+d.length*n.Color.packedLength:1,this.packedLength=h+t.Ellipsoid.packedLength+m.VertexFormat.packedLength+4+2}T.pack=function(r,a,o){var l;o=e.defaultValue(o,0);var s=r._positions,p=s.length;for(a[o++]=p,l=0;l<p;++l,o+=i.Cartesian3.packedLength)i.Cartesian3.pack(s[l],a,o);var d=r._colors;for(p=e.defined(d)?d.length:0,a[o++]=p,l=0;l<p;++l,o+=n.Color.packedLength)n.Color.pack(d[l],a,o);return t.Ellipsoid.pack(r._ellipsoid,a,o),o+=t.Ellipsoid.packedLength,m.VertexFormat.pack(r._vertexFormat,a,o),o+=m.VertexFormat.packedLength,a[o++]=r._width,a[o++]=r._colorsPerVertex?1:0,a[o++]=r._arcType,a[o++]=r._granularity,a[o++]=r._hMax,a[o++]=r._dist,a[o]=r._period,a};var x=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),D=new m.VertexFormat,k={positions:void 0,colors:void 0,ellipsoid:x,vertexFormat:D,width:void 0,colorsPerVertex:void 0,arcType:void 0,granularity:void 0};T.unpack=function(r,a,o){var l;a=e.defaultValue(a,0);var s=r[a++],p=new Array(s);for(l=0;l<s;++l,a+=i.Cartesian3.packedLength)p[l]=i.Cartesian3.unpack(r,a);var d=(s=r[a++])>0?new Array(s):void 0;for(l=0;l<s;++l,a+=n.Color.packedLength)d[l]=n.Color.unpack(r,a);var c=t.Ellipsoid.unpack(r,a,x);a+=t.Ellipsoid.packedLength;var u=m.VertexFormat.unpack(r,a,D);a+=m.VertexFormat.packedLength;var y=r[a++],f=1===r[a++],h=r[a++],v=r[a++],C=r[a++],_=1==r[a++],A=r[a];return e.defined(o)?(o._positions=p,o._colors=d,o._ellipsoid=t.Ellipsoid.clone(c,o._ellipsoid),o._vertexFormat=m.VertexFormat.clone(u,o._vertexFormat),o._width=y,o._colorsPerVertex=f,o._arcType=h,o._granularity=v,o._hMax=C,o._dist=_,o._period=A,o):(k.positions=p,k.colors=d,k.width=y,k.colorsPerVertex=f,k.arcType=h,k.granularity=v,k.hMax=C,k.dist=_,k.period=A,new T(k))};var G=new i.Cartesian3,V=new i.Cartesian3,F=new i.Cartesian3,L=new i.Cartesian3;return T.createGeometry=function(t){var s,m,h,v=t._width,C=t._hMax,_=t._vertexFormat,A=t._colors,b=t._colorsPerVertex,g=t._arcType,E=t._granularity,T=t._ellipsoid,x=t._dist,D=t._period,k=a.arrayRemoveDuplicates(t._positions,i.Cartesian3.equalsEpsilon),S=k.length;if(!(S<2||v<=0)){if(g===r.ArcType.GEODESIC||g===r.ArcType.RHUMB){var O,M;g===r.ArcType.GEODESIC?(O=u.CesiumMath.chordLength(E,T.maximumRadius),M=y.PolylinePipeline.numberOfPoints):(O=E,M=y.PolylinePipeline.numberOfPointsRhumbLine);var I=y.PolylinePipeline.extractHeights(k,T);if(e.defined(A)){var R=1;for(s=0;s<S-1;++s)R+=M(k[s],k[s+1],O);var B=new Array(R),N=0;for(s=0;s<S-1;++s){var U=k[s],W=k[s+1],H=A[s],Y=M(U,W,O);if(b&&s<R){var q=P(0,0,H,A[s+1],Y),z=q.length;for(m=0;m<z;++m)B[N++]=q[m]}else for(m=0;m<Y;++m)B[N++]=n.Color.clone(H)}B[N]=n.Color.clone(A[A.length-1]),A=B,w.length=0}k=g===r.ArcType.GEODESIC?y.PolylinePipeline.generateCartesianArc({positions:k,minDistance:O,ellipsoid:T,height:I,hMax:C}):y.PolylinePipeline.generateCartesianRhumbArc({positions:k,granularity:O,ellipsoid:T,height:I})}var J,j=4*(S=k.length)-4,K=new Float64Array(3*j),Q=new Float64Array(3*j),X=new Float64Array(3*j),Z=new Float32Array(2*j),$=_.st?new Float32Array(2*j):void 0,ee=e.defined(A)?new Uint8Array(4*j):void 0,te=x?new Float32Array(3*j):void 0,re=0,ae=0,oe=0,ie=0,ne=0,le=0;for(m=0;m<S;++m){var se,pe;0===m?(J=G,i.Cartesian3.subtract(k[0],k[1],J),i.Cartesian3.add(k[0],J,J)):J=k[m-1],i.Cartesian3.clone(J,F),i.Cartesian3.clone(k[m],V),m===S-1?(J=G,i.Cartesian3.subtract(k[S-1],k[S-2],J),i.Cartesian3.add(k[S-1],J,J)):J=k[m+1],i.Cartesian3.clone(J,L),e.defined(ee)&&(se=0===m||b?A[m]:A[m-1],m!==S-1&&(pe=A[m]));var de=m===S-1?2:4;for(h=0===m?2:0;h<de;++h){i.Cartesian3.pack(V,K,re),i.Cartesian3.pack(F,Q,re),i.Cartesian3.pack(L,X,re),re+=3;var ce=h-2<0?-1:1,ue=h%2*2-1,ye=ue*m/S;if(Z[ae++]=C>0?ye:ue,Z[ae++]=ce*v,_.st&&($[oe++]=m/(S-1),$[oe++]=Math.max(Z[ae-2],0)),e.defined(ee)){var fe=h<2?se:pe;ee[ie++]=n.Color.floatToByte(fe.red),ee[ie++]=n.Color.floatToByte(fe.green),ee[ie++]=n.Color.floatToByte(fe.blue),ee[ie++]=n.Color.floatToByte(fe.alpha)}x&&(te[3*ne]=le,ne++)}le+=i.Cartesian3.distance(J,k[m])}if(x){var me=le,he=Math.random()*(D>0?D:me);for(m=0;m<j;m++)te[3*m+1]=me,te[3*m+2]=he}var ve=new d.GeometryAttributes;ve.position=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:K}),ve.prevPosition=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:Q}),ve.nextPosition=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:X}),ve.expandAndWidth=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:Z}),_.st&&(ve.st=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:$})),e.defined(ee)&&(ve.color=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:ee,normalize:!0})),x&&(ve.dist=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:te}));var Ce=c.IndexDatatype.createTypedArray(j,6*S-6),_e=0,Ae=0,be=S-1;for(m=0;m<be;++m)Ce[Ae++]=_e,Ce[Ae++]=_e+2,Ce[Ae++]=_e+1,Ce[Ae++]=_e+1,Ce[Ae++]=_e+2,Ce[Ae++]=_e+3,_e+=4;return new p.Geometry({attributes:ve,indices:Ce,primitiveType:f.PrimitiveType.TRIANGLES,boundingSphere:o.BoundingSphere.fromPoints(k),geometryType:p.GeometryType.POLYLINES})}},function(r,a){return e.defined(a)&&(r=T.unpack(r,a)),r._ellipsoid=t.Ellipsoid.clone(r._ellipsoid),T.createGeometry(r)}}));