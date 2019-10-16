let speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
let speedometerUI:any = null;


function playerEnterVehicleHandler(vehicle:any, seat:any) {
    setTimeout(() => {
        if (seat === 0) 
            mp.gui.chat.push(`You got into the car, driver seat` + seat);
            speedometerUI = mp.browsers.new(speedoMeterHTML);
    }, 5000);
 }
 
 mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);



 mp.events.add("playerLeaveVehicle", () => {
    mp.gui.chat.push("Player start leave the vehicle");

    mp.browsers.forEach(browser => {
        if (browser.url === speedoMeterHTML)
            browser.destroy();
    });
})

mp.events.add("updateVehicleData", () => {
    setInterval(function() {
        let vehicle = mp.players.local.vehicle;
        let max = mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model);
        
        
        speedometerUI.execute(`setSpeed('${vehicle.getSpeed()}', '${vehicle.gear}', '${vehicle.rpm}', '${max}');`);


        mp.gui.chat.push(JSON.stringify("Gear:" + vehicle.gear));
        mp.gui.chat.push(JSON.stringify("RPM:" + vehicle.rpm));
        mp.gui.chat.push(JSON.stringify("CSpeed:" + vehicle.getSpeed()));
        mp.gui.chat.push(JSON.stringify("max:" + max));
        //console.log(max);
    }, 100);
});
