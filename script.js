const sorted = "#CBFF65";
const unsorted = "#FE5448";
const maxheight = 300;
const scallingfactor = 1.2;
let arr = [];
let arrCopy = [];
let isSorting = false;
let isstopping = false;
//const speed = 200;
const chart = document.getElementById("chart");

function stopStartFlip(){
    if (!isstopping){
        document.getElementById("stopbutton").innerText= "resume";
        isstopping = true;
        isSorting = false;
    }else{
        isstopping = false;
        document.getElementById("stopbutton").innerText= "stop";
        
    }
    
}

function generate(){
    const numberOfElements = parseInt(document.getElementById("numberofelements").value);
    const min = parseInt(document.getElementById("min").value);
    const max = parseInt(document.getElementById("max").value);
    console.log(numberOfElements + ", " + min + ", " + max);
    if (min < max) {
        arr = generateRandomArray(numberOfElements, min, max);
        console.log(...arr);
        arrCopy = [...arr];
        renderChart(arrCopy);
    } else {
        alert("Minimum value must be smaller than maximum value");
    }
}


function generateRandomArray(N, min, max){
    const arr = [];
    for (let i = 0; i < N; i++){
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        arr.push(randomNumber);
    }
    
    return arr;
}

function renderChart(arr, n_ = arr.length+1){
    chart.innerHTML = "...";
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${(arr[i]/(Math.max(...arr)*scallingfactor)) * maxheight}px`;
        bar.style.width = `${Math.max(((chart.clientWidth - 4*arr.length) / arr.length), 2)}px`;
        if( i >= n_){
            bar.style.backgroundColor = sorted;
        }else{
            bar.style.backgroundColor = unsorted;
        
        }
        //bar.textContent = arr[i];
        chart.appendChild(bar);
    }

}


async function sort(){
    if (!isSorting) {
        isSorting = true;
        await new Promise(resolve=>sort_());
        isSorting = false;
    }else{
        alert("sorting is ongoing!");
    }
}
async function sort_(){ 
    let n = arr.length;
    let speed = document.getElementById("speed").value;
    
    while (n-- > 0 && !isstopping){
            for(let i = 0; i < n; i++){
            if(arr[i] > arr[i+1]){
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                
                }
            }
            renderChart(arr, n);
                await new Promise(resolve => setTimeout(resolve, 100/speed));
            
    }
    
}
function reset(){
        isSorting = false;
        arr = [...arrCopy];
        renderChart(arr);
}

function quicksort([...arrCopy]){
    
}

