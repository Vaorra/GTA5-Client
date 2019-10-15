
mp.events.add("spectatePlayer", (target) => {
    mp.gui.chat.push("CLient: event triggered");
    mp.gui.chat.push("Client: " + target.name)
    let cam = mp.cameras.new("specCam");
    cam.attachTo(target.id, 10.0, 10.0, 10.0, true); 
    cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});