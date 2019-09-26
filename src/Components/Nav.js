import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = ({students, schools, popularSchoolIdx, popularNum, gpaIdx, location:{pathname}})=>{ 
  const schoolNames = schools.map(school=> school.name)
  const schoolIds = schools.map(school=>school.id)

  return(
          <nav>
            <Link to='/home'  >Acme Schools</Link> 
            <Link to='/schools'  className={ pathname === '/schools' ? 'active': ''}>Schools({schools.length})</Link> 
            <Link to='/students'  className={ pathname === '/students' ? 'active': ''}>Students({students.length})</Link> 
            <Link to={`/schools/${schoolIds[popularSchoolIdx]}`}  className={ pathname === `/schools/${schoolIds[popularSchoolIdx]}` ? 'active': ''}>Most Popular {schoolNames[popularSchoolIdx]} ({popularNum})</Link> 
            <Link to={`/schools/${schoolIds[gpaIdx]}`}  className={ pathname === `/schools/${schoolIds[gpaIdx]}` ? 'active': ''}>Top School ({schoolNames[gpaIdx]})</Link> 
          </nav>
  )
}

const mapStateToProps = (state) => {
  const {students, schools} = state
  function sortedStudents(){
    const schoolsArr = schools.map(school=> school.id)
    const sort = schoolsArr.map(school=>students.filter(student=>student.schoolId === school))
    return sort
  }

  const popularNum = sortedStudents().map(arr=>arr.length).sort()[sortedStudents().length-1]
  const popularSchoolIdx = sortedStudents().map(arr=>arr.length).indexOf(popularNum)

  const gpas = sortedStudents().map(school=>school.map(student=>student.GPA *1))
  const averageGpa = gpas.map(school=>{
    if(school.length > 0){
      let reducedNum = school.reduce((accum,student)=> student += accum)
      reducedNum = reducedNum/2
      return reducedNum.toFixed(2)
    }
    else{
      return []
    }
  })

  const GPAs = averageGpa.map(val => val? val*1 : [])
  const highestGPA=averageGpa.sort()[averageGpa.length-1]
  const gpaIdx = GPAs.indexOf(highestGPA*1)

  return {
    students:students,
    popularNum:popularNum,
    popularSchoolIdx:popularSchoolIdx,
    schools:schools,
    gpaIdx:gpaIdx
  }
}

export default connect(mapStateToProps)(Nav)

// class Nav extends Component{
//   render(){
//     return(
//       <nav>
//         <Link to='/'>Acme Schools</Link> 
//         <Link to='/schools'>Schools(-)</Link> 
//         <Link to='/students'>Students(-)</Link> 
//         <Link to='/mostPopular'>Most Popular -(-)</Link> 
//         <Link to='/topSchool'>Top School -(-)</Link> 
//       </nav>
//     )
//   }
// }

