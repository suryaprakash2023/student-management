const express = require("express");
const {
  addEmployee,
  getAllEmployees,
  getEmployee,
  updateAddress,
  deleteEmployee,
  getAllDepartments,
} = require("./utils/queryHelpers");
const app = express();
const cors = require("cors");

const PORT = 8001;

const genericError = "Sorry, something went wrong!";

app.use(express.json());

const whitelist = ["http://localhost:3000"]; //Change to the port in which react app is running
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", async function (request, response) {
  try {
    const [result] = await getAllEmployees();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/:id", async function (request, response) {
  // console.log('query param :', request.query); //http://localhost:8001/2?address=chennai&name=surya
  const { id } = request.params; //http://localhost:8001/2
  try {
    const [result] = await getEmployee(id);
    if (result.length > 0) {
      response.send({ success: true, result: result[0] });
    } else {
      response.status(404).send({
        success: false,
        error: `No employee found with id ${id}`,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.post("/", async function (request, response) {
  try {
    //console.log('request.body :',request.body);    
    const { name, last_name, email, education, about, location, dob } = request.body;
    const [result] = await addEmployee( name, last_name, email, education, about, location, dob );
    if (result.insertId) {
      const [data] = await getEmployee(result.insertId);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/:id", async function (request, response) {
  try {
    //console.log('body value :',request.body.name,' - ',request.body.address);    
    let name  = request.body.name;
    let last_name = request.body.last_name;
    let email = request.body.email;
    let education = request.body.education;
    let about = request.body.about;
    let location = request.body.location;
    let dob = request.body.dob;

    const { id } = request.params;
    //console.log('const value : ',id,' - ',name,' - ',address);
    const [result] = await updateAddress(id, name, last_name, email, education, about, location, dob);
    if (result.affectedRows > 0) {
      const [data] = await getEmployee(id);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.delete("/:id", async function (request, response) {
  try {
    const { id } = request.params;
    const [result] = await deleteEmployee(id);
    if (result.affectedRows > 0) {
      response.send({ success: true });
    } else {
      response.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

//app.listen(8001);
app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
}); 