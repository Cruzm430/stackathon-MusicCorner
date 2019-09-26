import {combineReducers} from 'redux';
import {Set_Schools, Set_Students, Destroy_Student, Update_Student, Create_Student} from './consts';

const schoolsReducer = (state = [], action)=>{
  if(action.type === Set_Schools){
    return action.schools
  }
  return state
}

const studentsReducer = (state = [], action)=>{
  switch(action.type){
    case Set_Students:
      return action.students;
      break;
    case Destroy_Student:
      return state.filter(student => student.id !== action.student.id);
      break;
    case Update_Student:
      return state.map(_student=> _student.id === action.student.id ? action.student : _student)
      break;
    case Create_Student:
      return [...state, action.student];
      break;
  }
  return state
}

const reducer = combineReducers({
  schools: schoolsReducer,
  students: studentsReducer
})

export default reducer