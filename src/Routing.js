import logo from "./logo.svg";

import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Empty from "./empty";

// ////////////////FrontEnd/////////////////////////////////////////
import Home from "./Frontend/home";
/////////////////////SuperAdmin/////////////////////////////////////////////
import Login from "./components/login";
import Changepassword from "./components/changepassword";
import Dashboard from "./components/dashboard";

//Admin Users
import AddAdminUser from "./components/AdminUser/add_adminuser";
import AdminUsers from "./components/AdminUser/adminusers";
import EditAdminUsers from "./components/AdminUser/edit_adminusers";

//Administrator Users
import AddAdministratorUser from "./components/Administrator/add_administrator";
import AdministratorUsers from "./components/Administrator/administrator";

//Cities
import AddCity from "./components/City/add_city";
import City from "./components/City/city";
import EditCity from "./components/City/edit_city";

//Countries
import AddCountry from "./components/Country/add_country";
import Country from "./components/Country/country";
import EditCountry from "./components/Country/edit_country";

//Blood Group
import AddBloodGroup from "./components/BloodGroup/add_bloodgroup";
import EditBloodGroup from "./components/BloodGroup/edit_bloodgroup";
import BloodGroup from "./components/BloodGroup/bloodgroup";

//Resource
import AddResource from "./components/Resource/add_resource";
import EditResource from "./components/Resource/edit_resource";
import ViewResource from "./components/Resource/view_resource";
import Resources from "./components/Resource/resources";

//Privacy Policy
import AddPrivacyPolicy from "./components/PrivacyPolicy/add_privacypolicy";
import PrivacyPolicy from "./components/PrivacyPolicy/privacypolicy";
import EditPrivacyPolicy from "./components/PrivacyPolicy/edit_privacypolicy";
import PrivacyPolicyPage from "./components/PrivacyPolicy/privacypolicysingle";

//TermsOfServices
import AddTermsOfservice from "./components/TermsOfServices/add_termsofservice";
import TermsOfservice from "./components/TermsOfServices/termsofservice";
import EditTermsOfservice from "./components/TermsOfServices/edit_termsofservice";
import TermsOfservicePage from "./components/TermsOfServices/termsofservicessingle";

//Menu
import Menu from "./components/Menu/menu";
import AddMenu from "./components/Menu/add_menu";
import EditMenu from "./components/Menu/edit_menu";
import ViewMenu from "./components/Menu/view_menu";

//SubMenu
import AddSubMenu from "./components/Submenu/add_submenu";
import SubMenu from "./components/Submenu/submenu";
import EditSubMenu from "./components/Submenu/edit_submenu";
import ViewSubMenu from "./components/Submenu/view_submenu";

///Page
import AddPage from "./components/Page/add_page";
import Page from "./components/Page/page";
import EditPage from "./components/Page/edit_page";
import ViewPage from "./components/Page/view_page";

////////////////////Admin/////////////////////////////////////////////////////////////////////////////////////////////
import AdminLogin from "./AdminComponents/login";
import AdminDashboard from "./AdminComponents/dashboard";
import AdminChangepassword from "./AdminComponents/changepassword";

//Resource1
import AddResource1 from "./AdminComponents/Resource/add_resource";
import EditResource1 from "./AdminComponents/Resource/edit_resource";
import ViewResource1 from "./AdminComponents/Resource/view_resource";
import Resources1 from "./AdminComponents/Resource/resources";

//serviceprovider
import Serviceprovider from "./AdminComponents/serviceprovider/serviceprovider";
import add_Serviceprovider from "./AdminComponents/serviceprovider/add_serviceprovider";
import view_Serviceprovider from "./AdminComponents/serviceprovider/view_serviceprovider";
import edit_Serviceprovider from "./AdminComponents/serviceprovider/edit_serviceprovider";

//Contact
import Contact from "./AdminComponents/serviceprovider/contact/contact";
import add_Contact from "./AdminComponents/serviceprovider/contact/add_contact";
import edit_Contact from "./AdminComponents/serviceprovider/contact/edit_contact";

//Volunteers

import AddVolunteers from "./AdminComponents/Volunteers/add_volunteers";
import EditVolunteers from "./AdminComponents/Volunteers/edit_volunteers";
import Volunteers from "./AdminComponents/Volunteers/volunteers";

import AddRequest from "./AdminComponents/Request/add_request";
import EditRequest from "./AdminComponents/Request/edit_request";
import ViewRequest from "./AdminComponents/Request/view_request";
import Request from "./AdminComponents/Request/request";
import PatientStaus from "./AdminComponents/Request/add_patient_status";

