let field = document.querySelector('.field')


for (let i = 0; i < 450; i++){
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id', `${i}`)
    field.appendChild(cell)
}

var CURRENT_COLOR = "rgba(177, 177, 177, 1)";
var DEFAULT_COLOR = "rgba(0, 0, 0, 1)";

var COLOR_MAP = {
    "red": "rgb(255, 0, 0)",
    "green": "rgba(55, 255, 0, 1)",
    "yellow": "rgba(250, 230, 0, 1)",
    "black": "rgba(0, 0, 0, 1)",
    "grey": "rgba(154, 154, 154, 1)"
};


var FILL_MODE = false;
document.querySelector('.fill-tool').addEventListener('click', function(){
    FILL_MODE = true;
    
    document.querySelector('.selected'). classList.remove('selected')   
    this.classList.add('selected')  
})
 





let cells = document.querySelectorAll('.cell')
for (let i = 0; i < cells.length; i++){
    let cell = cells[i];
    cell.addEventListener('click', function(){
        cell.style.backgroundColor = CURRENT_COLOR;
    })

    cell.addEventListener('mouseover', function(){
        if (IS_CLICKED){
            cell.style.backgroundColor = CURRENT_COLOR;
        }       
    })
    cell.addEventListener('mousedown', function(){
        if (FILL_MODE == true && CURRENT_COLOR != DEFAULT_COLOR){
            let cell_id = parseInt(cell.getAttribute('id'));

            anime({
                targets: '.cell',
                backgroundColor: CURRENT_COLOR,
                duration: 500,
                easing: 'easeInOutQuad',
                delay: anime.stagger(50, {grid: [30, 15], from: cell_id}),
            });

            setTimeout(() => {
                for (let j = 0; j < cells.length; j++){
                    cells[j].style.backgroundColor = CURRENT_COLOR;
                }
            }, 1000);
        } else {
            cell.style.backgroundColor = CURRENT_COLOR; 
        }
    })  
}




// отслеживание нажатия мыши
var IS_CLICKED = false; 
document.addEventListener('mousedown', function(){
    IS_CLICKED = true;
});

document.addEventListener('mouseup', function(){
    IS_CLICKED = false;
});



//Рисует

let color_cells = document.querySelectorAll('.color-sell')


for (let i = 0; i < color_cells.length; i++){
    let color_cell = color_cells[i];
    color_cell.addEventListener('click', function(){
        let colorClass = "";
           FILL_MODE = false; 
        if(color_cell.classList.contains("red")){
        colorClass = "red";
       
        } 
        
        else if (color_cell.classList.contains("green")){
            colorClass = "green"} 
        else if (color_cell.classList.contains("yellow")){
            colorClass = "yellow"}
        else if (color_cell.classList.contains("black")){
            colorClass = "black"}
        else if (color_cell.classList.contains("grey")){
            colorClass = "grey"}
            
        CURRENT_COLOR = COLOR_MAP[colorClass];
        document.querySelector('.selected'). classList.remove('selected')
        color_cell.classList.add('selected')

    })
}


document.querySelector('.eraser').addEventListener('click', function(){
       
    CURRENT_COLOR = DEFAULT_COLOR;
    FILL_MODE = false; 
    document.querySelector('.selected'). classList.remove('selected')   
    this.classList.add('selected')  
})  



var COLORS = [
    "rgba(0, 0, 0, 1)", // 0 Ластик
    "rgb(255, 0, 0)", // 1 Красный
    "rgba(55, 255, 0, 1)", // 2 Зеленый
    "rgba(250, 230, 0, 1)", // 3 Желтый
    "rgba(0, 0, 0, 0.72)", // 4 Черный
    "rgba(154, 154, 154, 1)"// 5 Серый
];

setInterval(function(){
    let result= '';
    let temp_cells = document.querySelectorAll('.cell');
    
    for (let i = 0; i < temp_cells.length; i++){
        let cell = temp_cells[i];
        let color = cell.style.backgroundColor;

        let colorIndex = "0"; // по умолчанию Ластик
        for (let j = 0; j < COLORS.length; j++){
            if (color === COLORS[j]){
                colorIndex = j.toString();
                
                break;
                
            }
        }
       
        result += colorIndex;
    }
    document.cookie = `pixel-result=${result};max-age=1000000`;

  
}, 60000);


function get_result_from_cookie(){
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++){
        let cookie = cookies[i].split('=');
        console.log(cookie);
        if (cookie[0] === 'pixel-result'){
            return cookie[1];
        }
    }
    return '0' * 450;
}
let temp_result = get_result_from_cookie();
if (temp_result != '0') {
    for (let i = 0; i < 450; i++){  
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id', `${i}`)
    cell.style.backgroundColor = COLORS[parseInt(temp_result[i])]    
    field.appendChild(cell)
}
}
