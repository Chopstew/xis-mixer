
const audioContext = new AudioContext();
audioContext.crossOrigin = "anonymous";
audioContext.autoplay = true;

/*----- Audio -----*/
/*--- Load audio files und tracks ---*/
const singerAudio = new Audio('assets/05_GydVox_converted.mp3');
const hammondAudio = new Audio('assets/04_Hammond_converted.mp3');
const guitarsAudio = new Audio('assets/03_Guitars_converted.mp3');
const bassAudio = new Audio('assets/02_Bass_converted.mp3');
const drumsAudio = new Audio('assets/01_Drums_converted.mp3');

singerAudio.crossOrigin = "anonymous";
hammondAudio.crossOrigin = "anonymous";
guitarsAudio.crossOrigin = "anonymous";
bassAudio.crossOrigin = "anonymous";
drumsAudio.crossOrigin = "anonymous";

singerAudio.loop = true;
hammondAudio.loop = true;
guitarsAudio.loop = true;
bassAudio.loop = true;
drumsAudio.loop = true;

const singerTrack = audioContext.createMediaElementSource(singerAudio);
const hammondTrack = audioContext.createMediaElementSource(hammondAudio);
const guitarTrack = audioContext.createMediaElementSource(guitarsAudio);
const bassTrack = audioContext.createMediaElementSource(bassAudio);
const drumsTrack = audioContext.createMediaElementSource(drumsAudio);

/*--- Add GainNode ---*/
const singerGainNode = audioContext.createGain();
const hammondGainNode = audioContext.createGain();
const guitarGainNode = audioContext.createGain();
const bassGainNode = audioContext.createGain();
const drumsGainNode = audioContext.createGain();

const dryGainNode = audioContext.createGain();
const wetGainNode = audioContext.createGain();

const pannerOptions = { pan: 0 };

const singerPanner = new StereoPannerNode(audioContext, pannerOptions);
const hammondPanner = new StereoPannerNode(audioContext, pannerOptions);
const guitarPanner = new StereoPannerNode(audioContext, pannerOptions);
const bassPanner = new StereoPannerNode(audioContext, pannerOptions);
const drumsPanner = new StereoPannerNode(audioContext, pannerOptions);

reverbjs.extend(audioContext);
var reverbUrl = "assets/LadyChapelStAlbansCathedral.m4a";
var reverbNode = audioContext.createReverbFromUrl(reverbUrl, function() {
    reverbNode.connect(audioContext.destination);
});

/*--- Wet signal ---*/
singerTrack.connect(singerGainNode).connect(singerPanner).connect(reverbNode).connect(wetGainNode).connect(audioContext.destination);
hammondTrack.connect(hammondGainNode).connect(hammondPanner).connect(reverbNode).connect(wetGainNode).connect(audioContext.destination);
guitarTrack.connect(guitarGainNode).connect(guitarPanner).connect(reverbNode).connect(wetGainNode).connect(audioContext.destination);
bassTrack.connect(bassGainNode).connect(bassPanner).connect(reverbNode).connect(wetGainNode).connect(audioContext.destination);
drumsTrack.connect(drumsGainNode).connect(drumsPanner).connect(reverbNode).connect(wetGainNode).connect(audioContext.destination);
wetGainNode.gain.value = -1;

/*--- Dry signal ---*/
singerPanner.connect(dryGainNode).connect(audioContext.destination);
hammondPanner.connect(dryGainNode).connect(audioContext.destination);
guitarPanner.connect(dryGainNode).connect(audioContext.destination);
bassPanner.connect(dryGainNode).connect(audioContext.destination);
drumsPanner.connect(dryGainNode).connect(audioContext.destination);
dryGainNode.gain.value = 1;

/*--- Controls ---*/
const playButton = document.querySelector("button");

var reverbMix = 0;
const dryWetSlider = document.getElementById("dryWetSlider");

playButton.addEventListener(
    "click", () => {
        // Check if context is in suspended state (autoplay policy)
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        // Play or pause track depending on state
        if (playButton.dataset.playing === "false") {
            singerAudio.play();
            hammondAudio.play();
            guitarsAudio.play();
            bassAudio.play();
            drumsAudio.play();
            playButton.dataset.playing = "true";
        } else if (playButton.dataset.playing === "true") {
            singerAudio.pause();
            hammondAudio.pause();
            guitarsAudio.pause();
            bassAudio.pause();
            drumsAudio.pause();
            playButton.dataset.playing = "false";
        }
    },
    false,
);
dryWetSlider.addEventListener('input', (event) => {
    reverbMix = event.target.value / 100;
    dryGainNode.gain.value = 1 - reverbMix;
    wetGainNode.gain.value = reverbMix - 1;
});


/*----- Draggable -----*/
let head = document.getElementById("hearing").getBoundingClientRect();
dragElement(document.getElementById("hammond"));
dragElement(document.getElementById("guitar"));
dragElement(document.getElementById("bass"));
dragElement(document.getElementById("drums"));
dragElement(document.getElementById("singer"));


