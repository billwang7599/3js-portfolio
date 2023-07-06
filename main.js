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
const pointLightBottom = new THREE.PointLight(0xFFFFFF, 0.1, 3)
pointLightTop.position.set(0, 10, 0)
pointLightBottom.position.set(0, -1.5, 2)
pointLightBottom.castShadow = true
pointLightTop.castShadow = true
scene.add(pointLightTop)
scene.add(pointLightBottom)
// mobile check
window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (window.mobileAndTabletCheck()) {
    pointLightBottom.intensity = 1
}

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

// tap events -- horribly optimized
domEvents.addEventListener(github, 'touchstart', event => { // Go to git link
    if ( $('canvas').css('opacity')==1 ) {
        window.open('https://github.com/billwang7599', '_blank').focus()
    }
})

domEvents.addEventListener(linkedin, 'touchstart', event => { // Go to git link
    if ( $('canvas').css('opacity')==1 ) {
        alert("test")
        window.open('https://linkedin.com/in/bw7599', '_blank').focus()
    }
})

domEvents.addEventListener(resume, 'touchstart', event => { // Go to git link
    if ( $('canvas').css('opacity')==1 ) {
        window.open('/resume.pdf', '_blank').focus()
    }
})

domEvents.addEventListener(sphere, 'touchstart', event => { // Goes to main page
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

// click events

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
                duration: 1200,
                easing: 'linear',
                delay: 2200
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

	sphere.rotation.x += 0.005;
	sphere.rotation.y += 0.005;

    github.rotation.y -= 0.002;
    linkedin.rotation.y -= 0.002;
    resume.rotation.y -= 0.002;

	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}


// other stuff 
$('h1').css('opacity', 1)

const myText = new SplitType('#my-text')

gsap.to('.char', {
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    duration: .1
})

// $('canvas').click(goToDark)
$("canvas").on("click touchstart", goToDark);

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

// threejs animation
animate()