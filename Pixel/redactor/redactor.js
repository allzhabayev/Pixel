let field = document.querySelector('.field')


for (let i = 0; i < 450; i++){
    let cell = document.createElement('div')
    cell.classList.add('cell')
    field.appendChild(cell)
}

var CURRENT_COLOR = "rgb(255, 0, 0)";
var DEFAULT_COLOR = "rgb(255, 255, 255)";

var COLOR_MAP = {
    "red": 'red',
    "green": 'green',
    "yellow": 'yellow',
    "black": 'black',
    "grey": 'grey'
}










//Рисует

let color_cells = document.querySelectorAll('.color-cell')
console.log(color_cells)

for (let i = 0; i < color_cells.length; i++){
    let color_cell = color_cells[i];
    color_cell.addEventListener('click', function(){
        let colorClass = "";
        if(color_cell.classList.contains("red")){
        colorClass = "red";
        console.log('red')
        } 
        
        else if (color_cell.classList.contains("green")) colorClass = "green"
        else if (color_cell.classList.contains("green")) colorClass = "green"
        else if (color_cell.classList.contains("yellow")) colorClass = "yellow"
        else if (color_cell.classList.contains("black")) colorClass = "black"
        else if (color_cell.classList.contains("grey")) colorClass = "grey"
        
        CURRENT_COLOR = COLOR_MAP [colorClass];
        document.querySelector('.selected'). classList.remove(selected)
        color_cell.classList.add('selected')

    })
}