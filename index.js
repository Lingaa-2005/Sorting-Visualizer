let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }
  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  bars_container.innerHTML = "";
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return array;
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(speedFactor);
  for (let k = 0; k < bars.length; k++) {
    if (k !== i && k !== j) {
      bars[k].style.backgroundColor = "aqua";
    }
  }
  return array;
}

async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  let pivot = items[pivotIndex];
  bars[pivotIndex].style.backgroundColor = "red";
  for (let i = 0; i < bars.length; i++) {
    if (i !== pivotIndex) {
      bars[i].style.backgroundColor = "aqua";
    }
  }

  let i = left;
  let j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars);
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  let index;
  if (items.length > 1) {
    index = await partition(items, left, right);
    if (left < index - 1) {
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      await quickSort(items, index, right);
    }
  }
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "aqua";
  }
  return items;
}

async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "red";
      await sleep(speedFactor);
      for (let k = 0; k < bars.length; k++) {
        if (k !== j + 1) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }
  return array;
}

async function HeapSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
    await sleep(speedFactor);
  }
  return array;
}

async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest !== i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

// Merge Sort 
async function mergeSort(arr, start = 0, end = arr.length) {
  if (end - start <= 1) return;

  const middle = Math.floor((start + end) / 2);
  await mergeSort(arr, start, middle);
  await mergeSort(arr, middle, end);
  await merge(arr, start, middle, end);
}

async function merge(arr, start, middle, end) {
  let bars = document.getElementsByClassName("bar");

  let left = arr.slice(start, middle);
  let right = arr.slice(middle, end);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = arr[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "lightgreen";
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = arr[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "lightgreen";
      j++;
    }
    await sleep(speedFactor);
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    j++;
    k++;
  }

  for (let i = start; i < end; i++) {
    bars[i].style.backgroundColor = "aqua";
  }
}

sort_btn.addEventListener("click", function () {
  switch (algotouse) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;
    case "merge":
      mergeSort(unsorted_array);
      break;
    case "heap":
      HeapSort(unsorted_array);
      break;
    case "insertion":
      InsertionSort(unsorted_array);
      break;
    case "quick":
      quickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;
    default:
      bubbleSort(unsorted_array);
      break;
  }
});
