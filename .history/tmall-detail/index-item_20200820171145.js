// ==UserScript==
// @name        【天猫-商品详情】plus
// @namespace     https://detail.tmall.com/*
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://detail.tmall.com/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require    https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js
// ==/UserScript==

(function() {
    'use strict';
    $(()=>{
        var wN2scRl;
        console.log('jquery引入完成');
        wN2scRl = setInterval(function(){
        console.log('滚动页面');
        if(document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight){
            clearInterval(wN2scRl);
            console.log('滚动到底部了, 等待10s让页面加载完成');
            setTimeout(() => {
                var url = window.encodeURIComponent(window.location.href);

                var shopName = document.getElementsByClassName('slogo-shopname')[0].text;

                var proName = document.getElementsByClassName('tb-detail-hd')[0].innerText;
                var price = document.getElementsByClassName('tm-price')[0].innerText;
                var promoPrice = document.getElementsByClassName('tm-price')[1] ? document.getElementsByClassName('tm-price')[1].innerText : null;
                var region = document.getElementById('J_deliveryAdd').innerText;
                var proUnit = document.getElementsByClassName('mui-amount-unit')[0] ? document.getElementsByClassName('mui-amount-unit')[0].innerText : '';

                var proImages = [];
                var ulImg = document.getElementById("J_UlThumb");
                var liImgs = ulImg.getElementsByTagName('li');
                for(var i=0; i<liImgs.length;i++){
                    proImages.push(liImgs[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0].src);
                }

                var brandName = document.getElementsByClassName('J_EbrandLogo')[0].innerText;

                var brandAttrs = [];
                var ulAttr = document.getElementById("J_AttrUL");
                var liAttrs = ulAttr.getElementsByTagName('li');
                for(var j=0; j<liAttrs.length; j++){
                    brandAttrs.push(liAttrs[j].textContent);
                }

                var skus = [];
                var skuList = document.getElementsByClassName('tb-prop tm-sale-prop tm-clear');
                for(let m=0; m<skuList.length; m++){
                    var skuName = skuList[m].children[1].children[0].getAttribute('data-property');
                    var skuValues = [];
                    var values = skuList[m].children[1].children[0].getElementsByTagName('li');
                    for(let n=0; n<values.length;n++){
                        var val = values[n].innerText;
                        // var val = values[n].getAttribute('title');
                        skuValues.push(val.trim());
                    }
                    skus.push(`${skuName}:${skuValues.join('^')}`);
                }

                //console.log('url====' + url);
                var desImgs = [];
                // 有一种是在P标签下面，有一种是在table下面
                if(document.getElementById('description').getElementsByTagName('div')[0].getElementsByTagName('p').length > 0){
                    var desImages = document.getElementById('description').getElementsByTagName('div')[0].getElementsByTagName('p')[0].getElementsByTagName('img');
                    for(var k=0; k<desImages.length; k++){
                        desImgs.push(desImages[k].src);
                    }
                }else if(document.getElementById('description').getElementsByTagName('div')[0].getElementsByTagName('table').length > 0){
                    var trs = document.getElementById('description').getElementsByTagName('div')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                    for(var l=0; l<trs.length; l++){
                        desImgs.push(trs[l].getElementsByTagName('td')[0].getElementsByTagName('img')[0].src);
                    }
                }

                console.log('url====' + url);

                console.log('shopName ====' + shopName);
                console.log('proName ====' + proName);
                console.log('price ====' + price);
                console.log('promoPrice ====' + promoPrice);
                console.log('region ====' + region);
                console.log('proUnit ====' + proUnit);

                console.log('proImages ====' + proImages);
                console.log('brandName ====' + brandName);
                console.log('brandAttrs ====' + brandAttrs);
                console.log('skus ====' + skus);
                console.log('desImgs ====' + desImgs);

                console.log('拿到静态页面');
                GM_xmlhttpRequest({
                    method: "post",
                    url: 'http://127.0.0.1:3300/extension/tmall',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                        token: 'bbab2bdbbf971d5a185614d359991c42'
                    },
                    data: `url=${url}&shopName=${shopName}&proName=${proName}&price=${price}&promoPrice=${promoPrice}&region=${region}&proUnit=${proUnit}&brandName=${brandName}&proImages=${proImages.join(';')}&brandAttrs=${brandAttrs.join('|')}&desImgs=${desImgs.join(';')}&skus=${skus.join(';')}`,
                    onload: function(res){
                        if(res.status === 200){
                            console.log('上传成功')
                            // 关闭当前标签
                            window.close();
                        }else{
                            console.log('上传失败')
                            console.log(res)
                        }
                    },
                    onerror : function(err){
                        console.log('上传失败')
                        console.log(err)
                        // 关闭当前标签
                        window.close();
                    }
                });
            }, 5000);
        }
         var h = Math.ceil(Math.random()*10);
        document.documentElement.scrollTop+=h
    })
    });
})();