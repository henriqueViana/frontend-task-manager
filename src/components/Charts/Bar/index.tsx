import { BarChart as BarRechart, Tooltip, Bar, XAxis, YAxis } from "recharts";

type BarChartType = {
  data: {
    name: string;
    value: number;
  }[];
  width?: number;
  height?: number;
  fill?: string;
};

export const BarChart = ({
  data,
  width = 300,
  height = 250,
  fill = "#3b82f6",
}: BarChartType) => {
  return (
    <BarRechart width={width} height={height} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value" fill={fill} />
      <Tooltip />
    </BarRechart>
  );
};
