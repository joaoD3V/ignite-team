/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { PLAYER_COLLECTION } from '../storageConfig';
import { getPlayersByGroup } from './getPlayersByGroup';
import { AppError } from '@/utils/AppError';

export async function addPlayerByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.find(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists) {
      throw new AppError('Essa pessoa já está adiciona em um time aqui.');
    }

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify([...storedPlayers, newPlayer])
    );
  } catch (error) {
    throw error;
  }
}
