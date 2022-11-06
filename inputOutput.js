function v4(x, y, z, w) {
    return {
        x:x,
        y:y,
        z:z,
        w:w,
    }
}

function outOfBounds(pos, dim) {
    for (let i = 0; i < pos.length; i++) {
        if (pos[i] < 0 || pos[i] >= dim[i]) {
            return true
        }
    }
    
    
    return false

}

function getEleByPos(pos) {
    var s = ''
    for (let i = 0; i < parseInt(dimensionsRange.value); i++) {
        s += `${pos[i]}-`
    }
    return document.getElementById(s)
}
function parseIdPos(e) {
    var splitString = e.split("-")
    splitString.splice(splitString.length-1, 1)
    for (let i = 0; i < splitString.length; i++) {
        splitString[i] = parseInt(splitString[i])
        
    }

    return splitString
}
function posToString(pos) {
    var s = ""
    for (let i = 0; i < pos.length; i++) {
        const p = pos[i];
        s += `${p}-`
    }
    return s
}
function getNeighbours(posS, dim) {
    var nei = []
    function interLoop(inter, pos) {
        if (inter!=0) {
            for (let i1 = -1; i1 < 2; i1+=1) {
                interLoop(inter-1, [i1+posS[inter-1], ...pos])
            }
            
        } else {
            var newPos = pos
            if (!outOfBounds(newPos, dim)) {
                nei.push(newPos)
            }
        }
    }
    interLoop(parseInt(dimensionsRange.value), [])
    return nei
}




class Input {
    static mouseOver(e) {
        Output.tileHighlights(parseIdPos(this.id))
        if (mouseDown) {
            
            this.onmousedown({
                button:0
            })
        }
    }
    static alreadyDoneTiles = []
    static mouseClick(e) {
        
        if (e.button == 0) {

            if (!gridOb[this.id].uncovered) {
                if (firstClick) {
                    firstClick = false

                    if (gridOb[this.id].mine) {

                    } 
                        
                    while((()=>{
                        var neighbours = [...getNeighbours(parseIdPos(this.id), dim), parseIdPos(this.id)],
                        mineNum = 0
                        
                        console.log(neighbours)
                        neighbours.forEach(tile => {
                            if (gridOb[posToString(tile)].mine) {mineNum += 1}
                        });
                        console.log(mineNum)
                        return mineNum > 0

                        
                    })()) {
                        var neighbours = [...getNeighbours(parseIdPos(this.id), dim), parseIdPos(this.id)],
                            mineNei = []
                        neighbours.forEach(tile => {
                            if (gridOb[posToString(tile)].mine) {mineNei.push(posToString(tile))}
                        });
                        var emptyTiles = Object.keys(gridOb).filter((a)=>{
                            return !gridOb[a].mine
                        })
                        
                        mineNei.forEach(nei => {
                            gridOb[nei].mine = false
                            gridOb[emptyTiles[randInt(0, emptyTiles.length-1)]].mine = true
                        });

                    }
                    
                    
                }

                if (gridOb[this.id].flagged) {
                    gridOb[this.id].flagged = false
                } else {

                    gridOb[this.id].uncovered = true
                    if (gridOb[this.id].mine) {
                        endGame()

                    } else if (enableChainBreaking) {
                        Input.alreadyDoneTiles = []
                        testForCompletlyEmptyTiles(this.id)
                        
                    }
                }
            }

        } else {
            if (!gridOb[this.id].uncovered) {
                
                gridOb[this.id].flagged = !gridOb[this.id].flagged
            }
        }
        
        Output.updateNum()

        testForWin()

    }

    
}


function testForCompletlyEmptyTiles(pos) {
    var neighbours = getNeighbours(parseIdPos(pos), dim),
    mineNum = 0

    

    neighbours.forEach(tile => {
        if (gridOb[posToString(tile)].mine) {mineNum += 1}
    });

    if (mineNum <= 0) {
        neighbours.forEach(tile => {
            if (!gridOb[posToString(tile)].uncovered && !Input.alreadyDoneTiles.includes(posToString(tile))) {
                Input.alreadyDoneTiles.push(posToString(tile))
                gridOb[posToString(tile)].uncovered = true
                testForCompletlyEmptyTiles(posToString(tile))
                
                
            }
        });
    }
    Output.updateNum()

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

                
            var tileOb = gridOb[posToString(tilePos)]
                
            tile.textContent = ""
            if (tileOb.uncovered) {
                var neighbours = getNeighbours(parseIdPos(tile.id), dim),
                    mineNum = 0

                if (gridOb[tile.id].mine) {
                    tile.textContent = "💣"
                } else {

                neighbours.forEach(tile => {
                    if (gridOb[posToString(tile)].flagged && removeFlaggedMines) mineNum -= 1 
                    if (gridOb[posToString(tile)].mine) mineNum += 1
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

var mouseDown = false 
document.addEventListener("mousedown",()=>{mouseDown = true})
document.addEventListener("mouseup",()=>{mouseDown = false})