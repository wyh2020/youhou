// ==UserScript==
// @name        【天猫-商品列表】plus
// @namespace     https://s.taobao.com/*
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://s.taobao.com/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require    https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js
// ==/UserScript==

(function() {
    'use strict';
    $(()=>{
        var timerName;
        console.log('jquery引入完成');
        var testHtml = '<span style="z-index: 1000" >1111111</span>';
        $(document).append(testHtml);
        timerName = setInterval(function(){
        console.log('滚动页面');
        if(document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight){
            clearInterval(timerName);
            console.log('滚动到底部了, 等待10s让页面加载完成');
            setTimeout(() => {
                var aList = document.getElementsByClassName('pic-link J_ClickStat J_ItemPicA');
                var uList = [];
                for(var j=0; j<aList.length; j++){
                    uList.push(aList[j].href);
                }
                console.log('uList=====', uList);

            }, 5000);
        }
         var h = Math.ceil(Math.random()*10);
        document.documentElement.scrollTop += h
    })
    });
})();