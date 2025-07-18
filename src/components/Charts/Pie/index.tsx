import { PieChart as PieRechart, Pie, Cell, Tooltip } from "recharts";

type PieChartType = {
  data: {
    name: string;
    value: number;
  }[];
  width?: number;
  height?: number;
  cx?: string;
  cy?: string;
  outerRadius?: number;
  colors: string[];
};

export const PieChart = ({
  data,
  width = 250,
  height = 250,
  cx = "50%",
  cy = "50%",
  outerRadius = 80,
  colors,
}: PieChartType) => {
  console.log("chamou");
  return (
    <PieRechart width={width} height={height}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx={cx}
        cy={cy}
        outerRadius={outerRadius}
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieRechart>
  );
};
