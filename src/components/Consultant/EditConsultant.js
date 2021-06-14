import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "react-loader-spinner";

import Sidebar from "../sidebar";
import { isAutheticated } from "../../auth";
import { TextError } from "../../TextError";

export const EditConsultant = (props) => {
	const {
		user: { _id: addedBy },
	} = isAutheticated();

	const history = useHistory();

	useEffect(() => {
		getConsultants();
	}, []);

	const initialValues = {
		resource: "",
	};

	const [consultant, setConsultant] = useState(initialValues);
	const getConsultants = () => {
		axios
			.get(
				`${process.env.REACT_APP_BASE_URL}/consultants/get/${props.match.params._id}`
			)
			.then(({ data: { success, message } }) => {
				success && setConsultant(message);
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

	const validationSchema = Yup.object({
		resource: Yup.string()
			.min("5", "Minumum 5 characters required")
			.max("50", "Maximum of 50 characters required")
			.required("Field is required"),
	});

	const onSubmit = async (resource) => {
		const {
			data: { success, message },
		} = await axios.patch(
			`${process.env.REACT_APP_BASE_URL}/consultants/update/${props.match.params._id}`,
			{
				...resource,
				addedBy,
			}
		);
		!success &&
			swal({
				title: "Invalid Details",
				text: message,
				icon: "error",
				timer: 2000,
			});
		success &&
			swal({
				title: "Saved",
				text: "Consultant Saved.",
				icon: "success",
				timer: 2000,
			}).then(() => {
				history.push("/consultant");
			});
	};

	const [loading, setLoading] = useState(true);

	return (
		isAutheticated() && (
			<div>
				<Sidebar></Sidebar>
				<div className="admin-wrapper col-12">
					<div className="admin-content">
						<div className="admin-head">Consultant - Edit</div>
						<div className="admin-data">
							<div className="col-lg-12 p-0 text-right mb-30">
								<Link to="/consultant">
									<button className="button button-contactForm boxed-btn">
										Back
									</button>
								</Link>
							</div>
							<div className="container-fluid p-0">
								{loading ? (
									<div style={{ marginLeft: "500px", marginTop: "200px" }}>
										{" "}
										<Loader
											type="Circles"
											color="#f39510"
											height={100}
											width={100}
											timeout={5000} //3 secs
										/>
									</div>
								) : (
									<Formik
										initialValues={consultant || initialValues}
										validationSchema={validationSchema}
										onSubmit={onSubmit}
										enableReinitialize
									>
										{(formik) => (
											<Form>
												<div className="row m-0">
													<div className="col-lg-12 p-0">
														<div className="form-group tags-field row m-0">
															<label className="col-lg-2 p-0">
																Consultant Name
															</label>
															<Field
																className="form-control col-lg-6"
																type="text"
																name="resource"
															/>
															<ErrorMessage
																component={TextError}
																name="resource"
															/>
														</div>
													</div>
												</div>
												<div className="row m-0">
													<div className="col-lg-12 p-0">
														<div className="form-group tags-field  row m-0">
															<label className="col-lg-2 p-0" />
															<div className="col-lg-6 p-0">
																<button
																	type="submit"
																	className="button button-contactForm boxed-btn margin"
																	type="submit"
																>
																	{formik.isSubmitting ? `Saving...` : `Save`}
																</button>
															</div>
														</div>
													</div>
												</div>
											</Form>
										)}
									</Formik>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};
