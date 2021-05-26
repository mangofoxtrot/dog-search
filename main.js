let  timer
let deleteFirstPhotoDelay

async function start () {
  try {
    let response = await fetch("https://dog.ceo/api/breeds/list/all")
    let data = await response.json()
    createBreedList(data.message)
  } catch (e) {
    console.log("There was a problem loading the breed lists")
  }
}

start()

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onchange="loadImage(this.value)">
      <option>Choose a dog breed</option>
      ${Object.keys(breedList).map(function(breed) {
        return `<option>${breed}</option>`
      }).join('')}
    </select>
  `
}

async function loadImage (breed) {
  if (breed != "Choose a dog breed") {
    let response = await fetch("https://dog.ceo/api/breed/" + breed + "/images")
    let data = await response.json()
    createSlideshow(data.message)
  } else {
    console.log("No breed selected")
  }
}

function createSlideshow(images) {
  let currentPos = 0;
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)

  if(images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPos += 2;
    if(images.length == 2) currentPos = 0;
    timer = setInterval(nextSlide, 3000)
  } else {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `
  }

  function nextSlide() {
    document.getElementById('slideshow').insertAdjacentHTML("beforeend",
    `<div class="slide" style="background-image: url('${images[currentPos]}')"></div>`)
    deleteFirstPhotoDelay = setTimeout(function() {
      document.querySelector(".slide".remove)
    }, 1000)
    if(currentPos + 1 >= images.length) {
      currentPos = 0;
    } else {
      currentPos++;
    }
  }
}