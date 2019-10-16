"use strict";
var speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
var speedometerUI = null;
var updateIntervalSpeedo = null;
mp.events.add("playerIsOnDriverSeat", function () {
    mp.gui.chat.push('You got into the car, driver seat');
    speedometerUI = mp.browsers.new(speedoMeterHTML);
});
mp.events.add("playerLeaveDriverSeat", function () {
    clearInterval(updateIntervalSpeedo);
    setTimeout(function () {
        mp.gui.chat.push("Player start leave the vehicle");
        mp.browsers.forEach(function (browser) {
            if (browser.url === speedoMeterHTML) {
                browser.destroy();
            }
        });
    }, 250);
});
mp.events.add("updateVehicleData", function () {
    updateIntervalSpeedo = setInterval(function () {
        var vehicle = mp.players.local.vehicle;
        var max = mp.game.vehicle.getVehicleModelMaxSpeed(vehicle.model);
        speedometerUI.execute("setSpeed('" + vehicle.getSpeed() + "', '" + vehicle.gear + "', '" + vehicle.rpm + "', '" + max + "');");
        mp.gui.chat.push(JSON.stringify("Gear:" + vehicle.gear));
        mp.gui.chat.push(JSON.stringify("RPM:" + vehicle.rpm));
        mp.gui.chat.push(JSON.stringify("CSpeed:" + vehicle.getSpeed()));
        mp.gui.chat.push(JSON.stringify("max:" + max));
        //console.log(max);
    }, 100);
});
