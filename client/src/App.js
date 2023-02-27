import {
  Button,
  EditableText,
  InputGroup,
  Toaster,
  Position,
  TextArea,
} from "@blueprintjs/core";
import axios from "axios";
import { useEffect, useState } from "react";

const AppToaster = Toaster.create({
  position: Position.TOP,
});

function App() {
  const [employees, setEmployees] = useState([]);  
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newAbout, setNewAbout] = useState("");  
  const [newDob, setNewDob] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8001/").then((response) => {
      const { data } = response;
      setEmployees(data.result);
    });
   
  }, []);

  const addEmployee = () => {
    const name = newName.trim();
    const last_name = newLastName.trim();
    const location = newLocation.trim();
    const email = newEmail.trim();
    const education = newEducation.trim();
    const about = newAbout.trim();
    const dob = newDob.trim();
    if (name && last_name && email && education && about && location && dob) {
      axios
        .post("http://localhost:8001/", {
          name,
          last_name,
          location,
          email,
          education,
          about,
          dob,
        })
        .then((response) => {
          const { data } = response;
          setEmployees([...employees, data.result]);
          setNewName("");
          setNewLastName("");
          setNewLocation("");
          setNewEmail("");
          setNewEducation("");
          setNewAbout("");
          setNewDob("");
        });
    }
  };

  const onChangeHandler = (id, key, value) => {
    console.log({ id, key, value });
    setEmployees((values) => {
      return values.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

  const updateAddress = (id) => {
    console.log('id :',id);
    const data = employees.find((item) => item.id === id);
    axios.put(`http://localhost:8001/${id}`, data).then((response) => {
      AppToaster.show({
        message: "Data updated successfully",
        intent: "success",
        timeout: 3000,
      });
    });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8001/${id}`).then((response) => {
      setEmployees((values) => {
        return values.filter((item) => item.id !== id);
      });

      AppToaster.show({
        message: "Employee deleted successfully",
        intent: "success",
        timeout: 3000,
      });
    });
  };

  return (
    <div className="App">
      <table className="bp4-html-table .modifier">
      <caption align="left"><h1><b>Student Management System</b></h1></caption>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Education</th>
            <th>Email</th>
            <th>Location</th>       
            <th>About</th>            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const { id, name, last_name, location, email, education, about, dob } = employee;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>                
                <EditableText
                    value={name}
                    onChange={(value) => onChangeHandler(id, "name", value)}
                  />
                </td>
                <td>
                <EditableText
                    value={last_name}
                    onChange={(value) => onChangeHandler(id, "last_name", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={dob}                    
                    onChange={(value) => onChangeHandler(id, "dob", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={education}
                    onChange={(value) => onChangeHandler(id, "education", value)}
                  />
                </td> 
                <td>
                  <EditableText
                    value={email}
                    onChange={(value) => onChangeHandler(id, "email", value)}
                  />
                </td>                
                <td>
                <EditableText
                    value={location}
                    onChange={(value) => onChangeHandler(id, "location", value)}
                  />
                </td>                               
                <td>
                  <EditableText
                    value={about}
                    multiline={true}
                    minLines={3}
                    maxLines={12}
                    onChange={(value) => onChangeHandler(id, "about", value)}
                  />
                </td>                             
                <td id="column-width">
                  <Button intent="primary" onClick={() => updateAddress(id)}>
                    Update
                  </Button>
                  &nbsp;
                  <Button intent="danger" onClick={() => deleteEmployee(id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                placeholder="Add first name here..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </td>
            <td>
              <InputGroup
                placeholder="Add last name here..."
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </td>
            <td id="column-width">
              <InputGroup
                placeholder="DD/MM/YYYY"
                value={newDob}
                onChange={(e) => setNewDob(e.target.value)}
              />
            </td>
            <td>
              <InputGroup
                placeholder="Add education here..."
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
              />
            </td>            
            <td>
              <InputGroup
                placeholder="Add email here..."
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </td>            
            <td>
              <InputGroup
                placeholder="Add location here..."
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </td>             
            <td>
              <TextArea
                placeholder="Add about here..."
                growVertically={true}
                large={true}                  
                onChange={(e) => setNewAbout(e.target.value)}
                value={newAbout}
              />
            </td>            
            <td id="column-width">
              <Button intent="success" onClick={addEmployee}>
                Add Employee
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
