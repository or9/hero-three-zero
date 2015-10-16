(function (win, doc, undefined) {

	var scene = new THREE.Scene();
	var renderer = setRenderer();
	var camera = setCamera();
	var controls = setControls();



	var light = new THREE.AmbientLight( 0x111111 );
	var spotlight = setSpotlight();

	var ground = new Plane(1000);
	scene.add(ground);
	var cube = new Cube(50, 50);
	var cube1 = new Cube(10, 0);
	var cube2 = new Cube(20, 100);
	//console.log(cube, cube.width, cube.height, cube.depth);

	scene.add( camera );
	scene.add( light );
	scene.add( spotlight );
	//scene.add( cube );


	main();

	function main () {
		renderer.render(scene, camera);
		// request this function runs every 1/60th of second
		requestAnimationFrame(main);
	controls = new THREE.OrbitControls( camera, renderer.domElement );
		cube.move();
		cube1.move();
		cube2.move();
	}

	function setSpotlight (params) {
		var light = new THREE.SpotLight( 0xFFFFFF );

		light.position.set( 250, 90, 500);

		light.castShadow = true;
		light.shadowDarkness = 0.33;
		//light.shadowCameraVisible = true;
		light.shadowMapWidth = 1024;
		light.shadowMapHeight = 1024;

		light.shadowCameraNear = 5;
		light.shadowCameraFar = 4000;
		light.shadowCameraFov = 65;

		return light;
	}

	function Cube (size, position) {
		this.width = this.height = this.depth = size;
		this.move = move;
		var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
		var material = new THREE.MeshLambertMaterial();

		this.model = new THREE.Mesh(geometry, material);
		this.model.position.x = this.model.position.z = position;
		this.model.castShadow = true;
		this.model.receiveShadow = true;
		scene.add(this.model);

		function move () {
			var amount = 1;
			//this.model.position.x += amount;
			this.model.rotation.x += 0.1;
			this.model.rotation.y += 0.1;
		}
	}

	function Plane (size, position, rotation) {
		size = size || 1000;
		position = position || {x: 0, y: -50, z: 0};
		rotation = rotation || {x: Math.PI / 2, y: 0, z: 0};
		this.width = this.height = size;
		var geometry = new THREE.PlaneGeometry(this.width, this.height, 32, 32);
		var material = new THREE.MeshPhongMaterial( {
			color: 0xFFFFFF,
			side: THREE.DoubleSide
		});

		this.model = new THREE.Mesh(geometry, material);

		this.model.position.x = position.x;
		this.model.position.y = position.y;
		this.model.position.z = position.z;
		this.model.rotation.y = rotation.y;
		this.model.rotation.x = rotation.x;
		this.model.rotation.z = rotation.z;

		this.model.receiveShadow = true;
		this.model.castShadow = true;

		//scene.add(this.model);
		return this.model;
	}

	function setRenderer () {
		var renderer = new THREE.WebGLRenderer( {antialias: true} );
		renderer.setSize(win.innerWidth, win.innerHeight);
		renderer.shadowMapEnabled = true;
		doc.body.appendChild(renderer.domElement);
		return renderer;
	}

	function setCamera () {
		var VIEW_ANGLE = 45;
		var ASPECT_RATIO = win.innerWidth / win.innerHeight;
		var NEAR = 0.1;
		var FAR = 10000;

		var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT_RATIO, NEAR, FAR);

		camera.position.set(0, 150, 400);
		camera.lookAt(scene.position);
	

		
		return camera;

	}

	function setControls () {
		//return new THREE.OrbitControls( camera, renderer.domElelement );
	}
}(window, document));
