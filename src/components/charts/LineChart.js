// src/components/charts/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme, alpha } from "@mui/material/styles";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ data, title }) => {
  const theme = useTheme();

  const chartData = {
    labels: data.map((item) => format(new Date(item.date), "MMM dd")),
    datasets: [
      {
        label: "Revenue",
        data: data.map((item) => item.revenue),
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: theme.palette.background.paper,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Users",
        data: data.map((item) => item.users),
        borderColor: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.secondary.main, 0.05),
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.palette.secondary.main,
        pointBorderColor: theme.palette.background.paper,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Conversions",
        data: data.map((item) => item.conversions),
        borderColor: theme.palette.success.main,
        backgroundColor: alpha(theme.palette.success.main, 0.05),
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.palette.success.main,
        pointBorderColor: theme.palette.background.paper,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
          },
          padding: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: theme.typography.fontFamily,
        },
        titleFont: {
          family: theme.typography.fontFamily,
          weight: "bold",
        },
        callbacks: {
          labelPointStyle: function (context) {
            return {
              pointStyle: "circle",
              rotation: 0,
            };
          },
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              if (context.datasetIndex === 0) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(context.parsed.y);
              } else {
                label += new Intl.NumberFormat("en-US").format(
                  context.parsed.y
                );
              }
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
          },
        },
      },
      y: {
        grid: {
          color: theme.palette.divider,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
          },
          callback: function (value) {
            if (value >= 1000) {
              return (value / 1000).toFixed(1) + "k";
            }
            return value;
          },
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        hoverBorderWidth: 4,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card elevation={0} sx={{ borderRadius: 2, height: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {title || "Revenue & User Trends"}
          </Typography>
          <Box sx={{ height: 300, mt: 2 }}>
            <Line data={chartData} options={options} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LineChart;
