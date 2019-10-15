function playerEnterVehicleHandler(vehicle:any, seat:any) {
    mp.gui.chat.push(`You got into the car with ID: ${vehicle.id}. Seat: ${seat}`);
 }
 
 mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);

 