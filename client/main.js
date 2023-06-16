import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


//? Setting the scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ(30)


//? Building my shapes/objects
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshToonMaterial({color: 0xA4F353})
const torus = new THREE.Mesh( geometry, material )
const jonTexture = new THREE.TextureLoader().load('me.png')
const jon = new THREE.Mesh(
    new THREE.BoxGeometry(5,5,5),
    new THREE.MeshBasicMaterial({map: jonTexture})
)
scene.add( torus, jon )

//? Light Sources
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

//* Helps show position of the pointlight source
const lightHelper = new THREE.PointLightHelper(directionalLight)
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(lightHelper, axesHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)
const portalTexture = new THREE.TextureLoader().load('galaxy.png')
scene.background = portalTexture

function animate() {
	requestAnimationFrame( animate )

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01
    controls.update
	renderer.render( scene, camera )
}

animate()