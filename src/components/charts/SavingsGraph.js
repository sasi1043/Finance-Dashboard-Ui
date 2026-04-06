import { LineChart,Line , XAxis , YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts"

const savings =[
{ month: 'Jan', savings: 3200, expense: 2800 },
  { month: 'Feb', savings: 4500, expense: 2200 },
  { month: 'Mar', savings: 3000, expense: 3500 },
  { month: 'Apr', savings: 5200, expense: 2700 },
  { month: 'May', savings: 4000, expense: 4200 },
  { month: 'Jun', savings: 6000, expense: 3000 },
  { month: 'Jul', savings: 3500, expense: 4800 },
  { month: 'Aug', savings: 7000, expense: 3200 },
  { month: 'Sep', savings: 4200, expense: 3900 },
  { month: 'Oct', savings: 6500, expense: 4500 },
  { month: 'Nov', savings: 4800, expense: 5200 },
  { month: 'Dec', savings: 8000, expense: 6000 }
]

function SavingsGraph() {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart width={500} height={300} data={savings} margin={{right:30}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="natural" dataKey="savings" fill="#ff0000" />
            <Line type="monotone" dataKey="expense" fill="#06ff27" /> 
        </LineChart>
    </ResponsiveContainer>
  )
}

export default SavingsGraph;

const CustomTooltip =({active , payload , label}) =>{
    if(active && payload && payload.length) {
        return(
            <div className="p-4 bg-slate-900  flex flex-col gap-4 rounded-md">
                <strong className="text-medium text-lg">{label}</strong>
                <p className="text-sm text-blue-400">
                    Expense:
                    <strong className="ml-2">₹{payload[0].value}</strong>
                </p>
                <p className="text-sm text-indigo-400">
                    Savings:
                    <strong className="ml-2">₹{payload[1].value}</strong >
                </p>
            </div>
        )
    }
}
