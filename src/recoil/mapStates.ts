import { atom } from 'recoil';

export const filterState = atom<string>({
  key: 'filterState',
  default: '',
});

export const openFilterState = atom<boolean>({
  key: 'openFilterState',
  default: false,
});

export const filterOptionState = atom<string>({
  key: 'filterOptionState',
  default: '',
});

export const rangeState = atom<number>({
  key: 'rangeState',
  default: 200,
});

export const placeIdState = atom<string>({
  key: 'placeIdState',
  default: '',
});

export const placesState = atom<google.maps.places.PlaceResult[]>({
  key: 'placesState',
  default: [],
});