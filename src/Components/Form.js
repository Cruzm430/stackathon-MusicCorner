import React, {Component} from 'react';
import {actions} from '../store';
import {connect} from 'react-redux';


class Form extends Component{
  constructor(){
    super();
    this.state ={
      firstName: '',
      lastName: '',
      email: '',
      GPA: '',
      schoolId: '',
      schoolName:'',
      error: ''
    }
    this.onCreate = this.onCreate.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onCreate(ev){
    const {firstName, lastName, email, GPA, schoolId} = this.state;
    if(schoolId){
      this.props.createStudent({ firstName, lastName, email, GPA, schoolId})
      .then(()=>this.setState({firstName:'', lastName:'',email:'', GPA:'',schoolId:'',schoolName:''}))
      .catch(ex => {
        this.setState({error:ex.response.data})
      })
    }
    else{
      this.props.createStudent({ firstName, lastName, email, GPA})
      .then(()=>this.setState({firstName:'', lastName:'',email:'', GPA:'',schoolId:'', schoolName:''}))
      .catch(ex => {
        this.setState({error:ex.response.data})
      })
    }
  }
  onChange(ev){
    let value = ev.target.value;
    this.setState({[ev.target.name]: value})
    const schoolNames = this.props.schools.map(school=>school.name)
    if(schoolNames.includes(value)){
      const schoolObj = this.props.schools.find(school=> school.name === value)
      const id = schoolObj.id
      this.setState({schoolId:id, schoolName:schoolObj.name})
    }
  }
  render(){
    const {firstName, lastName, email, GPA, schoolId, schoolName, error} = this.state;
    const {onChange, onCreate} = this
    const {schools} = this.props
    return(
      <div className='form'>
        <div> First Name:
          <input name='firstName' onChange={onChange} value={firstName} type="text"/>
          </div>
        <div> Last Name:
          <input type="text" name='lastName' onChange={onChange} value={lastName}/>
          </div>
        <div> Email:
        <input type="text" name='email' onChange={onChange} value={email}/>
        </div>
        <div> GPA:
          <input type="text" name='GPA' onChange={onChange} value={GPA}/>
          </div>
        <div>Enroll at:
          <select name='schoolName' onChange={onChange} value={schoolName}>
            <option>--Not Enrolled--</option>
            {
              schools.map(school=><option key={school.id}>{school.name}</option>)
            }
          </select>

        </div>
        <button onClick={onCreate}>Save</button>
        { error ? <div className='error'>{ error }</div> : "" }
      </div>
    )
  }
}

const mapStateToProps = ({schools , students}) => ({schools, students})
const mapDispatchToProps = (dispatch) =>{
  return{
    createStudent:(student) => dispatch(actions.createStudent(student))
  }
}


export default connect(mapStateToProps,mapDispatchToProps) (Form)

{/* <select name='schoolId' value={schoolId} onChange={onChange}>
          <option>--Enroll Student--</option>
            {
              schools.map(school=><option key={school.id}>{school.name}</option>)
            }
          </select>
          </div> */}
// class Form extends Component{
//   constructor(){
//     super()
//     this.state={
//       firstName: '',
//       lastName: '',
//       email: '',
//       GPA: '',
//       enrolled: ''
//     }
//     this.onChange = this.onChange.bind(this)
//     this.onCreate = this.onCreate.bind(this)
//   }
//   onChange(ev){
//     let value = ev.target.value
//     this.setState({[ev.target.name]:value})
//   }
//   async onCreate(ev){
//     const student = this.state
//     console.log(student)
//     await axios.post('/api/students', student)
//     console.log(await(axios.get('/api/students')).data)
//   }
//   render(){
//     const {firstName, lastName, email, GPA, enrolled} = this.state
//     const {onChange, onCreate} = this
//     return(
//       <div>
//         <label> First Name
//           <input name='firstName' onChange={onChange} value={firstName} type="text"/>
//         </label>
//         <label> Last Name
//           <input type="text" name='lastName' onChange={onChange} value={lastName}/>
//         </label>
//         <label> Email
//           <input type="text" name='email' onChange={onChange} value={email}/>
//         </label>
//         <label> GPA
//           <input type="text" name='GPA' onChange={onChange} value={GPA}/>
//         </label>
//         <label>Enroll at
//           <select name='enrolled' onChange={onChange} value={enrolled}>
//             {
//               this.props.schools.map(school=><option key={school.id}>{school.name}</option>)
//             }
//           </select>
//         </label>
//         <button onClick={onCreate}>Save</button>
//       </div>
//     )
//   }
// }