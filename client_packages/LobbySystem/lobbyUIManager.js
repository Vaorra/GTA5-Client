"use strict";
var lobbyUI = null;
var updateInterval = null;
var playerData = null;
var lobbyVersions = {};
mp.events.add("receiveLobbyData", function (lobby) {
    var participantsString = "";
    for (var _i = 0, _a = lobby.participants; _i < _a.length; _i++) {
        var participant = _a[_i];
        if (participant.ready) {
            participantsString = participantsString + " " + participant.name + " (<span class=\"text-success\">Ready</span>)<br>";
        }
        else {
            participantsString = participantsString + " " + participant.name + " (<span class=\"text-warning\">not Ready</span>)<br>";
        }
    }
    if (playerData !== null) {
        if (playerData.lobbyId === null) {
            if (lobby.running) {
                lobbyUI.execute("updateLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '');");
            }
            else {
                lobbyUI.execute("updateLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '<button onclick=\"joinLobby(this)\" type=\"button\" class=\"btn btn-success btn-sm\">Join</button>');");
            }
        }
        else {
            if (playerData.lobbyId === lobby.id) {
                if (lobby.running) {
                    lobbyUI.execute("updateLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '');");
                }
                else {
                    if (playerData.isReady) {
                        lobbyUI.execute("updateLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '<button onclick=\"leaveLobby(this)\" type=\"button\" class=\"btn btn-danger btn-sm mr-2\">Leave</button><button onclick=\"makeNotReady(this)\" type=\"button\" class=\"btn btn-danger btn-sm\">not Ready</button>');");
                    }
                    else {
                        lobbyUI.execute("updateLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '<button onclick=\"leaveLobby(this)\" type=\"button\" class=\"btn btn-danger btn-sm mr-2\">Leave</button><button onclick=\"makeReady(this)\" type=\"button\" class=\"btn btn-success btn-sm\">Ready</button>');");
                    }
                }
            }
            else {
                lobbyUI.execute("updateLobby('" + lobby.id + "', '" + lobby.gameMode + "', '" + lobby.running + "', '" + participantsString + "', '');");
            }
        }
    }
});
mp.events.add("receivePlayerData", function (playerDataEvent) {
    playerData = playerDataEvent;
});
mp.events.add("receiveLobbyVersions", function (lobbyVersionEvent) {
    lobbyVersionEvent.forEach(function (lobbyInfo) {
        if (lobbyInfo.lobbyVersion !== lobbyVersions[lobbyInfo.lobbyId]) {
            lobbyVersions[lobbyInfo.lobbyId] = lobbyInfo.lobbyVersion;
            mp.events.callRemote("requestLobbyData", lobbyInfo.lobbyId);
        }
    });
});
mp.keys.bind(0x4C, true, function () {
    if (!mp.gui.cursor.visible) {
        lobbyUI = mp.browsers.new("package://LobbySystem/LobbyUI/lobbyui.html");
        mp.gui.cursor.show(true, true);
        updateInterval = setInterval(function () {
            mp.events.callRemote("requestPlayerData");
            mp.events.callRemote("requestLobbyVersions");
        }, 200);
    }
});
mp.events.add("closeLobbyUI", function () {
    clearInterval(updateInterval);
    setTimeout(function () {
        mp.browsers.at(0).destroy();
        mp.gui.cursor.show(false, false);
        lobbyVersions = {};
    }, 250);
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
