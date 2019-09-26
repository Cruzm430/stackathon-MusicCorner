import React from 'react';
import { connect } from 'react-redux';

const Home = ({students, schools, popularNum, popularSchoolIdx, gpaIdx, highestGPA}) =>{
  const schoolNames = schools.map(school=> school.name)
  const schoolIds = schools.map(school=>school.id)


  return (
    <div>
      <h1>Home</h1>
      <div>
        Our most popular school is {schoolNames[popularSchoolIdx]} with {popularNum} students
      </div>
      <div>
        Our top performing school is {schoolNames[gpaIdx]} with an average GPA of {highestGPA}
      </div>
    </div>
  )
}

const mapStateToProps = (state) =>{
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
    gpaIdx:gpaIdx,
    highestGPA:highestGPA
  }
}

export default connect(mapStateToProps)(Home)