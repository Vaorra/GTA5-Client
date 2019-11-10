import * as nativeui from "../nativeui/index"

const ui = new nativeui.Menu("Test UI", "lol", new nativeui.Point(50, 50));

mp.keys.bind(0x4D, true, () => {

    if(ui.Visible) ui.Close()
    else ui.Open()

})