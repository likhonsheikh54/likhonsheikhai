"use client"

import React, { useEffect, useRef } from 'react';

// This component creates an interactive flowing lines animation on canvas
export const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configuration
    const config = {
      debug: true,
      friction: 0.5,
      trails: 80,
      size: 50,
      dampening: 0.025,
      tension: 0.99,
    };
    
    // State variables
    let running = true;
    let frame = 1;
    let value = 0;
    let pos = { x: 0, y: 0 };
    let lines: Line[] = [];
    
    // Oscillator class
    class Oscillator {
      phase: number;
      offset: number;
      frequency: number;
      amplitude: number;
      
      constructor(options: { phase?: number; offset?: number; frequency?: number; amplitude?: number } = {}) {
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
      }
      
      update() {
        this.phase += this.frequency;
        value = this.offset + Math.sin(this.phase) * this.amplitude;
        return value;
      }
      
      value() {
        return value;
      }
    }
    
    // Node class
    class Node {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
    }
    
    // Line class
    class Line {
      spring: number;
      friction: number;
      nodes: Node[];
      
      constructor(options: { spring?: number } = {}) {
        this.spring = (options.spring || 0.45) + 0.1 * Math.random() - 0.05;
        this.friction = config.friction + 0.01 * Math.random() - 0.005;
        this.nodes = [];
        
        for (let i = 0; i < config.size; i++) {
          const node = new Node();
          node.x = pos.x;
          node.y = pos.y;
          this.nodes.push(node);
        }
      }
      
      update() {
        let spring = this.spring;
        let node = this.nodes[0];
        
        node.vx += (pos.x - node.x) * spring;
        node.vy += (pos.y - node.y) * spring;
        
        for (let i = 0, n = this.nodes.length; i < n; i++) {
          node = this.nodes[i];
          
          if (i > 0) {
            const prev = this.nodes[i - 1];
            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * config.dampening;
            node.vy += prev.vy * config.dampening;
          }
          
          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;
          
          spring *= config.tension;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;
        let nextX, nextY;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        for (let i = 1, n = this.nodes.length - 2; i < n; i++) {
          const currentNode = this.nodes[i];
          const nextNode = this.nodes[i + 1];
          
          nextX = 0.5 * (currentNode.x + nextNode.x);
          nextY = 0.5 * (currentNode.y + nextNode.y);
          
          ctx.quadraticCurveTo(currentNode.x, currentNode.y, nextX, nextY);
        }
        
        const lastSecond = this.nodes[this.nodes.length - 2];
        const last = this.nodes[this.nodes.length - 1];
        
        ctx.quadraticCurveTo(lastSecond.x, lastSecond.y, last.x, last.y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    
    // Create oscillator
    const oscillator = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    
    // Initialize lines
    function initLines() {
      lines = [];
      for (let i = 0; i < config.trails; i++) {
        lines.push(
          new Line({ spring: 0.45 + (i / config.trails) * 0.025 })
        );
      }
    }
    
    // Handle mouse movement
    function handleMouseMove(e: MouseEvent | TouchEvent) {
      if ('touches' in e) {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
      } else {
        pos.x = (e as MouseEvent).clientX;
        pos.y = (e as MouseEvent).clientY;
      }
      e.preventDefault();
    }
    
    // Handle touch start
    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
      }
    }
    
    // Main animation loop
    function render() {
      if (!ctx || !running) return;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `hsla(${Math.round(oscillator.update())}, 100%, 50%, 0.025)`;
      ctx.lineWidth = 10;
      
      for (let i = 0; i < config.trails; i++) {
        const line = lines[i];
        line.update();
        line.draw();
      }
      
      frame++;
      window.requestAnimationFrame(render);
    }
    
    // Resize canvas to window dimensions
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    // Initial setup
    function init() {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleMouseMove, { passive: false });
      document.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('resize', resizeCanvas);
      
      resizeCanvas();
      
      // Set initial position
      pos.x = canvas.width / 2;
      pos.y = canvas.height / 2;
      
      initLines();
      render();
    }
    
    // Handle focus and blur events
    window.addEventListener('focus', () => {
      if (!running) {
        running = true;
        render();
      }
    });
    
    window.addEventListener('blur', () => {
      running = false;
    });
    
    init();
    
    // Cleanup
    return () => {
      running = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="absolute inset-0 w-full h-full -z-10"
    />
  );
};

export default CanvasAnimation;