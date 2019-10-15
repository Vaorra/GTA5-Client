function joinLobby(object){
    let lobbyId = object.parentNode.parentNode.firstElementChild.innerHTML;
    mp.trigger('joinLobbyButtonEvent', lobbyId);
}

function leaveLobby(object){
    let lobbyId = object.parentNode.parentNode.firstElementChild.innerHTML;
    mp.trigger('leaveLobbyButtonEvent', lobbyId);
}

function makeNotReady(object){
    let lobbyId = object.parentNode.parentNode.firstElementChild.innerHTML;
    mp.trigger('makeNotReadyButtonEvent', lobbyId);
}

function makeReady(object){
    let lobbyId = object.parentNode.parentNode.firstElementChild.innerHTML;
    mp.trigger('makeReadyButtonEvent', lobbyId);
}