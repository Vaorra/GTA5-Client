
mp.events.add("spectetPlayer", (target) => {
    mp.gui.chat.push(target.name)
    let cam = mp.cameras.new("specCam") // example, cam gets created
    cam.attachTo(target.handle, 10.0, 0.0, 10.0, true); 
    cam.setActive(true);
});