import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import swal from "sweetalert";

import Sidebar from "../sidebar";

export const ViewInstitutionDetails = (props) => {
	const [loading, setLoading] = useState(true);
	const [institutionData, setInstitutionData] = useState();

	useEffect(() => {
		const getInstitutionDetails = () => {
			axios
				.get(
					`${process.env.REACT_APP_BASE_URL}/institutiondetails/getinstitutiondetails/${props.match.params._id}`
				)
				.then(({ data: { success, message } }) => {
					success && setInstitutionData(message);
					success && setLoading(false);
					!success &&
						swal({
							title: "Invalid Details",
							text: message,
							icon: "error",
							timer: 2000,
						});
				});
		};
		getInstitutionDetails();
	}, []);

	return (
		<div>
			<Sidebar></Sidebar>
			<div className="admin-wrapper col-12">
				<div className="admin-content">
					<div className="admin-head">Institution Details - View</div>
					{loading ? (
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
					) : (
						<div className="admin-data">
							<div className="col-lg-12 p-0 text-right mb-30">
								<Link to="/institution_details">
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
												<b>Institution Name</b>
											</td>
											<td>{institutionData.institutionName}</td>
										</tr>
										<tr>
											<td valign="top" width="150px;">
												<b>Institution Address 1</b>
											</td>
											<td>{institutionData.addressLine1}</td>
										</tr>
										<tr>
											<td valign="top" width="150px;">
												<b>Institution Address 2</b>
											</td>
											<td>{institutionData.addressLine2}</td>
										</tr>
										<tr>
											<td valign="top" width="150px;">
												<b>Institution City</b>
											</td>
											<td>{institutionData.city}</td>
										</tr>
										<tr>
											<td valign="top" width="150px;">
												<b>Institution State</b>
											</td>
											<td>{institutionData.state}</td>
										</tr>
										<tr>
											<td valign="top" width="150px;">
												<b>Institution Pincode</b>
											</td>
											<td>{institutionData.pincode}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
