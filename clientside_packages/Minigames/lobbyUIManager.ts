let lobbyUI:any = null;
let updateInterval:any = null;
let playerData:any = null;

mp.events.add("receiveLobbyData", (lobbies) => {
    lobbyUI.execute(`$('#lobbies tr').remove();`);
    for (let lobby of lobbies){
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
                lobbyUI.execute(`setLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '<button onclick="joinLobby(this)" type="button" class="btn btn-success btn-sm">Join</button>');`);
            } else {
                if(playerData.lobbyId === lobby.id){
                    if(playerData.isReady){
                        lobbyUI.execute(`setLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '<button onclick="leaveLobby(this)" type="button" class="btn btn-danger btn-sm mr-2">Leave</button><button onclick="makeNotReady(this)" type="button" class="btn btn-danger btn-sm">not Ready</button>');`);
                    } else {
                        lobbyUI.execute(`setLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '<button onclick="leaveLobby(this)" type="button" class="btn btn-danger btn-sm mr-2">Leave</button><button onclick="makeReady(this)" type="button" class="btn btn-success btn-sm">Ready</button>');`);
                    }
                } else {
                    lobbyUI.execute(`setLobby('${lobby.id}', '${lobby.gameMode}', '${lobby.running}', '${participantsString}', '');`);
                }
            }
        }
    }
});

mp.events.add("receivePlayerData", (playerDataEvent) => {
    playerData = playerDataEvent;
});

mp.keys.bind(0x4C, true, () => {

    if(!mp.gui.cursor.visible){
        lobbyUI = mp.browsers.new("package://websites/lobbyui/lobbyui.html");
        mp.gui.cursor.show(true, true);

        updateInterval = setInterval(() => {
            mp.events.callRemote("requestLobbyData");
            mp.events.callRemote("requestPlayerData");

        }, 200);
    }

});

mp.events.add("closeLobbyUI", () => {
    clearInterval(updateInterval);
    mp.browsers.at(0).destroy();
    mp.gui.cursor.show(false, false);
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