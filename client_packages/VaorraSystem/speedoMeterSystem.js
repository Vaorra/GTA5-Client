"use strict";
var speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
var speedometerUI = null;
var vehicle = null;
var max = 0;
function playerEnterVehicleHandler(vehicle, seat) {
    if (seat === 0)
        mp.gui.chat.push("You got into the car, driver seat" + seat);
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
mp.events.add("getPlayerVehicleData", function () {
    vehicle = mp.players.local.vehicle;
    return vehicle;
});
mp.events.add("getMaxSpeedofVehicel", function () {
    max = mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model);
    return max;
});
