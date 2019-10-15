let speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
let speedometerUI:any = null;
let vehicle:any = null;
let max:any = 0;


function playerEnterVehicleHandler(vehicle:any, seat:any) {
    if (seat === 0) 
        mp.gui.chat.push(`You got into the car, driver seat` + seat);
        speedometerUI = mp.browsers.new(speedoMeterHTML);
 }
 
 mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);



 mp.events.add("playerLeaveVehicle", () => {
    mp.gui.chat.push("Player start leave the vehicle");

    mp.browsers.forEach(browser => {
        if (browser.url === speedoMeterHTML)
            browser.destroy();
    });
})

mp.events.add("getPlayerVehicleData", () => {
    vehicle = mp.players.local.vehicle;
    return vehicle;
});


mp.events.add("getMaxSpeedofVehicel", () => {
    max = mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model);
    return max;
});