// Constellation.js 0.2.0
// (c) 2011-2013 Greg MacWilliam
// Freely distributed under the MIT license
// Docs: https://github.com/gmac/constellation.js
(function(t,n){var e=n(Math.sqrt,Math.min,Math.max,Math.abs);"undefined"!=typeof exports?module.exports=e:"function"==typeof define&&define.amd?define(e):t.Const=e})(this,function(t,n,e,i){function o(t){return t instanceof Array}function r(t){return"function"==typeof t}function s(t){return Array.prototype.slice.call(t)}function h(t,n,e,i){return t===e&&n===i||t===i&&n===e}function a(t,n,e,i,o){if(i.length&&o.length){for(var r=0;i.length>r;r++)if(f.contains(o,i[r]))return!0;var s=t.getAdjacentPolygonSegments(i,o);for(r=0;s.length>r;r++){var h=f.map(s[r],t.getNodeById,t);if(c.intersect(n,e,h[0],h[1]))return!0}}return!1}function u(t,n,e){var i=t.addNode(n.x,n.y,{});if(!e.length){var o=t.snapPointToGrid(n);if(o.point){i.x=o.point.x,i.y=o.point.y,i.snap=o;for(var r=0,s=o.segment.length;s>r;r++)t.joinNodes(i.id,o.segment[r]);e=t.getPolygonsWithLineSegment(o.segment[0],o.segment[1])}}return e.length&&(i.poly=e,f.each(e,function(n){for(var e=t.getPolygonById(n).nodes,o=0,r=e.length;r>o;o++)t.joinNodes(i.id,e[o])})),i}function d(t,n){if(t.snap&&n.snap){var e=t.snap.segment,i=n.snap.segment;if(h(e[0],e[1],i[0],i[1]))return!0}if(t.poly&&n.poly)for(var o in t.poly)if(f.contains(n.poly,t.poly[o]))return!0;return!1}var c={},f=c.utils={size:function(t){if(o(t))return t.length;var n=0;for(var e in t)t.hasOwnProperty(e)&&n++;return n},contains:function(t,n){if(o(t)){if(r(Array.prototype.indexOf))return t.indexOf(n)>=0;for(var e=t.length,i=0;e>i;)if(t[i++]===n)return!0}return t&&t.hasOwnProperty(n)},each:function(t,n,e){var i=0;if(o(t))for(var r=t.length;r>i;)n.call(e,t[i],i++);else for(i in t)t.hasOwnProperty(i)&&n.call(e,t[i],i);return t},map:function(t,n,e){var i=0;if(o(t))for(var r=t.length;r>i;)t[i]=n.call(e,t[i],i++);else for(i in t)t.hasOwnProperty(i)&&(t[i]=n.call(e,t[i],i));return t},all:function(t,n,e){for(var i=t.length,o=0;i>o;)if(!n.call(e,t[o],o++))return!1;return!0},toArray:function(t){var n=[];for(var e in t)t.hasOwnProperty(e)&&n.push(t[e]);return n}},l=c.Point=function(t,n){this.x=t||0,this.y=n||0},y=c.Rect=function(t,n,e,i){this.x=t||0,this.y=n||0,this.width=e||0,this.height=i||0};c.distance=function(n,e){var i=e.x-n.x,o=e.y-n.y;return t(i*i+o*o)},c.ccw=function(t,n,e,i){return i?(e.y-t.y)*(n.x-t.x)>(n.y-t.y)*(e.x-t.x):(e.y-t.y)*(n.x-t.x)>=(n.y-t.y)*(e.x-t.x)},c.intersect=function(t,n,e,i){return c.ccw(t,e,i)!==c.ccw(n,e,i)&&c.ccw(t,n,e)!==c.ccw(t,n,i)},c.degreesToRadians=function(t){return t*Math.PI/180},c.radiansToDegrees=function(t){return 180*t/Math.PI},c.angleRadians=function(t,n){return Math.atan2(n.y-t.y,n.x-t.x)},c.angleDegrees=function(t,n){var e=c.radiansToDegrees(c.angleRadians(t,n));return 0>e?e+360:e},c.angleSector=function(t,n,e){var i=2*Math.PI;return n=n||8,e=e||i/(2*n),0>t&&(t=i+t),t+=e,t>i&&(t-=i),Math.floor(t/(i/n))},c.getRectForPointRing=function(t){var i=t[0],o=i.x,r=i.x,s=i.y,h=i.y;return f.each(t,function(t){o=n(o,t.x),r=e(r,t.x),s=n(s,t.y),h=e(h,t.y)}),new y(o,s,r-o,h-s)},c.hitTestRect=function(t,i){var o=n(i.x,i.x+i.width),r=e(i.x,i.x+i.width),s=n(i.y,i.y+i.height),h=e(i.y,i.y+i.height);return t.x>=o&&t.y>=s&&r>=t.x&&h>=t.y},c.hitTestPointRing=function(t,e){for(var i=new l(0,t.y),o=0,r=0,s=e.length;s>r;r++){var h=e[r],a=e[(r+1)%s];i.x=n(i.x,n(h.x,a.x)-1),o+=this.intersect(i,t,h,a)?1:0}return o%2>0},c.snapPointToLineSegment=function(t,n,e){var i=t.x-n.x,o=t.y-n.y,r=e.x-n.x,s=e.y-n.y,h=r*r+s*s,a=i*r+o*s,u=a/h;return 0>u?new l(n.x,n.y):u>1?new l(e.x,e.y):new l(n.x+r*u,n.y+s*u)},c.getNearestPointToPoint=function(t,n){var e,o,r=null,s=1/0,h=n.length-1;for(n.sort(function(n,e){return n=i(t.x-n.x),e=i(t.x-e.x),e-n});h>=0&&(e=n[h--],s>i(t.x-e.x));)o=c.distance(t,e),s>o&&(r=e,s=o);return r};var g=c.Node=function(t,n,e,i,o){this.id=t,this.x=n||0,this.y=e||0,this.to=o||{},this.data=i||null};g.prototype={toPoint:function(){return{x:this.x,y:this.y,data:this.data||null}}};var p=c.Polygon=function(t,n,e){this.id=t,this.nodes=n.slice(),this.data=e||null},P=c.Path=function(t,n,e){this.nodes=t||[],this.weight=n||0,this.estimate=e||0};P.prototype={copy:function(t,n){return new P(this.nodes.slice(),t||this.weight,n||this.estimate)},last:function(){return this.nodes[this.nodes.length-1]},contains:function(t){return f.contains(t)},prioratize:function(t,n){return n.estimate-t.estimate}};var v=c.Grid=function(t){this.reset(t)};return v.prototype={nodes:{},polys:{},_i:0,toJSON:function(){return{nodes:this.nodes,polys:this.polys,i:this._i}},reset:function(t){this.nodes={},this.polys={},this._i=0,t&&(this._i=t.i||0,f.each(t.nodes||{},function(t){this.nodes[t.id]=t},this),f.each(t.polys||{},function(t){this.polys[t.id]=t},this))},addNode:function(t,n,e){"object"==typeof t&&(e=t,t=0);var i=new g(e&&e.id||"n"+this._i++,t,n,e);return this.nodes[i.id]=i,i},getNodeById:function(t){return this.nodes.hasOwnProperty(t)?this.nodes[t]:null},getNodes:function(t,n){return(!o(t)||n)&&(t=s(arguments)),f.map(t.slice(),function(t){return this.getNodeById(t)},this)},getNumNodes:function(){return f.size(this.nodes)},hasNodes:function(t,n){return(!o(t)||n)&&(t=s(arguments)),f.all(t,function(t){return this.nodes.hasOwnProperty(t)},this)},joinNodes:function(t,n){(!o(t)||n)&&(t=s(arguments));var e=!1;return t.length>1&&this.hasNodes(t)&&f.each(t,function(n){for(var i=this.nodes[n],o=t.length,r=0;o>r;)n=t[r++],n!==i.id&&(i.to[n]=1,e=!0)},this),e},splitNodes:function(t,n){if((!o(t)||n)&&(t=s(arguments)),2>t.length)return this.detachNodes(t);var e=!1;return f.each(t,function(n){var i=this.nodes[n];if(i&&i.to)for(n in i.to)f.contains(t,n)&&(delete i.to[n],e=!0)},this),e},detachNodes:function(t,n){(!o(t)||n)&&(t=s(arguments));var e=!1;return f.each(t,function(t){var n,i,o=this.nodes[t];if(o&&o.to){for(i in o.to)delete o.to[i],n=this.nodes[i],n&&n.to&&delete n.to[t];e=!0}},this),e},removeNodes:function(t,n){(!o(t)||n)&&(t=s(arguments));var e=this.detachNodes(t);return f.each(t,function(t){var n,i;if(this.nodes.hasOwnProperty(t)){delete this.nodes[t];for(i in this.polys)n=this.polys[i],n&&f.contains(n.nodes,t)&&delete this.polys[i];e=!0}},this),e},addPolygon:function(t,n){if(t.length>=3&&this.hasNodes(t)){var e=new p("p"+this._i++,t,n);return this.polys[e.id]=e,e}return null},updatePolygon:function(t,n,e){return this.polys.hasOwnProperty(t)?(this.polys[t].data=e,this.polys[t].id=n,this.polys[t]):null},getPolygonById:function(t){return this.polys.hasOwnProperty(t)?this.polys[t]:null},getPolygons:function(t,n){return(!o(t)||n)&&(t=s(arguments)),f.map(t.slice(),this.getPolygonById,this)},getNodesForPolygon:function(t){return this.polys.hasOwnProperty(t)?f.map(this.polys[t].nodes.slice(),this.getNodeById,this):null},getNumPolygons:function(){return f.size(this.polys)},removePolygons:function(t,n){(!o(t)||n)&&(t=s(arguments));var e=!1;return f.each(t,function(t){this.polys.hasOwnProperty(t)&&(delete this.polys[t],e=!0)},this),e},findPath:function(t,n,e,i){var o,s,h,a,u,d,f,l=[],y={},g=this.getNodeById(t),p=this.getNodeById(n),v=0;for(r(e)||(e=c.distance),r(i)||(i=c.distance),l.push(new P([g],e(g,g)));l.length>0;){s=l.pop(),g=s.last();for(f in g.to)g.to.hasOwnProperty(f)&&(h=this.nodes[f],h&&!s.contains(h)&&(u=s.weight+e(g,h),(y[h.id]||u)>=u&&(y[h.id]=u,d=u+i(h,p),(!o||o.weight>d)&&(a=s.copy(u,d),a.nodes.push(h),h.id===p.id?o=a:l.push(a)))));l.sort(P.prototype.prioratize),v++}return{cycles:v,valid:!!o,nodes:o?o.nodes:[],weight:o?o.weight:0}},findPathWithFewestNodes:function(t,n){var e=function(){return 1};return this.findPath(t,n,e,e)},snapPointToGrid:function(t){var n=null,e=1/0,i=[],o={};return f.each(this.nodes,function(r,s){if(t.id!==s)for(var h in r.to)if(r.to.hasOwnProperty(h)&&!o.hasOwnProperty(h+" "+r.id)){var a=this.nodes[h],u=c.snapPointToLineSegment(t,r,a),d=c.distance(t,u);o[r.id+" "+a.id]=!0,(!n||e>d)&&(n=u,e=d,i[0]=r.id,i[1]=a.id)}},this),{offset:isFinite(e)?e:0,point:n||t,segment:i}},snapPoint:function(t){var n=this.snapPointToGrid(t);return n.point||t},getNearestNodeToNode:function(t){var n=[],e=this.getNodeById(t);return e?(f.each(this.nodes,function(t){t.id!==e.id&&n.push(t)},this),c.getNearestPointToPoint(e,n)):null},getNearestNodeToPoint:function(t){return c.getNearestPointToPoint(t,f.toArray(this.nodes))},hitTestPointInPolygons:function(t){return!!this.getPolygonsOverPoint(t).length},getPolygonsOverPoint:function(t){var n=[];for(var e in this.polys)this.polys.hasOwnProperty(e)&&c.hitTestPointRing(t,this.getNodesForPolygon(e))&&n.push(e);return n},getNodesInPolygon:function(t){var n=[],e=this.getPolygonById(t),i=this.getNodesForPolygon(t),o=c.getRectForPointRing(i);return e&&f.each(this.nodes,function(t){(f.contains(e.nodes,t.id)||c.hitTestRect(t,o)&&c.hitTestPointRing(t,i))&&n.push(t.id)},this),n},getNodesInRect:function(t){var n=[];return f.each(this.nodes,function(e){c.hitTestRect(e,t)&&n.push(e.id)},this),n},getAdjacentPolygonSegments:function(t,n){for(var e=[],i=this.getNodesForPolygon(t),o=this.getNodesForPolygon(n),r=i.length,s=o.length,a=0;r>a;a++)for(var u=i[a].id,d=i[(a+1)%r].id,c=0;s>c;c++){var f=o[c].id,l=o[(c+1)%s].id;h(u,d,f,l)&&e.push([u,d])}return e},getPolygonsWithLineSegment:function(t,n){var e=[];return f.each(this.polys,function(i,o){for(var r=0,s=i.nodes.length;s>r;r++){var a=i.nodes[r],u=i.nodes[(r+1)%s];h(a,u,t,n)&&e.push(o)}}),e},getContiguousNodesMap:function(){function t(n,o){e[n.id]=o[n.id]=1;for(var r in n.to)n.to.hasOwnProperty(r)&&!o.hasOwnProperty(r)&&(o=t(i.getNodeById(r),o));return o}var n=[],e={},i=this;return f.each(this.nodes,function(i){e.hasOwnProperty(i.id)||n.push(t(i,{}))}),n},bridgePoints:function(t,n,e){var i=this.getPolygonsOverPoint(t),o=this.getPolygonsOverPoint(n);if(a(this,t,n,i,o))return[t,n];var r=u(this,t,i),s=u(this,n,o);d(r,s)&&this.joinNodes(r.id,s.id);var h=this.findPath(r.id,s.id);return this.removeNodes(r.id,s.id),h.valid?(h=f.map(h.nodes,function(t){return t.toPoint()}),c.distance(t,r)>1&&h.unshift(t),!e&&c.distance(n,s)>1&&h.push(n),h):[]}},c});