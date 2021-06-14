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
function VolunteerSidebar() {
	const history = useHistory();
	const {
		user: { name },
	} = isAutheticated();

	console.log(name);

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
							{/* <img src="/assets/img/logo/deepthoughtlogo.svg" /> */}
						</div>
					</SidebarHeader>
					<SidebarContent>
						<Menu iconShape="square">
							<MenuItem>
								<Link to="/request">
									<i className="fa fa-rss-square" aria-hidden="true"></i>{" "}
									<span className="color"> Requests</span>
								</Link>
							</MenuItem>

							<MenuItem>
								<Link to="/volunteer_change_password">
									<i className="fa fa-key" aria-hidden="true"></i>{" "}
									<span className="color"> Change Password</span>
								</Link>
							</MenuItem>
							<MenuItem>
								<Link
									to=""
									onClick={() => {
										signout(() => {
											history.push("/volunteerlogin");
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
export default VolunteerSidebar;
