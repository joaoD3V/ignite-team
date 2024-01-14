/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '@/components/Header';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Highlight } from '@/components/Highlight';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { Alert, FlatList, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { PlayerCard } from '@/components/PlayerCard';
import { ListEmpty } from '@/components/ListEmpty';
import { Button } from '@/components/Button';
import { PlayerStorageDTO } from '@/storage/player/PlayerStorageDTO';
import { AppError } from '@/utils/AppError';
import { addPlayerByGroup } from '@/storage/player/addPlayerByGroup';
import { getPlayersByGroupAndTeam } from '@/storage/player/getPlayersByGroupAndTeam';
import { removePlayerByGroup } from '@/storage/player/removePlayerByGroup';
import { removeGroupByName } from '@/storage/group/removeGroupByName';
import { Loading } from '@/components/Loading';

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const navigation = useNavigation();

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  async function handleAddPlayer(playerName: string) {
    if (playerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar.'
      );
    }

    const newPlayer: PlayerStorageDTO = {
      name: playerName,
      team,
    };

    try {
      await addPlayerByGroup(newPlayer, group);
      fetchPlayersByTeam();
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch {
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar a listagem de pessoas do time selecionado.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch {
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
    }
  }

  async function groupRemove(groupName: string) {
    try {
      await removeGroupByName(groupName);
      navigation.navigate('groups');
    } catch {
      Alert.alert('Remover grupo', 'Não foi possível remover a turma.');
    }
  }

  async function handleRemoveGroup(groupName: string) {
    Alert.alert('Remover', 'Deseja remover a turma?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove(groupName) },
    ]);
  }

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adiciona a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={() => handleAddPlayer(newPlayerName)}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={() => handleAddPlayer(newPlayerName)} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={() => handleRemoveGroup(group)}
      />
    </Container>
  );
}
