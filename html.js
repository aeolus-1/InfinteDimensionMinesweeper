var dim = []


var htmls = {
    singleTile:`<span class="singleTile"></span>`,
    
    divD1:`<div class="divD1"></div>`,
    divD2:`<div class="divD2"></div>`,
    divD3:`<div class="divD3"></div>`,
    divD4:`<div class="divD4"></div>`,

}

function tileOnClick(e) {
    console.log(this.id)
}
var container = document.getElementById("boardContainer")

container.id = Math.random()

function interLoop(currentParent, inter, idChain) {
    if (inter != 0) {
        for (let d3 = 0; d3 < parseInt(document.getElementById(`dim${inter}Range`).value); d3++) {
            var e = createElementFromHTML(htmls[`divD${(inter%2)+1}`])
            e.style.margin = `${
                (Math.floor(inter/2)*3 )
            }px`
            currentParent.appendChild(e)
            var preParent2 = currentParent.id

            interLoop(e, inter-1, `${d3}-${idChain}`)
            
            currentParent = document.getElementById(preParent2)

        }
    } else {
        for (let d4 = 0; d4 < parseInt(document.getElementById(`dim${inter}Range`).value); d4++) {




            var tile = createElementFromHTML(htmls.singleTile)
            tile.id = `${d4}-${idChain}`



            tile.onmousedown = Input.mouseClick
            tile.onmouseover = Input.mouseOver



            currentParent.appendChild(tile)




        }
    }
}

function refresh() {
    container.innerHTML = ""
    var currentParent = container
    interLoop(currentParent, parseInt(dimensionsRange.value)-1, "")
    
}


function refreshDimensions() {
    var d = document.getElementById("dimensionsInput")
    d.innerHTML = ""
    for (let i = 0; i < parseInt(dimensionsRange.value); i++) {
        var id = `dim${i}Range`
        d.innerHTML += `${i!=0?" x ":""}</label><input value="4" min="3" max="100" type="number" name="${id}" id="${id}">`

    }
}
var dimensionsRange = document.getElementById("dimensionsRange")
dimensionsRange.onchange = refreshDimensions
document.addEventListener('contextmenu', event => event.preventDefault());

refreshDimensions()
