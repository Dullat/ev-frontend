import { stationApiBase } from "../../services/api";

const stationApi = stationApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getStationByCoords: builder.query({
      query: ({ lat, lon, rad }) => ({
        url: `/station/coords`,
        params: { lat, lon, rad },
      }),
    }),
  }),
});

export const { useLazyGetStationByCoordsQuery } = stationApi;

export default stationApi;
