import React, {useState,useEffect} from "react";
import ReactDOM from "react-dom";

function CharacterAttributes({totalPoints}) {
  const initialPoints=0;
  const maxPoints=totalPoints==1 ? 1 : Math.floor(totalPoints*0.7);
  const [health,setHealth]=useState(initialPoints);
  const [stamina,setStamina]=useState(initialPoints);
  const [speed,setSpeed]=useState(initialPoints);

  const handleAttributeChange=(attribute,value)=>{
    const newValue=parseInt(value, 10);

    console.log(value);
    const subTotalPoints=health+speed+stamina+newValue-(attribute === 'health'
        ? health
        : attribute === 'stamina'
        ? stamina
        : speed
      );

    if(subTotalPoints<=totalPoints){
      switch (attribute){
        case 'health':
          setHealth(newValue);
          break;
        case 'speed':
          setSpeed(newValue);
          break;
        case 'stamina':
          setStamina(newValue);
          break;
        default:
          break;
      }
    }
    
  };

  return (
    <div>
      Character stats: <span id="points">{totalPoints-stamina-health-speed}</span> points left.
      <div>
        <input type="range" onChange={(e)=>{handleAttributeChange('health',e.target.value)}} id="health" min="0" max={maxPoints} value={health} step="1" />Health ({health})
      </div>
      <div>
        <input type="range" onChange={(e)=>{handleAttributeChange('stamina',e.target.value)}} id="stamina" min="0" max={maxPoints} value={stamina} step="1" />Stamina ({stamina})
      </div>
      <div>
        <input type="range" onChange={(e)=>{handleAttributeChange('speed',e.target.value)}} id="speed" min="0" max={maxPoints} value={speed} step="1" />Speed ({speed})
      </div>
    </div>
  );
}

export default CharacterAttributes;