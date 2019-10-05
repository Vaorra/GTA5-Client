"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rpc = __importStar(require("rage-rpc"));
var lobbyUI = null;
mp.keys.bind(0x4C, true, function () {
    if (!mp.gui.cursor.visible) {
        lobbyUI = mp.browsers.new("package://websites/lobbyui/lobbyui.html");
        mp.gui.cursor.show(true, true);
        rpc.callBrowsers("test", "MOIN SERVIS MOIN");
    }
});
mp.events.add("closeLobbyUI", function () {
    mp.browsers.at(0).destroy();
    mp.gui.cursor.show(false, false);
});
