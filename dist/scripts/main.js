"use strict";var landing=document.querySelector(".landing"),placeholder=document.querySelector("article.project"),validPaths=["#/neutral","#/multiplex-monograph","#/8-to-create","#/no-strings-attached","#/cahoot","#/menace-ultimate-frisbee","#/louie","#/bikenet","#/bonfires-at-ocretyre"],secondRow=document.querySelectorAll(".project")[3],thirdRow=document.querySelectorAll(".project")[8],secondRowThreshhold=secondRow.scrollHeight-secondRow.clientHeight+10,thirdRowThreshhold=thirdRow.scrollHeight-thirdRow.clientHeight+10,init=function(){var e={};return e.destination=location.hash,e.getMarkup=function(e,t){var o=new XMLHttpRequest;o.onreadystatechange=function(){4==o.readyState&&200==o.status&&t(o.responseText)},o.open("GET",e,!0),o.send(null)},e.goHome=function(){placeholder.classList.remove("active"),placeholder.setAttribute("hidden",""),landing.removeAttribute("hidden",""),document.querySelector("nav .active").classList.remove("active"),document.querySelector("nav .about").classList.add("active")},e.responseHandler=function(e){window.scrollTo(0,0),placeholder.innerHTML=e,placeholder.removeAttribute("hidden"),window.setTimeout(function(){placeholder.classList.add("active")},100),landing.setAttribute("hidden","")},e.isValidPath=function(){var t=e.destination;return t.indexOf("#")<0&&(e.destination="#"+e.destination),validPaths.indexOf(t)>=0},e.route=function(){if(e.destination=location.hash,""!==e.destination){var t=document.querySelector("nav .active");if(e.isValidPath()){var o="markup"+e.destination.split("#")[1]+".html";e.getMarkup(o,e.responseHandler),t.classList.remove("active"),document.querySelector(".dropdown-wrapper").classList.add("active")}else window.location.href=window.location.host+window.location.pathname,history.pushState("",document.title,window.location.pathname)}else e.goHome()},e}();!function(){var e=init;e.route(),window.onhashchange=e.route}();