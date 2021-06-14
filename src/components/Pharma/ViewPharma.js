import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import swal from "sweetalert";

import Sidebar from "../sidebar";

export const ViewPharma = (props) => {
	const [loading, setLoading] = useState(true);
	const [pharma, setPharma] = useState(null);

	useEffect(() => {
		const getPharma = () => {
			axios
				.get(
					`${process.env.REACT_APP_BASE_URL}/pharma/get/${props.match.params._id}`
				)
				.then(({ data: { success, message } }) => {
					success && setPharma(message);
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
		getPharma();
	}, []);

	return (
		<div>
			<Sidebar></Sidebar>
			<div className="admin-wrapper col-12">
				<div className="admin-content">
					<div className="admin-head">Pharma - View</div>
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
								<Link to="/pharma">
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
												<b>Pharma Name</b>
											</td>
											<td>{pharma.resource}</td>
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
