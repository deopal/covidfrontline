import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import Sidebar from "../sidebar";
import { isAutheticated } from "../../auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextError } from "../../TextError";
import swal from "sweetalert";

export const AddPharma = () => {
	const {
		user: { _id: addedBy },
	} = isAutheticated();

	const history = useHistory();

	const initialValues = {
		resource: "",
	};

	const validationSchema = Yup.object({
		resource: Yup.string()
			.min("5", "Minumum 5 characters required")
			.max("50", "Maximum of 50 characters required")
			.required("This field is required"),
	});

	const onSubmit = async (resource) => {
		const {
			data: { success, message },
		} = await axios.post(`${process.env.REACT_APP_BASE_URL}/pharma/add`, {
			...resource,
			addedBy,
		});
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
				text: "Pharma Saved.",
				icon: "success",
				timer: 2000,
			}).then(() => {
				history.push("/pharma");
			});
	};

	return (
		isAutheticated() && (
			<div>
				<Sidebar></Sidebar>
				<div className="admin-wrapper col-12">
					<div className="admin-content">
						<div className="admin-head">Pharma - Add New</div>
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
														<label className="col-lg-2 p-0">Pharma Name</label>
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
