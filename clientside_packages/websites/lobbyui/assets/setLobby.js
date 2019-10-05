rpc.register("test", (name) => {
    let test = document.getElementById("joined-status");
    test.innerHTML = name;
});