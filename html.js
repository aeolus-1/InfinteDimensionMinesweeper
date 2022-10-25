var dim = []


var htmls = {
    singleTile:`<div class="singleTile"></div>`,
    divD4:`<div class="divD4"></div>`,
    divD3:`<div class="divD3"></div>`,
    divD2:`<div class="divD2"></div>`,
    divD1:`<div class="divD1"></div>`,
}

function tileOnClick(e) {
    console.log(this.id)
}
var container = document.getElementById("boardContainer")

container.id = Math.random()

function refresh() {
    container.innerHTML = ""
    var currentParent = container
    for (let d1 = 0; d1 < dim[0]; d1++) {
        var e = createElementFromHTML(htmls.divD4)
        currentParent.appendChild(e)
        var preParent4 = currentParent.id

        currentParent = e
        for (let d2 = 0; d2 < dim[1]; d2++) {
            var e = createElementFromHTML(htmls.divD3)
            currentParent.appendChild(e)
            var preParent3 = currentParent.id

            currentParent = e
            for (let d3 = 0; d3 < dim[2]; d3++) {
                var e = createElementFromHTML(htmls.divD2)
                currentParent.appendChild(e)
                var preParent2 = currentParent.id

                currentParent = e
                for (let d4 = 0; d4 < dim[3]; d4++) {




                    var tile = createElementFromHTML(htmls.singleTile)
                    tile.id = `${d1}-${d2}-${d3}-${d4}`



                    tile.onmousedown = Input.mouseClick
                    tile.onmouseover = Input.mouseOver



                    currentParent.appendChild(tile)




                }
                currentParent = document.getElementById(preParent2)

            }
            currentParent = document.getElementById(preParent3)

        }
        currentParent = document.getElementById(preParent4)
    }
}




document.addEventListener('contextmenu', event => event.preventDefault());
