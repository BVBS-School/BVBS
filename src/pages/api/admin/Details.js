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
  async GalleryAdd(data) {
    return Api.post("/facilities/gallery/add", data);
  }
  async addFaculty(data) {
    return Api.post("/about/faculty/add", data);
  }
  async editFaculty(data) {
    return Api.post("/about/faculty/Edit", data);
  }
  async moveFaculty(data) {
    return Api.post("/about/faculty/move", data);
  }
  async deleteFaculty(data) {
    return Api.post("/about/faculty/delete", data);
  }
  async verify() {
    return Api.get("/user/profile");
  }

  async gethomebanner() {
    return Api.get("/home/banner/get");
  }
  async addhomebanner(data) {
    return Api.post("/home/banner/add", data);
  }

  async getprinciple() {
    return Api.get("/about/principal/get");
  }

  async addprinciple(data) {
    return Api.post("/about/principal/edit", data);

  }

  async paymentget() {
    return Api.get("/payment/paymentget");

  }

  async Sysllabas() {
    return Api.get("/academics/syllabus/get");
  }

  async SysllabasAdd(data) {
    return Api.post("/academics/syllabus/add", data);

  }

  async SysllabasDelete(data) {
    return Api.post("/academics/syllabus/delete", data);

  }

  async getdirector() {
    return Api.get("/about/director/get");
  }
  async editdirector(data) {
    return Api.post("/about/director/edit", data);
  }

  async getGallery() {
    return Api.get("/facilities/gallery/get");
  }

  async admingallery() {
    return Api.get("/facilities/admingallery");
  }
  async getGallerybyCategory(data) {
    return Api.get(`/facilities/gallery/get/${data}`);
  }

  async getfees() {
    return Api.get("/fees/get");
  }

  async feesAdd(data) {
    return Api.post("/fees/add", data);
  }

  
  async feesEdit(data) {
    return Api.post("/fees/edit", data);
  }

  async feedelete(data) {
    return Api.post("/fees/delete", data);
  }
  async vacancyget() {
    return Api.get("/career/vacancy/get");
  }

  async vacancypost(data) {
    return Api.post("/career/vacancy/add", data);
  }
  async vacancydelete(data) {
    return Api.post("/career/vacancy/delete", data);
  }
  async vacancyapply(data) {
    return Api.post("/career/apply", data);
  }

  async careerget() {
    return Api.get("/career/apply/get");
  }

  async Adminline() {
    return Api.get("/home/admission/get");
  }


  async inquiryAdd(data) {
    return Api.post("/inquiry/add", data);
  }

  async inquirydelete(id) {
    return Api.post("/inquiry/delete", id);
  }
  async inquiryget() {
    return Api.get("/inquiry/get");
  }

  async donationAdd(data) {
    return Api.post("/donation/add", data);
  }

  async donationUserAdd(data) {
    return Api.post("/donation/user/add", data);
  }

  async donationdelete(data) {
    return Api.post("/donation/delete", data);
  }
  async donationgetwithId(data) {
    return Api.get(`/donation/get/${data}`);
  }
  async donationget() {
    return Api.get(`/donation/get/`);
  }
  async getInvoice(data) {
    return Api.get(`/donation/invoice/get/${data}`);
  }
  async vacancyGet() {
    return Api.get(`/career/vacancy/get`);
  }

  async syllabusGet() {
    return Api.get(`/academics/syllabus/get`);
  }
  async syllabusAdd(data) {
    return Api.post(`/academics/syllabus/add`,data);}
    
  async AddCard(data) {
    return Api.post(`/payment/create`, data);
  }

  async PaymentSave(data) {
    return Api.post(`/payment/verify-payment`, data);
  }

  async AdmissionFormAdd(data) {
    return Api.post(`/admissionform/add`, data);
  }

  async ResultGet() {
    return Api.get(`/result/get`);
  }

  async ResultAdd(data) {
    return Api.post(`/result/add` ,data);
  }
  async ResultEdit(data) {
    return Api.post(`/result/Edit`, data);
  }
  async ResultDelete(data) {
    return Api.post(`/result/delete`, data);
  }

  async BannerGet() {
    return Api.get(`/home/banner/get`);
  }

  async BannerDelete(data) {
    return Api.post(`/home/banner/delete`, data);
  }
  
  async  galleryAdd(data) {
    return Api.post(`/facilities/gallery/add`, data);
  }
  async  galleryDelete(data) {
    return Api.post(`/facilities/gallery/delete`, data);
  }
  

  async admissionGet() {
    return Api.get(`/home/admission/get`);
  }

  async admissionPost(data) {
    return Api.post(`/home/admission/show`, data);
  }
  async admissionEdit(data) {
    return Api.post(`/home/admission/text`, data);
  }
  async admissionForm() {
    return Api.get(`/admissionform/get`,);
  }

  async donationget() {
    return Api.get(`/donation/get`,);
  }
  
  async donationadd(data) {
    return Api.post(`/donation/add`,data);
  }

  async donationdelete(data) {
    return Api.post(`/donation/delete`,data);
  }
  async sportsAdd(data) {
    return Api.post(`/facilities/sports/Add`,data);
  }
  async sportsDelete(data) {
    return Api.post(`/facilities/sports/delete`,  data);
  }

  async sportsGet() {
    return Api.get(`/facilities/sports/get`);
  }
  async BannerAdd(data) {
    return Api.post(`/home/banner/add` , data);
  }


  async sisterschoolsAdd(data) {
    return Api.post(`/about/sisterschool/add`,data);
  }
  async sisterschoolsDelete(data) {
    return Api.post(`/about/sisterschool/delete`,  data);
  }

  async sisterschoolsGet() {
    return Api.get(`/about/sisterschool/get`);
  }
  
  async comingsoonEdit(data) {
    return Api.post(`/about/comingsoon/edit`,data);
  }
  
  async comingsoonsGet() {
    return Api.get(`/about/comingsoon/get`);
  }

  
  async comingsoonshow(data) {
    return Api.post(`/about/comingsoon/show`,data);
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