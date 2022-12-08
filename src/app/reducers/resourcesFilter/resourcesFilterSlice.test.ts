import resourceFilterReducer, {
  setIsFilterOpen,
  initialState,
} from './resourcesFilterSlice';

describe('lessons reducer', () => {
  it('should handle initial state', () => {
    expect(resourceFilterReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should set isFilterOpen to true', () => {
    const actual = resourceFilterReducer(initialState, setIsFilterOpen(true));
    expect(actual.isFilterOpen).toEqual(true);
  });

  it('should set isFilterOpen to false', () => {
    const actual = resourceFilterReducer(initialState, setIsFilterOpen(false));
    expect(actual.isFilterOpen).toEqual(false);
  });
});
