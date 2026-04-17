(() => {
  // Tulip color palette - 5 different colors
  const tulipColors = [
    { light: "#FF6B9D", dark: "#FF1493", name: "pink" },
    { light: "#FFD700", dark: "#FFA500", name: "gold" },
    { light: "#DA70D6", dark: "#BA55D3", name: "orchid" },
    { light: "#FF6347", dark: "#DC143C", name: "red" },
    { light: "#FFB6D9", dark: "#FF69B4", name: "light-pink" }
  ];

  function drawTulip(ctx, centerX, baseY, bloomPhase, colorIndex) {
    const color = tulipColors[colorIndex % tulipColors.length];
    const petalHeight = 35;
    const petalWidth = 14;
    const numPetals = 3;

    // Draw stem
    const stemX = centerX;
    const stemTopY = baseY - petalHeight - 15;
    ctx.strokeStyle = "#4b8f47";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(stemX, baseY);
    ctx.quadraticCurveTo(stemX + 5, baseY - 60, stemX + 2, stemTopY);
    ctx.stroke();

    // Draw stem leaves
    ctx.fillStyle = "#5ea65b";
    ctx.save();
    ctx.translate(stemX - 8, baseY - 40);
    ctx.rotate(-0.4);
    ctx.beginPath();
    ctx.ellipse(0, 0, 6, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Draw tulip petals (bloom from bud)
    const bloomScale = Math.min(1, bloomPhase * 1.3);
    const budSize = 8 * (1 - bloomScale * 0.8);

    for (let i = 0; i < numPetals; i++) {
      const angle = (Math.PI * 2 * i) / numPetals - Math.PI / 2;
      
      ctx.save();
      ctx.translate(centerX, stemTopY);
      ctx.rotate(angle);

      // Create gradient for petal
      const gradient = ctx.createLinearGradient(0, 0, 0, -petalHeight);
      gradient.addColorStop(0, color.light);
      gradient.addColorStop(0.5, color.dark);
      gradient.addColorStop(1, color.light);

      // Petal shape - curved/tulip-like
      ctx.globalAlpha = Math.min(1, bloomPhase + 0.2);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Tulip petal curve
      const actualHeight = petalHeight * bloomScale;
      ctx.moveTo(-petalWidth * 0.5, 0);
      ctx.bezierCurveTo(
        -petalWidth * 0.6, -actualHeight * 0.3,
        -petalWidth * 0.3, -actualHeight * 0.7,
        0, -actualHeight
      );
      ctx.bezierCurveTo(
        petalWidth * 0.3, -actualHeight * 0.7,
        petalWidth * 0.6, -actualHeight * 0.3,
        petalWidth * 0.5, 0
      );
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // Draw center bud base
    ctx.save();
    ctx.translate(centerX, stemTopY);
    ctx.fillStyle = "#90EE90";
    ctx.globalAlpha = 1 - bloomScale * 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, budSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBouquetFlowers(ctx, width, height, cycle, bloomPhase) {
    // Arrange 5 tulips in a bouquet pattern
    const tulipPositions = [
      { x: width * 0.3, offset: 0 },
      { x: width * 0.15, offset: 0.15 },
      { x: width * 0.5, offset: 0 },
      { x: width * 0.85, offset: 0.15 },
      { x: width * 0.7, offset: 0.1 }
    ];

    tulipPositions.forEach((pos, index) => {
      // Stagger the bloom timing for each tulip
      const staggerDelay = index * 0.15;
      const tulipBloom = Math.max(0, Math.min(1, bloomPhase - staggerDelay));
      
      // Color cycles based on complete bloom cycles
      const colorIndex = cycle + index;
      
      drawTulip(ctx, pos.x, height * 0.8, tulipBloom, colorIndex);
    });
  }

  window.drawBouquet = function(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    // Get the display size
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas resolution to match display size
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    
    // Scale context to match device pixel ratio
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) {
      console.error('Canvas has zero dimensions');
      return;
    }

    // Animation loop
    let startTime = null;
    let frameCount = 0;
    
    const animate = () => {
      if (!startTime) startTime = Date.now();
      frameCount++;
      
      const elapsed = Date.now() - startTime;
      const bloomPhase = Math.max(0, Math.min(1, (Math.sin(elapsed / 2000 - Math.PI / 2) + 1) / 2));
      const cycle = Math.floor(elapsed / 5000) % 5;
      
      // Clear canvas with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      
      // Reset global alpha
      ctx.globalAlpha = 1;
      
      // Draw the bouquet
      try {
        drawBouquetFlowers(ctx, width, height, cycle, bloomPhase);
      } catch (error) {
        console.error('Error drawing bouquet:', error);
      }
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
  };
})();
