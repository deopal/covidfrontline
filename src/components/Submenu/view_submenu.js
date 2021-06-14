import axios from "axios";
import React from "react";
import {Link} from "react-router-dom";
import Sidebar from "../../components/sidebar";
// import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
class ViewSubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    
      menu: "",
      submenu:'',
  
      loading: false,
    };
  }
   componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);
    axios
      .get(`https://api.covidfrontline.net/submenu/update_submenu/${_id}`)
      .then((res) => {
        console.log(res.data);
        const post = {
          menu: res.data.menu,
          submenu: res.data.submenu,
          addedby: res.data.addedby,
        };
        console.log(post.title);
        this.setState({
          menu: post.menu,
          submenu: post.submenu,
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
            <div className="admin-head">Sub Menu - View</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <Link to="/submenu">
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
                          <b>Sub Menu</b>
                        </td>
                        <td>{this.state.submenu}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>Menu</b>
                        </td>
                        <td>{this.state.menu}</td>
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

export default ViewSubMenu;
