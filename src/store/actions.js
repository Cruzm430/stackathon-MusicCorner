import {Set_Schools, Set_Students, Destroy_Student, Update_Student, Create_Student} from './consts';
import axios from 'axios';

const setSchools = (schools)=>{
  return{
    schools,
    type: Set_Schools
  }
}

const setStudents = (students) =>{
  return{
    students,
    type:Set_Students
  }
}

const _destroyStudent = (student) =>{
  return{
    type:Destroy_Student,
    student
  }
}

const _createStudent = (student) =>{
  return{
    type:Create_Student,
    student
  }
}

const _updateStudent = (student) =>{
  return{
    type:Update_Student,
    student
  }
}

const getSchools  = () =>{
  return async(dispatch)=>{
    const schools = (await axios.get('/api/schools')).data;
    return dispatch(setSchools(schools))
  }
}

const getStudents = () =>{
  return async(dispatch)=>{
    const students = (await axios.get('/api/students')).data
    return dispatch(setStudents(students))
  }
}

const destroyStudent = (student) =>{
  return async(dispatch)=>{
    await axios.delete(`/api/students/${student.id}`)
    return dispatch(_destroyStudent(student))
  }
}

const updateStudent = (student) =>{
  return async(dispatch)=>{
    console.log(student)
    await axios.put(`/api/students/${student.id}`, student)
    return dispatch(_updateStudent(student))
  }
}

const createStudent = (student) =>{
  return async(dispatch)=>{
    try{
      const created = (await axios.post('/api/students', student)).data
      return dispatch(_createStudent(created))
    }
    catch(ex){
      throw ex
    }
  }
}

export {
  getSchools,
  getStudents,
  destroyStudent,
  updateStudent,
  createStudent
}