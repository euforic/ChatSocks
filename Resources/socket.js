var socket = {};

/*
 * Create WebView for socket connection
 */
socket.connect = function (w) {
var socket = Ti.UI.createWebView({
	url:'webview/webview.html',
	top:-100,
	left:-100,
	width:0,
	height:0,
});
w.add(socket);
}

/*
 * Alias for Titanium functions just for fun
 */
socket.emit = function (e, params) {
	Ti.App.fireEvent(e,params);
}
socket.on = function (e, callback) {
	Ti.App.addEventListener(e,callback);
}