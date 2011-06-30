xg.ui = {};

xg.ui.login = function (trigger) {
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

	trigger.addEventListener('click', function() {
		Ti.API.info(container.open);
		if(container.open){
			container.animate(anim_out);
			container.open = 0;
		}else{
			container.animate(anim_in);
			container.open = 1;
		}
	});
	return container;
}

xg.ui.userlist = function (trigger,users) {
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

	trigger.addEventListener('click', function() {
		Ti.API.info(container.open);
		if(container.open){
			container.animate(anim_out);
			container.open = 0;
		}else{
			container.animate(anim_in);
			container.open = 1;
		}
	});
	return container;
}