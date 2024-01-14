import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGroups } from './getGroups';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../storageConfig';

/* eslint-disable no-useless-catch */
export async function removeGroupByName(deletedGroup: string) {
  try {
    const storedGroups = await getGroups();
    const groups = storedGroups.filter((group) => group !== deletedGroup);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${deletedGroup}`);
  } catch (error) {
    throw error;
  }
}
