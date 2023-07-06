import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renderer stuff
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const renderer = new THREE.WebGLRenderer({
    alpha: true,
});
renderer.setSize( sizes.width, sizes.height);
renderer.shadowMap.enabled = true
document.body.appendChild( renderer.domElement );


// texture loader
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')
const githubTexture = textureLoader.load('/textures/Github.png')
const linkedinTexture = textureLoader.load('/textures/linkedin.png')
const resumeTexture = textureLoader.load('/textures/resume.png')

// Materials
const material = new THREE.MeshStandardMaterial();
material.normalMap = normalTexture 
material.metalness = 0.8
material.roughness = 0
material.color = new THREE.Color(0x2E4057)

const githubMat = new THREE.MeshStandardMaterial()
githubMat.normalMap = githubTexture

const linkedinMat = new THREE.MeshStandardMaterial()
linkedinMat.normalMap = linkedinTexture
linkedinMat.color = new THREE.Color(0x0077B5)

const resumeMat = new THREE.MeshStandardMaterial()
resumeMat.normalMap = resumeTexture

// geometry
const geometry = new THREE.SphereGeometry( 0.7, 16, 16 );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.set(0, 1, 0)

const gitGeo = new THREE.BoxGeometry ( 0.5, 0.5, 0.5 )
const github = new THREE.Mesh(gitGeo, githubMat)
github.position.set(-1, -1.5, 0)

const linkedinGeo = new THREE.BoxGeometry ( 0.5, 0.5, 0.5 )
const linkedin = new THREE.Mesh(linkedinGeo, linkedinMat)
linkedin.position.set(0, -1.5, 0)

const resumeGeo = new THREE.BoxGeometry ( 0.5, 0.5, 0.5 )
const resume = new THREE.Mesh(resumeGeo, resumeMat)
resume.position.set(1, -1.5, 0)

// mesh of geometry
scene.add( sphere )
scene.add( github )
scene.add( linkedin )
scene.add( resume )

// text
// const fontLoader = new FontLoader()

// fontLoader.load('./fonts/Quicksand-Regular.json', function (font) {
//     const fontGeo = new TextGeometry('Hello world', {
//         font: font,
//         size: 6,
//         height: 2,
//     })
// })

// light source(s)
const pointLightTop = new THREE.PointLight(0xFFFFFF, 10, 15)
const pointLightBottom = new THREE.PointLight(0xFFFFFF, 0.5, 2)
pointLightTop.position.set(0, 10, 0)
pointLightBottom.position.set(0, -1.5, 2)
pointLightBottom.castShadow = true
pointLightTop.castShadow = true
scene.add(pointLightTop)
// scene.add(pointLightBottom)

// cursor point light -- https://codepen.io/hermesgrau/pen/xxxqdPy
const pointLight = new THREE.PointLight(0xAAAAAA, 0.1);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;
pointLight.shadow.bias = 0.0001;
pointLight.mapSizeWidth = 2048; // Shadow Quality
pointLight.mapSizeHeight = 2048; // Shadow Quality
scene.add(pointLight);
camera.position.z = 5;

let mouse = {
	x: 0,
	y: 0
}

document.addEventListener('mousemove', onMouseMove, false);
function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject(camera);
	let dir = vector.sub(camera.position).normalize();
	let distance = -camera.position.z / dir.z;
	let pos = camera.position.clone().add(dir.multiplyScalar(distance));
	pointLight.position.copy(pos);
};

// mouse events
const domEvents = new THREEx.DomEvents(camera, renderer.domElement)

// hover object cursor turns to pointer
document.addEventListener( 'mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );

    if(intersects.length > 0 && $('canvas').css('opacity')==1) {
        $('canvas').css('cursor', 'pointer');
    } else {
        $('canvas').css('cursor', 'default');
    }
}

// click events
domEvents.addEventListener(github, 'touchstart', event => { // Go to git link
    if ( $('canvas').css('opacity')==1 ) {
        window.open('https://github.com/billwang7599', '_blank').focus()
    }
})

domEvents.addEventListener(github, 'click', event => { // Go to git link
    if ( $('canvas').css('opacity')==1 ) {
        window.open('https://github.com/billwang7599', '_blank').focus()
    }
})

domEvents.addEventListener(linkedin, 'click', event => { // Go to git link
    if ( $('canvas').css('opacity')==1 ) {
        window.open('https://linkedin.com/in/bw7599', '_blank').focus()
    }
})

domEvents.addEventListener(resume, 'click', event => { // Go to git link
    if ( $('canvas').css('opacity')==1 ) {
        window.open('/resume.pdf', '_blank').focus()
    }
})

domEvents.addEventListener(sphere, 'click', event => { // Goes to main page
    if ( $('canvas').css('opacity')==1 ) {
        $(document).ready(function(){
            $('link[rel="icon"]').attr('href', './favicons/bw-white.png')
            $("#hello-container").get(0).style.setProperty("top", "-10rem")
            anime({
                targets: '.char',
                translateY: 0,
                duration: 400,
                easing: 'linear',
                delay: 1800
            })

            anime({
                targets: '#hello-container',
                translateY: 90,
                duration: 800,
                easing: 'linear',
                delay: 1800
            })

            anime({
                targets: 'body',
                backgroundColor: "#F5F5F5",
                duration: 600,
                delay: 1500,
                easing: "linear",
            })

            anime({
                targets: 'canvas',
                duration: 1000,
                opacity: 0,
                easing: "linear",
                delay: 0
            })
        })
    }
})

// animation
function animate() {
	requestAnimationFrame( animate );

	sphere.rotation.x += 0.005;
	sphere.rotation.y += 0.005;

    github.rotation.y -= 0.002;
    linkedin.rotation.y -= 0.002;
    resume.rotation.y -= 0.002;

	renderer.render( scene, camera );
}

animate()

// other stuff 
$(document).ready(function(){
    $('h1').css('opacity', 1)
})

const myText = new SplitType('#my-text')

gsap.to('.char', {
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    duration: .1
})

$(document).ready(function(){
    $('canvas').click(goToDark)
    $("canvas").on("tap", goToDark);
})

anime({
    targets: "#head-container",
    translateY: 100,
    duration: 1200,
    delay: 1200,
    easing: "linear"
})


function goToDark() {
    $("canvas").get(0).style.setProperty("position", "absolute")
    if ( $('canvas').css('opacity')== 0 && $('body').css('background-color') == "rgb(245, 245, 245)") {
        $('link[rel="icon"]').attr('href', './favicons/bw-dark.png')

        anime({
            targets: '.char',
            translateY: 400,
            duration: 400,
            easing: 'linear'
        })

        anime({
            targets: '#hello-container',
            translateY: -90,
            duration: 1200,
            easing: 'linear',
        })

        anime({
            targets: '#head-container',
            translateY: -100,
            duration: 1200,
            easing: 'linear'
        })

        anime({
            targets: 'body',
            backgroundColor: "#040303",
            duration: 800,
            delay: 800,
            easing: "linear",
        })

        anime({
            targets: 'canvas',
            duration: 2000,
            opacity: 1,
            easing: "linear",
            delay: 2000
        })
        if ($('#head-container').position().top < 0) {
            $('#head-container').css('top', -500)
        }
    }
}
