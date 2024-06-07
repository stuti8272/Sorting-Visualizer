document.getElementById("size").addEventListener("input", (e) => {
	createRandomArray(e.target.value);
});

document.querySelector("form").addEventListener("submit", async (e) => {
	e.preventDefault();
	const allInputs = document.getElementsByName("sorting");
	let sorting;
	allInputs.forEach((e) => {
		if (e.checked) sorting = e.value;
	});

	if (sorting === "bubble") await bubbleSort();
	if (sorting === "selection") await selectionSort();
	if (sorting === "insertion") await insertionSort();
	if (sorting === "quick") await quickSort(0, arr.length - 1);
	if (sorting === "merge") await mergeSort(0, arr.length - 1);
	if (sorting === "heap") await heapSort();

});

let arr = [];
let array = [];
let gap = 0;
function createRandomArray(size) {
	gap = Math.floor(80 / size);
	arr = [];
	array = [];

	for (let i = 0; i < size; i++) {
		arr.push(Math.ceil(Math.random() * (25 - 1) + 1));
	}

	const barsContainer = document.getElementById("barsContainer");
	barsContainer.innerHTML = "";
	for (let i = 0; i < size; i++) {
		let bar = document.createElement("div");
		bar.classList.add("bar");

		bar.innerHTML = arr[i];
		array.push(bar);

		bar.style.left = `${i * gap}rem`;
		bar.style.height = `${arr[i]}rem`;

		barsContainer.append(bar);
	}
}

`<----- Creating the bars according to the Array that we have ---->`;

`<----- Swapping of both the value array and the actual dom elements ---->`;

const swap = (i, j) => {
	array[i].style.left = `${j * gap}rem`;
	array[j].style.left = `${i * gap}rem`;

	let t = array[i];
	array[i] = array[j];
	array[j] = t;

	let tem = arr[i];
	arr[i] = arr[j];
	arr[j] = tem;

	console.log("swap called");
};

`<----- Wait function that also colours the elements provided as the last args ---->`;

const wait = (delay, color, ...args) =>
	new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
		console.log(args);
		args &&
			args.forEach((e) => {
				if (e) e.style.backgroundColor = color;
			});
	});

`<----- Bubble Sorting ---->`;

const bubbleSort = async () => {
	for (let i = 0; i < arr.length - 1; i++) {
		// await wait(1000);
		let sorted = true;
		for (let index = 0; index < array.length - 1 - i; index++) {
			array[index].style.backgroundColor = "red";
			array[index + 1].style.backgroundColor = "red";

			await wait(600);

			if (arr[index] > arr[index + 1]) {
				sorted = false;
				swap(index, index + 1);
			}
			await wait(400, "var(--green)", array[index], array[index + 1]);

			// array[index].style.backgroundColor = 'var(--green)';
			// array[index + 1].style.backgroundColor = 'var(--green)';
		}
		if (sorted) break;
	}
};

`<----- Insertion Sorting ---->`;

async function insertionSort() {
	let i, key, j;
	let count = 0;
	for (i = 1; i < arr.length; i++) {
		key = arr[i];
		j = i - 1;

		array[i].style.backgroundColor = "red";
		// await wait(1000);

		while (j >= 0 && arr[j] > key) {
			await wait(500);
			swap(j, j + 1);
			j = j - 1;
		}

		// await wait(500, 'var(--green)', array[j + 1]);
		await wait(500, "green", array[j + 1], array[j]);
		// array[j + 1].style.backgroundColor = 'var(--green)';
		// console.log(arr);
	}
}

`<----- Selection Sorting ---->`;

async function selectionSort() {
	let i, j, min_idx;

	for (i = 0; i < arr.length - 1; i++) {
		for (let k = i + 1; k < array.length; k++) {
			array[k].style.backgroundColor = "var(--green)";
		}

		array[i].style.backgroundColor = "purple";
		await wait(500);
		min_idx = i;
		for (j = i + 1; j < arr.length; j++) {
			// array[j].style.backgroundColor = 'red';

			await wait(500);

			array[j].style.backgroundColor = "orange";
			await wait(500);

			if (arr[j] < arr[min_idx]) {
				array[j].style.backgroundColor = "red";
				if (min_idx !== i) array[min_idx].style.backgroundColor = "orange";
				min_idx = j;
			}
		}

		// array[min_idx].style.backgroundColor = 'orange';

		// Swap the found minimum element with the first element
		swap(min_idx, i);
		await wait(500, "var(--green)", array[i], array[min_idx]);
		array[i].style.backgroundColor = "green";
	}
}

