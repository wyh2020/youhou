// ==UserScript==
// @name        【天猫-商品列表】plus
// @namespace     https://s.taobao.com/*
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://s.taobao.com/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var timerName;
    var pageNum = 1;
    var total = 0;

    function createModal(text) {
        var dialog = document.createElement('div');
        var sp = document.createElement('div');
        dialog.setAttribute("style", "position: fixed; overflow: auto; left: 0px; top: 0px; z-index: 1000; background-color: #BFBFBF; height: 100%; width: 100%; text-align: center;");
        dialog.setAttribute('id', 'myModal')
        sp.setAttribute("style", "background-color: #FFF;");
        sp.setAttribute('id', 'myText');
        sp.innerText=text;
        dialog.appendChild(sp);
        document.body.appendChild(dialog);
    }
    
    function getTotalPage() {
        var t = document.getElementsByClassName('total');
        if(t && t.length > 0){
            total = parseInt((t[0].innerText || '').replace(/[^0-9]/ig,""));
            console.log('共 ' + total + ' 页');
        }
    }
    
    function changePage() {
        var nextBtn = document.getElementsByClassName('J_Ajax num icon-tag');
        if(nextBtn && nextBtn.length === 2){
            nextBtn[1].click();
        }
    }

    function parsePage(){
        console.log('滚动页面');
        if(document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight){
            clearInterval(timerName);
            console.log('滚动到底部了');
            createModal("正在解析页面数据...");
            // 获取当前页码 & 总页数
            getTotalPage();

            var myText = document.getElementById('myText');
            myText.innerText = '共有 ' + total + ' 页， 正在获取第 ' + pageNum + ' 页数据';

            setTimeout(() => {
                var aList = document.getElementsByClassName('pic-link J_ClickStat J_ItemPicA');
                var k = 0;
                var optimeTimer;
                optimeTimer = setInterval(function(){
                    console.log('正在打开网页===', aList[k].href);
                    myText.innerText = '共有 ' + total + ' 页， 正在get第 ' + pageNum + ' 页数据中的第 ' + (k + 1) + ' 条数据';
                    aList[k].click();
                    k++;
                    // if(k===aList.length){
                    if(k===2){
                        clearInterval(optimeTimer);
                        myText.innerText = '共有 ' + total + ' 页， 第 ' + pageNum + ' 页的数据已get完毕！';
                        var res = window.confirm('是否继续抓取下一页数据？');
                        if(res){ //
                            myText.innerText = '自动翻页中...';
                            changePage();
                            start(); 
                            pageNum++;
                        }else{
                            myText.innerText ='共有 ' + total + ' 页， 本次get了 ' + (pageNum * 40)  + ' 条数据！';
                        }
                    }
                }, 30000);
            }, 5000);
        }
        var h = Math.ceil(Math.random()*10);
        document.documentElement.scrollTop += h
    }

    function start() {
        document.getElementById('myModal') && document.getElementById('myModal').remove();
        timerName = setInterval(parsePage, 10); 
    }
    // 开始跑脚本
    start();
})();