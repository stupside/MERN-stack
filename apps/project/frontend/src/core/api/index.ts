// Parties API
export {
  createParty,
  getAllParties,
  getPartyById,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  joinParty,
  leaveParty,
} from "./parties/service";

// Movies API
export {
  searchMovies,
  getMovieById,
} from "./movies/service";

// Players API
export {
  controlPlayer,
  dispatchEvent,
} from "./players/service";
