"use strict";
var speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
var speedometerUI = null;
var player = mp.players.local;
mp.events.add("playerEnterVehicle", function () {
    if (speedometerUI !== null) {
        speedometerUI.destroy();
        speedometerUI = null;
    }
    speedometerUI = mp.browsers.new(speedoMeterHTML);
});
mp.events.add("playerLeaveVehicle", function () {
    if (speedometerUI !== null) {
        speedometerUI.destroy();
        speedometerUI = null;
    }
});
mp.events.add("playerDeath", function () {
    if (speedometerUI !== null) {
        speedometerUI.destroy();
        speedometerUI = null;
    }
});
mp.events.add("render", function () {
    if (player.vehicle !== null && speedometerUI !== null && player.vehicle.getPedInSeat(-1) === player.handle) {
        var max = mp.game.vehicle.getVehicleModelMaxSpeed(player.vehicle.model);
        speedometerUI.execute("setSpeed('" + player.vehicle.getSpeed() + "', '" + player.vehicle.gear + "', '" + player.vehicle.rpm + "', '" + max + "');");
    }
});
