window.onerror = function (message, source, lineno, colno, error) {
    // console.error(message, source, lineno, colno, error);
    if ('popNotify' in window) {
        popNotify.notify("页面出现了错误", "<b>建议刷新页面。</b>" + "<br>" + message, 5000, null, "error");
    }
}