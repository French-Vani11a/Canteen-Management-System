import React, { useContext } from "react";
import Footer from "../components/Footer";
import { AuthContext } from "../auth/AuthProvider";
import LatestMenu from "../components/LatestMenu";
import AddMenuItemForm from "../components/AddMenuItemForm";
import ManageMenuItems from "../components/ManageMenuItems";
import { Navigate } from "react-router-dom";
import Logout from "../components/Logout";
import PastTransactions from "../components/PastTransactions";
import TopupStudentBalanceInAdminDashboard from "../components/TopupStudentBalanceInAdminDashboard";
import RevenueDashboard from "../components/RevenueDashboard";
import StudentFeedback from "../components/StudentFeedback";
import AdminFeedbackDashboard from "../components/AdminFeedbackDashboard";
import SalesReport from "../components/SalesReport";

const AdminDashboard = () => {
    const { isAuthenticated } = useContext(AuthContext);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <section className="admin_dashboard_container">
            <Logout />
            <h1>Welcome ADMIN</h1>
           
            <div className="crud_container">
                <div className="crud_container_div">
                    <button className="show_hide_crud_container_div_component_container"
                        onClick={(e) => {
                            if(e.target.parentElement.querySelector(".crud_container_div_component_container").classList.contains("displayed_none")) {
                                e.target.parentElement.querySelector(".crud_container_div_component_container").classList.remove("displayed_none")
                                e.target.innerText = "-";
                            } else {
                                e.target.innerText = "+";
                                e.target.parentElement.querySelector(".crud_container_div_component_container").classList.add("displayed_none")
                            }
                        }}
                    >+</button>
                    <h3>Latest Menu</h3>
                    <div className="crud_container_div_component_container displayed_none">
                        <LatestMenu /> 
                    </div>
                </div>
                <div className="crud_container_div">
                    <button className="show_hide_crud_container_div_component_container"
                        onClick={(e) => {
                            if(e.target.parentElement.querySelector(".crud_container_div_component_container").classList.contains("displayed_none")) {
                                e.target.parentElement.querySelector(".crud_container_div_component_container").classList.remove("displayed_none")
                                e.target.innerText = "-";
                            } else {
                                e.target.innerText = "+";
                                e.target.parentElement.querySelector(".crud_container_div_component_container").classList.add("displayed_none")
                            }
                        }}
                    >+</button>
                    <h3>Add New Menu Item</h3>
                    <div className="crud_container_div_component_container displayed_none">
                        <AddMenuItemForm />  
                    </div>
                </div>
                <div className="crud_container_div"> 
                    <button className="show_hide_crud_container_div_component_container"
                        onClick={(e) => {
                            if(e.target.parentElement.querySelector(".crud_container_div_component_container").classList.contains("displayed_none")) {
                                e.target.parentElement.querySelector(".crud_container_div_component_container").classList.remove("displayed_none")
                                e.target.innerText = "-";
                            } else {
                                e.target.innerText = "+";
                                e.target.parentElement.querySelector(".crud_container_div_component_container").classList.add("displayed_none")
                            }
                        }}
                    >+</button>
                    <h3>Manage Menu Items</h3>
                    <div className="crud_container_div_component_container displayed_none">
                        <ManageMenuItems /> 
                    </div>
                </div>
                <div className="crud_container_div"> 
                    <button className="show_hide_crud_container_div_component_container"
                        onClick={(e) => {
                            if(e.target.parentElement.querySelector(".crud_container_div_component_container").classList.contains("displayed_none")) {
                                e.target.parentElement.querySelector(".crud_container_div_component_container").classList.remove("displayed_none")
                                e.target.innerText = "-";
                            } else {
                                e.target.innerText = "+";
                                e.target.parentElement.querySelector(".crud_container_div_component_container").classList.add("displayed_none")
                            }
                        }}
                    >+</button>
                    <h3>Topup Student Canteen Balance</h3>
                    <div className="crud_container_div_component_container displayed_none">
                        <TopupStudentBalanceInAdminDashboard /> 
                    </div>
                </div> 
                <div className="crud_container_div"> 
                    <button className="show_hide_crud_container_div_component_container"
                        onClick={(e) => {
                            if(document.querySelector(".revenue_dashboard_container").classList.contains("displayed_none")) {
                                document.querySelector(".revenue_dashboard_container").classList.remove("displayed_none")
                                e.target.innerText = "-";
                            } else {
                                e.target.innerText = "+";
                                document.querySelector(".revenue_dashboard_container").classList.add("displayed_none")
                            }
                        }}
                    >+</button>
                    <h3>Sales Analytics</h3>
                </div> 
                <div className="crud_container_div"> 
                    <button className="show_hide_crud_container_div_component_container"
                        onClick={(e) => {
                            if(document.querySelector(".orders_container").classList.contains("displayed_none")) {
                                document.querySelector(".orders_container").classList.remove("displayed_none")
                                e.target.innerText = "-";
                            } else {
                                e.target.innerText = "+";
                                document.querySelector(".orders_container").classList.add("displayed_none")
                            }
                        }}
                    >+</button>
                    <h3>View Orders</h3>
                </div>
                <div className="crud_container_div"> 
                    <button className="show_hide_crud_container_div_component_container"
                        onClick={(e) => {
                            if(document.querySelector(".feedback_container").classList.contains("displayed_none")) {
                                document.querySelector(".feedback_container").classList.remove("displayed_none")
                                e.target.innerText = "-";
                            } else {
                                e.target.innerText = "+";
                                document.querySelector(".feedback_container").classList.add("displayed_none")
                            }
                        }}
                    >+</button>
                    <h3>Customer Feedback</h3>
                </div> 
                <div className="crud_container_div"> 
                    <button className="show_hide_crud_container_div_component_container"
                        onClick={(e) => {
                            if(document.querySelector(".sales_report_container").classList.contains("displayed_none")) {
                                document.querySelector(".sales_report_container").classList.remove("displayed_none")
                                e.target.innerText = "-";
                            } else {
                                e.target.innerText = "+";
                                document.querySelector(".sales_report_container").classList.add("displayed_none")
                            }
                        }}
                    >+</button>
                    <h3>Sales Report</h3>
                </div> 
            </div> 
            <div className="revenue_dashboard_container displayed_none">
                <RevenueDashboard />
            </div> 
            <div className="orders_container displayed_none">
                <PastTransactions />
            </div> 
            <div className="feedback_container displayed_none">
                <AdminFeedbackDashboard />
            </div> 

            <div className="sales_report_container displayed_none">
                <SalesReport />
            </div>  
            
            <Footer url="admin_dashboard" />
        </section>
    );
};

export default AdminDashboard;
