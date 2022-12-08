import resourceFilterReducer, {
  setTemplateViewTypes,
  initialState,
} from './templateViewTypesSlice';

const mockedTemplateViewTypes = [
  {
    id: 'd4fc4e46-b9e1-45ba-9a16-1c665fd8ce64',
    name: 'Resource Structure',
    description: 'Base list of activities for course',
  },
  {
    id: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
    name: 'Prebuilt Course',
    description:
      'The prebuilt course gives the instructor a pre-built set of activities.',
  },
];

describe('template view types reducer', () => {
  it('should handle initial state', () => {
    expect(resourceFilterReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should set types to an array of types coming from payload', () => {
    const actual = resourceFilterReducer(
      initialState,
      setTemplateViewTypes(mockedTemplateViewTypes)
    );
    expect(actual.types).toHaveLength(2);
  });

  it('should set types to an array of types coming from payload empty', () => {
    const actual = resourceFilterReducer(
      initialState,
      setTemplateViewTypes([])
    );
    expect(actual.types.length).toEqual(0);
  });
});
