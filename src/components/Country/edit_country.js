import axios from "axios";
import React from "react";
import Sidebar from "../../components/sidebar";
import Loader from "react-loader-spinner";
import SimpleReactValidator from "simple-react-validator";
import { isAutheticated, signout } from "../../auth";
import { Link } from "react-router-dom";
const getCountriesList = require("countrycitystatejson");
class EditCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      countryName: getCountriesList.getCountries(),
      stateName: [],
      cityName: [],
      selectedCountry: "",
      selectedCountryName: "",
      mobile_message: "",
      validError: false,
      loading: false,
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
      .get(`https://api.covidfrontline.net/country/update_country/${_id}`)
      .then((res) => {
        console.log(res.data);
        const menu = {
          country: res.data.country,
        };

        this.setState({
          country: menu.country,
          loading: true,
        });
      });
  }
  setCountryName = (e) => {
    let index = e.target.selectedIndex;
    let el = e.target.childNodes[index];
    let option = el.getAttribute("id");
    let selectedCountryName = e.target.value;

    const statesList = getCountriesList.getStatesByShort(option);
    // console.log(statesList);

    this.setState(
      {
        stateName: statesList,
        selectedCountry: option,
        country: selectedCountryName,
      },
      () => {
        console.log(this.state.stateName, "stateName");
      }
    );

    //console.log(this.state.stateName);
  };
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
        country: this.state.country,
      };

      axios
        .put(
          `https://api.covidfrontline.net/country/update_country_patch/${_id}`,
          menu
        )
        .then((res) => console.log(res.data));
      this.forceUpdate();
      this.props.history.push("/countries");
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
            <div className="admin-head">Edit Country</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <Link to="/countries">
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
                          <label className="col-lg-2 p-0">country Name</label>
                          {/* <input
                            className="form-control col-lg-10"
                            name="country"
                            onChange={this.handleChange}
                            value={this.state.country}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          /> */}
                          <select
                            className="form-control col-lg-10"
                            name="country"
                            value={this.state.country}
                            onChange={this.setCountryName}
                          >
                            <option>Select Country</option>
                            {this.state.countryName.map((data, index) => {
                              return (
                                <option
                                  value={data.name}
                                  id={data.shortName}
                                  key={index}
                                >
                                  {data.name}
                                </option>
                              );
                            })}
                          </select>
                          {this.validator.message(
                            " country Name",
                            this.state.country,
                            "required|whitespace|min:1|max:20"
                          )}
                          {this.state.mobile_message}
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

export default EditCountry;
