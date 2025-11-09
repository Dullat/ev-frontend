import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import {
  MapPin,
  Zap,
  DollarSign,
  Navigation,
  Phone,
  Clock,
  Star,
  X,
} from "lucide-react";

const BottomSheet = ({ station, isOpen, onClose }) => {
  const maxHeight = window.innerHeight * 0.7; // 70% of screen

  const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));

  const bind = useDrag(
    ({ movement: [, my], last, memo = y.get() }) => {
      let newY = memo + my;
      newY = Math.max(0, newY);

      if (last) {
        if (newY > maxHeight / 3) {
          api.start({ y: window.innerHeight });
          onClose();
        } else {
          api.start({ y: 0 });
        }
      } else {
        api.start({ y: newY, immediate: true });
      }
      return memo;
    },
    { from: () => [0, y.get()] },
  );

  useEffect(() => {
    if (isOpen) {
      api.start({ y: 0 });
    } else {
      api.start({ y: window.innerHeight });
    }
  }, [isOpen, api]);

  if (!station) return null;

  return (
    <animated.div
      {...bind()}
      className="fixed right-0 bottom-0 w-full max-w-4xl bg-gradient-to-b from-white to-gray-50 shadow-2xl rounded-t-3xl z-[2000]"
      style={{
        transform: y.to((py) => `translateY(${py}px)`),
        height: maxHeight,
        touchAction: "none",
      }}
    >
      {/* Drag Handle */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>
      {/* Header */}
      <div className="px-6 pb-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {station.name}
            </h2>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {station.city}, {station.state}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Rating (optional) */}
        <div className="flex items-center mt-3">
          <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-semibold text-gray-700">0</span>
            <span className="text-xs text-gray-500 ml-1">(0 reviews)</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div
        className="px-6 pt-4 overflow-y-auto m-0"
        style={{ maxHeight: maxHeight - 160 }}
      >
        <div className="max-w-6xl m-auto">
          {/* Info Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Charger Type Card */}
            {station.chargerType && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">Charger Type</p>
                <p className="text-sm font-bold text-gray-900">
                  {station.chargerType}
                </p>
              </div>
            )}

            {/* Price Card */}
            {station.pricePerKwh && (
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">Price per kWh</p>
                <p className="text-sm font-bold text-gray-900">
                  ₹{station.pricePerKwh}
                </p>
              </div>
            )}

            {/* Availability Card */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">Status</p>
              <p className="text-sm font-bold text-green-600">Available</p>
            </div>

            {/* Distance Card */}
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">Distance</p>
              <p className="text-sm font-bold text-gray-900">N/A</p>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              Location Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Street</span>
                <span className="font-medium text-gray-900 text-right">
                  {station.street || "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">City</span>
                <span className="font-medium text-gray-900">
                  {station.city}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">State</span>
                <span className="font-medium text-gray-900">
                  {station.state}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Country</span>
                <span className="font-medium text-gray-900">
                  {station.country}
                </span>
              </div>
            </div>
          </div>

          {/* Owner Info */}
          {station.ownerName && (
            <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Owner Information
              </h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {station.ownerName.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-900">
                    {station.ownerName}
                  </p>
                  {station.ownerLink && ""}
                </div>
                {station.ownerPhone && (
                  <button className="p-2 bg-green-50 rounded-full hover:bg-green-100 transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pb-4">
            <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
              <Navigation className="w-5 h-5 mr-2" />
              Directions
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 cursor-pointer font-semibold py-3 px-4 rounded-xl border-2 border-gray-200 transition-colors flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call Owner
            </button>
          </div>
        </div>
      </div>
      <p className="text-[12px] text-blue-500 text-center h-40 block bottom-0">
        <a href="">Visit Project documentation</a>
      </p>
    </animated.div>
  );
};

export default BottomSheet;
