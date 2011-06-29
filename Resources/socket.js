var socket = io.connect('http://localhost:3000');

socket.on('connect', function () {
	//Fires event listern in app.js to open the nickname prompt
	Ti.App.fireEvent('nickname:get');
});
socket.on('announcement', function (msg) {
	$('#lines').append($('<p>').append($('<em>').text(msg)));
});
socket.on('nicknames', function (nicknames) {
	$('#nicknames').empty().append($('<span>Online: </span>'));
	for (var i in nicknames) {
		$('#nicknames').append($('<b>').text(nicknames[i]));
	}
});
socket.on('user message', message);
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
	$('#lines').append($('<p>').append($('<b>').text(from), msg));
	//Fires event listern in socket.js wich scrolls chat window to bottom evertime a message is added
	Ti.App.fireEvent('message:added');
}

/*
 * Event Listeners
 */
$( function () {
	//Sets nickname for users socket connection on server
	Ti.App.addEventListener('nickname:set', function (e) {
		Ti.API.info('fired -> nickname:set');
		socket.emit('nickname', e.user, function (set) {
			if(set) {
				Ti.App.fireEvent('nickname:get', e.user);
			}
		});
	});
	//Work around for scroll to bottom issue in chat window
	Ti.App.addEventListener('message:added', function () {
		Ti.API.info('fired -> message:added');
		$(document).scrollTop($(document).height());
	});
	//Sends new message to to server and appends to users chat window
	Ti.App.addEventListener('message:out', function (e) {
		Ti.API.info('fired -> message:out');
		message('me', e.message);
		socket.emit('user message', e.message, function (e) {
		});
	});
});