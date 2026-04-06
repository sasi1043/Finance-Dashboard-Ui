import { BarChart,Bar , XAxis , YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts"

const expense =[
  { month: 'Jan', expense: 4000, income: 2400 },
  { month: 'Feb', expense: 4200, income: 2600 },
  { month: 'Mar', expense: 3800, income: 3000 },
  { month: 'Apr', expense: 4500, income: 3200 },
  { month: 'May', expense: 4700, income: 3500 },
  
]

function ExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={expense} margin={{right:30}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="expense" fill="#2563eb" />
            <Bar dataKey="income" fill="#8b5cf6" /> 
        </BarChart>
    </ResponsiveContainer>
  )
}

export default ExpenseChart;

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
                    Income:
                    <strong className="ml-2">₹{payload[1].value}</strong >
                </p>
            </div>
        )
    }
}
