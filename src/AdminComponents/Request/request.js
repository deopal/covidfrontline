import React from "react";
import Sidebar from "../../AdminComponents/sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { isAutheticated, signout } from "../../auth";
const PER_PAGE = 10;
class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      loading: false,
      currentPage: 0,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    const {
      user: { _id },
    } = isAutheticated();
    console.log(_id);
    axios
      .get(` https://api.covidfrontline.net/request/requests/${_id}`)
      .then(res => {
        const requests = res.data;
        console.log(requests);
        this.setState({ requests, loading: true });
      });
    this.unsubscribe = axios
      .get(` https://api.covidfrontline.net/request/requests/${_id}`)
      .then(res => {
        const requests = res.data;
        console.log(requests);
        this.setState({ requests, loading: true });
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
    }).then(willDelete => {
      if (willDelete) {
        console.log(_id);
        axios
          .delete(
            ` https://api.covidfrontline.net/request/delete_request/${_id}`
          )
          .then(res => {
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
      this.state.requests &&
      this.state.requests
        .slice(offset, offset + PER_PAGE)
        .map((request, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{request.patient_name}</td>
              <td>{request.patient_mobilenumber}</td>
              <td>{request.patient_requirement}</td>
              <td>
                {request.patient_at == "" ? (
                  <Link to={`/add_patient_status/${request._id}`}>
                    <span className="btn" style={{ background: "#5a6ceb" }}>
                      {" "}
                      Verify{" "}
                    </span>
                  </Link>
                ) : (
                  <>
                    {" "}
                    <span
                      className="btn btn-success btn-sm  waves-effect waves-light btn-table "
                      style={{ background: "green" }}
                    >
                      {" "}
                      Verified{" "}
                    </span>
                  </>
                )}{" "}
              </td>
              <td>
                {/* {request.status == true ? (
                  <button
                    onClick={e => {
                      e.preventDefault();

                      axios
                        .get(
                          ` https://api.covidfrontline.net/request/Inactivate/${request._id}`
                        )
                        .then(function (response) {
                          window.location.reload();
                          alert("request is Completed!");
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
                    Pending
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      e.preventDefault();

                      axios
                        .get(
                          ` https://api.covidfrontline.net/request/Activate/${request._id}`
                        )
                        .then(function (response) {
                          window.location.reload();
                          alert("request is Pending!");
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
                    Completed
                  </button>
                )} */}
                {request.status == true ? (
                  <Link to={`/edit_request/${request._id}`}>
                    <span className="btn">Update</span>
                  </Link>
                ) : (
                  <Link to={`/view_request/${request._id}`}>
                    <span className="btn">View</span>
                  </Link>
                )}
                {/* <span
                  className="btn"
                  onClick={this.deleteItem.bind(this, request._id)}
                >
                  Delete
                </span> */}
              </td>
              {/* {request.status == true ? (
                <td>
                  <span
                    className="badge badge-pill badge-soft-success font-size-12"
                    style={{ fontSize: "16px" }}
                  >
                    Pending
                  </span>
                </td>
              ) : (
                <td>
                  <span
                    className="badge badge-pill badge-soft-success font-size-12"
                    style={{ fontSize: "16px" }}
                  >
                    Completed
                  </span>
                </td>
              )} */}

              {request.status == true ? (
                <td>
                  <button
                    onClick={e => {
                      e.preventDefault();

                      axios
                        .get(
                          ` https://api.covidfrontline.net/request/Inactivate/${request._id}`
                        )
                        .then(function (response) {
                          window.location.reload();
                          alert("Are you sure you want to close the case?");
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
                    Close Case
                  </button>
                </td>
              ) : (
                <td>
                  <span
                    className="badge badge-pill badge-soft-success font-size-12"
                    style={{ fontSize: "16px" }}
                  >
                    Case Closed
                  </span>
                </td>
              )}
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.requests && this.state.requests.length / PER_PAGE
    );
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Requests</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <Link to="/add_request">
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
                        <th>Patient Name</th>
                        <th>Patient Mobile</th>
                        <th>Requirement</th>
                        <th>Verify</th>
                        <th>Action</th>

                        <th>Case Status</th>
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

export default Request;
