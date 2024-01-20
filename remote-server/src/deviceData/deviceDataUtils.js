import CustomCell from '@/components/customCell/customCell'
import Link from 'next/link'


//   console.log("Data outside api call: "+ deviceDataFromAPi)

  export const deviceDataColumnsFromApi = [
    // { name: "deviceId",selector:row=>row.deviceId,},
    { name: "deviceName", selector:row=>row.deviceName,cell:(row,id) => <Link href={row.id}>{row.deviceName}</Link>},
    {name:"location", selector:row=>row.location, cell: (row,id) => <CustomCell value={row.location}/>},
    // { name: "batteryState",selector:'isCharging',sortable:true,cell:row=><div><div className={`${row.batterystate ? styles.booleanTrue : styles.booleanFalse}`}>{row.isCharging? "True" : "False"}</div></div>},
    { name: "batteryLevel", selector:row=>row.batteryLevel},
    {name:"batteryState", selector:row=>row.batteryState},
    {name:"ipAddress",selector:row=>row.ipAddress,cell: (row,id) => <CustomCell value={row.ipAddress}/>},
    // // {name:"macAddress", selector:row=>row.macAddress,cell: (row,id) => <CustomCell value={row.macAddress}/>},
    // {name:"androidVersion", selector:row=>row.deviceInfo.osVersion},
    // {name:"phoneNumber", selector:row=>row.phoneNumber},
    {name:"carrier",selector:row=>row.carrier},
    // {name:"isConnected",selector:"isCOnnected", sortable:true, cell:row=><div className={`${row.deviceNetwork.networkState.isConnected ? styles.booleanTrue : styles.booleanFalse}`} onClick={() => setSelectedCell(row.isConnected)}>{row.isConnected? "True" : "False"}</div>},
    // {name:"isInternetReacheable",selector:"isInterNetreacheable", cell:row=><div><div className={`${row.deviceNetwork.networkState.isConnected ? styles.booleanTrue : styles.booleanFalse}`}>{row.isConnected? "True" : "False"}</div></div>},
    {name:"connectionType", selector:row=>row.connectionType},
    

  ]
