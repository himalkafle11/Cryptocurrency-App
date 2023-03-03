import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_CRYPTONEWS_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_CRYPTONEWS_HOST,
};

const baseUrl = "https://crypto-news16.p.rapidapi.com/news";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest(`/top/5`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
