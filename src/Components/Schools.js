import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {actions} from '../store';
import { updateStudent, destroyStudent } from '../store/actions';

const Schools = ({students, schools, update})=>{
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
          <select>
            <option>--Enroll Student--</option>
            {
              students.filter(student=>school.id !== student.schoolId).map(student=><option key={student.id} onChange={update} value={`${school.id}`}>{student.firstName} {student.lastName}</option>)
            }
          </select>
        </div>
      )
    }
    </div>
  )
}

const mapStateToProps = ({schools,students})=> ({schools,students})

const mapDispatchToProps = (dispatch) =>{
  return{
    update:(student) => dispatch(actions.updateStudent(...student, schoolId))
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