`<----- Quick Sorting ---->`;

async function partition(low, high) {
	`
	########## Color scheme --> 
	##########	
				1) purple is the Pivot Element 
				2) Blue is the Low 
				3) red is the High

	`;

	let pivot = arr[high];

	array[high].style.backgroundColor = "purple";

	let i = low - 1;

	for (let j = low; j <= high - 1; j++) {
		array[i + 1].style.backgroundColor = "blue";
		await wait(500);
		if (j > low) array[j].style.backgroundColor = "red";
		if (arr[j] < pivot) {
			await wait(500);
			i++;
			swap(i, j);
		}
		await wait(500, "green", array[j], array[i]);
	}

	swap(i + 1, high);
	await wait(500, "orange", array[i + 1]);

	return i + 1;
}

async function quickSort(low, high) {
	console.log("quickSort", low, high);

	if (low < high) {
		let pi;
		let p = await partition(low, high);

		pi = p;
		await quickSort(low, pi - 1);
		await quickSort(pi + 1, high);
	}
}

`<----- Merge Sorting ---->`;

async function merge(start, mid, end) {
    let start2 = mid + 1;

    // If the direct merge is already sorted
    if (arr[mid] <= arr[start2]) {
        return;
    }

    while (start <= mid && start2 <= end) {

        // Highlight the current elements being compared
        array[start].style.backgroundColor = "red";
        array[start2].style.backgroundColor = "red";
        await wait(500);

        // If element 1 is in the right place
        if (arr[start] <= arr[start2]) {
            array[start].style.backgroundColor = "green";
            start++;
        } else {
            let value = arr[start2];
            let index = start2;

            // Shift all the elements between element 1 and element 2, right by 1
            while (index !== start) {
                arr[index] = arr[index - 1];
                array[index].style.height = `${arr[index]}rem`;
                array[index].innerHTML = arr[index];
                swap(index, index - 1);
                index--;
            }
            arr[start] = value;
            array[start].style.height = `${arr[start]}rem`;
            array[start].innerHTML = arr[start];

            // Update all the affected bars
            await wait(100);
            start++;
            mid++;
            start2++;
        }

        // Reset the color after processing
        array[start - 1].style.backgroundColor = "green";
        array[start2 - 1].style.backgroundColor = "green";
    }
}

async function mergeSort(l, r) {
    if (l < r) {
        let m = l + Math.floor((r - l) / 2);

        await mergeSort(l, m);
        await mergeSort(m + 1, r);

        await merge(l, m, r);
    }
}
`<----- Heap Sorting ---->`;

async function heapify(n, i) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left child
    let right = 2 * i + 2; // right child

    // Highlight the current elements being compared
    if (left < n) array[left].style.backgroundColor = "red";
    if (right < n) array[right].style.backgroundColor = "red";
    array[largest].style.backgroundColor = "blue";
    await wait(500);

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        swap(i, largest);

        // Reset the colors after swap
        array[i].style.backgroundColor = "green";
        array[largest].style.backgroundColor = "green";
        await wait(500);

        // Recursively heapify the affected sub-tree
        await heapify(n, largest);
    } else {
        // Reset the colors if no swap
        array[i].style.backgroundColor = "green";
        if (left < n) array[left].style.backgroundColor = "green";
        if (right < n) array[right].style.backgroundColor = "green";
    }
}

async function heapSort() {
    let n = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(0, i);

        // Reset the color of the sorted element
        array[i].style.backgroundColor = "green";
        await wait(500);

        // Call max heapify on the reduced heap
        await heapify(i, 0);
    }

    // Reset the color of the last element
    array[0].style.backgroundColor = "green";
}



