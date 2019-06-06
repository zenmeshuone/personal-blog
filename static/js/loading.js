document.body.innerHTML += ('<div id="loader-wrapper"><div id="loader"></div><div class="loader-section section-left"></div><div class="loader-section section-right"></div><div id="load_title">正在加载中，请稍后</div></div>');
window.onload = function () {
    if (document.body.className == '' || document.body.className.search("loaded") == -1)
        document.body.className += ' loaded'
}
setTimeout(function () {
    if (document.body.className == '' || document.body.className.search("loaded") == -1)
        document.body.className += ' loaded';
}, 3000);// 超时时间