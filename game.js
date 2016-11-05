var container, stats;
var camera, scene, raycaster, renderer;
var selectionLight;
var mouse = new THREE.Vector2(), cur_intersected, prev_intersected, intersected_point;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var currentlyPressedKeys = {};//new Array(300);

function init() {
	container = document.createElement( 'div' );
	container.className='game';
	document.body.appendChild( container );

	initCamera();
	initScene();
	initInput();
	loadMap("map02.json");

	animate();
}
//
function animate() {
	requestAnimationFrame( animate );
	handleKeys();
	render();
	stats.update();
}

function render() {
	//camera.position.x += ( mouse.x - camera.position.x ) * .05;
	//camera.position.y += ( - mouse.y - camera.position.y ) * .05;
	var lookAtPos = new THREE.Vector3();
	lookAtPos.addVectors(camera.position, look);
	camera.lookAt(lookAtPos);//( scene.position );
	camera.updateMatrixWorld();
	// find intersections
	raycaster.setFromCamera( mouse, camera );
	//console.log("len : " + scene.children.length);
	var intersects = raycaster.intersectObjects( scene.children, true );
	//console.log("len : " + intersects.length);
	if ( intersects.length > 0 ) {
		cur_intersected = intersects[ 0 ].object;
		intersected_point = intersects[ 0 ].point;

		while(cur_intersected.parent != scene){
			//console.log("name : " + cur_intersected.name);
			cur_intersected = cur_intersected.parent;
		}
		//console.log("name : " + cur_intersected.name);
		if ( prev_intersected != cur_intersected ) {
			if ( prev_intersected ) {
				//prev_intersected.material.emissive.setHex( prev_intersected.currentHex );
			}
			//cur_intersected.currentHex = cur_intersected.material.emissive.getHex();
			//cur_intersected.material.emissive.setHex( 0x0000ff );
			
			//console.log(cur_intersected.position);
			selectionLight.position.x = cur_intersected.position.x;
			selectionLight.position.y = cur_intersected.position.y;
			selectionLight.position.z = cur_intersected.position.z;
			selectionLight.matrixWorldNeedsUpdate = true;
			selectionLight.visible = true;

			cur_intersected.traverse(function(child){
				if(child.hasOwnProperty("material")){
					if(child.material.hasOwnProperty("emissive")){
						//child.material.emissive.setHex( 0x0000ff );
						//child.material.emissive.intensity = 5.0;
					}
				}
			});
			prev_intersected = cur_intersected;
			//console.log("name : " + prev_intersected.my_name);
			//intersects[0].object.material.transparent = true;
    		//intersects[0].object.material.opacity = 0.1;
		}
	} else {
		//if ( prev_intersected ) prev_intersected.material.emissive.setHex( prev_intersected.currentHex );
		prev_intersected = null;
		cur_intersected = null;
		selectionLight.visible = false;
		intersected_point = null;
	}
	renderer.render( scene, camera );
}

