import axios from "axios";
import React from "react";
import Sidebar from "../../components/sidebar";
import SimpleReactValidator from "simple-react-validator";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "react-loader-spinner";
class PrivacyPolicyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      theme: "snow",
      mobile_message: "",
      validError: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.onChange = this.onChange.bind(this);

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
      .get(
        `https://api.covidfrontline.net/privacypolicy/update_privacypolicy/60a2573033be630015d6fcad`
      )
      .then((res) => {
        console.log(res.data);
        const private1 = {
          description: res.data.description,
        };

        this.setState({
          description: private1.description,
          loading: true,
        });
      });
  }

  handleChange(html) {
    this.setState({ description: html });
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  handleSubmit(e) {
    const { _id } = this.props.match.params;
    e.preventDefault();
    if (this.validator.allValid()) {
      const post = {
        description: this.state.description,
      };
      axios
        .put(
          `https://api.covidfrontline.net/privacypolicy/update_privacypolicy_patch/60a2573033be630015d6fcad`,
          post
        )
        .then((res) => console.log(res.data));
      this.setState({ mobile_message: "Text Updated Sucessfully" });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const divStyle = {
      height: "400px",
    };
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head"> Privacy Policy</div>
            {this.state.loading ? (
              <div className="admin-data">
                {this.state.mobile_message == "" ? (
                  <></>
                ) : (
                  <div className="col-lg-12 p-0 text-right mb-30">
                    <a href="#">
                      <button className="button button-contactForm boxed-btn">
                        {this.state.mobile_message}
                      </button>
                    </a>
                  </div>
                )}
                <div className="container-fluid p-0">
                  <form
                    className="form-contact contact_form"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="row m-0">
                      <div className="col-lg-12 p-0"></div>
                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Description</label>
                          {/* <textarea
                          className="form-control col-lg-10"
                          name="description"
                          onChange={this.onChange}
                          value={this.state.description}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        /> */}
                          <ReactQuill
                            className=" col-lg-10 height"
                            theme={this.state.theme}
                            onChange={this.handleChange}
                            value={this.state.description}
                            modules={PrivacyPolicyPage.modules}
                            formats={PrivacyPolicyPage.formats}
                            bounds={".app"}
                            placeholder={this.props.placeholder}
                            style={divStyle}
                          />

                          {this.validator.message(
                            "Description",
                            this.state.description,
                            "required"
                          )}
                        </div>
                      </div>

                      <br />
                      <hr />

                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field  row m-0">
                          <label className="col-lg-2 p-0" />
                          <div className="col-lg-6 p-0">
                            <button
                              className="button button-contactForm boxed-btn margin"
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
                  color="#0029ff"
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
PrivacyPolicyPage.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

PrivacyPolicyPage.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

PrivacyPolicyPage.propTypes = {
  placeholder: PropTypes.string,
};
export default PrivacyPolicyPage;
