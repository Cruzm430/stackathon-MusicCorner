import React, {Component} from 'react';
import {actions} from '../store';
import { connect } from 'react-redux';


class Students extends Component{ //= ({students, schools, destroyStudent, updateStudent})=>{
  constructor(){
    super();
    this.onChange = this.onChange.bind(this)
  }
  onChange(student, schoolId){

    this.props.updateStudent(student, schoolId)
  }
  render(){
    const {students, schools, destroyStudent} = this.props
    return(
      <div>
        {
          students.map(student=>
          <div id='student' key={student.id}>
          {student.firstName} {student.lastName}
          <br/>
          <button onClick={()=> destroyStudent(student)}>
            Remove Student
          </button>
          <br/>
          Enroll student in
          <select onChange={(ev)=>this.onChange(student, ev.target.value)}>     
            <option>--Schools--</option>
            {schools.map(school=><option key={school.id} value={school.id}>
            {school.name}
            </option>)}
          </select>
          </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({schools , students}) => ({schools, students})
const mapDispatchToProps = (dispatch) =>{
  return{
    destroyStudent:(student) => dispatch(actions.destroyStudent(student)),
    updateStudent: (student, schoolId) =>dispatch(actions.updateStudent({...student, schoolId}))
  }
}


export default connect(mapStateToProps,mapDispatchToProps) (Students)

// const Students = ({students, schools, destroyStudent})=>{
//   console.log(schools)
//   return(
//     <ul>
//     {
//       students.map(student=> 
//       <li key={student.id}>
//       {student.firstName} {student.lastName}
//       <button onClick={()=>destroyStudent(student)}>
//         Remove Student
//       </button>
//       <label>
//         Enroll Student at:
//       </label>
//       <select>
//       {
//         schools.map(school=><option key={school.id}>{school.name}</option>)
//       }
//       </select>
//       </li>)
//     }
//     </ul>
//   )
// }

// const mapStateToProps = ({schools, students}) => ({schools,students})

// const mapDispatchToProps = (dispatch) =>{
//   return{
//     destroyStudent:(student) => dispatch(actions.destroyStudent(student)),
//     // updateStudent: (student) =>dispatch(actions.updateStudent({...student, enrolled:}))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Students)

//class Students extends Component{
  //   constructor(){
  //     super();
  //     this.state ={
  //       schoolId: ''
  //     }
  //     this.onChange = this.onChange.bind(this)
  //     this.handleSubmit = this.handleSubmit.bind(this)
  //   }
  //   onChange(ev){
  //     let value = ev.target.value
  //       const schoolObj = this.props.schools.find(school=> school.name === ev.target.value)
  //       const id = schoolObj.id
  //       this.props.updateStudent({...student, schoolId:id})
  //       this.setState({schoolId:id})
  //   }
  //   handleSubmit(student){
  //     let value = this.state
  //     this.props.updateStudent({schoolId: value})
  //     console.log(this.props.students)
  //   }
  //   render(){
  //     const {onChange, handleSubmit} = this
  //    return(
  //     <div>
  //     {
  //       this.props.students.map(student=> 
  //       <div id='student' key={student.id}>
  //         <ul id='student-info'>
  //           <li id='student-info'>
  //       {student.firstName} {student.lastName} 
  //       </li>
  //       <li id='student-info'>GPA: {student.GPA}
  //       </li>
  //       <button onClick={()=>this.props.destroyStudent(student)}>
  //         Remove Student
  //       </button>
  //       <li>
  //         Enroll Student at:
  //       <select>
  //       {
  //         this.props.schools.map(school=><option key={school.id} onSubmit={()=>handleSubmit(student)}>{school.name}</option>)
  //       }
  //       </select>
  //       </li>
  //       </ul>
  //       </div>)
  //     }
  //     </div>
  //   )
  //   }
  // }