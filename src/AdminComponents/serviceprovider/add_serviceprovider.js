import axios from "axios";
import React from "react";
import Sidebar from "../../AdminComponents/sidebar";
import SimpleReactValidator from "simple-react-validator";
import { isAutheticated, signout } from "../../auth";
import firebase from "../../firebase";
import Loader from "react-loader-spinner";

class AddServiceprovider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      name: "",
      email: "",
      addedby: "",
      contact: "",
      address_1: "",
      address_2: "",
      country: "",
      city: "",
      area: "",
      type: "",
      website: "",
      logo: "",
      product_desc: "",
      facility_desc: "",
      aggrement: "",
      contract: "",
      manager: "",
      status: "",
      files:[],
      images: [],
      imageloaded:false,
      doc_name: "",
      doc_file: "",
      data: Date.now(),
      countrylist: [],
      citieslist: [],
      managerlist: [],
      hospital: "",
      vaccine: "",
      pharma: "",
      equipment: "",
      ambulance: "",
      consultant: "",
      mobile_message: "",
      validError: false,
      loading:true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logoChange = this.logoChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.docChange = this.docChange.bind(this);

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


  componentDidMount() {
    const {
      user: { _id },
    } = isAutheticated();
    axios.get(`${process.env.REACT_APP_BASE_URL}/country/allcountry`).then((res) => {
      const Countries = res.data;
      console.log(Countries);
      this.setState({ countrylist: Countries, loading: false });
    });
    axios.get(`${process.env.REACT_APP_BASE_URL}/manager/get/${_id}`).then((res) => {
      const managers = res.data;
      console.log(managers);
      this.setState({ managerlist: managers, loading: false });
    });



    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/update_adminusers/${_id}`).then((res) => {
      const user = res.data;
      console.log(user);
      this.setState({ user, loading: true });
      this.setState({ country: user.country, city: user.city, loading: false });
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
      this.setState({loading:true});
      const {
        user: { _id },
      } = isAutheticated();
      let product_type = "";
      if (this.state.hospital)
        product_type += this.state.hospital + ",";
      if (this.state.pharma)
        product_type += this.state.pharma + ",";
      if (this.state.vaccine)
        product_type += this.state.vaccine + ",";
      if (this.state.ambulance)
        product_type += this.state.ambulance + ",";
      if (this.state.consultant)
        product_type += this.state.consultant + ",";
      if (this.state.equipment)
        product_type += this.state.equipment;
      console.log(product_type);
      const menu = {
        party_name: this.state.name,
        email: this.state.email,
        addedby: _id,
        contact: this.state.contact,
        address1: this.state.address_1,
        address2: this.state.address_2,
        country: this.state.country,
        city: this.state.city,
        area: this.state.area,
        party_type: this.state.type,
        website: this.state.website,
        logo: this.state.logo,
        product: product_type,
        facilities: this.state.facility_desc,
        aggrement_date: this.state.aggrement,
        contract_terms: this.state.contract,
        manager: this.state.manager,
        status: this.state.status === 'active',
        images: this.state.images,
        document: {
           name: this.state.doc_name ,
           image: this.state.doc_file 
        }
      };
      console.log(menu);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/serviceprovider/add`, menu)
        .then((res) => {
          this.setState({loading:false});
          console.log(res.data);
          this.props.history.push("/serviceprovider");
        })
        .catch(err=>{
          console.log(err);
          alert("something went wrong");
        });

      // window.location.reload();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }


  loading = <h5 style={{ color: 'red', margin: 'auto' }}>...Uploading</h5>;


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
        this.setState({ logo: imageURL });
      }
    );



  };

  
