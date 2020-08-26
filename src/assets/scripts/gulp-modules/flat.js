/* beautify preserve:start */
@@include('../libs/displacment-hover/imagesloaded.pkgd.min.js')
@@include('../libs/displacment-hover/three.min.js')
;;;;;;;;;;;;;;;;;;;
@@include('../libs/displacment-hover/hover.umd.js')
;;;
@@include('../libs/artem-scroll/scroll.js')
;;;;;;
@@include('../libs/scroll-magic/ScrollMagic.min.js')
@@include('../libs/scroll-magic/plugins/debug.addIndicators.min.js')
@@include('../libs/scroll-magic/plugins/animation.gsap.min.js')
/* beautify preserve:end */;;;;;;;;;;;;;;


$('.flat-center img').on('click', (evt) => {
    console.log(this);
    $('.flat-center img').magnificPopup({
        type: 'image',
        items: {
            src: evt.target.src
        },
    });
});




function colorForShader(r, g, b, a = 1) {
    return `vec4(${1/255*r}, ${1/255*g}, ${1/255*b}, ${a})`;
}
let shader = `
void main() {
	gl_FragColor = ${colorForShader(175, 190, 45)};
}
`;
let vertex = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x+10.0, position.y, position.z+5.0, 1.0);
}
`;



var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
const colors = [
    '#FFDA05',
    '#83529B',
    '#9975B0',
    '#AFBE2D',
    '#AE7F47',
    '#1798D5',
    '#26ABEA',
];



let bgElement = document.createElement('div');

bgElement.style.cssText = `
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    transition:.5s;
    z-index:0;
`;


function randomColorChange(array, element) {
    function change() {
        setTimeout(() => {
            var color = colors[parseInt(Math.random() * colors.length)];
            element.style.backgroundColor = color;
            change();
        }, 5000);
    };
    change();
}
// document.querySelector('.page__content').append(bgElement);
// randomColorChange(colors, bgElement);






















// var renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(WIDTH, HEIGHT);
// document.body.appendChild(renderer.domElement);

// var scene = new THREE.Scene();

// var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
// camera.position.z = 50;
// scene.add(camera);

// var boxGeometry = new THREE.BoxGeometry(10, 10, 10);

// var shaderMaterial = new THREE.ShaderMaterial({
//     vertexShader: vertex,
//     fragmentShader: shader
// });

// var cube = new THREE.Mesh(boxGeometry, shaderMaterial);
// scene.add(cube);

// cube.rotation.set(0.4, 0.5, 0);

// function render() {
//     setTimeout(() => {
//         requestAnimationFrame(render);

//         console.log(color);
//         scene.background = new THREE.Color(color);
//         renderer.render(scene, camera);
//     }, 1000);

// }

// console.log(renderer.domElement);

// renderer.domElement.style.cssText = `
// position:fixed;
// left:0;
// top:0;
// `;
// render();