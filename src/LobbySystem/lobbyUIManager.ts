let lobbyUI:any = null;
let updateInterval:any = null;
let playerData:any = null;

let lobbyVersions: {[lobbyId: number]: number} = {};

mp.events.add("receiveLobbyData", (lobby) => {

    let participantsString = "";
    for(let participant of lobby.participants){
        if(participant.ready){
            participantsString = `${participantsString} ${participant.name} (<span class="text-success">Ready</span>)<br>`
        } else {
            participantsString = `${participantsString} ${participant.name} (<span class="text-warning">not Ready</span>)<br>`   
        }
    }

    if(playerData !== null){
        if (playerData.lobbyId === null){
            if(lobby.running){
                lobbyUI.execute(`updateLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '');`);
            } else {
                lobbyUI.execute(`updateLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '<button onclick="joinLobby(this)" type="button" class="btn btn-success btn-sm">Join</button>');`);
            }
        } else {
            if(playerData.lobbyId === lobby.id){
                if(lobby.running){
                    lobbyUI.execute(`updateLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '');`);
                }else {
                    if(playerData.isReady){
                        lobbyUI.execute(`updateLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '<button onclick="leaveLobby(this)" type="button" class="btn btn-danger btn-sm mr-2">Leave</button><button onclick="makeNotReady(this)" type="button" class="btn btn-danger btn-sm">not Ready</button>');`);
                    } else {
                        lobbyUI.execute(`updateLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '<button onclick="leaveLobby(this)" type="button" class="btn btn-danger btn-sm mr-2">Leave</button><button onclick="makeReady(this)" type="button" class="btn btn-success btn-sm">Ready</button>');`);
                    }
                }
            } else {
                lobbyUI.execute(`updateLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '');`);
            }
        }
    }
});

mp.events.add("receivePlayerData", (playerDataEvent) => {
    playerData = playerDataEvent;
});

mp.events.add("receiveLobbyVersions", (lobbyVersionEvent: [{lobbyId: number, lobbyVersion: number}]) => {

    lobbyVersionEvent.forEach(lobbyInfo => {
        if(lobbyInfo.lobbyVersion !== lobbyVersions[lobbyInfo.lobbyId]){
            lobbyVersions[lobbyInfo.lobbyId] = lobbyInfo.lobbyVersion;
            mp.events.callRemote("requestLobbyData", lobbyInfo.lobbyId);
        }
    });

});

mp.keys.bind(0x4C, true, () => {
    
    if(!mp.gui.cursor.visible){
        lobbyUI = mp.browsers.new("package://LobbySystem/LobbyUI/lobbyui.html");
        mp.gui.cursor.show(true, true);

        updateInterval = setInterval(() => {
            mp.events.callRemote("requestPlayerData");
            mp.events.callRemote("requestLobbyVersions");

        }, 200);
    }

});

mp.events.add("closeLobbyUI", () => {
    clearInterval(updateInterval);
    setTimeout(() => {
        mp.browsers.forEach(browser => {
            if(browser.url === "package://LobbySystem/LobbyUI/lobbyui.html"){
                browser.destroy();
                mp.gui.cursor.show(false, false);
            }
        });
        lobbyVersions = {};
    }, 250)
});

mp.events.add("joinLobbyButtonEvent", (lobbyId) => {
    mp.events.callRemote("joinLobby", parseInt(lobbyId));
});

mp.events.add("leaveLobbyButtonEvent", (lobbyId) => {
    mp.events.callRemote("leaveLobby", parseInt(lobbyId));
});

mp.events.add("makeReadyButtonEvent", (lobbyId) => {
    mp.events.callRemote("makeReady", parseInt(lobbyId));
});

mp.events.add("makeNotReadyButtonEvent", (lobbyId) => {
    mp.events.callRemote("makeNotReady", parseInt(lobbyId));
});