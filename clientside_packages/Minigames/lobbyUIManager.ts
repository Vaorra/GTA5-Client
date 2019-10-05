import * as rpc from "rage-rpc"

let lobbyUI:any = null;

mp.keys.bind(0x4C, true, () => {

    if(!mp.gui.cursor.visible){
        lobbyUI = mp.browsers.new("package://websites/lobbyui/lobbyui.html");
        mp.gui.cursor.show(true, true);
        rpc.callBrowsers("test", "MOIN SERVIS MOIN");
    }

});

mp.events.add("closeLobbyUI", () => {

    mp.browsers.at(0).destroy();
    mp.gui.cursor.show(false, false);

});