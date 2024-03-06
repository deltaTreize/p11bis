import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";

import "./adminPage.scss";

export function AdminPage() {
	const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const id = useSelector((state) => state.allReducer.user.id);
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/user", {
			method: "GET",
			headers: {
				id: `${id}`,
			},
		})
			.then((data) => data.json())
			.then((dataJson) =>{
				setAllUsers(dataJson.body.filter((user) => user.role === "user"));
			}
			);
		}, []);

			return (
				<main className="main bg-dark">
					<div className="header">
					<BackArrow chemin={"/user"}/>
						<h1>
							{lastName} {firstName}
						</h1>
					</div>
					{allUsers.map((user) => (
						<Link to={`${user.id}`} key={user.id} className="linkToAdminUserAccountPage">
							<section className="account">
								<div className="account-content-wrapper">
									<h3 className="account-title">
										{user.lastName} {user.firstName}
									</h3>
									<p className="account-amount">{user.email}</p>
									{user.account.map((data) => (
										<div className="account" key={data._id}>
											<p className="account-amount-description">
												{data.name}
											</p>
											<p className="account-amount-description">
												{data.nbAccount}
											</p>
											<p className="account-amount-description">
												{data.solde} €
											</p>
										</div>
									))}
								</div>
							</section>
						</Link>
					))}
				</main>
			);
		}
