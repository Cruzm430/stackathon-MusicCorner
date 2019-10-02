const conn = require('./conn');
const {Sequelize} = conn;
const {UUID, UUIDV4, STRING, DECIMAL} = Sequelize

const School = conn.define('school', {
  id:{
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name:{
    type:STRING,
    primaryKey: true
  }
})

const Student = conn.define('student',{
  id:{
    type:UUID,
    primaryKey:true,
    defaultValue:UUIDV4
  },
  firstName:{
    type: STRING,
    primaryKey:true,
    allowNull:false
  },
  lastName:{
    type: STRING,
    primaryKey:true,
    allowNull:false
  },
  email:{
    type: STRING,
    primaryKey:true,
    isEmail: true
  },
  GPA:{
    type: DECIMAL,
    allowNull:false
  }
})

module.exports ={Student, School}