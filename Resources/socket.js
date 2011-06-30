var socket = io.connect('http://localhost:3000');

socket.on('connect', function () {
	//Fires event listern in app.js to open the nickname prompt
	Ti.App.fireEvent('nickname:get');
});
socket.on('announcement', function (msg) {
	message('Announcement',msg);
});
socket.on('nicknames', function (nicknames) {
	var nicks = [];
	for (var i in nicknames) {
		nicks.push(nicknames[i]);
	}
	Ti.App.fireEvent('userlist:set',{users:nicks});
});
socket.on('reconnect', function () {
	message('System', 'Reconnected to the server');
});
socket.on('reconnecting', function () {
	message('System', 'Attempting to re-connect to the server');
});
socket.on('error', function (e) {
	message('System', e ? e : 'A unknown error occurred');
});
function message (from, msg) {
	Ti.App.fireEvent('message:add',{user:from,message:msg});
	//Fires event listern in socket.js wich scrolls chat window to bottom evertime a message is added
	//Ti.App.fireEvent('message:scroll');
}

socket.on('user message', message);


/*
 * Event Listeners
 */
( function () {
	//Sets nickname for users socket connection on server
	Ti.App.addEventListener('nickname:set', function (e) {
		Ti.API.info('fired -> nickname:set');
		socket.emit('nickname', e.user, function (usertaken) {
			if(usertaken) {
				Ti.App.fireEvent('nickname:get', {
					user: e.user,
					set: false,
					error:true
				});
			} else {
				Ti.App.fireEvent('nickname:get', {
					user: e.user,
					set: true,
					error:false
				});

			}
		});
	});
	//Work around for scroll to bottom issue in chat window
	Ti.App.addEventListener('message:scroll', function () {
		Ti.App.fireEvent('messagelist:fix');
	});
	//Sends new message to to server and appends to users chat window
	Ti.App.addEventListener('message:out', function (e) {
		Ti.API.info('fired -> message:out');
		message('me', e.message);
		socket.emit('user message', e.message, function (e) {
		});
	});
})();