import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '@/components/Header';
import { Container } from './styles';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/GroupCard';
import { ListEmpty } from '@/components/ListEmpty';
import { Button } from '@/components/Button';
import { getGroups } from '@/storage/group/getGroups';
import { Loading } from '@/components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fecthGroups();
    }, [])
  );

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fecthGroups() {
    try {
      setIsLoading(true);
      const data = await getGroups();
      setGroups(data);
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