/////Volunteers  Details///////////////////////////////////////////////////////////////////////////////
import VolunteerLogin from "./Volunteers/login_volunteers";
import VolunteerChangePassword from "./Volunteers/changepassword";
import VolunteerAddRequest from "./Volunteers/Request/add_request";
import VolunteerEditRequest from "./Volunteers/Request/edit_request";
import VolunteerViewRequest from "./Volunteers/Request/view_request";
import VolunteerRequest from "./Volunteers/Request/request";
import VolunteerPatientStaus from "./Volunteers/Request/add_patient_status";

//Pages
import PrivacyPolicy1 from "./Frontend/privacypolicy";
import TermsOfServices1 from "./Frontend/termsofservices";
import AboutUs from "./Frontend/aboutus";
import MenuList from "./Frontend/menulist";
import SubMenuList from "./Frontend/submenulist";
import GDPRPolicy from "./Frontend/GDPRPolicy";
import CookiePolicy from "./Frontend/CookiePolicy";
import DevelopmentRoadMap from "./Frontend/DevelopmentRoadmap";

// Institution Details
import { AddInstitutionDetails } from "./components/InstitutionDetails/AddInstitutionDetails";
// import { InstitutionDetails } from "./components/InstitutionDetails/InstitutionDetails";
import { EditInstitutionDetails } from "./components/InstitutionDetails/EditInstitutionDetails";
import { ViewInstitutionDetails } from "./components/InstitutionDetails/ViewInstitutionDetails";

import { InstitutionDetails } from "./components/InstitutionDetails";

// Social Media Details
import { SocialMediaDetails } from "./components/SocialMedia";

// Hospital
import { AddHospitalDetails } from "./components/Hospital/AddHospitalDetails";
import { ViewHospitalDetails } from "./components/Hospital/ViewHospitalDetails";
import { HospitalDetails } from "./components/Hospital/HospitalDetails";
import { EditHospitalDetails } from "./components/Hospital/EditHospitalDetails";

//Equipment Provider
import { AddEquipmentProvider } from "./components/EquipmentProvider/AddEquipmentProvider";
import { EquipmentProvider } from "./components/EquipmentProvider/EquipmentProvider";
import { EditEquipmentProvider } from "./components/EquipmentProvider/EditEquipmentProvider";
import { ViewEquipmentProvider } from "./components/EquipmentProvider/ViewEquipmentProvider";

//Consultant
import { AddConsultant } from "./components/Consultant/AddConsultant";
import { EditConsultant } from "./components/Consultant/EditConsultant";
import { ViewConsultant } from "./components/Consultant/ViewConsultant";
import { Consultant } from "./components/Consultant/Consultant";

//Pharma
import { AddPharma } from "./components/Pharma/AddPharma";
import { EditPharma } from "./components/Pharma/EditPharma";
import { ViewPharma } from "./components/Pharma/ViewPharma";
import { Pharma } from "./components/Pharma/Pharma";

//Vaccine
import { AddVaccine } from "./components/Vaccine/AddVaccine";
import { EditVaccine } from "./components/Vaccine/EditVaccine";
import { ViewVaccine } from "./components/Vaccine/ViewVaccine";
import { Vaccine } from "./components/Vaccine/Vaccine";

//Ambulance Service
import { AddAmbulanceService } from "./components/AmbulanceService/AddAmbulanceService";
import { EditAmbulanceService } from "./components/AmbulanceService/EditAmbulanceService";
import { ViewAmbulanceService } from "./components/AmbulanceService/ViewAmbulanceService";
import { AmbulanceService } from "./components/AmbulanceService/AmbulanceService";

