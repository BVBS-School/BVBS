import { Component } from "react";
import Api from "./Api";
class Details extends Component {
  async signup(data) {
    return Api.post("/user/signup", data);
  }
  async login(data) {
    return Api.post("/user/login", data);
  }
  async getFaculty() {
    return Api.get("/about/faculty/get");
  }
  async addFaculty(data) {
    return Api.post("/about/faculty/add", data);
  }
  async moveFaculty(data) {
    return Api.post("/about/faculty/move", data);
  }
  async deleteFaculty(data) {
    return Api.post("/about/faculty/delete", data);
  }  
  async verify() {
    return Api.get("/user/verify");
  }
   
  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Details;