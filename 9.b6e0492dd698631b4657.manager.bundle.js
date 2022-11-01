/**
 * @license MIT
 * @description
 * Carbon Kaltura Alternate Audio Player:
 * This is a community component, provided as is
 * Environment: Production
 * Built: Nov 1, 2022, 9:14:38 AM
 * @version 1.1.0
 * @author Felipe Zuntini <felipezuntini@hotmail.com>
 * @example https://tweenn.github.io/carbon-kaltura-alternate-audio-player/
 * @url https://github.com/tweenn/carbon-kaltura-alternate-audio-player
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{883:function(module,exports){module.exports=function(e,n){return n=n||{},new Promise((function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,(function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t})),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)}))}}}]);