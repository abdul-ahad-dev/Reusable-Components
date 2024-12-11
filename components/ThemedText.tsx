import { RootState } from '@/store/store';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export type ThemedTextProps = TextProps & {
  color?: string;
  align?: 'left' | 'auto' | 'center' | 'right' | 'justify' | undefined;
  type?: 'small' | 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  color = "#fff",
  align = 'left',
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <Text
      style={[
        color && { color: theme === "light" ? "#000" : color },
        type === 'small' ? styles.small : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        align && { textAlign: align },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
