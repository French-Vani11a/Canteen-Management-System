import Footer from "../components/Footer"
import PastTransactions from "../components/PastTransactions"

const OrdersDashboard = () => {
    return (
        <>
            <div className="orders_dashboard">
                <PastTransactions />
            </div>
            <Footer url="/orders_dashboard" />
        </>
    )
}

export default OrdersDashboard