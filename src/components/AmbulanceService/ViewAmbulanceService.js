import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import swal from "sweetalert";

import Sidebar from "../sidebar";

export const ViewAmbulanceService = (props) => {
	const [loading, setLoading] = useState(true);
	const [ambulanceService, setAmbulanceService] = useState(null);

	useEffect(() => {
		const getAmbulanceService = () => {
			axios
				.get(
					`${process.env.REACT_APP_BASE_URL}/ambulanceservice/get/${props.match.params._id}`
				)
				.then(({ data: { success, message } }) => {
					success && setAmbulanceService(message);
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
		getAmbulanceService();
	}, []);

	return (
		<div>
			<Sidebar></Sidebar>
			<div className="admin-wrapper col-12">
				<div className="admin-content">
					<div className="admin-head">Ambulance Service - View</div>
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
								<Link to="/ambulance_service">
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
												<b>Ambulance Service Name</b>
											</td>
											<td>{ambulanceService.resource}</td>
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
