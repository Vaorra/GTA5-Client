let speedoMeterHTML = "package://VaorraSystem/speedometerUI/speedometerUI.html";
let speedometerUI:any = null;
function playerEnterVehicleHandler(vehicle:any, seat:any) {
    if (seat === 0) 
        mp.gui.chat.push(`You got into the car, driver seat`);
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