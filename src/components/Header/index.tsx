import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import {
  Header as HeaderEle,
  HeaderProps,
  SearchBar,
  SearchBarProps,
  Icon,
} from 'react-native-elements';
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';
import { LeftBackBtn } from './LeftBackBtn';
import Toast from '../Toast';
import { useMyTheme } from '../../hooks';

export const Header = (
  props: Partial<
    HeaderProps & { leftBtnColor: string; leftBtnOnPress(): any; isShowLeftBtn: boolean }
  >,
) => {
  const { dark } = useTheme();
  const { colors } = useMyTheme(dark);
  const {
    leftComponent = null,
    leftBtnColor = colors.background,
    leftBtnOnPress,
    isShowLeftBtn = true,
    ...rest
  } = props;

  const _leftComponent = leftComponent || (
    <LeftBackBtn color={leftBtnColor} onPress={leftBtnOnPress} />
  );

  return (
    <HeaderEle
      leftComponent={isShowLeftBtn ? _leftComponent : null}
      leftContainerStyle={{
        justifyContent: 'center',
      }}
      centerContainerStyle={{
        justifyContent: 'center',
      }}
      {...rest}
    />
  );
};

type HeaderSearchProps = HeaderProps &
  SearchBarProps & {
    onSearchSubmit(v: string): any;
    onSearchChange(v: string): any;
    isFocused: boolean;
    leftBtnOnPress(): any;
  };

export const HeaderSearchBar = (props: Partial<HeaderSearchProps>) => {
  const { dark } = useTheme();
  const { colors, sizes } = useMyTheme(dark);
  const navigation = useNavigation();
  const searchRef = React.useRef(null);
  const [searchKey, setSearchKey] = React.useState<string>('');

  const {
    onSearchSubmit,
    onSearchChange,
    placeholder = '关键词',
    isFocused = false,
    leftBtnOnPress,
    ...rest
  } = props;

  const _keyboardDidShow = React.useCallback(() => {}, []);
  const _keyboardDidHide = React.useCallback(() => {}, []);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    if (isFocused) {
      setTimeout(() => {
        searchRef?.current?.focus();
      }, 0);
    }
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  React.useEffect(() => {
    onSearchChange(searchKey);
  }, [searchKey]);

  const SafeSearchBar = SearchBar as unknown as React.FC<Partial<SearchBarBaseProps>>;

  const renderCenterComponent = () => {
    return (
      <SafeSearchBar
        ref={searchRef}
        placeholder={placeholder}
        onChangeText={setSearchKey}
        value={searchKey}
        inputContainerStyle={[
          styles.inputContainerStyle,
          {
            backgroundColor: colors.background,
          },
        ]}
        containerStyle={styles.searchBarContainerStyle}
        inputStyle={{ fontSize: 16, padding: 0 }}
        searchIcon={
          <Icon type={'antdesign'} name="search1" size={sizes.fontSize16} color={'#999'} />
        }
        {...rest}
      />
    );
  };

  const _onSearchSubmit = React.useCallback((v: string) => onSearchSubmit(searchKey), [searchKey]);

  const renderRightComponent = () => {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!searchKey) {
              Toast({ message: '请输入要查询的关键词' });
              return;
            }
            _onSearchSubmit(searchKey);
          }}>
          <Text style={{ fontSize: sizes.fontSize16, color: colors.background }}>搜索</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <Header
      leftBtnOnPress={
        leftBtnOnPress
          ? leftBtnOnPress
          : () => {
              Keyboard.dismiss();
              setTimeout(() => {
                navigation.goBack();
              }, 100);
            }
      }
      centerComponent={renderCenterComponent()}
      rightComponent={renderRightComponent()}
      leftContainerStyle={{ justifyContent: 'center' }}
      rightContainerStyle={{
        justifyContent: 'center',
      }}
    />
  );
};

export const styles = StyleSheet.create({
  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    padding: 0,
    width: '125%',
  },
  inputContainerStyle: {
    borderRadius: 5,
    height: 35,
  },
});
