import * as THREE from 'three';

class DroneScene extends THREE.Scene {
  constructor() {
    super();
    this.drone = null;
    // Remove the axesHelper property
  }

  init() {
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    this.add(directionalLight);

    // Create cube drone
    this.createCubeDrone();

    // Remove the call to addAxesHelper
    // this.addAxesHelper();

    // Add environment
    this.addEnvironment();

    // Add scenery
    this.addScenery();
  }

  createCubeDrone() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    this.drone = new THREE.Mesh(geometry, material);
    this.drone.position.set(0, 5, 0);
    
    // Ensure the drone is facing north (negative Z-axis)
    this.drone.rotation.y = 0;
    
    this.add(this.drone);
  }

  // Remove the addAxesHelper method

  addEnvironment() {
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.add(ground);

    // Skybox (simple color for now)
    const skyColor = new THREE.Color(0x87CEEB);
    this.background = skyColor;
  }

  addScenery() {
    const treeGeometry = new THREE.ConeGeometry(1, 5, 8);
    const treeMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const treeTrunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
    const treeTrunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });

    for (let i = -50; i <= 50; i += 10) {
      for (let j = -50; j <= 50; j += 10) {
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);
        tree.position.set(i, 3.5, j);

        const trunk = new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial);
        trunk.position.set(0, -2, 0);
        tree.add(trunk);

        this.add(tree);
      }
    }

    // Add some buildings
    const buildingGeometry = new THREE.BoxGeometry(5, 10, 5);
    const buildingMaterial = new THREE.MeshPhongMaterial({ color: 0xa9a9a9 });

    for (let i = -40; i <= 40; i += 20) {
      for (let j = -40; j <= 40; j += 20) {
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(i, 5, j);
        this.add(building);
      }
    }
  }
}

export default DroneScene;
