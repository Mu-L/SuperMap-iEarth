define(["exports","./Math-ecf82623"],(function(t,r){"use strict";var e={computePositions:function(t,e,n,o,a){var i,s=.5*t,c=-s,f=o+o,u=new Float64Array(3*(a?2*f:f)),h=0,v=0,M=a?3*f:0,p=a?3*(f+o):3*o;for(i=0;i<o;i++){var I=i/o*r.e.TWO_PI,P=Math.cos(I),d=Math.sin(I),l=P*n,m=d*n,w=P*e,x=d*e;u[v+M]=l,u[v+M+1]=m,u[v+M+2]=c,u[v+p]=w,u[v+p+1]=x,u[v+p+2]=s,v+=3,a&&(u[h++]=l,u[h++]=m,u[h++]=c,u[h++]=w,u[h++]=x,u[h++]=s)}return u}};t.I=e}));