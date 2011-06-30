xg.ui = {};

/*
 * User Prompt to set nickname
 * Adapted from Dan Tamas's <hi@dan-tamas.me> nifty tooltip
 */
xg.ui.userPrompt = function (trigger) {
	var	container =  Titanium.UI.createView({
		width:'auto',
		height:'auto',
		backgroundImage:"images/bubble.png",
		backgroundTopCap:30.0,
		backgroundLeftCap:10.0,
		top:0,
		right:3,
		opacity:0,
		open:false
	});

	var label = Ti.UI.createLabel({
		text:'Enter Your Nickname',
		color:'#ffffff',
		opacity:1,
		top:30,
		left:10,
		right:10,
		height:'auto',
		width:'auto'
	});

	container.add(label);

	var input = Ti.UI.createTextField({
		top:60,
		width: 150,
		height: 30,
		left:20,
		right:20,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	container.add(input);

	input.addEventListener('return', function () {
		if(input.value !== '') {
			Ti.App.fireEvent('nickname:set', {
				user:input.value
			});
		}
	});
	var anim_out = Titanium.UI.createAnimation();
	anim_out.opacity = 0;
	anim_out.duration = 250;

	var anim_in = Titanium.UI.createAnimation();
	anim_in.opacity = 1;
	anim_in.duration = 250;

	container.addEventListener('show', function() {
		container.animate(anim_in);
	});
	container.addEventListener('hide', function() {
		container.animate(anim_out);
	});
	return container;
}

/*
 * Creates chat row for incoming messages
 */
xg.ui.chatRow = function (msg) {
	var row = Titanium.UI.createTableViewRow({height:'auto'});

	var userLBL =  Ti.UI.createLabel({
		text:msg.user,
		width:'auto',
		height:20,
		font:{
			fontSize:14,
			fontWeight:'bold'
		},
		top:5
	});

	var messageLBL = Titanium.UI.createLabel({
		text:msg.message,
		font: {
			fontSize:12,
		},
		width:'auto',
		top:20,
		bottom:5,
		width:'95%',
		height:'auto'
	});
	if(msg.user == 'me') {
		messageLBL.textAlign = 'right';
		userLBL.right = 5;
	}
	else{
		messageLBL.textAlign = 'left';
		userLBL.left = 5;
	}
	row.add(userLBL);
	row.add(messageLBL);
	row.className = 'message_row';
	return row;
}