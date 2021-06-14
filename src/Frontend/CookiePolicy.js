import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import renderHTML from "react-render-html";
import Header from "./header";
import Footer from "./footer";
import { Link, withRouter } from "react-router-dom";
class CookiePolicy extends React.Component {
	constructor(props) {
		super(props);
		this.state = { title: "", description: "", loading: false };
	}

	componentDidMount() {
		axios.get(
			`https://api.covidfrontline.net/page/update_page/60b1e7925708625c14510166`
		);
		// .then((res) => {
		// 	console.log(res.data);
		// 	const post = {
		// 		menu: res.data.menu,
		// 		submenu: res.data.submenu,
		// 		title: res.data.title,
		// 		description: res.data.description,
		// 		selectoption: res.data.selectoption,
		// 		addedby: res.data.addedby,
		// 	};
		// 	console.log(post.title);
		// 	this.setState({
		// 		menu: post.menu,
		// 		submenu: post.submenu,
		// 		title: post.title,
		// 		description: post.description,
		// 		selectoption: post.selectoption,
		// 		addedby: post.addedby,
		// 		loading: true,
		// 	});
		// });
	}

	render() {
		return (
			<>
				<>
					<Helmet>
						<meta charSet="utf-8" />
						<title>Cookie Policy</title>
						<link rel="canonical" href="https://mysite.com/example" />
					</Helmet>
					<Header />
					<main className="layout">
						<section className="deep-cms">
							<div className="container">
								<div className="row m-0">
									{/* <div className="col-md-2"></div> */}
									<div className="col-md-12">
										{" "}
										<h1>Cookie Policy</h1>
										<h1 className="main-head">{this.state.title}</h1>
										<p>{renderHTML(this.state.description)}</p>
									</div>
								</div>
							</div>

							{/* <div className="tab-content p-t-35">
                <div className="row">
                  <div className="col-md-12">
                    <div className="video-box-stream">
                      <h4> {this.state.title}</h4>
                      <p>{renderHTML(this.state.description)}</p>
                    </div>
                  </div>
                </div>
              </div> */}
						</section>
						{/* <!-- Footer --> */}
						<Footer />
					</main>

					{/* <!-- Back to top --> */}
					<Link to="#">
						<div className="btn-back-to-top" id="myBtn">
							<span className="symbol-btn-back-to-top">
								<span className="fas fa-angle-up"></span>
							</span>
						</div>
					</Link>
				</>
			</>
		);
	}
}

export default CookiePolicy;
