import React, { useState, useEffect } from 'react';

export default function CharacterAttributes({ totalPoints }) {
  // Calculate initial points distribution
  const initialPoints = 0;

  // State hooks for each attribute
  const [health, setHealth] = useState(initialPoints);
  const [stamina, setStamina] = useState(initialPoints);
  const [speed, setSpeed] = useState(initialPoints);

  // Effect hook to redistribute points when totalPoints prop changes
  useEffect(() => {
    setHealth(initialPoints);
    setStamina(initialPoints);
    setSpeed(initialPoints);
  }, [totalPoints, initialPoints]);

  // Handler to update attributes
  const handleAttributeChange = (attribute, value) => {
    const newValue = parseInt(value, 10);
    const totalUsed =
      health +
      stamina +
      speed +
      newValue -
      (attribute === 'health'
        ? health
        : attribute === 'stamina'
        ? stamina
        : speed
      );

    if (totalUsed <= totalPoints) {
      switch (attribute) {
        case 'health':
          setHealth(newValue);
          break;
        case 'stamina':
          setStamina(newValue);
          break;
        case 'speed':
          setSpeed(newValue);
          break;
        default:
          break;
      }
    }
  };

  // Calculate the maximum value for each input
  const maxInputValue = Math.floor(totalPoints * 0.7);

  return (
    <div>
      Character stats:{' '}
      <span id="points">{totalPoints - (health + stamina + speed)}</span> points
      left.
      <div>
        Health: {health}
        <input
          type="range"
          min="0"
          max={maxInputValue}
          value={health}
          onChange={(e) => handleAttributeChange('health', e.target.value)}
          step="1"
        />
      </div>
      <div>
        Stamina: {stamina}
        <input
          type="range"
          min="0"
          max={maxInputValue}
          value={stamina}
          onChange={(e) => handleAttributeChange('stamina', e.target.value)}
          step="1"
        />
      </div>
      <div>
        Speed: {speed}
        <input
          type="range"
          min="0"
          max={maxInputValue}
          value={speed}
          onChange={(e) => handleAttributeChange('speed', e.target.value)}
          step="1"
        />
      </div>
    </div>
  );
}

