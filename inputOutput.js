function v4(x, y, z, w) {
    return {
        x:x,
        y:y,
        z:z,
        w:w,
    }
}

function outOfBounds(pos, dim) {
    if (pos.x < 0 || pos.x >= dim[0]) {
        return true
    }
    if (pos.y < 0 || pos.y >= dim[1]) {
        return true
    }
    if (pos.z < 0 || pos.z >= dim[2]) {
        return true
    }
    if (pos.w < 0 || pos.w >= dim[3]) {
        return true
    }
    return false

}
function getEleByPos(pos) {
    return document.getElementById(`${pos.x}-${pos.y}-${pos.z}-${pos.w}`)
}
function parseIdPos(e) {
    var splitString = e.split("-")
    return v4(
        parseInt(splitString[0]),
        parseInt(splitString[1]),
        parseInt(splitString[2]),
        parseInt(splitString[3]),
    )
}
function getNeighbours(pos, dim) {
    var nei = []
    for (let i4 = -1; i4 < 2; i4+=1) {
        for (let i3 = -1; i3 < 2; i3+=1) {
            for (let i2 = -1; i2 < 2; i2+=1) {
                for (let i1 = -1; i1 < 2; i1+=1) {
                    if (!(i4==0&&i3==0&&i2==0&&i1==0)) {
                        var newPos = v4(
                            pos.x+i4,
                            pos.y+i3,
                            pos.z+i2,
                            pos.w+i1,
                        )
                        if (!outOfBounds(newPos, dim)) {
                            nei.push(newPos)
                        }
                    }
                }
            }
        }
    }
    return nei
}





class Input {
    static mouseOver(e) {
        Output.tileHighlights(parseIdPos(this.id))
    }

    static mouseClick(e) {
        if (e.button == 0) {

            if (!gridOb[this.id].uncovered) {

                if (gridOb[this.id].flagged) {
                    gridOb[this.id].flagged = false
                    console.log("yay")
                } else {

                    gridOb[this.id].uncovered = true
                    if (gridOb[this.id].mine) {
                        endGame()

                    } else {
                        var neighbours = getNeighbours(parseIdPos(this.id), dim),
                        mineNum = 0

                        

                        neighbours.forEach(tile => {
                            if (gridOb[`${tile.x}-${tile.y}-${tile.z}-${tile.w}`].mine) mineNum += 1
                        });

                        if (mineNum <= 0) {
                            neighbours.forEach(tile => {
                                gridOb[`${tile.x}-${tile.y}-${tile.z}-${tile.w}`].uncovered = true
                            });
                        }
                    }
                }
            }

        } else {
            if (!gridOb[this.id].uncovered) {
                
                gridOb[this.id].flagged = !gridOb[this.id].flagged
            }
        }
        Output.updateNum()

    }
}




class Output {
    
    static tileHighlights(pos) {
        var ar = document.getElementsByClassName("singleTile")
        for (let i = 0; i < ar.length; i++) {
            const tile = ar[i];
            tile.style.border = ""
            
        }
        

        function highlightTile(pos) {
            var tileToH = getEleByPos(pos)
            tileToH.style.border = "solid 2px lightblue"
        }


        
        var ar = getNeighbours(pos, dim)

        for (let i = 0; i < ar.length; i++) {
            const neiTile = ar[i];
            highlightTile(neiTile)
        }
    }

    static updateNum() {
        var ar = document.getElementsByClassName("singleTile")
        for (let i = 0; i < ar.length; i++) {
            var tile = ar[i],
                tilePos = parseIdPos(tile.id)

            var tileOb = gridOb[`${tilePos.x}-${tilePos.y}-${tilePos.z}-${tilePos.w}`]
                
            tile.textContent = ""
            if (tileOb.uncovered) {
                var neighbours = getNeighbours(parseIdPos(tile.id), dim),
                    mineNum = 0

                if (gridOb[tile.id].mine) {
                    tile.textContent = "💣"
                } else {

                neighbours.forEach(tile => {
                    if (gridOb[`${tile.x}-${tile.y}-${tile.z}-${tile.w}`].flagged) mineNum -= 1 
                    if (gridOb[`${tile.x}-${tile.y}-${tile.z}-${tile.w}`].mine) mineNum += 1
                });

                if (mineNum != 0) tile.textContent = mineNum
                tile.style.background = "#999"

            }
            } else {
                tile.style.background = "#444"
                if (tileOb.flagged) {

                    tile.textContent = "🏴‍☠️"
                }
            }
            
            
        }
    }
}

