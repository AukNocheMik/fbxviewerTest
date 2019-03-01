var renderer, light, mixers = [];
var clock = new THREE.Clock();
var modelShow;
var bounding = {x: 0, y: 0, z: 0, radius: 0}
var initPosition = false;
var model_url     // 模型路径

function initRender() {                 //渲染方式
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xd7d7d7);
    document.getElementById("container").appendChild(renderer.domElement);

}

function getModelUrl() {
    var storage = window.localStorage;
    model_url = storage["url"];     // 模型路径
}

function  getCameraPosition() {
    console.log(camera.position);

}


var camera;

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);
    camera.position.set(0, 0, 1);               //摄像机位置
}

var scene;
var grid

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd7d7d7);

}

document.addEventListener("dblclick", function (ev) {
    initPosition = true;
})

function initLight() {      //灯光渲染
    light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 100);
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.left = -120;
    light.shadow.camera.right = 120;
    scene.add(light);
}

function initLoader() {
    // ========   fbx loader
    if (model_url.indexOf('.FBX') > 0) {
        console.log(model_url);

        var loader = new THREE.FBXLoader();    // 加载fbx 模型
        loader.load(model_url, function (object) {
            modelShow = object;
            console.log(object);
            object.position.set(100,35,0);
            modelShow = object;
            scene.add(object);

        });
    }
    // 实例化一个mesh;
    var spriteMap1 = new THREE.TextureLoader().load("models/point.png");
    var spriteMaterial1 = new THREE.SpriteMaterial({map: spriteMap1, color: 0xffffff});

    var sprite1 = new THREE.Sprite(spriteMaterial1);
    sprite1.position.set(100,36.3,0);
    scene.add(sprite1);

    // 实例化一个mesh;
    var spriteMap2 = new THREE.TextureLoader().load("models/point.png");
    var spriteMaterial2 = new THREE.SpriteMaterial({map: spriteMap2, color: 0xffffff});

    var sprite2 = new THREE.Sprite(spriteMaterial2);
    sprite1.scale.set(130,130,1);
    sprite2.scale.set(130,130,1);
    sprite2.rotation.x = Math.PI /2;
    sprite1.rotation.x = Math.PI /2;
    sprite2.position.set(100,36.3,0);
    scene.add(sprite2);

    console.log(scene);
}

var controls;

function initControls() {           //控制脚本
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.enableDamping = true;               //定义可以拖拽
    controls.dampingFactor = 0.3;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.rotateSpeed = 0.3;                 //控制旋转速度
    controls.zoomSpeed = 0.5;                   //缩放速度
    controls.autoRotateSpeed = 0.6;             //自动旋转速度
    controls.dampingFactor = 0.6;
    controls.autoRotate = false;                //控制是否自动旋转
    controls.target.set(100,35,0);

}

// model loader


function render() {
    renderer.render(scene, camera);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //controls.handleResize();
}

function animate() {
    render();
    controls.update();
    if (mixers.length > 0) {

        for (var i = 0; i < mixers.length; i++) {

            mixers[i].update(clock.getDelta());

        }

    }
    requestAnimationFrame(animate);
    camera.position.x += 1;
}


function draw() {       //初始化方法

    getModelUrl();
    initCamera();
    initRender();
    initScene();
    initLoader();
    initLight();
    initControls();
    animate();

    window.onresize = onWindowResize;
}