/*----- Location Init -----*/
var center_locations = {
    hearing: {
        top: calculate_top(head),
        left: calculate_left(head),
        dist: 1,
        angle: 0
    },
    hammond: {
        top: calculate_top(document.getElementById("hammond").getBoundingClientRect()),
        left: calculate_left(document.getElementById("hammond").getBoundingClientRect()),
        dist: 0,
        angle: 0
    },
    guitar: {
        top: calculate_top(document.getElementById("guitar").getBoundingClientRect()),
        left: calculate_left(document.getElementById("guitar").getBoundingClientRect()),
        dist: 0,
        angle: 0
    },
    bass: {
        top: calculate_top(document.getElementById("bass").getBoundingClientRect()),
        left: calculate_left(document.getElementById("bass").getBoundingClientRect()),
        dist: 0,
        angle: 0
    },
    drums: {
        top: calculate_top(document.getElementById("drums").getBoundingClientRect()),
        left: calculate_left(document.getElementById("drums").getBoundingClientRect()),
        dist: 0,
        angle: 0
    },
    singer: {
        top: calculate_top(document.getElementById("singer").getBoundingClientRect()),
        left: calculate_left(document.getElementById("singer").getBoundingClientRect()),
        dist: 0,
        angle: 0
    }
}

/*--- Set to start ---*/
calculate_distances()
calculate_angles()

/*----- FUNCTIONAL CODE :) yay -----*/
function dragElement(elem) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elem.id + "header")) {
        document.getElementById(elem.id + "header").onmousedown = dragMouseDown;
    } else {
        elem.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
        update_cor(elem);
        calculate_single_distance(elem.id);
        calculate_single_angle(elem.id);
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


/*----- COORDINATES CALCULATION (CENTRALIZED) -----*/
function update_cor(elem) {
    let rect = elem.getBoundingClientRect();
    let elemName = elem.id;
    center_locations[elemName].top = calculate_top(rect);
    center_locations[elemName].left = calculate_left(rect);
    //console.log(elem.top, elem.left);
}
function calculate_top(elem) {
    return elem.top + ((elem.bottom - elem.top) / 2);
}
function calculate_left(elem) {
    return elem.left + ((elem.right - elem.left) / 2);
}


/*----- VOLUME CALCULATION -----*/
function calculate_distances() {
    Object.keys(center_locations).forEach(function (key) {
        calculate_single_distance(key)
        /*
        const volume = calculate_dist(key) * (-1) + 1;
        if (volume <= 0) {
            center_locations[key]['dist'] = 0;
        } else {
            center_locations[key]['dist'] = volume;
        }
        */
        //console.log(center_locations[key]['dist']);
    })
}
function calculate_single_distance(elemName) {
    const volume = calculate_dist(elemName) * (-1) + 1;
    if (volume <= 0) {
        center_locations[elemName]['dist'] = 0;
    } else {
        center_locations[elemName]['dist'] = volume;
    }
    switch (elemName) {
        case 'singer': singerGainNode.gain.value = center_locations['singer']['dist']; break;
        case 'hammond': hammondGainNode.gain.value = center_locations['hammond']['dist']; break;
        case 'guitar': guitarGainNode.gain.value = center_locations['guitar']['dist']; break;
        case 'bass': bassGainNode.gain.value = center_locations['bass']['dist']; break;
        case 'drums': drumsGainNode.gain.value = center_locations['drums']['dist']; break;
    }
}
function calculate_dist(elemName) {
    //const zeroSource = [center_locations[elemName]['top'] - center_locations['hearing']['top'], center_locations[elemName]['left'] - center_locations['hearing']['left']]
    const sourceDistance = Math.sqrt(
        (center_locations[elemName]['top'] - center_locations['hearing']['top']) * (center_locations[elemName]['top'] - center_locations['hearing']['top'])
        +
        (center_locations[elemName]['left'] - center_locations['hearing']['left']) * (center_locations[elemName]['left'] - center_locations['hearing']['left'])
    )
    const referenceDistance = Math.sqrt(
        (center_locations['hearing']['top']) * (center_locations['hearing']['top'])
        +
        (center_locations['hearing']['left']) * (center_locations['hearing']['left'])
    )
    return (sourceDistance / referenceDistance)
}


/*----- ANGLE CALCULATION -----*/
function calculate_angles() {
    Object.keys(center_locations).forEach(function (key) {
        calculate_single_distance(key);
    })
    //console.log(drumsPanner.pan.value)
}
function calculate_single_angle(elemName) {
    if (center_locations[elemName]['dist'] > 0.97) {
        center_locations[elemName]['angle'] = 0;
    } else {
        center_locations[elemName]['angle'] = calculate_ang(elemName);
    }
    switch (elemName) {
        case 'singer': singerPanner.pan.value = center_locations['singer']['angle']; break;
        case 'hammond': hammondPanner.pan.value = center_locations['hammond']['angle']; break;
        case 'guitar': guitarPanner.pan.value = center_locations['guitar']['angle']; break;
        case 'bass': bassPanner.pan.value = center_locations['bass']['angle']; break;
        case 'drums': drumsPanner.pan.value = center_locations['drums']['angle']; break;
    }
}
function calculate_ang(elemName) {
    const radiant = Math.atan2(
        center_locations[elemName]['top'] - center_locations['hearing']['top'],
        center_locations[elemName]['left'] - center_locations['hearing']['left']
    )
    return Math.cos(radiant);
}