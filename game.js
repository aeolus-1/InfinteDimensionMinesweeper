function endGame() {
    console.log("end")
    var keys = Object.keys(gridOb)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        gridOb[key].uncovered = true
    }

    Output.updateNum()
}