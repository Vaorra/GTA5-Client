"use strict";
var speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
var speedometerUI = null;
function playerEnterVehicleHandler(vehicle, seat) {
    setTimeout(function () {
        if (seat === 0)
            mp.gui.chat.push("You got into the car, driver seat" + seat);
        speedometerUI = mp.browsers.new(speedoMeterHTML);
    }, 5000);
}
mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);
mp.events.add("playerLeaveVehicle", function () {
    mp.gui.chat.push("Player start leave the vehicle");
    mp.browsers.forEach(function (browser) {
        if (browser.url === speedoMeterHTML)
            browser.destroy();
    });
});
mp.events.add("updateVehicleData", function () {
    setInterval(function () {
        var vehicle = mp.players.local.vehicle;
        var max = mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model);
        speedometerUI.execute("setSpeed('" + vehicle.getSpeed() + "', '" + vehicle.gear + "', '" + vehicle.rpm + "', '" + max + "');");
        mp.gui.chat.push(JSON.stringify("Gear:" + vehicle.gear));
        mp.gui.chat.push(JSON.stringify("RPM:" + vehicle.rpm));
        mp.gui.chat.push(JSON.stringify("CSpeed:" + vehicle.getSpeed()));
        mp.gui.chat.push(JSON.stringify("max:" + max));
        //console.log(max);
    }, 100);
});
