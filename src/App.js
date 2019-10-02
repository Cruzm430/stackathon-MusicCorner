import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {actions} from './store';
import {connect} from 'react-redux';
import Nav from './Components/Nav';
import Form from './Components/Form';
import Students from './Components/Students';
import Schools from './Components/Schools';
import School from './Components/School';
import Home from './Components/Home';

class App extends Component{
  componentDidMount(){
    this.props.getSchools();
    this.props.getStudents();
  }
  render(){
    return(
      <HashRouter>
      <Route component={Nav}/> 
      <Route component={Form}/>
      <Switch>
      <Route exact path='/home' component={Home}/>
      <Route path='/students' component={Students}/>
      <Route exact path='/schools' component={Schools}/>
      <Route path='/schools/:id' component={School}/>
      <Redirect to='home'/>
      </Switch>
    </HashRouter>
    )
  }
}

const mapStateToProps = ({students, schools})=>({students, schools})

const mapDispatchToProps = (dispatch) =>{
  return {
    getSchools: () => dispatch(actions.getSchools()),
    getStudents: () => dispatch(actions.getStudents())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);


// class App extends Component{
//   async componentDidMount(){
//     await axios.get('/api/students')
//     .then(res=>this.setState({students:res.data}))
//     .catch(err=>console.log(err))
//     await axios.get('/api/schools')
//     .then(res=>this.setState({schools:res.data}))
//     .catch(err => console.log(err))
//   }
//   render(){
//     const {students, schools} = this.state
//     return(
//       <HashRouter>
//         <Route component={Nav}/> 
//         <Route render={()=> <Form students={students} schools={schools}/>}/>
//         <Switch>
//         <Route path='/students' render={()=><Students students={students} schools={schools}/>}/>
//         <Route path='/schools' render={()=><Schools students={students} schools={schools}/>}/>
//                   {/*
//         <Route component={MostPopular}/>
//         <Route component={TopSchool}/>
//                   */}
//         </Switch>
//       </HashRouter>
//     )
//   }
// }