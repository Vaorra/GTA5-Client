let speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
let speedometerUI:any = null;
let updateIntervalSpeedo:any = null;


mp.events.add("playerIsOnDriverSeat", () => {
    mp.gui.chat.push('You got into the car, driver seat');
    speedometerUI = mp.browsers.new(speedoMeterHTML);
});
 
 mp.events.add("playerLeaveDriverSeat", () => {
    clearInterval(updateIntervalSpeedo);
    setTimeout(() => {
        mp.gui.chat.push("Player start leave the vehicle");

        mp.browsers.forEach(browser => {
            if (browser.url === speedoMeterHTML) {
                browser.destroy();
            }
        });
    }, 250)
})

mp.events.add("updateVehicleData", () => {
    updateIntervalSpeedo = setInterval(() => {
        let vehicle = mp.players.local.vehicle;
        let max = mp.game.vehicle.getVehicleModelMaxSpeed(vehicle.model);
        
        
        speedometerUI.execute(`setSpeed('${vehicle.getSpeed()}', '${vehicle.gear}', '${vehicle.rpm}', '${max}');`);


        mp.gui.chat.push(JSON.stringify("Gear:" + vehicle.gear));
        mp.gui.chat.push(JSON.stringify("RPM:" + vehicle.rpm));
        mp.gui.chat.push(JSON.stringify("CSpeed:" + vehicle.getSpeed()));
        mp.gui.chat.push(JSON.stringify("max:" + max));
        //console.log(max);
    }, 100);
});
