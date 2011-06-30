Ti.include('/main.js');
Titanium.UI.setBackgroundColor('#000');
var win = Ti.UI.createWindow();

socket.connect(win);
/*
 * Header user list
 */
var header = Titanium.UI.createScrollView({
	contentWidth:'100%',
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

/*
 * Message list container
 */
var container = Ti.UI.createTableView({
	top:50,
	left:0,
	width:320,
	height:370,
});

win.add(container);

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

var button = Ti.UI.createButton({
	top:-10,
	left:-10,
	height:1,
	width:1,
});
win.add(button);

var userPrompt = xg.ui.userPrompt();
win.add(userPrompt);
userPrompt.top = 50;
userPrompt.height = 150;
userPrompt.width = 310;

/*
 * Event Listeners
 */
socket.on('userlist:set', function(e) {
	//TODO Remove only the user that goes offline instead of complete re-draw
	for(var c in header.children) {
		header.remove(header.children[c]);
	}
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
socket.on('message:add', function(e) {
	container.appendRow(xg.ui.chatRow(e));
	//TODO Fix Message Scroll issue only fires sometime for incoming messages
	container.scrollToIndex(container.data[0].rowCount);
});
sendButton.addEventListener('click', function() {
	socket.emit('message:out', {
		message:textfield.value
	});
	textfield.value = '';
});
textfield.addEventListener('return', function () {
	socket.emit('message:out', {
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
socket.on('nickname:get', function(e) {
	Ti.API.info('fired -> nickname:get');
	if(!e.set) {
		userPrompt.fireEvent('show');
		toolbar.hide();
	} else {
		userPrompt.fireEvent('hide');
		toolbar.show();
	}
});
win.open();