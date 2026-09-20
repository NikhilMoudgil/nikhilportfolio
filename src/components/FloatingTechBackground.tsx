import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingTechBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Cap pixel ratio for performance (prevents lag on high-res mobile displays)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lighting (Matches your Indigo/Purple Tailwind theme)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4f46e5, 2, 50); // Indigo
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 50); // Purple
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // 3. Materials
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1, // Indigo-500
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const solidMaterial = new THREE.MeshStandardMaterial({
      color: 0x312e81, // Indigo-900
      roughness: 0.4,
      metalness: 0.8,
      transparent: true,
      opacity: 0.4,
    });

    const glowingMaterial = new THREE.MeshStandardMaterial({
      color: 0xc084fc, // Purple-400
      emissive: 0x9333ea, // Purple-600
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.6,
    });

    // 4. Procedural Generation of Tech Elements
    const objects: THREE.Mesh[] = [];

    const createMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, count: number) => {
      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        
        // Random spread across the screen
        mesh.position.x = (Math.random() - 0.5) * 60;
        mesh.position.y = (Math.random() - 0.5) * 60;
        mesh.position.z = (Math.random() - 0.5) * 30 - 10;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        // Custom userData for Math.sin jellyfish physics
        mesh.userData = {
          rotSpeedX: (Math.random() - 0.5) * 0.01,
          rotSpeedY: (Math.random() - 0.5) * 0.01,
          floatSpeed: Math.random() * 0.5 + 0.5,
          floatOffset: Math.random() * Math.PI * 2,
          floatAmplitude: Math.random() * 2 + 1,
          initialY: mesh.position.y
        };

        scene.add(mesh);
        objects.push(mesh);
      }
    };

    // Node/Data Structures (Wireframe Cubes)
    createMesh(new THREE.BoxGeometry(2, 2, 2), wireframeMaterial, 20);
    
    // Tech Shards (Tetrahedrons)
    createMesh(new THREE.TetrahedronGeometry(1.5), solidMaterial, 15);
    
    // Logic/Token Loops (Torus Rings)
    createMesh(new THREE.TorusGeometry(1, 0.1, 8, 20), glowingMaterial, 10);

    // 5. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      objects.forEach((obj) => {
        // Gentle rotation
        obj.rotation.x += obj.userData.rotSpeedX;
        obj.rotation.y += obj.userData.rotSpeedY;

        // Jellyfish vertical drift using Sine wave
        obj.position.y = obj.userData.initialY + Math.sin(elapsedTime * obj.userData.floatSpeed + obj.userData.floatOffset) * obj.userData.floatAmplitude;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 6. Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 7. Cleanup to prevent memory leaks
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials
      objects.forEach(obj => {
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0, // Behind your content
        pointerEvents: "none", // Crucial: Ensures you can still click buttons and links!
      }}
    />
  );
}