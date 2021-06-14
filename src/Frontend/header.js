import React from "react";

import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menus: [],
			sideBar: false,
		};

		this.handleSidebar = this.handleSidebar.bind(this);
	}

	componentDidMount() {
		axios.get(`https://api.covidfrontline.net/menu/menus`).then((res) => {
			const menus = res.data;
			console.log(menus);
			this.setState({ menus, loading: true });
		});
	}
	handleSidebar() {
		this.setState({
			sideBar: !this.state.sideBar,
		});
	}
	render() {
		return (
			<header>
				<div className="container-menu-desktop">
					<div className="wrap-header-mobile">
						<div className="logo-mobile">
							<Link to="/">
								<img src="/assets/img/covid_logo(3).png" alt="IMG-LOGO" />
							</Link>
						</div>

						<button
							onClick={this.handleSidebar}
							className={`navToggle ${this.state.sideBar ? "open" : null}`}
						>
							<span />
							<span />
							<span />
						</button>
					</div>
					<nav>
						<ul
							className="mainNav"
							style={this.state.sideBar ? { transform: "translateX(0)" } : null}
						>
							<li>
								<Link to="/home" className="mainNavLink">
									Home
								</Link>
							</li>
							{this.state.menus &&
								this.state.menus.map((menu, index) => {
									return (
										<li>
											<Link
												to={`/MenuList/${menu.menu}`}
												className={
													this.isPathActive(`/MenuList/${menu.menu}`)
														? "active"
														: null
												}
												className="mainNavLink"
											>
												{menu.menu}
											</Link>
											<SubMenuView MenuName={menu.menu} />{" "}
										</li>
									);
								})}
						</ul>
					</nav>
					{/* <!-- Menu Mobile --> */}

					<div className="menu-mobile"></div>

					<div className="wrap-logo container">
						{/* <!-- Logo desktop -->*/}
						<div className="logo">
							<a href="/">
								<img src="/assets/img/covid_logo(3).png" alt="IMG-LOGO" />
							</a>
						</div>

						{/* <!-- Banner --> */}

						<div className="wrap-main-nav">
							<div className="main-nav">
								<nav className="menu-desktop">
									<ul className="main-menu">
										<li>
											<Link
												to="/home"
												className={this.isPathActive("/home") ? "active" : null}
											>
												Home
											</Link>
										</li>

										{this.state.menus &&
											this.state.menus.map((menu, index) => {
												return (
													<li key={index} className="mega-menu-item">
														<Link
															to={`/MenuList/${menu.menu}`}
															className={
																this.isPathActive(`/MenuList/${menu.menu}`)
																	? "active"
																	: null
															}
														>
															{menu.menu}
														</Link>
														<SubMenuView MenuName={menu.menu} />{" "}
													</li>
												);
											})}
									</ul>
								</nav>
							</div>
						</div>

						<div className="login-search-desktop">
							<span className="login">
								<Link to="/login" className="btn-small">
									Login
								</Link>
							</span>
						</div>
					</div>
				</div>
			</header>
		);
	}
	isPathActive(path) {
		return this.props.location.pathname.startsWith(path);
	}
}

class SubMenuView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}

	componentDidMount() {
		let selectedMenuName = this.props.MenuName;
		axios
			.get(
				`https://api.covidfrontline.net/submenu/submenuvalues1/${selectedMenuName}`
			)

			.then((res) => {
				const submenus = res.data;
				console.log(submenus);
				this.setState({ submenus, loading: true });
			});
	}

	render() {
		var subSubMenuList =
			this.state.submenus &&
			this.state.submenus.map((data, index) => {
				return (
					<div className="col-md-12" key={index}>
						<h1>
							<img src={data.image} />

							<Link to={`/SubMenuList/${data.submenu}/${data.menu}`}>
								{data.submenu}
							</Link>
						</h1>
						<p>{data.description}</p>
					</div>
				);
			});

		return (
			<>
				<div className="sub-mega-menu">
					<div className="row col-12 p-0 m-0">{subSubMenuList} </div>
				</div>
			</>
		);
	}
}
export default withRouter(Header);
