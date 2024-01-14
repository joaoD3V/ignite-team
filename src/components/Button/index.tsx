import { TouchableOpacityProps } from 'react-native';
import { ButtonTypeStyleProps, Container, Title } from './styles';

type ButtonProps = {
  title: string;
  type?: ButtonTypeStyleProps;
} & TouchableOpacityProps;

export function Button({ title, type = 'PRIMARY', ...props }: ButtonProps) {
  return (
    <Container type={type} {...props}>
      <Title>{title}</Title>
    </Container>
  );
}
