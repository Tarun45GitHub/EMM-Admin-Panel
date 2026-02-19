import TransactionTable from "../components/transfer/Transcationtable";

const transactions=[
  {
    "id": "TRX1001",
    "date": "2025-02-12",
    "description": "Subscription Payment",
    "amount": 59.99,
    "status": "Paid"
  },
  {
    "id": "TRX1002",
    "date": "2025-02-10",
    "description": "Refund Issued",
    "amount": -20.00,
    "status": "Paid"
  },
  {
    "id": "TRX1003",
    "date": "2025-02-09",
    "description": "Online Purchase",
    "amount": 120.75,
    "status": "Pending"
  },
  {
    "id": "TRX1004",
    "date": "2025-02-08",
    "description": "Point of Sale Sale",
    "amount": 45.50,
    "status": "Failed"
  },
  {
    "id": "TRX1005",
    "date": "2025-02-05",
    "description": "Refund Credit",
    "amount": -10.25,
    "status": "Paid"
  }
]

const MyTransaction:React.FC=()=>{
    return(
        <div className="flex justify-center mt-10">
            <TransactionTable data={transactions}/>
        </div>
    );
}
export default MyTransaction;