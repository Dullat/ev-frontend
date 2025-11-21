import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LocateFixed, LocateOff, Locate } from "lucide-react";
import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useLazyGetStationByCoordsQuery } from "../features/station/stationApi";
import BottomSheet from "./BottomSheet.jsx";
import useUserLocation from "../hooks/useUserLocation.jsx";
import userIcon from "./userIcon.js";
import MapClickHandler from "./MapClickHandler.jsx";
import { useParams } from "react-router-dom";

const MapEventHandler = ({ onBoundsChange, onUserPan }) => {
  const map = useMap();

  useEffect(() => {
    const handleMoveEnd = () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      const bounds = map.getBounds();

      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      const radius = Math.round(map.distance(center, ne));

      if (radius < 100000)
        onBoundsChange({
          lat: center.lat,
          lng: center.lng,
          zoom,
          rad: radius,
        });
    };

    handleMoveEnd();

    const handleDragStart = () => {
      if (onUserPan) onUserPan();
    };

    map.on("moveend", handleMoveEnd);
    map.on("zoomend", handleMoveEnd);
    map.on("dragstart", handleDragStart);

    return () => {
      map.off("moveend", handleMoveEnd);
      map.off("zoomend", handleMoveEnd);
      map.off("dragstart", handleDragStart);
    };
  }, [map, onBoundsChange]);
  return null;
};

const stationIcon = new Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RecenterOnUser = ({ position, follow }) => {
  const map = useMap();
  React.useEffect(() => {
    console.log(position);
    if (position && follow) {
      map.setView([position.lat, position.lon], 16, {
        animate: true,
      });
    }
  }, [position, follow, map]);

  return null;
};

const MapView = () => {
  const [selectedStation, setSelectedStation] = React.useState(null);
  const [getStationByCoords, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetStationByCoordsQuery();
  const debounceRef = React.useRef(null);

  const { position } = useUserLocation();
  const [followUser, setFollowUser] = React.useState(true);

  const [clickPosition, setClickPostion] = React.useState(null);

  const { lat, lon } = useParams();

  const fetchStations = React.useCallback(
    async ({ lat, lng, rad }) => {
      clearTimeout(debounceRef?.current);
      setSelectedStation(null);

      if (!lat || !lng || !rad) return;

      debounceRef.current = setTimeout(async () => {
        try {
          const data = await getStationByCoords({
            lat,
            lon: lng,
            rad,
          }).unwrap();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    },
    [getStationByCoords],
  );

  const handleBoundsChange = React.useCallback(
    (mapInfo) => {
      fetchStations(mapInfo);
    },
    [fetchStations],
  );

  React.useEffect(() => {
    return () => clearTimeout(debounceRef?.current);
  }, []);

  React.useEffect(() => {
    if (lat && lon) {
      setFollowUser(false);
    }
  });
  return (
    <>
      <MapContainer
        center={[lat || 30.76, lon || 76.78]}
        zoom={13}
        className={`h-full w-full`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEventHandler
          onBoundsChange={handleBoundsChange}
          onUserPan={() => setFollowUser(false)}
        />

        <MapClickHandler
          onMapClick={(p) => console.log(p)}
          clickPosition={clickPosition}
          setClickPosition={setClickPostion}
        />

        {data?.stations?.map((station) => (
          <Marker
            key={station._id}
            icon={stationIcon}
            position={[
              station.location.coordinates[1],
              station.location.coordinates[0],
            ]}
            eventHandlers={{
              click: () => setSelectedStation(station),
            }}
          ></Marker>
        ))}

        {position && (
          <>
            <Marker
              position={[position.lat, position.lon]}
              icon={userIcon(position.heading || 0)}
            />
            <RecenterOnUser position={position} follow={followUser} />
          </>
        )}
      </MapContainer>
      {selectedStation && (
        <BottomSheet
          station={selectedStation}
          isOpen={!!selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}{" "}
      <button
        onClick={() => setFollowUser((prev) => !prev)}
        className="absolute bottom-5 right-5 bg-white shadow-md rounded-full p-3 z-[1001]"
      >
        {followUser && position ? (
          <LocateFixed className="h-8 w-8 text-blue-600" />
        ) : (
          <Locate className="h-8 w-8 text-red-400" />
        )}
      </button>
    </>
  );
};

export default MapView;
