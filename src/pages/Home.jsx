import { useState, Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Ship from '../models/Ship'

{/* <div className="absolute top-28 left-0 right-0 z-10 flex
      items-center justify-center">
        POPUP
      </div> */}

const Home = () => {
const [isRotating, setIsRotating] = useState(false);
const [ currentStage, setCurrentStage ] = useState(1);

  const adjustIslandForScreenSize =() => {
    let screenScale = null;
    let screenPosition = [0, -9.5, -43.4];
    let rotation = [0, 4.7,0 ];
  
    if (window.innerWidth < 768){
      screenScale = [1.5, 1.5, 1.5];
    } else{
      screenScale = [2, 2, 2];
    }
    return [screenScale, screenPosition, rotation]
  }

  const adjustShipForScreenSize =() => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768){
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5 ,0];
    } else{
      screenScale = [3, 3, 3];
      screenPosition = [0, -4 ,-4];
    }
    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [shipScale, shipPosition] = adjustShipForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas 
      className= {`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
      camera={{ near: 0.1, far: 1000}}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1,1,1]} intensity= {1.5}/>
          <ambientLight intensity={0.5} />
          <hemisphereLight  skyColor="#b1e1ff" groundColor="#000000" intensity ={2}/> 
          <Bird/> 
          <Sky/>
          <Island
            position = {islandPosition}
            scale = {islandScale}
            rotation ={islandRotation}
            isRotating = {isRotating}
            setIsRotating = {setIsRotating}
            setCurrentStage={setCurrentStage}
           />
          <Ship
            shipScale = {shipScale}
            shipPosition = {shipPosition}
            isRotating = {isRotating}
            rotation={[0,20,0]}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home