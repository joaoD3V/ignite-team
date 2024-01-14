import { RefObject } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { Container } from './styles';
import { useTheme } from 'styled-components/native';

type InputProps = {
  inputRef?: RefObject<TextInput> | null;
} & TextInputProps;

export function Input({ inputRef, ...props }: InputProps) {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...props}
    />
  );
}