imageChange = e => {
      e.preventDefault(); // prevent page refreshing
      const img_file=[...e.target.files];
      const promises = [];
      let url=[];
      img_file.forEach(file =>
        {
        const uploadTask = firebase.storage().ref().child(`files/images/${file.name}`).put(file);
        promises.push(uploadTask);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                          console.log(`Progress: ${progress}%`);
              }},
          error => console.log(error.code),
             async () => {
              const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        console.log(downloadURL);
                        url.push(downloadURL);
               // console.log(url);
                        }
                       );
                     });
      Promise.all(promises)
      .then(() => {
           this.setState({images:url} );
            this.setState({imageloaded:true});
            alert('All files uploaded successfully');
      })
                  .catch(err => console.log(err.code));
           }

  docChange = event => {
    const file = event.target.files[0];
    console.log(file);

    const uploadTask = firebase.storage().ref().child(`files/docs/${file.name}`).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (snapshot.state === firebase.storage.TaskState.RUNNING) {
          console.log(`Progress: ${progress}%`);
        }
      },
      error => console.log(error.code),
      async () => {
        const docURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log(docURL);
        this.setState({ doc_file: docURL });
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
            {!this.state.loading ? (
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
                        <label className="col-lg-2 p-0">Address line 2</label>
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
                        <label className="col-lg-2 p-0">Area</label>
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

                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Type*</label>
                        <div className="form-control col-lg-10 h-100">
                          <div className="row">
                            <div className="row col-lg-6 col-sm-6 m-auto">
                              <input
                                className="ml-2 mr-2"
                                name="type"
                                type="radio"
                                id="indivisual"
                                onChange={this.handleChange}
                                value="indivisual"
                                onfocus="this.placeholder = 'Menu type'"
                                onblur="this.placeholder = ''"
                                placeholder="Type"
                              />
                              <label for="indivisual">Indivisual</label>
                            </div>
                            <div className="row col-lg-6 col-sm-6 m-auto">
                              <input
                                className="ml-2 mr-2"
                                name="type"
                                type="radio"
                                id="agency"
                                onChange={this.handleChange}
                                value="agency"
                                onfocus="this.placeholder = 'Menu type'"
                                onblur="this.placeholder = ''"
                                placeholder="Type"
                              />
                              <label for="agency" >Agency</label>
                            </div>
                          </div>
                        </div>
                        {this.validator.message(
                          "type",
                          this.state.type,
                          "required"
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
                        <label className="col-lg-2 p-0"> Email</label>
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
                        <label className="col-lg-2 p-0">Product and services *</label>
                        <div className="form-control col-lg-10 h-100">
                          <div className="row m-auto">

                            <input
                              className="mr-2"
                              type="checkbox"
                              name="hospital"
                              id="hospital"
                              onChange={this.handleChange}
                              value="hospital"
                              onfocus="this.placeholder = 'Menu product_desc'"
                              onblur="this.placeholder = ''"
                            />
                            <label for="hospital">Hospital</label>
                          </div>
                          <div className="row m-auto">
                            <input
                              className="mr-2"
                              type="checkbox"
                              name="consultant"
                              id="consultant"
                              onChange={this.handleChange}
                              value="consultant"
                              onfocus="this.placeholder = 'Menu product_desc'"
                              onblur="this.placeholder = ''"
                            />
                            <label for="consultant">Consultant</label>
                          </div>
                          <div className="row m-auto ml-2">
                            <input
                              className="mr-2"
                              type="checkbox"
                              name="equipment"
                              id="equipment"
                              onChange={this.handleChange}
                              value="equipment"
                              onfocus="this.placeholder = 'Menu product_desc'"
                              onblur="this.placeholder = ''"
                              placeholder="Product Description"
                            />
                            <label for="equipment">Equipment</label>
                          </div>
                          <div className="row m-auto">
                            <input
                              className="mr-2"
                              type="checkbox"
                              name="vaccine"
                              id="vaccine"
                              onChange={this.handleChange}
                              value="vaccine"
                              onfocus="this.placeholder = 'Menu product_desc'"
                              onblur="this.placeholder = ''"
                              placeholder="Product Description"
                            />
                            <label for="vaccine">Vaccine provider</label>
                          </div>
                          <div className="row m-auto">
                            <input
                              className="mr-2"
                              type="checkbox"
                              name="pharma"
                              id="pharma"
                              onChange={this.handleChange}
                              value="pharma"
                              onfocus="this.placeholder = 'Menu product_desc'"
                              onblur="this.placeholder = ''"
                              placeholder="Product Description"
                            />
                            <label for="pharma">Pharma</label>
                          </div>
                          <div className="row m-auto">
                            <input
                              className="mr-2"
                              type="checkbox"
                              name="ambulance"
                              id="ambulance"
                              onChange={this.handleChange}
                              value="ambulance"
                              onfocus="this.placeholder = 'Menu product_desc'"
                              onblur="this.placeholder = ''"
                              placeholder="Product Description"
                            />
                            <label for="ambulance">Ambulance</label>
                          </div>
                        </div>

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
                        <label className="col-lg-2 p-0">Program manager*</label>
                        <select
                          className="form-control col-lg-10"
                          name="manager"
                          onChange={this.handleChange}
                          value={this.state.manager}
                          onfocus="this.placeholder = 'Menu volunteer'"
                          onblur="this.placeholder = ''"
                          placeholder="volunteer"
                        >
                          <option value="" selected disabled hidden>Choose</option>
                          {this.state.managerlist.map(vol => {
                            return <option key={vol.name} value={vol.name}> {vol.name}</option>;
                          })}
                        </select>
                        {this.validator.message(
                          "manager",
                          this.state.manager,
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
                         multiple
                          className="form-control col-lg-10"
                          name="image"
                          onChange={this.imageChange}
                          type="file"
                          onfocus="this.placeholder = 'Menu image'"
                          onblur="this.placeholder = ''"
                        />

                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Document</label>

                        <div className="form-control col-lg-10 h-100">
                          <div className="row">
                            <div className=" row col-lg-6 col-sm-6 m-auto">
                              <input
                                className="form-control"
                                name="doc_name"
                                onChange={this.handleChange}
                                value={this.state.doc_name}
                                type="text"
                                onfocus="this.placeholder = 'Menu image'"
                                onblur="this.placeholder = ''"
                                placeholder="File name"
                              />
                             
                            </div>
                            <div className="row col-lg-6 col-sm-6 m-auto">
                              <input
                                name="doc_file"
                                onChange={this.docChange}
                                type="file"
                                onfocus="this.placeholder = 'Menu image'"
                                onblur="this.placeholder = ''"
                              />
                             
                            </div>
                          </div>
                        </div>

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
            </div> ) : (
							<div style={{ marginLeft: "500px", marginTop: "200px" }}>
								{" "}
								<Loader
									type="Circles"
									color="#f39510"
									height={100}
									width={100}
									timeout={3000} //3 secs
								/>
							</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AddServiceprovider;
