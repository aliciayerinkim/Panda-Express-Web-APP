import '../components/styles.scss';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { PairCollection }  from "../classes/PairsReport";
import { RestockReport } from "../classes/RestockReport";
import { SalesReport } from '../classes/salesReport';
import { ExcessReport } from '../classes/ExcessReport';
import { getMenuItemName } from "../connections/menuFunctions" 
import { getOrder } from '../connections/orderFunctions';

import { Button } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';

/**
 * Alert to display more info about an order
 * @param {Object} props - Contains order Id
 * @author Aaron Su
 */
function MoreInfoAlert(props){
    
    const [moreInfoText, setMoreInfoText] = useState("");

    useEffect(()=>{
        (async ()=> {
            let txt = await getOrder(props.currOrderId)
            return(txt)
        })().then((txt) => {
            console.log("moreInfoText for order:", props.currOrderId, "is" , txt);
            setMoreInfoText(txt);
        })
    }, [])

    if (moreInfoText !== "") {
        alert(JSON.stringify(moreInfoText, null, 2))
    }
}

/**
 * Shows sales report
 * @param {Object} props - Contains information to populate the sales report
 * @author Aaron Su
 */
function SalesReportView(props) { 
    // const [itemName, setItemName] = useState("")
    const [currOrderId, setCurrOrderId] = useState(1)
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    return (
      <div class="container overflow-hidden text-center">
        {showMoreInfo && <MoreInfoAlert currOrderId={currOrderId}/>}
        <h2 class="mb-3" style={{fontWeight: 600}}>Sales Report: {props.startDate} to {props.endDate} for item {props.inventoryId}</h2>
        <table className="table table-hover table-striped overflow-auto" style={{height: '60vh'}}>
            <thead>
                <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Time</th>
                <th scope="col">Sale Amount</th>
                <th scope="col">More Info</th>
                </tr>
            </thead>
            <tbody>
                {
                props.salesReport.getSalesReportItems.map((item) => (
                    <tr>
                    <th scope="row">{item.getOrderId}</th>
                    <td>{item.getTime}</td>
                    <td>{item.getMoney.toFixed(2)}</td>
                    <td><Button onClick={() => {
                        setShowMoreInfo(true); 
                        setCurrOrderId(item.getOrderId)}}
                        variant="panda-btn" size="sm" style={{fontWeight: 400}}>more info
                        </Button></td>
                    </tr>
                ))
                }
            </tbody>
        </table>
        {/* {showMoreInfo && <SalesReportMoreInfo orderId={currOrderId}/>} */}

      </div>
    );
}

/**
 * Shows pairs of items commonly ordered together
 * @param {Object} props - Contains information to populate the pairs report
 * @author Aaron Su
 */
function PairsReportView(props) {
    return (
      <div class="container overflow-hidden text-center">
        <h2 class="mb-3" style={{fontWeight: 600, fontSize: 32}}>Pairs Report: {props.startDate} to {props.endDate}</h2>
        <table className="table table-hover table-striped overflow-auto" style={{height: '60vh'}}>
            <thead>
                <tr>
                <th scope="col">Rank</th>
                <th scope="col">Item 1</th>
                <th scope="col">Item 2</th>
                <th scope="col">Pair Proportion</th>
                </tr>
            </thead>
            <tbody>
                {
                props.pairsReport.getPairs.map((item) => (
                    <tr>
                    <th scope="row">{item.getRank}</th>
                    <td>{item.getFirstItemIndex}</td>
                    <td>{item.getSecondItemIndex}</td>
                    <td>{item.getPorportionPercent.toFixed(2)}</td>
                    </tr>
                ))
                }
            </tbody>
        </table>
      </div>
    );
  }
/**
 * Shows items to be restocked because they are under a certain inventory amount
 * @param {Object} props - Contains information to populate the restock report
 * @author Aaron Su
 */
