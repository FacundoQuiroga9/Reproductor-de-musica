// SONG DATA

const songList = [
    {
        title: "Bedtimes stories",
        file: "Bedtime Stories.mp3",
        cover: "1.jpg"
    },
    {
        title: "Endless Summer",
        file: "Endless Summer.mp3",
        cover: "2.jpg"
    },
    {
        title:"Lost in Your Eyes",
        file: "Lost in Your Eyes.mp3",
        cover: "3.jpg"
    },
    {
        title: "Show Me The Way",
        file: "Show Me The Way.mp3",
        cover: "4.jpg"
    },
    {
        title:"The Road",
        file: "The Road.mp3",
        cover: "5.jpg"

    }

]

//CANCION ACTUAL

let actualSong = null

// CAPTURAR ELEMENTOS DEL DOM PARA TRABAJAR CON JS

const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click" , setProgress)

//ESCUCHAR ELEMENTO AUDIO
audio.addEventListener("timeupdate" , updateProgess)

//ESCUCHAR CLICKS EN LOS CONTROLES
play.addEventListener("click" , () => {
    if (audio.paused){
        playSong()
    } else {
        pauseSong()
    }
})

next.addEventListener("click" , () => nextSong())
prev.addEventListener("click" , () => prevSong())

// CARGAR CANCIONES Y MOSTRAR EL LISTADO
function loadSongs() {
        songList.forEach((song, index) => {
            // CREAR li
            const li = document.createElement("li")
            // CREAR a
            const link = document.createElement("a")
            // HIDRATAR a
            link.textContent = song.title
            link.href = "#"
            //ESCUCHAR CLICKS
            link.addEventListener("click", () => loadSong(index))
            // AÑADIR A li
            li.appendChild(link)
            // AÑADIR li A ul
            songs.appendChild(li)
        })

}

//CARGAR CANCION SELECCIONADA
function loadSong(songIndex){
    if(songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeCover(songIndex)
        changeSongTitle(songIndex)
        
    }
    
}

//ACTUALIZAR BARRA DE PROGRESO
function updateProgess(event){
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%"
}

//HACER LA BARRA DE PROGRESO CLICKABLE
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

//ACTUALIZAR CONTROLES
function updateControls(){
    if (audio.paused){
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}
//REPRODUCIR CANCIÓN
function playSong(){   
    if (actualSong !== null) {
        audio.play()
        updateControls()
    }    
}

//PAUSAR CANCIÓN
function pauseSong(){
    audio.pause()
    updateControls()
}


//CAMBIAR CLASE ACTIVA
function changeActiveClass(lastIndex, newIndex){
    const links = document.querySelectorAll("li a")
    if(lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
    
    
}

//CAMBIAR EL COVER DE LA CANCION
function changeCover(songIndex){
    cover.src = "./img/" + songList[songIndex].cover
}

// CAMBIAR EL TITULO DE LA CANCION
function changeSongTitle(songIndex){
    title.innerText = songList[songIndex].title
}

//ANTERIOR CANCIÓN
function prevSong(){
    if (actualSong > 0){
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
       
}


//SIGUIENTE CANCIÓN
function nextSong(){
    if (actualSong < songList.length - 1){
        loadSong(actualSong + 1)
    } else {
        loadSong (0)
    }
    
}

//LANZAR SIGUIENTE CANCIÓN CUANDO SE ACABA LA ACTUAL
audio.addEventListener("ended" , () => nextSong())

// GO

loadSongs()