import React from "react";
import Sidebar from "../../components/sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import ReactPaginate from "react-paginate";
const PER_PAGE = 10;
class AdministratorUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      loading: false,
      currentPage: 0,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5050/administrator/AdministratorUsersList`)
      .then((res) => {
        const menus = res.data;
        console.log(menus);
        this.setState({ menus, loading: true });
      });
    this.unsubscribe = axios
      .get(`http://localhost:5050/administrator/AdministratorUsersList`)
      .then((res) => {
        const menus = res.data;
        console.log(menus);
        this.setState({ menus, loading: true });
      });
  }
  handlePageClick({ selected: selectedPage }) {
    this.setState({
      currentPage: selectedPage,
    });
  }
  deleteItem(_id) {
    swal({
      title: "Are you sure?",
      text: "Do your really want to remove?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(_id);
        axios
          .delete(
            `http://localhost:5050/administrator/delete_administratorusers/${_id}`
          )
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
        this.componentDidMount();
      } else {
      }
    });
  }
  render() {
    const styles = { height: 400, width: "100%" };
    const offset = this.state.currentPage * PER_PAGE;

    const currentPageData =
      this.state.menus &&
      this.state.menus.slice(offset, offset + PER_PAGE).map((menu, index) => {
        return (
          <>
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{menu.name}</td>
              <td>{menu.city}</td>

              {menu.status == true ? (
                <td>
                  <span
                    className="badge badge-pill badge-soft-success font-size-12"
                    style={{ fontSize: "16px" }}
                  >
                    Live
                  </span>
                </td>
              ) : (
                <td>
                  <span
                    className="badge badge-pill badge-soft-success font-size-12"
                    style={{ fontSize: "16px" }}
                  >
                    Suspended
                  </span>
                </td>
              )}
              <td>
                {menu.status == true ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      axios
                        .get(
                          `http://localhost:5050/administrator/suspenduser/${menu._id}`
                        )
                        .then(function (response) {
                          window.location.reload();
                          alert("Admin User is Suspended!");
                        })
                        .catch(function (error) {
                          // handle error
                          console.log(error);
                        });
                    }}
                    className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                    style={{
                      borderRadius: "5px",
                      fontSize: "16px",
                      padding: "5px 15px",
                      marginRight: "2px",
                      backgroundColor: "red",
                    }}
                  >
                    Suspend
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      axios
                        .get(
                          `http://localhost:5050/administrator/makeliveuser/${menu._id}`
                        )
                        .then(function (response) {
                          window.location.reload();
                          alert("Admin User is Live!");
                        })
                        .catch(function (error) {
                          // handle error
                          console.log(error);
                        });
                    }}
                    className="btn btn-success btn-sm  waves-effect waves-light btn-table "
                    style={{
                      borderRadius: "5px",
                      fontSize: "16px",
                      padding: "5px 15px",
                      marginRight: "2px",
                    }}
                  >
                    Make Live
                  </button>
                )}
                <span
                  className="btn"
                  onClick={this.deleteItem.bind(this, menu._id)}
                >
                  Delete
                </span>
                {/* <Link to={`/edit_adminuser/${menu._id}`}>
                  <span className="btn">Edit</span>
                </Link> */}
              </td>
              {/* <td>
                <Link to={`/edit_adminuser/${menu._id}`}>
                <span className="btn">Edit</span>
              </Link>
                <span
                  className="btn"
                  onClick={this.deleteItem.bind(this, menu._id)}
                >
                  Delete
                </span>
              </td> */}
            </tr>
          </>
        );
      });

    const pageCount = Math.ceil(
      this.state.menus && this.state.menus.length / PER_PAGE
    );
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Admin Users</div>
            {/* {this.state.loading ? ( */}
            <div className="admin-data">
              <div className="col-lg-12 p-0 text-right mb-30">
                <Link to="/add_administratoruser">
                  <button className="button button-contactForm boxed-btn">
                    + Add New
                  </button>
                </Link>
              </div>
              <div className="table-responsive admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>

                      <th>City</th>

                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{currentPageData}</tbody>
                </table>
              </div>
              <div className="paginationstyle">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={this.handlePageClick.bind(this)}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                />
              </div>
            </div>
            {/* ) : (
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
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default AdministratorUsers;
