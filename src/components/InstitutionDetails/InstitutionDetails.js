import React, { useMemo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import Sidebar from "../sidebar";
import axios from "axios";

export const InstitutionDetails = () => {
	const [institutions, setInstitutions] = useState([]);
	const [value, setValue] = useState(true);

	const history = useHistory();

	useEffect(() => {
		const getInstitutions = async () => {
			await axios
				.get(
					`${process.env.REACT_APP_BASE_URL}/institutiondetails/getinstitutiondetails`
				)
				.then(({ data: { success, message } }) => {
					!success && console.log(message);
					success && setInstitutions(message);
					success && setLoading(false);
				});
		};
		getInstitutions();
	}, [value]);

	const handleDelete = (institutionid) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this imaginary file!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios
					.delete(
						`${process.env.REACT_APP_BASE_URL}/institutiondetails/deleteinstitutiondetails/${institutionid}`
					)
					.then(() => {
						swal("Institution has been deleted!", {
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
			accessor: "institutionName",
		},
		{
			Header: "Institution Address 1",
			accessor: "addressLine1",
		},
		{
			Header: "Institution Address 2",
			accessor: "addressLine2",
		},
		{
			Header: "City",
			accessor: "city",
		},
		{
			Header: "State",
			accessor: "state",
		},
		{
			Header: "Pincode",
			accessor: "pincode",
		},
		{
			Header: "Actions",
			Cell: ({
				row: {
					original: { _id: institutionid },
				},
			}) => {
				return (
					<div className="d-flex">
						<Link to={`/edit_institution_details/${institutionid}`}>
							<span className="btn">Edit</span>
						</Link>
						<Link to={`/view_institution_details/${institutionid}`}>
							<span className="btn">View</span>
						</Link>
						<Link onClick={() => handleDelete(institutionid)}>
							<span className="btn">Delete</span>
						</Link>
					</div>
				);
			},
		},
	];

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => institutions);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		page,
		previousPage,
		nextPage,
		canPreviousPage,
		canNextPage,
		goToPage,
		state,
		setPageSize,
	} = useTable(
		{ columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
		usePagination
	);

	const [loading, setLoading] = useState(true);
	const { pageIndex, pageSize } = state;

	return (
		<div>
			<Sidebar></Sidebar>
			<div className="admin-wrapper col-12">
				<div className="admin-content">
					<div className="admin-head">Institutions</div>
					<div className="admin-data">
						<div className="col-lg-12 p-0 text-right mb-30">
							<Link to="/add_institution_details">
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
