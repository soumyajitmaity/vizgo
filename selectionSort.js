let arr = [10,4,2,3,9,7,8,6,5];

function selectionSort(arr){
	let n = arr.length;
	for (let i = 0; i < n; i++){
		let min_index = i;
		for (let j = i+1; j < n; j++){
			if(arr[min_index] > arr[j]){
				min_index = j;
			}
		}

		if (min_index != i){
			let temp = arr[i];
			arr[i] = arr[min_index];
			arr[min_index] = temp;
		}
	}
}


selectionSort(arr);

console.log(arr);
