"use strict";
function playerEnterVehicleHandler(vehicle, seat) {
    mp.gui.chat.push("You got into the car with ID: " + vehicle.id + ". Seat: " + seat);
}
mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);
