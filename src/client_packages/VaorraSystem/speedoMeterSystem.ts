let speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
let speedometerUI:any = null;
let player = mp.players.local

mp.events.add("playerEnterVehicle", () => {
    if(speedometerUI !== null){
        speedometerUI.destroy();
        speedometerUI = null;
    }

    speedometerUI = mp.browsers.new(speedoMeterHTML);
});

mp.events.add("playerLeaveVehicle", () => {

    if(speedometerUI !== null){
        speedometerUI.destroy();
        speedometerUI = null;
    }

});

mp.events.add("playerDeath", () => {

    if(speedometerUI !== null){
        speedometerUI.destroy();
        speedometerUI = null;
    }
    
});

mp.events.add("render", () => {

    if(player.vehicle !== null && speedometerUI !== null && player.vehicle.getPedInSeat(-1) === player.handle){
        let max = mp.game.vehicle.getVehicleModelMaxSpeed(player.vehicle.model);
        speedometerUI.execute(`setSpeed('${player.vehicle.getSpeed()}', '${player.vehicle.gear}', '${player.vehicle.rpm}', '${max}');`);
    }

});