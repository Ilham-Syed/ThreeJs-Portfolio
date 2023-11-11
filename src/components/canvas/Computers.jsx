import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, meshBounds, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { ComputersCanvas } from ".";


const Computers = ({isMobile}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  // if (!computer.scene) {
  //   return null; // Return null or a loading indicator while the model is still loading
  // }
  return (
    <mesh>
      <hemisphereLight intensity={2.5} skyColor="#ffffff" groundColor="#000000" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive 
      object={computer.scene}
      scale={isMobile? 0.7: 0.75}
      position={isMobile? [0,-3,-2.2]:[0,-3.25,-1.5]} 
      rotation= {[-0.01,-0.2,-0.1]}
      />
    </mesh>
  );
};

const ComputerCanvas = () => {
  const [isMobile,setIsMobile]=useState(false);

  useEffect(()=>{
    const mediaQuery=window.matchMedia('(max-width:500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange=(event)=>{
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change',handleMediaQueryChange);

    return ()=>{
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  },[]);

  return (
  <Canvas frameloop="demand" shadows
  camera={{position : [20,3,5], fov:25}}
  gl={{preserveDrawingBuffer:true }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls enableZoom={false}
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}
      />

      <Computers isMobile={isMobile}/>
    </Suspense>
    <Preload all />
  </Canvas>
  );
};

export default ComputerCanvas;
