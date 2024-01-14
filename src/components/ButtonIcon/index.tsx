import { TouchableOpacityProps } from 'react-native';
import { ButtonIconTypeStyledProps, Container, Icon } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

type ButtonIconProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyledProps;
} & TouchableOpacityProps;

export function ButtonIcon({
  icon,
  type = 'PRIMARY',
  ...props
}: ButtonIconProps) {
  return (
    <Container {...props}>
      <Icon name={icon} type={type} />
    </Container>
  );
}
