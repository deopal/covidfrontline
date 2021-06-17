import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar";
// import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
class view_Serviceprovider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// description: "",
			menu: {},
			aggrement_date: "",
			loading: true,
		};
	}
	componentDidMount() {
		const { _id } = this.props.match.params;
		console.log(_id);
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/serviceprovider/get/${_id}`)
			.then((res) => {
				const menu = res.data.data;
				const aggre_date = menu.aggrement_date ? new Date(menu.aggrement_date).toLocaleString('en-IN').split(',')[0] : '';
				console.log(menu);
				this.setState({
					menu,
					aggrement_date: aggre_date,
					loading: false,
				});
			});
	}
	render() {
		return (
			<div>
				<Sidebar></Sidebar>
				<div className="admin-wrapper col-12">
					<div className="admin-content">
						<div className="admin-head">Service Provider - View</div>
						 {!this.state.loading ? (
							<div className="admin-data">
								<div className="col-lg-12 p-0 text-right mb-30">
									<Link to="/serviceprovider">
										<button className="button button-contactForm boxed-btn">
											Back
										</button>
									</Link>
								</div>
								<div className=" admin-table">
									<table className="table table-responsive-sm">
										<tbody >
											<tr>
												<td valign="top" >
													<b>Name :</b>
												</td>
												<td style={{ textTransform: 'capitalize' }}>{this.state.menu.party_name}</td>
											</tr>
											<tr >
												<td valign="top">
													<b>Email :</b>
												</td>
												<td >{this.state.menu.email}</td>
											</tr>
											<tr >
												<td valign="top">
													<b>Contact :</b>
												</td>
												<td>{this.state.menu.contact}</td>
											</tr>
											<tr >
												<td valign="top">
													<b>Website :</b>
												</td>
												<td>{this.state.menu.website}</td>
											</tr>
											<tr >
												<td valign="top" >
													<b>Adress Line 1 :</b>
												</td>
												<td>{this.state.menu.address1}</td>
											</tr>
											<tr>
												<td valign="top">
													<b>Address Line 2 :</b>
												</td>
												<td>{this.state.menu.address2}</td>
											</tr>
											<tr >
												<td valign="top" >
													<b>Country :</b>
												</td>
												<td>{this.state.menu.country}</td>
											</tr>
											<tr >
												<td valign="top">
													<b>City :</b>
												</td>
												<td>{this.state.menu.city}</td>
											</tr>
											<tr>
												<td valign="top" >
													<b>Area :</b>
												</td>
												<td>{this.state.menu.area}</td>
											</tr><tr >
												<td valign="top" >
													<b>Logo :</b>
												</td>
												<td>{this.state.menu.logo ? <img src={this.state.menu.logo} style={{ width: '30px', height: '30px' }} /> : ''}</td>
											</tr>
											<tr >
												<td valign="top">
													<b>Category :</b>
												</td>
												<td>{this.state.menu.party_type}</td>
											</tr>
											<tr >
												<td valign="top">
													<b>Product Desc :</b>
												</td>
												<td>{this.state.menu.product}</td>
											</tr>
											<tr >
												<td valign="top" >
													<b>Facilities Desc :</b>
												</td>
												<td>{this.state.menu.facilities}</td>
											</tr>

											<tr >
												<td valign="top" >
													<b>Contract T&C :</b>
												</td>
												<td>{this.state.menu.contract}</td>
											</tr><tr >
												<td valign="top">
													<b>Agreement Date :</b>
												</td>
												<td>{this.state.aggrement_date}</td>
											</tr>
											<tr className="col-lg-12">
												<td valign="top" >
													<b>Manager :</b>
												</td>
												<td style={{ textTransform: 'capitalize' }}>{this.state.menu.manager}</td>
											</tr>
											<tr >
												<td valign="top" >
													<b>Status :</b>
												</td>
												<td>{this.state.menu.status == true ? "Active" : "Inactive"}</td>
											</tr>
											<tr >
												<td valign="top" >
													<b>Images :</b>
												</td>
												<td>{this.state.menu.images ? this.state.menu.images.map((image, i) => {
													return <img src={image} key={i} alt="" style={{ width: '30px', height: '30px', margin: 'auto', marginRight: '10px' }} />;
												}) : ''}
												</td>

											</tr>
											<tr>
												<td valign="top" >
													<b>Document :</b>
												</td>
												<td><a href={this.state.menu.document[0].image} target="_blank">{this.state.menu.document[0].name}</a> </td>

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

export default view_Serviceprovider;
