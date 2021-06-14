import React from "react";
import Sidebar from "./sidebar";
import axios from "axios";
import { isAutheticated, signout } from "../auth";
const PER_PAGE = 10;
class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      loading:false,
      posts: [],
    };
  }

  componentDidMount(){
    const {
      user: { _id },
    } = isAutheticated();

    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/update_adminusers/${_id}`).then((res) => {
      const user = res.data;
      console.log(user);
      this.setState({ user, loading: true });
    });

  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>

        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Dashboard</div>
            <div className="admin-data">
              <div className="row">
                <div className="col-md-6 col-xl-4 dashboard">
                  <div className="card mb-3 h-100">
                    <div className="text-white dashboard_box bg-color-1">
                      <div className="widget-heading">
                        <span style={{textTransform:'capitalize'}}>
                          {this.state.user.name}
                        </span>
                        <br />
                        <p>
                        {this.state.user.city}
                          <br />{this.state.user.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-xl-4 dashboard">
                  <div className="card mb-3 h-100">
                    <div className="text-white dashboard_box bg-color-2">
                      <div className="widget-heading">
                        <p>
                          <img src="../assets/img/icon/enquiry-icon-two.png" />
                        </p>
                        Total Posts<span>{this.state.posts.length}</span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
