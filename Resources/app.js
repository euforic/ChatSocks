Ti.include('main.js');
Titanium.UI.setBackgroundColor('#000');
var win = Ti.UI.createWindow();
var socket = Ti.UI.createWebView({
	url:'webview.html',
	top:-100,
	left:-100,
	width:0,
	height:0,
});
win.add(socket);
/*
 * Header user list
 */
var header = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:50,
	top:0,
	left:0,
	showHorizontalScrollIndicator:true
});
var headerContainer= Ti.UI.createView({
	top:0,
	left:0,
	width:'100%',
	height:50,
	color:'#999999'
})
headerContainer.add(header)
win.add(headerContainer);

Ti.App.addEventListener('userlist:set', function(e) {
	Ti.API.info(e.users[0]);
	for (var x =0; x <= e.users.length-1; x = x + 1) {
		var currUser = e.users[x];
		var user = [];
		user[currUser] = Ti.UI.createButton({
			title:currUser,
			top:5,
			left:(x*60)+5,
			height:40,
			width:60
		});
		header.add(user[currUser]);
	}
});

/*
 * Message Webview and container to kill horizontal scrolling
 */
var container = Ti.UI.createTableView({
	top:50,
	left:0,
	width:320,
	height:370,
});

win.add(container);

Ti.App.addEventListener('message:add', function(e){
	container.appendRow({title:e.user+': '+e.message});
		container.scrollToIndex(container.data[0].rowCount);
});
/*
TODO Fix Message Scroll issue
Ti.App.addEventListener('messagelist:fix', function(){
	Ti.API.info(container.data[0].rowCount);
	container.scrollToIndex(container.data[0].rowCount);
});
*/
/*
 * Input Toolbar
 */
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var textfield = Titanium.UI.createTextField({
	height:32,
	backgroundImage:'images/inputfield.png',
	width:200,
	font: {
		fontSize:13
	},
	color:'#777',
	paddingLeft:10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
	returnKeyType:Titanium.UI.RETURNKEY_SEND
});
var sendButton = Titanium.UI.createButton({
	backgroundImage:'images/send.png',
	backgroundSelectedImage:'images/send_selected.png',
	width:67,
	height:32
});
var toolbar = Titanium.UI.createToolbar({
	items:[flexSpace,textfield,flexSpace, sendButton,flexSpace],
	bottom:0,
	borderTop:true,
	borderBottom:false,
	translucent:true,
	barColor:'#999'
});
win.add(toolbar);
toolbar.hide();
//TODO fix tool tip event
var button = Ti.UI.createButton({
	top:-10,
	left:-10,
	height:1,
	width:1,
});
win.add(button);

var login = xg.ui.login(button);
win.add(login);
login.top = 50;
login.height = 150;
login.width = 310;
/*
 * Event Listeners
 */
sendButton.addEventListener('click', function() {
	Ti.App.fireEvent('message:out', {
		message:textfield.value
	});
	textfield.value = '';
});
textfield.addEventListener('return', function () {
	Ti.App.fireEvent('message:out', {
		message:textfield.value
	});
	textfield.value = '';
});
textfield.addEventListener('focus', function () {
	container.height = 150;
	toolbar.bottom = 216;
});
textfield.addEventListener('blur', function () {
	container.height = 370;
	toolbar.bottom = 0;
});
Ti.App.addEventListener('nickname:get', function(e) {
	Ti.API.info('fired -> nickname:get');
	if(!e.set) {
		button.fireEvent('click');
		toolbar.hide();
	} else {
		button.fireEvent('click');
		toolbar.show();
	}
});
win.open();