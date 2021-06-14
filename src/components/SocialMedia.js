import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "react-loader-spinner";

import Sidebar from "../components/sidebar";
import { isAutheticated } from "../auth";
import { TextError } from "../TextError";

export const SocialMediaDetails = (props) => {
	const {
		user: { _id: addedBy },
	} = isAutheticated();

	const history = useHistory();

	useEffect(() => {
		getSocialMediaDetails();
	}, []);

	const initialValues = {
		facebook: "",
		twitter: "",
		linkedin: "",
		instagram: "",
		youtube: "",
	};

	const [socialMediaData, setSocialMediaData] = useState(initialValues);
	const getSocialMediaDetails = () => {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/socialmedia/getsocialmedia`)
			.then(({ data: { success, message } }) => {
				success && setSocialMediaData(message);
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
		facebook: Yup.string(),
		twitter: Yup.string(),
		linkedin: Yup.string(),
		instagram: Yup.string(),
		youtube: Yup.string(),
	});

	const onSubmit = async (socialmedia) => {
		const {
			data: { success, message },
		} = await axios.patch(
			`${process.env.REACT_APP_BASE_URL}/socialmedia/updatesocialmedia/${socialMediaData._id}`,
			{
				...socialmedia,
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
				text: "Social Media Links Saved.",
				icon: "success",
				timer: 2000,
			}).then(() => {
				history.push("/view_social_media_details");
			});
	};

	const [loading, setLoading] = useState(true);

	return (
		isAutheticated() && (
			<div>
				<Sidebar></Sidebar>
				<div className="admin-wrapper col-12">
					<div className="admin-content">
						<div className="admin-head">Social Media Details</div>
						<div className="admin-data">
							<div className="col-lg-12 p-0 text-right mb-30">
								<Link to="/dashboard">
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
										initialValues={socialMediaData || initialValues}
										validationSchema={validationSchema}
										onSubmit={onSubmit}
										enableReinitialize
									>
										{(formik) => (
											<Form>
												<div className="row m-0">
													<div className="col-lg-12 p-0">
														<div className="form-group tags-field row m-0">
															<label className="col-lg-2 p-0">Facebook</label>
															<Field
																className="form-control col-lg-6"
																type="url"
																name="facebook"
															/>
															<ErrorMessage
																component={TextError}
																name="facebook"
															/>
														</div>
													</div>
												</div>
												<div className="row m-0">
													<div className="col-lg-12 p-0">
														<div className="form-group tags-field row m-0">
															<label className="col-lg-2 p-0">Twitter</label>
															<Field
																className="form-control col-lg-6"
																type="url"
																name="twitter"
															/>
															<ErrorMessage
																component={TextError}
																name="twitter"
															/>
														</div>
													</div>
												</div>
												<div className="row m-0">
													<div className="col-lg-12 p-0">
														<div className="form-group tags-field row m-0">
															<label className="col-lg-2 p-0">LinkedIn</label>
															<Field
																className="form-control col-lg-6"
																type="url"
																name="linkedin"
															/>
															<ErrorMessage
																component={TextError}
																name="linkedin"
															/>
														</div>
													</div>
												</div>
												<div className="row m-0">
													<div className="col-lg-12 p-0">
														<div className="form-group tags-field row m-0">
															<label className="col-lg-2 p-0">Instagram</label>
															<Field
																className="form-control col-lg-6"
																type="url"
																name="instagram"
															/>
															<ErrorMessage
																component={TextError}
																name="instagram"
															/>
														</div>
													</div>
												</div>
												<div className="row m-0">
													<div className="col-lg-12 p-0">
														<div className="form-group tags-field row m-0">
															<label className="col-lg-2 p-0">Youtube</label>
															<Field
																className="form-control col-lg-6"
																type="url"
																name="youtube"
															/>
															<ErrorMessage
																component={TextError}
																name="youtube"
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
