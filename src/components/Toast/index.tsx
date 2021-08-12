import Toast from 'react-native-root-toast';
import { Platform } from 'react-native';

const ToastCom = ({
  message = '',
  position = 'CENTER',
  shadow = true,
  animation = true,
  hideOnPress = true,
  delay = 0,
  duration = Toast.durations.SHORT,
  ...rest
} = {}) => {
  if (Platform.OS === 'web') {
    return alert(message);
  }
  return Toast.show(message, {
    position: Toast.positions[position.toLocaleUpperCase()],
    duration,
    shadow,
    animation,
    hideOnPress,
    delay,
    ...rest,
  });
};

export default ToastCom;
