import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text, Header, Body, Title} from 'native-base';
import styles from './styles/SelectionScreenStyles';

class SelectionScreen extends Component {
  renderHeader() {
    return (
      <Header>
        <Body>
          <Title>{'Select type'}</Title>
        </Body>
      </Header>
    );
  }

  onButtonsPress(useSauce) {
    this.props.navigation.navigate('ToDoListScreen', {useSauce});
  }

  renderButtons() {
    const {button, buttonContainer} = styles;
    return (
      <View style={buttonContainer}>
        <Button style={button} onPress={() => this.onButtonsPress(false)}>
          <Text>Redux</Text>
        </Button>
        <Button style={button} onPress={() => this.onButtonsPress(true)}>
          <Text>Rexux Sauce</Text>
        </Button>
      </View>
    );
  }
  render() {
    return (
      <>
        {this.renderHeader()}
        <View style={styles.container}>{this.renderButtons()}</View>
      </>
    );
  }
}

export default SelectionScreen;
