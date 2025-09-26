"use server";

import {
  createPartySchema,
  getAllPartiesSchema,
  getPartyByIdSchema,
  addMovieToWatchlistSchema,
  removeMovieFromWatchlistSchema,
  joinPartySchema,
  leavePartySchema,
} from "libraries/api/schemas/parties";
import { makeRequest } from "libraries/api/request";
import { token } from "../../auth/service";

import type { z } from "zod";

export const createParty = async (
  body: z.infer<typeof createPartySchema.body>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/parties`,
    "POST",
    createPartySchema,
    {
      body,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};

export const getAllParties = async () => {
  return makeRequest(
    `${process.env.BACKEND_URL}/parties`,
    "GET",
    getAllPartiesSchema,
    {
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};

export const getPartyById = async (
  params: z.infer<typeof getPartyByIdSchema.params>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/parties/:id`,
    "GET",
    getPartyByIdSchema,
    {
      params,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};

export const addMovieToWatchlist = async (
  params: z.infer<typeof addMovieToWatchlistSchema.params>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/parties/:id/movies/:movie`,
    "POST",
    addMovieToWatchlistSchema,
    {
      params,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};

export const removeMovieFromWatchlist = async (
  params: z.infer<typeof removeMovieFromWatchlistSchema.params>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/parties/:id/movies/:movie`,
    "DELETE",
    removeMovieFromWatchlistSchema,
    {
      params,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};

export const joinParty = async (body: z.infer<typeof joinPartySchema.body>) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/parties/join`,
    "POST",
    joinPartySchema,
    {
      body,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};

export const leaveParty = async (
  params: z.infer<typeof leavePartySchema.params>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/parties/:id/leave`,
    "POST",
    leavePartySchema,
    {
      params,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};
