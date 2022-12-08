import searchReducer, {
  setChecked,
  setAllChecked,
  addResourceToLibrary,
  addSelectedResourcesToLibrary,
  SearchStateI,
} from './searchSlice';
import { mockResultList as initialResultList } from '../../../components/ResultList';

describe('search reducer', () => {
  const initialState: SearchStateI = {
    resultList: [],
    allCheckedStatus: false,
    indeterminateStatus: false,
  };
  const initialStateWithDate: SearchStateI = {
    resultList: initialResultList,
    allCheckedStatus: false,
    indeterminateStatus: false,
  };
  it('should handle initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should set checked to true for record with id 0 also indeterminateStatus should be true', () => {
    const actual = searchReducer(initialStateWithDate, setChecked('0'));
    expect(actual.resultList[0].checked).toEqual(true);
    expect(actual.indeterminateStatus).toEqual(true);
  });

  it('should set all checked to true', () => {
    const actual = searchReducer(initialStateWithDate, setAllChecked());
    expect(actual.resultList[5].checked).toEqual(true); //random check to see if all is checked
    expect(actual.indeterminateStatus).toEqual(false);
    expect(actual.allCheckedStatus).toEqual(true);
  });

  it('should set addedToLibrary to true for record with id 3', () => {
    const actual = searchReducer(
      initialStateWithDate,
      addResourceToLibrary('3')
    );
    expect(actual.resultList[3].addedToLibrary).toEqual(true);
  });

  it('should set addedToLibrary to true for record with checked true', () => {
    const updatedState = searchReducer(initialStateWithDate, setChecked('7'));
    const actual = searchReducer(updatedState, addSelectedResourcesToLibrary());
    expect(actual.resultList[7].addedToLibrary).toEqual(true);
  });
});
