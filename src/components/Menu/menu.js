import React from "react";
import Sidebar from "../../components/sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { isAutheticated, signout } from "../../auth";
const PER_PAGE = 10;
class Menu extends React.Component {
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
		const {
			user: { _id },
		} = isAutheticated();
		console.log(_id);
		axios
			.get(`https://api.covidfrontline.net/menu/menuvalues/${_id}`)
			.then((res) => {
				const menus = res.data;
				console.log(menus);
				this.setState({ menus, loading: true });
			});
		this.unsubscribe = axios
			.get(`https://api.covidfrontline.net/menu/menuvalues/${_id}`)
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
					.delete(`https://api.covidfrontline.net/menu/delete_menu/${_id}`)
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
					<tr key={index}>
						<td>{index + 1}</td>

						<td>{menu.menu}</td>

						<td>
							<Link to={`/edit_menu/${menu._id}`}>
								<span className="btn">Edit</span>
							</Link>
							<Link to={`/view_menu/${menu._id}`}>
								<span className="btn">View</span>
							</Link>
							<span
								className="btn"
								onClick={this.deleteItem.bind(this, menu._id)}
							>
								Delete
							</span>
						</td>
					</tr>
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
						<div className="admin-head">Menu</div>
						{this.state.loading ? (
							<div className="admin-data">
								<div className="col-lg-12 p-0 text-right mb-30">
									<Link to="/add_menu">
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

export default Menu;
