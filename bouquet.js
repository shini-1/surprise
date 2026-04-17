(() => {
  // Blossoming flowers matching CodeWithRandom design
  // Complete flower with petals, lights, and stem

  window.drawBouquet = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // Inject styles
    if (!document.getElementById('cwr-flower-styles')) {
      const style = document.createElement('style');
      style.id = 'cwr-flower-styles';
      style.textContent = `
        @keyframes bloomFlower {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        
        @keyframes bloomLeaf {
          0% { transform: scale(0); transform-origin: center; }
          100% { transform: scale(1); }
        }
        
        @keyframes lightFloat {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) translateX(var(--tx));
          }
        }
        
        .flower-svg { perspective: 1000px; }
        .flower { transform-style: preserve-3d; }
        .flower__leafs { animation: bloomFlower 1.5s 0.5s ease-out backwards; }
        .flower__light { animation: lightFloat 3s ease-in infinite; }
      `;
      document.head.appendChild(style);
    }

    const flowers = [
      { x: 30, offset: 0, delay: 0 },
      { x: 15, offset: 15, delay: 0.2 },
      { x: 50, offset: 0, delay: 0.4 },
      { x: 85, offset: 15, delay: 0.6 },
      { x: 70, offset: 10, delay: 0.8 }
    ];

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 500');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('class', 'flower-svg');
    container.appendChild(svg);

    flowers.forEach((flower, idx) => {
      const cx = (flower.x / 100) * 400;
      const cy = 150;
      const baseY = 350;

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `flower flower-${idx}`);

      // Stem
      const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      stem.setAttribute('x1', cx);
      stem.setAttribute('y1', baseY);
      stem.setAttribute('x2', cx + flower.offset * 2);
      stem.setAttribute('y2', cy);
      stem.setAttribute('stroke', '#14757a');
      stem.setAttribute('stroke-width', '2.5');
      stem.setAttribute('stroke-linecap', 'round');
      g.appendChild(stem);

      // Stem leaves (4 leaves spread around stem)
      const stemLeafPositions = [
        { x: cx - 20, y: baseY - 60, angle: -25 },
        { x: cx + 20, y: baseY - 80, angle: 25 },
        { x: cx - 15, y: baseY - 130, angle: -20 },
        { x: cx + 15, y: baseY - 150, angle: 20 }
      ];

      stemLeafPositions.forEach((pos, i) => {
        const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        leaf.setAttribute('cx', pos.x);
        leaf.setAttribute('cy', pos.y);
        leaf.setAttribute('rx', '5');
        leaf.setAttribute('ry', '15');
        leaf.setAttribute('fill', '#39c6d6');
        leaf.setAttribute('opacity', '0.7');
        leaf.setAttribute('transform', `rotate(${pos.angle} ${pos.x} ${pos.y})`);
        leaf.style.animation = `bloomLeaf 0.6s ${0.6 + i * 0.1}s ease-out backwards`;
        g.appendChild(leaf);
      });

      // Petals wrapper
      const petalsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      petalsGroup.setAttribute('class', 'flower__leafs');
      petalsGroup.style.transformOrigin = `${cx}px ${cy}px`;

      // 4 large organic petal shapes (leaf-like)
      const petalColors = ['#a7ffee', '#a7ffee', '#54b8aa', '#a7ffee'];
      const petalAngles = [0, 90, 180, 270];

      petalAngles.forEach((angle, i) => {
        const petal = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const rad = (angle * Math.PI) / 180;
        const px = cx + Math.cos(rad) * 22;
        const py = cy + Math.sin(rad) * 22;
        
        // Create organic petal shape
        petal.setAttribute('d', `M${px},${py} Q${px + Math.cos(rad) * 8},${py + Math.sin(rad) * 8 + 15} ${px + Math.cos(rad) * 2},${py + Math.sin(rad) * 20}`);
        petal.setAttribute('fill', petalColors[i]);
        petal.setAttribute('stroke', '#39c6d6');
        petal.setAttribute('stroke-width', '0.5');
        petal.setAttribute('opacity', '0.85');
        petal.style.animation = `bloomLeaf 0.8s ${0.7 + i * 0.12}s ease-out backwards`;
        petalsGroup.appendChild(petal);
      });

      g.appendChild(petalsGroup);

      // 8 small light particles
      for (let i = 0; i < 8; i++) {
        const light = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const angle = (i / 8) * Math.PI * 2;
        const lightRadius = 20;
        const lx = cx + Math.cos(angle) * lightRadius;
        const ly = cy + Math.sin(angle) * lightRadius;

        light.setAttribute('cx', lx);
        light.setAttribute('cy', ly);
        light.setAttribute('r', '1.5');
        light.setAttribute('fill', i % 2 === 0 ? '#fffb00' : '#23f0ff');
        light.setAttribute('class', 'flower__light');
        light.style.filter = 'blur(0.5px)';
        light.style.setProperty('--tx', `${Math.cos(angle) * 10}px`);
        light.style.animationDelay = `${0.5 + i * 0.3}s`;
        g.appendChild(light);
      }

      // White center circle
      const whiteCenterGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const whiteCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      whiteCircle.setAttribute('cx', cx);
      whiteCircle.setAttribute('cy', cy);
      whiteCircle.setAttribute('r', '4.5');
      whiteCircle.setAttribute('fill', '#fff');
      whiteCircle.setAttribute('opacity', '0.95');
      whiteCircle.style.animation = `bloomLeaf 0.6s 1.2s ease-out backwards`;
      whiteCenterGroup.appendChild(whiteCircle);

      // Yellow center
      const yellowCenter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      yellowCenter.setAttribute('cx', cx);
      yellowCenter.setAttribute('cy', cy);
      yellowCenter.setAttribute('r', '2');
      yellowCenter.setAttribute('fill', '#ffeb12');
      yellowCenter.style.animation = `bloomLeaf 0.5s 1.3s ease-out backwards`;
      whiteCenterGroup.appendChild(yellowCenter);

      g.appendChild(whiteCenterGroup);

      svg.appendChild(g);
    });
  };
})();
