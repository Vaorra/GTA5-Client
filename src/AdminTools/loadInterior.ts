const test300 = mp.game.interior.getInteriorAtCoords(1100.000, 220.000, -50.000)
mp.game.interior.enableInteriorProp(test300, "vw_casino_main")
mp.game.streaming.requestIpl("vw_casino_main");
mp.game.interior.refreshInterior(test300)
