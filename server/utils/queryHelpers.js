const getConnection = require("./db");

const addEmployee = async (name, last_name, email, education, about, location, dob) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO EMPLOYEE (name,last_name,email,education,about,location,dob) values (?,?,?,?,?,?,?)",
    [name,last_name,email,education,about,location,dob]
  );
};

const getAllEmployees = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select e.id,e.last_name,e.name,e.email,e.education,e.about,e.location,e.dob from employee e  order by e.id"
  );
};

const getEmployee = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select e.id,e.last_name,e.name,e.email,e.education,e.about,e.location,e.dob from employee e where e.id=?",
    [id]
  );
};

const updateAddress = async (id, name, last_name, email, education, about, location, dob) => {
  //console.log('dbside value :',id,' - ',name,' - ',address);
  const connection = await getConnection();
  return connection.execute("update employee set about=?,education=?,email=?,name=?,last_name=?,location=?,dob=? where id=?", [
    about,
    education,
    email,
    name,    
    last_name,
    location,
    dob,
    id,
  ]);
};

const deleteEmployee = async (id) => {
  const connection = await getConnection();
  return connection.execute("delete from employee where id=?", [id]);
};



module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployee,
  updateAddress,
  deleteEmployee,  
};
