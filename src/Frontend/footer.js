import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import MenuList from "./menulist";
class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			PrivatePages: "",
			menus: [],
			socialmedia: {},
			institutiondetails: {},
		};
	}
	componentDidMount() {
		axios
			.get(`https://deepthoughts-nodejs.herokuapp.com/private/privatepages`)
			.then((res) => {
				const PrivatePages = res.data;
				this.setState({ ...this.state, PrivatePages: PrivatePages });
			});
		axios.get(`https://api.covidfrontline.net/menu/menus`).then((res) => {
			const menus = res.data;
			this.setState({ ...this.state, menus: menus });
		});
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/socialmedia/getsocialmedia`)
			.then(({ data: { success, message } }) => {
				success && this.setState({ ...this.state, socialmedia: message });
			});
		axios
			.get(
				`${process.env.REACT_APP_BASE_URL}/institutiondetails/getinstitutiondetails/60b9292508770f08fc6c94ad`
			)
			.then(({ data: { success, message } }) => {
				success &&
					this.setState({ ...this.state, institutiondetails: message });
			});
	}

	render() {
		return (
			<footer>
				<div className="bg12 footer-space">
					<div className="container">
						<div className="row">
							<div className="footer-box-1 col-lg-3 col-md-3 p-b-20 p-l-0">
								<div className="footer-menu">
									<h1>COVID FRONTLINE</h1>
									<p>
										<ul>
											<li>
												<h4>{this.state.institutiondetails.institutionName}</h4>
												<p>{this.state.institutiondetails.addressLine1}</p>
												<p>{this.state.institutiondetails.addressLine2}</p>
												<p>
													{this.state.institutiondetails.city},
													{this.state.institutiondetails.state} -{" "}
													{this.state.institutiondetails.pincode}
												</p>
											</li>
										</ul>
									</p>
								</div>
							</div>
							<div className="footer-box-2 col-lg-3 col-md-3 p-b-20 p-l-0">
								<div className="footer-menu">
									<h1>Links</h1>
									<p>
										<ul>
											{this.state.menus.map(({ menu }) => (
												<li>
													<Link to={`/MenuList/${menu}`}>{menu}</Link>
												</li>
											))}
										</ul>
									</p>
								</div>
							</div>
							<div className="footer-box-2 col-lg-3 col-md-3 p-b-20 p-l-0">
								<div className="footer-menu">
									<h1>Compliance</h1>
									<p>
										<ul>
											<li>
												<Link to="/privacy_policy">Privacy Policy</Link>
											</li>
											<li>
												<Link to="/terms_of_services">Terms Of Services</Link>
											</li>
											<li>
												<Link to="/gdpr_policy">GDPR Policy</Link>
											</li>
											<li>
												<Link to="/cookie_policy">Cookie Policy</Link>
											</li>
											<li>
												<Link to="/development_roadmap">
													Development Roadmap
												</Link>
											</li>
										</ul>
									</p>
								</div>
							</div>

							<div className="footer-box-2 col-lg-3 col-md-3 p-b-20">
								<div className="footer-menu">
									<h1>Social Media</h1>
									<ul className="d-flex flex-column">
										<li>
											{this.state.socialmedia.facebook && (
												<a
													href={`${this.state.socialmedia.facebook}`}
													target="_blank"
													className="p-1"
												>
													Facebook
												</a>
											)}
										</li>
										<li>
											{this.state.socialmedia.twitter && (
												<a
													href={`${this.state.socialmedia.twitter}`}
													target="_blank"
													className="p-1"
												>
													Twitter
												</a>
											)}
										</li>
										<li>
											{this.state.socialmedia.linkedin && (
												<a
													href={`${this.state.socialmedia.linkedin}`}
													target="_blank"
													className="p-1"
												>
													LinkedIn
												</a>
											)}
										</li>
										<li>
											{this.state.socialmedia.instagram && (
												<a
													href={`${this.state.socialmedia.instagram}`}
													target="_blank"
													className="p-1"
												>
													Instagram
												</a>
											)}
										</li>
										<li>
											{this.state.socialmedia.youtube && (
												<a
													href={`${this.state.socialmedia.youtube}`}
													target="_blank"
													className="p-1"
												>
													Youtube
												</a>
											)}
										</li>
									</ul>
								</div>
							</div>

							{/* <div className="footer-box-3 col-lg-2 col-md-3 p-b-20 p-r-0">
                <div className="footer-menu">
                  <h1>Resources</h1>
                  <ul>
                    <li>
                      <Link to="">Impact</Link>
                    </li>
                    <li>
                      <Link to="">Revolution</Link>
                    </li>
                    <li>
                      <Link to="">Blogs</Link>
                    </li>
                  </ul>
                </div>
              </div> */}
							{/* <div className="footer-box-3 col-lg-2 col-md-3 p-b-20 p-r-0">
                <div className="footer-menu">
                  <h1>Private Pages</h1>
                  <ul>
                    {this.state.PrivatePages &&
                      this.state.PrivatePages.map((page, index) => {
                        return (
                          <li key={index}>
                            <a
                              href={`/Privatepage/${
                                page._id
                              }/${page.title.replace(/\s/g, "_")}`}
                            >
                              {page.title}
                            </Link>
                          
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div> */}
						</div>
					</div>
				</div>

				<div className="bg12">
					<div className="container size-h-4 p-tb-15 bdr-top-fotter">
						<div className="row">
							<span className="f1-s-1 cl0 txt-left col-md-6 p-0 line-copy">
								An initiative of{" "}
								<a href="https://kp.foundation" target="_blank">
									KP Foundation
								</a>
							</span>
							<span className="f1-s-1 cl0 txt-right col-md-6 p-0">
								<ul className="social-links">
									<li>
										<Link to="#">
											<i className="fa fa-twitter"></i>
										</Link>
									</li>
									<li>
										<Link to="#">
											<i className="fa fa-facebook-f"></i>
										</Link>
									</li>
									<li>
										<Link to="#">
											<i className="fa fa-google-plus"></i>
										</Link>
									</li>
								</ul>
							</span>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
