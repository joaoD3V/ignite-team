import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from './styles';

type GroupCardsProps = {
  title: string;
} & TouchableOpacityProps;

export function GroupCard({ title, ...props }: GroupCardsProps) {
  return (
    <Container {...props}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
