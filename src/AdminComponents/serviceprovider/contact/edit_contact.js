import axios from "axios";
import React from "react";
import Sidebar from "../../../AdminComponents/sidebar";
import SimpleReactValidator from "simple-react-validator";
class EditContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      addedby: "",
      phone: "",
      designation: "",
      primary_contact: "",
      timing: "",
      loading:false,
      validError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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


  componentDidMount(){
      const { id } = this.props.match.params;

      axios.get(`${process.env.REACT_APP_BASE_URL}/contact/getbyid/${id}`)
      .then(res=>{
        const menu = res.data.data;
        console.log(menu);
        this.setState({
            name:menu.name,
            email:menu.email,
            designation:menu.designation,
            phone:menu.phone,
            primary_contact:menu.primary_contact,
            timing:menu.timing,
            addedby:menu.addedby,
            loading:true
        });
      })
      .catch(err=>{
          console.log(err);
          alert("somthing went wrong");
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
    const { id } = this.props.match.params;
    event.preventDefault();
    if (this.validator.allValid()) {
      
     
      const menu = {
        name: this.state.name,
        email: this.state.email,
        addedby: this.state.addedby,
        phone: this.state.phone,
        designation: this.state.designation,
        primary_contact: this.state.primary_contact,
        timing: this.state.timing
      };
      console.log(menu);
      axios.post(`${process.env.REACT_APP_BASE_URL}/contact/update/${id}`, menu)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.props.history.push(`/contact/${this.state.addedby}`);
        })
        .catch(err=>{
          console.log(err);
        });

      // window.location.reload();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

 

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Contact- Edit</div>
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
                        <label className="col-lg-2 p-0">Designation*</label>
                        <input
                          className="form-control col-lg-10"
                          name="designation"
                          onChange={this.handleChange}
                          value={this.state.designation}
                          type="text"
                          onfocus="this.placeholder = 'Menu designation'"
                          onblur="this.placeholder = ''"
                          placeholder="designation"
                        />
                        {this.validator.message(
                          "Designation",
                          this.state.designation,
                          "required"
                        )}
                      </div>
                    </div>
                 
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Phone*</label>
                        <input
                          className="form-control col-lg-10"
                          name="phone"
                          onChange={this.handleChange}
                          value={this.state.phone}
                          type="number"
                          onfocus="this.placeholder = 'Menu phone'"
                          onblur="this.placeholder = ''"
                          placeholder="phone"
                        />
                        {this.validator.message(
                          "Phone",
                          this.state.phone,
                          "required|min:10|max:10"
                        )}
                        {this.state.mobile_message}
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
                          onfocus="this.placeholder = 'Menu email'"
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
                        <label className="col-lg-2 p-0">Primary Contact*</label>
                        <input
                          className="form-control col-lg-10"
                          name="primary_contact"
                          onChange={this.handleChange}
                          value={this.state.primary_contact}
                          onfocus="this.placeholder = 'Menu primary_contact'"
                          onblur="this.placeholder = ''"
                          placeholder="Primary Contact"
                        />

                      </div>
                    </div>


                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Timing*</label>
                        <input
                          className="form-control col-lg-10"
                          name="timing"
                          onChange={this.handleChange}
                          value={this.state.timing}
                          type="text"
                          onfocus="this.placeholder = 'Menu timing'"
                          onblur="this.placeholder = ''"
                          placeholder="Timings"
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

export default EditContact;
