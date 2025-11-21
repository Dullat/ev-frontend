import { useMapEvents, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const MapClickHandler = ({
  onMapClick,
  clickPosition,
  setClickPosition,
  minZoom = 14,
}) => {
  const map = useMapEvents({
    click(e) {
      const currentZoom = map.getZoom();

      if (currentZoom < minZoom) return;
      setClickPosition(e.latlng);
      if (onMapClick) onMapClick(e.latlng);
    },
  });

  return (
    <>
      {clickPosition && (
        <Popup position={clickPosition} onClose={() => setClickPosition(null)}>
          <div
            className="mt-3"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <p
              className={"badge-secondary rounded max-w-fit"}
              style={{
                margin: "4px 0px",
                padding: "4px",
                fontSize: "10px",
              }}
            >
              Lat:{clickPosition.lat.toFixed(2)}, Lon:
              {clickPosition.lng.toFixed(2)}
            </p>
            <Link
              to={`/addStation/${clickPosition.lat}/${clickPosition.lng}`}
              className="min-w-40 w-full btn-secondary rounded mb-2 !text-white"
            >
              Add Station here
            </Link>
          </div>
        </Popup>
      )}
    </>
  );
};

export default MapClickHandler;
