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

  var times = 35;

  function countDown(text) {
    var set = setInterval(function () {
      times--;
      var tips = text.replace("*", times);
      myText.innerText = tips;
      if (times === 0) {
        clearInterval(set);
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

      var k = 0;
      var myText = document.getElementById("myText");

      myText.innerText = "正在解析页面数据...";

      // 获取当前页码 & 总页数
      getTotalPage();

      var tips = "共有 " + total + " 页， 正在获取第 " + pageNum + " 页数据,  *s后，将模拟点击第 " + (k + 1) + " 条数据";
      // 倒计时35s
      times = 35;
      countDown(tips);

      setTimeout(function () {
        var aList = document.getElementsByClassName("pic-link J_ClickStat J_ItemPicA");
        var k = 0;
        var optimeTimer;
        optimeTimer = setInterval(function () {
          console.log("正在打开网页===", aList[k].href);
          aList[k].click();
          k++;
          var tips = "共有 " + total + " 页， 正在get第 " + pageNum + " 页数据中的第 " + (k + 1) + " 条数据";
          var tips = "共有 " + total + " 页， 正在获取第 " + pageNum + " 页数据,  *s后，将模拟点击第 " + (k) + " 条数据";
          times = 30;
          countDown(tips);

          myText.innerText = "共有 " + total + " 页， 正在获取第 " + pageNum + " 页数据中的第 " + (k + 1) + " 条数据";

          // if(k===aList.length){
          if (k === 2) {
            clearInterval(optimeTimer);
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
              var tips = "本次get了 " + pageNum * 40 + " 条数据！*秒后关闭脚本";
              // 倒计时3s
              times = 3;
              countDown(tips);
              setTimeout(function () {
                document.getElementById("myModal") && document.getElementById("myModal").remove();
              }, 3000);
            }
          }
        }, 30000);
      }, 5000);
    }
    var h = Math.ceil(Math.random() * 10);
    document.documentElement.scrollTop += h;
  }

  function start() {
    if (!document.getElementById("myModal")) {
      createModal("自动滚到页面中...");
    }
    timer = setInterval(parsePage, 10);
  }

  start();
})();
