import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import Sidebar from "../sidebar";
import { isAutheticated, signout } from "../../auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextError } from "../../TextError";
import swal from "sweetalert";

export const AddInstitutionDetails = () => {
	const {
		user: { _id: addedBy },
	} = isAutheticated();

	const [cities, setCities] = useState([]);
	const history = useHistory();

	const getCities = () => {
		axios.get(`${process.env.REACT_APP_BASE_URL}/city/allcity`).then((res) => {
			const Cities = res.data;
			setCities(Cities);
		});
	};

	useEffect(() => {
		getCities();
	}, []);

	const initialValues = {
		institutionName: "",
		addressLine1: "",
		addressLine2: "",
		city: "",
		state: "",
		pincode: "",
	};

	const validationSchema = Yup.object({
		institutionName: Yup.string()
			.min("10", "Minumum 10 characters required")
			.max("50", "Maximum of 50 characters required")
			.required("Instituiton Name is required"),
		addressLine1: Yup.string()
			.min("10", "Minumum 10 characters required")
			.max("50", "Maximum of 50 characters required")
			.required("Address is required"),
		addressLine2: Yup.string()
			.min("10", "Minumum 10 characters required")
			.max("50", "Maximum of 50 characters required")
			.required("Address is required"),
		city: Yup.string().required("City is required"),
		state: Yup.string()
			.min("3", "Minumum 3 characters required")
			.max("50", "Maximum of 50 characters required")
			.required("State name is required"),
		pincode: Yup.string()
			.min("6", "Minumum 6 characters required")
			.max("10", "Maximum of 10 characters required")
			.required("Pincode is required"),
	});

	const onSubmit = async (institution) => {
		const {
			data: { success, message },
		} = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/institutiondetails/addinstitutiondetails`,
			{
				...institution,
				addedBy,
			}
		);
		!success &&
			swal(
				swal({
					title: "Invalid Details",
					text: message,
					icon: "error",
					timer: 2000,
				})
			);
		success &&
			swal({
				title: "Saved",
				text: "Institution Details Saved.Redirecting to the Dashboard",
				icon: "success",
				timer: 2000,
			}).then(() => {
				history.push("/institution_details");
			});
	};

	return (
		isAutheticated() && (
			<div>
				<Sidebar></Sidebar>
				<div className="admin-wrapper col-12">
					<div className="admin-content">
						<div className="admin-head">Institution Details - Add New</div>
						<div className="admin-data">
							<div className="container-fluid p-0">
								<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={onSubmit}
								>
									{(formik) => (
										<Form>
											<div className="row m-0">
												<div className="col-lg-12 p-0">
													<div className="form-group tags-field row m-0">
														<label className="col-lg-2 p-0">
															Institution Name
														</label>
														<Field
															className="form-control col-lg-6"
															type="text"
															name="institutionName"
														/>
														<ErrorMessage
															component={TextError}
															name="institutionName"
														/>
													</div>
												</div>
											</div>
											<div className="row m-0">
												<div className="col-lg-12 p-0">
													<div className="form-group tags-field row m-0">
														<label className="col-lg-2 p-0">
															Address Line 1
														</label>
														<Field
															className="form-control col-lg-6"
															type="text"
															name="addressLine1"
														/>
														<ErrorMessage
															component={TextError}
															name="addressLine1"
														/>
													</div>
												</div>
											</div>
											<div className="row m-0">
												<div className="col-lg-12 p-0">
													<div className="form-group tags-field row m-0">
														<label className="col-lg-2 p-0">
															Address Line 2
														</label>
														<Field
															className="form-control col-lg-6"
															type="text"
															name="addressLine2"
														/>
														<ErrorMessage
															component={TextError}
															name="addressLine2"
														/>
													</div>
												</div>
											</div>
											<div className="row m-0">
												<div className="col-lg-12 p-0">
													<div className="form-group tags-field row m-0">
														<label className="col-lg-2 p-0">City</label>
														<Field
															className="form-control col-lg-6"
															type="text"
															name="city"
															as="select"
														>
															<option value="">Select City</option>
															{cities.map(({ city }, index) => (
																<option key={index} value={city}>
																	{city}
																</option>
															))}
														</Field>
														<ErrorMessage component={TextError} name="city" />
													</div>
												</div>
											</div>
											<div className="row m-0">
												<div className="col-lg-12 p-0">
													<div className="form-group tags-field row m-0">
														<label className="col-lg-2 p-0">State</label>
														<Field
															className="form-control col-lg-6"
															type="text"
															name="state"
														/>
														<ErrorMessage component={TextError} name="state" />
													</div>
												</div>
											</div>
											<div className="row m-0">
												<div className="col-lg-12 p-0">
													<div className="form-group tags-field row m-0">
														<label className="col-lg-2 p-0">Pincode</label>
														<Field
															className="form-control col-lg-6"
															type="text"
															name="pincode"
														/>
														<ErrorMessage
															component={TextError}
															name="pincode"
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
																disabled={!formik.isValid}
															>
																{formik.isSubmitting ? `Saving..` : `Save`}
															</button>
														</div>
													</div>
												</div>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};
