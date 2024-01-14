import { TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

type FilterProps = {
  title: string;
  isActive?: boolean;
} & TouchableOpacityProps;

export function Filter({ title, isActive = false, ...props }: FilterProps) {
  return (
    <Container isActive={isActive} {...props}>
      <Title>{title}</Title>
    </Container>
  );
}
