import axios from "axios";
import React from "react";
import Sidebar from "../../AdminComponents/sidebar";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
class EditRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient_name: "",
      patient_mobilenumber: "",
      patient_requirement: "",
      patient_stage: "",
      guardian_name: "",
      guardian_mobilenumber: "",
      addedby: "",
      status: true,

      patient_at: "",
      current_spo2: "",
      patient_location: "",
      comorbidity_conditions: "",
      Priority: "",

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
    const { _id } = this.props.match.params;

    console.log(_id);
    axios
      .get(`https://api.covidfrontline.net/request/update_request/${_id}`)
      .then(res => {
        console.log(res.data);
        const menu = {
          patient_name: res.data.patient_name,
          patient_mobilenumber: res.data.patient_mobilenumber,
          patient_requirement: res.data.patient_requirement,
          patient_stage: res.data.patient_stage,
          guardian_name: res.data.guardian_name,
          guardian_mobilenumber: res.data.guardian_mobilenumber,
          addedby: res.data.addedby,

          patient_at: res.data.patient_at,
          current_spo2: res.data.current_spo2,
          patient_location: res.data.patient_location,
          comorbidity_conditions: res.data.comorbidity_conditions,
          Priority: res.data.Priority,
        };
        console.log(menu.name);
        this.setState({
          patient_name: menu.patient_name,
          patient_mobilenumber: menu.patient_mobilenumber,
          patient_requirement: menu.patient_requirement,
          patient_stage: menu.patient_stage,
          guardian_name: menu.guardian_name,
          guardian_mobilenumber: menu.guardian_mobilenumber,

          addedby: menu.addedby,
          patient_at: menu.patient_at,
          current_spo2: menu.current_spo2,
          patient_location: menu.patient_location,
          comorbidity_conditions: menu.comorbidity_conditions,
          Priority: menu.Priority,

          loading: true,
        });
      });
    axios
      .get(`https://api.covidfrontline.net/resource/allresources`)
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

  handleSubmit(e) {
    const { _id } = this.props.match.params;

    e.preventDefault();
    if (this.validator.allValid()) {
      const menu = {
        patient_name: this.state.patient_name,
        patient_mobilenumber: this.state.patient_mobilenumber,
        patient_requirement: this.state.patient_requirement,
        patient_stage: this.state.patient_stage,
        guardian_name: this.state.guardian_name,
        guardian_mobilenumber: this.state.guardian_mobilenumber,
        addedby: this.state.addedby,

        patient_at: this.state.patient_at,
        current_spo2: this.state.current_spo2,
        patient_location: this.state.patient_location,
        comorbidity_conditions: this.state.comorbidity_conditions,
        Priority: this.state.Priority,
      };
      console.log(this.state.name, this.state.addedby);
      axios
        .put(
          `https://api.covidfrontline.net/request/update_request_patch/${_id}`,
          menu
        )
        .then(res => console.log(res.data));
      this.forceUpdate();
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
            <div className="admin-head">Edit Resource</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <Link to="/request">
                    <button className="button button-contactForm boxed-btn">
                      Back
                    </button>
                  </Link>
                </div>
                <div className="container-fluid p-0">
                  <form
                    className="form-contact contact_form"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="row m-0">
                      <div className="col-lg-12 p-0"></div>
                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Patient Name</label>
                          <input
                            className="form-control col-lg-10"
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
                          <label className="col-lg-2 p-0">
                            {" "}
                            Patient Mobile Number
                          </label>
                          <input
                            className="form-control col-lg-10"
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
                          <label className="col-lg-2 p-0">
                            Patient Requirement
                          </label>

                          <select
                            className="form-control col-lg-10"
                            name="patient_requirement"
                            onChange={this.handleChange}
                          >
                            <option>{this.state.patient_requirement}</option>
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
                          <label className="col-lg-2 p-0">Patient Stage</label>

                          <select
                            name="patient_stage"
                            id="select"
                            value={this.state.patient_stage}
                            onChange={this.handleChange}
                            className="form-control col-lg-10"
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
                          <label className="col-lg-2 p-0">Guardian Name</label>
                          <input
                            className="form-control col-lg-10"
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
                          <label className="col-lg-2 p-0">
                            {" "}
                            Guardian Mobile Number
                          </label>
                          <input
                            className="form-control col-lg-10"
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

                      {this.state.patient_at == "" ? (
                        <></>
                      ) : (
                        <>
                          <div className="col-lg-12 p-0">
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">Patient At</label>

                              <div className="col-sm-3">
                                <label className="radio-inline no-padd">
                                  <input
                                    type="radio"
                                    name="patient_at"
                                    value="Hospital"
                                    onChange={this.handleChange}
                                    checked={
                                      this.state.patient_at === "Hospital"
                                    }
                                  />
                                  Hospital
                                </label>
                              </div>
                              <div className="col-sm-3">
                                <label className="radio-inline no-padd">
                                  <input
                                    type="radio"
                                    name="patient_at"
                                    value="Home Isolation"
                                    onChange={this.handleChange}
                                    checked={
                                      this.state.patient_at === "Home Isolation"
                                    }
                                  />
                                  Home Isolation
                                </label>
                              </div>
                              <div className="col-sm-3">
                                <label className="radio-inline no-padd">
                                  <input
                                    type="radio"
                                    name="patient_at"
                                    value="At home"
                                    onChange={this.handleChange}
                                    checked={
                                      this.state.patient_at === "At home"
                                    }
                                  />
                                  At home
                                </label>
                              </div>

                              {this.validator.message(
                                "Patient At",
                                this.state.patient_at,
                                "required"
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12 p-0">
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">
                                Comorbidity conditions{" "}
                              </label>
                              <textarea
                                className="form-control col-lg-10"
                                name="comorbidity_conditions"
                                onChange={this.handleChange}
                                value={this.state.comorbidity_conditions}
                                onfocus="this.placeholder = 'Menu Name'"
                                onblur="this.placeholder = ''"
                                placeholder=""
                              />
                              {this.validator.message(
                                "Comorbidity conditions ",
                                this.state.comorbidity_conditions,
                                "required"
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12 p-0">
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">
                                Current SPO2
                              </label>
                              <input
                                className="form-control col-lg-10"
                                name="current_spo2"
                                onChange={this.handleChange}
                                value={this.state.current_spo2}
                                type="text"
                                onfocus="this.placeholder = 'Menu Name'"
                                onblur="this.placeholder = ''"
                                placeholder=""
                              />
                              {this.validator.message(
                                "Current SPO2",
                                this.state.current_spo2,
                                "required"
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12 p-0">
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">
                                Patient Location
                              </label>
                              <input
                                className="form-control col-lg-10"
                                name="patient_location"
                                onChange={this.handleChange}
                                value={this.state.patient_location}
                                type="text"
                                onfocus="this.placeholder = 'Menu Name'"
                                onblur="this.placeholder = ''"
                                placeholder=""
                              />
                              {this.validator.message(
                                "Patient Location",
                                this.state.patient_location,
                                "required"
                              )}
                            </div>
                          </div>

                          <div className="col-lg-12 p-0">
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">Priority</label>

                              <select
                                name="Priority"
                                id="select"
                                value={this.state.Priority}
                                onChange={this.handleChange}
                                className="form-control col-lg-10"
                              >
                                <option value="select">select</option>
                                <option value="Very High">Very High</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>

                              {this.validator.message(
                                "Priority",
                                this.state.Priority,
                                "required"
                              )}
                            </div>
                          </div>
                        </>
                      )}

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
            ) : (
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

export default EditRequest;
