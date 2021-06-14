import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { isAutheticated, signout } from "../auth";

import { Link, Route, useParams, Redirect, useHistory } from "react-router-dom";
function Sidebar() {
	const {
		user: { name },
	} = isAutheticated();

	console.log(name);

	const history = useHistory();

	return (
		<div className="admin">
			<div className="slidebar-left">
				<ProSidebar>
					<SidebarHeader>
						<div className="admin-logo">
							{/* <strong style={{ fontSize: "25px", color: "#f39510" }}>
                COVID HELP
              </strong> */}
							<img src="/assets/img/covid_logo(1).png" />
						</div>
					</SidebarHeader>
					<SidebarContent>
						<Menu iconShape="square">
							<MenuItem>
								<Link to="/dashboard">
									<i className="fa fa-tachometer" aria-hidden="true" />{" "}
									<span className="color">Dashboard</span>
								</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/adminuser">
									<i className="fa fa-upload" aria-hidden="true" />
									<span className="color"> Administrators</span>
								</Link>
							</MenuItem>
							{/* <MenuItem>
                <Link to="/administratoruser">
                  <i className="fa fa-upload" aria-hidden="true" />{" "}
                  Administrator User
                </Link>
              </MenuItem> */}

							<SubMenu
								title="Master Data"
								icon={
									<MenuItem>
										<i class="fa fa-info-circle" aria-hidden="true"></i>
									</MenuItem>
								}
							>
								<MenuItem>
									{" "}
									<Link to="/countries" style={{ color: "white" }}>
										<span className="color"> Countries</span>
									</Link>
								</MenuItem>
								<MenuItem>
									{" "}
									<Link to="/cities" style={{ color: "white" }}>
										<span className="color"> Cities</span>
									</Link>
								</MenuItem>
								<MenuItem>
									{" "}
									<Link to="/bloodgroup" style={{ color: "white" }}>
										<span className="color"> Blood Group</span>
									</Link>
								</MenuItem>

								{/* <MenuItem>
									{" "}
									<Link to="/resources" style={{ color: "white" }}>
										<span className="color"> Resources</span>
									</Link>
								</MenuItem> */}
								
							</SubMenu>

							<SubMenu
								title="Categories"
								icon={
									<MenuItem>
										<i class="fa fa-info-circle" aria-hidden="true"></i>
									</MenuItem>
								}
							>

                                <MenuItem>
									{" "}
									<Link to="/hospital_details" style={{ color: "white" }}>
										<span className="color"> Hospital</span>
									</Link>
								</MenuItem>
								<MenuItem>
									{" "}
									<Link to="/equipment_provider" style={{ color: "white" }}>
										<span className="color"> Equipment Provider</span>
									</Link>
								</MenuItem>
								<MenuItem>
									{" "}
									<Link to="/consultant" style={{ color: "white" }}>
										<span className="color"> Consultant</span>
									</Link>
								</MenuItem>
								<MenuItem>
									{" "}
									<Link to="/pharma" style={{ color: "white" }}>
										<span className="color"> Pharma</span>
									</Link>
								</MenuItem>
								<MenuItem>
									{" "}
									<Link to="/vaccine" style={{ color: "white" }}>
										<span className="color"> Vaccine</span>
									</Link>
								</MenuItem>
								<MenuItem>
									{" "}
									<Link to="/ambulance_service" style={{ color: "white" }}>
										<span className="color"> Ambulance</span>
									</Link>
								</MenuItem>

							</SubMenu>
							<SubMenu
								title="Content Management System"
								icon={
									<MenuItem>
										<i className="fa fa-home" aria-hidden="true"></i>
									</MenuItem>
								}
							>
								{/* <MenuItem>
                  {" "}
                  <Link
                    to="/privacypolicypage/60a2573033be630015d6fcad"
                    style={{ color: "white" }}
                  >
                    <span className="color">  Privacy Policy</span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link
                    to="/termsofservicepage/60a25d9c33be630015d6fcaf"
                    style={{ color: "white" }}
                  >
                   <span className="color">   Terms of Service</span>
                  </Link>
                </MenuItem> */}
								<MenuItem>
									<Link to="/menu">
										{/* <i class="fa fa-book fa-fw" aria-hidden="true"></i>  */}
										<span className="color"> Menu</span>
									</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/submenu">
										{/* <i class="fa fa-book fa-fw" aria-hidden="true"></i>  */}
										<span className="color"> Sub Menu</span>
									</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/page">
										{/* <i class="fa fa-book fa-fw" aria-hidden="true"></i>  */}
										<span className="color"> Pages</span>
									</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/institution_details">
										{/* <i class="fa fa-book fa-fw" aria-hidden="true"></i>  */}
										<span className="color"> Institution Details</span>
									</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/view_social_media_details">
										{/* <i class="fa fa-book fa-fw" aria-hidden="true"></i>  */}
										<span className="color"> Social Media</span>
									</Link>
								</MenuItem>
							</SubMenu>

							{/* <MenuItem>
                <Link to="/change_password">
                  <i class="fa fa-book fa-fw" aria-hidden="true"></i> Change
                  Password
                </Link>
              </MenuItem> */}
							<MenuItem>
								<Link to="/change_password">
									<i class="fa fa-key" aria-hidden="true"></i>
									<span className="color"> Change Password</span>
								</Link>
							</MenuItem>

							<MenuItem>
								<Link
									to=""
									onClick={() => {
										signout(() => {
											history.push("/superadminlogin");
										});
									}}
								>
									<i class="fa fa-sign-out" aria-hidden="true"></i>
									<span className="color"> Logout {name}</span>
								</Link>
							</MenuItem>
						</Menu>
					</SidebarContent>
				</ProSidebar>
			</div>
		</div>
	);
}
export default Sidebar;
