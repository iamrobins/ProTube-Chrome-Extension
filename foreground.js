// console.log('from foreground');
{
const addBar = document.querySelector("#movie_player > div.ytp-ad-persistent-progress-bar-container");
const videoDuration = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span.ytp-time-duration");
// console.log(time);

const config = { attributes: true};
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            if(mutation.target.style[0] === 'display') {
                console.log("Ad has been skipped");
                observer.disconnect();
            }
        }
    }

};

// Create an observer instance linked to the callback function
if(addBar.getAttribute('style') === 'display: none;') {
    console.log('No Ad was displayed this time');
} else {
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(addBar, config);
}

const time = videoDuration.textContent.split(":");
//ALL UI Elements Starts
const videoInfo = document.querySelectorAll("#container")[3];
let newItem = document.createElement('h2');
let rangeBar = document.createElement('input');
let sliderValue = document.createElement('h2');
let timeSaved = document.createElement('h2');

if(videoInfo.childNodes[0].tagName != 'H2'){
    
let textnode = document.createTextNode("Youtube Productivity");
newItem.setAttribute('style', 'color:white');
newItem.appendChild(textnode);
videoInfo.insertBefore(newItem, videoInfo.childNodes[0]);

//Range Bar
rangeBar.setAttribute('type', 'range');
rangeBar.setAttribute('min','0.25');
rangeBar.setAttribute('max', '2');
rangeBar.setAttribute('step', '0.05');
rangeBar.setAttribute('id','default');
videoInfo.insertBefore(rangeBar, videoInfo.childNodes[1]);

//Range Bar Slider's Value
sliderValue.setAttribute('id', 'sliderValue');
sliderValue.setAttribute('style', 'color:white');
// sliderValue.textContent = 'Value';
videoInfo.insertBefore(sliderValue, videoInfo.childNodes[2]);

//Time Saved
timeSaved.setAttribute('id', 'timeSaved');
timeSaved.setAttribute('style', 'color:white');
// timeSaved.textContent = 'Time';
videoInfo.insertBefore(timeSaved, videoInfo.childNodes[3]);
}
// UI Elements Ends

//Range Bar Value Display Function

const defaultSlider = document.querySelector('#default');
defaultSlider.addEventListener('input', (e)=>{
    const sliderValue = document.querySelector('#sliderValue');
    sliderValue.textContent = `${defaultSlider.value}x`;
    const parsedTime = parseTime(Math.floor(timeInSec(time)/defaultSlider.value));
    let timeSavedOnVideo = parseTime( timeInSec(time)-timeInSec(parsedTime.split(":")) );
    // console.log(timeSavedOnVideo);
    document.querySelector('#timeSaved').textContent = `Video Dutaion: ${parsedTime}, Time Saved: ${timeSavedOnVideo}`;
});

//Time Calculations Starts
const timeInSec = (time) => {
    if(time.length === 3){
        if (time[2][0] === '0') {
            time[2] = time[2].slice(1,time[2].length);
        }
        return (time[0] * (60 * 60)) + (time[1] * 60) + parseInt(time[2]);
    } else if (time.length === 2){
        if (time[1][0] === '0') {
            time[1] = time[1].slice(1,time[1].length);
        }
        return (time[0] * 60) + parseInt(time[1]);
    }
}

const parseTime = (time) => {
    if(time >= 3600) {
        let hour = Math.floor(time/3600);
        let minutes = Math.floor((time - hour * 3600) / 60);
        let seconds = time - ((hour * 3600) + (minutes * 60));
        return `${hour}:${minutes}:${seconds}`;

    } else if(time < 3600 && time >= 60) {
        let minutes = Math.floor(time/60);
        let seconds = time - (minutes * 60);
        return `${minutes}:${seconds}`;
    } else {
        return `${time}`;
    }
} 
//Time Calculations Ends
}