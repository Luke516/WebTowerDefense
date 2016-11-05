var dragSource=null, dragTarget=null, dragCurve;

function update(){
	
}

function initInput(){
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	container.onmousedown = handleMouseDown;
	container.onmouseup = handleMouseUp;
	//
	window.addEventListener( 'resize', onWindowResize, false );
	container.addEventListener('dragstart', onDragStart, false);
	$('.game').bind('mousewheel',handleWheel);


	var curve = new THREE.CatmullRomCurve3( [
		new THREE.Vector3( 20, 0, -20 ),
		new THREE.Vector3( 10, 10, -10 ),
		new THREE.Vector3( 0, 0, 0 )
	] );
	var geometry = new THREE.Geometry();
	geometry.vertices = curve.getPoints( 50 );
	var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	//Create the final Object3d to add to the scene
	dragCurve = new THREE.Line( geometry, material );
	dragCurve.dynamic = true;
	dragCurve.visible = false;
	scene.add( dragCurve );
}


function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	

	if(dragSource != null){
		//console.log(intersected_point);
		var curve = new THREE.CatmullRomCurve3( [
			new THREE.Vector3( dragSource.position.x, dragSource.position.y, dragSource.position.z ),
			new THREE.Vector3( (dragSource.position.x + intersected_point.x)/2,
								20,
								(dragSource.position.z + intersected_point.z)/2 ),
			new THREE.Vector3( intersected_point.x, intersected_point.y, intersected_point.z)
		] );
		var geometry = new THREE.Geometry();
		geometry.vertices = curve.getPoints( 50 );
		//Create the final Object3d to add to the scene
		dragCurve.geometry = geometry;
		dragCurve.visible = true;
	}
}

function handleKeyDown(event) {
  //alert(event.key);
  currentlyPressedKeys[event.key] = true;
}

function handleKeyUp(event) {
  currentlyPressedKeys[event.key] = false;
}

function handleKeys() {
	if (currentlyPressedKeys["a"] == true) {// Left cursor key
		if(camera.position.x > -200 )camera.position.x -= 1;
	}
	if (currentlyPressedKeys["d"] == true) {// Right cursor key
		if(camera.position.x < 200 )camera.position.x += 1;
	}
	if (currentlyPressedKeys["s"] == true) {// Up cursor key
		if(camera.position.z < 200 )camera.position.z += 1;
		if(camera.position.z == 0){
			camera.position.z = 1;
		}
	}
	if (currentlyPressedKeys["w"] == true) {// Down cursor key
		if(camera.position.z > -200 )camera.position.z -= 1;
		if(camera.position.z == 0){
			camera.position.z = -1;
		}
	}
}

function onDragStart(){
	console.log("drag");
}

function clickObject(obj){

}

function handleMouseDown(){
	//console.log("down");
	dragSource = cur_intersected;

}

function handleMouseUp(){
	//console.log("up");
	dragTarget = cur_intersected;
	console.log("drag : "+dragSource.unitID+" to "+dragTarget.unitID);
	if(dragTarget === dragSource){
		clickObject(dragSource);
	}
	else{
		/*var curve = new THREE.CatmullRomCurve3( [
			new THREE.Vector3( 20, 0, -20 ),
			new THREE.Vector3( 10, 10, -10 ),
			new THREE.Vector3( dragTarget.position.x, dragTarget.position.y, dragTarget.position.z)
		] );
		var geometry = new THREE.Geometry();
		geometry.vertices = curve.getPoints( 50 );
		//Create the final Object3d to add to the scene
		dragCurve.geometry = geometry;*/
	}
	dragSource = null;
	dragTarget = null;
	dragCurve.visible = false;
}	

function handleClick(){
	console.log("click");
}

var handleWheel = function (e){
	if(e.originalEvent.wheelDelta /120 > 0) {
        //console.log('scrolling up !');
        if(camera.position.y < 500 )camera.position.y += e.originalEvent.wheelDelta/40;
    }
    else{
        //console.log('scrolling down !');
        if(camera.position.y > 1 )camera.position.y += e.originalEvent.wheelDelta/40;
    }
}