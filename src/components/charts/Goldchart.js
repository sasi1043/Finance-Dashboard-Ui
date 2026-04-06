import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

function Goldchart() {

  // Gold rate value
  const goldRate = 6500;    
  const maxRate = 8000;      

  // Convert to percentage
  const percentage = (goldRate / maxRate) * 100;
  const data = [
    { name: "Gold", value: percentage },
    { name: "Remaining", value: 100 - percentage }
  ];

  const COLORS = ["#dfec50", "#e0e0e0"];

  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="60%"  
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={120}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          {/* Center Text */}
          <text
            x="50%"
            y="40%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            ₹{goldRate}
          </text>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            style={{ fontSize: "12px", fill: "#666" }}
          >
            Gold Rate / gram
          </text>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Goldchart;