"use strict";
var lobbyUI = null;
var updateInterval = null;
var playerData = null;
mp.events.add("receiveLobbyData", function (lobbies) {
    lobbyUI.execute("$('#lobbies tr').remove();");
    for (var _i = 0, lobbies_1 = lobbies; _i < lobbies_1.length; _i++) {
        var lobby = lobbies_1[_i];
        var participantsString = "";
        for (var _a = 0, _b = lobby.participants; _a < _b.length; _a++) {
            var participant = _b[_a];
            if (participant.ready) {
                participantsString = participantsString + " " + participant.name + " (<span class=\"text-success\">Ready</span>)<br>";
            }
            else {
                participantsString = participantsString + " " + participant.name + " (<span class=\"text-warning\">not Ready</span>)<br>";
            }
        }
        if (playerData !== null) {
            if (playerData.lobbyId === null) {
                lobbyUI.execute("setLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '<button onclick=\"joinLobby(this)\" type=\"button\" class=\"btn btn-success btn-sm\">Join</button>');");
            }
            else {
                if (playerData.lobbyId === lobby.id) {
                    if (playerData.isReady) {
                        lobbyUI.execute("setLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '<button onclick=\"leaveLobby(this)\" type=\"button\" class=\"btn btn-danger btn-sm mr-2\">Leave</button><button onclick=\"makeNotReady(this)\" type=\"button\" class=\"btn btn-danger btn-sm\">not Ready</button>');");
                    }
                    else {
                        lobbyUI.execute("setLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '<button onclick=\"leaveLobby(this)\" type=\"button\" class=\"btn btn-danger btn-sm mr-2\">Leave</button><button onclick=\"makeReady(this)\" type=\"button\" class=\"btn btn-success btn-sm\">Ready</button>');");
                    }
                }
                else {
                    lobbyUI.execute("setLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '');");
                }
            }
        }
    }
});
mp.events.add("receivePlayerData", function (playerDataEvent) {
    playerData = playerDataEvent;
});
mp.keys.bind(0x4C, true, function () {
    if (!mp.gui.cursor.visible) {
        lobbyUI = mp.browsers.new("package://websites/lobbyui/lobbyui.html");
        mp.gui.cursor.show(true, true);
        updateInterval = setInterval(function () {
            mp.events.callRemote("requestLobbyData");
            mp.events.callRemote("requestPlayerData");
        }, 200);
    }
});
mp.events.add("closeLobbyUI", function () {
    clearInterval(updateInterval);
    mp.browsers.at(0).destroy();
    mp.gui.cursor.show(false, false);
});
mp.events.add("joinLobbyButtonEvent", function (lobbyId) {
    mp.events.callRemote("joinLobby", parseInt(lobbyId));
});
mp.events.add("leaveLobbyButtonEvent", function (lobbyId) {
    mp.events.callRemote("leaveLobby", parseInt(lobbyId));
});
mp.events.add("makeReadyButtonEvent", function (lobbyId) {
    mp.events.callRemote("makeReady", parseInt(lobbyId));
});
mp.events.add("makeNotReadyButtonEvent", function (lobbyId) {
    mp.events.callRemote("makeNotReady", parseInt(lobbyId));
});
