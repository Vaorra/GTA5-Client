"use strict";
mp.events.add("spectetPlayer", function (target) {
    var cam = mp.cameras.new('values go here'); // example, cam gets created
    cam.attachTo(target.handle, 10.0, 0.0, 10.0, true);
    cam.setActive(true);
});
