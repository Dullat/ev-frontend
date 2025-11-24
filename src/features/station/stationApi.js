import { stationApiBase } from "../../services/api";

const stationApi = stationApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getStationByCoords: builder.query({
      query: ({ lat, lon, rad }) => ({
        url: `/station/coords`,
        params: { lat, lon, rad },
      }),
    }),
    addStation: builder.mutation({
      query: (stationData) => ({
        url: "/station",
        method: "POST",
        body: stationData,
      }),
    }),
    searchStationByQuery: builder.query({
      query: (q) => ({
        url: `station/search?q=${q}`,
      }),
    }),
  }),
});

export const {
  useLazyGetStationByCoordsQuery,
  useAddStationMutation,
  useLazySearchStationByQueryQuery,
} = stationApi;

export default stationApi;
