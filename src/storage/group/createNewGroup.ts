/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@/utils/AppError';
import { GROUP_COLLECTION } from '../storageConfig';
import { getGroups } from './getGroups';

export async function createNewGroup(newGroup: string) {
  try {
    const groupsStored = await getGroups();

    const groupAlreadyExist = groupsStored.includes(newGroup);

    if (groupAlreadyExist) {
      throw new AppError('Já existe um grupo cadastrado com esse nome');
    }

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...groupsStored, newGroup])
    );
  } catch (error) {
    throw error;
  }
}
