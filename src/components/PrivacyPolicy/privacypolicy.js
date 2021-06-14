import React from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
const PER_PAGE = 10;
class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PrivatePages: [],
      currentPage: 0,
      loading: false,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://api.covidfrontline.net/privacypolicy/privacypolicys`)
      .then((res) => {
        const PrivatePages = res.data;
        console.log(PrivatePages);
        this.setState({ PrivatePages, loading: true });
      });
    this.unsubscribe = axios
      .get(`https://api.covidfrontline.net/privacypolicy/privacypolicys`)
      .then((res) => {
        const PrivatePages = res.data;
        console.log(PrivatePages);
        this.setState({ PrivatePages, loading: true });
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
            `https://api.covidfrontline.net/privacypolicy/delete_privacypolicy/${_id}`
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
  handlePageClick({ selected: selectedPage }) {
    this.setState({
      currentPage: selectedPage,
    });
  }
  render() {
    const offset = this.state.currentPage * PER_PAGE;

    const currentPageData =
      this.state.PrivatePages &&
      this.state.PrivatePages.slice(offset, offset + PER_PAGE).map(
        (PrivatePage, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>
                <Link to={`/edit_privacypolicy/${PrivatePage._id}`}>
                  <span className="btn">Edit</span>
                </Link>
                <span
                  className="btn"
                  onClick={this.deleteItem.bind(this, PrivatePage._id)}
                >
                  Delete
                </span>
              </td>
            </tr>
          );
        }
      );

    const pageCount = Math.ceil(
      this.state.PrivatePages && this.state.PrivatePages.length / PER_PAGE
    );
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Privacy Policy</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="add_privacypolicy">
                    <button className="button button-contactForm boxed-btn">
                      + Add New
                    </button>
                  </a>
                </div>
                <div className="table-responsive admin-table">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>

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

export default PrivacyPolicy;
