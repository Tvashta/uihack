import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import HomePage from "./pages/HomePage";
import ServiceListPage from "./pages/ServiceListPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import SuccessPage from "./pages/SuccessPage";
import "./index.css";

function App() {
  const stars = useMemo(() => {
    const starpos = [];
    for (let i = 0; i < 3000; i++) {
      starpos.push(
        Math.random() * 600 - 300, // x position
        Math.random() * 600 - 300, // y position
        Math.random() * 600 - 300  // z position
      );
    }
    return new Float32Array(starpos);
  }, []);

  const sprite = useLoader(THREE.TextureLoader, '/images/star1.png');

  const Stars = () => {
    const starGeometry = useRef(new THREE.BufferGeometry());
    const starMaterial = useMemo(() => new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
      transparent: true,
    }), [sprite]);

    const positions = useMemo(() => {
      const pos = new Float32Array(stars.length);
      stars.forEach((value, i) => pos[i] = value);
      return pos;
    }, [stars]);

    useMemo(() => {
      starGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }, [positions]);

    useFrame(() => {
      const pos = starGeometry.current.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        const z = pos[i + 2];
        pos[i + 2] += 0.6 + Math.abs(z) * 0.002;
        if (pos[i + 2] > 200) pos[i + 2] = -200;
      }
      starGeometry.current.attributes.position.needsUpdate = true;
    });

    return <points geometry={starGeometry.current} material={starMaterial} />;
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Stars />
      </Canvas>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServiceListPage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/booking" element={<BookingConfirmationPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



