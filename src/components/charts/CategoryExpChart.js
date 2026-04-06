import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CategoryExpChart() {
  const expenseData = [
    { name: "Food", value: 3000 },
    { name: "Transport", value: 1500 },
    { name: "Rent", value: 8000 },
    { name: "Entertainment", value: 1200 },
    { name: "Shopping", value: 2000 },
    { name: "Bills", value: 1800 },
  ];

  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28BFE",
    "#FF6699",
  ];

  return (
    <div style={{ width: "100%", height: 300 }}> 
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="60%"        
            outerRadius={100}  
            label={{ fontSize: 12 }}
          >
            {expenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom"
            height={60}  
            wrapperStyle={{ fontSize: "12px", marginTop: "10px" ,paddingTop:"40px"}}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryExpChart;

/* Custom Tooltip */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1e293b",
          padding: "6px 10px",
          borderRadius: "6px",
          color: "#fff",
          fontSize: "12px",
        }}
      >
        <strong>{payload[0].name}</strong>
        <p>₹{payload[0].value}</p>
      </div>
    );
  }
  return null;
};