export const SEARCH_FILTERS_REDUCER_OPTIONS = {
  SHOW_USERS_WITH_RESERVATIONS: "SHOW_USERS_WITH_RESERVATIONS",
  BIKE_RATING: "BIKE_RATING",
};

export const RATING_OPTIONS = [1, 2, 3, 4, 5];

const optionValues = Object.values(SEARCH_FILTERS_REDUCER_OPTIONS);

interface IAction {
  payload: ISearchFilters;
  type: typeof optionValues[number];
}

const defaultFilters = { showUserWithReservation: false, bikeRating: 0 };
const defaultAction = { type: "", payload: defaultFilters };

const searchFiltersReducer = (
  searchFilters: ISearchFilters = defaultFilters,
  action: IAction = defaultAction
): ISearchFilters | null => {
  const { SHOW_USERS_WITH_RESERVATIONS, BIKE_RATING } =
    SEARCH_FILTERS_REDUCER_OPTIONS;
  switch (action.type) {
    case SHOW_USERS_WITH_RESERVATIONS:
      return {
        ...searchFilters,
        showUserWithReservation: action.payload.showUserWithReservation,
      };

    case BIKE_RATING:
      return { ...searchFilters, bikeRating: action.payload.bikeRating };
    default:
      return searchFilters;
  }
};

export default searchFiltersReducer;
