import { telepromptersData } from '../../data/teleprompterData.json';

export const load = async () => {

  const teleprompters = telepromptersData

  return {
    teleprompters
  }
}