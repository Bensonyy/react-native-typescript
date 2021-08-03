import * as React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { primary } from '../../config/theme';

type Props = {};

// const Loading = (props: Props) => {};

export default class Loading extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['float', 'absolute']).isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    type: 'float',
    backgroundColor: 'transparent',
  };

  render() {
    const { type, title, color = primary, backgroundColor, loadingContainerStyle } = this.props;

    return (
      <View
        style={[
          type === 'float' ? styles.root : styles.absolute,
          { backgroundColor },
          loadingContainerStyle,
        ]}>
        <ActivityIndicator size="large" color={color} />
        {title ? (
          <View style={styles.titleBox}>
            <Text style={styles.title}>{title}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
});
