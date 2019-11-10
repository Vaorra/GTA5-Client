"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nativeui = __importStar(require("../nativeui/index"));
var ui = new nativeui.Menu("Test UI", "lol", new nativeui.Point(50, 50));
mp.keys.bind(0x4D, true, function () {
    if (ui.Visible)
        ui.Close();
    else
        ui.Open();
});
