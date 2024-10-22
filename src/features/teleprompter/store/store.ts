import { writable } from 'svelte/store';
import type {TeleprometerData} from '../../../types/teleprompter-types'


export const teleprompterConfig = writable({
  teleprometerActiveId: 0,
  minSpeed: 1,
  maxSpeed: 10,
  pixelPerSecond: 5,
  pullImage: 0,
  elementWidth: 0,
  teleprometerSpeed: 1,
  teleprometerPlaying: false,
  teleprometerText: ""
}); // Initial value of the store

export const teleprometerData = writable<TeleprometerData[]>([]);