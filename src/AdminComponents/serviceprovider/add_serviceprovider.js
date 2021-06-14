import axios from "axios";
import React from "react";
import Sidebar from "../../AdminComponents/sidebar";
import SimpleReactValidator from "simple-react-validator";
import { isAutheticated, signout } from "../../auth";
import firebase from "../../firebase";
class AddServiceprovider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      name: "",
      email: "",
      addedby: "",
      contact: "",
      address_1:"",
      address_2:"",
      country:"",
      city:"",
      area:"",
      type:"",
      website:"",
      logo:"",
      product_desc:"",
      facility_desc:"",
      aggrement:"",
      contract:"",
      volunteer:"",
      status:"",
      images:"",
      data: Date.now(),
      countrylist:[],
      citieslist:[],
      volunteerlist:[],
      mobile_message: "",
      validError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setCityName = this.setCityName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setcountryandcity=this.setcountryandcity.bind(this);
    this.logoChange=this.logoChange.bind(this);
    this.imageChange=this.imageChange.bind(this);

    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }

  setcountryandcity(user){
    console.log(user);
    this.setState({
      country: user.country,
    });

    let selectedCountryName = user.country;
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/city/cityvalues/${selectedCountryName}`)
      .then((res) => {
        const cities = res.data;
        console.log(cities);
        this.setState({citieslist:cities });
      });
  }

  componentDidMount(){
    const {
      user: { _id },
    } = isAutheticated();
    axios.get(`${process.env.REACT_APP_BASE_URL}/country/allcountry`).then((res) => {
        const Countries = res.data;
        console.log(Countries);
        this.setState({ countrylist:Countries, loading: true });
      });
    axios.get(`${process.env.REACT_APP_BASE_URL}/volunteers/volunteers/${_id}`).then((res) => {
        const volunteers = res.data;
        console.log(volunteers);
        this.setState({ volunteerlist:volunteers, loading: true });
      });

      

      axios.get(`${process.env.REACT_APP_BASE_URL}/admin/update_adminusers/${_id}`).then((res) => {
        const user = res.data;
        console.log(user);
        this.setState({ user, loading: true });
        this.setState({ country:user.country, city:user.city, loading: true });
        this.setcountryandcity(user);
      });

  }

  

  setCityName(e) {
    console.log(e.target.value);
    this.setState({
      country: e.target.value,
    });

    let selectedCountryName = e.target.value;
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/city/cityvalues/${selectedCountryName}`)
      .then((res) => {
        const cities = res.data;
        console.log(cities);
        this.setState({citieslist:cities });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.validator.allValid()) {
      const {
        user: { _id },
      } = isAutheticated();
      const menu = {
        party_name: this.state.name,
        email: this.state.email,
        addedby: _id,
        contact: this.state.contact,
        address1:this.state.address_1,
        address2:this.state.address_2,
        country:this.state.country,
        city:this.state.city,
        area:this.state.area,
        party_type:this.state.type,
        website:this.state.website,
        logo:this.state.logo,
        product:this.state.product_desc,
        facilities:this.state.facility_desc,
        aggrement_date:this.state.aggrement,
        contract_terms:this.state.contract,
        volunteer:this.state.volunteer,
        status:this.state.status==='active',
        images:this.state.images
      };
      console.log(menu);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/serviceprovider/add`, menu)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });

      this.props.history.push("/serviceprovider");
      // window.location.reload();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  
   loading=<h5 style={{color:'red', margin:'auto'}}>...Uploading</h5>;


   logoChange = event => {
    const file = event.target.files[0];
    console.log(file);

    const uploadTask = firebase.storage().ref().child(`files/logo/${file.name}`).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (snapshot.state === firebase.storage.TaskState.RUNNING) {
          console.log(`Progress: ${progress}%`);
        }
      },
      error => console.log(error.code),
      async () => {
        const imageURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log(imageURL);
        this.setState({logo:imageURL});
      }
    );



  };

  imageChange = event => {
    const file = event.target.files[0];
    console.log(file);

    const uploadTask = firebase.storage().ref().child(`files/images/${file.name}`).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (snapshot.state === firebase.storage.TaskState.RUNNING) {
          console.log(`Progress: ${progress}%`);
        }
      },
      error => console.log(error.code),
      async () => {
        const imageURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log(imageURL);
        this.setState({images:imageURL});
      }
    );



  };

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Service Provider- Add New</div>
            <div className="admin-data">
              <div className="container-fluid p-0">
                <form
                  className="form-contact contact_form"
                  onSubmit={this.handleSubmit}
                >
                  <div className="row m-0">
                    <div className="col-lg-12 p-0"></div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0"> Name*</label>
                        <input
                          className="form-control col-lg-10"
                          name="name"
                          onChange={this.handleChange}
                          value={this.state.name}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="name"
                        />
                        {this.validator.message(
                          "Name",
                          this.state.name,
                          "required|whitespace|min:1|max:20"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0"> Email*</label>
                        <input
                          className="form-control col-lg-10"
                          name="email"
                          onChange={this.handleChange}
                          value={this.state.email}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="email"
                        />
                        {this.validator.message(
                          "Email",
                          this.state.email,
                          "required|email"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0"> Contact Number*</label>
                        <input
                          className="form-control col-lg-10"
                          name="contact"
                          onChange={this.handleChange}
                          value={this.state.contact}
                          type="number"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Contact number"
                        />
                        {this.validator.message(
                          "Contact",
                          this.state.contact,
                          "required|min:10|max:10"
                        )}
                        {this.state.mobile_message}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0"> Address Line 1*</label>
                        <input
                          className="form-control col-lg-10"
                          name="address_1"
                          onChange={this.handleChange}
                          value={this.state.address_1}
                          type="text"
                          onfocus="this.placeholder = 'Menu address_1'"
                          onblur="this.placeholder = ''"
                          placeholder="Address line 1"
                        />
                        {this.validator.message(
                          "address_1",
                          this.state.address_1,
                          "required"
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Address line 2*</label>
                        <input
                          className="form-control col-lg-10"
                          name="address_2"
                          onChange={this.handleChange}
                          value={this.state.address_2}
                          type="text"
                          onfocus="this.placeholder = 'Menu address_2'"
                          onblur="this.placeholder = ''"
                          placeholder="Address line 2"
                        />
                        {this.validator.message(
                          "address_2",
                          this.state.address_2,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Country*</label>
                        <input 
                          className="form-control col-lg-10"
                          name="country"
                          onChange={this.setCityName}
                          value={this.state.country}
                          onfocus="this.placeholder = 'Menu country'"
                          onblur="this.placeholder = ''"
                          placeholder="Country"
                          disabled
                        />
                        
                        {this.validator.message(
                          "country",
                          this.state.country,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">City*</label>
                        <input
                          className="form-control col-lg-10"
                          name="city"
                          onChange={this.handleChange}
                          value={this.state.city}
                          onfocus="this.placeholder = 'Menu city'"
                          onblur="this.placeholder = ''"
                          placeholder="City"
                          disabled
                        />
                        
                        {this.validator.message(
                          "city",
                          this.state.city,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Area*</label>
                        <input
                          className="form-control col-lg-10"
                          name="area"
                          onChange={this.handleChange}
                          value={this.state.area}
                          type="text"
                          onfocus="this.placeholder = 'Menu area'"
                          onblur="this.placeholder = ''"
                          placeholder="Area"
                        />
                        {this.validator.message(
                          "area",
                          this.state.area,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Type</label>
                        <select
                          className="form-control col-lg-10"
                          name="type"
                          onChange={this.handleChange}
                          value={this.state.type}
                          onfocus="this.placeholder = 'Menu type'"
                          onblur="this.placeholder = ''"
                          placeholder="Type"
                        >
                        <option value="" selected disabled hidden>Choose</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Pharma">Pharma</option>
                        <option value="Equipment provider">Equipment provider</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Ambulance service">Ambulance service</option>
                        <option value="Vaccine">Vaccine</option>
                        <option value="Institution details">Institution details</option>
                        </select>
                        {this.validator.message(
                          "type",
                          this.state.type,
                          "required"
                        )}
                      
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Website</label>
                        <input
                          className="form-control col-lg-10"
                          name="website"
                          onChange={this.handleChange}
                          value={this.state.website}
                          type="text"
                          onfocus="this.placeholder = 'Menu website'"
                          onblur="this.placeholder = ''"
                          placeholder="Website"
                        />
                     
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Logo</label>
                        <input
                          className="form-control col-lg-10"
                          name="logo"
                          onChange={this.logoChange}
                          type="file"
                          onfocus="this.placeholder = 'Menu logo'"
                          onblur="this.placeholder = ''"
                        />
                        
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Product/services desciption*</label>
                        <input
                          className="form-control col-lg-10"
                          name="product_desc"
                          onChange={this.handleChange}
                          value={this.state.product_desc}
                          type="text"
                          onfocus="this.placeholder = 'Menu product_desc'"
                          onblur="this.placeholder = ''"
                          placeholder="Product Description"
                        />
                        
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Facilities description</label>
                        <textarea 
                          className="form-control col-lg-10"
                          name="product_desc"
                          onChange={this.handleChange}
                          value={this.state.facility_desc}
                          type="text-area"
                          onfocus="this.placeholder = 'Menu product_desc'"
                          onblur="this.placeholder = ''"
                          placeholder="facilities decription"
                        />
                       
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Agreement Date</label>
                        <input
                          className="form-control col-lg-10"
                          name="aggrement"
                          onChange={this.handleChange}
                          value={this.state.aggrement}
                          type="date"
                          onfocus="this.placeholder = 'Menu aggrement'"
                          onblur="this.placeholder = ''"
                          placeholder="aggrement date"
                        />
                       
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Contract T&C</label>
                        <textarea
                          className="form-control col-lg-10"
                          name="contract"
                          onChange={this.handleChange}
                          value={this.state.contract}
                          type="text"
                          onfocus="this.placeholder = 'Menu contract'"
                          onblur="this.placeholder = ''"
                          placeholder="contract t&c"
                        />
                      
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Volunteer*</label>
                        <select
                          className="form-control col-lg-10"
                          name="volunteer"
                          onChange={this.handleChange}
                          value={this.state.volunteer}
                          onfocus="this.placeholder = 'Menu volunteer'"
                          onblur="this.placeholder = ''"
                          placeholder="volunteer"
                        >
                        <option value="" selected disabled hidden>Choose</option>
                        {this.state.volunteerlist.map(vol=>{
                            return <option key={vol.name} value={vol.name}> {vol.name}</option>;
                        })}
                        </select>
                        {this.validator.message(
                          "volunteer",
                          this.state.volunteer,
                          "required"
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Status*</label>
                        <select
                          className="form-control col-lg-10"
                          name="status"
                          onChange={this.handleChange}
                          value={this.state.status}
                          type="select"
                          onfocus="this.placeholder = 'Menu status'"
                          onblur="this.placeholder = ''"
                          placeholder="status"
                        >
                        <option value="" selected disabled hidden>Choose</option>
                        <option value="active">Active</option>
                        <option value="inactive" >Inactive</option>
                        </select>
                        {this.validator.message(
                          "status",
                          this.state.status,
                          "required"
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Images</label>
                        <input
                          className="form-control col-lg-10"
                          name="image"
                          onChange={this.imageChange}
                          value={this.state.image}
                          type="file"  
                          onfocus="this.placeholder = 'Menu image'"
                          onblur="this.placeholder = ''"
                        />
                       
                      </div>
                    </div>
                    

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field  row m-0">
                        <label className="col-lg-2 p-0" />
                        <div className="col-lg-6 p-0">
                          <button
                            className="button button-contactForm boxed-btn"
                            type="submit"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddServiceprovider;
