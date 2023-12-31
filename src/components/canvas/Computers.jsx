import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react';
import CanvasLoader from '../Loader'

const Computers = (props) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    <mesh>
        <hemisphereLight intensity={0.15} groundColor='black' /> 
        
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          intensity={1}
          castShadow
          shadow-mapSize={1024} />

        <pointLight intensity={1} />

        <primitive 
          object={computer.scene} 
          scale={0.75} 
          position={props.isMobile ? [0,-3,-2.2] : [0,-3.25,-1.5]} 
          rotation={[-0.01,-0.2,-0.1]} />
    </mesh>
  );
}

export const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=> {
    const mediaQuery = window.matchMedia('(max-width:500px)');
    setIsMobile(mediaQuery.matches);
    const handelMeiaQuerryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handelMeiaQuerryChange);
    return (() => {
      mediaQuery.removeEventListener('change', handelMeiaQuerryChange);
    })
  },[])
  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default Computers 