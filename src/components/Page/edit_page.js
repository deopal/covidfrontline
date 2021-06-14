import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom'
import Sidebar from "../sidebar";
import SimpleReactValidator from "simple-react-validator";
import { isAutheticated, signout } from "../../auth";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "",
      submenu: "",
      description:'',
      title:'',
      selectoption:'',
addedby:'',
      mobile_message: "",
      validError: false,
      loading: false,
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

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
      .get(`https://api.covidfrontline.net/page/update_page/${_id}`)
      .then((res) => {
        console.log(res.data);
        const post = {
          menu: res.data.menu,
          submenu: res.data.submenu,
          title: res.data.title,
          description: res.data.description,
          selectoption: res.data.selectoption,
          addedby: res.data.addedby,
        };
        console.log(post.title);
        this.setState({
          menu: post.menu,
          submenu: post.submenu,
          title: post.title,
          description: post.description,
          selectoption: post.selectoption,
          addedby: post.addedby,
          loading: true,
        });
      });
    //   const {
    //   user: { _id },
    // } = isAutheticated();
    // console.log(_id);

  this.menu();

  }
  menu(){
        const {
      user: { _id },
    } = isAutheticated();
    console.log(_id);
  axios
    .get(`https://api.covidfrontline.net/menu/menuvalues/${_id}`)
      .then(res => {
        const menus = res.data;
        console.log(menus);
        this.setState({ menus, loading: true });
      });
     axios
      .get(`https://api.covidfrontline.net/submenu/submenuvalues/${_id}`)
      .then(res => {
        const submenus = res.data;
        console.log(submenus);
        this.setState({ submenus, loading: true });
      });
  
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleChange1(html) {
    this.setState({ description: html });
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
        menu: this.state.menu,
        submenu: this.state.submenu,
         title: this.state.title,
          description: this.state.description,
           selectoption: this.state.selectoption,
        addedby: this.state.addedby,
      };
      axios
        .put(
          `https://api.covidfrontline.net/page/update_page_patch/${_id}`,
          post
        )
        .then((res) => console.log(res.data));

      this.props.history.push("/page");
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
            <div className="admin-head">Edit Page </div>
            <div className="admin-data">
              <div className="container-fluid p-0">
                <form
                  className="form-contact contact_form"
                  onSubmit={this.handleSubmit}
                >
                  <div className="row m-0">
                    <div className="col-lg-12 p-0"></div>
                  
                      <div className="col-lg-12 p-0">
                           <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Title</label>
                        <input
                          className="form-control col-lg-10"
                          name="title"
                          onChange={this.handleChange}
                          value={this.state.title}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Title"
                        />
                        {this.validator.message(
                          "Title",
                          this.state.title,
                          "required|whitespace|min:2|max:200"
                        )}
                         </div>

                    </div>
                    {this.state.selectoption==""?null:
<>
                          <div className="col-lg-12 p-0">
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-3 p-0">Select Option</label>

                          <div className="col-sm-3">
                            <label className="radio-inline no-padd">
                              <input
                                type="radio"
                                name="selectoption"
                                value="Menu"
                                onChange={this.handleChange}
                                checked={this.state.selectoption === "Menu"}
                              />{" "}
                              Menu
                            </label>
                          </div>
                          <div className="col-sm-3">
                            <label className="radio-inline no-padd">
                              <input
                                type="radio"
                                name="selectoption"
                                value="SubMenu"
                                onChange={this.handleChange}
                                checked={
                                  this.state.selectoption === "SubMenu"
                                }
                              />{" "}
                              SubMenu
                            </label>
                          </div>
                         
                        </div>
                      </div>
                    {this.state.selectoption == "Menu" ?
                    <>
                    <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Menu Name</label>

                        <select
                          className="form-control col-lg-10"
                          name="menu"
                          onChange={this.handleChange}
                        >
                          <option>{this.state.menu}</option>
                          {this.state.menus &&
                            this.state.menus.map((data, index) => {
                              return (
                                <option value={data.menu} key={index}>
                                  {data.menu}
                                </option>
                              );
                            })}
                        </select>

                      
                      </div>
                      </>:
                       
                
                       null
                  }
                    {this.state.selectoption == "SubMenu" ?
                    <>
                   <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Sub Menu Name</label>
                        <select
                          className="form-control col-lg-10"
                          name="submenu"
                          onChange={this.handleChange}
                        >
                          <option>{this.state.submenu}</option>
                          {this.state.submenus &&
                            this.state.submenus.map((data, index) => {
                              return (
                                <option value={data.submenu} key={index}>
                                  {data.submenu}
                                </option>
                              );
                            })}
                        </select>
                     
                         </div>

                    </div>
                      </>:
                       
                  null}
                  </>
                  }
                      <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Description</label>
                      
                        <ReactQuill
                          className="col-lg-10 height"
                          theme={this.state.theme}
                          onChange={this.handleChange1}
                          value={this.state.description}
                          modules={EditPage.modules}
                          formats={EditPage.formats}
                          bounds={".app"}
                          placeholder={this.props.placeholder}
                        />

                        {this.validator.message(
                          "Description",
                          this.state.description,
                          "required"
                        )}
                      </div>
                      </div>
</div>
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
          </div>
        </div>
      </div>
    );
  }
}
EditPage.modules = {
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

EditPage.formats = [
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

EditPage.propTypes = {
  placeholder: PropTypes.string,
};
export default EditPage;
