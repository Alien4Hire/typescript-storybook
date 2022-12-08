import { fakeData } from '../../../components/ActivitySettings/sampleData';
import activitySettingsReducer, {
  setSettingsData,
  clearReducerData,
  clearSettingsSelection,
  addToSelectedSettings,
  addMultipleToSelectedSettings,
  removeSelectedSetting,
  removeMultipleSelectedSettings,
  ActivitySettingsReducerT,
  ActivitySettingT,
} from './activitySettingsSlice';

describe('activity settings reducer', () => {
  const initialState: ActivitySettingsReducerT = {
    all: [],
    selected: [],
  };
  it('should handle initial state', () => {
    expect(activitySettingsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should set activity settings list', () => {
    const actual = activitySettingsReducer(
      initialState,
      setSettingsData(fakeData)
    );
    expect(actual.all).toEqual(fakeData);
  });

  it('should clear activity settings data', () => {
    const actual = activitySettingsReducer(initialState, clearReducerData());
    expect(actual).toEqual(initialState);
  });

  it('should clear activity settings selection', () => {
    const actual = activitySettingsReducer(
      initialState,
      clearSettingsSelection()
    );
    expect(actual).toEqual(initialState);
  });

  it('should add to the selected activity settings list', () => {
    const selected: ActivitySettingT = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afae',
      name: 'Setting Five',
      recommendedUse: 'pre-class',
      studentVisibility: true,
      templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    };
    const actual = activitySettingsReducer(
      initialState,
      addToSelectedSettings(selected)
    );
    expect(actual.selected).toEqual([selected]);
  });

  it('should add multiple to the selected activities settings list', () => {
    const selected: ActivitySettingT[] = [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afaf',
        name: 'Setting Six',
        recommendedUse: 'pre-class',
        studentVisibility: true,
        templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afag',
        name: 'Setting Seven',
        recommendedUse: 'pre-class',
        studentVisibility: true,
        templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    ];
    const actual = activitySettingsReducer(
      initialState,
      addMultipleToSelectedSettings(selected)
    );
    expect(actual.selected).toEqual(selected);
  });

  it('should remove a selected activity setting', () => {
    const selected: ActivitySettingT = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afae',
      name: 'Setting Five',
      recommendedUse: 'pre-class',
      studentVisibility: true,
      templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    };
    const actual = activitySettingsReducer(
      { ...initialState, selected: [selected] },
      removeSelectedSetting(selected.id)
    );
    expect(actual.selected).toEqual(initialState.selected);
  });

  it('should remove multiple selected activitiy settings', () => {
    const selected: ActivitySettingT[] = [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afaf',
        name: 'Setting Six',
        recommendedUse: 'pre-class',
        studentVisibility: true,
        templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afag',
        name: 'Setting Seven',
        recommendedUse: 'pre-class',
        studentVisibility: true,
        templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    ];
    const actual = activitySettingsReducer(
      { ...initialState, selected: [...selected] },
      removeMultipleSelectedSettings([selected[0].id, selected[1].id])
    );
    expect(actual.selected).toEqual(initialState.selected);
  });
});
