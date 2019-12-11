import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  Button,
  Header,
  Body,
  Title,
  Left,
  Right,
  Icon,
  ListItem,
  Text,
} from 'native-base';
import styles from './styles/ToDoListScreenStyles';
import {addTodo, deleteTodo, updateTodo} from '../redux/actions';
import Actions from '../redxu-sauce/TodoRedux';
import DialogInput from 'react-native-dialog-input';

class ToDoListScreen extends Component {
  state = {
    isDialogVisible: false,
    selectedItem: null,
  };

  onAddPress = () => {
    this.showDialog(true);
  };

  renderHeader() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.left} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{'To Do'}</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.onAddPress}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
    );
  }

  showDialog(visible) {
    this.setState({isDialogVisible: visible});
  }

  sendInput(text) {
    if (text.trim() !== '') {
      const {todoList} = this.props;
      if (this.state.selectedItem) {
        this.props.updateTodo({...this.state.selectedItem, title: text});
        this.setState({selectedItem: null});
      } else {
        this.props.addTodo({
          id: todoList[todoList.length - 1].id + 1,
          title: text,
        });
      }
      this.showDialog(false);
    }
  }
  deleteTodo(item) {
    this.props.deleteTodo(item);
  }
  editTodo(item) {
    this.setState({selectedItem: item}, () => {
      this.showDialog(true);
    });
  }

  renderDialog() {
    return (
      <DialogInput
        isDialogVisible={this.state.isDialogVisible}
        title={'Add a To Do'}
        message={'Enter description'}
        initValueTextInput={this.state.selectedItem?.title || ''}
        hintInput={'To do'}
        submitText={'Add'}
        modalStyle={styles.dialog}
        submitInput={inputText => {
          this.sendInput(inputText);
        }}
        closeDialog={() => {
          this.showDialog(false);
        }}
      />
    );
  }

  todoListItem = ({item}) => {
    return (
      <ListItem>
        <Body>
          <Text>{item.title}</Text>
        </Body>
        <Right>
          <View style={styles.listContainer}>
            <Button transparent onPress={() => this.deleteTodo(item)}>
              <Icon type="FontAwesome" name="trash" />
            </Button>
            <Button transparent onPress={() => this.editTodo(item)}>
              <Icon type="FontAwesome" name="edit" />
            </Button>
          </View>
        </Right>
      </ListItem>
    );
  };

  renderTodoList() {
    const {todoList} = this.props;
    return (
      <FlatList
        data={todoList}
        keyExtractor={item => item.id}
        renderItem={this.todoListItem}
      />
    );
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        <View style={styles.container}>{}</View>
        {this.renderTodoList()}
        {this.renderDialog()}
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  todoList: ownProps.navigation.getParam('useSauce')
    ? state.reduxSauceReducer.todoList
    : state.reduxReducer.todoList,
});
const mapDispatchToProps = (dispatch, ownProps) => {
  const useSauce = ownProps.navigation.getParam('useSauce');
  return {
    addTodo: todo =>
      dispatch(useSauce ? Actions.addTodoSauce(todo) : addTodo(todo)),
    deleteTodo: todo =>
      dispatch(useSauce ? Actions.deleteTodoSauce(todo) : deleteTodo(todo)),
    updateTodo: todo =>
      dispatch(useSauce ? Actions.updateTodoSauce(todo) : updateTodo(todo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoListScreen);
