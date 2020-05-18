function test(lobbyCount) {

    var i = 0;

    while (i < lobbyCount){
        var table = document.getElementById("lobbies");
        var row = table.insertRow(0);
        var gamemodeCell = row.insertCell(0);
        var statusCell = row.insertCell(1);
        var playersCell = row.insertCell(2);
        var buttonCell = row.insertCell(3);

        gamemodeCell.innerHTML = i;
        statusCell.innerHTML = i;
        playersCell.innerHTML = i;
        buttonCell.innerHTML = i;

        i++;
    }

}