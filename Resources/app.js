Titanium.UI.setBackgroundColor('#000');
	var win = Ti.UI.createWindow();

	/*
	 * Message Webview and container to kill horizontal scrolling
	 */
	var container = Ti.UI.createView({
		top:0,
		left:0,
		width:320,
		height:420,
		touchEnabled:true
	});
	var webview = Ti.UI.createWebView({
		url:'webview.html',
		top:0,
		left:0,
		width:'100%',
	});
	container.add(webview);
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
		font: { fontSize:13 },
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
		container.height = 200;
		toolbar.bottom = 216;
	});
	textfield.addEventListener('blur', function () {
		container.height = 420;
		toolbar.bottom = 0;
	});
	Ti.App.addEventListener('nickname:get', function() {
		Ti.API.info('fired -> nickname:get');
		toolbar.hide();
		var popup = Ti.UI.createView({
			borderColor:'#999999',
			borderRadius:20,
			borderWidth:2,
			top:20,
			opacity:0.5,
			height:80,
			width:250,
			backgroundColor:'#000000'
		});
		var label = Ti.UI.createLabel({
			text:'Enter Your Nickname',
			color:'#ffffff',
			opacity:1,
			top:10,
			height:'auto',
			width:'auto'
		});

		popup.add(label);

		var input = Ti.UI.createTextField({
			bottom:10,
			width: 150,
			height: 30,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			returnKeyType:Titanium.UI.RETURNKEY_DONE
		});

		popup.add(input);

		win.add(popup);

		input.addEventListener('return', function () {
			if(input.value !== '') {
				Ti.App.fireEvent('nickname:set', {
					user:input.value
				});
				popup.hide();
				toolbar.show();
			}
		})
	});
	win.open();