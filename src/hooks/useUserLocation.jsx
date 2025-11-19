import React from "react";

const useUserLocation = () => {
  const [position, setPosition] = React.useState(null);
  const [isWatching, setIsWatching] = React.useState(false);
  const watchRef = React.useRef(null);

  React.useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported");
      return;
    }

    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, heading } = pos.coords;
        setPosition({ lat: latitude, lon: longitude, heading });
        console.log(pos);
      },
      (err) => console.log("Geolocation error:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 20000,
      },
    );

    setIsWatching(true);

    return () => {
      if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);
    };
  }, []);

  return { position, isWatching };
};

export default useUserLocation;
