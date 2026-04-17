(() => {
  // Blossoming flowers with 3D blooming animation
  // Initialize blossoming flowers with dynamic petals using CSS animations

  window.drawBouquet = function(containerId) {
    // Find the container to insert flowers
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create style element for keyframe animations
    if (!document.getElementById('flower-bloom-styles')) {
      const style = document.createElement('style');
      style.id = 'flower-bloom-styles';
      style.textContent = `
        @keyframes bloomPetal {
          0% {
            transform: scale(0) rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1) rotateX(15deg) rotateY(10deg);
            opacity: 0.9;
          }
        }
        
        @keyframes bloomStem {
          0% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes bloomCenter {
          0% {
            r: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            r: 8;
            opacity: 1;
          }
        }
        
        .flower__leafs {
          animation: bloomFlower 2.5s 0.8s backwards;
        }
        
        .petal {
          transform-origin: center;
          will-change: transform, opacity;
        }
      `;
      document.head.appendChild(style);
    }

    // Blossoming flower color palette
    const flowerColors = [
      { petal: "#FF6B9D", center: "#FFD700" },
      { petal: "#FFD700", center: "#FF6347" },
      { petal: "#DA70D6", center: "#FFB6D9" },
      { petal: "#FF6347", center: "#FF69B4" },
      { petal: "#FFB6D9", center: "#DA70D6" }
    ];

    // Create flower bouquet with 5 blossoming flowers
    const flowerPositions = [
      { x: 30, offset: 0 },
      { x: 15, offset: 15 },
      { x: 50, offset: 0 },
      { x: 85, offset: 15 },
      { x: 70, offset: 10 }
    ];

    // Create SVG container for flowers
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 500');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';
    svg.style.perspective = '1000px';
    container.appendChild(svg);

    flowerPositions.forEach((pos, index) => {
      const colors = flowerColors[index % flowerColors.length];
      const groupX = (pos.x / 100) * 400;
      const groupY = 350;

      // Create a group for this flower
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', `flower flower-${index}`);
      group.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';

      // Draw stem with animation
      const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      stem.setAttribute('x1', groupX);
      stem.setAttribute('y1', groupY);
      stem.setAttribute('x2', groupX + pos.offset * 2);
      stem.setAttribute('y2', 150);
      stem.setAttribute('stroke', '#4b8f47');
      stem.setAttribute('stroke-width', '3');
      stem.setAttribute('stroke-linecap', 'round');
      stem.style.animation = `bloomStem 1.5s ${0.2 + index * 0.1}s ease-in-out forwards`;
      group.appendChild(stem);

      // Draw stem leaves
      const leaf1 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      leaf1.setAttribute('cx', groupX - 15);
      leaf1.setAttribute('cy', groupY - 80);
      leaf1.setAttribute('rx', '6');
      leaf1.setAttribute('ry', '18');
      leaf1.setAttribute('fill', '#5ea65b');
      leaf1.setAttribute('transform', `rotate(-25 ${groupX - 15} ${groupY - 80})`);
      leaf1.style.animation = `bloomPetal 1.2s ${1.2 + index * 0.15}s ease-out backwards`;
      group.appendChild(leaf1);

      // Create petals wrapper group
      const petalsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      petalsGroup.setAttribute('class', 'flower__leafs');
      petalsGroup.style.transformOrigin = `${groupX}px ${150}px`;
      petalsGroup.style.transform = 'translate3d(0, 0, 0)';

      // Draw blossoming petals (8 petals for a fuller bloom)
      const numPetals = 8;
      const centerX = groupX + pos.offset;
      const centerY = 150;
      const petalRadius = 25;

      for (let i = 0; i < numPetals; i++) {
        const angle = (Math.PI * 2 * i) / numPetals;
        const petalX = centerX + Math.cos(angle) * petalRadius;
        const petalY = centerY + Math.sin(angle) * petalRadius;

        // Create petal circle
        const petal = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        petal.setAttribute('cx', petalX);
        petal.setAttribute('cy', petalY);
        petal.setAttribute('r', '12');
        petal.setAttribute('fill', colors.petal);
        petal.setAttribute('class', `petal petal-${i}`);
        petal.style.transformOrigin = `${centerX}px ${centerY}px`;
        petal.style.animation = `bloomPetal 1.2s ${1.2 + i * 0.1}s ease-out backwards`;
        petalsGroup.appendChild(petal);
      }

      group.appendChild(petalsGroup);

      // Draw flower center
      const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      center.setAttribute('cx', centerX);
      center.setAttribute('cy', centerY);
      center.setAttribute('r', '0');
      center.setAttribute('fill', colors.center);
      center.setAttribute('class', 'flower-center');
      center.style.animation = `bloomCenter 0.8s ${1.6 + index * 0.1}s ease-out backwards`;
      group.appendChild(center);

      svg.appendChild(group);
    });
  };
})();