function Routing() {
	return (
		<HashRouter>
			<Switch>
				{/* <Route exact path="/" component={Empty}></Route> */}
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/home" component={Home}></Route>
				<Route exact path="/privacy_policy" component={PrivacyPolicy1}></Route>
				<Route
					exact
					path="/terms_of_services"
					component={TermsOfServices1}
				></Route>
				<Route exact path="/about_us" component={AboutUs}></Route>

				<Route path="/MenuList/:plpID" component={MenuList} />
				<Route path="/SubMenuList/:plpID" component={SubMenuList} />
				<Route exact path="/login" component={Empty}></Route>
				{/*************************************  Super Admin *****************************************/}
				<Route exact path="/superadminlogin" component={Login}></Route>
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/change_password" exact component={Changepassword} />
				{/* Admin Users */}
				<Route path="/add_adminuser" exact component={AddAdminUser} />
				<Route path="/adminuser" exact component={AdminUsers} />
				<Route path="/edit_adminuser/:_id" exact component={EditAdminUsers} />
				{/* Administrator Duplicate */}
				<Route
					path="/add_administratoruser"
					exact
					component={AddAdministratorUser}
				/>
				<Route path="/administratoruser" exact component={AdministratorUsers} />
				{/* Cities */}
				<Route path="/add_city" exact component={AddCity} />
				<Route path="/cities" exact component={City} />
				<Route path="/edit_city/:_id" exact component={EditCity} />
				{/* Countries */}
				<Route path="/add_country" exact component={AddCountry} />
				<Route path="/countries" exact component={Country} />
				<Route path="/edit_country/:_id" exact component={EditCountry} />
				{/* Blood Group */}
				<PrivateRoute path="/add_bloodgroup" exact component={AddBloodGroup} />
				<PrivateRoute
					path="/edit_bloodgroup/:_id"
					exact
					component={EditBloodGroup}
				/>
				<PrivateRoute path="/bloodgroup" exact component={BloodGroup} />
				{/* Resource */}
				<PrivateRoute path="/add_resource" exact component={AddResource} />
				<PrivateRoute
					path="/edit_resource/:_id"
					exact
					component={EditResource}
				/>
				<PrivateRoute
					path="/view_resource/:_id"
					exact
					component={ViewResource}
				/>
				<PrivateRoute path="/resources" exact component={Resources} />
				{/* ****************************Hospital*********************************** */}
				<Route
					path="/add_hospital_details"
					exact
					component={AddHospitalDetails}
				/>
				<Route path="/hospital_details" exact component={HospitalDetails} />
				<Route
					path="/edit_hospital_details/:_id"
					exact
					component={EditHospitalDetails}
				/>
				<Route
					path="/view_hospital_details/:_id"
					exact
					component={ViewHospitalDetails}
				/>

				{/* ****************************Equipment Provider*********************************** */}
				<Route
					path="/add_equipment_provider"
					exact
					component={AddEquipmentProvider}
				/>
				<Route path="/equipment_provider" exact component={EquipmentProvider} />
				<Route
					path="/edit_equipment_provider/:_id"
					exact
					component={EditEquipmentProvider}
				/>
				<Route
					path="/view_equipment_provider/:_id"
					exact
					component={ViewEquipmentProvider}
				/>

				{/* ***********************************Consultant************************************* */}
				<Route path="/add_consultant" exact component={AddConsultant} />
				<Route path="/consultant" exact component={Consultant} />
				<Route path="/edit_consultant/:_id" exact component={EditConsultant} />
				<Route path="/view_consultant/:_id" exact component={ViewConsultant} />

				{/* ************************************Pharma*********************************** */}
				<Route path="/add_pharma" exact component={AddPharma} />
				<Route path="/pharma" exact component={Pharma} />
				<Route path="/edit_pharma/:_id" exact component={EditPharma} />
				<Route path="/view_pharma/:_id" exact component={ViewPharma} />

				{/* *******************************************Vaccine************************************* */}
				<Route path="/add_vaccine" exact component={AddVaccine} />
				<Route path="/vaccine" exact component={Vaccine} />
				<Route path="/edit_vaccine/:_id" exact component={EditVaccine} />
				<Route path="/view_vaccine/:_id" exact component={ViewVaccine} />

				{/* *******************************************Ambulance Service************************************* */}
				<Route path="/add_ambulance_service" exact component={AddAmbulanceService} />
				<Route path="/ambulance_service" exact component={AmbulanceService} />
				<Route path="/edit_ambulance_service/:_id" exact component={EditAmbulanceService} />
				<Route path="/view_ambulance_service/:_id" exact component={ViewAmbulanceService} />

				{/* PrivacyPolicy */}
				<Route path="/add_privacypolicy" exact component={AddPrivacyPolicy} />
				<Route path="/privacypolicy" exact component={PrivacyPolicy} />
				<Route
					path="/edit_privacypolicy/:_id"
					exact
					component={EditPrivacyPolicy}
				/>
				<Route
					path="/privacypolicypage/60a2573033be630015d6fcad"
					exact
					component={PrivacyPolicyPage}
				/>
				{/* terms of service */}
				<Route path="/add_termsofservice" exact component={AddTermsOfservice} />
				<Route path="/termsofservice" exact component={TermsOfservice} />
				<Route
					path="/edit_termsofservice/:_id"
					exact
					component={EditTermsOfservice}
				/>
				<Route
					path="/termsofservicepage/60a25d9c33be630015d6fcaf"
					exact
					component={TermsOfservicePage}
				/>

				{/* GDPR Policy */}
				<Route path="/gdpr_policy" exact component={GDPRPolicy} />

				{/* CookiePolicy */}
				<Route path="/cookie_policy" exact component={CookiePolicy} />

				{/* DevelopmentRoadMap */}
				<Route
					path="/development_roadmap"
					exact
					component={DevelopmentRoadMap}
				/>

				{/*888888888888888888888888888888888888888 Menu 888888888888888888888888888888888888888888888888888*/}

				<Route path="/add_menu" exact component={AddMenu} />
				<Route path="/menu" exact component={Menu} />
				<Route path="/edit_menu/:_id" exact component={EditMenu} />
				<Route path="/view_menu/:_id" exact component={ViewMenu} />

				<Route path="/add_submenu" exact component={AddSubMenu} />
				<Route path="/submenu" exact component={SubMenu} />
				<Route path="/edit_submenu/:_id" exact component={EditSubMenu} />
				<Route path="/view_submenu/:_id" exact component={ViewSubMenu} />

				<Route path="/add_page" exact component={AddPage} />
				<Route path="/page" exact component={Page} />
				<Route path="/edit_page/:_id" exact component={EditPage} />
				<Route path="/view_page/:_id" exact component={ViewPage} />
				{/* ********************************Institution Details***************************** */}
				<Route
					path="/add_institution_details"
					exact
					component={AddInstitutionDetails}
				/>
				<Route
					path="/institution_details"
					exact
					component={InstitutionDetails}
				/>
				<Route
					path="/edit_institution_details"
					exact
					component={EditInstitutionDetails}
				/>
				<Route
					path="/view_institution_details/:_id"
					exact
					component={ViewInstitutionDetails}
				/>

				<Route
					path="/view_institution_details"
					exact
					component={InstitutionDetails}
				/>

				{/* ********************************Social Media Details**************************** */}
				<Route
					path="/view_social_media_details"
					exact
					component={SocialMediaDetails}
				/>

				{/*************************************   Admin *****************************************/}
				{/* Admin */}
				<Route exact path="/adminlogin" component={AdminLogin}></Route>
				<Route
					path="/adminchange_password"
					exact
					component={AdminChangepassword}
				/>
				<Route path="/admindashboard" exact component={AdminDashboard} />
				{/* Resource 1*/}
				<PrivateRoute path="/add_resource1" exact component={AddResource1} />
				<PrivateRoute
					path="/edit_resource1/:_id"
					exact
					component={EditResource1}
				/>
				<PrivateRoute
					path="/view_resource1/:_id"
					exact
					component={ViewResource1}
				/>
				<PrivateRoute path="/resources1" exact component={Resources1} />
				{/* Volunteers */}
				<PrivateRoute path="/add_volunteers" exact component={AddVolunteers} />
				<PrivateRoute
					path="/edit_volunteers/:_id"
					exact
					component={EditVolunteers}
				/>
				<PrivateRoute path="/volunteers" exact component={Volunteers} />
				{/* Request*/}
				<PrivateRoute path="/add_request" exact component={AddRequest} />
				<PrivateRoute path="/edit_request/:_id" exact component={EditRequest} />
				<PrivateRoute path="/view_request/:_id" exact component={ViewRequest} />
				<PrivateRoute path="/request" exact component={Request} />
				<PrivateRoute
					path="/add_patient_status/:_id"
					exact
					component={PatientStaus}
				/>

				{/* serviceprovider */}

				<PrivateRoute path="/view_serviceprovider/:_id" exact component={view_Serviceprovider} />
				<PrivateRoute
					path="/edit_serviceprovider/:id"
					exact
					component={edit_Serviceprovider}
				/>
				<PrivateRoute
					path="/add_serviceprovider"
					exact
					component={add_Serviceprovider}
				/>
				<PrivateRoute path="/serviceprovider" exact component={Serviceprovider} />


				{/* contact */}

				<PrivateRoute path="/contact/:id" exact component={Contact} />
				<PrivateRoute
					path="/edit_contact/:id"
					exact
					component={edit_Contact}
				/>
				<PrivateRoute
					path="/add_contact/:id"
					exact
					component={add_Contact}
				/>


				{/****************************** Volunteers Details **************************************************/}

				<Route exact path="/volunteerlogin" component={VolunteerLogin}></Route>
				<Route
					exact
					path="/volunteer_change_password"
					component={VolunteerChangePassword}
				></Route>

				<PrivateRoute
					path="/volunteer_add_request"
					exact
					component={VolunteerAddRequest}
				/>
				<PrivateRoute
					path="/volunteer_edit_request/:_id"
					exact
					component={VolunteerEditRequest}
				/>
				<PrivateRoute
					path="/volunteer_view_request/:_id"
					exact
					component={VolunteerViewRequest}
				/>
				<PrivateRoute
					path="/volunteer_request"
					exact
					component={VolunteerRequest}
				/>
				<PrivateRoute
					path="/volunteer_add_patient_status/:_id"
					exact
					component={VolunteerPatientStaus}
				/>
			</Switch>
		</HashRouter>
	);
}

export default Routing;
