import L from "leaflet";

const userIcon = (heading = 0) =>
  L.divIcon({
    className: "user-marker",
    html: `
      <div class="user-location-wrapper">
        <div class="pulse-ring"></div>
        <div class="user-arrow" style="transform: rotate(${heading}deg);">
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <!-- Outer glow -->
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
              </linearGradient>
            </defs>
            
            <!-- Main arrow shape -->
            <path 
              d="M 20 5 L 28 30 L 20 26 L 12 30 Z" 
              fill="url(#arrowGradient)"
              stroke="#ffffff"
              stroke-width="2"
              filter="url(#glow)"
            />
            
            <!-- Inner highlight -->
            <path 
              d="M 20 8 L 26 28 L 20 25 L 14 28 Z" 
              fill="#60a5fa"
              opacity="0.6"
            />
            
            <!-- Center dot -->
            <circle cx="20" cy="20" r="3" fill="#ffffff" />
          </svg>
        </div>
      </div>
      <style>
        .user-location-wrapper {
          position: relative;
          width: 40px;
          height: 40px;
        }
        
        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          margin: -30px 0 0 -30px;
          border: 3px solid #3b82f6;
          border-radius: 50%;
          opacity: 0;
          animation: pulse 2s ease-out infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        .user-arrow {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          transition: transform 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        .user-marker {
          background: transparent !important;
          border: none !important;
        }
      </style>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

export default userIcon;
