(function(){"use strict";angular.module("imagesLoaded",[]).directive("imagesLoaded",["$timeout","$rootScope","$q",function(e,t,n){function s(t){e(t,0)}function o(e,t,n){this.loaded=undefined;this.loading=true;if(!n){this.node=new Image;this.bind(t);this.node.src=e}else{this.__onload(t,true)}}function u(e){this.imagesCount=0;this.imagesLoaded=0;this.imagesFailed=0;this.useProgressEvents=e}var r={};var i={progress:["QUARTER","HALF","THREEQUARTERS","FULL"],successful:"SUCCESS",complete:"FAIL",always:"ALWAYS"};o.prototype={constructor:o,bind:function(e){var t=this;this.node.addEventListener("load",function(){t.__onload(e,true)},false);this.node.addEventListener("error",function(){t.__onload(e,false)},false)},__onload:function(e,t){this.loaded=true;this.loading=false;if(t&&this.node){delete this.node}e(t)}};u.prototype={constructor:u,whenImagesLoaded:function(e){function h(e){var n;if(e){a.imagesLoaded++}else{a.imagesFailed++}if(a.useProgressEvents&&(n=(a.imagesLoaded+a.imagesFailed)/Math.ceil(u/4))&&n%1===0&&n<4){s(function(){t.notify(i.progress[n-1])})}if(a.imagesLoaded+a.imagesFailed===a.imagesCount){s(function(){t.notify(i.progress[3]);t.resolve(a.imagesFailed>0?i.complete:i.success)})}}function p(e){var t=e.src,n=r[t],i;if(n){if(n.loaded){h(true)}else if(n.loading){n.bind(h)}else if(n.loaded===false){}}else if(e.complete&&e.naturalWidth>0){r[t]=new o(t,h,true)}else{r[t]=new o(t,h)}}var t=n.defer(),u=e.length,a=this,f,l;this.imagesCount=u;for(var c=0;c<this.imagesCount;c++){f=e[c];p(f)}return t.promise}};return{restrict:"A",compile:function(e,t){return function(e,t,n){var r=t[0].childNodes,o=n.useProgressEvents==="yes"?true:false,a=0,f=document.images,l;e.$watch(function(){return f.length},function(n,r){var f,c;if(n===r)return;l=t.find("img");f=l.length;if(f===a)return;a=f;c=new u(o);s(function(){c.whenImagesLoaded(l).then(function(t){e.$emit(t);e.$emit(i.always)},function(e){},function(t){o&&e.$emit("PROGRESS",{status:t})})})})}}}}])})()