function RestockReportView(props) {
    return (
        <div class="container overflow-hidden text-center">
            <h2 class="mb-3" style={{fontWeight: 600, fontSize: 32}}>Restock Report</h2>
            <table className="table table-hover table-striped overflow-auto" style={{height: '60vh'}}>
                <thead>
                    <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Inventory Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    props.restockReport.getRestockReportItems.map((item) => (
                        <tr>
                        <th scope="row">{item.getItemName}</th>
                        <td>{item.getCurrentInventory}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
      </div>
    );
}

/**
 * Shows excess items in the inventory
 * @param {Object} props - Contains information to populate the excess report
 * @author Aaron Su
 */
function ExcessReportView(props) {
        
    setTimeout(() => {
        console.log("TIMEOUT FINISHED"); 
        // console.log("updated excess report:", excessReport.getItems);
        return (
            <div class="container overflow-hidden text-center">
                <h2 class="mb-3" style={{fontWeight: 600, fontSize: 32}}>Excess Report: {props.startDate} to {props.endDate} </h2>
                <table className="table table-hover table-striped overflow-auto" style={{height: '60vh'}}>
                    <thead>
                        <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Percentage Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        props.excessReport.getItems.map((item) => (
                            <tr>
                            <th scope="row">{item.getItemName}</th>
                            <td>{item.getPercentage}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table> 
                 {/* <p>excessReport.getItems</p> */}
          </div>
        );
    }, 5000);
}

/**
 * The reports view. Allows managers to
 * view different reports, including
 * sales, pairs, and restock reports
 * @author Aaron Su
 */
function Reports(){
    const [ReportIdx, setReportIdx] = useState(0);
    const [isShown, setIsShown] = useState(false);
    const [isSubmittable, setIsSubmittable] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [inventoryId, setInventoryId] = useState(null);
    const [salesReport, setSalesReport] = useState(new SalesReport());
    const [pairsReport, setPairsReport] = useState(new PairCollection());
    const [restockReport, setRestockReport] = useState(new RestockReport());
    const [excessReport, setExcessReport] = useState(new ExcessReport());



    function MuxReportView(props) {
        return(<div className="col-lg-8 text-center">
                {(props.ReportIdx === 1) && <SalesReportView startDate={props.startDate} endDate={props.endDate} inventoryId={props.inventoryId} salesReport={salesReport} />}
                {(props.ReportIdx === 2) && <ExcessReportView startDate={props.startDate} endDate={props.endDate} excessReport={excessReport}/>}
                {(props.ReportIdx === 3) && <RestockReportView restockReport={restockReport}/>}
                {(props.ReportIdx === 4) && <PairsReportView startDate={props.startDate} endDate={props.endDate} pairsReport={pairsReport}/>}
        </div>);
    }

    function updateIsSubmittable(ReportIdx, startDate, endDate, inventoryId) {
        if (ReportIdx === 1) { // sales
            setIsSubmittable(!(startDate === null || endDate === null || inventoryId === null));
        } else if (ReportIdx === 2) { // excess
            setIsSubmittable(!(startDate === null || endDate === null));
        } else if (ReportIdx === 3) { // restock
            setIsSubmittable(true);
        } else if (ReportIdx === 4) { // pairs
            setIsSubmittable(!(startDate === null || endDate === null));
        }
    }

    function handleSubmit(ReportIdx, inventoryId, startDate, endDate) {
        async function generateSalesReport() {
            let report = new SalesReport()
            await report.generateSalesReport(inventoryId, startDate, endDate)
            console.log("sales report:", report.getSalesReportItems)
            setSalesReport(report)
        }
        async function generatePairs() {
            let report = new PairCollection()
            await report.sellsTogether(startDate, endDate)
            console.log("pairs report:", report.getPairs);
            setPairsReport(report)
        }
        async function generateRestockReport() {
            let report = new RestockReport()
            await report.restockReport()
            console.log("restock report:", report.getRestockReportItems);
            setRestockReport(report)
        }
   
        async function generateExcessReport() {
            let report = new ExcessReport();
            await report.excessReport(startDate, endDate)
            console.log("excess report:", report.getItems)
            setExcessReport(report)
        }

        if (ReportIdx === 1) {
            generateSalesReport();
        } else if (ReportIdx === 2) {
            generateExcessReport();
        } else if (ReportIdx === 3) {
            generateRestockReport();
        } else if (ReportIdx === 4) {
            generatePairs();
        }
    }

    return (
        <div>
          <ManagerNav />
          <div class="container">
            <div class="row gx-5 justify-content-front my-5">
              <div class="col-lg-4 text-center">
                <form>
                    <div className="dropdown">
                        <Button variant="panda-btn mt-3" size="lg" class="bg-red text-white" style={{fontWeight: 800}} data-bs-toggle="dropdown" aria-expanded="false">
                            SELECT REPORT
                        </Button>
                        <ul className="dropdown-menu" onClick={() => {setIsShown(false); updateIsSubmittable();} }>
                            <li><a className="dropdown-item" onClick={() => {setReportIdx(1); updateIsSubmittable(ReportIdx, startDate, endDate, inventoryId);}} href="#1"> SALES   </a></li>
                            {/* <li><a className="dropdown-item" onClick={() => {setReportIdx(2); updateIsSubmittable(ReportIdx);}} href="#2"> EXCESS  </a></li> */}
                            <li><a className="dropdown-item" onClick={() => {setReportIdx(3); updateIsSubmittable(ReportIdx)}} href="#3"> RESTOCK </a></li>
                            <li><a className="dropdown-item" onClick={() => {setReportIdx(4); updateIsSubmittable(ReportIdx, startDate, endDate);}} href="#4"> PAIRS   </a></li>
                        </ul>
                    </div>
                    {(ReportIdx === 1 || ReportIdx === 2 || ReportIdx === 4) && <div class="form-group">
                        <label>Start Date</label>
                        <input 
                          type="date" 
                          class="form-control" 
                          placeholder="Enter start date"
                          onChange={event => {
                            setStartDate(event.target.value);
                            updateIsSubmittable(ReportIdx, startDate, endDate, inventoryId);
                          }}
                          value={startDate}
                        />
                    </div>}
                    {(ReportIdx === 1 || ReportIdx === 2 || ReportIdx === 4) && <div class="form-group">
                        <label>End Date</label>
                        <input type="date"
                         class="form-control"
                         placeholder="Enter end date"
                         onChange={event => {
                            setEndDate(event.target.value);
                            updateIsSubmittable(ReportIdx, startDate, endDate, inventoryId);
                        }}
                         value={endDate}
                        />
                    </div>}

                    {(ReportIdx === 1) && <div class="form-group">
                        <label>Inventory Id</label>
                        <input type="number"
                         class="form-control"
                         placeholder="Enter Inventory ID"
                         onChange={event => {
                            setInventoryId(event.target.value);               
                            updateIsSubmittable(ReportIdx, startDate, endDate, event.target.value);
                        }}
                         value={inventoryId}
                        />
                    </div>}

                    <Button 
                        disabled={!isSubmittable}
                        onClick={() => {
                        setIsShown(true); 
                        handleSubmit(ReportIdx, inventoryId, startDate, endDate);}} 
                        variant="panda-btn mt-3" size="lg" class="bg-red text-white" style={{fontWeight: 800}}>
                            GENERATE 
                                {(ReportIdx===1) && " SALES REPORT" }
                                {(ReportIdx===2) && " EXCESS REPORT" }
                                {(ReportIdx===3) && " RESTOCK REPORT" }
                                {(ReportIdx===4) && " PAIRS REPORT" }
                        </Button>
                </form>
              </div>
              {isShown && <MuxReportView ReportIdx={ReportIdx} startDate={startDate} endDate= {endDate} inventoryId={inventoryId}/>}
            </div>
          </div>
          <Footer />
        </div>
      );
} 
export default Reports;