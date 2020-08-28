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
        timerName = setInterval(function(){
        console.log('滚动页面');
        if(document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight){
            clearInterval(timerName);
            console.log('滚动到底部了, 等待10s让页面加载完成');
            setTimeout(() => {
                var aList = document.getElementsByClassName('pic-link J_ClickStat J_ItemPicA');
                var k = 0;
                var optimeTimer;
                optimeTimer = setInterval(function(){
                    console.log('正在打开网页===', aList[k].href);
                    aList[k].click();
                    k++;
                    if(k===aList.length){
                        clearInterval(optimeTimer);
                    }
                }, 30000);

                // var uList = [];
                // var idList = [];
                // for(var j=0; j<aList.length; j++){
                //     uList.push(aList[j].href);
                //     idList.push(aList[j].getAttribute('trace-nid'))
                // }
                // console.log('uList=====', uList);
                // console.log('idList=====', idList);
                // var dialog = document.createElement('div');
                // var ol = document.createElement('ol');
                // dialog.setAttribute("style", "position: fixed; overflow: auto; padding: 16px; right: 70px; bottom: 10px; z-index: 1000; background-color: #D9EDF7; height: 300px; width: 400px; border: 1px solid #bce8f1; border-radius: 4px;");
                // ol.setAttribute('id', 'urls')
                // for(var i=0; i<uList.length; i++){
                //     var li = document.createElement('li');
                //     li.setAttribute('id', idList[i]);
                //     li.innerText=uList[i];
                //     ol.appendChild(li);
                // }
                // dialog.appendChild(ol);
                // document.body.appendChild(dialog);
                // var k = 0;
                // var optimeTimer;
                // optimeTimer = setInterval(function(){
                //     window.open(uList[k], '_blank', 'height=600, width=600');
                //     document.getElementById(idList[k]).setAttribute("style", "background-color: #FCF8E3;");
                //     k++;
                //     if(k===uList.length){
                //         clearInterval(optimeTimer);
                //     }
                // }, 30000);
            }, 5000);
        }
         var h = Math.ceil(Math.random()*10);
        document.documentElement.scrollTop += h
    })
    });
})();