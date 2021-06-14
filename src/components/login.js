import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

function Login() {
	const history = useHistory();

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Please provide valid email format")
			.required("Email is required"),
		password: Yup.string().required("Password is Required"),
	});

	const onSubmit = (values, actions) => {
		axios
			.post(
				`${process.env.REACT_APP_BASE_URL}/superadmin/superadminlogin`,
				values
			)
			.then((res) => {
				const {
					user: { isFirstLogin },
				} = res.data;
				sessionStorage.setItem("user", JSON.stringify(res.data));
				isFirstLogin
					? history.push("/change_password")
					: history.push("/dashboard");
			})
			.catch((err) => {
				if (err) actions.setFieldError("password", "Invalid Credentials");
				actions.setSubmitting(false);
			});
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<div>
			<div className="h-100 w-100 bg-color">
				<div className="login-box">
					<div className="login-logo">
						<span>
							<strong style={{ fontSize: "20px" }}>
								COVID HELP - SUPER ADMIN
							</strong>
						</span>
						<img src="/assets/img/covid_logo.png" />
						{/* <img src="assets/img/logo/deepthoughtlogo.svg" alt="COVID HELP"/> */}
					</div>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						{(formik) => (
							<Form>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<Field
												type="email"
												className="form-control"
												name="email"
												placeholder="Enter email"
											/>
											<ErrorMessage name="email" />
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-group">
											<Field
												type="password"
												className="form-control"
												name="password"
												placeholder="Enter password"
											/>
											<ErrorMessage name="password" />
										</div>
									</div>
								</div>
								<div className="form-group mt-3 mb-0">
									<div className="w-100 btn  boxed-btn">
										<Button
											type="submit"
											className="btn boxed-btn"
											fullWidth
											diabled={!formik.isSubmitting}
										>
											{formik.isSubmitting ? `Loading` : `Submit`}
										</Button>
									</div>
									<p>
										If you want to login as Admin ?{" "}
										<Link to="/adminlogin">Admin Login</Link>
									</p>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default Login;
