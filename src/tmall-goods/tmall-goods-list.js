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

(function () {
  "use strict";
  var timer;

  var pageNum = 1;

  var total = 0;
  
  var clocker;

  function countDown(times, text) {
    clearInterval(clocker);
    clocker = setInterval(function () {
      times -= 1;
      console.log(times)
      console.log(text)
      var tips = text.replace("*", times);
      var myText = document.getElementById("myText");
      if(myText){
        myText.innerText = tips;
      }
      if (times <= 0) {
        console.log('close')
        clearInterval(clocker);
      }
    }, 1000);
  }

  function createModal(text) {
    var dialog = document.createElement("div");
    var sp = document.createElement("div");
    dialog.setAttribute(
      "style",
      "position: fixed; overflow: auto; left: 0px; top: 0px; z-index: 1000; background-color: #FFFFFF; width: 100%; text-align: center;"
    );
    dialog.setAttribute("id", "myModal");
    sp.setAttribute("style", "background-color: #FFF;");
    sp.setAttribute("id", "myText");
    sp.innerText = text;
    dialog.appendChild(sp);
    document.body.appendChild(dialog);
  }

  function getTotalPage() {
    var t = document.getElementsByClassName("total");
    if (t && t.length > 0) {
      total = parseInt((t[0].innerText || "").replace(/[^0-9]/gi, ""));
      console.log("共 " + total + " 页");
    }
    var p = document.getElementsByClassName("item active");
    if(p && p.length > 0){
        pageNum = p[0].innerText;
    }
  }

  function changePage() {
    var nextBtn = document.getElementsByClassName("J_Ajax num icon-tag");
    if (nextBtn && nextBtn.length === 1) {
      nextBtn[0].click();
    }
    if (nextBtn && nextBtn.length === 2) {
      nextBtn[1].click();
    }
  }

  function parsePage() {
    console.log("滚动页面");
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
      clearInterval(timer);
      console.log("滚动到底部了");

      // 获取当前页码 & 总页数
      getTotalPage();
      
      var k = 0;
      var myText = document.getElementById("myText");

      myText.innerText = "正在解析页面数据...";


      var tips = "共有 " + total + " 页， 正在获取第 " + pageNum + " 页数据,  *s后将模拟点击第 " + (k + 1) + " 条数据";
      // 倒计时35s
      countDown(34, tips);

      setTimeout(function () {
        var aList = document.getElementsByClassName("pic-link J_ClickStat J_ItemPicA");
        var k = 0;
        var optTimer;
        optTimer = setInterval(function () {
          console.log("正在打开网页===", aList[k].href);

          aList[k].click();

          k++;

          // if(k===aList.length){
          if (k === 2) {
            clearInterval(clocker);
            clearInterval(optTimer);
            myText.innerText = "共有 " + total + " 页， 第 " + pageNum + " 页的数据已获取完毕！";
            
            var res = window.confirm("是否继续抓取下一页数据？");
            if (res) {
              myText.innerText = "自动翻页中...";
              setTimeout(function () {
                changePage();
                k = 0;
                document.documentElement.scrollTop = 0;
                pageNum++;
                start();
              }, 1000);
            } else {
              var tips2 = "本次获取了 " + pageNum * 40 + " 条数据！ *秒后将关闭脚本";
              // 倒计时3s
              countDown(3, tips2);
              setTimeout(function () {
                clearInterval(clocker);
                document.getElementById("myModal") && document.getElementById("myModal").remove();
              }, 4000);
            }
          } else {
            var tips1 = "共有 " + total + " 页， 正在获取第 " + pageNum + " 页数据,  *s后将模拟点击第 " + (k + 1) + " 条数据";
            countDown(30, tips1);
          }
        }, 30000);
      }, 5000);
    }
    var h = Math.ceil(Math.random() * 10);
    document.documentElement.scrollTop += h;
  }

  function start() {
    if (!document.getElementById("myModal")) {
      createModal("自动滚动页面中...");
    }
    timer = setInterval(parsePage, 10);
  }

  start();
})();
