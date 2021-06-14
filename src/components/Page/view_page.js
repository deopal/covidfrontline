import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom'
import Sidebar from "../../components/sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
class ViewPage extends React.Component {
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
  

  }
 

  render() {
    return (
       <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Menu - View</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <Link to="/menu">
                    <button className="button button-contactForm boxed-btn">
                      Back
                    </button>
                  </Link>
                </div>
                <div className="table-responsive admin-table demo">
                  <table>
                    <tbody>
                         <tr>
                        <td valign="top" width="150px;">
                          <b>Title</b>
                        </td>
                        <td>{this.state.title}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>Menu</b>
                        </td>
                        <td>{this.state.menu}</td>
                      </tr>
                       <tr>
                        <td valign="top" width="150px;">
                          <b>Sub Menu</b>
                        </td>
                        <td>{this.state.submenu}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>Description</b>
                        </td>
                        <td>{renderHTML(this.state.description)}</td>
                      </tr>
                    
                    </tbody>
                  </table>
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

export default ViewPage;
