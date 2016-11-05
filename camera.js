
var look;

function initCamera(){
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 10;
	camera.position.y = 50;
	look = new THREE.Vector3(0, -50, -10);
}