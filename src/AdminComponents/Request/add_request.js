import axios from "axios";
import React from "react";
import Sidebar from "../../AdminComponents/sidebar";
import SimpleReactValidator from "simple-react-validator";
import { isAutheticated, signout } from "../../auth";
class AddRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient_name: "",
      patient_mobilenumber: "",
      patient_requirement: "",
      patient_stage: "",
      guardian_name: "",
      guardian_mobilenumber: "",
      comments: "",
      addedby: "",
      adminid:'',
       adddedname:'',
    verifiedname:'',
      status: true,

      patient_at: "",
      current_spo2: "",
      patient_location: "",
      comorbidity_conditions: "",
      Priority: "",
      comments1: "",

      data: Date.now(),
      mobile_message: "",
      validError: false,
    };

    this.handleChange = this.handleChange.bind(this);

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
  componentDidMount() {
    axios
      .get(` https://api.covidfrontline.net/resource/allresources`)
      .then(res => {
        const resources = res.data;
        console.log(resources);
        this.setState({ resources, loading: true });
      });
  }

  handleChange(event) {
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
       const {
        user: { name },
      } = isAutheticated();
      const menu = {
        patient_name: this.state.patient_name,
        patient_mobilenumber: this.state.patient_mobilenumber,
        patient_requirement: this.state.patient_requirement,
        patient_stage: this.state.patient_stage,
        guardian_name: this.state.guardian_name,
        guardian_mobilenumber: this.state.guardian_mobilenumber,
        comments: this.state.comments,

        patient_at: "",
        current_spo2: "",
        patient_location: "",
        comorbidity_conditions: "",
        Priority: "",
        comments1: "",

        status: true,
        addedby: _id,
        adminid:_id,
          adddedname:name,
        verifiedname:'',
      };
      console.log(menu);
      axios
        .post(` https://api.covidfrontline.net/request/addrequest`, menu)
        .then(res => {
          console.log(res);
          console.log(res.data);
        });

      this.props.history.push("/request");
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
            <div className="admin-head">Request - Add New</div>
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
                        <label className="col-lg-3 p-0">Patient Name</label>
                        <input
                          className="form-control col-lg-9"
                          name="patient_name"
                          onChange={this.handleChange}
                          value={this.state.patient_name}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Alt Text"
                        />
                        {this.validator.message(
                          "Patient Name",
                          this.state.patient_name,
                          "required|whitespace|min:1|max:20"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-3 p-0">
                          {" "}
                          Patient Mobile Number
                        </label>
                        <input
                          className="form-control col-lg-9"
                          name="patient_mobilenumber"
                          onChange={this.handleChange}
                          value={this.state.patient_mobilenumber}
                          type="number"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "Patient Mobile Number",
                          this.state.patient_mobilenumber,
                          "required|min:10|max:10"
                        )}
                        {this.state.mobile_message}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-3 p-0">
                          Patient Requirement
                        </label>

                        <select
                          className="form-control col-lg-9"
                          name="patient_requirement"
                          onChange={this.handleChange}
                        >
                          <option>Select Resource</option>
                          {this.state.resources &&
                            this.state.resources.map((data, index) => {
                              return (
                                <option value={data.name} key={index}>
                                  {data.name}
                                </option>
                              );
                            })}
                        </select>

                        {this.validator.message(
                          "Patient Requirement",
                          this.state.patient_requirement,
                          "required"
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-3 p-0">Patient Stage</label>

                        <select
                          name="patient_stage"
                          id="select"
                          value={this.state.patient_stage}
                          onChange={this.handleChange}
                          className="form-control col-lg-9"
                        >
                          <option value="select">select</option>
                          <option value="Critical ">Critical </option>
                          <option value="Non Critical">Non Critical</option>
                        </select>

                        {this.validator.message(
                          "Patient Stage",
                          this.state.patient_stage,
                          "required"
                        )}
                      </div>
                    </div>

                    {/* <select
                      name="item_halal"
                      id="select"
                      value={this.state.item_halal}
                      onChange={this.onChange}
                      className="form-control"
                    >
                      <option value="select">select</option>
                      <option value="Yes">Yes</option>
                      <option value="NO">NO</option>
                      <option value="Not Applicable">Not Applicable</option>
                    </select> */}
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-3 p-0">Guardian Name</label>
                        <input
                          className="form-control col-lg-9"
                          name="guardian_name"
                          onChange={this.handleChange}
                          value={this.state.guardian_name}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Alt Text"
                        />
                        {this.validator.message(
                          "Guardian Name",
                          this.state.guardian_name,
                          "required|whitespace|min:1|max:20"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-3 p-0">
                          {" "}
                          Guardian Mobile Number
                        </label>
                        <input
                          className="form-control col-lg-9"
                          name="guardian_mobilenumber"
                          onChange={this.handleChange}
                          value={this.state.guardian_mobilenumber}
                          type="number"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "Guardian Mobile Number",
                          this.state.guardian_mobilenumber,
                          "required|min:10|max:10"
                        )}
                        {this.state.mobile_message}
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-3 p-0">
                          Additional Information/Comments
                        </label>
                        <textarea
                          className="form-control col-lg-9"
                          name="comments"
                          onChange={this.handleChange}
                          value={this.state.comments}
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "Comments",
                          this.state.comments,
                          "max:200"
                        )}
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

export default AddRequest;
