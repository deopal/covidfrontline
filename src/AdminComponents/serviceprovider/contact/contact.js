import React from "react";
import Sidebar from "../../../AdminComponents/sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import { isAutheticated, signout } from "../../../auth";
import ReactPaginate from "react-paginate";
const PER_PAGE = 10;
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      loading: false,
      id:"",
      currentPage: 0,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({id:id});

    console.log(id);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/contact/get/${id}`)
      .then(res => {
        const menus = res.data.data;
        console.log(menus);
        this.setState({ menus, loading: true });

      });
    this.unsubscribe = axios
      .get(`${process.env.REACT_APP_BASE_URL}/contact/get/${id}`)
      .then(res => {
        const menus = res.data.data;
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
    }).then(willDelete => {
      if (willDelete) {
        console.log(_id);
        axios
          .delete(
            `${process.env.REACT_APP_BASE_URL}/contact/delete/${_id}`
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
      this.state.menus &&
      this.state.menus.slice(offset, offset + PER_PAGE).map((menu, index) => {
        return (
          <>
            <tr key={index}>
              <td>{index + 1}</td>

              <td style={{textTransform:'capitalize'}}>{menu.name}</td>
              <td style={{textTransform:'capitalize'}}>{menu.designation}</td>
              <td>{menu.phone}</td>
              <td>{menu.email}</td>
              <td>{menu.primary_contact}</td>
              <td>{menu.timing}</td>

                <td>
                
                <Link to={`/edit_contact/${menu._id}`}>
                  <span className="btn btn-warning">Edit</span>
                </Link>
                <span
                  className="btn btn-danger"
                  style={{
                      borderRadius: "5px",
                      fontSize: "16px",
                      padding: "5px 15px",
                      marginRight: "2px",
                      backgroundColor: "red",
                    }}
                  onClick={this.deleteItem.bind(this, menu._id)}
                >
                  Delete
                </span>
                
              </td>
             
            </tr>
          </>
        );
      });

    const pageCount = Math.ceil(
      this.state.menus && this.state.menus.length / PER_PAGE
    );

    const id=this.state.id;

    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Contacts</div>
            {/* {this.state.loading ? ( */}
            <div className="admin-data">
              <div className="col-lg-12 p-0 text-right mb-30">
                <Link to={`/add_contact/${id}`}>
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
                      <th>Designation</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Primary Contact</th>
                      <th>Timing</th>
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

export default Contacts;
