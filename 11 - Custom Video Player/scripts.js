// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const fullscreen = player.querySelector('.fullscreen__button');

// Build out functions play/pause
function togglePlay(){
  if(video.paused){
    video.play();
  } else{
    video.pause();
  }
}

// Listen for video when ever it is paused - function
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// skip buttons
function skip() {
  // parsefloat for string on object
  video.currentTime += parseFloat(this.dataset.skip);
}

// volume and speed sliders
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// video progress bar
function handleProgress() {
  // calculate percentage
  const percent = (video.currentTime/video.duration) * 100;
  // dynamic percentage
  progressBar.style.flexBasis = `${percent}%`;
}

// progress bar on click update visual
function scrub(e) {
  // calculate percentage
  const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
  // update Video
  video.currentTime = scrubTime;
  console.log(e);
}

// Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', () => player.requestFullscreen());

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mouseMove', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);
// if mousedown is true run scrub, if not don't run scrub
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
