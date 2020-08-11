/* beautify preserve:start */
@@include('gsap.js')
/* beautify preserve:end*/

let webcamScreenVideo = document.querySelector('video'),
    webcamVideoPlayButton = document.querySelector('.video-play-button');

webcamVideoPlayButton.addEventListener('click', function(evt) {
    webcamScreenVideo.play();
    webcamVideoPlayButton.style.visibility = 'hidden';
});


webcamScreenVideo.addEventListener('click', function(evt) {
    webcamScreenVideo.pause();
    webcamVideoPlayButton.style.visibility = `visible`;
});



gsap.from('.patterns-wrapper svg:first-child path', { duration: 1, ease: "power4.out", stagger:0.02, autoAlpha: 0, x: function(e, target){
    return -target.getBoundingClientRect().width;
} });
gsap.from('.patterns-wrapper svg:last-child path', { duration: 1, ease: "power4.out", stagger:0.02, autoAlpha: 0, x: function(e, target){
    return target.getBoundingClientRect().width;
} });