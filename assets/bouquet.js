(() => {
  // Blossoming flowers - Pure CSS/SVG approach
  // Initialize blossoming flowers with dynamic petals

  window.drawBouquet = function(containerId) {
    // Find the container to insert flowers
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

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
    container.appendChild(svg);

    flowerPositions.forEach((pos, index) => {
      const colors = flowerColors[index % flowerColors.length];
      const groupX = (pos.x / 100) * 400;
      const groupY = 350;

      // Create a group for this flower
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', `flower flower-${index}`);

      // Draw stem
      const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      stem.setAttribute('x1', groupX);
      stem.setAttribute('y1', groupY);
      stem.setAttribute('x2', groupX + pos.offset * 2);
      stem.setAttribute('y2', 150);
      stem.setAttribute('stroke', '#4b8f47');
      stem.setAttribute('stroke-width', '3');
      stem.setAttribute('stroke-linecap', 'round');
      group.appendChild(stem);

      // Draw stem leaves
      const leaf1 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      leaf1.setAttribute('cx', groupX - 15);
      leaf1.setAttribute('cy', groupY - 80);
      leaf1.setAttribute('rx', '6');
      leaf1.setAttribute('ry', '18');
      leaf1.setAttribute('fill', '#5ea65b');
      leaf1.setAttribute('transform', `rotate(-25 ${groupX - 15} ${groupY - 80})`);
      group.appendChild(leaf1);

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
        petal.setAttribute('opacity', '0.9');
        petal.setAttribute('class', `petal petal-${i}`);
        petal.style.animation = `bloomPetal 2s ease-in-out infinite`;
        petal.style.animationDelay = `${i * 0.1}s`;
        group.appendChild(petal);
      }

      // Draw flower center
      const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      center.setAttribute('cx', centerX);
      center.setAttribute('cy', centerY);
      center.setAttribute('r', '8');
      center.setAttribute('fill', colors.center);
      center.setAttribute('class', 'flower-center');
      group.appendChild(center);

      svg.appendChild(group);
    });
  };
})();
