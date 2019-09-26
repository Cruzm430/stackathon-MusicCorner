import React, {Component} from 'react';
import {actions} from '../store';
import {connect} from 'react-redux';


const School = ({students, schools, id, destroyStudent}) =>{
  const schoolIds = schools.map(school=>school.id)
  const schoolNames = schools.map(school=>school.name)
  const school = schools.find(school=>id === school.id)
  const schoolIdx = schoolIds.indexOf(id)
  const studentFilter = (bool) =>{
    if(bool){
      return students.filter(student=>student.schoolId === school.id)
    }
    else{
      return students.filter(student=>student.schoolId !== school.id)
    }
  }
  return(
          <div>
            {
              schoolNames[schoolIdx]
            }
          <div>

          <select>
          <option>--Enroll Student--</option>
            {
              studentFilter(false).map(student=><option key={student.id} id='student'>{student.firstName} {student.lastName}</option>)
            }
          </select>
          {
            studentFilter(true).map(student=>
            <div key={student.id} id='student'>
            {student.firstName} {student.lastName} <br/>
            GPA: {student.GPA}
            <br/>
            <button onClick={()=> destroyStudent(student)}>
            Remove Student
            </button>
            </div>)
          }
          </div>
          </div>
        )
}

const mapStateToProps = (state, props)=> {
  const {students, schools} = state
  return{
    id:props.match.params.id,
    students:students,
    schools:schools
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    destroyStudent:(student) => dispatch(actions.destroyStudent(student)),
    updateStudent: (student) =>dispatch(actions.updateStudent({...student, schoolId}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (School)

// export default connect(mapStateToProps)(School)

// class School extends Component{
//   render(){
//     const {id} = this.props.match.params
//     const {schools, students} = this.props

//     const school = schools.find(_school => _school.id === id)
    
//     return(
//       <div >
//       {
//         `${school.name} (-- Students Enrolled)`
//       }
//       <select>
//       </select>
//       <div>
//       {
//         students.map(student=><div key={student.id} id='student'>{student.firstName} {student.lastName}</div>)
//       }
//       </div>
//       </div>
//     )
//   }
// }