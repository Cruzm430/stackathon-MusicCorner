import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = ({students, schools, popularSchoolIdx, popularNum, gpaIdx, sortedStudents, location:{pathname}})=>{ 
  const schoolNames = schools.map(school=> school.name)
  const schoolIds = schools.map(school=>school.id)
  const checker = sortedStudents().map(arr=>arr.length).reduce((accum,item)=>accum+item,0)
  console.log(checker)
  return(
          <nav>
            <Link to='/home'>Acme Schools</Link>
            <Link to='/schools'  className={ pathname === '/schools' ? 'active': ''}>Schools({schools.length})</Link>
            <Link to='/students'  className={ pathname === '/students' ? 'active': ''}>Students({students.length})</Link>
            <Link to={!popularSchoolIdx && !checker ? '': `/schools/${schoolIds[popularSchoolIdx]}`}  className={ pathname === `/schools/${schoolIds[popularSchoolIdx]}` ? 'active': ''}>Most Popular {!popularSchoolIdx && !checker ? '' : schoolNames[popularSchoolIdx]} ({popularNum})</Link> 
            <Link to={ !gpaIdx && !checker ? '' : `/schools/${schoolIds[gpaIdx]}`}  className={ pathname === `/schools/${schoolIds[gpaIdx]}` ? 'active': ''}>Top School ({!gpaIdx && !checker ? '' : schoolNames[gpaIdx]})</Link>
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
      reducedNum = reducedNum/school.length
      return reducedNum.toFixed(2)
    }
    else{
      return 0
    }
  })

  const GPAs = averageGpa.map(val => val? val*1 : [])
  const highestGPA=averageGpa.sort()[averageGpa.length-1]
  const gpaIdx = GPAs.indexOf(highestGPA*1)

  return {
    students,
    popularNum,
    popularSchoolIdx,
    schools,
    gpaIdx,
    sortedStudents
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

