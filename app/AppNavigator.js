import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SelectionScreen from './containers/SelectionScreen';
import ToDoListScreen from './containers/ToDoListScreen';

const AppNavigator = createStackNavigator(
  {
    SelectionScreen,
    ToDoListScreen,
  },
  {
    headerMode: 'none',
  },
);
export default createAppContainer(AppNavigator);
