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



gsap.from('.patterns-wrapper svg:first-child path', {
    duration: 1,
    ease: "power4.out",
    stagger: 0.02,
    autoAlpha: 0,
    x: function(e, target) {
        return -target.getBoundingClientRect().width;
    }
});
gsap.from('.patterns-wrapper svg:last-child path', {
    duration: 1,
    ease: "power4.out",
    stagger: 0.02,
    autoAlpha: 0,
    x: function(e, target) {
        return target.getBoundingClientRect().width;
    }
});







if (window.screen.width < 576) {
    let heartPath = document.querySelector('.fixed-background-heart-mobile path'),
        heart = document.querySelector('.fixed-background-heart-mobile'),
        videoBlock = document.querySelector('.heart-mask-video-block-wrapper');
    // heart.style.top = `153px`;
    var videoBlockTop = videoBlock.getBoundingClientRect().top;
    var heartTop = heartPath.getBoundingClientRect().top;
    console.log(videoBlockTop, heartTop);
    // heartPath.style.transform = `translateY(${videoBlockTop}px)`
    heartPath.setAttribute('transform', `translate(0, ${videoBlockTop})`)
}