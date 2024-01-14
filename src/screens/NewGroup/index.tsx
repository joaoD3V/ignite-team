import { Header } from '@/components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@/components/Highlight';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { Input } from '@/components/Input';
import { useNavigation } from '@react-navigation/native';
import { createNewGroup } from '@/storage/group/createNewGroup';
import { AppError } from '@/utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNewGroup(group: string) {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informe o nome da turma.');
      }

      await createNewGroup(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message);
      } else {
        Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo.');
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={() => handleNewGroup(group)}
        />
      </Content>
    </Container>
  );
}
