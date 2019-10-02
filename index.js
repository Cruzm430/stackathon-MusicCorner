const conn = require('./conn')

const {Student, School} = require('./models')

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async()=>{
  await conn.sync({force:true})
  const schools =[
    {name:'Baruch'},
    {name:'Hunter'},
    {name:'City'}
  ]

  const students =[
    {firstName: 'marp', lastName: 'arp', email:'abc@123.com', GPA:1.2, schoolId:"449d3fa4-5542-4593-a694-c469df1d4fce"},
    {firstName: 'merk', lastName: 'mrp', email:'abd@123.com', GPA:1.3},
    {firstName: 'marl', lastName: 'arl', email:'abg@123.com', GPA:1.4}
  ]

  const [Baruch, Hunter, City] = await Promise.all(schools.map(school=>School.create(school)))
  const [marp,merk,marl] = await Promise.all(students.map(student=>Student.create(student)))

  return [Baruch, Hunter, City], [marp,merk,marl]
}

module.exports={
  syncAndSeed,
  models:{
    School,
    Student
  }
}