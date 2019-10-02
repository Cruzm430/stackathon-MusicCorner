import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {actions} from '../store';

class Schools extends Component{
  constructor(){
    super()
    this.onChange = this.onChange.bind(this)
  }
  onChange(student, schoolId){
    const studentName = student.split(' ')[0]
    const studentObj = this.props.students.find(student=> studentName === student.firstName)
    this.props.updateStudent(studentObj, schoolId)
  }
  render(){
    const {students, schools} = this.props
  return(
    <div>
    {
      schools.map(school=> 
        <div id='schools' key={school.id} >
          <Link to={`/schools/${school.id}`}>
          {school.name}
          </Link>
          <p>
            Student Count:
            {
              students.filter(student=>school.id === student.schoolId).length
            }
          </p>
          <select onChange={(ev) => this.onChange(ev.target.value, school.id)}>
            <option>--Enroll Student--</option>
            {
              students.filter(student=>school.id !== student.schoolId).map(student=><option key={student.id}>{student.firstName} {student.lastName}</option>)
            }
          </select>
        </div>
      )
    }
    </div>
  )
}
}

const mapStateToProps = ({schools,students})=> ({schools,students})

const mapDispatchToProps = (dispatch) =>{
  return{
    updateStudent: (student, schoolId) =>dispatch(actions.updateStudent({...student, schoolId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools)

// const Schools = ({students, schools})=>{
//   return(
//     <ul>
//     {
//       schools.map(school=> <li key={school.id}>{school.name}</li>)
//     }
//     </ul>
//   )
// }

// export default Schools