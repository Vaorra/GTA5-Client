"use strict";
var speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
var speedometerUI = null;
function playerEnterVehicleHandler(vehicle, seat) {
    if (seat === 0)
        mp.gui.chat.push("You got into the car, driver seat");
    speedometerUI = mp.browsers.new(speedoMeterHTML);
}
mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);
mp.events.add("playerLeaveVehicle", function () {
    mp.gui.chat.push("Player start leave the vehicle");
    mp.browsers.forEach(function (browser) {
        if (browser.url === speedoMeterHTML)
            browser.destroy();
    });
});
