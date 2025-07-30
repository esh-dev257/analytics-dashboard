// src/components/charts/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title }) => {
  const theme = useTheme();

  // Get unique campaign names
  const campaignNames = [
    ...new Set(
      data.flatMap((item) => item.campaigns.map((campaign) => campaign.name))
    ),
  ].slice(0, 5); // Limit to top 5 campaigns

  // Prepare datasets
  const datasets = campaignNames.map((name, index) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ];

    return {
      label: name,
      data: data.map((item) => {
        const campaign = item.campaigns.find((c) => c.name === name);
        return campaign ? campaign.conversions : 0;
      }),
      backgroundColor: alpha(colors[index % colors.length], 0.8),
      borderRadius: 4,
      borderWidth: 0,
      hoverBackgroundColor: colors[index % colors.length],
    };
  });

  const chartData = {
    labels: data.map((item) => format(new Date(item.date), "MMM dd")),
    datasets,
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
          pointStyle: "rectRounded",
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
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + " conversions";
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
          precision: 0,
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    animations: {
      y: {
        duration: 1000,
        easing: "easeOutQuart",
      },
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card elevation={0} sx={{ borderRadius: 2, height: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {title || "Campaign Performance"}
          </Typography>
          <Box sx={{ height: 300, mt: 2 }}>
            <Bar data={chartData} options={options} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BarChart;
