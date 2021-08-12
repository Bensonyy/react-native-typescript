import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { NavPropsBase } from '../../types';

type Props = NavPropsBase & {
  onPress: () => void;
  color: string;
  style: object;
  size: number;
};

export const LeftBackBtn = (props: Partial<Props>) => {
  const navigation = useNavigation();
  const { onPress = navigation?.goBack, color = '#fff', size = 24, style = {} } = props;
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={[
          {
            paddingRight: 5,
          },
          style,
        ]}>
        <Icon type={'entypo'} name="chevron-thin-left" size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};
