import React, { useMemo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import Sidebar from "../sidebar";
import axios from "axios";

export const HospitalDetails = () => {
	const [hospitalResources, setHospitalResources] = useState([]);
	const [value, setValue] = useState(true);

	const history = useHistory();

	useEffect(() => {
		const getHospitalResources = async () => {
			await axios
				.get(`${process.env.REACT_APP_BASE_URL}/hospitaldetails/get`)
				.then(({ data: { success, message } }) => {
					!success && console.log(message);
					success && setHospitalResources(message);
					success && setLoading(false);
				});
		};
		getHospitalResources();
	}, [value]);

	const handleDelete = (resourceid) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this resource!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios
					.delete(
						`${process.env.REACT_APP_BASE_URL}/hospitaldetails/delete/${resourceid}`
					)
					.then(() => {
						swal("Data has been deleted!", {
							icon: "success",
						}).then(() => {
							setValue((value) => !value);
						});
					});
			} else {
				swal("Institution is not yet deleted!");
			}
		});
	};

	const COLUMNS = [
		{
			Header: "S.No",
			Cell: ({ row: { index } }) => <span>{index + 1}</span>,
		},
		{
			Header: "Institution Name",
			accessor: "resource",
		},
		{
			Header: "Actions",
			Cell: ({
				row: {
					original: { _id: resourceid },
				},
			}) => {
				return (
					<div className="d-flex">
						<Link to={`/edit_hospital_details/${resourceid}`}>
							<span className="btn">Edit</span>
						</Link>
						<Link to={`/view_hospital_details/${resourceid}`}>
							<span className="btn">View</span>
						</Link>
						<Link onClick={() => handleDelete(resourceid)}>
							<span className="btn">Delete</span>
						</Link>
					</div>
				);
			},
		},
	];

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => hospitalResources);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		previousPage,
		nextPage,
		canPreviousPage,
		canNextPage,
		state,
		setPageSize,
	} = useTable(
		{ columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
		usePagination
	);

	const [loading, setLoading] = useState(true);
	const { pageSize } = state;

	return (
		<div>
			<Sidebar></Sidebar>
			<div className="admin-wrapper col-12">
				<div className="admin-content">
					<div className="admin-head">Hospital</div>
					<div className="admin-data">
						<div className="col-lg-12 p-0 text-right mb-30">
							<Link to="/add_hospital_details">
								<button className="button button-contactForm boxed-btn">
									+ Add New
								</button>
							</Link>
						</div>
						{loading ? (
							<div style={{ marginLeft: "500px", marginTop: "200px" }}>
								{" "}
								<Loader
									type="Circles"
									color="#f39510"
									height={100}
									width={100}
									timeout={3000} //3 secs
								/>
							</div>
						) : (
							<>
								<div className="table-responsive admin-table">
									<table {...getTableProps()}>
										<thead>
											{headerGroups.map((headerGroup) => (
												<tr>
													{headerGroup.headers.map((column) => (
														<th {...column.getHeaderProps()}>
															{column.render("Header")}
														</th>
													))}
												</tr>
											))}
										</thead>
										<tbody {...getTableBodyProps()}>
											{page.map((row) => {
												prepareRow(row);
												return (
													<tr {...row.getRowProps()}>
														{row.cells.map((cell) => (
															<td {...cell.getCellProps()}>
																{cell.render("Cell")}
															</td>
														))}
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								<div className="d-flex justify-content-between p-3">
									<select
										value={pageSize}
										onChange={(e) => setPageSize(Number(e.target.value))}
										className="form-control form-control-sm w-25 align-self-center"
									>
										{[5, 10, 15].map((pageSize) => (
											<option key={pageSize} value={pageSize}>
												Show {pageSize}
											</option>
										))}
									</select>
									<div>
										<button
											className="button button-contactForm boxed-btn"
											onClick={() => previousPage()}
											disabled={!canPreviousPage}
										>
											Previous
										</button>
										<button
											className="button button-contactForm boxed-btn"
											onClick={() => nextPage()}
											disabled={!canNextPage}
										>
											Next
										</button>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
